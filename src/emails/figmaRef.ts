/**
 * La referencia de Figma de un correo: qué archivo se encontró y de qué formato.
 *
 * Módulo plano (sin "use client" ni node:fs) porque el tipo lo necesitan ambos
 * lados: el Server Component que resuelve el archivo mirando el disco
 * (app/correos/[id]/page.tsx) y el Client Component que lo pinta (BannerLab).
 *
 * Ver public/figma/correos/README.md para cómo dejar los exports.
 */

/** Formatos aceptados como referencia visual de un correo. */
export type FigmaKind = "html" | "svg" | "png";

export interface FigmaRef {
  /** Ruta pública del archivo (`/figma/correos/{id}.{ext}`). */
  src: string;
  /** Qué formato se resolvió — decide si se pinta en `<iframe>` o en `<img>`. */
  kind: FigmaKind;
}
