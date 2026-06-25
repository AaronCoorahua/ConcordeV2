/**
 * /handoff/timericon — Documentación de TimerIcon (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import TimerIcon from "@/src/components/TimerIcon";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TimerIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TimerIcon.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import TimerIcon from "@/src/components/TimerIcon";

<TimerIcon size={30} color="#3B1782" />`;

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
    description: "El trazo hereda currentColor del contenedor.",
    node: (
      <div style={{ display: "flex", gap: 24, alignItems: "center", color: "#3B1782" }}>
        <TimerIcon size={22} />
        <TimerIcon size={30} />
        <TimerIcon size={40} />
      </div>
    ),
    code: `<div style={{ color: "#3B1782" }}>
  <TimerIcon size={22} />
  <TimerIcon size={30} />
  <TimerIcon size={40} />
</div>`,
  },
  {
    id: "color",
    title: "Color por prop",
    node: (
      <>
        <TimerIcon size={40} color="#3B1782" />
        <TimerIcon size={40} color="#EF852E" />
      </>
    ),
    code: `<TimerIcon size={40} color="#3B1782" />
<TimerIcon size={40} color="#EF852E" />`,
  },
  {
    id: "dark",
    title: "Sobre fondo oscuro",
    description: "Trazo blanco con color por prop.",
    tone: "dark",
    node: <TimerIcon size={40} color="#ffffff" />,
    code: `<TimerIcon size={40} color="#ffffff" />`,
  },
];

const API: PropRow[] = [
  { name: "size", type: "number", default: "22", description: "Tamaño en px (width = height)." },
  { name: "color", type: "string", default: `"currentColor"`, description: "Color del trazo." },
  { name: "title", type: "string", description: "Texto accesible. Sin él, es decorativo (aria-hidden)." },
  { name: "className", type: "string", default: `""`, description: "Clases extra sobre el <svg>." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function TimerIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>TimerIcon</h1>
      <p style={{ ...muted, fontSize: 16 }}>Icono de temporizador con trazo redondeado, tamaño y color configurables.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={200}
          code={`<TimerIcon size={22} color="#3B1782" />
<TimerIcon size={30} color="#3B1782" />
<TimerIcon size={40} color="#EF852E" />`}
        >
          <TimerIcon size={22} color="#3B1782" />
          <TimerIcon size={30} color="#3B1782" />
          <TimerIcon size={40} color="#EF852E" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="timericon" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>TimerIcon.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="TimerIcon.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
