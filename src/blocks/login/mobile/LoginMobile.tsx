"use client";

/**
 * LoginMobile — Bloque de Concorde (Voyager DS)
 *
 * Página de login · mobile (420 de ancho):
 *   · Header 420×64 (guest, "Ingresa")
 *   · Card de login 388×576 — solo el formulario (LoginForm), sin el panel
 *     de registro de la versión desktop (no hay espacio para 2 columnas)
 *   · Banner "Compra Subaspass" (placeholder, 388×120)
 *   · Centro de ayuda banner (placeholder, 388×120)
 */

import { useState } from "react";
import type { CSSProperties, JSX } from "react";
import AppHeader from "../../header/desktop/Header";
import { LoginForm } from "../desktop/Login";
import SidebarMobile, { SidebarMenuButton } from "../../sidebar/mobile/SidebarMobile";
import { LOGIN_MOBILE_WIDTH, LOGIN_MOBILE_HEIGHT } from "./dimensions";

export { LOGIN_MOBILE_WIDTH, LOGIN_MOBILE_HEIGHT } from "./dimensions";

export interface LoginMobileProps {
  className?: string;
  /** Alto del marco para previsualizaciones (px). En producción se omite. Ver `SidebarMobile`. */
  frameHeight?: number;
}

const PLACEHOLDER_BANNER: CSSProperties = {
  width: 388,
  height: 120,
  boxSizing: "border-box",
  borderRadius: 8,
  background: "#E9EAEC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "#9AA1AC",
};

const STYLE_ID = "concorde-login-mobile-styles";

const CARD_STYLES = `
.login-card-mobile {
  width: 388px;
  min-height: 576px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(0,0,0,0.1) 0px 0px 16px 4px;
  display: flex;
  padding: 16px;
}
`;

let _stylesInjected = false;

export default function LoginMobile({ className = "", frameHeight }: LoginMobileProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = CARD_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const page = (
    <div
      className={className}
      data-block="login-mobile"
      style={{
        width: LOGIN_MOBILE_WIDTH,
        minHeight: LOGIN_MOBILE_HEIGHT,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CARD_STYLES }} />

      <AppHeader
        width={LOGIN_MOBILE_WIDTH}
        logo={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
            <img src="/logo-preview.png" alt="VMC Subastas" style={{ height: 26, width: "auto", display: "block" }} />
          </div>
        }
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <div className="login-card-mobile">
          <LoginForm />
        </div>

        {/* Banner "Compra Subaspass" — placeholder por ahora */}
        <div data-slot="subaspass-banner" style={PLACEHOLDER_BANNER}>COMPRA SUBASPASS</div>

        {/* Centro de ayuda banner */}
        <div data-slot="help-banner" style={PLACEHOLDER_BANNER}>CENTRO DE AYUDA</div>
      </div>
    </div>
  );

  return (
    <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen} frameHeight={frameHeight}>
      {page}
    </SidebarMobile>
  );
}
