"use client";

/**
 * Comprador · paso 1 (21/10, pedido de Julio): el detalle de una oferta Negociable y la primera propuesta.
 * El DetailCard de Concorde se queda tal cual; «Negocia ahora» abre un modal como el de VMC («Modales Negociable.svg»:
 * Propuesta 1/5 · Consignación · Digita el monto · Proponer), pero en un paso: el botón ya confirma el monto.
 * Al enviar → Mi Garaje (/m/vmc?propuesta=…), donde un aviso señala la fila en la que llegará la respuesta del vendedor.
 * Reglas (skill vmc-modelo-negocio): la Negociable no tiene Precio Base ni Reserva, se propone libremente (C. de Ayuda);
 * la consignación la fija cada oferta, en SubasCoins o dólares (T&C IV.6.2.a; C. de Ayuda); 24 h por propuesta (IV.6.2.f),
 * 5 rondas (IV.6.2.e); la respuesta se sigue en Tu actividad, que en Mi Garaje es Mis negociaciones.
 */
import { useState } from "react";
import type { JSX, MouseEvent } from "react";
import Detalle, { type DetalleProps } from "@/src/blocks/detalle/desktop/Detalle";
import DetailCard from "@/src/components/DetailCard";
import { ProposalModal } from "@/src/components/ProposalModal";
import { ProposalNotice, type ProposalNoticeKind } from "@/src/components/ProposalNotice";
import { Chrome, photosOf } from "./kit";
import "./subaschat.css";
import "./propuesta.css";

// Oferta de ejemplo (la misma que entra como fila nueva en Mis negociaciones). `list` es el precio que el vendedor
// tiene en mente: lo usa el simulador del vendedor, el comprador no lo ve.
export const BUY = { name: "Nissan Sentra", year: 2020, plate: "BQZ-418", photo: "sentra", list: 15900 };
// ponytail: consignación de ejemplo (la de la captura real «S< 60 ó US$ 180»); en producción viene de la oferta.
export const DEPOSIT = { sc: 50, usd: 180 }; // 23/10 (Abraham): la consignación pasa a >S< 50
const COINS = 1250;
const usd = (n: number) => `US$ ${n.toLocaleString("en-US")}`;

// Avisos del flujo (23/10, Abraham): ProposalNotice de Concorde. Aquí solo el nombre de cada uno en el panel del lab.
const NOTICES: Record<ProposalNoticeKind, { label: string }> = {
  fondos: { label: "SubasCoins insuficientes" },
  cerrada: { label: "Ya no disponible" },
  error: { label: "Imposible procesar" },
};
type Notice = ProposalNoticeKind;
const goGarage = (amount: number) => { location.href = `/blocks/mi-garaje/m/vmc?propuesta=${amount}`; };

export default function Propuesta({ modal = "propuesta", disclaimer }: { modal?: string; disclaimer?: string }): JSX.Element {
  // 23/10 (Abraham): sale «Actual VMC»; el panel muestra la propuesta y sus avisos (?modal=fondos|cerrada|error).
  const [kind, setKind] = useState<"propuesta" | Notice>(modal in NOTICES ? modal as Notice : "propuesta");
  const [form, setForm] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null); // aviso que salió al enviar
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [going, setGoing] = useState(0);
  const openProposal = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setForm(true);
  };
  const send = (amount: number) => {
    setForm(false); setGoing(amount);
    setTimeout(() => { location.href = `/blocks/mi-garaje/m/vmc?propuesta=${amount}`; }, 1400);
  };
  const initialSafetyPlacement: NonNullable<DetalleProps["safetyPlacement"]> = disclaimer === "gallery" ? "gallery" : disclaimer === "info" ? "info" : disclaimer === "conditions" ? "conditions" : disclaimer === "banner" ? "banner" : disclaimer === "related" ? "related" : "teaser";
  const [safetyPlacement, setSafetyPlacement] = useState<NonNullable<DetalleProps["safetyPlacement"]>>(initialSafetyPlacement);
  return <Chrome vmc>
    <main className="of-main">
      <Detalle variant="negotiable" safetyPlacement={safetyPlacement} offer={{
        title: `${BUY.name} ${BUY.year}`, subtitle: `Placa ${BUY.plate}`, images: photosOf(BUY.photo), visits: false,
        detailSlot: <DetailCard variant="negotiable" miniBanner={{ src: "/mi-garaje/banners/publica/mini-publica@2x.png", alt: "¿Vendes tu auto? Recibe propuestas y tú eliges.", href: "/blocks/mi-garaje/m/vmc-publica" }} title={"Este vendedor recibe propuestas\nde compra. Aprovecha esta oportunidad\ne inicia una negociación."} ctaLabel="¡Vamos a negociar!" day="VIERNES 30" time="6:00 pm" views={128} likes={23} participants={2} onParticipate={openProposal} />,
        related: [
          { name: "Toyota Corolla", year: 2019, price: "US$ 14,200", imageSrc: photosOf("corolla")[0], variant: "live" },
          { name: "Mazda 3", year: 2020, price: "US$ 13,500", imageSrc: photosOf("mazda3")[0], variant: "live" },
          { name: "Kia Rio", year: 2021, imageSrc: photosOf("rio")[0], variant: "negotiable" },
          { name: "Suzuki Swift", year: 2022, imageSrc: photosOf("swift")[0], variant: "negotiable" },
        ],
      }} />
    </main>
    {/* 23/10 (Abraham): «Ya no disponible» sale al abrir; fondos insuficientes e imposible procesar, al enviar la propuesta. */}
    {kind === "cerrada" ? <ProposalNotice kind={kind} open={form} onClose={() => setForm(false)} />
      : <ProposalModal open={form} vehicle={`${BUY.name} ${BUY.year}`} deposit={DEPOSIT.sc} origin={origin} onCancel={() => setForm(false)} onSend={send} onGo={goGarage}
        fail={kind !== "propuesta"} onFail={() => { if (kind !== "propuesta") { setForm(false); setNotice(kind); } }} />}
    {notice ? <ProposalNotice kind={notice} open deposit={DEPOSIT} onClose={() => setNotice(null)} /> : null}
    <div className="f-sw f-sw--buy pp-sw"><div className="f-sw__bar"><b>Modal de propuesta</b></div>
      <div className="f-sw__g" role="group" aria-label="Modal de propuesta">{([["propuesta", "Propuesta"], ...Object.entries(NOTICES).map(([k, v]) => [k, v.label])] as ["propuesta" | Notice, string][]).map(([k, t]) =>
        <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>{t}</button>)}</div></div>
    <div className="f-sw f-sw--buy pp-sw pp-sw--safety"><div className="f-sw__bar"><b>Ubicación del aviso</b></div>
      <div className="f-sw__g" role="group" aria-label="Ubicación del aviso de seguridad">{([
        ["teaser", "Nube informativa"], ["info", "Bajo información"], ["conditions", "Bajo condiciones"], ["banner", "Sobre SubasCoins"], ["related", "Antes de relacionadas"],
      ] as const).map(([placement, label]) => <button key={placement} type="button" aria-pressed={safetyPlacement === placement} onClick={() => setSafetyPlacement(placement)}>{label}</button>)}</div>
    </div>
    {going ? <div className="pp-going" role="status" aria-live="polite"><b>Propuesta enviada · {usd(going)}</b><span>Te llevamos a Mis negociaciones para que sigas la respuesta…</span></div> : null}
  </Chrome>;
}
