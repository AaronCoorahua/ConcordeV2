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
import MobileChatPanel from "../mobile/MobileChatPanel";
import { START_COUNT, STEP as LIVE_STEP, STREAM, fmtMoney, pad, type LiveMsg, type Phase } from "../liveData";

export interface BidChatProps {
  className?: string;
  /** Modo en vivo — flujo completo (llegada → streaming → procesando → tabla → actividad). */
  live?: boolean;
  /** Fase del live (controlada por SalaDesktop) */
  phase?: Phase;
  /** Contador de la caja "INICIA EN" (controlado por SalaDesktop) */
  count?: number;
  /** Estado del streaming/final (controlado por SalaDesktop) */
  shown?: number;
  prog?: number;
  bidAmount?: number;
  bidder?: string;
  pressed?: boolean;
  flash?: number;
  /** Colores del efecto de luz del bid actual (editable). Default: primary. */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" (bombilla) o "spin" (gira). Default "bulb". */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

export const BIDCHAT_WIDTH = 316;
export const BIDCHAT_HEIGHT = 677;
// Ancho interno del panel (316 menos el borde de 1.5px a cada lado)
const PANEL_INNER_WIDTH = BIDCHAT_WIDTH - 3;

const USER = "KAHTH4";
const AMOUNT = "US$ 5,079";

const VMC_LOGO = <img src="/logo-preview.png" alt="VMC SUBASTAS" style={{ height: 16, width: "auto", display: "block" }} />;

// Burbuja de un mensaje del stream live (misma lógica que mobile)
function LiveBubble({ m }: { m: LiveMsg }): JSX.Element {
  if (m.kind === "vmc") {
    return (
      <BidMessage side={m.side} type={m.type} logo={VMC_LOGO}>
        {m.text}
      </BidMessage>
    );
  }
  if (m.kind === "proposal") {
    return (
      <BidMessage side={m.side} type={m.type}>
        <strong>{m.bidder}</strong> ha propuesto <strong>{fmtMoney(m.amount ?? 0)}</strong>
      </BidMessage>
    );
  }
  return (
    <BidMessage side={m.side} type={m.type}>
      Cierra en <strong>{fmtMoney(m.amount ?? 0)}</strong>
    </BidMessage>
  );
}

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
/* En live la barra ocupa el ancho real del panel para que el % de llenado sea correcto */
.bidchat-prog--full .pprogbar { width: 100%; }
/* CTA 200×48, solo el monto */
.bidchat-cta .pvbtn { width: 200px; padding: 0; }
.bidchat-cta--pressed .pvbtn {
  --vbtn-angle: 135deg; --vbtn-stop-a: #d46e20; --vbtn-stop-b: #5a35c2;
  color: #d1d5dc; transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}

/* ── Streaming de pujas (entran deslizando y suben) ── */
.bidchat-stream { scrollbar-width: none; -ms-overflow-style: none; }
.bidchat-stream::-webkit-scrollbar { width: 0; height: 0; display: none; }
.bidchat-stream .pbidmsg { font-size: 13px; }
.bidchat-msg { align-self: flex-start; }
.bidchat-msg--sent { align-self: flex-end; }
.bidchat-msg--received { animation: bidchat-in-left 150ms cubic-bezier(0.3,0,0,1) both; }
.bidchat-msg--sent { animation: bidchat-in-right 150ms cubic-bezier(0.3,0,0,1) both; }
@keyframes bidchat-in-left { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
@keyframes bidchat-in-right { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) { .bidchat-msg--received, .bidchat-msg--sent { animation: none; } }

/* ── Llegada (welcome / extended) — mismos tamaños/posición que mobile ── */
.bidchat-status {
  position: absolute; inset: 0; z-index: 4;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 22px; text-align: center; padding: 24px 16px;
}
/* Línea superior (blanca, SIN gradiente) — igual que ".smchat__ext" de mobile (18/700) */
.bidchat-top {
  max-width: 100%; font-size: 18px; font-weight: 700; color: #ffffff;
}
/* Título grande con gradiente lila — igual que ".smchat__rp" de mobile (30/800) */
.bidchat-rp {
  max-width: 100%;
  font-size: 30px; font-weight: 800; line-height: 1.12; letter-spacing: -0.01em;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(132,96,229,0.55)) drop-shadow(0 0 24px rgba(82,52,189,0.4));
}
/* dots — 84×24 */
.bidchat-dots { display: flex; align-items: center; justify-content: center; gap: 12px; width: 84px; height: 24px; }
.bidchat-dots span {
  border-radius: 50%; background: #fff; box-shadow: 0 0 8px rgba(174,142,255,0.85);
  animation: bidchat-dot 1.2s ease-in-out infinite both;
}
.bidchat-dots span:nth-child(1) { width: 10px; height: 10px; animation-delay: 0s; }
.bidchat-dots span:nth-child(2) { width: 12px; height: 12px; animation-delay: 0.18s; }
.bidchat-dots span:nth-child(3) { width: 8px; height: 8px; animation-delay: 0.36s; }
@keyframes bidchat-dot {
  0%, 80%, 100% { opacity: 0.35; transform: scale(0.65); }
  40% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 14px rgba(174,142,255,1); }
}
/* Caja "INICIA EN" — 278×78 */
.bidchat-box {
  position: relative; box-sizing: border-box; width: 278px; max-width: 100%; height: 78px; border-radius: 20px;
  background: rgba(255,255,255,0.08); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 24px;
}
.bidchat-box::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
.bidchat-box-label {
  font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
}
.bidchat-box-row { display: flex; align-items: center; gap: 12px; }
.bidchat-box-row svg {
  filter:
    drop-shadow(0 0 6px rgba(207,186,255,0.95))
    drop-shadow(0 0 14px rgba(174,167,255,0.85))
    drop-shadow(0 0 26px rgba(132,96,229,0.6));
}
.bidchat-box-time {
  font-size: 30px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums; text-shadow: 0 0 10px rgba(174,166,255,0.5);
}
@media (prefers-reduced-motion: reduce) { .bidchat-dots span { animation: none; } }
`;

// Gradiente lila común (paths exactos de los SVG "INICIA EN")
const DESK_INICIA_GRAD = (
  <linearGradient id="inicia-grad-d" x1="6" y1="-8" x2="42" y2="4" gradientUnits="userSpaceOnUse">
    <stop stopColor="#CFBAFF" />
    <stop offset="0.35" stopColor="#ffffff" />
    <stop offset="0.65" stopColor="#AE8EFF" />
    <stop offset="1" stopColor="#CFBAFF" />
  </linearGradient>
);
// Timer (SVG 46×51) — reloj con gradiente lila, render 40×40
function DeskClockIcon(): JSX.Element {
  return (
    <svg width="34" height="34" viewBox="0 0 46 51" fill="none" aria-hidden="true">
      <path
        d="M18 10.7779V8H28V10.7779H18ZM21.6113 29.3054H24.3888V19.5833H21.6113V29.3054ZM17.1875 41.7846C15.3681 40.9929 13.7778 39.9165 12.4167 38.5554C11.0556 37.1943 9.97917 35.604 9.1875 33.7846C8.39583 31.9651 8 30.0276 8 27.9721C8 25.9165 8.39583 23.979 9.1875 22.1596C9.97917 20.3401 11.0556 18.7499 12.4167 17.3888C13.7778 16.0276 15.3681 14.9513 17.1875 14.1596C19.0069 13.3679 20.9444 12.9721 23 12.9721C24.8147 12.9721 26.5324 13.2731 28.1529 13.875C29.7732 14.4769 31.2407 15.3242 32.5554 16.4167L34.75 14.2221L36.6946 16.1667L34.5 18.3612C35.5186 19.5649 36.3565 20.9583 37.0138 22.5417C37.6713 24.125 38 25.9351 38 27.9721C38 30.0276 37.6042 31.9651 36.8125 33.7846C36.0208 35.604 34.9444 37.1943 33.5833 38.5554C32.2222 39.9165 30.6319 40.9929 28.8125 41.7846C26.9931 42.5763 25.0556 42.9721 23 42.9721C20.9444 42.9721 19.0069 42.5763 17.1875 41.7846ZM31.6529 36.625C34.0324 34.2453 35.2221 31.361 35.2221 27.9721C35.2221 24.5832 34.0324 21.699 31.6529 19.3196C29.2732 16.9399 26.3889 15.75 23 15.75C19.6111 15.75 16.7268 16.9399 14.3471 19.3196C11.9676 21.699 10.7779 24.5832 10.7779 27.9721C10.7779 31.361 11.9676 34.2453 14.3471 36.625C16.7268 39.0047 19.6111 40.1946 23 40.1946C26.3889 40.1946 29.2732 39.0047 31.6529 36.625Z"
        fill="url(#inicia-grad-d)"
      />
      <defs>{DESK_INICIA_GRAD}</defs>
    </svg>
  );
}
// Plus (SVG 56×56) — "+" con gradiente lila, render 40×40
function DeskPlusIcon(): JSX.Element {
  return (
    <svg width="34" height="34" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path
        d="M26.6113 43V29.3888H13V26.6112H26.6113V13H29.3888V26.6112H43V29.3888H29.3888V43H26.6113Z"
        fill="url(#inicia-grad-d)"
      />
      <defs>{DESK_INICIA_GRAD}</defs>
    </svg>
  );
}

let _stylesInjected = false;

export default function BidChat({
  className = "",
  live = false,
  phase = "idle",
  count = START_COUNT,
  shown = 0,
  prog = 40,
  bidAmount = 6559,
  bidder = "ZAE389",
  pressed = false,
  flash: liveFlash = 0,
  flashColors,
  flashMode = "bulb",
}: BidChatProps): JSX.Element {
  const [flash, setFlash] = useState(0);
  const [bidActual, setBidActual] = useState(6559);
  const [nextBid, setNextBid] = useState(7000);

  const isArrival = live && (phase === "welcome" || phase === "extended");
  const isStreaming = live && phase === "streaming";
  // Pantallas finales (procesando/tabla/actividad/reserve/improve): overlays full-panel (sin botón)
  const isFinalPhase = live && (phase === "processing" || phase === "result" || phase === "activity" || phase === "bestbid");
  const ctaAmount = bidAmount + LIVE_STEP;

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
    setNextBid((n) => n + LIVE_STEP);
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

      {/* (a) idle — contenido estático */}
      {!live ? (
        <>
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
          <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 3 }}>
            <BidProposal amount={fmtMoney(bidActual)} label="ENVIADO POR KAHTH4" flash={flash} flashColors={flashColors} flashMode={flashMode} />
          </div>
          <div className="bidchat-prog" style={{ position: "absolute", left: 0, bottom: 80, height: 22, zIndex: 5 }}>
            <ProgressBar variant="rainbow" value={40} aria-label="Tiempo de bid" />
          </div>
          <div className="bidchat-cta" style={{ position: "absolute", left: 0, right: 0, bottom: 16, display: "flex", justifyContent: "center", zIndex: 5 }}>
            <Button variant="primary" onClick={handleBid}>{fmtMoney(nextBid)}</Button>
          </div>
        </>
      ) : null}

      {/* (b) Llegada (welcome / extended) — pantallas nativas desktop */}
      {isArrival ? (
        <>
          <div className="bidchat-status">
            {phase === "welcome" ? (
              <>
                <div className="bidchat-top">¡Bienvenido al proceso en vivo!</div>
                <div className="bidchat-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="bidchat-rp">
                  Recibiendo
                  <br />
                  Participantes
                </div>
              </>
            ) : (
              <>
                <div className="bidchat-top">Recibiendo participantes</div>
                <div className="bidchat-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="bidchat-rp">Inicio extendido</div>
              </>
            )}
            <div className="bidchat-box">
              <span className="bidchat-box-label">INICIA EN:</span>
              <div className="bidchat-box-row">
                {phase === "extended" ? <DeskPlusIcon /> : <DeskClockIcon />}
                <span className="bidchat-box-time">00:00:{pad(count)}</span>
              </div>
            </div>
          </div>
          <div className="bidchat-prog" style={{ position: "absolute", left: 0, bottom: 80, height: 22, zIndex: 5 }}>
            <ProgressBar variant="white" value={100} aria-label="Tiempo de bid" />
          </div>
          <div className="bidchat-cta" style={{ position: "absolute", left: 0, right: 0, bottom: 16, display: "flex", justifyContent: "center", zIndex: 5 }}>
            <Button variant="primary">{fmtMoney(ctaAmount)}</Button>
          </div>
        </>
      ) : null}

      {/* (c) Streaming — NATIVO desktop: mismo layout que idle (lista hasta 108,
          barra en 80, botón en 16). El bid actual (glass) arriba al centro. */}
      {isStreaming ? (
        <>
          <div
            className="bidchat-stream"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 108,
              overflow: "hidden",
              padding: "16px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            {STREAM.slice(0, shown).map((m, i) => (
              <div key={i} className={`bidchat-msg bidchat-msg--${m.side === "sent" ? "sent" : "received"}`}>
                <LiveBubble m={m} />
              </div>
            ))}
          </div>

          {/* Bid actual (glass) — arriba al centro, ENCIMA de los mensajes */}
          <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 3 }}>
            <BidProposal amount={fmtMoney(bidAmount)} label={`ENVIADO POR ${bidder}`} flash={liveFlash} flashColors={flashColors} flashMode={flashMode} />
          </div>

          {/* Loading bar (rainbow) — ancho real del panel para que el % sea correcto */}
          <div className="bidchat-prog bidchat-prog--full" style={{ position: "absolute", left: 0, right: 0, bottom: 80, height: 22, zIndex: 5 }}>
            <ProgressBar variant="rainbow" value={prog} aria-label="Tiempo de bid" />
          </div>

          {/* Botón — se presiona con mi puja */}
          <div
            className={`bidchat-cta${pressed ? " bidchat-cta--pressed" : ""}`}
            style={{ position: "absolute", left: 0, right: 0, bottom: 16, display: "flex", justifyContent: "center", zIndex: 6 }}
          >
            <Button variant="primary">{fmtMoney(ctaAmount)}</Button>
          </div>
        </>
      ) : null}

      {/* (d) Procesando / Tabla / Actividad — overlays full-panel (sin botón).
          Reusa el panel de mobile (mismas pantallas), a ancho de desktop. */}
      {isFinalPhase ? (
        <MobileChatPanel
          height={BIDCHAT_HEIGHT - 3}
          width={PANEL_INNER_WIDTH}
          live
          phase={phase}
          shown={shown}
          progress={prog}
          progressVariant={phase === "result" || phase === "activity" || phase === "bestbid" ? "rainbow" : "white"}
          count={count}
          bidAmount={bidAmount}
          bidder={bidder}
          flash={liveFlash}
          flashColors={flashColors}
          flashMode={flashMode}
          reservePill={phase === "bestbid"}
        />
      ) : null}
    </div>
  );
}
