/**
 * Zona — Bloque de Concorde (Voyager DS)
 *
 * Zona de usuario (Header logueado + contenido blanco):
 *   · UserProfileCard — saludo, riesgo, puntos VMC, accesos
 *   · 2 columnas: WalletBalanceCard (Billetera) · ActivityCard (Tu actividad)
 *   · Secondary banner (placeholder)
 *   · OfferShelf «Recomendados» · OfferShelf «Me interesa» (4 OfferCards c/u)
 *   · Centro de ayuda banner (placeholder)
 *
 * Bloque = composición de componentes existentes (reusa el bloque Header).
 */

import type { CSSProperties, JSX } from "react";
import AppHeader from "@/src/blocks/header/desktop/Header";
import UserProfileCard from "@/src/components/UserProfileCard";
import WalletBalanceCard from "@/src/components/WalletBalanceCard";
import ActivityCard from "@/src/components/ActivityCard";
import OfferShelf from "@/src/components/OfferShelf";
import { ZONA_WIDTH, ZONA_HEIGHT } from "./dimensions";

export { ZONA_WIDTH, ZONA_HEIGHT } from "./dimensions";

export interface ZonaProps {
  /** Usuario logueado — alimenta el CTA del header y el saludo de la card. */
  username?: string;
  /** Renderiza el AppHeader interno. Ponlo en `false` cuando el visor dibuja el
   *  header por separado (para escalarlo aparte del cuerpo). Por defecto `true`. */
  renderHeader?: boolean;
  className?: string;
}

// Banner placeholder gris 766×100 (igual que en Homepage) — secondary / centro de ayuda.
const BANNER_PLACEHOLDER: CSSProperties = {
  width: 766,
  height: 100,
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

export default function Zona({ username = "ZAEX5G", renderHeader = true, className = "" }: ZonaProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="zona"
      style={{
        width: ZONA_WIDTH,
        minHeight: ZONA_HEIGHT,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      {renderHeader ? <AppHeader width={ZONA_WIDTH} username={username} /> : null}

      {/* Área blanca: columna de 766 (16px a cada lado = 798), gap 16 entre secciones */}
      <div style={{ flex: 1, padding: "24px 16px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 766, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Tarjeta de perfil */}
          <UserProfileCard username={username} />

          {/* 2 columnas — Billetera (izq) · Tu actividad (der) */}
          <div style={{ display: "flex", gap: 16 }}>
            <WalletBalanceCard />
            <ActivityCard />
          </div>

          {/* Secondary banner */}
          <div data-slot="secondary-banner" style={BANNER_PLACEHOLDER}>
            SECONDARY BANNER
          </div>

          {/* Estantes de ofertas — Recomendados / Me interesa */}
          <OfferShelf title="RECOMENDADOS" offersLabel="4 Ofertas" />
          <OfferShelf title="ME INTERESA" offersLabel="4 Ofertas" />

          {/* Centro de ayuda banner */}
          <div data-slot="help-banner" style={BANNER_PLACEHOLDER}>
            CENTRO DE AYUDA
          </div>
        </div>
      </div>
    </div>
  );
}
