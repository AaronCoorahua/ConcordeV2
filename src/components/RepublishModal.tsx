"use client";

/**
 * RepublishModal — confirma republicar una publicación y dice por cuánto tiempo queda a la vista (Mi Garaje,
 * mi-garaje-lab · Mis publicaciones). Usa la «casa de los modales» de Mi Garaje (ConfirmModal de VOYAGER): tarjeta
 * .va/.vh de 320, cerrar ×, ícono esmerilado, Button de Concorde, apertura desde donde se tocó y los pasos
 * «procesando» → «celebración» antes de cerrar. Se monta abierto (<dialog>.showModal()); para cerrarlo, desmontarlo.
 * Exporta también MODAL_HOUSE_CSS y openFromTouch, que reutiliza DropModal.
 */
import { useEffect, useId, useRef, useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import { Vidrio } from "@/src/components/Vidrio";

// Propuesta para Julio (11/11): los TyC (IV.11.2.b) dicen que republicar no cuesta, pero no fijan cuánto dura la publicación.
// Este plazo es un valor de ejemplo; cambiarlo aquí cuando Julio/negocio lo confirme.
export const REPUBLISH_DAYS = 7;

/** La casa de los modales (.va/.vh): tarjeta, ×, ícono, títulos, botón, apertura desde el toque, «procesando» y «celebración». */
export const MODAL_HOUSE_CSS = String.raw`
/* Tarjeta de 320, fondo violeta con desenfoque y la × de borde degradado (ConfirmModal de VOYAGER). */
.va { width:min(320px, calc(100vw - 32px)); margin:auto; padding:0; border:0; border-radius:16px; background:none; overflow:visible; font-family:var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); }
.va::backdrop { background:rgba(34,0,92,.55); }
.vh::backdrop { -webkit-backdrop-filter:blur(2px); backdrop-filter:blur(2px); }
.va__card { position:relative; display:grid; justify-items:center; gap:12px; padding:40px 24px 24px; border-radius:16px; background:#fff; color:#3B1782; text-align:center; box-shadow:0 8px 24px rgba(0,0,0,.08); }
.va__x { position:absolute; top:14px; right:14px; display:grid; place-items:center; width:32px; height:32px; padding:0; border:0; border-radius:50%; background:none; cursor:pointer; }
.va__x--neg { border:1.5px solid transparent; background:linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#00A8AB 0%,#30E8EC 34%,#8460E5 100%) border-box; box-shadow:0 2px 8px rgba(0,168,171,.16); transition:transform .18s ease, box-shadow .2s ease; }
.va__x--neg::before, .va__x--neg::after { content:""; position:absolute; left:50%; top:50%; width:13px; height:2px; border-radius:999px; background:linear-gradient(90deg,#008688 0%,#8460E5 100%); }
.va__x--neg::before { transform:translate(-50%,-50%) rotate(45deg); }
.va__x--neg::after { transform:translate(-50%,-50%) rotate(-45deg); }
.va__x--neg:hover { transform:translateY(-1px) scale(1.06); box-shadow:0 4px 12px rgba(0,168,171,.24), 0 3px 10px rgba(90,53,194,.18); }
.va__x--neg:active { transform:scale(.94); box-shadow:inset 0 2px 4px rgba(34,0,92,.16); }
.va h2 { margin:0; font-size:.875rem; font-weight:600; text-transform:uppercase; }
.va__x:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
/* Híbrida (.vh): tarjeta con borde lila, ícono esmerilado, título en caja normal y botón a todo el ancho; abre «saliendo» del último toque (openFromTouch). */
.vh .va__card { gap:0; padding:32px 24px 20px; border:1px solid rgba(132,96,229,.26); box-shadow:inset 0 0 0 1px rgba(207,186,255,.12),0 8px 24px rgba(34,0,92,.11); }
.vh.is-origin-open .va__card { transform-origin:center; will-change:transform, opacity, filter; animation:vh-offer-launch .64s cubic-bezier(.16,1,.3,1) both; }
.vh.is-origin-open::backdrop { animation:vh-offer-backdrop .54s cubic-bezier(.22,.72,.28,1) both; }
@keyframes vh-offer-launch {
  0% { opacity:0; transform:translate3d(var(--vh-from-x, 0), var(--vh-from-y, 24px), 0) scale(.14); filter:blur(5px) saturate(1.24); box-shadow:0 0 0 0 rgba(0,218,224,0); }
  26% { opacity:.72; filter:blur(2.8px) saturate(1.18); }
  48% { opacity:1; filter:blur(1.2px) saturate(1.1); box-shadow:0 0 0 10px rgba(0,218,224,.12), 0 20px 48px rgba(59,23,130,.34); }
  72% { transform:translate3d(0,-5px,0) scale(1.035); filter:blur(.25px) saturate(1.025); box-shadow:0 0 0 5px rgba(132,96,229,.10), 0 14px 36px rgba(34,0,92,.24); }
  100% { opacity:1; transform:translate3d(0,0,0) scale(1); filter:blur(0) saturate(1); box-shadow:0 8px 24px rgba(0,0,0,.08); }
}
@keyframes vh-offer-backdrop {
  0% { background:rgba(34,0,92,0); -webkit-backdrop-filter:blur(0); backdrop-filter:blur(0); }
  55% { background:rgba(34,0,92,.42); -webkit-backdrop-filter:blur(1px); backdrop-filter:blur(1px); }
  100% { background:rgba(34,0,92,.55); -webkit-backdrop-filter:blur(2px); backdrop-filter:blur(2px); }
}
.vh__icon { display:grid; margin-bottom:12px; }
.vh h2 { margin:8px 0 4px; font-size:1.25rem; font-weight:700; text-transform:none; color:#3B1782; }
.vh__sub { margin:0; font-size:.75rem; line-height:1.4; color:#5F5B6B; }
.vh__btn { width:100% !important; max-width:none !important; white-space:nowrap; }
.vh .vh__icon .vd { overflow:visible; }
.vh__icon + h2 { margin-top:0; }
/* Procesando: anillo que gira con tres puntos. */
.vh .vh__processing { min-height:300px; align-content:center; gap:10px; overflow:hidden; background:radial-gradient(circle at 50% 42%, rgba(0,218,224,.1), transparent 36%), radial-gradient(circle at 50% 64%, rgba(132,96,229,.1), transparent 48%), #fff; animation:vh-stage-in .28s ease-out both; }
.vh__loader { position:relative; display:flex; align-items:center; justify-content:center; gap:6px; width:76px; height:76px; margin:0 0 8px; border:3px solid transparent; border-radius:50%; background:linear-gradient(#fff,#fff) padding-box,repeating-conic-gradient(from 0deg,#30E8EC 0 10deg,#fff 10deg 17deg,#8460E5 17deg 29deg,#CFBAFF 29deg 36deg,#00A8AB 36deg 48deg) border-box; box-shadow:0 0 0 5px rgba(48,232,236,.08),0 0 24px rgba(132,96,229,.28),0 10px 28px rgba(59,23,130,.2),inset 0 0 14px rgba(48,232,236,.12); filter:saturate(1.15); animation:vh-loader-spin .82s linear infinite,vh-loader-jackpot .58s ease-in-out infinite alternate; }
.vh__loader::before { content:""; position:absolute; z-index:0; inset:7px; border-radius:50%; background:radial-gradient(circle at 38% 30%,#fff 0 7%,transparent 8%),linear-gradient(145deg,rgba(245,240,255,.96),rgba(255,255,255,.76)); box-shadow:inset 0 0 18px rgba(132,96,229,.14); }
.vh__loader::after { content:"✦"; position:absolute; z-index:3; top:-9px; right:4px; color:#fff; font-size:18px; line-height:1; text-shadow:0 0 5px #30E8EC,0 0 10px #8460E5,0 0 18px #8460E5; animation:vh-loader-spark .58s ease-in-out infinite alternate; }
.vh__loader i { position:relative; z-index:1; width:7px; height:7px; border-radius:50%; background:#8460E5; animation:vh-loader-dot .9s ease-in-out infinite; }
.vh__loader i:nth-child(2) { background:#00A8AB; animation-delay:.12s; }
.vh__loader i:nth-child(3) { background:#30E8EC; animation-delay:.24s; }
.vh__processing h2 { margin-top:0; }
/* Celebración: check que aparece con chispas, antes de cerrar. */
.vh .vh__celebrate { position:relative; isolation:isolate; min-height:360px; align-content:center; overflow:hidden; padding-block:28px; background:radial-gradient(circle at 50% 34%, rgba(0,218,224,.12), transparent 34%), radial-gradient(circle at 50% 58%, rgba(132,96,229,.13), transparent 48%), #fff; }
.vh__celebrate::before { content:""; position:absolute; z-index:-1; inset:-25%; background:conic-gradient(from 20deg, transparent 0 9%, rgba(48,232,236,.12) 10% 12%, transparent 13% 25%, rgba(132,96,229,.11) 26% 29%, transparent 30% 46%, rgba(207,186,255,.14) 47% 50%, transparent 51% 100%); animation:vh-celebrate-rays 2.6s linear infinite; }
.vh__celebrate-stage { position:relative; display:grid; place-items:center; width:148px; height:148px; margin:0 0 4px; }
.vh__celebrate-stage::before, .vh__celebrate-stage::after { content:""; position:absolute; border-radius:50%; }
.vh__celebrate-stage::before { inset:6px; border:2px solid transparent; background:linear-gradient(rgba(255,255,255,.7), rgba(245,240,255,.42)) padding-box, conic-gradient(from 0deg, #30E8EC, #8460E5, #CFBAFF, #00A8AB, #30E8EC) border-box; box-shadow:0 0 28px rgba(0,168,171,.18), inset 0 1px 0 #fff; animation:vh-celebrate-ring 1.2s cubic-bezier(.16,1,.3,1) both; }
.vh__celebrate-stage::after { inset:26px; border:1px solid rgba(132,96,229,.24); animation:vh-celebrate-ripple 1.25s .18s ease-out both; }
.vh__celebrate-check { position:relative; z-index:2; display:grid; place-items:center; width:76px; height:76px; border:2px solid rgba(255,255,255,.78); border-radius:50%; color:#fff; background:linear-gradient(135deg, #00A8AB 0%, #30C9CE 35%, #8460E5 100%); box-shadow:inset 0 1px 0 rgba(255,255,255,.42), 0 10px 28px rgba(59,23,130,.28), 0 4px 14px rgba(0,168,171,.28); animation:vh-celebrate-pop .72s cubic-bezier(.16,1.32,.3,1) both; }
.vh__celebrate-check path { stroke-dasharray:27; stroke-dashoffset:27; animation:vh-celebrate-check .42s .38s cubic-bezier(.16,1,.3,1) forwards; }
.vh__celebrate-stage > i { position:absolute; z-index:3; left:50%; top:50%; width:8px; height:8px; border-radius:2px; background:#30E8EC; opacity:0; animation:vh-celebrate-chip 1.05s var(--d, .12s) cubic-bezier(.17,.67,.28,1.15) both; }
.vh__celebrate-stage > i:nth-child(2n) { border-radius:50%; background:#8460E5; }
.vh__celebrate-stage > i:nth-child(3n) { width:5px; height:11px; background:#CFBAFF; }
.vh__celebrate-stage > i:nth-child(1) { --x:-63px; --y:-46px; --r:-80deg; --d:.08s; }
.vh__celebrate-stage > i:nth-child(2) { --x:-75px; --y:5px; --r:110deg; --d:.15s; }
.vh__celebrate-stage > i:nth-child(3) { --x:-50px; --y:58px; --r:160deg; --d:.2s; }
.vh__celebrate-stage > i:nth-child(4) { --x:4px; --y:-75px; --r:70deg; --d:.12s; }
.vh__celebrate-stage > i:nth-child(5) { --x:62px; --y:-48px; --r:130deg; --d:.18s; }
.vh__celebrate-stage > i:nth-child(6) { --x:77px; --y:6px; --r:-95deg; --d:.1s; }
.vh__celebrate-stage > i:nth-child(7) { --x:54px; --y:58px; --r:210deg; --d:.22s; }
.vh__celebrate-stage > i:nth-child(8) { --x:-5px; --y:75px; --r:-145deg; --d:.16s; }
.vh__celebrate-kicker { margin:0; font-size:.8125rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:#008688; animation:vh-celebrate-copy .5s .34s ease-out both; }
.vh__celebrate.is-leaving { pointer-events:none; animation:vh-celebrate-out .42s cubic-bezier(.4,0,1,1) both; }
@keyframes vh-stage-in { from { opacity:0; transform:scale(.97); } }
@keyframes vh-loader-spin { to { transform:rotate(1turn); } }
@keyframes vh-loader-dot { 0%,100% { transform:scale(.7); opacity:.45; } 50% { transform:scale(1.15); opacity:1; } }
@keyframes vh-loader-jackpot { to { box-shadow:0 0 0 7px rgba(48,232,236,.12),0 0 34px rgba(132,96,229,.44),0 12px 30px rgba(59,23,130,.24),inset 0 0 18px rgba(48,232,236,.2); } }
@keyframes vh-loader-spark { from { opacity:.35; transform:scale(.7) rotate(0); } to { opacity:1; transform:scale(1.2) rotate(28deg); } }
@keyframes vh-celebrate-rays { to { transform:rotate(1turn); } }
@keyframes vh-celebrate-ring { 0% { opacity:0; transform:scale(.28) rotate(-110deg); } 62% { opacity:1; transform:scale(1.08) rotate(12deg); } 100% { transform:scale(1) rotate(0); } }
@keyframes vh-celebrate-ripple { 0% { opacity:0; transform:scale(.5); } 45% { opacity:.8; } 100% { opacity:0; transform:scale(1.65); } }
@keyframes vh-celebrate-pop { 0% { opacity:0; transform:scale(.18) rotate(-12deg); } 64% { opacity:1; transform:scale(1.12) rotate(3deg); } 100% { transform:scale(1) rotate(0); } }
@keyframes vh-celebrate-check { to { stroke-dashoffset:0; } }
@keyframes vh-celebrate-chip { 0% { opacity:0; transform:translate(-50%,-50%) scale(.2) rotate(0); } 32% { opacity:1; } 100% { opacity:0; transform:translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(.75) rotate(var(--r)); } }
@keyframes vh-celebrate-copy { from { opacity:0; transform:translateY(8px); } }
@keyframes vh-celebrate-out { to { opacity:0; transform:translateY(-8px) scale(.97); filter:blur(3px); } }
@media (prefers-reduced-motion:reduce) { .vh.is-origin-open .va__card, .vh.is-origin-open::backdrop { animation:none; } .va__x--neg { transition:none; }
  .vh__processing, .vh__loader, .vh__loader i, .vh__celebrate::before, .vh__celebrate-stage::before, .vh__celebrate-stage::after, .vh__celebrate-check, .vh__celebrate-check path, .vh__celebrate-stage > i, .vh__celebrate-kicker, .vh__celebrate.is-leaving { animation:none; } .vh__celebrate-check path { stroke-dashoffset:0; } }
`;

export const REPUBLISH_MODAL_CSS = String.raw`
/* Plazo: campo blanco con borde degradado violeta (la receta del ticket de la casa, sin el cian de Negociable). */
.rm__term { display: flex; align-items: center; gap: 12px; width: 100%; margin: 16px 0 12px; padding: 12px 16px 12px 12px; box-sizing: border-box; border: 1.5px solid transparent; border-radius: 12px; text-align: left;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #AE8EFF, #5A35C2) border-box; box-shadow: 0 4px 16px rgba(132,96,229,.18); }
.rm__term-ic { display: grid; flex: none; }
.rm__term-txt { display: grid; gap: 2px; min-width: 0; }
.rm__term-txt b { font-size: 1.125rem; font-weight: 700; line-height: 1.2; color: #3B1782; }
.rm__term-txt small { font-size: .8125rem; line-height: 1.35; color: #5F5B6B; }
.rm__term-txt small::first-letter { text-transform: none; }
.vh__sub.rm__free { margin-bottom: 16px; text-wrap: balance; }
`;

const until = (days: number) => new Date(Date.now() + days * 864e5).toLocaleDateString("es-PE", { weekday: "short", day: "2-digit", month: "2-digit" }).replace(".", "");

const longUntil = (days: number) => new Date(Date.now() + days * 864e5).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" }).replace(",", "");

// Último toque en pantalla: desde ahí «sale» el modal.
let lastPt: { x: number; y: number } | null = null;
if (typeof window !== "undefined") addEventListener("pointerdown", (e) => { lastPt = { x: e.clientX, y: e.clientY }; }, true);

/** Abre un modal de la casa «saliendo» del último toque. Devuelve la limpieza para usarla dentro de useEffect. */
export function openFromTouch(d: HTMLDialogElement | null): (() => void) | undefined {
  if (!d || d.open) return;
  const x = lastPt?.x ?? innerWidth / 2, y = lastPt?.y ?? innerHeight / 2 + 24;
  d.style.setProperty("--vh-from-x", `${x - innerWidth / 2}px`);
  d.style.setProperty("--vh-from-y", `${y - innerHeight / 2}px`);
  d.classList.add("is-origin-open"); d.showModal();
  const t = setTimeout(() => d.classList.remove("is-origin-open"), 720);
  return () => clearTimeout(t);
}

type Step = "confirma" | "procesa" | "celebra" | "celebra-salida";

export interface RepublishModalProps {
  /** Nombre del vehículo, p. ej. «Suzuki Swift 2020» (o «3 publicaciones» al republicar varias). */
  name: string;
  /** Foto del vehículo (no se muestra: el modal de la casa no lleva foto). */
  photo?: string;
  /** Lo que dice hoy la fila (no se muestra). */
  note?: string;
  /** Días que queda publicada. Por defecto REPUBLISH_DAYS (7). */
  days?: number;
  /** Se llama al terminar la celebración; ahí la fila hace su propia animación de republicar. */
  onConfirm: () => void;
  /** Se llama al cerrar sin republicar (×, Escape o clic fuera de la tarjeta). */
  onClose: () => void;
}

export function RepublishModal({ name, days = REPUBLISH_DAYS, onConfirm, onClose }: RepublishModalProps): JSX.Element {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("confirma");
  const busy = step !== "confirma";
  const done = useRef(onConfirm);
  useEffect(() => { done.current = onConfirm; }); // el padre puede pasar una función nueva en cada render
  useEffect(() => openFromTouch(ref.current), []);
  // Tiempos de la casa: procesa 650 ms, celebra 1450 ms, salida 420 ms.
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (step === "confirma") return;
    const t = setTimeout(() => step === "procesa" ? setStep("celebra") : step === "celebra" ? setStep("celebra-salida") : done.current(),
      reduced ? 180 : step === "procesa" ? 650 : step === "celebra" ? 1450 : 420);
    return () => clearTimeout(t);
  }, [step]);
  const close = <button type="button" className="va__x va__x--neg" aria-label="Cerrar" disabled={busy} onClick={onClose} />;
  return <>
    <style href="concorde-modal-house" precedence="default">{MODAL_HOUSE_CSS}</style>
    <style href="concorde-republish-modal" precedence="default">{REPUBLISH_MODAL_CSS}</style>
    <dialog ref={ref} className="va vh" aria-labelledby={`${id}-t`} onCancel={(e) => { e.preventDefault(); if (!busy) onClose(); }}
      onClick={(e) => { if (e.target === ref.current && !busy) onClose(); }}>
      {step === "procesa" ? <div className="va__card vh__processing" role="status" aria-live="polite">
        <div className="vh__loader" aria-hidden><i /><i /><i /></div>
        <h2 id={`${id}-t`}>Republicando tu auto</h2>
        <p className="vh__sub">Estamos volviendo a publicar tu oferta…</p>
      </div> : busy ? <div className={`va__card vh__celebrate${step === "celebra-salida" ? " is-leaving" : ""}`} role="status" aria-live="assertive">
        <div className="vh__celebrate-stage" aria-hidden><i /><i /><i /><i /><i /><i /><i /><i />
          <span className="vh__celebrate-check"><svg width="38" height="38" viewBox="0 0 40 40" fill="none"><path d="M11 20.5l6 6L29.5 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        </div>
        <p className="vh__celebrate-kicker">¡Publicación republicada!</p>
        <h2 id={`${id}-t`}>{name}</h2>
        <p className="vh__sub">Visible por {days} días, hasta el {until(days)}</p>
      </div> : <div className="va__card">{close}
        <span className="vd-host vh__icon"><Vidrio s="republicar" size={40} /></span>
        <h2 id={`${id}-t`}>Confirma la republicación</h2>
        <p className="vh__sub">{name}</p>
        {/* El plazo: campo blanco con borde degradado violeta, como el ticket de la casa; el naranja queda para dinero. */}
        <div className="rm__term">
          <span className="vd-host rm__term-ic" aria-hidden><Vidrio s="fecha" size={36} /></span>
          <span className="rm__term-txt"><b>{days} días publicada</b><small>Hasta el {longUntil(days)}</small></span>
        </div>
        <p className="vh__sub rm__free">Republicar no tiene costo: ya pagaste la publicación.</p>
        <Button type="button" variant="secondary" className="vh__btn" autoFocus onClick={() => setStep("procesa")}>Republicar</Button>
      </div>}
    </dialog>
  </>;
}

export default RepublishModal;
