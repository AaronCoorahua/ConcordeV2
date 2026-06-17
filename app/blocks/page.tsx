import type { JSX } from "react";

/**
 * /blocks — Catálogo de Bloques de Voyager DS.
 * Por ahora vacío: los bloques (composiciones de varios componentes) se
 * empezarán a crear a continuación. Comparte el topbar/navegación con /components.
 */

export default function BlocksPage(): JSX.Element {
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
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 999, padding: "3px 8px" }}>BETA</span>
      </header>

      {/* Catálogo de bloques */}
      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "48px 32px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>Bloques</h1>
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>1 bloque</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {/* Homepage */}
          <a href="/blocks/homepage" style={{ display: "block", textDecoration: "none", borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "repeating-conic-gradient(#0e1430 0% 25%, #0b1020 0% 50%) 50% / 16px 16px" }}>
              {/* mini-canvas a escala (798×1104 → aspecto 0.72) */}
              <div style={{ width: 116, height: 160, background: "#ffffff", borderRadius: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", outline: "1px solid rgba(255,255,255,0.15)" }} />
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>Homepage</h2>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#c4b5fd", border: "1px solid rgba(196,181,253,0.3)", borderRadius: 999, padding: "2px 8px" }}>WIP</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: "8px 0 0" }}>
                Lienzo base de la página de inicio. Por ahora solo el fondo blanco — iremos montando las secciones.
              </p>
              <span style={{ display: "inline-block", marginTop: 12, fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>798 × 1104</span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
