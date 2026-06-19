import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import SalaMobile, { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/SalaMobile/SalaMobile";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import Topbar from "@/app/blocks/_components/Topbar";

/**
 * /blocks/sala-mobile — Visor del bloque Sala (mobile) a tamaño real (420 × 844).
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

export default function SalaMobileBlockPage(): JSX.Element {
  const source = readSrc("src/blocks/SalaMobile/SalaMobile.tsx");

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Topbar active="blocks" right={<a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#4f2ed8", textDecoration: "none" }}>← Bloques</a>} />

      {/* Title */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 40px 0", display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Sala · Mobile</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>{SALAMOBILE_WIDTH} × {SALAMOBILE_HEIGHT}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px", marginLeft: 4 }}>BLOQUE · WIP</span>
      </div>

      {/* Canvas a tamaño real sobre panel claro */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px 40px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32, overflow: "auto", maxWidth: "100%" }}>
          <div style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", width: SALAMOBILE_WIDTH }}>
            <SalaMobile />
          </div>
        </div>
      </main>

      {/* Código del bloque */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 40px 80px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Código del bloque</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Lienzo base del bloque (por ahora solo el fondo · gradiente morado #5F3ED8→#140046 — iremos montando las secciones).
        </p>
        <CodeViewer code={source} filename="src/blocks/SalaMobile/SalaMobile.tsx" note="Lienzo 420×844." />
      </section>
    </div>
  );
}
