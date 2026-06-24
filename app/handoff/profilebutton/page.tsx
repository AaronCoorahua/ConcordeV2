/**
 * /handoff/profilebutton — Documentación de ProfileButton (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ProfileButton from "@/src/components/ProfileButton/ProfileButton";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/ProfileButton/ProfileButton.tsx"), "utf8");
  } catch {
    return "// No se pudo leer ProfileButton.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import ProfileButton from "@/src/components/ProfileButton/ProfileButton";

<ProfileButton onClick={() => router.push("/perfil")} />

// Como link (renderiza <a>)
<ProfileButton href="/perfil" />`;

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
    description: "Pasa el mouse o mantén presionado para ver hover y pressed.",
    node: <ProfileButton />,
    code: `<ProfileButton />`,
  },
  {
    id: "custom-label",
    title: "Label custom",
    node: <ProfileButton>Ver mi cuenta</ProfileButton>,
    code: `<ProfileButton>Ver mi cuenta</ProfileButton>`,
  },
  {
    id: "link",
    title: "Como link",
    description: "Con href renderiza un <a> navegable.",
    node: <ProfileButton href="/perfil" />,
    code: `<ProfileButton href="/perfil" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    node: <ProfileButton disabled />,
    code: `<ProfileButton disabled />`,
  },
];

const API: PropRow[] = [
  { name: "children", type: "ReactNode", default: `"Ir al Perfil"`, description: "Label del botón." },
  { name: "href", type: "string", description: "Si se pasa (y no disabled), renderiza un <a> en vez de <button>." },
  { name: "onClick", type: "MouseEventHandler<HTMLElement>", description: "Handler de click." },
  { name: "disabled", type: "boolean", default: "false", description: "Deshabilita y fuerza el render de <button>." },
  { name: "className", type: "string", default: `""`, description: "Clases extra concatenadas." },
  { name: "aria-label", type: "string", description: "Etiqueta accesible." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function ProfileButtonHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>ProfileButton</h1>
      <p style={{ ...muted, fontSize: 16 }}>Botón de navegación a perfil: label morado con círculo y chevron.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<ProfileButton />
<ProfileButton>Ver mi cuenta</ProfileButton>`}
        >
          <ProfileButton />
          <ProfileButton>Ver mi cuenta</ProfileButton>
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="profilebutton" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>ProfileButton.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="ProfileButton.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
