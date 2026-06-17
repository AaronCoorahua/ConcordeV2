"use client";

/**
 * Topbar — barra superior clara, mismos colores que /components.
 */

import type { JSX, ReactNode } from "react";

const linkBase = { fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "6px 12px", borderRadius: 8, letterSpacing: "0.01em" } as const;

export default function Topbar({ active, right }: { active: "components" | "blocks"; right?: ReactNode }): JSX.Element {
  const activeStyle = { ...linkBase, color: "#4f2ed8", background: "#f1edff" };
  const idleStyle = { ...linkBase, color: "#64748b", background: "transparent" };

  return (
    <header
      style={{
        borderBottom: "1px solid #f1f5f9", padding: "0 40px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#ffffff", position: "sticky", top: 0, zIndex: 50,
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, oklch(0.72 0.16 55), oklch(0.55 0.22 285))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L12.196 4V10L7 13L1.804 10V4L7 1Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>Concorde</span>
        </div>
        <div style={{ width: 1, height: 16, background: "#e2e8f0", margin: "0 10px" }} />
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Voyager DS</span>
        <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 20 }}>
          <a href="/components" style={active === "components" ? activeStyle : idleStyle}>Componentes</a>
          <a href="/blocks" style={active === "blocks" ? activeStyle : idleStyle}>Bloques</a>
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {right}
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b", letterSpacing: "0.04em" }}>BETA</span>
      </div>
    </header>
  );
}
