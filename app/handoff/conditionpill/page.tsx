/**
 * /handoff/conditionpill
 * Generado por Concorde — NO EDITAR (regenerar con /concorde ConditionPill)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ConditionPill from "@/src/components/ConditionPill/ConditionPill";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ConditionPill/ConditionPill.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ConditionPill.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./ConditionPill";
export type { ConditionPillProps } from "./ConditionPill";
`;

const USAGE = `import ConditionPill from "@/components/ConditionPill/ConditionPill";

// Texto editable (children)
<ConditionPill>Conoce más</ConditionPill>
<ConditionPill>En negociación</ConditionPill>

// Con clases extra sobre .pcondpill
<ConditionPill className="mi-clase">Subasta activa</ConditionPill>`;

export default function ConditionPillHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "ConditionPill",
    description: "Píldora lila con relleno y borde gradiente, sheen y sombra; texto blanco editable. Estático, no interactivo.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "ConditionPill.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, gradient-border, zero deps)",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import ConditionPill from "@/src/components/ConditionPill/ConditionPill";',
      'import ConditionPill from "@/src/components/ConditionPill";',
    ],
    usage: USAGE,
    props: [
      { prop: "children", type: "ReactNode", def: '"Etiqueta"', note: "Texto dentro de la píldora (editable)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pcondpill" },
    ],
    variants: undefined,
    states: undefined,
    tokens: [
      { zone: "Relleno", token: "#AE8EFF → #5A35C2" },
      { zone: "Borde (gradiente)", token: "#CFBAFF → white → #AE8EFF → #CFBAFF" },
      { zone: "Sheen superior", token: "white @ opacity 0.17" },
      { zone: "Sombra", token: "rgba(153,161,175,0.3) 0px 4px 6px" },
      { zone: "Inner highlight", token: "white @ opacity 0.15" },
      { zone: "Texto", token: "#ffffff" },
      { zone: "Text-shadow", token: "rgba(0,0,0,0.25) 0px 1px 3px" },
    ],
    qa: [
      "Render con texto editable (children) — se muestra el contenido pasado.",
      "Relleno con gradiente lila (#AE8EFF → #5A35C2).",
      "Borde gradiente visible (#CFBAFF → white → #AE8EFF → #CFBAFF).",
      "Sheen blanco en la zona superior de la píldora.",
      "Sombra externa gris perceptible bajo la píldora.",
      "Texto blanco centrado vertical y horizontalmente.",
      "El ancho se ajusta al contenido (inline-flex).",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/ConditionPill/ConditionPill.tsx",
  };

  const previewBgDark = "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";
  const previewBgLight = "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>ConditionPill</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — píldora lila con relleno y borde gradiente, sheen y sombra; texto blanco editable. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · ConditionPill
          </code>
        </p>
      </div>

      {/* Preview — fondo oscuro */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo oscuro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>texto editable</span>
        </div>
        <div style={{ padding: "32px 24px", background: previewBgDark, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "center" }}>
          <ConditionPill>Conoce más</ConditionPill>
          <ConditionPill>En negociación</ConditionPill>
          <ConditionPill>Subasta activa</ConditionPill>
        </div>
      </div>

      {/* Preview — fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo claro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>texto editable</span>
        </div>
        <div style={{ padding: "32px 24px", background: previewBgLight, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "center" }}>
          <ConditionPill>Conoce más</ConditionPill>
          <ConditionPill>En negociación</ConditionPill>
          <ConditionPill>Subasta activa</ConditionPill>
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
        filename="ConditionPill.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/ConditionPill/ConditionPill.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
