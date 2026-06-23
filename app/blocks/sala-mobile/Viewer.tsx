"use client";

/**
 * Viewer — visor client del bloque Sala · Mobile.
 *   · Botón "Ver live" (al lado del badge BLOQUE · WIP) → controla la animación.
 *   · Botón "Pantalla completa" → overlay que muestra SOLO el canvas escalado
 *     para caber en la pantalla (ideal para probar desde el celular).
 */

import { useState, useEffect } from "react";
import type { JSX, CSSProperties } from "react";
import SalaMobile, { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/SalaMobile/SalaMobile";

function LiveButton({ live, onClick }: { live: boolean; onClick: () => void }): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
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
  );
}

// Paletas del efecto de luz del bid actual (componente editable vía `flashColors`)
const PALETTES: { name: string; colors: string[] }[] = [
  { name: "Primary", colors: ["#F4AC59", "#8460E5", "#ffffff"] },
  { name: "Rainbow", colors: ["#F2CCFF", "#CC00FF", "#FF0066"] },
  { name: "Lila", colors: ["#CFBAFF", "#AE8EFF", "#ffffff"] },
];

// Tipo de efecto de luz (editable vía `flashMode`)
type FlashMode = "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
const EFFECTS: { name: string; value: FlashMode }[] = [
  { name: "💡 Bombilla", value: "bulb" },
  { name: "🌀 Gira", value: "spin" },
  { name: "💥 Estalla", value: "explode" },
  { name: "✨ Anticipa", value: "pulse" },
  { name: "🎆 Festejo", value: "combo" },
  { name: "🌟 Resplandor", value: "shine" },
];

const CHIP_BASE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 34,
  padding: "0 14px",
  borderRadius: 17,
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
} as const;
function chipStyle(active: boolean): CSSProperties {
  return {
    ...CHIP_BASE,
    border: active ? "2px solid #4f2ed8" : "1px solid #cbd5e1",
    background: active ? "#f1edff" : "#ffffff",
    color: active ? "#4f2ed8" : "#0f172a",
  };
}

export default function Viewer(): JSX.Element {
  const [live, setLive] = useState(false);
  const [fs, setFs] = useState(false);
  const [scale, setScale] = useState(1);
  const [pal, setPal] = useState(0);
  const [mode, setMode] = useState<FlashMode>("bulb");
  const flashColors = PALETTES[pal].colors;

  // Escala el canvas para caber en la pantalla (usa innerHeight real, no 100vh)
  useEffect(
    function fullscreen() {
      if (!fs) return;
      function compute(): void {
        const pad = 16;
        const s = Math.min((window.innerWidth - pad) / SALAMOBILE_WIDTH, (window.innerHeight - pad) / SALAMOBILE_HEIGHT);
        setScale(Math.min(s, 1.4));
      }
      compute();
      window.addEventListener("resize", compute);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("resize", compute);
        document.body.style.overflow = prev;
      };
    },
    [fs],
  );

  return (
    <>
      {/* Title + botones */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 40px 0", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Sala · Mobile</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>
          {SALAMOBILE_WIDTH} × {SALAMOBILE_HEIGHT}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px" }}>
          BLOQUE · WIP
        </span>
        <LiveButton live={live} onClick={() => setLive((v) => !v)} />
        <button
          type="button"
          onClick={() => setFs(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 30,
            padding: "0 16px",
            borderRadius: 15,
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            color: "#0f172a",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ⛶ Pantalla completa
        </button>

      </div>

      {/* Panel de controles del efecto de luz (visible, debajo del título) */}
      <div style={{ maxWidth: 1120, margin: "16px auto 0", padding: "0 40px", display: "flex", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "10px 14px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: "#64748b", marginRight: 2 }}>Luz</span>
          {PALETTES.map(function renderPal(p, i) {
            return (
              <button key={p.name} type="button" onClick={() => setPal(i)} title={p.name} style={chipStyle(pal === i)}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: `conic-gradient(${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]}, ${p.colors[0]})` }} />
                {p.name}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "10px 14px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: "#64748b", marginRight: 2 }}>Efecto</span>
          {EFFECTS.map(function renderEffect(e) {
            return (
              <button key={e.value} type="button" onClick={() => setMode(e.value)} style={chipStyle(mode === e.value)}>
                {e.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas a tamaño real sobre panel claro */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px 40px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32, overflow: "auto", maxWidth: "100%" }}>
          <div style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", width: SALAMOBILE_WIDTH }}>
            <SalaMobile live={live} flashColors={flashColors} flashMode={mode} />
          </div>
        </div>
      </main>

      {/* Overlay pantalla completa — solo el canvas, escalado para caber */}
      {fs ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0b0614",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ width: SALAMOBILE_WIDTH, height: SALAMOBILE_HEIGHT, transform: `scale(${scale})`, transformOrigin: "center", flexShrink: 0 }}>
            <SalaMobile live={live} flashColors={flashColors} flashMode={mode} />
          </div>

          {/* Controles flotantes */}
          <div style={{ position: "fixed", top: 12, left: 12, zIndex: 1 }}>
            <LiveButton live={live} onClick={() => setLive((v) => !v)} />
          </div>
          <button
            type="button"
            onClick={() => setFs(false)}
            aria-label="Cerrar pantalla completa"
            style={{
              position: "fixed",
              top: 12,
              right: 12,
              zIndex: 1,
              width: 36,
              height: 36,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.14)",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      ) : null}
    </>
  );
}
