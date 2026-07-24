/**
 * Registry de tipologías de banner — SOLO para Server Components.
 *
 * Modelo: cada tipología es un LAYOUT (composición marca↔copy). El TONO es un
 * eje aparte: dentro del detalle, un tab permite ver el mismo layout sobre cada
 * uno de los 5 tonos (En Vivo, Morado, Negociable, SubasCoins, Dark), cada uno
 * clonado TAL CUAL de su SVG de Figma (tipologiasNew.ts), con el logo real.
 *
 * Tipologías de layout:
 *   01 · Texto a la izquierda — copy izq, marca der.
 *   02 · Texto a la derecha   — espejo: marca izq, copy der.
 */

import {
  TIPOLOGIAS_LAYOUT,
  TONOS,
  buildBanner,
  tipoNewHeight,
  wrapTipoPreview,
} from "./tipologiasNew";
import {
  FOOTER_TONOS,
  buildFooter,
  footerHeight,
  wrapFooterPreview,
} from "./tipologiasFooter";

/** Un TONO de una tipología: el mismo layout sobre otro fondo. */
export interface TipoFondo {
  /** id del tono (en-vivo, morado, …) — sirve de key del tab. */
  tone: string;
  /** Etiqueta del tab («En Vivo», «Morado», …). */
  label: string;
  /** Documento HTML completo para previsualizar en un iframe. */
  previewDoc: string;
  /** HTML que copia el botón: bloque banner listo para pegar. */
  copyHtml: string;
}

export interface TipoPlantilla {
  id: string;
  name: string;
  description: string;
  /** Alto del contenido (px) para dimensionar el iframe. */
  previewHeight: number;
  /** Un fondo por tono, en el orden del tab. El primero es el default. */
  fondos: TipoFondo[];
}

/** Metadatos de una tipología. */
export interface TipoMeta {
  id: string;
  /** Sigla corta para el chip de la card. */
  letra: string;
  label: string;
  descripcion: string;
}

export interface TipoGroup {
  tipologia: TipoMeta;
  /** "banner" = header hero · "footer" = consola Centro de Ayuda. */
  kind: "banner" | "footer";
  plantillas: TipoPlantilla[];
}

/** Cada tipología de layout, con los 5 tonos renderizados como fondos. */
const GROUPS: TipoGroup[] = TIPOLOGIAS_LAYOUT.map(function toGroup(layout): TipoGroup {
  const fondos: TipoFondo[] = TONOS.map(function toFondo(tone): TipoFondo {
    const banner = buildBanner(layout, tone);
    return {
      tone: tone.id,
      label: tone.label,
      previewDoc: wrapTipoPreview(banner, `${layout.label} · ${tone.label}`),
      copyHtml: banner,
    };
  });
  return {
    tipologia: { id: layout.id, letra: layout.letra, label: layout.label, descripcion: layout.descripcion },
    kind: "banner",
    plantillas: [
      {
        id: `${layout.id}-banner`,
        name: "Banner header",
        description: `${layout.descripcion} Elige el tono con el tab y pégalo como header de cualquier plantilla.`,
        previewHeight: tipoNewHeight(layout.layout) + 20,
        fondos,
      },
    ],
  };
});

/** Footer «Centro de Ayuda» — un solo layout con los 5 tonos como tabs. */
const FOOTER_GROUP: TipoGroup = {
  tipologia: {
    id: "footer-centro-ayuda",
    letra: "F1",
    label: "Centro de Ayuda",
    descripcion:
      "El cierre del correo: panel glass con «¿Quieres saber más?», el botón ¡Vamos! y la marca vmc, sobre el gradiente del tono.",
  },
  kind: "footer",
  plantillas: [
    {
      id: "footer-centro-ayuda-banner",
      name: "Footer glass",
      description:
        "Consola glass del footer (título + Centro de Ayuda + ¡Vamos! + marca). Elige el tono con el tab y pégalo como cierre de cualquier plantilla.",
      previewHeight: footerHeight() + 20,
      fondos: FOOTER_TONOS.map(function toFondo(tone): TipoFondo {
        const footer = buildFooter(tone.id, tone.style);
        return {
          tone: tone.id,
          label: tone.label,
          previewDoc: wrapFooterPreview(footer, `Centro de Ayuda · ${tone.label}`),
          copyHtml: footer,
        };
      }),
    },
  ],
};

export const TIPO_GROUPS: TipoGroup[] = [...GROUPS, FOOTER_GROUP];

export function getTipoGroup(id: string): TipoGroup | undefined {
  return TIPO_GROUPS.find(function byId(g) { return g.tipologia.id === id; });
}
