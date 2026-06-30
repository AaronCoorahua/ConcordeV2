/**
 * /handoff/offershelf — Documentación de OfferShelf
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import OfferShelf from "@/src/components/OfferShelf";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/OfferShelf.tsx"), "utf8");
  } catch {
    return "// No se pudo leer OfferShelf.tsx en build.";
  }
}

const USAGE = `import OfferShelf from "@/src/components/OfferShelf";

<OfferShelf title="RECOMENDADOS" offersLabel="4 Ofertas" />`;

interface Example { id: string; title: string; description?: string; node: ReactNode; code: string; }

// La sección mide 766px → la escalamos para que entre en la doc sin scroll.
function Stage({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div style={{ width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", background: "#f1f5f9", borderRadius: 12, padding: "24px 0" }}>
      <div style={{ transform: "scale(0.9)", transformOrigin: "center" }}>{children}</div>
    </div>
  );
}

const EXAMPLES: Example[] = [
  {
    id: "meinteresa",
    title: "Otro título",
    description: "El título y la etiqueta de ofertas son props.",
    node: (
      <Stage>
        <OfferShelf title="ME INTERESA" offersLabel="4 Ofertas" />
      </Stage>
    ),
    code: `<OfferShelf title="ME INTERESA" offersLabel="4 Ofertas" />`,
  },
];

const API: PropRow[] = [
  { name: "title",       type: "string",          default: '"RECOMENDADOS"', description: "Título de la sección (CardTitle con brackets)." },
  { name: "offersLabel", type: "string",          default: '"4 Ofertas"',    description: "Subtítulo / nº de ofertas." },
  { name: "offers",      type: "OfferShelfItem[]", description: "Las 4 ofertas: name, year, price?, variant?, imageSrc?, badge?." },
  { name: "className",   type: "string", description: "Clases extra sobre la sección." },
];

const h2    = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3    = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function OfferShelfHandoffPage(): JSX.Element {
  const source = readComponentSource();
  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display,'Plus Jakarta Sans',-apple-system,sans-serif)", color: "#09090b" }}>

      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>OfferShelf</h1>
      <p style={{ ...muted, fontSize: 16 }}>Estante de ofertas (766×352): CardTitle + fila de 4 OfferCards. Compone CardTitle, OfferCard y BadgeStatus.</p>

      <div style={{ marginTop: 28 }}>
        <Preview minHeight={320} code={`<OfferShelf title="RECOMENDADOS" offersLabel="4 Ofertas" />`}>
          <Stage>
            <OfferShelf />
          </Stage>
        </Preview>
      </div>

      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="offershelf" />

      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {EXAMPLES.map(function renderExample(ex) {
          return (
            <div key={ex.id}>
              <h3 style={h3}>{ex.title}</h3>
              {ex.description && <p style={{ ...muted, marginBottom: 12 }}>{ex.description}</p>}
              <Preview code={ex.code} minHeight={320}>{ex.node}</Preview>
            </div>
          );
        })}
      </div>

      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace,monospace", fontSize: 13 }}>OfferShelf.tsx</code> completo</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="OfferShelf.tsx" maxHeight={520} />
        </div>
      </details>
    </main>
  );
}
