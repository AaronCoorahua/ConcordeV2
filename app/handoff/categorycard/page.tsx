"use client";

import type { JSX } from "react";
import CategoryCard from "@/src/components/CategoryCard/CategoryCard";

const CATEGORIES = ["vehicular", "maquinaria", "equipos-diversos", "articulos-diversos"] as const;

export default function CategoryCardHandoffPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      <header style={{ borderBottom: "1px solid #e2e8f0", background: "#fff", padding: "0 40px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← Concorde</a>
          <span style={{ color: "#e2e8f0" }}>/</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>CategoryCard</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b" }}>VoyagerDS</span>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Preview — todas las categorías */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Preview — 4 categorías
          </h2>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
            {CATEGORIES.map(function renderCard(cat) {
              return (
                <CategoryCard key={cat} category={cat} onClick={function() { void 0; }} />
              );
            })}
          </div>
        </section>

        {/* Demo interactivo */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Demo interactivo — hover + click
          </h2>
          <div style={{
            background: "linear-gradient(135deg, #f1f5f9 0%, #e8eef7 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: "36px 32px",
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}>
            {CATEGORIES.map(function renderCard(cat) {
              return (
                <CategoryCard key={cat} category={cat} onClick={function() { void 0; }} />
              );
            })}
          </div>
        </section>

        {/* Spec */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Uso
          </h2>
          <div style={{ background: "#0f172a", borderRadius: 8, padding: "16px 20px" }}>
            <code style={{ fontSize: 13, lineHeight: 1.8, color: "#e2e8f0", fontFamily: "monospace", whiteSpace: "pre", display: "block" }}>{`import CategoryCard from "@/components/CategoryCard/CategoryCard";

<CategoryCard category="vehicular"          onClick={() => filter("vehicular")} />
<CategoryCard category="maquinaria"         onClick={() => filter("maquinaria")} />
<CategoryCard category="equipos-diversos"   onClick={() => filter("equipos-diversos")} />
<CategoryCard category="articulos-diversos" onClick={() => filter("articulos-diversos")} />

// Label override
<CategoryCard category="vehicular" label="AUTOS" />`}</code>
          </div>
        </section>

        {/* Spec table */}
        <section>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Spec
          </h2>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Propiedad","Valor"].map(function renderTh(h) {
                    return <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #e2e8f0", fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: "#64748b", textTransform: "uppercase" }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Dimensiones",      "93×92px"],
                  ["Border-radius",    "var(--vmc-radius-md, 8px)"],
                  ["Border",           "1.5px gradient vault (oklch 0.72/0.58 · 285°)"],
                  ["Bg default",       "white→oklch(0.97 0.006 285), glass highlight ::before"],
                  ["Hover transform",  "translateY(-4px)"],
                  ["Hover bg",         "oklch(0.97→0.99 0.01 285), border más saturado"],
                  ["Active/pressed",   "scale(0.96), opacity 0.58, bg dimmed"],
                  ["Icon size",        "22×22px en wrapper 36×36px"],
                  ["Icon stroke",      "linearGradient oklch(0.50→0.32→0.18 / 285°)"],
                  ["Label font",       "9px / 700 / uppercase / ls 0.06em"],
                  ["Label color",      "var(--vmc-color-vault, oklch(0.22 0.18 285))"],
                  ["Glow ::after",     "radial vault purple, blur 8px, opacity 0→0.3 on hover"],
                  ["SVG IDs",          "Únicos por instancia via useId() — no colisión en listas"],
                ].map(function renderRow(r) {
                  return (
                    <tr key={r[0]}>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid #f1f5f9", fontWeight: 600, color: "#475569", fontSize: 11, width: 180 }}>{r[0]}</td>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid #f1f5f9", color: "#2563eb", fontFamily: "monospace", fontSize: 11 }}>{r[1]}</td>
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
