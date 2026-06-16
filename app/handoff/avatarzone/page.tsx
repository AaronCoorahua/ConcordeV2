/**
 * /handoff/avatarzone
 * Generado por Concorde — NO EDITAR (regenerar con /concorde AvatarZone)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import AvatarZone from "@/src/components/AvatarZone/AvatarZone";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/AvatarZone/AvatarZone.tsx"), "utf8");
  } catch {
    return "// No se pudo leer AvatarZone.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./AvatarZone";
export type { AvatarZoneProps, AvatarZoneSize } from "./AvatarZone";
`;

const USAGE = `import AvatarZone from "@/components/AvatarZone/AvatarZone";

// Avatar por defecto (md, 32px, decorativo)
<AvatarZone />

// Small (24px)
<AvatarZone size="sm" />

// Tamaño custom en px + texto accesible
<AvatarZone size={48} title="Mi cuenta" />`;

export default function AvatarZoneHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "AvatarZone",
    description:
      "Avatar circular con relleno gradiente naranja (#FF9639 → #BE3D00) y silueta de persona blanca centrada. Ícono estático, no interactivo.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "AvatarZone.tsx",
        code: source,
        level: "must",
        desc: "Ícono SVG self-contained, gradiente con id único por instancia (useId), zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import AvatarZone from "@/src/components/AvatarZone/AvatarZone";',
      'import AvatarZone from "@/src/components/AvatarZone";',
    ],
    usage: USAGE,
    props: [
      { prop: "size", type: '"sm" | "md" | number', def: '"md"', note: "sm 24px · md 32px · o número de px" },
      { prop: "title", type: "string", def: "—", note: "Texto accesible (aria-label). Sin él, es decorativo (aria-hidden)" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre el <svg>" },
    ],
    variants: [
      { name: "sm", size: "24px", note: 'size="sm"' },
      { name: "md", size: "32px", note: 'size="md" (default)' },
      { name: "number", size: "px custom", note: "size={48} — cualquier número de px" },
    ],
    states: undefined,
    tokens: [
      { zone: "Relleno (gradiente)", token: "#FF9639 → #EF852E → #BE3D00" },
      { zone: "Silueta persona", token: "white" },
    ],
    qa: [
      "Render size=sm (24px) sin recortes ni overflow.",
      "Render size=md (32px) sin recortes ni overflow.",
      "Render size={48} (número de px custom) escala correctamente.",
      "Relleno con gradiente naranja #FF9639 → #BE3D00 visible.",
      "Silueta de persona blanca centrada dentro del círculo.",
      "Ids de gradiente/clip son únicos por instancia (useId) — sin colisión al renderizar múltiples avatares.",
      "Con title => role=\"img\" + aria-label presentes para accesibilidad.",
      "Sin title => aria-hidden (decorativo).",
    ],
    sourcePath: "src/components/AvatarZone/AvatarZone.tsx",
  };

  const previewBgDark = "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";
  const previewBgLight = "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>AvatarZone</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — avatar circular con gradiente naranja y silueta de persona blanca. Extraído de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · AvatarZone
          </code>
        </p>
      </div>

      {/* Preview — fondo oscuro: sm · md · custom 48 */}
      <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo oscuro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm 24 · md 32 · size=48</span>
        </div>
        <div style={{ padding: "32px 24px", background: previewBgDark, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <AvatarZone size="sm" />
          <AvatarZone size="md" />
          <AvatarZone size={48} title="Mi cuenta" />
        </div>
      </div>

      {/* Preview — fondo claro */}
      <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · fondo claro</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>sm 24 · md 32 · size=48</span>
        </div>
        <div style={{ padding: "24px", background: previewBgLight, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "center" }}>
          <AvatarZone size="sm" />
          <AvatarZone size="md" />
          <AvatarZone size={48} title="Mi cuenta" />
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
        filename="AvatarZone.tsx"
        note="Visual de Figma + SVG inline de Concorde. Pégalo como src/components/AvatarZone/AvatarZone.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
