/**
 * /handoff/table
 * Generado por Concorde — NO EDITAR (regenerar con /concorde Table)
 */

import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Preview from "@/app/handoff/table/Preview";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import SpecPanel from "@/app/handoff/_components/SpecPanel";
import type { SpecPanelData } from "@/app/handoff/_components/SpecPanel";

// Server component: lee el código fuente REAL del componente para mostrarlo copiable.
function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Table/Table.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Table.tsx en build.";
  }
}

const INDEX_SOURCE = `export { default } from "./Table";
export type { TableProps, TableColumn, TableAlign } from "./Table";
`;

const USAGE = `// Data-driven: define columns y rows (cada celda es un ReactNode)
const columns: TableColumn[] = [
  { header: "Fecha" },
  { header: "Monto", align: "right" },
  { header: "Docs", align: "center" },
];

const rows: ReactNode[][] = [
  [
    "23-04-2024",
    <span style={{ color: "#5F3ED8", fontWeight: 700 }}>S/ 1,500</span>,
    <DocButton action="download" />,
  ],
  ["02-05-2024", "—", <DocButton action="view" />],
];

<Table columns={columns} rows={rows} caption="Movimientos de la cuenta" />`;

const HTML_TREE = `div.ptable__scroll          (overflow-x:auto · radius 8 · sombra)
└─ table.ptable
   ├─ caption             (sr-only · accesible)
   ├─ thead
   │  └─ tr
   │     └─ th.ptable__th  scope="col"  (header gradiente morado)
   └─ tbody
      └─ tr
         └─ td.ptable__td  (celda ReactNode · divisor #E1E3E2)`;

export default function TableHandoffPage(): JSX.Element {
  const source = readComponentSource();

  const spec: SpecPanelData = {
    name: "Table",
    description:
      "Tabla de datos: header con gradiente morado continuo (#8460E5 → #3B1782), texto blanco en mayúsculas, divisores #E1E3E2, contenedor radius 8 con scroll horizontal. Data-driven: columns + rows de celdas ReactNode (texto, guion, botones DocButton).",
    source: "Figma VOYAGER",
    files: [
      {
        filename: "Table.tsx",
        code: source,
        level: "must",
        desc: "Tabla semántica self-contained (CSS-in-JS, zero deps)",
      },
      {
        filename: "index.ts",
        code: INDEX_SOURCE,
        level: "opt",
        desc: "Barrel export",
      },
    ],
    imports: [
      'import Table from "@/src/components/Table/Table";',
      'import Table, { type TableColumn } from "@/src/components/Table";',
    ],
    usage: USAGE,
    htmlTree: HTML_TREE,
    props: [
      { prop: "columns", type: "TableColumn[]", def: "—", note: "Requerido. Definición de columnas (encabezados). Cada TableColumn: { header: ReactNode; align?: \"left\" | \"center\" | \"right\"; width?: number | string }." },
      { prop: "rows", type: "ReactNode[][]", def: "—", note: "Requerido. Filas: cada una es un arreglo de celdas (ReactNode) alineado a columns." },
      { prop: "caption", type: "string", def: "—", note: "Texto accesible de la tabla (caption sr-only, oculto visualmente)." },
      { prop: "className", type: "string", def: '""', note: "Clase extra sobre .ptable__scroll." },
    ],
    variants: [
      { name: "base", cssClass: ".ptable", size: "100%", note: "Header con gradiente morado, celdas con divisores #E1E3E2, contenedor radius 8." },
    ],
    states: [
      { state: "scroll horizontal", selector: ".ptable__scroll", transform: "overflow-x: auto", effects: "En anchos chicos la tabla hace scroll horizontal sin romper el layout." },
      { state: "última fila", selector: "tbody tr:last-child .ptable__td", transform: "—", effects: "Sin divisor inferior (border-bottom: none)." },
      { state: "celda ReactNode", selector: ".ptable__td", transform: "—", effects: "Soporta celdas ReactNode arbitrarias: texto, guion, botones DocButton (Ver detalle / Descargar comprobante)." },
      { state: "alineación", selector: ".ptable__align-center · .ptable__align-right", transform: "—", effects: "text-align center/right por columna (default left)." },
    ],
    tokens: [
      { zone: "Header (fondo)", token: "linear-gradient(90deg, #8460E5 → #3B1782)" },
      { zone: "Header (texto)", token: "#ffffff · 12px / 600 · uppercase · letter-spacing 0.04em" },
      { zone: "Celda (texto)", token: "#070C0C · 14px / 500 · line-height 20px" },
      { zone: "Divisor", token: "1px solid #E1E3E2" },
      { zone: "Sombra contenedor", token: "rgba(32,0,104,0.06) 0 1px 2px · rgba(32,0,104,0.10) 0 12px 32px" },
      { zone: "Radius", token: "8px" },
    ],
    qa: [
      "Renderiza correctamente con N columnas y N filas según columns + rows.",
      "Alineación por columna: left (default), center y right aplican text-align al th y td.",
      "Soporta celdas ReactNode arbitrarias: botones DocButton, guion (—), texto.",
      "Header con gradiente morado (#8460E5 → #3B1782) y texto blanco en mayúsculas.",
      "Divisores #E1E3E2 entre filas; la última fila no tiene divisor inferior.",
      "Scroll horizontal cuando el contenido excede el ancho del contenedor.",
      "caption accesible presente (sr-only) cuando se pasa la prop.",
      "Sin FOUC en SSR (estilos inyectados con suppressHydrationWarning).",
      "Semántica correcta: table / thead / tbody / th scope=\"col\".",
    ],
    sourcePath: "src/components/Table/Table.tsx",
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Table</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "#dbeafe", color: "#1d4ed8" }}>Concorde · DONE</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Spec &amp; Handoff — tabla de datos data-driven con header de gradiente morado, divisores{" "}
          <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 3 }}>#E1E3E2</code>{" "}
          y celdas ReactNode (texto, guion, botones DocButton).
        </p>
      </div>

      {/* Preview */}
      <Preview />

      {/* Código completo del componente — copy-paste exacto para el developer */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
          Código del componente
        </span>
      </div>
      <CodeViewer
        code={source}
        filename="Table.tsx"
        note="Visual de Figma + estilos de Concorde. Pégalo como src/components/Table/Table.tsx y úsalo tal cual."
      />

      {/* Panel handoff */}
      <SpecPanel {...spec} />

    </main>
  );
}
