/**
 * Tipologías V2 «Gradientes» — módulo plano (sin "use client").
 *
 * Opción 2 del sistema de banners de correo: MISMO contenido de marca que la
 * Opción 1 (logo »vmc« Subastas + ícono «¡CON TODO!» + título/bajada placeholder),
 * pero sobre los FONDOS con GRADIENTE de color y las FORMAS de los banners
 * VOYAGER v2 (naranja En Vivo, morado, teal Negociable, etc.).
 *
 * NO llevan foto ni contador «Ofertas N» (eso es de banners de subasta, no de
 * correos). Solo: gradiente por tono + chevrons/glows de fondo + logo/ícono de
 * marca + copy placeholder.
 *
 * Email-safe (tablas + inline + bgcolor de respaldo, sin flex/grid/JS). Los
 * chevrons y anillos se hacen con SVG/gradientes en divs posicionados; en
 * clientes viejos degradan al bgcolor plano del tono.
 *
 * Los gradientes y las formas NO son inventados: se copian de los banners v2
 * reales en src/blocks/banners/desktop/PromoBanner.tsx (TONE_GRADIENTS y los
 * anillos concéntricos del layout `orbit`). Ver la tabla TONE más abajo.
 */

import { conTodo, wordmarkTinted } from "./tipologiasBrand";

export const V2_WIDTH = 600;
export const V2_HEIGHT = 190;

export type V2Tone = "live" | "proximas" | "negotiable" | "coins" | "dark";

/**
 * Layout del banner V2 (composición marca↔copy) — igual que la Opción 1 varía
 * la posición, pero sobre los fondos de gradiente:
 *   · text-left   — copy a la izquierda, marca a la derecha
 *   · brand-left  — marca a la izquierda, copy a la derecha
 *   · center      — todo centrado (marca arriba + copy debajo)
 *   · stacked     — copy arriba + franja de marca (logo+ícono) abajo
 *   · icon-right  — copy a la izquierda + ícono «¡CON TODO!» grande a la derecha
 */
export type V2Layout = "text-left" | "brand-left" | "center" | "stacked" | "icon-right";

export interface V2Tipo {
  id: string;
  label: string;
  descripcion: string;
  /** Tono por defecto con el que se muestra la tipología (siempre `live`). */
  tone: V2Tone;
  layout: V2Layout;
}

/** Tono por defecto de TODA tipología: el fondo de «En Vivo». */
export const V2_DEFAULT_TONE: V2Tone = "live";

/** Los tonos seleccionables desde el tab de fondo, en orden. */
export const V2_TONE_OPTIONS: Array<{ tone: V2Tone; label: string }> = [
  { tone: "live", label: "En Vivo" },
  { tone: "proximas", label: "Morado" },
  { tone: "negotiable", label: "Negociable" },
  { tone: "coins", label: "SubasCoins" },
  { tone: "dark", label: "Dark" },
];

/**
 * Las tipologías son LAYOUTS, no tonos: todas nacen con el fondo `live` y el
 * fondo se cambia con el tab del detalle. Por eso el nombre describe la
 * composición (dónde va la marca y dónde el copy), no el color.
 */
export const TIPOLOGIAS_V2: V2Tipo[] = [
  {
    id: "v2-en-vivo",
    label: "V2 · Texto izquierda",
    descripcion: "Texto a la izquierda y marca a la derecha, con chevrons detrás del copy y anillos tras la marca.",
    tone: V2_DEFAULT_TONE,
    layout: "text-left",
  },
  {
    id: "v2-proximas",
    label: "V2 · Marca izquierda",
    descripcion: "Espejo del anterior: la marca abre a la izquierda y el texto se lee a la derecha.",
    tone: V2_DEFAULT_TONE,
    layout: "brand-left",
  },
  {
    id: "v2-negociable",
    label: "V2 · Centrado",
    descripcion: "Todo centrado: marca arriba (ícono + logo) y copy debajo. Layout simétrico, el más solemne.",
    tone: V2_DEFAULT_TONE,
    layout: "center",
  },
  {
    id: "v2-coins",
    label: "V2 · Apilado",
    descripcion: "Apilado: copy arriba y la franja de marca (ícono + logo en horizontal) abajo.",
    tone: V2_DEFAULT_TONE,
    layout: "stacked",
  },
  {
    id: "v2-dark",
    label: "V2 · Ícono derecha",
    descripcion: "Copy a la izquierda y el ícono «¡CON TODO!» grande a la derecha, sin wordmark. El más directo.",
    tone: V2_DEFAULT_TONE,
    layout: "icon-right",
  },
];

// ─── Tonos ────────────────────────────────────────────────────────────────────

export interface ToneStyle {
  /** Gradiente de fondo (background-image del band) */
  bg: string;
  /** Color plano de respaldo (bgcolor) */
  bgFallback: string;
  /** Color de los chevrons grandes del bg */
  chevron: string;
  /** RGB del glow detrás de la marca */
  glow: string;
  /** Color del «Subastas» del wordmark (contraste sobre el fondo) */
  sub: string;
  /** Color del «powered by» */
  powered: string;
  /** Color del «SUBASTOP» dentro del powered by */
  poweredBrand: string;
}

/**
 * Tonos — los gradientes REALES del sistema, no aproximaciones:
 *   · live/negotiable → TONE_GRADIENTS de src/blocks/banners/desktop/PromoBanner.tsx
 *     (`flip`: el tono abre a la izquierda y CRUZA a morado a la derecha — ese cruce
 *     de color es lo que les da el look; cerrarlos en su propio tono los apaga).
 *   · proximas/dark   → token VYGradientPurple (#5F3ED8→#340091→#140046), el mismo
 *     de ProfileCard/SubasCoinsCard.
 * Mantener sincronizados con PromoBanner.tsx si allí cambian.
 */
export const V2_TONE: Record<V2Tone, ToneStyle> = {
  // PromoBanner `live.flip` — naranja #E8732A → #C85A1E → morado #3D2299 → #2A1670
  live: {
    bg: "linear-gradient(100deg,#E8732A 0%,#C85A1E 26%,#3D2299 72%,#2A1670 100%)",
    bgFallback: "#C85A1E",
    chevron: "rgba(255,255,255,0.16)",
    glow: "255,226,194",
    sub: "#FFE2C2",
    powered: "rgba(255,255,255,0.78)",
    poweredBrand: "#FFFFFF",
  },
  // VYGradientPurple + el #ED8936 del cierre (captura: #140046/#340091/#ED8936)
  proximas: {
    bg: "linear-gradient(100deg,#140046 0%,#340091 48%,#5F3ED8 82%,#ED8936 100%)",
    bgFallback: "#340091",
    chevron: "rgba(255,255,255,0.14)",
    glow: "174,142,255",
    sub: "#B9A7EA",
    powered: "#8E7CC3",
    poweredBrand: "#B9A7EA",
  },
  // PromoBanner `negotiable.flip` — teal #00D2D3 → #00AEB1 → morado #3D2299 → #2A1670
  negotiable: {
    bg: "linear-gradient(100deg,#00D2D3 0%,#00AEB1 26%,#3D2299 72%,#2A1670 100%)",
    bgFallback: "#00AEB1",
    chevron: "rgba(255,255,255,0.18)",
    glow: "178,246,246",
    sub: "#CFFBFB",
    powered: "rgba(255,255,255,0.82)",
    poweredBrand: "#FFFFFF",
  },
  // PromoBanner `live.megaBg` — morado profundo → naranja profundo
  coins: {
    bg: "linear-gradient(115deg,#241262 0%,#3D2299 52%,#C85A1E 100%)",
    bgFallback: "#3D2299",
    chevron: "rgba(255,255,255,0.18)",
    glow: "255,226,194",
    sub: "#FFE2C2",
    powered: "rgba(255,255,255,0.82)",
    poweredBrand: "#FFFFFF",
  },
  // VYGradientPurple puro (157deg, como EmpresaBannerAlt)
  dark: {
    bg: "linear-gradient(157deg,#5F3ED8 0%,#340091 55%,#140046 100%)",
    bgFallback: "#340091",
    chevron: "rgba(255,255,255,0.10)",
    glow: "132,96,229",
    sub: "#B9A7EA",
    powered: "#8E7CC3",
    poweredBrand: "#B9A7EA",
  },
};

// ─── Piezas email-safe ────────────────────────────────────────────────────────

/**
 * Chevrons grandes del bg — formas RELLENAS que salen del borde (no strokes).
 * Cada chevron es un polígono en «>» con grosor de brazo constante; se recortan
 * contra el borde del banner, como en los banners v2.
 *
 * El paso entre chevrons (STEP) es mayor que el brazo a propósito: deja aire
 * entre ellos y evita que se apelotonen contra la marca del centro.
 */
function chevrons(color: string, side: "left" | "right", h: number = V2_HEIGHT): string {
  const flip = side === "left" ? ' transform="scale(-1,1) translate(-360,0)"' : "";
  const pos = side === "right" ? "right:0" : "left:0";
  // El viewBox sigue el alto REAL del banner (los layouts center/stacked miden
  // más): con un viewBox fijo, los chevrons se escalarían y recortarían mal.
  const cy = h / 2;
  const STEP = 130; // separación entre chevrons
  const X0 = 74; // el primero arranca más adentro: aleja el grupo del centro
  // «>» relleno: punta en (x+w, cy), brazo de `arm` px de grosor.
  const chev = (x: number, w: number, arm: number, op: number): string =>
    `<path d="M${x} 0 L${x + w} ${cy} L${x} ${h} L${x + arm} ${h} L${x + w + arm} ${cy} L${x + arm} 0 Z" fill="${color}" fill-opacity="${op}"/>`;
  return `<div style="position:absolute;top:0;${pos};width:360px;height:${h}px;overflow:hidden;pointer-events:none;">
<svg width="360" height="${h}" viewBox="0 0 360 ${h}" fill="none" xmlns="http://www.w3.org/2000/svg"><g${flip}>
${chev(X0, 96, 26, 1)}
${chev(X0 + STEP, 96, 30, 0.72)}
${chev(X0 + STEP * 2, 96, 22, 0.45)}
</g></svg></div>`;
}

/**
 * Anillos concéntricos — la textura real de los banners v2.
 * Geometría copiada de PromoBanner.tsx `orbit` (líneas 463-472): diámetros
 * 124/188/252, borde 1.5px, opacidades 0.22/0.16/0.10, centro común, + dots
 * orbitando. Escalado al alto del banner de correo.
 */
function rings(rgb: string, side: "left" | "right", h: number = V2_HEIGHT): string {
  const anchor = side === "right" ? "right" : "left";
  const cx = 118; // centro común de los anillos, desde el borde `anchor`
  const ring = (d: number, i: number): string =>
    `<div style="position:absolute;${anchor}:${cx - d / 2}px;top:50%;margin-top:-${d / 2}px;width:${d}px;height:${d}px;border-radius:50%;border:1.5px solid rgba(255,255,255,${(0.22 - i * 0.06).toFixed(2)});pointer-events:none;"></div>`;
  const dot = (off: number, top: number, size: number, bg: string, extra = ""): string =>
    `<div style="position:absolute;${anchor}:${off}px;top:${top}px;width:${size}px;height:${size}px;border-radius:50%;background:${bg};${extra}pointer-events:none;"></div>`;
  const mid = Math.round(h / 2);
  return `<div style="position:absolute;top:0;${anchor}:0;width:280px;height:${h}px;overflow:hidden;pointer-events:none;">
<div style="position:absolute;${anchor}:${cx - 130}px;top:50%;margin-top:-130px;width:260px;height:260px;border-radius:50%;background:radial-gradient(closest-side,rgba(${rgb},0.30) 0%,rgba(${rgb},0) 70%);pointer-events:none;"></div>
${[124, 188, 252].map(ring).join("\n")}
${dot(cx - 94 + 8, mid - 60, 9, "#FFFFFF", `box-shadow:0 0 10px rgba(${rgb},0.8);`)}
${dot(cx + 74, mid + 44, 7, "rgba(255,255,255,0.8)")}
${dot(cx - 126 + 4, mid + 18, 5, "#AE8EFF")}
</div>`;
}

/** Sheen superior. */
const SHEEN = `<div style="position:absolute;top:0;left:0;right:0;height:48px;background:linear-gradient(180deg,rgba(255,255,255,0.13) 0%,rgba(255,255,255,0) 100%);pointer-events:none;"></div>`;

/** Pill de contexto (fondo negro translúcido). */
const PILL = `<span style="display:inline-block;background:rgba(0,0,0,0.22);border-radius:999px;padding:6px 15px;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.06em;color:#FFFFFF;white-space:nowrap;">{{ PILL }}</span>`;

/** Bloque de copy placeholder: pill + TÍTULO + bajada, alineado a `align`. */
function copyV2(align: "left" | "center"): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="${align}">${PILL}</td></tr>
<tr><td height="10" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:21px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;color:#FFFFFF;">{{ Título del correo }}</td></tr>
<tr><td height="6" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:13px;font-weight:500;line-height:1.45;color:rgba(255,255,255,0.86);">{{ Bajada breve del correo va aquí }}</td></tr>
</table>`;
}

/** Marca vertical: ícono «¡CON TODO!» arriba + wordmark debajo, alineado a `align`. */
function brandStack(s: ToneStyle, align: "left" | "center", iconW = 140): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ""}>
<tr><td align="${align}">${conTodo(iconW)}</td></tr>
<tr><td height="10" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}">${wordmarkTinted(align, s.sub, s.powered, s.poweredBrand)}</td></tr></table>`;
}

/** Strip de acento inferior (4px). */
const STRIP = `<tr><td height="4" bgcolor="#ed8936" style="background-image:linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%);font-size:1px;line-height:1px;">&nbsp;</td></tr>`;

// ─── Ensamblado ───────────────────────────────────────────────────────────────

/** Envuelve las capas de fondo + el contenido en la tabla de 600 con strip. */
function shell(s: ToneStyle, id: string, label: string, bgLayers: string, content: string, height: number): string {
  return `<!-- Tipología V2: ${label} (${id}) — Concorde -->
<table border="0" width="${V2_WIDTH}" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;">
<tr><td bgcolor="${s.bgFallback}" style="background-color:${s.bgFallback};background-image:${s.bg};padding:0;">
<div style="position:relative;width:${V2_WIDTH}px;height:${height}px;overflow:hidden;">
${bgLayers}
${SHEEN}
<table border="0" cellpadding="0" cellspacing="0" width="100%" height="${height}" style="position:relative;"><tr>
${content}
</tr></table>
</div>
</td></tr>
${STRIP}
</table>`;
}

/**
 * Banner V2 según su layout, sobre el gradiente del tono con chevrons/glow de
 * fondo. Sin foto, sin contador — misma marca de la Opción 1.
 */
/**
 * Alto real del banner según su layout. `center` apila ícono + wordmark + pill +
 * título + bajada en vertical, así que necesita bastante más que los de una fila.
 */
export function v2Height(t: V2Tipo): number {
  if (t.layout === "center") return 300;
  if (t.layout === "stacked") return 230;
  return V2_HEIGHT;
}

export function buildV2Banner(t: V2Tipo, tone: V2Tone = t.tone): string {
  const s = V2_TONE[tone];
  const H = v2Height(t);

  // text-left — copy izq, marca der. Chevrons a la izq (detrás del copy), anillos a la der.
  if (t.layout === "text-left") {
    const bg = `${chevrons(s.chevron, "left", H)}${rings(s.glow, "right", H)}`;
    const content = `<td valign="middle" align="left" style="padding:0 8px 0 30px;">${copyV2("left")}</td>
<td valign="middle" width="180" align="right" style="padding:0 30px 0 12px;">${brandStack(s, "left")}</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // brand-left — marca izq, copy der. Chevrons a la der, anillos a la izq.
  if (t.layout === "brand-left") {
    const bg = `${chevrons(s.chevron, "right", H)}${rings(s.glow, "left", H)}`;
    const content = `<td valign="middle" width="180" align="left" style="padding:0 18px 0 30px;">${brandStack(s, "left")}</td>
<td valign="middle" align="left" style="padding:0 30px 0 4px;">${copyV2("left")}</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // center — todo centrado: marca arriba + copy debajo. Chevrons a ambos lados + anillos izq.
  if (t.layout === "center") {
    const bg = `${chevrons(s.chevron, "right", H)}${chevrons(s.chevron, "left", H)}${rings(s.glow, "left", H)}`;
    const content = `<td valign="middle" align="center" style="padding:26px 40px;">
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center">${conTodo(124)}</td></tr>
<tr><td height="8" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center">${wordmarkTinted("center", s.sub, s.powered, s.poweredBrand)}</td></tr>
<tr><td height="18" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center">${copyV2("center")}</td></tr></table>
</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // stacked — copy arriba + franja de marca (logo + ícono horizontal) abajo.
  if (t.layout === "stacked") {
    const bg = `${chevrons(s.chevron, "right", H)}${rings(s.glow, "right", H)}`;
    const content = `<td valign="top" style="padding:24px 30px 0;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td>${copyV2("left")}</td></tr>
<tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td><table border="0" cellpadding="0" cellspacing="0"><tr>
<td valign="middle" style="padding-right:14px;">${conTodo(96)}</td>
<td valign="middle">${wordmarkTinted("left", s.sub, s.powered, s.poweredBrand)}</td>
</tr></table></td></tr></table>
</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // icon-right — copy izq + ícono «¡CON TODO!» grande a la derecha (sin wordmark).
  const bg = `${chevrons(s.chevron, "right", H)}${rings(s.glow, "right", H)}`;
  const content = `<td valign="middle" align="left" style="padding:0 8px 0 30px;">${copyV2("left")}</td>
<td valign="middle" width="200" align="center" style="padding:0 30px 0 12px;">${conTodo(180)}</td>`;
  return shell(s, t.id, t.label, bg, content, H);
}

/**
 * Envuelve contenido ARBITRARIO (p. ej. las tipologías C/E de la Opción 1, que
 * traen sus propios assets de marca) sobre el fondo V2 de un tono: gradiente +
 * chevrons + anillos + sheen, con el mismo shell y strip que los banners V2.
 *
 * `content` debe ser el interior de un <tr> (una o más celdas <td>), igual que
 * el `content` que arma buildV2Banner.
 */
export function v2Backdrop(tone: V2Tone, id: string, label: string, content: string, height: number): string {
  const s = V2_TONE[tone];
  const bg = `${chevrons(s.chevron, "left", height)}${rings(s.glow, "right", height)}`;
  return shell(s, id, label, bg, content, height);
}

/** Documento HTML para previsualizar el banner V2 en un iframe. */
export function wrapV2Preview(inner: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
</head><body style="background-color:#FAFAFA;margin:0;padding:0;"><center>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
${inner}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
</center></body></html>`;
}
