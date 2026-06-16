"use client";

/**
 * Preview — demo estática de la Table (client component por seguridad).
 * Replica el diseño Figma: 4 columnas (FECHA · DESCRIPCIÓN · MONTO · DOCUMENTOS)
 * con celdas ReactNode arbitrarias: fecha morada, descripción, monto/guion y
 * acciones (botones DocButton 32×32 — Descargar comprobante + Ver detalle).
 */

import type { JSX, ReactNode } from "react";
import Table from "@/src/components/Table/Table";
import type { TableColumn } from "@/src/components/Table/Table";
import DocButton from "@/src/components/DocButton/DocButton";

const PURPLE = "#5F3ED8"; // vault
const ORANGE = "#EF852E"; // live

/** Monto con signo coloreado: "+" en live (naranja), "−" en vault (morado). */
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

export default function Preview(): JSX.Element {
  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · tabla de datos</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>data-driven · columns + rows</span>
      </div>

      <div style={{ padding: "24px", background: "#f8fafc", width: "100%" }}>
        <Table columns={columns} rows={rows} caption="Movimientos de la cuenta" />
      </div>
    </div>
  );
}
