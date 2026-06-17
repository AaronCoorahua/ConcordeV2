"use client";

/**
 * Preview — demo interactiva del Accordion (client component).
 * El contenido es un SLOT EDITABLE (children): aquí solo se muestra un
 * placeholder neutro, no info de negocio. El chevron gira al abrir/cerrar.
 */

import { useState } from "react";
import type { JSX } from "react";
import Accordion from "@/src/components/Accordion/Accordion";

function Slot(): JSX.Element {
  return (
    <div style={{ border: "1px dashed #cbd5e1", borderRadius: 6, padding: "14px 16px", color: "#94a3b8", fontSize: 12, fontFamily: "monospace" }}>
      {"{children}"} — tu contenido editable aquí
    </div>
  );
}

export default function Preview(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · acordeón colapsable</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>chevron gira al abrir/cerrar</span>
      </div>

      <div style={{ padding: "24px", background: "#f8fafc", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 480, maxWidth: "100%", margin: "0 auto" }}>

          {/* No controlado — abierto por defecto (se ve el slot editable) */}
          <Accordion title="INFORMACIÓN GENERAL" defaultOpen>
            <Slot />
          </Accordion>

          {/* Controlado — demuestra abrir/cerrar via useState */}
          <Accordion title="CONDICIONES DE OFRECIMIENTO" open={open} onOpenChange={setOpen}>
            <Slot />
          </Accordion>

          {/* No controlado — cerrado por defecto */}
          <Accordion title="DOCUMENTACIÓN">
            <Slot />
          </Accordion>

        </div>
      </div>
    </div>
  );
}
