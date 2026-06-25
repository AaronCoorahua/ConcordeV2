/**
 * /handoff/progressbar — Documentación de ProgressBar (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ProgressBar from "@/src/components/ProgressBar";
import ProgressBarDemo from "./ProgressBarDemo";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ProgressBar/ProgressBar.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ProgressBar.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import ProgressBar from "@/src/components/ProgressBar";

<ProgressBar value={60} />`;

const LIVE_USAGE = `const [value, setValue] = useState(0);

useEffect(() => {
  const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 4)), 500);
  return () => clearInterval(t);
}, []);

<ProgressBar value={value} />`;

interface Example {
  id: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  node: ReactNode;
  code: string;
}

function Bar({ children }: { children: ReactNode }): JSX.Element {
  return <div style={{ width: 360, maxWidth: "100%" }}>{children}</div>;
}

const EXAMPLES: Example[] = [
  {
    id: "values",
    title: "Niveles",
    description: "El ancho del relleno refleja value (0-100).",
    node: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360, maxWidth: "100%" }}>
        <ProgressBar value={25} />
        <ProgressBar value={60} />
        <ProgressBar value={100} />
      </div>
    ),
    code: `<ProgressBar value={25} />
<ProgressBar value={60} />
<ProgressBar value={100} />`,
  },
  {
    id: "rainbow",
    title: "Rainbow",
    description: "Relleno white → magenta → rosa con glow.",
    node: (
      <Bar>
        <ProgressBar value={70} variant="rainbow" />
      </Bar>
    ),
    code: `<ProgressBar value={70} variant="rainbow" />`,
  },
  {
    id: "white",
    title: "White",
    description: "Relleno blanco sólido para fases de carga.",
    node: (
      <Bar>
        <ProgressBar value={45} variant="white" />
      </Bar>
    ),
    code: `<ProgressBar value={45} variant="white" />`,
  },
];

const API: PropRow[] = [
  { name: "value", type: "number", default: "60", description: "Progreso 0-100. Se clampa fuera de rango." },
  { name: "variant", type: `"default" | "rainbow" | "white"`, default: `"default"`, description: "Estilo del relleno." },
  { name: `"aria-label"`, type: "string", default: `"Tiempo de bid"`, description: "Etiqueta accesible." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function ProgressBarHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>ProgressBar</h1>
      <p style={{ ...muted, fontSize: 16 }}>Barra de progreso con track hundido y relleno controlado por value.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview minHeight={180} code={`<ProgressBar value={60} />`}>
          <Bar>
            <ProgressBar value={60} />
          </Bar>
        </Preview>
      </div>

      {/* Live */}
      <h2 style={h2}>En vivo</h2>
      <p style={{ ...muted, marginBottom: 12 }}>
        Al cambiar <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>value</code> la barra
        sube con una transición suave de <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>width</code>.
      </p>
      <Preview minHeight={160} code={LIVE_USAGE}>
        <ProgressBarDemo />
      </Preview>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="progressbar" />

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
              <Preview tone={ex.tone} code={ex.code} minHeight={160}>
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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>ProgressBar.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="ProgressBar.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
