/**
 * BidChat — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "BidChat" (panel 316×677)
 *
 * Un solo panel 316×677 (gradiente morado + glass white 8% + borde gradiente,
 * radio 16, backdrop-blur 14, sombra) que contiene TODO:
 *   · Los BidMessage son el bg y van hasta arriba (su bg/borde es el del panel).
 *   · BidProposal (bid actual, 280×78) montado ENCIMA, arriba al centro.
 *   · ProgressBar 424×22 (rainbow, recortada al panel) sin esquinas redondeadas.
 *   · Botón primary 200×48 (solo el monto) abajo; al presionarlo dispara el
 *     efecto de luz del bid actual.
 */

"use client";

import { useState } from "react";
import type { JSX } from "react";
import BidProposal from "../../../components/BidProposal";
import BidMessage from "../../../components/BidMessage";
import ProgressBar from "../../../components/ProgressBar";
import Button from "../../../components/Button";

export interface BidChatProps {
  className?: string;
  /** Colores del efecto de luz del bid actual (editable). Default: primary. */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" (bombilla) o "spin" (gira). Default "bulb". */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

export const BIDCHAT_WIDTH = 316;
export const BIDCHAT_HEIGHT = 677;

const USER = "KAHTH4";
const AMOUNT = "US$ 5,079";
const STEP = 79;

function fmtMoney(n: number): string {
  return "US$ " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const VMC_LOGO = <img src="/logo-preview.png" alt="VMC SUBASTAS" style={{ height: 16, width: "auto", display: "block" }} />;

// 4 bloques: propuesta (blanca/izq · naranja/live a la der) → "Cierra en" → VMC.
// El 2º y 4º son "live" (naranja, der); los demás blancos a la izquierda.
const PROPOSAL_TYPES = ["white", "live", "white", "live"] as const;
function buildMessages(): JSX.Element[] {
  const out: JSX.Element[] = [];
  PROPOSAL_TYPES.forEach(function block(propType, i) {
    const side = propType === "live" ? "sent" : "received";
    out.push(
      <BidMessage key={`p${i}`} side={side} type={propType}>
        <strong>{USER}</strong> ha propuesto <strong>{AMOUNT}</strong>
      </BidMessage>,
    );
    out.push(
      <BidMessage key={`c${i}`} side="received" type="vault">
        Cierra en <strong>{AMOUNT}</strong>
      </BidMessage>,
    );
    out.push(
      <BidMessage key={`v${i}`} side="received" type="vault" logo={VMC_LOGO}>
        A la una
      </BidMessage>,
    );
  });
  return out;
}

// Panel: morado (paint0) + glass white 8% + borde gradiente (paint1)
const PANEL_BG = "linear-gradient(0deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08)), linear-gradient(115deg, #5F3ED8 0%, #340091 50%, #140046 100%)";
const PANEL_BORDER = "linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%)";

const STYLE_ID = "concorde-bidchat-styles";
const BIDCHAT_STYLES = `
/* Lista de mensajes (ocupa el panel hasta arriba) · scroll oculto */
.bidchat-list { scrollbar-width: none; -ms-overflow-style: none; }
.bidchat-list::-webkit-scrollbar { width: 0; height: 0; display: none; }
.bidchat-list .pbidmsg { font-size: 13px; }
.bidchat-list .pbidmsg--sent { align-self: flex-end; }
/* ProgressBar 424×22 sin esquinas redondeadas (recortada al panel) */
.bidchat-prog .pprogbar { border-radius: 0; width: 424px; height: 22px; }
/* CTA 200×48, solo el monto */
.bidchat-cta .pvbtn { width: 200px; padding: 0; }
`;

let _stylesInjected = false;

export default function BidChat({ className = "", flashColors, flashMode = "bulb" }: BidChatProps): JSX.Element {
  const [flash, setFlash] = useState(0);
  const [bidActual, setBidActual] = useState(6559);
  const [nextBid, setNextBid] = useState(7000);

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDCHAT_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  // Click en el botón → pujo yo: sube el bid actual y se enciende el efecto de luz
  function handleBid(): void {
    setBidActual(nextBid);
    setNextBid((n) => n + STEP);
    setFlash((f) => f + 1);
  }

  return (
    <div
      className={className}
      data-block-section="bidchat"
      style={{
        boxSizing: "border-box",
        position: "relative",
        width: BIDCHAT_WIDTH,
        height: BIDCHAT_HEIGHT,
        borderRadius: 16,
        backgroundImage: `${PANEL_BG}, ${PANEL_BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        border: "1.5px solid transparent",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "rgba(20,0,69,0.3) 0px 8px 24px -2px",
        overflow: "hidden",
      }}
    >
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDCHAT_STYLES }} />

      {/* Lista de BidMessage — son el bg y van hasta arriba (scroll), por debajo del bid actual */}
      <div
        className="bidchat-list"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 108,
          overflowY: "auto",
          padding: "16px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        {buildMessages()}
      </div>

      {/* Bid actual (glass) 280×78 — arriba al centro, ENCIMA de los mensajes */}
      <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 3 }}>
        <BidProposal amount={fmtMoney(bidActual)} label="ENVIADO POR KAHTH4" flash={flash} flashColors={flashColors} flashMode={flashMode} />
      </div>

      {/* ProgressBar rainbow 424×22 (sin rounded) — recortada al panel */}
      <div className="bidchat-prog" style={{ position: "absolute", left: 0, bottom: 80, height: 22, zIndex: 5 }}>
        <ProgressBar variant="rainbow" value={40} aria-label="Tiempo de bid" />
      </div>

      {/* Botón 200×48 (solo el monto) abajo — al presionarlo dispara el efecto de luz */}
      <div className="bidchat-cta" style={{ position: "absolute", left: 0, right: 0, bottom: 16, display: "flex", justifyContent: "center", zIndex: 5 }}>
        <Button variant="primary" onClick={handleBid}>{fmtMoney(nextBid)}</Button>
      </div>
    </div>
  );
}
