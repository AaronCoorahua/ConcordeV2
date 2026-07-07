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

import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties, JSX } from "react";
import ProgressBar, { type ProgressBarVariant } from "../../../components/ProgressBar";
import BidProposal from "../../../components/BidProposal";
import BidMessage from "../../../components/BidMessage";
import { STREAM, STATIC, STANDINGS, fmtMoney, IMPROVE_PLACEHOLDER, BESTBID_SECONDS, type LiveMsg, type Phase } from "../liveData";

export const MOBILECHATPANEL_WIDTH = 420;

/** CSSProperties + custom property --cta-reserve (espacio reservado al CTA). */
type CSSPropertiesWithVars = CSSProperties & { "--cta-reserve"?: string };

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

// Reloj — paths exactos del SVG "reloj.svg" (círculo + manecillas). Glow por CSS.
function ClockBigIcon(): JSX.Element {
  return (
    <svg width="72" height="72" viewBox="53 53 64 64" fill="none" aria-hidden="true">
      <path
        d="M85 53C67.3552 53 53 67.3552 53 85C53 102.645 67.3552 117 85 117C102.645 117 117 102.645 117 85C117 67.3552 102.645 53 85 53ZM87.1029 112.715V108.436C87.1029 107.275 86.1614 106.334 85 106.334C83.8386 106.334 82.8971 107.275 82.8971 108.436V112.715C69.2442 111.689 58.3111 100.756 57.2849 87.1029H61.5636C62.7249 87.1029 63.6665 86.1614 63.6665 85C63.6665 83.8386 62.7249 82.8971 61.5636 82.8971H57.2849C58.3111 69.2442 69.2442 58.3111 82.8971 57.2849V61.5636C82.8971 62.7249 83.8386 63.6665 85 63.6665C86.1614 63.6665 87.1029 62.7249 87.1029 61.5636V57.2849C100.756 58.3111 111.689 69.2442 112.715 82.8971H108.436C107.275 82.8971 106.334 83.8386 106.334 85C106.334 86.1614 107.275 87.1029 108.436 87.1029H112.715C111.689 100.756 100.756 111.689 87.1029 112.715Z"
        fill="white"
      />
      <path
        d="M98.5871 82.8971H86.8375L77.3644 68.1611C76.736 67.1839 75.435 66.9016 74.4581 67.5294C73.4813 68.1575 73.1984 69.4584 73.8264 70.4356L83.9204 86.1373C83.9235 86.142 83.9274 86.146 83.9305 86.151C83.9753 86.2194 84.0235 86.2853 84.0757 86.3478C84.0889 86.3638 84.1035 86.3778 84.1175 86.3935C84.1567 86.4376 84.1971 86.4805 84.2397 86.5211C84.2622 86.5424 84.2849 86.5629 84.3079 86.5831C84.3471 86.6173 84.3878 86.6498 84.4293 86.6809C84.4514 86.6975 84.4727 86.7149 84.4952 86.7303C84.5588 86.7743 84.6244 86.8155 84.6928 86.8523C84.7018 86.857 84.7113 86.8609 84.7206 86.8657C84.7826 86.898 84.8459 86.9268 84.9113 86.9529C84.9312 86.9608 84.9516 86.9678 84.9718 86.9751C85.0276 86.9952 85.0843 87.0132 85.1423 87.0289C85.1647 87.0348 85.1869 87.0407 85.2093 87.046C85.2673 87.0597 85.3262 87.0701 85.3857 87.0788C85.4073 87.0819 85.4283 87.0861 85.4499 87.0886C85.5239 87.097 85.5988 87.1018 85.6747 87.1024C85.6804 87.1024 85.6857 87.1032 85.691 87.1032C85.6921 87.1032 85.6935 87.1029 85.6949 87.1029H98.5868C99.7482 87.1029 100.69 86.1614 100.69 85C100.69 83.8387 99.7485 82.8971 98.5871 82.8971Z"
        fill="white"
      />
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
  position: absolute; top: 0; left: 0; right: 0; bottom: var(--cta-reserve, 108px);
  overflow: hidden; padding: 16px 18px;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 8px;
  transition: bottom 260ms cubic-bezier(0.3,0,0,1);
}
.smchat__msg { align-self: flex-start; }
.smchat__msg--received { animation: smchat-in-left 150ms cubic-bezier(0.3,0,0,1) both; }
.smchat__msg--sent { align-self: flex-end; animation: smchat-in-right 150ms cubic-bezier(0.3,0,0,1) both; }
@keyframes smchat-in-left { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
@keyframes smchat-in-right { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }

.smchat__status {
  position: absolute; top: 0; left: 0; right: 0; bottom: var(--cta-reserve, 108px); z-index: 4;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 22px; text-align: center; padding: 24px 28px;
  transition: bottom 260ms cubic-bezier(0.3,0,0,1);
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

/* ── Pantalla "Revisa tu historial / 48 horas" (sin precio reserva) ── */
.smchat__reserve {
  display: flex; flex-direction: column; align-items: center; gap: 22px; width: 100%;
}
/* Reloj — glow lila/morado como el resto de íconos */
.smchat__reserve-icon {
  display: flex;
  filter:
    drop-shadow(0 0 4px rgba(174,167,255,0.7))
    drop-shadow(0 0 8px rgba(107,85,223,0.6))
    drop-shadow(0 0 16px rgba(49,0,186,0.4));
}
.smchat__reserve-copy {
  display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center;
}
/* Líneas superior/inferior — blanco 16/600 */
.smchat__reserve-line { font-size: 16px; font-weight: 600; line-height: 1.35; color: #ffffff; }
/* Desktop (panel angosto): reduce para que "Revisa tu historial de participación"
   quepa en una línea → el bloque superior queda en 2 filas exactas. */
.smchatpanel--narrow .smchat__reserve-line { font-size: 14px; white-space: nowrap; }
/* "48 horas" — gradiente lila VYStrokes3 (#CFBAFF→#fff→#AE8EFF→#CFBAFF) +
   drop shadow lila (#AEA7FF 70%, blur 7.11). ExtraBold grande. */
.smchat__reserve-hours {
  font-size: 34px; font-weight: 800; line-height: 1.1; letter-spacing: -0.01em;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 7.11px rgba(174,167,255,0.7));
}
/* Texto "Recuerda que…" — arriba de la barra, igual que .smchat__next */
.smchat__reserve-note {
  position: absolute; left: 50%; bottom: 102px; z-index: 5;
  transform: translateX(-50%);
  box-sizing: border-box; width: 336px; max-width: 86%; padding-bottom: 12px;
  text-align: center; font-size: 12px; font-weight: 400; line-height: 1.35;
  color: rgba(255,255,255,0.9);
}
/* Desktop (panel angosto): reduce fuente y ensancha para que las 3 filas del
   <br/> ("…necesarias para que tu propuesta sea aceptada por el…") no se re-partan. */
.smchatpanel--narrow .smchat__reserve-note { font-size: 10px; width: 300px; max-width: 100%; }
/* ── Pantalla "Ingresa un monto superior" (improve) ── */
.smchat__improve {
  display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%;
  padding: 0 20px; box-sizing: border-box;
}
/* Título — VYheading-xl (20/28, ExtraBold) gradiente lila VYStrokes3 + glow morado */
.smchat__improve-title {
  font-size: 20px; font-weight: 800; line-height: 28px; text-align: center;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 53.31px rgba(49,0,138,0.4)) drop-shadow(0 0 31.98px rgba(82,52,188,0.5));
}
/* Input glass 278×72 — glass white 8% + borde gradiente VYStrokes1 (white→#F4AC59→
   #8460E5→white) radio 20, background blur, drop-shadow #140045 30%. */
.smchat__improve-input {
  position: relative; box-sizing: border-box;
  width: 278px; max-width: 100%; height: 72px; border-radius: 20px;
  background: rgba(255,255,255,0.08);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: rgba(20,0,69,0.3) 0 8px 24px -2px;
  display: flex; align-items: center; justify-content: flex-start; gap: 32px;
  padding: 0 22px 0 30px;
}
.smchat__improve-input::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
  background: linear-gradient(135deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
/* Prefijo "US$" — pegado a la izquierda, blanco sólido, ExtraBold */
.smchat__improve-cur {
  font-size: 36px; font-weight: 800; color: #ffffff; letter-spacing: 0.01em;
  flex-shrink: 0;
}
/* Campo editable — ocupa el resto a la derecha del "US$" (como en Figma).
   Transparente, ExtraBold. */
.smchat__improve-field {
  min-width: 0; flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: 36px; font-weight: 800; letter-spacing: 0.01em;
  color: #ffffff; font-variant-numeric: tabular-nums; text-align: left;
}
.smchat__improve-field::placeholder { color: rgba(255,255,255,0.4); font-weight: 800; }
/* Panel angosto (desktop 313px): el contenedor pierde padding lateral y el input
   ocupa TODO el ancho disponible; el contenido se reduce para no cortarse. */
.smchatpanel--narrow .smchat__improve,
.smchatpanel--narrow .smchat__best { padding: 0 8px; }
.smchatpanel--narrow .smchat__improve-input { width: 100%; max-width: 100%; gap: 16px; padding: 0 16px 0 18px; }
.smchatpanel--narrow .smchat__improve-cur,
.smchatpanel--narrow .smchat__improve-field { font-size: 28px; }
/* Botones — el primary reusa .pvbtn (width 200). "Volver" texto subrayado que
   pasa a primary. */
.smchat__improve-actions { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.smchat__improve-actions .pvbtn { width: 200px; padding: 0; }
/* "Volver" — texto subrayado (se vuelve primary con .pvbtn width auto) */
.smchat__improve-back {
  width: 50px; height: 28px; padding: 0; border: none; background: transparent;
  cursor: pointer; font-family: inherit; font-size: 16px; font-weight: 600;
  color: #ffffff; text-decoration: underline; text-underline-offset: 3px;
}
/* Texto explicativo — arriba de la barra, igual que .smchat__reserve-note.
   En MOBILE (ancho) los <span> son renglones fijos (nowrap) = saltos del Figma.
   En DESKTOP (angosto) el texto FLUYE (los <span> se vuelven inline) y parte solo. */
.smchat__improve-note {
  position: absolute; left: 50%; bottom: 102px; z-index: 5;
  transform: translateX(-50%);
  box-sizing: border-box; width: 348px; max-width: 96%; padding-bottom: 12px;
  text-align: center; font-size: 11.5px; font-weight: 400; line-height: 1.5;
  color: rgba(255,255,255,0.9);
}
/* Mobile: cada renglón entero (los saltos del Figma). */
.smchat__improve-note span { display: block; white-space: nowrap; }
/* Desktop (panel angosto ~276px): el texto fluye libre en varias líneas. Los
   <span> pasan a inline (con espacio) y el contenedor angosto define el wrap. */
.smchatpanel--narrow .smchat__improve-note { font-size: 10px; width: 276px; max-width: 100%; }
.smchatpanel--narrow .smchat__improve-note span { display: inline; white-space: normal; }
.smchatpanel--narrow .smchat__improve-note span::after { content: " "; }

/* ── Pantalla "Mejor postor / ¿Deseas mejorarlo?" (bestbid) ── */
.smchat__best {
  display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%;
  padding: 0 20px; box-sizing: border-box;
}
/* Texto superior (3 líneas) — blanco 18/700; el user en línea 1 */
.smchat__best-top {
  font-size: 18px; font-weight: 700; line-height: 1.35; text-align: center; color: #ffffff;
}
/* SOLO "Mejor postor de la Oferta" con degradado lila VYStrokes3 + glow */
.smchat__best-hl {
  display: inline-block; white-space: nowrap;
  font-size: 20px; font-weight: 800; line-height: 1.4;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(132,96,229,0.55));
}
/* Desktop (panel angosto): reduce el texto superior para que las 3 líneas quepan
   (en especial "Mejor postor de la Oferta" en una sola línea). */
.smchatpanel--narrow .smchat__best-top { font-size: 16px; }
.smchatpanel--narrow .smchat__best-hl { font-size: 17px; }
/* Display del monto — mismo glass que el input pero no editable, centrado */
.smchat__best-amount { justify-content: center; gap: 20px; padding: 0 24px; }
.smchatpanel--narrow .smchat__best-amount { gap: 14px; padding: 0 16px; }
.smchat__best-value { flex: 0 0 auto; }
/* Texto medio (2 líneas) — blanco tenue */
.smchat__best-sub {
  font-size: 13px; font-weight: 400; line-height: 1.35; text-align: center;
  color: rgba(255,255,255,0.85);
}
/* Desktop: cada renglón del texto medio entero (los saltos del Figma) */
.smchatpanel--narrow .smchat__best-sub { font-size: 12px; white-space: nowrap; }
/* "¿Deseas mejorarlo?" — degradado lila + glow */
.smchat__best-ask {
  font-size: 18px; font-weight: 800; line-height: 1.2;
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(132,96,229,0.55));
}
/* Timer sobre la barra — texto + contador naranja */
.smchat__best-timer {
  position: absolute; left: 50%; bottom: 100px; z-index: 5;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 8px; white-space: nowrap;
  font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.9);
}
.smchat__best-count {
  font-size: 16px; font-weight: 800; color: #ED8936; font-variant-numeric: tabular-nums;
  text-shadow: 0 0 8px rgba(237,137,54,0.5);
}
.smchatpanel--narrow .smchat__best-timer { font-size: 10px; gap: 6px; }
.smchatpanel--narrow .smchat__best-count { font-size: 13px; }

/* ── Pantalla "Confirmar monto" (sub-vista de improve) ── */
.smchat__confirm {
  display: flex; flex-direction: column; align-items: center; gap: 26px; width: 100%;
  padding: 0 20px; box-sizing: border-box;
}
/* Pregunta — 2 líneas, blanco 18/700. El user en bold (ya blanco). */
.smchat__confirm-ask {
  font-size: 18px; font-weight: 700; line-height: 1.4; text-align: center; color: #ffffff;
}
.smchat__confirm-ask b { font-weight: 800; }
/* SOLO "el monto a US$XX?" con degradado lila VYStrokes3 + glow morado */
.smchat__confirm-amount {
  background: linear-gradient(135deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(132,96,229,0.55));
}
.smchat__confirm-actions { display: flex; flex-direction: column; align-items: center; gap: 12px; }

/* Botón glass "Confirmar monto" 196×48 — glass burbuja + borde gradiente VYStrokes1
   + inner shadow blanco (0 1 6 #fff 45%). Animación "gambler" en hover/press. */
.smchat__confirm-btn {
  position: relative; box-sizing: border-box;
  min-width: 196px; max-width: 100%; height: 48px; padding: 0 28px; border: none; border-radius: 9999px;
  cursor: pointer; overflow: hidden; isolation: isolate; white-space: nowrap;
  font-family: inherit; font-size: 16px; font-weight: 700; color: #ffffff;
  /* Glass burbuja: highlight superior + base translúcida */
  background:
    radial-gradient(120% 80% at 30% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%),
    linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.03) 100%);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  /* Inner shadow blanco (Figma 0 1 6 #fff 45%) + leve sombra externa */
  box-shadow: inset 0 1px 6px rgba(255,255,255,0.45), 0 4px 14px -4px rgba(20,0,69,0.5);
  transition: transform 0.18s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.25s;
}
/* Borde gradiente VYStrokes1 (white→#F4AC59→#8460E5→white) 1.5px */
.smchat__confirm-btn::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
  background: linear-gradient(135deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; z-index: 2;
}
/* Shimmer diagonal "gambler" — banda de luz que recorre el botón. En default está
   FUERA a la izquierda (translateX -220%); solo entra en hover. */
.smchat__confirm-btn::after {
  content: ""; position: absolute; top: 0; bottom: 0; left: 0;
  width: 55%; z-index: 1; pointer-events: none;
  background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
  transform: translateX(-220%) skewX(-18deg);
}
.smchat__confirm-btn-label { position: relative; z-index: 3; text-shadow: 0 1px 3px rgba(0,0,0,0.28); }
/* Panel angosto (desktop): fuente/padding menores para que el texto largo
   ("Sí, quiero mejorar el monto") entre en UNA línea. */
.smchatpanel--narrow .smchat__confirm-btn { font-size: 14px; padding: 0 18px; min-width: 0; }
/* Hover: la banda recorre + glow morado pulsante + leve levantada */
.smchat__confirm-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    inset 0 1px 6px rgba(255,255,255,0.55),
    0 0 18px rgba(174,142,255,0.55),
    0 8px 22px -6px rgba(132,96,229,0.6);
  animation: gambler-glow 1.1s ease-in-out infinite;
}
.smchat__confirm-btn:hover::after { animation: gambler-sweep 1.1s ease-in-out infinite; }
/* Press: "punch" — se hunde y destella */
.smchat__confirm-btn:active {
  transform: scale(0.95) translateY(1px);
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.25), inset 0 0 12px rgba(255,255,255,0.5);
  animation: none;
}
.smchat__confirm-btn:active::after {
  left: 0; width: 100%; transform: translateX(0) skewX(0deg);
  background: radial-gradient(60% 100% at 50% 50%, rgba(255,255,255,0.7) 0%, transparent 70%);
  animation: none;
}
.smchat__confirm-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 5px rgba(132,96,229,0.9);
}
/* Disabled — glass apagado (gris), sin burbuja ni gambler (Button primary disabled) */
.smchat__confirm-btn:disabled {
  cursor: not-allowed;
  background: var(--vmc-color-background-disabled, #e1e3e2);
  color: var(--vmc-color-neutral-700, #99a1af);
  box-shadow: none;
  -webkit-backdrop-filter: none; backdrop-filter: none;
  transform: none; animation: none;
}
.smchat__confirm-btn:disabled::before { background: transparent; }
.smchat__confirm-btn:disabled::after { display: none; }
.smchat__confirm-btn:disabled .smchat__confirm-btn-label { text-shadow: none; }
@keyframes gambler-sweep {
  0% { transform: translateX(-220%) skewX(-18deg); }
  60%, 100% { transform: translateX(400%) skewX(-18deg); }
}
@keyframes gambler-glow {
  0%, 100% { box-shadow: inset 0 1px 6px rgba(255,255,255,0.55), 0 0 14px rgba(174,142,255,0.4), 0 8px 22px -6px rgba(132,96,229,0.55); }
  50% { box-shadow: inset 0 1px 6px rgba(255,255,255,0.6), 0 0 26px rgba(207,186,255,0.75), 0 10px 26px -6px rgba(132,96,229,0.7); }
}
@media (prefers-reduced-motion: reduce) {
  .smchat__confirm-btn:hover, .smchat__confirm-btn:hover::after { animation: none; }
}

/* Pill "Con Precio Reserva" (VYSecondaryHover) dentro del panel (desktop) —
   pegado arriba, centrado, esquinas inferiores 16px. Gradiente #AE8EFF→#5A35C2 +
   sombra card (0 0 16 spread 4, #000 10%). Sin glow morado. */
.smchat__reserve-pill {
  position: absolute; top: 0; left: 50%; z-index: 6;
  transform: translateX(-50%);
  box-sizing: border-box; height: 33px; padding: 0 22px;
  border-radius: 0 0 16px 16px;
  display: flex; align-items: center; justify-content: center; white-space: nowrap;
  font-size: 15px; font-weight: 600; color: #ffffff;
  background: linear-gradient(155deg, #5A35C2 0%, #AE8EFF 100%);
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
  /** Muestra el pill "Con Precio Reserva" pegado arriba del panel (solo desktop:
      en mobile el pill lo pone MobileHeader). Se ve en la fase "reserve". */
  reservePill?: boolean;
  /** Espacio (px) reservado al pie del panel para el CTA flotante (stream/status
      terminan ahí, el ProgressBar vive 28px arriba de ese borde). Default 108. */
  ctaReserve?: number;
  /** Oculta y colapsa el ProgressBar (variante overlay: el CTA grande domina la
      pantalla sin barra visible hasta que el usuario puja). */
  hideProgress?: boolean;
  /** Reemplaza la lista estática (idle) por esta secuencia — usado por la
      variante "Full Botón": crece con cada puja (mensaje + "Cierra en" +
      remate "A la una/dos/tres") en vez de mostrar STATIC fija. */
  staticMessages?: LiveMsg[];
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
  reservePill = false,
  ctaReserve = 108,
  hideProgress = false,
  staticMessages,
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

  // Sub-flujo con precio reserva. La fase del motor entra en "bestbid"; a partir de
  // ahí el panel navega localmente entre estos pasos (interacciones del usuario):
  //   bestbid  → "Mejor postor / ¿Deseas mejorarlo?" (+ countdown 23s)
  //   improve  → "Ingresa un monto superior" (input)
  //   confirm  → "¿estás seguro de mejorar el monto a US$XX?"
  //   reserve  → "Revisa tu historial / 48 horas" (fin)
  type Step = "bestbid" | "improve" | "confirm" | "reserve";
  const [step, setStep] = useState<Step>("bestbid");
  const [improveAmount, setImproveAmount] = useState("");
  const [countdown, setCountdown] = useState(BESTBID_SECONDS);
  const improveDigits = improveAmount.replace(/\D/g, "");
  const improveValid = improveDigits.length > 0 && Number(improveDigits) > bidAmount;
  function handleImproveInput(e: ChangeEvent<HTMLInputElement>): void {
    setImproveAmount(e.target.value.replace(/\D/g, ""));
  }
  const improveShown = improveDigits ? Number(improveDigits).toLocaleString("en-US") : "";

  // Al (re)entrar a la fase "bestbid" del motor, reinicia el sub-flujo desde el paso 1.
  useEffect(
    function resetOnEnter() {
      if (phase === "bestbid") {
        setStep("bestbid");
        setImproveAmount("");
        setCountdown(BESTBID_SECONDS);
      }
    },
    [phase],
  );

  // Countdown de "¿Deseas mejorarlo?": corre solo en el paso "bestbid". Al llegar a
  // 0 pasa a "48 horas" (reserve). Se pausa/cancela si el usuario navega a otro paso.
  const inBestbid = live && phase === "bestbid" && step === "bestbid";
  useEffect(
    function runCountdown() {
      if (!inBestbid) return;
      if (countdown <= 0) {
        setStep("reserve");
        return;
      }
      const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    },
    [inBestbid, countdown],
  );

  const showStatus = live && (phase === "welcome" || phase === "extended");
  const showStream = live && phase === "streaming";
  const showProcessing = live && phase === "processing";
  const showResult = live && phase === "result"; // Tabla de posiciones (podio)
  const showActivity = live && phase === "activity"; // BidProposal ganador + email
  // Fase "bestbid" del motor → sub-flujo local (bestbid/improve/confirm/reserve)
  const inReserveFlow = live && phase === "bestbid";
  const showBestbid = inReserveFlow && step === "bestbid"; // "Mejor postor / ¿Deseas mejorarlo?"
  const showImprove = inReserveFlow && step === "improve"; // "Ingresa un monto superior"
  const showConfirm = inReserveFlow && step === "confirm"; // "¿estás seguro de mejorar…?"
  const showReserve = inReserveFlow && step === "reserve"; // "Revisa tu historial / 48 horas"
  const isActivity = showActivity;
  const showStatic = !live;
  const showProposal = showStatic || showStream;
  // Barra del countdown en "bestbid": baja de 100% (23s) a 0% (0s).
  const bestbidProg = (countdown / BESTBID_SECONDS) * 100;

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SMCHATPANEL_STYLES }} />
      <div
        className={`smchatpanel${width < MOBILECHATPANEL_WIDTH ? " smchatpanel--narrow" : ""} ${className}`.trim()}
        style={{ height, width, "--cta-reserve": `${ctaReserve}px` } as CSSPropertiesWithVars}
      >
        {/* idle: lista estática (o dinámica — variante "Full Botón" via staticMessages) */}
        {showStatic ? (
          <div
            className="smchat__list"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: "var(--cta-reserve, 108px)",
              overflowY: "auto",
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              gap: 8,
              transition: "bottom 260ms cubic-bezier(0.3,0,0,1)",
            }}
          >
            {(staticMessages ?? STATIC).map((m, i) => (
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

        {/* Sin precio reserva — reloj + "Revisa tu historial / 48 horas". El reloj y
            el copy van centrados; la nota "Recuerda…" va sobre la barra. */}
        {showReserve ? (
          <>
            {/* Pill "Con Precio Reserva" pegado arriba (solo desktop; en mobile lo
                pone MobileHeader colgando bajo el header) */}
            {reservePill ? <span className="smchat__reserve-pill">Con Precio Reserva</span> : null}
            <div className="smchat__status">
              <div className="smchat__reserve">
                <span className="smchat__reserve-icon">
                  <ClockBigIcon />
                </span>
                <div className="smchat__reserve-copy">
                  <span className="smchat__reserve-line">
                    Revisa tu historial de participación
                    <br />
                    en las próximas
                  </span>
                  <span className="smchat__reserve-hours">48 horas</span>
                  <span className="smchat__reserve-line">para ver el estado del proceso</span>
                </div>
              </div>
            </div>
            <div className="smchat__reserve-note">
              Recuerda que estaremos realizando las gestiones
              <br />
              necesarias para que tu propuesta sea aceptada por el
              <br />
              vendedor
            </div>
          </>
        ) : null}

        {/* Mejor postor / ¿Deseas mejorarlo? — resultado + display del monto +
            "Sí, quiero mejorar el monto" (→ ingresar monto) / "Omitir" (→ 48 horas).
            Abajo: countdown (barra baja); al llegar a 0 → 48 horas. */}
        {showBestbid ? (
          <>
            {reservePill ? <span className="smchat__reserve-pill">Con Precio Reserva</span> : null}
            <div className="smchat__status">
              <div className="smchat__best">
                <div className="smchat__best-top">
                  Estimado(a) {STANDINGS[0].user} eres el
                  <br />
                  <span className="smchat__best-hl">Mejor postor de la Oferta</span>
                  <br />
                  Con una propuesta de
                </div>
                <div className="smchat__improve-input smchat__best-amount">
                  <span className="smchat__improve-cur">US$</span>
                  <span className="smchat__improve-field smchat__best-value">{fmtMoney(bidAmount).replace("US$ ", "")}</span>
                </div>
                <div className="smchat__best-sub">
                  Es probable que el monto con el que ganaste
                  <br />
                  sea rechazado
                </div>
                <div className="smchat__best-ask">¿Deseas mejorarlo?</div>
                <div className="smchat__improve-actions">
                  <button type="button" className="smchat__confirm-btn" onClick={() => setStep("improve")}>
                    <span className="smchat__confirm-btn-label">Sí, quiero mejorar el monto</span>
                  </button>
                  <button type="button" className="smchat__improve-back" onClick={() => setStep("reserve")}>
                    Omitir
                  </button>
                </div>
              </div>
            </div>
            <div className="smchat__best-timer">
              <span>Te queda poco tiempo. ¡Mejora el monto ahora!</span>
              <span className="smchat__best-count">{countdown}</span>
            </div>
          </>
        ) : null}

        {/* Ingresa un monto superior — input glass + "Sí, mejorar el monto"
            (disabled hasta que el monto supere al ganador) + "Volver" (subrayado). */}
        {showImprove ? (
          <>
            {reservePill ? <span className="smchat__reserve-pill">Con Precio Reserva</span> : null}
            <div className="smchat__status">
              <div className="smchat__improve">
                <div className="smchat__improve-title">Ingresa un monto superior</div>
                <label className="smchat__improve-input">
                  <span className="smchat__improve-cur">US$</span>
                  <input
                    className="smchat__improve-field"
                    inputMode="numeric"
                    value={improveShown}
                    onChange={handleImproveInput}
                    placeholder={IMPROVE_PLACEHOLDER.toLocaleString("en-US")}
                    aria-label="Nuevo monto"
                  />
                </label>
                <div className="smchat__improve-actions">
                  <button
                    type="button"
                    className="smchat__confirm-btn"
                    disabled={!improveValid}
                    onClick={() => setStep("confirm")}
                  >
                    <span className="smchat__confirm-btn-label">Sí, mejorar el monto</span>
                  </button>
                  <button type="button" className="smchat__improve-back" onClick={() => setStep("bestbid")}>
                    Volver
                  </button>
                </div>
              </div>
            </div>
            <div className="smchat__improve-note">
              <span>El proceso terminó con Precio Reserva y pasará a consulta con el</span>
              <span>vendedor. Aumentarás las probabilidades de que tu</span>
              <span>propuesta sea aceptada si la mejoras</span>
            </div>
          </>
        ) : null}

        {/* Confirmar monto — "¿Estimado(a) {user} estás seguro de mejorar el monto
            a US$XX?" + botón glass (efecto burbuja + gambler) + "Volver". */}
        {showConfirm ? (
          <>
            {reservePill ? <span className="smchat__reserve-pill">Con Precio Reserva</span> : null}
            <div className="smchat__status">
              <div className="smchat__confirm">
                <div className="smchat__confirm-ask">
                  ¿Estimado(a) <b>{STANDINGS[0].user}</b> estás seguro de mejorar
                  <br />
                  <span className="smchat__confirm-amount">el monto a US${improveShown}?</span>
                </div>
                <div className="smchat__confirm-actions">
                  <button type="button" className="smchat__confirm-btn" onClick={() => setStep("reserve")}>
                    <span className="smchat__confirm-btn-label">Confirmar monto</span>
                  </button>
                  <button type="button" className="smchat__improve-back" onClick={() => setStep("improve")}>
                    Volver
                  </button>
                </div>
              </div>
            </div>
            <div className="smchat__improve-note smchat__confirm-note">
              <span>Recuerda que si mejoras tu propuesta aumentan las</span>
              <span>probabilidades de ser aceptado. Estaremos realizando las</span>
              <span>gestiones necesarias para que sea aceptado por el</span>
              <span>vendedor.</span>
            </div>
          </>
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

        {/* ProgressBar — vive 28px arriba del borde de la zona reservada al CTA
            (--cta-reserve, default 108px → bottom 80px). En result/activity/
            reserve/improve/confirm 100% (llena); en bestbid baja con el countdown;
            en processing 0% (vacía). Oculto cuando hideProgress=true (variante overlay). */}
        <div
          className="smchat__progress-wrap"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "calc(var(--cta-reserve, 108px) - 28px)",
            zIndex: 5,
            opacity: hideProgress ? 0 : 1,
            transform: hideProgress ? "translateY(8px) scale(0.98)" : "translateY(0) scale(1)",
            transition: "bottom 260ms cubic-bezier(0.3,0,0,1), opacity 260ms ease, transform 260ms cubic-bezier(0.3,0,0,1)",
            pointerEvents: hideProgress ? "none" : undefined,
          }}
        >
          <ProgressBar
            variant={progressVariant}
            value={showBestbid ? bestbidProg : showResult || showActivity || showReserve || showImprove || showConfirm ? 100 : showProcessing ? 0 : progress}
            transitionMs={showBestbid ? 1000 : undefined}
            aria-label="Tiempo de bid"
          />
        </div>
      </div>
    </>
  );
}
