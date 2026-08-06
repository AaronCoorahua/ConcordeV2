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
  type TipoVariant,
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
  /** "clean" = solo marca + título · "legacy" = con pill y bajada. */
  variant: TipoVariant;
  plantillas: TipoPlantilla[];
}

/**
 * Construye los grupos de banner de una variante. Los ids de la variante
 * «legacy» llevan sufijo `-legacy` para no colisionar con los limpios, que
 * conservan el id corto por ser los principales.
 */
function bannerGroups(variant: TipoVariant): TipoGroup[] {
  return TIPOLOGIAS_LAYOUT.map(function toGroup(layout): TipoGroup {
    const legacy = variant === "legacy";
    const id = legacy ? `${layout.id}-legacy` : layout.id;
    const fondos: TipoFondo[] = TONOS.map(function toFondo(tone): TipoFondo {
      const banner = buildBanner(layout, tone, variant);
      return {
        tone: tone.id,
        label: tone.label,
        previewDoc: wrapTipoPreview(banner, `${layout.label} · ${tone.label}`),
        copyHtml: banner,
      };
    });
    const desc = legacy
      ? `${layout.descripcion} Composición original, con pill y bajada.`
      : `${layout.descripcion.replace(/\(pill \+ título \+ bajada\)|pill, título y bajada/g, "título")} Solo marca y título.`;
    return {
      tipologia: { id, letra: layout.letra, label: layout.label, descripcion: desc },
      kind: "banner",
      variant,
      plantillas: [
        {
          id: `${id}-banner`,
          name: "Banner header",
          description: `${desc} Elige el tono con el tab y pégalo como header de cualquier plantilla.`,
          previewHeight: tipoNewHeight(layout.layout, variant) + 20,
          fondos,
        },
      ],
    };
  });
}

/** Tipologías principales: solo marca + título. */
const GROUPS: TipoGroup[] = bannerGroups("clean");
/** Tipologías originales, conservadas para consulta y para los correos ya maquetados. */
const LEGACY_GROUPS: TipoGroup[] = bannerGroups("legacy");

/** Los layouts de footer disponibles (cada uno es una tipología con 5 tonos). */
interface FooterLayoutMeta {
  id: string;
  letra: string;
  label: string;
  descripcion: string;
  name: string;
  kind: "console" | "centered" | "compact" | "split";
}

const FOOTER_LAYOUTS: FooterLayoutMeta[] = [
  {
    id: "footer-centro-ayuda",
    letra: "F1",
    label: "Banner 2",
    descripcion:
      "El cierre del correo: panel glass con «¿Quieres saber más?», el botón ¡Vamos! y la marca vmc, sobre el gradiente del tono.",
    name: "Footer glass",
    kind: "console",
  },
  {
    id: "footer-centro-ayuda-centrado",
    letra: "F2",
    label: "Banner 2 · Centrado",
    descripcion:
      "Cierre centrado y sin panel: la marca vmc arriba, el título, la invitación al Centro de Ayuda y el botón ¡Vamos! apilados y centrados.",
    name: "Footer centrado",
    kind: "centered",
  },
  {
    id: "footer-centro-ayuda-compacto",
    letra: "F3",
    label: "Banner 2 · Compacto",
    descripcion:
      "El cierre más compacto (110px): la invitación al Centro de Ayuda a la izquierda y la marca vmc con el botón ¡Vamos! a la derecha, en una sola franja.",
    name: "Footer compacto",
    kind: "compact",
  },
  {
    id: "footer-centro-ayuda-split",
    letra: "F4",
    label: "Banner 2 · Split",
    descripcion:
      "Dos columnas divididas por una línea vertical: la marca vmc y su eslogan a la izquierda, la invitación al Centro de Ayuda y el botón ¡Vamos! a la derecha.",
    name: "Footer split",
    kind: "split",
  },
];

/** Cada layout de footer → un TipoGroup con los 5 tonos como tabs. */
const FOOTER_GROUPS: TipoGroup[] = FOOTER_LAYOUTS.map(function toFooterGroup(layout): TipoGroup {
  return {
    tipologia: {
      id: layout.id,
      letra: layout.letra,
      label: layout.label,
      descripcion: layout.descripcion,
    },
    kind: "footer",
    // Los footers no llevan pill ni bajada, así que el cambio no les afecta:
    // hay un único juego, compartido por ambas variantes.
    variant: "clean",
    plantillas: [
      {
        id: `${layout.id}-banner`,
        name: layout.name,
        description: `${layout.descripcion} Elige el tono con el tab y pégalo como cierre de cualquier plantilla.`,
        previewHeight: footerHeight(layout.kind) + 20,
        fondos: FOOTER_TONOS.map(function toFondo(tone): TipoFondo {
          const footer = buildFooter(tone.id, tone.style, layout.kind);
          return {
            tone: tone.id,
            label: tone.label,
            previewDoc: wrapFooterPreview(footer, `${layout.label} · ${tone.label}`),
            copyHtml: footer,
          };
        }),
      },
    ],
  };
});

export const TIPO_GROUPS: TipoGroup[] = [...GROUPS, ...FOOTER_GROUPS, ...LEGACY_GROUPS];

/** Solo las tipologías vigentes (sin las legacy) — lo que se ofrece por defecto. */
export const TIPO_GROUPS_CLEAN: TipoGroup[] = [...GROUPS, ...FOOTER_GROUPS];
/** Las tipologías originales, con pill y bajada. */
export const TIPO_GROUPS_LEGACY: TipoGroup[] = LEGACY_GROUPS;

export function getTipoGroup(id: string): TipoGroup | undefined {
  return TIPO_GROUPS.find(function byId(g) { return g.tipologia.id === id; });
}
