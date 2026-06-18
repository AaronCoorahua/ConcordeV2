/**
 * /handoff/timericon
 * Generado por Concorde — NO EDITAR (regenerar con /concorde TimerIcon)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import TimerIcon from "@/src/components/TimerIcon/TimerIcon";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TimerIcon/TimerIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TimerIcon.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./TimerIcon";
export type { TimerIconProps } from "./TimerIcon";
`;

const USAGE = `import TimerIcon from "@/components/TimerIcon/TimerIcon";

// Default (22px, currentColor)
<TimerIcon />

// Tamaño + color por prop
<TimerIcon size={30} color="#3B1782" />
<TimerIcon size={40} color="#EF852E" />

// Accesible (role=img + aria-label)
<TimerIcon title="Tiempo restante" />`;

export default function TimerIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "TimerIcon",
    description:
      "Icono de temporizador/reloj 22×22, trazo redondeado 1.83. Tamaño y color personalizables (default currentColor). Copia exacta del SVG.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "TimerIcon.tsx",
        code: source,
        level: "must",
        desc: "Icono SVG stroke self-contained · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import TimerIcon from "@/src/components/TimerIcon/TimerIcon";',
      'import TimerIcon from "@/src/components/TimerIcon";',
    ],
    usage: USAGE,
    props: [
      { prop: "size", type: "number", def: "22", note: "Tamaño en px (width = height)" },
      { prop: "color", type: "string", def: '"currentColor"', note: "Color del trazo" },
      { prop: "title", type: "string", def: "—", note: "Texto accesible; sin él el icono es aria-hidden" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre el <svg>" },
    ],
    variants: [
      {
        name: "reloj / temporizador",
        size: "22×22 (escalable)",
        note: "Trazo stroke 1.83 redondeado · color configurable",
      },
    ],
    states: undefined,
    tokens: [
      { zone: "stroke-width", token: "1.83333" },
      { zone: "stroke-linecap / linejoin", token: "round" },
      { zone: "viewBox", token: "0 0 22 22" },
      { zone: "color", token: "por prop o currentColor" },
    ],
    qa: [
      "Render correcto en varios size (22, 30, 40) sin recortes ni deformación.",
      "Color aplicado por prop (color=\"#3B1782\") se ve en el trazo.",
      "Sin prop color, hereda currentColor del contenedor.",
      "Con title → role=img + aria-label presente para accesibilidad.",
      "Sin title → aria-hidden=true (decorativo).",
      "Trazo nítido a cualquier escala (SVG vectorial).",
      "stroke-linecap/linejoin round: extremos y uniones redondeados.",
    ],
    sourcePath: "src/components/TimerIcon/TimerIcon.tsx",
  };

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "40px 24px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>TimerIcon</h1>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "monospace",
              padding: "2px 8px",
              borderRadius: 4,
              background: "#dbeafe",
              color: "#1d4ed8",
            }}
          >
            Concorde · DONE
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — icono de temporizador/reloj (22×22), trazo redondeado 1.83, tamaño y color personalizables.
        </p>
      </div>

      {/* Preview — varios tamaños y colores */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div
          style={{
            padding: "8px 14px",
            background: "#f1f5f9",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#64748b",
            }}
          >
            preview
          </span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>
            22 · 30 · 40 · color por prop · currentColor
          </span>
        </div>
        <div
          style={{
            padding: "36px 24px",
            background: "#f8fafc",
            display: "flex",
            flexWrap: "wrap",
            gap: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Tamaños heredando currentColor del contenedor (#3B1782) */}
          <div style={{ display: "flex", gap: 24, alignItems: "center", color: "#3B1782" }}>
            <TimerIcon size={22} />
            <TimerIcon size={30} />
            <TimerIcon size={40} />
          </div>

          {/* Color por prop */}
          <TimerIcon size={40} color="#3B1782" />
          <TimerIcon size={40} color="#EF852E" />

          {/* Blanco sobre chip oscuro */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
              borderRadius: 10,
              background: "#0f172a",
            }}
          >
            <TimerIcon size={40} color="#ffffff" />
          </div>
        </div>
      </div>

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#64748b",
          }}
        >
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="TimerIcon.tsx"
        note="Icono SVG stroke de Concorde (Figma VOYAGER). Pégalo como src/components/TimerIcon/TimerIcon.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />
    </main>
  );
}
