import type { JSX } from "react";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/Homepage/Homepage";

/**
 * /blocks/homepage — Visor del bloque Homepage a tamaño real (798 × 1104).
 */

export default function HomepageBlockPage(): JSX.Element {
  const link = { fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "6px 12px", borderRadius: 8, letterSpacing: "0.01em" } as const;

  return (
    <div style={{ minHeight: "100vh", background: "#0b1020", color: "#e2e8f0", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      {/* Top bar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0b1020" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #8460E5, #3B1782)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L12.196 4V10L7 13L1.804 10V4L7 1Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>Concorde</span>
          </div>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.12)", margin: "0 14px" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Voyager DS</span>
          <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 20 }}>
            <a href="/components" style={{ ...link, color: "rgba(255,255,255,0.55)", background: "transparent" }}>Componentes</a>
            <a href="/blocks" style={{ ...link, color: "#fff", background: "rgba(132,96,229,0.25)" }}>Bloques</a>
          </nav>
        </div>
        <a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#c4b5fd", textDecoration: "none" }}>← Bloques</a>
      </header>

      {/* Title */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 32px 0", display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>Homepage</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{HOMEPAGE_WIDTH} × {HOMEPAGE_HEIGHT}</span>
      </div>

      {/* Canvas a tamaño real */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px", overflowX: "auto" }}>
        <div style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35)", outline: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
          <Homepage />
        </div>
      </main>
    </div>
  );
}
