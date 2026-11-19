"use client";

/**
 * SidePanel — panel lateral de Mi Garaje (/blocks/mi-garaje/m/vmc: la vista rápida que abre una fila de Tu actividad). Es un
 * <dialog> nativo (foco atrapado, Esc lo cierra): en escritorio entra desde la derecha a todo el alto (460 px); bajo 768 px es
 * una hoja que sube desde abajo (88 % del alto, esquinas de 24 px). Al cerrarse se desliza hacia donde vino y recién ahí se
 * desmonta. Tocar el velo también lo cierra. El contenido (encabezado, negociación, pie) lo pone quien lo usa.
 * Solo depende de React.
 */
import { useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";

export const SIDE_PANEL_CSS = String.raw`
.g-qv { padding:0; border:0; margin:0 0 0 auto; width:min(460px,100vw); max-width:none; height:100dvh; max-height:none; background:transparent; overflow:visible; }
.g-qv::backdrop { background:rgba(16,0,48,.45); backdrop-filter:blur(2px); }
.g-qv[open] { animation:g-qv-in .28s cubic-bezier(.16,1,.3,1); }
@keyframes g-qv-in { from { transform:translateX(32px); opacity:0; } }
.g-qv__panel { height:100%; background:#fff; box-shadow:-20px 0 60px rgba(16,0,48,.25); }
@media (max-width:767px) {
  .g-qv { inset:auto 0 0 0; margin:0; width:100vw; height:auto; max-height:88dvh; }
  .g-qv[open] { animation-name:g-qv-up; }
  .g-qv__panel { height:auto; max-height:88dvh; border-radius:24px 24px 0 0; overflow:hidden; box-shadow:0 -20px 60px rgba(16,0,48,.25); }
}
@keyframes g-qv-up { from { transform:translateY(40px); opacity:0; } }
.g-qv__panel { display:flex; flex-direction:column; overflow-y:auto; overscroll-behavior:contain; }
html:has(dialog.g-qv[open]) { overflow:hidden; }
.g-qv.is-closing { animation:g-qv-out .3s cubic-bezier(.55,0,.75,.2) .06s forwards; }
.g-qv.is-closing::backdrop { animation:g-qv-fade .62s ease forwards; }
@keyframes g-qv-out { to { transform:translateX(100%); } }
@keyframes g-qv-fade { to { opacity:0; } }
@keyframes g-qv-down { to { transform:translateY(100%); } }
@media (max-width:767px) { .g-qv.is-closing { animation-name:g-qv-down; } }
@media (prefers-reduced-motion:reduce) { .g-qv[open], .g-qv.is-closing, .g-qv.is-closing::backdrop { animation:none; } }
`;

export interface SidePanelProps {
  /** Abierto. Al pasar a false se cierra sin animación (para la salida animada, `close` o `closeSignal`). */
  open: boolean;
  /** Se llama cuando terminó de cerrarse (Esc, velo, `close` o `closeSignal`). */
  onClose: () => void;
  /** id del título del panel (aria-labelledby). */
  labelledBy: string;
  /** Cambia (sube) para pedir que se cierre con su animación desde fuera. */
  closeSignal?: number;
  /** Contenido; recibe `close`, que lo cierra con su animación (para el botón de cerrar del encabezado). */
  children: (close: () => void) => ReactNode;
}

export function SidePanel({ open, onClose, labelledBy, closeSignal = 0, children }: SidePanelProps): JSX.Element {
  // El diálogo va en estado (ref de callback) para que `close` no lea un ref durante el render.
  const [d, setD] = useState<HTMLDialogElement | null>(null);
  // Se cierra deslizándose (a la derecha en escritorio, hacia abajo en móvil) y recién ahí se desmonta; el temporizador es de respaldo.
  const close = () => { if (!d || matchMedia("(prefers-reduced-motion: reduce)").matches) { onClose(); return; }
    let t = 0; const end = (e?: AnimationEvent) => { if (e && e.target !== d) return; d.removeEventListener("animationend", end); clearTimeout(t); onClose(); };
    d.addEventListener("animationend", end); t = window.setTimeout(end, 500); d.classList.add("is-closing"); };
  useEffect(() => { if (!d) return; if (open && !d.open) { d.classList.remove("is-closing"); d.showModal(); } if (!open && d.open) d.close(); }, [open, d]);
  useEffect(() => { if (closeSignal && open) close(); }, [closeSignal]); // eslint-disable-line react-hooks/exhaustive-deps
  return <>
    <style href="concorde-side-panel" precedence="default">{SIDE_PANEL_CSS}</style>
    <dialog ref={setD} className="g-qv" aria-labelledby={labelledBy} onClose={onClose} onCancel={(e) => { e.preventDefault(); close(); }} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      {open ? <div className="g-qv__panel">{children(close)}</div> : null}
    </dialog>
  </>;
}

export default SidePanel;
