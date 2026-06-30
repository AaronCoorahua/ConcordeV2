/**
 * /handoff/activitycard — Documentación de ActivityCard
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ActivityCard from "@/src/components/ActivityCard";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ActivityCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ActivityCard.tsx en build.";
  }
}

const USAGE = `import ActivityCard from "@/src/components/ActivityCard";

<ActivityCard won={1} consignments={1} purchases={1} rejected={1} />`;

interface Example { id: string; title: string; description?: string; node: ReactNode; code: string; }

function Stage({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "center", background: "#f1f5f9", borderRadius: 12, padding: 28 }}>
      {children}
    </div>
  );
}

const EXAMPLES: Example[] = [
  {
    id: "default",
    title: "Por defecto",
    description: "Grid 2×2 de pills: Ganadas (naranja→lila) + Consignaciones / Procesos de compra / Rechazadas (lila).",
    node: (
      <Stage>
        <ActivityCard />
      </Stage>
    ),
    code: `<ActivityCard />`,
  },
  {
    id: "counts",
    title: "Con conteos",
    node: (
      <Stage>
        <ActivityCard won={12} consignments={3} purchases={5} rejected={0} />
      </Stage>
    ),
    code: `<ActivityCard won={12} consignments={3} purchases={5} rejected={0} />`,
  },
];

const API: PropRow[] = [
  { name: "title",        type: "string",          default: '"TU ACTIVIDAD"', description: "Título de la tarjeta (CardTitle con brackets)." },
  { name: "won",          type: "number | string", default: "1", description: "Conteo de «Ganadas» (pill naranja→lila)." },
  { name: "consignments", type: "number | string", default: "1", description: "Conteo de «Consignaciones»." },
  { name: "purchases",    type: "number | string", default: "1", description: "Conteo de «Procesos de compra»." },
  { name: "rejected",     type: "number | string", default: "1", description: "Conteo de «Rechazadas»." },
  { name: "className",    type: "string", description: "Clases extra sobre la tarjeta." },
];

const h2    = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3    = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function ActivityCardHandoffPage(): JSX.Element {
  const source = readComponentSource();
  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)", color: "#09090b" }}>

      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>ActivityCard</h1>
      <p style={{ ...muted, fontSize: 16 }}>Tarjeta «Tu actividad» (375×221): CardTitle + grid 2×2 de pills de conteo con gradiente y badge translúcido.</p>

      <div style={{ marginTop: 28 }}>
        <Preview minHeight={260} code={`<ActivityCard />`}>
          <Stage>
            <ActivityCard />
          </Stage>
        </Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="activitycard" />

      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {EXAMPLES.map(function renderExample(ex) {
          return (
            <div key={ex.id}>
              <h3 style={h3}>{ex.title}</h3>
              {ex.description && <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p>}
              <Preview code={ex.code} minHeight={260}>{ex.node}</Preview>
            </div>
          );
        })}
      </div>

      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace,monospace", fontSize: 13 }}>ActivityCard.tsx</code> completo</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="ActivityCard.tsx" maxHeight={520} />
        </div>
      </details>
    </main>
  );
}
