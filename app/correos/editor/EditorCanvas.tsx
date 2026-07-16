"use client";

/**
 * EditorCanvas — el lienzo del editor: un iframe con el correo COMPLETO (el
 * documento real de generateEmail + swaps de header/footer) donde cada sección
 * del cuerpo va envuelta en `<tbody data-sec="id">` (válido dentro de <table> y
 * visualmente idéntico), lo que permite:
 *
 *  · click para seleccionar una sección (hover/selección con outline)
 *  · patch EN SITIO del HTML de una sección al editar sus campos — sin recargar
 *    el iframe en cada tecla (patchSection en la ref imperativa)
 *
 * El auto-alto es el mismo enfoque de EmailFrame: medir body + re-medir con
 * fonts.ready, load de imágenes y ResizeObserver.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import type { ForwardedRef } from "react";
import { EMAIL_FRAME_W } from "@/app/correos/_components/EmailFrame";

export interface EditorCanvasHandle {
  /** Reemplaza el HTML interno de la sección `id` sin recargar el documento. */
  patchSection: (id: string, html: string) => void;
}

export interface EditorCanvasProps {
  /** Documento HTML completo (con los marcadores data-sec ya inyectados). */
  doc: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

/** CSS del editor que se inyecta en el documento del canvas. */
export const CANVAS_CSS = `
  tbody[data-sec] { cursor: pointer; }
  tbody[data-sec]:hover { outline: 2px dashed #a78bfa; outline-offset: -2px; }
  tbody[data-sec].sec-on { outline: 2px solid #4f2ed8; outline-offset: -2px; }
`;

function EditorCanvasInner(
  { doc, selectedId, onSelect }: EditorCanvasProps,
  ref: ForwardedRef<EditorCanvasHandle>,
): React.JSX.Element {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;

  const fit = useCallback(function fit(): void {
    const f = frameRef.current;
    if (!f) return;
    try {
      const body = (f.contentDocument ?? f.contentWindow?.document)?.body;
      if (!body) return;
      const h = Math.ceil(body.getBoundingClientRect().height);
      if (h > 0) f.style.height = `${h}px`;
    } catch { /* documento inaccesible */ }
  }, []);

  /** Marca la selección activa dentro del documento (sin recargar). */
  const syncSelection = useCallback(function syncSelection(): void {
    const f = frameRef.current;
    const d = f?.contentDocument ?? f?.contentWindow?.document;
    if (!d) return;
    d.querySelectorAll("tbody.sec-on").forEach(function clear(el) { el.classList.remove("sec-on"); });
    if (selectedId) d.querySelector(`tbody[data-sec="${CSS.escape(selectedId)}"]`)?.classList.add("sec-on");
  }, [selectedId]);

  const onLoad = useCallback(function onLoad(): void {
    cleanupRef.current?.();
    cleanupRef.current = null;

    const f = frameRef.current;
    if (!f) return;
    fit();

    try {
      const win = f.contentWindow;
      const d = f.contentDocument ?? win?.document;
      const body = d?.body;
      if (!d || !body || !win) return;

      // Click: seleccionar sección (y bloquear la navegación de los <a> del correo).
      function onClick(e: MouseEvent): void {
        const target = e.target as Element | null;
        if (target?.closest("a")) e.preventDefault();
        const sec = target?.closest("tbody[data-sec]");
        selectRef.current(sec ? sec.getAttribute("data-sec") : null);
      }
      d.addEventListener("click", onClick);

      const offs: Array<() => void> = [function offClick() { d.removeEventListener("click", onClick); }];

      Array.from(d.images).forEach(function watchImg(img) {
        if (img.complete) return;
        img.addEventListener("load", fit);
        img.addEventListener("error", fit);
        offs.push(function off() {
          img.removeEventListener("load", fit);
          img.removeEventListener("error", fit);
        });
      });

      d.fonts?.ready.then(fit).catch(function ignore() { /* sin fonts API */ });

      const RO = (win as Window & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
      if (RO) {
        const ro = new RO(fit);
        ro.observe(body);
        offs.push(function off() { ro.disconnect(); });
      }

      cleanupRef.current = function cleanup() { offs.forEach(function run(o) { o(); }); };
      syncSelection();
    } catch { /* documento inaccesible */ }
  }, [fit, syncSelection]);

  useImperativeHandle(ref, function expose() {
    return {
      patchSection: function patchSection(id: string, html: string): void {
        const f = frameRef.current;
        const d = f?.contentDocument ?? f?.contentWindow?.document;
        const tbody = d?.querySelector(`tbody[data-sec="${CSS.escape(id)}"]`);
        if (tbody) {
          tbody.innerHTML = html;
          fit();
        }
      },
    };
  }, [fit]);

  // La selección puede cambiar sin recargar el doc.
  useEffect(function onSelectionChange() { syncSelection(); }, [syncSelection]);

  useEffect(function unmount() {
    return function cleanup() {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      title="Canvas del correo"
      srcDoc={doc}
      scrolling="no"
      onLoad={onLoad}
      style={{ width: EMAIL_FRAME_W, height: 900, border: "none", background: "#FFFFFF", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", flexShrink: 0, display: "block" }}
    />
  );
}

const EditorCanvas = forwardRef<EditorCanvasHandle, EditorCanvasProps>(EditorCanvasInner);
export default EditorCanvas;
