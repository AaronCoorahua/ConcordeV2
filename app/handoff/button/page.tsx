/**
 * /handoff/button — Documentación de Button (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Button, { UserIcon, CalendarIcon } from "@/src/components/Button";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Button.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Button.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import Button from "@/src/components/Button";

<Button variant="primary">Participa</Button>`;

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
    id: "primary",
    title: "Primary",
    description: "CTA principal — gradiente naranja → morado.",
    node: <Button variant="primary">Participa</Button>,
    code: `<Button variant="primary">Participa</Button>`,
  },
  {
    id: "negotiable",
    title: "Negotiable",
    description: "Para subastas en negociación — gradiente teal → morado.",
    node: <Button variant="negotiable">Negocia ahora</Button>,
    code: `<Button variant="negotiable">Negocia ahora</Button>`,
  },
  {
    id: "secondary",
    title: "Secondary",
    node: <Button variant="secondary">Ingresa</Button>,
    code: `<Button variant="secondary">Ingresa</Button>`,
  },
  {
    id: "secondary-sm",
    title: "Secondary · small",
    description: "Versión compacta. El ícono se pasa con la prop icon.",
    node: <Button variant="secondary-sm" icon={<CalendarIcon />}>Agenda tu visita</Button>,
    code: `import Button, { CalendarIcon } from "@/src/components/Button";

<Button variant="secondary-sm" icon={<CalendarIcon />}>Agenda tu visita</Button>`,
  },
  {
    id: "outline",
    title: "Outline",
    description: "Borde gradiente naranja sobre fondo claro.",
    node: <Button variant="outline">Regístrate</Button>,
    code: `<Button variant="outline">Regístrate</Button>`,
  },
  {
    id: "ghost",
    title: "Ghost",
    description: "Pensado para fondos oscuros (texto y borde blancos).",
    tone: "dark",
    node: <Button variant="ghost">Ver ofertas relacionadas</Button>,
    code: `<Button variant="ghost">Ver ofertas relacionadas</Button>`,
  },
  {
    id: "navbar",
    title: "Navbar",
    description: "Botones del header. El ícono se pasa con icon; sm-logged-in muestra «Bienvenido, {username}».",
    node: (
      <>
        <Button variant="sm-guest" icon={<UserIcon />}>Ingresa</Button>
        <Button variant="sm-logged-in" username="ZAEX5G" icon={<UserIcon />} />
      </>
    ),
    code: `import Button, { UserIcon } from "@/src/components/Button";

<Button variant="sm-guest" icon={<UserIcon />}>Ingresa</Button>

<Button variant="sm-logged-in" username="ZAEX5G" icon={<UserIcon />} />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    node: (
      <>
        <Button variant="primary" disabled>Participa</Button>
        <Button variant="secondary" disabled>Ingresa</Button>
      </>
    ),
    code: `<Button variant="primary" disabled>Participa</Button>
<Button variant="secondary" disabled>Ingresa</Button>`,
  },
];

const API: PropRow[] = [
  { name: "variant", type: `"primary" | "negotiable" | "secondary" | "secondary-sm" | "ghost" | "outline" | "sm-guest" | "sm-logged-in"`, default: `"primary"`, description: "Estilo visual del botón." },
  { name: "children", type: "ReactNode", description: "Texto del botón. En sm-logged-in se ignora (usa username)." },
  { name: "icon", type: "ReactNode", description: "Ícono en el slot circular de sm-guest, secondary-sm y sm-logged-in. Exportamos UserIcon y CalendarIcon." },
  { name: "username", type: "string", description: "Usuario mostrado en sm-logged-in, precedido de «Bienvenido,»." },
  { name: "disabled", type: "boolean", default: "false" },
  { name: "type", type: `"button" | "submit" | "reset"`, default: `"button"` },
  { name: "onClick", type: "(e) => void" },
  { name: "...props", type: "ButtonHTMLAttributes", description: "Cualquier atributo nativo de <button> (className, style, name, ref…)." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function ButtonHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Button</h1>
      <p style={{ ...muted, fontSize: 16 }}>Botón de acción con las variantes de marca de Subastop.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<Button variant="primary">Participa</Button>
<Button variant="negotiable">Negocia ahora</Button>
<Button variant="outline">Regístrate</Button>`}
        >
          <Button variant="primary">Participa</Button>
          <Button variant="negotiable">Negocia ahora</Button>
          <Button variant="outline">Regístrate</Button>
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="button" />

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
      <p style={{ ...muted, marginTop: 12, fontSize: 13 }}>
        El ícono ya no está incrustado: se pasa con la prop{" "}
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: "#7c3aed" }}>icon</code>. El componente exporta{" "}
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: "#7c3aed" }}>UserIcon</code> y{" "}
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: "#7c3aed" }}>CalendarIcon</code>, o usa el tuyo.
      </p>

      {/* Component source (oculto por defecto) */}
      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>Button.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="Button.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
