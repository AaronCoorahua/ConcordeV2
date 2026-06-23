"use client";

/**
 * SalaViewer — visor client del bloque Sala (desktop).
 * Panel de selección del efecto de luz del bid actual (colores + tipo de efecto),
 * igual que en Sala · Mobile, que controla `<Sala flashColors flashMode />`.
 */

import { useState } from "react";
import type { JSX } from "react";
import Sala, { SALA_WIDTH, SALA_HEIGHT } from "@/src/blocks/Sala/Sala";

// Paletas del efecto de luz (editable vía `flashColors`)
const PALETTES: { name: string; colors: string[] }[] = [
  { name: "Primary", colors: ["#F4AC59", "#8460E5", "#ffffff"] },
  { name: "Rainbow", colors: ["#F2CCFF", "#CC00FF", "#FF0066"] },
  { name: "Lila", colors: ["#CFBAFF", "#AE8EFF", "#ffffff"] },
];

// Tipo de efecto de luz (editable vía `flashMode`)
const EFFECTS: { name: string; value: "bulb" | "spin" }[] = [
  { name: "💡 Bombilla", value: "bulb" },
  { name: "🌀 Gira", value: "spin" },
];

export default function SalaViewer(): JSX.Element {
  const [pal, setPal] = useState(0);
  const [mode, setMode] = useState<"bulb" | "spin">("bulb");

  return (
    <>
      {/* Title + selectores */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 40px 0", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Sala</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>
          {SALA_WIDTH} × {SALA_HEIGHT}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px" }}>
          BLOQUE · WIP
        </span>

        {/* Selector de paleta */}
        <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginLeft: 4 }}>Luz:</span>
        {PALETTES.map(function renderPal(p, i) {
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => setPal(i)}
              title={p.name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 28,
                padding: "0 10px",
                borderRadius: 14,
                border: pal === i ? "2px solid #4f2ed8" : "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#0f172a",
                fontFamily: "inherit",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: `conic-gradient(${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]}, ${p.colors[0]})`,
                }}
              />
              {p.name}
            </button>
          );
        })}

        {/* Selector de tipo de efecto */}
        <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginLeft: 4 }}>Efecto:</span>
        {EFFECTS.map(function renderEffect(e) {
          return (
            <button
              key={e.value}
              type="button"
              onClick={() => setMode(e.value)}
              style={{
                height: 28,
                padding: "0 12px",
                borderRadius: 14,
                border: mode === e.value ? "2px solid #4f2ed8" : "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#0f172a",
                fontFamily: "inherit",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {e.name}
            </button>
          );
        })}
      </div>

      {/* Canvas a tamaño real sobre panel claro */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px 40px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32, overflow: "auto", maxWidth: "100%" }}>
          <div style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", width: SALA_WIDTH }}>
            <Sala flashColors={PALETTES[pal].colors} flashMode={mode} />
          </div>
        </div>
      </main>
    </>
  );
}
