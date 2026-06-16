"use client";

/**
 * Preview — demo interactiva del Sidebar (client component).
 * Sidebar controlado con useState (collapsed + onToggle). El estado
 * (colapsado/expandido) se muestra en texto y se controla tanto desde
 * el botón hamburguesa interno como desde un botón externo. Usa el set
 * de secciones por defecto del componente (no se pasa `sections`).
 */

import { useState } from "react";
import type { JSX } from "react";
import Sidebar from "@/src/components/Sidebar/Sidebar";

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  fontFamily: "monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#64748b",
} as const;

const toggleBtnStyle = {
  appearance: "none" as const,
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#1e293b",
  fontFamily: "monospace",
  fontSize: 12,
  fontWeight: 700,
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer" as const,
} as const;

const logo = (
  <img src="/logo-preview.png" alt="Subastop" style={{ height: 28, width: "auto", objectFit: "contain", display: "block" }} />
);

export default function Preview(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);

  function handleToggle(next: boolean): void {
    setCollapsed(next);
  }

  function handleExternalToggle(): void {
    setCollapsed(function flip(v) {
      return !v;
    });
  }

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · 226px ↔ 64px</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>controlado · collapsed + onToggle</span>
      </div>

      <div style={{ padding: "16px 24px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Controles externos + estado */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={labelStyle}>estado</span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "monospace",
              padding: "2px 8px",
              borderRadius: 4,
              background: collapsed ? "#fef3c7" : "#dcfce7",
              color: collapsed ? "#92400e" : "#166534",
            }}
          >
            {collapsed ? "colapsado (64px)" : "expandido (226px)"}
          </span>
          <button type="button" onClick={handleExternalToggle} style={toggleBtnStyle}>
            {collapsed ? "Expandir ▸" : "Colapsar ◂"}
          </button>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>
            collapsed: {JSON.stringify(collapsed)}
          </span>
        </div>

        {/* Sidebar controlado (también colapsa con su propio botón hamburguesa).
            El componente trae su propio fondo oscuro. Altura visible limitada. */}
        <div style={{ display: "flex", height: 420, overflow: "hidden", border: "1px solid #e2e8f0", width: "fit-content" }}>
          <Sidebar logo={logo} collapsed={collapsed} onToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
}
