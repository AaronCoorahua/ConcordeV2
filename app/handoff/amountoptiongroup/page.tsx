/**
 * /handoff/amountoptiongroup — Documentación de AmountOptionGroup (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import AmountOptionGroup from "@/src/components/AmountOptionGroup";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/AmountOptionGroup/AmountOptionGroup.tsx"), "utf8");
  } catch {
    return "// No se pudo leer AmountOptionGroup.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import AmountOptionGroup from "@/src/components/AmountOptionGroup";

<AmountOptionGroup amounts={["80", "130", "210"]} defaultValue={0} />

// Con opción personalizada (controlado)
const [sel, setSel] = useState<AmountSelection>(0);
const [v, setV] = useState("");
<AmountOptionGroup
  amounts={["80", "130", "210"]}
  allowCustom
  value={sel}
  onChange={setSel}
  customValue={v}
  onCustomValueChange={setV}
/>`;

interface Example {
  id: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  node: ReactNode;
  code: string;
}

const EXAMPLES: Example[] = [
  {
    id: "fixed",
    title: "Solo montos fijos",
    description: "Selección radio: un monto activo a la vez.",
    node: <AmountOptionGroup amounts={["80", "130", "210"]} />,
    code: `<AmountOptionGroup amounts={["80", "130", "210"]} />`,
  },
  {
    id: "custom",
    title: "Con opción personalizada",
    description: "allowCustom añade un input editable que se selecciona al escribir.",
    node: <AmountOptionGroup amounts={["80", "130", "210"]} allowCustom />,
    code: `<AmountOptionGroup amounts={["80", "130", "210"]} allowCustom />`,
  },
];

const API: PropRow[] = [
  { name: "amounts", type: "string[]", description: "Requerido. Montos fijos (solo el número). La cantidad = montos renderizados." },
  { name: "allowCustom", type: "boolean", default: "false", description: "Muestra la opción personalizada (input editable)." },
  { name: "customLabel", type: "string", default: `"Ingresa un monto:"`, description: "Etiqueta sobre la opción personalizada." },
  { name: "customPlaceholder", type: "string", default: `"0"`, description: "Placeholder del input personalizado." },
  { name: "prefix", type: "string", default: `">S<"`, description: "Prefijo antepuesto a cada número." },
  { name: "value", type: `number | "custom"`, description: "Selección controlada: índice del monto fijo o \"custom\"." },
  { name: "defaultValue", type: `number | "custom"`, default: "0", description: "Selección inicial (no controlado)." },
  { name: "onChange", type: `(sel: number | "custom") => void`, description: "Callback al cambiar la selección." },
  { name: "customValue", type: "string", description: "Valor del input personalizado (controlado)." },
  { name: "onCustomValueChange", type: "(v: string) => void", description: "Callback al editar el input personalizado." },
  { name: "name", type: "string", description: "name del grupo radio (autogenerado si se omite)." },
  { name: "className", type: "string", default: `""`, description: "Clase extra sobre el contenedor radiogroup." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function AmountOptionGroupHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>AmountOptionGroup</h1>
      <p style={{ ...muted, fontSize: 16 }}>Selector de monto tipo radio, con montos fijos y opción personalizada.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={280}
          code={`<AmountOptionGroup amounts={["80", "130", "210"]} allowCustom />`}
        >
          <div style={{ width: 280 }}>
            <AmountOptionGroup amounts={["80", "130", "210"]} allowCustom />
          </div>
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="amountoptiongroup" />

      {/* Usage */}
      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      {/* Examples */}
      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {EXAMPLES.map(function renderExample(ex) {
          return (
            <div key={ex.id}>
              <h3 style={h3}>{ex.title}</h3>
              {ex.description ? <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p> : <div style={{ height: 12 }} />}
              <Preview tone={ex.tone} code={ex.code} minHeight={200}>
                <div style={{ width: 280 }}>{ex.node}</div>
              </Preview>
            </div>
          );
        })}
      </div>

      {/* API */}
      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      {/* Component source (oculto por defecto) */}
      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>AmountOptionGroup.tsx</code> completo · requiere AmountOption</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="AmountOptionGroup.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
