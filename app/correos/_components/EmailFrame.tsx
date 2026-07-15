"use client";

/**
 * EmailFrame — iframe que se autoajusta al alto real del correo.
 *
 * Los correos de producción miden entre ~800px y ~1600px y ese alto no se sabe
 * sin renderizarlos, así que en vez de hardcodear un alto por correo (que
 * recortaría unos y dejaría hueco en otros) se mide el documento ya cargado.
 *
 * Dos detalles que hay que respetar o la medida sale mal:
 *
 *  1. Se mide `body`, NO `documentElement`. El <html> lo estira el propio alto
 *     del iframe, así que su scrollHeight devuelve el alto actual del frame en
 *     vez del alto del contenido — se mide a sí mismo y nunca encoge.
 *
 *  2. `onLoad` no basta: dispara antes de que carguen las imágenes remotas del
 *     CDN y las fuentes, cuando el layout aún no es el definitivo. Por eso se
 *     re-mide con `document.fonts.ready`, con el load de cada <img> y con un
 *     ResizeObserver sobre el body (que cubre cualquier reflow posterior).
 */

import { useCallback, useEffect, useRef } from "react";
import type { JSX } from "react";

/**
 * Ancho real del correo: la tabla de producción es width=600 MÁS padding:20px
 * (ver prodEmailTemplates.ts), así que ocupa 640. Con 600 el correo se
 * recortaría 40px en horizontal.
 */
export const EMAIL_FRAME_W = 640;

export interface EmailFrameProps {
  html: string;
  title: string;
  /** Alto inicial mientras carga; también el fallback si no se puede medir. */
  fallbackHeight?: number;
}

export default function EmailFrame({ html, title, fallbackHeight = 1200 }: EmailFrameProps): JSX.Element {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const fit = useCallback(function fit(): void {
    const f = ref.current;
    if (!f) return;
    try {
      const doc = f.contentDocument ?? f.contentWindow?.document;
      const body = doc?.body;
      if (!body) return;
      const h = Math.ceil(body.getBoundingClientRect().height);
      if (h > 0) f.style.height = `${h}px`;
    } catch {
      // Documento inaccesible (no debería pasar con srcDoc): deja el fallback.
      f.style.height = `${fallbackHeight}px`;
    }
  }, [fallbackHeight]);

  /** Engancha las re-medidas al documento del iframe una vez cargado. */
  const onLoad = useCallback(function onLoad(): void {
    cleanupRef.current?.();
    cleanupRef.current = null;

    const f = ref.current;
    if (!f) return;

    fit(); // primera medida: sirve mientras cargan imágenes y fuentes

    try {
      const win = f.contentWindow;
      const doc = f.contentDocument ?? win?.document;
      const body = doc?.body;
      if (!doc || !body || !win) return;

      const offs: Array<() => void> = [];

      // Cada imagen del CDN que llega cambia el alto.
      Array.from(doc.images).forEach(function watchImg(img) {
        if (img.complete) return;
        img.addEventListener("load", fit);
        img.addEventListener("error", fit);
        offs.push(function off() {
          img.removeEventListener("load", fit);
          img.removeEventListener("error", fit);
        });
      });

      // Las webfonts re-flowan el texto al aplicarse.
      doc.fonts?.ready.then(fit).catch(function ignore() { /* sin fonts API */ });

      // Red de seguridad para cualquier reflow posterior. Se usa el
      // ResizeObserver del iframe (no el de la página) para observar un nodo de
      // su propio documento; `Window` no lo declara, de ahí el cast puntual.
      const RO = (win as Window & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
      if (RO) {
        const ro = new RO(fit);
        ro.observe(body);
        offs.push(function off() { ro.disconnect(); });
      }

      cleanupRef.current = function cleanup() { offs.forEach(function run(o) { o(); }); };
    } catch {
      // Documento inaccesible: la medida inicial es lo que hay.
    }
  }, [fit]);

  useEffect(function unmount() {
    return function cleanup() {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={html}
      scrolling="no"
      onLoad={onLoad}
      style={{ width: EMAIL_FRAME_W, height: fallbackHeight, border: "none", background: "#FFFFFF", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", flexShrink: 0, display: "block" }}
    />
  );
}
