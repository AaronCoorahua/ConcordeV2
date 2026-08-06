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
import { V2_TONE_OPTIONS, V2_DEFAULT_TONE, type V2Tone } from "./tipologiasV2";

export interface BannerOption {
  id: string;
  label: string;
}

/**
 * Las tipologías de BANNER header disponibles, en el orden del tab: primero las
 * vigentes (solo marca + título) y después las originales, sufijadas `-legacy`,
 * que siguen disponibles para los correos ya maquetados con ellas.
 */
export const BANNER_OPTIONS: BannerOption[] = [
  ...TIPOLOGIAS_LAYOUT.map(function toOption(t) {
    return { id: t.id, label: t.label };
  }),
  ...TIPOLOGIAS_LAYOUT.map(function toLegacyOption(t) {
    return { id: `${t.id}-legacy`, label: `${t.label} (legacy)` };
  }),
];

/** Sufijo con el que se marcan las tipologías de la composición original. */
const LEGACY_SUFFIX = "-legacy";

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
  // Los ids `…-legacy` piden la composición original; el resto, la limpia.
  const isLegacy = id.endsWith(LEGACY_SUFFIX);
  const baseId = isLegacy ? id.slice(0, -LEGACY_SUFFIX.length) : id;
  const layout: TipoLayoutDef | undefined = TIPOLOGIAS_LAYOUT.find(function byId(t) { return t.id === baseId; });
  if (!layout) return null;

  const titulo = text.titulo.trim() ? escHtml(text.titulo) : PH_TITULO;
  const bajada = text.bajada.trim() ? escHtml(text.bajada) : PH_BAJADA;
  const pill = text.pill.trim() ? escHtml(text.pill) : PH_PILL;

  // En la variante limpia no hay pill ni bajada que sustituir: los `replace`
  // simplemente no encuentran su marcador y no hacen nada.
  return buildBanner(layout, bannerTone(tone), isLegacy ? "legacy" : "clean")
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

/**
 * Marcadores del bloque `title` del cuerpo (renderSection case 'title'):
 *  · la fila del título lleva esta firma de estilo, única en el correo (24px +
 *    800 + letter-spacing negativo); el resto de títulos del cuerpo (panel,
 *    note, list…) son de 13-14px y no colisionan
 *  · si hay eyebrow, va en la fila INMEDIATAMENTE anterior, con su pill naranja
 */
const BODY_TITLE_MARK = 'style="font-size:24px;font-weight:800;line-height:1.25;';
const BODY_EYEBROW_MARK = "text-transform:uppercase;color:#";
const ROW_OPEN = "<tr>";

/**
 * Quita el título del CUERPO cuando el banner de tipología ya lo muestra.
 *
 * Todas las tipologías de banner (no la «Basic» original) rotulan el título de
 * campaña dentro del banner; dejar además el `title` del cuerpo lo repite dos
 * veces seguidas. Se elimina esa fila —y su eyebrow, si lo tiene— junto al
 * spacer que la separa de lo que sigue.
 *
 * Solo toca la PRIMERA aparición: es la del bloque `title` de cabecera. Si el
 * HTML no la trae, devuelve el correo intacto.
 */
export function stripBodyTitle(emailHtml: string): string {
  const mark = emailHtml.indexOf(BODY_TITLE_MARK);
  if (mark === -1) return emailHtml;

  // Retroceder al <tr> que abre la fila del título.
  const rowStart = emailHtml.lastIndexOf(ROW_OPEN, mark);
  if (rowStart === -1) return emailHtml;
  const rowEnd = emailHtml.indexOf(ROW_CLOSE, mark);
  if (rowEnd === -1) return emailHtml;
  let start = rowStart;
  const end = rowEnd + ROW_CLOSE.length;

  // El eyebrow (pill naranja) es la fila anterior y pertenece al mismo bloque:
  // si está pegada al título, cae con él.
  const prevRow = emailHtml.lastIndexOf(ROW_OPEN, rowStart - 1);
  if (prevRow !== -1) {
    const between = emailHtml.slice(prevRow, rowStart);
    if (between.includes(BODY_EYEBROW_MARK)) start = prevRow;
  }

  // El spacer que seguía al título sobra al quitarlo: sin él, el cuerpo arranca
  // pegado al banner; con él, queda el hueco de siempre. Se conserva el spacer
  // ANTERIOR (el `height="20"` que generateEmail pone tras el header) y se
  // descarta solo la fila del título.
  return emailHtml.slice(0, start) + emailHtml.slice(end);
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

// ─── Presets por categoría ───────────────────────────────────────────────────

/** La composición con la que abre un correo antes de tocar ningún tab. */
export interface LabPreset {
  banner: string;
  footer: string;
  tone: V2Tone;
}

/** Composición «Basic»: el header y el footer originales del correo. */
export const PRESET_ORIGINAL: LabPreset = { banner: "original", footer: "original", tone: V2_DEFAULT_TONE };

/**
 * Composición por defecto según la CATEGORÍA del correo (la `label` del grupo en
 * registry.ts: "En vivo", "Negociable"…). Todos los correos abren ya maquetados
 * con banner de texto centrado + footer split; lo único que cambia es el TONO:
 * «En vivo» y «Negociable» usan el color de su flujo, y el resto el morado.
 *
 * Es solo el punto de partida: los tabs siguen mandando, y al tocar uno el
 * estado pasa a la URL (ver BannerLab), así que un enlace compartido gana sobre
 * el preset. En los tabs, la opción del preset se marca como «recomendado».
 */
const PRESET_LAYOUT = { banner: "texto-centrado", footer: "footer-split" } as const;

const CATEGORY_PRESETS: Record<string, LabPreset> = {
  "En vivo": { ...PRESET_LAYOUT, tone: "live" },
  Negociable: { ...PRESET_LAYOUT, tone: "negotiable" },
};

/**
 * Preset por defecto de las categorías sin tono propio (Registro, SubasCoins,
 * Mapfre, Usuarios Internos…): misma composición, en morado.
 */
const PRESET_DEFAULT: LabPreset = { ...PRESET_LAYOUT, tone: "proximas" };

/** Preset de una categoría; las que no tienen tono propio abren en morado. */
export function presetForCategory(categoria: string): LabPreset {
  return CATEGORY_PRESETS[categoria] ?? PRESET_DEFAULT;
}

/**
 * Aplica una composición sobre el HTML de un correo: sustituye banner y footer
 * y quita el título duplicado del cuerpo. Es la misma operación que hace el
 * BannerLab al abrir, extraída aquí para que el CATÁLOGO pinte sus miniaturas
 * con la composición real y no con el correo crudo.
 */
export function applyPreset(
  emailHtml: string,
  preset: LabPreset,
  text: { titulo: string; pill: string },
): string {
  let out = emailHtml;
  if (preset.banner !== "original") {
    const bannerHtml = buildBannerFor(preset.banner, preset.tone, {
      titulo: text.titulo,
      bajada: "",
      pill: text.pill,
    });
    // El banner de tipología ya rotula el título: sin esto saldría dos veces.
    if (bannerHtml) out = stripBodyTitle(swapEmailHeader(out, bannerHtml));
  }
  if (preset.footer !== "original") {
    const footerHtml = buildFooterFor(preset.footer, preset.tone);
    if (footerHtml) out = swapEmailFooter(out, footerHtml);
  }
  return out;
}

/**
 * ¿La categoría tiene un tono de marca propio? «En vivo» y «Negociable» son
 * flujos con color asignado, así que cambiarles el fondo rompe el código visual
 * del correo. No se bloquea —a veces se quiere probar—, pero el Lab avisa antes.
 */
export function hasFixedTone(categoria: string): boolean {
  return Object.prototype.hasOwnProperty.call(CATEGORY_PRESETS, categoria);
}

/** Etiqueta del tono propio de la categoría, para el texto del aviso. */
export function toneLabelForCategory(categoria: string): string {
  const t = CATEGORY_PRESETS[categoria]?.tone;
  return V2_TONE_OPTIONS.find(function byTone(o) { return o.tone === t; })?.label ?? "";
}
