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

import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import MobileHeader, { MOBILEHEADER_HEIGHT } from "./MobileHeader";
import MobileChatPanel from "./MobileChatPanel";
import Button from "../../../components/Button";
import type { ProgressBarVariant } from "../../../components/ProgressBar";
import { STEP, ME, OTHERS, STATIC, fmtMoney, type LiveMsg } from "../liveData";
import { useLiveAuction } from "../useSala";

/** Variantes del CTA — experimentos para darle más protagonismo al botón. */
export type CtaVariant = "default" | "hero" | "fullbutton";

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
  /** Variante visual del CTA — "default" (full-width 60px), "hero" (XL con más
   *  espacio propio) o "fullbutton" (arranca gigante; cada puja agrega mensajes de
   *  conversación — sin remate — y solo a la 3ra puja dispara, una única vez, la
   *  secuencia real "Cierra en" + "A la una/dos/tres" con ProgressBar; tras eso el
   *  botón se queda chico y la barra llena para siempre). */
  ctaVariant?: CtaVariant;
}

// CTA primary — 3 variantes: default (full-width 60px), hero (XL más grande, con
// más espacio propio reservado en el panel — no tapa stream ni ProgressBar) y
// fullbutton (arranca gigante sin barra visible; cada puja dispara la secuencia
// real del remate y se achica mientras corre, luego vuelve a agrandarse).
// + estado "presionado" (réplica de .pvbtn:active) para las 3.
const CTA_STYLES = `
.salamobile-cta {
  transition: left 320ms cubic-bezier(0.3,0,0,1), right 320ms cubic-bezier(0.3,0,0,1),
    bottom 320ms cubic-bezier(0.3,0,0,1);
}
.salamobile-cta .pvbtn {
  display: flex; width: 100%; padding: 0;
  transition: height 320ms cubic-bezier(0.3,0,0,1), font-size 320ms cubic-bezier(0.3,0,0,1),
    box-shadow 320ms ease, transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.salamobile-cta--pressed .pvbtn {
  --vbtn-angle: 135deg;
  --vbtn-stop-a: #d46e20;
  --vbtn-stop-b: #5a35c2;
  color: #d1d5dc;
  transform: scale(0.97) translateY(1px);
  box-shadow: rgba(0,0,0,0.22) 0 2px 5px 2px inset, rgba(0,0,0,0.12) 0 1px 3px;
}

/* default */
.salamobile-cta--default .pvbtn { height: 60px; font-size: 18px; }

/* hero — más grande y más alto; el panel le reserva más espacio propio (ver
   ctaReserve en SalaMobile) para no tapar el stream ni el ProgressBar. */
.salamobile-cta--hero .pvbtn {
  height: 76px;
  font-size: 22px;
  letter-spacing: 0.01em;
  box-shadow:
    rgba(255,255,255,0.32) 0 1px 0 2px inset,
    rgba(237,137,54,0.55) 0 6px 20px,
    rgba(132,96,229,0.45) 0 2px 40px;
}
.salamobile-cta--hero .pvbtn::after { opacity: 0.55; filter: blur(22px); }

/* fullbutton — dos estados propios (no dependen de .pressed): "big" domina la
   pantalla (sin remate corriendo); "shrink" (mientras corre el remate) baja a
   la altura default. */
.salamobile-cta--fullbutton .pvbtn {
  box-shadow:
    rgba(255,255,255,0.32) 0 1px 0 2px inset,
    rgba(237,137,54,0.55) 0 6px 22px,
    rgba(132,96,229,0.5) 0 2px 44px;
}
.salamobile-cta--fullbutton .pvbtn::after { opacity: 0.55; filter: blur(22px); }
.salamobile-cta--fullbutton-big .pvbtn { height: 88px; font-size: 24px; }
.salamobile-cta--fullbutton-shrink .pvbtn {
  height: 60px;
  font-size: 18px;
  box-shadow:
    rgba(255,255,255,0.28) 0 1px 0 2px inset,
    rgba(237,137,54,0.3) 0 2px 6px;
}
.salamobile-cta--fullbutton-shrink .pvbtn::after { opacity: 0; }
`;

import { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT, SALAMOBILE_BG } from "./dimensions";
export { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT, SALAMOBILE_BG } from "./dimensions";

// ── Variante "Full Botón": secuencia real disparada por cada puja ──────────
// Cada click MÍO agrega mi puja + respuesta de otro postor al chat (como una
// conversación real, "infinita"). Solo a la 3ra puja se dispara el remate real:
// "Cierra en US$X" → "A la una" (arranca ProgressBar) → "A las dos" → "A las
// tres" (100%). Es un evento único: tras eso el botón se queda chico y la barra
// llena para siempre; las pujas siguientes vuelven a ser conversación normal.
const FB_STEP_MS = 550; // ritmo entre mensajes de conversación
const FB_REMATE_MS = 1500; // duración de cada tramo del remate (1/3 del progress)
const FB_END_PAUSE_MS = 700; // pausa tras "A las tres" antes de liberar el botón
const FB_BIDS_PER_CYCLE = 3; // pujas mías antes de disparar el remate (una sola vez)

function useFullButtonEngine(active: boolean, startBid: number) {
  // Semilla de contexto — primeros mensajes de otros postores (sin pujas mías ni
  // remate) para que el chat no arranque vacío antes del primer click.
  const SEED = STATIC.slice(0, 2);

  const [messages, setMessages] = useState<LiveMsg[]>(SEED);
  const [big, setBig] = useState(true);
  // progressVisible: independiente de `big`. Solo pasa a true en el instante en
  // que arranca el remate real (mensaje "A la una"); nunca en pujas normales
  // (1ra/2da), aunque el botón se achique transitoriamente en esas también.
  const [progressVisible, setProgressVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bidAmount, setBidAmount] = useState(startBid);
  const [pressed, setPressed] = useState(false);
  const busyRef = useRef(false);
  const cycleCountRef = useRef(0); // pujas mías acumuladas en el ciclo actual (0..FB_BIDS_PER_CYCLE-1)
  const otherIdxRef = useRef(0);
  const remateDoneRef = useRef(false); // true tras el 1er remate — el botón ya no vuelve a agrandarse
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers(): void {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  // Reset al desactivar (cambiar de variante)
  useEffect(() => {
    if (!active) {
      clearTimers();
      busyRef.current = false;
      cycleCountRef.current = 0;
      remateDoneRef.current = false;
      setMessages(SEED);
      setBig(true);
      setProgressVisible(false);
      setProgress(0);
      setBidAmount(startBid);
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function nextOther(): string {
    const name = OTHERS[otherIdxRef.current % OTHERS.length];
    otherIdxRef.current += 1;
    return name;
  }

  function bid(): void {
    if (!active || busyRef.current) return;
    busyRef.current = true;
    clearTimers();

    const myAmount = bidAmount + STEP;
    setPressed(true);
    timers.current.push(setTimeout(() => setPressed(false), 200));

    // Mi puja entra al stream (el botón NO se achica todavía — se mantiene
    // grande hasta la 3ra puja, que es cuando arranca el remate real).
    setMessages((m) => [...m, { kind: "proposal", side: "sent", type: "live", amount: myAmount, bidder: ME, mine: true }]);

    cycleCountRef.current += 1;
    // El remate ocurre una sola vez en la vida del bloque: al llegar a la 3ra
    // puja. Pasado eso, todas las pujas futuras quedan como conversación normal.
    const isRemateBid = !remateDoneRef.current && cycleCountRef.current >= FB_BIDS_PER_CYCLE;

    if (!isRemateBid) {
      // Puja "normal" (1ra o 2da del ciclo): la conversación sigue — otro postor
      // responde con un monto mayor. Sin remate, sin ProgressBar, botón sigue grande.
      const otherAmount = myAmount + STEP;
      timers.current.push(
        setTimeout(() => {
          setBidAmount(otherAmount);
          setMessages((m) => [...m, { kind: "proposal", side: "received", type: "white", amount: otherAmount, bidder: nextOther() }]);
        }, FB_STEP_MS),
      );
      timers.current.push(
        setTimeout(() => {
          busyRef.current = false;
        }, FB_STEP_MS * 2),
      );
      return;
    }

    // 2) 3ra puja del ciclo: dispara el remate completo — recién aquí se achica.
    setBig(false);
    setBidAmount(myAmount);
    timers.current.push(
      setTimeout(() => {
        setMessages((m) => [...m, { kind: "closes", side: "received", type: "vault", amount: myAmount }]);
      }, FB_STEP_MS),
    );

    const remateStart = FB_STEP_MS * 2;
    const remateLabels = ["A la una", "A las dos", "A las tres"];
    remateLabels.forEach((text, i) => {
      timers.current.push(
        setTimeout(() => {
          setMessages((m) => [...m, { kind: "vmc", side: "received", type: "vault", text, slow: true }]);
          if (i === 0) setProgressVisible(true); // recién ahora ("A la una") aparece la barra
          const s = Date.now();
          const targetPct = ((i + 1) / remateLabels.length) * 100;
          const startPct = (i / remateLabels.length) * 100;
          const iv = setInterval(() => {
            const t = Math.min(1, (Date.now() - s) / FB_REMATE_MS);
            setProgress(startPct + (targetPct - startPct) * t);
            if (t >= 1) clearInterval(iv);
          }, 60);
          timers.current.push(iv);
        }, remateStart + i * FB_REMATE_MS),
      );
    });

    // 3) Fin del remate: la barra se queda llena y visible para siempre, y el
    // botón se queda chico para siempre (ya no vuelve a agrandarse en ningún
    // ciclo futuro). Solo libera el botón para seguir pujando.
    timers.current.push(
      setTimeout(
        () => {
          remateDoneRef.current = true;
          busyRef.current = false;
        },
        remateStart + remateLabels.length * FB_REMATE_MS + FB_END_PAUSE_MS,
      ),
    );
  }

  return { messages, big, progressVisible, progress, bidAmount, pressed, bid };
}

export default function SalaMobile({ className = "", live = false, noReserve = false, flashColors, flashMode = "bulb", ctaVariant = "fullbutton" }: SalaMobileProps): JSX.Element {
  const {
    phase, shown, prog, count, participants, myBids, totalBids, bidAmount: liveBidAmount, bidder, pressed: livePressed, flash,
  } = useLiveAuction(live, noReserve);

  // Estado del bid actual en idle (interactivo con el botón "Bidear") — usado por
  // las variantes default/hero, que no tienen secuencia propia.
  const [idleBid, setIdleBid] = useState(6559);
  const [idleBidder, setIdleBidder] = useState("ZAE389");
  const [idleFlash, setIdleFlash] = useState(0);

  // Motor propio de "Full Botón" — solo corre en modo idle (!live), nunca en "Ver live".
  const fb = useFullButtonEngine(ctaVariant === "fullbutton" && !live, 6559);

  const progVariant: ProgressBarVariant = live
    ? (phase === "streaming" || phase === "result" || phase === "activity" || phase === "bestbid" ? "rainbow" : "white")
    : "rainbow";

  const isFullButton = ctaVariant === "fullbutton" && !live;
  const ctaAmount = isFullButton ? fb.bidAmount + STEP : (live ? liveBidAmount : idleBid) + STEP;
  const pressed = isFullButton ? fb.pressed : livePressed;

  // Click en "Bidear" (idle): pujo yo → sube mi bid + anima el bid actual
  function handleBid(): void {
    if (live) return;
    if (isFullButton) {
      fb.bid();
      return;
    }
    setIdleBid((b) => b + STEP);
    setIdleBidder(ME);
    setIdleFlash((f) => f + 1);
  }

  // Espacio reservado al pie del panel por variante (stream/status terminan ahí,
  // el ProgressBar vive 28px arriba de ese borde): default 108, hero más alto
  // (130, cabe el botón de 76px sin invadir el stream ni la barra), fullbutton usa
  // más espacio mientras está "big" (botón de 88px, barra oculta) y el default una
  // vez que el remate ocurrió (barra visible, botón chico, ya para siempre).
  const ctaReserve = ctaVariant === "hero" ? 130 : isFullButton ? (fb.big ? 156 : 108) : 108;
  // Independiente del tamaño del botón: la barra solo aparece durante/después del
  // remate real (fb.progressVisible), nunca por el achicado transitorio de una
  // puja normal (1ra/2da del ciclo).
  const hideProgress = isFullButton && !fb.progressVisible;

  return (
    <div
      className={className}
      data-block="testsala2-mobile"
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

      {/* Panel glass del chat — llega hasta abajo. Le reservamos al pie el espacio
          exacto que necesita el CTA de cada variante (ctaReserve) para que el
          stream de mensajes y el ProgressBar nunca queden tapados. */}
      <div style={{ position: "absolute", top: MOBILEHEADER_HEIGHT, left: 0 }}>
        <MobileChatPanel
          height={SALAMOBILE_HEIGHT - MOBILEHEADER_HEIGHT}
          live={live}
          phase={phase}
          shown={shown}
          progress={isFullButton ? fb.progress : (live ? prog : 40)}
          progressVariant={progVariant}
          count={count}
          bidAmount={isFullButton ? fb.bidAmount : (live ? liveBidAmount : idleBid)}
          bidder={isFullButton ? ME : (live ? bidder : idleBidder)}
          flash={live ? flash : idleFlash}
          flashColors={flashColors}
          flashMode={flashMode}
          ctaReserve={ctaReserve}
          hideProgress={hideProgress}
          staticMessages={isFullButton ? fb.messages : undefined}
        />
      </div>

      {/* CTA — siguiente bid (bid actual + paso); se "presiona" con mi puja. Se oculta
          al terminar la subasta (Procesando / Tabla de posiciones). 3 variantes:
          · default — full-width, 60px.
          · hero — XL 76px con más espacio propio reservado (no tapa nada).
          · fullbutton — arranca gigante (88px); cada puja se achica un instante y
            agrega conversación (mi puja + respuesta de otro postor). Solo a la 3ra
            puja dispara, una única vez, el remate real ("Cierra en" +
            "A la una/dos/tres" con ProgressBar); tras eso el botón se queda chico
            y la barra llena para siempre. */}
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CTA_STYLES }} />
      {phase === "processing" || phase === "result" || phase === "activity" || phase === "bestbid" ? null : (
        <div
          className={[
            "salamobile-cta",
            `salamobile-cta--${ctaVariant}`,
            isFullButton ? `salamobile-cta--fullbutton-${fb.big ? "big" : "shrink"}` : "",
            pressed ? "salamobile-cta--pressed" : "",
          ].filter(Boolean).join(" ")}
          style={{
            position: "absolute",
            left: ctaVariant === "hero" || (isFullButton && fb.big) ? 8 : 12,
            right: ctaVariant === "hero" || (isFullButton && fb.big) ? 8 : 12,
            bottom: 12,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button variant="primary" onClick={handleBid}>{fmtMoney(ctaAmount)}</Button>
        </div>
      )}
    </div>
  );
}
