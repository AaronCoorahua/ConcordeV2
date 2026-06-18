/**
 * /handoff/salastatus
 * Generado por Concorde — NO EDITAR (regenerar con /concorde SalaStatus)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import SalaStatus from "@/src/components/SalaStatus/SalaStatus";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/SalaStatus/SalaStatus.tsx"), "utf8");
  } catch {
    return "// No se pudo leer SalaStatus.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./SalaStatus";
export type { SalaStatusProps } from "./SalaStatus";
`;

const USAGE = `import SalaStatus from "@/components/SalaStatus/SalaStatus";

// Defaults (Toyota Etios · 2021 · P3U448 · 00:00:10)
<SalaStatus />

// Editable por props
<SalaStatus title="Hyundai Tucson" year="2022" placa="ABC123" time="00:01:45" />`;

const HTML_TREE = `div.psala
├─ div.psala__left
│  ├─ span.psala__title  (title + span.psala__title-year)
│  └─ span.psala__placa  (placaLabel + span.psala__placa-val)
└─ div.psala__right
   ├─ span.psala__timer-label  (TimerIcon + timerLabel)
   └─ span.psala__time  (countdown · mono · tabular-nums)`;

export default function SalaStatusHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "SalaStatus",
    description:
      "Cabecera de sala 443×90: gradiente naranja→morado (#FF9639→#8460E5), borde gradiente y sombra. Izquierda: vehículo + año + placa; derecha: label + TimerIcon + countdown (mono). Usa el componente TimerIcon. Editable por props.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "SalaStatus.tsx",
        code: source,
        level: "must",
        desc: "Cabecera self-contained (CSS-in-JS, gradient-border) · usa TimerIcon",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import SalaStatus from "@/src/components/SalaStatus/SalaStatus";',
      'import SalaStatus from "@/src/components/SalaStatus";',
    ],
    usage: USAGE,
    htmlTree: HTML_TREE,
    props: [
      { prop: "title", type: "string", def: '"Toyota Etios"', note: "Nombre del vehículo (editable)" },
      { prop: "year", type: "string", def: '"2021"', note: "Año, junto al título" },
      { prop: "placaLabel", type: "string", def: '"Placa"', note: "Etiqueta de la placa" },
      { prop: "placa", type: "string", def: '"P3U448"', note: "Valor de la placa (editable)" },
      { prop: "timerLabel", type: "string", def: '"INICIÓ HACE"', note: "Etiqueta del timer (mayúsculas)" },
      { prop: "time", type: "string", def: '"00:00:10"', note: "Countdown mono · tabular-nums" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .psala" },
    ],
    variants: [
      {
        name: "Barra de sala",
        cssClass: ".psala",
        size: "443×90",
        note: "Gradiente naranja→morado + borde gradiente + sheen; izquierda título/placa, derecha timer.",
      },
    ],
    states: [
      {
        state: "Estático",
        selector: ".psala",
        transform: "—",
        effects: "No interactivo; sheen superior; countdown en mono tabular-nums.",
      },
    ],
    tokens: [
      { zone: "Relleno", token: "linear-gradient(120deg, #FF9639 → #EF852E → #8460E5)" },
      { zone: "Borde (gradiente)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Sombra", token: "rgba(0,0,0,0.15) 0px 8px 20px" },
      { zone: "Año", token: "rgba(255,255,255,0.72)" },
      { zone: "Placa", token: "rgba(255,255,255,0.85)" },
      { zone: "Time", token: "mono · 22px · tabular-nums" },
      { zone: "Radius", token: "12" },
    ],
    qa: [
      "title, year y placa editables — se muestran los valores pasados.",
      "time editable — el countdown refleja el valor pasado.",
      "TimerIcon visible a la derecha, junto al label del timer.",
      "Countdown en fuente mono con tabular-nums (dígitos alineados).",
      "Borde gradiente visible (white → #F4AC59 → #8460E5 → white).",
      "Sheen blanco en la zona superior de la barra.",
      "Texto blanco con buen contraste sobre el gradiente.",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/SalaStatus/SalaStatus.tsx",
  };

  const previewBg = "#f8fafc";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>SalaStatus</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — cabecera de sala 443×90 con gradiente naranja→morado, borde gradiente y countdown mono; izquierda vehículo + placa, derecha label + TimerIcon + tiempo. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · SalaStatus
          </code>
        </p>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo claro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>editable por props</span>
        </div>
        <div style={{ padding: "40px 32px", background: previewBg, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <SalaStatus />
          <SalaStatus title="Hyundai Tucson" year="2022" placa="ABC123" time="00:01:45" />
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
        filename="SalaStatus.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/SalaStatus/SalaStatus.tsx y úsalo tal cual (requiere TimerIcon)."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
