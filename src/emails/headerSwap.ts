/**
 * headerSwap — reemplaza el banner header / footer de un correo REAL de
 * producción por una TIPOLOGÍA NUEVA (las de /correos/tipologias), sin tocar el
 * renderer portado (prodEmailTemplates.ts es copia 1:1 de Concorde-Email y no se
 * edita).
 *
 * Las tipologías nuevas son las de tipologiasNew.ts (banners header, clonados de
 * Figma con el logo real) y tipologiasFooter.ts (footers «Centro de Ayuda»:
 * console · centered · compact · split). El «fondo» (tono) es un eje aparte que
 * elige el tab del BannerLab; aquí se mapea al tono nuevo por posición.
 *
 * Cómo funciona: generateEmail() abre SIEMPRE con glassHeader() y cierra con la
 * consola glass del footer. Este módulo localiza esos bloques por sus marcadores
 * estables y los sustituye por la tipología elegida.
 *
 * Módulo plano (sin "use client" ni node:fs): usable desde cliente y servidor.
 */

import {
  TIPOLOGIAS_LAYOUT,
  TONOS,
  buildBanner,
  type TipoLayoutDef,
  type TipoTone,
} from "./tipologiasNew";
import {
  FOOTER_TONOS,
  buildFooter,
  type FooterLayoutKind,
} from "./tipologiasFooter";
import { V2_TONE_OPTIONS, type V2Tone } from "./tipologiasV2";

export interface BannerOption {
  id: string;
  label: string;
}

/** Las tipologías de BANNER header disponibles, en el orden del tab. */
export const BANNER_OPTIONS: BannerOption[] = TIPOLOGIAS_LAYOUT.map(function toOption(t) {
  return { id: t.id, label: t.label };
});

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * El tab de «Fondo» del BannerLab habla en tonos V2 (live/proximas/…); las
 * tipologías nuevas usan sus propios tonos (en-vivo/morado/…), en el MISMO orden
 * y con las mismas 5 etiquetas. Se mapea por posición: V2Tone → índice → tono
 * nuevo. Si no se encuentra, cae al primero (En Vivo).
 */
function toneIndex(tone: V2Tone): number {
  const i = V2_TONE_OPTIONS.findIndex(function byTone(o) { return o.tone === tone; });
  return i === -1 ? 0 : i;
}

function bannerTone(tone: V2Tone): TipoTone {
  return TONOS[toneIndex(tone)] ?? TONOS[0];
}

/** Textos editables del banner de tipología (todos con default sensato). */
export interface BannerText {
  /** Título grande del banner. */
  titulo: string;
  /** Bajada bajo el título. */
  bajada: string;
  /** Texto del pill de contexto (el gradiente/estilo del pill sigue siendo fijo
   *  por tono; solo cambia su texto). */
  pill: string;
}

/** Placeholders originales dentro de las plantillas de banner nuevas. */
const PH_TITULO = "{{ Título del correo }}";
const PH_BAJADA = "{{ Bajada breve del correo va aquí }}";
const PH_PILL = "{{ PILL }}";

/**
 * Banner de la tipología `id` con el tono `tone`, personalizado con los textos
 * de `text` (título, bajada, pill). Cada campo reemplaza su placeholder; si un
 * campo viene vacío se conserva el placeholder, para no dejar huecos.
 */
export function buildBannerFor(id: string, tone: V2Tone, text: BannerText): string | null {
  const layout: TipoLayoutDef | undefined = TIPOLOGIAS_LAYOUT.find(function byId(t) { return t.id === id; });
  if (!layout) return null;

  const titulo = text.titulo.trim() ? escHtml(text.titulo) : PH_TITULO;
  const bajada = text.bajada.trim() ? escHtml(text.bajada) : PH_BAJADA;
  const pill = text.pill.trim() ? escHtml(text.pill) : PH_PILL;

  return buildBanner(layout, bannerTone(tone))
    .replace(PH_TITULO, titulo)
    .replace(PH_BAJADA, bajada)
    .replace(PH_PILL, pill);
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

/** Un layout de footer nuevo: su kind + la etiqueta del tab. */
interface FooterLayoutOption {
  id: string;
  label: string;
  kind: FooterLayoutKind;
}

/** Las tipologías de FOOTER disponibles (las nuevas), en el orden del tab. */
const FOOTER_LAYOUT_OPTIONS: FooterLayoutOption[] = [
  { id: "footer-console", label: "Consola", kind: "console" },
  { id: "footer-centered", label: "Centrado", kind: "centered" },
  { id: "footer-compact", label: "Compacto", kind: "compact" },
  { id: "footer-split", label: "Split", kind: "split" },
];

/** Opciones para el tab de footer. */
export const FOOTER_OPTIONS: BannerOption[] = FOOTER_LAYOUT_OPTIONS.map(function toOption(f) {
  return { id: f.id, label: f.label };
});

/** Footer de la tipología `id` con el tono `tone` (contenido fijo de ayuda). */
export function buildFooterFor(id: string, tone: V2Tone): string | null {
  const f = FOOTER_LAYOUT_OPTIONS.find(function byId(o) { return o.id === id; });
  if (!f) return null;
  const t = FOOTER_TONOS[toneIndex(tone)] ?? FOOTER_TONOS[0];
  return buildFooter(t.id, t.style, f.kind);
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
