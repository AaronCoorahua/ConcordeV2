/**
 * Stepper — pasos de un recorrido (Mi Garaje, mi-garaje-lab · Flujo Publicar / Valorizar).
 * Barra: nombres arriba, ProgressBar de Concorde partida en un tramo por paso (el actual a la mitad) y los pasos hechos
 * con check, como botones para volver. En móvil (≤ 767 px) muestra solo el paso actual con «paso N de M».
 */
import type { CSSProperties, JSX } from "react";
import ProgressBar from "@/src/components/ProgressBar";
import CheckIcon from "@/src/components/CheckIcon";

export const STEPPER_CSS = String.raw`
/* Barra: ProgressBar en tramos (--n pasos) + nombres; hecho = check y se puede tocar. */
.fl-steps { display:grid; gap:10px; }
.fl-steps ol { order:-1; list-style:none; margin:0; padding:0; display:grid; grid-auto-flow:column; grid-auto-columns:1fr; column-gap:6px; align-items:center; min-height:24px; }
.fl-steps li { display:flex; align-items:center; gap:8px; min-width:0; font-size:.8125rem; font-weight:500; white-space:nowrap; color:var(--f-muted, #6B6878); }
.fl-steps li > span { display:grid; place-items:center; width:22px; height:22px; border-radius:50%; font-size:.75rem; font-weight:700; background:none; box-shadow:inset 0 0 0 1.5px #D9D4E5; color:#8A8797; }
.fl-steps li.is-now { color:#3B1782; font-weight:700; }
.fl-steps li.is-now > span { color:#fff; background:#ED8936; box-shadow:0 0 0 4px rgba(237,137,54,.18); }
.fl-steps li button { all:unset; cursor:pointer; display:inline-flex; align-items:center; gap:8px; color:var(--f-ink, #3B1782); border-radius:8px; padding:2px 6px; margin:-2px -6px; }
.fl-steps li.is-done button { color:#3B1782; font-weight:600; }
.fl-steps li.is-done svg { color:#ED8936; }
.fl-steps li button:hover { background:var(--f-tint, #F5F0FF); text-decoration:underline; text-underline-offset:3px; }
.fl-steps li button:focus-visible { outline:2px solid var(--f-focus, #8460E5); outline-offset:2px; }
.fl-steps .pprogbar { height:6px; border-radius:9999px; background:#E7E3F0; box-shadow:none;
  --seg:calc((100% - (var(--n, 3) - 1) * 6px) / var(--n, 3));
  -webkit-mask:repeating-linear-gradient(90deg, #000 0 var(--seg), transparent var(--seg) calc(var(--seg) + 6px));
          mask:repeating-linear-gradient(90deg, #000 0 var(--seg), transparent var(--seg) calc(var(--seg) + 6px)); }
.fl-steps .pprogbar__fill { background:linear-gradient(90deg, var(--vmc-color-orange-gradient-light, #F4AC59) 0%, #ED8936 30%, #8460E5 100%); transition:width .6s cubic-bezier(.16,1,.3,1); }
.fl-steps__of { display:none; }
/* Móvil: solo el paso actual con «paso N de M»; la barra de tramos muestra el resto. */
@media (max-width:767px) {
  .fl-steps ol { grid-auto-flow:row; }
  .fl-steps li:not(.is-now) { display:none; }
  .fl-steps .fl-steps__of { display:inline; font-size:.75rem; font-weight:500; color:#6B6878; }
}

@media (prefers-reduced-motion:reduce) { .fl-steps .pprogbar__fill { transition:none; } }
`;

export interface StepperProps {
  /** Nombres de los pasos, en orden. */
  steps: string[];
  /** Paso actual, desde 0. */
  current: number;
  /** Los pasos hechos son botones que la llaman con su índice para volver a ese paso. */
  onGo: (step: number) => void;
}

export function Stepper({ steps, current, onGo }: StepperProps): JSX.Element {
  const styles = <style href="concorde-stepper" precedence="default">{STEPPER_CSS}</style>;
  const cls = (i: number) => i < current ? "is-done" : i === current ? "is-now" : "";
  // El tramo del paso actual va a la mitad (en curso); los hechos, llenos.
  return <>{styles}<div className={`fl-steps${steps.length > 3 ? " fl-steps--long" : ""}`} style={{ "--n": steps.length } as CSSProperties}>
    <ProgressBar value={((current + 0.5) / steps.length) * 100} />
    <ol aria-label={`Paso ${current + 1} de ${steps.length}`}>{steps.map((s, i) => <li key={s} className={cls(i)} aria-current={i === current ? "step" : undefined}>
      {i < current ? <button type="button" onClick={() => onGo(i)} aria-label={`Volver a ${s}`}><CheckIcon size={16} />{s}</button>
        : <><span>{i + 1}</span>{s}{i === current ? <small className="fl-steps__of">· paso {i + 1} de {steps.length}</small> : null}</>}</li>)}</ol>
  </div></>;
}

export default Stepper;
