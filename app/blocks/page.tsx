import type { JSX, ReactNode } from "react";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/Homepage/Homepage";
import Detalle, { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/Detalle/Detalle";
import Sala, { SALA_WIDTH, SALA_HEIGHT } from "@/src/blocks/Sala/Sala";
import SalaMobile, { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/SalaMobile/SalaMobile";
import Topbar from "@/app/blocks/_components/Topbar";

/**
 * /blocks — Catálogo de Bloques (tema claro, igual que /components).
 */

interface BlockEntry {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  node: ReactNode;
}

const BLOCKS: BlockEntry[] = [
  {
    id: "homepage",
    name: "Homepage",
    description: "Página de inicio: banners, sección de subastador y categorías. Montada con componentes Concorde.",
    width: HOMEPAGE_WIDTH,
    height: HOMEPAGE_HEIGHT,
    node: <Homepage />,
  },
  {
    id: "detalle",
    name: "Detalle",
    description: "Página de detalle. Lienzo base (fondo blanco) — iremos montando las secciones.",
    width: DETALLE_WIDTH,
    height: DETALLE_HEIGHT,
    node: <Detalle />,
  },
  {
    id: "sala",
    name: "Sala",
    description: "Sala de subasta. Lienzo base (fondo #2E0F70) — iremos montando las secciones.",
    width: SALA_WIDTH,
    height: SALA_HEIGHT,
    node: <Sala />,
  },
  {
    id: "sala-mobile",
    name: "Sala · Mobile",
    description: "Sala de subasta · versión mobile. Lienzo base (gradiente morado #5F3ED8→#140046) — iremos montando las secciones.",
    width: SALAMOBILE_WIDTH,
    height: SALAMOBILE_HEIGHT,
    node: <SalaMobile />,
  },
];

const THUMB_H = 248;

export default function BlocksPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Topbar active="blocks" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Bloques</h1>
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>{BLOCKS.length} bloques</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {BLOCKS.map(function renderBlock(b) {
            const scale = Math.min((THUMB_H - 32) / b.height, 200 / b.width);
            return (
              <a key={b.id} href={`/blocks/${b.id}`} style={{ display: "block", textDecoration: "none", borderRadius: 14, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: b.width * scale, height: b.height * scale, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: b.width, height: b.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                      {b.node}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>{b.name}</h2>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px" }}>WIP</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: "8px 0 0" }}>{b.description}</p>
                  <span style={{ display: "inline-block", marginTop: 12, fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>{b.width} × {b.height}</span>
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}
