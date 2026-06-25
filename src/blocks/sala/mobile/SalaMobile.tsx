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
 *      remate "A la una/dos/tres". Al terminar se reinicia (sin "ganaste").
 *   El CTA muestra el siguiente bid (bid actual + paso).
 */

"use client";

import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import MobileHeader, { MOBILEHEADER_HEIGHT } from "./MobileHeader";
import MobileChatPanel from "./MobileChatPanel";
import Button from "../../../components/Button";
import type { ProgressBarVariant } from "../../../components/ProgressBar";
import type { Phase } from "../liveData";
import {
  STREAM,
  REVEAL_AT,
  TOTAL_STREAM,
  VMC_START,
  VMC_FILL,
  WELCOME_MS,
  EXTENDED_MS,
  RESTART_PAUSE,
  START_COUNT,
  PARTICIPANTS_TARGET,
  BASE,
  STEP,
  ME,
  fmtMoney,
} from "../liveData";

export interface SalaMobileProps {
  className?: string;
  /** Modo en vivo — controlado desde el visor (botón "Ver live") */
  live?: boolean;
  /** Colores del efecto de luz del bid actual (editable). Default: primary. */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" (bombilla) o "spin" (gira). Default "bulb". */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

// CTA primary 320×48 + estado "presionado" (réplica de .pvbtn:active)
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
`;

export const SALAMOBILE_WIDTH = 420;
export const SALAMOBILE_HEIGHT = 844;
export const SALAMOBILE_BG = "linear-gradient(116deg, #5F3ED8 0%, #340091 50%, #140046 100%)";

export default function SalaMobile({ className = "", live = false, flashColors, flashMode = "bulb" }: SalaMobileProps): JSX.Element {
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const [prog, setProg] = useState(40);
  const [count, setCount] = useState(START_COUNT);
  const [participants, setParticipants] = useState(0);
  const [myBids, setMyBids] = useState(0);
  const [totalBids, setTotalBids] = useState(0);
  const [bidAmount, setBidAmount] = useState(BASE);
  const [bidder, setBidder] = useState("ZAE389");
  const [pressed, setPressed] = useState(false);
  const [flash, setFlash] = useState(0); // dispara la animación de nuevo bid
  const [idleBid, setIdleBid] = useState(6559); // bid actual en idle (interactivo con "Bidear")
  const [idleBidder, setIdleBidder] = useState("ZAE389");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    function runLive() {
      function clearAll(): void {
        timers.current.forEach((id) => {
          clearTimeout(id);
          clearInterval(id);
        });
        timers.current = [];
      }

      if (!live) {
        clearAll();
        setPhase("idle");
        setShown(0);
        setProg(40);
        setPressed(false);
        return;
      }

      let cancelled = false;

      function cycle(): void {
        if (cancelled) return;
        clearAll();
        // (1)+(2) Recibiendo / Inicio extendido — barra BLANCA full · cuenta de 3s
        setPhase("welcome");
        setShown(0);
        setProg(100);
        setCount(START_COUNT);
        setParticipants(0);
        setMyBids(0);
        setTotalBids(0);
        setBidAmount(BASE);
        setBidder("—");

        timers.current.push(setInterval(() => setParticipants((p) => (p < PARTICIPANTS_TARGET ? p + 1 : p)), 300));
        timers.current.push(setInterval(() => setCount((c) => (c > 1 ? c - 1 : 1)), 1000));
        timers.current.push(
          setTimeout(() => {
            setPhase("extended");
            setCount(START_COUNT); // reinicia la cuenta de 3s para "inicio extendido"
          }, WELCOME_MS),
        );

        timers.current.push(
          setTimeout(function toStreaming() {
            clearAll();
            // (3) Streaming — barra rainbow VACÍA hasta el remate
            setPhase("streaming");
            setShown(0);
            setProg(0);

            STREAM.forEach(function schedule(m, i) {
              timers.current.push(
                setTimeout(function reveal() {
                  setShown(i + 1);
                  if (m.kind === "proposal") {
                    setBidAmount(m.amount ?? BASE);
                    setBidder(m.bidder ?? "—");
                    setFlash((f) => f + 1); // anima el bid actual con cada puja
                    if (m.mine) {
                      setMyBids((x) => x + 1);
                      setTotalBids((x) => x + 1);
                      setPressed(true);
                      timers.current.push(setTimeout(() => setPressed(false), 200));
                    } else {
                      setTotalBids((x) => x + 1);
                    }
                  }
                }, REVEAL_AT[i]),
              );
            });

            // El ProgressBar solo se llena durante el remate (A la una/dos/tres)
            timers.current.push(
              setTimeout(function startFill() {
                const s = Date.now();
                const iv = setInterval(() => {
                  const p = Math.min(100, ((Date.now() - s) / VMC_FILL) * 100);
                  setProg(p);
                  if (p >= 100) clearInterval(iv);
                }, 100);
                timers.current.push(iv);
              }, VMC_START),
            );

            // Reinicia (sin "ganaste")
            timers.current.push(setTimeout(cycle, TOTAL_STREAM + RESTART_PAUSE));
          }, WELCOME_MS + EXTENDED_MS),
        );
      }

      cycle();
      return function cleanup() {
        cancelled = true;
        clearAll();
      };
    },
    [live],
  );

  const progVariant: ProgressBarVariant = live ? (phase === "streaming" ? "rainbow" : "white") : "rainbow";
  const ctaAmount = (live ? bidAmount : idleBid) + STEP; // CTA = siguiente bid (un poco mayor)

  // Click en "Bidear" (idle): pujo yo → sube mi bid + anima el bid actual
  function handleBid(): void {
    if (live) return;
    setIdleBid((b) => b + STEP);
    setIdleBidder(ME);
    setFlash((f) => f + 1);
  }

  return (
    <div
      className={className}
      data-block="sala-mobile"
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
        />
      </div>

      {/* Panel glass del chat 420×670 */}
      <div style={{ position: "absolute", top: MOBILEHEADER_HEIGHT, left: 0 }}>
        <MobileChatPanel
          height={670}
          live={live}
          phase={phase}
          shown={shown}
          progress={live ? prog : 40}
          progressVariant={progVariant}
          count={count}
          bidAmount={live ? bidAmount : idleBid}
          bidder={live ? bidder : idleBidder}
          flash={flash}
          flashColors={flashColors}
          flashMode={flashMode}
        />
      </div>

      {/* CTA primary 320×48 — siguiente bid (bid actual + paso); se "presiona" con mi puja */}
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CTA_STYLES }} />
      <div
        className={`salamobile-cta${pressed ? " salamobile-cta--pressed" : ""}`}
        style={{ position: "absolute", left: "50%", bottom: 16, transform: "translateX(-50%)" }}
      >
        <Button variant="primary" onClick={handleBid}>{fmtMoney(ctaAmount)}</Button>
      </div>
    </div>
  );
}
