/**
 * SalaMobile — Bloque de Concorde (Voyager DS)
 *
 * Sala de subasta · mobile (420 × 844). Orquesta la animación "Ver live" (la
 * prop `live` la controla el visor / botón "Ver live" de la doc):
 *   1. Recibiendo participantes (3s) — sube el pill de participantes, los demás 0.
 *   2. Inicio extendido (3s) — igual + símbolo "+". ProgressBar BLANCO full estos 6s.
 *   3. Streaming de pujas: cada puja sube el bid actual; si es MÍA (sent/live) el
 *      botón se anima presionado y suben "mis bids" + "bid totales"; si es de otro,
 *      solo "bid totales". El ProgressBar (rainbow) está vacío y solo se llena en el
 *      remate "A la una/dos/tres". La última puja es MÍA → gano.
 *   4. Procesando (2s) → "Tabla de posiciones" (1° YO, naranja + estrella). Se queda.
 *   El CTA muestra el siguiente bid (bid actual + paso) y se oculta al terminar.
 */

"use client";

import { useState } from "react";
import type { JSX } from "react";
import MobileHeader, { MOBILEHEADER_HEIGHT } from "./MobileHeader";
import MobileChatPanel from "./MobileChatPanel";
import Button from "../../../components/Button";
import type { ProgressBarVariant } from "../../../components/ProgressBar";
import { STEP, ME, fmtMoney } from "../liveData";
import { useLiveAuction } from "../useSala";

export interface SalaMobileProps {
  className?: string;
  /** Modo en vivo — controlado desde el visor (botón "Ver live") */
  live?: boolean;
  /** Sin precio reserva — el remate no supera la reserva: tras "procesando" muestra
   *  la pantalla "Revisa tu historial / 48 horas" (sin tabla ni actividad). */
  noReserve?: boolean;
  /** Colores del efecto de luz del bid actual (editable). Default: primary. */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" (bombilla) o "spin" (gira). Default "bulb". */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

// CTA primary 320×48 + estado "presionado" (réplica de .pvbtn:active) +
// anillo expansivo naranja que estalla con cada puja MÍA (live o idle).
const CTA_STYLES = `
.salamobile-cta .pvbtn { width: 320px; padding: 0; }
.salamobile-cta--pressed .pvbtn {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: #d46e20;
  --vbtn-stop-b: #5a35c2;
  color: #d1d5dc;
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}
.salamobile-cta-ring {
  position: absolute;
  inset: -5px;
  border-radius: 9999px;
  pointer-events: none;
  border: 2.5px solid rgba(255,150,57,0.9);
  box-shadow: 0 0 18px rgba(255,120,26,0.8), inset 0 0 12px rgba(255,150,57,0.5);
  animation: salamobile-ring 550ms ease-out forwards;
}
@keyframes salamobile-ring {
  0% { opacity: 0.95; transform: scale(0.92); }
  100% { opacity: 0; transform: scale(1.28); }
}
@media (prefers-reduced-motion: reduce) {
  .salamobile-cta-ring { animation: none; opacity: 0; }
}
`;

import { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT, SALAMOBILE_BG } from "./dimensions";
export { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT, SALAMOBILE_BG } from "./dimensions";

export default function SalaMobile({ className = "", live = false, noReserve = false, flashColors, flashMode = "bulb" }: SalaMobileProps): JSX.Element {
  const {
    phase, shown, prog, count, participants, myBids, totalBids, bidAmount, bidder, pressed, flash,
  } = useLiveAuction(live, noReserve);

  // Estado del bid actual en idle (interactivo con el botón "Bidear")
  const [idleBid, setIdleBid] = useState(6559);
  const [idleBidder, setIdleBidder] = useState("ZAE389");
  const [idleFlash, setIdleFlash] = useState(0);

  const progVariant: ProgressBarVariant = live ? (phase === "streaming" || phase === "result" || phase === "activity" || phase === "bestbid" ? "rainbow" : "white") : "rainbow";
  const ctaAmount = (live ? bidAmount : idleBid) + STEP; // CTA = siguiente bid (un poco mayor)
  // Anillo del CTA: estalla con cada puja mía (live → myBids; idle → idleFlash)
  const ringKey = live ? myBids : idleFlash;

  // Click en "Bidear" (idle): pujo yo → sube mi bid + anima el bid actual
  function handleBid(): void {
    if (live) return;
    setIdleBid((b) => b + STEP);
    setIdleBidder(ME);
    setIdleFlash((f) => f + 1);
  }

  return (
    <div
      className={className}
      data-block="testsala-mobile"
      style={{
        position: "relative",
        width: SALAMOBILE_WIDTH,
        height: SALAMOBILE_HEIGHT,
        background: SALAMOBILE_BG,
        overflow: "hidden",
      }}
    >
      {/* Header 420×95 — pills dinámicas: mis bids (live) · bid totales · participantes */}
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <MobileHeader
          myBids={live ? String(myBids) : "11"}
          totalBids={live ? String(totalBids) : "111"}
          people={live ? String(participants) : "18"}
          reservePill={phase === "bestbid"}
        />
      </div>

      {/* Panel glass del chat — llega hasta abajo (cubre la zona del botón con su
          borde live); el botón flota encima, en su espacio reservado */}
      <div style={{ position: "absolute", top: MOBILEHEADER_HEIGHT, left: 0 }}>
        <MobileChatPanel
          height={SALAMOBILE_HEIGHT - MOBILEHEADER_HEIGHT}
          live={live}
          phase={phase}
          shown={shown}
          progress={live ? prog : 40}
          progressVariant={progVariant}
          count={count}
          bidAmount={live ? bidAmount : idleBid}
          bidder={live ? bidder : idleBidder}
          flash={live ? flash : idleFlash}
          flashColors={flashColors}
          flashMode={flashMode}
        />
      </div>

      {/* CTA primary 320×48 — siguiente bid (bid actual + paso); se "presiona" con mi
          puja. Se oculta al terminar la subasta (Procesando / Tabla de posiciones). */}
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CTA_STYLES }} />
      {phase === "processing" || phase === "result" || phase === "activity" || phase === "bestbid" ? null : (
        <div
          className={`salamobile-cta${pressed ? " salamobile-cta--pressed" : ""}`}
          style={{ position: "absolute", left: "50%", bottom: 16, transform: "translateX(-50%)" }}
        >
          {ringKey > 0 ? <span key={ringKey} className="salamobile-cta-ring" aria-hidden="true" /> : null}
          <Button variant="primary" onClick={handleBid}>{fmtMoney(ctaAmount)}</Button>
        </div>
      )}
    </div>
  );
}
