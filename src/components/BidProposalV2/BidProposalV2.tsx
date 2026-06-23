"use client";

/**
 * BidProposalV2 — Generado por Concorde
 * Fuente: Figma VOYAGER · "PropuestaBid v2 / Default" (3300:12845)
 *
 * Variante glassmorphic de la propuesta de bid: card 278×78 (radio 20) con
 * relleno white 8% + backdrop-blur(5px), borde gradiente y sombra morada. Monto
 * grande blanco con glow morado y caption lila.
 *
 * Animación de "nuevo bid" (prop `flash`): al cambiar `flash`, una luz interna
 * con los colores del ProgressBar (white→#F2CCFF→#CC00FF→#FF0066) gira dentro del
 * glass, el borde gira una vez, y el nuevo monto aparece cuando la luz se va.
 */

import { useEffect, useRef, useState } from "react";
import type { JSX, CSSProperties } from "react";

export interface BidProposalV2Props {
  /** Monto grande (blanco) — default "US$ 6,559" */
  amount?: string;
  /** Caption inferior (degradado lila) — default "ENVIADO POR ZAE389" */
  label?: string;
  /** Contador: al cambiar, dispara la animación de nuevo bid */
  flash?: number;
  /** Colores del efecto de luz/cometa (editable). Default: primary (naranja→lila→blanco). */
  flashColors?: string[];
  className?: string;
}

// Primary (VYStrokes1): naranja-500 → vault-500 → blanco
const DEFAULT_FLASH_COLORS = ["#F4AC59", "#8460E5", "#ffffff"];

const STYLE_ID = "concorde-bidproposalv2-styles";

const BIDPROPOSALV2_STYLES = `
@property --pbidv2-spin { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

.pbidv2 {
  position: relative;
  box-sizing: border-box;
  width: 278px;
  max-width: 100%;
  height: 78px;
  border-radius: 20px;
  background: rgba(255,255,255,0.08);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  box-shadow: rgba(20,0,69,0.3) 0px 8px 24px -2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 16px;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
/* Borde gradiente (anillo 1.5px, centro recortado con mask). En flash → rainbow que gira una vez. */
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
  z-index: 2;
}
/* Línea de color (cometa) que gira UNA vez sobre el borde — colores del
   ProgressBar. El borde base (::before) no cambia: solo barre esta línea, suave. */
.pbidv2::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(from var(--pbidv2-spin), transparent 0 280deg, var(--pbidv2-c1, #F4AC59) 320deg, var(--pbidv2-c2, #8460E5) 345deg, var(--pbidv2-c3, #ffffff) 358deg, transparent 360deg);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  z-index: 3;
  /* glow de la línea cometa */
  filter: drop-shadow(0 0 4px var(--pbidv2-c3, #ffffff)) drop-shadow(0 0 9px var(--pbidv2-c2, #8460E5)) drop-shadow(0 0 16px var(--pbidv2-c1, #F4AC59));
}
.pbidv2--flash::after { animation: pbidv2-arc 650ms ease-in-out; }
@keyframes pbidv2-arc {
  0%   { opacity: 0; --pbidv2-spin: 0deg; }
  18%  { opacity: 1; }
  82%  { opacity: 1; }
  100% { opacity: 0; --pbidv2-spin: 360deg; }
}

/* Luz interna (recortada al glass) con los colores del ProgressBar, que gira */
.pbidv2__lightwrap {
  position: absolute; inset: 0; border-radius: inherit;
  overflow: hidden; pointer-events: none; z-index: 0;
}
.pbidv2__light {
  position: absolute; inset: -45%;
  background: conic-gradient(from 0deg, transparent 0deg, var(--pbidv2-c1, #F4AC59) 60deg, var(--pbidv2-c2, #8460E5) 150deg, var(--pbidv2-c3, #ffffff) 230deg, transparent 330deg);
  filter: blur(18px) saturate(1.4) brightness(1.25);
  mix-blend-mode: screen; /* ilumina más sobre el glass oscuro */
  opacity: 0;
}
.pbidv2--flash .pbidv2__light { animation: pbidv2-light 600ms ease-in-out; }
@keyframes pbidv2-light {
  0%   { opacity: 0; transform: rotate(0deg) scale(1.2); }
  22%  { opacity: 1; }
  62%  { opacity: 1; }
  100% { opacity: 0; transform: rotate(360deg) scale(1.2); }
}

/* El nuevo monto/label aparecen cuando la luz se va */
.pbidv2--flash .pbidv2__amount, .pbidv2--flash .pbidv2__label { animation: pbidv2-appear 600ms ease-out; }
@keyframes pbidv2-appear {
  0%, 40% { opacity: 0; transform: scale(0.94); }
  100%    { opacity: 1; transform: scale(1); }
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
  background: linear-gradient(160deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 6px rgba(239,133,46,0.5));
}
@media (prefers-reduced-motion: reduce) {
  .pbidv2--flash::after, .pbidv2--flash .pbidv2__light,
  .pbidv2--flash .pbidv2__amount, .pbidv2--flash .pbidv2__label { animation: none; }
}
`;

let _stylesInjected = false;

export default function BidProposalV2({
  amount = "US$ 6,559",
  label = "ENVIADO POR ZAE389",
  flash = 0,
  flashColors = DEFAULT_FLASH_COLORS,
  className = "",
}: BidProposalV2Props): JSX.Element {
  const [flashing, setFlashing] = useState(false);
  const prevFlash = useRef(flash);

  const [c1, c2, c3] = flashColors;
  const colorVars = {
    "--pbidv2-c1": c1 ?? DEFAULT_FLASH_COLORS[0],
    "--pbidv2-c2": c2 ?? DEFAULT_FLASH_COLORS[1],
    "--pbidv2-c3": c3 ?? DEFAULT_FLASH_COLORS[2],
  } as CSSProperties;

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDPROPOSALV2_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  useEffect(
    function onFlash() {
      if (flash === prevFlash.current) return;
      prevFlash.current = flash;
      // reinicia la animación (quita y vuelve a poner la clase)
      setFlashing(false);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setFlashing(true)));
      const t = setTimeout(() => setFlashing(false), 700);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    },
    [flash],
  );

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDPROPOSALV2_STYLES }} />
      <div className={`pbidv2${flashing ? " pbidv2--flash" : ""} ${className}`.trim()} style={colorVars}>
        <span className="pbidv2__lightwrap" aria-hidden="true">
          <span className="pbidv2__light" />
        </span>
        <span className="pbidv2__amount">{amount}</span>
        {label ? <span className="pbidv2__label">{label}</span> : null}
      </div>
    </>
  );
}
