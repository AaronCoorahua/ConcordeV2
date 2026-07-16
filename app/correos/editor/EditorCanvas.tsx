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
  /** Soltaron un bloque NUEVO de la paleta en la posición `index`. */
  onDropNew: (type: string, index: number) => void;
  /** Arrastraron una sección existente a la posición `index`. */
  onReorder: (id: string, index: number) => void;
}

/** Tipos MIME propios del drag & drop del editor. */
export const DND_NEW = "application/x-concorde-block";
export const DND_MOVE = "application/x-concorde-section";

/** CSS del editor que se inyecta en el documento del canvas. */
export const CANVAS_CSS = `
  tbody[data-sec] { cursor: pointer; }
  tbody[data-sec]:hover { outline: 2px dashed #a78bfa; outline-offset: -2px; }
  tbody[data-sec].sec-on { outline: 2px solid #4f2ed8; outline-offset: -2px; }
`;

function EditorCanvasInner(
  { doc, selectedId, onSelect, onDropNew, onReorder }: EditorCanvasProps,
  ref: ForwardedRef<EditorCanvasHandle>,
): React.JSX.Element {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  const dropNewRef = useRef(onDropNew);
  dropNewRef.current = onDropNew;
  const reorderRef = useRef(onReorder);
  reorderRef.current = onReorder;

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
      const maybeDoc = f.contentDocument ?? win?.document;
      const maybeBody = maybeDoc?.body;
      if (!maybeDoc || !maybeBody || !win) return;
      // Alias ya estrechados: el narrowing de TS no cruza a los closures de abajo.
      const d: Document = maybeDoc;
      const body: HTMLElement = maybeBody;

      // Click: seleccionar sección (y bloquear la navegación de los <a> del correo).
      function onClick(e: MouseEvent): void {
        const target = e.target as Element | null;
        if (target?.closest("a")) e.preventDefault();
        const sec = target?.closest("tbody[data-sec]");
        selectRef.current(sec ? sec.getAttribute("data-sec") : null);
      }
      d.addEventListener("click", onClick);

      const offs: Array<() => void> = [function offClick() { d.removeEventListener("click", onClick); }];

      // ── Drag & drop: soltar bloques de la paleta y reordenar secciones ──
      body.style.position = "relative";
      const line = d.createElement("div");
      line.id = "__dropline";
      line.style.cssText = "position:absolute;left:8px;right:8px;height:4px;border-radius:4px;background:#f1705d;box-shadow:0 0 0 3px rgba(241,112,93,0.25);display:none;pointer-events:none;z-index:99;";
      body.appendChild(line);

      const secList = (): HTMLElement[] => Array.from(d.querySelectorAll<HTMLElement>("tbody[data-sec]"));

      /** Índice de inserción según la Y del cursor (documento sin scroll interno). */
      function dropIndexAt(y: number): number {
        const list = secList();
        for (let i = 0; i < list.length; i += 1) {
          const r = list[i].getBoundingClientRect();
          if (y < r.top + r.height / 2) return i;
        }
        return list.length;
      }

      /** Y (px del documento) donde va la línea indicadora para `index`. */
      function lineYFor(index: number): number {
        const list = secList();
        if (list.length === 0) {
          // Sin secciones: bajo el header (aprox. tercio superior del correo).
          return Math.min(360, d.body.getBoundingClientRect().height / 3);
        }
        const r = index < list.length ? list[index].getBoundingClientRect() : list[list.length - 1].getBoundingClientRect();
        return index < list.length ? r.top - 3 : r.bottom - 1;
      }

      // Cada sección se puede arrastrar para reordenar.
      secList().forEach(function makeDraggable(el) {
        el.draggable = true;
        el.addEventListener("dragstart", function onDragStart(e) {
          e.dataTransfer?.setData(DND_MOVE, el.getAttribute("data-sec") ?? "");
          if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
        });
      });

      function isOurs(e: DragEvent): boolean {
        const types = e.dataTransfer ? Array.from(e.dataTransfer.types) : [];
        return types.includes(DND_NEW) || types.includes(DND_MOVE);
      }

      function onDragOver(e: DragEvent): void {
        if (!isOurs(e)) return;
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = Array.from(e.dataTransfer.types).includes(DND_NEW) ? "copy" : "move";
        line.style.display = "block";
        line.style.top = `${lineYFor(dropIndexAt(e.clientY))}px`;
      }
      function onDrop(e: DragEvent): void {
        if (!isOurs(e)) return;
        e.preventDefault();
        line.style.display = "none";
        const index = dropIndexAt(e.clientY);
        const nuevo = e.dataTransfer?.getData(DND_NEW);
        if (nuevo) {
          dropNewRef.current(nuevo, index);
          return;
        }
        const id = e.dataTransfer?.getData(DND_MOVE);
        if (id) reorderRef.current(id, index);
      }
      function onDragLeave(e: DragEvent): void {
        if (!e.relatedTarget) line.style.display = "none";
      }
      d.addEventListener("dragover", onDragOver);
      d.addEventListener("drop", onDrop);
      d.addEventListener("dragleave", onDragLeave);
      offs.push(function offDnd() {
        d.removeEventListener("dragover", onDragOver);
        d.removeEventListener("drop", onDrop);
        d.removeEventListener("dragleave", onDragLeave);
      });

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
