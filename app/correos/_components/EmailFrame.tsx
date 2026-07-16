"use client";

/**
 * EmailFrame — iframe que se autoajusta al alto real del correo, con modo de
 * edición inline opcional del CUERPO.
 *
 * Auto-alto (siempre): los correos miden entre ~800 y ~1600px y ese alto no se
 * sabe sin renderizar, así que se mide el documento ya cargado. Dos detalles o
 * la medida sale mal:
 *   1. Se mide `body`, NO `documentElement` (el <html> lo estira el alto del
 *      iframe, así que se mediría a sí mismo y nunca encogería).
 *   2. `onLoad` no basta: dispara antes de que carguen imágenes y fuentes. Se
 *      re-mide con `document.fonts.ready`, el load de cada <img> y un
 *      ResizeObserver sobre el body.
 *
 * Edición inline (`editable`): al cargar se marcan como `contenteditable` las
 * celdas de TEXTO del cuerpo del correo (las <td> con texto directo entre el
 * header y el footer). No se toca todo el documento — eso rompería el layout de
 * tablas email-safe. El HTML editado se lee bajo demanda con la ref imperativa
 * (`getHtml`), no en cada tecla, para no re-renderizar mientras se escribe.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import type { ForwardedRef } from "react";

/**
 * Ancho real del correo: la tabla de producción es width=600 MÁS padding:20px
 * (ver prodEmailTemplates.ts), así que ocupa 640.
 */
export const EMAIL_FRAME_W = 640;

/** API imperativa: leer el HTML vivo del iframe (con las ediciones aplicadas). */
export interface EmailFrameHandle {
  /** HTML actual del documento (`<!DOCTYPE html>…`), sin los marcadores de edición. */
  getHtml: () => string;
}

export interface EmailFrameProps {
  html: string;
  title: string;
  /** Alto inicial mientras carga; también el fallback si no se puede medir. */
  fallbackHeight?: number;
  /** Si true, el cuerpo del correo se puede editar inline. */
  editable?: boolean;
}

/** Atributo con el que se marca cada celda de cuerpo editable (para limpiarla al exportar). */
const EDIT_ATTR = "data-lab-edit";

function EmailFrameInner(
  { html, title, fallbackHeight = 1200, editable = false }: EmailFrameProps,
  ref: ForwardedRef<EmailFrameHandle>,
): React.JSX.Element {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const fit = useCallback(function fit(): void {
    const f = frameRef.current;
    if (!f) return;
    try {
      const doc = f.contentDocument ?? f.contentWindow?.document;
      const body = doc?.body;
      if (!body) return;
      const h = Math.ceil(body.getBoundingClientRect().height);
      if (h > 0) f.style.height = `${h}px`;
    } catch {
      f.style.height = `${fallbackHeight}px`;
    }
  }, [fallbackHeight]);

  /**
   * Marca como editable cada <td> del CUERPO que contiene texto directo. Cuerpo
   * = lo que hay entre el primer <img> del header y la consola del footer; para
   * no depender de esa geometría, se usa una heurística simple y segura: una
   * celda es editable si tiene texto propio (no solo espacios) y NO contiene
   * tablas anidadas ni imágenes (esas son estructura/branding, no copy).
   */
  const markEditable = useCallback(function markEditable(doc: Document): void {
    const cells = Array.from(doc.querySelectorAll("td, span, p, a"));
    cells.forEach(function each(el) {
      const hasNestedBlock = el.querySelector("table, img, td, tr");
      const ownText = (el.textContent ?? "").trim();
      if (hasNestedBlock || ownText.length === 0) return;
      // Evita marcar el footer legal y los links de navegación (texto muy chico
      // o dentro de la sección blanca): se permiten, pero se marca todo texto de
      // párrafo; el usuario decide. Mantener simple y reversible.
      el.setAttribute(EDIT_ATTR, "1");
      (el as HTMLElement).contentEditable = "true";
      (el as HTMLElement).style.outline = "none";
    });
  }, []);

  const onLoad = useCallback(function onLoad(): void {
    cleanupRef.current?.();
    cleanupRef.current = null;

    const f = frameRef.current;
    if (!f) return;

    fit();

    try {
      const win = f.contentWindow;
      const doc = f.contentDocument ?? win?.document;
      const body = doc?.body;
      if (!doc || !body || !win) return;

      if (editable) {
        markEditable(doc);
        // Re-medir tras cada edición (el texto puede crecer de línea).
        body.addEventListener("input", fit);
      }

      const offs: Array<() => void> = [];
      if (editable) offs.push(function off() { body.removeEventListener("input", fit); });

      Array.from(doc.images).forEach(function watchImg(img) {
        if (img.complete) return;
        img.addEventListener("load", fit);
        img.addEventListener("error", fit);
        offs.push(function off() {
          img.removeEventListener("load", fit);
          img.removeEventListener("error", fit);
        });
      });

      doc.fonts?.ready.then(fit).catch(function ignore() { /* sin fonts API */ });

      const RO = (win as Window & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
      if (RO) {
        const ro = new RO(fit);
        ro.observe(body);
        offs.push(function off() { ro.disconnect(); });
      }

      cleanupRef.current = function cleanup() { offs.forEach(function run(o) { o(); }); };
    } catch {
      /* documento inaccesible */
    }
  }, [fit, editable, markEditable]);

  useImperativeHandle(ref, function expose() {
    return {
      getHtml: function getHtml(): string {
        const f = frameRef.current;
        const doc = f?.contentDocument ?? f?.contentWindow?.document;
        if (!doc) return html;
        // Clona el documento y quita los marcadores de edición antes de exportar.
        const clone = doc.documentElement.cloneNode(true) as HTMLElement;
        clone.querySelectorAll(`[${EDIT_ATTR}]`).forEach(function strip(el) {
          el.removeAttribute(EDIT_ATTR);
          el.removeAttribute("contenteditable");
          (el as HTMLElement).style.removeProperty("outline");
          if (!el.getAttribute("style")) el.removeAttribute("style");
        });
        return `<!DOCTYPE html>\n${clone.outerHTML}`;
      },
    };
  }, [html]);

  useEffect(function unmount() {
    return function cleanup() {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      title={title}
      srcDoc={html}
      scrolling="no"
      onLoad={onLoad}
      style={{ width: EMAIL_FRAME_W, height: fallbackHeight, border: "none", background: "#FFFFFF", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", flexShrink: 0, display: "block" }}
    />
  );
}

const EmailFrame = forwardRef<EmailFrameHandle, EmailFrameProps>(EmailFrameInner);
export default EmailFrame;
