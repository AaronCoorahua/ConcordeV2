/**
 * /handoff/bidmessage
 * Generado por Concorde — NO EDITAR (regenerar con /concorde BidMessage)
 *
 * Burbuja de chat presentacional (NO interactiva) — render directo en server.
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "./Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidMessage/BidMessage.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidMessage.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./BidMessage";
export type { BidMessageProps, BidMessageSide, BidMessageType } from "./BidMessage";
`;

const USAGE = `import BidMessage from "@/src/components/BidMessage/BidMessage";

// Lado "sent" → por defecto type="live" (naranja), cola inferior-derecha
<BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage>

// Lado "received" → por defecto type="vault" (morado), cola inferior-izquierda
<BidMessage side="received" type="vault">PROPUSO US$ 25,000</BidMessage>

// Variante blanca (texto morado)
<BidMessage side="received" type="white">PROPUSO US$ 25,000</BidMessage>

// Versión VMC — logo en el slot (antes del texto)
<BidMessage side="received" type="vault" logo={<img src="/logo-preview.png" alt="VMC" style={{ height: 16 }} />}>
  ABRIÓ LA SUBASTA
</BidMessage>`;

export default function BidMessageHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BidMessage",
    description:
      "Burbuja de mensaje de puja estilo chat; 2 lados sent/received con la cola en la esquina inferior del lado; color por type: live naranja, vault morado, white blanco con texto morado; slot de logo + children.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "BidMessage.tsx",
        code: source,
        level: "must",
        desc: "Burbuja self-contained (CSS-in-JS, gradient-border) · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import BidMessage from "@/src/components/BidMessage/BidMessage";',
      'import BidMessage from "@/src/components/BidMessage";',
    ],
    usage: USAGE,
    props: [
      { prop: "side", type: '"sent" | "received"', def: '"received"', note: "Lado de la burbuja; define la esquina de la cola" },
      { prop: "type", type: '"live" | "vault" | "white"', def: "sent→live / received→vault", note: "Color de la burbuja (por defecto según side)" },
      { prop: "logo", type: "ReactNode", def: "—", note: "Slot opcional antes del texto" },
      { prop: "children", type: "ReactNode", def: '"PROPUSO US$ 25,000"', note: "Contenido del mensaje (editable)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pbidmsg" },
    ],
    variants: [
      { name: "live", cssClass: ".pbidmsg--live", note: "Relleno naranja #FF9639→#BE3D00 + borde gradiente + texto blanco" },
      { name: "vault", cssClass: ".pbidmsg--vault", note: "Relleno morado #19004A→#3B1782→#2E0F70 + texto blanco" },
      { name: "white", cssClass: ".pbidmsg--white", note: "Blanco + borde lila #CFBAFF→#AE8EFF + texto #3B1782" },
    ],
    states: [
      { state: "received", selector: ".pbidmsg--received", transform: "border-radius 20px 20px 20px 4px", effects: "Cola en esquina inferior-izquierda" },
      { state: "sent", selector: ".pbidmsg--sent", transform: "border-radius 20px 20px 4px 20px", effects: "Cola en esquina inferior-derecha" },
      { state: "estático", selector: "—", transform: "—", effects: "Sin interacción (presentacional)" },
    ],
    tokens: [
      { zone: "live · relleno", token: "#FF9639 → #EF852E → #BE3D00" },
      { zone: "live · borde", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "live · sombra", token: "rgba(225,108,16,0.3) 0px 2px 12px" },
      { zone: "vault · relleno", token: "#19004A → #3B1782 → #2E0F70" },
      { zone: "white · borde", token: "#CFBAFF → white → #AE8EFF → #CFBAFF" },
      { zone: "white · texto", token: "#3B1782" },
      { zone: "white · sombra", token: "rgba(90,53,194,0.5) 0px 2px 10px" },
      { zone: "Radius", token: "20px / 4px (cola)" },
    ],
    qa: [
      "side cambia la cola de esquina (received → inferior-izquierda, sent → inferior-derecha).",
      "Los 3 type pintan el color correcto (live naranja, vault morado, white blanco).",
      "Slot de logo opcional se renderiza antes del texto cuando se pasa.",
      "children es editable — se muestra el contenido pasado.",
      "Borde gradiente visible en variantes live y white.",
      "Contraste de texto correcto por type (blanco en live/vault, #3B1782 en white).",
      "side=\"sent\" por defecto resuelve a type=\"live\".",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/BidMessage/BidMessage.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>BidMessage</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — burbuja de mensaje de puja estilo chat con 2 lados (cola por esquina) y 3 colores por type.
        </p>
      </div>

      {/* Live demo */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="BidMessage.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/BidMessage/BidMessage.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
