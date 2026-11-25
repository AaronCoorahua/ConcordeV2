"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { REPORT_ENTRIES } from "@/app/reporte/reportData";
import { ReportDetailBody } from "@/app/reporte/[slug]/ReportDetailViewer";
import { POLISH_COLUMNS, type PolishStatus } from "./polishData";

/**
 * TicketModal — el ticket abierto sobre el tablero: pop-up grande con la comparación
 * y el código, y arriba el estado para cambiarlo sin arrastrar.
 *
 * Se carga aparte (dynamic en PolishBoard): el código de los tickets y los componentes
 * de las demos solo bajan cuando se abre el primero.
 *
 * Usa <dialog>: el navegador se encarga de atrapar el foco, cerrar con Esc y
 * devolver el foco a la tarjeta al cerrar.
 */

const STYLES = `
  .pk-modal { width: min(1180px, calc(100vw - 48px)); height: calc(100dvh - 48px); max-width: none; max-height: none; margin: auto; padding: 0; border: 0; border-radius: 16px; overflow: hidden; background: var(--ui-subtle); color: var(--ui-ink); box-shadow: 0 24px 64px rgba(15,23,42,0.28); font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
  .pk-modal::backdrop { background: rgba(15,23,42,0.5); backdrop-filter: blur(2px); }
  .pk-modal[open] { animation: pk-modal-in 0.18s ease-out; }
  .pk-modal[open]::backdrop { animation: pk-fade-in 0.18s ease-out; }
  @keyframes pk-modal-in { from { opacity: 0; transform: translateY(12px) scale(0.985); } }
  @keyframes pk-fade-in { from { opacity: 0; } }
  .pk-modal__frame { display: flex; flex-direction: column; height: 100%; }
  .pk-modal__bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; padding: 12px 16px; background: #fff; border-bottom: 1px solid var(--ui-border); }
  .pk-modal__actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
  .pk-modal__body { flex: 1; overflow-y: auto; padding: 32px 32px 64px; }
  .pk-modal__content { max-width: 1080px; margin: 0 auto; }
  .pk-seg { display: inline-flex; flex-wrap: wrap; gap: 2px; padding: 3px; border-radius: 10px; background: var(--ui-border-soft); }
  .pk-seg button { display: inline-flex; align-items: center; gap: 6px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-body); background: transparent; border: 0; border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: background 0.12s, color 0.12s; }
  .pk-seg button:hover:not(:disabled) { color: var(--ui-ink); }
  .pk-seg button[aria-pressed="true"] { background: #fff; color: var(--ui-ink); box-shadow: 0 1px 2px rgba(15,23,42,0.14); }
  .pk-seg button:disabled { cursor: default; opacity: 0.6; }
  .pk-seg i { width: 8px; height: 8px; border-radius: 50%; background: var(--pk-tone); }
  .pk-btn { font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-body); background: #fff; border: 1px solid var(--ui-border); border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: border-color 0.12s, color 0.12s; }
  .pk-btn:hover { border-color: var(--ui-border-hover); color: var(--ui-ink); }
  .pk-close { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0; }
  .pk-seg button:focus-visible, .pk-btn:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
  @media (max-width: 720px) {
    .pk-modal { width: 100vw; height: 100dvh; border-radius: 0; }
    .pk-modal__body { padding: 24px 16px 48px; }
    .pk-modal__bar { padding: 8px 12px; }
    .pk-seg button { font-size: 12px; padding: 6px 8px; }
  }
  @media (prefers-reduced-motion: reduce) { .pk-modal[open], .pk-modal[open]::backdrop { animation: none; } .pk-seg button, .pk-btn { transition: none; } }
`;

const TITLE_ID = "pk-modal-title";

export default function TicketModal({
  slug,
  status,
  bloqueado,
  onMove,
  onClose,
}: {
  slug: string;
  /** Columna en la que está ahora el ticket. */
  status: PolishStatus;
  /** Mientras el tablero aún carga los estados no se puede mover nada. */
  bloqueado: boolean;
  onMove: (destino: PolishStatus) => void;
  onClose: () => void;
}): JSX.Element | null {
  const ref = useRef<HTMLDialogElement>(null);
  const [copiado, setCopiado] = useState(false);

  const indice = REPORT_ENTRIES.findIndex(function bySlug(e) { return e.slug === slug; });
  const entry = REPORT_ENTRIES[indice];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    // El tablero de atrás no se desplaza mientras el ticket está abierto.
    const previo = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previo;
    };
  }, []);

  if (!entry) return null;

  async function copiarEnlace(): Promise<void> {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/polish/${slug}`);
      setCopiado(true);
      window.setTimeout(function reset() { setCopiado(false); }, 1600);
    } catch {
      // Portapapeles bloqueado: el enlace sigue en la barra de direcciones.
    }
  }

  return (
    <dialog
      ref={ref}
      className="pk-modal"
      aria-labelledby={TITLE_ID}
      onClose={onClose}
      onClick={(e) => {
        // El marco ocupa todo el diálogo: si el clic llega al <dialog> mismo, fue en el fondo.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <style>{STYLES}</style>
      <div className="pk-modal__frame">
        <div className="pk-modal__bar">
          <div className="pk-seg" role="group" aria-label="Estado del ticket">
            {POLISH_COLUMNS.map(function renderEstado(col) {
              return (
                <button
                  key={col.status}
                  type="button"
                  aria-pressed={col.status === status}
                  disabled={bloqueado}
                  title={col.hint}
                  style={{ ["--pk-tone" as string]: col.tone }}
                  onClick={() => onMove(col.status)}
                >
                  <i aria-hidden="true" />
                  {col.label}
                </button>
              );
            })}
          </div>
          <div className="pk-modal__actions">
            <button type="button" className="pk-btn" onClick={() => void copiarEnlace()}>
              {copiado ? "Enlace copiado" : "Copiar enlace"}
            </button>
            <button type="button" className="pk-btn pk-close" aria-label="Cerrar" onClick={() => ref.current?.close()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="pk-modal__body">
          <div className="pk-modal__content">
            <ReportDetailBody entry={entry} index={indice + 1} titleId={TITLE_ID} />
          </div>
        </div>
      </div>
    </dialog>
  );
}
