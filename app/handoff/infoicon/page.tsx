/**
 * /handoff/infoicon — Documentación de InfoIcon
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import InfoIcon from "@/src/components/InfoIcon";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/InfoIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer InfoIcon.tsx en build.";
  }
}

const USAGE = `import InfoIcon from "@/src/components/InfoIcon";

<InfoIcon size={16} />`;

interface Example { id: string; title: string; description?: string; node: ReactNode; code: string; }

const LIGHT = { background: "#ffffff", borderRadius: 8, padding: "20px 28px", display: "flex", gap: 20, alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px #ececee" } as const;

const EXAMPLES: Example[] = [
  {
    id: "sizes",
    title: "Tamaños",
    description: "El trazo gradiente naranja→lila escala con el tamaño.",
    node: (
      <div style={LIGHT}>
        <InfoIcon size={16} />
        <InfoIcon size={24} />
        <InfoIcon size={32} />
        <InfoIcon size={48} />
      </div>
    ),
    code: `<InfoIcon size={16} />\n<InfoIcon size={24} />\n<InfoIcon size={32} />\n<InfoIcon size={48} />`,
  },
];

const API: PropRow[] = [
  { name: "size",      type: "number", default: "16", description: "Ancho y alto en px." },
  { name: "title",     type: "string", description: "Texto accesible. Si se omite, el ícono es decorativo (aria-hidden)." },
  { name: "className", type: "string", description: "Clases extra sobre el <svg>." },
];

const h2    = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3    = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function InfoIconHandoffPage(): JSX.Element {
  const source = readComponentSource();
  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)", color: "#09090b" }}>

      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>InfoIcon</h1>
      <p style={{ ...muted, fontSize: 16 }}>Ícono de información ⓘ (16×16) con trazo gradiente naranja→lila (#ED8936 → #8460E5).</p>

      <div style={{ marginTop: 28 }}>
        <Preview minHeight={140} code={`<InfoIcon size={16} />`}>
          <div style={LIGHT}>
            <InfoIcon size={16} />
            <InfoIcon size={24} />
            <InfoIcon size={32} />
          </div>
        </Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="infoicon" />

      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {EXAMPLES.map(function renderExample(ex) {
          return (
            <div key={ex.id}>
              <h3 style={h3}>{ex.title}</h3>
              {ex.description && <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p>}
              <Preview code={ex.code} minHeight={130}>{ex.node}</Preview>
            </div>
          );
        })}
      </div>

      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace,monospace", fontSize: 13 }}>InfoIcon.tsx</code> completo</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="InfoIcon.tsx" maxHeight={520} />
        </div>
      </details>
    </main>
  );
}
