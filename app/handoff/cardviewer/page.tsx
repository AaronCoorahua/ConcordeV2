/**
 * /handoff/cardviewer — Documentación de CardViewer (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CardViewer from "@/src/components/CardViewer/CardViewer";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CardViewer/CardViewer.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CardViewer.tsx en build.";
  }
}

const DEMO_IMAGES = ["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"];

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import CardViewer from "@/src/components/CardViewer/CardViewer";

<CardViewer images={["/a.jpg", "/b.jpg", "/c.jpg", "/d.jpg"]} />`;

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
    id: "live",
    title: "Live",
    description: "Aro de selección naranja → lila en la miniatura activa.",
    node: <CardViewer images={DEMO_IMAGES} />,
    code: `<CardViewer images={["/a.jpg", "/b.jpg", "/c.jpg", "/d.jpg"]} />`,
  },
  {
    id: "negotiable",
    title: "Negotiable",
    description: "Aro de selección teal → lila.",
    node: <CardViewer variant="negotiable" images={DEMO_IMAGES} />,
    code: `<CardViewer variant="negotiable" images={["/a.jpg", "/b.jpg", "/c.jpg", "/d.jpg"]} />`,
  },
  {
    id: "default-index",
    title: "Índice inicial",
    description: "Arranca en la tercera imagen (defaultIndex={2}).",
    node: <CardViewer images={DEMO_IMAGES} defaultIndex={2} />,
    code: `<CardViewer images={imgs} defaultIndex={2} />`,
  },
];

const API: PropRow[] = [
  { name: "images", type: "string[]", default: "[]", description: "URLs del visor y las miniaturas." },
  { name: "variant", type: `"live" | "negotiable"`, default: `"live"`, description: "Color del aro de la miniatura seleccionada." },
  { name: "imageAlt", type: "string", default: `""`, description: "Alt de la imagen grande." },
  { name: "selectedIndex", type: "number", description: "Índice seleccionado (controlado, 0-based)." },
  { name: "defaultIndex", type: "number", default: "0", description: "Índice inicial (no controlado)." },
  { name: "onSelect", type: "(index: number) => void", description: "Cambio de imagen (miniatura o flechas)." },
  { name: "onExpand", type: "MouseEventHandler<HTMLButtonElement>", description: "Click en el botón expandir." },
  { name: "embedded", type: "boolean", default: "false", description: "Visor a ras, sin sombra ni redondeo propios." },
  { name: "header", type: "ReactNode", description: "Slot opcional arriba del visor, dentro de la card." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function CardViewerHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>CardViewer</h1>
      <p style={{ ...muted, fontSize: 16 }}>Visor de imagen con controles glass y filmstrip de miniaturas drag-to-scroll.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={520}
          code={`<CardViewer images={["/a.jpg", "/b.jpg", "/c.jpg", "/d.jpg"]} />`}
        >
          <CardViewer images={DEMO_IMAGES} />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="cardviewer" />

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
              <Preview tone={ex.tone} code={ex.code} minHeight={520}>
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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>CardViewer.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="CardViewer.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
