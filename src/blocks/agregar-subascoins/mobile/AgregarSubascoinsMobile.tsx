"use client";

/**
 * AgregarSubascoinsMobile — Bloque de Concorde (Voyager DS) · mobile (420 ancho).
 *
 *   · Header 420×64 con botón hamburguesa (abre SidebarMobile)
 *   · Banner 388×120
 *   · SubasCoinsCardMobile 388×808
 *   · Centro de Ayuda 388×116
 */

import { useState } from "react";
import type { CSSProperties, JSX } from "react";
import AppHeader from "@/src/blocks/header/desktop/Header";
import SidebarMobile, { SidebarMenuButton } from "@/src/blocks/sidebar/mobile/SidebarMobile";
import SubasCoinsCardMobile from "./SubasCoinsCardMobile";
import { AGREGARSUBASCOINS_MOBILE_WIDTH, AGREGARSUBASCOINS_MOBILE_HEIGHT } from "./dimensions";

export { AGREGARSUBASCOINS_MOBILE_WIDTH, AGREGARSUBASCOINS_MOBILE_HEIGHT } from "./dimensions";

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

export interface AgregarSubascoinsMobileProps {
  username?: string;
  className?: string;
  /** Alto del marco para previsualizaciones (px). En producción se omite. */
  frameHeight?: number;
}

export default function AgregarSubascoinsMobile({ username = "ZAEX5G", className = "", frameHeight }: AgregarSubascoinsMobileProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const page = (
    <div
      className={className}
      data-block="agregar-subascoins-mobile"
      style={{
        width: AGREGARSUBASCOINS_MOBILE_WIDTH,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      {/* Header 420×64 con hamburguesa */}
      <AppHeader
        width={AGREGARSUBASCOINS_MOBILE_WIDTH}
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

        {/* Card «Adquiere SubasCoins» 388×808 */}
        <SubasCoinsCardMobile />

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
