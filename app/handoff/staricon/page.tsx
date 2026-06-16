/**
 * /handoff/staricon
 * Generado por Concorde — NO EDITAR (regenerar con /concorde StarIcon)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import StarIcon from "@/src/components/StarIcon/StarIcon";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/StarIcon/StarIcon.tsx"), "utf8");
  } catch {
    return "// No se pudo leer StarIcon.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./StarIcon";
export type { StarIconProps, StarIconSize } from "./StarIcon";
`;

const USAGE = `import StarIcon from "@/components/StarIcon/StarIcon";

// Tamaño por defecto (md = 28px)
<StarIcon />

// Small (20px)
<StarIcon size="sm" />

// Número de px custom + texto accesible
<StarIcon size={40} title="Destacado" />`;

export default function StarIconHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "StarIcon",
    description:
      "Insignia de estrella: círculo gradiente naranja→lila con borde gradiente y estrella blanca. Drop + inner shadow. Ícono estático, no interactivo.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "StarIcon.tsx",
        code: source,
        level: "must",
        desc: "Ícono SVG self-contained, gradientes con id único por instancia (useId), zero deps.",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import StarIcon from "@/src/components/StarIcon/StarIcon";',
      'import StarIcon from "@/src/components/StarIcon";',
    ],
    usage: USAGE,
    props: [
      { prop: "size", type: '"sm" | "md" | number', def: '"md"', note: "sm 20px · md 28px · o número de px" },
      { prop: "title", type: "string", def: "—", note: "Texto accesible (aria-label). Si se omite → decorativo (aria-hidden)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre el <svg>" },
    ],
    variants: [
      { name: "sm", size: "20px", note: 'size="sm" — estrella compacta' },
      { name: "md", size: "28px", note: 'size="md" (default)' },
      { name: "number", size: "px custom", note: "size={40} — cualquier valor numérico en px" },
    ],
    states: undefined,
    tokens: [
      { zone: "Relleno (círculo)", token: "#ED8936 → #8460E5" },
      { zone: "Borde (gradiente)", token: "#ffffff → #FBC47D → #AE8EFF → #ffffff" },
      { zone: "Estrella", token: "white" },
      { zone: "Drop shadow", token: "naranja rgba(237,137,54,0.3)" },
      { zone: "Inner shadow", token: "white @ opacity 0.28" },
    ],
    qa: [
      "Render size=sm (20px) y size=md (28px) sin recortes ni overflow.",
      "Render con número custom (p.ej. size={48}) escala el SVG correctamente.",
      "Relleno del círculo muestra gradiente naranja→lila (#ED8936 → #8460E5).",
      "Borde con gradiente (white → #FBC47D → #AE8EFF → white) visible.",
      "Estrella interior blanca y centrada.",
      "Ids de gradientes/filtros son únicos por instancia (useId) — sin colisión al renderizar varias estrellas.",
      "Con title => role=img + aria-label; sin title => aria-hidden (decorativo).",
      "Funciona sobre fondo claro y oscuro sin pérdida de contraste.",
    ],
    sourcePath: "src/components/StarIcon/StarIcon.tsx",
  };

  const previewBg = "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>StarIcon</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — insignia de estrella con círculo gradiente naranja→lila, borde gradiente y estrella blanca. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · StarIcon
          </code>
        </p>
      </div>

      {/* Preview — fondo oscuro · sm + md + custom */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo oscuro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm 20 · md 28 · size=48</span>
        </div>
        <div style={{ padding: "32px 24px", background: previewBg, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <StarIcon size="sm" title="Estrella sm" />
          <StarIcon size="md" title="Estrella md" />
          <StarIcon size={48} title="Estrella destacada" />
        </div>
      </div>

      {/* Preview — fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo claro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm 20 · md 28 · size=48</span>
        </div>
        <div style={{ padding: "32px 24px", background: "#ffffff", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <StarIcon size="sm" title="Estrella sm" />
          <StarIcon size="md" title="Estrella md" />
          <StarIcon size={48} title="Estrella destacada" />
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
        filename="StarIcon.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/StarIcon/StarIcon.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
