#!/usr/bin/env node
/**
 * concorde — CLI del registry de Concorde (estilo shadcn, marca propia).
 *
 *   npx github:AaronCoorahua/ConcordeV2#cli add button
 *   npx github:AaronCoorahua/ConcordeV2#cli add homepage
 *   npx github:AaronCoorahua/ConcordeV2#cli add cardtitle offercard
 *
 * Cada componente es UN archivo (Button.tsx). El CLI te deja ELEGIR la carpeta
 * destino con un navegador visual (o pásala con --dir). Si un archivo ya existe,
 * pregunta si sobrescribir o saltar.
 */

import { existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, relative, join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const VERSION = "0.3.0";
const REGISTRY_BASE = (process.env.CONCORDE_REGISTRY || "https://concorde-v2-theta.vercel.app").replace(/\/$/, "");

// ── Colores (ANSI, se desactivan sin TTY o con NO_COLOR) ──────────────────────
const COLOR = stdout.isTTY && !process.env.NO_COLOR;
function paint(open, close) {
  return function wrap(s) { return COLOR ? `\x1b[${open}m${s}\x1b[${close}m` : String(s); };
}
const dim = paint("2", "22");
const bold = paint("1", "22");
const red = paint("31", "39");
const green = paint("32", "39");
const yellow = paint("33", "39");
function vault(s) { return COLOR ? `\x1b[38;2;132;96;229m${s}\x1b[39m` : String(s); }
function orange(s) { return COLOR ? `\x1b[38;2;237;137;54m${s}\x1b[39m` : String(s); }

const SYM = {
  add: green("✓"),
  over: yellow("↻"),
  skip: dim("•"),
  ask: yellow("?"),
  err: red("✗"),
  arrow: vault("›"),
};

const ART = [
  "  ____ ___  _   _  ____ ___  ____  ____  _____ ",
  " / ___/ _ \\| \\ | |/ ___/ _ \\|  _ \\|  _ \\| ____|",
  "| |  | | | |  \\| | |  | | | | |_) | | | |  _|  ",
  "| |__| |_| | |\\  | |__| |_| |  _ <| |_| | |___ ",
  " \\____\\___/|_| \\_|\\____\\___/|_| \\_\\____/|_____|",
];

function banner() {
  stdout.write("\n");
  for (let i = 0; i < ART.length; i += 1) {
    stdout.write("  " + (i < 3 ? vault(ART[i]) : orange(ART[i])) + "\n");
  }
  stdout.write("  " + dim(`Voyager DS · registry CLI`) + dim(`  v${VERSION}`) + "\n\n");
}

function toUrl(t) {
  if (/^https?:\/\//.test(t)) return t;
  return `${REGISTRY_BASE}/r/${t.replace(/\.json$/, "")}.json`;
}

function relFromCwd(p) {
  return relative(process.cwd(), p).split("\\").join("/") || ".";
}

// ── Navegador de carpetas ─────────────────────────────────────────────────────
function listSubdirs(dir) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return []; }
  return entries
    .filter(function keep(n) {
      if (n.startsWith(".")) return false;
      if (n === "node_modules") return false;
      try { return statSync(join(dir, n)).isDirectory(); } catch { return false; }
    })
    .sort();
}

function defaultDir() {
  const cwd = process.cwd();
  if (existsSync(join(cwd, "src", "components"))) return join(cwd, "src", "components");
  if (existsSync(join(cwd, "src"))) return join(cwd, "src");
  if (existsSync(join(cwd, "components"))) return join(cwd, "components");
  return cwd;
}

async function pickDir(rl, start) {
  let cur = start;
  for (;;) {
    const subs = listSubdirs(cur);
    stdout.write("\n  " + bold("¿Dónde instalo los archivos?") + "\n");
    stdout.write("  " + dim("carpeta actual: ") + vault(relFromCwd(cur)) + "\n\n");
    stdout.write("    " + green("0") + dim(")") + " ✓ instalar aquí\n");
    subs.forEach(function row(d, i) {
      stdout.write("    " + bold(String(i + 1)) + dim(")") + " 📁 " + d + "/\n");
    });
    stdout.write(
      "    " + bold("u") + dim(")") + " ⬆ subir   " +
      bold("n") + dim(")") + " ＋ nueva carpeta   " +
      bold("q") + dim(")") + " cancelar\n",
    );
    const ans = (await rl.question("  " + SYM.arrow + " ")).trim().toLowerCase();
    if (ans === "0" || ans === "") return cur;
    if (ans === "q") return null;
    if (ans === "u") { cur = dirname(cur); continue; }
    if (ans === "n") {
      const name = (await rl.question("  nombre de la carpeta nueva: ")).trim();
      if (name) { const nd = join(cur, name); mkdirSync(nd, { recursive: true }); cur = nd; }
      continue;
    }
    const n = Number.parseInt(ans, 10);
    if (Number.isInteger(n) && n >= 1 && n <= subs.length) { cur = join(cur, subs[n - 1]); continue; }
    stdout.write("  " + yellow("opción inválida") + "\n");
  }
}

async function askOverwrite(rl, rel) {
  const q =
    `  ${SYM.ask} ${bold(rel)} ${dim("ya existe")} — ` +
    `${bold("[o]")}sobrescribir  ${bold("[s]")}saltar  ${bold("[a]")}sobrescribir todo  ${bold("[x]")}saltar todo ${dim("(s)")}: `;
  const ans = (await rl.question(q)).trim().toLowerCase();
  if (ans === "o") return "overwrite";
  if (ans === "a") return "overwrite-all";
  if (ans === "x") return "skip-all";
  return "skip";
}

async function add(targets, opts) {
  banner();

  if (targets.length === 0) {
    stdout.write(`  ${SYM.err} Uso: ${bold("concorde add <nombre|url> [...]")}\n\n`);
    process.exit(1);
  }

  const tty = stdin.isTTY && stdout.isTTY;
  const rl = tty ? createInterface({ input: stdin, output: stdout }) : null;

  // ── Carpeta destino ──
  let baseDir;
  if (opts.dir) baseDir = resolve(process.cwd(), opts.dir);
  else if (rl) {
    baseDir = await pickDir(rl, defaultDir());
    if (!baseDir) { stdout.write("\n  cancelado\n\n"); rl.close(); return; }
  } else {
    baseDir = defaultDir();
  }
  stdout.write("\n  " + dim("instalando en ") + vault(relFromCwd(baseDir)) + dim("/") + "\n\n");

  let overwriteAll = opts.force;
  let skipAll = opts.skip;
  const totals = { added: 0, over: 0, skipped: 0, items: 0, failed: 0 };
  const npmDeps = new Set();

  for (const t of targets) {
    const url = toUrl(t);
    stdout.write(`${SYM.arrow} ${bold(t)}  ${dim(url)}\n`);

    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      stdout.write(`  ${SYM.err} error de red: ${err.message}\n\n`);
      totals.failed += 1;
      continue;
    }
    if (!res.ok) {
      stdout.write(`  ${SYM.err} no encontrado ${dim(`(${res.status})`)}\n\n`);
      totals.failed += 1;
      continue;
    }

    const item = await res.json();

    for (const f of item.files || []) {
      const dest = resolve(baseDir, f.target || f.path);
      const rel = relFromCwd(dest);

      if (existsSync(dest)) {
        let decision = overwriteAll ? "overwrite" : skipAll ? "skip" : "ask";
        if (decision === "ask") {
          if (!rl) {
            decision = "skip";
          } else {
            const choice = await askOverwrite(rl, rel);
            if (choice === "overwrite-all") { overwriteAll = true; decision = "overwrite"; }
            else if (choice === "skip-all") { skipAll = true; decision = "skip"; }
            else { decision = choice; }
          }
        }
        if (decision === "skip") {
          stdout.write(`  ${SYM.skip} ${dim(rel)} ${dim("(saltado)")}\n`);
          totals.skipped += 1;
          continue;
        }
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, f.content ?? "");
        stdout.write(`  ${SYM.over} ${rel} ${dim("(sobrescrito)")}\n`);
        totals.over += 1;
      } else {
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, f.content ?? "");
        stdout.write(`  ${SYM.add} ${rel}\n`);
        totals.added += 1;
      }
    }

    for (const d of (item.dependencies || [])) {
      if (d !== "react") npmDeps.add(d);
    }
    stdout.write(`  ${dim(`${item.type} «${item.name}»`)}\n\n`);
    totals.items += 1;
  }

  if (rl) rl.close();

  const parts = [
    green(`${totals.added} añadidos`),
    yellow(`${totals.over} sobrescritos`),
    dim(`${totals.skipped} saltados`),
  ];
  if (totals.failed) parts.push(red(`${totals.failed} fallidos`));
  stdout.write(`${bold("Listo.")}  ${parts.join(dim(" · "))}\n`);
  stdout.write(dim(`Archivos en ${relFromCwd(baseDir)}/ — imports relativos, sin tocar tu config.\n`));
  if (npmDeps.size > 0) {
    stdout.write(`\n  ${SYM.ask} Instala dependencias npm:  ${bold(`npm i ${[...npmDeps].join(" ")}`)}\n`);
  }
  stdout.write("\n");
}

function help() {
  banner();
  stdout.write([
    `  ${bold("Uso")}`,
    `    concorde add <nombre|url> [...]      copia componente(s)/bloque(s) a tu proyecto`,
    ``,
    `  ${bold("Opciones")}`,
    `    -d, --dir <ruta>   carpeta destino (si se omite, abre el navegador)`,
    `    -f, --force        sobrescribe los archivos existentes sin preguntar`,
    `    -s, --skip         salta los archivos existentes sin preguntar`,
    `    -v, --version      muestra la versión`,
    `    -h, --help         muestra esta ayuda`,
    ``,
    `  ${bold("Ejemplos")}`,
    `    ${dim("$")} npx github:AaronCoorahua/ConcordeV2#cli add button`,
    `    ${dim("$")} npx github:AaronCoorahua/ConcordeV2#cli add homepage          ${dim("# bloque + sus componentes")}`,
    `    ${dim("$")} npx github:AaronCoorahua/ConcordeV2#cli add button --dir src/components`,
    ``,
  ].join("\n"));
}

// ── Parse de argumentos ───────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const opts = { force: false, skip: false, dir: null };
const positional = [];
for (let i = 0; i < argv.length; i += 1) {
  const a = argv[i];
  if (a === "-f" || a === "--force" || a === "-y" || a === "--yes") opts.force = true;
  else if (a === "-s" || a === "--skip") opts.skip = true;
  else if (a === "-d" || a === "--dir") { opts.dir = argv[i + 1]; i += 1; }
  else if (a === "-v" || a === "--version") { stdout.write(`${VERSION}\n`); process.exit(0); }
  else if (a === "-h" || a === "--help") { help(); process.exit(0); }
  else positional.push(a);
}

const [cmd, ...rest] = positional;

if (cmd === "add") {
  add(rest, opts);
} else {
  help();
}
