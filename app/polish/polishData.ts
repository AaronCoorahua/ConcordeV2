/**
 * polishData.ts — columnas del tablero /polish y utilidades compartidas entre la
 * página (server), el tablero (client) y la ruta /api/polish.
 *
 * Módulo plano (sin "use client"). Los tickets son las entradas de
 * app/reporte/reportData.ts; aquí solo se define en qué columnas pueden estar.
 */

import type { ReportEntry } from "@/app/reporte/reportData";

export type PolishStatus = ReportEntry["status"];

export interface PolishColumn {
  status: PolishStatus;
  label: string;
  /** Qué significa que un ticket esté en esta columna. */
  hint: string;
  tone: string;
}

export const POLISH_COLUMNS: PolishColumn[] = [
  { status: "pendiente", label: "Por hacer", hint: "Ticket creado, IT aún no lo toma", tone: "#94a3b8" },
  { status: "en-progreso", label: "En progreso", hint: "IT lo está corrigiendo", tone: "#4f2ed8" },
  { status: "en-revision", label: "En revisión", hint: "Corregido, falta compararlo con Concorde", tone: "#f97316" },
  { status: "corregido", label: "Listo", hint: "Ya está igual que Concorde", tone: "#16a34a" },
];

export function isPolishStatus(value: unknown): value is PolishStatus {
  return POLISH_COLUMNS.some(function sameStatus(c) {
    return c.status === value;
  });
}

/** Lo mínimo de un ticket que necesita el tablero (no viaja el código al cliente). */
export interface PolishTicket {
  slug: string;
  /** Pantalla o componente: la parte del título antes de « — ». */
  area: string;
  /** El problema: la parte del título después de « — ». */
  resumen: string;
  date: string;
  /** Columna inicial, la del archivo de datos. */
  base: PolishStatus;
  codeLink?: string;
  handoffLink?: string;
  /** Miniatura de la tarjeta. */
  preview?: string;
}

function primera(src: string | string[]): string | undefined {
  const valor = Array.isArray(src) ? src[0] : src;
  return valor ? valor : undefined;
}

/** La miniatura es lo que se ve mal en producción: la captura, o el cuadro del video.
 *  Si no hay ninguno, la imagen de Concorde. */
export function previewDe(e: ReportEntry): string | undefined {
  const produccion = e.originalVideo ? e.originalPoster : primera(e.originalImage);
  return produccion ?? primera(e.concordeImage);
}

/** «Sidebar — logo pegado al top» → { area: "Sidebar", resumen: "Logo pegado al top" } */
export function splitTitle(title: string): { area: string; resumen: string } {
  const corte = title.indexOf(" — ");
  if (corte === -1) return { area: "General", resumen: title };
  const resto = title.slice(corte + 3);
  return { area: title.slice(0, corte), resumen: resto.charAt(0).toUpperCase() + resto.slice(1) };
}
