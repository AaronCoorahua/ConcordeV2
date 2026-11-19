/**
 * NotificationBox — aviso «Nueva notificación» (Mi Garaje, /blocks/mi-garaje/m/vmc: arriba a la derecha cuando llega una
 * novedad). Entra por la derecha, se sostiene y se recoge hacia la campana (2,4 s); quien lo usa lo desmonta al terminar.
 * Tocar la novedad la abre. Dónde aparece (posición fija) lo decide quien lo usa. Solo depende de React.
 */
import type { JSX } from "react";

export const NOTIFICATION_BOX_CSS = String.raw`
.nt-box { width:320px; box-sizing:border-box; display:grid; border-radius:16px; background:#fff; color:#3B1782; box-shadow:0 16px 40px rgba(34,0,92,.22), 0 0 0 1px #E8DEFF; overflow:hidden;
  font-family:var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); animation:nt-box-to-bell 2.4s cubic-bezier(.22,.78,.22,1) both; transform-origin:100% 0; }
@keyframes nt-box-to-bell { 0% { opacity:0; transform:translateX(32px) scale(.96); } 12%,72% { opacity:1; transform:translateX(0) scale(1); } 100% { opacity:0; transform:translate(40px,-28px) scale(.52); } }
.nt-box header { display:flex; align-items:center; gap:8px; padding:12px 8px 8px 16px; } .nt-box header b { font-size:.9375rem; font-weight:700; }
.nt-box ul { margin:0; padding:0 6px; list-style:none; overflow:auto; }
.nt-box li { animation:nt-row .5s cubic-bezier(.05,.7,.1,1) both; }
@keyframes nt-row { from { opacity:0; transform:translateY(-6px); background:#F5F0FF; } }
.nt-box li button { display:flex; align-items:center; gap:12px; width:100%; padding:10px; border:0; border-radius:12px; background:none; text-align:left; font:inherit; color:inherit; cursor:pointer; }
.nt-box li button:hover { background:#F5F0FF; }
.nt-box img { flex:none; width:48px; height:38px; border-radius:8px; object-fit:cover; }
.nt-box li span { display:grid; gap:2px; flex:1; min-width:0; }
.nt-box li b { font-size:.8125rem; font-weight:700; color:#191C1C; }
.nt-box li small { font-size:.75rem; color:#6B6878; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.nt-box li em { flex:none; align-self:start; font-style:normal; font-size:.6875rem; color:#8A8698; }
@media (prefers-reduced-motion:reduce) { .nt-box { animation:none; } }
`;

export interface NotificationBoxProps {
  /** URL de la foto del vehículo. */
  photo: string;
  /** Qué pasó (p. ej. «El vendedor respondió tu propuesta»). */
  title: string;
  /** Vehículo y detalle. */
  body: string;
  /** Cuándo llegó, ya escrito («Ahora»). */
  time: string;
  /** Al tocar la novedad. */
  onOpen: () => void;
  /** Clases extra (posición de quien lo usa). */
  className?: string;
}

export function NotificationBox({ photo, title, body, time, onOpen, className }: NotificationBoxProps): JSX.Element {
  return <>
    <style href="concorde-notification-box" precedence="default">{NOTIFICATION_BOX_CSS}</style>
    <section className={`nt-box nt-box--arriving${className ? ` ${className}` : ""}`} aria-label="Nueva notificación">
      <header><b>Nueva notificación</b></header>
      <ul><li><button type="button" onClick={onOpen}><img src={photo} alt="" /><span><b>{title}</b><small>{body}</small></span><em>{time}</em></button></li></ul>
    </section>
  </>;
}

export default NotificationBox;
