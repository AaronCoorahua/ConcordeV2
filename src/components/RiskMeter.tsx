/**
 * RiskMeter — el riesgo del perfil como escala de 5 niveles (Mi Garaje, mi-garaje-lab · plus-parts).
 * tone="dark" sobre fondos morados; tone="light" sobre fondos blancos (cabecera de cuenta de Mi Garaje).
 * Solo depende de React.
 */
import type { JSX } from "react";

export const RISK_LEVELS = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"] as const;

export const RISK_METER_CSS = String.raw`
.cp-risk { display:grid; gap:6px; font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
.cp-risk__label { font-size:.75rem; color:#CFBAFF; }
.cp-risk__label b { margin-left:4px; font-size:.875rem; color:#fff; }
.cp-risk__bar { display:flex; gap:4px; }
.cp-risk__bar i { width:28px; height:6px; border-radius:9999px; background:rgba(255,255,255,.18); }
.cp-risk__bar i.is-on { background:#fff; box-shadow:0 0 0 2px rgba(255,255,255,.25); }
.cp-risk--light .cp-risk__label { color:#5F5B6B; }
.cp-risk--light .cp-risk__label b { color:#D46E20; }
.cp-risk--light .cp-risk__bar i { background:#E1E3E2; }
.cp-risk--light .cp-risk__bar i.is-on { background:linear-gradient(90deg,#8460E5,#3B1782); box-shadow:0 0 0 2px #E8DEFF; }
`;

export interface RiskMeterProps {
  /** 0 = Muy bajo … 4 = Muy alto. */
  level: number;
  tone?: "dark" | "light";
}

export function RiskMeter({ level, tone = "dark" }: RiskMeterProps): JSX.Element {
  const lv = Math.min(4, Math.max(0, Math.round(level)));
  return <>
    <style href="concorde-risk-meter" precedence="default">{RISK_METER_CSS}</style>
    <div className={`cp-risk${tone === "light" ? " cp-risk--light" : ""}`} role="meter" aria-valuemin={1} aria-valuemax={5} aria-valuenow={lv + 1} aria-valuetext={`Riesgo ${RISK_LEVELS[lv]}`}>
      <span className="cp-risk__label">Riesgo del perfil <b>{RISK_LEVELS[lv]}</b></span>
      <span className="cp-risk__bar" aria-hidden>{RISK_LEVELS.map((r, i) => <i key={r} className={i === lv ? "is-on" : ""} />)}</span>
    </div>
  </>;
}

export default RiskMeter;
