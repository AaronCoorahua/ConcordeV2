"use client";

/**
 * SendBidIcon — Generado por Concorde
 * Fuente: Figma VOYAGER · "Background+Border+Shadow" (3201:12892 vault · 3201:12900 white)
 *
 * Botón circular 32×32 con flecha de "enviar/reenviar puja", sombra morada +
 * inner highlight. 2 variantes:
 *   · "vault" → relleno morado (#7B5BE6 → #34147A), borde #CFBAFF 50%, flecha blanca
 *   · "white" → relleno blanco, borde gradiente (white→#F4AC59→#8460E5→white),
 *               flecha gradiente naranja (#FF9639 → #BE3D00)
 * Copia del SVG (colores/sombra). Tamaño personalizable. useId para el gradiente.
 */

import { useId } from "react";
import type { JSX, MouseEventHandler } from "react";

export type SendBidIconVariant = "vault" | "white";

export interface SendBidIconProps {
  /** Variante de color (default "vault") */
  variant?: SendBidIconVariant;
  /** Diámetro en px (default 32) */
  size?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

const STYLE_ID = "concorde-sendbidicon-styles";

const SENDBIDICON_STYLES = `
.psendbid {
  box-sizing: border-box;
  padding: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: rgba(20,0,70,0.4) 0px 3px 8px, inset 0px 1px 0px rgba(255,255,255,0.3);
  transition: transform 0.15s cubic-bezier(0.3,0,0,1), box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.psendbid--vault {
  border: 1px solid rgba(207,186,255,0.5);
  background: linear-gradient(135deg, #7B5BE6 0%, #34147A 100%);
}
.psendbid--white {
  border: 1px solid transparent;
  background-image:
    linear-gradient(#ffffff, #ffffff),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.psendbid:hover { transform: translateY(-1px); box-shadow: rgba(20,0,70,0.45) 0px 6px 14px, inset 0px 1px 0px rgba(255,255,255,0.3); }
.psendbid:active { transform: scale(0.94); }
.psendbid:focus-visible { outline: 2px solid #8460E5; outline-offset: 2px; }
.psendbid:disabled { cursor: not-allowed; opacity: 0.6; }
@media (prefers-reduced-motion: reduce) { .psendbid { transition: none; } }
`;

const ARROW_PATH =
  "M25.6154 18.0487V14.8164L31.3775 20.5784L25.6154 26.3404V22.9675C21.5399 22.9675 18.5886 24.2324 16.6211 27.1837C17.3237 22.9675 19.8534 18.892 25.6154 18.0487Z";

let _stylesInjected = false;

export default function SendBidIcon({
  variant = "vault",
  size = 32,
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
  className = "",
}: SendBidIconProps): JSX.Element {
  const uid = useId().replace(/:/g, "-");
  const gradId = `sendbid-grad-${uid}`;
  const isVault = variant === "vault";
  const arrow = Math.round(size * 17 / 32);

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = SENDBIDICON_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SENDBIDICON_STYLES }} />
      <button
        type="button"
        className={`psendbid psendbid--${variant} ${className}`.trim()}
        style={{ width: size, height: size }}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel ?? "Enviar puja"}
      >
        <svg width={arrow} height={arrow} viewBox="15.5 12.5 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d={ARROW_PATH} fill={isVault ? "#ffffff" : `url(#${gradId})`} />
          {isVault ? null : (
            <defs>
              <linearGradient id={gradId} x1="24.6211" y1="14.8164" x2="24.6211" y2="30.8164" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF9639" />
                <stop offset="0.4" stopColor="#EF852E" />
                <stop offset="1" stopColor="#BE3D00" />
              </linearGradient>
            </defs>
          )}
        </svg>
      </button>
    </>
  );
}
