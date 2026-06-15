"use client";

/**
 * Filmstrip — Generado por Concorde
 * Fuente: Figma VOYAGER · "Filmstrip" (nodo 2007:16994 / 2007:18456)
 *
 * Tira de miniaturas 443×87. La miniatura seleccionada lleva un borde
 * gradiente de 3px. 2 variantes:
 *   · live       → white → #F4AC59 → #8460E5 → white
 *   · negotiable → white → #4DDCDC → #6445DF → white
 * Miniatura 113×84, radius 4, gap 9.
 */

import { useId, useRef } from "react";
import type { JSX, PointerEvent as ReactPointerEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilmstripVariant = "live" | "negotiable";

export interface FilmstripProps {
  /** Variante del borde de selección (default "live") */
  variant?: FilmstripVariant;
  /** URLs de miniaturas */
  images?: string[];
  /** Índice seleccionado (0-based) */
  selectedIndex?: number;
  /** Callback al elegir una miniatura */
  onSelect?: (index: number) => void;
  className?: string;
}

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-filmstrip-styles";

const FILMSTRIP_STYLES = `
.pfilm {
  display: flex;
  gap: 9px;
  width: 443px;
  max-width: 100%;
  overflow-x: auto;
  padding: 3px;
  box-sizing: border-box;
  scrollbar-width: none;
  cursor: grab;
  scroll-behavior: smooth;
}
.pfilm--dragging { cursor: grabbing; scroll-behavior: auto; }
.pfilm--dragging .pfilm__thumb { pointer-events: none; }
.pfilm::-webkit-scrollbar { display: none; }
.pfilm__thumb {
  position: relative;
  flex-shrink: 0;
  width: 113px;
  height: 84px;
  border-radius: 5px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.18s, box-shadow 0.18s;
}
.pfilm__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 5px;
}
.pfilm__thumb:hover { transform: translateY(-1px); }
.pfilm__thumb:active { transform: scale(0.98); }
.pfilm__thumb:focus-visible { outline: 2px solid #8460E5; outline-offset: 2px; }
.pfilm__thumb--selected {
  padding: 3px;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
}
.pfilm--live .pfilm__thumb--selected {
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 25%, #8460E5 75%, #ffffff 100%);
}
.pfilm--negotiable .pfilm__thumb--selected {
  background: linear-gradient(120deg, #ffffff 0%, #4DDCDC 25%, #6445DF 75%, #ffffff 100%);
}
.pfilm__thumb--selected img { border-radius: 3px; }
@media (prefers-reduced-motion: reduce) {
  .pfilm__thumb { transition: none; }
}
`;

let _stylesInjected = false;

const DEFAULT_IMAGES = ["", "", "", ""];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Filmstrip({
  variant = "live",
  images = DEFAULT_IMAGES,
  selectedIndex = 0,
  onSelect,
  className = "",
}: FilmstripProps): JSX.Element {
  const uid = useId().replace(/:/g, "-");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.classList.add("pfilm--dragging");
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    el.classList.remove("pfilm--dragging");
    try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = FILMSTRIP_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: FILMSTRIP_STYLES }} />
      <div
        ref={trackRef}
        className={["pfilm", `pfilm--${variant}`, className].filter(Boolean).join(" ")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {images.map((src, i) => {
          const selected = i === selectedIndex;
          return (
            <button
              key={`${uid}-${i}`}
              type="button"
              className={["pfilm__thumb", selected ? "pfilm__thumb--selected" : ""].filter(Boolean).join(" ")}
              onClick={() => { if (!drag.current.moved) onSelect?.(i); }}
              aria-label={`Imagen ${i + 1}`}
              aria-current={selected ? "true" : undefined}
            >
              {src ? <img src={src} alt="" /> : null}
            </button>
          );
        })}
      </div>
    </>
  );
}
