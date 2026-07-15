/**
 * headerSwap — reemplaza el banner header de un correo REAL de producción por
 * un banner de tipología (los de /correos/tipologias), sin tocar el renderer
 * portado (prodEmailTemplates.ts es copia 1:1 de Concorde-Email y no se edita).
 *
 * Cómo funciona: generateEmail() abre SIEMPRE con glassHeader() — dos filas
 * <tr> (el band glass morado con el PNG »vmc« + el strip de 4px). Este módulo
 * localiza ese bloque en el HTML generado por sus marcadores estables y lo
 * sustituye por el banner de la tipología elegida (que ya trae su propio strip).
 *
 * Módulo plano (sin "use client" ni node:fs): usable desde cliente y servidor.
 */

import { TIPOLOGIAS_V2, buildV2Banner, type V2Tone } from "./tipologiasV2";
import { TIPOLOGIAS_BASICAS, buildTipoBanner } from "./tipologiasBanners";

export interface BannerOption {
  id: string;
  label: string;
}

/** Las tipologías disponibles como header, en el orden del tab. */
export const BANNER_OPTIONS: BannerOption[] = [
  ...TIPOLOGIAS_V2.map(function toOption(t) {
    return { id: t.id, label: t.label.replace(/^V2 · /, "") };
  }),
  ...TIPOLOGIAS_BASICAS.map(function toOption(t) {
    return { id: t.id, label: t.label };
  }),
];

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Banner de la tipología `id` con el tono `tone`, personalizado con el asunto
 * real del correo (reemplaza el placeholder «{{ Título del correo }}») y la
 * categoría como pill. La bajada queda como placeholder editable.
 */
export function buildBannerFor(id: string, tone: V2Tone, titulo: string, pill: string): string | null {
  const v2 = TIPOLOGIAS_V2.find(function byId(t) { return t.id === id; });
  if (v2) {
    return buildV2Banner(v2, tone)
      .replace("{{ Título del correo }}", escHtml(titulo))
      .replace("{{ PILL }}", escHtml(pill));
  }
  const ce = TIPOLOGIAS_BASICAS.find(function byId(t) { return t.id === id; });
  if (ce) {
    return buildTipoBanner({ ...ce, titulo: escHtml(titulo) }, tone);
  }
  return null;
}

/**
 * Marcadores del header original dentro del HTML de generateEmail():
 *  · empieza en la fila del band glass (única con este td: el bgcolor #3b1782
 *    de C.purple + valign middle; la consola del footer lleva width="600" antes
 *    del bgcolor, así que no colisiona — y además se toma la PRIMERA aparición)
 *  · termina al cerrar la fila del strip de 4px (primer height="4" tras el band)
 */
const HEADER_START = '<tr><td align="center" valign="middle" bgcolor="#3b1782"';
const STRIPE_MARK = 'height="4"';
const ROW_CLOSE = "</td></tr>";

/**
 * Sustituye el header glass del correo por `bannerHtml` (una tabla banner de
 * 600px de las tipologías). Si el HTML no trae el header esperado — p. ej. tras
 * resincronizar prodEmailTemplates.ts con un header distinto — devuelve el
 * correo intacto en vez de romperlo.
 */
export function swapEmailHeader(emailHtml: string, bannerHtml: string): string {
  const start = emailHtml.indexOf(HEADER_START);
  if (start === -1) return emailHtml;
  const stripe = emailHtml.indexOf(STRIPE_MARK, start);
  if (stripe === -1) return emailHtml;
  const close = emailHtml.indexOf(ROW_CLOSE, stripe);
  if (close === -1) return emailHtml;
  const end = close + ROW_CLOSE.length;
  return `${emailHtml.slice(0, start)}<tr><td align="center" style="padding:0;">
${bannerHtml}
</td></tr>${emailHtml.slice(end)}`;
}
