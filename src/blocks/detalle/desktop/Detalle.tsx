/**
 * Detalle — Bloque de Concorde (Voyager DS)
 *
 * Página de detalle. Por ahora es solo el lienzo base: un fondo blanco de
 * 799 × 1483. Iremos montando las secciones encima.
 */

import type { JSX } from "react";
import AuctionStatus from "../../../components/AuctionStatus";
import CardViewer from "../../../components/CardViewer";

const DETALLE_IMAGES = Array.from({ length: 8 }, function img() { return "/demo/bronco.jpg"; });

export interface DetalleProps {
  className?: string;
}

export const DETALLE_WIDTH = 799;
export const DETALLE_HEIGHT = 1483;

export default function Detalle({ className = "" }: DetalleProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="detalle"
      style={{
        position: "relative",
        width: DETALLE_WIDTH,
        height: DETALLE_HEIGHT,
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* AuctionStatus · arriba a la izquierda, a 16px del top y de la izquierda */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <AuctionStatus />
      </div>

      {/* CardViewer · pegado debajo del AuctionStatus (top 16 + 60), misma izquierda */}
      <div style={{ position: "absolute", top: 76, left: 16 }}>
        <CardViewer images={DETALLE_IMAGES} />
      </div>

      {/* Secondary Banner 766 × 100 · a 16px del bottom, centrado horizontalmente */}
      <div
        data-slot="secondary-banner"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 16,
          transform: "translateX(-50%)",
          width: 766,
          height: 100,
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
    </div>
  );
}
