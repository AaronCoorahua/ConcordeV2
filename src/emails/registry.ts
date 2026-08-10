/**
 * Registry de correos REALES de producción — SOLO para Server Components.
 *
 * La fuente de verdad son los 45 correos de prodEmails.ts (portados del repo
 * Concorde-Email, el catálogo que hoy está en concorde-email.vercel.app). Cada
 * correo se renderiza a HTML con generateEmail(sections, subject), el mismo
 * renderer de producción — aquí NO se inventa ni se maqueta nada.
 *
 * El AGRUPADO y el ORDEN salen de catalogOrder.ts (módulo plano que comparte con
 * el catálogo del cliente): categoría tras categoría y, dentro de cada una, por
 * paso del flujo. Los `leadsTo` de cada correo dicen a qué correo deriva.
 *
 * Aquí se añade lo que el catálogo no necesita: el HTML renderizado, el estado de
 * revisión (revisionStatus.ts) y los vecinos para navegar con anterior/siguiente.
 *
 * Complementa a src/emails/tipologiasRegistry.ts (las tipologías de banner,
 * que son propuestas de diseño, no correos de producción).
 */

import { EMAILS, CATEGORY_GRADIENT, CATEGORY_SOLID, type EmailTemplate } from "./prodEmails";
import { generateEmail } from "./prodEmailTemplates";
import { estadoDe, notaDe, type RevisionEstado } from "./revisionStatus";
import { CATEGORIAS_ORDENADAS } from "./catalogOrder";

/** Un correo real listo para mostrar: metadata + su HTML de producción. */
export interface EmailReal {
  id: string;
  name: string;
  subject: string;
  /** Paso dentro del flujo de su categoría (pinta el chip). */
  stage?: string;
  /** Ids de correos a los que deriva este (el flujo). */
  leadsTo: string[];
  /** HTML completo del correo (el que copia el botón y pinta el iframe). */
  html: string;
  /** «listo» para revisar o «pendiente» (ver revisionStatus.ts). */
  estado: RevisionEstado;
  /** Qué falta, si está pendiente; null si está listo. */
  nota: string | null;
}

/** Una categoría del catálogo con sus correos, en orden de flujo. */
export interface EmailGroup {
  id: string;
  /** Nombre real de la categoría en prodEmails.ts ("En vivo", "Negociable"…). */
  label: string;
  /** Gradiente y color plano de la categoría (los del catálogo de prod). */
  gradient: string;
  solid: string;
  correos: EmailReal[];
}

/** slug URL-safe a partir del nombre de categoría ("En vivo" → "en-vivo"). */
function slug(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita los diacríticos que NFD separó
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const FALLBACK_GRADIENT = "linear-gradient(135deg,#8460e5 0%,#3b1782 100%)";
const FALLBACK_SOLID = "#8460e5";

function toReal(e: EmailTemplate): EmailReal {
  return {
    id: e.id,
    name: e.name,
    subject: e.subject,
    stage: e.stage,
    leadsTo: e.leadsTo ?? [],
    html: generateEmail(e.sections, e.subject),
    estado: estadoDe(e.id),
    nota: notaDe(e.id),
  };
}

/**
 * Los grupos del catálogo, con el HTML de cada correo ya renderizado. El ORDEN
 * (categorías y correos dentro de cada una) no se decide aquí: viene de
 * catalogOrder.ts, que también lo usa el catálogo del cliente — así «siguiente»
 * recorre exactamente lo que se ve en la galería.
 */
export const EMAIL_GROUPS: EmailGroup[] = CATEGORIAS_ORDENADAS.map(
  function toGroup({ categoria, correos }): EmailGroup {
    return {
      id: slug(categoria),
      label: categoria,
      gradient: CATEGORY_GRADIENT[categoria] ?? FALLBACK_GRADIENT,
      solid: CATEGORY_SOLID[categoria] ?? FALLBACK_SOLID,
      correos: correos.map(toReal),
    };
  },
);

/** Total de correos reales en producción. */
export const EMAIL_PROD_TOTAL: number = EMAILS.length;

/**
 * Los 45 correos en el MISMO orden en que se ven en el catálogo (categoría tras
 * categoría, y dentro de cada una por paso del flujo). Es el orden que recorren
 * los botones «anterior / siguiente» del detalle: quien revisa avanza como si
 * bajara por la galería, no saltando por el flujo de negocio.
 */
export const EMAIL_ORDER: EmailReal[] = EMAIL_GROUPS.flatMap(function flat(g) { return g.correos; });

/** Posición 1-based de un correo en el recorrido, o 0 si no está. */
export function posicionDe(id: string): number {
  return EMAIL_ORDER.findIndex(function byId(c) { return c.id === id; }) + 1;
}

/** Vecinos de un correo en el recorrido del catálogo (null en los extremos). */
export interface Vecinos {
  anterior: EmailReal | null;
  siguiente: EmailReal | null;
  /** Posición 1-based y total, para el rótulo «12 / 45». */
  posicion: number;
  total: number;
}

export function vecinosDe(id: string): Vecinos {
  const i = EMAIL_ORDER.findIndex(function byId(c) { return c.id === id; });
  return {
    anterior: i > 0 ? EMAIL_ORDER[i - 1] : null,
    siguiente: i !== -1 && i < EMAIL_ORDER.length - 1 ? EMAIL_ORDER[i + 1] : null,
    posicion: i + 1,
    total: EMAIL_ORDER.length,
  };
}

export function getEmailGroup(id: string): EmailGroup | undefined {
  return EMAIL_GROUPS.find(function byId(g) { return g.id === id; });
}

/** Busca un correo por su id en todo el catálogo (para resolver `leadsTo`). */
export function getEmailReal(id: string): EmailReal | undefined {
  for (const g of EMAIL_GROUPS) {
    const found = g.correos.find(function byId(c) { return c.id === id; });
    if (found) return found;
  }
  return undefined;
}
