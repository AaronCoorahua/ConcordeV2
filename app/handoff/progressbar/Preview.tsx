"use client";

/**
 * Preview — live demo de ProgressBar.
 * La barra se llena de 0 a 100% en 3 segundos (loop), con la gradiente primary.
 */

import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import ProgressBar from "@/src/components/ProgressBar/ProgressBar";

const DURATION = 3000;
const PAUSE = 900;

export default function Preview(): JSX.Element {
  const [value, setValue] = useState<number>(0);
  const [runId, setRunId] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(function play() {
    startRef.current = null;

    function step(ts: number): void {
      if (startRef.current === null) startRef.current = ts;
      const t = Math.min((ts - startRef.current) / DURATION, 1);
      setValue(Math.round(t * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        timerRef.current = window.setTimeout(function loop() {
          setRunId(function next(n) { return n + 1; });
        }, PAUSE);
      }
    }

    setValue(0);
    rafRef.current = requestAnimationFrame(step);

    return function cleanup() {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [runId]);

  return (
    <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · live demo</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>se llena en 3s · gradiente primary</span>
      </div>

      <div style={{ padding: "32px 24px", background: "#f8fafc" }}>
        <div style={{ width: 360, maxWidth: "100%", margin: "0 auto" }}>
          <ProgressBar value={value} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <span style={{ fontSize: 12, fontFamily: "monospace", color: "#64748b" }}>{value}%</span>
            <button
              type="button"
              onClick={function replay() { setRunId(function next(n) { return n + 1; }); }}
              style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#fff", color: "#334155", cursor: "pointer" }}
            >
              ↻ Reproducir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
