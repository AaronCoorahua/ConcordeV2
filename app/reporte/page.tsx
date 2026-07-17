"use client";

import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { REPORT_ENTRIES } from "./reportData";

/**
 * /reporte — Catálogo de issues Original ↔ Concorde.
 * Solo lista los issues; cada uno enlaza a su propia página de detalle /reporte/{slug}.
 */

export default function ReportePage(): JSX.Element {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header active="reporte" />

      <main style={{ flex: 1, width: "100%", maxWidth: 900, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4f2ed8",
              background: "#f1edff",
              padding: "4px 12px",
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            Bitácora
          </span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            Catálogo de issues
          </h1>
          <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.6, margin: "16px 0 0", maxWidth: 620 }}>
            Correcciones entre <strong style={{ color: "#0f172a" }}>Producción</strong> y su implementación en{" "}
            <strong style={{ color: "#0f172a" }}>Concorde</strong>. Haz click en un issue para ver el detalle.
          </p>
        </div>

        {/* Estado vacío */}
        {REPORT_ENTRIES.length === 0 ? (
          <div
            style={{
              border: "2px dashed #e2e8f0",
              borderRadius: 16,
              padding: "64px 24px",
              textAlign: "center",
              background: "#ffffff",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "#0f172a" }}>Aún no hay issues registrados</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "8px 0 0" }}>
              Envía la imagen de Producción, la de Concorde, la explicación y el código para crear el primer issue.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 8,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            }}
          >
            <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", letterSpacing: "0.02em" }}>Issues</span>
              <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{REPORT_ENTRIES.length} total</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {REPORT_ENTRIES.map((entry, i) => (
                <a
                  key={entry.slug}
                  href={`/reporte/${entry.slug}`}
                  className="issue-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "#f1edff",
                      color: "#4f2ed8",
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: "monospace",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#0f172a",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.title}
                    </span>
                    <span style={{ fontSize: 12.5, color: "#94a3b8" }}>{entry.date}</span>
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "#cbd5e1" }} aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`.issue-row { transition: background 0.12s; } .issue-row:hover { background: #f8fafc; }`}</style>
    </div>
  );
}
