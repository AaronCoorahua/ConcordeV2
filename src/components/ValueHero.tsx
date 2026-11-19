"use client";

/**
 * ValueHero — cabecera oscura del resultado de una valorización (mi-garaje-lab · resultado «Revela» de Valorizar y el
 * análisis de Mis valorizaciones). Vehículo y datos arriba, «Valor de mercado» como cifra grande y, a la derecha, en una
 * franja de vidrio, el valor de recompra y la estimación Subastop con sus íconos de Vidrio. Al aparecer, las cifras suben
 * hasta su valor (~1 s); `still` las deja quietas (resultado ya guardado). Sin animación con «reducir movimiento».
 * Depende de React y Vidrio.
 */
import { useEffect, useState } from "react";
import type { JSX } from "react";
import { Vidrio } from "@/src/components/Vidrio";

export const VALUE_HERO_CSS = String.raw`
.rva-hero { position:relative; overflow:hidden; display:grid; grid-template-columns:minmax(0,1fr) 300px; align-items:center; gap:24px; padding:24px; border-radius:16px; color:#fff;
  background:radial-gradient(90% 120% at 100% 0%, #5A35C2 0%, #3B1782 48%, #22005C 100%); box-shadow:0 12px 32px rgba(34,0,92,.25); }
.rva-left { display:grid; gap:16px; min-width:0; }
.rva-top { display:flex; align-items:baseline; flex-wrap:wrap; gap:4px 12px; }
.rva-hero .rva-car { margin:0; font-size:1rem; font-weight:700; letter-spacing:0; color:#fff; }
.rva-meta { margin:0; font-size:.75rem; color:#CFBAFF; }
.rva-value { display:grid; gap:2px; }
.rva-h { margin:0; font-size:.75rem; font-weight:600; color:#E8DEFF; }
.rva-big { margin:0; font-size:3rem; line-height:1.05; font-weight:700; letter-spacing:-0.03em; font-variant-numeric:tabular-nums; }
.rva-note { margin:4px 0 0; font-size:.75rem; color:#CFBAFF; }
.rva-two { list-style:none; margin:0; padding:0; display:grid; border-radius:12px; background:rgba(255,255,255,.08); box-shadow:inset 0 0 0 1px rgba(255,255,255,.14); }
.rva-two li { display:grid; grid-template-columns:32px 1fr; align-items:center; gap:12px; padding:12px 16px; }
.rva-two li + li { border-top:1px solid rgba(255,255,255,.12); }
.rva-two .vd { width:32px; height:32px; }
.rva-two div { display:grid; gap:0; }
.rva-two small, .rva-two div > span { font-size:.75rem; color:#CFBAFF; }
.rva-two b { font-size:1.125rem; font-weight:700; font-variant-numeric:tabular-nums; }
.rva-two .vd, .rva-hero .vd { --solid:#AE8EFF; --glass:#E8DEFF; }
.rva-hero .g-sr { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
@media (prefers-reduced-motion: no-preference) {
  .rva-big { animation:rva-in .5s cubic-bezier(.05,.7,.1,1) both; }
  .rva-two li { animation:rva-in .45s calc(.3s + var(--j, 0) * 100ms) cubic-bezier(.2,0,0,1) both; } .rva-two li + li { --j:1; }
}
.rva-hero--still, .rva-hero--still * { animation:none !important; }
@keyframes rva-in { from { opacity:0; transform:translateY(12px); } }
@media (max-width:767px) {
  .rva-hero { grid-template-columns:minmax(0,1fr); gap:16px; padding:20px; }
  .rva-big { font-size:2.5rem; }
  .rva-two { grid-template-columns:1fr 1fr; } .rva-two li { grid-template-columns:1fr; gap:6px; padding:12px; align-items:start; align-content:start; } .rva-two li + li { border-top:0; border-left:1px solid rgba(255,255,255,.12); }
}
`;

const usd = (n: number) => `US$ ${Math.round(n).toLocaleString("en-US")}`;

/** Cifra que sube hasta el valor (como el Counter de AVT). Solo visual: el valor real va en texto para lectores de pantalla. */
function Count({ to, delay = 0, still }: { to: number; delay?: number; still?: boolean }): JSX.Element {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (still || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // El primer cuadro (antes de t0) ya pinta el valor inicial: p queda en 0.
    let raf = 0; const t0 = performance.now() + delay, from = to * 0.85;
    const tick = (t: number) => { const p = Math.max(0, Math.min(1, (t - t0) / 900)); setV(from + (to - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [to, delay, still]);
  return <><span aria-hidden>{usd(v)}</span><span className="g-sr">{usd(to)}</span></>;
}

export interface ValueHeroProps {
  /** Vehículo (p. ej. «Toyota Corolla 2019»): es el título de la página del resultado. */
  title: string;
  /** Datos junto al vehículo (p. ej. «45,000 km · 7 años de uso»). */
  meta: string;
  /** Rótulo de la cifra (p. ej. «Valor de mercado hoy» o «Valor de mercado al 01/10»). */
  valueLabel: string;
  /** Valor de mercado en US$. */
  value: number;
  /** Valor de recompra en US$ (compra inmediata para dealers). */
  buyback: number;
  /** Estimación Subastop en US$ (cierre en subasta VMC). */
  auction: number;
  /** Resultado ya guardado: sin la subida de cifras ni la entrada. */
  still?: boolean;
  /** id del título (para llevarle el foco al llegar al resultado). */
  headingId?: string;
}

export function ValueHero({ title, meta, valueLabel, value, buyback, auction, still, headingId }: ValueHeroProps): JSX.Element {
  return <>
    <style href="concorde-value-hero" precedence="default">{VALUE_HERO_CSS}</style>
    <section className={`rva-hero${still ? " rva-hero--still" : ""}`} aria-labelledby={headingId}>
      <div className="rva-left">
        <header className="rva-top"><h1 id={headingId} tabIndex={-1} className="rva-car">{title}</h1><p className="rva-meta">{meta}</p></header>
        <div className="rva-value">
          <p className="rva-h">{valueLabel}</p>
          <p className="rva-big"><Count to={value} still={still} /></p>
          <p className="rva-note">Estimación basada en depreciación real, estacionalidad y kilometraje.</p>
        </div>
      </div>
      <ul className="rva-two">
        <li><Vidrio s="billetera" size={40} /><div><small>Valor de recompra</small><b><Count to={buyback} delay={300} still={still} /></b><span>Compra inmediata para dealers.</span></div></li>
        <li><Vidrio s="participaciones" size={40} /><div><small>Estimación Subastop</small><b><Count to={auction} delay={400} still={still} /></b><span>Cierre en subasta VMC.</span></div></li>
      </ul>
    </section>
  </>;
}

export default ValueHero;
