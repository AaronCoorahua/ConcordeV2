/**
 * /handoff/bidproposal — Documentación de BidProposal (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import BidProposal from "@/src/components/BidProposal";
import BidProposalDemo from "./BidProposalDemo";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidProposal/BidProposal.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidProposal.tsx en build.";
  }
}

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import BidProposal from "@/src/components/BidProposal";

// Al cambiar 'flash' se dispara la animación de nuevo bid.
<BidProposal amount="US$ 6,559" flash={flash} flashMode="bulb" />`;

const LIVE_USAGE = `const [flash, setFlash] = useState(0);
const [mode, setMode] = useState<BidProposalFlashMode>("combo");
const [colors, setColors] = useState(["#F4AC59", "#8460E5", "#ffffff"]);

// dispara la animación cada vez que llega un bid (aquí, cada 2 s)
useEffect(() => {
  const t = setInterval(() => setFlash((f) => f + 1), 2000);
  return () => clearInterval(t);
}, []);

<BidProposal amount="US$ 6,559" flash={flash} flashMode={mode} flashColors={colors} />`;

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
    description: "Monto y caption por defecto.",
    tone: "dark",
    node: <BidProposal />,
    code: `<BidProposal />`,
  },
  {
    id: "editable",
    title: "Monto y caption",
    description: "Ambos textos son editables.",
    tone: "dark",
    node: <BidProposal amount="US$ 7,191" label="ENVIADO POR KAHTH4" />,
    code: `<BidProposal amount="US$ 7,191" label="ENVIADO POR KAHTH4" />`,
  },
];

const API: PropRow[] = [
  { name: "amount", type: "string", default: `"US$ 6,559"`, description: "Monto grande blanco." },
  { name: "label", type: "string", default: `"ENVIADO POR ZAE389"`, description: "Caption inferior lila." },
  { name: "flash", type: "number", default: "0", description: "Al cambiar, dispara la animación de nuevo bid." },
  { name: "flashColors", type: "string[]", default: `["#F4AC59","#8460E5","#ffffff"]`, description: "Colores del efecto de luz." },
  { name: "flashMode", type: `"bulb" | "spin" | "explode" | "pulse" | "combo" | "shine"`, default: `"bulb"`, description: "Tipo de efecto al iluminarse." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const h3 = { fontSize: 15, fontWeight: 600, color: "#18181b", margin: "0 0 4px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function BidProposalHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>BidProposal</h1>
      <p style={{ ...muted, fontSize: 16 }}>Propuesta de bid glassmorphic con animación de luz en cada nuevo bid.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview
          tone="dark"
          minHeight={240}
          code={`<BidProposal />
<BidProposal amount="US$ 7,191" label="ENVIADO POR KAHTH4" />`}
        >
          <BidProposal />
          <BidProposal amount="US$ 7,191" label="ENVIADO POR KAHTH4" />
        </Preview>
      </div>

      {/* Live / interactivo */}
      <h2 style={h2}>En vivo (efecto + color)</h2>
      <p style={{ ...muted, marginBottom: 12 }}>
        La animación de nuevo bid se dispara sola cada 2 s. Mismos efectos
        (<code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>flashMode</code>)
        y paletas (<code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>flashColors</code>)
        que usa el bloque <a href="/blocks/sala" style={{ color: "#4f2ed8", fontWeight: 600 }}>Sala</a>.
      </p>
      <Preview tone="dark" minHeight={340} code={LIVE_USAGE}>
        <BidProposalDemo />
      </Preview>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="bidproposal" />

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
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>BidProposal.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="BidProposal.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
