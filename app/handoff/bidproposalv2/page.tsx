/**
 * /handoff/bidproposalv2
 * Generado por Concorde — NO EDITAR (regenerar con /concorde BidProposalV2)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BidProposalV2 from "@/src/components/BidProposalV2/BidProposalV2";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidProposalV2/BidProposalV2.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidProposalV2.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./BidProposalV2";
export type { BidProposalV2Props } from "./BidProposalV2";
`;

const USAGE = `import BidProposalV2 from "@/components/BidProposalV2/BidProposalV2";

// Defaults (amount "US$ 6,559" · label "ENVIADO POR ZAE389")
<BidProposalV2 />

// Monto y caption editables
<BidProposalV2 amount="US$ 12,500" label="ENVIADO POR JA8NEE" />

// Va sobre fondos oscuros (glass + backdrop-blur)
<div style={{ background: "#2E0F70", padding: 24 }}>
  <BidProposalV2 amount="US$ 48,900" />
</div>`;

const HTML_TREE = `div.pbidv2
├─ span.pbidv2__amount → {amount}
└─ span.pbidv2__label  → {label}`;

export default function BidProposalV2HandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BidProposalV2",
    description:
      "Variante glassmorphic de la propuesta de bid: card 278×78 (radio 20) con relleno white 8% + backdrop-blur(14px), borde gradiente (white → #F4AC59 → #8460E5 → white) y sombra morada. Monto grande blanco con glow morado de 4 capas y, debajo, una caption en degradado lila (#CFBAFF → white → #AE8EFF → #CFBAFF) con glow naranja. amount/label editables. Pensada para fondos oscuros.",
    source: "Figma VOYAGER",
    files: [
      { filename: "BidProposalV2.tsx", code: source, level: "must", desc: "Card self-contained (CSS-in-JS, glass, gradient-border, glows) · zero deps" },
      { filename: "index.ts", code: INDEX_TS, level: "opt", desc: "Barrel export" },
    ],
    imports: [
      'import BidProposalV2 from "@/src/components/BidProposalV2/BidProposalV2";',
      'import BidProposalV2 from "@/src/components/BidProposalV2";',
    ],
    usage: USAGE,
    htmlTree: HTML_TREE,
    props: [
      { prop: "amount", type: "string", def: '"US$ 6,559"', note: "Monto grande blanco con glow morado (editable)" },
      { prop: "label", type: "string", def: '"ENVIADO POR ZAE389"', note: "Caption inferior en degradado lila (editable)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pbidv2" },
    ],
    variants: [
      { name: "Card glass", cssClass: ".pbidv2", size: "278×78", note: "Glass white 8% + backdrop-blur + borde gradiente · monto + caption" },
    ],
    states: undefined,
    tokens: [
      { zone: "Relleno (glass)", token: "rgba(255,255,255,0.08) + backdrop-blur(14px)" },
      { zone: "Borde (gradiente)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Monto", token: "#ffffff" },
      { zone: "Glow monto (morado)", token: "rgba(174,166,255) / rgba(107,85,222) / rgba(82,52,189) / rgba(49,0,138)" },
      { zone: "Caption (degradado)", token: "#CFBAFF → white → #AE8EFF → #CFBAFF" },
      { zone: "Glow caption", token: "drop-shadow rgba(239,133,46,0.5)" },
      { zone: "Sombra", token: "rgba(20,0,69,0.3) 0px 8px 24px -2px" },
      { zone: "Radius", token: "20px" },
    ],
    qa: [
      "Render con defaults — amount \"US$ 6,559\" y label \"ENVIADO POR ZAE389\".",
      "amount y label editables vía props — se reflejan en pantalla.",
      "Card translúcida (white 8%) con backdrop-blur visible sobre fondos con contenido detrás.",
      "Borde gradiente (white → #F4AC59 → #8460E5 → white) alrededor de la card.",
      "Glow morado de 4 capas alrededor del monto blanco.",
      "Caption en degradado lila con glow naranja (drop-shadow).",
      "El monto usa tabular-nums — dígitos de ancho fijo.",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/BidProposalV2/BidProposalV2.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>BidProposalV2</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — variante glassmorphic de la propuesta: monto grande con glow morado y caption en degradado lila; amount/label editables. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · PropuestaBid v2
          </code>
        </p>
      </div>

      {/* Preview — fondo OSCURO (es glass, va sobre fondos oscuros) */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · card glass (transparente)</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sin relleno · solo white 8% + blur</span>
        </div>
        <div style={{ padding: "48px 32px", backgroundColor: "#94a3b8", backgroundImage: "linear-gradient(45deg, #64748b 25%, transparent 25%, transparent 75%, #64748b 75%), linear-gradient(45deg, #64748b 25%, transparent 25%, transparent 75%, #64748b 75%)", backgroundSize: "24px 24px", backgroundPosition: "0 0, 12px 12px", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "center" }}>
          <BidProposalV2 />
          <BidProposalV2 amount="US$ 12,500" label="ENVIADO POR JA8NEE" />
        </div>
      </div>

      {/* Código completo del componente */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="BidProposalV2.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/BidProposalV2/BidProposalV2.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
