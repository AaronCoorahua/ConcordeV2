"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { JSX, MouseEvent as ReactMouseEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MotionConfig, motion, type PanInfo } from "framer-motion";
import { POLISH_COLUMNS, isPolishStatus, type PolishStatus, type PolishTicket } from "./polishData";

/**
 * PolishBoard — el tablero: una columna por estado.
 *
 * Mover un ticket: arrastrándolo (con mouse) o abriéndolo y eligiendo el estado en
 * el pop-up (teclado y pantallas táctiles). Las tarjetas no llevan control propio.
 *
 * Abrir un ticket no cambia de página: se abre TicketModal encima del tablero y la
 * dirección pasa a /polish?ticket={slug}, así «atrás» lo cierra y el enlace se puede
 * compartir.
 *
 * La columna de cada ticket sale de `ticket.base` (el archivo de datos) salvo que
 * alguien lo haya movido; esos movimientos llegan de /api/polish (compartidos entre
 * todos) o, si no hay almacén conectado, del navegador (solo los ve quien los hizo).
 */

const TicketModal = dynamic(() => import("./TicketModal"), { ssr: false });

type Estados = Record<string, PolishStatus>;
type Modo = "cargando" | "compartido" | "local";

const CLAVE_LOCAL = "concorde-polish-estados";

function leerLocal(): Estados {
  const estados: Estados = {};
  try {
    const crudo: unknown = JSON.parse(window.localStorage.getItem(CLAVE_LOCAL) ?? "{}");
    if (typeof crudo !== "object" || crudo === null) return estados;
    for (const [slug, status] of Object.entries(crudo)) {
      if (isPolishStatus(status)) estados[slug] = status;
    }
  } catch {
    // JSON roto o almacenamiento bloqueado: se parte de cero.
  }
  return estados;
}

// ── Ticket abierto: vive en la dirección (?ticket=slug), no en un estado aparte ──
const EVENTO_URL = "polish:url";

function suscribirUrl(avisar: () => void): () => void {
  window.addEventListener("popstate", avisar);
  window.addEventListener(EVENTO_URL, avisar);
  return () => {
    window.removeEventListener("popstate", avisar);
    window.removeEventListener(EVENTO_URL, avisar);
  };
}

function leerTicketAbierto(): string {
  return new URLSearchParams(window.location.search).get("ticket") ?? "";
}

function ningunTicket(): string {
  return "";
}

// ── Arrastrar solo con mouse o trackpad: en táctil el gesto es desplazar el tablero ──
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

const STYLES = `
  .pk-board { display: grid; grid-template-columns: repeat(4, minmax(248px, 1fr)); gap: 16px; align-items: start; }
  @media (max-width: 1120px) { .pk-board { overflow-x: auto; padding-bottom: 8px; } }
  .pk-col { background: var(--ui-border-soft); border-radius: 14px; border-top: 3px solid var(--pk-tone); padding: 12px; transition: background 0.15s, box-shadow 0.15s; }
  .pk-col[data-over="true"] { background: var(--ui-accent-soft); box-shadow: inset 0 0 0 2px var(--ui-accent); }
  .pk-col__head { display: flex; align-items: baseline; gap: 8px; padding: 4px 4px 0; }
  .pk-col__name { font-size: 14px; font-weight: 700; color: var(--ui-ink); margin: 0; }
  .pk-col__count { font-size: 12px; font-weight: 700; color: var(--ui-body); }
  .pk-col__hint { font-size: 12px; color: var(--ui-body); margin: 2px 4px 12px; line-height: 1.4; }
  .pk-col__list { display: flex; flex-direction: column; gap: 8px; min-height: 72px; }
  .pk-empty { border: 1.5px dashed var(--ui-border-hover); border-radius: 10px; padding: 20px 12px; text-align: center; font-size: 12.5px; color: var(--ui-muted); }
  .pk-col[data-over="true"] .pk-empty { border-color: var(--ui-accent); color: var(--ui-accent); }
  .pk-card { position: relative; background: #fff; border: 1px solid var(--ui-border); border-radius: 10px; padding: 12px; box-shadow: 0 1px 2px rgba(15,23,42,0.04); cursor: pointer; user-select: none; transition: border-color 0.12s; }
  .pk-card[data-draggable="true"] { cursor: grab; }
  .pk-card:hover { border-color: var(--ui-border-hover); }
  .pk-card[data-dragging="true"] { z-index: 20; cursor: grabbing; border-color: var(--ui-accent); }
  /* Miniatura al estilo de /banners: de borde a borde, fondo suave y la captura entera
     (sin recortar) centrada, con sombra. */
  .pk-prev { display: flex; align-items: center; justify-content: center; height: 136px; padding: 14px 16px; margin: -12px -12px 12px; border-radius: 9px 9px 0 0; background: var(--ui-subtle); border-bottom: 1px solid var(--ui-border-soft); pointer-events: none; }
  .pk-prev__img { display: block; width: auto; height: auto; max-width: 100%; max-height: 100%; border-radius: 4px; background: #fff; box-shadow: 0 6px 18px rgba(15,23,42,0.12); outline: 1px solid var(--ui-border); }
  .pk-area { display: inline-block; font-size: 11px; font-weight: 700; color: var(--ui-accent); background: var(--ui-accent-soft); padding: 2px 8px; border-radius: 20px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pk-title { display: block; margin-top: 8px; font-size: 14px; font-weight: 600; line-height: 1.4; color: var(--ui-ink); text-decoration: none; cursor: inherit; }
  .pk-card:hover .pk-title { color: var(--ui-accent); }
  .pk-title:focus-visible, .pk-link:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: 2px; border-radius: 4px; }
  .pk-links { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; margin-top: 8px; font-size: 12px; color: var(--ui-muted); }
  .pk-link { color: var(--ui-body); font-weight: 600; text-decoration: none; cursor: pointer; }
  .pk-link:hover { color: var(--ui-accent); text-decoration: underline; }
  .pk-note { font-size: 13px; line-height: 1.5; border-radius: 10px; padding: 10px 14px; margin: 0 0 16px; }
  .pk-note--info { color: #92400e; background: #fffbeb; border: 1px solid #fde68a; }
  .pk-note--error { color: #991b1b; background: #fef2f2; border: 1px solid #fecaca; }
  @media (prefers-reduced-motion: reduce) { .pk-col, .pk-card { transition: none; } }
`;

/**
 * Miniatura de la tarjeta. next/image sirve una versión reducida (las capturas originales
 * pesan hasta ~850 KB) y solo carga las que están a la vista. width/height son solo la
 * proporción de reserva: el CSS deja que la imagen tome la suya y quepa entera.
 */
function CardPreview({ src }: { src?: string }): JSX.Element | null {
  if (!src) return null;
  return (
    <div className="pk-prev" aria-hidden="true">
      <Image
        className="pk-prev__img"
        src={src}
        alt=""
        width={640}
        height={400}
        sizes="(max-width: 720px) 80vw, 280px"
        draggable={false}
        onError={(e) => {
          // Si falta el archivo queda el fondo suave, no el ícono de imagen rota.
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

// La tarjeta se levanta y se inclina un poco al agarrarla.
const AL_ARRASTRAR = { scale: 1.03, rotate: 2, boxShadow: "0 16px 32px rgba(15,23,42,0.2)" };
// Al soltarla (o al moverla desde el pop-up) viaja a su sitio; las demás se reacomodan.
const VIAJE = { type: "spring", stiffness: 420, damping: 36 } as const;
// Si se suelta donde no cambia nada, vuelve rápido a su sitio, sin rebote.
const REGRESO = { bounceStiffness: 520, bounceDamping: 40 };

export default function PolishBoard({ tickets }: { tickets: PolishTicket[] }): JSX.Element {
  const [estados, setEstados] = useState<Estados>({});
  const [modo, setModo] = useState<Modo>("cargando");
  const [error, setError] = useState<string | null>(null);
  const [arrastrando, setArrastrando] = useState<string | null>(null);
  const [sobre, setSobre] = useState<PolishStatus | null>(null);

  const abierto = useSyncExternalStore(suscribirUrl, leerTicketAbierto, ningunTicket);
  const punteroFino = useSyncExternalStore(suscribirPuntero, hayPunteroFino, sinPunteroFino);

  const columnas = useRef(new Map<PolishStatus, HTMLElement>());
  /** El clic que sigue a un arrastre no debe abrir el ticket. */
  const huboArrastre = useRef(false);
  /** Si el pop-up lo abrió este tablero, cerrarlo es volver atrás; si llegó por enlace, no. */
  const abiertoAqui = useRef(false);

  // Al abrir y cada vez que se vuelve a la pestaña, para ver lo que movieron los demás.
  useEffect(() => {
    let vivo = true;

    function usarLocal(): void {
      if (!vivo) return;
      setEstados(leerLocal());
      setModo("local");
    }

    function cargar(): void {
      fetch("/api/polish", { cache: "no-store" })
        .then(function aJson(res) {
          return res.json() as Promise<{ compartido?: boolean; estados?: Estados; error?: string }>;
        })
        .then(function aplicar(data) {
          if (!vivo) return;
          if (data.compartido) {
            setEstados(data.estados ?? {});
            setModo("compartido");
            return;
          }
          if (data.error) setError(`No se pudo leer el estado compartido (${data.error}).`);
          usarLocal();
        })
        // Sin red o sin ruta: se sigue con lo guardado en el navegador.
        .catch(usarLocal);
    }

    cargar();
    window.addEventListener("focus", cargar);
    return () => {
      vivo = false;
      window.removeEventListener("focus", cargar);
    };
  }, []);

  function columnaDe(ticket: PolishTicket): PolishStatus {
    return estados[ticket.slug] ?? ticket.base;
  }

  async function mover(ticket: PolishTicket, destino: PolishStatus): Promise<void> {
    const origen = columnaDe(ticket);
    if (origen === destino || modo === "cargando") return;
    setError(null);
    const siguiente: Estados = { ...estados, [ticket.slug]: destino };
    setEstados(siguiente);

    if (modo === "local") {
      try {
        window.localStorage.setItem(CLAVE_LOCAL, JSON.stringify(siguiente));
      } catch {
        // Almacenamiento bloqueado: el cambio dura hasta recargar.
      }
      return;
    }

    try {
      const res = await fetch("/api/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: ticket.slug, status: destino }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? `error ${res.status}`);
    } catch (e) {
      // No se guardó: el ticket vuelve a donde estaba.
      setEstados(function revertir(actual) {
        return { ...actual, [ticket.slug]: origen };
      });
      setError(`No se guardó el cambio de «${ticket.resumen}» (${e instanceof Error ? e.message : String(e)}).`);
    }
  }

  function abrir(slug: string): void {
    window.history.pushState(null, "", `/polish?ticket=${slug}`);
    abiertoAqui.current = true;
    window.dispatchEvent(new Event(EVENTO_URL));
  }

  function cerrar(): void {
    if (abiertoAqui.current) {
      abiertoAqui.current = false;
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", "/polish");
    window.dispatchEvent(new Event(EVENTO_URL));
  }

  function alHacerClic(e: ReactMouseEvent<HTMLElement>, slug: string): void {
    // El clic que cierra un arrastre no abre nada, tampoco el enlace sobre el que se soltó.
    if (huboArrastre.current) {
      e.preventDefault();
      return;
    }
    // Ctrl/Cmd/Shift + clic sobre el título abre la página del ticket en otra pestaña.
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.target instanceof Element && e.target.closest(".pk-link")) return;
    e.preventDefault();
    abrir(slug);
  }

  /** La columna sobre la que está el cursor: solo cuenta la posición horizontal, así
   *  se puede soltar debajo de una columna corta. Entre dos columnas gana la más cercana. */
  function columnaBajo(evento: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): PolishStatus | null {
    const x = "clientX" in evento ? evento.clientX : info.point.x - window.scrollX;
    let mejor: PolishStatus | null = null;
    let distancia = Infinity;
    for (const [status, el] of columnas.current) {
      const caja = el.getBoundingClientRect();
      const d = x < caja.left ? caja.left - x : x > caja.right ? x - caja.right : 0;
      if (d < distancia) {
        distancia = d;
        mejor = status;
      }
    }
    return mejor;
  }

  const bloqueado = modo === "cargando";
  const puedeArrastrar = punteroFino && !bloqueado;
  const ticketAbierto = tickets.find(function bySlug(t) { return t.slug === abierto; });

  return (
    <main style={{ flex: 1, width: "100%", maxWidth: 1360, margin: "0 auto", padding: "40px 24px 96px" }}>
      <style>{STYLES}</style>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
          Polish
        </h1>
        <p style={{ fontSize: 15, color: "var(--ui-body)", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 720 }}>
          Correcciones de front para IT. Abre un ticket para ver la comparación entre Producción y Concorde con el código
          que hay que aplicar. Para cambiarlo de columna, arrástralo o cambia su estado al abrirlo.
        </p>
      </div>

      {modo === "local" && (
        <p className="pk-note pk-note--info">
          Los cambios de columna se guardan solo en este navegador: todavía no hay un almacén compartido conectado.
        </p>
      )}
      {error && (
        <p className="pk-note pk-note--error" role="alert">
          {error}
        </p>
      )}

      <MotionConfig reducedMotion="user">
        <div className="pk-board">
          {POLISH_COLUMNS.map(function renderColumn(col) {
            const enColumna = tickets.filter(function inColumn(t) { return columnaDe(t) === col.status; });
            return (
              <section
                key={col.status}
                ref={(el) => {
                  if (el) columnas.current.set(col.status, el);
                  else columnas.current.delete(col.status);
                }}
                className="pk-col"
                aria-label={col.label}
                data-over={sobre === col.status}
                style={{ ["--pk-tone" as string]: col.tone }}
              >
                <div className="pk-col__head">
                  <h2 className="pk-col__name">{col.label}</h2>
                  <span className="pk-col__count">{enColumna.length}</span>
                </div>
                <p className="pk-col__hint">{col.hint}</p>

                <div className="pk-col__list">
                  {enColumna.length === 0 && <div className="pk-empty">{sobre === col.status ? "Suelta aquí" : "Sin tickets"}</div>}
                  {enColumna.map(function renderCard(t) {
                    return (
                      <motion.article
                        key={t.slug}
                        // Mismo layoutId en cualquier columna: al cambiar de columna la tarjeta
                        // viaja desde donde estaba (o desde donde se soltó) hasta su sitio.
                        layout
                        layoutId={t.slug}
                        transition={VIAJE}
                        className="pk-card"
                        data-draggable={puedeArrastrar}
                        data-dragging={arrastrando === t.slug}
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
                          setArrastrando(t.slug);
                        }}
                        onDrag={(evento, info) => {
                          const destino = columnaBajo(evento, info);
                          // Solo se marca la columna si soltar ahí cambia algo.
                          setSobre(destino === col.status ? null : destino);
                        }}
                        onDragEnd={(evento, info) => {
                          const destino = columnaBajo(evento, info);
                          setArrastrando(null);
                          setSobre(null);
                          if (destino) void mover(t, destino);
                        }}
                        onClick={(e) => alHacerClic(e, t.slug)}
                      >
                        <CardPreview src={t.preview} />
                        <span className="pk-area">{t.area}</span>
                        {/* Enlace real a la página del ticket: da foco con teclado (Enter abre el pop-up)
                            y permite abrirla en otra pestaña. */}
                        <a className="pk-title" href={`/polish/${t.slug}`} draggable={false}>
                          {t.resumen}
                        </a>
                        <div className="pk-links">
                          <span>{t.date}</span>
                          {t.codeLink && (
                            <a className="pk-link" href={t.codeLink} draggable={false}>
                              Bloque
                            </a>
                          )}
                          {t.handoffLink && (
                            <a className="pk-link" href={t.handoffLink} draggable={false}>
                              Componente
                            </a>
                          )}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </MotionConfig>

      {ticketAbierto && (
        <TicketModal
          key={ticketAbierto.slug}
          slug={ticketAbierto.slug}
          status={columnaDe(ticketAbierto)}
          bloqueado={bloqueado}
          onMove={(destino) => void mover(ticketAbierto, destino)}
          onClose={cerrar}
        />
      )}
    </main>
  );
}
