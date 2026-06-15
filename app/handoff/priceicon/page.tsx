/**
 * /handoff/priceicon
 * Generado por Concorde — NO EDITAR (regenerar con /concorde PriceIcon)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import PriceIcon from "@/src/components/PriceIcon/PriceIcon";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/PriceIcon/PriceIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer PriceIcon.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./PriceIcon";
export type { PriceIconProps, PriceIconSize, PriceIconState } from "./PriceIcon";
`;

const USAGE = `import PriceIcon from "@/components/PriceIcon/PriceIcon";

// Gema de subasta (default)
<PriceIcon size="md" state="default" />

// Small + expirada (gris) / Skeleton (loading)
<PriceIcon size="sm" state="expirada" />
<PriceIcon size="md" state="skeleton" />`;

export default function PriceIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "PriceIcon",
    description: "Gema/moneda de subasta con pin de diamante. Gradiente teal→vault. Ícono estático, no interactivo.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "PriceIcon.tsx",
        code: source,
        level: "must",
        desc: "Componente principal — SVG inline, self-contained, useId para ids únicos.",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import PriceIcon from "@/src/components/PriceIcon/PriceIcon";',
      'import PriceIcon from "@/src/components/PriceIcon";',
    ],
    usage: USAGE,
    props: [
      { prop: "size", type: '"sm" | "md"', def: '"md"', note: "sm 24px · md 36×38px" },
      { prop: "state", type: '"default" | "expirada" | "skeleton"', def: '"default"', note: "Visual de la gema" },
      { prop: "title", type: "string", def: '"Precio"', note: "Texto accesible (aria-label)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .priceicon" },
    ],
    variants: [
      { name: "default", size: "sm 24px · md 36×38", note: "Gema con gradiente + medallón $" },
      { name: "expirada", size: "sm 24px · md 28×32", note: "Gris #E1E3E2, sin gradiente" },
      { name: "skeleton", size: "sm 20px · md 24px", note: "Círculo gris loading" },
    ],
    states: undefined,
    tokens: [
      { zone: "Gema (fill)", token: "#00ABAD → #86A4E4 → #4C1EBC → #31008A" },
      { zone: "Gema (borde)", token: "#44D6D6 → #567CD3 → #3D0D9E" },
      { zone: "Expirada / skeleton", token: "#E1E3E2" },
      { zone: "Medallón $", token: "white @ opacity 0.92" },
    ],
    qa: [
      "Render size=sm (24px) y size=md (36×38) sin recortes ni overflow.",
      "Estado default muestra gradiente teal→vault + medallón $.",
      "Estado expirada se ve gris (#E1E3E2) sin gradiente.",
      "Estado skeleton muestra círculo gris (20/24px).",
      "Ids de gradientes/filtros son únicos por instancia (useId) — sin colisión al renderizar varios.",
      "role=img y aria-label (title) presentes para accesibilidad.",
      "Funciona sobre fondo claro y oscuro sin pérdida de contraste.",
    ],
    sourcePath: "src/components/PriceIcon/PriceIcon.tsx",
  };

  const previewBg = "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>PriceIcon</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — gema/moneda de subasta con pin de diamante, gradiente teal→vault. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · PriceIcon
          </code>
        </p>
      </div>

      {/* Preview — size sm + md, estados default/expirada/skeleton */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · md</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>default · expirada · skeleton</span>
        </div>
        <div style={{ padding: "32px 24px", background: previewBg, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <PriceIcon size="md" state="default" />
          <PriceIcon size="md" state="expirada" />
          <PriceIcon size="md" state="skeleton" />
        </div>
      </div>

      {/* Preview — sm */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · sm</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>default · expirada · skeleton</span>
        </div>
        <div style={{ padding: "24px", background: previewBg, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <PriceIcon size="sm" state="default" />
          <PriceIcon size="sm" state="expirada" />
          <PriceIcon size="sm" state="skeleton" />
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
        filename="PriceIcon.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/PriceIcon/PriceIcon.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
