/**
 * /handoff/checkicon
 * Generado por Concorde — NO EDITAR (regenerar con /concorde CheckIcon)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CheckIcon from "@/src/components/CheckIcon/CheckIcon";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CheckIcon/CheckIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CheckIcon.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./CheckIcon";
export type { CheckIconProps } from "./CheckIcon";
`;

const USAGE = `import CheckIcon from "@/components/CheckIcon/CheckIcon";

// Default (20px) · alias sm (16px) · número arbitrario
<CheckIcon />
<CheckIcon size="sm" />
<CheckIcon size={40} />

// Con texto accesible (role=img + aria-label) en una celda de tabla
<td>
  <CheckIcon title="Verificado" />
</td>`;

export default function CheckIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "CheckIcon",
    description:
      "Icono de check: círculo con gradiente naranja (#FF9639 → #EF852E → #BE3D00) y palomita recortada (knockout) que se ve blanca sobre superficies claras. Copia exacta del SVG, tamaño personalizable.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "CheckIcon.tsx",
        code: source,
        level: "must",
        desc: "Icono SVG self-contained, useId para el gradiente único por instancia, zero deps.",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import CheckIcon from "@/src/components/CheckIcon/CheckIcon";',
      'import CheckIcon from "@/src/components/CheckIcon";',
    ],
    usage: USAGE,
    props: [
      { prop: "size", type: '"sm" | "md" | number', def: "20", note: "sm 16px · md 20px · o cualquier número en px" },
      { prop: "title", type: "string", def: "—", note: "Texto accesible (role=img + aria-label). Si se omite, el icono es decorativo (aria-hidden)." },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre el <svg>" },
    ],
    variants: [
      {
        name: "default",
        size: "20×20",
        note: "Gradiente naranja vertical #FF9639 0% → #EF852E 40% → #BE3D00 100%, círculo con check recortado (knockout)",
      },
    ],
    states: undefined,
    tokens: [
      { zone: "Gradiente (stop 0%)", token: "#FF9639" },
      { zone: "Gradiente (stop 40%)", token: "#EF852E" },
      { zone: "Gradiente (stop 100%)", token: "#BE3D00" },
      { zone: "viewBox", token: "0 0 20 20" },
    ],
    qa: [
      "Render correcto con size=sm (16px), size=md (20px) y un número arbitrario (28/40/56) sin recortes.",
      "Gradiente naranja vertical correcto: #FF9639 0% → #EF852E 40% → #BE3D00 100%.",
      "useId genera ids de gradiente únicos por instancia — sin colisión al renderizar varios CheckIcon a la vez.",
      "Con title: el <svg> tiene role=img y aria-label (vía <title>).",
      "Sin title: el icono es decorativo y queda aria-hidden.",
      "El check es transparente (knockout) y se ve blanco sobre fondos claros.",
      "Escala nítida (vectorial) a cualquier size sin pixelado.",
    ],
    sourcePath: "src/components/CheckIcon/CheckIcon.tsx",
  };

  const previewBg = "#f8fafc";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>CheckIcon</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — icono de check con círculo en gradiente naranja y palomita recortada (knockout). Extraído de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · CheckIcon
          </code>
        </p>
      </div>

      {/* Preview — tamaños sm/md + números 28/40/56 sobre fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · tamaños</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm 16 · md 20 · 28 · 40 · 56</span>
        </div>
        <div style={{ padding: "32px 24px", background: previewBg, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <CheckIcon size="sm" title="Verificado" />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm · 16</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <CheckIcon size="md" title="Verificado" />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>md · 20</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <CheckIcon size={28} title="Verificado" />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>28</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <CheckIcon size={40} title="Verificado" />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>40</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <CheckIcon size={56} title="Verificado" />
            <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>56</span>
          </div>
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
        filename="CheckIcon.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/CheckIcon/CheckIcon.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
