"use client";

/**
 * Preview — demo interactiva de las 3 variantes de Input (client component).
 * Fondo claro. Cada variante con su etiqueta. Incluye un ejemplo controlado
 * con useState para demostrar value + onChange.
 */

import { useState } from "react";
import type { JSX } from "react";
import Input from "@/src/components/Input/Input";

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

export default function Preview(): JSX.Element {
  const [controlled, setControlled] = useState("");

  function handleControlled(next: string): void {
    setControlled(next);
  }

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · 234×48</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>default · focus · error · controlled</span>
      </div>
      <div style={{ padding: "32px 24px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
        <div style={cellStyle}>
          <p style={labelStyle}>default</p>
          <Input variant="default" placeholder="Suscríbete a las novedades" aria-label="Correo (default)" />
        </div>

        <div style={cellStyle}>
          <p style={labelStyle}>focus</p>
          <Input variant="focus" defaultValue="correo@ejemplo.com" aria-label="Correo (focus)" />
        </div>

        <div style={cellStyle}>
          <p style={labelStyle}>error</p>
          <Input variant="error" defaultValue="correo-malo" errorMessage="Ingresa un correo válido" aria-label="Correo (error)" />
        </div>

        <div style={cellStyle}>
          <p style={labelStyle}>controlled (value + onChange)</p>
          <Input
            variant="default"
            value={controlled}
            onChange={handleControlled}
            placeholder="Escribe aquí…"
            aria-label="Correo (controlado)"
          />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8", marginTop: 8 }}>value: {JSON.stringify(controlled)}</span>
        </div>
      </div>
    </div>
  );
}
