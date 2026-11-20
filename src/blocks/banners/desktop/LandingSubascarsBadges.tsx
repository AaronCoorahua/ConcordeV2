/**
 * LandingSubascarsBadges — estilos de las propuestas (US$ …) con peso, para cualquier versión del banner landing Subascars.
 * Pedido (20/11): que los precios se vean en 3D, flotando, un poco inclinados, con el peso de los checks colgantes de la
 * referencia (spot de Vinted). Cada estilo usa los mismos tres montos y posiciones; cambian volumen, sombra y movimiento.
 *   colgante  fichas blancas gruesas colgadas de un hilo desde arriba, que se mecen.
 *   ficha     fichas en 3D (inclinadas en perspectiva, canto violeta de 8 px) que flotan con su sombra en el piso.
 *   inflado   botones violetas inflados (brillo arriba, sombra interior abajo) con moneda teal: los colores del banner.
 *   fondo     fichas grandes detrás de la persona, como parte del fondo; van antes que la foto (ver backBadges).
 *   vidrio    bloques de vidrio grueso (canto claro, reflejo que pasa) que flotan inclinados.
 * Profundidad: la de abajo es la más grande (más cerca); las de arriba, más chicas. Sin movimiento si el sistema lo pide.
 */
import type { CSSProperties, JSX } from "react";
import { MoneyIcon } from "./LandingSubascarsBanner";

export type BadgeStyle = "original" | "colgante" | "ficha" | "inflado" | "vidrio" | "fondo";

export const BADGE_STYLES: { id: BadgeStyle; name: string }[] = [
  { id: "original", name: "Planos" },
  { id: "colgante", name: "Colgantes" },
  { id: "ficha", name: "Fichas 3D" },
  { id: "inflado", name: "Inflados" },
  { id: "vidrio", name: "Vidrio grueso" },
  { id: "fondo", name: "Al fondo" },
];

export const isBadgeStyle = (v: unknown): v is BadgeStyle => BADGE_STYLES.some((b) => b.id === v);

export type Item = { amount: string; left: number; top: number; r: number; s: number; d: string };

/** Montos y lugar de cada propuesta: r = inclinación, s = escala (profundidad), d = desfase del movimiento. */
const ITEMS: Item[] = [
  { amount: "US$ 19,850", left: 446, top: 34, r: -7, s: 0.94, d: "0s" },
  { amount: "US$ 13,200", left: 478, top: 204, r: 5, s: 1.06, d: "-1.4s" },
  { amount: "US$ 20,550", left: 624, top: 100, r: 6, s: 0.9, d: "-2.6s" },
];

/** Lugares propios de algunos estilos. Colgantes (20/11): más altos y a los costados de la cabeza, sin taparle la cara.
 *  Al fondo: más grandes y detrás de la persona, que solo tapa la punta de cada ficha (los montos se leen enteros):
 *  ella señala la primera, la de arriba asoma detrás de su cabeza y la de abajo detrás de su brazo. */
const PLACES: Partial<Record<BadgeStyle, Item[]>> = {
  colgante: [
    { amount: "US$ 19,850", left: 440, top: 16, r: -6, s: 0.92, d: "0s" },
    { amount: "US$ 13,200", left: 456, top: 206, r: 4, s: 1.04, d: "-1.4s" },
    { amount: "US$ 20,550", left: 642, top: 26, r: 7, s: 0.86, d: "-2.6s" },
  ],
  fondo: [
    { amount: "US$ 19,850", left: 252, top: 122, r: -6, s: 0.92, d: "0s" },
    { amount: "US$ 13,200", left: 318, top: 210, r: 4, s: 0.92, d: "-2s" },
    { amount: "US$ 20,550", left: 566, top: -10, r: 5, s: 1, d: "-4s" },
  ],
};

const CSS = String.raw`
.lsb-chip { display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 15px 0 11px; border-radius: 9999px;
  font-size: 14px; font-weight: 800; letter-spacing: -0.01em; white-space: nowrap; position: relative; }
.lsb-amt { background: linear-gradient(193deg, #8460E5 0%, #3B1782 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

/* Colgantes: hilo desde el borde de arriba, argolla y ficha blanca con canto lila; se mece desde arriba. */
.lsb-hang { position: absolute; top: 0; display: flex; flex-direction: column; align-items: center; transform-origin: 50% 0;
  animation: lsb-swing 4.8s ease-in-out var(--d) infinite alternate; }
.lsb-hang__str { width: 1.5px; flex: 1; background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 100%); }
.lsb-hang__ring { width: 9px; height: 9px; margin-bottom: -4px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.9); position: relative; z-index: 1; }
.lsb-chip--hang { background: linear-gradient(180deg, #FFFFFF 0%, #F1EBFF 100%);
  box-shadow: inset 0 2px 0 #fff, inset 0 -3px 0 rgba(90,53,194,0.14), 0 3px 0 #D9CCFF, 0 5px 0 #BFA8FF, 0 20px 24px -6px rgba(34,0,92,0.5); }
@keyframes lsb-swing { from { transform: rotate(calc(var(--r) - 2.5deg)) scale(var(--s)); } to { transform: rotate(calc(var(--r) + 2.5deg)) scale(var(--s)); } }

/* Fichas 3D: perspectiva, canto violeta escalonado y sombra en el piso que se achica cuando sube. */
.lsb-float { position: absolute; perspective: 420px; animation: lsb-bob 3.8s ease-in-out var(--d) infinite; }
.lsb-chip--3d { transform: rotateX(16deg) rotateY(calc(var(--r) * -2.5)) rotateZ(var(--r)) scale(var(--s));
  background: linear-gradient(160deg, #FFFFFF 0%, #EEE7FF 100%);
  box-shadow: inset 0 2px 0 #fff, inset 0 -2px 4px rgba(90,53,194,0.16), 0 2px 0 #DCCFFF, 0 4px 0 #C6B2FF, 0 6px 0 #AE8EFF, 0 8px 0 #8460E5, 0 30px 32px -6px rgba(34,0,92,0.7), 0 10px 14px -4px rgba(34,0,92,0.35); }
.lsb-floor { position: absolute; left: 14%; right: 14%; bottom: -28px; height: 13px; border-radius: 50%; background: rgba(34,0,92,0.55); filter: blur(7px);
  animation: lsb-floor 3.8s ease-in-out var(--d) infinite; }
@keyframes lsb-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -7px; } }
@keyframes lsb-floor { 0%, 100% { translate: 0 0; scale: 1; opacity: 1; } 50% { translate: 0 7px; scale: 0.8; opacity: 0.7; } }

/* Inflados: botón naranja con volumen (brillo arriba a la izquierda, sombra interior abajo) y moneda; flota inclinado. */
.lsb-chip--puff { height: 42px; padding: 0 15px 0 7px; gap: 7px; color: #fff; font-size: 14px; text-shadow: 0 1px 2px rgba(34,0,92,0.5);
  transform: rotate(var(--r)) scale(var(--s));
  background: radial-gradient(130% 160% at 28% 12%, #D9C9FF 0%, #A88BF5 32%, #8460E5 58%, #5A35C2 100%);
  box-shadow: inset 0 3px 6px rgba(255,255,255,0.6), inset 0 -7px 12px rgba(34,0,92,0.5), 0 3px 0 #4A28A8, 0 24px 28px -8px rgba(34,0,92,0.65); }
.lsb-chip--puff::after { content: ""; position: absolute; left: 18px; top: 5px; width: 46%; height: 11px; border-radius: 9999px;
  background: linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0)); pointer-events: none; }
.lsb-coin { display: grid; place-items: center; width: 27px; height: 27px; border-radius: 50%; font-size: 14px; font-weight: 800; color: #fff; text-shadow: 0 1px 1px rgba(0,70,72,0.5);
  background: radial-gradient(120% 120% at 30% 20%, #B8FBFC 0%, #00C2C5 50%, #008688 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(34,0,92,0.45), 0 2px 4px rgba(34,0,92,0.35); }

/* Vidrio grueso: bloque translúcido con canto claro, sombra interior y un reflejo que cruza cada tanto. */
.lsb-chip--glass { height: 42px; overflow: hidden; transform: rotate(var(--r)) scale(var(--s));
  background: linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.22) 100%);
  -webkit-backdrop-filter: blur(10px) saturate(180%); backdrop-filter: blur(10px) saturate(180%);
  box-shadow: inset 0 2px 1px rgba(255,255,255,0.95), inset 0 -4px 8px rgba(90,53,194,0.28), inset 0 0 0 1.5px rgba(255,255,255,0.75),
    0 3px 0 rgba(255,255,255,0.4), 0 6px 0 rgba(174,142,255,0.35), 0 30px 34px -6px rgba(34,0,92,0.7), 0 10px 14px -4px rgba(34,0,92,0.35); }
.lsb-chip--glass .lsb-amt { background: linear-gradient(193deg, #5A35C2 0%, #22005C 100%); -webkit-background-clip: text; background-clip: text; }
.lsb-chip--glass::after { content: ""; position: absolute; top: -10px; bottom: -10px; left: -40%; width: 30%; transform: skewX(-20deg);
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.75), rgba(255,255,255,0)); animation: lsb-shine 5s ease-in-out var(--d) infinite; }
@keyframes lsb-shine { 0%, 60% { left: -40%; } 85%, 100% { left: 130%; } }

/* Al fondo: fichas grandes detrás de la persona (se dibujan antes que la foto), con canto lila y sombra amplia. */
.lsb-drift { position: absolute; animation: lsb-bob 6s ease-in-out var(--d) infinite; }
.lsb-chip--back { height: 54px; padding: 0 22px 0 14px; gap: 9px; font-size: 21px; transform: rotate(var(--r)) scale(var(--s));
  background: linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(236,228,255,0.92) 100%);
  box-shadow: inset 0 2px 0 #fff, inset 0 -3px 0 rgba(90,53,194,0.14), 0 3px 0 #D6C8FF, 0 6px 0 #B9A2FF, 0 28px 34px -10px rgba(34,0,92,0.55); }
.lsb-chip--back svg { width: 30px; height: 30px; }

@media (prefers-reduced-motion: reduce) { .lsb-hang, .lsb-float, .lsb-floor, .lsb-drift, .lsb-chip--glass::after { animation: none; } .lsb-hang { transform: rotate(var(--r)) scale(var(--s)); } }
`;

export function PriceBadges({ style, idp, places }: { style: Exclude<BadgeStyle, "original">; idp: string; places?: Item[] }): JSX.Element {
  return (
    <>
      <style href="landing-subascars-badges" precedence="default">{CSS}</style>
      {(places ?? PLACES[style] ?? ITEMS).map(function renderBadge(it, i) {
        const vars = { "--r": `${it.r}deg`, "--s": it.s, "--d": it.d } as CSSProperties;
        const id = `${idp}-${style}-${i}`;
        if (style === "colgante") return (
          <div key={id} className="lsb-hang" style={{ ...vars, left: it.left, height: it.top + 40 }}>
            <span className="lsb-hang__str" /><span className="lsb-hang__ring" />
            <span className="lsb-chip lsb-chip--hang"><MoneyIcon id={id} /><span className="lsb-amt">{it.amount}</span></span>
          </div>
        );
        if (style === "fondo") return (
          <div key={id} className="lsb-drift" style={{ ...vars, left: it.left, top: it.top }}>
            <span className="lsb-chip lsb-chip--back"><MoneyIcon id={id} /><span className="lsb-amt">{it.amount}</span></span>
          </div>
        );
        if (style === "inflado") return (
          <div key={id} className="lsb-float" style={{ ...vars, left: it.left, top: it.top - 2 }}>
            <span className="lsb-chip lsb-chip--puff"><span className="lsb-coin" aria-hidden="true">$</span>{it.amount}</span>
            <span className="lsb-floor" aria-hidden="true" />
          </div>
        );
        return (
          <div key={id} className="lsb-float" style={{ ...vars, left: it.left, top: it.top }}>
            <span className={`lsb-chip ${style === "ficha" ? "lsb-chip--3d" : "lsb-chip--glass"}`}><MoneyIcon id={id} /><span className="lsb-amt">{it.amount}</span></span>
            <span className="lsb-floor" aria-hidden="true" />
          </div>
        );
      })}
    </>
  );
}
