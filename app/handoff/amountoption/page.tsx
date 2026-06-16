/**
 * /handoff/amountoption
 * Generado por Concorde — NO EDITAR (regenerar con /concorde AmountOption)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/amountoption/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/AmountOption/AmountOption.tsx"), "utf8");
  } catch {
    return "// No se pudo leer AmountOption.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./AmountOption";
export type { AmountOptionProps, AmountOptionVariant } from "./AmountOption";
`;

const USAGE = `// Grupo tipo radio: la seleccionada es variant="selected", el resto "default"
const [selected, setSelected] = useState(0);
<AmountOption
  variant={selected === 0 ? "selected" : "default"}
  amount=">S< 80"
  name="amount"
  onSelect={() => setSelected(0)}
/>
<AmountOption
  variant={selected === 1 ? "selected" : "default"}
  amount=">S< 130"
  name="amount"
  onSelect={() => setSelected(1)}
/>

// Variante input (controlada con value + onValueChange)
const [custom, setCustom] = useState("");
<AmountOption
  variant="input"
  value={custom}
  onValueChange={(v) => setCustom(v)}
  placeholder=">S< 210"
/>`;

export default function AmountOptionHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "AmountOption",
    description:
      "Opción de monto tipo radio (pill 254×48, radio 18). 3 variantes: default (blanco, borde gradiente sutil, radio gris, monto morado), selected (relleno gradiente morado con radio relleno y monto blanco) e input (campo editable con placeholder gris).",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "AmountOption.tsx",
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
      'import AmountOption from "@/src/components/AmountOption/AmountOption";',
      'import AmountOption from "@/src/components/AmountOption";',
    ],
    usage: USAGE,
    props: [
      { prop: "variant", type: '"default" | "selected" | "input"', def: '"default"', note: "Apariencia/estado. La seleccionada usa \"selected\"; el campo editable usa \"input\"." },
      { prop: "amount", type: "ReactNode", def: "—", note: "Monto fijo (modo default/selected), p.ej. \">S< 80\"." },
      { prop: "value", type: "string", def: "—", note: "Valor del campo (modo input, controlado)." },
      { prop: "defaultValue", type: "string", def: "—", note: "Valor inicial (modo input, no controlado)." },
      { prop: "placeholder", type: "string", def: "—", note: "Placeholder del campo input (#D1D5DC)." },
      { prop: "onValueChange", type: "(value: string) => void", def: "—", note: "Recibe el string del campo input, no el evento." },
      { prop: "onSelect", type: "() => void", def: "—", note: "Click en la opción (modo default/selected)." },
      { prop: "disabled", type: "boolean", def: "false", note: "Aplica opacity 0.7 y cursor not-allowed." },
      { prop: "name", type: "string", def: "—", note: "name del radio/input nativo (para agrupar)." },
      { prop: "aria-label", type: "string", def: "—", note: "Etiqueta accesible de la opción." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .pamount." },
    ],
    variants: [
      { name: "default", cssClass: ".pamount", size: "254×48 · radio 18", note: "Blanco, borde gradiente sutil #8460E5 → #FFF8F1, radio gris #E1E3E2, monto #3B1782." },
      { name: "selected", cssClass: ".pamount--selected", size: "254×48 · radio 18", note: "Relleno gradiente #8460E5 → #3B1782, borde gradiente 1.5px, radio relleno blanco, monto blanco." },
      { name: "input", cssClass: ".pamount (input)", size: "254×48 · radio 18", note: "Campo editable con placeholder gris #D1D5DC; radio gris." },
    ],
    states: [
      { state: "selected", selector: ".pamount--selected .pamount__dot", transform: "opacity 0→1", effects: "Radio relleno (punto blanco) solo en selected · aria-checked=true." },
      { state: "focus teclado", selector: ".pamount:focus-visible / :focus-within", transform: "—", effects: "outline 2px #8460E5 · outline-offset 2px." },
      { state: "active", selector: ".pamount:active", transform: "scale(0.99)", effects: "Feedback de pulsación." },
      { state: "disabled", selector: ".pamount--disabled", transform: "—", effects: "opacity 0.7 · cursor not-allowed." },
      { state: "reduced motion", selector: "@media (prefers-reduced-motion)", transform: "—", effects: "transition: none." },
    ],
    tokens: [
      { zone: "Selected relleno", token: "#8460E5 → #3B1782" },
      { zone: "Selected borde", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Default borde", token: "#8460E5 → #FFF8F1" },
      { zone: "Radio (gris)", token: "#E1E3E2" },
      { zone: "Monto", token: "#3B1782" },
      { zone: "Placeholder", token: "#D1D5DC" },
      { zone: "Sombra", token: "rgba(0,0,0,0.1) 0 0 16px 4px" },
    ],
    qa: [
      "Renderiza las 3 variantes (default, selected, input) con el estilo correcto.",
      "Click sobre una opción la selecciona (pasa a selected morado) y deselecciona las demás.",
      "La variante input es editable y muestra el placeholder gris #D1D5DC.",
      "Modo controlado (value + onValueChange) refleja cada tecla en el estado padre.",
      "Modo no controlado (defaultValue) conserva el valor inicial sin onValueChange.",
      "El radio aparece relleno (punto blanco) solo en la variante selected.",
      "Foco con teclado muestra el outline 2px #8460E5 (:focus-visible/:focus-within).",
      "Expone role=\"radio\" con aria-checked correcto en default/selected.",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
    ],
    sourcePath: "src/components/AmountOption/AmountOption.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>AmountOption</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — opción de monto tipo radio (pill 254×48) con 3 variantes:{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>default</code>,{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>selected</code> e{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>input</code>.
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
        filename="AmountOption.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/AmountOption/AmountOption.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
