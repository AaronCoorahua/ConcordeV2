"use client";

/**
 * ProjectionChart — curva de cuánto valdrá el vehículo en los próximos 12 meses (mi-garaje-lab · resultado «Revela» de
 * Valorizar y el análisis de Mis valorizaciones, tarjeta «Proyección de valor»).
 * Curva semanal de AVT (projectForward) con el degradado primario de Concorde (#F4AC59 → #8460E5), eje con el valor en miles,
 * hitos rotulados (Hoy · 1M · 3M · 6M · 12M) como puntos blancos con anillo lila y el valor final a la derecha. Con el mouse
 * o ← → aparece una cruz con el valor de esa semana. El SVG se dibuja al ancho real de la tarjeta. Solo depende de React.
 */
import { useId, useLayoutEffect, useRef, useState } from "react";
import type { JSX, MouseEvent, RefObject } from "react";

/** Base de los gráficos de valorización (ProjectionChart y SeasonChart): contenedor, textos de eje y tooltip. */
export const VALUE_CHART_CSS = String.raw`
.rv-plot { position:relative; min-width:0; }
.rv-w { contain:inline-size; min-width:0; } /* el ancho lo pone la tarjeta, no el SVG (si no, el ResizeObserver se mide a sí mismo) */
.rv-svg { display:block; overflow:visible; font-family:var(--vmc-font-display); }
.rv-svg:focus-visible, .rv-hit:focus-visible { outline:2px solid #8460E5; outline-offset:2px; border-radius:4px; }
.rv-hit { outline:none; }
.rv-tick { font-size:12px; font-variant-numeric:tabular-nums; }
.rv-tick--now { font-weight:700; }
.rv-val { font-size:14px; font-weight:600; font-variant-numeric:tabular-nums; }
.rv-val--b { font-weight:700; }
.rv-tip { position:absolute; z-index:4; transform:translate(-50%, calc(-100% - 12px)); pointer-events:none; display:grid; gap:2px; padding:8px 12px; border-radius:8px; white-space:nowrap;
  background:#22005C; color:#fff; box-shadow:0 8px 24px rgba(34,0,92,.28); font-size:.75rem; }
.rv-tip b { font-size:.8125rem; } .rv-tip span { color:#CFBAFF; }
`;

/** Ancho real del contenedor: el SVG se dibuja a su tamaño para que el texto no se encoja en móvil. */
export function useChartWidth(): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null); const [w, setW] = useState(640);
  useLayoutEffect(() => { const el = ref.current; if (!el) return; const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width))); ro.observe(el); return () => ro.disconnect(); }, []);
  return [ref, w];
}

const usd = (n: number) => `US$ ${Math.round(n).toLocaleString("en-US")}`;
const k1 = (n: number) => `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;

export interface ProjectionPoint {
  /** Valor proyectado en US$. */
  v: number;
  /** Kilometraje proyectado a esa fecha. */
  km: number;
  /** Rótulo del hito («Hoy», «1M», «3M», «6M», «12M»); null en las semanas intermedias. */
  label: string | null;
}

export interface ProjectionChartProps {
  /** Valor de mercado hoy (punto naranja del inicio y base del % final). */
  market: number;
  /** Puntos semanales de la proyección, del primero («Hoy») al último («12M»). */
  points: ProjectionPoint[];
}

export function ProjectionChart({ market, points }: ProjectionChartProps): JSX.Element {
  const gid = useId();
  const P = points.map((p) => ({ v: p.v, full: p.label ?? "", lab: p.label, km: p.km }));
  const marks = P.flatMap((p, i) => (p.lab ? [i] : []));
  const [ref, W] = useChartWidth(), narrow = W < 480, H = 200, L = 44, R = narrow ? 12 : 108, T = narrow ? 36 : 12, B = 24, n = P.length;
  const vs = P.map((p) => p.v), lo = Math.floor((Math.min(...vs) - 60) / 200) * 200, hi = Math.ceil((Math.max(...vs) + 40) / 200) * 200;
  const x = (i: number) => L + (i / (n - 1)) * (W - L - R), y = (v: number) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const [hov, setHov] = useState<number | null>(null);
  const pts = P.map((p, i) => `${x(i)},${y(p.v)}`);
  const ticks = Array.from({ length: (hi - lo) / 200 + 1 }, (_, k) => lo + k * 200);
  const last = P[n - 1], drop = ((1 - last.v / market) * 100).toFixed(1), h = hov === null ? null : P[hov];
  const move = (e: MouseEvent<SVGSVGElement>) => { const r = e.currentTarget.getBoundingClientRect(); setHov(Math.max(0, Math.min(n - 1, Math.round((e.clientX - r.left - L) / (W - L - R) * (n - 1))))); };
  return <>
    <style href="concorde-value-chart" precedence="default">{VALUE_CHART_CSS}</style>
    <div ref={ref} className="rv-w rv-plot">
      <svg width={W} height={H} className="rv-svg" role="img" tabIndex={0} aria-label={`Proyección: de ${usd(market)} hoy a ${usd(last.v)} en 12 meses (−${drop} %)`}
        onMouseMove={move} onMouseLeave={() => setHov(null)} onBlur={() => setHov(null)}
        onKeyDown={(e) => { if (e.key === "ArrowRight") setHov((v) => Math.min(n - 1, (v ?? -1) + 1)); if (e.key === "ArrowLeft") setHov((v) => Math.max(0, (v ?? 1) - 1)); }}>
        <defs><linearGradient id={gid} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8460E5" stopOpacity={0.16} /><stop offset="1" stopColor="#8460E5" stopOpacity="0" /></linearGradient>
          <linearGradient id={`${gid}l`} gradientUnits="userSpaceOnUse" x1={x(0)} x2={x(n - 1)} y1="0" y2="0"><stop offset="0" stopColor="#F4AC59" /><stop offset=".3" stopColor="#ED8936" /><stop offset="1" stopColor="#8460E5" /></linearGradient></defs>
        {ticks.map((v) => <g key={v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#ECEAF2" /><text x={L - 8} y={y(v) + 4} textAnchor="end" className="rv-tick" fill="#6B6878">{k1(v)}</text></g>)}
        {marks.filter((i) => i < n).map((i) => <text key={i} x={x(i)} y={H - 4} textAnchor="middle" className="rv-tick" fill="#6B6878">{i === 0 ? "Hoy" : P[i].lab}</text>)}
        <path d={`M${x(0)},${H - B} L${pts.join(" L")} L${x(n - 1)},${H - B} Z`} fill={`url(#${gid})`} />
        <polyline points={pts.join(" ")} fill="none" stroke={`url(#${gid}l)`} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        {marks.slice(1).filter((i) => i < n).map((i) => <circle key={i} cx={x(i)} cy={y(P[i].v)} r={5} fill="#fff" stroke="#8460E5" strokeWidth={2} />)}
        <circle cx={x(0)} cy={y(market)} r={6} fill="#ED8936" stroke="#FFFFFF" strokeWidth={2} />
        <text x={narrow ? x(n - 1) : x(n - 1) + 10} y={narrow ? 14 : y(last.v) - 3} textAnchor={narrow ? "end" : "start"} className="rv-val rv-val--b" fill="#191C1C">{usd(last.v)}</text>
        <text x={narrow ? x(n - 1) : x(n - 1) + 10} y={narrow ? 30 : y(last.v) + 13} textAnchor={narrow ? "end" : "start"} className="rv-tick" fill="#6B6878">−{drop}{" "}% · 12 meses</text>
        {h && hov !== null ? <g pointerEvents="none"><line x1={x(hov)} x2={x(hov)} y1={T} y2={H - B} stroke="#6B6878" strokeOpacity={0.5} /><circle cx={x(hov)} cy={y(h.v)} r={6} fill="#8460E5" stroke="#FFFFFF" strokeWidth={2} /></g> : null}
      </svg>
      {h && hov !== null ? <div className="rv-tip" style={{ left: x(hov), top: y(h.v) }} role="status"><b>{h.full ? `${h.full} · ` : ""}{usd(h.v)}</b><span>{hov ? `−${usd(market - h.v)} desde hoy${h.km ? ` · ${(h.km / 1000).toFixed(0)}k km` : ""}` : "Valor de hoy"}</span></div> : null}
    </div>
  </>;
}

export default ProjectionChart;
