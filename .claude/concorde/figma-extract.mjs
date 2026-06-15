#!/usr/bin/env node
/**
 * figma-extract.mjs — Extractor de specs de Figma para Concorde (paso 2 / concorde-sync)
 *
 * Lee la verdad VISUAL desde Figma vía REST API (token personal, funciona en plan GRATIS).
 * NO necesita node-id manual: busca el nodo por nombre de página + sección.
 *
 * Requisitos:
 *   - Node 20+ (usa fetch global)
 *   - Variable de entorno FIGMA_TOKEN (Settings → Security → Personal access tokens)
 *
 * Uso (búsqueda por nombre — recomendado):
 *   node .claude/concorde/figma-extract.mjs \
 *     --file <FILE_KEY> --page "Componentes" --section "Button" [--name "primary"] [--out spec.json] [--images]
 *
 * Uso (node-id directo, si lo pegas de "Copy link"):
 *   node .claude/concorde/figma-extract.mjs --file <FILE_KEY> --node "1:23" [--out spec.json]
 *
 * Salida: FigmaSpec JSON normalizado (a stdout, o a --out). Compatible con el
 * "ComponentSpec" del SKILL.md de /concorde.
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Cache en disco junto al script — cada respuesta de la API se guarda para no
// quemar la cuota del plan (las llamadas /files completas son caras).
const CACHE_DIR = join(dirname(fileURLToPath(import.meta.url)), "_api-cache");
const cachePath = (p) => join(CACHE_DIR, p.replace(/[^A-Za-z0-9]+/g, "_").slice(0, 150) + ".json");

// ── CLI args ────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      args[key] = true; // flag booleana (ej. --images)
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const TOKEN = process.env.FIGMA_TOKEN;

function fail(msg) {
  console.error(`\n[figma-extract] ERROR: ${msg}\n`);
  process.exit(1);
}

// File key: de --file, o derivado del primer link pegado en --node
const FILE_KEY = args.file
  ? parseFileKey(args.file)
  : typeof args.node === "string" && /figma\.com/i.test(args.node)
    ? parseFileKey(String(args.node).split(/[,\s]+/)[0])
    : undefined;

if (!TOKEN) fail("Falta la variable de entorno FIGMA_TOKEN.");
if (!FILE_KEY) fail("Falta --file <FILE_KEY|link> (o pega links completos en --node).");
if (!args.node && !args.page && !args.section && !args.find) {
  fail("Indica --node <id|link[,id|link...]>, --page+--section, o --find <nombre>.");
}

const API = "https://api.figma.com/v1";
const HEADERS = { "X-Figma-Token": TOKEN };

// ── HTTP helpers ─────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readCache(path) {
  try {
    const f = cachePath(path);
    if (existsSync(f)) return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    /* cache corrupto → ignorar */
  }
  return null;
}

function writeCache(path, data) {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cachePath(path), JSON.stringify(data));
  } catch {
    /* cache es best-effort */
  }
}

async function figmaGet(path, attempt = 1) {
  // --cache: usar respuesta guardada sin tocar la red (ahorra cuota)
  if (args.cache) {
    const hit = readCache(path);
    if (hit) {
      console.error(`[figma-extract] cache hit: ${path}`);
      return hit;
    }
  }
  const res = await fetch(`${API}${path}`, { headers: HEADERS });
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after")) || 0;
    if (retryAfter > 120) {
      // Cuota del plan agotada (retry-after en horas/días) — intentar cache antes de morir.
      const hit = readCache(path);
      if (hit) {
        console.error(`[figma-extract] cuota agotada → usando CACHE para ${path}`);
        return hit;
      }
      const hrs = (retryAfter / 3600).toFixed(1);
      fail(
        `429 — CUOTA del plan Figma agotada. Se resetea en ~${hrs} horas.\n` +
          `Tip: corre con --cache si ya extrajiste antes, o espera el reset.\n` +
          `Las llamadas a /files/:key completas son caras — prefiere --node con ids específicos.`
      );
    }
    if (attempt <= 3) {
      const wait = Math.min(retryAfter * 1000 || attempt * 20000, 60000);
      console.error(`[figma-extract] 429 rate limit — reintento ${attempt}/3 en ${Math.round(wait / 1000)}s...`);
      await sleep(wait);
      return figmaGet(path, attempt + 1);
    }
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    fail(`Figma API ${res.status} en ${path}\n${body.slice(0, 400)}`);
  }
  const json = await res.json();
  writeCache(path, json);
  return json;
}

// ── Tree search ──────────────────────────────────────────────────────────────

const norm = (s) => String(s ?? "").trim().toLowerCase();
const BUTTONISH = /(button|btn|bot[oó]n|cta|ingresa|participa|ver m[aá]s)/i;

// node-id de URL ("1312-4674") → formato API ("1312:4674")
const toApiId = (s) => String(s).replace(/-/g, ":");

// Acepta un link completo de Figma O un node-id pelado → id formato API.
// Ej: "https://www.figma.com/design/KEY/Nombre?node-id=1807-14907&t=..." → "1807:14907"
function parseNodeRef(s) {
  const str = String(s).trim();
  if (/figma\.com/i.test(str)) {
    try {
      const u = new URL(str);
      const nid = u.searchParams.get("node-id");
      if (nid) return toApiId(nid);
    } catch {
      /* no era URL válida — cae al caso id pelado */
    }
  }
  return toApiId(str);
}

// El file key también puede venir de un link: figma.com/design/<KEY>/...
function parseFileKey(s) {
  const m = String(s).match(/figma\.com\/(?:design|file)\/([A-Za-z0-9]+)/i);
  return m ? m[1] : String(s).trim();
}

// Nombre de variante Figma "Type=Primary, State=Hover" → { Type: "Primary", State: "Hover" }
function parseVariantProps(name) {
  if (!String(name).includes("=")) return null;
  const props = {};
  for (const part of String(name).split(",")) {
    const [k, ...rest] = part.split("=");
    const v = rest.join("=");
    if (k && v) props[k.trim()] = v.trim();
  }
  return Object.keys(props).length ? props : null;
}

// Interacciones de prototype (reactions / transiciones) de un nodo y sus hijos
function collectPrototype(node) {
  const out = [];
  const stack = [node];
  while (stack.length) {
    const n = stack.shift();
    const reactions = n.reactions || n.interactions || [];
    for (const r of reactions) {
      const act = r.action || (Array.isArray(r.actions) ? r.actions[0] : null);
      const t = act?.transition;
      out.push({
        node: n.name,
        on: r.trigger?.type ?? null, // ON_HOVER, ON_CLICK, ON_PRESS, AFTER_TIMEOUT...
        action: act?.type ?? null, // NODE (cambio de variante), SMART_ANIMATE...
        transition: t
          ? { type: t.type, duration: t.duration, easing: t.easing?.type ?? t.easing }
          : null,
        destinationId: act?.destinationId ?? null,
      });
    }
    if (n.transitionNodeID) {
      out.push({
        node: n.name,
        on: "LEGACY",
        destinationId: n.transitionNodeID,
        transition: { duration: n.transitionDuration, easing: n.transitionEasing },
      });
    }
    if (n.children) stack.push(...n.children);
  }
  return out;
}

function findByName(node, name, predicate) {
  // DFS: primer nodo cuyo name coincide (y opcionalmente cumple predicate)
  const stack = [node];
  while (stack.length) {
    const n = stack.shift();
    if (norm(n.name) === norm(name) && (!predicate || predicate(n))) return n;
    if (n.children) stack.push(...n.children);
  }
  return null;
}

function collectButtons(root, explicitName) {
  // Nodos candidato a "botón" dentro de root.
  // Un COMPONENT_SET ("✦ Button") se EXPANDE en sus variantes (cada COMPONENT = variante×estado).
  const out = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.shift();

    if (n.type === "COMPONENT_SET") {
      const matchesSet = explicitName
        ? norm(n.name) === norm(explicitName) || BUTTONISH.test(n.name)
        : BUTTONISH.test(n.name) || n === root;
      if (matchesSet) {
        out.push(...(n.children || []).filter((c) => c.type === "COMPONENT"));
        continue; // ya tomamos sus variantes; no descender más
      }
    }

    const isContainer = ["FRAME", "COMPONENT", "INSTANCE", "GROUP"].includes(n.type);
    const matches = explicitName ? norm(n.name) === norm(explicitName) : BUTTONISH.test(n.name);
    if (n !== root && isContainer && matches) out.push(n);
    if (n.children) stack.push(...n.children);
  }
  // Si no se encontró nada y había nombre explícito, devolver root mismo
  if (!out.length && norm(root.name) === norm(explicitName ?? root.name)) out.push(root);
  return out;
}

// ── Normalización de un nodo → spec ──────────────────────────────────────────

function toHex({ r, g, b, a = 1 } = {}) {
  if (r === undefined) return null;
  const c = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  const hex = `#${c(r)}${c(g)}${c(b)}`;
  return a < 1 ? { hex, alpha: Number(a.toFixed(3)) } : { hex };
}

function firstSolidFill(node) {
  const fills = node.fills || [];
  const solid = fills.find((f) => f.type === "SOLID" && f.visible !== false);
  if (solid) return { kind: "solid", color: toHex({ ...solid.color, a: solid.opacity ?? solid.color?.a ?? 1 }) };
  const grad = fills.find((f) => f.type?.startsWith("GRADIENT") && f.visible !== false);
  if (grad) {
    return {
      kind: grad.type,
      stops: (grad.gradientStops || []).map((s) => ({ position: s.position, color: toHex(s.color) })),
    };
  }
  return null;
}

// Si el frame raíz no tiene fill, busca el primer fill (sólido/gradiente) en sus hijos no-texto
function fillDeep(node) {
  const stack = [...(node.children || [])];
  while (stack.length) {
    const n = stack.shift();
    if (n.type !== "TEXT") {
      const f = firstSolidFill(n);
      if (f) return { ...f, from: n.name };
    }
    if (n.children) stack.push(...n.children);
  }
  return null;
}

function findFirstText(node) {
  const stack = [node];
  while (stack.length) {
    const n = stack.shift();
    if (n.type === "TEXT") return n;
    if (n.children) stack.push(...n.children);
  }
  return null;
}

function collectIcons(node) {
  // Vectores / instancias que parecen íconos (por tipo o por nombre)
  const out = [];
  const stack = [...(node.children || [])];
  while (stack.length) {
    const n = stack.shift();
    const looksIcon =
      ["VECTOR", "BOOLEAN_OPERATION"].includes(n.type) ||
      /icon|ic[-_ ]|chevron|arrow|user|heart|clock/i.test(n.name);
    if (looksIcon) out.push({ id: n.id, name: n.name, type: n.type });
    if (n.children && !looksIcon) stack.push(...n.children);
  }
  return out;
}

// Las variantes de un component set suelen ENVOLVER al botón real en un frame
// interno (ej. COMPONENT "Variant=Primary..." > FRAME "Button"). Medir el frame
// interno — el contenedor trae padding del mock y da widths inflados.
function findInnerButton(node) {
  const kids = (node.children || []).filter((c) =>
    ["FRAME", "INSTANCE", "GROUP", "COMPONENT"].includes(c.type)
  );
  const byName = kids.find((c) => BUTTONISH.test(c.name));
  const single = kids.length === 1 ? kids[0] : null;
  const inner = byName ?? single;
  if (!inner?.absoluteBoundingBox || !node.absoluteBoundingBox) return null;
  const a = inner.absoluteBoundingBox;
  const b = node.absoluteBoundingBox;
  // Solo si es realmente más chico → el nodo era un wrapper
  if (a.width < b.width - 2 || a.height < b.height - 2) return inner;
  return null;
}

function normalize(node) {
  const inner = findInnerButton(node);
  const meas = inner ?? node; // nodo de MEDICIÓN (frame interno si existe)
  const box = meas.absoluteBoundingBox || {};
  const text = findFirstText(node);
  const st = text?.style || {};
  const radius =
    meas.cornerRadius ??
    node.cornerRadius ??
    (Array.isArray(meas.rectangleCornerRadii) ? meas.rectangleCornerRadii.join(" ") : undefined);

  return {
    nodeId: node.id,
    name: node.name,
    type: node.type,
    props: parseVariantProps(node.name), // { Type, State, ... } si es variante de un set
    measuredFrom: inner ? `frame interno "${inner.name}" (${inner.id})` : "nodo raíz",
    dimensions: {
      width: box.width !== undefined ? Math.round(box.width) : undefined,
      height: box.height !== undefined ? Math.round(box.height) : undefined,
    },
    layout: {
      mode: meas.layoutMode, // HORIZONTAL | VERTICAL | NONE
      paddingLeft: meas.paddingLeft,
      paddingRight: meas.paddingRight,
      paddingTop: meas.paddingTop,
      paddingBottom: meas.paddingBottom,
      gap: meas.itemSpacing,
      primaryAlign: meas.primaryAxisAlignItems,
      counterAlign: meas.counterAxisAlignItems,
    },
    radius,
    fill: firstSolidFill(meas) ?? firstSolidFill(node) ?? fillDeep(node),
    typography: text
      ? {
          family: st.fontFamily,
          postScript: st.fontPostScriptName,
          size: st.fontSize,
          weight: st.fontWeight,
          lineHeightPx: st.lineHeightPx,
          letterSpacing: st.letterSpacing,
          case: st.textCase,
          sample: text.characters,
          color: firstSolidFill(text)?.color ?? null,
        }
      : null,
    icons: collectIcons(node),
    prototype: collectPrototype(node), // hover/click variants + smart-animate de Figma
    childOrder: (node.children || []).map((c) => ({ name: c.name, type: c.type })),
  };
}

// Agrupa por TODAS las props menos "State" (ej. "Primary / Medium") → { ...: { Default, Hover, ... } }
// Así no se mezclan tamaños (Small vs Medium) que comparten Variant+State.
function groupByVariant(specs) {
  if (!specs.some((s) => s.props)) return null;
  const grouped = {};
  for (const s of specs) {
    if (!s.props) continue;
    const state =
      Object.entries(s.props).find(([k]) => k.toLowerCase() === "state")?.[1] ?? "default";
    const key =
      Object.entries(s.props)
        .filter(([k]) => k.toLowerCase() !== "state")
        .map(([, v]) => v)
        .join(" / ") || "default";
    grouped[key] = grouped[key] || {};
    grouped[key][state] = s.nodeId;
  }
  return grouped;
}

// ── Modo exploración: imprime el árbol (contenedores + textos) ───────────────

function printTree(node, depth = 0, maxDepth = 6) {
  if (depth > maxDepth) return;
  const pad = "  ".repeat(depth);
  const isBtn = BUTTONISH.test(node.name) ? "  ⟵ botón?" : "";
  const txt = node.type === "TEXT" ? `  "${String(node.characters ?? "").slice(0, 24)}"` : "";
  const box = node.absoluteBoundingBox;
  const dim = box ? `  ${Math.round(box.width)}×${Math.round(box.height)}` : "";
  console.error(`${pad}[${node.type}] ${node.name}  (${node.id})${dim}${txt}${isBtn}`);
  for (const c of node.children || []) printTree(c, depth + 1, maxDepth);
}

// ── Opcional: URL de imagen del nodo (para comparación lado-a-lado) ───────────

async function fetchImageUrls(ids, format = "png") {
  if (!ids.length) return {};
  const scale = format === "png" ? "&scale=2" : "";
  const data = await figmaGet(`/images/${FILE_KEY}?ids=${ids.join(",")}&format=${format}${scale}`);
  return data.images || {};
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Modo --find: escanea TODO el archivo y lista nodos que matchean un nombre (con su página).
  if (typeof args.find === "string") {
    const file = await figmaGet(`/files/${FILE_KEY}`);
    const needle = norm(args.find);
    console.error(`\n── Buscando "${args.find}" en todo el archivo ─────────────────────\n`);
    let found = 0;
    for (const page of file.document.children || []) {
      const stack = [...(page.children || [])];
      while (stack.length) {
        const n = stack.shift();
        if (norm(n.name).includes(needle)) {
          console.error(`  [${n.type}]  ${n.name}  (${n.id})   ← página: ${page.name}`);
          found++;
        }
        if (n.children) stack.push(...n.children);
      }
    }
    console.error(`\n${found} coincidencia(s). Usa --node "<id>" o --page/--section para extraer.\n`);
    return;
  }

  let targets = [];
  let root = null; // sub-árbol a explorar (sección o nodo)
  let explicitDocs = null; // nodos pedidos explícitamente (ids o links)

  if (args.node) {
    const ids = String(args.node).split(/[,\s]+/).filter(Boolean).map(parseNodeRef);
    const depth = typeof args.depth === "string" ? `&depth=${args.depth}` : "";
    const data = await figmaGet(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(ids.join(","))}${depth}`);
    const docs = ids.map((id) => data.nodes?.[id]?.document).filter(Boolean);
    if (!docs.length) fail(`No se encontró ningún node-id de "${args.node}" en el archivo.`);
    if (docs.length < ids.length) {
      console.error(`[figma-extract] aviso: ${ids.length - docs.length} nodo(s) no encontrados.`);
    }
    explicitDocs = docs;
    root = docs[0];
  } else {
    const file = await figmaGet(`/files/${FILE_KEY}`);
    const page = findByName(file.document, args.page, (n) => n.type === "CANVAS");
    if (!page) {
      const pages = (file.document.children || []).map((c) => c.name).join(", ");
      fail(`No se encontró la página "${args.page}". Páginas disponibles: ${pages}`);
    }
    if (args.section) {
      root = findByName(page, args.section);
      if (!root) fail(`No se encontró la sección "${args.section}" dentro de la página "${args.page}".`);
    } else {
      root = page;
    }
  }

  // Modo exploración: imprime el/los árbol(es) y termina (no normaliza).
  if (args.list) {
    for (const doc of explicitDocs ?? [root]) {
      console.error(`\n── Árbol de "${doc.name}" (${doc.type}) ─────────────────────────────\n`);
      printTree(doc, 0, typeof args.depth === "string" ? Number(args.depth) : 6);
    }
    console.error("\nUsa --name \"<nombre>\" o --node \"<id|link>\" del nodo botón para extraer su spec.\n");
    return;
  }

  if (explicitDocs) {
    // Nodos explícitos: se usan tal cual (un COMPONENT_SET se expande en sus variantes)
    for (const d of explicitDocs) {
      if (d.type === "COMPONENT_SET") {
        targets.push(...(d.children || []).filter((c) => c.type === "COMPONENT"));
      } else {
        targets.push(d);
      }
    }
  } else {
    targets = collectButtons(root, typeof args.name === "string" ? args.name : undefined);
  }
  if (!targets.length) {
    fail(
      `No se encontraron botones dentro de "${root.name}"` +
        (args.name ? ` con nombre "${args.name}".` : ".") +
        ` Corre con --list para ver el árbol.`
    );
  }

  const specs = targets.map(normalize);

  if (args.images) {
    const urls = await fetchImageUrls(specs.map((s) => s.nodeId));
    specs.forEach((s) => (s.imageUrl = urls[s.nodeId] ?? null));
  }

  // --svg: exporta los ÍCONOS de cada nodo como SVG real (para no aproximarlos a ojo)
  if (args.svg) {
    const iconIds = [...new Set(specs.flatMap((s) => s.icons.map((i) => i.id)))];
    const urls = await fetchImageUrls(iconIds, "svg");
    specs.forEach((s) => s.icons.forEach((i) => (i.svgUrl = urls[i.id] ?? null)));
  }

  const result = {
    version: "1",
    source: "figma-rest",
    file_key: FILE_KEY,
    query: args.node ? { node: args.node } : { page: args.page, section: args.section, name: args.name ?? null },
    count: specs.length,
    variantsMatrix: groupByVariant(specs),
    extracted: specs,
  };

  const json = JSON.stringify(result, null, 2);
  if (typeof args.out === "string") {
    writeFileSync(args.out, json);
    console.error(`[figma-extract] ${specs.length} nodo(s) → ${args.out}`);
  } else {
    process.stdout.write(json + "\n");
  }
}

main().catch((e) => fail(e?.message ?? String(e)));
