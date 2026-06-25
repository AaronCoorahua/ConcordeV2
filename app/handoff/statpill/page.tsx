/**
 * /handoff/statpill — Documentación de StatPill (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import StatPill from "@/src/components/StatPill";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/StatPill.tsx"), "utf8");
  } catch {
    return "// No se pudo leer StatPill.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import StatPill from "@/src/components/StatPill";

<StatPill variant="bids" label="MIS BIDS" value="18" />
<StatPill variant="total" label="BIDS TOTALES" value="157" />`;

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
    id: "bids",
    title: "Bids",
    description: "Mis bids del usuario. SendBidIcon variante white (flecha naranja). Fondo dark glass.",
    tone: "dark",
    node: <StatPill variant="bids" label="MIS BIDS" value="18" />,
    code: `<StatPill variant="bids" label="MIS BIDS" value="18" />`,
  },
  {
    id: "total",
    title: "Total",
    description: "Bids totales de la sala. SendBidIcon variante vault (flecha blanca/morada). Mismo fondo dark glass.",
    tone: "dark",
    node: <StatPill variant="total" label="BIDS TOTALES" value="157" />,
    code: `<StatPill variant="total" label="BIDS TOTALES" value="157" />`,
  },
  {
    id: "both",
    title: "Ambas variantes desktop",
    tone: "dark",
    node: (
      <>
        <StatPill variant="bids" label="MIS BIDS" value="18" />
        <StatPill variant="total" label="BIDS TOTALES" value="157" />
      </>
    ),
    code: `<StatPill variant="bids" label="MIS BIDS" value="18" />
<StatPill variant="total" label="BIDS TOTALES" value="157" />`,
  },
  {
    id: "glass",
    title: "Glass (mobile)",
    description: "Variante compacta 50×22 para el header mobile. Fondo translúcido con borde gradiente y backdrop-blur.",
    tone: "dark",
    node: (
      <>
        <StatPill variant="glass" value="18" />
        <StatPill variant="glass" label="BIDS" value="157" />
      </>
    ),
    code: `<StatPill variant="glass" value="18" />
<StatPill variant="glass" label="BIDS" value="157" />`,
  },
  {
    id: "custom",
    title: "Valores personalizados",
    tone: "dark",
    node: (
      <>
        <StatPill variant="bids" label="MIS BIDS" value="0" />
        <StatPill variant="total" label="TOTAL" value="1.2k" />
      </>
    ),
    code: `<StatPill variant="bids" label="MIS BIDS" value="0" />
<StatPill variant="total" label="TOTAL" value="1.2k" />`,
  },
];

const API: PropRow[] = [
  { name: "variant", type: `"bids" | "total" | "glass"`, default: `"bids"`, description: "Esquema de color y tamaño. glass es la versión compacta para mobile." },
  { name: "label", type: "string", default: `"MIS BIDS"`, description: "Etiqueta superior (vacío oculta el label en glass)." },
  { name: "value", type: "string", default: `"18"`, description: "Valor numérico o de texto mostrado." },
  { name: "icon", type: "ReactNode", description: "Ícono custom (solo variante glass). Por defecto usa SendBidIcon." },
  { name: "className", type: "string", default: `""`, description: "Clases extra sobre el contenedor." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function StatPillHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>StatPill</h1>
      <p style={{ ...muted, fontSize: 16 }}>Pill de estadística para la sala de subastas. 3 variantes: bids, total y glass (mobile).</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          tone="dark"
          minHeight={160}
          code={`<StatPill variant="bids" label="MIS BIDS" value="18" />
<StatPill variant="total" label="BIDS TOTALES" value="157" />`}
        >
          <StatPill variant="bids" label="MIS BIDS" value="18" />
          <StatPill variant="total" label="BIDS TOTALES" value="157" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="statpill" />

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
              <Preview tone={ex.tone} code={ex.code} minHeight={140}>
                {ex.node}
              </Preview>
            </div>
          );
        })}
      </div>

      {/* API */}
      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      {/* Component source */}
      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>StatPill.tsx</code> completo · depende de SendBidIcon</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="StatPill.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
