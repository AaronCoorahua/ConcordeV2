/**
 * RoundProgress — en qué ronda va una negociación (Mi Garaje, mi-garaje-lab · panel de negociación):
 * «Negociación 2/5» a la izquierda y un punto por ronda a la derecha; las rondas hechas en cian → violeta.
 * Solo depende de React.
 */
import type { JSX } from "react";

export const ROUND_PROGRESS_CSS = String.raw`
.np__meta { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: .75rem; font-weight: 600; color: #6B6878; }
.np__meta i { display: flex; gap: 4px; }
.np__meta b { width:8px; height:8px; border-radius:50%; background:#E1E3E2; }
.np__meta b.is-on { background:linear-gradient(135deg, #00A8AB, #8460E5); box-shadow:0 1px 3px rgba(0,168,171,.22); }
`;

export interface RoundProgressProps {
  /** Ronda actual (1…total). */
  round: number;
  /** Rondas posibles (5 en VMC). */
  total: number;
  /** Con quién se negocia, si hay varios (p. ej. «Comprador 3»): se lee «… con Comprador 3». */
  with?: string;
}

export function RoundProgress({ round, total, with: who }: RoundProgressProps): JSX.Element {
  return <>
    <style href="concorde-round-progress" precedence="default">{ROUND_PROGRESS_CSS}</style>
    {/* Cada punto corresponde a una ronda: propuesta del comprador + respuesta del vendedor. */}
    <div className="np__meta"><span>Negociación {round}/{total}{who ? ` con ${who}` : ""}</span><i aria-hidden>{Array.from({ length: total }, (_, i) => <b key={i} className={i < round ? "is-on" : ""} />)}</i></div>
  </>;
}

export default RoundProgress;
