/**
 * /handoff/pricebadge
 * Generado por Concorde — NO EDITAR (regenerar con /concorde PriceBadge)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import PriceBadge from "@/src/components/PriceBadge/PriceBadge";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/PriceBadge/PriceBadge.tsx"), "utf8");
  } catch {
    return "// No se pudo leer PriceBadge.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./PriceBadge";
export type { PriceBadgeProps } from "./PriceBadge";
`;

const USAGE = `import PriceBadge from "@/components/PriceBadge/PriceBadge";

// Default (20×20, decorativo)
<PriceBadge />

// Tamaño personalizado
<PriceBadge size={40} />

// Con texto accesible (role=img + aria-label)
<PriceBadge title="Precio en soles" />`;

export default function PriceBadgeHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "PriceBadge",
    description:
      "Insignia circular 20×20: fondo blanco, borde gradiente lila (#E8DEFF → white → #CFBAFF → #AE8EFF), sombra morada drop-shadow, ícono de etiqueta con \"S\" (soles) en #5A35C2. Copia exacta del SVG. Tamaño personalizable.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "PriceBadge.tsx",
        code: source,
        level: "must",
        desc: "Icono SVG self-contained · useId para gradiente único · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import PriceBadge from "@/src/components/PriceBadge/PriceBadge";',
      'import PriceBadge from "@/src/components/PriceBadge";',
    ],
    usage: USAGE,
    props: [
      { prop: "size", type: "number", def: "20", note: "Diámetro del círculo en px" },
      { prop: "title", type: "string", def: "—", note: "Texto accesible; sin él el SVG es aria-hidden" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre el <svg>" },
    ],
    variants: [
      {
        name: "default",
        size: "20×20 (escalable)",
        note: "Círculo blanco + borde gradiente lila + sombra morada + ícono S #5A35C2",
      },
    ],
    states: [
      {
        state: "estático",
        selector: "svg",
        transform: "—",
        effects: "No interactivo · drop-shadow rgba(32,0,104,0.5) · borde gradiente lila",
      },
    ],
    tokens: [
      { zone: "Borde (gradiente)", token: "#E8DEFF → white → #CFBAFF → #AE8EFF" },
      { zone: "Ícono / glyph S", token: "#5A35C2" },
      { zone: "Sombra", token: "rgba(32,0,104,0.5) · 0 2px 6px" },
      { zone: "viewBox", token: "7.5 8 20 20" },
    ],
    qa: [
      "Render correcto en varios size (20, 28, 40, 56) sin recortes ni overflow.",
      "Borde con gradiente lila #E8DEFF → white → #CFBAFF → #AE8EFF visible.",
      "useId genera ids de gradiente únicos por instancia — sin colisión al renderizar varios.",
      "Con title: role=img + aria-label presentes para accesibilidad.",
      "Sin title: el SVG es aria-hidden (decorativo).",
      "Sombra morada drop-shadow rgba(32,0,104,0.5) visible alrededor del círculo.",
      "Escala nítida a cualquier tamaño (SVG vectorial, sin pixelado).",
    ],
    sourcePath: "src/components/PriceBadge/PriceBadge.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>PriceBadge</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — insignia circular con borde gradiente lila, sombra morada e ícono de etiqueta &quot;S&quot; (soles). Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · PriceBadge
          </code>
        </p>
      </div>

      {/* Preview — varios tamaños sobre fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · sizes</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>20 · 28 · 40 · 56</span>
        </div>
        <div style={{ padding: "40px 24px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "center" }}>
          <PriceBadge size={20} title="Precio en soles" />
          <PriceBadge size={28} title="Precio en soles" />
          <PriceBadge size={40} title="Precio en soles" />
          <PriceBadge size={56} title="Precio en soles" />
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
        filename="PriceBadge.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/PriceBadge/PriceBadge.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
