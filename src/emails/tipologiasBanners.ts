/**
 * Tipologías C y E — módulo plano (sin "use client").
 *
 * Describen el LAYOUT del banner header de los correos VMC usando los assets
 * REALES de marca del CDN (no son banners inventados):
 *   · header completo  → cdn.vmcsubastas.com/.../vmcsubastas-mail-header.png
 *   · ícono «CON TODO» → cdn.vmcsubastas.com/.../con-todo-footer.png
 *
 * Lo que varía entre ambas es la composición marca↔copy:
 *   C — header »vmc« arriba + copy full-width centrado debajo
 *   E — apilado: copy arriba + franja del header »vmc« full-width abajo
 *
 * El FONDO ya no es el band morado fijo: ambas van sobre el fondo V2 (gradiente
 * + chevrons + anillos) del tono que se elija con el tab del detalle, igual que
 * las tipologías V2. Ver v2Backdrop en ./tipologiasV2.
 *
 * HTML email-safe (tablas anidadas + estilos inline + bgcolor de respaldo, sin
 * flexbox/grid/JS), 600px.
 */

import { v2Backdrop, V2_DEFAULT_TONE, type V2Tone } from "./tipologiasV2";
import { headerAsset } from "./tipologiasBrand";

export const TIPO_WIDTH = 600;

export interface TipoBasica {
  id: string;
  letra: "C" | "E";
  label: string;
  descripcion: string;
  /** Placeholder del título de campaña (editable por correo). */
  titulo: string;
  /** Placeholder de la bajada de campaña (editable por correo). */
  subtitulo: string;
}

/** Título/bajada placeholder comunes — se ven como texto de muestra editable. */
const T_TITULO = "{{ Título del correo }}";
const T_SUB = "{{ Bajada breve del correo va aquí }}";

export const TIPOLOGIAS_BASICAS: TipoBasica[] = [
  {
    id: "tipologia-c",
    letra: "C",
    label: "Tipología C",
    descripcion: "El header »vmc« Subastas arriba y, debajo, el copy (título + bajada) a todo el ancho. Máximo peso visual para lanzamientos.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
  {
    id: "tipologia-e",
    letra: "E",
    label: "Tipología E",
    descripcion: "Apilado vertical: el copy (título + bajada) arriba y la franja completa del header »vmc« Subastas / «¡CON TODO!» full-width debajo. Pensado mobile-first.",
    titulo: T_TITULO, subtitulo: T_SUB,
  },
];

/**
 * Bloque de copy placeholder (título + subtítulo) alineado a `align`. Se ve como
 * texto de muestra editable: el título en blanco bold y la bajada en lila suave,
 * con las llaves {{ }} para dejar claro que es un placeholder de campaña.
 */
function copyBlock(t: TipoBasica, align: "left" | "center"): string {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.25;color:#FFFFFF;">${t.titulo}</td></tr>
<tr><td height="7" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="${align}" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:13px;font-weight:500;line-height:1.5;color:rgba(255,255,255,0.82);">${t.subtitulo}</td></tr>
</table>`;
}

/** Alto del banner por tipología (C y E apilan contenido, por eso miden más). */
export function tipoHeight(t: TipoBasica): number {
  return t.letra === "C" ? 330 : 320;
}

/**
 * El banner como bloque suelto (table de 600) listo para pegar como header.
 *
 * C y E conservan su CONTENIDO de marca (el asset real del header »vmc«), pero
 * van sobre el fondo V2 del tono elegido: mismo gradiente, chevrons y anillos
 * que los demás banners. El tono se elige con el tab del detalle.
 */
export function buildTipoBanner(t: TipoBasica, tone: V2Tone = V2_DEFAULT_TONE): string {
  const H = tipoHeight(t);

  // C — header »vmc« completo arriba + copy full-width centrado debajo.
  const content = t.letra === "C"
    ? `<td valign="middle" align="center" style="padding:26px 30px;">
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center">${headerAsset(460)}</td></tr>
<tr><td height="18" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td>${copyBlock(t, "center")}</td></tr></table>
</td>`
    // E — apilado: copy arriba + franja del header »vmc« full-width abajo.
    : `<td valign="middle" align="center" style="padding:26px 30px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td>${copyBlock(t, "left")}</td></tr>
<tr><td height="22" style="font-size:1px;line-height:1px;">&nbsp;</td></tr>
<tr><td align="center">${headerAsset(500)}</td></tr></table>
</td>`;

  return v2Backdrop(tone, t.id, t.label, content, H);
}

/** Documento HTML mínimo para previsualizar el banner en un iframe. */
export function wrapTipoPreview(inner: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body style="background-color:#FAFAFA;margin:0;padding:0;">
<center>
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
${inner}
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td height="16" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>
</center>
</body>
</html>`;
}
