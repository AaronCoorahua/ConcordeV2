/**
 * /handoff/input
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Input)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/input/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Input/Input.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Input.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./Input";
export type { InputProps, InputVariant } from "./Input";
`;

const USAGE = `// 3 variantes (la apariencia del borde la fija "variant")
<Input variant="default" placeholder="Suscríbete a las novedades" />
<Input variant="focus" defaultValue="correo@ejemplo.com" />
<Input
  variant="error"
  defaultValue="correo-malo"
  errorMessage="Ingresa un correo válido"
/>

// Controlado (value + onChange)
const [email, setEmail] = useState("");
<Input
  variant="default"
  value={email}
  onChange={(v) => setEmail(v)}
  placeholder="correo@ejemplo.com"
  type="email"
/>`;

export default function InputHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "Input",
    description:
      "Campo de texto 234×48, radio 16. 3 variantes definidas por el borde: default (gradiente lila→cream), focus (gradiente naranja→vault + glow) y error (rojo sólido con mensaje de ayuda).",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "Input.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, gradient-border, zero deps)",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import Input from "@/src/components/Input/Input";',
      'import Input from "@/src/components/Input";',
    ],
    usage: USAGE,
    props: [
      { prop: "variant", type: '"default" | "focus" | "error"', def: '"default"', note: "Apariencia del borde. El foco real activa el borde focus solo." },
      { prop: "value", type: "string", def: "—", note: "Valor controlado (activa modo controlado)." },
      { prop: "defaultValue", type: "string", def: "—", note: "Valor inicial (no controlado)." },
      { prop: "placeholder", type: "string", def: "—", note: "Texto guía (#6B7280)." },
      { prop: "type", type: "string", def: '"text"', note: "type del input nativo (text, email, password…)." },
      { prop: "disabled", type: "boolean", def: "false", note: "Aplica opacity 0.6 y cursor not-allowed." },
      { prop: "errorMessage", type: "string", def: '"Ingresa un correo válido"', note: "Mensaje rojo bajo el campo; visible con variant=\"error\"." },
      { prop: "onChange", type: "(value: string) => void", def: "—", note: "Recibe el string del input, no el evento." },
      { prop: "name", type: "string", def: "—", note: "Atributo name del input nativo." },
      { prop: "id", type: "string", def: "—", note: "Atributo id del input nativo." },
      { prop: "aria-label", type: "string", def: "—", note: "Etiqueta accesible cuando no hay <label>." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .pinput-root." },
    ],
    variants: [
      { name: "default", cssClass: ".pinput", size: "234×48 · radio 16", note: "Borde gradiente 1px #8460E5 → #FFF8F1 sobre relleno blanco." },
      { name: "focus", cssClass: ".pinput--focus", size: "234×48 · radio 16", note: "Borde gradiente 2px #ED8936 → #8460E5 + glow naranja." },
      { name: "error", cssClass: ".pinput--error", size: "234×48 · radio 16", note: "Borde rojo 1px #EF4444 + mensaje de ayuda rojo debajo." },
    ],
    states: [
      { state: "focus real", selector: ".pinput:focus-within", transform: "border-width 1→2px", effects: "Toma el borde naranja de focus automáticamente + glow." },
      { state: "disabled", selector: ".pinput--disabled / :disabled", transform: "—", effects: "opacity 0.6 · cursor not-allowed." },
      { state: "error", selector: ".pinput--error[, :focus-within]", transform: "—", effects: "Borde rojo gana sobre focus · aria-invalid=true · sin glow." },
      { state: "reduced motion", selector: "@media (prefers-reduced-motion)", transform: "—", effects: "transition: none." },
    ],
    tokens: [
      { zone: "Borde default", token: "#8460E5 → #FFF8F1" },
      { zone: "Borde focus", token: "#ED8936 → #8460E5" },
      { zone: "Glow focus", token: "rgba(237,137,54,0.15) 0px 2px 6px" },
      { zone: "Borde error", token: "#EF4444" },
      { zone: "Texto", token: "#191C1C" },
      { zone: "Placeholder", token: "#6B7280" },
    ],
    qa: [
      "Renderiza las 3 variantes (default, focus, error) con el borde correcto.",
      "Al enfocar un input default, toma automáticamente el borde de focus (:focus-within).",
      "variant=\"error\" muestra el mensaje rojo y fija aria-invalid=\"true\".",
      "El mensaje de error se asocia vía aria-describedby al input.",
      "Modo controlado (value + onChange) refleja cada tecla en el estado padre.",
      "Modo no controlado (defaultValue) conserva el valor inicial sin onChange.",
      "disabled aplica opacity 0.6 y bloquea la edición.",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
      "Respeta prefers-reduced-motion: reduce (sin transiciones).",
    ],
    sourcePath: "src/components/Input/Input.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Input</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — campo de texto 234×48 (radio 16) con 3 variantes por el borde:{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>default</code>,{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>focus</code> y{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>error</code>.
        </p>
      </div>

      {/* Preview interactivo */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="Input.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/Input/Input.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
