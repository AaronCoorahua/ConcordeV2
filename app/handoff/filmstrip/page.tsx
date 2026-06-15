/**
 * /handoff/filmstrip
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Filmstrip)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";
import Preview from "./Preview";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Filmstrip/Filmstrip.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Filmstrip.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./Filmstrip";
export type { FilmstripProps, FilmstripVariant } from "./Filmstrip";
`;

const USAGE = `import Filmstrip from "@/src/components/Filmstrip";

const images = Array.from({ length: 11 }, () => "/photo.jpg");
const [index, setIndex] = useState(0);

<Filmstrip
  variant="live"        // "live" | "negotiable"
  images={images}
  selectedIndex={index}
  onSelect={setIndex}
/>`;

export default function FilmstripHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "Filmstrip",
    description: "Tira de miniaturas 443×87 con scroll por arrastre (drag-to-scroll) y miniatura seleccionada con borde gradiente de 3px.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "Filmstrip.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, drag-to-scroll, zero deps).",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      `import Filmstrip from "@/src/components/Filmstrip/Filmstrip";`,
      `import Filmstrip from "@/src/components/Filmstrip";`,
    ],
    usage: USAGE,
    props: [
      { prop: "variant", type: `"live" | "negotiable"`, def: `"live"`, note: "Color del borde gradiente de la miniatura seleccionada." },
      { prop: "images", type: "string[]", def: `["","","",""]`, note: "URLs de las miniaturas. Cada índice = un thumb 113×84." },
      { prop: "selectedIndex", type: "number", def: "0", note: "Índice 0-based de la miniatura activa." },
      { prop: "onSelect", type: "(index: number) => void", def: "—", note: "Se dispara al hacer click (no al arrastrar)." },
      { prop: "className", type: "string", def: `""`, note: "Clases extra sobre el track .pfilm." },
    ],
    variants: [
      { name: "live", cssClass: ".pfilm--live", size: "443×87", note: "Borde seleccionado: white → #F4AC59 → #8460E5 → white." },
      { name: "negotiable", cssClass: ".pfilm--negotiable", size: "443×87", note: "Borde seleccionado: white → #4DDCDC → #6445DF → white." },
    ],
    states: [
      { state: "Seleccionado", selector: ".pfilm__thumb--selected", transform: "—", effects: "padding 3px + fondo gradiente (borde) + shadow 0 0 16px 4px." },
      { state: "Drag / grabbing", selector: ".pfilm--dragging", transform: "scrollLeft += dx", effects: "cursor grabbing; thumbs con pointer-events:none mientras se arrastra." },
      { state: "Hover", selector: ".pfilm__thumb:hover", transform: "translateY(-1px)", effects: "Eleva ligeramente la miniatura." },
      { state: "Active", selector: ".pfilm__thumb:active", transform: "scale(0.98)", effects: "Feedback de pulsación." },
      { state: "Focus", selector: ".pfilm__thumb:focus-visible", transform: "—", effects: "outline 2px #8460E5, offset 2px." },
    ],
    tokens: [
      { zone: "Borde seleccionado · live", token: "linear-gradient(120deg, #ffffff, #F4AC59 25%, #8460E5 75%, #ffffff)" },
      { zone: "Borde seleccionado · negotiable", token: "linear-gradient(120deg, #ffffff, #4DDCDC 25%, #6445DF 75%, #ffffff)" },
      { zone: "Acento live (warm)", token: "#F4AC59" },
      { zone: "Acento live (violet)", token: "#8460E5" },
      { zone: "Acento negotiable (teal)", token: "#4DDCDC" },
      { zone: "Acento negotiable (violet)", token: "#6445DF" },
      { zone: "Outline focus", token: "#8460E5" },
      { zone: "Shadow seleccionado", token: "rgba(0,0,0,0.1) 0px 0px 16px 4px" },
    ],
    qa: [
      "Renderiza el track .pfilm con las miniaturas pasadas en images.",
      "Drag-to-scroll: arrastrar horizontalmente mueve scrollLeft (cursor grab → grabbing).",
      "Click en una miniatura dispara onSelect(index) y marca aria-current.",
      "Con 11 thumbs se ven solo ~4 y el resto requiere scroll/arrastre.",
      "Arrastrar NO dispara onSelect (moved > 4px cancela el click).",
      "La miniatura seleccionada muestra el borde gradiente de 3px según variant.",
      "live usa #F4AC59/#8460E5 y negotiable usa #4DDCDC/#6445DF.",
      "focus-visible con teclado muestra outline 2px #8460E5.",
      "prefers-reduced-motion: reduce desactiva las transiciones del thumb.",
    ],
    sourcePath: "src/components/Filmstrip/Filmstrip.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Filmstrip</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — tira de miniaturas 443×87 con drag-to-scroll y borde gradiente de selección, extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · Filmstrip
          </code>
        </p>
      </div>

      {/* Preview interactivo (client component) */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="Filmstrip.tsx"
        note="Visual de Figma + drag-to-scroll de Concorde. Pégalo como src/components/Filmstrip/Filmstrip.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
