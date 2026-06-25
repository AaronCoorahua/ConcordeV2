/**
 * /handoff/input — Documentación de Input (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Input from "@/src/components/Input";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Input.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Input.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import Input from "@/src/components/Input";

<Input placeholder="Suscríbete a las novedades" />

// Controlado
const [email, setEmail] = useState("");
<Input value={email} onChange={setEmail} type="email" />`;

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
    title: "Default",
    description: "Borde gradiente lila → cream. Al enfocarlo toma el borde de focus solo.",
    node: <Input placeholder="Suscríbete a las novedades" />,
    code: `<Input placeholder="Suscríbete a las novedades" />`,
  },
  {
    id: "focus",
    title: "Focus",
    description: "Borde naranja → vault con glow, forzado vía variant.",
    node: <Input variant="focus" defaultValue="correo@ejemplo.com" />,
    code: `<Input variant="focus" defaultValue="correo@ejemplo.com" />`,
  },
  {
    id: "error",
    title: "Error",
    description: "Borde rojo y mensaje de ayuda debajo del campo.",
    node: <Input variant="error" defaultValue="correo-malo" errorMessage="Ingresa un correo válido" />,
    code: `<Input
  variant="error"
  defaultValue="correo-malo"
  errorMessage="Ingresa un correo válido"
/>`,
  },
  {
    id: "disabled",
    title: "Disabled",
    node: <Input disabled placeholder="No editable" />,
    code: `<Input disabled placeholder="No editable" />`,
  },
];

const API: PropRow[] = [
  { name: "variant", type: `"default" | "focus" | "error"`, default: `"default"`, description: "Apariencia del borde. El foco real activa \"focus\" automáticamente." },
  { name: "value", type: "string", description: "Valor controlado." },
  { name: "defaultValue", type: "string", description: "Valor inicial (no controlado)." },
  { name: "errorMessage", type: "string", default: `"Ingresa un correo válido"`, description: "Mensaje rojo bajo el campo; visible con variant=\"error\"." },
  { name: "onChange", type: "(value: string) => void", description: "Recibe el string del input, no el evento." },
  { name: "type", type: "string", default: `"text"`, description: "type nativo (text, email, password…)." },
  { name: "disabled", type: "boolean", default: "false" },
  { name: "...props", type: "InputHTMLAttributes", description: "Cualquier atributo nativo de <input> (name, id, placeholder, aria-*, ref…)." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function InputHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Input</h1>
      <p style={{ ...muted, fontSize: 16 }}>Campo de texto con borde gradiente y estados default, focus y error.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<Input placeholder="Suscríbete a las novedades" />
<Input variant="focus" defaultValue="correo@ejemplo.com" />
<Input variant="error" defaultValue="correo-malo" />`}
        >
          <Input placeholder="Suscríbete a las novedades" />
          <Input variant="focus" defaultValue="correo@ejemplo.com" />
          <Input variant="error" defaultValue="correo-malo" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="input" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>Input.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="Input.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
