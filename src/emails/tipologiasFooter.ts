/**
 * Footer «Centro de Ayuda» — módulo plano (sin "use client").
 *
 * Clonado TAL CUAL de «Footer — Centro de Ayuda VOYAGER v1.svg» (600×214):
 *   · Fondo del tono (gradiente paint0) + anillos a la IZQUIERDA + glow + chevron
 *     stroke con gradiente (paint1).
 *   · Un PANEL GLASS grande (rect 568×186, rx20) con backdrop-blur(12px), relleno
 *     translúcido (paint2: white 20%→8%→5%) y borde de gradiente (paint3:
 *     #CFBAFF→white→#AE8EFF→#CFBAFF, 1.2px) + sombra e inner-shadow blanco.
 *   · Dentro, a la IZQUIERDA: título, divisor 1px, «¿Quieres saber más?»,
 *     «¡Visita nuestro Centro de Ayuda!» y un BOTÓN GLASS «¡Vamos!» (rect 98×40
 *     rx20, backdrop-blur(5px), borde gradiente teal→morado paint7).
 *   · A la DERECHA: el logo real vmc SUBASTAS (PNG).
 *
 * El panel y el botón son GLASS (se ve a través): el gradiente va SOLO en el
 * borde (técnica mask-composite), como en el SVG. Cada tono cambia el fondo; el
 * cristal se adapta.
 */

import { LOGO_CORREOS, wrapTipoPreview } from "./tipologiasNew";

export const FOOTER_WIDTH = 600;
export const FOOTER_HEIGHT = 214;

/** Estilo de fondo del footer por tono (gradiente + glows). */
export interface FooterStyle {
  /** paint0 clonado del SVG (userSpaceOnUse). */
  bgSvgGradient: string;
  /** Fallback plano. */
  bgFallback: string;
  /** Glows difusos {hex, op, x, y, r}. */
  glows: Array<{ hex: string; op: number; x: number; y: number; r: number }>;
}

// ─── Anillos IZQUIERDA — cx=0 (asoman por el borde izquierdo) ────────────────────
// SVG: (0,63) r159.4 op0.12 · (0,29) r119.4 op0.16 · (0,29) r81.9 op0.10, 1.2px.
const FOOTER_RINGS = `<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
<div style="position:absolute;left:${0 - 159.4}px;top:${63 - 159.4}px;width:${2 * 159.4}px;height:${2 * 159.4}px;border-radius:50%;border:1.2px solid rgba(255,255,255,0.12);"></div>
<div style="position:absolute;left:${0 - 119.4}px;top:${29 - 119.4}px;width:${2 * 119.4}px;height:${2 * 119.4}px;border-radius:50%;border:1.2px solid rgba(255,255,255,0.16);"></div>
<div style="position:absolute;left:${0 - 81.9}px;top:${29 - 81.9}px;width:${2 * 81.9}px;height:${2 * 81.9}px;border-radius:50%;border:1.2px solid rgba(255,255,255,0.1);"></div>
</div>`;

// ─── Chevron stroke con gradiente (paint1) — asoma por la derecha ────────────────
// paint1: white → #4DDCDC(25%) → #6445DF(75%) → white. 2px. Forma `>`.
const FOOTER_CHEVRON = `<svg width="${FOOTER_WIDTH}" height="${FOOTER_HEIGHT}" viewBox="0 0 ${FOOTER_WIDTH} ${FOOTER_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;overflow:visible;pointer-events:none;opacity:0.7;">
<defs><linearGradient id="footChev" x1="161.324" y1="318.712" x2="476.314" y2="508.553" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.25" stop-color="#4DDCDC"/><stop offset="0.75" stop-color="#6445DF"/><stop offset="1" stop-color="white"/></linearGradient></defs>
<path d="M309.976 150.363L452.761 293.147C474.542 314.928 509.856 314.928 531.637 293.147C553.419 271.366 553.42 236.051 531.638 214.269L434.67 117.301L541.99 9.98124C562.529 -10.5578 562.529 -43.8572 541.99 -64.3962C521.451 -84.9351 488.151 -84.9356 467.612 -64.3969L309.976 93.2389C294.202 109.013 294.202 134.588 309.976 150.363Z" stroke="url(#footChev)" stroke-width="2"/>
</svg>`;

function glowLayers(glows: FooterStyle["glows"]): string {
  return glows
    .map(
      (g) =>
        `<div style="position:absolute;left:${g.x - g.r}px;top:${g.y - g.r}px;width:${2 * g.r}px;height:${2 * g.r}px;border-radius:50%;background:radial-gradient(closest-side,${g.hex} 0%,rgba(0,0,0,0) 100%);opacity:${g.op};pointer-events:none;"></div>`,
    )
    .join("\n");
}

/** Borde de gradiente vía mask-composite (pinta SOLO el ring de `width`px). */
function gradientBorder(gradient: string, radius: number, width: number): string {
  return `<div style="position:absolute;inset:0;border-radius:${radius}px;padding:${width}px;background:${gradient};-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;"></div>`;
}

// ─── El panel GLASS grande (rect 568×186 rx20) ──────────────────────────────────
// paint2 (relleno): white 20% → 8%(50%) → 5%, eje casi vertical (433,187.5)→(393.8,-19.8).
// paint3 (borde): #CFBAFF → white(35%) → #AE8EFF(65%) → #CFBAFF ≈ 40°, 1.2px.
function glassPanel(inner: string): string {
  // Cristal como en Figma: se ve el fondo a través, pero el panel queda «oscurito»
  // (no lechoso ni muy live). Lo logramos con DOS capas:
  //   1) un tinte OSCURO translúcido (rgba morado/negro bajo) que apaga el naranja
  //      vivo del fondo — es lo que da el matiz oscuro del glass en Figma.
  //   2) un velo blanco sutil (paint2) encima, sólo para el brillo del vidrio.
  // Más el backdrop-blur(12) e inner-shadow blanco 35% (el brillo del borde sup).
  const darkTint =
    "linear-gradient(190deg,rgba(20,4,40,0.22) 0%,rgba(20,4,40,0.16) 55%,rgba(20,4,40,0.12) 100%)";
  const sheen =
    "linear-gradient(190deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.03) 100%)";
  return `<div style="position:absolute;left:7px;top:14px;width:568px;height:186px;border-radius:20px;background:${sheen},${darkTint};-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(26,0,51,0.28),inset 0 1px 8px rgba(255,255,255,0.35);">
${gradientBorder(border20(), 20, 1.2)}
${inner}
</div>`;
}

/** paint3: #CFBAFF → white(35%) → #AE8EFF(65%) → #CFBAFF ≈ 40°. */
function border20(): string {
  return "linear-gradient(40deg,#CFBAFF 0%,#FFFFFF 35%,#AE8EFF 65%,#CFBAFF 100%)";
}

// ─── El botón GLASS «¡Vamos!» (rect 98×40 rx20) ─────────────────────────────────
// paint5+paint6 (relleno): white 18%/35% → 8% → 3%/0% vertical.
// paint7 (borde): white → #4DDCDC(25%) → #6445DF(75%) → white ≈ 33°, 1.5px.
function glassButton(): string {
  const fill =
    "linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.06) 45%,rgba(255,255,255,0.02) 100%)";
  const border = "linear-gradient(33deg,#FFFFFF 0%,#4DDCDC 25%,#6445DF 75%,#FFFFFF 100%)";
  return `<div style="position:absolute;left:24px;top:131px;width:98px;height:40px;border-radius:20px;background:${fill};-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);box-shadow:0 8px 24px rgba(0,0,0,0.10),inset 0 1px 3px rgba(255,255,255,0.45);display:flex;align-items:center;justify-content:center;">
${gradientBorder(border, 20, 1.5)}
<span style="position:relative;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;white-space:nowrap;">¡Vamos!</span>
</div>`;
}

// ─── Marca vmc SUBASTAS a la derecha ────────────────────────────────────────────
// En el SVG el logo va a la derecha (glifos x≈369-551, barra en y≈120). El PNG lo
// anclamos a la derecha del banner, centrado en vertical con el bloque de texto.
function footerLogo(): string {
  // Logo 186×105 (Hug de Figma), MÁS a la derecha (right:20), pegado al borde del
  // panel como en Figma.
  return `<img src="${LOGO_CORREOS}" alt="vmc Subastas — powered by SUBASTOP .Co" style="position:absolute;right:20px;top:50%;transform:translateY(-50%);width:186px;height:auto;border:0;display:block;">`;
}

// ─── Contenido de la IZQUIERDA (coords absolutas del banner) ────────────────────
// Todo SUBIDO para que el bloque (título → divisor → ¿Quieres? → Centro → botón)
// quede centrado en el panel (y=14..200) con aire abajo y el botón NO se salga.
// left:24 (pegado al borde interno) como en Figma.
function footerCopy(): string {
  return `<div style="position:absolute;left:24px;top:42px;width:340px;text-align:left;">
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;line-height:1.2;white-space:nowrap;">¡Despierta al cazador de ofertas que hay en ti!</div>
</div>
<div style="position:absolute;left:24px;top:61px;width:305px;height:1px;background:#D1D5DC;opacity:0.55;"></div>
<div style="position:absolute;left:24px;top:78px;width:340px;text-align:left;">
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:17px;font-weight:700;color:#FFFFFF;line-height:1.2;white-space:nowrap;">¿Quieres saber más?</div>
<div style="height:7px;line-height:7px;font-size:1px;">&nbsp;</div>
<div style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;color:rgba(255,255,255,0.92);line-height:1.2;white-space:nowrap;">¡Visita nuestro Centro de Ayuda!</div>
</div>`;
}

/** Alto real del footer (el SVG mide 214). */
export function footerHeight(): number {
  return FOOTER_HEIGHT;
}

/** Construye el footer de un tono. */
export function buildFooter(id: string, style: FooterStyle): string {
  const uid = `footBg_${id.replace(/[^a-z0-9]/gi, "")}`;
  const bgSvgLayer = `<svg width="${FOOTER_WIDTH}" height="${FOOTER_HEIGHT}" viewBox="0 0 ${FOOTER_WIDTH} ${FOOTER_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;inset:0;display:block;"><defs>${style.bgSvgGradient.replace(/id="[^"]*"/, `id="${uid}"`)}</defs><rect width="${FOOTER_WIDTH}" height="${FOOTER_HEIGHT}" fill="url(#${uid})"/></svg>`;
  // El logo va DENTRO del panel; el copy y el botón también. Todo en absoluto.
  const panelInner = `${footerCopy()}${footerLogo()}${glassButton()}`;
  return `<!-- Footer: Centro de Ayuda (${id}) — Concorde -->
<table border="0" width="${FOOTER_WIDTH}" cellspacing="0" cellpadding="0" align="center" style="border-collapse:separate;">
<tr><td bgcolor="${style.bgFallback}" style="background-color:${style.bgFallback};padding:0;border-radius:18px;">
<div style="position:relative;width:${FOOTER_WIDTH}px;height:${FOOTER_HEIGHT}px;overflow:hidden;border-radius:18px;">
${bgSvgLayer}
${glowLayers(style.glows)}
${FOOTER_RINGS}
${FOOTER_CHEVRON}
${glassPanel(panelInner)}
</div>
</td></tr>
</table>`;
}

// ─── Estilos de fondo por tono (mismos gradientes que los banners) ──────────────

const FOOTER_EN_VIVO: FooterStyle = {
  // paint0 del SVG: #FF9639 → #EF852E(50%) → #BE3D00, eje (101.764,-112.87)→(539.155,281.485).
  bgSvgGradient: `<linearGradient id="footBg" x1="101.764" y1="-112.87" x2="539.155" y2="281.485" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9639"/><stop offset="0.5" stop-color="#EF852E"/><stop offset="1" stop-color="#BE3D00"/></linearGradient>`,
  bgFallback: "#EF852E",
  // filter0_f #ED8936 0.3 (538,111) r160 · filter4_f #ED8936 0.3 (-94,-28) r160.
  glows: [
    { hex: "#ED8936", op: 0.3, x: 538, y: 111, r: 160 },
    { hex: "#ED8936", op: 0.3, x: -94, y: -28, r: 160 },
  ],
};

const FOOTER_MORADO: FooterStyle = {
  bgSvgGradient: `<linearGradient id="footBg" x1="101.764" y1="-112.87" x2="539.155" y2="281.485" gradientUnits="userSpaceOnUse"><stop stop-color="#2E0F70"/><stop offset="0.5" stop-color="#5F3ED8"/><stop offset="1" stop-color="#8460E5"/></linearGradient>`,
  bgFallback: "#5F3ED8",
  glows: [
    { hex: "#AE8EFF", op: 0.3, x: 538, y: 111, r: 160 },
    { hex: "#7A50E0", op: 0.35, x: -94, y: -28, r: 160 },
  ],
};

const FOOTER_NEGOCIABLE: FooterStyle = {
  bgSvgGradient: `<linearGradient id="footBg" x1="0" y1="107" x2="600" y2="107" gradientUnits="userSpaceOnUse"><stop stop-color="#00DAE0"/><stop offset="1" stop-color="#008688"/></linearGradient>`,
  bgFallback: "#00A6A8",
  glows: [
    { hex: "#8460E5", op: 0.3, x: 538, y: 111, r: 160 },
    { hex: "#17C2A6", op: 0.35, x: -94, y: -28, r: 160 },
  ],
};

const FOOTER_SUBASCOINS: FooterStyle = {
  bgSvgGradient: `<linearGradient id="footBg" x1="101.764" y1="-112.87" x2="539.155" y2="281.485" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.221154" stop-color="#F4AC59"/><stop offset="0.745192" stop-color="#8460E5"/><stop offset="1" stop-color="white"/></linearGradient>`,
  bgFallback: "#B58BC0",
  glows: [
    { hex: "#8460E5", op: 0.3, x: 538, y: 111, r: 160 },
    { hex: "#FFC53D", op: 0.4, x: -94, y: -28, r: 160 },
  ],
};

const FOOTER_DARK: FooterStyle = {
  bgSvgGradient: `<linearGradient id="footBg" x1="-180" y1="149.8" x2="33.0581" y2="508.215" gradientUnits="userSpaceOnUse"><stop stop-color="#0E0524"/><stop offset="0.5" stop-color="#1A0B3D"/><stop offset="1" stop-color="#2C165E"/></linearGradient>`,
  bgFallback: "#1A0B3D",
  glows: [
    { hex: "#6E4BD6", op: 0.35, x: 538, y: 111, r: 160 },
    { hex: "#3B1782", op: 0.4, x: -94, y: -28, r: 160 },
  ],
};

/** Un tono del footer (id + label + estilo de fondo). */
export interface FooterTone {
  id: string;
  label: string;
  style: FooterStyle;
}

/** Los 5 tonos del footer (mismo eje de tonos que los banners). */
export const FOOTER_TONOS: FooterTone[] = [
  { id: "en-vivo", label: "En Vivo", style: FOOTER_EN_VIVO },
  { id: "morado", label: "Morado", style: FOOTER_MORADO },
  { id: "negociable", label: "Negociable", style: FOOTER_NEGOCIABLE },
  { id: "subascoins", label: "SubasCoins", style: FOOTER_SUBASCOINS },
  { id: "dark", label: "Dark", style: FOOTER_DARK },
];

/** Documento HTML para previsualizar el footer en un iframe. */
export function wrapFooterPreview(inner: string, title: string): string {
  return wrapTipoPreview(inner, title);
}

// ════════════════════════════════════════════════════════════════════════════
// LEGACY — footers V2 (consola/centrado/franja/split) usados por el Editor/Lab.
// Se conservan para no romper headerSwap.ts (FOOTER_OPTIONS). El footer nuevo de
// arriba (buildFooter/FOOTER_TONOS) es el clonado del SVG «Centro de Ayuda».
// ════════════════════════════════════════════════════════════════════════════

import { v2Backdrop, V2_TONE, type V2Tone } from "./tipologiasV2";
import { conTodo } from "./tipologiasBrand";

const L_FONT = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";
const L_HELP_URL = "https://ayuda.vmcsubastas.com/es/collections/3079940-centro-de-ayuda-comprador";
const L_TAGLINE = "¡Despierta al cazador de ofertas que hay en ti!";

const LG_STRIPE = "linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%)";
const LB_PRIMARY = "linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%)";
const LG_PRIMARY = "linear-gradient(135deg,#ed8936 0%,#8460e5 100%)";
const L_GLOW_PRIMARY = "rgba(237,137,54,0.3) 0 2px 6px";
const L_TXT_SHADOW = "rgba(0,0,0,0.25) 0 1px 3px";
const LB_GLASS_EDGE = "linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%)";
const L_GLASS_SHEEN = "linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%)";

function legacyVamosBtn(align: "left" | "right" | "center"): string {
  return `<a href="${L_HELP_URL}" target="_blank" style="text-decoration:none;"><table border="0" cellspacing="0" cellpadding="0" align="${align}" style="border-radius:9999px;background-image:${LB_PRIMARY};box-shadow:${L_GLOW_PRIMARY};"><tr><td style="padding:2px;"><table border="0" width="140" cellspacing="0" cellpadding="0"><tr><td width="140" height="38" bgcolor="#3b1782" style="border-radius:9999px;background-image:${LG_PRIMARY};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);font-family:${L_FONT};font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:${L_TXT_SHADOW};" align="center" valign="middle"><b>¡Vamos!</b></td></tr></table></td></tr></table></a>`;
}

function legacyMiniRule(align: "left" | "center"): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="36" align="${align}" style="border-radius:2px;background-image:${LG_STRIPE};"><tr><td height="3" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>`;
}

function legacyBrandBlock(align: "left" | "center", subColor: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ' width="100%"'}>
<tr><td align="${align}" style="font-family:${L_FONT};font-size:20px;font-weight:800;letter-spacing:-0.01em;line-height:1.2;color:#FFFFFF;">VMC Subastas</td></tr>
<tr><td height="8" align="${align}" valign="bottom">${legacyMiniRule(align)}</td></tr>
<tr><td height="5"></td></tr>
<tr><td align="${align}" style="font-family:${L_FONT};font-size:13px;font-weight:500;line-height:1.4;color:${subColor};">${L_TAGLINE}</td></tr>
</table>`;
}

function legacyHelpBlock(align: "left" | "center", subColor: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ' width="100%"'}>
<tr><td align="${align}" style="font-family:${L_FONT};font-size:15px;font-weight:800;letter-spacing:-0.01em;line-height:1.3;color:#FFFFFF;">¿Quieres saber más?</td></tr>
<tr><td height="2"></td></tr>
<tr><td align="${align}" style="font-family:${L_FONT};font-size:12px;font-weight:500;line-height:1.4;color:${subColor};">¡Visita nuestro <b style="color:#FFFFFF;">Centro de Ayuda!</b></td></tr>
</table>`;
}

const L_HAIRLINE = `<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td height="12"></td></tr>
<tr><td height="1" style="background-color:rgba(255,255,255,0.28);font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td height="12"></td></tr>
</table>`;

function legacyGlassPanel(inner: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:18px;background-image:${LB_GLASS_EDGE};"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-radius:17px;background-color:rgba(255,255,255,0.10);background-image:${L_GLASS_SHEEN};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);padding:16px 20px;">
${inner}
</td></tr></table></td></tr></table>`;
}

export type FooterLayout = "consola" | "centrado" | "franja" | "split";

export interface FooterTipo {
  id: string;
  label: string;
  descripcion: string;
  layout: FooterLayout;
}

export const FOOTER_TIPOLOGIAS: FooterTipo[] = [
  { id: "footer-consola", label: "Footer · Consola", descripcion: "La consola glass del footer actual (marca + ícono, ayuda + ¡Vamos!), pero sobre el fondo V2 del tono elegido.", layout: "consola" },
  { id: "footer-centrado", label: "Footer · Centrado", descripcion: "Todo centrado y sin glass: marca arriba, tagline, la invitación al Centro de Ayuda y el botón ¡Vamos! debajo.", layout: "centrado" },
  { id: "footer-franja", label: "Footer · Franja", descripcion: "El más compacto: una sola franja con «¿Quieres saber más?» a la izquierda y el botón ¡Vamos! a la derecha.", layout: "franja" },
  { id: "footer-split", label: "Footer · Split", descripcion: "Dos columnas sin glass: marca + tagline a la izquierda; Centro de Ayuda + ¡Vamos! a la derecha.", layout: "split" },
];

/** Alto del footer legacy según su layout. */
export function legacyFooterHeight(f: FooterTipo): number {
  if (f.layout === "consola") return 230;
  if (f.layout === "centrado") return 264;
  if (f.layout === "franja") return 118;
  return 170;
}

export function buildFooterBanner(f: FooterTipo, tone: V2Tone): string {
  const s = V2_TONE[tone];
  const H = legacyFooterHeight(f);

  if (f.layout === "consola") {
    const inner = `<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">${legacyBrandBlock("left", s.sub)}</td>
<td width="16"></td>
<td width="150" valign="middle" align="right">${conTodo(150)}</td>
</tr></table>
${L_HAIRLINE}
<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">${legacyHelpBlock("left", s.sub)}</td>
<td width="14"></td>
<td width="146" valign="middle" align="right">${legacyVamosBtn("right")}</td>
</tr></table>`;
    const content = `<td valign="middle" style="padding:18px 22px;">${legacyGlassPanel(inner)}</td>`;
    return v2Backdrop(tone, f.id, f.label, content, H);
  }

  if (f.layout === "centrado") {
    const content = `<td valign="middle" align="center" style="padding:26px 40px;">
<table border="0" cellpadding="0" cellspacing="0" align="center">
<tr><td align="center">${legacyBrandBlock("center", s.sub)}</td></tr>
<tr><td height="16"></td></tr>
<tr><td align="center">${legacyHelpBlock("center", s.sub)}</td></tr>
<tr><td height="16"></td></tr>
<tr><td align="center">${legacyVamosBtn("center")}</td></tr>
</table>
</td>`;
    return v2Backdrop(tone, f.id, f.label, content, H);
  }

  if (f.layout === "franja") {
    const content = `<td valign="middle" style="padding:0 8px 0 30px;">${legacyHelpBlock("left", s.sub)}</td>
<td valign="middle" width="160" align="right" style="padding:0 30px 0 12px;">${legacyVamosBtn("right")}</td>`;
    return v2Backdrop(tone, f.id, f.label, content, H);
  }

  const content = `<td valign="middle" style="padding:0 8px 0 30px;">${legacyBrandBlock("left", s.sub)}</td>
<td valign="middle" width="220" align="right" style="padding:0 30px 0 12px;">
<table border="0" cellpadding="0" cellspacing="0" align="right">
<tr><td align="left">${legacyHelpBlock("left", s.sub)}</td></tr>
<tr><td height="12"></td></tr>
<tr><td align="left">${legacyVamosBtn("left")}</td></tr>
</table>
</td>`;
  return v2Backdrop(tone, f.id, f.label, content, H);
}
