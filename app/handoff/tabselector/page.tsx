/**
 * /handoff/tabselector
 * Generado por Concorde — NO EDITAR (regenerar con /concorde TabSelector)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/tabselector/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TabSelector/TabSelector.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TabSelector.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./TabSelector";
export type { TabSelectorProps } from "./TabSelector";
`;

const USAGE = `// No controlado (defaultValue): el componente maneja su propio estado
<TabSelector options={["Boletas", "Filtros"]} defaultValue={0} />

// Controlado (value + onChange): el padre maneja el índice activo
const [active, setActive] = useState(0);
<TabSelector
  options={["En vivo", "Negociable", "Todos"]}
  value={active}
  onChange={(index) => setActive(index)}
  aria-label="Estado de la subasta"
/>`;

export default function TabSelectorHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "TabSelector",
    description:
      "Selector tipo segmented/tab: pill blanco con N opciones. La activa lleva relleno gradiente oscuro (#8460E5 → #3B1782), borde gradiente y texto blanco; las inactivas llevan texto en gradiente lila (#8460E5 → #3B1782). Controlado o no controlado.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "TabSelector.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, gradient-border, zero deps)",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import TabSelector from "@/src/components/TabSelector/TabSelector";',
      'import TabSelector from "@/src/components/TabSelector";',
    ],
    usage: USAGE,
    props: [
      { prop: "options", type: "string[]", def: "—", note: "Etiquetas de las opciones (una por tab)." },
      { prop: "value", type: "number", def: "—", note: "Índice activo controlado (0-based); activa modo controlado." },
      { prop: "defaultValue", type: "number", def: "0", note: "Índice inicial en modo no controlado." },
      { prop: "onChange", type: "(index: number) => void", def: "—", note: "Callback con el índice al cambiar de opción." },
      { prop: "aria-label", type: "string", def: "—", note: "Etiqueta accesible del role=\"tablist\"." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .ptabs." },
    ],
    variants: [
      { name: "activa", cssClass: ".ptabs__tab--active", size: "alto 34 · radio 17", note: "Relleno gradiente oscuro + borde gradiente + texto blanco + sombra." },
      { name: "inactiva", cssClass: ".ptabs__tab", size: "alto 34 · radio 17", note: "Fondo transparente · texto en gradiente lila #8460E5 → #3B1782." },
    ],
    states: [
      { state: "activo", selector: ".ptabs__tab--active", transform: "—", effects: "Relleno + borde gradiente · texto blanco · sombra rgba(32,0,104,0.2) 0 8 16 -4." },
      { state: "hover", selector: ".ptabs__tab:hover", transform: "—", effects: "opacity 0.78 (el activo vuelve a 1)." },
      { state: "active (pressed)", selector: ".ptabs__tab:active", transform: "scale(0.97)", effects: "Feedback de presión." },
      { state: "focus teclado", selector: ".ptabs__tab:focus-visible", transform: "—", effects: "outline 2px solid #8460E5 · outline-offset 2px." },
      { state: "reduced motion", selector: "@media (prefers-reduced-motion)", transform: "—", effects: "transition: none." },
    ],
    tokens: [
      { zone: "Borde contenedor", token: "#8460E5 → #FFF8F1" },
      { zone: "Relleno activo", token: "#8460E5 → #3B1782" },
      { zone: "Borde activo", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Texto inactivo", token: "#8460E5 → #3B1782 (gradiente)" },
      { zone: "Texto activo", token: "#ffffff" },
      { zone: "Sombra activo", token: "rgba(32,0,104,0.2) 0px 8px 16px -4px" },
    ],
    qa: [
      "Renderiza N tabs a partir de options (uno por etiqueta).",
      "Click en una opción la marca como activa (relleno gradiente + texto blanco).",
      "Modo controlado (value + onChange) refleja el índice en el estado padre.",
      "Modo no controlado (defaultValue) cambia de tab sin onChange.",
      "El contenedor usa role=\"tablist\" y cada opción role=\"tab\".",
      "El tab activo fija aria-selected=\"true\" (los demás \"false\").",
      "Foco con teclado muestra outline visible (:focus-visible).",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
      "Respeta prefers-reduced-motion: reduce (sin transiciones).",
    ],
    sourcePath: "src/components/TabSelector/TabSelector.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>TabSelector</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — selector segmented/tab: pill blanco con N opciones, la activa con relleno y borde gradiente, las inactivas con texto en{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>gradiente lila</code>.
        </p>
      </div>

      {/* Preview interactivo */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="TabSelector.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/TabSelector/TabSelector.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
