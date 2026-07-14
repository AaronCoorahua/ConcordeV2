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

export interface TipoGroup {
  tipologia: TipoBasica;
  plantillas: TipoPlantilla[];
}

/** Alto del preview por tipología: las apiladas (imagen full-width) miden más. */
const PREVIEW_HEIGHT: Record<string, number> = {
  D: 400, // copy centrado + imagen debajo
  E: 380, // copy arriba + imagen full-width
  F: 360, // banda copy + banda imagen
};

export const TIPO_GROUPS: TipoGroup[] = TIPOLOGIAS_BASICAS.map(function toGroup(t): TipoGroup {
  const banner = buildTipoBanner(t);
  return {
    tipologia: t,
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

export function getTipoGroup(id: string): TipoGroup | undefined {
  return TIPO_GROUPS.find(function byId(g) { return g.tipologia.id === id; });
}
