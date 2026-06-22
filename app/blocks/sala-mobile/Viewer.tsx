"use client";

/**
 * Viewer — visor client del bloque Sala · Mobile.
 * Tiene el estado `live` + el botón "Ver live" (al lado del badge BLOQUE · WIP)
 * que controla la animación de <SalaMobile live={live} />.
 */

import { useState } from "react";
import type { JSX } from "react";
import SalaMobile, { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/SalaMobile/SalaMobile";

export default function Viewer(): JSX.Element {
  const [live, setLive] = useState(false);

  return (
    <>
      {/* Title + botón "Ver live" al lado del badge */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 40px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Sala · Mobile</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>
          {SALAMOBILE_WIDTH} × {SALAMOBILE_HEIGHT}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px" }}>
          BLOQUE · WIP
        </span>
        <button
          type="button"
          onClick={() => setLive((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 30,
            padding: "0 16px",
            borderRadius: 15,
            border: "none",
            background: live ? "#FF0066" : "linear-gradient(120deg, #5F3ED8 0%, #340091 100%)",
            color: "#ffffff",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.02em",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(20,0,69,0.25)",
          }}
        >
          {live ? "■ Detener" : "▶ Ver live"}
        </button>
      </div>

      {/* Canvas a tamaño real sobre panel claro */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px 40px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32, overflow: "auto", maxWidth: "100%" }}>
          <div style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", width: SALAMOBILE_WIDTH }}>
            <SalaMobile live={live} />
          </div>
        </div>
      </main>
    </>
  );
}
