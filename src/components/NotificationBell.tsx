"use client";

/**
 * NotificationBell — campana de vidrio con el número magenta de novedades (Mi Garaje, /blocks/mi-garaje/m/vmc: header, a la
 * izquierda de «Bienvenido»). Círculo translúcido con borde lila y el ícono esmerilado «alertas» de Vidrio. Con cada novedad
 * la campana se mece y el número entra con rebote. Abre la bandeja (NotificationInbox); dónde va en el header lo decide quien
 * la usa. Depende de React y Vidrio.
 */
import type { JSX } from "react";
import { Vidrio } from "@/src/components/Vidrio";

export const NOTIFICATION_BELL_CSS = String.raw`
.nt-bell { position:relative; display:grid; place-items:center; width:40px; height:40px; padding:0; border:2px solid rgba(207,186,255,.55); border-radius:50%; color:#fff; cursor:pointer;
  background:rgba(255,255,255,.12); box-shadow:inset 0 1px 0 rgba(255,255,255,.25), 0 4px 14px rgba(0,0,0,.2); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px);
  transition:transform .2s cubic-bezier(.25,.8,.25,1), box-shadow .25s; }
.nt-bell:hover { transform:translateY(-2px) scale(1.04); background:rgba(255,255,255,.2); box-shadow:inset 0 1px 0 rgba(255,255,255,.3), 0 8px 20px rgba(132,96,229,.35); }
.nt-bell:focus-visible { outline:2px solid #fff; outline-offset:3px; }
.nt-bell .vd { overflow:visible; }
.nt-bell__icon { display:grid; place-items:center; transform-origin:50% 8%; animation:nt-ring .9s ease-in-out .15s both; }
@keyframes nt-ring { 0%, 100% { transform:rotate(0); } 15% { transform:rotate(16deg); } 30% { transform:rotate(-14deg); } 45% { transform:rotate(10deg); } 60% { transform:rotate(-6deg); } 75% { transform:rotate(3deg); } }
.nt-badge { position:absolute; top:-4px; right:-4px; z-index:1; display:grid; place-items:center; min-width:20px; height:20px; padding:0 5px; box-sizing:border-box;
  border-radius:9999px; background:linear-gradient(135deg, #CC00FF 0%, #FF0066 100%); color:#fff; font:800 11px/1 var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); font-style:normal;
  box-shadow:0 0 0 2px #2E0F70, 0 2px 8px rgba(255,0,102,.45); pointer-events:none; animation:nt-pop .62s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes nt-pop { 0% { transform:scale(0); } 45% { transform:scale(1.35); } 65% { transform:scale(.88); } 82% { transform:scale(1.08); } 100% { transform:scale(1); } }
@media (max-width:1023px) { .nt-bell { width:36px; height:36px; } }
`;

export interface NotificationBellProps {
  /** Novedades sin leer. Con 0 no hay número; con más de 9 dice «9+». */
  count: number;
  /** La bandeja está abierta. */
  expanded: boolean;
  /** Al tocar la campana (abre o cierra la bandeja). */
  onClick: () => void;
  /** Cambia con cada novedad que llega: la campana se vuelve a mecer y el número entra con rebote. */
  arrival?: number;
}

export function NotificationBell({ count, expanded, onClick, arrival = 0 }: NotificationBellProps): JSX.Element {
  return <>
    <style href="concorde-notification-bell" precedence="default">{NOTIFICATION_BELL_CSS}</style>
    <button type="button" data-nt-opener className="nt-bell nt-bell--glass vd-host" aria-label={count ? `Notificaciones: ${count} sin leer` : "Notificaciones"} aria-expanded={expanded} onClick={onClick}>
      <span key={arrival} className="nt-bell__icon"><Vidrio s="alertas" size={30} /></span>
      {count ? <b key={`n${arrival}`} className="nt-badge" aria-hidden>{count > 9 ? "9+" : count}</b> : null}
    </button>
  </>;
}

export default NotificationBell;
