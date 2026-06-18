/**
 * /handoff/progressbar
 * Generado por Concorde — NO EDITAR (regenerar con /concorde ProgressBar)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/progressbar/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ProgressBar/ProgressBar.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ProgressBar.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./ProgressBar";
export type { ProgressBarProps } from "./ProgressBar";
`;

const USAGE = `// Solo value (0-100). El relleno es la gradiente primary.
<ProgressBar value={60} />

// Ligada a un timer / progreso (state)
<ProgressBar value={progreso} aria-label="Tiempo de bid" />`;

export default function ProgressBarHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "ProgressBar",
    description:
      "Barra de progreso «tiempo de bid»: track hundido con top recto + esquinas inferiores redondeadas (radio 13), fondo negro 22% con inner-shadows. El relleno (value 0-100) usa la gradiente primary (white → #F4AC59 → #8460E5 → white · VYStrokes1). Alto 22. Copia del SVG de Figma.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "ProgressBar.tsx",
        code: source,
        level: "must",
        desc: "Track self-contained (CSS-in-JS, inner-shadow) · relleno por width · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import ProgressBar from "@/src/components/ProgressBar/ProgressBar";',
      'import ProgressBar from "@/src/components/ProgressBar";',
    ],
    usage: USAGE,
    props: [
      { prop: "value", type: "number", def: "60", note: "Progreso 0-100. Se clampa fuera de rango." },
      { prop: "aria-label", type: "string", def: '"Tiempo de bid"', note: "Etiqueta accesible del progressbar." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .pprogbar." },
    ],
    variants: [
      { name: "base", cssClass: ".pprogbar", size: "100%", note: "Track negro 22% hundido + relleno gradiente; esquinas inferiores redondeadas (radio 13)." },
    ],
    states: [
      { state: "value clampado", selector: ".pprogbar__fill", transform: "width: clamp(0,100)%", effects: "value se limita a 0-100; el ancho del relleno refleja el porcentaje." },
      { state: "transición de width", selector: ".pprogbar__fill", transform: "transition: width 0.3s cubic-bezier(0.3,0,0,1)", effects: "El relleno anima suavemente al cambiar value." },
      { state: "accesibilidad", selector: '[role="progressbar"]', transform: "—", effects: "role=progressbar con aria-valuenow / aria-valuemin=0 / aria-valuemax=100." },
      { state: "reduced motion", selector: "@media (prefers-reduced-motion: reduce)", transform: "transition: none", effects: "Sin transición de width cuando el usuario reduce el movimiento." },
    ],
    tokens: [
      { zone: "Track (fondo)", token: "rgba(0,0,0,0.22)" },
      { zone: "Inner-shadow", token: "inset 0 1px 0 rgba(255,255,255,0.06) · inset 0 2px 4px rgba(0,0,0,0.35)" },
      { zone: "Relleno (primary, diagonal)", token: "linear-gradient(135deg, #FFFFFF → #F4AC59 → #8460E5 → #FFFFFF)" },
      { zone: "Radius inferior", token: "13px (0 0 13 13)" },
      { zone: "Alto", token: "22px" },
    ],
    qa: [
      "value 0 / 50 / 100 producen ancho de relleno 0% / 50% / 100%.",
      "value fuera de rango (-20, 140) se clampa a 0 / 100.",
      "el relleno usa la gradiente primary (white→#F4AC59→#8460E5→white).",
      "live demo: la barra se llena de 0 a 100% en 3 segundos.",
      "La transición de width es suave (0.3s) al cambiar value.",
      "role=progressbar con aria-valuenow correcto (valor clampado).",
      "prefers-reduced-motion: reduce desactiva la transición.",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
    ],
    sourcePath: "src/components/ProgressBar/ProgressBar.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>ProgressBar</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — barra de progreso «tiempo de bid» con track hundido (fondo negro{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>22%</code>{" "}
          + inner-shadow) y relleno con la gradiente primary controlado por <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>value</code> (0-100).
        </p>
      </div>

      {/* Preview */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="ProgressBar.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/ProgressBar/ProgressBar.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
