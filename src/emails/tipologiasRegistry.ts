/**
 * Registry de tipologías BÁSICAS (A/B/C) — SOLO para Server Components.
 *
 * Cada tipología es un layout de banner (posición texto↔imagen). Trae su banner
 * header copiable email-safe. Complementa a src/emails/registry.ts (que agrupa
 * los correos reales de producción, expuestos en /correos/variantes).
 */

import {
  TIPOLOGIAS_BASICAS,
  buildTipoBanner,
  wrapTipoPreview,
  type TipoBasica,
} from "./tipologiasBanners";
import {
  TIPOLOGIAS_V2,
  buildV2Banner,
  wrapV2Preview,
  v2Height,
} from "./tipologiasV2";

export interface TipoPlantilla {
  id: string;
  name: string;
  description: string;
  /** Documento HTML completo para previsualizar en un iframe */
  previewDoc: string;
  /** HTML que copia el botón: bloque banner listo para pegar */
  copyHtml: string;
  /** Alto estimado del contenido (px) para dimensionar el iframe */
  previewHeight: number;
}

/** Metadatos comunes de una tipología (Opción 1 «marca» u Opción 2 «gradientes»). */
export interface TipoMeta {
  id: string;
  /** Letra (A–G) para Opción 1; sigla V2 para Opción 2. */
  letra: string;
  label: string;
  descripcion: string;
}

export interface TipoGroup {
  tipologia: TipoMeta;
  /** "marca" = Opción 1 (A–G) · "gradiente" = Opción 2 (V2). */
  opcion: "marca" | "gradiente";
  plantillas: TipoPlantilla[];
}

/** Alto del preview por tipología: las apiladas (imagen full-width) miden más. */
const PREVIEW_HEIGHT: Record<string, number> = {
  D: 400, // copy centrado + imagen debajo
  E: 380, // copy arriba + imagen full-width
  F: 360, // banda copy + banda imagen
};

/** Opción 1 «Marca» — tipologías A–G (header glass + assets de marca). */
const GROUPS_MARCA: TipoGroup[] = TIPOLOGIAS_BASICAS.map(function toGroup(t: TipoBasica): TipoGroup {
  const banner = buildTipoBanner(t);
  return {
    tipologia: { id: t.id, letra: t.letra, label: t.label, descripcion: t.descripcion },
    opcion: "marca",
    plantillas: [
      {
        id: `${t.id}-banner`,
        name: "Banner header",
        description: `Bloque hero email-safe de la Tipología ${t.letra} — ${t.descripcion} Pégalo como header de cualquier plantilla.`,
        previewDoc: wrapTipoPreview(banner, `${t.label}`),
        copyHtml: banner,
        previewHeight: PREVIEW_HEIGHT[t.letra] ?? 260,
      },
    ],
  };
});

/** Opción 2 «Gradientes» — tipologías V2 (estilo Voyager: gradiente + formas + foto). */
const GROUPS_GRADIENTE: TipoGroup[] = TIPOLOGIAS_V2.map(function toGroup(t): TipoGroup {
  const banner = buildV2Banner(t);
  return {
    tipologia: { id: t.id, letra: "V2", label: t.label, descripcion: t.descripcion },
    opcion: "gradiente",
    plantillas: [
      {
        id: `${t.id}-banner`,
        name: "Banner hero",
        description: `Banner hero email-safe con estilo Voyager — ${t.descripcion} Pégalo como header de cualquier plantilla.`,
        previewDoc: wrapV2Preview(banner, `${t.label}`),
        copyHtml: banner,
        previewHeight: v2Height(t) + 20,
      },
    ],
  };
});

export const TIPO_GROUPS: TipoGroup[] = [...GROUPS_MARCA, ...GROUPS_GRADIENTE];

export function getTipoGroup(id: string): TipoGroup | undefined {
  return TIPO_GROUPS.find(function byId(g) { return g.tipologia.id === id; });
}
