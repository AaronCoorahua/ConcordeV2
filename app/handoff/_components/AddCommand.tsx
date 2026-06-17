"use client";

/**
 * AddCommand — "Añadir a tu proyecto" (estilo shadcn) para cada handoff.
 * Muestra `npx @subastop/concorde@latest add <name>` con botón de copiar.
 */

import { useState } from "react";
import type { JSX } from "react";

export default function AddCommand({ name }: { name: string }): JSX.Element {
  const [copied, setCopied] = useState(false);
  const cmd = `npx @subastop/concorde@latest add ${name}`;

  function handleCopy(): void {
    void navigator.clipboard.writeText(cmd).then(function done() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 2000);
    });
  }

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, background: "#f8fafc", padding: "12px 14px", marginBottom: 24, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
        Añadir a tu proyecto
      </span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 8, background: "#0f172a", borderRadius: 6, padding: "9px 12px" }}>
        <code style={{ fontSize: 12.5, color: "#e2e8f0", fontFamily: "monospace", overflowX: "auto", whiteSpace: "nowrap" }}>
          <span style={{ color: "#64748b" }}>$ </span>{cmd}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 4, border: "none", cursor: "pointer", background: "#334155", color: "#e2e8f0" }}
        >
          {copied ? "✓ copiado" : "copiar"}
        </button>
      </div>
      <p style={{ fontSize: 11, color: "#94a3b8", margin: "8px 0 0", lineHeight: "16px" }}>
        Copia el código fuente a <code style={{ color: "#6366f1" }}>concorde/components/</code> de tu proyecto (imports relativos, sin tocar tu config).
      </p>
    </div>
  );
}
