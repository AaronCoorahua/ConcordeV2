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
import { FOOTER_TIPOLOGIAS, buildFooterBanner } from "./tipologiasFooter";

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

/** Textos editables del banner de tipología (todos con default sensato). */
export interface BannerText {
  /** Título grande del banner. */
  titulo: string;
  /** Bajada bajo el título. */
  bajada: string;
  /** Texto del pill de contexto (solo lo muestran los layouts V2). */
  pill: string;
}

/** Placeholders originales dentro de las plantillas de banner. */
const PH_TITULO = "{{ Título del correo }}";
const PH_BAJADA = "{{ Bajada breve del correo va aquí }}";
const PH_PILL = "{{ PILL }}";

/**
 * Banner de la tipología `id` con el tono `tone`, personalizado con los textos
 * de `text` (título, bajada, pill). Cada campo reemplaza su placeholder; si un
 * campo viene vacío se conserva el placeholder, para no dejar huecos.
 */
export function buildBannerFor(id: string, tone: V2Tone, text: BannerText): string | null {
  const titulo = text.titulo.trim() ? escHtml(text.titulo) : PH_TITULO;
  const bajada = text.bajada.trim() ? escHtml(text.bajada) : PH_BAJADA;
  const pill = text.pill.trim() ? escHtml(text.pill) : PH_PILL;

  const v2 = TIPOLOGIAS_V2.find(function byId(t) { return t.id === id; });
  if (v2) {
    return buildV2Banner(v2, tone)
      .replace(PH_TITULO, titulo)
      .replace(PH_BAJADA, bajada)
      .replace(PH_PILL, pill);
  }
  const ce = TIPOLOGIAS_BASICAS.find(function byId(t) { return t.id === id; });
  if (ce) {
    // C/E llevan título y bajada por sus props; el pill no aplica a estos layouts.
    return buildTipoBanner({ ...ce, titulo, subtitulo: bajada }, tone);
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

// ─── Footer «Centro de Ayuda» ────────────────────────────────────────────────

/** Las tipologías de footer disponibles, en el orden del tab. */
export const FOOTER_OPTIONS: BannerOption[] = FOOTER_TIPOLOGIAS.map(function toOption(f) {
  return { id: f.id, label: f.label.replace(/^Footer · /, "") };
});

/** Footer de la tipología `id` con el tono `tone` (contenido fijo de ayuda). */
export function buildFooterFor(id: string, tone: V2Tone): string | null {
  const f = FOOTER_TIPOLOGIAS.find(function byId(t) { return t.id === id; });
  return f ? buildFooterBanner(f, tone) : null;
}

/**
 * Marcadores del footer original (glassFooter en generateEmail):
 *  · la consola glass abre con este td (único con width="600" ANTES del
 *    bgcolor — el header no lleva width)
 *  · justo antes va su strip de 4px (se reemplaza junto, si está pegado)
 *  · el bloque termina donde empieza el footer web blanco (links + legal),
 *    que SIEMPRE se conserva
 */
const FOOTER_CONSOLE_START = '<tr><td align="center" width="600" bgcolor="#3b1782"';
const FOOTER_STRIPE_START = '<tr><td height="4"';
const WHITE_FOOTER_START = '<tr bgcolor="#FFFFFF"><td align="center" width="600">';

/**
 * Sustituye la consola «Centro de Ayuda» (strip + panel glass) por
 * `footerHtml`, conservando el footer web blanco. Si el HTML no trae los
 * marcadores esperados, devuelve el correo intacto.
 */
export function swapEmailFooter(emailHtml: string, footerHtml: string): string {
  const consoleStart = emailHtml.indexOf(FOOTER_CONSOLE_START);
  if (consoleStart === -1) return emailHtml;
  const whiteStart = emailHtml.indexOf(WHITE_FOOTER_START, consoleStart);
  if (whiteStart === -1) return emailHtml;
  // El strip pegado a la consola cae con ella; si no está adyacente (<400
  // chars), se respeta lo que haya y se reemplaza solo desde la consola.
  const stripeStart = emailHtml.lastIndexOf(FOOTER_STRIPE_START, consoleStart);
  const start = stripeStart !== -1 && consoleStart - stripeStart < 400 ? stripeStart : consoleStart;
  return `${emailHtml.slice(0, start)}<tr><td align="center" style="padding:0;">
${footerHtml}
</td></tr>
${emailHtml.slice(whiteStart)}`;
}
