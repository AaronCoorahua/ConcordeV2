"use client";

import { useState } from "react";
import type { JSX } from "react";
import { SidePanel } from "@/src/components/SidePanel";

/** Solo el panel: en Mi Garaje lo abre una fila de Tu actividad y su contenido es la negociación. Aquí, un contenido mínimo. */
export default function SidePanelDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  return <div style={{ fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}>
    <button type="button" onClick={() => setOpen(true)} style={{ font: "inherit", fontSize: 14, fontWeight: 600, padding: "10px 16px", borderRadius: 10, border: "1px solid #E1E3E2", background: "#fff", color: "#3B1782", cursor: "pointer" }}>Abrir el panel</button>
    <SidePanel open={open} onClose={() => setOpen(false)} labelledBy="sp-demo-title">{(close) => <div style={{ display: "grid", gap: 12, padding: 24 }}>
      <h2 id="sp-demo-title" style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#3B1782" }}>Nissan Sentra 2020</h2>
      <p style={{ margin: 0, fontSize: 14, color: "#6B6878" }}>Aquí va el contenido de quien lo usa (en Mi Garaje, la negociación).</p>
      <button type="button" onClick={close} style={{ justifySelf: "start", font: "inherit", fontSize: 14, padding: "8px 14px", borderRadius: 10, border: "1px solid #E1E3E2", background: "#fff", cursor: "pointer" }}>Cerrar</button>
    </div>}</SidePanel>
  </div>;
}
