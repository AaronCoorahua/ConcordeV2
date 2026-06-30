"use client";

/**
 * ZonaMobile — Bloque de Concorde (Voyager DS)
 *
 * Zona de usuario · mobile (420 de ancho):
 *   · Header 420×64 logueado → «Bienvenido, ZAEX5G»
 *   · UserProfileCard mobile 388×132 (2 filas: saludo + stats)
 */

import type { JSX } from "react";
import AppHeader from "../../header/desktop/Header";
import AvatarZone from "../../../components/AvatarZone";
import StarIcon from "../../../components/StarIcon";
import InfoIcon from "../../../components/InfoIcon";
import ProfileButton from "../../../components/ProfileButton";

export const ZONA_MOBILE_WIDTH = 420;
export const ZONA_MOBILE_HEIGHT = 228;

const ZM_STYLES = `
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
`;

export interface ZonaMobileProps {
  username?: string;
  className?: string;
}

export default function ZonaMobile({ username = "ZAEX5G", className = "" }: ZonaMobileProps): JSX.Element {
  return (
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
        logo={<img src="/logo-preview.png" alt="VMC Subastas" style={{ height: 26, width: "auto", display: "block" }} />}
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

      </div>
    </div>
  );
}
