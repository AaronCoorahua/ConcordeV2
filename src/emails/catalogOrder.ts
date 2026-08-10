/**
 * El ORDEN del catálogo de correos — una sola definición, compartida por el
 * catálogo (cliente) y el detalle (servidor).
 *
 * Importa: los botones «anterior / siguiente» del detalle recorren exactamente
 * este orden, así que si el catálogo ordenara por su cuenta y el detalle por la
 * suya, navegar saltaría correos. Todo el que necesite el orden lo pide aquí.
 *
 * Criterio: categoría tras categoría (en el orden en que aparecen en EMAILS, con
 * «General» al final) y, dentro de cada una, por paso del flujo según
 * STAGE_ORDER; los correos que comparten paso conservan el orden del origen.
 *
 * Módulo plano (sin "use client" ni node:fs): usable desde cliente y servidor.
 */

import { EMAILS, STAGE_ORDER, type EmailTemplate } from "./prodEmails";

/** Correos sin `category` en el origen (p. ej. el aviso de fee) van al final. */
export const SIN_CATEGORIA = "General";

export function categoriaDe(e: EmailTemplate): string {
  return e.category ?? SIN_CATEGORIA;
}

/**
 * Posición de un correo dentro de su categoría: primero por el orden de flujo de
 * STAGE_ORDER; si su categoría no lo define, se respeta el orden del origen.
 */
function stageIndex(categoria: string, stage: string | undefined): number {
  const order = STAGE_ORDER[categoria];
  if (!order || !stage) return Number.MAX_SAFE_INTEGER;
  const i = order.indexOf(stage);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

/** Una categoría con sus correos ya ordenados por flujo. */
export interface CategoriaOrdenada {
  categoria: string;
  correos: EmailTemplate[];
}

function ordenar(): CategoriaOrdenada[] {
  const byCategory = new Map<string, EmailTemplate[]>();
  EMAILS.forEach(function collect(e) {
    const cat = categoriaDe(e);
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
    .map(function toGroup([categoria, list]): CategoriaOrdenada {
      // El índice del origen desempata cuando dos correos comparten stage (o
      // cuando la categoría no define STAGE_ORDER): orden estable.
      const correos = list
        .map(function withIndex(e, i) { return { e, i }; })
        .sort(function byFlow(a, b) {
          const d = stageIndex(categoria, a.e.stage) - stageIndex(categoria, b.e.stage);
          return d !== 0 ? d : a.i - b.i;
        })
        .map(function unwrap(x) { return x.e; });
      return { categoria, correos };
    });
}

/** Las categorías con sus correos, en el orden en que se ven en el catálogo. */
export const CATEGORIAS_ORDENADAS: CategoriaOrdenada[] = ordenar();

/** Los 45 correos aplanados, en el mismo orden que recorre «siguiente». */
export const CORREOS_ORDENADOS: EmailTemplate[] = CATEGORIAS_ORDENADAS.flatMap(
  function flat(g) { return g.correos; },
);
