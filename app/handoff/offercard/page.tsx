/**
 * /handoff/offercard — Documentación de OfferCard (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import OfferCard from "@/src/components/OfferCard";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/OfferCard/OfferCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer OfferCard.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import OfferCard from "@/src/components/OfferCard";

<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 9,999"
  imageSrc="/img/bronco.jpg"
  onClick={() => router.push("/subasta/123")}
/>`;

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
    description: "Barra naranja con gema, precio y like.",
    node: <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/demo/bronco.jpg" interactive={false} />,
    code: `<OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/img/q3.jpg" />`,
  },
  {
    id: "negotiable",
    title: "Negotiable",
    description: "Barra teal, solo like (sin precio).",
    node: <OfferCard variant="negotiable" name="Audi Q3" year="2026" imageSrc="/demo/bronco.jpg" interactive={false} />,
    code: `<OfferCard variant="negotiable" name="Audi Q3" year="2026" imageSrc="/img/q3.jpg" />`,
  },
  {
    id: "elevated",
    title: "Elevated",
    description: "Sombra más marcada para destacar la card.",
    node: <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/demo/bronco.jpg" elevated interactive={false} />,
    code: `<OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/img/q3.jpg" elevated />`,
  },
  {
    id: "no-image",
    title: "Sin imagen",
    description: "Slot de imagen vacío como placeholder.",
    node: <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" interactive={false} />,
    code: `<OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" />`,
  },
];

const API: PropRow[] = [
  { name: "variant", type: `"live" | "negotiable"`, default: "—", description: "Barra inferior y fila de precio (live) vs solo like (negotiable)." },
  { name: "name", type: "string", default: "—", description: "Nombre del vehículo (truncado con ellipsis)." },
  { name: "year", type: "string | number", default: "—", description: "Año de la oferta." },
  { name: "price", type: "string", description: "Precio formateado. Solo se muestra en variant=\"live\"." },
  { name: "imageSrc", type: "string", description: "URL de la imagen (object-fit: cover)." },
  { name: "imageAlt", type: "string", default: "name", description: "Alt text de la imagen." },
  { name: "badge", type: "JSX.Element", description: "Pill de estado renderizado sobre la imagen." },
  { name: "liked", type: "boolean", description: "Estado del like (controlado)." },
  { name: "onLikeChange", type: "(liked: boolean) => void", description: "Callback al alternar el like." },
  { name: "onClick", type: "() => void", description: "Click en la card (añade role=button y Enter/Space)." },
  { name: '"aria-label"', type: "string", default: "name", description: "Etiqueta accesible de la card." },
  { name: "interactive", type: "boolean", default: "true", description: "false → showcase estático, sin hover/press." },
  { name: "elevated", type: "boolean", default: "false", description: "Sombra elevada." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function OfferCardHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>OfferCard</h1>
      <p style={{ ...muted, fontSize: 16 }}>Card de oferta de vehículo con imagen, precio y botón de favorito. En la variante live la fila de precio incluye un icono de gema fijo integrado (no se controla por props).</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          minHeight={300}
          code={`<OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/img/q3.jpg" />
<OfferCard variant="negotiable" name="Audi Q3" year="2026" imageSrc="/img/q3.jpg" />`}
        >
          <OfferCard variant="live" name="Audi Q3" year="2026" price="US$ 9,999" imageSrc="/demo/bronco.jpg" interactive={false} />
          <OfferCard variant="negotiable" name="Audi Q3" year="2026" imageSrc="/demo/bronco.jpg" interactive={false} />
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="offercard" />

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
              <Preview tone={ex.tone} code={ex.code} minHeight={280}>
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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>OfferCard.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="OfferCard.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
