"use client";

/**
 * Preview — demo interactiva de TermsSelector (client component).
 * Fondo claro. Muestra: un ejemplo controlado (checked + onChange) con su
 * estado actual en texto, uno no controlado (defaultChecked) y uno disabled.
 */

import { useState } from "react";
import type { JSX } from "react";
import TermsSelector from "@/src/components/TermsSelector/TermsSelector";

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
} as const;

export default function Preview(): JSX.Element {
  const [checked, setChecked] = useState(false);

  function handleChange(next: boolean): void {
    setChecked(next);
  }

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · checkbox 16×16</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>controlado · no controlado · disabled</span>
      </div>
      <div style={{ padding: "32px 24px", background: "#ffffff", display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
        <div style={cellStyle}>
          <p style={labelStyle}>controlado (checked + onChange)</p>
          <TermsSelector checked={checked} onChange={handleChange} />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8", marginTop: 8 }}>
            estado: {checked ? "marcado" : "no marcado"} · checked={JSON.stringify(checked)}
          </span>
        </div>

        <div style={cellStyle}>
          <p style={labelStyle}>no controlado (defaultChecked)</p>
          <TermsSelector defaultChecked>
            Acepto recibir novedades por correo.
          </TermsSelector>
        </div>

        <div style={cellStyle}>
          <p style={labelStyle}>disabled</p>
          <TermsSelector disabled defaultChecked />
        </div>
      </div>
    </div>
  );
}
