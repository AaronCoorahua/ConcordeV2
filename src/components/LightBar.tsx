/** LightBar: barra llena con una luz que la recorre; naranja en vivo, turquesa en Recibe ofertas. Solo depende de React. Viene de vmc-index-lab (app/components/lib). */
import type { CSSProperties, JSX } from "react";

/** Estilos del componente (antes en light-bar.css). Se inyectan una sola vez por página. */
export const LIGHT_BAR_CSS = String.raw`
/* LightBar */
@keyframes vlb-run { from { left: -30%; } to { left: 100%; } }
.vlb { position: relative; display: block; flex: none; width: 100%; height: var(--vlb-h, 9px); overflow: hidden; }
.vlb > i { position: relative; display: block; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(90deg, #FF9639, #EF852E 60%, #BE3D00); }
.vlb--negotiable > i { background: linear-gradient(90deg, #00DAE0, #008688); }
/* Luz que cruza de izquierda a derecha */
.vlb > i::after { content: ""; position: absolute; top: 0; width: 30%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: vlb-run 1.8s linear infinite; }
`;

export type LightBarTone = "live" | "negotiable";

export type LightBarProps = {
  /** live = naranja (en vivo); negotiable = turquesa (Recibe ofertas). */
  tone?: LightBarTone;
  /** Alto en px (9 en la carta). */
  height?: number;
  className?: string;
};

export function LightBar({ tone = "live", height = 9, className = "" }: LightBarProps): JSX.Element {
  return <>
    <style href="concorde-light-bar" precedence="default">{LIGHT_BAR_CSS}</style>
    <span className={`vlb vlb--${tone}${className ? ` ${className}` : ""}`} aria-hidden style={{ "--vlb-h": `${height}px` } as CSSProperties}><i /></span>
  </>;
}

export default LightBar;
