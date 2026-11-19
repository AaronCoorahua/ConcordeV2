"use client";

/**
 * ResponseTimer — plazo para responder una propuesta (Mi Garaje, mi-garaje-lab · panel de negociación):
 * TimerIcon y «Tienes 23:47:58 para responder», con el segundero corriendo en cifras mono.
 * Si te toca a ti (`urgent`) va en magenta; si esperas a la otra parte, en gris.
 */
import { useEffect, useState } from "react";
import type { JSX } from "react";
import TimerIcon from "@/src/components/TimerIcon";

export const RESPONSE_TIMER_CSS = String.raw`
.np__due { display: inline-flex; align-items: center; gap: 4px; font-size: .75rem; line-height:16px; font-weight: 600; color: #6B6878; white-space: nowrap; }
.np__due b { font-family: var(--vmc-font-mono); font-weight: 600; }
.np__due.is-me, .np__due.is-me b { color: #A800D4; }
`;

export interface ResponseTimerProps {
  /** Momento en que vence, en ms (Date.now() + …). */
  to: number;
  /** Te toca responder a ti: magenta. */
  urgent?: boolean;
  /** Texto antes de la cifra (p. ej. «Tienes» o «Esperando al vendedor»). */
  pre?: string;
  /** Texto después de la cifra (p. ej. « para responder»). */
  post?: string;
}

export function ResponseTimer({ to, urgent = false, pre = "Vence en", post = "" }: ResponseTimerProps): JSX.Element {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = Math.max(0, to - now), h = Math.floor(left / 3.6e6), m = Math.floor((left % 3.6e6) / 6e4), sec = Math.floor((left % 6e4) / 1e3);
  const pad = (x: number) => String(x).padStart(2, "0");
  // Solo las cifras en mono; las unidades en la fuente del texto.
  return <>
    <style href="concorde-response-timer" precedence="default">{RESPONSE_TIMER_CSS}</style>
    <span className={`np__due${urgent ? " is-me" : ""}`} role="timer" aria-label={`Vence en ${h} h ${m} min`}><TimerIcon size={16} />{pre} <b>{pad(h)}:{pad(m)}:{pad(sec)}</b>{post}</span>
  </>;
}

export default ResponseTimer;
