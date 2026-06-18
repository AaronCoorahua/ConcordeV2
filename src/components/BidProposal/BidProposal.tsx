"use client";

/**
 * BidProposal — Generado por Concorde
 * Fuente: Figma VOYAGER · "PropuestBid" (3162:13023)
 *
 * Card 280×80 (radio 14) con relleno gradiente morado (#5F3ED8 → #340091 →
 * #140046), borde gradiente (white → #F4AC59 → #8460E5 → white) y sombra. Arriba
 * un punto + label naranja con glow (#FF9C3B); debajo el monto grande blanco con
 * glow morado. `label` y `amount` editables. Copia del SVG (colores/efectos).
 */

import type { JSX } from "react";

export interface BidProposalProps {
  /** Texto superior (naranja) — default "PROPUESTA · BID ACTUAL" */
  label?: string;
  /** Monto grande (blanco) — default "US$ 25,000" */
  amount?: string;
  className?: string;
}

const STYLE_ID = "concorde-bidproposal-styles";

const BIDPROPOSAL_STYLES = `
.pbid {
  position: relative;
  box-sizing: border-box;
  width: 280px;
  max-width: 100%;
  height: 80px;
  border-radius: 14px;
  border: 2px solid transparent;
  background-image:
    linear-gradient(160deg, #5F3ED8 0%, #340091 50%, #140046 100%),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: rgba(3,1,19,0.45) 0px 5px 20px, inset 0px 1px 0px rgba(255,255,255,0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 16px;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  overflow: hidden;
}
.pbid__label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #FF9C3B;
  text-shadow: 0 0 6px rgba(239,133,46,0.5);
  white-space: nowrap;
}
.pbid__dot {
  width: 5.3px;
  height: 5.3px;
  border-radius: 50%;
  background: #FF9C3B;
  box-shadow: 0 0 7px 1px rgba(239,133,46,0.9);
  flex-shrink: 0;
}
.pbid__amount {
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.01em;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-shadow:
    0 0 4px rgba(174,166,255,0.7),
    0 0 9px rgba(107,85,222,0.6),
    0 0 18px rgba(82,52,189,0.5),
    0 0 30px rgba(49,0,138,0.4);
}
`;

let _stylesInjected = false;

export default function BidProposal({
  label = "PROPUESTA · BID ACTUAL",
  amount = "US$ 25,000",
  className = "",
}: BidProposalProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDPROPOSAL_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDPROPOSAL_STYLES }} />
      <div className={`pbid ${className}`.trim()}>
        <span className="pbid__label">
          <span className="pbid__dot" aria-hidden="true" />
          {label}
        </span>
        <span className="pbid__amount">{amount}</span>
      </div>
    </>
  );
}
