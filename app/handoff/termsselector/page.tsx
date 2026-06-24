/**
 * /handoff/termsselector — Documentación de TermsSelector (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import TermsSelector from "@/src/components/TermsSelector/TermsSelector";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TermsSelector/TermsSelector.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TermsSelector.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import TermsSelector from "@/src/components/TermsSelector/TermsSelector";

<TermsSelector defaultChecked />

// Controlado
const [accepted, setAccepted] = useState(false);
<TermsSelector checked={accepted} onChange={setAccepted} />`;

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
    title: "Sin marcar",
    description: "Casilla blanca con borde lila claro. Click en la casilla o el texto alterna. Sin children, el componente muestra su etiqueta por defecto «He leído y acepto los términos y condiciones.».",
    node: <TermsSelector />,
    code: `<TermsSelector /> {/* etiqueta por defecto: "He leído y acepto los términos y condiciones." */}`,
  },
  {
    id: "checked",
    title: "Marcado",
    description: "Relleno y borde gradiente con check blanco.",
    node: <TermsSelector defaultChecked />,
    code: `<TermsSelector defaultChecked />`,
  },
  {
    id: "custom-label",
    title: "Etiqueta custom",
    node: (
      <TermsSelector>
        Acepto la <a href="/legal">política de privacidad</a>.
      </TermsSelector>
    ),
    code: `<TermsSelector>
  Acepto la <a href="/legal">política de privacidad</a>.
</TermsSelector>`,
  },
  {
    id: "disabled",
    title: "Disabled",
    node: <TermsSelector disabled defaultChecked />,
    code: `<TermsSelector disabled defaultChecked />`,
  },
];

const API: PropRow[] = [
  { name: "checked", type: "boolean", description: "Estado marcado controlado." },
  { name: "defaultChecked", type: "boolean", description: "Estado inicial (no controlado)." },
  { name: "onChange", type: "(checked: boolean) => void", description: "Recibe el booleano marcado, no el evento." },
  { name: "children", type: "ReactNode", default: `"He leído y acepto…"`, description: "Etiqueta (texto de términos)." },
  { name: "disabled", type: "boolean", default: "false" },
  { name: "...props", type: "InputHTMLAttributes", description: "Cualquier atributo nativo del <input type=\"checkbox\"> (name, id, required, aria-*, ref…)." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function TermsSelectorHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>TermsSelector</h1>
      <p style={{ ...muted, fontSize: 16 }}>Checkbox de términos con casilla gradiente y etiqueta clickeable.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<TermsSelector />
<TermsSelector defaultChecked />`}
        >
          <TermsSelector />
          <TermsSelector defaultChecked />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="termsselector" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>TermsSelector.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="TermsSelector.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
