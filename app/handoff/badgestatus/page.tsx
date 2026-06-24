/**
 * /handoff/badgestatus — Documentación de BadgeStatus (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BadgeStatus from "@/src/components/BadgeStatus/BadgeStatus";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BadgeStatus/BadgeStatus.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BadgeStatus.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import BadgeStatus from "@/src/components/BadgeStatus/BadgeStatus";

<BadgeStatus variant="live" />`;

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
    title: "En vivo",
    description: "Gradiente naranja con dot blanco pulsante.",
    tone: "dark",
    node: <BadgeStatus variant="live" />,
    code: `<BadgeStatus variant="live" />`,
  },
  {
    id: "proxima",
    title: "Próxima",
    description: "Gradiente morado con reloj parpadeante.",
    tone: "dark",
    node: <BadgeStatus variant="proxima" />,
    code: `<BadgeStatus variant="proxima" />`,
  },
  {
    id: "label",
    title: "Label personalizado",
    description: "Reemplaza el texto manteniendo el ícono.",
    tone: "dark",
    node: <BadgeStatus variant="live" label="LIVE NOW" />,
    code: `<BadgeStatus variant="live" label="LIVE NOW" />`,
  },
  {
    id: "sin-icono",
    title: "Sin ícono",
    description: "Solo texto, con icon={false}.",
    tone: "dark",
    node: <BadgeStatus variant="proxima" icon={false} />,
    code: `<BadgeStatus variant="proxima" icon={false} />`,
  },
];

const API: PropRow[] = [
  { name: "variant", type: `"live" | "proxima"`, description: "Define color, ícono y animación." },
  { name: "label", type: "string", default: `"EN VIVO" / "PRÓXIMA"`, description: "Override del texto según variant." },
  { name: "icon", type: "boolean", default: "true", description: "Muestra el dot (live) o reloj (proxima)." },
  { name: "className", type: "string", default: `""`, description: "Clases extra concatenadas a la pill." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function BadgeStatusHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>BadgeStatus</h1>
      <p style={{ ...muted, fontSize: 16 }}>Pill de estado de subasta: en vivo o próxima, con animación.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          tone="dark"
          minHeight={240}
          code={`<BadgeStatus variant="live" />
<BadgeStatus variant="proxima" />`}
        >
          <BadgeStatus variant="live" />
          <BadgeStatus variant="proxima" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="badgestatus" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>BadgeStatus.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="BadgeStatus.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
