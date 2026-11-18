"use client";

/**
 * Countdown — cuenta regresiva en cifras mono que corre en vivo (Mi Garaje, mi-garaje-lab · plus-parts).
 * Muestra HH:MM:SS hasta `to` (timestamp en ms) con una etiqueta encima. En el servidor dibuja --:--:--
 * para no desajustar la hidratación. Solo depende de React.
 */
import { useEffect, useState } from "react";
import type { JSX } from "react";

export const COUNTDOWN_CSS = String.raw`
.cp-count { display:inline-grid; gap:1px; font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
.cp-count small { font-size:.6875rem; font-weight:700; color:#B25614; }
.cp-count b { font-family:var(--vmc-font-mono, 'Roboto Mono', ui-monospace, monospace); font-size:1.125rem; font-weight:700; color:#3B1782; font-variant-numeric:tabular-nums; }
.cp-live .cp-count b { color:#fff; } .cp-live .cp-count small { color:#FDD8A4; }
`;

function useNow(): number {
  const [now, setNow] = useState(0); // 0 en el servidor: evita desajuste de hidratación
  useEffect(() => {
    // El primer tic va en un timeout (no síncrono en el efecto) para no encadenar renders.
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 1000);
    return () => { clearTimeout(first); clearInterval(t); };
  }, []);
  return now;
}

export interface CountdownProps {
  /** Momento final, en ms (Date.now() + …). */
  to: number;
  /** Etiqueta encima de la cifra (p. ej. «Cierra en»). */
  label: string;
}

export function Countdown({ to, label }: CountdownProps): JSX.Element {
  const now = useNow();
  const styles = <style href="concorde-countdown" precedence="default">{COUNTDOWN_CSS}</style>;
  if (!now || !Number.isFinite(to)) return <>{styles}<span className="cp-count"><small>{label}</small><b>--:--:--</b></span></>;
  const left = Math.max(0, to - now);
  const h = Math.floor(left / 3.6e6), m = Math.floor((left % 3.6e6) / 6e4), sec = Math.floor((left % 6e4) / 1e3);
  const pad = (n: number) => String(n).padStart(2, "0");
  return <>{styles}<span className="cp-count" aria-label={`${label}: ${h} h ${m} min`}><small>{label}</small><b>{pad(h)}:{pad(m)}:{pad(sec)}</b></span></>;
}

export default Countdown;
