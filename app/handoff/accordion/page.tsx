/**
 * /handoff/accordion
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Accordion)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/accordion/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Accordion/Accordion.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Accordion.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./Accordion";
export type { AccordionProps } from "./Accordion";
`;

const USAGE = `// El contenido es un slot editable (children) — pon lo que quieras
// No controlado — abierto inicial con defaultOpen
<Accordion title="INFORMACIÓN GENERAL" defaultOpen>
  {/* tu contenido aquí */}
</Accordion>

// Controlado — tú manejas el estado abierto/cerrado
const [open, setOpen] = useState(false);

<Accordion
  title="CONDICIONES DE OFRECIMIENTO"
  open={open}
  onOpenChange={setOpen}
>
  Contenido que se expande y colapsa.
</Accordion>`;

const HTML_TREE = `div.pacc                       (font display · width 100%)
├─ button.pacc__header         (card blanca · radio 4 · sombra · aria-expanded)
│  ├─ CardTitle                (título con corchetes naranjas · editable)
│  └─ svg.pacc__chevron        (círculo naranja · rotate 180 al abrir)
└─ div.pacc__content           (grid-template-rows 0fr → 1fr · region)
   └─ div.pacc__content-inner  (overflow hidden)
      └─ div.pacc__content-pad (children)`;

export default function AccordionHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "Accordion",
    description:
      "Card colapsable (radius 4 + sombra) con título editable de corchetes naranjas (vía CardTitle) y un chevron en círculo naranja que gira: arriba al abrir, abajo al cerrar. El contenido se expande/colapsa de forma suave. Controlado o no controlado.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "Accordion.tsx",
        code: source,
        level: "must",
        desc: "Self-contained (CSS-in-JS) · usa CardTitle para el título con corchetes · chevron SVG con gradiente naranja",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import Accordion from "@/src/components/Accordion/Accordion";',
      'import Accordion from "@/src/components/Accordion";',
    ],
    usage: USAGE,
    htmlTree: HTML_TREE,
    props: [
      { prop: "title", type: "string", def: '"INFORMACIÓN GENERAL"', note: "Título (editable). Se renderiza con CardTitle (corchetes naranjas)." },
      { prop: "children", type: "ReactNode", def: "—", note: "Contenido que se expande/colapsa al abrir el acordeón." },
      { prop: "open", type: "boolean", def: "—", note: "Abierto (modo controlado). Si se pasa, el estado lo manejas tú." },
      { prop: "defaultOpen", type: "boolean", def: "false", note: "Abierto inicial (modo no controlado)." },
      { prop: "onOpenChange", type: "(open: boolean) => void", def: "—", note: "Callback al alternar; recibe el nuevo estado abierto/cerrado." },
      { prop: "titleSize", type: "number", def: "14", note: "Tamaño del título en px (pasado a CardTitle)." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre el contenedor .pacc." },
    ],
    variants: [
      { name: "base", cssClass: ".pacc__header", size: "100%", note: "Card blanca radius 4 + sombra rgba(0,0,0,0.1) 0 0 16px 4px; título morado #3B1782 con corchetes naranjas; chevron en círculo naranja a la derecha." },
    ],
    states: [
      { state: "cerrado", selector: ".pacc__content", transform: "grid-template-rows: 0fr", effects: "Contenido colapsado; chevron apunta hacia abajo; aria-expanded=false." },
      { state: "abierto", selector: ".pacc--open .pacc__content", transform: "grid-template-rows: 1fr", effects: "Contenido expandido; chevron rotate 180deg (hacia arriba); aria-expanded=true." },
      { state: "transición", selector: ".pacc__content · .pacc__chevron", transform: "transition grid-template-rows 0.25s · transform 0.25s", effects: "Expansión/colapso y giro del chevron suaves." },
      { state: "reduced-motion", selector: "@media (prefers-reduced-motion: reduce)", transform: "transition: none", effects: "Sin animación cuando el usuario reduce el movimiento." },
    ],
    tokens: [
      { zone: "Chevron (gradiente)", token: "linear-gradient #FF9C3B → #EF852E → #BE3D00" },
      { zone: "Título", token: "#3B1782 (corchetes naranjas vía CardTitle)" },
      { zone: "Sombra card", token: "rgba(0,0,0,0.1) 0px 0px 16px 4px" },
      { zone: "Radius", token: "4px" },
      { zone: "Fondo header", token: "#ffffff" },
      { zone: "Contenido (texto)", token: "#475569 · 14px / line-height 1.6" },
    ],
    qa: [
      "El título es editable vía prop title y se muestra con corchetes naranjas (CardTitle).",
      "Click/toggle alterna correctamente entre abierto y cerrado.",
      "El chevron gira: abajo cuando está cerrado, arriba (rotate 180) cuando está abierto.",
      "Funciona en modo no controlado (defaultOpen) y controlado (open + onOpenChange).",
      "El contenido expande/colapsa de forma suave (grid-template-rows 0fr → 1fr).",
      "aria-expanded refleja el estado y aria-controls apunta al panel.",
      "Accesible por teclado: el header es un <button> con foco visible.",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
    ],
    sourcePath: "src/components/Accordion/Accordion.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Accordion</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — card colapsable con título de corchetes naranjas y chevron en círculo{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>naranja</code>{" "}
          que gira al abrir/cerrar.
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
        filename="Accordion.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/Accordion/Accordion.tsx y úsalo tal cual (requiere CardTitle)."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
