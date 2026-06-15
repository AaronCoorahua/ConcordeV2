"use client";

/**
 * ImageViewer — Generado por Concorde
 * Fuente: Figma VOYAGER · "ImageViewer" (nodo 2007:16993)
 *
 * Visor de imagen 443×362 (top recto, bottom radius 4). Controles glass
 * (negro 50% + backdrop-blur 2px):
 *   · Expandir (esquina sup-derecha, ícono maximize)
 *   · Flecha ‹ (centro izq) y › (centro der)
 *   · Contador "1/11" (esquina inf-derecha)
 * Sombra 0 0 16px 4px rgba(0,0,0,0.1).
 */

import type { JSX, MouseEventHandler } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImageViewerProps {
  /** URL de la imagen */
  imageSrc?: string;
  /** Alt de la imagen */
  imageAlt?: string;
  /** Índice actual (1-based) para el contador */
  current?: number;
  /** Total de imágenes */
  total?: number;
  onPrev?: MouseEventHandler<HTMLButtonElement>;
  onNext?: MouseEventHandler<HTMLButtonElement>;
  onExpand?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-imageviewer-styles";

const IMAGEVIEWER_STYLES = `
.pviewer {
  position: relative;
  width: 443px;
  max-width: 100%;
  height: 362px;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  background: #F2F4F3;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
.pviewer__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.pviewer__btn {
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
.pviewer__btn:hover { background: rgba(0,0,0,0.65); }
.pviewer__btn:active { transform: scale(0.92); }
.pviewer__btn:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
.pviewer__btn--round { width: 36px; height: 36px; border-radius: 50%; }
.pviewer__expand { top: 12px; right: 12px; }
.pviewer__prev { top: 50%; left: 12px; transform: translateY(-50%); }
.pviewer__next { top: 50%; right: 12px; transform: translateY(-50%); }
.pviewer__prev:active, .pviewer__next:active { transform: translateY(-50%) scale(0.92); }
.pviewer__count {
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
@media (prefers-reduced-motion: reduce) {
  .pviewer__btn { transition: none; }
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImageViewer({
  imageSrc,
  imageAlt = "",
  current = 1,
  total = 11,
  onPrev,
  onNext,
  onExpand,
  className = "",
}: ImageViewerProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = IMAGEVIEWER_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: IMAGEVIEWER_STYLES }} />
      <div className={["pviewer", className].filter(Boolean).join(" ")}>
        {imageSrc ? <img className="pviewer__img" src={imageSrc} alt={imageAlt} /> : null}

        <button type="button" className="pviewer__btn pviewer__btn--round pviewer__expand" onClick={onExpand} aria-label="Ampliar imagen">
          <svg width="22" height="22" viewBox="421 42 16 16" fill="none" aria-hidden="true">
            <path d="M426.833 44H424.833C424.097 44 423.5 44.5974 423.5 45.3333V47.3333M435.5 47.3333V45.3333C435.5 44.5974 434.903 44 434.167 44H432.167M432.167 56H434.167C434.903 56 435.5 55.4026 435.5 54.6667V52.6667M423.5 52.6667V54.6667C423.5 55.4026 424.097 56 424.833 56H426.833"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button type="button" className="pviewer__btn pviewer__btn--round pviewer__prev" onClick={onPrev} aria-label="Imagen anterior">
          <svg width="22" height="22" viewBox="40 199 16 16" fill="none" aria-hidden="true">
            <path d="M50.5 201L42.5 207L50.5 213" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button type="button" className="pviewer__btn pviewer__btn--round pviewer__next" onClick={onNext} aria-label="Imagen siguiente">
          <svg width="22" height="22" viewBox="423 199 16 16" fill="none" aria-hidden="true">
            <path d="M425.5 201L433.5 207L425.5 213" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="pviewer__count">{current}/{total}</span>
      </div>
    </>
  );
}
