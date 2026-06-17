import type { JSX } from "react";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/Homepage/Homepage";
import Topbar from "@/app/blocks/_components/Topbar";

/**
 * /blocks — Catálogo de Bloques (tema claro, igual que /components).
 */

const THUMB_SCALE = 0.2;

export default function BlocksPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Topbar active="blocks" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Bloques</h1>
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>1 bloque</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {/* Homepage */}
          <a href="/blocks/homepage" style={{ display: "block", textDecoration: "none", borderRadius: 14, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <div style={{ height: 248, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              {/* Thumbnail real del bloque, escalado */}
              <div style={{ width: HOMEPAGE_WIDTH * THUMB_SCALE, height: HOMEPAGE_HEIGHT * THUMB_SCALE, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: HOMEPAGE_WIDTH, height: HOMEPAGE_HEIGHT, transform: `scale(${THUMB_SCALE})`, transformOrigin: "top left" }}>
                  <Homepage />
                </div>
              </div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>Homepage</h2>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px" }}>WIP</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: "8px 0 0" }}>
                Página de inicio: banners, sección de subastador y categorías. Montada con componentes Concorde.
              </p>
              <span style={{ display: "inline-block", marginTop: 12, fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>{HOMEPAGE_WIDTH} × {HOMEPAGE_HEIGHT}</span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
