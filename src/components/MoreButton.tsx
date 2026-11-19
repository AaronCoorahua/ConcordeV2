/**
 * MoreButton — botón redondo «⋯» de más acciones (Mi Garaje, /blocks/mi-garaje/m/vmc · Mis publicaciones: filas Publicada y
 * Vendido). Morado, sin fondo; al pasar o con el menú abierto toma un círculo lila. Abre ActionList. Solo depende de React.
 */
import type { JSX } from "react";

export const MORE_BUTTON_CSS = String.raw`
.mp-more__btn { display:grid; place-items:center; width:32px; height:32px; padding:0; border:0; border-radius:50%; background:transparent; color:#3B1782; cursor:pointer; }
.mp-more__btn:hover, .mp-more__btn[aria-expanded="true"] { background:#F3EFFD; }
.mp-more__btn:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
`;

export interface MoreButtonProps {
  /** Nombre accesible (p. ej. «Más acciones: Toyota Etios 2020»). */
  label: string;
  /** La lista de acciones está abierta. */
  expanded: boolean;
  /** id de la lista que abre. */
  controls: string;
  /** Al tocarlo. */
  onClick: () => void;
}

export function MoreButton({ label, expanded, controls, onClick }: MoreButtonProps): JSX.Element {
  return <>
    <style href="concorde-more-button" precedence="default">{MORE_BUTTON_CSS}</style>
    <button type="button" className="mp-more__btn" aria-label={label} aria-expanded={expanded} aria-controls={controls} onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden><circle cx="4" cy="10" r="1.8" fill="currentColor" /><circle cx="10" cy="10" r="1.8" fill="currentColor" /><circle cx="16" cy="10" r="1.8" fill="currentColor" /></svg>
    </button>
  </>;
}

export default MoreButton;
