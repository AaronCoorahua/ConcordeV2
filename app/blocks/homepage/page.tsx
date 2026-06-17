import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/Homepage/Homepage";
import CodeViewer from "@/app/handoff/_components/CodeViewer";

/**
 * /blocks/homepage — Visor del bloque Homepage a tamaño real (798 × 1104)
 * + Spec & Handoff: componentes requeridos (estilo shadcn) y código del bloque.
 */

// Server component: lee el código fuente REAL del bloque y sus secciones.
function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

// Base del registry (dominio de deploy).
const BASE_URL = process.env.NEXT_PUBLIC_CONCORDE_URL ?? "https://concorde-v2-theta.vercel.app";

interface RequiredComponent {
  name: string;
  path: string;
  role: string;
}

// Componentes Concorde que este bloque necesita (instálalos/cópialos primero).
const REQUIRED: RequiredComponent[] = [
  { name: "CardTitle", path: "/handoff/cardtitle", role: "Títulos de sección con corchetes (TIPO DE OFERTA, SANTANDER…)" },
  { name: "OfferCard", path: "/handoff/offercard", role: "Cards de oferta del subastador (imagen + precio + like)" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Pills de estado EN VIVO / PRÓXIMA sobre las cards" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "CTA «Ir al Perfil»" },
  { name: "OfferType", path: "/handoff/offertype", role: "NEGOCIABLE / EN VIVO + «VER TODAS»" },
  { name: "CategoryCard", path: "/handoff/categorycard", role: "Categorías (vehicular, maquinaria, equipos, artículos)" },
];

const FILES: { filename: string; code: string; note: string }[] = [
  { filename: "src/blocks/Homepage/Homepage.tsx", code: readSrc("src/blocks/Homepage/Homepage.tsx"), note: "Lienzo 798×1104 que posiciona cada sección (16px de separación) sobre el banner." },
  { filename: "src/blocks/Homepage/CategoriesSection.tsx", code: readSrc("src/blocks/Homepage/CategoriesSection.tsx"), note: "Card 766×184 · 2 columnas: TIPO DE OFERTA (OfferType ×2) + CATEGORÍAS (CategoryCard ×4)." },
  { filename: "src/blocks/Homepage/AuctioneerSection.tsx", code: readSrc("src/blocks/Homepage/AuctioneerSection.tsx"), note: "Card 766×352 · CardTitle + ProfileButton + 4 OfferCard con BadgeStatus." },
];

export default function HomepageBlockPage(): JSX.Element {
  const link = { fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "6px 12px", borderRadius: 8, letterSpacing: "0.01em" } as const;

  return (
    <div style={{ minHeight: "100vh", background: "#0b1020", color: "#e2e8f0", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      {/* Top bar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0b1020" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #8460E5, #3B1782)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L12.196 4V10L7 13L1.804 10V4L7 1Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>Concorde</span>
          </div>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.12)", margin: "0 14px" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Voyager DS</span>
          <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 20 }}>
            <a href="/components" style={{ ...link, color: "rgba(255,255,255,0.55)", background: "transparent" }}>Componentes</a>
            <a href="/blocks" style={{ ...link, color: "#fff", background: "rgba(132,96,229,0.25)" }}>Bloques</a>
          </nav>
        </div>
        <a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#c4b5fd", textDecoration: "none" }}>← Bloques</a>
      </header>

      {/* Title */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 32px 0", display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>Homepage</h1>
        <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{HOMEPAGE_WIDTH} × {HOMEPAGE_HEIGHT}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#c4b5fd", border: "1px solid rgba(196,181,253,0.3)", borderRadius: 999, padding: "2px 8px", marginLeft: 4 }}>BLOQUE · WIP</span>
      </div>

      {/* Canvas a tamaño real */}
      <main style={{ display: "flex", justifyContent: "center", padding: "32px", overflowX: "auto" }}>
        <div style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35)", outline: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
          <Homepage />
        </div>
      </main>

      {/* Spec & Handoff */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 32px 80px" }}>
        {/* Añadir a tu proyecto (estilo shadcn) */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>Añadir a tu proyecto</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>
          Un solo comando copia el bloque <strong>y sus 6 componentes</strong> a la carpeta <code style={{ color: "#c4b5fd" }}>concorde/</code> de tu proyecto (imports relativos, sin tocar tu config):
        </p>
        <CodeViewer
          code={`npx @subastop/concorde@latest add homepage`}
          filename="terminal"
          note={`Suelto: npx @subastop/concorde@latest add cardtitle offercard · o por URL: npx @subastop/concorde@latest add ${BASE_URL}/r/homepage.json · Cae en concorde/components/ y concorde/blocks/.`}
        />

        {/* Componentes requeridos (estilo shadcn) */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>Componentes requeridos</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>
          Este bloque se compone con estos componentes de Concorde. Instálalos/cópialos primero (igual que shadcn):
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12, marginBottom: 36 }}>
          {REQUIRED.map(function renderDep(d) {
            return (
              <a
                key={d.name}
                href={d.path}
                style={{
                  display: "block", textDecoration: "none",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "14px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <code style={{ fontSize: 13, fontWeight: 700, color: "#c4b5fd", fontFamily: "var(--vmc-font-mono, monospace)" }}>{d.name}</code>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>handoff →</span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, margin: "6px 0 0" }}>{d.role}</p>
              </a>
            );
          })}
        </div>

        {/* Código del bloque */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>Código del bloque</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>
          Lienzo del bloque + cada sección. Copia tal cual junto con los componentes de arriba.
        </p>
        {FILES.map(function renderFile(f) {
          return <CodeViewer key={f.filename} code={f.code} filename={f.filename} note={f.note} />;
        })}
      </section>
    </div>
  );
}
