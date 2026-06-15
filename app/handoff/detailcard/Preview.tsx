"use client";

/**
 * Preview — demos interactivos de DetailCard (client component).
 * Conserva el useState `liked` de las variantes live y negotiable.
 */

import { useState } from "react";
import type { JSX } from "react";
import DetailCard from "@/src/components/DetailCard/DetailCard";

const LABEL: React.CSSProperties = { fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px", fontFamily: "monospace" };

export default function Preview(): JSX.Element {
  const [likedA, setLikedA] = useState(false);
  const [likedB, setLikedB] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>

      {/* live */}
      <div style={{ borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={LABEL}>preview · live</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>botón naranja · hover/press · corazón clickeable</span>
        </div>
        <div style={{ padding: "40px 24px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 40 }}>
          <DetailCard variant="live" liked={likedA} onLikeChange={setLikedA} />
        </div>
        <div style={{ padding: "8px 14px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>Pasa el mouse / mantén pulsado &ldquo;Participa&rdquo; · click en el corazón para guardar (estado: {likedA ? "♥ guardado" : "♡ vacío"})</span>
        </div>
      </div>

      {/* negotiable */}
      <div style={{ borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={LABEL}>preview · negotiable</span>
          <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>banner teal · &ldquo;Cierra&rdquo; · botón teal</span>
        </div>
        <div style={{ padding: "40px 24px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", justifyContent: "center" }}>
          <DetailCard
            variant="negotiable"
            title="Aprovecha esta oportunidad y haz una propuesta al vendedor."
            ctaLabel="Negocia ahora"
            commission="Comisión >S< 0"
            liked={likedB}
            onLikeChange={setLikedB}
          />
        </div>
        <div style={{ padding: "8px 14px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>El banner &ldquo;¡Aprende a negociar con Subastin!&rdquo; aparece automático en negotiable</span>
        </div>
      </div>
    </div>
  );
}
