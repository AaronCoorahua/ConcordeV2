"use client";

/**
 * BillingCard — Bloque de Concorde (Voyager DS)
 *
 * Card "Quiero Recibir" del Register: título + divisor, toggle Boleta/Factura
 * (reusa TabSelector) y el campo RUC — a diferencia de los campos de
 * PersonalDataCard, aquí el label va INLINE dentro del mismo box del input,
 * no arriba.
 *
 * Desktop (766 de ancho, ~149 alto): toggle + RUC en una fila.
 * Mobile (`mobile` prop, 388 de ancho): toggle arriba, RUC debajo (apilados).
 */

import type { JSX } from "react";
import TabSelector from "../../../components/TabSelector";

export interface BillingCardProps {
  className?: string;
  /** Layout mobile: card 388 de ancho, toggle y RUC apilados (no en fila) */
  mobile?: boolean;
}

const STYLE_ID = "concorde-billing-card-styles";

const STYLES = `
.bc-card {
  width: 766px;
  min-height: 149px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
}
.bc-card--mobile { width: 388px; min-height: 0; }
.bc-title { margin: 0; font-size: 18px; font-weight: 700; color: #3B1782; }
.bc-divider { height: 1px; background: #E1E3E2; margin: 16px 0 20px; }
.bc-row { display: flex; align-items: center; gap: 16px; }
.bc-row--mobile { flex-direction: column; align-items: stretch; gap: 16px; }
.bc-row--mobile .bc-ruc { flex: none; width: 100%; }

.bc-ruc {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 49px;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 16px;
  border: 1px solid transparent;
  background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(338deg, #8460E5 0%, #FFF8F1 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.bc-ruc__label { font-size: 14px; font-weight: 600; color: #3B1782; white-space: nowrap; }
.bc-ruc__required { color: #ED8936; margin-right: 8px; }
.bc-ruc__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  color: #191C1C;
}
`;

let _stylesInjected = false;

export default function BillingCard({ className = "", mobile = false }: BillingCardProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <div className={["bc-card", mobile ? "bc-card--mobile" : "", className].filter(Boolean).join(" ")} data-block="billing-card">
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STYLES }} />

      <h3 className="bc-title">Quiero Recibir</h3>

      <div className="bc-divider" />

      <div className={["bc-row", mobile ? "bc-row--mobile" : ""].filter(Boolean).join(" ")}>
        <TabSelector options={["Boleta", "Factura"]} defaultValue={0} aria-label="Tipo de comprobante" />

        <div className="bc-ruc">
          <label className="bc-ruc__label" htmlFor="bc-ruc-input">RUC</label>
          <span className="bc-ruc__required">*</span>
          <input id="bc-ruc-input" className="bc-ruc__input" type="text" defaultValue="111111111" />
        </div>
      </div>
    </div>
  );
}
