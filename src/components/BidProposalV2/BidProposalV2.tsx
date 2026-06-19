"use client";

/**
 * BidProposalV2 — Generado por Concorde
 * Fuente: Figma VOYAGER · "PropuestaBid v2 / Default" (3300:12845)
 *
 * Variante glassmorphic de la propuesta de bid: card 278×78 (radio 20) con
 * relleno white 8% + backdrop-blur(14px), borde gradiente (white→#F4AC59→
 * #8460E5→white) y sombra morada. Monto grande blanco con glow morado (4 capas)
 * y, DEBAJO, una caption en degradado lila (#CFBAFF→white→#AE8EFF→#CFBAFF) con
 * glow naranja. `amount` y `label` editables. Pensada para fondos oscuros.
 */

import type { JSX } from "react";

export interface BidProposalV2Props {
  /** Monto grande (blanco) — default "US$ 6,559" */
  amount?: string;
  /** Caption inferior (degradado lila) — default "ENVIADO POR ZAE389" */
  label?: string;
  className?: string;
}

const STYLE_ID = "concorde-bidproposalv2-styles";

const BIDPROPOSALV2_STYLES = `
.pbidv2 {
  position: relative;
  box-sizing: border-box;
  width: 278px;
  max-width: 100%;
  height: 78px;
  border-radius: 20px;
  /* GLASS real: white ~10% + backdrop-blur fuerte (Figma "Background blur 28") */
  background: rgba(255,255,255,0.10);
  -webkit-backdrop-filter: blur(22px);
  backdrop-filter: blur(22px);
  box-shadow: rgba(20,0,69,0.3) 0px 8px 24px -2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 16px;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
/* Borde gradiente SOLO en el anillo de 1.5px (centro recortado con mask) →
   el interior queda transparente, no se rellena. */
.pbidv2::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(135deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.pbidv2__amount {
  position: relative;
  z-index: 1;
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  /* glow morado de 4 capas (filter2_dddd) */
  text-shadow:
    0 0 7px rgba(174,166,255,0.7),
    0 0 16px rgba(107,85,222,0.6),
    0 0 32px rgba(82,52,189,0.5),
    0 0 53px rgba(49,0,138,0.4);
}
.pbidv2__label {
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  /* texto en degradado lila (paint0) */
  background: linear-gradient(160deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  /* glow naranja (filter1) */
  filter: drop-shadow(0 0 6px rgba(239,133,46,0.5));
}
`;

let _stylesInjected = false;

export default function BidProposalV2({
  amount = "US$ 6,559",
  label = "ENVIADO POR ZAE389",
  className = "",
}: BidProposalV2Props): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDPROPOSALV2_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDPROPOSALV2_STYLES }} />
      <div className={`pbidv2 ${className}`.trim()}>
        <span className="pbidv2__amount">{amount}</span>
        {label ? <span className="pbidv2__label">{label}</span> : null}
      </div>
    </>
  );
}
