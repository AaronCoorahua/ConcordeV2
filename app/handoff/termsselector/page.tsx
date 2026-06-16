/**
 * /handoff/termsselector
 * Generado por Concorde — NO EDITAR (regenerar con /concorde TermsSelector)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/termsselector/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/TermsSelector/TermsSelector.tsx"), "utf8");
  } catch {
    return "// No se pudo leer TermsSelector.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./TermsSelector";
export type { TermsSelectorProps } from "./TermsSelector";
`;

const USAGE = `// Controlado (checked + onChange)
const [accepted, setAccepted] = useState(false);
<TermsSelector checked={accepted} onChange={(v) => setAccepted(v)} />

// No controlado (defaultChecked)
<TermsSelector defaultChecked />

// Etiqueta custom vía children
<TermsSelector>
  Acepto la <a href="/legal">política de privacidad</a>.
</TermsSelector>

// Deshabilitado
<TermsSelector disabled defaultChecked />`;

export default function TermsSelectorHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "TermsSelector",
    description:
      "Checkbox de términos: casilla 16×16 (radio 4) con relleno y borde gradiente al marcar (#8460E5 → #3B1782) y una etiqueta en #3B1782. Controlado o no controlado.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "TermsSelector.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS, checkbox accesible, zero deps)",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import TermsSelector from "@/src/components/TermsSelector/TermsSelector";',
      'import TermsSelector from "@/src/components/TermsSelector";',
    ],
    usage: USAGE,
    props: [
      { prop: "checked", type: "boolean", def: "—", note: "Estado marcado controlado (activa modo controlado)." },
      { prop: "defaultChecked", type: "boolean", def: "—", note: "Estado inicial (no controlado)." },
      { prop: "onChange", type: "(checked: boolean) => void", def: "—", note: "Recibe el booleano marcado/desmarcado, no el evento." },
      { prop: "children", type: "ReactNode", def: '"He leído y acepto los términos y condiciones."', note: "Etiqueta (texto de términos)." },
      { prop: "disabled", type: "boolean", def: "false", note: "Aplica opacity 0.6 y cursor not-allowed." },
      { prop: "id", type: "string", def: "—", note: "Atributo id del input nativo (también enlaza el label)." },
      { prop: "name", type: "string", def: "—", note: "Atributo name del input nativo." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .pterms." },
    ],
    variants: [
      { name: "sin marcar", cssClass: ".pterms__box", size: "16×16 · radio 4", note: "Relleno blanco con borde lila claro #CFC2F2 · check oculto." },
      { name: "marcado", cssClass: ".pterms__input:checked + .pterms__box", size: "16×16 · radio 4", note: "Relleno gradiente + borde gradiente · check blanco visible." },
      { name: "disabled", cssClass: ".pterms--disabled", size: "16×16 · radio 4", note: "opacity 0.6 · cursor not-allowed." },
    ],
    states: [
      { state: "marcado", selector: ".pterms__input:checked + .pterms__box", transform: "background-image → gradiente", effects: "Relleno + borde gradiente y check blanco visible (opacity 1)." },
      { state: "focus teclado", selector: ".pterms__input:focus-visible + .pterms__box", transform: "—", effects: "outline 2px solid #8460E5 · outline-offset 2px." },
      { state: "disabled", selector: ".pterms--disabled / :disabled", transform: "—", effects: "opacity 0.6 · cursor not-allowed." },
      { state: "reduced motion", selector: "@media (prefers-reduced-motion)", transform: "—", effects: "transition: none." },
    ],
    tokens: [
      { zone: "Borde sin marcar", token: "#CFC2F2" },
      { zone: "Relleno marcado", token: "#8460E5 → #3B1782" },
      { zone: "Borde marcado", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Check", token: "#ffffff" },
      { zone: "Texto / etiqueta", token: "#3B1782" },
    ],
    qa: [
      "Renderiza el estado marcado y sin marcar con la casilla correcta.",
      "Click sobre la casilla o la etiqueta alterna el estado.",
      "Modo controlado (checked + onChange) refleja el estado en el padre.",
      "Modo no controlado (defaultChecked) conserva el estado inicial sin onChange.",
      "El check blanco es visible solo cuando está marcado.",
      "La etiqueta es clickeable y queda asociada al input vía htmlFor.",
      "Focus por teclado muestra el outline #8460E5 (focus-visible).",
      "disabled aplica opacity 0.6 y bloquea la interacción.",
      "Accesibilidad: usa un <input type=\"checkbox\"> nativo bajo el visual.",
    ],
    sourcePath: "src/components/TermsSelector/TermsSelector.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>TermsSelector</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — checkbox de términos: casilla 16×16 con relleno y borde gradiente al marcar y una etiqueta clickeable.
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
        filename="TermsSelector.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/TermsSelector/TermsSelector.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
