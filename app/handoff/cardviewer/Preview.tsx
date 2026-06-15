"use client";

/**
 * Preview de CardViewer — demo en vivo. El componente ya gestiona su propio
 * estado interno (click en miniatura → cambia la imagen grande), así que solo
 * le pasamos el set de imágenes. Se muestran las 2 variantes: live y negotiable.
 */

import type { JSX } from "react";
import CardViewer from "@/src/components/CardViewer/CardViewer";

// Foto real del carro (única disponible en /public/demo). Se repite en las 11
// posiciones — al hacer click cambia la miniatura seleccionada (borde gradiente).
const IMAGES: string[] = Array.from({ length: 11 }, function build() { return "/demo/bronco.jpg"; });

export default function Preview(): JSX.Element {
  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>live demo · imagen + filmstrip</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>click en una miniatura → cambia la imagen · arrastra para ver más</span>
      </div>
      <div style={{ padding: "32px 24px", background: "#fff", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>variant=&quot;live&quot;</span>
          <CardViewer variant="live" images={IMAGES} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>variant=&quot;negotiable&quot;</span>
          <CardViewer variant="negotiable" images={IMAGES} />
        </div>
      </div>
    </div>
  );
}
