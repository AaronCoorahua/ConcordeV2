"use client";
import { Vidrio } from "@/src/components/Vidrio";

/**
 * Mis publicaciones con casuísticas (04/11, Julio): cada fila con su badge y su menú ⋯ (Marcar como vendida, Marcar como no
 * concretada, Dar de baja…). Una sola columna (04/11, Julio): todas en la misma lista, la más reciente arriba; sin pestañas
 * ni publicaciones ocultas.
 * Badges y menú: los mismos de /components (PublicationBadge y el flujo de PublicationFlow).
 * Dar de baja (05/11, Julio): sin badge; la fila sale de la lista con la misma animación de cuando expira una negociación.
 * Desiertas (05/11): fijadas arriba de la lista, con chincheta y en negrita, hasta que se republican o se dan de baja.
 * Dar de baja se confirma en un modal (DropModal). Republicar no pregunta: la fila hace la transición al nuevo estado (republishSteps).
 * Acciones (05/11, Julio): el lab elige entre dejarlas en el menú ⋯ o mostrar Dar de baja y Republicar como botones en la fila,
 * y el color y el estilo de esos botones.
 */
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal, flushSync } from "react-dom";
import type { CSSProperties, JSX } from "react";
import { PagList } from "./Paginado";
import { PHOTO } from "./kit";
import { PUBLICATION_LABEL, PublicationBadge, PublicationPin, type PublicationStatus } from "@/src/components/PublicationBadge";
import { DropModal } from "@/src/components/DropModal";
import { REPUBLISH_DAYS, RepublishModal } from "@/src/components/RepublishModal";
import { VehicleRow } from "@/src/components/VehicleRow";
import { RepublishBar } from "@/src/components/RepublishBar";
import { MoreButton } from "@/src/components/MoreButton";
import { ActionList } from "@/src/components/ActionList";
import { ActionIcon, DROPPED_NOTE, menu, republishSteps, type Action, type PubActions } from "./PublicationFlow";
import { LabPanel } from "./LabPanel";
import "./mis-publicaciones.css";

export type PubRow = { id: string; name: string; year: number; photo: string; status: PublicationStatus; note: string; proposals?: number; leaving?: boolean; phase?: RepublishPhase; hold?: boolean };
/** Paso de la transición de Republicar. `hold`: la desierta sigue arriba hasta que termine. */
type RepublishPhase = "spin" | "out" | "in";

// Cambios hechos con el menú ⋯ (se borran al recargar).
/** Colores de los íconos en el lab. `danger`: color propio del tacho. */
const ICON_COLORS = [
  { id: "morado", label: "Morado", color: "#3B1782", hint: "Combina con el título y la marca." },
  { id: "lila", label: "Lila", color: "#7A5AD8", hint: "Morado más suave: pesa menos que el badge." },
  { id: "gris", label: "Gris", color: "#6B6878", hint: "El más discreto: resalta el badge." },
  { id: "negro", label: "Negro", color: "#191C1C", hint: "Como el texto de la fila." },
  { id: "naranja", label: "Naranja", color: "#C8620F", hint: "El acento de VMC." },
  { id: "rojo", label: "Tacho rojo", color: "#3B1782", danger: "#B42318", hint: "Tacho rojo y lo demás morado: como estaba." },
] as const;
type IconColor = (typeof ICON_COLORS)[number]["id"];
const ICON_STYLES = [
  { id: "solo", label: "Solos", hint: "Solo el ícono. Lo más limpio, pero se nota menos que se puede tocar." },
  { id: "fondo", label: "Fondo", hint: "Círculo de color suave: se ve como botón sin competir con el badge." },
  { id: "contorno", label: "Contorno", hint: "Círculo con borde: más ligero que el fondo." },
  { id: "texto", label: "Con texto", hint: "Ícono y nombre de la acción. En mobile queda solo el ícono, porque no entra." },
] as const;
type IconStyle = (typeof ICON_STYLES)[number]["id"];
/** Estilo de las acciones que abre el ⋯ dentro de la fila (11/11, propuesta para Julio: elegir en el lab). */
const ACT_STYLES = [
  // Siguiente paso (11/11): la franja «Republicar · Gratis, por 7 días →» sin abrir nada, y el tacho de Dar de baja a la vista en cuatro variantes.
  { id: "sugerencia", label: "Paso + tacho al lado", hint: "La franja de Republicar y, a su derecha, un botón cuadrado con el tacho rojo." },
  { id: "sugerencia-dentro", label: "Paso + tacho dentro", hint: "Una sola franja partida: Republicar a la izquierda y el tacho al final, separado por una línea." },
  // 11/11 (segunda ronda): patrones distintos, no estilos del mismo botón.
  { id: "aviso", label: "Aviso", hint: "La fila explica qué pasó («Nadie ofertó esta vez») y ofrece Republicar o Dar de baja ahí mismo." },
  { id: "nota", label: "En la nota", hint: "Dos enlaces discretos bajo el texto: «Republicar gratis · Dar de baja». Lo más silencioso." },
  { id: "hoja", label: "Hoja de acciones", hint: "El ⋯ abre una hoja desde abajo con el auto y cada acción explicada (patrón nativo de móvil)." },
  { id: "esmerilado", label: "Íconos esmerilados", hint: "Republicar y Dar de baja como íconos de vidrio esmerilado arriba del badge." },
  { id: "todas", label: "Republicar todas", hint: "Un aviso arriba de la lista junta las publicaciones sin venta y las republica de una vez." },
] as const;
type ActStyle = (typeof ACT_STYLES)[number]["id"];

let state = { actions: "menu" as PubActions, iconColor: "morado" as IconColor, iconStyle: "solo" as IconStyle, actStyle: "sugerencia" as ActStyle, over: {} as Record<string, { status: PublicationStatus; note: string; leaving?: boolean; phase?: RepublishPhase; hold?: boolean } | null> }; // over null: ya salió de la lista
const subs = new Set<() => void>();
const set = (x: Partial<typeof state>) => { state = { ...state, ...x }; subs.forEach((f) => f()); };
const remove = (id: string) => set({ over: { ...state.over, [id]: null } });
const patch = (id: string, x: Partial<NonNullable<(typeof state.over)[string]>>) => set({ over: { ...state.over, [id]: { ...state.over[id]!, ...x } } });
/** Al soltarse de arriba, la fila baja a su lugar deslizándose (View Transitions, donde exista). */
function slideRows(change: () => void): void {
  if (!document.startViewTransition) { change(); return; }
  const rows = [...document.querySelectorAll<HTMLElement>(".mp-row")], html = document.documentElement;
  rows.forEach((r) => { r.style.viewTransitionName = `mp-${r.dataset.pub}`; }); html.classList.add("mp-sliding");
  document.startViewTransition(() => flushSync(change)).finished.finally(() => { rows.forEach((r) => { r.style.viewTransitionName = ""; }); html.classList.remove("mp-sliding"); });
}
function republish(row: PubRow, to: PublicationStatus, note: string): void {
  set({ over: { ...state.over, [row.id]: { status: row.status, note: row.note, phase: "spin", hold: row.status === "desierta" } } });
  republishSteps((s) => {
    if (s === "out") patch(row.id, { phase: "out" });
    else if (s === "swap") patch(row.id, { status: to, note, phase: "in" });
    else { const end = () => patch(row.id, { phase: undefined, hold: false }); if (state.over[row.id]?.hold) slideRows(end); else end(); }
  });
}
const usePubs = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state, () => state);

const Chev = () => <svg className="mp-acts__chev" width="16" height="16" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** Hoja de acciones (11/11): sube desde abajo con el auto arriba y cada acción con su explicación. Ventana nativa: foco y Esc. */
const SHEET_HINT: Record<string, string> = { Republicar: `Gratis, por ${REPUBLISH_DAYS} días`, "Dar de baja": "Sale de Mis publicaciones", "Ver detalle de la venta": "Monto, fecha y comprador" };
function ActionSheet({ row, items, onPick, onClose }: { row: PubRow; items: Action[]; onPick: (a: Action) => void; onClose: () => void }): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="mp-sheet" aria-label={`Acciones: ${row.name} ${row.year}`} onClose={onClose} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}>
    <span className="mp-sheet__grab" aria-hidden />
    <header className="mp-sheet__car"><img src={PHOTO[row.photo]} alt="" /><span><b>{row.name} {row.year}</b><small>{row.note}</small></span><PublicationBadge status={row.status} /></header>
    <div className="mp-sheet__list">{items.map((a, i) => <button key={a.label} type="button" className={a.danger ? "is-danger" : undefined} autoFocus={i === 0} onClick={() => { ref.current?.close(); onPick(a); }}>
      <span className="mp-sheet__ic">{a.icon ? <ActionIcon icon={a.icon} /> : <Chev />}</span><span><b>{a.label}</b>{SHEET_HINT[a.label] ? <small>{SHEET_HINT[a.label]}</small> : null}</span></button>)}</div>
    <button type="button" className="mp-sheet__cancel" onClick={() => ref.current?.close()}>Cancelar</button>
  </dialog>;
}

/** Menú ⋯ de una fila. Va en el body (portal) para no quedar debajo ni recortado por la sección. */
function RowMenu({ row }: { row: PubRow }): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [repub, setRepub] = useState<Action | null>(null); // 11/11: Republicar se confirma en un modal que dice cuánto dura
  const wrap = useRef<HTMLSpanElement>(null);
  const { actions, actStyle } = usePubs();
  const items = menu(row.status).filter((a) => a.to || a.drop);
  const quick = actions === "botones" ? items.filter((a) => a.icon) : [];
  // Siguiente paso (11/11): Republicar sale del ⋯ y queda a la vista como franja; en el ⋯ queda lo demás (Dar de baja).
  const step = actions === "menu" && (actStyle.startsWith("sugerencia") || actStyle === "aviso" || actStyle === "nota" || actStyle === "esmerilado");
  const next = step ? items.find((a) => a.icon === "reload") : undefined;
  const glass = actions === "menu" && actStyle === "esmerilado"; // 16/11: íconos esmerilados en la fila, sin ⋯ para Dar de baja
  const bin = next || glass ? items.find((a) => a.drop) : undefined; // con la franja, Dar de baja también queda a la vista
  const rest = items.filter((a) => !quick.includes(a) && a !== next && a !== bin);
  const binBtn = (cls: string, text?: boolean) => bin ? <button type="button" className={cls} aria-label={text ? undefined : `${bin.label}: ${row.name} ${row.year}`} title={text ? undefined : bin.label} onClick={() => run(bin)}><ActionIcon icon="trash" />{text ? bin.label : null}</button> : null;
  // 11/11 (propuesta para Julio): sin menú flotante. El ⋯ abre las acciones dentro de la misma fila, a todo el ancho (no tapan nada).
  const [rowEl, setRowEl] = useState<HTMLElement | null>(null);
  const sheet = actions === "menu" && actStyle === "hoja";
  useLayoutEffect(() => { setRowEl(wrap.current?.closest<HTMLElement>(".mp-row") ?? null); }, []);
  useEffect(() => { rowEl?.classList.toggle("is-acting", open && !sheet); }, [open, rowEl, sheet]);
  if (row.phase === "spin" || row.phase === "out") return <span className="mp-more"><span className="mp-more__btn vpb-spin" role="status" aria-label="Republicando"><ActionIcon icon="reload" /></span></span>;
  if (!items.length) return null;
  const leave = () => { setDrop(false); set({ over: { ...state.over, [row.id]: { status: row.status, note: DROPPED_NOTE, leaving: true } } }); };
  const run = (a: Action) => {
    setOpen(false);
    if (a.drop) setDrop(true);
    else if (a.icon === "reload") setRepub(a);
    else if (a.to) set({ over: { ...state.over, [row.id]: { status: a.to, note: a.note ?? PUBLICATION_LABEL[a.to] } } });
  };
  return <span ref={wrap} className="mp-more vpb-actions">
    {quick.map((a) => <button key={a.label} type="button" className={`mp-more__btn${a.danger ? " is-danger" : ""}`} aria-label={`${a.label}: ${row.name} ${row.year}`} title={a.label} onClick={() => run(a)}><ActionIcon icon={a.icon!} /><span className="mp-more__txt">{a.label}</span></button>)}
    {glass ? <>
      {next ? <button type="button" className="vd-host mp-glass" aria-label={`${next.label}: ${row.name} ${row.year}`} title={`${next.label} gratis por ${REPUBLISH_DAYS} días`} onClick={() => run(next)}><Vidrio s="republicar" size={24} /></button> : null}
      {bin ? <button type="button" className="vd-host mp-glass" aria-label={`${bin.label}: ${row.name} ${row.year}`} title={bin.label} onClick={() => run(bin)}><Vidrio s="baja" size={24} /></button> : null}
    </> : null}
    {rest.length ? <MoreButton label={`Más acciones: ${row.name} ${row.year}`} expanded={open} controls={`mp-acts-${row.id}`} onClick={() => setOpen((v) => !v)} /> : null}
    {next && rowEl && actStyle === "aviso" ? createPortal(<div className="mp-alert">
      <p><b>{row.status === "desierta" ? "Nadie ofertó esta vez." : "La venta no se concretó."}</b> Republícala gratis por {REPUBLISH_DAYS} días y vuelve a la vista de los compradores.</p>
      <span className="mp-alert__btns"><button type="button" className="mp-alert__go" onClick={() => run(next)}><ActionIcon icon="reload" />{next.label}</button>{binBtn("mp-alert__drop", true)}</span>
    </div>, rowEl) : null}
    {next && rowEl && actStyle === "nota" ? createPortal(<span className="mp-links">
      <button type="button" className="mp-link" onClick={() => run(next)}><ActionIcon icon="reload" />Republicar gratis</button><span aria-hidden>·</span>{binBtn("mp-link is-danger", true)}
    </span>, rowEl.querySelector(".fr__main") ?? rowEl) : null}
    {next && rowEl && actStyle === "sugerencia" && bin ? createPortal(<RepublishBar name={`${row.name} ${row.year}`} days={REPUBLISH_DAYS} onRepublish={() => run(next)} onDrop={() => run(bin)} />, rowEl) : null}
    {open && rowEl && !sheet ? createPortal(<ActionList id={`mp-acts-${row.id}`} label={`Acciones: ${row.name} ${row.year}`} items={rest.map((a) => ({ label: a.label, icon: a.icon === "trash" ? "trash" : undefined, danger: a.danger }))}
      onPick={(i) => run(rest[i])} onClose={() => { setOpen(false); wrap.current?.querySelector<HTMLElement>("[aria-expanded]")?.focus(); }} />, rowEl) : null}
    {open && sheet ? createPortal(<ActionSheet row={row} items={rest} onPick={run} onClose={() => setOpen(false)} />, document.body) : null}
    {drop || repub ? createPortal(<>
    {drop ? <DropModal name={`${row.name} ${row.year}`} photo={PHOTO[row.photo]} note={row.note} onClose={() => setDrop(false)} onConfirm={leave}
      onRepublish={items.some((a) => a.icon === "reload") ? () => { setDrop(false); setRepub(items.find((a) => a.icon === "reload")!); } : undefined} /> : null}
    {repub ? <RepublishModal name={`${row.name} ${row.year}`} photo={PHOTO[row.photo]} note={row.note} onClose={() => setRepub(null)}
      onConfirm={() => { setRepub(null); republish(row, repub.to!, repub.note ?? PUBLICATION_LABEL[repub.to!]); }} /> : null}
    </>, document.body) : null}
  </span>;
}

function Row({ row }: { row: PubRow }): JSX.Element {
  const { id, leaving } = row;
  /** Terminada la salida, la fila cierra su espacio para que las de abajo suban sin saltar. */
  const collapse = (el: HTMLElement) => el.animate([{ height: `${el.offsetHeight}px` }, { height: "0px", marginTop: "0px", marginBottom: "0px", paddingTop: "0px", paddingBottom: "0px", borderWidth: "0px" }], { duration: 280, easing: "ease-in-out", fill: "forwards" }).finished.then(() => remove(id));
  return <VehicleRow photo={PHOTO[row.photo]} name={row.name} year={row.year} namePrefix={row.status === "desierta" ? <PublicationPin /> : null}
    meta={row.note} metaClassName={`vpb-note${row.status === "revision" || row.status === "publicada" || row.status === "negociacion" ? "" : " mp-note"}`}
    className={`fr--publication is-regular mp-row mp-row--${row.status}${leaving ? " is-negotiation-leaving is-expiry-exit" : ""}`} data={{ pub: id, repub: row.phase }}
    style={leaving ? ({ "--salida-espera": "500ms" } as CSSProperties) : undefined} onAnimationEnd={(e) => { if (leaving && e.target === e.currentTarget) void collapse(e.currentTarget); }}
    side={leaving ? undefined : <><PublicationBadge status={row.status} />{row.status === "negociacion" && row.proposals ? <span className="fr__proposals"><span>Propuestas</span><b>{row.proposals}</b></span> : null}</>}>
    {leaving ? null : <RowMenu row={row} />}
  </VehicleRow>;
}

/** Republicar todas (11/11): junta las publicaciones sin venta arriba de la lista y las republica de una vez. */
function AllBanner({ rows }: { rows: PubRow[] }): JSX.Element {
  const [ask, setAsk] = useState(false);
  const n = rows.length, many = n > 1;
  const go = () => { setAsk(false); rows.forEach((r) => { const a = menu(r.status).find((x) => x.icon === "reload"); if (a?.to) republish(r, a.to, a.note ?? PUBLICATION_LABEL[a.to]); }); };
  return <div className="mp-all">
    <span className="mp-all__ic"><ActionIcon icon="reload" /></span>
    <span className="mp-all__txt"><b>{many ? `${n} publicaciones terminaron sin venta` : "1 publicación terminó sin venta"}</b><small>Republícala{many ? "s" : ""} gratis por {REPUBLISH_DAYS} días</small></span>
    <button type="button" className="mp-all__go" onClick={() => setAsk(true)}>{many ? "Republicar todas" : "Republicar"}</button>
    {ask ? createPortal(<RepublishModal name={many ? `${n} publicaciones` : `${rows[0].name} ${rows[0].year}`} onClose={() => setAsk(false)} onConfirm={go} />, document.body) : null}
  </div>;
}

/** Lab: Dar de baja y Republicar en el menú ⋯ o como botones en la fila. */
export function PubActionsLab(): JSX.Element {
  const { actions, iconColor, iconStyle, actStyle } = usePubs();
  useEffect(() => { const q = new URLSearchParams(location.search), a = q.get("pub-acciones"), c = q.get("pub-color"), e = q.get("pub-estilo");
    if (a === "menu" || a === "botones") set({ actions: a }); if (ICON_COLORS.some((o) => o.id === c)) set({ iconColor: c as IconColor }); if (ICON_STYLES.some((o) => o.id === e)) set({ iconStyle: e as IconStyle });
    const v = q.get("pub-acc"); if (ACT_STYLES.some((o) => o.id === v)) set({ actStyle: v as ActStyle }); }, []);
  const toUrl = (k: string, v: string) => { const u = new URL(location.href); u.searchParams.set(k, v); history.replaceState(null, "", u); };
  const pick = (a: PubActions) => { set({ actions: a }); toUrl("pub-acciones", a); };
  const pickColor = (c: IconColor) => { set({ iconColor: c }); toUrl("pub-color", c); };
  const pickStyle = (e: IconStyle) => { set({ iconStyle: e }); toUrl("pub-estilo", e); };
  const pickAct = (v: ActStyle) => { set({ actStyle: v }); toUrl("pub-acc", v); };
  const OPTS: { id: PubActions; label: string; hint: string }[] = [
    { id: "menu", label: "Menú ⋯", hint: "Dar de baja y Republicar van dentro de los tres puntos." },
    { id: "botones", label: "Botones", hint: "Tacho para dar de baja y flecha circular para republicar, a la vista en la fila." },
  ];
  return <LabPanel title="Acciones de publicaciones" store="mg-pub-acciones" className="f-sw--pills" side="right" closed>
    <div className="f-sw__g" role="group" aria-label="Dar de baja y republicar"><span className="f-sw__k"><b>Dar de baja y republicar</b></span>
      {OPTS.map((o) => <button key={o.id} type="button" title={o.hint} aria-pressed={actions === o.id} onClick={() => pick(o.id)}>{o.label}</button>)}
      <small className="f-sw__hint">{OPTS.find((o) => o.id === actions)?.hint}</small></div>
    {actions === "menu" ? <div className="f-sw__g" role="group" aria-label="Estilo de las acciones"><span className="f-sw__k"><b>Estilo de las acciones (⋯)</b></span>
      {ACT_STYLES.map((o) => <button key={o.id} type="button" title={o.hint} aria-pressed={actStyle === o.id} onClick={() => pickAct(o.id)}>{o.label}</button>)}
      <small className="f-sw__hint">{ACT_STYLES.find((o) => o.id === actStyle)?.hint}</small></div> : null}
    <div className="f-sw__g" role="group" aria-label="Color de los íconos"><span className="f-sw__k"><b>Color de los íconos</b></span>
      {ICON_COLORS.map((o) => <button key={o.id} type="button" title={o.hint} aria-pressed={iconColor === o.id} onClick={() => pickColor(o.id)}>{o.label}</button>)}
      <small className="f-sw__hint">{ICON_COLORS.find((o) => o.id === iconColor)?.hint}</small></div>
    <div className="f-sw__g" role="group" aria-label="Estilo de los íconos"><span className="f-sw__k"><b>Estilo de los íconos</b></span>
      {ICON_STYLES.map((o) => <button key={o.id} type="button" title={o.hint} aria-pressed={iconStyle === o.id} onClick={() => pickStyle(o.id)}>{o.label}</button>)}
      <small className="f-sw__hint">{ICON_STYLES.find((o) => o.id === iconStyle)?.hint}</small></div>
  </LabPanel>;
}

const List = ({ rows, title }: { rows: PubRow[]; title: string }) => rows.length
  ? <PagList rows={rows} title={title} render={(r) => <Row key={r.id} row={r} />} />
  : <p className="mp-empty">No hay publicaciones aquí.</p>;

/** Lista de Mis publicaciones: una sola columna, todas juntas (el orden lo da Mi Garaje: lo más reciente arriba). */
export function PubList({ rows, title }: { rows: PubRow[]; title: string }): JSX.Element {
  const st = usePubs();
  const all = rows.flatMap((r) => { const o = st.over[r.id]; return o === null ? [] : [o ? { ...r, ...o } : r]; });
  const pinned = (r: PubRow) => r.status === "desierta" || r.hold; // fijadas arriba de la lista
  const ic = ICON_COLORS.find((o) => o.id === st.iconColor)!;
  const sinVenta = st.actions === "menu" && st.actStyle === "todas" ? all.filter((r) => (r.status === "desierta" || r.status === "no-concretada") && !r.leaving && !r.phase) : [];
  return <div className="mp" data-ic-style={st.iconStyle} style={{ "--mp-ic": ic.color, "--mp-ic-danger": "danger" in ic ? ic.danger : ic.color } as CSSProperties}>{sinVenta.length ? <AllBanner rows={sinVenta} /> : null}<div className="fs__list"><List rows={[...all.filter(pinned), ...all.filter((r) => !pinned(r))]} title={title} /></div></div>;
}

/** Para /publicaciones: leer y mover el mismo estado de la lista desde el panel de control. */
export { usePubs as usePubStore, set as setPubStore };
