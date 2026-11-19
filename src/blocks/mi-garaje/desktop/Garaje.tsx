"use client";

/**
 * Mi Garaje · diseño base (evolución de Zona + intención del mockup de Fernando).
 * Una sola arquitectura; las variantes cambian UNA dimensión cada una, como pidió Julio:
 *   1 · base       → títulos grandes (Fernando), Concorde en Wallet y acciones.
 *   2 · concorde   → igual, pero títulos con el sello CardTitle (look Zona).
 *   3 · fernando   → igual que 1, pero acciones y Wallet con el tratamiento del mockup.
 * Desktop reutiliza la fila nativa de Zona: UserProfileCard (766) + WalletBalanceCard (375).
 */
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { LayoutGroup, motion } from "framer-motion";
import type { JSX, ReactNode } from "react";
import type React from "react";
import CardTitle from "@/src/components/CardTitle";
import Button from "@/src/components/Button";
import ProfileButton from "@/src/components/ProfileButton";
import BadgeStatus from "@/src/components/BadgeStatus";
import LikeButton from "@/src/components/LikeButton";
import PriceIcon from "@/src/components/PriceIcon";
import type { OfferShelfItem } from "@/src/components/OfferShelf";
import TabSelector from "@/src/components/TabSelector";
import UserProfileCard from "@/src/components/UserProfileCard";
import WalletBalanceCard from "@/src/components/WalletBalanceCard";
import AvatarZone from "@/src/components/AvatarZone";
import StarIcon from "@/src/components/StarIcon";
import CheckIcon from "@/src/components/CheckIcon";
import InfoIcon from "@/src/components/InfoIcon";
import { Chrome, PHOTO, photosOf } from "./kit";
import { StatusTag } from "@/src/components/StatusTag";
import { VehicleRow } from "@/src/components/VehicleRow";
import { StageTabs } from "@/src/components/StageTabs";
import { FolderTabs } from "@/src/components/FolderTabs";
import { PendingToggle } from "@/src/components/PendingToggle";
import { PublishSwipe } from "@/src/components/PublishSwipe";
import { ActivitySection } from "@/src/components/ActivitySection";
import { RecommendedList, type RecommendedItem } from "@/src/components/RecommendedList";
import { AccountCard } from "@/src/components/AccountCard";
import { ActionTile } from "@/src/components/ActionTile";
import { WalletCard } from "@/src/components/WalletCard";
import { SidePanel } from "@/src/components/SidePanel";
import { AdBanner } from "@/src/components/AdBanner";
import { Vidrio, type Sec as VSec } from "@/src/components/Vidrio";
import { buildResult, ansFrom } from "./Flujo";
import { VALS } from "./valorizaciones-data";
import { Countdown, RiskMeter, StampTitle } from "./plus-parts";
import BadgeStatusLive from "@/src/components/BadgeStatus";
import NegPanel, { NegList, roundOf } from "./Negociacion";
import type { Neg, NegResult } from "./Negociacion";
import "./kit.css";
import "./garaje.css";
import "./propuesta.css";
import "./billetera.css";
import { BUY, DEPOSIT } from "./Propuesta";
import { PIEZAS, RIEL_TIPOS, bannerKey, bannerSrc, type Pieza } from "./bannersVmc";
import { FocoInline, FocoLayer, FocoPanel, useFoco } from "./Foco";
import { LabPanel } from "./LabPanel";
import { PagLab, PagList, usePag } from "./Paginado";
import { AcuerdoLab, useAcuerdo, type Deal, type DetailGo } from "./Acuerdo";
import { PubActionsLab, PubList, type PubRow } from "./MisPublicaciones";
import { NO_DEAL_NOTE, TIME_OUT_NOTE } from "./PublicationFlow";
import type { PublicationStatus } from "@/src/components/PublicationBadge";
import type { FocoId } from "./Foco";
import { NOTIF_OPEN_EVENT, notifyArrival } from "./Notifs";

const FINAL_BUY = { name: "Kia Picanto", year: 2021, plate: "PCT-521", photo: "picanto", offer: 8700, counter: 9200, list: 9800, market: 9000 };

export type Variant = "base" | "concorde" | "fernando";
/** Subvariantes del Modelo 1 (patrones investigados). Se pueden combinar. */
export type Features = { summary?: boolean; next?: boolean; tracker?: boolean; compact?: boolean };
export type Tone = "action" | "live" | "progress" | "done" | "wait";
export type Row = { id: string; name: string; year: number; plate?: string; photo: string; detail: string; status: string; tone: Tone; when?: string; ago?: string; start?: string; sideNote?: string; evaluation?: boolean; isNew?: boolean; sentByMe?: boolean; regularName?: boolean; boldDetail?: boolean; hideActor?: boolean; hideStatus?: boolean; proposals?: number; tab?: number;
  steps?: string[]; step?: number; round?: number; due?: number; dueAt?: number; history?: string[]; nextTitle?: string; nextCta?: string;
  sec?: string; chat?: string; stage?: number; // stage: pestaña de Mis participaciones (0 Consignadas · 1 Ganadas · 2 Proceso de compra · 3 Rechazadas)
  side?: "compra" | "vende"; negId?: string; chatMessage?: boolean; chatText?: string; flash?: boolean; noRole?: boolean; unread?: boolean; arrivedAt?: number; relocated?: boolean; arrival?: "accepted" | "valorizacion" | "publicacion"; entryHint?: boolean; purchaseConfirmed?: boolean; deal?: Deal; pub?: PublicationStatus; dismissed?: boolean; leaving?: boolean; expiryExit?: boolean }; // negId: comprador específico que generó el aviso // chatMessage: abre el chat ya habilitado // chatText: contenido exacto de la burbuja entrante // unread: sin abrir (negrita y punto, como Instagram) hasta que se abre // arrivedAt: llegada para subir la novedad por encima de las anteriores // relocated: ya llega animada desde otra sección // arrival: color del aterrizaje en su etapa final // entryHint: guía temporal hacia el chat recién habilitado // purchaseConfirmed: conserva el cierre del chat al reabrirlo desde Mis compras // expiryExit: bold y punto magenta mientras una expiración abandona Mis negociaciones
export type Sec = { id: string; title: string; unit: string; empty: string; emptyCta?: string; tabs?: string[]; rows: Row[]; hideCount?: boolean };

// Orden fijo (D1): primero lo que tiene plazo, al final lo que se sigue a su ritmo.
export function data(withNews: boolean, many = false): Sec[] {
  const all: Sec[] = [
    { id: "negociaciones", title: "Mis negociaciones", unit: "negociación", empty: "Cuando recibas o envíes una oferta en una publicación negociable, la seguirás aquí.", rows: [
      ...(withNews ? [{ id: "n0", name: "Toyota Corolla", year: 2019, plate: "BXT-231", photo: "corolla", detail: "Te ofrecen US$ 9,800", status: "Responder", tone: "action" as Tone, when: "Vence hoy", isNew: true, due: 2, nextTitle: "Responde la oferta por tu Toyota Corolla 2019", nextCta: "Responder" }] : []),
      { id: "n1", name: "Toyota Etios", year: 2020, plate: "AEU-804", photo: "etios", detail: "Contrapropuesta enviada · US$ 7,200", status: "Esperando respuesta", tone: "wait", when: "Ayer" },
      { id: "n2", name: "Kia Rio", year: 2021, plate: "CDF-112", photo: "rio", detail: "Propuesta enviada · US$ 8,100", status: "Esperando respuesta", tone: "wait", when: "06/10" },
    ] },
    { id: "participaciones", title: "Mis participaciones", unit: "participación", tabs: ["En vivo", "Rechazadas"], empty: "Cuando consignes para participar en una subasta, la verás aquí.", rows: [
      { id: "p1", name: "Hyundai Accent", year: 2018, plate: "F4K-220", photo: "accent", detail: "Sala abierta · cierra en 42 min", status: "En vivo", tone: "live", tab: 0, due: 1, nextTitle: "Tu subasta del Hyundai Accent 2018 está en vivo", nextCta: "Ir a la Sala" },
      { id: "p2", name: "Nissan Versa", year: 2017, plate: "ABC-901", photo: "versa", detail: "Consignación devuelta a tu Wallet", status: "Rechazada", tone: "wait", when: "02/10", tab: 1 },
    ] },
    { id: "compras", title: "Mis compras", unit: "compra", tabs: ["En proceso", "Historial"], empty: "Las subastas que ganes aparecerán aquí con su proceso de compra.", rows: [
      { id: "c1", name: "Kia Rio", year: 2021, plate: "CDF-112", photo: "rio", detail: "Ganada el 07/10", status: "Pago pendiente", tone: "action", when: "Hasta el 12/10", tab: 0, due: 3,
        steps: ["Ganada", "Pago", "Documentos", "Entrega"], step: 1, nextTitle: "Paga tu Kia Rio 2021", nextCta: "Pagar" },
      { id: "c2", name: "Suzuki Swift", year: 2016, plate: "D2E-554", photo: "swift", detail: "Compra completada", status: "Entregado", tone: "done", when: "21/09", tab: 1, steps: ["Ganada", "Pago", "Documentos", "Entrega"], step: 4 },
    ] },
    { id: "publicaciones", title: "Mis publicaciones", unit: "vehículo", empty: "Publica tu vehículo: primero lo valorizas y luego agregas fotos y descripción.", emptyCta: "Publicar", rows: [
      { id: "u1", name: "Volkswagen Nivus", year: 2022, plate: "BXT-231", photo: "nivus", detail: "Pago recibido", status: "Pendiente de aprobación", tone: "progress", when: "08/10", steps: ["Pago", "Aprobación VMC", "Publicada"], step: 1 },
      { id: "u2", name: "Toyota Hilux", year: 2020, plate: "AEU-804", photo: "hilux", detail: "Negociable · 2 ofertas", status: "Publicada", tone: "done", when: "01/10", steps: ["Pago", "Aprobación VMC", "Publicada"], step: 3 },
    ] },
    { id: "valorizaciones", title: "Mis valorizaciones", unit: "valorización", empty: "Valoriza tu vehículo y guarda el resultado para consultarlo o publicarlo después.", emptyCta: "Valorizar", hideCount: true, rows: [
      { id: "v1", name: "Toyota Corolla", year: 2019, plate: "BXT-231", photo: "corolla", detail: "Valor de mercado US$ 10,400", status: "Guardada", tone: "done", when: "09/10" },
      { id: "v2", name: "Toyota Hilux", year: 2020, plate: "AEU-804", photo: "hilux", detail: "Valor de mercado US$ 24,800", status: "Guardada", tone: "done", when: "28/09" },
      { id: "v3", name: "Kia Picanto", year: 2017, plate: "AFP-447", photo: "picanto", detail: "Valor de mercado US$ 6,300 · −2 % desde que la guardaste", status: "Guardada", tone: "done", when: "01/10" },
    ] },
  ];
  if (!many) return all;
  // Lab «Más de 3 pendientes»: tres pendientes extra para probar el resumen agrupado.
  all[0].rows.push(
    { id: "n3", name: "Nissan Sentra", year: 2019, plate: "BKL-552", photo: "sentra", detail: "Te ofrecen US$ 8,500", status: "Responder", tone: "action", when: "Vence mañana", due: 4, nextTitle: "Responde la oferta por tu Nissan Sentra 2019", nextCta: "Responder" },
    { id: "n4", name: "Mazda 3", year: 2018, plate: "CXR-310", photo: "mazda3", detail: "Te ofrecen US$ 11,200", status: "Responder", tone: "action", when: "Vence en 2 días", due: 5, nextTitle: "Responde la oferta por tu Mazda 3 2018", nextCta: "Responder" });
  all[2].rows.push({ id: "c3", name: "Chevrolet Sail", year: 2020, plate: "ATV-918", photo: "sail", detail: "Ganada el 08/10", status: "Pago pendiente", tone: "action", when: "Hasta el 14/10", tab: 0, due: 6,
    steps: ["Ganada", "Pago", "Documentos", "Entrega"], step: 1, nextTitle: "Paga tu Chevrolet Sail 2020", nextCta: "Pagar" });
  return all;
}

/** Pulso Fuente: los campos que existen en VMC (Zona, mockup de Fernando, handoff de Julio, guía de Cobblepot)
 *  más mejoras factibles con datos de VMC/AVT (marcadas como propuesta D12).
 *  Vehículos y placas del mockup; montos, plazos, etapas e historial son datos de EJEMPLO y se apagan con «Datos de ejemplo»
 *  (withData=false): el campo se sigue viendo, vacío. */
export function sourced(withNews: boolean, withData = true): Sec[] {
  const v = (x: string) => (withData ? x : "—");
  const at = (ms: number) => (withData ? T0 + ms : NaN);
  const h = (...xs: string[]) => (withData ? xs : ["Sin movimientos registrados"]);
  const BUY = ["Ganada", "Pago", "Documentos", "Entrega"];
  // Mis valorizaciones: valor y variación de cada auto guardado, calculados con el motor AVT (se evalúan al render: Flujo importa Garaje).
  const mkt = (id: string) => { const x = VALS.find((y) => y.id === id)!; return `US$ ${buildResult({ ...x, ans: ansFrom(x.factors) }).market.toLocaleString("en-US")}`; };
  const rows: Record<string, Row[]> = {
    negociaciones: [
      { id: "sf1", side: "compra", round: 5, name: FINAL_BUY.name, year: FINAL_BUY.year, plate: v(FINAL_BUY.plate), photo: FINAL_BUY.photo, detail: `Propuesta final enviada · ${v(usd(FINAL_BUY.offer))}`, status: "Esperando respuesta", tone: "wait", ago: v("31 min"), sentByMe: true, dueAt: at(23.5 * 3.6e6), tab: 0,
        history: h(`Hace 31 min · Enviaste tu propuesta de la ronda 5: ${usd(FINAL_BUY.offer)}`, "Hoy · El vendedor contrapropuso US$ 9,250 en la ronda 4", "Hoy · Enviaste US$ 8,600 en la ronda 4", "Hoy · El vendedor contrapropuso US$ 9,400 en la ronda 3", "Hoy · Enviaste US$ 8,550 en la ronda 3", "Ayer · El vendedor contrapropuso US$ 9,550 en la ronda 2", "Ayer · Enviaste US$ 8,500 en la ronda 2", "Ayer · El vendedor contrapropuso US$ 9,700 en la ronda 1", "Ayer · Enviaste US$ 8,400 en la ronda 1") },
      ...(withNews ? [{ id: "sn0", side: "vende" as const, name: "Volkswagen Nivus", year: 2022, plate: "BXT-231", photo: "nivus", detail: "2 propuestas", status: "", tone: "action" as Tone, when: v("Vence en 7h"), ago: v("3h"), due: 2, dueAt: at(2 * 3.6e6), nextCta: "Responder", hideStatus: true, tab: 0,
        // Una fila por auto, no por negociación: el vendedor ve cuántas propuestas tiene y la más alta (T&C IV.6.2.h: puede aceptar cualquiera).
        history: h("Hoy 10:24 · Comprador 1 te ofreció US$ 17,500", "Hoy 9:05 · Comprador 2 subió a US$ 17,800", "Ayer · Comprador 3 te ofreció US$ 16,900", "01/10 · Publicaste el vehículo como negociable") }] : []),
      { id: "sn1", side: "compra", regularName: true, round: 2, name: "Mazda 3", year: 2018, plate: v("CXR-310"), photo: "mazda3", detail: "Contrapropuesta recibida · US$ 13,500", status: "Responder", tone: "action", when: v("12 min"), dueAt: at(23.8 * 3.6e6), tab: 0,
        history: h("Hace 12 min · El vendedor te pidió US$ 13,500 en la ronda 2", "Hoy · Enviaste US$ 12,600 en la ronda 2", "Hoy · El vendedor te pidió US$ 13,700 en la ronda 1", "Hoy · Enviaste US$ 12,000 en la ronda 1") },
      { id: "sn2", side: "compra", name: "Toyota Corolla", year: 2019, plate: v("BMK-562"), photo: "corolla", detail: "Tu propuesta ha sido rechazada.", status: "Rechazada", tone: "wait", hideActor: true, when: v("04/10"), tab: 1,
        history: h("04/10 · El vendedor rechazó tu propuesta y se liberó tu consignación", "03/10 · Enviaste una propuesta de US$ 9,500") },
      { id: "sn3", side: "vende", name: "Volkswagen Nivus", year: 2022, plate: "BXT-231", photo: "nivus", detail: `Rechazaste una propuesta de ${v("US$ 15,800")}`, status: "Rechazada", tone: "wait", when: v("03/10"), tab: 1,
        history: h("03/10 · Rechazaste la propuesta: la negociación terminó", "02/10 · Te ofrecieron US$ 15,800") },
    ],
    participaciones: [
      { id: "sp1", name: "Hyundai Accent", year: 2018, plate: v("F4K-220"), photo: "accent", detail: "Sala abierta", status: "En vivo", tone: "live", boldDetail: true, isNew: true, tab: 0, due: 1, dueAt: at(42 * 6e4), nextCta: "Ir a la Sala", stage: 0,
        history: h("Hoy · La sala abrió", "07/10 · Consignaste para participar") },
      { id: "sp3", name: "Toyota Etios", year: 2020, plate: v("AWQ-318"), photo: "etios", detail: `Consignación lista · subasta el ${v("15/10")}`, start: v("15/10 · 1:00 pm"), status: "Próxima", tone: "wait", regularName: true, tab: 0, stage: 0,
        history: h("09/10 · Consignaste para participar") },
      { id: "sp4", name: "Chevrolet Sail", year: 2019, plate: v("C7L-903"), photo: "sail", detail: `Consignación lista · subasta el ${v("17/10")}`, start: v("17/10 · 11:00 am"), status: "Próxima", tone: "wait", regularName: true, hideStatus: true, tab: 0, stage: 0,
        history: h("10/10 · Consignaste para participar") },
      { id: "sc1", name: "Kia Rio", year: 2021, plate: v("CDF-112"), photo: "rio", detail: "Mejor postor · En evaluación", sideNote: "Quedan 6 días hábiles", evaluation: true, status: "", tone: "wait", hideActor: true, hideStatus: true, tab: 0, stage: 1,
        history: h("07/10 · Quedaste como mejor postor · evaluación en curso (máximo 10 días hábiles)", "07/10 · Cerró la subasta") },
    ],
    compras: [],
    publicaciones: [
      // 29/10: ejemplo fijo de publicación con propuesta aceptada, para que «En SubasChat» se vea sin simular nada.
      { id: "su3", name: "Kia Rio", year: 2021, plate: "CDF-112", photo: "rio", detail: "Acuerdo por US$ 12,500", status: "Publicada", tone: "done", regularName: true, hideStatus: true, proposals: 4, deal: "aceptada",
        history: h("Hoy · Aceptaste la propuesta de US$ 12,500 · sigue en SubasChat", "20/10 · Publicación activa") },
      { id: "su2", name: "Toyota Hilux", year: 2020, plate: "AEU-804", photo: "hilux", detail: "Publicado: 08/10/2026", status: "Publicada", tone: "done", regularName: true, hideStatus: true, proposals: 3,
        history: h("08/10 · Publicación activa", "08/10 · Completaste fotos y descripción") },
      { id: "su1", name: "Volkswagen Nivus", year: 2022, plate: "BXT-231", photo: "nivus", detail: "Enviada a revisión", status: "Pendiente de aprobación", tone: "progress", regularName: true, hideStatus: true, proposals: 4, pub: "revision",
        history: h("01/10 · Enviamos tu publicación a revisión", "30/09 · Pagaste el fee de >S< 25") },
      // 04/11 (Julio): una publicación por casuística; todas van en la misma lista.
      ...([
        ["su6", "Toyota Etios", 2020, "etios", "publicada", "Subasta el 12/11 · 3:00 pm", "28/10"],
        ["su7", "Suzuki Swift", 2020, "swift", "desierta", "No se recibió ninguna oferta", "26/10"],
        ["su8", "Chevrolet Sail", 2019, "sail", "no-concretada", NO_DEAL_NOTE, "24/10"],
        ["su11", "Mazda 3", 2018, "mazda3", "no-concretada", TIME_OUT_NOTE, "22/10"],
        ["su10", "Kia Picanto", 2021, "picanto", "vendido", "Vendido en VMC", "15/10"],
      ] as const).map(([id, name, year, photo, pub, detail, when]): Row => ({ id, name, year, photo, detail, pub, when, status: "Publicada", tone: "done", regularName: true, hideStatus: true, proposals: 0 })),
    ],
    valorizaciones: [
      // Cifras = las del motor AVT (buildResult → runAVT), las mismas de Mis valorizaciones.
      { id: "sv2", name: "Toyota Hilux", year: 2020, plate: "AEU-804", photo: "hilux", detail: `Valor de mercado ${v(mkt("sv2"))}`, status: "", tone: "done", hideStatus: true },
      { id: "sv1", name: "Volkswagen Nivus", year: 2022, plate: "BXT-231", photo: "nivus", detail: `Valor de mercado ${v(mkt("sv1"))}`, status: "", tone: "done", hideStatus: true },
    ],
  };
  // 23/10: Mis participaciones va en cuatro etapas (selector en FSection) y Mis compras solo guarda lo finalizado.
  const tabs: Record<string, string[] | undefined> = { negociaciones: ["En curso", "Rechazadas"], participaciones: undefined, compras: undefined };
  const empty: Record<string, string> = { compras: "Aún no tienes compras." };
  return data(withNews).map((x) => ({ ...x, tabs: x.id in tabs ? tabs[x.id] : x.tabs, empty: empty[x.id] ?? x.empty, rows: rows[x.id] }));
}

export const ROLE: Record<string, "compra" | "vende"> = { v2: "vende", v3: "vende", n3: "vende", n4: "vende", c3: "compra", n0: "vende", n1: "compra", n2: "compra", p1: "compra", p2: "compra", c1: "compra", c2: "compra", u1: "vende", u2: "vende", v1: "vende" };

export const plural = (n: number, unit: string) => `${n} ${n === 1 ? unit : unit.endsWith("ón") ? unit.replace(/ón$/, "ones") : unit + "s"}`;

export function Chevron(): JSX.Element {
  return <svg className="g-chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/** Rol en Mis negociaciones (21/10): misma receta que BadgeStatus (EN VIVO / PRÓXIMA). Tres opciones en el panel del lab
 *  (data-rol en .g-page): 1 Compra/Venta en degradado, 2 Ofreces/Te ofrecen en degradado, 3 Compra/Venta en vidrio. */
function RoleBadge({ side }: { side: "compra" | "vende" }): JSX.Element {
  const buy = side === "compra";
  return <span className={`badgestatus rb rb--${side}`}><span className="rb__a">{buy ? "Compra" : "Venta"}</span><span className="rb__b">{buy ? "Ofreces" : "Te ofrecen"}</span></span>;
}

function Heading({ variant, title, sub, action, news, level = 2, group }: { variant: Variant; title: string; sub?: string; action?: ReactNode; news?: number; level?: 1 | 2; group?: boolean }): JSX.Element {
  const badge = news ? <span className="g-newcount">{news} {news === 1 ? "nueva" : "nuevas"}</span> : null;
  // Modelo 2: el sello completo (CardTitle) solo en la página y en el grupo «Tu actividad»;
  // las secciones usan StampTitle (un bracket, título que puede partirse). Jerarquía sin repetir el sello.
  if (variant === "concorde" && (level === 1 || group)) return <div className={`g-head g-head--concorde g-head--${level}${group ? " g-head--group" : ""}`}>
    <CardTitle title={title} subtitle={sub ?? ""} titleSize={level === 1 ? 40 : 26} subtitleSize={level === 1 ? 16 : 14} />{action}
  </div>;
  if (variant === "concorde") return <div className="g-head g-head--stamp"><StampTitle sub={sub}>{title}{badge}</StampTitle>{action}</div>;
  const H = level === 1 ? "h1" : "h2";
  return <div className={`g-head g-head--${level}`}><div><H>{title}{badge}</H>{sub ? <p>{sub}</p> : null}</div>{action}</div>;
}

export type Pending = Row & { sec: string; secTitle: string };
export const pendingOf = (secs: Sec[]): Pending[] => secs.flatMap((s) => s.rows.filter((r) => r.due).map((r) => ({ ...r, sec: s.id, secTitle: s.title }))).sort((a, b) => (a.due ?? 9) - (b.due ?? 9));

/** Banda de estado: ¿estoy al día? en 5 segundos. Cada contador lleva a su sección (patrón status bar). */
function SummaryBand({ secs, loading }: { secs: Sec[]; loading: boolean }): JSX.Element {
  const p = pendingOf(secs);
  if (loading) return <div className="g-band g-band--loading" role="status" aria-label="Cargando resumen"><i /><i /><i /></div>;
  if (!p.length) return <div className="g-band g-band--ok"><CheckIcon size={20} /><b>Todo al día.</b><span>No tienes ofertas, subastas ni pagos pendientes.</span></div>;
  return <nav className="g-band" aria-label="Pendientes">
    <b className="g-band__lead">{p.length === 1 ? "1 pendiente" : `${p.length} pendientes`}</b>
    {p.map((r) => <a key={r.id} href={`#sec-${r.sec}`} className={`g-band__chip g-band__chip--${r.tone}`}>
      {r.tone === "live" ? <i aria-hidden className="g-band__dot" /> : null}<span>{r.status === "Responder" ? "Oferta por responder" : r.status}</span><small>{r.secTitle.replace("Mis ", "")}</small>
    </a>)}
  </nav>;
}

const T0 = Date.now();
const DEADLINE: Record<string, number> = { p1: T0 + 42 * 6e4, n0: T0 + 6.5 * 3.6e6, c1: T0 + 3 * 864e5, n3: T0 + 26 * 3.6e6, n4: T0 + 50 * 3.6e6, c3: T0 + 5 * 864e5 };

/** Siguiente paso: UNA acción, la de plazo más corto (patrón task / next best action). */
function NextStep({ secs, loading, variant }: { secs: Sec[]; loading: boolean; variant: Variant }): JSX.Element | null {
  const [first, ...rest] = pendingOf(secs);
  if (loading || !first) return null;
  const more = rest.length ? <ProfileButton href={`#sec-${rest[0].sec}`}>{`Y ${rest.length} ${rest.length === 1 ? "pendiente más" : "pendientes más"}`}</ProfileButton> : null;
  // Fernando + DS: si lo primero es una subasta en vivo, se usa LiveNowCard (pieza del 4) en formato ancho.
  if (variant === "fernando" && first.tone === "live") return <section className="g-livenext" aria-labelledby="g-next">
    <img src={PHOTO[first.photo]} alt="" width={1165} height={260} />
    <div className="g-livenext__glass">
      <div className="g-livenext__top"><BadgeStatusLive variant="live" label="EN VIVO" /><Countdown to={DEADLINE[first.id]} label="Cierra en" /></div>
      <h2 id="g-next">{first.nextTitle}</h2>
      <div className="g-livenext__actions"><Button variant="primary">{first.nextCta}</Button>{more}</div>
    </div>
  </section>;
  return <section className={`g-next g-next--${first.tone}`} aria-labelledby="g-next">
    <img src={PHOTO[first.photo]} alt="" width={160} height={120} />
    <div className="g-next__body">
      <h2 id="g-next">{first.nextTitle}</h2>
      <p>{first.detail}{first.when && variant !== "fernando" ? ` · ${first.when.toLowerCase()}` : ""}</p>
      {variant === "fernando" && DEADLINE[first.id] ? <Countdown to={DEADLINE[first.id]} label={first.tone === "live" ? "Cierra en" : first.sec === "compras" ? "Paga en" : "Vence en"} /> : null}
      <div className="g-next__actions">
        <Button variant={first.tone === "live" ? "primary" : first.sec === "negociaciones" ? "negotiable" : "secondary"}>{first.nextCta}</Button>
        {rest.length ? <ProfileButton href={`#sec-${rest[0].sec}`}>{`Y ${rest.length} ${rest.length === 1 ? "pendiente más" : "pendientes más"}`}</ProfileButton> : null}
      </div>
    </div>
  </section>;
}

/** glass: íconos de vidrio (+ en Publicar, aguja en Valorizar) en Pulso Fuente; la maqueta VMC conserva los de Material. */
function Actions({ variant, sober, vmc }: { variant: Variant; sober?: boolean; vmc?: boolean }): JSX.Element {
  // Publicar y Valorizar: ActionTile de Concorde.
  if (variant === "fernando") return <div className="f-actions">
    <div className="f-actions__row">
      <ActionTile tone="publish" title="Publica tu Vehículo" hint="¡Un solo pago hasta que lo vendas!" onClick={() => { location.href = vmc ? "/blocks/mi-garaje/m/vmc-publica" : sober ? "/blocks/mi-garaje/m/publica" : "/blocks/mi-garaje/m/publicar"; }} />
      <ActionTile tone="value" title="Valoriza tu vehículo" hint="Obtén una tasación en minutos" onClick={() => { location.href = vmc ? "/blocks/mi-garaje/m/vmc-valuar" : sober ? "/blocks/mi-garaje/m/valuar" : "/blocks/mi-garaje/m/valorizar"; }} />
    </div>
  </div>;
  return <div className="g-actions">
    <div className="g-actions__btns"><Button variant="primary">Publicar</Button><Button variant="outline">Valorizar</Button></div>
    <p>Ambos empiezan valorizando tu vehículo.</p>
  </div>;
}


function Wallet({ variant, withData = true }: { variant: Variant; withData?: boolean }): JSX.Element {
  // Fernando+ (la pantalla): WalletCard de Concorde, con el brillo de carta elegido el 22/10.
  if (variant === "fernando") return <WalletCard balance={withData ? "320" : "0"} subasCoins={withData ? "1,250" : "0"} transactionsHref="#" />;
  return <WalletBalanceCard title="Mi Wallet" subasCoins=">S< 1,250" saldo="US$ 320.00" className="g-wallet" />;
}

/** Campaña «Venta para empresas» (20/10, revisión 3 de POPs): variante 04-flotas, la única que habla del mismo activo que Mi Garaje.
 *  Variaciones para probar en el lab (selector «Banner»): el arte original en JPG y tres versiones en HTML con el copy aprobado
 *  y el lenguaje de Mi Garaje. Enlace y alt de manifest.json. */
export type CampView = "reservado" | "arte" | "vitrina" | "lote" | "noche" | "flota";
export const CAMP_VIEWS: { id: CampView; label: string; hint: string }[] = [
  { id: "reservado", label: "Sin campaña", hint: "El espacio actual, sin la campaña" },
  { id: "arte", label: "Original (HTML)", hint: "El arte de POPs con el DS de subastop.com (200 × 400 / 776 × 232)" },
  { id: "vitrina", label: "Vitrina", hint: "Texto arriba y vehículo grande abajo, sobre lila claro" },
  { id: "lote", label: "Lote", hint: "Como una tarjeta de lote: imagen arriba con insignia, texto y botón" },
  { id: "noche", label: "Noche", hint: "Escenario oscuro centrado, con reflejo en el piso" },
  { id: "flota", label: "Fila", hint: "Fila compacta: texto y enlace a la izquierda, vehículo a la derecha" },
];
// Espacio «BANNER» de la barra lateral (200 × 264, de concorde/): se llena con un portal, sin tocar concorde/.
export type SideView = Exclude<CampView, "flota">;
const SIDE_VIEWS = CAMP_VIEWS.filter((v) => v.id !== "flota").map((v) => (v.id === "arte" ? { ...v, hint: "El arte de POPs con el DS de subastop.com (200 × 264)" } : v)) as { id: SideView; label: string; hint: string }[];
const CAMP_HREF = (f: string) => `https://www.subastop.com/cita?utm_source=vmc&utm_medium=banner&utm_campaign=venta_empresa&utm_content=04-flotas_${f}#contact-form`;
// Flota recortada (PNG con transparencia, pngimg.com · CC BY-NC 4.0: solo maqueta; en producción, fotos propias de lotes VMC).
const FLEET = [["sedan", "pr__car--back"], ["pickup", "pr__car--mid"], ["caja", "pr__car--front"]] as const; // atrás → adelante
// Vehículo protagonista, elegible en el panel (?vehiculo=): uno solo o la flota completa.
export type Veh = "caja" | "pickup" | "suv" | "sedan" | "flota";
const VEH_VIEWS: { id: Veh; label: string; hint: string }[] = [
  { id: "caja", label: "Camión", hint: "Camión de caja (Fuso Canter)" },
  { id: "pickup", label: "Pickup", hint: "Toyota Tacoma" },
  { id: "suv", label: "SUV", hint: "Toyota Land Cruiser" },
  { id: "sedan", label: "Sedán", hint: "Toyota Corolla" },
  { id: "flota", label: "Flota (3)", hint: "Camión, pickup y sedán juntos" },
];
/** Campaña «Venta para empresas» (20/10, rev. 3 de POPs), variante 04-flotas. Cuarta ronda: jerarquía y recetas de los banners de
 *  vmc-index-lab («Un solo pago», maquinaria A y C, «¿Vendes varios vehículos?»). Lectura en Z: chip → titular → bajada → CTA, con la flota
 *  recortada como la masa visual abajo a la derecha. Un solo enlace (el CTA); la pieza entera es clicable delegando en él. Copy aprobado. */
function Promo({ slot, view, veh, b }: { slot: "rail" | "side"; view: CampView; veh: Veh; b: Pieza }): JSX.Element {
  const href = CAMP_HREF(slot === "side" ? "side264" : view === "arte" ? "side400" : view);
  // La pieza HTML de /banners (el enlace vive dentro del iframe): AdBanner de Concorde.
  if (view === "arte") return slot === "side"
    ? <AdBanner slot="side" src={bannerSrc(b, "side400")} title={`Publicidad: ${b.titulo}`} />
    : <AdBanner slot="rail" src={bannerSrc(b, "side400")} stripSrc={bannerSrc(b, "strip776")} title={`Publicidad: ${b.titulo}`} />;
  const side = slot === "side", dark = view === "noche", row = view === "flota";
  const cars = veh === "flota" ? FLEET : ([[veh, "pr__car--front"]] as const);
  const sr = <span className="sr-only"> (se abre en otra pestaña)</span>;
  // Toda la pieza es clicable delegando en el CTA (el ::after del botón de Concorde ya es su brillo); el CTA sigue siendo el único enlace.
  const open = (e: React.MouseEvent<HTMLElement>) => { if (!(e.target as Element).closest("a") && !getSelection()?.toString()) e.currentTarget.querySelector("a")?.click(); };
  return <aside className={`pr pr--${slot} pr--${view}${veh === "flota" ? " pr--many" : ""}${side ? "" : " f-ad"}`} aria-label="Publicidad" onClick={open}>
    <span className="pr__shine" aria-hidden />
    <div className="pr__stage" aria-hidden>{cars.map(([f, c]) => <img key={f} className={`pr__car ${c}`} src={`/mi-garaje/banners/flota-${f}.png`} alt="" />)}</div>
    <span className="pr__chip">Venta para empresas</span>
    <h3 className="pr__h">¿Vehículos parados? Ponlos a la venta.</h3>
    {/* Bajada corta aprobada («Un vehículo o toda una flota.»). */}
    <p className="pr__p">Un vehículo o toda una flota.</p>
    {row
      ? <a className="pr__link" href={href} target="_blank" rel="noopener">Quiero vender mi flota<svg width="16" height="16" viewBox="0 0 20 20" aria-hidden><circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9 7l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>{sr}</a>
      : <a className={`${dark ? "pr-glass" : "pvbtn"} pr__cta`} href={href} target="_blank" rel="noopener">Quiero vender mi flota{sr}</a>}
  </aside>;
}

/** Selector flotante de la maqueta (como «Controles» de index-lab): prueba las variaciones de los dos espacios en la misma página.
 *  El estado vive en la URL (?banner=&lateral=&vehiculo=) para recargar o compartir la combinación. */
/** Panel «Banners» (22/10, Abraham): a la izquierda; elige qué pieza de /banners-publica va en cada espacio. Regla: la barra
 *  lateral y el riel derecho nunca muestran la misma pieza (la usada por el otro espacio sale deshabilitada; «Intercambiar» las cruza). */
/** Mi billetera · letras (22/10, comentario de Silvana): «Mi billetera» y «Transacciones» se notaban poco. Solo color, tamaño
 *  y peso de las letras; el fondo de la tarjeta no cambia. Se elige en el panel «Mi billetera» del lab (?billetera=…). */
const BILL = [
  { id: "actual", label: "Actual", hint: "Hoy: Mi billetera blanco 16/700 · Transacciones blanco al 72 % 12/600." },
  { id: "blanco", label: "Enlace blanco", hint: "Solo Transacciones pasa a blanco pleno 12/700; el título queda igual." },
  { id: "fuerte", label: "Título fuerte", hint: "Mi billetera 18/800 · Transacciones blanco pleno 13/700." },
  { id: "naranja", label: "Naranja", hint: "Mi billetera 18/800 · Transacciones en el naranja claro del DS (#FDD8A4), el acento de Publicar." },
  { id: "lila", label: "Lila", hint: "Mi billetera 18/800 · Transacciones en lila claro (#CFBAFF), el de las etiquetas Saldo y SubasCoins." },
  { id: "subrayado", label: "Subrayado", hint: "Mi billetera 18/800 · Transacciones blanco pleno 13/700 y subrayado: se lee como enlace." },
  // Tarjeta (22/10, segunda ronda): además de las letras, algo que llame la atención.
  { id: "esmerilado", label: "Borde esmerilado", hint: "Marco degradado lila → blanco (el borde del botón secundario) con halo violeta; Transacciones en píldora con borde." },
  { id: "halo", label: "Halo", hint: "Una luz recorre el borde de la billetera sin parar (4 s por vuelta) con su resplandor; Mi billetera 18/800 y Transacciones blanco." },
  { id: "brillo", label: "Brillo de carta", hint: "La elegida. Como una carta que brilla, con Transacciones subrayado: una luz blanca pasa por dentro de toda la tarjeta de esquina a esquina, despacio (3.5 s de pasada, cada 7 s); Mi billetera 18/800 y Transacciones blanco." },
  { id: "primary", label: "Fondo primary", hint: "Fondo con el degradado del botón primary (naranja → violeta) y su borde; letras blancas." },
  { id: "live", label: "Fondo live", hint: "Fondo con el naranja de EN VIVO (BadgeStatus live) y su borde; letras blancas. Ojo: el blanco sobre naranja claro tiene poco contraste." },
  { id: "pildora", label: "Píldora", hint: "Fondo igual; Mi billetera 18/800 y Transacciones como botón píldora de vidrio con flecha: se ve que se puede tocar." },
] as const;
const BILL_LETRAS = 6; // las primeras son solo letras; las demás tocan la tarjeta
type Bill = (typeof BILL)[number]["id"];
/** Selector de pestañas (23/10): color y forma de los selectores de Mis negociaciones y Mis participaciones (?pill=…&forma=…). */
const PILL_COLOR = [
  { id: "morado", label: "Morado", hint: "La de Concorde: relleno violeta oscuro, texto blanco." },
  { id: "medio", label: "Violeta", hint: "Relleno violeta medio (#8460E5), texto blanco: más luminoso que el oscuro." },
  { id: "suave", label: "Lila", hint: "Relleno lila (#EDE5FF) con borde violeta claro y texto violeta oscuro." },
  { id: "glass", label: "Glass", hint: "Vidrio blanco con brillo, borde violeta degradado y sombra lila; texto violeta." },
  { id: "contorno", label: "Contorno", hint: "Blanco con borde violeta de 2 px y texto violeta." },
] as const;
const PILL_FORMA = [
  { id: "pildora", label: "Píldora", hint: "Contenedor y pestañas redondos (la de hoy)." },
  { id: "redondeado", label: "Redondeado", hint: "Esquinas de 12 px en el contenedor y 8 px en las pestañas." },
  { id: "chips", label: "Chips", hint: "Sin contenedor: cada pestaña es su propia píldora con borde." },
  { id: "subrayado", label: "Subrayado", hint: "Sin píldora: la activa lleva una línea del color elegido debajo." },
  { id: "carpeta", label: "Carpeta", hint: "Pestañas de carpeta: la activa es una tarjeta blanca con borde arriba y a los lados, unida a la lista; las demás en gris sobre una línea." },
] as const;
type PillColor = (typeof PILL_COLOR)[number]["id"];
type PillForma = (typeof PILL_FORMA)[number]["id"];
const STAGES = ["Consignadas", "Ganadas", "Proceso de compra", "Rechazadas"];
/** Disposición de las cuatro etapas de Mis participaciones (?etapas=…). */
const ETAPAS = [
  { id: "grilla", label: "Grilla 2 × 2", hint: "Dos filas de dos, con el número entre paréntesis (la de hoy)." },
  { id: "fila", label: "Una fila", hint: "Las cuatro en una fila del mismo ancho; el texto baja a dos líneas si no entra." },
  { id: "segmentado", label: "Segmentado", hint: "Barra rectangular con divisores entre pestañas y la activa rellena (como un segmented control)." },
  { id: "ios", label: "Riel gris", hint: "Riel gris claro; la activa es una tarjeta blanca elevada con sombra (estilo iOS)." },
  { id: "numero", label: "Con número", hint: "Grilla 2 × 2 donde cada pestaña lleva su número en un círculo a la izquierda." },
  { id: "contador", label: "Contador", hint: "Una fila: el número grande arriba y la etapa abajo, como un resumen." },
  { id: "scroll", label: "Deslizable", hint: "Una fila con el ancho de cada texto; se desliza de lado si no entra." },
] as const;
type Etapas = (typeof ETAPAS)[number]["id"];
/** Pista de que la fila de etapas se desliza (forma Carpeta o Deslizable): flecha con borde difuminado o barra de desplazamiento. */
const INDICIO = [
  { id: "flecha", label: "Flechas", hint: "Botones ‹ › a cada lado, solo del lado que tiene más (al final queda solo ‹). También se arrastra con el mouse o el dedo." },
  { id: "barra", label: "Barra", hint: "Una barra propia bajo la línea: se arrastra el pulgar o se toca el riel. Los tabs no se arrastran con el mouse." },
  { id: "mas", label: "Menú «Más»", hint: "Sin deslizar: entran las que caben y el resto va en «Más ▾». La elegida siempre queda a la vista." },
] as const;
type Indicio = (typeof INDICIO)[number]["id"];
/** Salida de la fila al cerrarse una negociación (rechazo o expiración). 30/10 (Aaron): se veía muy discreta y muy pegada
 *  al cierre del panel; el lab compara estilos, duración y la espera tras cerrar el panel (data-salida y --salida-* en garaje.css). */
const SALIDA = [
  { id: "actual", label: "Anterior", hint: "La de antes: se desvanece y se corre unos px a la derecha." },
  { id: "crece", label: "Crece y se va", hint: "Se agranda con sombra, como si se despegara de la lista, y sale achicándose a la derecha." },
  { id: "negrita", label: "Negrita", hint: "Todo el texto pasa a negrita, se sostiene un momento y luego se desvanece." },
  { id: "parpadea", label: "Parpadea", hint: "Parpadea tres veces y luego se desvanece." },
  { id: "magenta", label: "Borde magenta", hint: "Se marca con un borde magenta mientras se va." },
  { id: "pliega", label: "Se pliega", hint: "Se desvanece y la lista se cierra sobre el hueco, en vez de saltar." },
] as const;
type Salida = (typeof SALIDA)[number]["id"];
const SALIDA_MS = [{ id: "620", label: "0.6 s", hint: "La duración anterior." }, { id: "1200", label: "1.2 s", hint: "El doble." }, { id: "2000", label: "2 s", hint: "Lenta: se alcanza a seguir." }] as const;
const SALIDA_ESPERA = [{ id: "0", label: "Sin espera", hint: "Antes: la fila se iba mientras el panel se cerraba." }, { id: "700", label: "0.7 s", hint: "Empieza cuando el panel ya se cerró." }, { id: "1400", label: "1.4 s", hint: "Una pausa con la lista a la vista antes de que se vaya." }] as const;
type SalidaMs = (typeof SALIDA_MS)[number]["id"];
type SalidaEspera = (typeof SALIDA_ESPERA)[number]["id"];
function SalidaLab({ v, ms, espera, set, setMs, setEspera, probar }: { v: Salida; ms: SalidaMs; espera: SalidaEspera; set: (x: Salida) => void; setMs: (x: SalidaMs) => void; setEspera: (x: SalidaEspera) => void; probar: () => void }): JSX.Element {
  const g = <T extends string>(title: string, opts: readonly { id: T; label: string; hint: string }[], cur: T, pick: (x: T) => void) =>
    <div className="f-sw__g" role="group" aria-label={title}><span className="f-sw__k"><b>{title}</b></span>
      {opts.map((o) => <button key={o.id} type="button" title={o.hint} aria-pressed={cur === o.id} onClick={() => pick(o.id)}>{o.label}</button>)}
      <small className="f-sw__hint">{opts.find((o) => o.id === cur)?.hint}</small></div>;
  return <LabPanel title="Salida de la negociación" store="mg-salida" className="f-sw--pills" side="right" closed>
    {g("Animación", SALIDA, v, set)}{g("Duración", SALIDA_MS, ms, setMs)}{g("Espera tras cerrar el panel", SALIDA_ESPERA, espera, setEspera)}
    <div className="f-sw__g" role="group" aria-label="Probar"><button type="button" onClick={probar}>Probar en la primera fila</button>
      <small className="f-sw__hint">Repite la salida sin cerrar nada; la fila vuelve sola. Para el flujo completo, rechaza o deja expirar una negociación.</small></div>
  </LabPanel>;
}

function PillLab({ color, forma, setColor, setForma, etapas, setEtapas, indicio, setIndicio }: { color: PillColor; forma: PillForma; setColor: (x: PillColor) => void; setForma: (x: PillForma) => void; etapas: Etapas; setEtapas: (x: Etapas) => void; indicio: Indicio; setIndicio: (x: Indicio) => void }): JSX.Element {
  const g = <T extends string>(title: string, opts: readonly { id: T; label: string; hint: string }[], v: T, set: (x: T) => void) =>
    <div className="f-sw__g" role="group" aria-label={title}><span className="f-sw__k"><b>{title}</b></span>
      {opts.map((o) => <button key={o.id} type="button" title={o.hint} aria-pressed={v === o.id} onClick={() => set(o.id)}>{o.label}</button>)}
      <small className="f-sw__hint">{opts.find((o) => o.id === v)?.hint}</small></div>;
  return <LabPanel title="Pestañas" store="mg-pills" className="f-sw--pills" side="right" closed>{g("Color", PILL_COLOR, color, setColor)}{g("Forma", PILL_FORMA, forma, setForma)}{g("Mis participaciones · 4 etapas", ETAPAS, etapas, setEtapas)}{g("Se puede deslizar · pista", INDICIO, indicio, setIndicio)}</LabPanel>;
}

function WalletLab({ v, set }: { v: Bill; set: (x: Bill) => void }): JSX.Element {
  const btn = (o: (typeof BILL)[number]) => <button key={o.id} type="button" title={o.hint} aria-pressed={v === o.id} onClick={() => set(o.id)}>{o.label}</button>;
  return <LabPanel title="Mi billetera" store="mg-billetera" className="f-sw--bill" side="left">
    <div className="f-sw__g" role="group" aria-label="Letras de Mi billetera"><span className="f-sw__k"><b>Letras</b> · título y Transacciones (el fondo no cambia)</span>{BILL.slice(0, BILL_LETRAS).map(btn)}</div>
    <div className="f-sw__g" role="group" aria-label="Tarjeta de Mi billetera"><span className="f-sw__k"><b>Tarjeta</b> · borde, brillo o fondo</span>{BILL.slice(BILL_LETRAS).map(btn)}</div>
    <small className="f-sw__hint">{BILL.find((o) => o.id === v)?.hint}</small>
  </LabPanel>;
}

const PIEZAS_NUEVAS = PIEZAS.filter((p) => !p.ant);
const pieza = (k: string) => PIEZAS_NUEVAS.find((p) => bannerKey(p) === k);
function CampSwitch({ lado, riel, set }: { lado: string; riel: string; set: (lado: string, riel: string) => void }): JSX.Element {
  // Barra lateral y riel derecho (23/10, lista de Silvana): las mismas piezas por tipo (A auto · B moto · C valoriza · D Subastop),
  // en botones; los banners de Max quedan fuera por ahora. 28/10 (Julio): los dos espacios nunca muestran el mismo tipo,
  // así que el tipo que usa el otro espacio queda deshabilitado entero.
  const tipoDe = (k: string) => RIEL_TIPOS.find((y) => y.piezas.some((z) => z.key === k))?.tipo;
  const tipos = (title: string, scope: string, v: string, other: string, onPick: (k: string) => void) =>
    <div className="f-sw__g f-sw__riel" role="group" aria-label={title}><span className="f-sw__k"><b>{title}</b> · {scope}</span>
      {RIEL_TIPOS.map((t) => { const usado = tipoDe(other) === t.tipo; return <div key={t.tipo} className={`f-sw__tipo${usado ? " is-off" : ""}`}><span className="f-sw__tipo-k"><b>Tipo {t.tipo}</b> {t.nombre}{usado ? " · en el otro espacio" : ""}</span>
        {t.piezas.map((x) => <button key={x.key} type="button" aria-pressed={v === x.key} disabled={usado} title={usado ? "Este tipo ya está en el otro espacio" : undefined} onClick={() => onPick(x.key)}>{x.corto}</button>)}</div>; })}
      <small className="f-sw__hint">{(() => { const p = PIEZAS.find((y) => bannerKey(y) === v); const t = RIEL_TIPOS.find((y) => y.piezas.some((z) => z.key === v));
        return p ? `${t ? `Tipo ${t.tipo} · ` : ""}${p.h ?? p.titulo}` : ""; })()}</small></div>;
  return <LabPanel title="Banners" store="mg-banners" className="f-sw--left f-sw--banners" side="left">
    {tipos("Barra lateral", "200 × 400, izquierda", lado, riel, (k) => set(k, riel))}
    {tipos("Riel derecho", "bajo Mi billetera", riel, lado, (k) => set(lado, k))}
    <div className="f-sw__g"><button type="button" onClick={() => set(riel, lado)}>Intercambiar ⇅</button>
      <small className="f-sw__hint">Regla: los dos espacios nunca muestran el mismo tipo.</small></div>
    <a className="f-sw__all" href="/banners" target="_blank" rel="noreferrer">Ver todas en /banners-publica ↗</a>
  </LabPanel>;
}

/** Publicidad (pedido de Julio, 14/10): bajo la Wallet en desktop; en mobile, después de Tu actividad para no desplazar
 *  lo prioritario. Sin rótulo visible (pedido de Abraham); aria-label «Publicidad» para lectores. Espacio reservado (300 × 250) para que no salte al cargar.
 *  Un solo brillo del borde al aparecer (patrón Shine Border) y luego estático. */
function Ad({ banner, camp = "reservado", veh = "caja", b }: { banner?: boolean; camp?: CampView; veh?: Veh; b: Pieza }): JSX.Element {
  // banner (15/10, revisión de la maqueta VMC): en VMC el anuncio es una imagen entera y el botón no se puede tocar.
  // Aquí la imagen va de fondo y el texto y el botón son HTML: clicables, legibles por lectores y traducibles.
  if (banner && camp !== "reservado") return <Promo slot="rail" view={camp} veh={veh} b={b} />;
  if (banner) return <aside className="f-ad f-ad--banner" aria-label="Publicidad">
    <div className="f-ad__banner"><p><b>¡Este espacio está reservado para ti!</b><span>Pon tu publicidad aquí y llega a tu público objetivo.</span></p>
      <a className="f-ad__cta" href="#">¡Anuncia aquí!</a></div>
  </aside>;
  return <aside className="f-ad" aria-label="Publicidad">
    <div className="f-ad__slot"><span>Espacio para anunciante</span><small>300 × 250</small></div>
  </aside>;
}

/** PROPUESTA (14/10): Recomendados de VMC, filtrados por lo que el usuario ya ofertó (marca/segmento de sus negociaciones y participaciones).
 *  Dos filas como máximo: el riel es sticky y no puede pasar el alto de la pantalla. Sin actividad de compra no se muestra. */
// Recomendados (pedido de Julio, 14/10): va bajo Tu actividad.
const RECS: RecommendedItem[] = [
  { name: "Nissan Versa", year: 2020, price: "US$ 9,300", imageSrc: PHOTO.versa, badge: "negotiable" },
  { name: "Nissan Sentra", year: 2021, price: "US$ 11,500", imageSrc: PHOTO.sentra, badge: "live" },
  { name: "Suzuki Swift", year: 2019, price: "US$ 7,800", imageSrc: PHOTO.swift, badge: "live" },
];
// Recomendados (16/10 noche, mirando toda la página): lista compacta en el riel, bajo la publicidad. En la columna principal
// alargaba la página ~600 px bajo Tu actividad mientras el riel terminaba a la mitad con un hueco vacío. Filas con la misma
// gramática que Tu actividad (foto, nombre · año, dato, estado a la derecha); es secundario, así que no compite con tus tareas.
function Recs({ withData }: { withData: boolean }): JSX.Element | null {
  if (!withData) return null;
  return <RecommendedList items={RECS} href="#" />;
}

/** Mobile: UserProfileCard mide 766 fijos; se compone con sus mismas piezas (caso para Julio). */
function AccountLine(): JSX.Element {
  return <div className="g-account">
    <AvatarZone size={36} />
    <div className="g-account__who"><b>¡Hola, ZAEX5G!</b><span>Riesgo <em>Muy bajo</em> · <StarIcon size="sm" /> 500 pts</span></div>
    <div className="g-account__links"><ProfileButton>Tu perfil</ProfileButton><ProfileButton>Historial</ProfileButton></div>
  </div>;
}

// ─── Fernando+ · cabecera con cuenta en línea y panel «Pendientes» (reemplazan banda + tarjeta en vivo + tarjeta de cuenta). ──
// Riesgo Usuario: 4 categorías por Puntos VMC (Centro de Ayuda «El riesgo usuario y sus categorías»; T&C IV.10). Puntos de ejemplo por categoría.
export type Risk = "muybajo" | "bajo" | "regular" | "alto";
const RISK: Record<Risk, { label: string; level: number; pts: number }> = {
  muybajo: { label: "Muy bajo", level: 4, pts: 500 }, bajo: { label: "Bajo", level: 3, pts: 210 }, regular: { label: "Regular", level: 2, pts: 80 }, alto: { label: "Alto", level: 1, pts: -30 },
};

function FernandoHead({ sober, risk = "muybajo" }: { sober?: boolean; risk?: Risk }): JSX.Element {
  const r = RISK[risk];
  const sub = "Tus vehículos, ofertas y compras.";
  return <div className="f-head">
    <div className="f-head__title"><div>
      <h1>Mi Garaje</h1>{sober ? null : <p>{sub}</p>}</div></div>
    <div className="f-head__acct">
      {sober ? <>
        {/* Tarjeta de cuenta: AccountCard de Concorde. Con ?pass=1 (lab) se dibujaba SubasPass VIP; en la pantalla no se llega. */}
        <AccountCard username="ZAEX5G" risk={r.label} points={r.pts} passExpiry="16/01/2026" passHref="#" />
      </> : <>
        <AvatarZone size={32} />
        <b>¡Hola, ZAEX5G!</b>
        <RiskMeter level={0} tone="light" />
        <span className="f-head__pts"><StarIcon size="sm" />Puntos VMC <b>500</b> pts<InfoIcon size={14} title="Acumulas puntos con tu actividad en VMC" /></span>
      </>}
      {sober ? null : <nav aria-label="Cuenta"><ProfileButton>Tu perfil</ProfileButton><ProfileButton>Historial</ProfileButton></nav>}
    </div>
  </div>;
}

const SHORT: Record<string, string> = { p1: "Subasta en vivo", n0: "Oferta por responder", n3: "Oferta por responder", n4: "Oferta por responder", c1: "Pago pendiente", c3: "Pago pendiente" };
const KIND: Record<string, [string, string]> = { live: ["subasta en vivo", "subastas en vivo"], negociaciones: ["oferta por responder", "ofertas por responder"], compras: ["pago pendiente", "pagos pendientes"] };
const kindOf = (r: Pending) => (r.tone === "live" ? "live" : r.sec);

/** Pendientes: siempre los 3 que vencen primero, con acción. El resto se resume agrupado por tipo
 *  y se despliega en el lugar (no se pagina: paginar una lista de tareas esconde lo urgente). */
function PendingPanel({ secs, loading, onOpen, sober }: { secs: Sec[]; loading: boolean; onOpen: (r: Row) => void; sober?: boolean }): JSX.Element {
  const p = pendingOf(secs);
  const [all, setAll] = useState(false);
  const shown = all ? p : p.slice(0, 3);
  const rest = p.slice(3);
  const groups = Object.entries(rest.reduce<Record<string, number>>((acc, r) => { const k = kindOf(r); acc[k] = (acc[k] ?? 0) + 1; return acc; }, {}));
  return <section className="f-pend" aria-labelledby="f-pend">
    <header><h2 id="f-pend">{loading ? "Pendientes" : p.length ? `${p.length} ${p.length === 1 ? "pendiente" : "pendientes"}` : "Todo al día"}</h2>
      {!loading && p.length > 1 ? <span>Ordenados por lo que vence primero</span> : null}</header>
    {loading ? <div className="g-skel"><div><i /><b /><b /></div><div><i /><b /><b /></div></div>
      : !p.length ? <div className="f-pend__ok"><CheckIcon size={22} /><p>No tienes subastas, ofertas ni pagos esperando tu respuesta.</p></div>
      : <>
        <ol className="f-pend__list">{shown.map((r, i) => <li key={r.id} className={`f-task f-task--${r.tone}${i >= 3 ? " is-extra" : ""}`}>
          <button type="button" className="f-task__main" onClick={() => onOpen(r)} aria-haspopup="dialog">
            <img src={PHOTO[r.photo]} alt="" width={56} height={44} />
            <span><small>{r.tone === "live" ? <BadgeStatusLive variant="live" label="EN VIVO" /> : sober ? r.secTitle : SHORT[r.id] ?? r.status}</small>
              <b>{r.name} {r.year}</b><em>{r.detail}</em></span>
          </button>
          {(r.dueAt ?? DEADLINE[r.id]) !== undefined ? <Countdown to={r.dueAt ?? DEADLINE[r.id]} label={r.tone === "live" ? "Cierra en" : r.sec === "compras" ? "Paga en" : "Vence en"} /> : <span />}
          <Button variant={r.tone === "live" ? "primary" : r.sec === "negociaciones" ? "negotiable" : "secondary-sm"}>{r.nextCta}</Button>
        </li>)}</ol>
        {rest.length ? <button type="button" className="f-pend__more" aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? <b>Mostrar solo los 3 más urgentes</b> : <><span>Y {groups.map(([k, n]) => `${n} ${KIND[k][n === 1 ? 0 : 1]}`).join(" · ")}</span><b>Ver los {p.length} pendientes</b></>}
          <span className={`f-pend__chev${all ? " is-open" : ""}`}><Chevron /></span>
        </button> : null}
      </>}
  </section>;
}

// ─── Fernando+ · Tu actividad v2: un contenedor, secciones con encabezado compacto, filas de dos líneas.
// La urgencia vive en «Pendientes»: aquí no hay cuentas regresivas ni fondos naranjas, solo estado.
/** Reacomodo suave al filtrar (View Transitions del navegador, sin dependencias). Sin soporte o con movimiento reducido, cambia al instante. */
export function smooth(f: () => void): void {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return f();
  document.startViewTransition(() => flushSync(f));
}

/** notif (maqueta VMC, 15/10): patrón de notificación. El punto de «sin abrir» va a la derecha junto al estado, debajo cuándo llegó
 *  («Hace 15 min»; VMC guarda la fecha de cada oferta) y el vencimiento pasa al detalle. Sin abrir = fondo gris suave.
 *  Subastas próximas: «Inicia 15/10 · 1:00 pm», como la ficha de detalle de VMC («Inicia HOY · 01:20 pm»). */
function FRow({ r, onOpen, bare, plain, starts, publishable, previewOnly, guided }: { r: Row; onOpen: (r: Row) => void; bare?: boolean; plain?: boolean; starts?: boolean; publishable?: boolean; previewOnly?: boolean; guided?: boolean }): JSX.Element {
  const detail = starts && r.start ? `Inicia ${r.start}` : r.detail.replace(/US\$ /g, "US$\u00a0");
  const ownOffer = detail.match(/US\$\u00a0[\d,]+/)?.[0];
  // Una contrapropuesta entrante conserva su plazo incluso después de abrirla. El
  // tiempo es la acción pendiente; «Ahora» es solamente cuándo llegó el aviso.
  const showTimer = plain && ((r.side === "compra" && (r.tone === "action" || r.status === "Rechazada" || r.status === "Esperando respuesta")) || (r.side === "vende" && r.status === "Responder"));
  const pendingFee = r.status === "Pagar fee";
  const marquee = pendingFee || Boolean(r.chatMessage) || detail.length > 48;
  const needsEntry = r.entryHint || (r.isNew && (pendingFee || r.status === "Proceso de compra"));
  const round = !pendingFee && plain && r.side === "compra" && r.round ? ` (${r.round}/5)` : "";
  const meta = <>{r.plate && !plain ? `Placa ${r.plate} · ` : ""}{plain && r.sentByMe ? (ownOffer ? `Tú: ${ownOffer}` : detail) : detail}{round}{r.ago && !(plain && r.sentByMe) ? ` · ${r.ago}` : null}</>;
  const activate = () => { if (!previewOnly) onOpen(r); };
  // Valorizaciones: fila de solo lectura; su acción es el botón Publicar del lado derecho.
  if (publishable) return <VehicleRow photo={PHOTO[r.photo]} name={r.name} year={r.year} meta={detail} isNew={r.isNew}
    className={`fr--publishable${r.regularName ? " is-regular" : ""}${r.boldDetail ? " is-detail-strong" : ""}${r.arrival ? ` is-arrival--${r.arrival}` : ""}`}
    side={<PublishSwipe onPublish={() => onOpen(r)} />} />;
  const isFinalMover = r.id === "bp1" || r.id === "sf1";
  return <VehicleRow photo={PHOTO[r.photo]} name={r.name} year={r.year} respondBy={showTimer && r.dueAt ? r.dueAt : undefined} meta={meta} marquee={marquee}
    isNew={r.isNew} unread={r.unread} onClick={activate} opensDialog={!previewOnly} data={{ "row-id": r.id }}
    layoutId={isFinalMover ? `final-row-${r.id}` : undefined} transition={isFinalMover ? { type: "spring", stiffness: 310, damping: 27, mass: .75 } : undefined}
    className={[r.flash && "is-flash", r.sentByMe && "is-sent", pendingFee && "fr--pending-fee", r.chatMessage && "fr--chat-message", r.tone === "live" && "fr--live", needsEntry && "fr--attention",
      r.regularName && "is-regular", r.boldDetail && "is-detail-strong", r.sideNote && "has-side-note", r.relocated && "is-relocated", r.leaving && "is-negotiation-leaving",
      r.expiryExit && "is-expiry-exit", r.arrival && `is-arrival--${r.arrival}`, previewOnly && "fr--preview", guided && "fr--guided"].filter(Boolean).join(" ")}
    side={<>{r.side && plain && !r.noRole ? <RoleBadge side={r.side} /> : null}{r.tone === "live" ? <StatusTag tone="live">{r.status}</StatusTag> : r.sideNote ? <span className={`fr__side-note${r.evaluation ? " fr__side-note--evaluation" : ""}${r.isNew ? " fr__side-note--new" : ""}`}>{(r.evaluation || r.isNew) ? <i className="fr__dot" aria-hidden /> : null}<small>{r.sideNote}</small></span> : bare ? null : plain && r.expiryExit ? <><span className="g-sr">Negociación expirada</span><i className="fr__dot" aria-hidden />{r.when || r.ago ? <small className="fr__due">{r.when ?? r.ago}</small> : null}</> : plain && r.sentByMe ? <>{r.unread ? <><span className="g-sr">Sin abrir</span><i className="fr__dot" aria-hidden /></> : null}{r.ago ? <small className="fr__ago">{r.ago}</small> : null}</> /* como Instagram: punto si no la abriste y el tiempo debajo */
      : plain && r.isNew ? <><span className="g-sr">Nueva negociación</span><i className="fr__dot" aria-hidden /><small className="fr__due">{r.ago ?? r.when}</small></> : r.when ? <small>{r.when}</small> : null}</>}>
    {r.entryHint ? <span className="fr__chat-hint" aria-hidden><span>{r.side === "vende" ? "Aquí puedes abrir el SubasChat con el comprador" : "Aquí puedes abrir el SubasChat"}</span><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 3v12m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> : null}
    {guided ? <span className="fr__demo-arrow" aria-hidden><svg width="30" height="24" viewBox="0 0 30 24" fill="none"><path d="M2 12h20m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span> : null}
  </VehicleRow>;
}

function FlightCue({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }): JSX.Element {
  const midX = from.x + (to.x - from.x) * .56, midY = from.y + (to.y - from.y) * .48;
  return <motion.div className="mg-flight-cue" initial={{ x: from.x, y: from.y, opacity: 0, scale: .7 }}
    animate={{ x: [from.x, midX, to.x], y: [from.y - 16, midY - 24, to.y], opacity: [0, 1, 1, 0], scale: [.7, 1, 1, .72] }}
    transition={{ duration: .82, times: [0, .14, .82, 1], ease: [.16, 1, .3, 1] }} aria-hidden>
    <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="14" fill="#fff" /><circle cx="16" cy="16" r="13" fill="none" stroke="#ED8936" strokeWidth="2" /><path d="M16 8v12m0 0-5-5m5 5 5-5" fill="none" stroke="#3B1782" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </motion.div>;
}

/** glass (15/10): íconos de vidrio esmerilado (app/iconos) en Pulso Fuente; la maqueta VMC conserva los de Material. */
function FSection({ s, loading, compact, onOpen, seen, act, vmc, tip, guideId, stageFocus }: { s: Sec; loading: boolean; compact?: boolean; onOpen: (r: Row) => void; seen: Set<string>; act?: boolean; vmc?: boolean; tip?: ReactNode; guideId?: string; stageFocus?: number }): JSX.Element {
  const [tab, setTab] = useState(0);
  const isUnread = (r: Row) => Boolean((r.isNew || r.unread) && !seen.has(r.id));
  const news = s.rows.filter(isUnread).length;
  const [open, setOpen] = useState(!compact || s.rows.some((r) => r.due || r.isNew || (s.id === "valorizaciones" && r.tone === "action")));
  const flashing = s.rows.some((r) => r.flash);
  const hasIncoming = s.rows.some((r) => r.flash || r.isNew);
  // Mis negociaciones en dos pestañas (Abraham, 21/10): Compras · Ventas con el TabSelector de Concorde. Abre en la que
  // tiene la fila recién llegada o lo que vence primero; dentro de cada una el tag de rol sobra.
  const split = act && s.id === "negociaciones" && s.rows.some((r) => r.side);
  // Mis participaciones en cuatro etapas (23/10), con el mismo TabSelector: Consignadas · Ganadas · Proceso de compra · Rechazadas.
  const staged = act && s.id === "participaciones" && s.rows.some((r) => r.stage !== undefined);
  const inStage = (i: number) => s.rows.filter((r) => (r.stage ?? 0) === i);
  const unseenInStage = (i: number) => inStage(i).filter(isUnread).length;
  // Las subastas en Proceso de compra toman el primer lugar visual; las demás
  // etapas conservan su orden normal. Las negociables aceptadas viven en Compras.
  const stageOrder = s.rows.some((r) => r.stage === 2 && r.chat) ? [2, 0, 1, 3] : [0, 1, 2, 3];
  const [stageTab, setStageTab] = useState(() => s.rows.find((r) => r.flash)?.stage ?? 0);
  const flashStage = s.rows.find((r) => r.flash)?.stage;
  useLayoutEffect(() => { if (flashStage !== undefined) setStageTab(flashStage); }, [flashStage]); /* layout: la pestaña cambia dentro de la transición (26/10) */ // la fila que se resalta, a la vista
  useLayoutEffect(() => { if (stageFocus !== undefined) setStageTab(stageFocus); }, [stageFocus]);
  const inSide = (k: "compra" | "vende") => s.rows.filter((r) => r.side === k && (!s.tabs || r.tab === 0));
  // Los números de Compra/Venta son notificaciones, no cantidad de autos: solo lo que aún está en negrita/sin abrir.
  const unseenInSide = (k: "compra" | "vende") => inSide(k).filter(isUnread).length;
  // La demo empieza desde la perspectiva del comprador: Compras y su simulador
  // son el punto de entrada del flujo principal.
  const [sideTab, setSideTab] = useState(0);
  // 26/10 (lab): la pestaña decide qué simulador se ve (Compras → Simula comprador · Ventas → Simula vendedor), por CSS.
  useEffect(() => { if (split) document.documentElement.dataset.negTab = sideTab ? "ventas" : "compras"; }, [split, sideTab]);
  useLayoutEffect(() => { if (hasIncoming) setOpen(true); }, [hasIncoming]); // una fila que llega no puede quedar en una sección cerrada
  // Pulso Fuente (act): sin pestañas; en la página solo lo que está en curso, lo cerrado es historial y va en «Ver todas».
  const live = act && s.tabs ? s.rows.filter((r) => r.tab === 0) : s.rows;
  const rows = (act ? live : s.tabs ? s.rows.filter((r) => r.tab === tab) : s.rows).filter((r) => !r.dismissed).filter((r) => !split || r.side === (sideTab ? "vende" : "compra")).filter((r) => !staged || (r.stage ?? 0) === stageTab).map((r) => (split ? { ...r, noRole: true } : r))
    // 29/10 (bug de la app real): siempre arriba lo más reciente, esté leído o no. Antes subía primero lo sin abrir y una
    // novedad de hace 4 h quedaba sobre un movimiento de hace 1 min. Empate (misma hora): gana lo sin abrir.
    .sort((a, b) => lastAt(b) - lastAt(a) || Number(Boolean(b.isNew || b.unread)) - Number(Boolean(a.isNew || a.unread)));
  // Pulso Fuente (act): columnas fijas título | lo que pide acción | el resto del estado, sin repetir lo mismo dos veces.
  const isAct = (r: Row) => r.tone === "action" || r.tone === "live";
  const rest = Object.entries(live.filter((r) => !isAct(r)).reduce<Record<string, number>>((m, r) => ({ ...m, [r.status]: (m[r.status] ?? 0) + 1 }), {}))
    .map(([st, n]) => `${st} (${n})`).join(" · ");
  const guiding = Boolean(guideId && s.rows.some((r) => r.id === guideId));
  // Paginado (29/10): con «8 publicaciones de ejemplo» la sección pasa el tope de 3 y se ve cómo pagina cada forma.
  const pag = usePag();
  const listRows = s.id === "publicaciones" && pag.extra ? [...EXTRA_PUBS, ...rows].sort((a, b) => lastAt(b) - lastAt(a)) : rows; // mismo orden: lo más reciente arriba
  // Encabezado y cuerpo plegable: ActivitySection de Concorde. El círculo funciona como inbox: solo muestra novedades sin abrir.
  return <ActivitySection id={s.id} title={s.title} icon={s.id as VSec} count={news && !loading && !s.hideCount ? news : 0} open={open} onToggle={() => setOpen(!open)} className={guiding ? "fs--guided" : undefined}>
      {loading ? <div className="g-skel"><div><i /><b /><b /></div></div>
      : !s.rows.length ? <div className="fs__empty"><p>{s.empty}</p>{s.emptyCta ? <Button variant={s.emptyCta === "Publicar" ? "primary" : "outline"}>{s.emptyCta}</Button> : null}</div>
      : <>
        {split ? <FolderTabs options={(["compra", "vende"] as const).map((side) => { const n = unseenInSide(side); return `${side === "compra" ? "Compras" : "En venta"}${n ? ` (${n})` : ""}`; })} notificationIndices={(["compra", "vende"] as const).flatMap((side, i) => unseenInSide(side) ? [i] : [])} value={sideTab} onChange={setSideTab} aria-label="Compras o vehículos en venta" /> : null}
        {/* Mis participaciones: las mismas clases del TabSelector de Concorde (color y forma del panel aplican igual), con el número
            aparte para que la disposición (data-etapas) pueda mostrarlo entre paréntesis, en círculo o encima. */}
        {staged ? <StageTabs labels={stageOrder.map((i) => STAGES[i])} counts={stageOrder.map(unseenInStage)} value={stageOrder.indexOf(stageTab)} onChange={(i) => setStageTab(stageOrder[i])}
          ariaLabel="Etapa de tus participaciones" layoutId="participation-stage-active" /> : null}
        {vmc && s.id === "publicaciones" ? <PubList rows={rows.map(pubRowOf)} title={s.title} /> : <div className="fs__list" role={s.tabs && !act ? "tabpanel" : undefined}>{listRows.length ? <PagList rows={listRows} title={s.title} reset={`${sideTab}-${stageTab}`} render={(r, i) => <div key={r.id} className={`${r.id === guideId ? " g-row-guided" : ""}`} data-foco-row={r.id === "bp1" ? "" : undefined}>
          {/* UX (21/10): la ayuda va junto a lo que explica. Participaciones y el Kia son previews (Julio); la negociación aceptada entra a Proceso de compra y conserva el acceso al chat. */}<FRow r={{ ...r, isNew: r.isNew && !seen.has(r.id), unread: r.unread && !seen.has(r.id) }} onOpen={vmc && s.id === "valorizaciones" ? (x) => { location.href = `/blocks/mi-garaje/m/vmc-publica?desde=${x.id}`; } : onOpen} bare={act && !!r.steps && !isAct(r)} plain={act} starts={act} publishable={vmc && s.id === "valorizaciones"} previewOnly={vmc && ((s.id === "participaciones" && r.id !== "bp1" && r.id !== "sf1") || r.id === "sc1")} guided={r.id === guideId} />{tip && r.id === "bp1" ? tip : null}</div>} /> : staged && stageTab === 3 ? <div className="fs__empty"><p>Aún no tienes participaciones rechazadas.</p></div> : null}</div>}
      </>}
  </ActivitySection>;
}

/** Momento del último movimiento de una fila (ms), para ordenar de lo más reciente a lo más antiguo. Usa la llegada real
 *  (arrivedAt) si la hay; si no, lee el tiempo que muestra la fila: «Ahora», «12 min», «3h», «2d», «04/10» o «Publicado: 28/10/2026».
 *  «Vence en…» e «Inicia…» son plazos, no movimientos, así que se ignoran; sin tiempo en la fila, se usa el último del historial. */
const T_LOAD = Date.now();
function lastAt(r: Row): number {
  if (r.arrivedAt) return r.arrivedAt;
  const read = (t?: string): number | undefined => {
    if (!t || /^(vence|inicia)/i.test(t.trim()) || /subasta el/i.test(t)) return undefined; // plazos y fechas futuras no son movimientos
    if (/^(ahora|hoy)\b/i.test(t.trim())) return T_LOAD;
    if (/^ayer\b/i.test(t.trim())) return T_LOAD - 8.64e7;
    const m = t.match(/(\d+)\s*(min|h|d)(?![a-z])/i);
    if (m) return T_LOAD - +m[1] * ({ min: 6e4, h: 3.6e6, d: 8.64e7 }[m[2].toLowerCase() as "min" | "h" | "d"]);
    const f = t.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
    if (f) return new Date(+(f[3] ?? new Date(T_LOAD).getFullYear()), +f[2] - 1, +f[1], 12).getTime();
    return undefined;
  };
  // Orden de confianza: el tiempo de la fila («12 min»), su último movimiento en el historial («Hoy · La sala abrió») y la fecha del detalle.
  return read(r.ago) ?? read(r.when) ?? read(r.history?.[0]?.split(" · ")[0]) ?? read(r.detail) ?? 0;
}

/** Mis publicaciones (04/11): estado y nota de cada fila. Sin estado explícito, se deduce del acuerdo, las propuestas o la revisión. */
const DEAL_PUB: Record<Deal, PublicationStatus> = { aceptada: "subaschat", vendida: "vendido", no: "no-concretada" };
function pubRowOf(r: Row): PubRow {
  const status: PublicationStatus = r.deal ? DEAL_PUB[r.deal] : r.pub ?? (r.proposals ? "negociacion" : r.status === "Publicada" ? "publicada" : "revision"); // el acuerdo simulado (panel Acuerdo) manda
  return { id: r.id, name: r.name, year: r.year, photo: r.photo, status, note: r.deal === "no" ? NO_DEAL_NOTE : r.detail, proposals: r.proposals };
}

/** Paginado (29/10): publicaciones de ejemplo de más, de la más reciente a la más antigua (van antes que las de los datos). */
const EXTRA_PUBS: Row[] = ([["Hyundai Accent", 2018, "accent", "28/10"], ["Kia Picanto", 2021, "picanto", "27/10"], ["Toyota Corolla", 2019, "corolla", "25/10"],
  ["Mazda 3", 2018, "mazda3", "22/10"], ["Suzuki Swift", 2020, "swift", "18/10"], ["Chevrolet Sail", 2019, "sail", "12/10"]] as const).map(([name, year, photo, d], k) =>
  ({ id: `pg${k}`, name, year, photo, detail: `Publicado: ${d}/2026`, status: "Publicada", tone: "done" as Tone, regularName: true, hideStatus: true, proposals: k % 3 }));

// Negociaciones de ejemplo: la vista rápida las abre como panel de negociación (PROPUESTA, ver Negociacion.tsx).
const PEERS: Record<string, string[]> = { sn0: ["sn0", "sn0b", "sn0c"] }; // fila → negociaciones de esa publicación
const NEG: Record<string, Neg> = {
  // Nivus: tres compradores negocian por separado con el mismo vendedor (T&C IV.6.1.b). Anónimos por orden de llegada.
  sn0: { side: "vende", buyer: "Comprador 1", amount: 17500, round: 1, hours: 6, state: "ofrece", list: 19500, market: 18900, thread: [{ me: false, amount: 17500, when: "Hoy 10:24" }] },
  sn0b: { side: "vende", buyer: "Comprador 2", amount: 17800, round: 2, hours: 2, state: "ofrece", list: 19500, market: 18900, thread: [{ me: false, amount: 17000, when: "Ayer 18:30" }, { me: true, amount: 18800, when: "Ayer 20:10" }, { me: false, amount: 17800, when: "Hoy 9:05" }] },
  sn0c: { side: "vende", buyer: "Comprador 3", amount: 16900, round: 1, hours: 20, state: "ofrece", list: 19500, market: 18900, unread: true, thread: [{ me: false, amount: 16900, when: "Hoy 10:42" }] },
  // La negociación la abre el comprador con su propuesta (T&C IV.6.2.a); el precio publicado no es una propuesta del vendedor.
  sn1: { side: "compra", amount: 13500, round: 2, hours: 23.8, state: "ofrece", list: 14500, market: 12900, neg: 1, thread: [{ me: true, amount: 12000, when: "Hoy 9:10" }, { me: false, amount: 13700, when: "Hoy 9:40" }, { me: true, amount: 12600, when: "Hoy 10:05" }, { me: false, amount: 13500, when: "Hace 12 min" }] },
  sf1: { side: "compra", amount: FINAL_BUY.offer, round: 5, hours: 24, state: "enviada", list: FINAL_BUY.list, market: FINAL_BUY.market, neg: 1, thread: [{ me: true, amount: 8400, when: "Ayer 10:15" }, { me: false, amount: 9700, when: "Ayer 10:45" }, { me: true, amount: 8500, when: "Ayer 11:30" }, { me: false, amount: 9550, when: "Ayer 12:10" }, { me: true, amount: 8550, when: "Hoy 8:40" }, { me: false, amount: 9400, when: "Hoy 9:15" }, { me: true, amount: 8600, when: "Hoy 10:00" }, { me: false, amount: 9250, when: "Hoy 10:40" }, { me: true, amount: FINAL_BUY.offer, when: "Hoy Ahora" }] },
  n0: { side: "vende", amount: 9800, round: 1, hours: 6, state: "ofrece", list: 10900, market: 10400, thread: [{ me: false, amount: 9800, when: "Hoy 10:24" }] },
};

// Comprador (21/10): la propuesta recién enviada desde el detalle (/m/vmc-propuesta) entra arriba en Mis negociaciones.
const usd = (n: number) => `US$ ${n.toLocaleString("en-US")}`;
const buyRow = (x: number): Row => ({ id: "bp1", side: "compra", flash: false, round: 1, name: BUY.name, year: BUY.year, plate: BUY.plate, photo: BUY.photo, detail: `Propuesta enviada · ${usd(x)}`, status: "Esperando respuesta", tone: "wait", ago: "1 min", sentByMe: true, dueAt: Date.now() + 864e5, tab: 0,
  history: [`Ahora · Enviaste una propuesta de ${usd(x)} y consignaste >S< ${DEPOSIT.sc}`] });
// Una negociable aceptada permanece en Compras: ahí se paga el fee y se accede al SubasChat.
const acceptedPaidBuyRow = (x: number): Partial<Row> => ({ side: "compra", sec: undefined, stage: undefined, tab: 0, detail: `Propuesta aceptada · ${usd(x)}`, status: "Ir al SubasChat", tone: "done", nextCta: "Ir al SubasChat", chat: chatHref(BUY, x, "comprador"),
  sideNote: "Ir al SubasChat", isNew: true, sentByMe: false, hideActor: true, when: undefined, ago: undefined, dueAt: undefined, arrivedAt: Date.now(),
  history: [`Ahora · El vendedor (SUBASCARS) aceptó tu propuesta de ${usd(x)}. El precio quedó pactado y el SubasChat está habilitado.`, `Hoy · Enviaste una propuesta de ${usd(x)} y consignaste >S< ${DEPOSIT.sc}`] });
// La aceptación se notifica primero en Compras. Hasta que se cubra el fee no
// hay SubasChat ni proceso de compra: todavía falta habilitar la conversación.
const acceptedPendingBuyRow = (x: number): Partial<Row> => ({ side: "compra", sec: undefined, stage: undefined, tab: 0,
  detail: `Propuesta aceptada · Pendiente de pagar fee de habilitación`, status: "Pagar fee", tone: "action", nextCta: "Pagar fee", chat: undefined,
  isNew: true, unread: true, sentByMe: false, hideActor: true, when: "Ahora", ago: undefined, dueAt: undefined, arrival: "accepted", arrivedAt: Date.now(),
  history: [`Ahora · El vendedor aceptó tu propuesta de ${usd(x)}. Falta pagar el fee de habilitación para abrir el SubasChat.`, `Hoy · Enviaste una propuesta de ${usd(x)} y consignaste >S< ${DEPOSIT.sc}`] });
// Sin acuerdo en la última ronda: la negociación ya no sigue activa y queda junto a los procesos rechazados.
const finalRejectedBuyRow = (x: number, stage: 0 | 3): Partial<Row> => ({ side: undefined, sec: "participaciones", stage, tab: 0,
  detail: `Oferta final rechazada · ${usd(x)} · (5/5)`, status: "Rechazada", tone: "wait", when: "Ahora", nextCta: undefined,
  isNew: true, sentByMe: false, hideActor: true, ago: undefined, dueAt: undefined, arrivedAt: Date.now(),
  history: [`Ahora · El vendedor rechazó tu oferta final (5 de 5). La negociación terminó.`, `Hoy · Enviaste tu última contrapropuesta de ${usd(x)} (5 de 5)`] });
// Primera fase del rechazo final: todavía vive en Compras, como aviso recién recibido.
// Solo después se traslada a Rechazadas para que la animación conserve el recorrido del flujo.
const finalRejectedNoticeRow = (x: number): Partial<Row> => ({ side: "compra", sec: undefined, stage: undefined, tab: 0,
  detail: `Oferta final rechazada · ${usd(x)}`, status: "Rechazada", tone: "wait", when: "Ahora", nextCta: undefined,
  isNew: true, unread: true, sentByMe: false, hideActor: true, ago: undefined, dueAt: undefined, arrivedAt: Date.now(),
  history: [`Ahora · El vendedor rechazó tu oferta final (5 de 5). La negociación terminó.`, `Hoy · Enviaste tu última contrapropuesta de ${usd(x)} (5 de 5)`] });
const finalAcceptedBuyRow = (x: number): Partial<Row> => ({ side: "compra", sec: undefined, stage: undefined, tab: 0,
  detail: `Propuesta aceptada · ${usd(x)} · (5/5)`, status: "Ir al SubasChat", tone: "done", when: "Ahora", nextCta: "Ir al SubasChat",
  chat: chatHref(FINAL_BUY, x, "comprador"), sideNote: "Ir al SubasChat", isNew: true, sentByMe: false, hideActor: true, ago: undefined, dueAt: undefined,
  history: [`Ahora · El vendedor aceptó tu oferta final de ${usd(x)} (5 de 5).`, `Hoy · Enviaste tu última contrapropuesta de ${usd(x)} (5 de 5)`] });
const buyNeg = (x: number): Neg => ({ side: "compra", amount: x, round: 1, hours: 24, state: "enviada", list: BUY.list, market: BUY.list, neg: 1, thread: [{ me: true, amount: x, when: "Hoy Ahora" }] });
// Caso de ejemplo aceptado en la tercera ronda: tres propuestas del comprador, dos contrapropuestas del vendedor y la aceptación final.
const acceptedBuyNeg = (x: number): Neg => ({ ...buyNeg(x), amount: x, round: 3, hours: 0, state: "aceptada", thread: [
  { me: true, amount: 17000, when: "Hoy 9:10" },
  { me: false, amount: 17900, when: "Hoy 9:28" },
  { me: true, amount: 17200, when: "Hoy 9:48" },
  { me: false, amount: 17600, when: "Hoy 10:05" },
  { me: true, amount: x, when: "Hoy 10:24" },
] });
// El vendedor contrapropone el punto medio entre la propuesta y su precio publicado (redondeado a US$ 100).
const counterOf = (x: number) => Math.max(x + 100, Math.round((x + BUY.list) / 2 / 100) * 100);
// Detalle de la oferta con el chat del acuerdo ya en curso (sin la guía de «chat nuevo» de chatHref).
const detailHref = (r: Pick<Row, "name" | "year" | "plate" | "photo">, amount: number, rol: "vendedor" | "comprador") =>
  `/blocks/mi-garaje/m/oferta?${new URLSearchParams({ name: r.name, year: String(r.year), plate: r.plate ?? "", photo: r.photo, monto: String(amount), rol })}`;
const chatHref = (r: Pick<Row, "name" | "year" | "plate" | "photo">, amount: number, rol: "vendedor" | "comprador") =>
  `/blocks/mi-garaje/m/oferta?${new URLSearchParams({ name: r.name, year: String(r.year), plate: r.plate ?? "", photo: r.photo, monto: String(amount), ...(rol === "comprador" ? { rol, nuevo: "1" } : {}) })}`;

// ─── QuickView (PROPUESTA DS): vista rápida en <dialog>. Panel lateral en desktop, hoja inferior en mobile. ──
const HISTORY: Record<string, string[]> = {
  n0: ["Hoy 10:24 · Te ofrecieron US$ 9,800", "05/10 · Publicaste el vehículo como negociable"],
  n1: ["Ayer · Enviaste una contrapropuesta de US$ 7,200", "Ayer · Te pidieron US$ 7,900"],
  n2: ["06/10 · Enviaste una propuesta de US$ 8,100"],
  p1: ["Hoy · La sala abrió", "07/10 · Consignaste para participar"],
  p2: ["02/10 · La consignación volvió a tu Wallet", "01/10 · Participación rechazada"],
  c1: ["07/10 · Ganaste la subasta", "Paga hasta el 12/10 para continuar"],
  c2: ["21/09 · Vehículo entregado", "12/09 · Pago confirmado", "10/09 · Ganaste la subasta"],
  u1: ["08/10 · Pago recibido · VMC revisa tu publicación", "08/10 · Completaste fotos y descripción"],
  u2: ["Hoy · Recibiste una oferta", "01/10 · Publicación aprobada"],
  v1: ["09/10 · Guardaste la valorización · valor de mercado US$ 10,400"],
};
// Ficha que el vendedor registró al publicar (formulario de Publicar: km, transmisión, combustible, versión). EJEMPLO.
const SPEC: Record<string, { version: string; km: string; caja: string; fuel: string; pub: string }> = {
  nivus: { version: "Highline 200 TSI", km: "38,500 km", caja: "Automática", fuel: "Gasolina", pub: "01/10 · 15 días" },
};
function LivePurchaseDetail({ r }: { r: Row }): JSX.Element {
  return <>
    <div className="g-qv__top">
      <div className="g-qv__status"><StatusTag tone="wait">En evaluación</StatusTag><small>Quedan 6 días hábiles</small></div>
      <h2 id="g-qv-title">{r.name} {r.year}</h2>
      <p>Mejor postor</p>
    </div>
    <section className="g-livebuy" aria-labelledby="g-livebuy-title">
      <header><span className="g-livebuy__pulse" aria-hidden /><div><h3 id="g-livebuy-title">Estado en vivo</h3><p>VMC está evaluando el resultado de tu compra.</p></div></header>
      <ol className="g-livebuy__steps">
        <li className="is-done"><i aria-hidden>✓</i><span><b>Subasta cerrada</b><small>Quedaste como mejor postor</small></span></li>
        <li className="is-current"><i aria-hidden /><span><b>Evaluación de la compra</b><small>VMC valida la información del vehículo</small></span></li>
        <li><i aria-hidden /><span><b>Coordinación y pago</b><small>Te avisaremos cuando esté listo</small></span></li>
      </ol>
    </section>
    <section className="g-livebuy__activity" aria-labelledby="g-livebuy-activity">
      <h3 id="g-livebuy-activity">Actividad reciente</h3>
      <ol className="g-qv__hist"><li>Hoy · La evaluación de tu compra sigue en curso</li><li>07/10 · Quedaste como mejor postor</li><li>07/10 · Cerró la subasta</li></ol>
    </section>
  </>;
}
const GoArrow = () => <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden><path d="M6 14 14 6M8 6h6v6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
function QuickView({ r, onClose, neg, go, closeSignal = 0 }: { r: Row | null; onClose: () => void; neg?: ReactNode; go?: { href: string; mode: DetailGo }; closeSignal?: number }): JSX.Element {
  // El panel (diálogo, entrada, salida deslizándose y velo) es SidePanel de Concorde; aquí va su contenido.
  return <SidePanel open={Boolean(r)} onClose={onClose} labelledBy="g-qv-title" closeSignal={closeSignal}>{(close) => r ? <>
      {/* Negociando, lo que se decide es el monto: foto chica junto al nombre en vez de la galería (en móvil ocupaba 40 % de la pantalla). */}
      {neg ? <header className="g-qv__head is-compact">
        {/* Retrato con el borde negociable de Concorde (CardViewer · negotiable). */}
        {/* 29/10: con el chat del acuerdo abierto, la tarjeta (o «Ir a detalle») lleva al detalle de la oferta, donde el chat reemplaza al DetailCard. */}
        {(() => { const card = go && go.mode !== "enlace", link = go && go.mode !== "tarjeta";
          const pic = <span className="g-qv__pic"><img src={photosOf(r.photo)[0]} alt="" /></span>; // 02/11 (Julio): sin flecha sobre la foto
          // Etiqueta arriba (como OfferType en las cards), nombre, versión y datos; cada dato no se parte, el salto cae entre «·».
          const id = <div className="g-qv__id"><span className="g-qv__neg">Negociable</span><h2 id="g-qv-title">{r.name} <span>{r.year}</span></h2>
            {SPEC[r.photo] ? <p className="g-qv__ver"><b>{SPEC[r.photo].version}</b></p> : null}
            {link ? card ? <span className="g-qv__go-link">Ir a detalle<GoArrow /></span> : <a className="g-qv__go-link" href={go.href}>Ir a detalle<GoArrow /></a> : card ? <span className="g-sr">Ir a detalle</span> : null}</div>;
          return card ? <a className="g-qv__go" href={go.href}>{pic}{id}</a> : <>{pic}{id}</>; })()}
        {/* 23/10: flecha en vez de «x»: el panel se pliega hacia donde apunta. */}
        {/* 26/10 (Abraham): botón circular de Concorde (LikeButton md); la flecha avanza al pasar y empuja al cerrar. */}
        <button type="button" className="g-qv__close g-qv__close--arrow" onClick={close} aria-label="Cerrar panel" title="Cerrar (Esc)">
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden><path className="g-qv__arr" d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </header> : <header className="g-qv__head">
        <img src={photosOf(r.photo)[0]} alt="" />
        <button type="button" className="g-qv__close" onClick={close} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </header>}
      <div className="g-qv__body">
        {/* Ficha (16/10): siempre el mismo orden — estado y plazo, nombre y año (como en las tarjetas), placa. Si el estado
            es la propia acción («Pagar»), se nombra como en Tu actividad («Por pagar») para que la fila nunca quede vacía.
            En la negociación, Negociable va junto a la placa y el estado y el plazo los dice el panel. */}
        {neg || r.id === "sc1" ? null : <div className="g-qv__top">
          <div className={`g-qv__status${r.tone === "action" ? " is-act" : ""}`}><span className={`g-status g-status--${r.tone}`}>{r.status === r.nextCta ? ({ Responder: "Por responder", Pagar: "Por pagar" } as Record<string, string>)[r.status] ?? r.status : r.status}</span>{r.when ? <small>{r.when}</small> : null}</div>
          <h2 id="g-qv-title">{r.name} {r.year}</h2>{r.plate ? <p>Placa {r.plate}</p> : null}</div>}
        {neg ?? (r.id === "sc1" ? <LivePurchaseDetail r={r} /> : <><p className="g-qv__detail">{r.detail}</p>
        {(r.history ?? HISTORY[r.id]) ? <><h3>Historial</h3>
        <ol className="g-qv__hist">{(r.history ?? HISTORY[r.id]).map((h) => <li key={h}>{h}</li>)}</ol></> : null}</>)}
      </div>
      {neg ? null : <footer className="g-qv__foot">
        {r.nextCta ? <Button variant={/^s?n/.test(r.id) ? "negotiable" : "primary"} onClick={() => { if (r.chat) location.href = r.chat; else onClose(); }}>{r.nextCta}</Button> : null}
        <ProfileButton>Ver detalle completo</ProfileButton>
      </footer>}
    </> : null}</SidePanel>;
}

export default function Garaje({ variant, withNews, isEmpty, isLoading, many = false, sober = false, vmc = false, withData = true, risk = "muybajo", camp: camp0 = "reservado", lateral = "reservado", vehiculo = "caja", variante, propuesta: sent, compra, features = {} , demo = false}: { demo?: boolean; variant: Variant; variante?: string; propuesta?: number; compra?: number; camp?: CampView; lateral?: SideView; vehiculo?: Veh; withNews: boolean; isEmpty: boolean; isLoading: boolean; many?: boolean; sober?: boolean; vmc?: boolean; withData?: boolean; risk?: Risk; pass?: boolean; features?: Features }): JSX.Element {
  const ac = useAcuerdo();
  // over: cambios de estado hechos en el lab (aceptar, rechazar, contraproponer) sobre los datos de ejemplo.
  // ?compra=<monto>: vuelta desde el chat, la negociable aceptada permanece en Mis negociaciones · Compras.
  const propuesta = sent ?? compra;
  // El regreso desde Valorizar/Publicar no muestra una pantalla de éxito: llega a
  // Mi Garaje y deja un trazo temporal sobre la fila recién creada.
  const [arrival] = useState(() => {
    if (typeof location === "undefined") return null;
    const q = new URLSearchParams(location.search), kind = q.get("llegada");
    return kind === "valorizacion" || kind === "publicacion"
      ? { kind, name: q.get("vehiculo") || "Toyota Corolla", year: Number(q.get("anio")) || 2019, value: Number(q.get("valor")) || 10400 }
      : null;
  });
  const [arrivalActive, setArrivalActive] = useState(Boolean(arrival));
  const [over, setOver] = useState<Record<string, Partial<Row>>>(() => (compra ? { bp1: { ...acceptedPaidBuyRow(compra), when: "Hoy" } } : {} as Record<string, Partial<Row>>));
  const [negs, setNegs] = useState<Record<string, Neg>>(() => (propuesta ? { ...NEG, bp1: compra ? acceptedBuyNeg(compra) : buyNeg(propuesta) } : NEG));
  const arrivingProposal = Boolean(sent && !demo);
  const nivusDeal = ["sn0", "sn0b", "sn0c"].map((k) => negs[k]).find((n) => n?.state === "aceptada");
  const dealRow = (r: Row): Row => {
    const deal: Deal | undefined = ac.sim === "flujo" ? (nivusDeal ? "aceptada" : undefined) : ac.sim;
    if (!deal) return r;
    const amt = usd(nivusDeal?.amount ?? 17500);
    return { ...r, deal, detail: deal === "aceptada" ? `Acuerdo por ${amt}` : deal === "vendida" ? `Vendido por ${amt}` : "La venta no se concretó" };
  };
  const baseSource = sober ? sourced(withNews, withData) : data(withNews, many);
  const photoForArrival = /hilux/i.test(arrival?.name ?? "") ? "hilux" : /nivus/i.test(arrival?.name ?? "") ? "nivus" : /picanto/i.test(arrival?.name ?? "") ? "picanto" : "corolla";
  const base = arrival ? baseSource.map((s) => {
    if (arrival.kind === "valorizacion" && s.id === "valorizaciones") return { ...s, rows: [{ id: "arrival-valuation", name: arrival.name, year: arrival.year, photo: photoForArrival, detail: `Valor de mercado ${usd(arrival.value)}`, status: "Guardada", tone: "done" as Tone, when: "Ahora", isNew: arrivalActive, arrival: arrivalActive ? "valorizacion" as const : undefined }, ...s.rows] };
    if (arrival.kind === "publicacion" && s.id === "publicaciones") return { ...s, rows: [{ id: "arrival-publication", name: arrival.name, year: arrival.year, photo: photoForArrival, detail: "Tu publicación está siendo revisada por el equipo VMC", status: "Pendiente de aprobación", tone: "progress" as Tone, proposals: 0, when: "Ahora", isNew: arrivalActive, arrival: arrivalActive ? "publicacion" as const : undefined }, ...s.rows] };
    return s;
  }) : baseSource;
  const secs = (propuesta ? base.map((s) => (s.id === "negociaciones" ? { ...s, rows: [{ ...buyRow(propuesta), unread: arrivingProposal }, ...s.rows] } : s)) : base).map((s) => (isEmpty ? { ...s, rows: [] } : { ...s, rows: s.rows.map((r) => ({ ...r, ...over[r.id] })) }))
    .map((s, _, all) => ({ ...s, rows: [...all.flatMap((x) => (x.id === s.id ? [] : x.rows.filter((r) => r.sec === s.id))), ...s.rows.filter((r) => !r.sec || r.sec === s.id)] }))
    // La fila usa el mismo hilo que abre el panel; jamás conserva un n/5 viejo.
    .map((s) => ({ ...s, rows: s.rows.map((r) => negs[r.id] ? { ...r, round: roundOf(negs[r.id]) } : r) }))
    // 29/10: la publicación del Nivus sigue al acuerdo de sus negociaciones (o al estado que simula el panel «Acuerdo»).
    .map((s) => s.id !== "publicaciones" ? s : { ...s, rows: s.rows.map((r) => r.id === "su1" ? dealRow(r) : r) });
  const [quick, setQuick] = useState<Row | null>(null);
  // Señal separada para que la hoja conserve su contenido mientras se desliza
  // hacia fuera; `QuickView` desmonta recién al terminar su propia animación.
  const [terminalCloseSignal, setTerminalCloseSignal] = useState(0);
  const [chatOpen, setChatOpen] = useState(false); // el panel de la negociación muestra el chat del acuerdo
  useEffect(() => {
    if (!arrival) return;
    const sectionId = arrival.kind === "valorizacion" ? "sec-valorizaciones" : "sec-publicaciones";
    // La maqueta termina de recomponer sus columnas después de montar. Repetimos
    // el gesto una vez para que la llegada nunca quede fuera de la pantalla.
    const bringArrivalIntoView = () => document.getElementById(sectionId)?.scrollIntoView({ block: "center", behavior: "smooth" });
    const scroll = window.setTimeout(bringArrivalIntoView, 240);
    const reinforceScroll = window.setTimeout(bringArrivalIntoView, 900);
    const settle = window.setTimeout(() => {
      setArrivalActive(false);
      const u = new URL(location.href); ["llegada", "vehiculo", "anio", "valor"].forEach((key) => u.searchParams.delete(key));
      history.replaceState(null, "", u);
    }, 8200);
    return () => { window.clearTimeout(scroll); window.clearTimeout(reinforceScroll); window.clearTimeout(settle); };
  }, [arrival]);
  // El rechazo final se prepara detrás del panel; el destello empieza al cerrarlo,
  // para que la persona pueda verlo en Rechazadas en vez de perderlo bajo el velo.
  const [pendingRejectedLanding, setPendingRejectedLanding] = useState<string | null>(null);
  // Tras pagar, el SubasChat sigue abierto. Al cerrarlo se revela de nuevo la
  // propuesta aceptada en Compras, con una guía breve para volver a entrar.
  const [pendingAcceptedLanding, setPendingAcceptedLanding] = useState<string | null>(null);
  const [role, setRole] = useState(0); // RoleFilter (pieza del 4): la misma persona compra y vende
  const want = [null, "compra", "vende"][role];
  const byRole = want ? secs.map((s) => ({ ...s, rows: s.rows.filter((r) => ROLE[r.id] === want) })).filter((s) => s.rows.length) : secs;
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [demoGuide, setDemoGuide] = useState(false);
  const [flight, setFlight] = useState<{ from: { x: number; y: number }; to: { x: number; y: number } } | null>(null);
  // En el rechazo final primero viajamos a la pestaña Rechazadas; la tarjeta entra
  // después, para que el cambio de etapa no parezca un salto directo de tarjeta.
  const [stageFocus, setStageFocus] = useState<number | undefined>();
  // Al volver del detalle, la propuesta nueva se comporta como un mensaje sin abrir: se marca sola tras tres segundos.
  useEffect(() => {
    if (!arrivingProposal) return;
    const timer = window.setTimeout(() => setSeen((current) => new Set(current).add("bp1")), 3000);
    return () => window.clearTimeout(timer);
  }, [arrivingProposal]);
  // Pendientes se comporta como el inbox: cada fila en negrita es una novedad aún sin abrir.
  const unread = (r: Row) => Boolean((r.isNew || r.unread) && !seen.has(r.id)); // isNew (Julio) o unread (Aaron): las dos van en negrita
  const todo = secs.flatMap((x) => x.rows).filter(unread).length;
  const [onlyTodo, setOnlyTodo] = useState(false);
  // 20/10: Abraham eligió solo el original en HTML (DS de subastop.com); el selector «Banners» y las demás propuestas quedan fuera de /m/vmc.
  const camp: CampView = vmc ? "arte" : "reservado", side: SideView = "arte", veh: Veh = "caja";
  // Banners (22/10): pieza de cada espacio, distinta en cada lado. ?variante= (enlace «Probar en Mi Garaje» de /banners-publica) va al riel; sin él, Max oscuro + «Conoce su valor y publícalo».
  const [ban, setBan] = useState(() => ({ lado: "publica-vmc:01-auto", /* 23/10: Max fuera de los banners por ahora */ riel: pieza(`venta-empresa:${variante}`) ? `venta-empresa:${variante}` : "publica-vmc:10-valor-publica" }));
  // La URL se escribe solo al elegir (no en un efecto: en el montaje pisaría ?lado=&riel= antes de leerlos).
  const setBanners = (lado: string, riel: string) => { if (lado === riel) return; setBan({ lado, riel });
    const u = new URL(location.href); u.searchParams.delete("variante"); u.searchParams.set("lado", lado); u.searchParams.set("riel", riel); history.replaceState(null, "", u); };
  const [bill, setBill] = useState<Bill>("brillo"); // elegida (22/10): Brillo de carta con Transacciones subrayado // letras de Mi billetera (panel del lab)
  useEffect(() => { const b = new URLSearchParams(location.search).get("billetera"); if (BILL.some((o) => o.id === b)) setBill(b as Bill); }, []);
  const toUrl = (k: string, v: string) => { const u = new URL(location.href); u.searchParams.set(k, v); history.replaceState(null, "", u); };
  const pickBill = (b: Bill) => { setBill(b); toUrl("billetera", b); };
  const [pill, setPill] = useState<PillColor>("morado"), [forma, setForma] = useState<PillForma>("carpeta"); // pestañas (panel del lab) · 23/10: Carpeta por defecto
  useEffect(() => { const q = new URLSearchParams(location.search), c = q.get("pill"), f = q.get("forma");
    if (PILL_COLOR.some((o) => o.id === c)) setPill(c as PillColor); if (PILL_FORMA.some((o) => o.id === f)) setForma(f as PillForma); }, []);
  const pickPill = (x: PillColor) => { setPill(x); toUrl("pill", x); };
  const pickForma = (x: PillForma) => { setForma(x); toUrl("forma", x); };
  const [etapas, setEtapas] = useState<Etapas>("grilla");
  useEffect(() => { const x = new URLSearchParams(location.search).get("etapas"); if (ETAPAS.some((o) => o.id === x)) setEtapas(x as Etapas); }, []);
  const pickEtapas = (x: Etapas) => { setEtapas(x); toUrl("etapas", x); };
  const [indicio, setIndicio] = useState<Indicio>("flecha");
  useEffect(() => { const x = new URLSearchParams(location.search).get("indicio"); if (INDICIO.some((o) => o.id === x)) setIndicio(x as Indicio); }, []);
  const pickIndicio = (x: Indicio) => { setIndicio(x); toUrl("indicio", x); };
  const [salida, setSalida] = useState<Salida>("crece");
  const [salidaMs, setSalidaMs] = useState<SalidaMs>("1200");
  const [salidaEspera, setSalidaEspera] = useState<SalidaEspera>("1400");
  useEffect(() => { const q = new URLSearchParams(location.search), a = q.get("salida"), m = q.get("salida-ms"), e = q.get("salida-espera");
    if (SALIDA.some((o) => o.id === a)) setSalida(a as Salida); if (SALIDA_MS.some((o) => o.id === m)) setSalidaMs(m as SalidaMs); if (SALIDA_ESPERA.some((o) => o.id === e)) setSalidaEspera(e as SalidaEspera); }, []);
  const pickSalida = (x: Salida) => { setSalida(x); toUrl("salida", x); };
  const pickSalidaMs = (x: SalidaMs) => { setSalidaMs(x); toUrl("salida-ms", x); };
  const pickSalidaEspera = (x: SalidaEspera) => { setSalidaEspera(x); toUrl("salida-espera", x); };
  const salidaTotal = Number(salidaMs) + Number(salidaEspera); // la fila se retira de la lista cuando termina su animación
  const foco = useFoco(!!sent && !demo); // demo (23/10): entrando directo a /m/vmc no hay llegada que señalar. Foco sobre la fila de la propuesta al llegar (Foco.tsx: trece variantes en el panel del lab)
  const [autoFee, setAutoFee] = useState(false); // 26/10: el fee se cobra solo de la consignación (?fee=auto)
  useEffect(() => { if (new URLSearchParams(location.search).get("fee") === "auto") setAutoFee(true); }, []);
  // Si ya se aceptó, la fila de Ganadas cambia al momento (antes solo se notaba al abrirla).
  // 26/10 (Abraham): al simular que la otra parte acepta, la demo pregunta cómo se habilita el chat (no es parte del diseño).
  const [feeAsk, setFeeAsk] = useState<((auto: boolean) => void) | null>(null);
  const askFee = (go: (auto: boolean) => void) => setFeeAsk(() => (a: boolean) => { setFeeAsk(null); setAutoFee(a); go(a); });
  const [notif, setNotif] = useState(false); // propuesta: la respuesta del vendedor llega también como notificación arriba
  const rol = "1"; // etiqueta de rol en Mis negociaciones: Compra / Venta (22/10, Abraham quitó el selector del lab)
  useEffect(() => { const q = new URLSearchParams(location.search), l = q.get("lado"), rr = q.get("riel");
    setBan((b) => { const n = { lado: l && pieza(l) ? l : b.lado, riel: rr && pieza(rr) ? rr : b.riel }; const tp = (k: string) => RIEL_TIPOS.find((y) => y.piezas.some((z) => z.key === k))?.tipo; // 28/10: nunca el mismo tipo en los dos
      return n.lado === n.riel || (tp(n.lado) && tp(n.lado) === tp(n.riel)) ? b : n; }); }, []);
  const [sideSlot, setSideSlot] = useState<Element | null>(null);
  useEffect(() => { if (vmc) setSideSlot(document.querySelector('.kit-shell__sidebar [data-slot="sidebar-banner"]')); }, [vmc]);
  const glass = sober; // íconos de vidrio en Pulso Fuente y en la maqueta VMC (15/10)
  const filtering = sober && onlyTodo && todo > 0; // se apaga solo al resolver lo último
  const shown = filtering ? byRole.map((s) => ({ ...s, tabs: undefined, rows: s.rows.filter(unread) })).filter((s) => s.rows.length) : byRole;
  const openRow = (r: Row) => { setDemoGuide(false); setPick(r.negId ? { [r.id]: r.negId } : {}); setQuick(r); setSeen((x) => new Set(x).add(r.id)); };
  useEffect(() => {
    const openFromNotification = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const row = secs.flatMap((s) => s.rows).find((r) => r.id === id);
      if (row) openRow(row);
    };
    addEventListener(NOTIF_OPEN_EVENT, openFromNotification);
    return () => removeEventListener(NOTIF_OPEN_EVENT, openFromNotification);
  });
  const flyFinalRow = (id: string, move: () => void) => {
    const source = document.querySelector<HTMLElement>(`[data-row-id="${id}"]`), from = source?.getBoundingClientRect();
    flushSync(move);
    if (!from) return;
    const launch = () => {
      const target = document.querySelector<HTMLElement>(`[data-row-id="${id}"]`), to = target?.getBoundingClientRect();
      if (!to) return;
      setFlight({ from: { x: from.right - 30, y: from.top + 10 }, to: { x: to.right - 30, y: to.top + 10 } });
      window.setTimeout(() => setFlight(null), 850);
    };
    // Una sección vacía se abre al recibir la fila; esperamos el siguiente frame
    // para medir su nueva posición y no perder el vuelo.
    requestAnimationFrame(launch);
  };
  // #qv=<id> abre la vista rápida al cargar: sirve para compartir un estado en revisión.
  useEffect(() => { const id = location.hash.match(/qv=(\w+)/)?.[1]; const r = id && secs.flatMap((x) => x.rows).find((x) => x.id === id); if (r) openRow(r); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [pick, setPick] = useState<Record<string, string>>({}); // fila → comprador abierto en el panel
  const [back, setBack] = useState(false); // la lista entra desde la izquierda solo al volver del detalle (al abrir el panel ya se desliza el panel)
  const peersOf = (rowId: string) => (PEERS[rowId] ?? [rowId]).filter((k) => negs[k]);
  // Con varias propuestas, el panel abre en la lista (nivel 1); la conversación se ve al entrar a un comprador.
  // 23/10 (Abraham): con una propuesta aceptada, la fila abre directo ese chat (en espera del fee del comprador).
  const negIdOf = (rowId: string) => pick[rowId] ?? peersOf(rowId).find((k) => negs[k].state === "aceptada" && negs[k].side === "vende") ?? (peersOf(rowId).length > 1 ? undefined : rowId);
  const negDone = (id: string, negId: string, n: Neg, x: NegResult) => {
    // 26/10 (Abraham): el comprador que acepta elige en la demo cómo se habilita el chat. El vendedor no: siempre espera el pago
    // del comprador y lo simula con «Comprador pagó el fee» (el modal sobre el panel vacío cortaba el flujo).
    if (x.kind === "aceptada") { setAutoFee(false); if (n.side === "compra") askFee(() => {}); }
    const amt = `US$ ${x.amount.toLocaleString("en-US")}`;
    const finalRoundClosed = n.side === "compra" && roundOf(n) === 5 && x.kind === "rechazaste";
    const waiting = peersOf(id).filter((k) => k !== negId && negs[k].state === "ofrece").length; // otros que aún te esperan
    const patch: Partial<Row> = finalRoundClosed ? finalRejectedBuyRow(x.amount, 3)
      : x.kind === "aceptada" ? { status: "Aceptada", tone: "done", detail: `Propuesta aceptada · ${amt}` }
      : waiting ? { detail: `${waiting} ${waiting === 1 ? "propuesta" : "propuestas"} por responder` }
      : x.kind === "rechazaste" ? { status: "Rechazada", tone: "wait", detail: `Rechazaste la propuesta · ${amt}` }
      : { status: "Esperando respuesta", tone: "wait", detail: `${x.kind === "nueva" ? "Propuesta" : "Contrapropuesta"} enviada · ${amt}` };
    // Al dejar pasar la contrapropuesta final, el destino queda preparado detrás
    // del panel. El magenta no empieza aún: debe durar al salir del detalle.
    setOver((o) => ({ ...o, [id]: finalRoundClosed ? { ...patch, flash: false, relocated: false } : waiting && x.kind !== "aceptada" ? patch : { ...patch, when: "Hoy", nextCta: undefined, isNew: false, dueAt: x.kind === "enviada" ? Date.now() + 864e5 : undefined } }));
    // El comprador dejó pasar la última contrapropuesta: se conserva el detalle
    // abierto, pero la pestaña de fondo ya cambia a Rechazadas.
    if (finalRoundClosed) {
      setPendingRejectedLanding(id);
      setStageFocus(3);
    }
    // Cada propuesta vence a las 24 h (T&C IV.6.2.f). «nueva» reinicia rondas e hilo y cuenta una negociación más.
    setNegs((m) => ({ ...m, [negId]: x.kind === "enviada" ? { ...n, unread: false, state: "enviada", round: roundOf({ side: n.side, thread: [...n.thread, { me: true, amount: x.amount, when: "Ahora" }], sessionStart: n.sessionStart }), hours: 24, thread: [...n.thread, { me: true, amount: x.amount, when: "Ahora" }] }
      : x.kind === "nueva" ? { ...n, unread: false, state: "enviada", round: 1, hours: 24, neg: (n.neg ?? 1) + 1, sessionStart: n.thread.length, thread: [...n.thread, { me: true, amount: x.amount, when: "Ahora" }] }
      : x.kind === "rechazaste" ? { ...n, state: "rechazada", closedAt: Date.now() }
      : { ...n, state: x.kind },
      // Aceptar cierra las demás propuestas del mismo auto (T&C IV.6.c).
      ...(x.kind === "aceptada" ? Object.fromEntries(peersOf(id).filter((k) => k !== negId && (m[k].state === "ofrece" || m[k].state === "enviada")).map((k) => [k, { ...m[k], state: "cerrada" as const }])) : {}) }));
    // Venta confirmada → la oferta se abre en el bloque Detalle de Concorde (models/Oferta.tsx) con los datos de este auto.
    const r = secs.flatMap((s) => s.rows).find((s) => s.id === id);
    // Comprador (21/10): al aceptar la contrapropuesta también se abre el chat del acuerdo, como comprador.
    // Vendedor (23/10, Abraham): al aceptar no hay chat todavía; el panel queda abierto esperando el fee de habilitación del comprador.
    if (x.kind === "aceptada" && n.side === "vende") setOver((o) => ({ ...o, [id]: { ...o[id], detail: `Propuesta aceptada · ${amt}`, status: "Esperando pago" } }));
    // Comprador (23/10): igual que el vendedor, se queda en el panel; el chat se abre al pagar el fee de habilitación.
    else if (x.kind === "aceptada" && r) setOver((o) => ({ ...o, [id]: { ...o[id], detail: `Acuerdo · ${amt}`, status: "Por pagar fee", nextCta: "Pagar fee" } }));
  };
  const closeQuick = () => {
    const rejectedId = pendingRejectedLanding, acceptedId = pendingAcceptedLanding;
    const sellerChatReadyId = quick?.side === "vende" && autoFee && quick.negId && negs[quick.negId]?.state === "aceptada" ? quick.id : null;
    setQuick(null);
    if (rejectedId) {
      setPendingRejectedLanding(null);
      // Recién al salir aparece como novedad (bold) y corre su segundo magenta.
      setSeen((seen) => { const next = new Set(seen); next.delete(rejectedId); return next; });
      setOver((o) => ({ ...o, [rejectedId]: { ...o[rejectedId], isNew: true, flash: false, relocated: true, arrivedAt: Date.now() } }));
      window.setTimeout(() => setStageFocus(undefined), 260);
      return;
    }
    // Una vez abierto el chat ya no es una alerta: al volver se deja una entrada
    // sobria para reabrirlo, igual que el acceso persistente del comprador.
    if (sellerChatReadyId) {
      setOver((o) => ({ ...o, [sellerChatReadyId]: { ...o[sellerChatReadyId], detail: "Abrir SubasChat", status: "", tone: "done", isNew: false, unread: false, entryHint: false, flash: false, when: undefined, ago: undefined, dueAt: undefined } }));
      return;
    }
    if (!acceptedId) return;
    setPendingAcceptedLanding(null);
    // La llegada ocurrió detrás del blur; al cerrar el chat se reproduce una
    // señal breve sobre la card destino, igual que al volver de una propuesta.
    setSeen((seen) => { const next = new Set(seen); next.delete(acceptedId); return next; });
    setOver((o) => ({ ...o, [acceptedId]: { ...o[acceptedId], isNew: true, unread: true, entryHint: true, flash: true, arrival: "accepted", arrivedAt: Date.now() } }));
    window.setTimeout(() => setOver((o) => o[acceptedId]?.entryHint
      ? { ...o, [acceptedId]: { ...o[acceptedId], isNew: false, unread: false, entryHint: false, flash: false, arrival: undefined } }
      : o), 2200);
  };
  const finishRejectedNegotiation = (id: string, negId: string, n: Neg, expired = false, sellerActiveOverride?: number) => {
    // La fila se retira detrás de la hoja mientras esta sale a la derecha (o
    // hacia abajo en móvil). No se conserva en Rechazadas: el rechazo del
    // vendedor clausura esta negociación, no una participación de subasta.
    setNegs((m) => ({ ...m, [negId]: { ...m[negId], ...n, closedAt: undefined, expiredBy: undefined, state: "rechazada" } }));
    // Una publicación puede tener varias propuestas en paralelo. Si vence una
    // de ellas, el vendedor conserva su fila mientras todavía haya compradores
    // activos: se notifica en bold, pero no se retira el vehículo completo.
    const sellerActive = n.side === "vende"
      ? sellerActiveOverride ?? peersOf(id).filter((key) => key !== negId && ["ofrece", "enviada"].includes(negs[key]?.state)).length
      : 0;
    if (expired && n.side === "vende" && sellerActive > 0) {
      const dueHours = peersOf(id)
        .filter((key) => key !== negId && ["ofrece", "enviada"].includes(negs[key]?.state))
        .map((key) => negs[key]?.hours ?? 24);
      const remainingLabel = `${sellerActive} ${sellerActive === 1 ? "propuesta activa" : "propuestas activas"}`;
      setSeen((seen) => { const next = new Set(seen); next.delete(id); return next; });
      // Cerramos la hoja de esta conversación, pero no la publicación: al
      // volver a entrar se muestra la lista de compradores que aún siguen
      // activos, no el hilo que ya expiró.
      setPick((p) => { const { [id]: _expired, ...next } = p; return next; });
      setOver((o) => ({ ...o, [id]: {
        ...o[id], negId: undefined,
        detail: `Una propuesta expiró · ${remainingLabel}`,
        status: "Responder", tone: "action", nextCta: "Responder",
        isNew: true, unread: true, leaving: false, expiryExit: false, flash: false,
        sentByMe: false, when: "Ahora", ago: undefined,
        dueAt: Date.now() + Math.min(...dueHours, 24) * 3.6e6, arrivedAt: Date.now(),
      } }));
      setTerminalCloseSignal((x) => x + 1);
      return;
    }
    // La última propuesta expirada sí vacía la publicación: justo antes de la
    // salida toda la fila se vuelve bold y el punto magenta fija la atención.
    const emphasizeExpiry = expired;
    setSeen((seen) => { const next = new Set(seen); next.add(id); return next; });
    setOver((o) => ({ ...o, [id]: { ...o[id], leaving: true, isNew: false, unread: false, expiryExit: emphasizeExpiry, flash: false, dueAt: undefined,
      ...(emphasizeExpiry ? {
        // La fila deja de hablar de la propuesta enviada: en el instante en
        // que se va, comunica el resultado real de las 24 horas.
        detail: `La negociación expiró · ${usd(n.amount)}`,
        status: "Expirada",
        sentByMe: false,
        when: "Ahora",
        ago: undefined,
      } : {}),
    } }));
    setTerminalCloseSignal((x) => x + 1);
    window.setTimeout(() => setOver((o) => ({ ...o, [id]: { ...o[id], leaving: false, dismissed: true } })), salidaTotal + 60);
  };
  // Lab: repite la salida en la primera fila visible de Mis negociaciones sin cerrarla; al terminar, la fila vuelve.
  const probarSalida = () => {
    const id = document.querySelector<HTMLElement>("#sec-negociaciones .fr[data-row-id]")?.dataset.rowId; if (!id) return;
    document.getElementById("sec-negociaciones")?.scrollIntoView({ block: "center", behavior: "smooth" });
    setOver((o) => ({ ...o, [id]: { ...o[id], leaving: true } }));
    window.setTimeout(() => setOver((o) => ({ ...o, [id]: { ...o[id], leaving: false } })), salidaTotal + 500);
  };
  const keepAcceptedInPurchases = (id: string, n: Neg, keepChatOpen = false) => {
    // Puede venir del pago manual o del cobro automático: desde este punto el
    // fee ya está confirmado y la propuesta sigue en Compras, con acceso al SubasChat.
    setAutoFee(true);
    if (keepChatOpen) setPendingAcceptedLanding(id);
    else {
      setQuick(null);
      setSeen((seen) => { const next = new Set(seen); next.delete(id); return next; });
    }
    const final = id === "sf1";
    setOver((o) => ({ ...o, [id]: { ...(final ? finalAcceptedBuyRow(n.amount) : acceptedPaidBuyRow(n.amount)), isNew: !keepChatOpen, unread: false, entryHint: false, flash: false, arrival: "accepted", arrivedAt: Date.now() } }));
  };
  const registerConfirmedPurchase = (id: string, n: Neg) => {
    // Dos semanas después, ambas partes confirman en SubasChat que se concretó.
    // Recién entonces la negociable deja Compras y aterriza en Mis compras.
    setPendingAcceptedLanding(null);
    setSeen((seen) => { const next = new Set(seen); next.delete(id); return next; });
    const row = secs.flatMap((s) => s.rows).find((r) => r.id === id);
    const land = () => setOver((o) => ({ ...o, [id]: {
      ...o[id], side: undefined, sec: "compras", stage: undefined, tab: 0,
      detail: `Negociación concretada · ${usd(n.amount)}`, status: "Compra completada", tone: "done",
      nextCta: "Abrir SubasChat", chat: row ? chatHref(row, n.amount, "comprador") : undefined, sideNote: "Abrir SubasChat",
      isNew: true, unread: true, entryHint: false, flash: true, arrival: undefined, purchaseConfirmed: true, when: "Ahora", ago: undefined, dueAt: undefined, arrivedAt: Date.now(),
      history: [`Ahora · Ambas partes confirmaron que la compra se concretó por ${usd(n.amount)}.`, `Hace 2 semanas · El vendedor aceptó tu propuesta y se habilitó el SubasChat.`],
    } }));
    // Primero se muestra Mi Garaje; luego la tarjeta viaja a su nueva sección.
    setQuick(null);
    window.setTimeout(() => {
      document.getElementById("sec-compras")?.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => {
        flyFinalRow(id, land);
        window.setTimeout(() => setOver((o) => o[id] ? { ...o, [id]: { ...o[id], flash: false } } : o), 1100);
      }, 360);
    }, 50);
  };
  // El fee pagado puede llegar mientras el vendedor no está mirando el chat:
  // el stroke solo orienta durante un instante; la novedad permanece hasta abrirla.
  const clearSellerChatHint = (id: string) => window.setTimeout(() => setOver((o) => o[id]?.entryHint
    ? { ...o, [id]: { ...o[id], entryHint: false, flash: false, arrival: undefined } }
    : o), 2200);
  const receiveSubasChatMessage = (side: "compra" | "vende") => {
    if (side === "compra") {
      const n = negs.bp1; if (!n) return;
      // El atajo del lab también sirve para revisar la llegada sin recorrer la
      // aceptación manual: prepara un acuerdo con fee ya habilitado.
      const amount = n.state === "aceptada" ? n.amount : (n.thread[n.thread.length - 1]?.amount ?? n.amount);
      const accepted = n.state === "aceptada" ? n : acceptedBuyNeg(amount);
      setAutoFee(true);
      if (n.state !== "aceptada") setNegs((m) => ({ ...m, bp1: accepted }));
      setSeen((seen) => { const next = new Set(seen); next.delete("bp1"); return next; });
      const text = "Hola, ya está todo listo para coordinar.";
      setOver((o) => ({ ...o, bp1: { ...o.bp1, ...acceptedPaidBuyRow(amount), chatMessage: true, chatText: text, detail: `Vendedor: ${text}`, status: "Ir al SubasChat", tone: "done", sideNote: undefined, isNew: true, unread: true, when: "Ahora", ago: undefined, arrivedAt: Date.now() } }));
      return;
    }
    const id = peersOf("sn0").find((key) => negs[key].state === "aceptada") ?? peersOf("sn0").find((key) => negs[key].state === "ofrece" || negs[key].state === "enviada") ?? "sn0";
    const n = negs[id]; if (!n) return;
    const amount = n.state === "aceptada" ? n.amount : Math.min(n.list, ([...n.thread].reverse().find((t) => !t.me)?.amount ?? n.amount) + 700);
    const thread = n.state === "aceptada" ? n.thread : [...n.thread, { me: true, amount, when: "Ahora" }];
    setAutoFee(true);
    if (n.state !== "aceptada") setNegs((m) => ({ ...m, [id]: { ...n, state: "aceptada", amount, thread } }));
    setSeen((seen) => { const next = new Set(seen); next.delete("sn0"); return next; });
    const text = "Hola, gracias por aceptar. ¿Cuándo podría ver el auto?";
    setOver((o) => ({ ...o, sn0: { ...o.sn0, negId: id, chatMessage: true, chatText: text, detail: `${n.buyer}: ${text}`, status: "Ir al SubasChat", tone: "done", isNew: true, unread: true, when: "Ahora", ago: undefined, arrivedAt: Date.now() } }));
  };
  // Vendedor (26/10): simula la respuesta del comprador a tu contrapropuesta (espejo de reply).
  const simBuyer = (rowId: string, negId: string, k: "contra" | "acepta", feePaid = false) => {
    const n = negs[negId]; if (!n) return;
    if (k === "acepta") setAutoFee(feePaid); // el vendedor ve pendiente o el chat ya habilitado
    const ask = [...n.thread].reverse().find((t) => t.me)?.amount ?? n.amount, offer = [...n.thread].reverse().find((t) => !t.me)?.amount ?? n.amount;
    if (k === "contra") { const x = Math.min(ask - 100, Math.round((offer + ask) / 2 / 100) * 100);
      setNegs((m) => ({ ...m, [negId]: { ...n, state: "ofrece", amount: x, round: roundOf({ side: n.side, thread: [...n.thread, { me: false, amount: x, when: "Hoy Ahora" }], sessionStart: n.sessionStart }), hours: 24, thread: [...n.thread, { me: false, amount: x, when: "Hoy Ahora" }] } }));
      setOver((o) => ({ ...o, [rowId]: { ...o[rowId], negId, detail: `${n.buyer} contrapropone · ${usd(x)} (${roundOf({ side: n.side, thread: [...n.thread, { me: false, amount: x, when: "Ahora" }], sessionStart: n.sessionStart })}/5)`, status: "Responder", tone: "action", nextCta: "Responder", isNew: true, unread: true, when: "Ahora", ago: undefined, dueAt: Date.now() + 864e5, arrivedAt: Date.now() } }));
    } else if (k === "acepta") {
      setNegs((m) => ({ ...m, [negId]: { ...n, state: "aceptada", amount: ask },
        ...Object.fromEntries(peersOf(rowId).filter((p) => p !== negId && (m[p].state === "ofrece" || m[p].state === "enviada")).map((p) => [p, { ...m[p], state: "cerrada" as const }])) }));
      setOver((o) => ({ ...o, [rowId]: { ...o[rowId], negId, detail: feePaid ? `${n.buyer} aceptó · Fee de habilitación pagado` : `${n.buyer} aceptó · Pendiente de pago de fee`, status: feePaid ? "Ir al SubasChat" : "Esperando pago", tone: "done", when: "Ahora", ago: undefined, nextCta: feePaid ? "Ir al SubasChat" : undefined, isNew: true, unread: true, entryHint: feePaid, arrival: "accepted", dueAt: undefined, arrivedAt: Date.now() } }));
      if (feePaid) clearSellerChatHint(rowId);
    }
    // La fila del Nivus se resalta al recibir la respuesta (sale y vuelve a entrar el brillo).
    setOver((o) => ({ ...o, [rowId]: { ...o[rowId], flash: false } })); setTimeout(() => setOver((o) => ({ ...o, [rowId]: { ...o[rowId], flash: true } })), 60);
  };
  // El panel de demo recorre todos los desenlaces sin exigir que antes se abra el Nivus.
  // Si aún no hubo una contrapropuesta del vendedor, prepara una y aplica la respuesta
  // elegida del comprador antes de abrir el detalle correspondiente.
  const launchSellerResponse = (k: "contra-3" | "contra-5" | "acepta-pendiente" | "acepta-pagado" | "seller-rechaza-3" | "seller-rechaza-5" | "expira-con-activas" | "expira-ultima") => {
    const accepted = k === "acepta-pendiente" || k === "acepta-pagado";
    const feePaid = k === "acepta-pagado";
    const response: "contra" | "acepta" = accepted ? "acepta" : "contra";
    const targetRound = k === "contra-3" ? 3 : k === "contra-5" ? 5 : undefined;
    const active = [...peersOf("sn0")].reverse().find((id) => negs[id].state === "enviada");
    const id = active ?? peersOf("sn0").find((key) => negs[key].state === "ofrece") ?? "sn0";
    const n = negs[id]; if (!n) return;
    if (k === "expira-con-activas" || k === "expira-ultima") {
      const expiryId = peersOf("sn0")[0] ?? id;
      const expiryNeg = negs[expiryId]; if (!expiryNeg) return;
      if (k === "expira-ultima") {
        setNegs((m) => ({
          ...m,
          ...Object.fromEntries(peersOf("sn0").filter((peer) => peer !== expiryId).map((peer) => [peer, { ...m[peer], state: "cerrada" as const }])),
        }));
        finishRejectedNegotiation("sn0", expiryId, expiryNeg, true, 0);
      } else {
        finishRejectedNegotiation("sn0", expiryId, expiryNeg, true);
      }
      return;
    }
    // El botón del lab representa la llegada de la respuesta. Se conserva la
    // notificación a la vista (en vez de saltar al chat) para revisar primero
    // cómo entra cada casuística; al pulsar la fila se abre su historial.
    const showSellerNotification = () => {
      setQuick(null); setPick((p) => ({ ...p, sn0: id }));
      setSeen((seen) => { const next = new Set(seen); next.delete("sn0"); return next; });
    };
    const sellerRejectRound = k === "seller-rechaza-3" ? 3 : k === "seller-rechaza-5" ? 5 : undefined;
    if (sellerRejectRound) {
      const seed = NEG[id] ?? n;
      const initial = [...seed.thread].find((t) => !t.me)?.amount ?? n.amount;
      // Cada ronda conserva propuesta del comprador y contrapropuesta del
      // vendedor; la última propuesta queda justo antes del rechazo.
      const thread = Array.from({ length: sellerRejectRound }, (_, i) => {
        const offer = initial + i * 200;
        return [{ me: false, amount: offer, when: `Hoy ${String(10 + i).padStart(2, "0")}:24` }, ...(i < sellerRejectRound - 1 ? [{ me: true, amount: offer + 500, when: `Hoy ${String(10 + i).padStart(2, "0")}:42` }] : [])];
      }).flat();
      const amount = thread[thread.length - 1].amount;
      setNegs((m) => ({ ...m, [id]: { ...n, state: "rechazada", closedAt: Date.now(), amount, round: sellerRejectRound, hours: 24, thread } }));
      setOver((o) => ({ ...o, sn0: { ...o.sn0, negId: id, detail: `Rechazaste la propuesta de ${n.buyer} · ${usd(amount)} (${sellerRejectRound}/5)`, status: "Cerrando negociación", tone: "wait", isNew: false, unread: false, when: undefined, ago: undefined, dueAt: undefined, arrivedAt: undefined } }));
      setPick((p) => ({ ...p, sn0: id }));
      const row = secs.flatMap((s) => s.rows).find((r) => r.id === "sn0"); if (row) setQuick(row);
      setSeen((seen) => { const next = new Set(seen); next.add("sn0"); return next; });
      return;
    }
    if (active) { simBuyer("sn0", id, response, feePaid); showSellerNotification(); return; }
    const offer = [...n.thread].reverse().find((t) => !t.me)?.amount ?? n.amount;
    const ask = Math.min(n.list, offer + 700);
    if (response === "contra") {
      const seed = targetRound ? (NEG[id] ?? n) : n;
      const initial = [...seed.thread].find((t) => !t.me)?.amount ?? offer;
      const thread = targetRound ? Array.from({ length: targetRound }, (_, i) => [
        { me: false, amount: initial + i * 200, when: `Hoy ${String(10 + i).padStart(2, "0")}:24` },
        ...(i < targetRound - 1 ? [{ me: true, amount: initial + 700 - i * 100, when: `Hoy ${String(10 + i).padStart(2, "0")}:42` }] : []),
      ]).flat() : [...n.thread, { me: true, amount: ask, when: "Ahora" }, { me: false, amount: Math.min(ask - 100, Math.round((offer + ask) / 2 / 100) * 100), when: "Ahora" }];
      const amount = thread[thread.length - 1].amount;
      setNegs((m) => ({ ...m, [id]: { ...n, state: "ofrece", amount, round: targetRound ?? roundOf({ side: n.side, thread }), hours: 24, thread } }));
      setOver((o) => ({ ...o, sn0: { ...o.sn0, negId: id, detail: `${n.buyer} contrapropone · ${usd(amount)} (${targetRound ?? roundOf({ side: n.side, thread })}/5)`, status: "Responder", tone: "action", isNew: true, unread: true, when: "Ahora", ago: undefined, dueAt: Date.now() + 864e5, arrivedAt: Date.now() } }));
    } else {
      const thread = [...n.thread, { me: true, amount: ask, when: "Ahora" }];
      setAutoFee(accepted && feePaid);
      setNegs((m) => ({ ...m, [id]: { ...n, state: accepted ? "aceptada" : "rechazada", amount: ask, thread } }));
      setOver((o) => ({ ...o, sn0: { ...o.sn0, negId: id, detail: accepted ? (feePaid ? `${n.buyer} aceptó · Fee de habilitación pagado` : `${n.buyer} aceptó · Pendiente de pago de fee`) : `${n.buyer} rechazó tu contrapropuesta`, status: accepted ? (feePaid ? "Ir al SubasChat" : "Esperando pago") : "Rechazada", tone: accepted ? "done" : "wait", isNew: true, unread: true, entryHint: accepted && feePaid, arrival: accepted ? "accepted" : undefined, when: "Ahora", ago: undefined, dueAt: undefined, arrivedAt: Date.now() } }));
      if (accepted && feePaid) clearSellerChatHint("sn0");
    }
    showSellerNotification();
  };
  const [going, setGoing] = useState("");
  // Comprador: la fila de la propuesta se resalta al llegar (la confirmación ya la dio el modal) y aviso de la respuesta del vendedor.
  const [toast, setToast] = useState<{ title: string; sub: string; act: string; go: () => void } | null>(null);
  // Con propuesta recién enviada, el foco centra la fila él mismo (useFoco).
  useEffect(() => { if (compra) document.getElementById("sec-participaciones")?.scrollIntoView({ block: "center" }); }, [compra]);
  // Panel «Foco al llegar»: la propuesta vuelve a «esperando respuesta» y la llegada se repite con la variante elegida.
  const pickFoco = (id: FocoId) => {
    if (!sent) return;
    setOver((o) => { const c = { ...o }; delete c.bp1; return c; }); setNegs((m) => ({ ...m, bp1: buyNeg(sent) }));
    setToast(null); setQuick(null); setSeen((x) => { const c = new Set(x); c.delete("bp1"); return c; });
    foco.replay(id);
  };
  // Lab: simula lo que hace el vendedor con la propuesta del Nissan Sentra (ronda 1).
  const sendBuyerProposal = () => {
    const amount = propuesta; if (!amount) return;
    foco.stop(); setQuick(null); setToast(null);
    setDemoGuide(false);
    setNegs((m) => ({ ...m, bp1: buyNeg(amount) }));
    // Control de demo: no abre el chat; una flecha señala la fila real para que el visor la abra.
    setOver((o) => ({ ...o, bp1: { ...buyRow(amount), flash: false } }));
    setSeen((x) => { const next = new Set(x); next.add("bp1"); return next; });
    window.setTimeout(() => {
      setDemoGuide(true);
      document.getElementById("sec-negociaciones")?.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => setDemoGuide(false), 4600);
    }, 60);
  };
  const reply = (k: "contra" | "acepta" | "rechaza", auto?: boolean) => {
    const n = negs.bp1; if (!n || !propuesta) return;
    if (k === "acepta" && auto === undefined) return askFee((a) => reply("acepta", a));
    const mine = n.thread[n.thread.length - 1].amount, ask = counterOf(mine);
    const finalRejection = k === "rechaza" && roundOf(n) === 5;
    foco.stop(); setQuick(null);
    setSeen((x) => { const c = new Set(x); c.delete("bp1"); return c; });
    const open = () => { setToast(null); const r = secs.flatMap((s) => s.rows).find((s) => s.id === "bp1"); if (r) openRow(r); };
    if (k === "rechaza") {
      // La decisión pertenece al vendedor: sin importar la ronda, su rechazo
      // cierra la negociación y libera la consignación del comprador.
      const closed = { ...n, state: "rechazada" as const, closedAt: Date.now(), round: roundOf(n) };
      setNegs((m) => ({ ...m, bp1: closed }));
      setOver((o) => ({ ...o, bp1: { ...o.bp1, detail: "El vendedor rechazó tu propuesta.", status: "Cerrando negociación", tone: "wait", isNew: false, unread: false, dueAt: undefined } }));
      setSeen((x) => { const c = new Set(x); c.add("bp1"); return c; });
      const row = secs.flatMap((s) => s.rows).find((s) => s.id === "bp1"); if (row) setQuick(row);
      return;
    }
    if (k === "contra") {
      setNegs((m) => ({ ...m, bp1: { ...n, state: "ofrece", amount: ask, round: roundOf({ side: n.side, thread: [...n.thread, { me: false, amount: ask, when: "Hoy Ahora" }], sessionStart: n.sessionStart }), hours: 24, thread: [...n.thread, { me: false, amount: ask, when: "Hoy Ahora" }] } }));
      setOver((o) => ({ ...o, bp1: { flash: false, detail: `Contrapropuesta recibida · ${usd(ask)}`, status: "Responder", tone: "action", nextCta: "Responder", isNew: true, sentByMe: false, when: "Ahora", ago: undefined, due: 1, dueAt: Date.now() + 864e5, arrivedAt: Date.now(),
        history: [`Ahora · El vendedor te pidió ${usd(ask)}`, `Hoy · Enviaste una propuesta de ${usd(mine)} y consignaste >S< ${DEPOSIT.sc}`] } }));
      if (notif) setToast({ title: "El vendedor respondió tu propuesta", sub: `Te pide ${usd(ask)} por el ${BUY.name} ${BUY.year} · tienes 24 h`, act: "Ver respuesta", go: open });
    } else if (k === "acepta") {
      const accepted = acceptedBuyNeg(mine);
      setNegs((m) => ({ ...m, bp1: accepted }));
      if (auto) {
        keepAcceptedInPurchases("bp1", accepted);
        if (notif) setToast({ title: "¡El vendedor aceptó tu propuesta!", sub: `${BUY.name} ${BUY.year} · ${usd(mine)}`, act: "Ir al SubasChat", go: open });
      } else {
        setOver((o) => ({ ...o, bp1: acceptedPendingBuyRow(mine) }));
        if (notif) setToast({ title: "¡El vendedor aceptó tu propuesta!", sub: "Pendiente de pagar el fee de habilitación.", act: "Pagar fee", go: open });
      }
    } else {
      const go = () => {
        setNegs((m) => ({ ...m, bp1: { ...n, state: "rechazada", round: roundOf(n) } }));
        setOver((o) => ({ ...o, bp1: finalRejection ? finalRejectedNoticeRow(mine) : { flash: false, detail: "Tu propuesta ha sido rechazada.", status: "Rechazada", tone: "wait", nextCta: undefined, isNew: true, sentByMe: false, hideActor: true, when: "Ahora", ago: undefined, dueAt: Date.now() + 864e5, arrivedAt: Date.now() } }));
      };
      if (finalRejection) {
        const changeToRejected = () => {
          setStageFocus(3);
        };
        const showRejectedCard = () => {
          const finish = () => { setStageFocus(undefined); setOver((o) => ({ ...o, bp1: { ...finalRejectedBuyRow(mine, 3), flash: false, relocated: true } })); };
          flyFinalRow("bp1", finish);
        };
        const moveAfterNotice = () => {
          // La pestaña cambia dentro de la misma vista: sin View Transition global ni
          // scroll de página, que hacían parecer que la tarjeta saltaba de sitio.
          changeToRejected(); window.setTimeout(showRejectedCard, 420);
        };
        go(); window.setTimeout(moveAfterNotice, 900);
        if (notif) setToast({ title: "El vendedor rechazó tu oferta final", sub: `Era tu propuesta 5 de 5 por ${usd(mine)}. La negociación terminó.`, act: "Ver rechazadas", go: open });
      } else {
        go();
        if (notif) setToast({ title: "El vendedor rechazó tu propuesta", sub: "La negociación se cerró y tu consignación fue liberada a tu Billetera.", act: "Ver", go: open });
      }
    }
    // Propuesta de notificación (21/10): además del aviso arriba, la fila se resalta donde quedó. Si aceptó, permanece en Compras
    // y desde ahí abre el chat. flash pasa a false y vuelve a true para que el brillo se repita.
    if (k !== "acepta" && !finalRejection) setTimeout(() => { setOver((o) => ({ ...o, bp1: { ...o.bp1, flash: true } }));
      document.getElementById("sec-negociaciones")?.scrollIntoView({ block: "center", behavior: "smooth" }); }, 60);
  };
  // Atajos del lab: reconstruyen las rondas previas para que el rechazo se lea
  // igual en la fila y en el historial que se abre después.
  const simulateSellerRejection = (targetRound: 3 | 5) => {
    const n = negs.bp1; if (!n || !propuesta) return;
    const base = propuesta;
    const thread = Array.from({ length: targetRound }, (_, i) => {
      const mine = base + i * 200;
      return [{ me: true, amount: mine, when: i ? `Hoy ${10 + i}:00` : "Hoy 10:00" }, ...(i + 1 < targetRound ? [{ me: false, amount: mine + 500, when: `Hoy ${10 + i}:25` }] : [])];
    }).flat();
    const offer = thread[thread.length - 1].amount;
    const prepared = { ...n, state: "rechazada" as const, closedAt: Date.now(), amount: offer, round: targetRound, hours: 24, thread };
    // La demo abre directamente el panel que recibe el comprador: primero se
    // lee el rechazo y la liberación de la consignación; recién luego la hoja
    // y la card desaparecen como una negociación cerrada.
    foco.stop(); setNegs((m) => ({ ...m, bp1: prepared }));
    setOver((o) => ({ ...o, bp1: { ...o.bp1, detail: "El vendedor rechazó tu propuesta.", status: "Cerrando negociación", tone: "wait", isNew: false, unread: false, dueAt: undefined } }));
    setSeen((x) => { const c = new Set(x); c.add("bp1"); return c; });
    const row = secs.flatMap((s) => s.rows).find((r) => r.id === "bp1"); if (row) setQuick(row);
  };
  // Caso de llegada diferida: el rechazo ocurrió mientras la persona no estaba en
  // VMC. Al volver ve la novedad en Compras (sin abrir, por eso en bold); solo al
  // tocar esa fila se reproduce el cierre y la liberación de la consignación.
  const simulatePastSellerRejection = () => {
    const n = negs.bp1; if (!n || !propuesta) return;
    const arrivedAt = Date.now() - 3 * 3.6e6;
    const offer = n.thread[n.thread.length - 1]?.amount ?? propuesta;
    const closed = { ...n, state: "rechazada" as const, amount: offer, closedAt: arrivedAt, round: roundOf(n) };
    foco.stop(); setQuick(null);
    setNegs((m) => ({ ...m, bp1: closed }));
    // FRow ya añade la ronda a todas las negociaciones; no repetirla dentro del copy.
    setOver((o) => ({ ...o, bp1: { ...o.bp1, detail: `El vendedor rechazó tu propuesta · ${usd(offer)}`, status: "", tone: "wait", isNew: true, unread: true, sentByMe: false, when: "3 h", ago: "3 h", dueAt: undefined, arrivedAt } }));
    setSeen((x) => { const next = new Set(x); next.delete("bp1"); return next; });
    notifyArrival({ photo: BUY.photo, title: "El vendedor rechazó tu propuesta", body: `${BUY.name} ${BUY.year} · hace 3 h`, href: "/blocks/mi-garaje/m/vmc#sec-negociaciones", targetRowId: "bp1" });
  };
  // Llegada diferida por expiración: la persona vuelve después de las 24 h.
  // La novedad se anuncia en caja, campana y fila; cualquiera abre el mismo cierre.
  const simulatePastBuyerExpiry = () => {
    const n = negs.bp1; if (!n || !propuesta) return;
    const arrivedAt = Date.now() - 3 * 3.6e6;
    const offer = n.thread[n.thread.length - 1]?.amount ?? propuesta;
    const expired = { ...n, state: "enviada" as const, amount: offer, closedAt: arrivedAt, expiredBy: "vendedor" as const, round: roundOf(n) };
    foco.stop(); setQuick(null);
    setNegs((m) => ({ ...m, bp1: expired }));
    setOver((o) => ({ ...o, bp1: { ...o.bp1, detail: `La negociación expiró · ${usd(offer)}`, status: "", tone: "wait", isNew: true, unread: true, sentByMe: false, when: "3 h", ago: "3 h", dueAt: undefined, arrivedAt } }));
    setSeen((x) => { const next = new Set(x); next.delete("bp1"); return next; });
    notifyArrival({ photo: BUY.photo, title: "La negociación expiró", body: `${BUY.name} ${BUY.year} · hace 3 h`, href: "/blocks/mi-garaje/m/vmc#sec-negociaciones", targetRowId: "bp1" });
  };
  // Vista vendedor: una expiración puede afectar a un solo comprador sin sacar
  // el vehículo de Ventas. La llegada se comporta como una notificación real:
  // primero queda sin abrir y solo al tocarla se reproduce su cierre.
  const simulatePastSellerExpiry = (last = false) => {
    const expiryId = peersOf("sn0")[0];
    const n = expiryId ? negs[expiryId] : undefined; if (!n) return;
    const arrivedAt = Date.now() - 3 * 3.6e6;
    const counter = Math.min(n.list, n.amount + 700);
    const thread = [...n.thread, { me: true, amount: counter, when: "Hace 1 día" }];
    const expired = { ...n, state: "enviada" as const, amount: counter, hours: 0, thread, closedAt: arrivedAt, expiredBy: "comprador" as const };
    foco.stop(); setQuick(null);
    setNegs((m) => ({
      ...m,
      [expiryId]: expired,
      ...(last ? Object.fromEntries(peersOf("sn0").filter((peer) => peer !== expiryId).map((peer) => [peer, { ...m[peer], state: "cerrada" as const }])) : {}),
    }));
    const stillActive = last ? 0 : peersOf("sn0").filter((peer) => peer !== expiryId && ["ofrece", "enviada"].includes(negs[peer]?.state)).length;
    const detail = last
      ? `La negociación expiró · ${usd(counter)}`
      : `Una propuesta expiró · ${stillActive} ${stillActive === 1 ? "propuesta activa" : "propuestas activas"}`;
    setOver((o) => ({ ...o, sn0: {
      ...o.sn0, negId: expiryId, detail, status: "", tone: "wait",
      isNew: true, unread: true, sentByMe: false, leaving: false, expiryExit: false,
      when: "3 h", ago: "3 h", dueAt: undefined, arrivedAt,
    } }));
    setSeen((x) => { const next = new Set(x); next.delete("sn0"); return next; });
    notifyArrival({ photo: "nivus", title: "La negociación expiró", body: `Volkswagen Nivus 2022 · hace 3 h`, href: "/blocks/mi-garaje/m/vmc#sec-negociaciones", targetRowId: "sn0" });
  };
  // Caso independiente para probar la última ronda: el Picanto ya está en 5/5 y el vendedor decide el desenlace.
  const finalRoundReply = (k: "contra" | "acepta" | "rechaza") => {
    const n = negs.sf1; if (!n || n.state !== "enviada") return;
    const offer = n.thread[n.thread.length - 1].amount;
    if (k === "contra") {
      setNegs((m) => ({ ...m, sf1: { ...n, state: "ofrece", amount: FINAL_BUY.counter, round: 5, hours: 24, thread: [...n.thread, { me: false, amount: FINAL_BUY.counter, when: "Hoy Ahora" }] } }));
      setOver((o) => ({ ...o, sf1: { detail: `Contrapropuesta recibida · ${usd(FINAL_BUY.counter)}`, status: "Responder", tone: "action", isNew: true, unread: true, sentByMe: false, when: "Ahora", ago: undefined, due: 1, dueAt: Date.now() + 864e5, arrivedAt: Date.now(),
        history: [`Ahora · El vendedor te hizo su contrapropuesta final de ${usd(FINAL_BUY.counter)} (5 de 5)`, `Hoy · Enviaste tu última propuesta de ${usd(offer)} (5 de 5)`] } }));
      return;
    }
    if (k === "rechaza") {
      const showNotice = () => {
        setNegs((m) => ({ ...m, sf1: { ...n, state: "rechazada", round: 5 } }));
        setOver((o) => ({ ...o, sf1: finalRejectedNoticeRow(offer) }));
      };
      const changeToRejected = () => {
        setStageFocus(3);
      };
      const showRejectedCard = () => {
        const finish = () => { setStageFocus(undefined); setOver((o) => ({ ...o, sf1: { ...finalRejectedBuyRow(offer, 3), flash: false, relocated: true } })); };
        flyFinalRow("sf1", finish);
      };
      const moveAfterNotice = () => {
        changeToRejected(); window.setTimeout(showRejectedCard, 420);
      };
      showNotice(); window.setTimeout(moveAfterNotice, 900);
      return;
    }
    setNegs((m) => ({ ...m, sf1: { ...n, state: "aceptada", round: 5 } }));
    setOver((o) => ({ ...o, sf1: { ...finalAcceptedBuyRow(offer), flash: false, arrival: "accepted", arrivedAt: Date.now() } }));
  };
  // Alto del riel para su sticky (ver .f-src__rail en garaje.css).
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = railRef.current; if (!el) return;
    const ro = new ResizeObserver(() => el.style.setProperty("--rail-h", `${el.offsetHeight}px`)); ro.observe(el); return () => ro.disconnect(); }, []);
  // #neg=rechazada: el vendedor rechazó la propuesta del Mazda 3 (revisión del caso comprador).
  useEffect(() => { if (!/neg=rechazada/.test(location.hash)) return;
    setNegs((m) => (m.sn1 ? { ...m, sn1: { ...m.sn1, state: "rechazada" } } : m));
    setOver((o) => ({ ...o, sn1: { status: "Rechazada", tone: "wait", detail: "Tu propuesta ha sido rechazada.", hideActor: true, dueAt: Date.now() + 864e5 } })); }, []);
  // Pulso Fuente: sin Pendientes; Tu actividad ocupa la columna principal y Wallet + SubasPass van en el riel.
  const activity = (
      <div className="g-activity">
        <div className="g-activity__head">
          <Heading variant={variant} title="Tu actividad" group sub={variant === "concorde" ? "Tus procesos en VMC" : undefined} />
          {/* Filtro junto a lo que filtra: deja solo lo que te necesita, sin pestañas para no esconder nada. */}
          {sober && todo > 0 && !isLoading ? <PendingToggle count={todo} checked={filtering} onToggle={() => smooth(() => setOnlyTodo((x) => !x))} /> : null}
          {variant === "fernando" && !isEmpty && !sober ? <TabSelector options={["Todo", "Comprando", "Vendiendo"]} value={role} onChange={setRole} aria-label="Filtrar por rol" /> : null}
        </div>
        {isEmpty && !isLoading ? <div className="g-firstrun">
          <p><b>Todavía no tienes actividad.</b> Participa en una subasta o publica tu vehículo y aquí verás cada proceso.</p>
          <ProfileButton>Ver subastas de hoy</ProfileButton>
        </div> : null}
        <LayoutGroup id="mi-garaje-flows"><div className="fa">{shown.map((s) => <FSection key={`${s.id}-${role}-${filtering}`} s={s} loading={isLoading} compact={features.compact} onOpen={openRow} seen={seen} act={sober} vmc={vmc} guideId={demoGuide ? "bp1" : undefined}
            tip={sent && s.id === "negociaciones" ? <FocoInline f={foco} /> : undefined} stageFocus={s.id === "participaciones" ? stageFocus : undefined} />)}</div></LayoutGroup>
      </div>
  );
  const subaspass = (
      <aside className="g-subaspass" aria-label="SubasPass">
        <div><b>Compra SubasPass</b><span>¡Dile bye al riesgo alto!</span></div>
        {sober ? <ProfileButton>Comprar ahora</ProfileButton> : <Button variant="outline">Comprar ahora</Button>}
      </aside>
  );
  return <Chrome vmc={vmc}>
    {/* g--vmc = lenguaje visual compartido (jerarquía, filas, radios, contador…); g--wide = Pulso Fuente a todo el ancho (15/10). */}
    <main className={`g-page g--${variant}${vmc ? " g--vmc" : sober ? " g--vmc g--wide" : ""}`} data-rol={rol} data-billetera={bill} data-pill={pill} data-forma={forma} data-etapas={etapas} data-indicio={indicio} data-salida={salida}
      style={{ "--salida-ms": `${salidaMs}ms`, "--salida-espera": `${salidaEspera}ms` } as React.CSSProperties}>
      {flight ? <FlightCue {...flight} /> : null}
      {sober ? <><div className="f-src">
        <div className="f-src__main"><FernandoHead sober risk={risk} />
        {activity}</div>
        <div className="f-src__rail" ref={railRef}><Actions variant={variant} sober vmc={vmc} /><Wallet variant={variant} withData={withData} /><Ad banner camp={camp} veh={veh} b={pieza(ban.riel)!} /><Recs withData={withData} /></div>
      </div></> : variant === "fernando" ? <div className="f-grid">
        <FernandoHead sober={sober} />
        <Actions variant={variant} sober={sober} />
        <PendingPanel secs={secs} loading={isLoading} onOpen={openRow} sober={sober} />
        <Wallet variant={variant} withData={!sober || withData} />
      </div> : <header className="g-top">
        <Heading variant={variant} level={1} title="Mi Garaje" sub="Tus vehículos, ofertas y compras." />
        <div className="g-top__actions"><Actions variant={variant} /></div>
      </header>}

      {variant === "fernando" ? null : <div className="g-mobile-only"><AccountLine /></div>}

      {variant !== "fernando" && features.summary ? <SummaryBand secs={secs} loading={isLoading} /> : null}
      {variant !== "fernando" && features.next ? <NextStep secs={secs} loading={isLoading} variant={variant} /> : null}

      {variant === "fernando" ? null : <div className="g-zona">
        <div className="g-desktop-only"><UserProfileCard username="ZAEX5G" riskValue="Muy bajo" points="500 pts" /></div>
        <Wallet variant={variant} />
      </div>}

      {sober ? null : <>{activity}{subaspass}</>}
      <QuickView r={quick && { ...quick, ...over[quick.id] }} onClose={closeQuick} closeSignal={terminalCloseSignal}
        go={(() => { const k = quick && negIdOf(quick.id), n = k ? negs[k] : undefined;
          return chatOpen && quick && n?.state === "aceptada" ? { href: detailHref(quick, n.amount, n.side === "vende" ? "vendedor" : "comprador"), mode: ac.go } : undefined; })()}
        neg={quick && negs[quick.id] ? (() => {
          const ids = peersOf(quick.id), peers = ids.length > 1 ? ids.map((k) => ({ id: k, n: negs[k] })) : undefined, cur = negIdOf(quick.id);
          if (!cur) return <NegList back={back} peers={peers ?? []} onPick={(k) => { setBack(false); setNegs((m) => ({ ...m, [k]: { ...m[k], unread: false } })); setPick((m) => ({ ...m, [quick.id]: k })); }} />;
          return <NegPanel n={negs[cur]} coins={withData ? 1250 : 0} chat={negs[cur].side === "compra" && negs[cur].state === "aceptada" ? chatHref(quick, negs[cur].amount, "comprador") : undefined} autoFee={autoFee} chatReady={Boolean(quick?.chatMessage)} chatMessageText={quick?.chatText} purchaseConfirmed={Boolean(over[quick.id]?.purchaseConfirmed ?? quick.purchaseConfirmed)} onSim={cur ? (k) => simBuyer(quick.id, cur, k) : undefined} onDone={(n, x) => negDone(quick.id, cur, n, x)} onClosed={(n, expired) => finishRejectedNegotiation(quick.id, cur, n, expired)} onFeePaid={() => keepAcceptedInPurchases(quick.id, negs[cur], true)} onPurchaseConfirmed={negs[cur].side === "compra" ? () => registerConfirmedPurchase(quick.id, negs[cur]) : undefined} onCancel={closeQuick} peers={peers} active={cur} onChatOpen={setChatOpen}
            onBack={peers ? () => { setBack(true); setPick((m) => ({ ...m, [quick.id]: "" })); } : undefined} />; /* "" = la lista (si no, la aceptada se reabre sola) */
        })() : undefined} />
      {going ? <div role="status" aria-live="polite" style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center", background: "rgba(34,0,92,.55)", color: "#fff", fontSize: 20, fontWeight: 700 }}>
        {going}</div> : null}
      {toast ? <div className="g-toast" role="status" aria-live="polite"><img src={PHOTO[BUY.photo]} alt="" /><p><b>{toast.title}</b><small>{toast.sub}</small></p>
        <span className="g-toast__cta"><Button variant="negotiable" onClick={toast.go}>{toast.act}</Button></span>
        <button type="button" className="g-toast__x" aria-label="Cerrar aviso" onClick={() => setToast(null)}><svg width="14" height="14" viewBox="0 0 20 20" aria-hidden><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button></div> : null}
      {vmc ? <><WalletLab v={bill} set={pickBill} /><PillLab color={pill} forma={forma} setColor={pickPill} setForma={pickForma} etapas={etapas} setEtapas={pickEtapas} indicio={indicio} setIndicio={pickIndicio} />
        <SalidaLab v={salida} ms={salidaMs} espera={salidaEspera} set={pickSalida} setMs={pickSalidaMs} setEspera={pickSalidaEspera} probar={probarSalida} /></> : null}
      {sent ? <><FocoLayer f={foco} photo={PHOTO[BUY.photo]} car={`${BUY.name} ${BUY.year}`} amount={usd(sent)} /><FocoPanel f={foco} onPick={pickFoco} /></> : null}
      {sent ? <LabPanel title="Demo · Simula comprador" store="mg-simular" className="f-sw--buy f-sw--sim-buy" side="right" defaultOpen>
        <div className="f-sw__g" role="group" aria-label="Flujo de aceptación" data-acts><span className="f-sw__k"><b>Flujo</b> · Vendedor acepta → SubasChat</span>
          <button type="button" disabled={negs.bp1?.state !== "enviada"} onClick={() => reply("acepta")}>Vendedor acepta</button>
          <small className="f-sw__hint">La propuesta aceptada permanece en Compras y desde ahí abre el acceso al chat.</small></div>
        <div className="f-sw__g" role="group" aria-label="Envío del comprador" data-acts><span className="f-sw__k"><b>Envío del comprador</b> · Nissan Sentra</span>
          <button type="button" onClick={sendBuyerProposal}>Propuesta enviada<small>{usd(propuesta ?? 0)} · 1/5</small></button>
          <small className="f-sw__hint">Demo: se resalta la fila enviada arriba. Haz clic en ella para abrir el chat.</small></div>
        <div className="f-sw__g" role="group" aria-label="Llegada posterior" data-acts><span className="f-sw__k"><b>Al volver a Mi Garaje</b> · sin abrir</span>
          <button type="button" onClick={simulatePastSellerRejection}>Vendedor rechazó tu propuesta<small>hace 3 h · sin abrir</small></button>
          <button type="button" onClick={simulatePastBuyerExpiry}>La negociación expiró<small>hace 3 h · sin abrir</small></button>
          <small className="f-sw__hint">La caja, la campana y la fila comunican la novedad. Ábrela desde cualquiera de ellas para ver el cierre y la devolución.</small></div>
        <div className="f-sw__g" role="group" aria-label="Otras respuestas del vendedor" data-acts><span className="f-sw__k"><b>Respuestas del vendedor</b> · simulaciones</span>
          <button type="button" disabled={negs.bp1?.state !== "enviada"} onClick={() => reply("contra")}>Contrapropone{negs.bp1 ? <small>{usd(counterOf(negs.bp1.thread[negs.bp1.thread.length - 1].amount))} · {roundOf(negs.bp1)}/5</small> : null}</button>
          <button type="button" onClick={() => simulateSellerRejection(3)}>Rechaza<small>3/5</small></button>
          <button type="button" onClick={() => simulateSellerRejection(5)}>Rechaza<small>5/5</small></button>
          <button type="button" disabled={negs.sf1?.state !== "enviada"} onClick={() => finalRoundReply("contra")}>Contrapropone<small>Picanto · {usd(FINAL_BUY.counter)}</small></button>
          <button type="button" disabled={negs.sf1?.state !== "enviada"} onClick={() => finalRoundReply("rechaza")}>Rechaza la final<small>Picanto · 5/5</small></button>
          <small className="f-sw__hint">El Nissan Sentra permite revisar el rechazo intermedio (3/5) y el final (5/5); el Picanto conserva la contrapropuesta final.</small></div>
        <div className="f-sw__g" role="group" aria-label="Cómo llega la respuesta"><span className="f-sw__k"><b>Aviso</b> · cómo llega la respuesta</span>
          <button type="button" aria-pressed={!notif} onClick={() => setNotif(false)}>Resaltar fila</button>
          <button type="button" aria-pressed={notif} onClick={() => setNotif(true)}>+ Notificación (propuesta)</button>
          <small className="f-sw__hint">{notif ? "Además del resaltado, un aviso arriba con «Ver respuesta» o «Abrir chat»." : "La fila se resalta donde quedó; si aceptó, permanece en Compras."}</small></div>
        <div className="f-sw__g" role="group" aria-label="Mensaje de SubasChat" data-acts><span className="f-sw__k"><b>SubasChat</b> · vendedor</span>
          <button type="button" onClick={() => receiveSubasChatMessage("compra")}>Mensaje nuevo del vendedor</button>
          <small className="f-sw__hint">Prepara el chat si hace falta; llega en Compras y lo abre al tocarla.</small></div></LabPanel> : null}
      {/* 26/10 (Abraham): espejo para el vendedor; responde como comprador a tu última contrapropuesta del Nivus. */}
      {vmc ? (() => { const tgt = [...peersOf("sn0")].reverse().find((k) => negs[k].state === "enviada");
        return <LabPanel title="Simula vendedor" store="mg-simular-v" className="f-sw--buy f-sw--sim-sell" side="right" defaultOpen>
          <div className="f-sw__g" role="group" aria-label="Respuesta del comprador" data-acts><span className="f-sw__k"><b>Responde</b> · tu contrapropuesta del Volkswagen Nivus{tgt ? ` (${negs[tgt].buyer})` : ""}</span>
            {([["contra-3", "Comprador contrapropone", "3/5"], ["contra-5", "Comprador contrapropone", "5/5"], ["seller-rechaza-3", "Vendedor rechaza", "3/5"], ["seller-rechaza-5", "Vendedor rechaza", "5/5"], ["expira-con-activas", "Expira una propuesta", "quedan activas"], ["expira-ultima", "Expira última propuesta", "se cierra"], ["acepta-pendiente", "Comprador acepta", "pago pendiente"], ["acepta-pagado", "Comprador acepta", "fee pagado"]] as const).map(([k, l, m]) => <button key={k} type="button" onClick={() => launchSellerResponse(k)}>{l}{m ? <small>{m}</small> : null}</button>)}
            <small className="f-sw__hint">{tgt ? "Solo para el lab: en VMC lo envía el comprador." : "Simula una llegada; abre la notificación nueva para ver su historial."}</small></div>
          <div className="f-sw__g" role="group" aria-label="Mensaje de SubasChat" data-acts><span className="f-sw__k"><b>SubasChat</b> · comprador</span>
            <button type="button" onClick={() => receiveSubasChatMessage("vende")}>Mensaje nuevo del comprador</button>
            <small className="f-sw__hint">Prepara el chat si hace falta; llega en Ventas y lo abre al tocarla.</small></div>
          <div className="f-sw__g" role="group" aria-label="Expiración llegada posterior" data-acts><span className="f-sw__k"><b>Expiración</b> · llegó mientras no estabas</span>
            <button type="button" onClick={() => simulatePastSellerExpiry(false)}>Expira una propuesta<small>quedan 2 activas · hace 3 h</small></button>
            <button type="button" onClick={() => simulatePastSellerExpiry(true)}>Expira última propuesta<small>se cierra · hace 3 h</small></button>
            <small className="f-sw__hint">Primero llega a caja, campana y Ventas. Ábrela para ver la animación de cierre.</small></div></LabPanel>; })() : null}
      {/* 26/10 (Abraham): modal de la demo, no del diseño: antes de abrir el chat, elegir cómo se habilitó. */}
      {feeAsk ? <dialog className="lab-ask" aria-labelledby="lab-ask-t" ref={(d) => { if (d && !d.open) d.showModal(); }} onCancel={(e) => { e.preventDefault(); setFeeAsk(null); }}>
        <div className="lab-ask__card"><span className="lab-ask__k">Demo</span>
          <h2 id="lab-ask-t">¿Cómo se habilita el chat?</h2>
          <p>La propuesta fue aceptada. Para abrir el SubasChat, el comprador cubre el fee de habilitación (&gt;S&lt; {DEPOSIT.sc}).</p>
          <button type="button" autoFocus onClick={() => feeAsk(false)}><b>Queda pendiente de pago</b><small>La propuesta queda en Compras hasta que el comprador pague el fee.</small></button>
          <button type="button" onClick={() => feeAsk(true)}><b>Se cobró automáticamente</b><small>Sale de la consignación inicial: animación y chat directo.</small></button>
          <button type="button" className="lab-ask__x" onClick={() => setFeeAsk(null)}>Cancelar</button></div></dialog> : null}
      {vmc ? <CampSwitch lado={ban.lado} riel={ban.riel} set={setBanners} /> : null}
      {vmc ? <PagLab /> : null}
      {vmc ? <PubActionsLab /> : null}
      {vmc ? <AcuerdoLab onTry={() => { launchSellerResponse("acepta-pagado"); const r = secs.flatMap((s) => s.rows).find((x) => x.id === "sn0");
        if (r) window.setTimeout(() => openRow(r), 150); }} /> : null}
      {sideSlot ? createPortal(<Promo key={ban.lado} slot="side" view={side} veh={veh} b={pieza(ban.lado)!} />, sideSlot) : null}
    </main>
  </Chrome>;
}
