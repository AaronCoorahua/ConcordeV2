"use client";

/**
 * FondoTabs — tab de FONDO de una tipología: cambia el gradiente/formas del
 * banner sin cambiar su layout.
 *
 * Recibe los fondos ya renderizados desde el Server Component (el HTML de cada
 * tono se arma en build time), así que cambiar de tab solo intercambia el
 * srcDoc del iframe: no hay fetch ni regeneración en cliente.
 *
 * El botón «Copiar HTML» copia SIEMPRE el fondo activo.
 */

import { useState } from "react";
import type { JSX } from "react";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import type { TipoFondo } from "@/src/emails/tipologiasRegistry";

export interface FondoTabsProps {
  fondos: TipoFondo[];
  /** Alto del iframe de preview (px). */
  previewHeight: number;
  /** Título accesible del iframe. */
  title: string;
}

export default function FondoTabs({ fondos, previewHeight, title }: FondoTabsProps): JSX.Element {
  const [active, setActive] = useState(0);
  const fondo = fondos[active];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Fondo
        </span>
        <div role="tablist" aria-label="Fondo del banner" style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 10, background: "#f1f5f9" }}>
          {fondos.map(function renderTab(f, i) {
            const on = i === active;
            return (
              <button
                key={f.tone}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={function select() { setActive(i); }}
                style={{
                  height: 28,
                  padding: "0 12px",
                  borderRadius: 7,
                  border: "none",
                  cursor: "pointer",
                  background: on ? "#ffffff" : "transparent",
                  color: on ? "#0f172a" : "#64748b",
                  fontSize: 12,
                  fontWeight: on ? 700 : 600,
                  fontFamily: "inherit",
                  boxShadow: on ? "0 1px 3px rgba(15,23,42,0.10)" : "none",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div style={{ flex: 1 }} />
        <CopyHtmlButton key={fondo.tone} html={fondo.copyHtml} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: 32, borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9", overflowX: "auto" }}>
        <iframe
          title={`${title} · ${fondo.label}`}
          srcDoc={fondo.previewDoc}
          scrolling="no"
          style={{ width: 600, height: previewHeight, border: "none", background: "#FAFAFA", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", flexShrink: 0 }}
        />
      </div>
    </div>
  );
}
