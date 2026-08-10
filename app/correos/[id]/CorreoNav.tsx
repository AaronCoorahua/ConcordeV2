"use client";

/**
 * CorreoNav — la barra de recorrido de la revisión: «Anterior · 12 de 45 ·
 * Siguiente». Recorre los 45 correos en el orden del CATÁLOGO (catalogOrder.ts),
 * no el del flujo de negocio: quien revisa baja la lista de arriba abajo, y
 * saltar por `leadsTo` le haría perder la cuenta de qué ya vio.
 *
 * Dos cosas la hacen rápida de usar:
 *   · `prefetch` en ambos enlaces — Next descarga el correo vecino antes de que
 *     se pulse, así el cambio es casi instantáneo (los 45 son estáticos).
 *   · flechas ← → del teclado, para recorrer sin mover el ratón.
 *
 * Los botones dicen solo «Anterior» y «Siguiente». El nombre del correo vecino va
 * en el `title` (tooltip), no rotulado: leerlo obligaba a procesar dos nombres en
 * cada salto —el del correo actual y el del siguiente— y el recorrido se hacía
 * más lento de lo que lo hacía el ahorro de saber a dónde se iba.
 */

import { useEffect } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface CorreoNavProps {
  anteriorId: string | null;
  anteriorNombre: string | null;
  siguienteId: string | null;
  siguienteNombre: string | null;
  /** Posición 1-based en el recorrido y total, para el rótulo «12 de 45». */
  posicion: number;
  total: number;
}

function NavLink({ href, nombre, direccion }: { href: string | null; nombre: string | null; direccion: "anterior" | "siguiente" }): JSX.Element {
  const esSiguiente = direccion === "siguiente";
  const flecha = esSiguiente ? "→" : "←";
  const label = esSiguiente ? "Siguiente" : "Anterior";

  const base = {
    display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0,
    height: 34, padding: "0 14px",
    borderRadius: "var(--ui-radius-control)", border: "1px solid var(--ui-border)",
    textDecoration: "none", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700,
    flexDirection: esSiguiente ? ("row-reverse" as const) : ("row" as const),
  };

  // En los extremos del recorrido el botón se queda, deshabilitado y con el mismo
  // rótulo: si cambiara de texto o desapareciera, el otro botón se movería de
  // sitio justo al llegar al final.
  if (!href) {
    return (
      <span aria-disabled="true" style={{ ...base, background: "var(--ui-border-soft)", color: "var(--ui-muted)", opacity: 0.55, cursor: "not-allowed" }}>
        <span aria-hidden="true" style={{ fontSize: 13, flexShrink: 0 }}>{flecha}</span>
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch
      className="cnav-btn"
      title={nombre ? `${label}: ${nombre}` : label}
      style={{ ...base, background: "#ffffff", color: "var(--ui-ink)", transition: "border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease" }}
    >
      <span aria-hidden="true" style={{ fontSize: 13, flexShrink: 0, color: "var(--ui-accent)" }}>{flecha}</span>
      {label}
    </Link>
  );
}

export default function CorreoNav({ anteriorId, anteriorNombre, siguienteId, siguienteNombre, posicion, total }: CorreoNavProps): JSX.Element {
  const router = useRouter();

  // Flechas del teclado. Se ignoran cuando el foco está en un campo de texto o en
  // el cuerpo editable del correo: ahí las flechas mueven el cursor, y navegar
  // sería perder lo que se estaba escribiendo.
  useEffect(function keyboardNav() {
    function onKey(e: KeyboardEvent): void {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "IFRAME") return;
      if (el instanceof HTMLElement && el.isContentEditable) return;

      const target = e.key === "ArrowLeft" ? anteriorId : siguienteId;
      if (!target) return;
      e.preventDefault();
      router.push(`/correos/${target}`);
    }
    window.addEventListener("keydown", onKey);
    return function off() { window.removeEventListener("keydown", onKey); };
  }, [anteriorId, siguienteId, router]);

  return (
    <nav
      aria-label="Recorrido de correos"
      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
    >
      <NavLink href={anteriorId ? `/correos/${anteriorId}` : null} nombre={anteriorNombre} direccion="anterior" />

      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ui-ink)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
          {posicion} <span style={{ color: "var(--ui-muted)", fontWeight: 600 }}>de {total}</span>
        </span>
        {/* Barra de progreso: dice cuánto queda del recorrido de un vistazo,
            sin tener que leer los números. */}
        <span aria-hidden="true" style={{ display: "block", width: 110, height: 3, borderRadius: 2, background: "var(--ui-border)", overflow: "hidden" }}>
          <span style={{ display: "block", height: "100%", width: `${(posicion / total) * 100}%`, background: "var(--ui-accent)", borderRadius: 2, transition: "width 0.2s ease" }} />
        </span>
      </div>

      <NavLink href={siguienteId ? `/correos/${siguienteId}` : null} nombre={siguienteNombre} direccion="siguiente" />

      <style dangerouslySetInnerHTML={{ __html: `
        .cnav-btn:hover { border-color: var(--ui-border-hover); background: var(--ui-subtle); box-shadow: 0 3px 12px rgba(15,23,42,0.07); }
      ` }} />
    </nav>
  );
}
