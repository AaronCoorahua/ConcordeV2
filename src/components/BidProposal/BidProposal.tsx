"use client";

/**
 * BidProposal — Generado por Concorde
 * Fuente: Figma VOYAGER · "PropuestaBid v2 / Default" (3300:12845)
 *
 * Propuesta de bid (glassmorphic): card 278×78 (radio 20) con relleno white 8% +
 * backdrop-blur(5px), borde gradiente y sombra morada. Monto grande blanco con
 * glow morado y caption lila.
 *
 * Animación de "nuevo bid" (prop `flash`): al cambiar `flash`, el glass se
 * ILUMINA como una bombilla que se prende y se apaga (luz interna + borde + glow
 * externo, sin giro) con los colores `flashColors`, y el nuevo monto aparece al
 * apagarse la luz.
 */

import { useEffect, useRef, useState } from "react";
import type { JSX, CSSProperties } from "react";

export interface BidProposalProps {
  /** Monto grande (blanco) — default "US$ 6,559" */
  amount?: string;
  /** Caption inferior (degradado lila) — default "ENVIADO POR ZAE389" */
  label?: string;
  /** Contador: al cambiar, dispara la animación de nuevo bid */
  flash?: number;
  /** Colores del efecto de luz (editable). Default: primary (naranja→lila→blanco). */
  flashColors?: string[];
  className?: string;
}

// Primary (VYStrokes1): naranja-500 → vault-500 → blanco
const DEFAULT_FLASH_COLORS = ["#F4AC59", "#8460E5", "#ffffff"];

const STYLE_ID = "concorde-bidproposal-styles";

const BIDPROPOSAL_STYLES = `
.pbid {
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
/* Borde gradiente base (anillo 1.5px, centro recortado con mask) */
.pbid::before {
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
/* Anillo de luz del borde: se prende y se apaga (sin giro) con los colores flash */
.pbid::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(135deg, var(--pbid-c1, #F4AC59) 0%, var(--pbid-c2, #8460E5) 50%, var(--pbid-c3, #ffffff) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  z-index: 3;
  filter: drop-shadow(0 0 5px var(--pbid-c3, #ffffff)) drop-shadow(0 0 12px var(--pbid-c2, #8460E5)) drop-shadow(0 0 20px var(--pbid-c1, #F4AC59));
}
.pbid--flash::after { animation: pbid-onoff 600ms ease-in-out; }

/* Luz interna — mancha horizontal (izq→der, tipo botón primary) recortada al
   glass, que se prende y se apaga (sin giro, sin círculos) */
.pbid__lightwrap {
  position: absolute; inset: 0; border-radius: inherit;
  overflow: hidden; pointer-events: none; z-index: 0;
}
.pbid__light {
  position: absolute; inset: -15%;
  background: linear-gradient(95deg, var(--pbid-c1, #F4AC59) 0%, var(--pbid-c2, #8460E5) 52%, var(--pbid-c3, #ffffff) 100%);
  filter: blur(22px) saturate(1.7) brightness(1.6);
  mix-blend-mode: screen;
  opacity: 0;
}
.pbid--flash .pbid__light { animation: pbid-bulb 600ms ease-in-out; }
@keyframes pbid-bulb {
  0%   { opacity: 0; }
  28%  { opacity: 1; }
  100% { opacity: 0; }
}

/* Glow externo: la card "irradia" al prenderse */
.pbid--flash { animation: pbid-glow 600ms ease-in-out; }
@keyframes pbid-glow {
  0%, 100% { box-shadow: rgba(20,0,69,0.3) 0px 8px 24px -2px; }
  28% {
    box-shadow:
      rgba(20,0,69,0.3) 0px 8px 24px -2px,
      0 0 20px var(--pbid-c3, #ffffff),
      0 0 38px var(--pbid-c2, #8460E5),
      0 0 58px var(--pbid-c1, #F4AC59);
  }
}

/* Prende/apaga (on→off) del anillo del borde */
@keyframes pbid-onoff {
  0%   { opacity: 0; }
  28%  { opacity: 1; }
  100% { opacity: 0; }
}

/* El nuevo monto/label aparecen cuando la luz se apaga */
.pbid--flash .pbid__amount, .pbid--flash .pbid__label { animation: pbid-appear 600ms ease-out; }
@keyframes pbid-appear {
  0%, 38% { opacity: 0; transform: scale(0.94); }
  100%    { opacity: 1; transform: scale(1); }
}

.pbid__amount {
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
.pbid__label {
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
  .pbid--flash, .pbid--flash::after, .pbid--flash .pbid__light,
  .pbid--flash .pbid__amount, .pbid--flash .pbid__label { animation: none; }
}
`;

let _stylesInjected = false;

export default function BidProposal({
  amount = "US$ 6,559",
  label = "ENVIADO POR ZAE389",
  flash = 0,
  flashColors = DEFAULT_FLASH_COLORS,
  className = "",
}: BidProposalProps): JSX.Element {
  const [flashing, setFlashing] = useState(false);
  const prevFlash = useRef(flash);

  const [c1, c2, c3] = flashColors;
  const colorVars = {
    "--pbid-c1": c1 ?? DEFAULT_FLASH_COLORS[0],
    "--pbid-c2": c2 ?? DEFAULT_FLASH_COLORS[1],
    "--pbid-c3": c3 ?? DEFAULT_FLASH_COLORS[2],
  } as CSSProperties;

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDPROPOSAL_STYLES;
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
      const t = setTimeout(() => setFlashing(false), 650);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    },
    [flash],
  );

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDPROPOSAL_STYLES }} />
      <div className={`pbid${flashing ? " pbid--flash" : ""} ${className}`.trim()} style={colorVars}>
        <span className="pbid__lightwrap" aria-hidden="true">
          <span className="pbid__light" />
        </span>
        <span className="pbid__amount">{amount}</span>
        {label ? <span className="pbid__label">{label}</span> : null}
      </div>
    </>
  );
}
