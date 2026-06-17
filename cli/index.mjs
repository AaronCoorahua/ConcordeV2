#!/usr/bin/env node
/**
 * concorde — CLI del registry de Concorde (estilo shadcn, marca propia).
 *
 *   npx @subastop/concorde@latest add homepage
 *   npx @subastop/concorde@latest add cardtitle offercard
 *   npx @subastop/concorde@latest add https://concorde-v2-theta.vercel.app/r/homepage.json
 *
 * Copia el/los items a la carpeta ./concorde de tu proyecto (imports relativos,
 * sin tocar tu config ni tu alias @/*).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const REGISTRY_BASE = (process.env.CONCORDE_REGISTRY || "https://concorde-v2-theta.vercel.app").replace(/\/$/, "");

function toUrl(t) {
  if (/^https?:\/\//.test(t)) return t;
  return `${REGISTRY_BASE}/r/${t.replace(/\.json$/, "")}.json`;
}

async function add(targets) {
  if (targets.length === 0) {
    console.error("Uso: concorde add <nombre|url> [...]");
    process.exit(1);
  }
  for (const t of targets) {
    const url = toUrl(t);
    process.stdout.write(`• ${t} … `);
    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      console.log("error de red");
      console.error(`  ${err.message}`);
      continue;
    }
    if (!res.ok) {
      console.log(`no encontrado (${res.status})`);
      continue;
    }
    const item = await res.json();
    let n = 0;
    for (const f of item.files || []) {
      const dest = resolve(process.cwd(), f.target || f.path);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, f.content ?? "");
      n += 1;
    }
    const deps = (item.dependencies || []).filter(function notReact(d) { return d !== "react"; });
    console.log(`✓ ${item.type} «${item.name}» → ${n} archivos en concorde/`);
    if (deps.length > 0) console.log(`  npm i ${deps.join(" ")}`);
  }
}

const [, , cmd, ...rest] = process.argv;

if (cmd === "add") {
  add(rest);
} else {
  console.log([
    "concorde — registry CLI",
    "",
    "  concorde add <nombre|url> [...]   copia componente(s)/bloque(s) a ./concorde",
    "",
    "Ejemplos:",
    "  npx @subastop/concorde@latest add homepage",
    "  npx @subastop/concorde@latest add cardtitle offercard",
    `  CONCORDE_REGISTRY=${REGISTRY_BASE} npx @subastop/concorde@latest add homepage`,
  ].join("\n"));
}
