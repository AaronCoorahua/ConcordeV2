/**
 * /handoff/bidposition — Documentación de BidPosition (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BidPosition, { type BidPositionItem } from "@/src/components/BidPosition";
import BidPositionDemo from "./BidPositionDemo";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidPosition.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidPosition.tsx en build.";
  }
}

// Código real del demo en vivo (incluye los nombres de ejemplo hardcodeados).
function readDemoSource(): string {
  try {
    return readFileSync(join(process.cwd(), "app/handoff/bidposition/BidPositionDemo.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidPositionDemo.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const SAMPLE: BidPositionItem[] = [
  { name: "rodrigo_88", value: "12" },
  { name: "ana.valdez", value: "9" },
  { name: "jp_motors", value: "7" },
];

const USAGE = `import BidPosition, { type BidPositionItem } from "@/src/components/BidPosition";

const positions: BidPositionItem[] = [
  { name: "rodrigo_88", value: "12" },
  { name: "ana.valdez", value: "9" },
];

<BidPosition positions={positions} />`;

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
    id: "default",
    title: "Default",
    description: "Cinco posiciones de ejemplo.",
    node: <BidPosition />,
    code: `<BidPosition />`,
  },
  {
    id: "data",
    title: "Data-driven",
    description: "La 1ª posición es live (naranja + trofeo), el resto vault.",
    node: <BidPosition positions={SAMPLE} />,
    code: `<BidPosition positions={positions} />`,
  },
  {
    id: "labels",
    title: "Encabezados",
    description: "Los títulos de columna son editables.",
    node: <BidPosition rankLabel="PUESTO" nameLabel="POSTOR" bidsLabel="BIDS" positions={SAMPLE} />,
    code: `<BidPosition rankLabel="PUESTO" nameLabel="POSTOR" bidsLabel="BIDS" positions={positions} />`,
  },
];

const API: PropRow[] = [
  { name: "rankLabel", type: "string", default: `"PUESTO"`, description: "Encabezado columna izquierda." },
  { name: "nameLabel", type: "string", default: `"C.U.U."`, description: "Encabezado columna central." },
  { name: "bidsLabel", type: "string", default: `"BIDS"`, description: "Encabezado columna derecha." },
  { name: "positions", type: "BidPositionItem[]", default: "5 ítems", description: "Filas; la 1ª es live, el resto vault." },
  { name: "className", type: "string", default: `""` },
  { name: "BidPositionItem.name", type: "string", description: "Usuario (columna central, se trunca)." },
  { name: "BidPositionItem.value", type: "string", description: "Nº de bids (columna derecha)." },
  { name: "BidPositionItem.rank", type: "string", default: "`${i + 1}°`", description: "Override del ordinal." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function BidPositionHandoffPage(): JSX.Element {
  const source = readComponentSource();
  const demoSource = readDemoSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>BidPosition</h1>
      <p style={{ ...muted, fontSize: 16 }}>Tabla de posiciones de pujas; la 1ª destaca como live con trofeo.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview minHeight={280} code={`<BidPosition positions={positions} />`}>
          <BidPosition positions={SAMPLE} />
        </Preview>
      </div>

      {/* Live / socket */}
      <h2 style={h2}>En vivo (API / socket)</h2>
      <p style={{ ...muted, marginBottom: 12 }}>
        Las posiciones se alimentan en vivo: cuando un postor sube de puesto, la fila
        se desliza a su nueva posición (animación FLIP). Requiere <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>id</code> estable por fila.
        El código de abajo es el del demo (los nombres están hardcodeados; en producción vienen del socket).
      </p>
      <Preview minHeight={320} code={demoSource}>
        <BidPositionDemo />
      </Preview>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="bidposition" />

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
              <Preview tone={ex.tone} code={ex.code} minHeight={220}>
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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>BidPosition.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="BidPosition.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
