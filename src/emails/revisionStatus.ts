/**
 * Estado de revisión de cada correo maquetado — la fuente de verdad es ESTE
 * archivo, no la UI: quien revisa lee, no escribe.
 *
 * Por defecto un correo está «listo para revisar». Solo se listan aquí los que
 * están PENDIENTES, con la nota que explica qué falta; esa nota se muestra al
 * entrar al correo, en la columna derecha, junto a la referencia de Figma.
 *
 * Módulo plano (sin "use client" ni node:fs): lo importan el catálogo (cliente)
 * y el detalle (servidor).
 */

export type RevisionEstado = "listo" | "pendiente";

export interface RevisionPendiente {
  /** Qué falta para poder revisar este correo. Se muestra tal cual. */
  nota: string;
}

/**
 * Correos que NO se pueden revisar todavía, por id. Añadir una entrada aquí lo
 * marca como pendiente en el catálogo y pinta su nota en el detalle; quitarla lo
 * devuelve a «listo para revisar».
 */
export const PENDIENTES: Record<string, RevisionPendiente> = {
  "fee-subascoins": {
    nota:
      "No se dispone del diseño original en Figma para este correo, por lo que no hay referencia contra la que cotejar la maqueta. Queda pendiente de revisión hasta recibirla.",
  },
  "mapfre-invitacion-proceso": {
    nota:
      "En Figma el texto del cuerpo está entregado como imagen, no como texto editable. Es necesario rediseñarlo como contenido HTML antes de dar por válida la maqueta.",
  },
};

export function estadoDe(id: string): RevisionEstado {
  return Object.prototype.hasOwnProperty.call(PENDIENTES, id) ? "pendiente" : "listo";
}

/** Nota del correo si está pendiente; null si está listo para revisar. */
export function notaDe(id: string): string | null {
  return PENDIENTES[id]?.nota ?? null;
}

/** Cuántos correos están pendientes (para el contador del catálogo). */
export const PENDIENTES_TOTAL: number = Object.keys(PENDIENTES).length;
