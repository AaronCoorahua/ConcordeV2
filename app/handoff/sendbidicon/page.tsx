/**
 * /handoff/sendbidicon
 * Generado por Concorde — NO EDITAR (regenerar con /concorde SendBidIcon)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import SendBidIcon from "@/src/components/SendBidIcon/SendBidIcon";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/SendBidIcon/SendBidIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer SendBidIcon.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./SendBidIcon";
export type { SendBidIconProps, SendBidIconVariant } from "./SendBidIcon";
`;

const USAGE = `import SendBidIcon from "@/components/SendBidIcon/SendBidIcon";

// Vault (default)
<SendBidIcon />

// White
<SendBidIcon variant="white" />

// Vault grande + onClick
<SendBidIcon variant="vault" size={44} onClick={() => sendBid()} />`;

export default function SendBidIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "SendBidIcon",
    description:
      "Botón circular 32×32 con flecha de enviar/reenviar puja, sombra morada + inner highlight. Variante vault = morado #7B5BE6→#34147A borde #CFBAFF 50% flecha blanca; white = blanco borde gradiente flecha naranja #FF9639→#BE3D00. Copia del SVG. Tamaño personalizable.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "SendBidIcon.tsx",
        code: source,
        level: "must",
        desc: "Botón icono self-contained (CSS-in-JS, gradient-border) · useId · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import SendBidIcon from "@/src/components/SendBidIcon/SendBidIcon";',
      'import SendBidIcon from "@/src/components/SendBidIcon";',
    ],
    usage: USAGE,
    props: [
      { prop: "variant", type: '"vault" | "white"', def: '"vault"', note: "Esquema de color del botón y la flecha" },
      { prop: "size", type: "number", def: "32", note: "Diámetro en px (la flecha escala con el botón)" },
      { prop: "onClick", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Handler de click" },
      { prop: "disabled", type: "boolean", def: "false", note: "Deshabilita el botón (opacity 0.6)" },
      { prop: '"aria-label"', type: "string", def: '"Enviar puja"', note: "Etiqueta accesible" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .psendbid" },
    ],
    variants: [
      {
        name: "vault",
        cssClass: ".psendbid--vault",
        size: "32px (def)",
        note: "Relleno #7B5BE6→#34147A + borde #CFBAFF 50% + flecha blanca",
      },
      {
        name: "white",
        cssClass: ".psendbid--white",
        size: "32px (def)",
        note: "Blanco + borde gradiente white→#F4AC59→#8460E5→white + flecha naranja #FF9639→#BE3D00",
      },
    ],
    states: [
      { state: "hover", selector: ".psendbid:hover", transform: "translateY(-1px)", effects: "Sombra más amplia" },
      { state: "active", selector: ".psendbid:active", transform: "scale(0.94)", effects: "Pulsación" },
      { state: "focus", selector: ".psendbid:focus-visible", transform: "—", effects: "outline 2px #8460E5" },
      { state: "disabled", selector: ".psendbid:disabled", transform: "—", effects: "opacity 0.6 · not-allowed" },
      { state: "reduced-motion", selector: "@media (prefers-reduced-motion: reduce)", transform: "—", effects: "Sin transición" },
    ],
    tokens: [
      { zone: "Vault (relleno)", token: "#7B5BE6 → #34147A" },
      { zone: "Vault (borde)", token: "rgba(207,186,255,0.5)" },
      { zone: "White (borde)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "White (flecha)", token: "#FF9639 → #EF852E → #BE3D00" },
      { zone: "Sombra", token: "rgba(20,0,70,0.4) 0 3px 8px + inset 0 1px 0 rgba(255,255,255,0.3)" },
      { zone: "Círculo", token: "border-radius 50%" },
    ],
    qa: [
      "Variante vault: relleno morado + borde lila + flecha blanca; white: fondo blanco + borde gradiente + flecha naranja.",
      "size escala el botón y la flecha proporcionalmente (32, 44, 56).",
      "useId genera ids de gradiente únicos por instancia — sin colisión al renderizar varias.",
      "hover sube el botón, active lo encoge, focus-visible muestra outline, disabled aplica opacity 0.6.",
      "La sombra morada + inner highlight son visibles sobre fondo claro.",
      "aria-label presente (default \"Enviar puja\") para accesibilidad.",
      "Sin FOUC en SSR (estilos inyectados via <style> + guard de document).",
      "prefers-reduced-motion: reduce desactiva las transiciones.",
    ],
    sourcePath: "src/components/SendBidIcon/SendBidIcon.tsx",
  };

  const previewBg = "#f8fafc";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>SendBidIcon</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — botón de icono circular con flecha de enviar/reenviar puja, sombra morada + inner highlight, 2 variantes (vault · white).
        </p>
      </div>

      {/* Preview — vault + white en tamaños 32 / 44 / 56 sobre fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>vault · white · 32 / 44 / 56</span>
        </div>
        <div style={{ padding: "40px 32px", background: previewBg, display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "center" }}>
            <SendBidIcon variant="vault" size={32} />
            <SendBidIcon variant="vault" size={44} />
            <SendBidIcon variant="vault" size={56} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "center" }}>
            <SendBidIcon variant="white" size={32} />
            <SendBidIcon variant="white" size={44} />
            <SendBidIcon variant="white" size={56} />
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
        filename="SendBidIcon.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/SendBidIcon/SendBidIcon.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
