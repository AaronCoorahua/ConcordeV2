/**
 * AgregarSubascoins — Bloque de Concorde (Voyager DS)
 *
 * Pantalla «Agregar SubasCoins»: Header logueado + un área gris placeholder
 * (mismo gris que los banners de los demás bloques) que ocupa el resto del alto.
 *
 * Bloque = composición de componentes existentes (reusa el bloque Header).
 */

import type { CSSProperties, JSX } from "react";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import SubasCoinsCard from "./SubasCoinsCard";
import { AGREGARSUBASCOINS_WIDTH, AGREGARSUBASCOINS_HEIGHT } from "./dimensions";

export { AGREGARSUBASCOINS_WIDTH, AGREGARSUBASCOINS_HEIGHT } from "./dimensions";

export interface AgregarSubascoinsProps {
  /** Usuario logueado — alimenta el CTA del header. */
  username?: string;
  className?: string;
}

// Banner placeholder gris 766×120 (igual estilo que los banners de Homepage / Zona).
const BANNER_PLACEHOLDER: CSSProperties = {
  width: 766,
  height: 120,
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

export default function AgregarSubascoins({ username = "ZAEX5G", className = "" }: AgregarSubascoinsProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="agregar-subascoins"
      style={{
        width: AGREGARSUBASCOINS_WIDTH,
        minHeight: AGREGARSUBASCOINS_HEIGHT,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      <AppHeader width={AGREGARSUBASCOINS_WIDTH} username={username} />

      {/* Área blanca: columna de 766 (16px a cada lado = 798), gap 16 entre secciones */}
      <div style={{ flex: 1, minHeight: AGREGARSUBASCOINS_HEIGHT - HEADER_HEIGHT, padding: "24px 16px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 766, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Banner superior 766×120 */}
          <div data-slot="banner" style={BANNER_PLACEHOLDER}>
            BANNER
          </div>

          {/* Card «Adquiere SubasCoins» 766×437 */}
          <SubasCoinsCard />

          {/* Banner Centro de ayuda 766×100 */}
          <div data-slot="help-banner" style={{ ...BANNER_PLACEHOLDER, height: 100 }}>
            CENTRO DE AYUDA
          </div>
        </div>
      </div>
    </div>
  );
}
