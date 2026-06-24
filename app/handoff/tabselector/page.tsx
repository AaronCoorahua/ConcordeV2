/**
 * /handoff/tabselector — Documentación de TabSelector (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import TabSelector from "@/src/components/TabSelector/TabSelector";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TabSelector/TabSelector.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TabSelector.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import TabSelector from "@/src/components/TabSelector/TabSelector";

<TabSelector options={["Boletas", "Filtros"]} defaultValue={0} />

// Controlado
const [active, setActive] = useState(0);
<TabSelector options={["En vivo", "Negociable", "Todos"]} value={active} onChange={setActive} />`;

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
    id: "two",
    title: "Dos opciones",
    description: "Click en una opción la marca como activa.",
    node: <TabSelector options={["Boletas", "Filtros"]} />,
    code: `<TabSelector options={["Boletas", "Filtros"]} />`,
  },
  {
    id: "three",
    title: "Tres opciones",
    node: <TabSelector options={["En vivo", "Negociable", "Todos"]} aria-label="Estado de la subasta" />,
    code: `<TabSelector
  options={["En vivo", "Negociable", "Todos"]}
  aria-label="Estado de la subasta"
/>`,
  },
  {
    id: "default-value",
    title: "Activa inicial",
    description: "defaultValue fija la opción seleccionada al montar.",
    node: <TabSelector options={["Boletas", "Filtros"]} defaultValue={1} />,
    code: `<TabSelector options={["Boletas", "Filtros"]} defaultValue={1} />`,
  },
];

const API: PropRow[] = [
  { name: "options", type: "string[]", description: "Etiquetas de las opciones (una por tab)." },
  { name: "value", type: "number", description: "Índice activo controlado (0-based)." },
  { name: "defaultValue", type: "number", default: "0", description: "Índice inicial en modo no controlado." },
  { name: "onChange", type: "(index: number) => void", description: "Callback con el índice al cambiar de opción." },
  { name: "aria-label", type: "string", description: "Etiqueta accesible del role=\"tablist\"." },
  { name: "className", type: "string", default: `""`, description: "Clase extra sobre .ptabs." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function TabSelectorHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>TabSelector</h1>
      <p style={{ ...muted, fontSize: 16 }}>Selector segmentado tipo tabs con opción activa en gradiente.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<TabSelector options={["En vivo", "Negociable", "Todos"]} />`}
        >
          <TabSelector options={["En vivo", "Negociable", "Todos"]} aria-label="Estado de la subasta" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="tabselector" />

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
              <Preview tone={ex.tone} code={ex.code} minHeight={180}>
                {ex.node}
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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>TabSelector.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="TabSelector.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
