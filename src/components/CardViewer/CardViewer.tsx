"use client";

/**
 * CardViewer — Generado por Concorde
 * Fuente: Figma VOYAGER · "ImageViewer" (2007:16993) + "Filmstrip" (2007:16994 / 2007:18456)
 *
 * Visor de imagen 443×362 (controles glass: expandir · ‹ · › · contador) CON
 * su tira de miniaturas (Filmstrip 443×87, drag-to-scroll) debajo, como UNA sola
 * unidad. Click en una miniatura → cambia la imagen grande al instante.
 *
 * 2 variantes (por el borde de la miniatura seleccionada):
 *   · live       → white → #F4AC59 → #8460E5 → white
 *   · negotiable → white → #4DDCDC → #6445DF → white
 *
 * Estado interno (no controlado) por defecto; o controlado vía selectedIndex.
 */

import { useId, useRef, useState } from "react";
import type { JSX, MouseEventHandler, PointerEvent as ReactPointerEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardViewerVariant = "live" | "negotiable";

export interface CardViewerProps {
  /** Variante del borde de selección (default "live") */
  variant?: CardViewerVariant;
  /** URLs de las imágenes (visor + miniaturas) */
  images?: string[];
  /** Alt de la imagen grande */
  imageAlt?: string;
  /** Índice seleccionado (controlado, 0-based) */
  selectedIndex?: number;
  /** Índice inicial (no controlado, default 0) */
  defaultIndex?: number;
  /** Callback al cambiar de imagen (click en miniatura o ‹/›) */
  onSelect?: (index: number) => void;
  /** Click en el botón expandir */
  onExpand?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-cardviewer-styles";

const CARDVIEWER_STYLES = `
.pcardv {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 443px;
  max-width: 100%;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}

/* ── Visor de imagen ── */
.pcardv__viewer {
  position: relative;
  width: 100%;
  height: 362px;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  background: #F2F4F3;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
}
.pcardv__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pcardv__btn {
  position: absolute;
  appearance: none;
  border: none;
  background: rgba(0,0,0,0.5);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
}
.pcardv__btn:hover { background: rgba(0,0,0,0.65); }
.pcardv__btn:active { transform: scale(0.92); }
.pcardv__btn:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
.pcardv__btn--round { width: 36px; height: 36px; border-radius: 50%; }
.pcardv__expand { top: 12px; right: 12px; }
.pcardv__prev { top: 50%; left: 12px; transform: translateY(-50%); }
.pcardv__next { top: 50%; right: 12px; transform: translateY(-50%); }
.pcardv__prev:active, .pcardv__next:active { transform: translateY(-50%) scale(0.92); }
.pcardv__count {
  position: absolute;
  bottom: 12px;
  right: 12px;
  height: 24px;
  min-width: 46px;
  padding: 0 10px;
  border-radius: 12px;
  background: rgba(0,0,0,0.5);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Tira de miniaturas (filmstrip) ── */
.pcardv__strip {
  display: flex;
  gap: 9px;
  width: 100%;
  overflow-x: auto;
  padding: 3px;
  box-sizing: border-box;
  scrollbar-width: none;
  cursor: grab;
  scroll-behavior: smooth;
}
.pcardv__strip--dragging { cursor: grabbing; scroll-behavior: auto; }
.pcardv__strip--dragging .pcardv__thumb { pointer-events: none; }
.pcardv__strip::-webkit-scrollbar { display: none; }
.pcardv__thumb {
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
.pcardv__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 5px; }
.pcardv__thumb:hover { transform: translateY(-1px); }
.pcardv__thumb:active { transform: scale(0.98); }
.pcardv__thumb:focus-visible { outline: 2px solid #8460E5; outline-offset: 2px; }
.pcardv__thumb--selected { padding: 3px; box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px; }
.pcardv__thumb--selected img { border-radius: 3px; }
.pcardv--live .pcardv__thumb--selected {
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 25%, #8460E5 75%, #ffffff 100%);
}
.pcardv--negotiable .pcardv__thumb--selected {
  background: linear-gradient(120deg, #ffffff 0%, #4DDCDC 25%, #6445DF 75%, #ffffff 100%);
}

@media (prefers-reduced-motion: reduce) {
  .pcardv__btn, .pcardv__thumb { transition: none; }
}
`;

let _stylesInjected = false;

const DEFAULT_IMAGES = ["", "", "", ""];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CardViewer({
  variant = "live",
  images = DEFAULT_IMAGES,
  imageAlt = "",
  selectedIndex,
  defaultIndex = 0,
  onSelect,
  onExpand,
  className = "",
}: CardViewerProps): JSX.Element {
  const uid = useId().replace(/:/g, "-");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const isControlled = selectedIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const total = images.length;
  const index = isControlled ? selectedIndex : internalIndex;

  function select(target: number): void {
    const next = total > 0 ? ((target % total) + total) % total : 0;
    if (!isControlled) setInternalIndex(next);
    onSelect?.(next);
  }

  // Solo registramos el inicio; NO capturamos el puntero todavía para que un
  // click simple llegue normal al botón de la miniatura.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    // Recién al superar 4px se considera arrastre: capturamos el puntero y
    // desactivamos los clicks de las miniaturas mientras se arrastra.
    if (!drag.current.moved && Math.abs(dx) > 4) {
      drag.current.moved = true;
      el.classList.add("pcardv__strip--dragging");
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
    }
    if (drag.current.moved) {
      el.scrollLeft = drag.current.startScroll - dx;
    }
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    el.classList.remove("pcardv__strip--dragging");
    try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = CARDVIEWER_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const currentSrc = images[index];

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CARDVIEWER_STYLES }} />
      <div className={["pcardv", `pcardv--${variant}`, className].filter(Boolean).join(" ")}>

        {/* Visor */}
        <div className="pcardv__viewer">
          {currentSrc ? <img className="pcardv__img" src={currentSrc} alt={imageAlt} /> : null}

          <button type="button" className="pcardv__btn pcardv__btn--round pcardv__expand" onClick={onExpand} aria-label="Ampliar imagen">
            <svg width="22" height="22" viewBox="421 42 16 16" fill="none" aria-hidden="true">
              <path d="M426.833 44H424.833C424.097 44 423.5 44.5974 423.5 45.3333V47.3333M435.5 47.3333V45.3333C435.5 44.5974 434.903 44 434.167 44H432.167M432.167 56H434.167C434.903 56 435.5 55.4026 435.5 54.6667V52.6667M423.5 52.6667V54.6667C423.5 55.4026 424.097 56 424.833 56H426.833"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button type="button" className="pcardv__btn pcardv__btn--round pcardv__prev" onClick={function prev() { select(index - 1); }} aria-label="Imagen anterior">
            <svg width="22" height="22" viewBox="40 199 16 16" fill="none" aria-hidden="true">
              <path d="M50.5 201L42.5 207L50.5 213" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button type="button" className="pcardv__btn pcardv__btn--round pcardv__next" onClick={function next() { select(index + 1); }} aria-label="Imagen siguiente">
            <svg width="22" height="22" viewBox="423 199 16 16" fill="none" aria-hidden="true">
              <path d="M425.5 201L433.5 207L425.5 213" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <span className="pcardv__count">{index + 1}/{total}</span>
        </div>

        {/* Filmstrip */}
        <div
          ref={trackRef}
          className="pcardv__strip"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {images.map((src, i) => {
            const selected = i === index;
            return (
              <button
                key={`${uid}-${i}`}
                type="button"
                className={["pcardv__thumb", selected ? "pcardv__thumb--selected" : ""].filter(Boolean).join(" ")}
                onClick={function pick() { if (!drag.current.moved) select(i); }}
                aria-label={`Imagen ${i + 1}`}
                aria-current={selected ? "true" : undefined}
              >
                {src ? <img src={src} alt="" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
