/**
 * ActionList — acciones de una fila abiertas desde MoreButton (Mi Garaje, /blocks/mi-garaje/m/vmc · Mis publicaciones). Tarjeta
 * blanca dentro de la misma fila, a todo el ancho: un renglón por acción con su ícono y una flecha («Dar de baja», en rojo,
 * con el tacho). Una acción sin ícono va como ProfileButton («Ver detalle de la venta»). Esc la cierra.
 * Depende de React y ProfileButton.
 */
import type { JSX, KeyboardEvent } from "react";
import ProfileButton from "@/src/components/ProfileButton";

export const ACTION_LIST_CSS = String.raw`
.mp-acts { display:grid; align-items:center; gap:0; padding:4px; border-radius:12px; background:#fff; box-shadow:inset 0 0 0 1px #ECE8F7; animation:mp-acts-in .2s cubic-bezier(.2,.8,.2,1); font-family:var(--vmc-font-display); }
@keyframes mp-acts-in { from { opacity:0; transform:translateY(-6px); } }
.mp-acts svg { flex:none; width:16px; height:16px; }
.mp-acts button { font-family:inherit; line-height:1.2; cursor:pointer; }
.mp-acts button:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
.mp-acts__go, .mp-acts__danger { display:inline-flex; align-items:center; gap:6px; width:100%; min-height:44px; padding:0 12px; border:0; border-radius:8px; background:none; font-size:14px; font-weight:600; transition:background-color .15s, transform .15s; }
.mp-acts__go { color:#3B1782; } .mp-acts__danger { color:#B42318; }
.mp-acts :is(.mp-acts__go, .mp-acts__danger):hover { background:#F6F4FB; }
.mp-acts button + button { box-shadow:0 -1px 0 #F0EDF8; }
.mp-acts__chev { margin-left:auto; color:#B3A8DA; }
@media (prefers-reduced-motion:reduce) { .mp-acts { animation:none; } .mp-acts button { transition:none; } }
`;

/** Una acción de la lista. */
export interface ActionListItem {
  /** Texto (p. ej. «Dar de baja»). */
  label: string;
  /** Ícono: el tacho. Sin ícono, la acción va como ProfileButton. */
  icon?: "trash";
  /** Acción destructiva: en rojo. */
  danger?: boolean;
}

export interface ActionListProps {
  /** id de la lista (lo usa aria-controls de MoreButton). */
  id: string;
  /** Nombre accesible (p. ej. «Acciones: Toyota Etios 2020»). */
  label: string;
  /** Acciones, en orden. */
  items: ActionListItem[];
  /** Al elegir una acción (recibe su índice). */
  onPick: (index: number) => void;
  /** Esc dentro de la lista. */
  onClose: () => void;
}

const PATH = { trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" } as const;

export function ActionList({ id, label, items, onPick, onClose }: ActionListProps): JSX.Element {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => { if (e.key === "Escape") onClose(); };
  return <>
    <style href="concorde-action-list" precedence="default">{ACTION_LIST_CSS}</style>
    <div id={id} className="mp-acts" role="group" aria-label={label} onKeyDown={onKeyDown}>
      {items.map((a, i) => !a.icon ? <ProfileButton key={a.label} onClick={() => onPick(i)}>{a.label}</ProfileButton>
        : <button key={a.label} type="button" className={a.danger ? "mp-acts__danger" : "mp-acts__go"} autoFocus={i === 0} onClick={() => onPick(i)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={PATH[a.icon]} /></svg>{a.label}
          <svg className="mp-acts__chev" width="16" height="16" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>)}
    </div>
  </>;
}

export default ActionList;
