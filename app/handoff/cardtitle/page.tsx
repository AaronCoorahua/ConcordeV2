/**
 * /handoff/cardtitle
 * Generado por Concorde — NO EDITAR (regenerar con /concorde CardTitle)
 */

import type { CSSProperties, JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CardTitle from "@/src/components/CardTitle/CardTitle";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CardTitle/CardTitle.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CardTitle.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./CardTitle";
export type { CardTitleProps } from "./CardTitle";
`;

export default function CardTitleHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "CardTitle",
    description: "Título de sección con subtítulo y brackets naranjas en esquina superior-izquierda y inferior-derecha. Estático, self-contained.",
    source: "Figma VOYAGER · \"Title\" (nodo 2877:280)",
    files: [
      {
        filename: "CardTitle.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, SVG inline, zero deps).",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      `import CardTitle from "@/src/components/CardTitle/CardTitle";`,
      `import CardTitle from "@/src/components/CardTitle";`,
    ],
    usage: `// Default
<CardTitle />

// Custom
<CardTitle title="SANTANDER CONSUMER" subtitle="10 Ofertas" />`,
    htmlTree: `div.cardtitle
├── svg.cardtitle__bracket--tl   (bracket ┌, gradiente naranja)
├── h3.cardtitle__title          {title}
├── p.cardtitle__subtitle        {subtitle}
└── svg.cardtitle__bracket--br   (bracket ┘, rotate 180°)`,
    props: [
      { prop: "title", type: "string", def: `"SANTANDER CONSUMER"`, note: "Título principal (h3)" },
      { prop: "subtitle", type: "string", def: `"10 Ofertas"`, note: "Subtítulo (p)" },
      { prop: "className", type: "string", def: `""`, note: "Clases extra sobre .cardtitle" },
    ],
    tokens: [
      { zone: "Título (h3)", token: "#3b1782" },
      { zone: "Subtítulo (p)", token: "#191c1c" },
      { zone: "Bracket — stop 0%", token: "#FF9639" },
      { zone: "Bracket — stop 40%", token: "#EF852E" },
      { zone: "Bracket — stop 100%", token: "#BE3D00" },
      { zone: "Fuente display", token: "var(--vmc-font-display, \"Plus Jakarta Sans\", …)" },
    ],
    qa: [
      "Bracket superior-izquierdo (┌) y bracket inferior-derecho (┘) visibles en las esquinas.",
      "Gradiente naranja de los brackets va de #FF9639 → #EF852E (40%) → #BE3D00.",
      "Título en mayúsculas, color #3b1782, peso 700, sin wrap (white-space: nowrap).",
      "Subtítulo color #191c1c, peso 400, con 3px de separación bajo el título.",
      "Cada instancia genera un useId único: los gradientes SVG no colisionan al renderizar varios CardTitle.",
      "El estilo se inyecta una sola vez (STYLE_ID) y hay <style> SSR para evitar flash de hidratación.",
      "Props title/subtitle se reflejan correctamente; className extra se concatena sin romper .cardtitle.",
      "Render sin layout shift: el componente es inline-block con padding 8px 16px.",
    ],
    sourcePath: "src/components/CardTitle/CardTitle.tsx",
  };

  const previewWrap: CSSProperties = {
    marginBottom: 16,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  };
  const previewHead: CSSProperties = {
    padding: "8px 14px",
    background: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const previewHeadLabel: CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#64748b",
  };
  const previewHeadNote: CSSProperties = {
    fontSize: 10,
    color: "#94a3b8",
    fontFamily: "monospace",
  };
  const previewStage: CSSProperties = {
    padding: "40px 24px",
    background: "#fff",
    display: "flex",
    flexWrap: "wrap",
    gap: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>CardTitle</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — título de sección con subtítulo y brackets naranjas, extraído de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · &quot;Title&quot; (2877:280)
          </code>
        </p>
      </div>

      {/* Preview — default */}
      <div style={previewWrap}>
        <div style={previewHead}>
          <span style={previewHeadLabel}>preview · default</span>
          <span style={previewHeadNote}>SANTANDER CONSUMER · 10 Ofertas</span>
        </div>
        <div style={previewStage}>
          <CardTitle />
        </div>
      </div>

      {/* Preview — custom */}
      <div style={{ ...previewWrap, marginBottom: 24 }}>
        <div style={previewHead}>
          <span style={previewHeadLabel}>preview · custom title / subtitle</span>
          <span style={previewHeadNote}>title · subtitle</span>
        </div>
        <div style={previewStage}>
          <CardTitle title="MAR. 09 JUN." subtitle="12 Ofertas" />
          <CardTitle title="MIS FAVORITOS" subtitle="3 guardadas" />
          <CardTitle title="OFERTAS DESTACADAS" subtitle="Hoy" />
        </div>
      </div>

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="CardTitle.tsx"
        note="Visual de Figma + brackets SVG de Concorde. Pégalo como src/components/CardTitle/CardTitle.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
