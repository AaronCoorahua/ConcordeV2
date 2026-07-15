/**
 * Registry de correos REALES de producción — SOLO para Server Components.
 *
 * La fuente de verdad son los 45 correos de prodEmails.ts (portados del repo
 * Concorde-Email, el catálogo que hoy está en concorde-email.vercel.app). Cada
 * correo se renderiza a HTML con generateEmail(sections, subject), el mismo
 * renderer de producción — aquí NO se inventa ni se maqueta nada.
 *
 * Los correos se agrupan por `category` (En vivo, Negociable, Registro…) y,
 * dentro de cada categoría, se ordenan por el paso del flujo (`stage`) según
 * STAGE_ORDER. Los `leadsTo` de cada correo dicen a qué correo deriva.
 *
 * Complementa a src/emails/tipologiasRegistry.ts (las tipologías de banner,
 * que son propuestas de diseño, no correos de producción).
 */

import { EMAILS, STAGE_ORDER, CATEGORY_GRADIENT, CATEGORY_SOLID, type EmailTemplate } from "./prodEmails";
import { generateEmail } from "./prodEmailTemplates";

/** Un correo real listo para mostrar: metadata + su HTML de producción. */
export interface EmailReal {
  id: string;
  name: string;
  subject: string;
  desc: string;
  /** Paso dentro del flujo de su categoría (pinta el chip). */
  stage?: string;
  /** Ids de correos a los que deriva este (el flujo). */
  leadsTo: string[];
  /** HTML completo del correo (el que copia el botón y pinta el iframe). */
  html: string;
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

/**
 * Correos sin `category` en el origen (p. ej. fee-subascoins) caen aquí — el
 * mismo nombre que usa el catálogo de Concorde-Email, y siempre al final.
 */
const SIN_CATEGORIA = "General";

const FALLBACK_GRADIENT = "linear-gradient(135deg,#8460e5 0%,#3b1782 100%)";
const FALLBACK_SOLID = "#8460e5";

/**
 * Posición de un correo dentro de su categoría: primero por el orden de flujo
 * de STAGE_ORDER; si su categoría no lo define, se respeta el orden del origen.
 */
function stageIndex(category: string, stage: string | undefined): number {
  const order = STAGE_ORDER[category];
  if (!order || !stage) return Number.MAX_SAFE_INTEGER;
  const i = order.indexOf(stage);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

function toReal(e: EmailTemplate): EmailReal {
  return {
    id: e.id,
    name: e.name,
    subject: e.subject,
    desc: e.desc,
    stage: e.stage,
    leadsTo: e.leadsTo ?? [],
    html: generateEmail(e.sections, e.subject),
  };
}

/** Agrupa los 45 correos por categoría, ordenados por flujo. */
function buildGroups(): EmailGroup[] {
  const byCategory = new Map<string, EmailTemplate[]>();
  EMAILS.forEach(function collect(e) {
    const cat = e.category ?? SIN_CATEGORIA;
    const list = byCategory.get(cat);
    if (list) list.push(e);
    else byCategory.set(cat, [e]);
  });

  return Array.from(byCategory.entries())
    .sort(function generalLast(a, b) {
      if (a[0] === SIN_CATEGORIA) return 1;
      if (b[0] === SIN_CATEGORIA) return -1;
      return 0; // el resto conserva el orden de aparición en EMAILS
    })
    .map(function toGroup([label, list]): EmailGroup {
    // Orden estable: el índice del origen desempata cuando dos correos comparten
    // stage (o cuando la categoría no define STAGE_ORDER).
    const ordered = list
      .map(function withIndex(e, i) { return { e, i }; })
      .sort(function byFlow(a, b) {
        const d = stageIndex(label, a.e.stage) - stageIndex(label, b.e.stage);
        return d !== 0 ? d : a.i - b.i;
      })
      .map(function unwrap(x) { return toReal(x.e); });

    return {
      id: slug(label),
      label,
      gradient: CATEGORY_GRADIENT[label] ?? FALLBACK_GRADIENT,
      solid: CATEGORY_SOLID[label] ?? FALLBACK_SOLID,
      correos: ordered,
    };
  });
}

export const EMAIL_GROUPS: EmailGroup[] = buildGroups();

/** Total de correos reales en producción. */
export const EMAIL_PROD_TOTAL: number = EMAILS.length;

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
