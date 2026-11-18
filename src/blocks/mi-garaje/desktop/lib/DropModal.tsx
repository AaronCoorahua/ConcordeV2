/** DropModal: dar de baja una publicación.
 *  16/11: con la casa de los modales (.va/.vh, como RepublishModal) y lo que hacen hoy los marketplaces y los flujos de baja:
 *  - el motivo se elige con un toque (tarjetas 2 × 2 con ícono esmerilado; Input de Concorde para «Otro motivo») y la respuesta cambia según el motivo (si nadie ofertó, se ofrece republicar gratis antes);
 *  - el botón dice lo que hace («Dar de baja», no «Confirmar») y se activa al elegir el motivo; para salir, la × como en el resto de la casa;
 *  - procesando → cierre, con los mismos tiempos de la casa; la fila hace su salida al terminar. */
"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import { openFromTouch, REPUBLISH_DAYS } from "./RepublishModal";
import "../propuesta.css";
import "./drop-modal.css";

export const DROP_REASONS = ["Ya lo vendí", "Sin ofertas", "No quiero vender", "Otro motivo"];
const REASON_ICON: Record<string, Sec> = { "Ya lo vendí": "compras", "Sin ofertas": "participaciones", "No quiero vender": "auto", "Otro motivo": "texto" };

export type DropModalProps = {
  /** Nombre del vehículo, p. ej. "Suzuki Swift 2020". */
  name: string;
  /** Foto del vehículo (no se muestra: el modal de la casa no lleva foto). */
  photo?: string;
  /** Lo que dice hoy la fila, debajo del nombre. */
  note?: string;
  /** Si la publicación se puede republicar: con «No recibí ninguna oferta» se ofrece antes de darla de baja. */
  onRepublish?: () => void;
  /** Se llama con el motivo elegido, al terminar el «procesando». */
  onConfirm: (reason: string) => void;
  onClose: () => void;
};

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
  return <dialog ref={ref} className="va vh dm" aria-labelledby={`${id}-t`} onCancel={(e) => { e.preventDefault(); close(); }}
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
  </dialog>;
}

export default DropModal;
