/**
 * AddButton — acción secundaria «agregar otro» al final de una lista (mi-garaje-lab · Mis valorizaciones: «Valorizar otro vehículo»).
 * Fila delgada con borde punteado lila y un + en círculo, para que no compita con las tarjetas. Solo depende de React.
 */
import type { JSX } from "react";

export const ADD_BUTTON_CSS = String.raw`
.vz-add { all:unset; box-sizing:border-box; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; min-height:52px; padding:0 16px; border-radius:12px; border:1.5px dashed #D9CFF5; font-size:.9375rem; font-weight:700; color:#5A35C2; transition:background-color .15s; }
.vz-add span { display:grid; place-items:center; width:28px; height:28px; border-radius:9999px; background:#F5F0FF; }
.vz-add:hover { background:#F8F6FC; }
.vz-add:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
@media (prefers-reduced-motion:reduce) { .vz-add { transition:none; } }
`;

export interface AddButtonProps {
  /** Texto de la acción (p. ej. «Valorizar otro vehículo»). */
  children: string;
  /** Se llama al tocar la fila. */
  onClick: () => void;
}

export function AddButton({ children, onClick }: AddButtonProps): JSX.Element {
  return <>
    <style href="concorde-add-button" precedence="default">{ADD_BUTTON_CSS}</style>
    <button type="button" className="vz-add" onClick={onClick}>
      <span aria-hidden><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></span>{children}</button>
  </>;
}

export default AddButton;
