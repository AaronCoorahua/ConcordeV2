/**
 * /handoff/categorycard
 * Generado por Concorde — NO EDITAR (regenerar con /concorde CategoryCard)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CategoryCard from "@/src/components/CategoryCard/CategoryCard";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

const CATEGORIES = ["vehicular", "maquinaria", "equipos-diversos", "articulos-diversos"] as const;

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/CategoryCard/CategoryCard.tsx"), "utf8");
  } catch {
    return "// No se pudo leer CategoryCard.tsx en build.";
  }
}

const INDEX_TS = `export { default as CategoryCard } from "./CategoryCard";
export type { CategoryCardProps, CategoryCardCategory } from "./CategoryCard";
`;

export default function CategoryCardHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "CategoryCard",
    description: "Card de categoría con ícono gradiente, label y borde lila — extraída de Figma VOYAGER.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "CategoryCard.tsx",
        code: source,
        level: "must",
        desc: "Componente self-contained (CSS-in-JS + íconos SVG inline, zero deps).",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      `import CategoryCard from "@/src/components/CategoryCard/CategoryCard";`,
      `import { CategoryCard } from "@/src/components/CategoryCard";`,
    ],
    usage: `<CategoryCard category="vehicular" onClick={() => filter("vehicular")} />
<CategoryCard category="maquinaria" onClick={() => filter("maquinaria")} />
<CategoryCard category="equipos-diversos" onClick={() => filter("equipos-diversos")} />
<CategoryCard category="articulos-diversos" onClick={() => filter("articulos-diversos")} />

// Override del label
<CategoryCard category="vehicular" label="AUTOS" />`,
    props: [
      { prop: "category", type: "CategoryCardCategory", note: "Determina ícono y label por defecto. Union de 4 valores." },
      { prop: "label", type: "string", def: "LABEL_DEFAULTS[category]", note: "Override del label visible (admite \\n)." },
      { prop: "onClick", type: "() => void", def: "—", note: "Handler de click." },
      { prop: "aria-label", type: "string", def: "label sin saltos", note: "Aria label accesible." },
      { prop: "className", type: "string", def: "\"\"", note: "Clases extra sobre .pcatcard." },
    ],
    variants: [
      { name: "vehicular", cssClass: ".pcatcard", note: "Ícono carro · label \"VEHICULAR\"." },
      { name: "maquinaria", cssClass: ".pcatcard", note: "Ícono grúa · label \"MAQUINARIA\"." },
      { name: "equipos-diversos", cssClass: ".pcatcard", note: "Ícono medidor · label \"EQUIPOS\\nDIVERSOS\"." },
      { name: "articulos-diversos", cssClass: ".pcatcard", note: "Ícono monitor · label \"ARTÍCULOS\\nDIVERSOS\"." },
    ],
    states: [
      { state: "hover", selector: ".pcatcard:hover", transform: "translateY(-4px)", effects: "Sombra vault elevada · borde más saturado · glow ::after opacity 0.3." },
      { state: "active", selector: ".pcatcard:active", transform: "scale(0.96)", effects: "opacity 0.58 · bg atenuado · sombra inset." },
      { state: "focus", selector: ".pcatcard:focus-visible", transform: "—", effects: "outline 2px vault-400 · outline-offset 3px." },
    ],
    tokens: [
      { zone: "Borde gradiente", token: "linear-gradient(135deg, #9c96f8 → rgba(255,255,255,.65) → #7364de → #9c96f8)" },
      { zone: "Bg default", token: "linear-gradient(160deg, #ffffff → #f4f5f9)" },
      { zone: "Glass highlight ::before", token: "linear-gradient(160deg, rgba(255,255,255,.55) → transparent)" },
      { zone: "Glow ::after", token: "radial oklch(0.4 0.2 285 / .22), blur 8px" },
      { zone: "Sombra base", token: "rgba(32,0,104,.08) 0 2px 10px" },
      { zone: "Ícono", token: "linearGradient #653DE9 → #300089 → #0F003B" },
      { zone: "Label", token: "#3b1782 · var(--vmc-font-display)" },
      { zone: "Focus ring", token: "var(--vmc-color-vault-400, oklch(0.62 0.20 285))" },
      { zone: "Radio", token: "var(--vmc-radius-md, 8px)" },
    ],
    qa: [
      "Las 4 categorías renderizan su ícono y label correctos.",
      "En listas, los gradientes SVG no colisionan (IDs únicos vía useId()).",
      "Hover eleva la card (translateY -4px) y activa el glow inferior.",
      "Active aplica scale(0.96) + opacity reducida al presionar.",
      ":focus-visible muestra el outline vault solo con teclado.",
      "El label override (prop label) reemplaza el default y respeta saltos de línea.",
      "aria-label cae al label sin saltos de línea cuando no se pasa override.",
      "Funciona sin CSS externo ni tokens (usa fallbacks) y respeta prefers-reduced-motion.",
    ],
    sourcePath: "src/components/CategoryCard/CategoryCard.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>CategoryCard</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec & Handoff — 4 categorías (ícono gradiente + label) extraídas de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER
          </code>
        </p>
      </div>

      {/* Preview — 4 categorías */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · default</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>vehicular · maquinaria · equipos-diversos · articulos-diversos</span>
        </div>
        <div style={{ padding: "36px 32px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
          {CATEGORIES.map(function renderCard(cat) {
            return <CategoryCard key={cat} category={cat} />;
          })}
        </div>
      </div>

      {/* Preview — hover + click sobre fondo */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · interactivo</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>hover · active · label override</span>
        </div>
        <div style={{ padding: "36px 32px", background: "linear-gradient(135deg, #f1f5f9 0%, #e8eef7 100%)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
          {CATEGORIES.map(function renderCard(cat) {
            return <CategoryCard key={cat} category={cat} />;
          })}
          <CategoryCard category="vehicular" label="AUTOS" />
        </div>
      </div>

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="CategoryCard.tsx"
        note="Visual de Figma VOYAGER + animación de Concorde. Pégalo como src/components/CategoryCard/CategoryCard.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
