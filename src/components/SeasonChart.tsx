"use client";

/**
 * SeasonChart — demanda del mercado mes a mes (mi-garaje-lab · resultado «Revela» de Valorizar y el análisis de Mis
 * valorizaciones, tarjeta «Momento óptimo de venta»).
 * Barras divergentes sobre una raya: arriba, más demanda que el promedio (lila; las de más de 10 % con el violeta de
 * ConditionPill), abajo, menos demanda (naranja de EN VIVO). El mes actual lleva halo, borde blanco y su % rotulado.
 * Cada barra se puede enfocar o señalar para ver el mes y su %. Depende de React y de la base de ProjectionChart.
 */
import { useId, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";
import { VALUE_CHART_CSS, useChartWidth } from "@/src/components/ProjectionChart";

export interface SeasonMonth {
  /** Mes, de 1 (enero) a 12. */
  m: number;
  /** Demanda frente al promedio del año, en % (p. ej. 13.1 o −5.1). */
  f: number;
  /** Nombre del mes («Enero»); el eje muestra sus 3 primeras letras. */
  name: string;
}

export interface SeasonChartProps {
  /** Los 12 meses, de enero a diciembre. */
  months: SeasonMonth[];
  /** Mes actual (1–12): va resaltado y con su % rotulado. */
  now: number;
}

/** Tooltip compartido: el mouse y el foco de teclado muestran lo mismo; nunca es la única forma de leer el dato. */
function useTip() {
  const [tip, setTip] = useState<{ x: number; y: number; body: ReactNode } | null>(null);
  const host = useRef<HTMLDivElement>(null);
  const at = (e: { clientX: number; clientY: number }, body: ReactNode) => { const r = host.current!.getBoundingClientRect(); setTip({ x: e.clientX - r.left, y: e.clientY - r.top, body }); };
  const atEl = (el: Element, body: ReactNode) => { const r = host.current!.getBoundingClientRect(), b = el.getBoundingClientRect(); setTip({ x: b.left + b.width / 2 - r.left, y: b.top - r.top, body }); };
  const hit = (body: ReactNode) => ({ tabIndex: 0, className: "rv-hit", onMouseMove: (e: { clientX: number; clientY: number }) => at(e, body), onFocus: (e: { currentTarget: Element }) => atEl(e.currentTarget, body), onBlur: () => setTip(null) });
  const layer = tip ? <div className="rv-tip" style={{ left: tip.x, top: tip.y }} role="status">{tip.body}</div> : null;
  return { host, hit, layer, clear: () => setTip(null) };
}

const pct = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(Math.round(n))} %`;

export function SeasonChart({ months, now }: SeasonChartProps): JSX.Element {
  const id = useId();
  const [ref, W] = useChartWidth(), { host, hit, layer, clear } = useTip(), H = 168, T = 22, B = 28;
  const max = Math.max(...months.map((s) => Math.abs(s.f))), y0 = T + (H - T - B) / 2, sy = (H - T - B) / 2 / max, slot = W / 12, bw = Math.min(22, slot * 0.62);
  const bar = (cx: number, f: number) => { const h = Math.abs(f) * sy, x0 = cx - bw / 2, r = Math.min(4, h), s = f >= 0 ? -1 : 1;
    return `M${x0},${y0} V${y0 + s * (h - r)} Q${x0},${y0 + s * h} ${x0 + r},${y0 + s * h} H${x0 + bw - r} Q${x0 + bw},${y0 + s * h} ${x0 + bw},${y0 + s * (h - r)} V${y0} Z`; };
  return <>
    <style href="concorde-value-chart" precedence="default">{VALUE_CHART_CSS}</style>
    <div ref={ref} className="rv-w"><div ref={host} className="rv-plot" onMouseLeave={clear}>
      <svg width={W} height={H} className="rv-svg" role="img" aria-label={months.map((s) => `${s.name} ${pct(s.f)}`).join(", ")}>
        <defs><linearGradient id={`${id}up`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#AE8EFF" /><stop offset="1" stopColor="#5A35C2" /></linearGradient>
          <linearGradient id={`${id}mid`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#CFBAFF" /><stop offset="1" stopColor="#8460E5" /></linearGradient>
          <linearGradient id={`${id}dn`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ED8936" /><stop offset="1" stopColor="#F4AC59" /></linearGradient></defs>
        <line x1={0} x2={W} y1={y0} y2={y0} stroke="#6B6878" strokeOpacity={0.5} />
        {months.map((s, i) => { const cx = slot * i + slot / 2, isNow = s.m === now;
          return <g key={s.m} {...hit(<b>{s.name} · {s.f > 0 ? "+" : ""}{s.f}%</b>)}>
            <rect x={cx - slot / 2} y={T - 16} width={slot} height={H - T + 16} fill="transparent" />
            {isNow ? <path d={bar(cx, s.f)} fill="none" stroke={s.f >= 0 ? "#8460E5" : "#ED8936"} strokeOpacity={0.28} strokeWidth={8} strokeLinejoin="round" /> : null}
            <path d={bar(cx, s.f)} fill={`url(#${id}${s.f > 10 ? "up" : s.f >= 0 ? "mid" : "dn"})`} opacity={1} stroke={isNow ? "#fff" : "none"} strokeWidth={isNow ? 1.5 : 0} />
            {isNow ? <text x={cx} y={s.f >= 0 ? y0 - Math.abs(s.f) * sy - 6 : y0 + Math.abs(s.f) * sy + 14} textAnchor="middle" className="rv-val rv-val--b" fill="#3B1782">{`${s.f > 0 ? "+" : ""}${s.f}%`}</text> : null}
            <text x={cx} y={H - 6} textAnchor="middle" className={`rv-tick${isNow ? " rv-tick--now" : ""}`} fill={isNow ? "#3B1782" : "#6B6878"}>{s.name.slice(0, 3)}</text>
          </g>; })}
      </svg>{layer}</div></div>
  </>;
}

export default SeasonChart;
