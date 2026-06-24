/**
 * /handoff/categorycard — Documentación de CategoryCard (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CategoryCard from "@/src/components/CategoryCard/CategoryCard";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CategoryCard/CategoryCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CategoryCard.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import CategoryCard from "@/src/components/CategoryCard/CategoryCard";

<CategoryCard category="vehicular" onClick={() => filter("vehicular")} />`;

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
    id: "vehicular",
    title: "Vehicular",
    node: <CategoryCard category="vehicular" />,
    code: `<CategoryCard category="vehicular" />`,
  },
  {
    id: "maquinaria",
    title: "Maquinaria",
    node: <CategoryCard category="maquinaria" />,
    code: `<CategoryCard category="maquinaria" />`,
  },
  {
    id: "equipos-diversos",
    title: "Equipos diversos",
    node: <CategoryCard category="equipos-diversos" />,
    code: `<CategoryCard category="equipos-diversos" />`,
  },
  {
    id: "articulos-diversos",
    title: "Artículos diversos",
    node: <CategoryCard category="articulos-diversos" />,
    code: `<CategoryCard category="articulos-diversos" />`,
  },
  {
    id: "label",
    title: "Label personalizado",
    description: "El texto por defecto se puede sobrescribir con la prop label.",
    node: <CategoryCard category="vehicular" label="AUTOS" />,
    code: `<CategoryCard category="vehicular" label="AUTOS" />`,
  },
];

const API: PropRow[] = [
  { name: "category", type: `"vehicular" | "maquinaria" | "equipos-diversos" | "articulos-diversos"`, default: "—", description: "Categoría que determina el ícono y el label por defecto." },
  { name: "label", type: "string", default: "según category", description: "Sobrescribe el label visible (admite saltos de línea)." },
  { name: "onClick", type: "() => void", description: "Handler de click." },
  { name: '"aria-label"', type: "string", description: "Etiqueta accesible; por defecto el label sin saltos de línea." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function CategoryCardHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>CategoryCard</h1>
      <p style={{ ...muted, fontSize: 16 }}>Card de categoría con ícono gradiente y label para filtrar subastas.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={240}
          code={`<CategoryCard category="vehicular" />
<CategoryCard category="maquinaria" />
<CategoryCard category="equipos-diversos" />
<CategoryCard category="articulos-diversos" />`}
        >
          <CategoryCard category="vehicular" />
          <CategoryCard category="maquinaria" />
          <CategoryCard category="equipos-diversos" />
          <CategoryCard category="articulos-diversos" />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="categorycard" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>CategoryCard.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="CategoryCard.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
