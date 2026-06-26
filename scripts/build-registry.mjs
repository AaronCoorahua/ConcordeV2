/**
 * build-registry.mjs — Genera un registry estilo shadcn para Concorde.
 *
 * Lee src/components/* y src/blocks/* y emite public/r/<name>.json.
 * - Cada COMPONENTE se distribuye como UN solo archivo plano: `<Name>.tsx`
 *   (sin carpeta y sin index.ts).
 * - Cada BLOQUE se distribuye como `<Block>/<archivo>.tsx` + los componentes
 *   que usa (planos, al lado).
 * - Los imports `@/src/...` se reescriben a rutas RELATIVAS, así el dev puede
 *   instalarlo en la carpeta que quiera (el CLI elige el destino).
 *
 * Uso:  node scripts/build-registry.mjs
 *       node scripts/build-registry.mjs https://concorde-v2-theta.vercel.app
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

// Reescribe imports al alias del consumidor:
//   @/src/components/X/...  → @/concorde/components/X
//   @/src/blocks/B/file     → @/concorde/bloques/B/file
function rewrite(content) {
  content = content.replace(/@\/src\/components\/([\w-]+)(?:\/[\w./-]+)?/g, function rep(_, name) {
    return `@/concorde/components/${name}`;
  });
  content = content.replace(/@\/src\/blocks\/([\w-]+)\/([\w-]+)/g, function rep(_, block, file) {
    return `@/concorde/bloques/${block}/${file}`;
  });
  return content;
}

// Archivos .ts/.tsx de un dir, RECURSIVO (los bloques viven en subcarpetas
// desktop/ y mobile/). Excluye *Handoff.tsx e index.ts — no se distribuyen.
// `prefix` = "components/" o "bloques/<Block>/". `sub` acumula la subruta.
function gatherFiles(dir, prefix, sub = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...gatherFiles(full, prefix, `${sub}${name}/`));
      continue;
    }
    if (!/\.tsx?$/.test(name)) continue;
    if (/Handoff\.tsx$/.test(name)) continue;
    if (name === "index.ts") continue;
    const target = `${prefix}${sub}${name}`;
    const raw = readFileSync(full, "utf8");
    out.push({ name, target, raw, content: rewrite(raw) });
  }
  return out;
}

// Componentes referenciados en un archivo. Detecta DOS estilos de import:
//   · alias:    @/src/components/X            (con o sin /sub-path)
//   · relativo: ../../../components/X          (el que usan los bloques)
function compDepsOf(raw) {
  const set = new Set();
  const reAlias = /@\/src\/components\/([\w-]+)/g;
  const reRel = /["'](?:\.\.\/)+components\/([\w-]+)/g;
  let m;
  while ((m = reAlias.exec(raw)) !== null) set.add(m[1]);
  while ((m = reRel.exec(raw)) !== null) set.add(m[1]);
  return [...set];
}

// Archivos de bloque referenciados (@/src/blocks/B/file) — para deps cross-bloque.
function blockFileDepsOf(raw) {
  const set = new Set();
  const re = /@\/src\/blocks\/([\w-]+)\/([\w-]+)/g;
  let m;
  while ((m = re.exec(raw)) !== null) set.add(`${m[1]}/${m[2]}`);
  return [...set];
}

// ─── 1. Componentes ───────────────────────────────────────────────────────────

const compRoot = join(SRC, "components");
const components = {}; // Name -> { Name, name, files, deps }

// Los componentes pueden ser ARCHIVOS PLANOS (src/components/X.tsx — el caso
// actual) o SUBCARPETAS (src/components/X/X.tsx). Soportamos ambos.
for (const entry of readdirSync(compRoot)) {
  const full = join(compRoot, entry);
  const st = statSync(full);

  let Name, files;
  if (st.isDirectory()) {
    Name = entry;
    files = gatherFiles(full, "components/");
  } else {
    if (!/\.tsx?$/.test(entry)) continue;
    if (/Handoff\.tsx$/.test(entry)) continue;
    if (entry === "index.ts") continue;
    Name = entry.replace(/\.tsx?$/, "");
    const raw = readFileSync(full, "utf8");
    files = [{ name: entry, target: `components/${entry}`, raw, content: rewrite(raw) }];
  }
  if (files.length === 0) continue;

  const deps = [...new Set(files.flatMap(function d(f) { return compDepsOf(f.raw); }))].filter(function self(d) { return d !== Name; });
  components[Name] = { Name, name: Name.toLowerCase(), files, deps };
}

// Cierre transitivo de componentes (dedup por target)
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

// Componentes privados (building blocks): solo se incluyen como dependencia.
const PRIVATE = new Set(["AmountOption"]);

const index = [];

for (const Name of Object.keys(components)) {
  if (PRIVATE.has(Name)) continue;
  const all = collectComponents([Name]);
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: components[Name].name,
    type: "registry:component",
    title: Name,
    description: `Componente Concorde ${Name} — un solo archivo, ${Name}.tsx.`,
    dependencies: ["react"],
    registryDependencies: [],
    files: [...all.values()].map(fileEntry),
  };
  writeFileSync(join(OUT, `${components[Name].name}.json`), JSON.stringify(item, null, 2));
  index.push({ name: item.name, type: item.type, title: item.title, url: `${BASE}/r/${item.name}.json` });
}

// ─── 2. Bloques ───────────────────────────────────────────────────────────────

const blockRoot = join(SRC, "blocks");

// Todos los archivos de bloque (para resolver deps cross-bloque, ej. StatPill).
const allBlockFiles = new Map(); // "Block/file" (sin ext) -> file
const blockGathered = {}; // Block -> files[]
for (const BlockName of listDirs(blockRoot)) {
  const files = gatherFiles(join(blockRoot, BlockName), `bloques/${BlockName}/`);
  blockGathered[BlockName] = files;
  for (const f of files) {
    const key = `${BlockName}/${f.name.replace(/\.tsx?$/, "")}`;
    allBlockFiles.set(key, f);
  }
}

for (const BlockName of listDirs(blockRoot)) {
  const blockFiles = blockGathered[BlockName];
  const merged = new Map();
  for (const f of blockFiles) merged.set(f.target, f);

  // Componentes que usa el bloque (cierre transitivo, planos)
  const compDeps = [...new Set(blockFiles.flatMap(function d(f) { return compDepsOf(f.raw); }))];
  for (const [k, v] of collectComponents(compDeps)) merged.set(k, v);

  // Archivos de OTROS bloques referenciados (ej. SalaMobile → Sala/StatPill),
  // incluyendo los componentes que ESOS archivos usen (ej. StatPill → SendBidIcon).
  for (const f of blockFiles) {
    for (const ref of blockFileDepsOf(f.raw)) {
      if (ref.startsWith(`${BlockName}/`)) continue; // mismo bloque, ya incluido
      const dep = allBlockFiles.get(ref);
      if (!dep) continue;
      merged.set(dep.target, dep);
      for (const [k, v] of collectComponents(compDepsOf(dep.raw))) merged.set(k, v);
    }
  }

  const name = BlockName.toLowerCase();
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:block",
    title: BlockName,
    description: `Bloque Concorde ${BlockName} — incluye sus ${compDeps.length} componentes.`,
    dependencies: ["react"],
    registryDependencies: [],
    files: [...merged.values()].map(fileEntry),
  };
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(item, null, 2));
  index.push({ name, type: item.type, title: BlockName, url: `${BASE}/r/${name}.json`, components: compDeps.map(function lc(d) { return d.toLowerCase(); }) });
}

// ─── 3. Índice ─────────────────────────────────────────────────────────────────

writeFileSync(join(OUT, "registry.json"), JSON.stringify({
  name: "concorde",
  homepage: BASE,
  items: index,
}, null, 2));

console.log(`Registry generado en public/r/ (${index.length} items, base ${BASE}):`);
for (const it of index) console.log(`  ${it.type.padEnd(18)} ${it.name}`);
