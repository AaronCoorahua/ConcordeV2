/**
 * Registry de tipologías de banner — SOLO para Server Components.
 *
 * Una tipología = un LAYOUT (dónde va la marca y dónde el copy). El FONDO es un
 * eje aparte: cada tipología se puede ver con cualquiera de los tonos V2
 * (En Vivo, Morado, Negociable, SubasCoins, Dark) mediante el tab del detalle.
 * Todas se muestran por defecto con el fondo «En Vivo» (V2_DEFAULT_TONE).
 *
 * Son 7 layouts: los 5 V2 + las tipologías C y E (que conservan sus assets de
 * marca pero ahora van sobre el mismo fondo V2).
 *
 * Complementa a src/emails/registry.ts (los correos reales de producción,
 * expuestos en /correos/variantes).
 */

import {
  TIPOLOGIAS_BASICAS,
  buildTipoBanner,
  tipoHeight,
  type TipoBasica,
} from "./tipologiasBanners";
import {
  TIPOLOGIAS_V2,
  buildV2Banner,
  wrapV2Preview,
  v2Height,
  V2_DEFAULT_TONE,
  V2_TONE_OPTIONS,
  type V2Tone,
} from "./tipologiasV2";

/** Una variante de FONDO de una tipología: el mismo layout con otro tono. */
export interface TipoFondo {
  tone: V2Tone;
  /** Etiqueta del tab («En Vivo», «Morado», …). */
  label: string;
  /** Documento HTML completo para previsualizar en un iframe */
  previewDoc: string;
  /** HTML que copia el botón: bloque banner listo para pegar */
  copyHtml: string;
}

export interface TipoPlantilla {
  id: string;
  name: string;
  description: string;
  /** Alto del contenido (px) para dimensionar el iframe */
  previewHeight: number;
  /** Un fondo por tono, en el orden de V2_TONE_OPTIONS. El primero es el default. */
  fondos: TipoFondo[];
}

/** Metadatos de una tipología. */
export interface TipoMeta {
  id: string;
  /** Sigla corta para el chip de la card (C, E o V2). */
  letra: string;
  label: string;
  descripcion: string;
}

export interface TipoGroup {
  tipologia: TipoMeta;
  plantillas: TipoPlantilla[];
}

/**
 * Arma la lista de fondos de una tipología: el mismo layout renderizado con
 * cada tono, en el orden del tab. `build` recibe el tono y devuelve el HTML.
 */
function buildFondos(label: string, build: (tone: V2Tone) => string): TipoFondo[] {
  return V2_TONE_OPTIONS.map(function toFondo(opt): TipoFondo {
    const banner = build(opt.tone);
    return {
      tone: opt.tone,
      label: opt.label,
      previewDoc: wrapV2Preview(banner, `${label} · ${opt.label}`),
      copyHtml: banner,
    };
  });
}

/** Tipologías V2 — los 5 layouts de gradiente. */
const GROUPS_V2: TipoGroup[] = TIPOLOGIAS_V2.map(function toGroup(t): TipoGroup {
  return {
    tipologia: { id: t.id, letra: "V2", label: t.label, descripcion: t.descripcion },
    plantillas: [
      {
        id: `${t.id}-banner`,
        name: "Banner hero",
        description: `${t.descripcion} Elige el fondo con el tab y pégalo como header de cualquier plantilla.`,
        previewHeight: v2Height(t) + 20,
        fondos: buildFondos(t.label, function build(tone) { return buildV2Banner(t, tone); }),
      },
    ],
  };
});

/** Tipologías C y E — assets de marca sobre el mismo fondo V2. */
const GROUPS_CE: TipoGroup[] = TIPOLOGIAS_BASICAS.map(function toGroup(t: TipoBasica): TipoGroup {
  return {
    tipologia: { id: t.id, letra: t.letra, label: t.label, descripcion: t.descripcion },
    plantillas: [
      {
        id: `${t.id}-banner`,
        name: "Banner header",
        description: `${t.descripcion} Elige el fondo con el tab y pégalo como header de cualquier plantilla.`,
        previewHeight: tipoHeight(t) + 20,
        fondos: buildFondos(t.label, function build(tone) { return buildTipoBanner(t, tone); }),
      },
    ],
  };
});

export const TIPO_GROUPS: TipoGroup[] = [...GROUPS_V2, ...GROUPS_CE];

export function getTipoGroup(id: string): TipoGroup | undefined {
  return TIPO_GROUPS.find(function byId(g) { return g.tipologia.id === id; });
}

export { V2_DEFAULT_TONE };
