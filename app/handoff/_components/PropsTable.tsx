/**
 * PropsTable — referencia de API limpia (estilo shadcn).
 */

import type { JSX } from "react";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

const cellBorder = "1px solid #ececee";

export default function PropsTable({ rows }: { rows: PropRow[] }): JSX.Element {
  return (
    <div style={{ border: "1px solid #e4e4e7", borderRadius: 10, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#fafafa" }}>
            <th style={{ textAlign: "left", padding: "10px 16px", borderBottom: cellBorder, fontSize: 12, fontWeight: 700, color: "#52525b" }}>Prop</th>
            <th style={{ textAlign: "left", padding: "10px 16px", borderBottom: cellBorder, fontSize: 12, fontWeight: 700, color: "#52525b" }}>Tipo</th>
            <th style={{ textAlign: "left", padding: "10px 16px", borderBottom: cellBorder, fontSize: 12, fontWeight: 700, color: "#52525b" }}>Default</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(function renderRow(r, i) {
            const last = i === rows.length - 1;
            const bb = last ? "none" : cellBorder;
            return (
              <tr key={r.name}>
                <td style={{ padding: "10px 16px", borderBottom: bb, verticalAlign: "top" }}>
                  <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: "#7c3aed", fontWeight: 600 }}>{r.name}</code>
                  {r.description ? (
                    <div style={{ fontSize: 12, color: "#71717a", marginTop: 3, lineHeight: 1.5 }}>{r.description}</div>
                  ) : null}
                </td>
                <td style={{ padding: "10px 16px", borderBottom: bb, verticalAlign: "top" }}>
                  <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: "#0891b2" }}>{r.type}</code>
                </td>
                <td style={{ padding: "10px 16px", borderBottom: bb, verticalAlign: "top" }}>
                  <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12.5, color: "#a1a1aa" }}>{r.default ?? "—"}</code>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
