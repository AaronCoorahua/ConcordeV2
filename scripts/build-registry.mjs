/**
 * build-registry.mjs — Genera un registry estilo shadcn para Concorde.
 *
 * Lee src/components/* y src/blocks/* y emite public/r/<name>.json
 * (schema registry-item de shadcn). Cada item copia sus archivos a una carpeta
 * `concorde/` del proyecto destino. Los imports cross-componente se reescriben a
 * rutas RELATIVAS dentro de `concorde/`, así NO dependen del alias `@/*` del consumidor.
 *
 * Uso:  node scripts/build-registry.mjs
 *       node scripts/build-registry.mjs https://concorde.tu-host.com   (base para URLs del índice)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "public", "r");
const BASE = (process.argv[2] || "https://concorde-v2-theta.vercel.app").replace(/\/$/, "");

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// ─── Helpers ────────────────────────────────────────────────────────────────

function listDirs(p) {
  if (!existsSync(p)) return [];
  return readdirSync(p).filter(function isDir(n) { return statSync(join(p, n)).isDirectory(); });
}

function toRel(fromTarget, toTarget) {
  let r = relative(dirname(fromTarget), toTarget).split("\\").join("/");
  if (!r.startsWith(".")) r = "./" + r;
  return r;
}

// Reescribe imports `@/src/components|blocks/...` a rutas relativas dentro de concorde/
function rewrite(content, fromTarget) {
  content = content.replace(/@\/src\/components\/([\w-]+)\/([\w./-]+)/g, function rep(_, name, rest) {
    return toRel(fromTarget, `concorde/components/${name}/${rest}`);
  });
  content = content.replace(/@\/src\/blocks\/([\w-]+)\/([\w./-]+)/g, function rep(_, name, rest) {
    return toRel(fromTarget, `concorde/blocks/${name}/${rest}`);
  });
  return content;
}

// Recolecta archivos .tsx/.ts de un dir (excluye *Handoff.tsx; limpia exports Handoff de index.ts)
function gatherFiles(dir, targetBase) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isFile()) continue;
    if (!/\.tsx?$/.test(name)) continue;
    if (/Handoff\.tsx$/.test(name)) continue; // el panel de handoff no se distribuye
    const target = `${targetBase}/${name}`;
    let raw = readFileSync(full, "utf8");
    if (name === "index.ts") {
      raw = raw.split("\n").filter(function noHandoff(l) { return !l.includes("Handoff"); }).join("\n");
    }
    out.push({ target, raw, content: rewrite(raw, target) });
  }
  return out;
}

function depsOf(raw) {
  const set = new Set();
  const re = /@\/src\/components\/([\w-]+)\//g;
  let m;
  while ((m = re.exec(raw)) !== null) set.add(m[1]);
  return [...set];
}

// ─── 1. Componentes ───────────────────────────────────────────────────────────

const compRoot = join(SRC, "components");
const components = {}; // Name -> { Name, name, files, deps }

for (const Name of listDirs(compRoot)) {
  const files = gatherFiles(join(compRoot, Name), `concorde/components/${Name}`);
  const deps = [...new Set(files.flatMap(function d(f) { return depsOf(f.raw); }))].filter(function self(d) { return d !== Name; });
  components[Name] = { Name, name: Name.toLowerCase(), files, deps };
}

// Cierre transitivo: dado un set de Names de componentes, junta todos sus archivos (dedup por target)
function collectComponents(names, acc = new Map(), seen = new Set()) {
  for (const Name of names) {
    if (seen.has(Name)) continue;
    seen.add(Name);
    const c = components[Name];
    if (!c) continue;
    for (const f of c.files) acc.set(f.target, f);
    collectComponents(c.deps, acc, seen);
  }
  return acc;
}

function fileEntry(f) {
  return { path: f.target, type: "registry:file", target: f.target, content: f.content };
}

const index = [];

for (const Name of Object.keys(components)) {
  const all = collectComponents([Name]);
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: components[Name].name,
    type: "registry:component",
    title: Name,
    description: `Componente Concorde ${Name} — se instala en concorde/components/${Name}.`,
    dependencies: ["react"],
    registryDependencies: [],
    files: [...all.values()].map(fileEntry),
  };
  writeFileSync(join(OUT, `${components[Name].name}.json`), JSON.stringify(item, null, 2));
  index.push({ name: item.name, type: item.type, title: item.title, url: `${BASE}/r/${item.name}.json` });
}

// ─── 2. Bloques ───────────────────────────────────────────────────────────────

const blockRoot = join(SRC, "blocks");

for (const BlockName of listDirs(blockRoot)) {
  const blockFiles = gatherFiles(join(blockRoot, BlockName), `concorde/blocks/${BlockName}`);
  const blockDeps = [...new Set(blockFiles.flatMap(function d(f) { return depsOf(f.raw); }))];
  const compFiles = collectComponents(blockDeps);

  const merged = new Map();
  for (const f of blockFiles) merged.set(f.target, f);
  for (const [k, v] of compFiles) merged.set(k, v);

  const name = BlockName.toLowerCase();
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:block",
    title: BlockName,
    description: `Bloque Concorde ${BlockName} — incluye sus ${blockDeps.length} componentes. Se instala en concorde/.`,
    dependencies: ["react"],
    registryDependencies: [],
    files: [...merged.values()].map(fileEntry),
  };
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(item, null, 2));
  index.push({ name, type: item.type, title: BlockName, url: `${BASE}/r/${name}.json`, components: blockDeps.map(function lc(d) { return d.toLowerCase(); }) });
}

// ─── 3. Índice ─────────────────────────────────────────────────────────────────

writeFileSync(join(OUT, "registry.json"), JSON.stringify({
  name: "concorde",
  homepage: BASE,
  items: index,
}, null, 2));

console.log(`Registry generado en public/r/ (${index.length} items, base ${BASE}):`);
for (const it of index) console.log(`  ${it.type.padEnd(18)} ${it.name}`);
