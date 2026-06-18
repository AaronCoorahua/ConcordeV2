/**
 * /handoff/bidposition
 * Generado por Concorde — NO EDITAR (regenerar con /concorde BidPosition)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "./Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/BidPosition/BidPosition.tsx"), "utf8");
  } catch {
    return "// No se pudo leer BidPosition.tsx en build.";
  }
}

const INDEX_TS = `export { default } from "./BidPosition";
export type { BidPositionProps, BidPositionItem } from "./BidPosition";
`;

const USAGE = `import BidPosition, { type BidPositionItem } from "@/components/BidPosition";

// Data-driven: la 1ª posición es live (naranja + trofeo), el resto vault.
// Columnas: PUESTO (ordinal) · USUARIO (name) · BIDS (value).
const positions: BidPositionItem[] = [
  { name: "rodrigo_88", value: "12" },
  { name: "ana.valdez", value: "9" },
  { name: "jp_motors", value: "7" },
];

<BidPosition positions={positions} />

// Encabezados de columna editables (defaults PUESTO / USUARIO / BIDS)
<BidPosition rankLabel="PUESTO" nameLabel="POSTOR" bidsLabel="BIDS" positions={positions} />

// Con defaults (5 posiciones de ejemplo)
<BidPosition />`;

export default function BidPositionHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "BidPosition",
    description:
      "Tabla de posiciones de pujas: card morada (radio 16, borde gradiente, sombra) con header «POSICIONES» y divisor; filas tipo pastilla. 1ª posición live naranja (#FF9639→#BE3D00) con trofeo dorado (#FBC47D), el resto vault morado (#19004A→#3B1782→#2E0F70) con borde #99A1AF. Data-driven, estático.",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "BidPosition.tsx",
        code: source,
        level: "must",
        desc: "Card self-contained (CSS-in-JS, gradient-border) · trofeo SVG · zero deps",
      },
      {
        filename: "index.ts",
        code: INDEX_TS,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import BidPosition from "@/src/components/BidPosition/BidPosition";',
      'import BidPosition, { type BidPositionItem } from "@/src/components/BidPosition";',
    ],
    usage: USAGE,
    props: [
      { prop: "rankLabel", type: "string", def: '"PUESTO"', note: "Encabezado columna izquierda" },
      { prop: "nameLabel", type: "string", def: '"USUARIO"', note: "Encabezado columna central" },
      { prop: "bidsLabel", type: "string", def: '"BIDS"', note: "Encabezado columna derecha" },
      { prop: "positions", type: "BidPositionItem[]", def: "5 ítems", note: "Filas; la 1ª se renderiza como live, el resto vault" },
      { prop: "className", type: "string", def: '""', note: "Clases extra sobre .pbidpos" },
      { prop: "BidPositionItem.name", type: "string", def: "—", note: "Usuario/nombre (columna central, se trunca)" },
      { prop: "BidPositionItem.value", type: "string", def: "—", note: "Nº de bids (columna derecha)" },
      { prop: "BidPositionItem.rank", type: "string?", def: '`${i+1}°`', note: "Override del ordinal (default: índice + «°»)" },
    ],
    variants: [
      { name: "Fila live (1ª posición)", cssClass: ".pbidpos__row--live", size: "h 28", note: "Naranja + borde gradiente + trofeo dorado" },
      { name: "Fila vault (resto)", cssClass: ".pbidpos__row--vault", size: "h 28", note: "Morado + borde gris #99A1AF, sin trofeo" },
    ],
    states: [
      { state: "live", selector: "row[0]", transform: "—", effects: "Relleno naranja + trofeo SVG dorado con glow" },
      { state: "vault", selector: "row[1..n]", transform: "—", effects: "Relleno morado + borde gris, sin trofeo" },
    ],
    tokens: [
      { zone: "Card relleno", token: "#5F3ED8 → #340091 → #140046" },
      { zone: "Card borde (gradiente)", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Card sombra", token: "rgba(0,0,0,0.35) 0px 0px 20px 4px" },
      { zone: "Fila live relleno", token: "#FF9639 → #EF852E → #BE3D00" },
      { zone: "Fila live borde", token: "white → #F4AC59 → #8460E5 → white" },
      { zone: "Fila vault relleno", token: "#19004A → #3B1782 → #2E0F70" },
      { zone: "Fila vault borde", token: "#99A1AF" },
      { zone: "Trofeo", token: "#FBC47D + drop-shadow glow rgba(240,187,59,0.65)" },
      { zone: "Divisor header", token: "rgba(225,227,226,0.45)" },
      { zone: "Radius", token: "card 16 · fila 14" },
    ],
    qa: [
      "Header visible con el título pasado (default «POSICIONES»), en mayúsculas, con divisor inferior.",
      "Se renderizan N filas desde positions (default 5).",
      "La 1ª fila es live (naranja) e incluye el trofeo dorado.",
      "El resto de filas son vault (morado, borde gris) y NO muestran trofeo.",
      "El ordinal se autogenera «N°» por índice, o usa rank si viene como override.",
      "name se trunca con ellipsis cuando excede el ancho disponible.",
      "value queda alineado a la derecha de cada fila.",
      "Sin FOUC en SSR — estilos presentes en el primer render.",
    ],
    sourcePath: "src/components/BidPosition/BidPosition.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>BidPosition</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — tabla de posiciones de pujas (card morada) con 1ª posición live naranja + trofeo y resto vault morado. Extraída de{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>
            Figma VOYAGER · BidPosition
          </code>
        </p>
      </div>

      {/* Live demo — leaderboard que se reordena con animaciones suaves */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="BidPosition.tsx"
        note="Visual de Figma + CSS-in-JS de Concorde. Pégalo como src/components/BidPosition/BidPosition.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
