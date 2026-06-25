/**
 * /handoff/checkicon — Documentación de CheckIcon (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CheckIcon from "@/src/components/CheckIcon";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CheckIcon/CheckIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CheckIcon.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import CheckIcon from "@/src/components/CheckIcon";

<CheckIcon title="Verificado" />`;

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
    id: "sizes",
    title: "Tamaños",
    description: "Alias sm (16) y md (20), o cualquier número de px.",
    node: (
      <>
        <CheckIcon size="sm" title="Verificado" />
        <CheckIcon size="md" title="Verificado" />
        <CheckIcon size={40} title="Verificado" />
      </>
    ),
    code: `<CheckIcon size="sm" />
<CheckIcon size="md" />
<CheckIcon size={40} />`,
  },
  {
    id: "decorative",
    title: "Decorativo vs. accesible",
    description: "Con title se expone como role=img; sin él queda aria-hidden.",
    node: (
      <>
        <CheckIcon size={28} />
        <CheckIcon size={28} title="Verificado" />
      </>
    ),
    code: `<CheckIcon size={28} />
<CheckIcon size={28} title="Verificado" />`,
  },
];

const API: PropRow[] = [
  { name: "size", type: `"sm" | "md" | number`, default: "20", description: "sm 16px · md 20px · o número de px." },
  { name: "title", type: "string", description: "Texto accesible. Sin él, el icono es decorativo (aria-hidden)." },
  { name: "className", type: "string", default: `""`, description: "Clases extra sobre el <svg>." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function CheckIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>CheckIcon</h1>
      <p style={{ ...muted, fontSize: 16 }}>Icono de check en círculo con gradiente naranja.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={200}
          code={`<CheckIcon size="sm" />
<CheckIcon size="md" />
<CheckIcon size={40} />`}
        >
          <CheckIcon size="sm" title="Verificado" />
          <CheckIcon size="md" title="Verificado" />
          <CheckIcon size={40} title="Verificado" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="checkicon" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>CheckIcon.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="CheckIcon.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
