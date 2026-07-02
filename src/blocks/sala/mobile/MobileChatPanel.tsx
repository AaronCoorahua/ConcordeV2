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
import { STREAM, STATIC, STANDINGS, fmtMoney, type LiveMsg, type Phase } from "../liveData";

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

// Gradiente lila común de los íconos INICIA EN (paths exactos de los SVG)
const INICIA_GRAD = (
  <linearGradient id="inicia-grad" x1="6" y1="-8" x2="42" y2="4" gradientUnits="userSpaceOnUse">
    <stop stopColor="#CFBAFF" />
    <stop offset="0.35" stopColor="#ffffff" />
    <stop offset="0.65" stopColor="#AE8EFF" />
    <stop offset="1" stopColor="#CFBAFF" />
  </linearGradient>
);
// Timer (SVG 46×51) — reloj con gradiente lila, render 40×40
function ClockIcon(): JSX.Element {
  return (
    <svg width="34" height="34" viewBox="0 0 46 51" fill="none" aria-hidden="true">
      <path
        d="M18 10.7779V8H28V10.7779H18ZM21.6113 29.3054H24.3888V19.5833H21.6113V29.3054ZM17.1875 41.7846C15.3681 40.9929 13.7778 39.9165 12.4167 38.5554C11.0556 37.1943 9.97917 35.604 9.1875 33.7846C8.39583 31.9651 8 30.0276 8 27.9721C8 25.9165 8.39583 23.979 9.1875 22.1596C9.97917 20.3401 11.0556 18.7499 12.4167 17.3888C13.7778 16.0276 15.3681 14.9513 17.1875 14.1596C19.0069 13.3679 20.9444 12.9721 23 12.9721C24.8147 12.9721 26.5324 13.2731 28.1529 13.875C29.7732 14.4769 31.2407 15.3242 32.5554 16.4167L34.75 14.2221L36.6946 16.1667L34.5 18.3612C35.5186 19.5649 36.3565 20.9583 37.0138 22.5417C37.6713 24.125 38 25.9351 38 27.9721C38 30.0276 37.6042 31.9651 36.8125 33.7846C36.0208 35.604 34.9444 37.1943 33.5833 38.5554C32.2222 39.9165 30.6319 40.9929 28.8125 41.7846C26.9931 42.5763 25.0556 42.9721 23 42.9721C20.9444 42.9721 19.0069 42.5763 17.1875 41.7846ZM31.6529 36.625C34.0324 34.2453 35.2221 31.361 35.2221 27.9721C35.2221 24.5832 34.0324 21.699 31.6529 19.3196C29.2732 16.9399 26.3889 15.75 23 15.75C19.6111 15.75 16.7268 16.9399 14.3471 19.3196C11.9676 21.699 10.7779 24.5832 10.7779 27.9721C10.7779 31.361 11.9676 34.2453 14.3471 36.625C16.7268 39.0047 19.6111 40.1946 23 40.1946C26.3889 40.1946 29.2732 39.0047 31.6529 36.625Z"
        fill="url(#inicia-grad)"
      />
      <defs>{INICIA_GRAD}</defs>
    </svg>
  );
}
// Plus (SVG 56×56) — "+" con gradiente lila, render 40×40
function PlusIcon(): JSX.Element {
  return (
    <svg width="34" height="34" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path
        d="M26.6113 43V29.3888H13V26.6112H26.6113V13H29.3888V26.6112H43V29.3888H29.3888V43H26.6113Z"
        fill="url(#inicia-grad)"
      />
      <defs>{INICIA_GRAD}</defs>
    </svg>
  );
}
// Estrella del podio — paths + gradientes exactos de los SVG.
//   · full=true  → relleno naranja→morado (star.svg, ganador)
//   · full=false → relleno medio: naranja abajo, transparente arriba (Posición 2)
function StarIcon({ full = true }: { full?: boolean }): JSX.Element {
  const d =
    "M3.55172 11.6155L4.78672 7.80647L1.53672 5.44047H5.55372L6.78872 1.61847L8.03672 5.44047H12.0537L8.80372 7.80647L10.0517 11.6155L6.78872 9.26247L3.55172 11.6155Z";
  const fillId = full ? "smstar-full" : "smstar-half";
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true">
      <path d={d} fill={`url(#${fillId})`} stroke="url(#smstar-stroke)" strokeWidth="1" strokeLinejoin="round" />
      <defs>
        <linearGradient id="smstar-full" x1="3.14" y1="-13.6" x2="17.62" y2="-10.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ED8936" />
          <stop offset="0.4" stopColor="#ED8936" />
          <stop offset="1" stopColor="#8460E5" />
        </linearGradient>
        {/* Vertical: naranja abajo → transparente arriba (paint4 de "Posición 2") */}
        <linearGradient id="smstar-half" x1="7" y1="13" x2="7" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ED8936" />
          <stop offset="0.48" stopColor="#ED8936" />
          <stop offset="0.52" stopColor="#FBC47D" stopOpacity="0" />
          <stop offset="1" stopColor="#FBC47D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="smstar-stroke" x1="2.92" y1="-9.98" x2="17.91" y2="-6.36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.221154" stopColor="#F4AC59" />
          <stop offset="0.745192" stopColor="#8460E5" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Bolsa de dinero ($) — paths exactos del SVG "Frame 1000023386" (glow por CSS)
function MoneyBagIcon(): JSX.Element {
  return (
    <svg width="38" height="42" viewBox="53 53 40 44" fill="none" aria-hidden="true">
      <path
        d="M63.5496 62C59.079 62 57.9613 56 62.4319 55.5C65.226 55 66.3437 57 68.579 57C70.8143 57 70.8143 54 73.0496 54C75.2849 54 75.2849 57 77.5201 57C79.7554 57 80.8731 55 83.6672 55.5C88.1378 56 87.0201 62 82.5496 62H63.5496Z"
        fill="white"
      />
      <path
        d="M80.2645 63H65.7351C64.8092 63 64.0586 63.6716 64.0586 64.5C64.0586 65.3284 64.8092 66 65.7351 66H80.2645C81.1904 66 81.9409 65.3284 81.9409 64.5C81.9409 63.6716 81.1904 63 80.2645 63Z"
        fill="white"
      />
      <path
        d="M65.7855 67.3429C59.1259 68.4667 53.0213 74.0857 54.1313 84.7619C55.2412 94.3143 61.9007 96 73 96C84.0992 96 90.7588 94.3143 91.8687 84.7619C92.9786 74.0857 86.8741 68.4667 80.2145 67.3429C75.7748 66.219 70.2252 66.219 65.7855 67.3429Z"
        fill="white"
      />
      <path d="M73 71.5V88" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M76.9136 75.9189C76.9136 72.6351 68.5312 72.6351 68.5312 75.9189C68.5312 79.5675 76.9136 79.2027 76.9136 82.8513C76.9136 86.1351 68.5312 86.1351 68.5312 82.8513"
        stroke="#8469C2"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Mano con billete ($) — paths exactos del SVG "Frame 1000023143" (glow por CSS)
function HandMoneyIcon(): JSX.Element {
  return (
    <svg width="132" height="134" viewBox="28 0 142 132" fill="none" aria-hidden="true">
      {/* dedos (filter0) */}
      <path d="M129.864 67H121.099C118.679 67 118.998 69.1662 118.998 71.8382C118.998 74.5103 118.679 76.6765 121.099 76.6765H129.864C132.284 76.6765 134.247 74.5103 134.247 71.8382C134.247 69.1662 132.284 67 129.864 67Z" fill="white" />
      <path d="M133.617 79.4412H121.096C118.676 79.4412 118.994 81.9529 118.994 84.625C118.994 87.2971 118.676 89.1176 121.096 89.1176H133.617C136.038 89.1176 138 86.9515 138 84.2794C138 81.6073 136.038 79.4412 133.617 79.4412Z" fill="white" />
      <path d="M129.861 91.8823H121.096C118.676 91.8823 118.994 94.0485 118.994 96.7206C118.994 99.3926 118.676 101.559 121.096 101.559H129.861C132.281 101.559 134.244 99.3926 134.244 96.7206C134.244 94.0485 132.281 91.8823 129.861 91.8823Z" fill="white" />
      <path d="M124.855 104.323H121.099C118.679 104.323 118.998 106.144 118.998 108.816C118.998 111.488 118.679 114 121.099 114H124.855C127.276 114 129.238 111.834 129.238 109.162C129.238 106.49 127.276 104.323 124.855 104.323Z" fill="white" />
      {/* billete (filter1) */}
      <path d="M114 54H84C82.8954 54 82 54.753 82 55.6818L83 126.318C83 127.247 82.8954 128 84 128H114C115.105 128 116 127.247 116 126.318V55.6818C116 54.753 115.105 54 114 54Z" fill="white" />
      {/* símbolo $ */}
      <path d="M104.716 102C105.787 101 106.145 99 106.145 97C106.145 93.5 104.716 91.5 102.573 91.5C99.716 91.5 99.716 101.5 96.1445 101.5C94.0017 101.5 92.5731 99.5 92.5731 96C92.5731 93.5 93.2874 91.5 94.716 90" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" />
      <path d="M109 97H89" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" />
      {/* mano/palma (filter2) */}
      <path d="M83.2727 121V89.3333C83.2727 81 88.7273 77.6667 96 77.6667H106.909C109.32 77.6667 111.632 76.7887 113.337 75.2259C115.042 73.6631 116 71.5435 116 69.3333C116 67.1232 115.042 65.0036 113.337 63.4408C111.632 61.878 109.32 61 106.909 61H79.6364C59.6364 61 56 72.6667 56 87.6667V104.333C56 117.667 63.2727 121 83.2727 121Z" fill="white" stroke="#3D10A3" strokeOpacity="0.7" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

// Sobre / email — paths exactos del SVG "Frame" (glow por CSS)
function EmailIcon(): JSX.Element {
  return (
    <svg width="52" height="45" viewBox="53 53 47 33" fill="none" aria-hidden="true">
      <path d="M97.1 55.5H55.5V83.625H97.1V55.5Z" fill="white" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55.5 55.5L76.3 72.375L97.1 55.5" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55.5 83.625L71.1 68.1562" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M97.1 83.625L81.5 68.1562" stroke="#8469C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
  position: absolute; top: 0; left: 0; right: 0; bottom: 108px;
  overflow: hidden; padding: 16px 18px;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 8px;
}
.smchat__msg { align-self: flex-start; }
.smchat__msg--received { animation: smchat-in-left 150ms cubic-bezier(0.3,0,0,1) both; }
.smchat__msg--sent { align-self: flex-end; animation: smchat-in-right 150ms cubic-bezier(0.3,0,0,1) both; }
@keyframes smchat-in-left { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
@keyframes smchat-in-right { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }

.smchat__status {
  position: absolute; top: 0; left: 0; right: 0; bottom: 108px; z-index: 4;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 22px; text-align: center; padding: 24px 28px;
}
/* Variante Actividad: el contenido arranca arriba (no centrado vertical) */
.smchat__status--top { justify-content: flex-start; padding-top: 40px; }
.smchat__rp {
  font-size: 30px; font-weight: 800; line-height: 1.12; letter-spacing: -0.01em;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(132,96,229,0.55)) drop-shadow(0 0 24px rgba(82,52,189,0.4));
}
/* Variantes de tamaño (mismo gradiente + glow) */
.smchat__rp--16 { font-size: 16px; }
.smchat__rp--20 { font-size: 20px; }
/* Bloque "Procesando" — dos líneas con tamaños distintos, poco gap */
.smchat__proc-lines { display: flex; flex-direction: column; align-items: center; gap: 4px; }
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
  position: relative; box-sizing: border-box; width: 278px; height: 78px; max-width: 86%; border-radius: 20px;
  background: rgba(255,255,255,0.08); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 24px;
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
.smchat__box-row svg {
  filter:
    drop-shadow(0 0 6px rgba(207,186,255,0.95))
    drop-shadow(0 0 14px rgba(174,167,255,0.85))
    drop-shadow(0 0 26px rgba(132,96,229,0.6));
}
.smchat__box-time {
  font-size: 30px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums; text-shadow: 0 0 10px rgba(174,166,255,0.5);
}

/* ── Tabla de posiciones: filas del podio ── */
.smchat__rows { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; }
/* ── Fila de posición — réplica de los SVG "Banner"/"Posición 2" ── */
.smchat__row {
  position: relative; box-sizing: border-box; width: 384px; max-width: 96%; height: 64px;
  display: grid; grid-template-columns: 58px minmax(0, 1fr) 96px; align-items: center;
  border-radius: 16px;
  /* Glass burbuja: fondo blanco + overlay vertical (paint3) para el brillo superior */
  background:
    linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0) 100%),
    rgba(255,255,255,0.08);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  box-shadow: rgba(20,0,69,0.3) 0px 6px 16px -2px, inset 0 1px 0 rgba(255,255,255,0.18);
}
/* Solo el GANADOR (1°) tiene borde: LIVE (naranja→morado) 2px.
   El resto (2°…) NO lleva borde — su burbuja es solo el glass. */
.smchat__row--mine::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 2px;
  background: linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
/* Col A — rango grande. Base: vault gradient (lila). */
.smchat__rank {
  display: flex; align-items: baseline; justify-content: center; gap: 1px;
  font-weight: 800;
  background: linear-gradient(120deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(174,142,255,0.5));
}
/* Ganador: tinte con naranja */
.smchat__row--mine .smchat__rank {
  background: linear-gradient(135deg, #F6C98A 0%, #CFBAFF 55%, #AE8EFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
}
.smchat__rank b { font-size: 26px; line-height: 1; }
.smchat__rank i { font-size: 13px; font-style: normal; }
/* Divisor corto (34px, fade arriba/abajo) entre columnas — paint1/paint2 del SVG */
.smchat__cell, .smchat__note {
  position: relative;
}
.smchat__cell::before, .smchat__note::before {
  content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 1.2px; height: 34px; border-radius: 0.6px;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
}
/* Col B — monto (20px) + user·estrella (11px / 400) · letra pequeña para que
   quepan bien los 2 puestos también en el panel angosto de desktop */
.smchat__cell {
  min-width: 0; align-self: stretch; padding: 0 8px 0 12px;
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 1px;
}
.smchat__amount {
  max-width: 100%; text-align: left;
  font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.01em;
  font-variant-numeric: tabular-nums; line-height: 1.2;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.smchat__user {
  display: flex; align-items: center; gap: 5px; line-height: 1.2;
  font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.75); letter-spacing: 0.02em;
}
.smchat__user svg { flex-shrink: 0; }
/* Col C — nota ("En consulta") 11px / 400 */
.smchat__note {
  align-self: stretch; padding: 0 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.9); text-align: center;
}
/* Panel angosto (desktop): el monto se corta → letra más chica y columnas ajustadas */
.smchatpanel--narrow .smchat__row { grid-template-columns: 48px minmax(0, 1fr) 84px; }
.smchatpanel--narrow .smchat__rank b { font-size: 22px; }
.smchatpanel--narrow .smchat__rank i { font-size: 11px; }
.smchatpanel--narrow .smchat__cell { padding: 0 6px 0 10px; }
.smchatpanel--narrow .smchat__amount { font-size: 16px; }
.smchatpanel--narrow .smchat__user { font-size: 10px; }
.smchatpanel--narrow .smchat__note { font-size: 10px; padding: 0 8px; }
/* Ícono bolsa + mensaje de próximas ofertas — arriba de la barra (tabla de posiciones) */
.smchat__next {
  position: absolute; left: 50%; bottom: 102px; z-index: 5;
  transform: translateX(-50%);
  box-sizing: border-box; width: 336px; max-width: 86%; padding-bottom: 12px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  text-align: center; font-size: 12px; font-weight: 400; line-height: 1.35;
  color: rgba(255,255,255,0.9);
}
.smchat__next-icon {
  display: flex;
  filter:
    drop-shadow(0 0 4px rgba(174,167,255,0.7))
    drop-shadow(0 0 8px rgba(107,85,223,0.6))
    drop-shadow(0 0 16px rgba(49,0,186,0.4));
}
/* Actividad: ícono mano$ + felicitaciones + título + "con una propuesta de" + BidProposal */
.smchat__act { display: flex; flex-direction: column; align-items: center; }
.smchat__act-icon {
  display: flex; margin-bottom: 8px;
  filter:
    drop-shadow(0 0 4px rgba(174,167,255,0.7))
    drop-shadow(0 0 8px rgba(107,85,223,0.6))
    drop-shadow(0 0 16px rgba(49,0,186,0.4));
}
/* "Felicitaciones {user} has" — VYButton16 16/600 blanco; solo el user en gradiente */
.smchat__act-congrats { font-size: 16px; font-weight: 600; line-height: 1.4; color: #ffffff; text-align: center; }
.smchat__act-user {
  background: linear-gradient(120deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
}
/* "Ganado la Oferta" — VYheading-xl: 20/28, ExtraBold, gradiente naranja→morado */
.smchat__act-title {
  font-size: 20px; font-weight: 800; line-height: 28px; text-align: center; margin-top: 6px;
  background: linear-gradient(120deg, #ED8936 0%, #ED8936 40%, #8460E5 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 53px rgba(49,0,138,0.4)) drop-shadow(0 0 32px rgba(82,52,188,0.5));
}
/* Mismo tipo de letra que "Procesando" pero blanco sólido (sin gradiente).
   Misma distancia (margin-top) que hay entre felicitaciones y "Ganado la Oferta". */
.smchat__act-label { font-size: 16px; font-weight: 600; color: #ffffff; margin-top: 6px; margin-bottom: 48px; }
/* Actividad: el caption del BidProposal ("Comisión: US$ 0") sin mayúsculas */
.pbid--activity .pbid__label { text-transform: none; letter-spacing: 0.02em; }

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
  /** Ancho del panel. Default 420 (mobile). En desktop es menor: recorta a los
      lados sin achicar el contenido (centrado + overflow:hidden). */
  width?: number;
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
  width = MOBILECHATPANEL_WIDTH,
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
  const showProcessing = live && phase === "processing";
  const showResult = live && phase === "result"; // Tabla de posiciones (podio)
  const showActivity = live && phase === "activity"; // BidProposal ganador + email
  const isActivity = showActivity;
  const showStatic = !live;
  const showProposal = showStatic || showStream;

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SMCHATPANEL_STYLES }} />
      <div className={`smchatpanel${width < MOBILECHATPANEL_WIDTH ? " smchatpanel--narrow" : ""} ${className}`.trim()} style={{ height, width }}>
        {/* idle: lista estática */}
        {showStatic ? (
          <div
            className="smchat__list"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 108,
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

        {/* Procesando · Un momento por favor — mismo look que "Recibiendo
            participantes" (título glow + dots), sin la caja "Inicia en" */}
        {showProcessing ? (
          <div className="smchat__status">
            <div className="smchat__proc-lines">
              <div className="smchat__rp smchat__rp--16">Procesando</div>
              <div className="smchat__rp smchat__rp--20">Un momento por favor</div>
            </div>
            <div className="smchat__rdots">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}

        {/* Tabla de posiciones — título + filas del podio (1° ganador, 2° …) */}
        {showResult ? (
          <div className="smchat__status">
            <div className="smchat__rp smchat__rp--20">Tabla de posiciones</div>
            <div className="smchat__rows">
              {STANDINGS.map((s) => (
                <div key={s.rank} className={`smchat__row${s.mine ? " smchat__row--mine" : ""}`}>
                  <div className="smchat__rank">
                    <b>{s.rank}</b>
                    <i>°</i>
                  </div>
                  <div className="smchat__cell">
                    <span className="smchat__amount">{fmtMoney(s.amount)}</span>
                    <span className="smchat__user">
                      {s.user}
                      <StarIcon full={s.mine} />
                    </span>
                  </div>
                  <div className="smchat__note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Actividad — SIN título: "con una propuesta de" + BidProposal ganador */}
        {showActivity ? (
          <div className="smchat__status smchat__status--top">
            <div className="smchat__act">
              <span className="smchat__act-icon">
                <HandMoneyIcon />
              </span>
              <div className="smchat__act-congrats">
                Felicitaciones <span className="smchat__act-user">{STANDINGS[0].user}</span> has
              </div>
              <div className="smchat__act-title">Ganado la Oferta</div>
              <div className="smchat__act-label">con una propuesta de</div>
              <BidProposal amount={fmtMoney(bidAmount)} label="Comisión: US$ 0" className="pbid--activity" />
            </div>
          </div>
        ) : null}

        {/* Bid actual (glass) — arriba al centro, en idle y streaming */}
        {showProposal ? (
          <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 3 }}>
            <BidProposal amount={fmtMoney(bidAmount)} label={`ENVIADO POR ${bidder}`} flash={flash} flashColors={flashColors} flashMode={flashMode} />
          </div>
        ) : null}

        {/* Arriba de la barra: ícono + mensaje. Cambian entre "result" y "activity". */}
        {showResult || showActivity ? (
          <div className="smchat__next">
            <span className="smchat__next-icon">{isActivity ? <EmailIcon /> : <MoneyBagIcon />}</span>
            {isActivity ? (
              <span>
                Revisa el estado de tu Actividad para
                <br />
                iniciar el proceso de compra
              </span>
            ) : (
              <span>
                ¡Participa en nuestras próximas ofertas y
                <br />
                recuerda que todas las semanas
                <br />
                publicamos nuevas!
              </span>
            )}
          </div>
        ) : null}

        {/* ProgressBar sobre la zona del botón (deja 80px abajo). En result/activity
            siempre 100% (rainbow llena); en processing siempre 0% (vacía). */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, zIndex: 5 }}>
          <ProgressBar
            variant={progressVariant}
            value={showResult || showActivity ? 100 : showProcessing ? 0 : progress}
            aria-label="Tiempo de bid"
          />
        </div>
      </div>
    </>
  );
}
