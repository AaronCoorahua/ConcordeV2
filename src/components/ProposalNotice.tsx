"use client";

/**
 * ProposalNotice — avisos del flujo de propuesta (Mi Garaje, mi-garaje-lab · /m/vmc-propuesta): «Fondos insuficientes»
 * (con la consignación que pide la oferta), «Esta negociación ya no está disponible» e «Imposible procesar la propuesta».
 * Son los avisos de VMC (FondosInsuficientes, Notification) con la casa de los modales de Mi Garaje y el mismo
 * bloque de consignación que ProposalModal.
 */
import { useEffect, useRef } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import { MODAL_HOUSE_CSS } from "@/src/components/RepublishModal";
import { PROPOSAL_MODAL_CSS } from "@/src/components/ProposalModal";
import { Vidrio } from "@/src/components/Vidrio";

export const PROPOSAL_NOTICE_CSS = String.raw`
.vn h2 { text-wrap:balance; }
.vn .vn__fee { margin:16px 0 4px; }
.vn > .vh__sub { margin-bottom:4px; }
.vn__btn { margin-top:20px; }
.vn__msg { margin:8px 0 0; font-size:.9375rem; font-weight:500; line-height:1.4; color:#5F5B6B; }
`;

/** Textos de cada aviso. */
export const PROPOSAL_NOTICES = {
  fondos: { icon: "bolsa", title: "Fondos insuficientes", btn: "Adquiere SubasCoins" },
  cerrada: { icon: "aviso", title: "Aviso", msg: "Esta negociación ya no está disponible.", btn: "Aceptar" },
  error: { icon: "aviso", title: "Aviso", msg: "Imposible procesar la propuesta.", btn: "Aceptar" },
} as const;
export type ProposalNoticeKind = keyof typeof PROPOSAL_NOTICES;

const usd = (n: number) => `US$ ${n.toLocaleString("en-US")}`;

export interface ProposalNoticeProps {
  /** Qué aviso: fondos insuficientes, negociación cerrada o error al procesar. */
  kind: ProposalNoticeKind;
  /** Abre (showModal) o cierra el aviso. */
  open: boolean;
  /** Cerrar (×, botón, Escape). */
  onClose: () => void;
  /** Consignación de la oferta (solo «fondos»): en SubasCoins y en dólares. */
  deposit?: { sc: number; usd: number };
}

export function ProposalNotice({ kind, open, onClose, deposit }: ProposalNoticeProps): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close(); }, [open]);
  const n = PROPOSAL_NOTICES[kind];
  return <>
    <style href="concorde-modal-house" precedence="default">{MODAL_HOUSE_CSS}</style>
    <style href="concorde-proposal-modal" precedence="default">{PROPOSAL_MODAL_CSS}</style>
    <style href="concorde-proposal-notice" precedence="default">{PROPOSAL_NOTICE_CSS}</style>
    <dialog ref={ref} className="va vh" aria-labelledby="vn-title" onClose={onClose}>
      <div className="va__card vn">
        <button type="button" className="va__x va__x--neg" aria-label="Cerrar" onClick={onClose} />
        <span className="vd-host vh__icon"><Vidrio s={n.icon} size={40} /></span>
        <h2 id="vn-title">{n.title}</h2>
        {kind === "fondos" && deposit ? <>
          <p className="vh__fee vn__fee"><span className="vh__fee-label">Consignación</span><b>&gt;S&lt; {deposit.sc} ó {usd(deposit.usd)}</b></p>
          <p className="vh__sub">Recuerda: US$ 1 es igual a &gt;S&lt; 1 SubasCoin</p>
        </> : "msg" in n ? <p className="vn__msg">{n.msg}</p> : null}
        <Button type="button" variant="secondary" className="vh__btn vn__btn" autoFocus onClick={onClose}>{n.btn}</Button>
      </div>
    </dialog>
  </>;
}

export default ProposalNotice;
