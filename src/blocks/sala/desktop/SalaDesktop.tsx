/**
 * Sala — Bloque de Concorde (Voyager DS)
 *
 * Sala de subasta. En modo live anima la llegada: "Conectados" (participantes)
 * sube mientras "Mis bids" / "Bids totales" quedan en 0.
 */

"use client";

import type { JSX } from "react";
import ConsoleHeader from "./ConsoleHeader";
import PriceBase from "./PriceBase";
import StatPill from "../../../components/StatPill";
import BidChat from "./BidChat";
import SalaStatus from "../../../components/SalaStatus";
import CardViewer from "../../../components/CardViewer";
import BidPosition, { type BidPositionItem } from "../../../components/BidPosition";
import { useLiveAuction, fmtElapsed } from "../useSala";
import { STREAM } from "../liveData";

// Posiciones en vivo: SIEMPRE 5 filas. Cuenta las pujas reveladas por usuario y
// ordena desc; los puestos sin postor salen con "···". Máximo 5 (un 6to no se ve).
const MAX_ROWS = 5;

function placeholderRow(i: number): BidPositionItem {
  return { id: `dots-${i}`, name: "···", value: "···", rank: `${i + 1}°` };
}

function livePositions(shown: number): BidPositionItem[] {
  const revealed = STREAM.slice(0, shown).filter((m) => m.kind === "proposal");
  const counts = new Map<string, number>();
  for (const m of revealed) {
    const u = m.bidder ?? "—";
    counts.set(u, (counts.get(u) ?? 0) + 1);
  }
  const real = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_ROWS)
    .map(([name, value], i) => ({ id: name, name, value: String(value), rank: `${i + 1}°` }));
  // Rellena hasta 5 con "···"
  const rows: BidPositionItem[] = [...real];
  for (let i = real.length; i < MAX_ROWS; i++) rows.push(placeholderRow(i));
  return rows;
}

export interface SalaProps {
  className?: string;
  /** Modo en vivo — anima la llegada en el BidChat (botón "Ver live"). */
  live?: boolean;
  /** Sin precio reserva — el remate no supera la reserva: tras "procesando" muestra
   *  la pantalla "Revisa tu historial / 48 horas" (sin tabla ni actividad). */
  noReserve?: boolean;
  /** Colores del efecto de luz del bid actual (editable). Default: primary. */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" (bombilla) o "spin" (gira). Default "bulb". */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

import { SALA_WIDTH, SALA_HEIGHT } from "./dimensions";
export { SALA_WIDTH, SALA_HEIGHT } from "./dimensions";

const SALA_IMAGES = ["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"];

export default function SalaDesktop({ className = "", live = false, noReserve = false, flashColors, flashMode = "bulb" }: SalaProps): JSX.Element {
  const live$ = useLiveAuction(live, noReserve);
  const { phase, count, participants, myBids, totalBids } = live$;
  // Posiciones: en live salen "..." hasta la 1ª puja y luego se apilan/reordenan.
  const positions = live ? livePositions(live$.shown) : undefined;
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
      {/* ConsoleHeader 991×64 · a 16px del top, centrado (16px a cada lado).
          En live "Conectados" sube (participantes). */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <ConsoleHeader conectados={live ? String(participants) : "18"} />
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
        <CardViewer header={<SalaStatus time={live ? fmtElapsed(live$.elapsed) : "00:00:10"} />} images={SALA_IMAGES} />

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
            <StatPill variant="bids" label="MIS BIDS" value={live ? String(myBids) : "18"} />
            <StatPill variant="total" label="BIDS TOTALES" value={live ? String(totalBids) : "157"} />
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
        <BidChat
          live={live}
          phase={phase}
          count={count}
          shown={live$.shown}
          prog={live$.prog}
          bidAmount={live$.bidAmount}
          bidder={live$.bidder}
          pressed={live$.pressed}
          flash={live$.flash}
          flashColors={flashColors}
          flashMode={flashMode}
        />
        <BidPosition positions={positions} />
      </div>
    </div>
  );
}
