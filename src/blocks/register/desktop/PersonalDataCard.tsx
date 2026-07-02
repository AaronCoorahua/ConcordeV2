"use client";

/**
 * PersonalDataCard — Bloque de Concorde (Voyager DS)
 *
 * Card "Datos Personales" del Register: título, divisor, 6 campos (Nombres,
 * Apellidos, DNI, Celular, Correo electrónico, Contraseña) reusando el
 * componente Input existente (variantes default/focus/error — ya coinciden
 * exacto con el spec de Figma), y nota de pie "* Campos obligatorios".
 *
 * Desktop (766 de ancho): grid 3×2, campos de 234px fijos.
 * Mobile (`mobile` prop, 388 de ancho): 1 columna, campos a 100% (356px).
 */

import { useState } from "react";
import type { JSX } from "react";
import Input from "../../../components/Input";
import EyeIcon from "../../../components/EyeIcon";

export interface PersonalDataCardProps {
  className?: string;
  /** Layout mobile: card 388 de ancho, campos en 1 columna (no grid 3×2) */
  mobile?: boolean;
}

const STYLE_ID = "concorde-personal-data-card-styles";

const STYLES = `
.pdc-card {
  width: 766px;
  min-height: 307px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
}
.pdc-card--mobile { width: 388px; min-height: 0; }
.pdc-title { margin: 0; font-size: 18px; font-weight: 700; color: #3B1782; }
.pdc-divider { height: 1px; background: #E1E3E2; margin: 16px 0 20px; }
.pdc-grid {
  display: grid;
  grid-template-columns: repeat(3, 234px);
  column-gap: 16px;
  row-gap: 20px;
}
.pdc-grid--mobile {
  grid-template-columns: 1fr;
  row-gap: 20px;
}
.pdc-grid--mobile .pdc-field .pinput-root { width: 100%; }
.pdc-field { display: flex; flex-direction: column; gap: 8px; }
.pdc-field__label { font-size: 12px; font-weight: 500; color: #3B1782; }
.pdc-field__required { color: #ED8936; margin-left: 2px; }
.pdc-password-wrap { position: relative; }
.pdc-password-wrap .pinput { padding-right: 44px; }
.pdc-eye {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: flex;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #9AA1AC;
  transition: color 0.15s;
}
.pdc-eye:hover { color: #6B7280; }
.pdc-footer { margin: 16px 0 0; font-size: 12px; font-weight: 600; color: #3B1782; }
.pdc-footer__required { color: #ED8936; }
`;

let _stylesInjected = false;

export default function PersonalDataCard({ className = "", mobile = false }: PersonalDataCardProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  function toggleShowPassword(): void {
    setShowPassword(function toggle(v) { return !v; });
  }

  return (
    <div className={["pdc-card", mobile ? "pdc-card--mobile" : "", className].filter(Boolean).join(" ")} data-block="personal-data-card">
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STYLES }} />

      <h3 className="pdc-title">Datos Personales</h3>

      <div className="pdc-divider" />

      <div className={["pdc-grid", mobile ? "pdc-grid--mobile" : ""].filter(Boolean).join(" ")}>
        <div className="pdc-field">
          <label className="pdc-field__label" htmlFor="pdc-nombres">Nombres<span className="pdc-field__required">*</span></label>
          <Input id="pdc-nombres" variant="focus" defaultValue="Subastin" />
        </div>

        <div className="pdc-field">
          <label className="pdc-field__label" htmlFor="pdc-apellidos">Apellidos<span className="pdc-field__required">*</span></label>
          <Input id="pdc-apellidos" defaultValue="Subastop" />
        </div>

        <div className="pdc-field">
          <label className="pdc-field__label" htmlFor="pdc-dni">DNI<span className="pdc-field__required">*</span></label>
          <Input id="pdc-dni" variant="error" errorMessage="Ingresa un mínimo de 8 dígitos" defaultValue="72188" />
        </div>

        <div className="pdc-field">
          <label className="pdc-field__label" htmlFor="pdc-celular">Celular<span className="pdc-field__required">*</span></label>
          <Input id="pdc-celular" type="tel" defaultValue="Subastin" />
        </div>

        <div className="pdc-field">
          <label className="pdc-field__label" htmlFor="pdc-correo">Correo electrónico<span className="pdc-field__required">*</span></label>
          <Input id="pdc-correo" type="email" defaultValue="subastin@gmail.com" />
        </div>

        <div className="pdc-field">
          <label className="pdc-field__label" htmlFor="pdc-password">Contraseña<span className="pdc-field__required">*</span></label>
          <div className="pdc-password-wrap">
            <Input id="pdc-password" type={showPassword ? "text" : "password"} defaultValue="Subastin" />
            <button
              type="button"
              className="pdc-eye"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>
        </div>
      </div>

      <p className="pdc-footer"><span className="pdc-footer__required">*</span> Campos obligatorios</p>
    </div>
  );
}
