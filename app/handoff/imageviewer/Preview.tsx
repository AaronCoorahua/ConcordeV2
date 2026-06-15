"use client";

import { useState } from "react";
import type { JSX } from "react";
import ImageViewer from "@/src/components/ImageViewer/ImageViewer";

const TOTAL = 11;

export default function Preview(): JSX.Element {
  const [current, setCurrent] = useState(1);
  const prev = (): void => setCurrent((c) => (c <= 1 ? TOTAL : c - 1));
  const next = (): void => setCurrent((c) => (c >= TOTAL ? 1 : c + 1));

  return (
    <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · interactivo</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>las flechas cambian el contador · {current}/{TOTAL}</span>
      </div>
      <div style={{ padding: "40px 24px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", justifyContent: "center" }}>
        <ImageViewer
          imageSrc="/demo/bronco.jpg"
          imageAlt="Ford Bronco"
          current={current}
          total={TOTAL}
          onPrev={prev}
          onNext={next}
          onExpand={() => alert("Ampliar imagen")}
        />
      </div>
    </div>
  );
}
