/**
 * MobileChatPanel — Sección del bloque Sala · Mobile (Voyager DS)
 * Fuente: Figma VOYAGER · Frame 1000023075 (panel glass del chat mobile)
 *
 * Presentacional: el motor de la animación vive en SalaMobile y le pasa el
 * estado por props. Renderiza:
 *   · idle      → lista estática de BidMessage + BidProposal + ProgressBar.
 *   · welcome   → "Recibiendo participantes" + dots + caja "Inicia en" (reloj).
 *   · extended  → + "Inicio extendido" + caja "Inicia en" (símbolo +).
 *   · streaming → BidMessage entrando con fade+slide horizontal (received←izq,
 *                 sent←der) y subiendo; BidProposal con el bid actual.
 */

"use client";

import type { JSX } from "react";
import ProgressBar, { type ProgressBarVariant } from "../../../components/ProgressBar";
import BidProposal from "../../../components/BidProposal";
import BidMessage from "../../../components/BidMessage";
import { STREAM, STATIC, fmtMoney, type LiveMsg, type Phase } from "../liveData";

export const MOBILECHATPANEL_WIDTH = 420;

const VMC_LOGO = <img src="/logo-preview.png" alt="VMC SUBASTAS" style={{ height: 16, width: "auto", display: "block" }} />;

function Bubble({ m }: { m: LiveMsg }): JSX.Element {
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

function ClockIcon(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="17" r="8.5" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M15 17V12.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M11 5H19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 5V8" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M15 6V24M6 15H24" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const STYLE_ID = "concorde-smchatpanel-styles";

const SMCHATPANEL_STYLES = `
.smchatpanel {
  position: relative;
  width: ${MOBILECHATPANEL_WIDTH}px;
  border-radius: 0;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: rgba(20,0,69,0.3) 0px 8px 24px -2px;
  overflow: hidden;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
.smchatpanel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  /* sin borde arriba: el panel se conecta con el header sin línea que corte */
  padding: 0 1px 1px 1px;
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.smchat__list, .smchat__stream { scrollbar-width: none; -ms-overflow-style: none; }
.smchat__list::-webkit-scrollbar, .smchat__stream::-webkit-scrollbar { width: 0; height: 0; display: none; }
.smchat__list .pbidmsg, .smchat__stream .pbidmsg { font-size: 13px; }
.smchat__list .pbidmsg--sent { align-self: flex-end; }
/* ProgressBar del panel: sin esquinas redondeadas (override del componente) */
.smchatpanel .pprogbar { border-radius: 0; }

.smchat__stream {
  position: absolute; top: 0; left: 0; right: 0; bottom: 22px;
  overflow: hidden; padding: 16px 18px;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 8px;
}
.smchat__msg { align-self: flex-start; }
.smchat__msg--received { animation: smchat-in-left 150ms cubic-bezier(0.3,0,0,1) both; }
.smchat__msg--sent { align-self: flex-end; animation: smchat-in-right 150ms cubic-bezier(0.3,0,0,1) both; }
@keyframes smchat-in-left { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
@keyframes smchat-in-right { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }

.smchat__status {
  position: absolute; inset: 0; z-index: 4;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 22px; text-align: center; padding: 24px 28px;
}
.smchat__rp {
  font-size: 30px; font-weight: 800; line-height: 1.12; letter-spacing: -0.01em;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(132,96,229,0.55)) drop-shadow(0 0 24px rgba(82,52,189,0.4));
}
.smchat__rdots { display: flex; align-items: center; gap: 12px; }
.smchat__rdots span {
  border-radius: 50%; background: #fff; box-shadow: 0 0 8px rgba(174,142,255,0.85);
  animation: smchat-dot 1.2s ease-in-out infinite both;
}
.smchat__rdots span:nth-child(1) { width: 10px; height: 10px; animation-delay: 0s; }
.smchat__rdots span:nth-child(2) { width: 12px; height: 12px; animation-delay: 0.18s; }
.smchat__rdots span:nth-child(3) { width: 8px; height: 8px; animation-delay: 0.36s; }
@keyframes smchat-dot {
  0%, 80%, 100% { opacity: 0.35; transform: scale(0.65); }
  40% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 14px rgba(174,142,255,1); }
}
.smchat__ext { font-size: 18px; font-weight: 700; color: #ffffff; }
.smchat__box {
  position: relative; box-sizing: border-box; width: 278px; max-width: 86%; border-radius: 20px;
  background: rgba(255,255,255,0.08); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
  display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 18px 24px;
}
.smchat__box::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
.smchat__box-label {
  font-size: 15px; font-weight: 700;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
}
.smchat__box-row { display: flex; align-items: center; gap: 12px; }
.smchat__box-row svg { filter: drop-shadow(0 0 6px rgba(174,142,255,0.7)); }
.smchat__box-time {
  font-size: 30px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums; text-shadow: 0 0 10px rgba(174,166,255,0.5);
}
@media (prefers-reduced-motion: reduce) {
  .smchat__msg--received, .smchat__msg--sent, .smchat__rdots span { animation: none; }
}
`;

let _stylesInjected = false;

function pad(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

export interface MobileChatPanelProps {
  height?: number;
  className?: string;
  /** Estado de la animación (controlado por SalaMobile) */
  live?: boolean;
  phase?: Phase;
  shown?: number;
  progress?: number;
  progressVariant?: ProgressBarVariant;
  count?: number;
  /** Bid actual (para BidProposal) */
  bidAmount?: number;
  bidder?: string;
  /** Contador que dispara la animación de nuevo bid en BidProposal */
  flash?: number;
  /** Colores del efecto de luz (editable) */
  flashColors?: string[];
  /** Tipo de efecto de luz: "bulb" o "spin" */
  flashMode?: "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
}

export default function MobileChatPanel({
  height = 670,
  className = "",
  live = false,
  phase = "idle",
  shown = 0,
  progress = 40,
  progressVariant = "rainbow",
  count = 3,
  bidAmount = 6559,
  bidder = "ZAE389",
  flash = 0,
  flashColors,
  flashMode = "bulb",
}: MobileChatPanelProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = SMCHATPANEL_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const showStatus = live && (phase === "welcome" || phase === "extended");
  const showStream = live && phase === "streaming";
  const showStatic = !live;
  const showProposal = showStatic || showStream;

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SMCHATPANEL_STYLES }} />
      <div className={`smchatpanel ${className}`.trim()} style={{ height }}>
        {/* idle: lista estática */}
        {showStatic ? (
          <div
            className="smchat__list"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 22,
              overflowY: "auto",
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            {STATIC.map((m, i) => (
              <span key={i} style={{ display: "contents" }}>
                <Bubble m={m} />
              </span>
            ))}
          </div>
        ) : null}

        {/* streaming: mensajes entrando (slide horizontal + suben) */}
        {showStream ? (
          <div className="smchat__stream">
            {STREAM.slice(0, shown).map((m, i) => (
              <div key={i} className={`smchat__msg smchat__msg--${m.side === "sent" ? "sent" : "received"}`}>
                <Bubble m={m} />
              </div>
            ))}
          </div>
        ) : null}

        {/* status: recibiendo participantes / inicio extendido */}
        {showStatus ? (
          <div className="smchat__status">
            <div className="smchat__rp">
              Recibiendo
              <br />
              participantes
            </div>
            <div className="smchat__rdots">
              <span />
              <span />
              <span />
            </div>
            {phase === "extended" ? <div className="smchat__ext">Inicio extendido</div> : null}
            <div className="smchat__box">
              <span className="smchat__box-label">Inicia en:</span>
              <div className="smchat__box-row">
                {phase === "extended" ? <PlusIcon /> : <ClockIcon />}
                <span className="smchat__box-time">00:00:{pad(count)}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Bid actual (glass) — arriba al centro, en idle y streaming */}
        {showProposal ? (
          <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 3 }}>
            <BidProposal amount={fmtMoney(bidAmount)} label={`ENVIADO POR ${bidder}`} flash={flash} flashColors={flashColors} flashMode={flashMode} />
          </div>
        ) : null}

        {/* ProgressBar pegada al fondo */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 5 }}>
          <ProgressBar variant={progressVariant} value={progress} aria-label="Tiempo de bid" />
        </div>
      </div>
    </>
  );
}
