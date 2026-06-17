/**
 * /handoff/amountoptiongroup
 * Generado por Concorde — NO EDITAR (regenerar con /concorde AmountOptionGroup)
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
    return readFileSync(join(process.cwd(), "src/components/AmountOptionGroup/AmountOptionGroup.tsx"), "utf8");
  } catch {
    return "// No se pudo leer AmountOptionGroup.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./AmountOptionGroup";
export type { AmountOptionGroupProps, AmountSelection } from "./AmountOptionGroup";
`;

const USAGE = `// Con opción personalizada (controlado): selección radio + input editable
const [sel, setSel] = useState<AmountSelection>(0);
const [v, setV] = useState("");

<AmountOptionGroup
  amounts={["80", "130", "210"]}
  allowCustom
  value={sel}
  onChange={setSel}
  customValue={v}
  onCustomValueChange={setV}
/>

// Solo montos fijos (allowCustom omitido → no muestra el input)
<AmountOptionGroup
  amounts={["80", "130", "210"]}
  value={sel}
  onChange={setSel}
/>`;

export default function AmountOptionGroupHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "AmountOptionGroup",
    description:
      "Selector de monto configurable, compuesto con AmountOption: defines cuántos montos fijos via `amounts` y si se permite la opción personalizada via `allowCustom`. Selección tipo radio (uno activo a la vez), controlado o no controlado.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "AmountOptionGroup.tsx",
        code: source,
        level: "must",
        desc: "Compuesto con AmountOption · maneja selección radio · controlado/no controlado",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import AmountOptionGroup from "@/src/components/AmountOptionGroup/AmountOptionGroup";',
      'import AmountOptionGroup from "@/src/components/AmountOptionGroup";',
    ],
    usage: USAGE,
    props: [
      { prop: "amounts", type: "string[]", def: "—", note: "Requerido. Montos fijos (solo el número) — la cantidad = nº de montos fijos. P.ej. [\"80\",\"130\",\"210\"]." },
      { prop: "allowCustom", type: "boolean", def: "false", note: "Muestra la opción personalizada (input editable) debajo de los montos fijos." },
      { prop: "customLabel", type: "string", def: '"Ingresa un monto:"', note: "Etiqueta sobre la opción personalizada." },
      { prop: "customPlaceholder", type: "string", def: '"0"', note: "Placeholder del número del input personalizado." },
      { prop: "prefix", type: "string", def: '">S<"', note: "Prefijo del monto (antepuesto a cada número)." },
      { prop: "value", type: 'number | "custom"', def: "—", note: "Selección controlada: índice del monto fijo o \"custom\"." },
      { prop: "defaultValue", type: 'number | "custom"', def: "0", note: "Selección inicial (no controlado)." },
      { prop: "onChange", type: '(sel: number | "custom") => void', def: "—", note: "Callback al cambiar la selección." },
      { prop: "customValue", type: "string", def: "—", note: "Valor del input personalizado (controlado)." },
      { prop: "onCustomValueChange", type: "(v: string) => void", def: "—", note: "Callback al editar el input personalizado." },
      { prop: "name", type: "string", def: "—", note: "name del grupo radio (autogenerado si se omite)." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre el contenedor radiogroup." },
    ],
    variants: [
      { name: "lista radio", cssClass: "role=\"radiogroup\"", size: "—", note: "Lista de AmountOption: montos fijos (default/selected) + opción input opcional con el número pegado a la derecha." },
    ],
    states: [
      { state: "selección radio", selector: "AmountOption[variant]", transform: "default ↔ selected", effects: "Selección única: solo un monto activo a la vez (uno selected, el resto default)." },
      { state: "click monto fijo", selector: "onSelect(i)", transform: 'sel = i', effects: "Selecciona el monto fijo i y deselecciona la opción \"custom\"." },
      { state: "enfocar/escribir custom", selector: 'onFocusCapture · handleCustomChange', transform: 'sel = "custom"', effects: "Al enfocar o escribir en el personalizado se selecciona (\"custom\") y se deseleccionan los fijos." },
      { state: "input morado", selector: 'AmountOption[variant="input"][selected]', transform: "—", effects: "El input se pone morado (selected) aunque pierda el foco mientras \"custom\" siga activo." },
    ],
    tokens: [
      { zone: "Relleno selected (hereda AmountOption)", token: "linear-gradient(#8460E5 → #3B1782)" },
      { zone: "Borde", token: "borde gradiente" },
      { zone: "Prefijo / placeholder", token: "gris #D1D5DC" },
      { zone: "Label personalizado", token: "#94A3B8 · 11px / 700 · uppercase · letter-spacing 0.06em" },
    ],
    qa: [
      "El nº de montos fijos renderizados = amounts.length.",
      "allowCustom muestra/oculta la opción personalizada (input editable).",
      "Selección radio exclusiva: solo un monto activo a la vez.",
      "Click en un monto fijo lo selecciona y deselecciona \"custom\".",
      "Enfocar o escribir en el personalizado lo selecciona (\"custom\").",
      "El número del input personalizado queda pegado a la derecha.",
      "Funciona controlado (value/onChange + customValue/onCustomValueChange) y no controlado (defaultValue).",
      "Sin FOUC en SSR (estilos heredados de AmountOption).",
    ],
    sourcePath: "src/components/AmountOptionGroup/AmountOptionGroup.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>AmountOptionGroup</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — selector de monto configurable compuesto con AmountOption: defines los montos fijos via{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>amounts</code>{" "}
          y la opción personalizada via{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>allowCustom</code>.
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
        filename="AmountOptionGroup.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/AmountOptionGroup/AmountOptionGroup.tsx y úsalo tal cual (requiere AmountOption)."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
