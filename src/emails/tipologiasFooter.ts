/**
 * Tipologías de FOOTER «Centro de Ayuda» — módulo plano (sin "use client").
 *
 * El footer real de los correos de producción (glassFooter en
 * prodEmailTemplates.ts) es la consola glass con: marca «VMC Subastas» +
 * tagline «¡Despierta al cazador…!» + ícono «¡CON TODO!» + «¿Quieres saber
 * más? ¡Visita nuestro Centro de Ayuda!» + botón ¡Vamos!.
 *
 * Estas tipologías reordenan ESAS MISMAS piezas (los textos, el ícono real del
 * CDN y el botón con su URL real de ayuda) en 4 layouts, sobre el fondo V2
 * (gradiente + chevrons + anillos) del tono elegido — el mismo sistema de
 * fondos por tab que las tipologías de banner.
 *
 * HTML email-safe (tablas anidadas + estilos inline, 600px).
 */

import { v2Backdrop, V2_TONE, type V2Tone } from "./tipologiasV2";
import { conTodo } from "./tipologiasBrand";

// ─── Piezas del footer real (mismos valores que glassFooter de producción) ────

const FONT = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";
const HELP_URL = "https://ayuda.vmcsubastas.com/es/collections/3079940-centro-de-ayuda-comprador";
const TAGLINE = "¡Despierta al cazador de ofertas que hay en ti!";

const G_STRIPE = "linear-gradient(90deg,#ed8936 0%,#8460e5 55%,#3b1782 100%)";
const B_PRIMARY = "linear-gradient(135deg,#ffffff 0%,#fbc47d 25%,#ae8eff 75%,#ffffff 100%)";
const G_PRIMARY = "linear-gradient(135deg,#ed8936 0%,#8460e5 100%)";
const GLOW_PRIMARY = "rgba(237,137,54,0.3) 0 2px 6px";
const TXT_SHADOW = "rgba(0,0,0,0.25) 0 1px 3px";
const B_GLASS_EDGE = "linear-gradient(135deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.10) 45%,rgba(255,255,255,0.40) 100%)";
const GLASS_SHEEN = "linear-gradient(180deg,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0.12) 45%,rgba(255,255,255,0.06) 100%)";

/** Botón ¡Vamos! real (glass primary, mismo markup que el footer de prod). */
function vamosBtn(align: "left" | "right" | "center"): string {
  return `<a href="${HELP_URL}" target="_blank" style="text-decoration:none;"><table border="0" cellspacing="0" cellpadding="0" align="${align}" style="border-radius:9999px;background-image:${B_PRIMARY};box-shadow:${GLOW_PRIMARY};"><tr><td style="padding:2px;"><table border="0" width="140" cellspacing="0" cellpadding="0"><tr><td width="140" height="38" bgcolor="#3b1782" style="border-radius:9999px;background-image:${G_PRIMARY};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);font-family:${FONT};font-size:14px;font-weight:700;color:#FFFFFF;text-shadow:${TXT_SHADOW};" align="center" valign="middle"><b>¡Vamos!</b></td></tr></table></td></tr></table></a>`;
}

/** Barra de acento de 36×3 (la mini-rule del footer de prod). */
function miniRule(align: "left" | "center"): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="36" align="${align}" style="border-radius:2px;background-image:${G_STRIPE};"><tr><td height="3" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>`;
}

/** Marca «VMC Subastas» + mini-rule + tagline, alineado a `align`. */
function brandBlock(align: "left" | "center", subColor: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ' width="100%"'}>
<tr><td align="${align}" style="font-family:${FONT};font-size:20px;font-weight:800;letter-spacing:-0.01em;line-height:1.2;color:#FFFFFF;">VMC Subastas</td></tr>
<tr><td height="8" align="${align}" valign="bottom">${miniRule(align)}</td></tr>
<tr><td height="5"></td></tr>
<tr><td align="${align}" style="font-family:${FONT};font-size:13px;font-weight:500;line-height:1.4;color:${subColor};">${TAGLINE}</td></tr>
</table>`;
}

/** «¿Quieres saber más?» + «¡Visita nuestro Centro de Ayuda!». */
function helpBlock(align: "left" | "center", subColor: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0"${align === "center" ? ' align="center"' : ' width="100%"'}>
<tr><td align="${align}" style="font-family:${FONT};font-size:15px;font-weight:800;letter-spacing:-0.01em;line-height:1.3;color:#FFFFFF;">¿Quieres saber más?</td></tr>
<tr><td height="2"></td></tr>
<tr><td align="${align}" style="font-family:${FONT};font-size:12px;font-weight:500;line-height:1.4;color:${subColor};">¡Visita nuestro <b style="color:#FFFFFF;">Centro de Ayuda!</b></td></tr>
</table>`;
}

/** Hairline divisoria translúcida (la del panel glass de prod). */
const HAIRLINE = `<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td height="12"></td></tr>
<tr><td height="1" style="background-color:rgba(255,255,255,0.28);font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td height="12"></td></tr>
</table>`;

/** Panel glass (borde de vidrio + sheen, mismo lenguaje del footer de prod). */
function glassPanel(inner: string): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius:18px;background-image:${B_GLASS_EDGE};"><tr><td style="padding:1px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-radius:17px;background-color:rgba(255,255,255,0.10);background-image:${GLASS_SHEEN};box-shadow:inset 0 1px 0 rgba(255,255,255,0.30);padding:16px 20px;">
${inner}
</td></tr></table></td></tr></table>`;
}

// ─── Tipologías ───────────────────────────────────────────────────────────────

export type FooterLayout = "consola" | "centrado" | "franja" | "split";

export interface FooterTipo {
  id: string;
  label: string;
  descripcion: string;
  layout: FooterLayout;
}

export const FOOTER_TIPOLOGIAS: FooterTipo[] = [
  {
    id: "footer-consola",
    label: "Footer · Consola",
    descripcion: "La consola glass del footer actual (marca + ícono, ayuda + ¡Vamos!), pero sobre el fondo V2 del tono elegido.",
    layout: "consola",
  },
  {
    id: "footer-centrado",
    label: "Footer · Centrado",
    descripcion: "Todo centrado y sin glass: marca arriba, tagline, la invitación al Centro de Ayuda y el botón ¡Vamos! debajo.",
    layout: "centrado",
  },
  {
    id: "footer-franja",
    label: "Footer · Franja",
    descripcion: "El más compacto: una sola franja con «¿Quieres saber más?» a la izquierda y el botón ¡Vamos! a la derecha.",
    layout: "franja",
  },
  {
    id: "footer-split",
    label: "Footer · Split",
    descripcion: "Dos columnas sin glass: marca + tagline a la izquierda; Centro de Ayuda + ¡Vamos! a la derecha.",
    layout: "split",
  },
];

/** Alto del footer según su layout. */
export function footerHeight(f: FooterTipo): number {
  if (f.layout === "consola") return 230;
  if (f.layout === "centrado") return 264;
  if (f.layout === "franja") return 118;
  return 170; // split
}

/** El footer como bloque suelto (table de 600) sobre el fondo V2 del tono. */
export function buildFooterBanner(f: FooterTipo, tone: V2Tone): string {
  const s = V2_TONE[tone];
  const H = footerHeight(f);

  if (f.layout === "consola") {
    const inner = `<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">${brandBlock("left", s.sub)}</td>
<td width="16"></td>
<td width="150" valign="middle" align="right">${conTodo(150)}</td>
</tr></table>
${HAIRLINE}
<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle">${helpBlock("left", s.sub)}</td>
<td width="14"></td>
<td width="146" valign="middle" align="right">${vamosBtn("right")}</td>
</tr></table>`;
    const content = `<td valign="middle" style="padding:18px 22px;">${glassPanel(inner)}</td>`;
    return v2Backdrop(tone, f.id, f.label, content, H);
  }

  if (f.layout === "centrado") {
    const content = `<td valign="middle" align="center" style="padding:26px 40px;">
<table border="0" cellpadding="0" cellspacing="0" align="center">
<tr><td align="center">${brandBlock("center", s.sub)}</td></tr>
<tr><td height="16"></td></tr>
<tr><td align="center">${helpBlock("center", s.sub)}</td></tr>
<tr><td height="16"></td></tr>
<tr><td align="center">${vamosBtn("center")}</td></tr>
</table>
</td>`;
    return v2Backdrop(tone, f.id, f.label, content, H);
  }

  if (f.layout === "franja") {
    const content = `<td valign="middle" style="padding:0 8px 0 30px;">${helpBlock("left", s.sub)}</td>
<td valign="middle" width="160" align="right" style="padding:0 30px 0 12px;">${vamosBtn("right")}</td>`;
    return v2Backdrop(tone, f.id, f.label, content, H);
  }

  // split — marca izq · ayuda + CTA der
  const content = `<td valign="middle" style="padding:0 8px 0 30px;">${brandBlock("left", s.sub)}</td>
<td valign="middle" width="220" align="right" style="padding:0 30px 0 12px;">
<table border="0" cellpadding="0" cellspacing="0" align="right">
<tr><td align="left">${helpBlock("left", s.sub)}</td></tr>
<tr><td height="12"></td></tr>
<tr><td align="left">${vamosBtn("left")}</td></tr>
</table>
</td>`;
  return v2Backdrop(tone, f.id, f.label, content, H);
}
