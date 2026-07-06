"use client";

/**
 * ZonaMobile — Bloque de Concorde (Voyager DS)
 *
 * Zona de usuario · mobile (420 de ancho):
 *   · Header 420×64 logueado → «Bienvenido, ZAEX5G»
 *   · UserProfileCard mobile 388×132 (2 filas: saludo + stats)
 *   · WalletBalanceCard mobile 388×206 (botón CTA morado)
 *   · ActivityCard mobile 388×221 (grid 2×2 de pills)
 *   · Banner secundario 388×120
 */

import type { JSX } from "react";
import { useState } from "react";
import AppHeader from "../../header/desktop/Header";
import AvatarZone from "../../../components/AvatarZone";
import StarIcon from "../../../components/StarIcon";
import InfoIcon from "../../../components/InfoIcon";
import ProfileButton from "../../../components/ProfileButton";
import WalletBalanceCard from "../../../components/WalletBalanceCard";
import ActivityCard from "../../../components/ActivityCard";
import CardTitle from "../../../components/CardTitle";
import OfferCard from "../../../components/OfferCard";
import BadgeStatus from "../../../components/BadgeStatus";
import SidebarMobile, { SidebarMenuButton } from "../../sidebar/mobile/SidebarMobile";

import { ZONA_MOBILE_WIDTH, ZONA_MOBILE_HEIGHT } from "./dimensions";
export { ZONA_MOBILE_WIDTH, ZONA_MOBILE_HEIGHT } from "./dimensions";

const ZM_STYLES = `
/* WalletBalanceCard — override mobile (388×206, botón morado) */
.zm-wallet.wbc { width: 388px; height: 206px; border-radius: 8px; }
/* ActivityCard — override mobile (388×221) */
.zm-activity.actcard { width: 388px; border-radius: 8px; }
.zm-wallet .wbc__acquire {
  background-image:
    linear-gradient(159deg, #8460E5 0%, #3B1782 100%),
    linear-gradient(135deg, #CFBAFF 0%, #FFFFFF 35%, #AE8EFF 65%, #CFBAFF 100%);
  box-shadow: rgba(255,255,255,0.22) 0 1px 0 2px inset, rgba(132,96,229,0.3) 0 2px 8px;
}
.zm-wallet .wbc__acquire:hover {
  box-shadow: rgba(255,255,255,0.2) 0 1px 0 2px inset, rgba(132,96,229,0.4) 0 8px 24px, rgba(132,96,229,0.25) 0 4px 10px;
}
/* Texto degradado "¡Hola, {username}!" */
.zm-greeting {
  background: linear-gradient(90deg, #ED8936 0%, #ED8936 40%, #8460E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.zm-stat-label {
  font-size: 10px;
  font-weight: 500;
  color: #9AA1AC;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.zm-stat-value {
  font-size: 13px;
  font-weight: 700;
  color: #ED8936;
  margin-top: 2px;
}
.zm-pts {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: #3B1782;
  margin-top: 2px;
}
/* Mobile OfferShelf — 388px wide, grid 2×2 de OfferCards 170×232 */
.zm-shelf {
  width: 388px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 8px 4px rgba(0,0,0,0.08);
  padding: 20px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.zm-shelf__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
`;

export interface ZonaMobileProps {
  username?: string;
  className?: string;
  /** Alto del marco para previsualizaciones (px). En producción se omite. Ver `SidebarMobile`. */
  frameHeight?: number;
}

export default function ZonaMobile({ username = "ZAEX5G", className = "", frameHeight }: ZonaMobileProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const page = (
    <div
      className={className}
      data-block="zona-mobile"
      style={{
        width: ZONA_MOBILE_WIDTH,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: ZM_STYLES }} />

      {/* Header 420×64 — logueado → "Bienvenido, ZAEX5G" */}
      <AppHeader
        width={ZONA_MOBILE_WIDTH}
        username={username}
        logo={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
            <img src="/logo-preview.png" alt="VMC Subastas" style={{ height: 26, width: "auto", display: "block" }} />
          </div>
        }
      />

      {/* Contenido a 16px de margen */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>

        {/* UserProfileCard mobile — 388×132 */}
        <div
          style={{
            width: 388,
            boxSizing: "border-box",
            background: "#ffffff",
            borderRadius: 8,
            boxShadow: "0 0 8px 4px rgba(0,0,0,0.08)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Row 1 (356×40): avatar + saludo + "Ir al Perfil" */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 40 }}>
            <AvatarZone />
            <span className="zm-greeting" style={{ flex: 1, minWidth: 0 }}>¡Hola, {username}!</span>
            <ProfileButton>Ir al Perfil</ProfileButton>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#E1E3E2", margin: "8px 0" }} />

          {/* Row 2 (356×44): stats izquierda + "Historial" derecha */}
          <div style={{ display: "flex", alignItems: "center", height: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, minWidth: 0 }}>
              {/* RIESGO DEL PERFIL */}
              <div>
                <div className="zm-stat-label">RIESGO DEL PERFIL</div>
                <div className="zm-stat-value">Muy bajo</div>
              </div>
              {/* PUNTOS VMC */}
              <div>
                <div className="zm-stat-label">PUNTOS VMC</div>
                <div className="zm-pts">
                  <StarIcon size={24} />
                  <span>500 pts</span>
                  <InfoIcon size={16} />
                </div>
              </div>
            </div>
            <ProfileButton>Historial</ProfileButton>
          </div>
        </div>

        {/* WalletBalanceCard mobile — 388×206, botón CTA morado */}
        <WalletBalanceCard className="zm-wallet" />

        {/* ActivityCard mobile — 388×221, mismo grid 2×2 de pills */}
        <ActivityCard className="zm-activity" />

        {/* Banner secundario — 388×120 */}
        <div
          data-slot="secondary-banner"
          style={{
            width: 388,
            height: 120,
            boxSizing: "border-box",
            borderRadius: 8,
            background: "#E9EAEC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "#9AA1AC",
          }}
        >
          SECONDARY BANNER
        </div>

        {/* OfferShelf mobile — RECOMENDADOS (2×2 grid) */}
        <div className="zm-shelf">
          <header style={{ padding: "0 8px" }}>
            <CardTitle title="RECOMENDADOS" subtitle="4 Ofertas" titleSize={16} subtitleSize={14} />
          </header>
          <div className="zm-shelf__grid">
            <OfferCard variant="live" name="Audi Q3" year={2026} price="US$ 9,999" imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard variant="live" name="Audi Q3" year={2026} price="US$ 9,999" imageSrc="/demo/bronco.jpg" badge={<BadgeStatus variant="live" />} elevated />
            <OfferCard variant="negotiable" name="Audi Q3" year={2026} imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard variant="live" name="Audi Q3" year={2026} price="US$ 9,999" imageSrc="/demo/bronco.jpg" elevated />
          </div>
        </div>

        {/* OfferShelf mobile — ME INTERESA (2×2 grid) */}
        <div className="zm-shelf">
          <header style={{ padding: "0 8px" }}>
            <CardTitle title="ME INTERESA" subtitle="4 Ofertas" titleSize={16} subtitleSize={14} />
          </header>
          <div className="zm-shelf__grid">
            <OfferCard variant="live" name="Audi Q3" year={2026} price="US$ 9,999" imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard variant="live" name="Audi Q3" year={2026} price="US$ 9,999" imageSrc="/demo/bronco.jpg" badge={<BadgeStatus variant="live" />} elevated />
            <OfferCard variant="negotiable" name="Audi Q3" year={2026} imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard variant="live" name="Audi Q3" year={2026} price="US$ 9,999" imageSrc="/demo/bronco.jpg" elevated />
          </div>
        </div>

        {/* CENTRO DE AYUDA — 388×116 */}
        <div
          data-slot="help-banner"
          style={{
            width: 388,
            height: 116,
            boxSizing: "border-box",
            borderRadius: 8,
            background: "#E9EAEC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "#9AA1AC",
          }}
        >
          CENTRO DE AYUDA
        </div>

      </div>
    </div>
  );

  return (
    <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen} defaultActiveId="hoy" frameHeight={frameHeight}>
      {page}
    </SidebarMobile>
  );
}
