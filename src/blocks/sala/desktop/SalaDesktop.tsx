/**
 * Sala — Bloque de Concorde (Voyager DS)
 *
 * Sala de subasta. Por ahora es solo el lienzo base: un fondo de 1023 × 1042
 * con el color de marca (#2E0F70). Iremos montando las secciones encima.
 */

import type { JSX } from "react";
import ConsoleHeader from "./ConsoleHeader";
import PriceBase from "./PriceBase";
import StatPill from "../../../components/StatPill";
import BidChat from "./BidChat";
import SalaStatus from "../../../components/SalaStatus";
import CardViewer from "../../../components/CardViewer";
import BidPosition from "../../../components/BidPosition";

export interface SalaProps {
  className?: string;
  /** Colores del efecto de luz del bid actual (editable). Default: primary. */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" (bombilla) o "spin" (gira). Default "bulb". */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

export const SALA_WIDTH = 1023;
export const SALA_HEIGHT = 1042;

const SALA_IMAGES = ["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"];

export default function SalaDesktop({ className = "", flashColors, flashMode = "bulb" }: SalaProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="sala-desktop"
      style={{
        position: "relative",
        width: SALA_WIDTH,
        height: SALA_HEIGHT,
        background: "#2E0F70",
        overflow: "hidden",
      }}
    >
      {/* ConsoleHeader 991×64 · a 16px del top, centrado (16px a cada lado) */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <ConsoleHeader />
      </div>

      {/* Banner 204×930 · abajo-izquierda: 16px del left, 16px del bottom, 16px del header */}
      <div
        data-slot="left-banner"
        style={{
          position: "absolute",
          top: 96,
          left: 16,
          width: 204,
          height: 930,
          borderRadius: 8,
          background: "#E9EAEC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "#9AA1AC",
        }}
      >
        BANNER
        <br />
        204 × 930
      </div>

      {/* Columna derecha (443 ancho) · SalaStatus+visor (borde gradiente) ·
          filmstrip · y debajo la fila PRECIO BASE + pills */}
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 236,
          width: 443,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* El borde gradiente (slot header de CardViewer) envuelve SOLO
            SalaStatus + el visor; el filmstrip queda aparte, debajo. */}
        <CardViewer header={<SalaStatus />} images={SALA_IMAGES} />

        {/* Debajo del filmstrip · izquierda: PRECIO BASE (PriceIcon) ·
            derecha: 2 pills MIS BIDS / BIDS TOTALES (SendBidIcon) */}
        <div style={{ display: "flex", gap: 15, alignItems: "stretch" }}>
          <PriceBase />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <StatPill variant="bids" label="MIS BIDS" value="18" />
            <StatPill variant="total" label="BIDS TOTALES" value="157" />
          </div>
        </div>

        {/* Banner inferior 443×237 · debajo de la fila PRECIO BASE + pills */}
        <div
          data-slot="bottom-banner"
          style={{
            width: 443,
            height: 237,
            borderRadius: 8,
            background: "#E9EAEC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "#9AA1AC",
          }}
        >
          BANNER
          <br />
          443 × 237
        </div>
      </div>

      {/* Columna derecha (316) · BidChat y, debajo, BidPosition */}
      <div style={{ position: "absolute", top: 96, left: 691, display: "flex", flexDirection: "column", gap: 16 }}>
        <BidChat flashColors={flashColors} flashMode={flashMode} />
        <BidPosition />
      </div>
    </div>
  );
}
