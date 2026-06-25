/**
 * /handoff/table — Documentación de Table (estilo shadcn, limpio).
 */

import type { JSX, ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Table, { type TableColumn } from "@/src/components/Table";
import DocButton from "@/src/components/DocButton";
import Preview from "@/app/handoff/_components/Preview";
import CodeBlock from "@/app/handoff/_components/CodeBlock";
import InstallCommand from "@/app/handoff/_components/InstallCommand";
import PropsTable, { type PropRow } from "@/app/handoff/_components/PropsTable";

function readComponentSource(): string {
  try {
    return readFileSync(join(process.cwd(), "src/components/Table/Table.tsx"), "utf8");
  } catch {
    return "// No se pudo leer Table.tsx en build.";
  }
}

// ── Datos de demo ─────────────────────────────────────────────────────────────

const PURPLE = "#5F3ED8";
const ORANGE = "#EF852E";

function Amount({ sign, children }: { sign: "+" | "-"; children: ReactNode }): JSX.Element {
  return (
    <span style={{ color: PURPLE, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
      <span style={{ color: sign === "+" ? ORANGE : PURPLE, marginRight: 6 }}>{sign === "+" ? "+" : "−"}</span>
      {children}
    </span>
  );
}

function ActionButtons(): JSX.Element {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <DocButton action="download" />
      <DocButton action="view" />
    </span>
  );
}

function PurpleText({ children }: { children: ReactNode }): JSX.Element {
  return <span style={{ color: PURPLE, fontWeight: 700 }}>{children}</span>;
}

const columns: TableColumn[] = [
  { header: "FECHA" },
  { header: "DESCRIPCIÓN" },
  { header: "MONTO", align: "right" },
  { header: "DOCUMENTOS", align: "center" },
];

const rows: ReactNode[][] = [
  [
    <PurpleText key="d">23-04-2024</PurpleText>,
    <span key="t" style={{ color: "#070C0C" }}>Pago de garantía</span>,
    <Amount key="m" sign="-">USD 80</Amount>,
    <ActionButtons key="a" />,
  ],
  [
    <PurpleText key="d">02-05-2024</PurpleText>,
    <span key="t" style={{ color: "#070C0C" }}>Abono de subasta</span>,
    <Amount key="m" sign="+">USD 200</Amount>,
    <ActionButtons key="a" />,
  ],
  [
    <PurpleText key="d">18-05-2024</PurpleText>,
    <span key="t" style={{ color: "#070C0C" }}>Comisión de remate</span>,
    <Amount key="m" sign="-">USD 320</Amount>,
    <ActionButtons key="a" />,
  ],
];

// ── Contenido ───────────────────────────────────────────────────────────────

const USAGE = `import Table, { type TableColumn } from "@/src/components/Table";

const columns: TableColumn[] = [
  { header: "Fecha" },
  { header: "Monto", align: "right" },
];

const rows: ReactNode[][] = [
  ["23-04-2024", "USD 80"],
  ["02-05-2024", "USD 200"],
];

<Table columns={columns} rows={rows} caption="Movimientos de la cuenta" />`;

const API: PropRow[] = [
  { name: "columns", type: "TableColumn[]", description: "Definición de columnas: { header, align?, width? }." },
  { name: "rows", type: "ReactNode[][]", description: "Filas: cada una es un arreglo de celdas alineado a columns." },
  { name: "caption", type: "string", description: "Texto accesible de la tabla (sr-only)." },
  { name: "className", type: "string", default: `""` },
];

// ── Estilos de sección ───────────────────────────────────────────────────────

const h2 = { fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "48px 0 16px" } as const;
const muted = { fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 } as const;

export default function TableHandoffPage(): JSX.Element {
  const source = readComponentSource();

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 96px", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)", color: "#09090b" }}>

      {/* Title */}
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Table</h1>
      <p style={{ ...muted, fontSize: 16 }}>Tabla de datos data-driven con header de gradiente morado.</p>

      {/* Hero preview */}
      <div style={{ marginTop: 28 }}>
        <Preview minHeight={280} code={USAGE}>
          <div style={{ width: "100%" }}>
            <Table columns={columns} rows={rows} caption="Movimientos de la cuenta" />
          </div>
        </Preview>
      </div>

      {/* Installation */}
      <h2 style={h2}>Instalación</h2>
      <InstallCommand name="table" />

      {/* Usage */}
      <h2 style={h2}>Uso</h2>
      <CodeBlock code={USAGE} />

      {/* Examples */}
      <h2 style={h2}>Ejemplos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ ...muted, marginBottom: 12 }}>Celdas ReactNode: texto, montos con color y botones DocButton.</p>
          <Preview code={USAGE} minHeight={280}>
            <div style={{ width: "100%" }}>
              <Table columns={columns} rows={rows} caption="Movimientos de la cuenta" />
            </div>
          </Preview>
        </div>
      </div>

      {/* API */}
      <h2 style={h2}>API</h2>
      <PropsTable rows={API} />

      {/* Component source (oculto por defecto) */}
      <h2 style={h2}>Código del componente</h2>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 14, color: "#52525b", padding: "10px 14px", border: "1px solid #e4e4e7", borderRadius: 10, background: "#fafafa", userSelect: "none", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Ver <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>Table.tsx</code> completo · self-contained · zero deps</span>
          <span style={{ color: "#a1a1aa" }}>▾</span>
        </summary>
        <div style={{ marginTop: 12 }}>
          <CodeBlock code={source} filename="Table.tsx" maxHeight={520} />
        </div>
      </details>

    </main>
  );
}
