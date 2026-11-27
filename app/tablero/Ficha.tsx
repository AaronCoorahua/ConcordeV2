"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";
import Image from "next/image";
import { POLISH_COLUMNS, type PolishStatus } from "@/app/polish/polishData";
import { PESOS, type Op, type Pase, type Tarjeta, type Yo } from "./tableroData";

/**
 * Ficha — una tarjeta abierta sobre el tablero: estado, peso, en qué pase va y quién la
 * tiene. Cada control guarda al tocarlo, no hay botón "Guardar".
 * Es también la forma de mover una tarjeta sin arrastrar (teclado y pantallas táctiles).
 *
 * YoDialog — "¿Cómo te llamas?": el nombre de quien toma tarjetas. No hay login.
 *
 * Los dos usan <dialog>: el navegador atrapa el foco, cierra con Esc y devuelve el foco.
 */

type Cambios = Extract<Op, { op: "ajustar" }>["cambios"];

function Dialogo({ titleId, onClose, children }: { titleId: string; onClose: () => void; children: ReactNode }): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const previo = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previo;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="tb-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // El contenido ocupa todo el diálogo: si el clic llega al <dialog>, fue en el fondo.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="tb-dialog__in">{children}</div>
    </dialog>
  );
}

function Cerrar(): JSX.Element {
  return (
    <button
      type="button"
      className="tb-icon"
      aria-label="Cerrar"
      onClick={(e) => e.currentTarget.closest("dialog")?.close()}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

const FICHA_TITLE = "tb-ficha-title";

export default function Ficha({
  tarjeta,
  tipo,
  pases,
  personas,
  yo,
  bloqueado,
  onAjustar,
  onEstado,
  onTitulo,
  onBorrar,
  onClose,
}: {
  tarjeta: Tarjeta;
  /** Qué es: el área si es de polish, "Quick win" o "Forward". */
  tipo: string;
  /** Pases que aún no salieron. */
  pases: Pase[];
  /** Nombres que ya aparecen en el tablero, para sugerirlos. */
  personas: string[];
  yo: Yo | null;
  bloqueado: boolean;
  onAjustar: (cambios: Cambios) => void;
  onEstado: (status: PolishStatus) => void;
  onTitulo: (titulo: string) => void;
  onBorrar: () => void;
  onClose: () => void;
}): JSX.Element {
  const t = tarjeta;
  const destino = t.pase ?? (t.forward ? "forward" : "pedidos");

  function alElegirDestino(valor: string): void {
    if (valor === "pedidos") onAjustar({ pase: null, forward: false });
    else if (valor === "forward") onAjustar({ forward: true });
    else onAjustar({ pase: valor });
  }

  function guardarQuien(valor: string): void {
    const nombre = valor.trim();
    if (nombre === (t.quien ?? "")) return;
    onAjustar({ quien: nombre ? nombre : null });
  }

  return (
    <Dialogo titleId={FICHA_TITLE} onClose={onClose}>
      <div className="tb-dialog__head">
        <div style={{ minWidth: 0, flex: 1 }}>
          <span className="tb-area">{t.esPolish ? `Polish · ${t.area}` : tipo}</span>
          {t.esPolish ? (
            <h2 id={FICHA_TITLE} className="tb-dialog__title">
              {t.titulo}
            </h2>
          ) : (
            <>
              <h2 id={FICHA_TITLE} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                {t.titulo}
              </h2>
              <input
                key={t.titulo}
                className="tb-input tb-dialog__titleinput"
                defaultValue={t.titulo}
                maxLength={120}
                aria-label="Título de la tarjeta"
                disabled={bloqueado}
                onBlur={(e) => {
                  const titulo = e.currentTarget.value.trim();
                  if (titulo && titulo !== t.titulo) onTitulo(titulo);
                  else e.currentTarget.value = t.titulo;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
            </>
          )}
        </div>
        <Cerrar />
      </div>

      {t.esPolish && (
        <div className="tb-prev">
          {t.preview && (
            <Image
              src={t.preview}
              alt=""
              width={288}
              height={160}
              sizes="144px"
              onError={(e) => {
                // Si falta el archivo no queda el ícono de imagen rota.
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <a href={`/polish/${t.id}`}>Ver la corrección completa</a>
        </div>
      )}

      <div className="tb-field">
        <span className="tb-field__label" id="tb-f-estado">Estado</span>
        <div className="tb-seg" role="group" aria-labelledby="tb-f-estado">
          {POLISH_COLUMNS.map(function renderEstado(col) {
            return (
              <button
                key={col.status}
                type="button"
                aria-pressed={col.status === t.status}
                disabled={bloqueado}
                title={col.hint}
                style={{ ["--tb-tone" as string]: col.tone }}
                onClick={() => onEstado(col.status)}
              >
                <i aria-hidden="true" />
                {col.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tb-field">
        <span className="tb-field__label" id="tb-f-peso">Peso</span>
        <div className="tb-seg" role="group" aria-labelledby="tb-f-peso">
          <button type="button" aria-pressed={t.peso === undefined} disabled={bloqueado} onClick={() => onAjustar({ peso: null })}>
            Sin peso
          </button>
          {PESOS.map(function renderPeso(p) {
            return (
              <button key={p} type="button" aria-pressed={t.peso === p} disabled={bloqueado} onClick={() => onAjustar({ peso: p })}>
                {p}
              </button>
            );
          })}
        </div>
        <p className="tb-field__hint">Esfuerzo para dev, del 1 al 3.</p>
      </div>

      <div className="tb-field">
        <label className="tb-field__label" htmlFor="tb-f-destino">Dónde va</label>
        <select
          id="tb-f-destino"
          className="tb-input"
          value={destino}
          disabled={bloqueado}
          onChange={(e) => alElegirDestino(e.currentTarget.value)}
        >
          <option value="pedidos">Sin pase</option>
          <option value="forward">Forward</option>
          {pases.length > 0 && (
            <optgroup label="En un pase">
              {pases.map(function renderPase(p) {
                return (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                );
              })}
            </optgroup>
          )}
          {/* Si va en un pase que ya salió, se muestra igual para no perder el dato. */}
          {t.pase && !pases.some((p) => p.id === t.pase) && <option value={t.pase}>Un pase que ya salió</option>}
        </select>
      </div>

      <div className="tb-field">
        <label className="tb-field__label" htmlFor="tb-f-quien">Quién la tiene</label>
        <div className="tb-field__row">
          <input
            key={t.quien ?? ""}
            id="tb-f-quien"
            className="tb-input"
            list="tb-f-personas"
            defaultValue={t.quien ?? ""}
            placeholder="Nadie"
            maxLength={30}
            disabled={bloqueado}
            onBlur={(e) => guardarQuien(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
          <datalist id="tb-f-personas">
            {personas.map(function renderPersona(p) {
              return <option key={p} value={p} />;
            })}
          </datalist>
          {yo && t.quien !== yo.nombre && (
            <button type="button" className="tb-btn" disabled={bloqueado} onClick={() => onAjustar({ quien: yo.nombre })}>
              La tomo yo
            </button>
          )}
          {t.quien && (
            <button type="button" className="tb-btn" disabled={bloqueado} onClick={() => onAjustar({ quien: null })}>
              Soltar
            </button>
          )}
        </div>
      </div>

      {!t.esPolish && (
        <div className="tb-dialog__foot">
          <button
            type="button"
            className="tb-btn tb-btn--danger"
            disabled={bloqueado}
            onClick={() => {
              if (window.confirm(`¿Borrar "${t.titulo}"? No se puede deshacer.`)) onBorrar();
            }}
          >
            Borrar tarjeta
          </button>
        </div>
      )}
    </Dialogo>
  );
}

const YO_TITLE = "tb-yo-title";

export function YoDialog({ yo, onSave, onClose }: { yo: Yo | null; onSave: (yo: Yo) => void; onClose: () => void }): JSX.Element {
  const [nombre, setNombre] = useState(yo?.nombre ?? "");
  const limpio = nombre.replace(/\s+/g, " ").trim();

  return (
    <Dialogo titleId={YO_TITLE} onClose={onClose}>
      <form
        style={{ display: "contents" }}
        onSubmit={(e) => {
          e.preventDefault();
          if (limpio) onSave({ nombre: limpio });
        }}
      >
        <div className="tb-dialog__head">
          <div>
            <h2 id={YO_TITLE} className="tb-dialog__title" style={{ marginTop: 0 }}>
              ¿Cómo te llamas?
            </h2>
            <p className="tb-field__hint" style={{ marginTop: 4 }}>
              Sale en las tarjetas que tomas.
            </p>
          </div>
          <Cerrar />
        </div>
        <div className="tb-field">
          <label className="tb-field__label" htmlFor="tb-yo-nombre">Tu nombre</label>
          <input
            id="tb-yo-nombre"
            className="tb-input"
            value={nombre}
            maxLength={30}
            autoFocus
            autoComplete="given-name"
            onChange={(e) => setNombre(e.currentTarget.value)}
          />
        </div>
        <div className="tb-dialog__foot" style={{ justifyContent: "flex-end" }}>
          <button type="submit" className="tb-btn tb-btn--primary" disabled={!limpio}>
            Listo
          </button>
        </div>
      </form>
    </Dialogo>
  );
}
