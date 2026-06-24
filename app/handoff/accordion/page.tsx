/**
 * /handoff/accordion — Documentación de Accordion (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Accordion from "@/src/components/Accordion/Accordion";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Accordion/Accordion.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Accordion.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

function DemoContent(): JSX.Element {
  return <p style={{ margin: 0 }}>Contenido que se expande y colapsa al pulsar el encabezado.</p>;
}

const USAGE = `import Accordion from "@/src/components/Accordion/Accordion";

<Accordion title="INFORMACIÓN GENERAL" defaultOpen>
  Contenido que se expande y colapsa.
</Accordion>`;

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
    id: "open",
    title: "Abierto",
    description: "Con defaultOpen el contenido arranca expandido y el chevron apunta hacia arriba.",
    node: (
      <div style={{ width: 480, maxWidth: "100%" }}>
        <Accordion title="INFORMACIÓN GENERAL" defaultOpen>
          <DemoContent />
        </Accordion>
      </div>
    ),
    code: `<Accordion title="INFORMACIÓN GENERAL" defaultOpen>
  Contenido que se expande y colapsa.
</Accordion>`,
  },
  {
    id: "closed",
    title: "Cerrado",
    description: "Estado por defecto: contenido colapsado, chevron hacia abajo.",
    node: (
      <div style={{ width: 480, maxWidth: "100%" }}>
        <Accordion title="DOCUMENTACIÓN">
          <DemoContent />
        </Accordion>
      </div>
    ),
    code: `<Accordion title="DOCUMENTACIÓN">
  Contenido que se expande y colapsa.
</Accordion>`,
  },
];

const API: PropRow[] = [
  { name: "title", type: "string", default: `"INFORMACIÓN GENERAL"`, description: "Título, renderizado con CardTitle (corchetes naranjas)." },
  { name: "children", type: "ReactNode", description: "Contenido que se expande/colapsa." },
  { name: "open", type: "boolean", description: "Abierto (controlado)." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Abierto inicial (no controlado)." },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback al alternar; recibe el nuevo estado." },
  { name: "titleSize", type: "number", default: "14", description: "Tamaño del título en px." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function AccordionHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Accordion</h1>
      <p style={{ ...muted, fontSize: 16 }}>Card colapsable con título y chevron que gira al abrir o cerrar.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<Accordion title="INFORMACIÓN GENERAL" defaultOpen>
  Contenido que se expande y colapsa.
</Accordion>`}
        >
          <div style={{ width: 480, maxWidth: "100%" }}>
            <Accordion title="INFORMACIÓN GENERAL" defaultOpen>
              <DemoContent />
            </Accordion>
          </div>
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="accordion" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>Accordion.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="Accordion.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
