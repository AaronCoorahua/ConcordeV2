import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Detalle, { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/Detalle/Detalle";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import Topbar from "@/app/blocks/_components/Topbar";

/**
 * /blocks/detalle — Visor del bloque Detalle a tamaño real (799 × 1483).
 */

const BASE_URL = process.env.NEXT_PUBLIC_CONCORDE_URL ?? "https://concorde-v2-theta.vercel.app";

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

export default function DetalleBlockPage(): JSX.Element {
  const source = readSrc("src/blocks/Detalle/Detalle.tsx");

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Topbar active="blocks" right={<a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#4f2ed8", textDecoration: "none" }}>← Bloques</a>} />

      {/* Title */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 40px 0", display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Detalle</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>{DETALLE_WIDTH} × {DETALLE_HEIGHT}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px", marginLeft: 4 }}>BLOQUE · WIP</span>
      </div>

      {/* Canvas a tamaño real sobre panel claro */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px 40px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32, overflowX: "auto" }}>
          <div style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", width: DETALLE_WIDTH, margin: "0 auto" }}>
            <Detalle />
          </div>
        </div>
      </main>

      {/* Spec & Handoff */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 40px 80px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Añadir a tu proyecto</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Copia el bloque a la carpeta <code style={{ color: "#4f2ed8" }}>concorde/</code> de tu proyecto:
        </p>
        <CodeViewer
          code={`npx @subastop/concorde@latest add detalle`}
          filename="terminal"
          note={`O por URL: npx @subastop/concorde@latest add ${BASE_URL}/r/detalle.json · Cae en concorde/blocks/Detalle/.`}
        />

        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Código del bloque</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Lienzo base del bloque (por ahora solo el fondo blanco — iremos montando las secciones).
        </p>
        <CodeViewer code={source} filename="src/blocks/Detalle/Detalle.tsx" note="Lienzo 799×1483." />
      </section>
    </div>
  );
}
