/**
 * /handoff/bidproposal
 * Generado por Concorde — NO EDITAR (regenerar con /concorde BidProposal)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BidProposal from "@/src/components/BidProposal/BidProposal";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidProposal/BidProposal.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidProposal.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./BidProposal";
export type { BidProposalProps } from "./BidProposal";
`;

const USAGE = `import BidProposal from "@/components/BidProposal/BidProposal";

// Defaults (label "PROPUESTA · BID ACTUAL" · amount "US$ 25,000")
<BidProposal />

// Label y monto editables
<BidProposal label="PROPUESTA · BID ACTUAL" amount="US$ 12,500" />

// Con clases extra sobre .pbid
<BidProposal className="mi-clase" amount="US$ 48,900" />`;

const HTML_TREE = `div.pbid
├─ span.pbid__label
│  ├─ span.pbid__dot (aria-hidden)
│  └─ {label}
└─ span.pbid__amount → {amount}`;

export default function BidProposalHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BidProposal",
    description:
      "Card 280×80 (radio 14) con relleno gradiente morado (#5F3ED8 → #340091 → #140046) y borde gradiente (white → #F4AC59 → #8460E5 → white) con sombra; dot + label naranja con glow (#FF9C3B) y monto grande blanco con glow morado. label/amount editables. Copia del SVG (colores/efectos).",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "BidProposal.tsx",
        code: source,
        level: "must",
        desc: "Card self-contained (CSS-in-JS, gradient-border, glows) · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import BidProposal from "@/src/components/BidProposal/BidProposal";',
      'import BidProposal from "@/src/components/BidProposal";',
    ],
    usage: USAGE,
    htmlTree: HTML_TREE,
    props: [
      { prop: "label", type: "string", def: '"PROPUESTA · BID ACTUAL"', note: "Texto superior naranja (editable)" },
      { prop: "amount", type: "string", def: '"US$ 25,000"', note: "Monto grande blanco (editable)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pbid" },
    ],
    variants: [
      {
        name: "Card propuesta",
        cssClass: ".pbid",
        size: "280×80",
        note: "Card morada gradiente + borde gradiente + dot/label naranja + monto blanco",
      },
    ],
    states: undefined,
    tokens: [
      { zone: "Relleno (gradiente)", token: "#5F3ED8 → #340091 → #140046" },
      { zone: "Borde (gradiente)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Label / dot", token: "#FF9C3B" },
      { zone: "Glow label/dot", token: "rgba(239,133,46,0.5) · rgba(239,133,46,0.9)" },
      { zone: "Monto", token: "#ffffff" },
      { zone: "Glow monto (morado)", token: "rgba(174,166,255) / rgba(107,85,222) / rgba(82,52,189) / rgba(49,0,138)" },
      { zone: "Sombra", token: "rgba(3,1,19,0.45) 0px 5px 20px" },
      { zone: "Radius", token: "14px" },
    ],
    qa: [
      "Render con defaults — label \"PROPUESTA · BID ACTUAL\" y amount \"US$ 25,000\".",
      "label y amount editables vía props — se reflejan en pantalla.",
      "Borde gradiente (white → #F4AC59 → #8460E5 → white) visible alrededor de la card.",
      "Glow naranja perceptible en el label y el dot (#FF9C3B).",
      "Glow morado perceptible alrededor del monto blanco.",
      "Sombra externa rgba(3,1,19,0.45) bajo la card.",
      "El monto usa tabular-nums (font-variant-numeric) — dígitos de ancho fijo.",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/BidProposal/BidProposal.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>BidProposal</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — card presentacional con relleno y borde gradiente morado, dot/label naranja con glow y monto grande blanco; label y amount editables. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · BidProposal
          </code>
        </p>
      </div>

      {/* Preview — fondo claro neutro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · card presentacional</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>label / amount editables</span>
        </div>
        <div style={{ padding: "48px 32px", background: "#f8fafc", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "center" }}>
          <BidProposal />
          <BidProposal label="PROPUESTA · BID ACTUAL" amount="US$ 12,500" />
          <BidProposal label="TU OFERTA · MÁXIMO" amount="US$ 48,900" />
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
        filename="BidProposal.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/BidProposal/BidProposal.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
