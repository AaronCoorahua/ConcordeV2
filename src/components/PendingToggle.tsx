/**
 * PendingToggle — interruptor «Pendientes» con su número (Mi Garaje, /blocks/mi-garaje/m/vmc: encabezado de Tu actividad).
 * Prendido deja a la vista solo lo que está sin abrir. Riel gris que pasa a naranja, texto y el número en una píldora violeta.
 * Solo depende de React.
 */
import type { JSX } from "react";

export const PENDING_TOGGLE_CSS = String.raw`
.f-only { all:unset; box-sizing:border-box; cursor:pointer; display:inline-flex; align-items:center; gap:10px; min-height:36px; padding:0 4px; font-size:.875rem; font-weight:600; color:#3B1782; }
.f-only b { min-width:20px; height:20px; display:inline-grid; place-items:center; padding:0 6px; border-radius:9999px; font-size:.75rem; font-weight:600; line-height:1; color:#fff; background:#3B1782; font-variant-numeric:tabular-nums; }
.f-only__track { position:relative; width:36px; height:20px; border-radius:9999px; background:#C9CCCB; transition:background-color .15s; }
.f-only__track i { position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:9999px; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.25); transition:transform .15s; }
.f-only[aria-checked="true"] .f-only__track { background:var(--vmc-color-orange-600,#ED8936); }
.f-only[aria-checked="true"] .f-only__track i { transform:translateX(16px); }
.f-only:focus-visible { outline:2px solid #8460E5; outline-offset:2px; border-radius:8px; }
@media (min-width:1024px) { .f-only { font-weight:400; color:#191C1C; } }
@media (prefers-reduced-motion:reduce) { .f-only__track, .f-only__track i { transition:none; } }
`;

export interface PendingToggleProps {
  /** Cuántas novedades sin abrir hay (va en la píldora). */
  count: number;
  /** Prendido: solo lo pendiente. */
  checked: boolean;
  /** Al tocarlo. */
  onToggle: () => void;
}

export function PendingToggle({ count, checked, onToggle }: PendingToggleProps): JSX.Element {
  return <>
    <style href="concorde-pending-toggle" precedence="default">{PENDING_TOGGLE_CSS}</style>
    <button type="button" role="switch" aria-checked={checked} className="f-only vd-host" onClick={onToggle}><span className="f-only__track" aria-hidden><i /></span>Pendientes <b>{count}</b></button>
  </>;
}

export default PendingToggle;
