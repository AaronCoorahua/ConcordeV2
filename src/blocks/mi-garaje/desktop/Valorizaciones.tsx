"use client";

/**
 * Mis valorizaciones · primera pantalla («Pulso»).
 * Destino de «Guardar» desde el resultado AVT. Estructura de datos según avt-ai.app (ver
 * entregas-abraham-2026-10-09/03-contrato-avt-desde-app.md). Se guarda lo que se respondió en Valorizar (vehículo y
 * detalles) y el resultado se recalcula con las mismas fórmulas de AVT (buildResult): la tarjeta y «Ver resultado»
 * muestran las mismas cifras. Las fotos solo se agregan al publicar: una valorización sin publicar no tiene foto.
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import DecisionBar from "@/src/components/DecisionBar";
import ValuationCard from "@/src/components/ValuationCard";
import AddButton from "@/src/components/AddButton";
import StatusTag, { type StatusTone } from "@/src/components/StatusTag";
import { Vidrio } from "@/src/components/Vidrio";
import { Chrome, PHOTO } from "./kit";
import { Chevron, smooth } from "./Garaje";
import { buildResult, ansFrom } from "./Flujo";
import Revela from "./Revela";
import "./kit.css";
import "./garaje.css";
import "./valorizaciones.css";

import { VALS, type Val } from "./valorizaciones-data";
const RES = Object.fromEntries(VALS.map((v) => [v.id, buildResult({ ...v, ans: ansFrom(v.factors) })]));
const usd = (n: number) => `US$ ${n.toLocaleString("en-US")}`;
// VMC (16/10): la maqueta de vmcsubastas.com usa sus propias rutas; el resto de modelos, las del lab.
const routes = (vmc: boolean) => vmc ? { home: "/blocks/mi-garaje/m/vmc", valuar: "/blocks/mi-garaje/m/vmc-valuar", publica: "/blocks/mi-garaje/m/vmc-publica" } : { home: "/blocks/mi-garaje/m/fuente", valuar: "/blocks/mi-garaje/m/valuar", publica: "/blocks/mi-garaje/m/publica" };
// El estado dice qué sigue, con los tonos de Tu actividad: lo que te toca hacer va en naranja (action).
// Estado en gris salvo la revisión (lila, como en Mi Garaje VMC): el teal queda solo para NEGOCIABLE y el naranja para Publicar
// y lo que cuesta esperar; con todo en color nada destacaba.
const STATE: Record<Val["state"], [StatusTone, string]> = { pub: ["wait", "Publicada"], review: ["progress", "Pendiente de aprobación"], saved: ["wait", "Lista para publicar"] };
const short = (d: string) => d.slice(0, 5); // «12/05/2026» → «12/05», como las fechas de Mi Garaje

/** La acción principal según el estado: Publicar lleva a Publicar con los datos ya cargados (solo faltan las fotos);
 *  Ver publicación abre esa publicación en Mi Garaje (#qv), no la sección entera. */
function Next({ v, R }: { v: Val; R: ReturnType<typeof routes> }): JSX.Element {
  if (v.state !== "saved") return <Button variant="negotiable" onClick={() => { location.href = v.pub ? `${R.home}#qv=${v.pub}` : `${R.home}#sec-publicaciones`; }}>Ver publicación</Button>;
  return <Button variant="primary" onClick={() => { location.href = `${R.publica}?desde=${v.id}`; }}>Publicar</Button>;
}

const ORDER: Record<Val["state"], number> = { saved: 0, review: 1, pub: 2 }; // primero lo que pide una acción

/** Tarjeta por vehículo (16/10): ValuationCard de Concorde.
 *  · Lista para publicar → «¿publico ahora?»: valor, cuánto pierde si espera (proyección AVT a 12 meses), señal de venta y Publicar.
 *  · Publicada / en revisión (compacta, identidad Negociable) → «¿cómo va mi venta?»: ofertas o revisión y Ver publicación.
 *  Solo datos de AVT y de Mis publicaciones; la estimación Subastop (subasta) queda en el análisis, no se mezcla con Negociable. */
function Tarjeta({ v, R, onOpen }: { v: Val; R: ReturnType<typeof routes>; onOpen: () => void }): JSX.Element {
  const d = RES[v.id].rdata, s = d.sig, [tone, label] = STATE[v.state], neg = v.state !== "saved";
  const at = v.updated ?? short(v.saved), y12 = d.pf?.find((p) => p.label === "12M")?.v ?? d.market; // hito 12M de projectForward (AVT)
  return <ValuationCard title={`${v.brand} ${v.model} ${v.year}`} subtitle={`${v.version} · ${v.km.toLocaleString("en-US")} km`} photo={neg ? PHOTO[v.photo] : undefined}
    status={{ tone, label }} negotiable={neg} valueLabel={`Valor de mercado al ${at}`} value={usd(d.market)}
    drift={neg ? undefined : v.drift}
    waitLoss={!neg && y12 < d.market ? { amount: `−${usd(d.market - y12)}`, worth: usd(y12), perDay: s.timing.dailyValueLoss > 0 ? `~${usd(s.timing.dailyValueLoss)}/día` : undefined } : undefined}
    signal={neg ? undefined : { level: s.signal.level, label: s.signal.label, sublabel: s.signal.sublabel }}
    detail={neg ? { label: v.state === "pub" ? "Tu publicación" : "Revisión de VMC", value: v.how ?? "" } : undefined}
    onAnalysis={onOpen} action={<Next v={v} R={R} />} />;
}

export default function Valorizaciones({ isEmpty, vmc = false }: { isEmpty: boolean; vmc?: boolean }): JSX.Element {
  const [open, setOpen] = useState<Val | null>(null);
  const R = routes(vmc);
  const all = isEmpty ? [] : [...VALS].sort((a, b) => ORDER[a.state] - ORDER[b.state]);
  const todo = all.filter((v) => v.state === "saved").length, [only, setOnly] = useState(false);
  const list = only && todo ? all.filter((v) => v.state === "saved") : all;
  // #det=<id> abre el resultado guardado (para compartir el estado en revisión); volver lo quita.
  useEffect(() => { const sync = () => { const id = location.hash.match(/det=(\w+)/)?.[1]; setOpen(isEmpty ? null : VALS.find((x) => x.id === id) ?? null); };
    sync(); addEventListener("hashchange", sync); return () => removeEventListener("hashchange", sync); }, [isEmpty]);
  // El análisis se abre en un panel sobre las tarjetas (como la vista rápida de Mi Garaje). Cerrar deja al usuario aquí:
  // retrocede si el panel se abrió en esta página; si llegó con #det (desde Mi Garaje o un enlace), quita el hash sin
  // dejar entrada en el historial, así Atrás no lo reabre.
  const fromHere = useRef(false);
  const show = (v: Val) => { fromHere.current = true; location.hash = `det=${v.id}`; };
  const close = () => { if (fromHere.current) history.back(); else { history.replaceState(null, "", location.pathname + location.search); setOpen(null); } };
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => { const x = dlg.current; if (!x) return; if (open && !x.open) x.showModal(); if (!open && x.open) x.close(); }, [open]);
  // Salida animada (×, Esc o clic afuera): se desliza y se desvanece en 200 ms antes de cerrarse; con movimiento reducido, al instante.
  const shut = () => { const x = dlg.current; if (!x?.open || x.classList.contains("is-closing")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return x.close();
    x.classList.add("is-closing"); setTimeout(() => { x.classList.remove("is-closing"); x.close(); }, 200); };

  // Resultado guardado: el mismo «Revela» del final de Valorizar, quieto y con su barra de decisión.
  const result = (o: Val) => { const pub = o.state !== "saved"; return <section className="fl-result fl-result--ds fl-result--rv" aria-label={`Resultado de ${o.brand} ${o.model} ${o.year}`}>
    <Revela d={RES[o.id].rdata} still at={o.updated ?? short(o.saved)} />
    <DecisionBar title={o.state === "pub" ? "Tu vehículo ya está publicado" : o.state === "review" ? "Tu publicación está en revisión" : "¿Publicamos tu vehículo?"}
      description={o.state === "pub" ? "Se publicó como oferta Negociable con este valor de referencia." : o.state === "review" ? "VMC la aprueba en un plazo corto; te avisamos al publicarse." : "Ya tenemos los datos del vehículo: en Publicar solo agregas las fotos."}
      actions={<>{pub ? null : <Button variant="outline" onClick={() => { location.href = R.valuar; }}>Valorizar de nuevo</Button>}<Next v={o} R={R} /></>} />
  </section>; };
  // Barra fija del panel: qué auto y en qué estado (sigue visible al hacer scroll); las fechas van en el cuerpo.
  const bar = (o: Val) => { const [tone, label] = STATE[o.state]; return <div className="vz-panel__id"><b>{o.brand} {o.model} {o.year}</b>
    <span className="vz-card__tags">{o.state !== "saved" ? <span className="vz-neg">Negociable</span> : null}<StatusTag tone={tone}>{label}</StatusTag></span></div>; };
  const saved = (o: Val) => <p className="vz-res__saved">Guardada el {o.saved}{o.updated ? <> · recalculada el {o.updated}{o.drift ? <> · <b>{o.drift > 0 ? "+" : "−"}{Math.abs(o.drift)}{"\u00a0"}%</b> desde que la guardaste</> : null}</> : null}</p>;

  return <Chrome vmc={vmc}>
    <main className={`g-page g--fernando vz${vmc ? " vz--vmc" : ""}`}>
      <nav className="vz-back" aria-label="Volver"><a href={R.home}><span className="vz-back__chev"><Chevron /></span>Mi Garaje</a></nav>
      <header className="vz-top">
        {/* Ícono de bloque de vidrio, el mismo de la sección en Mi Garaje VMC. */}
        <div className="vz-top__t vd-host"><Vidrio s="valorizaciones" size={44} /><div><h1>Mis valorizaciones</h1><p>Guarda el valor de tu vehículo y publícalo cuando quieras.</p></div></div>
        {/* El mismo switch de Tu actividad: deja solo lo que te pide una acción (aquí, publicar). Solo con 5 o más valorizaciones:
            con menos, lo que hay que publicar ya va primero y filtrar no ayuda a encontrar nada. */}
        {todo > 0 && all.length >= 5 ? <button type="button" role="switch" aria-checked={only} className="f-only vd-host" onClick={() => smooth(() => setOnly((x) => !x))}><span className="f-only__track" aria-hidden><i /></span>Por publicar <b>{todo}</b></button> : null}
      </header>

      {!list.length ? <section className="vz-empty" aria-labelledby="vz-empty">
        <h2 id="vz-empty">Aún no guardas valorizaciones</h2>
        <p>En un minuto conoces el valor de mercado de tu vehículo, su rango estimado y cómo se compara con vehículos similares publicados.</p>
        <ol className="vz-steps"><li><b>Tu vehículo</b> marca, modelo, año, versión y kilometraje</li><li><b>Los detalles</b> mecánica, estado e historial (opcional, afinan el valor)</li><li><b>Tu resultado</b> lo guardas aquí o lo publicas</li></ol>
        <Button variant="primary" onClick={() => { location.href = R.valuar; }}>Valorizar mi vehículo</Button>
      </section> : <>
        <ul className="vz-cards" aria-label={`${list.length} valorizaciones guardadas`}>{list.map((v) => <Tarjeta key={v.id} v={v} R={R} onOpen={() => show(v)} />)}</ul>
        {/* Acción secundaria: una fila delgada, no una tarjeta más. */}
        <AddButton onClick={() => { location.href = R.valuar; }}>Valorizar otro vehículo</AddButton>
      </>}
      {/* Panel lateral (PROPUESTA 16/10): el análisis se abre sobre la página, como la vista rápida de Mi Garaje; en móvil sube como hoja. */}
      <dialog ref={dlg} className="vz-panel" aria-labelledby="fl-h" onClose={() => { if (location.hash.includes("det=")) close(); }}
        onCancel={(e) => { e.preventDefault(); shut(); }} onClick={(e) => { if (e.target === e.currentTarget) shut(); }}>
        {open ? <div className={`vz-panel__in fl${vmc ? " fl--vmc" : ""}`}>
          <header className="vz-panel__bar"><span className="vz-panel__grip" aria-hidden />{bar(open)}<button type="button" className="vz-panel__x" aria-label="Cerrar" onClick={shut}>×</button></header>
          {saved(open)}{result(open)}
        </div> : null}
      </dialog>
    </main>
  </Chrome>;
}
