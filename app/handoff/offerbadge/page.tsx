"use client";

import type { JSX } from "react";
import OfferBadge from "@/src/components/OfferBadge/OfferBadge";

export default function OfferBadgeHandoffPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      <header style={{ borderBottom: "1px solid #e2e8f0", background: "#fff", padding: "0 40px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← Concorde</a>
          <span style={{ color: "#e2e8f0" }}>/</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>OfferBadge</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b" }}>VoyagerDS</span>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Live preview */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Preview — animaciones activas
          </h2>

          {/* Dark bg — muestra mejor los badges */}
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
            borderRadius: 12,
            padding: "48px 40px",
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <OfferBadge variant="live" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>live · dot pulsante</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <OfferBadge variant="proxima" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>proxima · clock blink</span>
            </div>
          </div>
        </section>

        {/* White bg */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Sobre fondo blanco (context: card image overlay)
          </h2>
          <div style={{ background: "#e2e8f0", borderRadius: 12, padding: "48px 40px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <OfferBadge variant="live" />
            <OfferBadge variant="proxima" />
          </div>
        </section>

        {/* Code */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Uso
          </h2>
          <div style={{ background: "#0f172a", borderRadius: 8, padding: "16px 20px" }}>
            <code style={{ fontSize: 13, lineHeight: 1.8, color: "#e2e8f0", fontFamily: "monospace", whiteSpace: "pre", display: "block" }}>{`import OfferBadge from "@/components/OfferBadge/OfferBadge";

// EN VIVO — dot pulsante
<OfferBadge variant="live" />

// PRÓXIMA — clock parpadeante
<OfferBadge variant="proxima" />

// Label personalizado
<OfferBadge variant="live" label="LIVE NOW" />`}</code>
          </div>
        </section>

        {/* Spec rápida */}
        <section>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Spec
          </h2>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Propiedad","EN VIVO","PRÓXIMA"].map(function renderTh(h) {
                    return <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #e2e8f0", fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {[
                  ["CSS class",    ".offerbadge--live",    ".offerbadge--proxima"],
                  ["Bg gradient",  "orange 55°→48°",       "vault purple 285°"],
                  ["Ícono",        "dot 6px pulsante",     "clock SVG parpadeante"],
                  ["Animación",    "offerbadge-live-ring 1.4s ease-out ∞", "offerbadge-clock-blink 1.4s ease-in-out ∞"],
                  ["Font",         "9px / 700 / uppercase / +0.07em",  "igual"],
                  ["Padding",      "3px 8px 3px 6px",      "igual"],
                  ["Border-radius","9999px",               "igual"],
                  ["Backdrop",     "blur(6px)",            "igual"],
                ].map(function renderRow(r) {
                  return (
                    <tr key={r[0]}>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid #f1f5f9", fontWeight: 600, color: "#475569", fontSize: 11 }}>{r[0]}</td>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid #f1f5f9", color: "#2563eb", fontFamily: "monospace", fontSize: 11 }}>{r[1]}</td>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid #f1f5f9", color: "#7c3aed", fontFamily: "monospace", fontSize: 11 }}>{r[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
