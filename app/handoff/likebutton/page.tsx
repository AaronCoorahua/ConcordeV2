/**
 * /handoff/likebutton — Documentación de LikeButton (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import LikeButton from "@/src/components/LikeButton";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/LikeButton/LikeButton.tsx"), "utf8");
  } catch {
    return "// No se pudo leer LikeButton.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import LikeButton from "@/src/components/LikeButton";

<LikeButton size="md" />

// Controlado
const [liked, setLiked] = useState(false);
<LikeButton active={liked} onChange={setLiked} />`;

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
    description: "sm 24px · md 32px · lg 40px.",
    tone: "dark",
    node: (
      <>
        <LikeButton size="sm" />
        <LikeButton size="md" />
        <LikeButton size="lg" />
      </>
    ),
    code: `<LikeButton size="sm" />
<LikeButton size="md" />
<LikeButton size="lg" />`,
  },
  {
    id: "active",
    title: "Active",
    description: "Estado liked: relleno morado, borde gradiente y glow.",
    tone: "dark",
    node: <LikeButton size="lg" active />,
    code: `<LikeButton size="lg" active />`,
  },
  {
    id: "states",
    title: "Disabled · skeleton",
    tone: "dark",
    node: (
      <>
        <LikeButton size="md" disabled />
        <LikeButton size="md" skeleton />
      </>
    ),
    code: `<LikeButton size="md" disabled />
<LikeButton size="md" skeleton />`,
  },
];

const API: PropRow[] = [
  { name: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Tamaño del botón (24 · 32 · 40px)." },
  { name: "active", type: "boolean", description: "Estado liked controlado." },
  { name: "defaultActive", type: "boolean", default: "false", description: "Estado liked inicial (no controlado)." },
  { name: "skeleton", type: "boolean", default: "false", description: "Muestra el placeholder de carga." },
  { name: "onChange", type: "(active: boolean) => void", description: "Callback al alternar el like." },
  { name: "disabled", type: "boolean", default: "false" },
  { name: "...props", type: "ButtonHTMLAttributes", description: "Cualquier atributo nativo de <button> (aria-label, onClick, style, ref…)." },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function LikeButtonHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>LikeButton</h1>
      <p style={{ ...muted, fontSize: 16 }}>Botón de me gusta con corazón, animación de pop y tres tamaños.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          tone="dark"
          minHeight={240}
          code={`<LikeButton size="sm" />
<LikeButton size="md" />
<LikeButton size="lg" active />`}
        >
          <LikeButton size="sm" />
          <LikeButton size="md" />
          <LikeButton size="lg" active />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="likebutton" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>LikeButton.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="LikeButton.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
