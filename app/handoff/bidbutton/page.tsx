/**
 * /handoff/bidbutton
 * Generado por Concorde — NO EDITAR (regenerar con /concorde BidButton)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BidButton from "@/src/components/BidButton/BidButton";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidButton/BidButton.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidButton.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./BidButton";
export type { BidButtonProps } from "./BidButton";
`;

const USAGE = `import BidButton from "@/components/BidButton/BidButton";

// Defaults ("BIDEAR" · "US$ 25,000")
<BidButton />

// Label y monto editables + handler
<BidButton label="SUBIR" amount="US$ 30,000" onClick={() => bid()} />

// Deshabilitado
<BidButton disabled />`;

export default function BidButtonHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BidButton",
    description:
      "Botón de puja: pastilla radio 27 alto 54 con relleno gradiente naranja→morado (#ED8936 → #8460E5), borde gradiente, brillo superior y sombra; label + monto separados por divisor vertical blanco 60%; label/amount editables. Copia del SVG.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "BidButton.tsx",
        code: source,
        level: "must",
        desc: "Botón self-contained (CSS-in-JS, gradient-border) · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import BidButton from "@/src/components/BidButton/BidButton";',
      'import BidButton from "@/src/components/BidButton";',
    ],
    usage: USAGE,
    props: [
      { prop: "label", type: "string", def: '"BIDEAR"', note: "Texto izquierdo (editable)" },
      { prop: "amount", type: "string", def: '"US$ 25,000"', note: "Monto derecho (editable)" },
      { prop: "onClick", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Handler de click" },
      { prop: "disabled", type: "boolean", def: "false", note: "Estado deshabilitado" },
      { prop: '"aria-label"', type: "string", def: "`${label} ${amount}`", note: "Etiqueta accesible (compuesta por defecto)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pbidbtn" },
    ],
    variants: [
      {
        name: "Default",
        cssClass: ".pbidbtn",
        size: "alto 54 · radio 27",
        note: "Pastilla gradiente naranja→morado + borde gradiente + label/monto con divisor",
      },
    ],
    states: [
      { state: "Hover", selector: ".pbidbtn:hover", transform: "translateY(-1px)", effects: "brightness(1.04) + sombra más marcada" },
      { state: "Active", selector: ".pbidbtn:active", transform: "scale(0.98)", effects: "feedback de presión" },
      { state: "Focus", selector: ".pbidbtn:focus-visible", transform: "—", effects: "outline 2px #8460E5, offset 3px" },
      { state: "Disabled", selector: ".pbidbtn:disabled", transform: "—", effects: "opacity 0.6 · cursor not-allowed" },
      { state: "Reduced motion", selector: "@media (prefers-reduced-motion: reduce)", transform: "—", effects: "transition: none" },
    ],
    tokens: [
      { zone: "Relleno", token: "#ED8936 → #8460E5" },
      { zone: "Borde (gradiente)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Brillo superior", token: "white 0.22 → 0" },
      { zone: "Divisor", token: "rgba(255,255,255,0.6)" },
      { zone: "Sombra", token: "rgba(0,0,0,0.1) 0px 0px 16px 4px" },
      { zone: "Radius", token: "27px" },
      { zone: "Alto", token: "54px" },
    ],
    qa: [
      "label y amount editables — se muestran los textos pasados.",
      "Divisor vertical blanco (60%) visible entre label y monto.",
      "Hover: translateY(-1px) + brightness + sombra más marcada.",
      "Active: scale(0.98) como feedback de presión.",
      "Focus-visible: outline 2px #8460E5 con offset 3px.",
      "Disabled: opacity 0.6 y cursor not-allowed; sin acciones.",
      "Borde gradiente (gradient-border) y brillo superior perceptibles.",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
      "aria-label compuesto (`${label} ${amount}`) salvo override explícito.",
    ],
    sourcePath: "src/components/BidButton/BidButton.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>BidButton</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — botón de puja con pastilla gradiente naranja→morado, borde gradiente, brillo y sombra; label + monto editables separados por divisor.
        </p>
      </div>

      {/* Preview — fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>label / amount editables</span>
        </div>
        <div style={{ padding: "40px 24px", background: "#f8fafc", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <BidButton />
          <BidButton label="SUBIR" amount="US$ 30,000" />
          <BidButton disabled />
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
        filename="BidButton.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/BidButton/BidButton.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
