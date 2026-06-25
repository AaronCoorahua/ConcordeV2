/**
 * /handoff/auctionstatus — Documentación de AuctionStatus (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import AuctionStatus from "@/src/components/AuctionStatus";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/AuctionStatus.tsx"), "utf8");
  } catch {
    return "// No se pudo leer AuctionStatus.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import AuctionStatus from "@/src/components/AuctionStatus";

<AuctionStatus variant="live" title="Volkswagen Gol 2015" subtitle="Vendedor: SubasCars" />`;

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
    id: "live",
    title: "Live",
    description: "Gradiente naranja. El botón volver tiene hover y pressed.",
    node: <AuctionStatus variant="live" />,
    code: `<AuctionStatus variant="live" />`,
  },
  {
    id: "negotiable",
    title: "Negotiable",
    description: "Gradiente teal.",
    node: <AuctionStatus variant="negotiable" title="Audi Q3 2026" subtitle="Vendedor: Santander" />,
    code: `<AuctionStatus
  variant="negotiable"
  title="Audi Q3 2026"
  subtitle="Vendedor: Santander"
/>`,
  },
];

const API: PropRow[] = [
  { name: "variant", type: `"live" | "negotiable"`, default: `"live"`, description: "Variante de color (gradiente)." },
  { name: "title", type: "string", default: `"Volkswagen Gol 2015"`, description: "Título (1 línea, ellipsis)." },
  { name: "subtitle", type: "string", default: `"Vendedor: SubasCars"`, description: "Subtítulo (1 línea, ellipsis)." },
  { name: "onBack", type: "MouseEventHandler<HTMLButtonElement>", description: "Callback del botón volver." },
  { name: "className", type: "string", default: `""`, description: "Clases extra para el contenedor." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function AuctionStatusHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>AuctionStatus</h1>
      <p style={{ ...muted, fontSize: 16 }}>Cabecera de subasta con botón volver, título y subtítulo sobre gradiente.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<AuctionStatus variant="live" />
<AuctionStatus variant="negotiable" title="Audi Q3 2026" subtitle="Vendedor: Santander" />`}
        >
          <AuctionStatus variant="live" />
          <AuctionStatus variant="negotiable" title="Audi Q3 2026" subtitle="Vendedor: Santander" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="auctionstatus" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>AuctionStatus.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="AuctionStatus.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
