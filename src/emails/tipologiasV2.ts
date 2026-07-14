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
 * chevrons y glows se hacen con SVG/gradientes en divs posicionados; en clientes
 * viejos degradan al bgcolor plano del tono.
 */

import { conTodo, wordmarkTinted } from "./tipologiasBanners";

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
  tone: V2Tone;
  layout: V2Layout;
}

export const TIPOLOGIAS_V2: V2Tipo[] = [
  {
    id: "v2-en-vivo",
    label: "V2 · En Vivo",
    descripcion: "Texto a la izquierda, marca a la derecha, sobre gradiente naranja En Vivo con chevrons y glow cálido.",
    tone: "live",
    layout: "text-left",
  },
  {
    id: "v2-proximas",
    label: "V2 · Morado",
    descripcion: "Marca a la izquierda, texto a la derecha, sobre gradiente morado profundo con chevrons lila.",
    tone: "proximas",
    layout: "brand-left",
  },
  {
    id: "v2-negociable",
    label: "V2 · Negociable",
    descripcion: "Todo centrado (marca arriba + copy debajo), sobre gradiente teal Negociable con chevrons y glow frío.",
    tone: "negotiable",
    layout: "center",
  },
  {
    id: "v2-coins",
    label: "V2 · SubasCoins",
    descripcion: "Apilado: copy arriba y la franja de marca (logo + ícono) abajo, sobre gradiente ámbar SubasCoins (#F5921E→#E15F2B).",
    tone: "coins",
    layout: "stacked",
  },
  {
    id: "v2-dark",
    label: "V2 · Dark",
    descripcion: "Copy a la izquierda + ícono «¡CON TODO!» grande a la derecha, sobre morado profundo casi negro con chevrons sutiles.",
    tone: "dark",
    layout: "icon-right",
  },
];

// ─── Tonos ────────────────────────────────────────────────────────────────────

interface ToneStyle {
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

const TONE: Record<V2Tone, ToneStyle> = {
  live: {
    bg: "linear-gradient(105deg,#E8732A 0%,#C85A1E 100%)",
    bgFallback: "#D8681F",
    chevron: "rgba(255,255,255,0.16)",
    glow: "255,226,194",
    sub: "#FFE2C2",
    powered: "rgba(255,255,255,0.78)",
    poweredBrand: "#FFFFFF",
  },
  proximas: {
    bg: "linear-gradient(105deg,#5F3ED8 0%,#3D2299 55%,#2A1670 100%)",
    bgFallback: "#3D2299",
    chevron: "rgba(255,255,255,0.14)",
    glow: "174,142,255",
    sub: "#B9A7EA",
    powered: "#8E7CC3",
    poweredBrand: "#B9A7EA",
  },
  negotiable: {
    bg: "linear-gradient(105deg,#00D2D3 0%,#00939B 60%,#2A1670 100%)",
    bgFallback: "#00939B",
    chevron: "rgba(255,255,255,0.18)",
    glow: "178,246,246",
    sub: "#CFFBFB",
    powered: "rgba(255,255,255,0.82)",
    poweredBrand: "#FFFFFF",
  },
  coins: {
    bg: "linear-gradient(110deg,#F5921E 0%,#EB7A24 45%,#E15F2B 100%)",
    bgFallback: "#EB7A24",
    chevron: "rgba(255,255,255,0.18)",
    glow: "255,226,194",
    sub: "#FFE2C2",
    powered: "rgba(255,255,255,0.82)",
    poweredBrand: "#FFFFFF",
  },
  dark: {
    bg: "linear-gradient(160deg,#3A3450 0%,#221D33 55%,#140046 100%)",
    bgFallback: "#221D33",
    chevron: "rgba(255,255,255,0.10)",
    glow: "132,96,229",
    sub: "#B9A7EA",
    powered: "#8E7CC3",
    poweredBrand: "#B9A7EA",
  },
};

// ─── Piezas email-safe ────────────────────────────────────────────────────────

/** Chevrons grandes del bg (formas Voyager) hacia `side`, como capa decorativa. */
function chevrons(color: string, side: "left" | "right"): string {
  const flip = side === "left" ? ' transform="scale(-1,1) translate(-340,0)"' : "";
  const pos = side === "right" ? "right:0" : "left:0";
  return `<div style="position:absolute;top:0;${pos};width:340px;height:${V2_HEIGHT}px;overflow:hidden;pointer-events:none;">
<svg width="340" height="${V2_HEIGHT}" viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg"><g${flip}>
<path d="M70 24 L150 95 L70 166" stroke="${color}" stroke-width="26" fill="none"/>
<path d="M150 24 L230 95 L150 166" stroke="${color}" stroke-width="30" fill="none"/>
<path d="M232 24 L312 95 L232 166" stroke="${color}" stroke-width="22" fill="none"/>
</g></svg></div>`;
}

/** Glow radial detrás de la marca. */
function glow(rgb: string, side: "left" | "right"): string {
  const pos = side === "right" ? "right:-70px" : "left:-70px";
  return `<div style="position:absolute;${pos};top:50%;margin-top:-160px;width:320px;height:320px;border-radius:50%;background:radial-gradient(closest-side,rgba(${rgb},0.30) 0%,rgba(${rgb},0) 70%);pointer-events:none;"></div>`;
}

/** Dots + ring sutiles (textura). */
function dots(): string {
  return `<div style="position:absolute;left:46%;top:24px;width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.30);pointer-events:none;"></div>
<div style="position:absolute;left:54%;bottom:28px;width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,0.22);pointer-events:none;"></div>`;
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
/** Alto real del banner según su layout (los apilados/centrados miden más). */
export function v2Height(t: V2Tipo): number {
  return t.layout === "center" || t.layout === "stacked" ? 230 : V2_HEIGHT;
}

export function buildV2Banner(t: V2Tipo): string {
  const s = TONE[t.tone];
  const H = v2Height(t);

  // text-left — copy izq, marca der. Chevrons a la izq (detrás del copy), glow a la der.
  if (t.layout === "text-left") {
    const bg = `${chevrons(s.chevron, "left")}${glow(s.glow, "right")}${dots()}`;
    const content = `<td valign="middle" align="left" style="padding:0 8px 0 30px;">${copyV2("left")}</td>
<td valign="middle" width="180" align="right" style="padding:0 30px 0 12px;">${brandStack(s, "left")}</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // brand-left — marca izq, copy der. Chevrons a la der, glow a la izq.
  if (t.layout === "brand-left") {
    const bg = `${chevrons(s.chevron, "right")}${glow(s.glow, "left")}${dots()}`;
    const content = `<td valign="middle" width="180" align="left" style="padding:0 18px 0 30px;">${brandStack(s, "left")}</td>
<td valign="middle" align="left" style="padding:0 30px 0 4px;">${copyV2("left")}</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // center — todo centrado: marca arriba + copy debajo. Chevrons a ambos lados suaves.
  if (t.layout === "center") {
    const bg = `${chevrons(s.chevron, "right")}${chevrons(s.chevron, "left")}${glow(s.glow, "left")}`;
    const content = `<td valign="middle" align="center" style="padding:22px 40px;">
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center">${conTodo(150)}</td></tr>
<tr><td height="8" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center">${wordmarkTinted("center", s.sub, s.powered, s.poweredBrand)}</td></tr>
<tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center">${copyV2("center")}</td></tr></table>
</td>`;
    return shell(s, t.id, t.label, bg, content, H);
  }

  // stacked — copy arriba + franja de marca (logo + ícono horizontal) abajo.
  if (t.layout === "stacked") {
    const bg = `${chevrons(s.chevron, "right")}${glow(s.glow, "right")}${dots()}`;
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
  const bg = `${chevrons(s.chevron, "right")}${glow(s.glow, "right")}${dots()}`;
  const content = `<td valign="middle" align="left" style="padding:0 8px 0 30px;">${copyV2("left")}</td>
<td valign="middle" width="200" align="center" style="padding:0 30px 0 12px;">${conTodo(180)}</td>`;
  return shell(s, t.id, t.label, bg, content, H);
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
