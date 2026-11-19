"use client";

/**
 * DropModal — dar de baja una publicación (Mi Garaje, mi-garaje-lab · Mis publicaciones). Misma casa de modales que
 * RepublishModal (.va/.vh): el motivo se elige con un toque (tarjetas 2 × 2 con ícono esmerilado; Input de Concorde para
 * «Otro motivo») y la respuesta cambia según el motivo (si nadie ofertó, se ofrece republicar gratis antes). El botón dice
 * lo que hace y se activa al elegir el motivo; luego «procesando» y cierre. Se monta abierto; para cerrarlo, desmontarlo.
 */
import { useEffect, useId, useRef, useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import { MODAL_HOUSE_CSS, openFromTouch, REPUBLISH_DAYS } from "@/src/components/RepublishModal";

/** Lo propio de DropModal; la tarjeta, el ícono, el título, el botón y las animaciones vienen de MODAL_HOUSE_CSS. */
export const DROP_MODAL_CSS = String.raw`
.dm__why { width: 100%; margin: 20px 0 0; padding: 0; border: 0; }
.dm__why-t { margin: 0 auto 12px; padding: 0; font-size: .875rem; font-weight: 700; color: #3B1782; }
.dm__opts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
/* Reposo: el borde degradado y la sombra de AmountOption (Concorde) */
.dm__opt { position: relative; display: grid; justify-items: center; align-content: center; gap: 6px; min-height: 88px; padding: 12px 8px; border: 1px solid transparent; border-radius: 16px; cursor: pointer;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(335deg, #8460E5 0%, #FFF8F1 100%) border-box; box-shadow: 0 2px 10px rgba(32,0,104,.08);
  font-size: .8125rem; font-weight: 700; line-height: 1.2; color: #3B1782; text-align: center; transition: transform .15s, box-shadow .2s; }
.dm__opt input { position: absolute; opacity: 0; pointer-events: none; }
.dm__opt:hover { box-shadow: 0 4px 16px rgba(32,0,104,.14); }
.dm__opt:active { transform: scale(.98); }
/* Elegido: el borde del Input enfocado de Concorde (naranja → violeta, 2 px) con su brillo naranja y fondo lila */
.dm__opt:has(:checked) { border-width: 2px; background: linear-gradient(#FAF7FF, #FAF7FF) padding-box, linear-gradient(135deg, #ED8936, #8460E5) border-box; box-shadow: 0 0 0 4px rgba(237,137,54,.14); }
.dm__opt:has(:focus-visible) { outline: 2px solid #8460E5; outline-offset: 2px; }
.dm__reply { width: 100%; text-align: left; }
.dm__reply > * { margin-top: 12px; animation: dm-in .25s cubic-bezier(.16,1,.3,1); }
@keyframes dm-in { from { opacity: 0; transform: translateY(-4px); } }
/* Republicar antes de irse: el mismo borde degradado violeta del plazo de RepublishModal */
.dm__save { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 8px 12px; padding: 12px; border: 1.5px solid transparent; border-radius: 12px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #AE8EFF, #5A35C2) border-box; box-shadow: 0 4px 16px rgba(132,96,229,.18); }
.dm__save-ic { display: grid; align-self: start; grid-row: span 2; }
.dm__save-txt { display: grid; gap: 2px; min-width: 0; }
.dm__save-txt b { font-size: .875rem; color: #3B1782; }
.dm__save-txt small { font-size: .75rem; line-height: 1.35; color: #5F5B6B; }
.dm__save-go { grid-column: 2; justify-self: start; min-height: 36px; padding: 0 14px; border: 0; border-radius: 999px; background: linear-gradient(160deg, #8460E5, #3B1782); color: #fff; font-family: inherit; font-size: .8125rem; font-weight: 700; cursor: pointer; }
.dm__save-go:hover { filter: brightness(1.08); }
.dm__save-go:focus-visible { outline: 2px solid #8460E5; outline-offset: 2px; }
/* Respuestas sin acción: la misma tarjeta, en lila suave y sin borde degradado (solo la que tiene botón invita a tocar) */
.dm__info { align-items: center; border: 0; background: #F7F3FF; box-shadow: none; }
.dm__info .dm__save-ic { grid-row: auto; align-self: center; }
.dm__other.pinput-root { width: 100%; }
.dm .vh__btn { margin-top: 20px; }
@media (prefers-reduced-motion: reduce) { .dm__reply > * { animation: none; } }
`;

export const DROP_REASONS = ["Ya lo vendí", "Sin ofertas", "No quiero vender", "Otro motivo"];
const REASON_ICON: Record<string, Sec> = { "Ya lo vendí": "compras", "Sin ofertas": "participaciones", "No quiero vender": "auto", "Otro motivo": "texto" };

export interface DropModalProps {
  /** Nombre del vehículo, p. ej. "Suzuki Swift 2020". */
  name: string;
  /** Foto del vehículo (no se muestra: el modal de la casa no lleva foto). */
  photo?: string;
  /** Lo que dice hoy la fila (no se muestra). */
  note?: string;
  /** Si la publicación se puede republicar: con «Sin ofertas» se ofrece antes de darla de baja. */
  onRepublish?: () => void;
  /** Se llama con el motivo elegido, al terminar el «procesando». */
  onConfirm: (reason: string) => void;
  /** Se llama al cerrar sin dar de baja (×, Escape o clic fuera de la tarjeta). */
  onClose: () => void;
}

/** Respuesta al motivo: misma tarjeta que «Republícala gratis», sin botón (ícono esmerilado, título y una línea). */
const Info = ({ s, t, d }: { s: Sec; t: string; d: string }) => <div className="dm__save dm__info">
  <span className="vd-host dm__save-ic" aria-hidden><Vidrio s={s} size={32} /></span>
  <span className="dm__save-txt"><b>{t}</b><small>{d}</small></span>
</div>;

export function DropModal({ name, onRepublish, onConfirm, onClose }: DropModalProps): JSX.Element {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const [busy, setBusy] = useState(false);
  const finalReason = reason === "Otro motivo" ? other.trim() || "Otro motivo" : reason;
  useEffect(() => openFromTouch(ref.current), []);
  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => onConfirm(finalReason), matchMedia("(prefers-reduced-motion: reduce)").matches ? 180 : 650);
    return () => clearTimeout(t);
  }, [busy]); // eslint-disable-line react-hooks/exhaustive-deps
  const close = () => { if (!busy) onClose(); };
  return <>
    <style href="concorde-modal-house" precedence="default">{MODAL_HOUSE_CSS}</style>
    <style href="concorde-drop-modal" precedence="default">{DROP_MODAL_CSS}</style>
    <dialog ref={ref} className="va vh dm" aria-labelledby={`${id}-t`} onCancel={(e) => { e.preventDefault(); close(); }}
    onClick={(e) => { if (e.target === ref.current) close(); }}>
    {busy ? <div className="va__card vh__processing" role="status" aria-live="polite">
      <div className="vh__loader" aria-hidden><i /><i /><i /></div>
      <h2 id={`${id}-t`}>Dando de baja tu auto</h2>
      <p className="vh__sub">Lo estamos quitando de Mis publicaciones…</p>
    </div> : <div className="va__card">
      <button type="button" className="va__x va__x--neg" aria-label="Cerrar" onClick={close} />
      <span className="vd-host vh__icon" aria-hidden><Vidrio s="baja" size={40} /></span>
      <h2 id={`${id}-t`}>Dar de baja</h2>
      <p className="vh__sub">{name}</p>

      {/* Motivos (16/11): 2 × 2 con ícono esmerilado. Recetas de Concorde: borde de AmountOption en reposo y el degradado
          naranja → violeta del Input enfocado al elegir. Radios nativos: flechas y lector de pantalla funcionan solos. */}
      <fieldset className="dm__why">
        <legend className="dm__why-t">¿Por qué la das de baja?</legend>
        <div className="dm__opts">{DROP_REASONS.map((r) => <label key={r} className="vd-host dm__opt">
          <input type="radio" name={`${id}-why`} checked={reason === r} onChange={() => setReason(r)} />
          <Vidrio s={REASON_ICON[r]} size={32} /><span>{r}</span>
        </label>)}</div>
      </fieldset>

      {/* La respuesta cambia con el motivo (aria-live: el lector la anuncia al elegir). */}
      <div className="dm__reply" aria-live="polite">
        {reason === "Sin ofertas" && onRepublish ? <div className="dm__save">
          <span className="vd-host dm__save-ic" aria-hidden><Vidrio s="republicar" size={32} /></span>
          <span className="dm__save-txt"><b>Republícala gratis</b><small>{REPUBLISH_DAYS} días más a la vista.</small></span>
          <button type="button" className="dm__save-go" onClick={onRepublish}>Republicar</button>
        </div> : null}
        {reason === "Ya lo vendí" ? <Info s="compras" t="¡Felicitaciones por la venta!" d="Gracias por contarnos." /> : null}
        {reason === "No quiero vender" ? <Info s="publicar" t="Vuelve cuando quieras" d="Publícalo otra vez desde Mi Garaje." /> : null}
        {reason === "Otro motivo" ? <Input className="dm__other" value={other} onChange={setOther} placeholder="Cuéntanos (opcional)" aria-label="Motivo" /> : null}
      </div>

      <Button type="button" variant="secondary" className="vh__btn" disabled={!reason} onClick={() => setBusy(true)}>Dar de baja</Button>
    </div>}
  </dialog></>;
}

export default DropModal;
