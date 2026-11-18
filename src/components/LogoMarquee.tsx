/**
 * LogoMarquee — franja de logos en bucle infinito (vmc-index-lab, CompaniesSection, vista «Slider»).
 * En el Index: «Empresas que publican en VMC». Cada logo va en una tarjeta blanca con una línea debajo (p. ej. «3 lotes»).
 * La pista lleva la lista repetida y se desplaza -50 %, así el corte no se ve. Se pausa con el puntero o el foco;
 * los bordes se desvanecen. Se mueve también con «reducir animaciones» (pedido de producto).
 * Solo la primera vuelta es navegable y la lee el lector de pantalla; las copias son decorativas.
 * Solo depende de React.
 */
import type { CSSProperties, JSX } from "react";

export type LogoMarqueeItem = {
  /** Nombre (texto alternativo y etiqueta accesible). */
  name: string;
  logo: string;
  /** Línea debajo del logo, p. ej. «3 lotes». */
  caption?: string;
  href?: string;
};

export interface LogoMarqueeProps {
  items: LogoMarqueeItem[];
  /** Segundos por vuelta. */
  duration?: number;
  /** Veces que se repite la lista en cada mitad de la pista (súbelo si hay pocos logos y la franja es muy ancha). */
  repeat?: number;
  ariaLabel?: string;
  className?: string;
}

export const LOGO_MARQUEE_CSS = String.raw`
.lmq { position: relative; overflow: hidden; padding: 6px 0 10px; font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%); }
.lmq__track { display: flex; gap: 16px; width: max-content; animation: lmq-run var(--lmq-dur, 26s) linear infinite; }
.lmq:hover .lmq__track, .lmq:focus-within .lmq__track { animation-play-state: paused; }
@keyframes lmq-run { to { transform: translateX(calc(-50% - 8px)); } }
.lmq__item { box-sizing: border-box; display: grid; justify-items: center; align-content: center; gap: 6px; width: 168px; height: 92px; padding: 10px;
  border-radius: 8px; background: #fff; color: inherit; text-decoration: none; box-shadow: rgba(0,0,0,0.07) 0 0 16px 4px;
  transition: transform 150ms cubic-bezier(0.3,0,0,1), box-shadow 150ms cubic-bezier(0.3,0,0,1); }
.lmq__item:hover { transform: translateY(-2px); box-shadow: oklch(0.22 0.18 285 / 0.12) 0 12px 20px; }
.lmq__item:focus-visible { outline: 2px solid #8460e5; outline-offset: 2px; }
.lmq__item img { display: block; max-width: 120px; max-height: 40px; object-fit: contain; }
.lmq__item small { font-size: 11px; color: #5b5b66; }
`;

export default function LogoMarquee({ items, duration = 26, repeat = 2, ariaLabel = "Empresas", className = "" }: LogoMarqueeProps): JSX.Element {
  const half = Array.from({ length: repeat }, () => items).flat();
  return (
    <div className={`lmq${className ? ` ${className}` : ""}`} role="region" aria-label={ariaLabel} style={{ "--lmq-dur": `${duration}s` } as CSSProperties}>
      <style href="concorde-logo-marquee" precedence="default">{LOGO_MARQUEE_CSS}</style>
      <div className="lmq__track">
        {[...half, ...half].map((c, k) => {
          const copy = k >= items.length;
          const label = c.caption ? `${c.name} · ${c.caption}` : c.name;
          const body = <><img src={c.logo} alt="" />{c.caption ? <small>{c.caption}</small> : null}</>;
          return c.href
            ? <a key={k} href={c.href} className="lmq__item" aria-label={label} aria-hidden={copy || undefined} tabIndex={copy ? -1 : undefined}>{body}</a>
            : <div key={k} className="lmq__item" role={copy ? undefined : "img"} aria-label={copy ? undefined : label} aria-hidden={copy || undefined}>{body}</div>;
        })}
      </div>
    </div>
  );
}
