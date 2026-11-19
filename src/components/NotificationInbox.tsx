/**
 * NotificationInbox — bandeja de notificaciones (Mi Garaje, /blocks/mi-garaje/m/vmc: se abre con NotificationBell). Tarjeta
 * blanca con «Notificaciones» y «Marcar todo como leído» arriba, una fila por novedad (foto, título, detalle y cuándo; punto
 * magenta si está sin leer) y «Ver todo en Mi Garaje» al pie. Dónde se abre lo decide quien la usa. Solo depende de React.
 */
import type { JSX } from "react";

export const NOTIFICATION_INBOX_CSS = String.raw`
.nt-inbox { width:min(380px, calc(100vw - 24px)); max-height:min(70vh, 520px); display:grid; grid-template-rows:auto minmax(0,1fr) auto; box-sizing:border-box;
  border-radius:16px; background:#fff; color:#3B1782; box-shadow:0 16px 40px rgba(34,0,92,.22), 0 0 0 1px #E8DEFF; overflow:hidden; transform-origin:calc(100% - 40px) 0;
  animation:nt-drop .28s cubic-bezier(.05,.7,.1,1) both; font-family:var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); }
@keyframes nt-drop { from { opacity:0; transform:translateY(-8px) scale(.96); } }
.nt-inbox header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px 10px; border-bottom:1px solid #EEE9FB; }
.nt-inbox header b { font-size:1rem; font-weight:700; }
.nt-inbox header button { border:0; background:none; padding:4px 0; font:inherit; font-size:.75rem; font-weight:600; color:#5A35C2; cursor:pointer; }
.nt-inbox header button:hover { text-decoration:underline; text-underline-offset:2px; }
.nt-inbox ul { margin:0; padding:6px; list-style:none; overflow:auto; }
.nt-inbox li button { display:flex; align-items:center; gap:12px; width:100%; padding:10px; border:0; border-radius:12px; background:none; text-align:left; font:inherit; color:inherit; cursor:pointer; }
.nt-inbox li button:hover { background:#F5F0FF; }
.nt-inbox img { flex:none; width:48px; height:38px; border-radius:8px; object-fit:cover; }
.nt-inbox li span { display:grid; gap:2px; flex:1; min-width:0; }
.nt-inbox li b { font-size:.8125rem; font-weight:500; color:#191C1C; }
.nt-inbox li small { font-size:.75rem; color:#6B6878; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.nt-inbox li em { font-style:normal; font-size:.6875rem; color:#8A8698; }
.nt-inbox li .is-unread b { font-weight:700; } .nt-inbox li .is-unread small { color:#191C1C; font-weight:600; }
.nt-inbox li:first-child button.is-unread { animation:nt-row .5s cubic-bezier(.05,.7,.1,1) both; }
@keyframes nt-row { from { opacity:0; transform:translateY(-6px); background:#F5F0FF; } }
.nt-inbox .nt-dot { flex:none; width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg, #CC00FF 0%, #FF0066 100%); }
.nt-empty { margin:0; padding:20px 16px; font-size:.8125rem; color:#6B6878; }
.nt-inbox__all { display:block; padding:12px 16px; border-top:1px solid #EEE9FB; font-size:.8125rem; font-weight:700; color:#5A35C2; text-align:center; text-decoration:none; }
.nt-inbox__all:hover { background:#F5F0FF; }
`;

/** Una novedad de la bandeja. */
export interface NotificationInboxItem {
  /** Identificador estable (clave de la fila). */
  id: string | number;
  /** URL de la foto del vehículo. */
  photo: string;
  /** Qué pasó (p. ej. «El vendedor respondió tu propuesta»). */
  title: string;
  /** Vehículo y detalle (p. ej. «Nissan Sentra 2020 · te pide US$ 4,800»). */
  body: string;
  /** Cuándo llegó, ya escrito («Ahora», «Hace 5 min»). */
  time: string;
  /** Sin leer: en negrita y con punto magenta. */
  unread: boolean;
}

export interface NotificationInboxProps {
  /** Novedades, de la más reciente a la más antigua. Sin novedades muestra un texto de bandeja vacía. */
  items: NotificationInboxItem[];
  /** Al tocar una novedad (recibe su índice). */
  onOpen: (index: number) => void;
  /** «Marcar todo como leído» (solo se muestra si hay alguna sin leer). */
  onReadAll: () => void;
  /** Destino de «Ver todo en Mi Garaje». */
  allHref: string;
  /** Clases extra (posición dentro del header de quien la usa). */
  className?: string;
}

export function NotificationInbox({ items, onOpen, onReadAll, allHref, className }: NotificationInboxProps): JSX.Element {
  return <>
    <style href="concorde-notification-inbox" precedence="default">{NOTIFICATION_INBOX_CSS}</style>
    <div className={`nt-inbox${className ? ` ${className}` : ""}`} role="dialog" aria-label="Notificaciones">
      <header><b>Notificaciones</b>{items.some((it) => it.unread) ? <button type="button" onClick={onReadAll}>Marcar todo como leído</button> : null}</header>
      {items.length ? <ul>{items.map((it, i) => <li key={it.id}><button type="button" className={it.unread ? "is-unread" : ""} onClick={() => onOpen(i)}>
        <img src={it.photo} alt="" /><span><b>{it.title}</b><small>{it.body}</small><em>{it.time}</em></span>{it.unread ? <i className="nt-dot" aria-label="Sin leer" /> : null}</button></li>)}</ul>
        : <p className="nt-empty">Cuando una negociación, subasta o compra tenga novedades, las verás aquí.</p>}
      <a className="nt-inbox__all" href={allHref}>Ver todo en Mi Garaje</a>
    </div>
  </>;
}

export default NotificationInbox;
