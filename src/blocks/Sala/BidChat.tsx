/**
 * BidChat — Sección del bloque Sala (Voyager DS)
 * Fuente: Figma VOYAGER · "BidChat" (panel 313×677) + "Frame 1000022968"
 *
 * Panel de chat de puja (columna derecha): gradiente morado (#5F3ED8→#340091→
 * #140046), borde gradiente (white→naranja→lila→white) y sombra; esquinas
 * superiores rectas e inferiores redondeadas (16) tal cual el SVG.
 *
 * Contenido:
 *   · arriba (16px del top, centrado)    → BidProposal (propuesta · bid actual)
 *   · centro                              → ChatArea (fondo + ProgressBar) con la
 *     lista de BidMessage en 3 bloques (propuesta → "Cierra en" → VMC).
 *   · abajo  (16px del bottom, centrado)  → BidButton
 */

import type { JSX, ReactNode } from "react";
import BidProposal from "@/src/components/BidProposal/BidProposal";
import BidButton from "@/src/components/BidButton/BidButton";
import BidMessage from "@/src/components/BidMessage/BidMessage";
import ChatArea from "./ChatArea";

export interface BidChatProps {
  className?: string;
  /** Contenido extra al final de la lista de mensajes */
  children?: ReactNode;
}

export const BIDCHAT_WIDTH = 313;
export const BIDCHAT_HEIGHT = 677;

// Relleno morado: paint0 diagonal (#5F3ED8 → #340091 50% → #140046)
const FILL = "linear-gradient(115deg, #5F3ED8 0%, #340091 50%, #140046 100%)";
// Borde gradiente: paint1 (white → #F4AC59 → #8460E5 → white)
const BORDER = "linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%)";

const USER = "KAHTH4";
const AMOUNT = "US$ 5,079";

// Tipo de la burbuja "propuesta" por bloque (1º y 3º blancas, 2º naranja/live)
const PROPOSAL_TYPES = ["white", "live", "white"] as const;

function Proposal(): JSX.Element {
  return (
    <>
      <strong>{USER}</strong> ha propuesto <strong>{AMOUNT}</strong>
    </>
  );
}

function Closes(): JSX.Element {
  return (
    <>
      Cierra en <strong>{AMOUNT}</strong>
    </>
  );
}

// Logo VMC — mismo slot que usa el componente BidMessage (/logo-preview.png)
const VMC_LOGO = <img src="/logo-preview.png" alt="VMC SUBASTAS" style={{ height: 16, width: "auto", display: "block" }} />;

function buildMessages(): JSX.Element[] {
  const out: JSX.Element[] = [];
  PROPOSAL_TYPES.forEach(function block(propType, i) {
    // El "ha propuesto" live llega de la derecha (sent); los blancos a la izquierda
    const side = propType === "live" ? "sent" : "received";
    out.push(
      <BidMessage key={`p${i}`} side={side} type={propType}>
        <Proposal />
      </BidMessage>,
    );
    out.push(
      <BidMessage key={`c${i}`} side="received" type="vault">
        <Closes />
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

export default function BidChat({ className = "", children }: BidChatProps): JSX.Element {
  return (
    <div
      className={className}
      data-block-section="bidchat"
      style={{
        boxSizing: "border-box",
        width: BIDCHAT_WIDTH,
        height: BIDCHAT_HEIGHT,
        // top recto, abajo redondeado 16 (tal cual el path del SVG)
        borderRadius: "0 0 16px 16px",
        backgroundImage: `${FILL}, ${BORDER}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "2px solid transparent",
        boxShadow: "rgba(0,0,0,0.35) 0px 0px 10px 4px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Propuesta · bid actual · 16px del top, centrado */}
      <div style={{ position: "absolute", top: 16, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BidProposal />
      </div>

      {/* Área de mensajes 278×478 · 16px bajo la propuesta, centrada (con
          ProgressBar al fondo). Lista de BidMessage en 3 bloques. */}
      <div style={{ position: "absolute", top: 112, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <ChatArea>
          {buildMessages()}
          {children}
        </ChatArea>
      </div>

      {/* Bid button · 16px del bottom, centrado */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 16, display: "flex", justifyContent: "center" }}>
        <BidButton />
      </div>
    </div>
  );
}
