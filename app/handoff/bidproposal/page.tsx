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

// Defaults (amount "US$ 6,559" · label "ENVIADO POR ZAE389")
<BidProposal />

// Monto y caption editables
<BidProposal amount="US$ 7,191" label="ENVIADO POR KAHTH4" />

// Animación "nuevo bid": cambia 'flash' (contador) para encender la luz.
// 'flashColors' edita los colores del efecto (default primary).
<BidProposal amount={amount} flash={flash} flashColors={["#F4AC59", "#8460E5", "#ffffff"]} />`;

const HTML_TREE = `div.pbid                       (style: --pbid-c1/2/3)
├─ span.pbid__lightwrap        (aria-hidden)
│  └─ span.pbid__light         (foco radial)
├─ span.pbid__amount → {amount}
└─ span.pbid__label  → {label}`;

export default function BidProposalHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BidProposal",
    description:
      "Propuesta de bid glassmorphic: card 278×78 (radio 20) white 8% + backdrop-blur(5px), borde gradiente (white → #F4AC59 → #8460E5 → white) y sombra morada; monto grande blanco con glow morado y caption lila. Animación de nuevo bid (prop `flash`): el glass se ILUMINA como una bombilla que se prende y apaga (sin giro) con `flashColors`, y el nuevo monto aparece al apagarse la luz.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "BidProposal.tsx",
        code: source,
        level: "must",
        desc: "Card glass self-contained (CSS-in-JS, gradient-border vía máscara, efecto bombilla) · zero deps",
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
      { prop: "amount", type: "string", def: '"US$ 6,559"', note: "Monto grande blanco (editable)" },
      { prop: "label", type: "string", def: '"ENVIADO POR ZAE389"', note: "Caption inferior lila (editable)" },
      { prop: "flash", type: "number", def: "0", note: "Al cambiar, dispara la animación de nuevo bid (bombilla)" },
      { prop: "flashColors", type: "string[]", def: '["#F4AC59","#8460E5","#ffffff"]', note: "Colores del efecto de luz (editable)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pbid" },
    ],
    variants: [
      {
        name: "Card propuesta (glass)",
        cssClass: ".pbid",
        size: "278×78",
        note: "Glass white 8% + backdrop-blur + borde gradiente + monto/caption con glow",
      },
    ],
    states: undefined,
    tokens: [
      { zone: "Relleno (glass)", token: "rgba(255,255,255,0.08) + backdrop-blur(5px)" },
      { zone: "Borde (gradiente)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Efecto luz (default)", token: "#F4AC59 / #8460E5 / #ffffff (editable vía flashColors)" },
      { zone: "Glow monto (morado)", token: "rgba(174,166,255) / rgba(107,85,222) / rgba(82,52,189) / rgba(49,0,138)" },
      { zone: "Caption (gradiente lila)", token: "#CFBAFF → white → #AE8EFF → #CFBAFF" },
      { zone: "Sombra", token: "rgba(20,0,69,0.3) 0px 8px 24px -2px" },
      { zone: "Radius", token: "20px" },
    ],
    qa: [
      "Render con defaults — amount \"US$ 6,559\" y label \"ENVIADO POR ZAE389\".",
      "amount y label editables vía props — se reflejan en pantalla.",
      "Borde gradiente (white → #F4AC59 → #8460E5 → white) visible alrededor de la card.",
      "Al cambiar `flash`, el glass se ilumina (bombilla on→off, sin giro) y el nuevo monto aparece al apagarse.",
      "`flashColors` cambia los colores del efecto de luz.",
      "Glow morado perceptible alrededor del monto blanco.",
      "El monto usa tabular-nums — dígitos de ancho fijo.",
      "Respeta prefers-reduced-motion (sin animación de luz).",
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
          Spec &amp; Handoff — propuesta de bid glassmorphic con borde gradiente y efecto de luz tipo bombilla en cada nuevo bid; amount/label/flash/flashColors editables. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · PropuestaBid v2
          </code>
        </p>
      </div>

      {/* Preview — fondo OSCURO (el glass se aprecia sobre fondos oscuros) */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · card glass</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>amount / label editables · flash anima</span>
        </div>
        <div style={{ padding: "48px 32px", background: "linear-gradient(116deg, #5F3ED8 0%, #340091 50%, #140046 100%)", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "center" }}>
          <BidProposal />
          <BidProposal amount="US$ 7,191" label="ENVIADO POR KAHTH4" />
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
