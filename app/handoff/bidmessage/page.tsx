/**
 * /handoff/bidmessage — Documentación de BidMessage (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BidMessage from "@/src/components/BidMessage/BidMessage";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidMessage/BidMessage.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidMessage.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import BidMessage from "@/src/components/BidMessage/BidMessage";

<BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage>`;

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
    id: "sent-live",
    title: "Sent · live",
    description: "Lado derecho, relleno naranja.",
    tone: "dark",
    node: <BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage>,
    code: `<BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage>`,
  },
  {
    id: "received-vault",
    title: "Received · vault",
    description: "Lado izquierdo, relleno morado.",
    tone: "dark",
    node: <BidMessage side="received" type="vault">PROPUSO US$ 25,000</BidMessage>,
    code: `<BidMessage side="received" type="vault">PROPUSO US$ 25,000</BidMessage>`,
  },
  {
    id: "received-white",
    title: "Received · white",
    description: "Burbuja blanca con texto morado.",
    tone: "dark",
    node: <BidMessage side="received" type="white">PROPUSO US$ 25,000</BidMessage>,
    code: `<BidMessage side="received" type="white">PROPUSO US$ 25,000</BidMessage>`,
  },
];

const API: PropRow[] = [
  { name: "side", type: `"sent" | "received"`, default: `"received"`, description: "Lado de la burbuja; define la esquina de la cola." },
  { name: "type", type: `"live" | "vault" | "white"`, default: "sent→live · received→vault", description: "Color de la burbuja." },
  { name: "logo", type: "ReactNode", description: "Slot opcional antes del texto." },
  { name: "children", type: "ReactNode", default: `"PROPUSO US$ 25,000"`, description: "Contenido del mensaje." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function BidMessageHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>BidMessage</h1>
      <p style={{ ...muted, fontSize: 16 }}>Burbuja de mensaje de puja estilo chat, con lado y color por tipo.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          tone="dark"
          minHeight={240}
          code={`<BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage>
<BidMessage side="received" type="vault">PROPUSO US$ 25,000</BidMessage>`}
        >
          <BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage>
          <BidMessage side="received" type="vault">PROPUSO US$ 25,000</BidMessage>
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="bidmessage" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>BidMessage.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="BidMessage.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
