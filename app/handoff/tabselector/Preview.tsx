"use client";

/**
 * Preview — demo interactiva de TabSelector (client component).
 * Fondo claro. Dos ejemplos controlados (2 y 3 opciones) con useState,
 * mostrando la opción activa en texto debajo.
 */

import { useState } from "react";
import type { JSX } from "react";
import TabSelector from "@/src/components/TabSelector/TabSelector";

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  fontFamily: "monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#64748b",
  margin: "0 0 8px",
} as const;

const cellStyle = {
  display: "flex" as const,
  flexDirection: "column" as const,
  alignItems: "flex-start" as const,
};

const activeTextStyle = {
  fontSize: 11,
  fontFamily: "monospace",
  color: "#94a3b8",
  marginTop: 12,
} as const;

const TWO_OPTIONS = ["Boleta", "Facturas"];
const THREE_OPTIONS = ["En vivo", "Negociable", "Todos"];

export default function Preview(): JSX.Element {
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(1);

  function handleTwo(index: number): void {
    setTwo(index);
  }

  function handleThree(index: number): void {
    setThree(index);
  }

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · segmented</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>2 opciones · 3 opciones · controlado</span>
      </div>
      <div style={{ padding: "32px 24px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
        <div style={cellStyle}>
          <p style={labelStyle}>2 opciones</p>
          <TabSelector options={TWO_OPTIONS} value={two} onChange={handleTwo} aria-label="Vista (2 opciones)" />
          <span style={activeTextStyle}>activa: {JSON.stringify(TWO_OPTIONS[two])} (índice {two})</span>
        </div>

        <div style={cellStyle}>
          <p style={labelStyle}>3 opciones</p>
          <TabSelector options={THREE_OPTIONS} value={three} onChange={handleThree} aria-label="Estado (3 opciones)" />
          <span style={activeTextStyle}>activa: {JSON.stringify(THREE_OPTIONS[three])} (índice {three})</span>
        </div>
      </div>
    </div>
  );
}
