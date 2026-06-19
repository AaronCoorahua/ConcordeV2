import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import SalaMobile, { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/SalaMobile/SalaMobile";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import Topbar from "@/app/blocks/_components/Topbar";

/**
 * /blocks/sala-mobile — Visor del bloque Sala · Mobile a tamaño real (420 × 844)
 * + Spec & Handoff (tema claro, igual que /blocks/sala).
 */

const BASE_URL = process.env.NEXT_PUBLIC_CONCORDE_URL ?? "https://concorde-v2-theta.vercel.app";

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

interface RequiredComponent {
  name: string;
  path: string;
  role: string;
}

const REQUIRED: RequiredComponent[] = [
  { name: "Signal", path: "/handoff/signal", role: "Indicador de conectividad (variante «white») en el header" },
  { name: "SendBidIcon", path: "/handoff/sendbidicon", role: "Flecha de las pills glass (vía StatPill «glass»)" },
  { name: "BidProposalV2", path: "/handoff/bidproposalv2", role: "Propuesta de bid actual (glass) arriba del chat" },
  { name: "ProgressBar", path: "/handoff/progressbar", role: "Barra de tiempo de bid (variante «rainbow», horizontal) al fondo del panel" },
  { name: "Button", path: "/handoff/button", role: "CTA primary «US$ 7,000» (320×48) abajo del todo" },
];

const FILES: { filename: string; code: string; note: string }[] = [
  { filename: "src/blocks/SalaMobile/SalaMobile.tsx", code: readSrc("src/blocks/SalaMobile/SalaMobile.tsx"), note: "Lienzo 420×844 (gradiente morado #5F3ED8→#340091→#140046). Monta el MobileHeader arriba, el panel glass del chat pegado debajo y el CTA primary «US$ 7,000» abajo del todo." },
  { filename: "src/blocks/SalaMobile/MobileHeader.tsx", code: readSrc("src/blocks/SalaMobile/MobileHeader.tsx"), note: "Header 420×95 · dos bloques cuadrados (sin redondeo): tarjeta sala 310×95 (gradiente naranja→morado, borde gradiente, título + Signal white + vendedor + pills) y carro 110×95 con placa glass. Pills y placa comparten una sola fila flex para alinearse exacto." },
  { filename: "src/blocks/SalaMobile/MobileChatPanel.tsx", code: readSrc("src/blocks/SalaMobile/MobileChatPanel.tsx"), note: "Panel glass 420×670 (white 8% + blur, top cuadrado / abajo redondeado 16, borde gradiente vía máscara). BidProposalV2 arriba al centro y ProgressBar «rainbow» pegada al fondo." },
  { filename: "src/blocks/Sala/StatPill.tsx", code: readSrc("src/blocks/Sala/StatPill.tsx"), note: "Pills del header. Variante «glass» 50×22 (glass real con borde gradiente vía máscara, ícono custom) usada en mobile; «bids»/«total» 156×47 en el Sala desktop." },
];

export default function SalaMobileBlockPage(): JSX.Element {
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

      {/* Spec & Handoff */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 40px 80px" }}>
        {/* Añadir a tu proyecto */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Añadir a tu proyecto</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Un solo comando copia el bloque <strong>y sus componentes</strong> a la carpeta <code style={{ color: "#4f2ed8" }}>concorde/</code> de tu proyecto (imports relativos, sin tocar tu config):
        </p>
        <CodeViewer
          code={`npx @subastop/concorde@latest add salamobile`}
          filename="terminal"
          note={`Por URL: npx @subastop/concorde@latest add ${BASE_URL}/r/salamobile.json · Cae en concorde/components/ y concorde/blocks/.`}
        />

        {/* Componentes requeridos */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Componentes requeridos</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Este bloque se compone con estos componentes de Concorde:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12, marginBottom: 36 }}>
          {REQUIRED.map(function renderDep(d) {
            return (
              <a
                key={d.name}
                href={d.path}
                style={{ display: "block", textDecoration: "none", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <code style={{ fontSize: 13, fontWeight: 700, color: "#4f2ed8", fontFamily: "var(--vmc-font-mono, monospace)" }}>{d.name}</code>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>handoff →</span>
                </div>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: "6px 0 0" }}>{d.role}</p>
              </a>
            );
          })}
        </div>

        {/* Código del bloque */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Código del bloque</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Lienzo del bloque + cada sección. Copia tal cual junto con los componentes de arriba.
        </p>
        {FILES.map(function renderFile(f) {
          return <CodeViewer key={f.filename} code={f.code} filename={f.filename} note={f.note} />;
        })}
      </section>
    </div>
  );
}
