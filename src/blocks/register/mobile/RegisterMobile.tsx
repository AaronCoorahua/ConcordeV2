"use client";

/**
 * RegisterMobile — Bloque de Concorde (Voyager DS)
 *
 * Página de registro · mobile (420 de ancho) — primera parte:
 *   · Header 420×64 (guest, "Ingresa")
 *   · Heading — texto real (no el SVG del desktop: a este ancho necesita
 *     reflow, un SVG de tamaño fijo no puede hacer wrap)
 *   · PersonalDataCard (mobile: 1 columna) + BillingCard (mobile: apilado)
 *   · Nota "Importante" (compartida con desktop, vía Register.tsx)
 *
 * Falta: banners placeholder + TermsAcceptance (se agregan después).
 */

import type { JSX } from "react";
import AppHeader from "../../header/desktop/Header";
import PersonalDataCard from "../desktop/PersonalDataCard";
import BillingCard from "../desktop/BillingCard";
import { ImportantNotice } from "../desktop/Register";
import { REGISTER_MOBILE_WIDTH, REGISTER_MOBILE_HEIGHT } from "./dimensions";

export { REGISTER_MOBILE_WIDTH, REGISTER_MOBILE_HEIGHT } from "./dimensions";

export interface RegisterMobileProps {
  className?: string;
}

// Heading del Register en mobile — texto real (colores sólidos, no gradiente
// vectorizado): a 388px de ancho el texto necesita reflow, algo que un SVG de
// tamaño fijo (como el de desktop) no puede hacer.
function RegisterHeadingMobile(): JSX.Element {
  return (
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, lineHeight: "26px", color: "#3B1782" }}>
        ¡Aquí <span style={{ color: "#ED8936" }}>comienza</span> tu experiencia!
      </h2>
      <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: "20px", fontWeight: 600, color: "#3B1782" }}>
        Regístrate y descubre un nuevo mundo de oportunidades.
      </p>
    </div>
  );
}

export default function RegisterMobile({ className = "" }: RegisterMobileProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="register-mobile"
      style={{
        width: REGISTER_MOBILE_WIDTH,
        minHeight: REGISTER_MOBILE_HEIGHT,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      <AppHeader
        width={REGISTER_MOBILE_WIDTH}
        logo={<img src="/logo-preview.png" alt="VMC Subastas" style={{ height: 26, width: "auto", display: "block" }} />}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <RegisterHeadingMobile />

        <PersonalDataCard mobile />

        <BillingCard mobile />

        <ImportantNotice />
      </div>
    </div>
  );
}
