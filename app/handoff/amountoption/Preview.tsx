"use client";

/**
 * Preview — demo interactiva de AmountOption (client component).
 * Muestra el selector configurable AmountOptionGroup: controlas cuántos montos
 * fijos hay y si se permite la opción personalizada (input editable).
 */

import { useState } from "react";
import type { JSX } from "react";
import AmountOptionGroup from "@/src/components/AmountOptionGroup/AmountOptionGroup";
import type { AmountSelection } from "@/src/components/AmountOptionGroup/AmountOptionGroup";

const ALL_AMOUNTS = ["80", "130", "210", "500"];

const ctrlLabel = { fontSize: 12, fontWeight: 600, color: "#334155", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" } as const;
const btnStyle = { width: 24, height: 24, borderRadius: 6, border: "1px solid #cbd5e1", background: "#fff", color: "#334155", cursor: "pointer", fontWeight: 700, lineHeight: 1 } as const;

export default function Preview(): JSX.Element {
  const [count, setCount] = useState<number>(2);
  const [allowCustom, setAllowCustom] = useState<boolean>(true);
  const [sel, setSel] = useState<AmountSelection>(0);
  const [custom, setCustom] = useState<string>("");

  const amounts = ALL_AMOUNTS.slice(0, count);

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · configurable</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>montos fijos + personalizado</span>
      </div>

      {/* Controles de configuración */}
      <div style={{ padding: "14px 24px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>Montos fijos:</span>
          <button type="button" style={btnStyle} onClick={function dec() { setCount(function p(c) { return Math.max(1, c - 1); }); }} aria-label="menos">−</button>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", minWidth: 14, textAlign: "center" }}>{count}</span>
          <button type="button" style={btnStyle} onClick={function inc() { setCount(function p(c) { return Math.min(ALL_AMOUNTS.length, c + 1); }); }} aria-label="más">+</button>
        </div>
        <label style={ctrlLabel}>
          <input type="checkbox" checked={allowCustom} onChange={function tg(e) { setAllowCustom(e.target.checked); }} />
          Permitir monto personalizado
        </label>
      </div>

      {/* Componente configurable */}
      <div style={{ padding: "28px 24px", background: "#ffffff", display: "flex", justifyContent: "center" }}>
        <AmountOptionGroup
          amounts={amounts}
          allowCustom={allowCustom}
          value={sel}
          onChange={setSel}
          customValue={custom}
          onCustomValueChange={setCustom}
        />
      </div>

      <div style={{ padding: "8px 24px 16px", background: "#ffffff" }}>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>
          selección: {JSON.stringify(sel)}{sel === "custom" ? ` · valor: ${JSON.stringify(custom)}` : ""}
        </span>
      </div>
    </div>
  );
}
