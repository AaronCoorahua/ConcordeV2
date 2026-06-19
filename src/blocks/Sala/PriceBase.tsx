/**
 * PriceBase — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "Background+Shadow" (card 272×106)
 *
 * Card "PRECIO BASE / US$ 5,000": fondo morado degradado, borde superior sutil
 * y sombra. Reusa el componente PriceIcon (la gema). Editable por props.
 */

import type { JSX } from "react";
import PriceIcon from "@/src/components/PriceIcon/PriceIcon";

export interface PriceBaseProps {
  /** Etiqueta superior (default "PRECIO BASE") */
  label?: string;
  /** Monto (default "US$ 5,000") */
  amount?: string;
  className?: string;
}

export const PRICEBASE_WIDTH = 272;
export const PRICEBASE_HEIGHT = 106;

// Relleno morado: paint0 horizontal (#19004A der → #2E0F70 izq)
const FILL = "linear-gradient(270deg, #19004A 0%, #3B1782 50%, #2E0F70 100%)";
// Borde: highlight blanco sutil arriba (paint1: white 0.1 → transparent)
const BORDER = "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 55%)";

export default function PriceBase({
  label = "PRECIO BASE",
  amount = "US$ 5,000",
  className = "",
}: PriceBaseProps): JSX.Element {
  return (
    <div
      className={className}
      data-slot="price-base"
      style={{
        boxSizing: "border-box",
        width: PRICEBASE_WIDTH,
        height: PRICEBASE_HEIGHT,
        borderRadius: 16,
        backgroundImage: `${FILL}, ${BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1.5px solid transparent",
        boxShadow: "rgba(20,0,70,0.42) 0px 8px 22px, inset 0px 1px 0px rgba(255,255,255,0.2)",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: "#ffffff",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <PriceIcon size="md" title="Precio base" />
        <span
          style={{
            fontSize: 30,
            fontWeight: 800,
            lineHeight: 1,
            color: "#ffffff",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {amount}
        </span>
      </div>
    </div>
  );
}
