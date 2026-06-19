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
/* Gradientes animados — mismos que el primary de Button (.pvbtn) */
@property --pbb-angle { syntax: "<angle>"; inherits: false; initial-value: 135deg; }
@property --pbb-stop-a { syntax: "<color>"; inherits: false; initial-value: #ed8936; }
@property --pbb-stop-b { syntax: "<color>"; inherits: false; initial-value: #8460e5; }

.pbidbtn {
  --pbb-stop-a: var(--vmc-color-orange-600, #ed8936);
  --pbb-stop-b: var(--vmc-color-vault-500, #8460e5);
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: 54px;
  padding: 0;
  border-radius: 27px;
  border: 2px solid transparent;
  background-image:
    linear-gradient(var(--pbb-angle), var(--pbb-stop-a) 0%, var(--pbb-stop-a) 40%, var(--pbb-stop-b) 100%),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: rgba(255,255,255,0.28) 0 1px 0 2px inset, rgba(237,137,54,0.3) 0 2px 6px;
  color: #ffffff;
  text-shadow: rgba(0,0,0,0.25) 0px 1px 3px;
  cursor: pointer;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  transition:
    --pbb-angle 0.4s cubic-bezier(0.25,0.8,0.25,1),
    --pbb-stop-a 0.35s,
    --pbb-stop-b 0.35s,
    transform 0.2s cubic-bezier(0.25,0.8,0.25,1),
    box-shadow 0.25s;
  transform: translateZ(0);
  -webkit-tap-highlight-color: transparent;
}
/* Brillo superior (paint2: white 0.22 → 0) */
.pbidbtn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 27px;
  background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 52%);
  pointer-events: none;
  z-index: 1;
}
/* Glow exterior — igual que el primary de Button (.pvbtn::after) */
.pbidbtn::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 27px;
  background: linear-gradient(135deg,
    var(--vmc-color-orange-600, #ed8936),
    var(--vmc-color-vault-500, #8460e5));
  filter: blur(14px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, filter 0.3s;
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
/* Hover / press IDÉNTICOS al primary de Button (.pvbtn) */
.pbidbtn:hover {
  --pbb-angle: 220deg;
  --pbb-stop-a: var(--vmc-color-orange-400, #fbc47d);
  --pbb-stop-b: var(--vmc-color-vault-400, #ae8eff);
  transform: translateY(-2px) scale(1.02);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.35) 0 8px 24px, rgba(237,137,54,0.4) 0 4px 10px;
}
.pbidbtn:hover::after { opacity: 0.45; filter: blur(18px); }
.pbidbtn:active {
  --pbb-angle: 135deg;
  --pbb-stop-a: var(--vmc-color-orange-700, #d46e20);
  --pbb-stop-b: var(--vmc-color-vault-600, #5a35c2);
  color: #d1d5dc;
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}
.pbidbtn:active::after { opacity: 0; }
.pbidbtn:disabled {
  background-image: none;
  background-color: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
  border-color: transparent;
}
.pbidbtn:disabled::before { display: none; }
.pbidbtn:disabled::after { display: none; }
.pbidbtn:focus-visible {
  outline: transparent solid 3px;
  outline-offset: 4px;
  transform: scale(0.98);
  box-shadow:
    0 0 0 2px var(--vmc-color-base-white, #fff),
    0 0 0 5px var(--vmc-color-vault-500, #8460e5),
    0 8px 16px -4px rgba(132,96,229,0.3);
}
@media (prefers-reduced-motion: reduce) {
  .pbidbtn { transition: none; }
  .pbidbtn::after { transition: none; }
}
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
