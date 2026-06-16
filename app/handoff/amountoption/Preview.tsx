"use client";

/**
 * Preview — demo interactiva de AmountOption (client component).
 * Grupo tipo radio: 2 opciones preset (selección controlada por índice en
 * useState) + 1 opción input controlada (value + onValueChange). Fondo claro,
 * apiladas verticalmente con gap.
 */

import { useState } from "react";
import type { JSX } from "react";
import AmountOption from "@/src/components/AmountOption/AmountOption";

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  fontFamily: "monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#64748b",
  margin: "0 0 8px",
} as const;

const PRESETS = [">S< 80", ">S< 130"] as const;

export default function Preview(): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [custom, setCustom] = useState<string>("");

  function handleCustom(next: string): void {
    setCustom(next);
  }

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · 254×48</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>default · selected · input</span>
      </div>
      <div style={{ padding: "32px 24px", background: "#ffffff", display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        {PRESETS.map(function renderPreset(amount, i): JSX.Element {
          return (
            <AmountOption
              key={amount}
              name="preview-amount"
              variant={selected === i ? "selected" : "default"}
              amount={amount}
              onSelect={function select(): void { setSelected(i); }}
              aria-label={`Monto ${amount}`}
            />
          );
        })}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 8 }}>
          <p style={labelStyle}>Ingresa un monto:</p>
          <AmountOption
            variant="input"
            name="preview-amount-custom"
            value={custom}
            onValueChange={handleCustom}
            placeholder="210"
            aria-label="Ingresa un monto personalizado"
          />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8", marginTop: 8 }}>value: {JSON.stringify(custom)}</span>
        </div>
      </div>
    </div>
  );
}
