/**
 * /handoff/signal
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Signal)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Signal from "@/src/components/Signal/Signal";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Signal/Signal.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Signal.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./Signal";
export type { SignalProps } from "./Signal";
`;

const USAGE = `import Signal from "@/components/Signal/Signal";

// Default — 4 barras activas, width 28
<Signal />

// Nivel explícito (0-5 barras activas)
<Signal level={3} />

// Nivel + ancho personalizado
<Signal level={5} width={40} />

// Accesible (role=img + título)
<Signal title="Señal 4 de 5" />`;

export default function SignalHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "Signal",
    description:
      "Indicador de señal: 5 barras crecientes (rx1); activas con gradiente naranja (#FF9639→#EF852E→#BE3D00), inactivas blanco 20%. `level` (0-5) controla cuántas están activas. Copia exacta del SVG. Pensado para fondo oscuro.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "Signal.tsx",
        code: source,
        level: "must",
        desc: "Icono SVG self-contained · gradiente objectBoundingBox por barra · useId · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import Signal from "@/src/components/Signal/Signal";',
      'import Signal from "@/src/components/Signal";',
    ],
    usage: USAGE,
    props: [
      { prop: "level", type: "number", def: "4", note: "0-5 barras activas" },
      { prop: "width", type: "number", def: "28", note: "Ancho en px (alto = width × 16/28)" },
      { prop: "title", type: "string", def: "—", note: "Texto accesible. Si se omite, es decorativo (aria-hidden)." },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre el <svg>" },
    ],
    variants: [
      {
        name: "5 barras crecientes",
        size: "viewBox 0 0 28 16",
        note: "Activas naranja (gradiente), inactivas blanco 20%",
      },
    ],
    states: undefined,
    tokens: [
      { zone: "Barras activas", token: "#FF9639 → #EF852E → #BE3D00" },
      { zone: "Barras inactivas", token: "rgba(255,255,255,0.2)" },
      { zone: "Geometría", token: "viewBox 0 0 28 16 · rx 1" },
    ],
    qa: [
      "level 0..5 colorea exactamente N barras activas (resto blanco 20%).",
      "Distintos width (28/36/48) mantienen la proporción (alto = width × 16/28).",
      "Gradiente vertical por barra (objectBoundingBox) se ve naranja arriba → marrón abajo.",
      "useId genera ids de gradiente únicos por instancia — sin colisión al renderizar varios.",
      "Con title → role=img y <title> accesible presente.",
      "Sin title → aria-hidden=true (decorativo).",
      "Las barras inactivas (blanco 20%) son visibles sobre fondo oscuro.",
    ],
    sourcePath: "src/components/Signal/Signal.tsx",
  };

  const previewBg = "#2F2173";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Signal</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — indicador de señal de 5 barras crecientes; <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>level</code> (0-5) controla cuántas se iluminan en naranja.
        </p>
      </div>

      {/* Preview — fondo OSCURO (las barras inactivas son blanco 20%) */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · level</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>5 · 4 · 3 · 2 · 0</span>
        </div>
        <div style={{ padding: "40px 24px", background: previewBg, borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 36, alignItems: "flex-end", justifyContent: "center" }}>
          <Signal level={5} title="Señal 5 de 5" />
          <Signal level={4} title="Señal 4 de 5" />
          <Signal level={3} title="Señal 3 de 5" />
          <Signal level={2} title="Señal 2 de 5" />
          <Signal level={0} title="Sin señal" />
        </div>
      </div>

      {/* Preview — distintos width */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · width</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>28 · 36 · 48</span>
        </div>
        <div style={{ padding: "40px 24px", background: previewBg, borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 36, alignItems: "flex-end", justifyContent: "center" }}>
          <Signal level={4} width={28} />
          <Signal level={4} width={36} />
          <Signal level={4} width={48} />
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
        filename="Signal.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/Signal/Signal.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
