"use client";

/**
 * TuPerfilMobile — Bloque de Concorde (Voyager DS) · mobile (420 ancho).
 *
 *   · Header 420×64 con botón hamburguesa (abre SidebarMobile) + ícono de usuario
 *   · Banner 388×120
 *   · ProfileCardMobile (Tu Perfil 388×524 + Información de Contacto 388×247)
 *   · Botón «Cerrar Sesión» (secondary, 200×48)
 *   · Centro de Ayuda 388×116
 */

import { useState } from "react";
import type { CSSProperties, JSX } from "react";
import AppHeader from "@/src/blocks/header/desktop/Header";
import SidebarMobile, { SidebarMenuButton } from "@/src/blocks/sidebar/mobile/SidebarMobile";
import Button from "@/src/components/Button";
import ProfileCardMobile from "./ProfileCardMobile";
import { TUPERFIL_MOBILE_WIDTH, TUPERFIL_MOBILE_HEIGHT } from "./dimensions";

export { TUPERFIL_MOBILE_WIDTH, TUPERFIL_MOBILE_HEIGHT } from "./dimensions";

// Banner placeholder gris (mismo estilo que el desktop / demás bloques mobile).
const BANNER: CSSProperties = {
  width: 388,
  boxSizing: "border-box",
  borderRadius: 8,
  background: "#E9EAEC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#9AA1AC",
};

export interface TuPerfilMobileProps {
  username?: string;
  className?: string;
  /** Alto del marco para previsualizaciones (px). En producción se omite. */
  frameHeight?: number;
}

export default function TuPerfilMobile({ username = "ZAEX5G", className = "", frameHeight }: TuPerfilMobileProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const page = (
    <div
      className={className}
      data-block="tu-perfil-mobile"
      style={{
        width: TUPERFIL_MOBILE_WIDTH,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      {/* Header 420×64 con hamburguesa + ícono de usuario (compact) */}
      <AppHeader
        width={TUPERFIL_MOBILE_WIDTH}
        username={username}
        compact
        logo={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
            <img src="/logo-preview.png" alt="VMC Subastas" style={{ height: 26, width: "auto", display: "block" }} />
          </div>
        }
      />

      {/* Contenido a 16px de margen */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        {/* Banner superior 388×120 */}
        <div data-slot="banner" style={{ ...BANNER, height: 120 }}>BANNER</div>

        {/* Cards: Tu Perfil + Información de Contacto */}
        <ProfileCardMobile />

        {/* Cerrar Sesión (secondary, 200×48) centrado */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" style={{ width: 200, paddingLeft: 24, paddingRight: 24, whiteSpace: "nowrap" }}>Cerrar Sesión</Button>
        </div>

        {/* Centro de ayuda 388×116 */}
        <div data-slot="help-banner" style={{ ...BANNER, height: 116 }}>CENTRO DE AYUDA</div>
      </div>
    </div>
  );

  return (
    <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen} frameHeight={frameHeight}>
      {page}
    </SidebarMobile>
  );
}
