import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/Homepage/Homepage";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import Topbar from "@/app/blocks/_components/Topbar";

/**
 * /blocks/homepage — Visor del bloque Homepage a tamaño real (798 × 1104)
 * + Spec & Handoff (tema claro, igual que /components).
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
  { name: "CardTitle", path: "/handoff/cardtitle", role: "Títulos de sección con corchetes (TIPO DE OFERTA, SANTANDER…)" },
  { name: "OfferCard", path: "/handoff/offercard", role: "Cards de oferta del subastador (imagen + precio + like)" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Pills de estado EN VIVO / PRÓXIMA sobre las cards" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "CTA «Ir al Perfil»" },
  { name: "OfferType", path: "/handoff/offertype", role: "NEGOCIABLE / EN VIVO + «VER TODAS»" },
  { name: "CategoryCard", path: "/handoff/categorycard", role: "Categorías (vehicular, maquinaria, equipos, artículos)" },
];

const FILES: { filename: string; code: string; note: string }[] = [
  { filename: "src/blocks/Homepage/Homepage.tsx", code: readSrc("src/blocks/Homepage/Homepage.tsx"), note: "Lienzo 798×1104 que posiciona cada sección (16px de separación)." },
  { filename: "src/blocks/Homepage/CategoriesSection.tsx", code: readSrc("src/blocks/Homepage/CategoriesSection.tsx"), note: "Card 766×184 · 2 columnas: TIPO DE OFERTA (OfferType ×2) + CATEGORÍAS (CategoryCard ×4)." },
  { filename: "src/blocks/Homepage/AuctioneerSection.tsx", code: readSrc("src/blocks/Homepage/AuctioneerSection.tsx"), note: "Card 766×352 · CardTitle + ProfileButton + 4 OfferCard con BadgeStatus." },
];

export default function HomepageBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Topbar active="blocks" right={<a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#4f2ed8", textDecoration: "none" }}>← Bloques</a>} />

      {/* Title */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 40px 0", display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Homepage</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>{HOMEPAGE_WIDTH} × {HOMEPAGE_HEIGHT}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4f2ed8", background: "#f1edff", borderRadius: 999, padding: "2px 8px", marginLeft: 4 }}>BLOQUE · WIP</span>
      </div>

      {/* Canvas a tamaño real sobre panel claro */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px 40px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32, overflowX: "auto" }}>
          <div style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", width: HOMEPAGE_WIDTH, margin: "0 auto" }}>
            <Homepage />
          </div>
        </div>
      </main>

      {/* Spec & Handoff */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 40px 80px" }}>
        {/* Añadir a tu proyecto */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Añadir a tu proyecto</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Un solo comando copia el bloque <strong>y sus 6 componentes</strong> a la carpeta <code style={{ color: "#4f2ed8" }}>concorde/</code> de tu proyecto (imports relativos, sin tocar tu config):
        </p>
        <CodeViewer
          code={`npx @subastop/concorde@latest add homepage`}
          filename="terminal"
          note={`Suelto: npx @subastop/concorde@latest add cardtitle offercard · o por URL: npx @subastop/concorde@latest add ${BASE_URL}/r/homepage.json · Cae en concorde/components/ y concorde/blocks/.`}
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
