"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, JSX, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Link from "next/link";
import { MotionConfig, motion, type PanInfo } from "framer-motion";
import { POLISH_COLUMNS, isPolishStatus, type PolishStatus, type PolishTicket } from "@/app/polish/polishData";
import Ficha, { YoDialog } from "./Ficha";
import { ESTILOS } from "./tableroEstilos";
import {
  PESOS,
  TABLERO_VACIO,
  aplicar,
  diasHasta,
  fechaCorta,
  hoyIso,
  iniciales,
  leerYo,
  limpiarDatos,
  nuevoId,
  pesoDe,
  type Op,
  type Pase,
  type Peso,
  type TableroDatos,
  type Tarjeta,
  type Yo,
} from "./tableroData";

/**
 * Tablero — dos partes, una debajo de la otra:
 *
 *  1. Pedidos: lo que Growth le pide a dev y todavía no tiene pase, en tres columnas
 *     por TIPO (no por estado): Polish, Quick wins y Forward. Cada columna dice qué es
 *     y cómo se agrega una tarjeta ahí.
 *  2. Pases: lo que sale junto a producción, con fecha y una barra de avance.
 *
 * El estado (por hacer, en progreso…) es el color de la tarjeta, y la barra de cada
 * pase reparte su peso por estado.
 *
 * El orden dentro de una lista lo pone la gente: arrastrar una tarjeta la cambia de
 * sitio, y soltarla en otro pase o columna la mueve allí. Sin mouse, se abre la tarjeta
 * y se elige "Dónde va" (teclado y pantallas táctiles).
 *
 * Los datos llegan de /api/tablero (pases, pesos, tarjetas propias) y /api/polish
 * (estado de los tickets de polish): en local se guardan en `.datos-locales/` y en
 * Vercel en Blob (app/api/almacen.ts). Solo si en Vercel falta el Blob, se guarda en
 * el navegador, igual que en /polish.
 */

type Estados = Record<string, PolishStatus>;
type Modo = "cargando" | "compartido" | "local";
type Cambios = Extract<Op, { op: "ajustar" }>["cambios"];

const CLAVE_DATOS = "concorde-tablero-datos";
/** La misma clave que usa /polish en modo local: los dos tableros ven el mismo estado. */
const CLAVE_ESTADOS = "concorde-polish-estados";
const CLAVE_YO = "concorde-tablero-yo";
const CLAVE_AYUDA = "concorde-tablero-ayuda";
const EVENTO_LOCAL = "tablero:local";

const COLUMNA = new Map(POLISH_COLUMNS.map((c) => [c.status, c]));
/** En la barra, lo hecho a la izquierda: se lee como una barra que se va llenando. */
const ORDEN_BARRA: PolishStatus[] = ["corregido", "en-revision", "en-progreso", "pendiente"];
/** Tarjetas a la vista por columna antes de "Ver más": los pases quedan cerca. */
const A_LA_VISTA = 4;

function leerLocal(clave: string): unknown {
  try {
    return JSON.parse(window.localStorage.getItem(clave) ?? "null");
  } catch {
    return null;
  }
}

function guardarLocal(clave: string, valor: unknown): void {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Almacenamiento bloqueado: el cambio dura hasta recargar.
  }
  window.dispatchEvent(new Event(EVENTO_LOCAL));
}

function limpiarEstados(crudo: unknown): Estados {
  const estados: Estados = {};
  if (typeof crudo !== "object" || crudo === null) return estados;
  for (const [slug, status] of Object.entries(crudo)) {
    if (isPolishStatus(status)) estados[slug] = status;
  }
  return estados;
}

// ── Lo que es de cada persona (su nombre, si ya leyó la ayuda) vive en su navegador ──
function suscribirLocal(avisar: () => void): () => void {
  window.addEventListener("storage", avisar);
  window.addEventListener(EVENTO_LOCAL, avisar);
  return () => {
    window.removeEventListener("storage", avisar);
    window.removeEventListener(EVENTO_LOCAL, avisar);
  };
}

function crudoDe(clave: string): () => string {
  return function leer() {
    try {
      return window.localStorage.getItem(clave) ?? "";
    } catch {
      return "";
    }
  };
}

const leerYoCrudo = crudoDe(CLAVE_YO);
const leerAyudaCruda = crudoDe(CLAVE_AYUDA);

function vacio(): string {
  return "";
}

// ── Arrastrar solo con mouse o trackpad: en táctil el gesto es desplazar la página ──
const PUNTERO_FINO = "(pointer: fine)";

function suscribirPuntero(avisar: () => void): () => void {
  const consulta = window.matchMedia(PUNTERO_FINO);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

function hayPunteroFino(): boolean {
  return window.matchMedia(PUNTERO_FINO).matches;
}

function sinPunteroFino(): boolean {
  return false;
}

const AL_ARRASTRAR = { scale: 1.03, rotate: 2, boxShadow: "0 16px 32px rgba(15,23,42,0.2)" };
const VIAJE = { type: "spring", stiffness: 420, damping: 36 } as const;
const REGRESO = { bounceStiffness: 520, bounceDamping: 40 };

function zonaDe(t: Tarjeta): string {
  if (t.pase) return `pase:${t.pase}`;
  return t.forward ? "forward" : "pedidos";
}

/** La lista en la que se pinta una tarjeta que está en `zona`. Polish y Quick wins
 *  comparten la zona "pedidos" pero cada uno tiene su columna. */
function listaEn(t: Tarjeta, zona: string): string {
  if (zona !== "pedidos") return zona;
  return t.esPolish ? "polish" : "quick";
}

/** Dónde caería la tarjeta arrastrada dentro de una lista. */
interface Hueco {
  lista: string;
  /** La tarjeta que quedaría justo después; sin ella, va al final de las que se ven. */
  antes?: string;
  /** La última tarjeta a la vista, cuando va al final. */
  ultima?: string;
}

function mismoHueco(a: Hueco | null, b: Hueco | null): boolean {
  return a?.lista === b?.lista && a?.antes === b?.antes && a?.ultima === b?.ultima;
}

function cuando(dias: number): string {
  if (dias === 0) return "hoy";
  if (dias === 1) return "mañana";
  if (dias > 1) return `en ${dias} días`;
  if (dias === -1) return "ayer";
  return `hace ${-dias} días`;
}

function plural(n: number, uno: string, varios: string): string {
  return `${n} ${n === 1 ? uno : varios}`;
}

/** Qué es la tarjeta, en una etiqueta: el área si es de polish, o su tipo. */
function tipoDe(t: Tarjeta): { label: string; tipo: "polish" | "quick" | "forward" } {
  if (t.forward) return { label: "Forward", tipo: "forward" };
  if (t.esPolish) return { label: t.area ?? "Polish", tipo: "polish" };
  return { label: "Quick win", tipo: "quick" };
}

function PesoBars({ peso }: { peso?: Peso }): JSX.Element {
  return (
    <span className="tb-bars" aria-hidden="true">
      {PESOS.map(function renderBar(p) {
        return <i key={p} data-on={peso !== undefined && p <= peso} />;
      })}
    </span>
  );
}

interface CardProps {
  t: Tarjeta;
  bloqueado: boolean;
  puedeArrastrar: boolean;
  arrastrando: boolean;
  /** Mientras se arrastra otra: si caería justo antes o justo después de esta. */
  hueco?: "antes" | "despues";
  onAbrir: () => void;
  onTomar: () => void;
  onPeso: (peso: Peso | null) => void;
  onDragStart: () => void;
  onDrag: (evento: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd: (evento: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

function TarjetaCard(props: CardProps): JSX.Element {
  const { t, bloqueado, puedeArrastrar, arrastrando } = props;
  const [pesando, setPesando] = useState(false);
  /** El clic que sigue a un arrastre no debe abrir la tarjeta. */
  const huboArrastre = useRef(false);
  const columna = COLUMNA.get(t.status);
  const tipo = tipoDe(t);

  function alHacerClic(e: ReactMouseEvent<HTMLElement>): void {
    if (huboArrastre.current) return;
    // Los controles de la tarjeta (peso, tomar) no la abren.
    if (e.target instanceof Element && e.target.closest("[data-act]")) return;
    props.onAbrir();
  }

  return (
    <motion.article
      layout
      layoutId={t.id}
      transition={VIAJE}
      className="tb-card"
      style={{ ["--tb-tone" as string]: columna?.tone }}
      data-card={t.id}
      data-hueco={props.hueco}
      data-status={t.status}
      data-draggable={puedeArrastrar}
      data-dragging={arrastrando}
      drag={puedeArrastrar}
      dragSnapToOrigin
      dragMomentum={false}
      dragTransition={REGRESO}
      whileDrag={AL_ARRASTRAR}
      onPointerDown={() => {
        huboArrastre.current = false;
      }}
      onDragStart={() => {
        huboArrastre.current = true;
        setPesando(false);
        props.onDragStart();
      }}
      onDrag={props.onDrag}
      onDragEnd={props.onDragEnd}
      onClick={alHacerClic}
      onMouseLeave={() => setPesando(false)}
    >
      <div className="tb-card__top">
        <span className="tb-tipo" data-tipo={tipo.tipo}>
          {tipo.label}
        </span>
        <span className="tb-pesobox" data-act>
          {pesando ? (
            <span
              className="tb-pesar"
              role="group"
              aria-label="Peso"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setPesando(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setPesando(false);
              }}
            >
              {PESOS.map(function renderPeso(p, i) {
                return (
                  <button
                    key={p}
                    type="button"
                    autoFocus={i === 0}
                    aria-pressed={t.peso === p}
                    aria-label={`Peso ${p}`}
                    onClick={() => {
                      // Tocar el peso que ya tiene lo quita.
                      props.onPeso(t.peso === p ? null : p);
                      setPesando(false);
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </span>
          ) : (
            <button
              type="button"
              className="tb-peso"
              data-vacio={t.peso === undefined}
              disabled={bloqueado}
              title="Esfuerzo para dev, del 1 al 3"
              aria-label={t.peso === undefined ? "Sin peso. Poner peso" : `Peso ${t.peso}. Cambiar`}
              onClick={() => setPesando(true)}
            >
              {t.peso === undefined ? (
                "Poner peso"
              ) : (
                <>
                  <PesoBars peso={t.peso} />
                  Peso {t.peso}
                </>
              )}
            </button>
          )}
        </span>
      </div>

      <button type="button" className="tb-card__title" draggable={false}>
        {t.titulo}
      </button>

      <div className="tb-card__foot">
        <span className="tb-estado">
          <i aria-hidden="true" />
          {columna?.label}
          {t.quien && ` · ${t.quien}`}
        </span>
        {t.quien ? (
          <span className="tb-avatar" aria-hidden="true">
            {iniciales(t.quien)}
          </span>
        ) : (
          t.status !== "corregido" && (
            <button type="button" className="tb-tomar" data-act disabled={bloqueado} onClick={props.onTomar}>
              La tomo
            </button>
          )
        )}
      </div>
    </motion.article>
  );
}

/** Una columna de pedidos: qué es, cómo se agrega y sus tarjetas. */
function Columna({
  titulo,
  hint,
  lista,
  hechas,
  zona,
  listaId,
  sobre,
  vacio: textoVacio,
  agregar,
  pie,
  bloqueado,
  renderTarjeta,
  onAbrir,
}: {
  titulo: string;
  hint: string;
  lista: Tarjeta[];
  /** Ya terminadas y sin pase: se muestran plegadas al final. */
  hechas: Tarjeta[];
  zona: string;
  /** Nombre de la lista, para saber dónde cae una tarjeta al soltarla. */
  listaId: string;
  sobre: boolean;
  vacio: string;
  /** Si la columna permite crear tarjetas aquí mismo. */
  agregar?: { boton: string; placeholder: string; onCrear: (titulo: string) => void };
  /** Para las columnas que no crean aquí: cómo se crea. */
  pie?: ReactNode;
  bloqueado: boolean;
  renderTarjeta: (t: Tarjeta) => JSX.Element;
  onAbrir: (id: string) => void;
}): JSX.Element {
  const [agregando, setAgregando] = useState(false);
  const [todas, setTodas] = useState(false);
  const visibles = todas ? lista : lista.slice(0, A_LA_VISTA);
  const ocultas = lista.length - visibles.length;

  function alEnviar(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const campo = e.currentTarget.elements.namedItem("titulo");
    if (!(campo instanceof HTMLInputElement) || !agregar) return;
    const valor = campo.value.replace(/\s+/g, " ").trim();
    if (!valor) return;
    agregar.onCrear(valor);
    // El campo queda abierto y vacío: se pueden agregar varias seguidas.
    campo.value = "";
    campo.focus();
  }

  return (
    <section className="tb-col" data-zona={zona} data-over={sobre} aria-label={titulo}>
      <div className="tb-col__head">
        <h3 className="tb-col__name">{titulo}</h3>
        <span className="tb-col__count">{lista.length}</span>
      </div>
      <p className="tb-col__hint">{hint}</p>

      {agregar &&
        (agregando ? (
          <form className="tb-nueva" onSubmit={alEnviar}>
            <input
              name="titulo"
              className="tb-input"
              placeholder={agregar.placeholder}
              maxLength={120}
              aria-label={agregar.boton}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") setAgregando(false);
              }}
            />
            <div className="tb-nueva__row">
              <button type="button" className="tb-btn" onClick={() => setAgregando(false)}>
                Cerrar
              </button>
              <button type="submit" className="tb-btn tb-btn--primary">
                Agregar
              </button>
            </div>
          </form>
        ) : (
          <button type="button" className="tb-add tb-add--col" disabled={bloqueado} onClick={() => setAgregando(true)}>
            + {agregar.boton}
          </button>
        ))}
      {pie && <p className="tb-col__pie">{pie}</p>}

      <div className="tb-list" data-lista={listaId} data-flow="list">
        {lista.length === 0 && <div className="tb-empty">{sobre ? "Suelta aquí" : textoVacio}</div>}
        {visibles.map(renderTarjeta)}
      </div>
      {(ocultas > 0 || (todas && lista.length > A_LA_VISTA)) && (
        <button type="button" className="tb-more" onClick={() => setTodas(!todas)}>
          {todas ? "Ver menos" : `Ver ${ocultas} más`}
        </button>
      )}

      {hechas.length > 0 && (
        <details className="tb-fold">
          <summary>
            {hechas.length} {hechas.length === 1 ? "ya hecha" : "ya hechas"}
          </summary>
          <div className="tb-rows">
            {hechas.map(function renderHecha(t) {
              return (
                <button key={t.id} type="button" className="tb-row" onClick={() => onAbrir(t.id)}>
                  <span className="tb-row__main">{t.titulo}</span>
                  {t.area && <span className="tb-row__meta">{t.area}</span>}
                </button>
              );
            })}
          </div>
        </details>
      )}
    </section>
  );
}

function FechaPase({ pase, hoy, onChange }: { pase: Pase; hoy: Date; onChange: (fecha: string) => void }): JSX.Element {
  const dias = pase.fecha ? diasHasta(pase.fecha, hoy) : null;
  return (
    <>
      <span className="tb-fecha" data-vacia={!pase.fecha}>
        {pase.fecha ? `Sale ${fechaCorta(pase.fecha)}` : "Poner fecha de salida"}
        <input
          type="date"
          value={pase.fecha}
          aria-label={`Fecha del pase ${pase.nombre}`}
          onChange={(e) => onChange(e.currentTarget.value)}
          onClick={(e) => {
            // En escritorio el clic sobre el texto de un campo de fecha no abre el calendario.
            try {
              e.currentTarget.showPicker();
            } catch {
              // Navegador sin showPicker: queda el campo nativo.
            }
          }}
        />
      </span>
      {dias !== null && (
        <span className="tb-rel" data-tarde={dias < 0}>
          {dias < 0 ? `debió salir ${cuando(dias)}` : cuando(dias)}
        </span>
      )}
    </>
  );
}

export default function Tablero({ tickets }: { tickets: PolishTicket[] }): JSX.Element {
  const [datos, setDatos] = useState<TableroDatos>(TABLERO_VACIO);
  const [estados, setEstados] = useState<Estados>({});
  const [modo, setModo] = useState<Modo>("cargando");
  const [error, setError] = useState<string | null>(null);
  const [arrastrando, setArrastrando] = useState<string | null>(null);
  const [sobre, setSobre] = useState<string | null>(null);
  const [hueco, setHueco] = useState<Hueco | null>(null);
  const [abierta, setAbierta] = useState<string | null>(null);
  /** El diálogo del nombre, y la tarjeta que se quería tomar al abrirlo. */
  const [pidiendoYo, setPidiendoYo] = useState<{ tomar?: string } | null>(null);
  const [recienCreado, setRecienCreado] = useState<string | null>(null);
  const [hoy] = useState(() => new Date());

  const yoCrudo = useSyncExternalStore(suscribirLocal, leerYoCrudo, vacio);
  const yo = useMemo(() => leerYo(yoCrudo), [yoCrudo]);
  const ayudaOculta = useSyncExternalStore(suscribirLocal, leerAyudaCruda, vacio) !== "";
  const punteroFino = useSyncExternalStore(suscribirPuntero, hayPunteroFino, sinPunteroFino);

  const recargar = useRef<() => void>(() => {});

  const slugs = useMemo(() => tickets.map((t) => t.slug), [tickets]);

  // Al abrir y cada vez que se vuelve a la pestaña, para ver lo que movieron los demás.
  useEffect(() => {
    let vivo = true;

    function usarLocal(): void {
      if (!vivo) return;
      setDatos(limpiarDatos(leerLocal(CLAVE_DATOS)));
      setEstados(limpiarEstados(leerLocal(CLAVE_ESTADOS)));
      setModo("local");
    }

    function cargar(): void {
      const opciones = { cache: "no-store" } as const;
      Promise.all([
        fetch("/api/tablero", opciones).then((r) => r.json() as Promise<{ compartido?: boolean; datos?: unknown; error?: string }>),
        fetch("/api/polish", opciones).then((r) => r.json() as Promise<{ compartido?: boolean; estados?: unknown }>),
      ])
        .then(function usar([tablero, polish]) {
          if (!vivo) return;
          if (tablero.compartido) {
            setDatos(limpiarDatos(tablero.datos));
            setEstados(limpiarEstados(polish.estados));
            setModo("compartido");
            return;
          }
          if (tablero.error) setError(`No se pudo leer el tablero compartido (${tablero.error}).`);
          usarLocal();
        })
        // Sin red o sin ruta: se sigue con lo guardado en el navegador.
        .catch(usarLocal);
    }

    recargar.current = cargar;
    cargar();
    window.addEventListener("focus", cargar);
    return () => {
      vivo = false;
      window.removeEventListener("focus", cargar);
    };
  }, []);

  // Solo si no hay almacén: cada cambio queda en el navegador.
  useEffect(() => {
    if (modo !== "local") return;
    guardarLocal(CLAVE_DATOS, datos);
    guardarLocal(CLAVE_ESTADOS, estados);
  }, [modo, datos, estados]);

  const bloqueado = modo === "cargando";

  function despachar(op: Op): void {
    if (bloqueado) return;
    setError(null);
    setDatos((actual) => aplicar(actual, op, slugs));
    if (modo !== "compartido") return;
    fetch("/api/tablero", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(op) })
      .then(async function revisar(res) {
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) throw new Error(data.error ?? `error ${res.status}`);
      })
      .catch(function deshacer(e: unknown) {
        // No se guardó: se vuelve a lo que dice el servidor.
        setError(`No se guardó el último cambio (${e instanceof Error ? e.message : String(e)}).`);
        recargar.current();
      });
  }

  function ajustar(id: string, cambios: Cambios): void {
    despachar({ op: "ajustar", id, cambios });
  }

  function cambiarEstado(t: Tarjeta, destino: PolishStatus): void {
    if (bloqueado || t.status === destino) return;
    if (!t.esPolish) {
      ajustar(t.id, { status: destino });
      return;
    }
    // El estado de un ticket de polish vive en /api/polish, el mismo que usa /polish.
    const origen = t.status;
    setError(null);
    setEstados((actual) => ({ ...actual, [t.id]: destino }));
    if (modo !== "compartido") return;
    fetch("/api/polish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: t.id, status: destino }) })
      .then(async function revisar(res) {
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) throw new Error(data.error ?? `error ${res.status}`);
      })
      .catch(function deshacer(e: unknown) {
        setEstados((actual) => ({ ...actual, [t.id]: origen }));
        setError(`No se guardó el estado de "${t.titulo}" (${e instanceof Error ? e.message : String(e)}).`);
      });
  }

  function tomar(t: Tarjeta, quien: Yo | null): void {
    if (!quien) {
      setPidiendoYo({ tomar: t.id });
      return;
    }
    // Tomar algo "por hacer" lo pasa a "en progreso". En una tarjeta propia las dos cosas
    // viajan en un solo cambio; en un ticket de polish el estado va por /api/polish.
    const empieza = t.status === "pendiente";
    ajustar(t.id, { quien: quien.nombre, ...(empieza && !t.esPolish ? { status: "en-progreso" as const } : {}) });
    if (empieza && t.esPolish) cambiarEstado(t, "en-progreso");
  }

  function guardarYo(nuevo: Yo): void {
    guardarLocal(CLAVE_YO, nuevo);
    const pendiente = pidiendoYo?.tomar;
    setPidiendoYo(null);
    const t = pendiente ? tarjetas.find((x) => x.id === pendiente) : undefined;
    if (t) tomar(t, nuevo);
  }

  // ── Tarjetas resueltas: tickets de polish + propias, con su ajuste encima ──
  const tarjetas: Tarjeta[] = (function resolver() {
    const pasesVivos = new Set(datos.pases.map((p) => p.id));
    function armar(id: string, base: Pick<Tarjeta, "titulo" | "area" | "esPolish" | "preview">, status: PolishStatus): Tarjeta {
      const a = datos.ajustes[id] ?? {};
      return {
        id,
        ...base,
        status,
        peso: a.peso,
        pase: a.pase && pasesVivos.has(a.pase) ? a.pase : undefined,
        forward: a.forward === true,
        quien: a.quien,
      };
    }
    const propias = datos.propias.map((p) =>
      armar(p.id, { titulo: p.titulo, esPolish: false }, datos.ajustes[p.id]?.status ?? "pendiente"),
    );
    const dePolish = tickets.map((t) =>
      armar(t.slug, { titulo: t.resumen, area: t.area, esPolish: true, preview: t.preview }, estados[t.slug] ?? t.base),
    );
    return [...propias, ...dePolish];
  })();

  // Cada tarjeta sin pase cae en la columna de su tipo; las ya hechas, aparte.
  const grupos = (function agrupar() {
    const porPase = new Map<string, Tarjeta[]>();
    const polish: Tarjeta[] = [];
    const quick: Tarjeta[] = [];
    const forward: Tarjeta[] = [];
    const hechas = { polish: [] as Tarjeta[], quick: [] as Tarjeta[], forward: [] as Tarjeta[] };
    for (const t of tarjetas) {
      if (t.pase) {
        porPase.set(t.pase, [...(porPase.get(t.pase) ?? []), t]);
        continue;
      }
      const tipo = tipoDe(t).tipo;
      const hecha = t.status === "corregido";
      if (tipo === "forward") (hecha ? hechas.forward : forward).push(t);
      else if (tipo === "polish") (hecha ? hechas.polish : polish).push(t);
      else (hecha ? hechas.quick : quick).push(t);
    }
    // Manda el orden que dejó la gente; lo que nadie movió queda al final, como llegó.
    const sitio = new Map(datos.orden.map((id, i) => [id, i]));
    const SIN_SITIO = 1e9;
    for (const lista of [...porPase.values(), polish, quick, forward]) {
      lista.sort((a, b) => (sitio.get(a.id) ?? SIN_SITIO) - (sitio.get(b.id) ?? SIN_SITIO));
    }
    return { porPase, polish, quick, forward, hechas };
  })();

  // Con fecha primero, del más próximo al más lejano; sin fecha al final.
  const pasesActivos = datos.pases
    .filter((p) => !p.salio)
    .sort((a, b) => (a.fecha || "9999").localeCompare(b.fecha || "9999"));
  const pasesSalidos = datos.pases.filter((p) => p.salio);

  const personas = (function nombres() {
    const vistos = new Set<string>();
    if (yo) vistos.add(yo.nombre);
    for (const t of tarjetas) if (t.quien) vistos.add(t.quien);
    return [...vistos].sort((a, b) => a.localeCompare(b));
  })();

  /** La zona (un pase, pedidos o forward) que está bajo el cursor. */
  function zonaBajo(evento: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): string | null {
    const x = "clientX" in evento ? evento.clientX : info.point.x - window.scrollX;
    const y = "clientY" in evento ? evento.clientY : info.point.y - window.scrollY;
    // Las zonas se marcan con data-zona; se buscan al momento, no se guardan.
    for (const el of document.querySelectorAll<HTMLElement>("[data-zona]")) {
      const caja = el.getBoundingClientRect();
      if (x >= caja.left && x <= caja.right && y >= caja.top && y <= caja.bottom) return el.dataset.zona ?? null;
    }
    return null;
  }

  /** Las tarjetas de una lista, ya en su orden. */
  function tarjetasDe(lista: string): Tarjeta[] {
    if (lista === "polish") return grupos.polish;
    if (lista === "quick") return grupos.quick;
    if (lista === "forward") return grupos.forward;
    return grupos.porPase.get(lista.slice("pase:".length)) ?? [];
  }

  /** Dónde caería `t` si se suelta ahora: en qué lista y junto a qué tarjeta. */
  function huecoBajo(t: Tarjeta, zona: string | null, evento: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): Hueco | null {
    if (!zona) return null;
    const lista = listaEn(t, zona);
    const caja = document.querySelector<HTMLElement>(`[data-lista="${lista}"]`);
    if (!caja) return { lista };
    const x = "clientX" in evento ? evento.clientX : info.point.x - window.scrollX;
    const y = "clientY" in evento ? evento.clientY : info.point.y - window.scrollY;
    const enFilas = caja.dataset.flow === "grid";
    let ultima: string | undefined;
    for (const el of caja.querySelectorAll<HTMLElement>("[data-card]")) {
      const id = el.dataset.card;
      if (!id || id === t.id) continue;
      const r = el.getBoundingClientRect();
      // En filas se lee como un texto: antes si está más arriba, o en la misma fila y a la izquierda.
      const antes = enFilas ? y < r.top || (y <= r.bottom && x < r.left + r.width / 2) : y < r.top + r.height / 2;
      if (antes) return { lista, antes: id };
      ultima = id;
    }
    return { lista, ultima };
  }

  function soltar(t: Tarjeta, zona: string | null, destino: Hueco | null): void {
    if (!zona || !destino) return;
    const cambiaDeZona = zona !== zonaDe(t);
    const resto = tarjetasDe(destino.lista)
      .map((x) => x.id)
      .filter((id) => id !== t.id);
    // Sin tarjeta "antes" va tras la última a la vista (puede haber más plegadas detrás).
    let indice = resto.length;
    if (destino.antes) indice = Math.max(0, resto.indexOf(destino.antes));
    else if (destino.ultima) indice = resto.indexOf(destino.ultima) + 1;
    const ids = [...resto.slice(0, indice), t.id, ...resto.slice(indice)];
    const mismoOrden =
      !cambiaDeZona &&
      tarjetasDe(destino.lista)
        .map((x) => x.id)
        .join() === ids.join();
    if (mismoOrden) return;

    if (cambiaDeZona) {
      if (zona === "pedidos") ajustar(t.id, { pase: null, forward: false });
      else if (zona === "forward") ajustar(t.id, { forward: true });
      else ajustar(t.id, { pase: zona.slice("pase:".length) });
    }
    despachar({ op: "ordenar", ids });
  }

  function crearPase(): void {
    const pase: Pase = { id: nuevoId("pase"), nombre: "Pase nuevo", fecha: "", salio: false };
    despachar({ op: "crear-pase", pase });
    setRecienCreado(pase.id);
  }

  function marcarSalido(p: Pase, faltan: number): void {
    if (faltan > 0 && !window.confirm(`A "${p.nombre}" le ${faltan === 1 ? "queda 1 tarjeta" : `quedan ${faltan} tarjetas`} sin terminar. ¿Marcarlo como salido igual?`)) return;
    despachar({ op: "editar-pase", id: p.id, cambios: { salio: true, ...(p.fecha ? {} : { fecha: hoyIso(hoy) }) } });
  }

  function borrarPase(p: Pase, cuantas: number): void {
    const aviso = cuantas > 0 ? ` Sus ${cuantas === 1 ? "tarjeta vuelve" : `${cuantas} tarjetas vuelven`} a Pedidos.` : "";
    if (!window.confirm(`¿Borrar el pase "${p.nombre}"?${aviso}`)) return;
    despachar({ op: "borrar-pase", id: p.id });
  }

  function crearTarjeta(titulo: string, forward: boolean): void {
    despachar({
      op: "crear-tarjeta",
      tarjeta: { id: nuevoId("t"), titulo, creada: hoyIso(hoy) },
      ajuste: forward ? { forward: true } : {},
    });
  }

  const puedeArrastrar = punteroFino && !bloqueado;
  const tarjetaAbierta = tarjetas.find((t) => t.id === abierta);

  function renderTarjeta(t: Tarjeta): JSX.Element {
    return (
      <TarjetaCard
        key={t.id}
        t={t}
        bloqueado={bloqueado}
        puedeArrastrar={puedeArrastrar}
        arrastrando={arrastrando === t.id}
        hueco={arrastrando && arrastrando !== t.id ? (hueco?.antes === t.id ? "antes" : hueco?.ultima === t.id ? "despues" : undefined) : undefined}
        onAbrir={() => setAbierta(t.id)}
        onTomar={() => tomar(t, yo)}
        onPeso={(peso) => ajustar(t.id, { peso })}
        onDragStart={() => setArrastrando(t.id)}
        onDrag={(evento, info) => {
          const zona = zonaBajo(evento, info);
          // La zona se resalta solo si la tarjeta cambiaría de sitio; el hueco, siempre.
          setSobre(zona === zonaDe(t) ? null : zona);
          const siguiente = huecoBajo(t, zona, evento, info);
          setHueco((actual) => (mismoHueco(actual, siguiente) ? actual : siguiente));
        }}
        onDragEnd={(evento, info) => {
          const zona = zonaBajo(evento, info);
          const destino = huecoBajo(t, zona, evento, info);
          setArrastrando(null);
          setSobre(null);
          setHueco(null);
          soltar(t, zona, destino);
        }}
      />
    );
  }

  function renderPase(p: Pase): JSX.Element {
    const lista = grupos.porPase.get(p.id) ?? [];
    const total = lista.reduce((suma, t) => suma + pesoDe(t), 0);
    const listo = lista.filter((t) => t.status === "corregido").reduce((suma, t) => suma + pesoDe(t), 0);
    const faltan = lista.filter((t) => t.status !== "corregido").length;
    const sinPeso = lista.filter((t) => t.peso === undefined).length;
    const todoListo = lista.length > 0 && faltan === 0;
    // Cuánto peso hay en cada estado: eso es cada tramo de la barra.
    const tramos = ORDEN_BARRA.map((status) => ({
      status,
      peso: lista.filter((t) => t.status === status).reduce((suma, t) => suma + pesoDe(t), 0),
    }));
    const clave = `pase:${p.id}`;

    return (
      <section key={p.id} data-zona={clave} className="tb-pase" aria-label={`Pase ${p.nombre}`} data-over={sobre === clave}>
        <div className="tb-pase__head">
          <div className="tb-pase__id">
            <input
              key={p.nombre}
              className="tb-pase__name"
              defaultValue={p.nombre}
              maxLength={60}
              aria-label="Nombre del pase"
              autoFocus={recienCreado === p.id}
              onFocus={(e) => {
                if (recienCreado === p.id) e.currentTarget.select();
              }}
              onBlur={(e) => {
                const nombre = e.currentTarget.value.replace(/\s+/g, " ").trim();
                if (recienCreado === p.id) setRecienCreado(null);
                if (nombre && nombre !== p.nombre) despachar({ op: "editar-pase", id: p.id, cambios: { nombre } });
                else e.currentTarget.value = p.nombre;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            <div className="tb-pase__meta">
              <FechaPase pase={p} hoy={hoy} onChange={(fecha) => despachar({ op: "editar-pase", id: p.id, cambios: { fecha } })} />
              {todoListo && <span className="tb-chip-listo">Todo listo</span>}
            </div>
          </div>
          <div className="tb-pase__side">
            {lista.length > 0 && (
              <button type="button" className={todoListo ? "tb-btn tb-btn--primary" : "tb-btn"} onClick={() => marcarSalido(p, faltan)}>
                Marcar como salido
              </button>
            )}
            <button type="button" className="tb-icon" aria-label={`Borrar el pase ${p.nombre}`} title="Borrar el pase" onClick={() => borrarPase(p, lista.length)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {lista.length > 0 && (
          <>
            <div className="tb-bar" role="img" aria-label={`Peso listo: ${listo} de ${total}`}>
              {tramos.map(function renderTramo(tramo) {
                if (tramo.peso === 0) return null;
                return <i key={tramo.status} style={{ flexGrow: tramo.peso, flexBasis: 0, ["--tb-tone" as string]: COLUMNA.get(tramo.status)?.tone }} />;
              })}
            </div>
            <ul className="tb-reparto">
              <li>
                <strong>Peso {total}</strong>
              </li>
              {tramos.map(function renderReparto(tramo) {
                return (
                  <li key={tramo.status} data-cero={tramo.peso === 0} style={{ ["--tb-tone" as string]: COLUMNA.get(tramo.status)?.tone }}>
                    <i aria-hidden="true" />
                    {COLUMNA.get(tramo.status)?.label} {tramo.peso}
                  </li>
                );
              })}
              {sinPeso > 0 && <li>{sinPeso === 1 ? "1 sin peso, cuenta 1" : `${sinPeso} sin peso, cuentan 1`}</li>}
            </ul>
          </>
        )}

        <div className="tb-tray" data-lista={clave} data-flow="grid" style={lista.length === 0 ? { marginTop: 16 } : undefined}>
          {lista.length === 0 && (
            <div className="tb-empty">
              {sobre === clave ? "Suelta aquí" : "Vacío. Arrastra tarjetas aquí."}
            </div>
          )}
          {lista.map(renderTarjeta)}
        </div>
      </section>
    );
  }

  return (
    <main style={{ flex: 1, width: "100%", maxWidth: 1240, margin: "0 auto", padding: "40px 24px 96px" }}>
      <style>{ESTILOS}</style>

      <div className="tb-top">
        <div>
          <h1 className="tb-h1">Tablero</h1>
          <p className="tb-sub">Lo que Growth le pide a dev y cuándo sale.</p>
        </div>
        <div className="tb-tools">
          {ayudaOculta && (
            <button type="button" className="tb-btn" onClick={() => guardarLocal(CLAVE_AYUDA, "")}>
              ¿Cómo funciona?
            </button>
          )}
          {yo && (
            <button type="button" className="tb-btn tb-yo" onClick={() => setPidiendoYo({})}>
              <span className="tb-avatar" aria-hidden="true">
                {iniciales(yo.nombre)}
              </span>
              Eres {yo.nombre}
            </button>
          )}
        </div>
      </div>

      {!ayudaOculta && (
        <section className="tb-ayuda" aria-label="Cómo funciona">
          <ol className="tb-pasos">
            <li>
              <strong>Growth pide</strong>
              Un polish, un quick win o una idea.
            </li>
            <li>
              <strong>Dev pesa y toma</strong>
              Peso del 1 al 3. El que la hace pulsa La tomo.
            </li>
            <li>
              <strong>Sale en un pase</strong>
              Dev arma el pase, le pone fecha y lo marca cuando sale.
            </li>
          </ol>
          <button type="button" className="tb-btn" onClick={() => guardarLocal(CLAVE_AYUDA, "oculta")}>
            Entendido
          </button>
        </section>
      )}

      {modo === "local" && (
        <p className="tb-note tb-note--info">
          No se pudo conectar con el almacén de Vercel: por ahora los cambios quedan solo en este navegador.
        </p>
      )}
      {error && (
        <p className="tb-note tb-note--error" role="alert">
          {error}
        </p>
      )}

      <MotionConfig reducedMotion="user">
        <section className="tb-parte" aria-labelledby="tb-h-pedidos">
          <div className="tb-sec">
            <div>
              <h2 id="tb-h-pedidos" className="tb-h2">
                Pedidos
              </h2>
              <p className="tb-sec__sub">Todavía sin pase. Arrastra para ordenar.</p>
            </div>
          </div>

          {bloqueado ? (
            <div className="tb-skel" />
          ) : (
            <div className="tb-cols">
              <Columna
                titulo="Polish"
                hint="Correcciones de front."
                lista={grupos.polish}
                hechas={grupos.hechas.polish}
                zona="pedidos"
                listaId="polish"
                sobre={sobre === "pedidos"}
                vacio="Nada pendiente."
                pie={
                  <>
                    Se crean con <code>/polish</code>. El detalle está en <Link href="/polish">Polish</Link>.
                  </>
                }
                bloqueado={bloqueado}
                renderTarjeta={renderTarjeta}
                onAbrir={setAbierta}
              />
              <Columna
                titulo="Quick wins"
                hint="Pedidos chicos."
                lista={grupos.quick}
                hechas={grupos.hechas.quick}
                zona="pedidos"
                listaId="quick"
                sobre={sobre === "pedidos"}
                vacio="Nada pendiente."
                agregar={{
                  boton: "Agregar quick win",
                  placeholder: "Cambiar el texto del banner",
                  onCrear: (titulo) => crearTarjeta(titulo, false),
                }}
                bloqueado={bloqueado}
                renderTarjeta={renderTarjeta}
                onAbrir={setAbierta}
              />
              <Columna
                titulo="Forward"
                hint="Ideas para más adelante, sin fecha."
                lista={grupos.forward}
                hechas={grupos.hechas.forward}
                zona="forward"
                listaId="forward"
                sobre={sobre === "forward"}
                vacio="Nada todavía."
                agregar={{
                  boton: "Agregar idea",
                  placeholder: "Automatizar el flujo de Prisma",
                  onCrear: (titulo) => crearTarjeta(titulo, true),
                }}
                bloqueado={bloqueado}
                renderTarjeta={renderTarjeta}
                onAbrir={setAbierta}
              />
            </div>
          )}
        </section>

        <section className="tb-parte" aria-labelledby="tb-h-pases">
          <div className="tb-sec">
            <div>
              <h2 id="tb-h-pases" className="tb-h2">
                Pases
              </h2>
              <p className="tb-sec__sub">Lo que sale junto a producción. Arrastra una tarjeta para ordenarla o pasarla a otro pase.</p>
            </div>
          </div>

          {bloqueado ? (
            <div className="tb-skel" />
          ) : (
            <>
              {pasesActivos.map(renderPase)}
              <button type="button" className="tb-add" onClick={crearPase}>
                + Nuevo pase
              </button>
            </>
          )}

          {pasesSalidos.length > 0 && (
            <details className="tb-fold">
              <summary>
                {pasesSalidos.length} {pasesSalidos.length === 1 ? "pase ya salió" : "pases ya salieron"}
              </summary>
              <div className="tb-rows">
                {pasesSalidos.map(function renderSalido(p) {
                  const lista = grupos.porPase.get(p.id) ?? [];
                  const total = lista.reduce((suma, t) => suma + pesoDe(t), 0);
                  return (
                    <div key={p.id} className="tb-row">
                      <span className="tb-row__main">{p.nombre}</span>
                      <span className="tb-row__meta">
                        {p.fecha ? `Salió ${fechaCorta(p.fecha)} · ` : ""}
                        {plural(lista.length, "tarjeta", "tarjetas")} · peso {total}
                      </span>
                      <button type="button" className="tb-btn" onClick={() => despachar({ op: "editar-pase", id: p.id, cambios: { salio: false } })}>
                        Reabrir
                      </button>
                    </div>
                  );
                })}
              </div>
            </details>
          )}
        </section>
      </MotionConfig>

      {tarjetaAbierta && (
        <Ficha
          key={tarjetaAbierta.id}
          tarjeta={tarjetaAbierta}
          tipo={tipoDe(tarjetaAbierta).label}
          pases={pasesActivos}
          personas={personas}
          yo={yo}
          bloqueado={bloqueado}
          onAjustar={(cambios) => ajustar(tarjetaAbierta.id, cambios)}
          onEstado={(status) => cambiarEstado(tarjetaAbierta, status)}
          onTitulo={(titulo) => despachar({ op: "editar-tarjeta", id: tarjetaAbierta.id, titulo })}
          onBorrar={() => {
            despachar({ op: "borrar-tarjeta", id: tarjetaAbierta.id });
            setAbierta(null);
          }}
          onClose={() => setAbierta(null)}
        />
      )}
      {pidiendoYo && <YoDialog yo={yo} onSave={guardarYo} onClose={() => setPidiendoYo(null)} />}
    </main>
  );
}
