"use client";

/**
 * VehicleRow — fila de vehículo de Tu actividad en Mi Garaje (mi-garaje-lab · Garaje, antes «FRow»; también la fila de
 * Mis publicaciones). Foto, nombre y año (con el plazo para responder cuando lo hay), detalle en una línea (se desplaza si
 * no entra) y un lado derecho libre para el estado: badge, punto, tiempo o botón. Con `onClick` es un botón con flecha;
 * sin él, una fila de solo lectura. Las filas nuevas o sin abrir van en negrita.
 * Usa Countdown y framer-motion (solo con `layoutId`, para que la fila viaje entre secciones).
 */
import type { AnimationEvent, CSSProperties, JSX, ReactNode } from "react";
import { motion, type Transition } from "framer-motion";
import { Countdown } from "@/src/components/Countdown";

export const VEHICLE_ROW_CSS = String.raw`
/* Tres anchos, los de Mi Garaje: base (830–1023 px), móvil (hasta 829 px) y escritorio (desde 1024 px). */
.fr { all:unset; box-sizing:border-box; position:relative; width:100%; cursor:pointer; display:grid; grid-template-columns:64px minmax(0,1fr) auto 20px; gap:16px; align-items:center; padding:12px; border-radius:12px; transition:background-color .15s; }
.fr:focus-visible { outline:2px solid #8460E5; outline-offset:-2px; }
.fr:active { transform:scale(.996); }
.fr:hover, .fr.is-new:hover { background:#F4F3F7; }
.fr__img { position:relative; display:block; width:64px; height:48px; }
.fr img { width:64px; height:48px; object-fit:cover; border-radius:10px; }
.fr__main { display:grid; gap:2px; min-width:0; }
/* Leída: nombre y detalle en peso liviano; el detalle en gris. Nueva o sin abrir: todo en negrita y negro. */
.fr__name { display:block; align-items:center; gap:8px; min-width:0; font-size:.9375rem; font-weight:400; color:#191C1C; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.fr__meta { display:block; min-width:0; font-size:.875rem; font-weight:300; color:#6B6878; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-variant-numeric:tabular-nums; }
.fr__side { display:grid; justify-items:end; align-items:center; gap:4px; }
.fr__side small { font-size:.75rem; font-weight:300; color:color-mix(in srgb,#191C1C 64%,#fff); font-variant-numeric:tabular-nums; }
/* Tiempo del último movimiento (small.fr__ago): baja a la línea del detalle. */
.fr__side:has(> .fr__ago) { align-self:stretch; grid-template-rows:1fr 1fr; }
.fr__side > .fr__ago { grid-row:2; color:#6B6878; white-space:nowrap; }
:where(.fr__side):has(.badgestatus) { align-self:stretch; align-items:center; }
/* Plazo para responder junto al nombre: solo la cifra (la etiqueta queda para lectores de pantalla). */
.fr__name .fr__timer { display:inline-flex; flex:none; align-items:center; margin-left:6px; padding-left:8px; border-left:1px solid #D9D6E1; }
.fr.is-new .fr__name .fr__timer { border-left:2px solid #191C1C; }
.fr__timer .cp-count { justify-items:end; gap:0; }
.fr__timer .cp-count small { display:none; }
.fr__timer .cp-count b { font-family:inherit; font-size:.75rem; font-weight:inherit; line-height:1.2; color:inherit; white-space:nowrap; }
.fr__dot { flex:none; width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#CC00FF,#FF0066); }
.fr .g-chev { color:#ED8936; }
@media (max-width:829px) {
  .fr { grid-template-columns:56px minmax(0,1fr) auto 18px; grid-template-areas:"img main side chev"; }
  .fr__img, .fr img { grid-area:img; width:56px; height:44px; }
  .fr__main { grid-area:main; } .fr .g-chev { grid-area:chev; align-self:center; }
  .fr__side { grid-area:side; gap:2px; margin:0; text-align:right; }
}
@media (min-width:1024px) {
  .fr { grid-template-columns:48px minmax(0,1fr) auto; grid-template-areas:"img main side"; gap:0 12px; }
  .fr__img, .fr img { grid-area:img; align-self:center; width:48px; height:36px; border-radius:6px; }
  .fr__main { grid-area:main; gap:4px; }
  .fr__name { font-size:.875rem; font-weight:300; }
  .fr__meta { font-size:.75rem; line-height:1.4; text-wrap-style:balance; }
  .fr__side { grid-area:side; margin:0; text-align:right; }
  .fr__side small { line-height:1.4; color:#6B6878; }
  .fr .g-chev { display:none; width:16px; height:16px; }
  /* EN VIVO: un poco más abajo que el centro, a la altura del detalle. */
  .fr__side:has(> .badgestatus--live) { transform:translateY(8px); }
}
/* Nueva o sin abrir: todo en negrita y negro (después de los anchos para que les gane). El lado derecho toma dos pistas. */
.fr.is-new .fr__name, .fr.is-unread .fr__name { font-weight:700; color:#191C1C; }
.fr.is-new .fr__meta, .fr.is-unread .fr__meta { font-weight:600; color:#191C1C; }
.fr.is-new .fr__side small, .fr.is-unread .fr__side small { font-weight:700; color:#191C1C; }
.fr.is-new .fr__side { align-self:stretch; grid-template-rows:1fr 1fr; align-items:center; }
@media (prefers-reduced-motion:reduce) { .fr { transition:none; } .fr:active { transform:none; } }
`;

export interface VehicleRowProps {
  /** URL de la foto del vehículo (se recorta a 64 × 48; 56 × 44 bajo 830 px). */
  photo: string;
  /** Marca y modelo (p. ej. «Nissan Sentra»). */
  name: string;
  /** Año del vehículo. */
  year: number | string;
  /** Algo antes del nombre (en Mis publicaciones, el pin de la fijada). */
  namePrefix?: ReactNode;
  /** Plazo para responder (timestamp en ms): muestra la cuenta regresiva junto al nombre. */
  respondBy?: number;
  /** Detalle de la fila (p. ej. «Tú: US$ 14,500 (1/5)»). */
  meta: ReactNode;
  /** Clases extra del detalle. */
  metaClassName?: string;
  /** El detalle se desplaza de lado (marquesina) en vez de cortarse; la animación la pone quien usa la fila. */
  marquee?: boolean;
  /** Lado derecho: badge, punto, tiempo o botón. Sin `side` no se dibuja la columna. */
  side?: ReactNode;
  /** Recién llegada: en negrita. */
  isNew?: boolean;
  /** Sin abrir: en negrita. */
  unread?: boolean;
  /** Al tocar la fila. Con onClick la fila es un botón con flecha; sin él, solo lectura. */
  onClick?: () => void;
  /** La fila abre un diálogo (aria-haspopup). */
  opensDialog?: boolean;
  /** layoutId de framer-motion: la fila se anima al cambiar de lugar o de sección (solo filas con onClick). */
  layoutId?: string;
  /** Transición de framer-motion para el viaje de la fila. */
  transition?: Transition;
  /** Clases extra de la fila (estados y variantes de quien la usa). */
  className?: string;
  /** Estilos en línea de la fila (solo filas de solo lectura). */
  style?: CSSProperties;
  /** Al terminar una animación CSS de la fila (solo filas de solo lectura). */
  onAnimationEnd?: (e: AnimationEvent<HTMLElement>) => void;
  /** Atributos data-* de la fila, sin el prefijo (p. ej. { "row-id": "sf1" }). */
  data?: Record<string, string | undefined>;
  /** Capas encima de la fila (avisos o guías), después del lado derecho. */
  children?: ReactNode;
}

const Chevron = () => <svg className="g-chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function VehicleRow({ photo, name, year, namePrefix, respondBy, meta, metaClassName, marquee, side, isNew, unread, onClick, opensDialog, layoutId, transition, className, style, onAnimationEnd, data, children }: VehicleRowProps): JSX.Element {
  const cls = `fr${isNew ? " is-new" : ""}${unread ? " is-unread" : ""}${marquee ? " fr--marquee" : ""}${className ? ` ${className}` : ""}`;
  const attrs = Object.fromEntries(Object.entries(data ?? {}).map(([k, v]) => [`data-${k}`, v]));
  const body = <>
    <span className="fr__img"><img src={photo} alt="" width={64} height={48} /></span>
    <span className="fr__main">
      <span className="fr__name">{namePrefix}{name} {year}{respondBy ? <span className="fr__timer"><Countdown to={respondBy} label="Tiempo para responder" /></span> : null}</span>
      <span className={`fr__meta${marquee ? " fr__meta--marquee" : ""}${metaClassName ? ` ${metaClassName}` : ""}`}>{marquee ? <span className="fr__marquee">{meta}</span> : meta}</span>
    </span>
    {side !== undefined && side !== null ? <span className="fr__side">{side}</span> : null}
    {children}
    {onClick ? <Chevron /> : null}
  </>;
  const styles = <style href="concorde-vehicle-row" precedence="default">{VEHICLE_ROW_CSS}</style>;
  if (onClick && layoutId) return <>{styles}
    <motion.button type="button" {...attrs} layout layoutId={layoutId} transition={transition} className={cls} onClick={onClick} aria-haspopup={opensDialog ? "dialog" : undefined}>{body}</motion.button>
  </>;
  if (onClick) return <>{styles}
    <button type="button" {...attrs} className={cls} onClick={onClick} aria-haspopup={opensDialog ? "dialog" : undefined}>{body}</button>
  </>;
  return <>{styles}<div {...attrs} className={cls} style={style} onAnimationEnd={onAnimationEnd}>{body}</div></>;
}

export default VehicleRow;
