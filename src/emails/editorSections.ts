/**
 * editorSections — la capa de secciones del EDITOR, un superset de las de
 * producción: además de los 23 tipos del renderer, existe el tipo "html", un
 * bloque de HTML libre (filas <tr> email-safe).
 *
 * Para qué: que la IA pueda editar CUALQUIER cosa. Los tipos de producción solo
 * exponen textos/imágenes por `content`; cuando un pedido exige tocar estilo
 * (colores, fondos, posiciones), la IA devuelve la sección como tipo "html"
 * con su HTML modificado — y el editor la renderiza tal cual.
 *
 * Módulo plano (sin "use client" ni node:fs).
 */

import { renderSection, generateEmail, type Section } from "./prodEmailTemplates";

/** Sección del editor: una de producción o un bloque de HTML libre. */
export interface EdSection {
  id: string;
  type: Section["type"] | "html";
  content: Record<string, string>;
}

export function isHtmlSection(s: EdSection): boolean {
  return s.type === "html";
}

export function newHtmlSection(html: string): EdSection {
  return {
    id: `html-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: "html",
    content: { html },
  };
}

/** HTML (filas <tr>) de una sección del editor. */
export function renderEdSection(s: EdSection): string {
  if (s.type === "html") return s.content.html ?? "";
  return renderSection(s as Section);
}

/** Marcador estable: el spacer que generateEmail emite justo tras el header. */
const HEADER_SPACER = '<tr><td height="20"></td></tr>';

/**
 * Correo completo (shell real de producción + secciones del editor). Para
 * secciones 100% de producción es equivalente a generateEmail(sections).
 */
export function buildEmailFromEd(sections: EdSection[], subject: string): string {
  const shell = generateEmail([], subject);
  const body = sections.map(renderEdSection).join("\n");
  const at = shell.indexOf(HEADER_SPACER);
  if (at === -1) return shell;
  const cut = at + HEADER_SPACER.length;
  return `${shell.slice(0, cut)}\n${body}${shell.slice(cut)}`;
}

/**
 * Saneado mínimo del HTML que devuelve la IA para bloques "html": fuera
 * scripts, handlers inline y URLs javascript:. Es HTML de correo (tablas +
 * estilos inline); nada de eso es legítimo ahí.
 */
export function sanitizeBlockHtml(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}
