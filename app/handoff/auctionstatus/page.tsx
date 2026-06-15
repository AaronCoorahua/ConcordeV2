/**
 * /handoff/auctionstatus
 * Generado por Concorde — NO EDITAR (regenerar con /concorde AuctionStatus)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";
import { PreviewLive, PreviewNegotiable } from "./Preview";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/AuctionStatus/AuctionStatus.tsx"), "utf8");
  } catch {
    return "// No se pudo leer AuctionStatus.tsx en build.";
  }
}

const INDEX_TS = 'export { default } from "./AuctionStatus";\n' +
  'export type { AuctionStatusProps, AuctionStatusVariant } from "./AuctionStatus";\n';

const USAGE = `<AuctionStatus
  variant="live"
  title="Volkswagen Gol 2015"
  subtitle="Vendedor: SubasCars"
  onBack={() => history.back()}
/>

<AuctionStatus
  variant="negotiable"
  title="Audi Q3 2026"
  subtitle="Vendedor: Santander"
/>`;

export default function AuctionStatusHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "AuctionStatus",
    description: "Barra de cabecera de subasta: botón volver (‹) + título + subtítulo sobre gradiente. 443×60.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "AuctionStatus.tsx",
        code: source,
        level: "must",
        desc: "Componente principal · self-contained · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import AuctionStatus from "@/src/components/AuctionStatus/AuctionStatus";',
      'import AuctionStatus from "@/src/components/AuctionStatus";',
    ],
    usage: USAGE,
    props: [
      { prop: "variant", type: '"live" | "negotiable"', def: '"live"', note: "Variante de color (gradiente)" },
      { prop: "title", type: "string", def: '"Volkswagen Gol 2015"', note: "Título (1 línea, ellipsis)" },
      { prop: "subtitle", type: "string", def: '"Vendedor: SubasCars"', note: "Subtítulo (1 línea, ellipsis)" },
      { prop: "onBack", type: "MouseEventHandler<HTMLButtonElement>", def: "—", note: "Callback del botón volver ‹" },
      { prop: "className", type: "string", def: '""', note: "Clases extra para el contenedor" },
    ],
    variants: [
      { name: "live", cssClass: ".pauction--live", size: "443×60", note: "Gradiente naranja 156° #FF9639 → #EF852E → #BE3D00" },
      { name: "negotiable", cssClass: ".pauction--negotiable", size: "443×60", note: "Gradiente teal 90° #00DAE0 → #008688" },
    ],
    states: [
      { state: "hover", selector: ".pauction--live .pauction__back:hover", transform: "—", effects: "Círculo relleno #F99845 (live) / #2BC4C7 (negotiable)" },
      { state: "active", selector: ".pauction__back:active", transform: "scale(0.96)", effects: "Círculo #ED8936 / #00A8AB · chevron #99A1AF" },
      { state: "focus-visible", selector: ".pauction__back:focus-visible", transform: "—", effects: "outline 2px rgba(255,255,255,0.9) · offset 2px" },
    ],
    tokens: [
      { zone: "Fondo live", token: "linear-gradient(156deg, #FF9639 0%, #EF852E 50%, #BE3D00 100%)" },
      { zone: "Fondo negotiable", token: "linear-gradient(90deg, #00DAE0 0%, #008688 100%)" },
      { zone: "Sheen superior", token: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0))" },
      { zone: "Back hover (live / neg)", token: "#F99845 / #2BC4C7" },
      { zone: "Back active (live / neg)", token: "#ED8936 / #00A8AB" },
      { zone: "Chevron pressed", token: "#99A1AF" },
      { zone: "Título / subtítulo", token: "#ffffff / rgba(255,255,255,0.92)" },
      { zone: "Sombra contenedor", token: "rgba(0,0,0,0.1) 0 0 16px 4px" },
    ],
    qa: [
      "variant=\"live\" muestra el gradiente naranja y variant=\"negotiable\" el teal.",
      "El título y subtítulo truncan con ellipsis sin desbordar los 443px.",
      "hover sobre ‹ rellena el círculo (#F99845 live / #2BC4C7 negotiable).",
      "Al mantener pulsado ‹: scale(0.96), círculo base y chevron #99A1AF.",
      "focus-visible con teclado muestra el outline blanco con offset.",
      "onBack se dispara al hacer click en el botón volver.",
      "Los estilos se inyectan una sola vez (STYLE_ID) sin duplicar <style>.",
      "Respeta prefers-reduced-motion (sin transición en el botón).",
      "SSR sin hydration warnings (style con suppressHydrationWarning).",
    ],
    sourcePath: "src/components/AuctionStatus/AuctionStatus.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>AuctionStatus</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — barra de cabecera de subasta (botón volver + título + subtítulo sobre gradiente), 2 variantes ·{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>443 × 60</code>
        </p>
      </div>

      {/* Previews */}
      <PreviewLive />
      <PreviewNegotiable />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="AuctionStatus.tsx"
        note="Visual de Figma VOYAGER + interacción de Concorde. Pégalo como src/components/AuctionStatus/AuctionStatus.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
