/**
 * /handoff/badgestatus
 * Generado por Concorde — NO EDITAR (regenerar con /concorde BadgeStatus)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BadgeStatus from "@/src/components/BadgeStatus/BadgeStatus";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BadgeStatus/BadgeStatus.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BadgeStatus.tsx en build.";
  }
}

const INDEX_TS = `export { default as BadgeStatus } from "./BadgeStatus";
export type { BadgeStatusProps, BadgeStatusVariant } from "./BadgeStatus";
`;

const USAGE_SNIPPET = `import BadgeStatus from "@/components/BadgeStatus/BadgeStatus";

// EN VIVO — dot pulsante
<BadgeStatus variant="live" />

// PRÓXIMA — clock parpadeante
<BadgeStatus variant="proxima" />

// Label personalizado
<BadgeStatus variant="live" label="LIVE NOW" />`;

export default function BadgeStatusHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BadgeStatus",
    description: "Pill badge de estado de subasta: EN VIVO (dot pulsante) · PRÓXIMA (reloj parpadeante).",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "BadgeStatus.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS + animaciones, zero deps).",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      `import BadgeStatus from "@/components/BadgeStatus/BadgeStatus";`,
      `import { BadgeStatus } from "@/components/BadgeStatus";`,
    ],
    usage: USAGE_SNIPPET,
    htmlTree: `<span class="badgestatus badgestatus--live" role="status" aria-label="EN VIVO">
  <span class="badgestatus-dot" aria-hidden="true" />   ← variant="live"
  <span>EN VIVO</span>
</span>

<span class="badgestatus badgestatus--proxima" role="status" aria-label="PRÓXIMA">
  <span class="badgestatus-clock" aria-hidden="true">   ← variant="proxima"
    <svg>…clock…</svg>
  </span>
  <span>PRÓXIMA</span>
</span>`,
    props: [
      { prop: "variant", type: `"live" | "proxima"`, def: "—", note: "Requerido. Define color, ícono y animación." },
      { prop: "label", type: "string", def: `"EN VIVO" / "PRÓXIMA"`, note: "Override del texto según variant." },
      { prop: "className", type: "string", def: `""`, note: "Clases extra concatenadas a la pill." },
    ],
    variants: [
      { name: "live", cssClass: ".badgestatus--live", note: "Bg naranja diagonal + ring naranja + dot 6px pulsante (1.4s)." },
      { name: "proxima", cssClass: ".badgestatus--proxima", note: "Bg morado diagonal + glow #200068 + reloj SVG parpadeante (1.4s)." },
    ],
    states: [
      { state: "reduced-motion", selector: "@media (prefers-reduced-motion: reduce)", transform: "none", effects: "Desactiva pulse del dot y blink del clock." },
    ],
    tokens: [
      { zone: "live · bg", token: "linear-gradient(135deg, #ff9639 0%, #ef852e 40%, #be3d00 100%)" },
      { zone: "live · borde", token: "linear-gradient(135deg, #ffbc83, rgba(255,255,255,0.45), #da6c1e, #ffbc83)" },
      { zone: "live · ring", token: "rgba(239,133,46,0.45) 0 2px 10px" },
      { zone: "proxima · bg", token: "linear-gradient(135deg, #8460e5 0%, #3b1782 100%)" },
      { zone: "proxima · borde", token: "linear-gradient(135deg, #8776ff, rgba(255,255,255,0.4), #532bc7, #8776ff)" },
      { zone: "proxima · glow", token: "rgba(32,0,104,0.5) 0 2px 10px" },
      { zone: "texto / dot", token: "oklch(1 0 0) / #ffffff" },
    ],
    qa: [
      "variant=\"live\" muestra el dot blanco pulsando (1.4s ease-in-out infinite).",
      "variant=\"proxima\" muestra el reloj SVG parpadeando (1.4s ease-in-out infinite).",
      "Con prefers-reduced-motion: reduce ambas animaciones se detienen.",
      "El gradiente naranja (live) y morado (proxima) coinciden con Figma (1310:11895 / 1310:11797).",
      "role=\"status\" y aria-label reflejan el label visible.",
      "label override reemplaza el texto sin romper el ícono.",
      "La pill es legible sobre fondo oscuro y sobre gris (card overlay).",
      "Sin CSS externo: los estilos se inyectan self-contained (SSR + client).",
    ],
    sourcePath: "src/components/BadgeStatus/BadgeStatus.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>BadgeStatus</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — pill badge de estado de subasta (EN VIVO · PRÓXIMA), extraído de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            voyager-ds.vercel.app/preview/components/pase1
          </code>
        </p>
      </div>

      {/* Preview — animaciones activas */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · animaciones activas</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>live · proxima</span>
        </div>
        <div style={{ padding: "48px 40px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            <BadgeStatus variant="live" />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>live · dot pulsante</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            <BadgeStatus variant="proxima" />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>proxima · clock blink</span>
          </div>
        </div>
      </div>

      {/* Preview — sobre fondo gris (card overlay) */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo gris (card image overlay)</span>
        </div>
        <div style={{ padding: "48px 40px", background: "#e2e8f0", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <BadgeStatus variant="live" />
          <BadgeStatus variant="proxima" />
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
        filename="BadgeStatus.tsx"
        note="Visual de Figma + animación de Concorde. Pégalo como src/components/BadgeStatus/BadgeStatus.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
