"use client";

/** Piezas de Mi Garaje (mi-garaje-lab · plus-parts). Countdown y RiskMeter ya son componentes de Concorde;
 *  aquí queda StampTitle, que solo usa este bloque. */
import { useId } from "react";
import type { JSX, ReactNode } from "react";
import "./concorde-plus.css";

export { Countdown } from "@/src/components/Countdown";
export { RiskMeter } from "@/src/components/RiskMeter";

// ─── StampTitle: extensión de CardTitle para títulos de sección. ──
// Un solo bracket (esquina sup. izq.) en vez de dos: el sello completo queda para la página
// y el grupo «Tu actividad». A diferencia de CardTitle, el título puede partirse en dos líneas.
export function StampTitle({ children, sub, as: H = "h2" }: { children: ReactNode; sub?: string; as?: "h2" | "h3" }): JSX.Element {
  const uid = useId().replace(/:/g, "");
  return <div className="g-stamp">
    <svg className="g-stamp__corner" width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M7 1.022H3.769C1.923 1.022 1 1.943 1 3.784V7.007" stroke={`url(#${uid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs><linearGradient id={uid} x1="4" y1="1.022" x2="4" y2="7.007" gradientUnits="userSpaceOnUse"><stop stopColor="#F4AC59" /><stop offset="0.4" stopColor="#ED8936" /><stop offset="1" stopColor="#B25614" /></linearGradient></defs>
    </svg>
    <H>{children}</H>{sub ? <p>{sub}</p> : null}
  </div>;
}
