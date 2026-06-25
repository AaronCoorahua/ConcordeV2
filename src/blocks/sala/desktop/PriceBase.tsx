/**
 * PriceBase — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "Background+Shadow" (card 272×106)
 *
 * Card "PRECIO BASE / US$ 5,000": fondo morado degradado, borde superior sutil
 * y sombra. Reusa el componente PriceIcon (la gema). Editable por props.
 */

import type { JSX } from "react";
import PriceIcon from "../../../components/PriceIcon";

export interface PriceBaseProps {
  /** Etiqueta superior (default "PRECIO BASE") */
  label?: string;
  /** Monto (default "US$ 5,000") */
  amount?: string;
  className?: string;
}

export const PRICEBASE_WIDTH = 272;
export const PRICEBASE_HEIGHT = 106;

// Dark glass (paint0 + "behind transparent areas" #0A002E): base navy + sheen
// blanco (white 28%→4%) + borde gradiente (white .9 → #F4AC59 .7 → #8460E5 .7 → white .9)
const GLASS_SHEEN = "linear-gradient(127deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.03) 100%)";
const GLASS_BASE = "linear-gradient(160deg, rgba(28,13,82,0.93) 0%, rgba(14,3,56,0.95) 100%)";
const GLASS_BORDER = "linear-gradient(125deg, rgba(255,255,255,0.9) 0%, rgba(244,172,89,0.7) 22%, rgba(132,96,229,0.7) 74.5%, rgba(255,255,255,0.9) 100%)";

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
        backgroundImage: `${GLASS_SHEEN}, ${GLASS_BASE}, ${GLASS_BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        border: "1.5px solid transparent",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "rgba(10,0,46,0.6) 0px 12px 36px -4px, inset 0 1px 0 rgba(255,255,255,0.22)",
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
