"use client";

/**
 * Preview — demo interactivo de AuctionStatus para la página de handoff.
 * Client component: necesita pasar callbacks (onBack) a AuctionStatus.
 */

import type { JSX } from "react";
import AuctionStatus from "@/src/components/AuctionStatus/AuctionStatus";

const LABEL: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#64748b",
};

const HINT: React.CSSProperties = {
  fontSize: 11,
  color: "#64748b",
  margin: "10px 0 0",
  fontFamily: "monospace",
};

export function PreviewLive(): JSX.Element {
  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={LABEL}>preview · live</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>gradiente naranja · pasa el mouse / mantén pulsado ‹</span>
      </div>
      <div style={{ padding: "40px 24px", background: "#f8fafc", display: "flex", justifyContent: "center" }}>
        <AuctionStatus variant="live" onBack={() => {}} />
      </div>
      <div style={{ padding: "8px 14px", background: "#fff", borderTop: "1px solid #e2e8f0" }}>
        <p style={{ ...HINT, margin: 0 }}>hover → círculo #F99845 · pressed → círculo #ED8936 + chevron #99A1AF</p>
      </div>
    </div>
  );
}

export function PreviewNegotiable(): JSX.Element {
  return (
    <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={LABEL}>preview · negotiable</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>gradiente teal</span>
      </div>
      <div style={{ padding: "40px 24px", background: "#f8fafc", display: "flex", justifyContent: "center" }}>
        <AuctionStatus variant="negotiable" title="Audi Q3 2026" subtitle="Vendedor: Santander" onBack={() => {}} />
      </div>
      <div style={{ padding: "8px 14px", background: "#fff", borderTop: "1px solid #e2e8f0" }}>
        <p style={{ ...HINT, margin: 0 }}>hover → círculo #2BC4C7 · pressed → círculo #00A8AB + chevron #99A1AF</p>
      </div>
    </div>
  );
}
