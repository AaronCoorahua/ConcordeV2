#!/usr/bin/env node
/**
 * polish-captura — saca las imágenes de un ticket de /polish. Lo usa la skill /polish.
 *
 *   node scripts/polish-captura.mjs <url> <salida.png|jpg> [--selector ".css"] [--movil] [--clic "text=Aceptar"] [--ocultar ".modal"]
 *   node scripts/polish-captura.mjs <video.mp4> <salida.jpg> [--segundo 3]
 *
 * Con --selector recorta al primer elemento que coincide (a doble resolución, para que se
 * lea). Sin él, captura lo visible de la página. Con un .mp4 saca un cuadro del video.
 * Antes de capturar pulsa Esc, hace clic en cada --clic (para cerrar avisos o abrir un
 * menú) y esconde cada --ocultar. Ambos se pueden repetir. Otros: --ancho, --alto, --esperar.
 * Usa el Edge o Chrome instalado en la máquina: no descarga navegadores.
 */

import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [entrada, salida, ...resto] = process.argv.slice(2);
if (!entrada || !salida) {
  console.error('Uso: node scripts/polish-captura.mjs <url|video.mp4> <salida.png|jpg> [--selector ".css"] [--movil] [--segundo 3]');
  process.exit(1);
}

const opciones = { clic: [], ocultar: [] };
for (let i = 0; i < resto.length; i++) {
  const clave = resto[i].replace(/^--/, "");
  const siguiente = resto[i + 1];
  const valor = siguiente === undefined || siguiente.startsWith("--") ? true : resto[++i];
  if (Array.isArray(opciones[clave])) opciones[clave].push(valor);
  else opciones[clave] = valor;
}

const archivo = resolve(salida);
mkdirSync(dirname(archivo), { recursive: true });
const tipo = /\.jpe?g$/i.test(archivo) ? "jpeg" : "png";
const formato = tipo === "jpeg" ? { type: "jpeg", quality: 85 } : { type: "png" };

async function abrirNavegador() {
  for (const channel of ["msedge", "chrome"]) {
    try {
      return await chromium.launch({ channel });
    } catch {
      // Ese navegador no está instalado: se prueba el siguiente.
    }
  }
  throw new Error("No encontré Edge ni Chrome instalados.");
}

const navegador = await abrirNavegador();
try {
  if (/\.(mp4|webm|mov)$/i.test(entrada)) {
    // ── Cuadro de un video ──
    const ruta = resolve(entrada);
    if (!existsSync(ruta)) throw new Error(`No existe el video: ${ruta}`);
    const page = await navegador.newPage();
    await page.goto(pathToFileURL(ruta).href);
    const video = page.locator("video").first();
    const medidas = await video.evaluate(async (v, t) => {
      if (v.readyState < 1) await new Promise((ok) => v.addEventListener("loadedmetadata", ok, { once: true }));
      v.pause();
      v.controls = false;
      v.currentTime = Math.min(t, v.duration - 0.1);
      await new Promise((ok) => v.addEventListener("seeked", ok, { once: true }));
      return { w: v.videoWidth, h: v.videoHeight, duracion: v.duration };
    }, Number(opciones.segundo ?? 1));
    await page.setViewportSize({ width: medidas.w, height: medidas.h });
    await video.evaluate((v) => Object.assign(v.style, { width: "100vw", height: "100vh", objectFit: "contain", margin: "0" }));
    await page.evaluate(() => Object.assign(document.body.style, { margin: "0" }));
    await video.screenshot({ path: archivo, ...formato });
    console.log(`ok ${salida} · cuadro del segundo ${opciones.segundo ?? 1} de ${medidas.duracion.toFixed(1)} s`);
  } else {
    // ── Captura de una página ──
    const movil = Boolean(opciones.movil);
    const recorte = typeof opciones.selector === "string";
    const contexto = await navegador.newContext({
      viewport: { width: Number(opciones.ancho ?? (movil ? 390 : 1440)), height: Number(opciones.alto ?? (movil ? 844 : 900)) },
      deviceScaleFactor: recorte || movil ? 2 : 1,
      isMobile: movil,
      hasTouch: movil,
    });
    const page = await contexto.newPage();
    await page.goto(entrada, { waitUntil: "load", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(Number(opciones.esperar ?? 800));
    await page.keyboard.press("Escape");
    for (const sel of opciones.clic) {
      const el = page.locator(sel).first();
      if ((await el.count()) === 0) console.log(`  · no encontré "${sel}" para hacer clic`);
      else await el.click({ timeout: 5000 }).catch(() => console.log(`  · no pude hacer clic en "${sel}"`));
      await page.waitForTimeout(500);
    }
    for (const sel of opciones.ocultar) {
      const n = await page.locator(sel).evaluateAll((els) => els.map((el) => el.style.setProperty("display", "none", "important")).length);
      if (n === 0) console.log(`  · no encontré "${sel}" para esconder`);
    }
    if (recorte) {
      const el = page.locator(opciones.selector).first();
      if ((await el.count()) === 0) throw new Error(`No hay ningún elemento "${opciones.selector}" en ${page.url()}`);
      await el.scrollIntoViewIfNeeded();
      await el.screenshot({ path: archivo, ...formato });
    } else {
      await page.screenshot({ path: archivo, ...formato });
    }
    // Si la página redirigió (p. ej. a un login), la captura no es la que se pidió.
    const final = page.url();
    const aviso = final.replace(/\/$/, "") !== entrada.replace(/\/$/, "") ? `  ⚠ terminó en ${final}` : "";
    console.log(`ok ${salida}${aviso}`);
  }
} catch (e) {
  console.error(`error: ${e instanceof Error ? e.message : String(e)}`);
  process.exitCode = 1;
} finally {
  await navegador.close();
}
