/**
 * /handoff/signal — Documentación de Signal (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Signal from "@/src/components/Signal";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Signal/Signal.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Signal.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import Signal from "@/src/components/Signal";

<Signal level={4} title="Señal 4 de 5" />`;

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
    id: "levels",
    title: "Nivel",
    description: "level (0-5) controla cuántas barras se iluminan.",
    tone: "dark",
    node: (
      <>
        <Signal level={5} title="Señal 5 de 5" />
        <Signal level={4} title="Señal 4 de 5" />
        <Signal level={3} title="Señal 3 de 5" />
        <Signal level={2} title="Señal 2 de 5" />
        <Signal level={0} title="Sin señal" />
      </>
    ),
    code: `<Signal level={5} />
<Signal level={4} />
<Signal level={3} />
<Signal level={2} />
<Signal level={0} />`,
  },
  {
    id: "width",
    title: "Ancho",
    description: "El alto se calcula desde width manteniendo la proporción.",
    tone: "dark",
    node: (
      <>
        <Signal level={4} width={28} />
        <Signal level={4} width={36} />
        <Signal level={4} width={48} />
      </>
    ),
    code: `<Signal level={4} width={28} />
<Signal level={4} width={36} />
<Signal level={4} width={48} />`,
  },
  {
    id: "white",
    title: "Variante white",
    description: "Barras activas en blanco sólido en vez del gradiente naranja.",
    tone: "dark",
    node: (
      <>
        <Signal level={4} variant="white" />
        <Signal level={2} variant="white" />
      </>
    ),
    code: `<Signal level={4} variant="white" />
<Signal level={2} variant="white" />`,
  },
];

const API: PropRow[] = [
  { name: "level", type: "number", default: "4", description: "Barras activas (0-5)." },
  { name: "width", type: "number", default: "28", description: "Ancho en px." },
  { name: "height", type: "number", description: "Alto en px. Si se omite, se calcula desde width." },
  { name: "variant", type: `"orange" | "white"`, default: `"orange"`, description: "Color de las barras activas." },
  { name: "title", type: "string", description: "Texto accesible. Sin él, es decorativo (aria-hidden)." },
  { name: "className", type: "string", default: `""`, description: "Clases extra sobre el <svg>." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function SignalHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Signal</h1>
      <p style={{ ...muted, fontSize: 16 }}>Indicador de señal de cinco barras crecientes.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          tone="dark"
          minHeight={200}
          code={`<Signal level={5} />
<Signal level={3} />
<Signal level={1} />`}
        >
          <Signal level={5} title="Señal 5 de 5" />
          <Signal level={3} title="Señal 3 de 5" />
          <Signal level={1} title="Señal 1 de 5" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="signal" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>Signal.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="Signal.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
