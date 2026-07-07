"use client";

/**
 * SubasCoinsInfoCard — sub-componente del bloque «Agregar Subascoins».
 *
 * Card morado «Selecciona los SubasCoins que deseas adquirir» con:
 *   · header gradiente (#8460E5 → #3B1782) + ícono $ circular gradiente
 *   · lista de beneficios (pills con bullet gradiente naranja→morado)
 * Recreado en HTML/CSS (no SVG) para que sea editable y escalable.
 */

import type { JSX } from "react";

const STYLE_ID = "concorde-subascoinsinfocard-styles";

const STYLES = `
.scinfo {
  box-sizing: border-box;
  width: 392px;
  max-width: 100%;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 0 16px 4px rgba(0,0,0,0.10);
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
.scinfo__head {
  box-sizing: border-box;
  position: relative;
  height: 88px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(115deg, #8460E5 0%, #3B1782 100%);
  overflow: hidden;
}
.scinfo__eyebrow { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); margin: 0; }
.scinfo__title { font-size: 22px; font-weight: 800; letter-spacing: -0.01em; color: #ffffff; margin: 2px 0 0; }
.scinfo__sub { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); margin: 2px 0 0; }
.scinfo__coin {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ED8936 0%, #ED8936 40%, #8460E5 100%);
  border: 1px solid rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(237,137,54,0.3);
}
.scinfo__body {
  box-sizing: border-box;
  height: 157px;
  padding: 20px 24px 24px;
}
.scinfo__benefitslabel {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #99A1AF;
  margin: 0 0 14px;
}
.scinfo__pill {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border-radius: 20px;
  border: 1px solid transparent;
  background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 16px 4px rgba(0,0,0,0.06);
}
.scinfo__pill + .scinfo__pill { margin-top: 16px; }
.scinfo__bullet {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ED8936 0%, #ED8936 40%, #8460E5 100%);
  border: 1.5px solid;
  border-image: linear-gradient(135deg, #ffffff, #FBC47D 25%, #AE8EFF 75%, #ffffff) 1;
  box-shadow: 0 2px 6px rgba(237,137,54,0.3), inset 0 1px 0 rgba(255,255,255,0.28);
}
.scinfo__pilltext { font-size: 14px; font-weight: 700; color: #3B1782; }
`;

let _injected = false;

export interface SubasCoinsInfoCardProps {
  benefits?: string[];
  className?: string;
}

export default function SubasCoinsInfoCard({
  benefits = ["Consignaciones más bajas", "Disponibilidad instantánea"],
  className = "",
}: SubasCoinsInfoCardProps): JSX.Element {
  if (typeof document !== "undefined" && !_injected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    _injected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className={`scinfo ${className}`.trim()}>
        <div className="scinfo__head">
          <p className="scinfo__eyebrow">Selecciona los</p>
          <p className="scinfo__title">SubasCoins</p>
          <p className="scinfo__sub">que deseas adquirir:</p>
          <span className="scinfo__coin" aria-hidden="true">$</span>
        </div>

        <div className="scinfo__body">
          <p className="scinfo__benefitslabel">Beneficios incluidos</p>
          {benefits.map(function renderPill(b, i) {
            return (
              <div className="scinfo__pill" key={i}>
                <span className="scinfo__bullet" aria-hidden="true" />
                <span className="scinfo__pilltext">{b}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
