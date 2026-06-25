/**
 * /handoff/todayicon — Documentación de TodayIcon
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import TodayIcon from "@/src/components/TodayIcon";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TodayIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TodayIcon.tsx en build.";
  }
}

const USAGE = `import TodayIcon from "@/src/components/TodayIcon";

// Autónomo — trackea hover/active solo
<TodayIcon size={24} />

// Controlado — el padre pasa el estado
<TodayIcon size={24} state="hover" />`;

interface Example { id: string; title: string; description?: string; node: ReactNode; code: string; }

const DARK = { background: "#2E0F70", borderRadius: 8, padding: "20px 28px", display: "flex", gap: 20, alignItems: "center", justifyContent: "center" } as const;
const LABEL = { fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 6, textAlign: "center" as const, letterSpacing: "0.06em", textTransform: "uppercase" as const };
const COL = { display: "flex", flexDirection: "column" as const, alignItems: "center" };

const EXAMPLES: Example[] = [
  {
    id: "states",
    title: "Estados",
    description: "Default (gradiente púrpura diagonal), hover (gradiente naranja), active (blanco sólido).",
    node: (
      <div style={DARK}>
        <div style={COL}><TodayIcon size={28} state="default" /><span style={LABEL}>default</span></div>
        <div style={COL}><TodayIcon size={28} state="hover" /><span style={LABEL}>hover</span></div>
        <div style={COL}><TodayIcon size={28} state="active" /><span style={LABEL}>active</span></div>
      </div>
    ),
    code: `<TodayIcon size={28} state="default" />
<TodayIcon size={28} state="hover" />
<TodayIcon size={28} state="active" />`,
  },
  {
    id: "sizes",
    title: "Tamaños",
    description: "Acepta cualquier número de px. Default 24.",
    node: (
      <div style={DARK}>
        <TodayIcon size={16} />
        <TodayIcon size={24} />
        <TodayIcon size={32} />
        <TodayIcon size={40} />
      </div>
    ),
    code: `<TodayIcon size={16} />
<TodayIcon size={24} />
<TodayIcon size={32} />
<TodayIcon size={40} />`,
  },
  {
    id: "interactive",
    title: "Interactivo (sin prop state)",
    description: "Sin el prop state, el icono trackea sus propios eventos de mouse. Hovea o haz click para ver la transición.",
    node: (
      <div style={DARK}>
        <TodayIcon size={32} />
        <TodayIcon size={32} />
        <TodayIcon size={32} />
      </div>
    ),
    code: `<TodayIcon size={32} />`,
  },
];

const API: PropRow[] = [
  { name: "size",      type: "number",                              default: "24",   description: "Ancho y alto del SVG en px." },
  { name: "state",     type: `"default" | "hover" | "active"`,                      description: "Estado visual controlado. Omitir para modo autónomo (mouse tracking interno)." },
  { name: "title",     type: "string",                                               description: "Texto accesible. Sin él el icono es decorativo (aria-hidden)." },
  { name: "className", type: "string",                              default: `""`,   description: "Clases extra sobre el <svg>." },
];

const h2    = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3    = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6,  margin: 0 } as const;

export default function TodayIconHandoffPage(): JSX.Element {
  const source = readComponentSource();
  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)", color: "#09090b" }}>

      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>TodayIcon</h1>
      <p style={{ ...muted, fontSize: 16 }}>Icono de calendario para la navegación lateral del sidebar.</p>

      <div style={{ marginTop: 28 }}>
        <Preview minHeight={140} code={`<TodayIcon size={32} state="default" />\n<TodayIcon size={32} state="hover" />\n<TodayIcon size={32} state="active" />`}>
          <div style={DARK}>
            <TodayIcon size={32} state="default" />
            <TodayIcon size={32} state="hover" />
            <TodayIcon size={32} state="active" />
          </div>
        </Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="todayicon" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace,monospace", fontSize: 13 }}>TodayIcon.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="TodayIcon.tsx" maxHeight={520} />
        </div>
      </details>
    </main>
  );
}
