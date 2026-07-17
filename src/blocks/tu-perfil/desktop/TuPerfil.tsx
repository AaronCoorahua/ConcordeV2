/**
 * TuPerfil — Bloque de Concorde (Voyager DS)
 *
 * Pantalla «Tu Perfil»: Header logueado + un área gris placeholder
 * (mismo gris que los banners de los demás bloques) que ocupa el resto del alto.
 *
 * Bloque = composición de componentes existentes (reusa el bloque Header).
 */

import type { CSSProperties, JSX } from "react";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import Button from "@/src/components/Button";
import ProfileCard from "./ProfileCard";
import { TUPERFIL_WIDTH, TUPERFIL_HEIGHT } from "./dimensions";

export { TUPERFIL_WIDTH, TUPERFIL_HEIGHT } from "./dimensions";

export interface TuPerfilProps {
  /** Usuario logueado — alimenta el CTA del header. */
  username?: string;
  /** Renderiza el AppHeader interno. `false` cuando el visor lo dibuja aparte. Default `true`. */
  renderHeader?: boolean;
  className?: string;
}

// Banner placeholder gris (mismo estilo que Homepage / Zona / Agregar Subascoins).
const BANNER_PLACEHOLDER: CSSProperties = {
  width: 766,
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

export default function TuPerfil({ username = "ZAEX5G", renderHeader = true, className = "" }: TuPerfilProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="tu-perfil"
      style={{
        width: TUPERFIL_WIDTH,
        minHeight: TUPERFIL_HEIGHT,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      {renderHeader ? <AppHeader width={TUPERFIL_WIDTH} username={username} /> : null}

      {/* Área blanca: columna de 766 (16px a cada lado = 798). No usa flex:1 para
          que abrace su contenido y el Centro de Ayuda quede pegado al botón. */}
      <div style={{ padding: "24px 16px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 766, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Banner superior 766×120 */}
          <div data-slot="banner" style={{ ...BANNER_PLACEHOLDER, height: 120 }}>
            BANNER
          </div>

          {/* Cards: Tu Perfil + Información de Contacto */}
          <ProfileCard />

          {/* Botón «Cerrar Sesión» (secondary, 200×48) centrado */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="secondary" style={{ width: 200, paddingLeft: 24, paddingRight: 24, whiteSpace: "nowrap" }}>Cerrar Sesión</Button>
          </div>

          {/* Banner Centro de ayuda 766×100 */}
          <div data-slot="help-banner" style={{ ...BANNER_PLACEHOLDER, height: 100 }}>
            CENTRO DE AYUDA
          </div>
        </div>
      </div>
    </div>
  );
}
