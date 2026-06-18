"use client";

/**
 * BidButton — Generado por Concorde
 * Fuente: Figma VOYAGER · "Button" (3182:12949)
 *
 * Pastilla (radio 27, alto 54) con relleno gradiente naranja→morado
 * (#ED8936 → #8460E5), borde gradiente (white → #F4AC59 → #8460E5 → white),
 * brillo superior y sombra. Dos textos (label + monto) separados por un divisor
 * vertical blanco 60%. `label` y `amount` editables. Copia del SVG.
 */

import type { JSX, MouseEventHandler } from "react";

export interface BidButtonProps {
  /** Texto izquierdo (default "BIDEAR") */
  label?: string;
  /** Monto derecho (default "US$ 25,000") */
  amount?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

const STYLE_ID = "concorde-bidbutton-styles";

const BIDBUTTON_STYLES = `
.pbidbtn {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: 54px;
  padding: 0;
  border-radius: 27px;
  border: 2px solid transparent;
  background-image:
    linear-gradient(120deg, #ED8936 0%, #ED8936 40%, #8460E5 100%),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
  color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  transition: transform 0.15s cubic-bezier(0.3,0,0,1), box-shadow 0.2s, filter 0.2s;
  -webkit-tap-highlight-color: transparent;
}
/* Brillo superior (paint2: white 0.22 → 0) */
.pbidbtn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 52%);
  pointer-events: none;
}
.pbidbtn__label,
.pbidbtn__amount {
  position: relative;
  z-index: 1;
  padding: 0 22px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.01em;
  white-space: nowrap;
  text-shadow: rgba(0,0,0,0.25) 0px 1px 2px;
}
.pbidbtn__divider {
  position: relative;
  z-index: 1;
  width: 1px;
  height: 24px;
  background: rgba(255,255,255,0.6);
  flex-shrink: 0;
}
.pbidbtn:hover { transform: translateY(-1px); filter: brightness(1.04); box-shadow: rgba(0,0,0,0.18) 0px 6px 18px; }
.pbidbtn:active { transform: scale(0.98); }
.pbidbtn:focus-visible { outline: 2px solid #8460E5; outline-offset: 3px; }
.pbidbtn:disabled { cursor: not-allowed; opacity: 0.6; filter: grayscale(0.2); }
@media (prefers-reduced-motion: reduce) { .pbidbtn { transition: none; } }
`;

let _stylesInjected = false;

export default function BidButton({
  label = "BIDEAR",
  amount = "US$ 25,000",
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
  className = "",
}: BidButtonProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDBUTTON_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDBUTTON_STYLES }} />
      <button
        type="button"
        className={`pbidbtn ${className}`.trim()}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel ?? `${label} ${amount}`}
      >
        <span className="pbidbtn__label">{label}</span>
        <span className="pbidbtn__divider" aria-hidden="true" />
        <span className="pbidbtn__amount">{amount}</span>
      </button>
    </>
  );
}
