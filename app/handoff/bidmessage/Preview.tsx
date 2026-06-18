"use client";

/**
 * Preview — live demo de BidMessage.
 * Los mensajes entran con ease-in desde su lado (received ← izquierda,
 * sent ← derecha). La velocidad de entrada es editable. Incluye la versión
 * VMC (logo-preview.png) en una burbuja vault.
 */

import { useState, useEffect } from "react";
import type { JSX, CSSProperties } from "react";
import BidMessage from "@/src/components/BidMessage/BidMessage";

type Side = "sent" | "received";
type MsgType = "live" | "vault" | "white";
interface Msg { side: Side; type: MsgType; text: string; logo?: boolean; }

const VMC_LOGO = <img src="/logo-preview.png" alt="VMC" style={{ height: 16, width: "auto", display: "block" }} />;

const CONVO: Msg[] = [
  { side: "received", type: "vault", text: "ABRIÓ LA SUBASTA", logo: true },
  { side: "sent", type: "live", text: "PROPUSO US$ 15,000" },
  { side: "received", type: "white", text: "OFERTA RECIBIDA · US$ 18,000" },
  { side: "received", type: "vault", text: "NUEVA PUJA · US$ 20,500" },
  { side: "sent", type: "live", text: "PROPUSO US$ 25,000" },
];

const ANIM = `
@keyframes bidmsg-fade-left { from { opacity: 0; transform: translateX(calc(-1 * var(--bidmsg-dist, 30px))); } to { opacity: 1; transform: translateX(0); } }
@keyframes bidmsg-fade-right { from { opacity: 0; transform: translateX(var(--bidmsg-dist, 30px)); } to { opacity: 1; transform: translateX(0); } }
@keyframes bidmsg-slide-left { from { transform: translateX(calc(-1 * var(--bidmsg-dist, 30px))); } to { transform: translateX(0); } }
@keyframes bidmsg-slide-right { from { transform: translateX(var(--bidmsg-dist, 30px)); } to { transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) { .bidmsg-anim { animation: none !important; } }
`;

type AnimMode = "fade" | "slide";

export default function Preview(): JSX.Element {
  const [speed, setSpeed] = useState<number>(450);
  const [dist, setDist] = useState<number>(30);
  const [mode, setMode] = useState<AnimMode>("fade");
  const [shown, setShown] = useState<number>(0);

  useEffect(function tick() {
    const total = CONVO.length;
    if (shown < total) {
      const t = window.setTimeout(function step() { setShown(function inc(v) { return v + 1; }); }, speed + 350);
      return function cleanup() { window.clearTimeout(t); };
    }
    const t = window.setTimeout(function replay() { setShown(0); }, 1600);
    return function cleanup() { window.clearTimeout(t); };
  }, [shown, speed]);

  return (
    <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · live demo · ease-in</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>received ← izq · sent ← der</span>
      </div>

      {/* Control de velocidad */}
      <div style={{ padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, color: "#334155" }}>
          Velocidad
          <input
            type="range"
            min={150}
            max={1200}
            step={50}
            value={speed}
            onChange={function onSpeed(e) { setSpeed(Number(e.target.value)); }}
            style={{ width: 180 }}
          />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#0f172a", minWidth: 52 }}>{speed} ms</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, color: "#334155" }}>
          Distancia
          <input
            type="range"
            min={0}
            max={120}
            step={5}
            value={dist}
            onChange={function onDist(e) { setDist(Number(e.target.value)); setShown(0); }}
            style={{ width: 140 }}
          />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#0f172a", minWidth: 44 }}>{dist} px</span>
        </label>
        {/* Tipo de entrada */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>Entrada:</span>
          <div style={{ display: "inline-flex", border: "1px solid #cbd5e1", borderRadius: 8, overflow: "hidden" }}>
            <button
              type="button"
              onClick={function pickFade() { setMode("fade"); setShown(0); }}
              style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", border: "none", cursor: "pointer", background: mode === "fade" ? "#4f2ed8" : "#fff", color: mode === "fade" ? "#fff" : "#334155" }}
            >
              Fade + slide
            </button>
            <button
              type="button"
              onClick={function pickSlide() { setMode("slide"); setShown(0); }}
              style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", border: "none", borderLeft: "1px solid #cbd5e1", cursor: "pointer", background: mode === "slide" ? "#4f2ed8" : "#fff", color: mode === "slide" ? "#fff" : "#334155" }}
            >
              Solo deslizar
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={function replay() { setShown(0); }}
          style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#fff", color: "#334155", cursor: "pointer" }}
        >
          ↻ Reproducir
        </button>
      </div>

      {/* Hilo */}
      <div style={{ padding: "24px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: 8, minHeight: 300 }}>
        {CONVO.slice(0, shown).map(function renderMsg(m, i) {
          const dir = m.side === "sent" ? "right" : "left";
          const anim = `bidmsg-${mode}-${dir}`;
          const itemStyle: CSSProperties = { animation: `${anim} ${speed}ms ease-in both` };
          (itemStyle as Record<string, string>)["--bidmsg-dist"] = `${dist}px`;
          return (
            <div key={i} style={{ display: "flex", justifyContent: m.side === "sent" ? "flex-end" : "flex-start" }}>
              <div className="bidmsg-anim" style={itemStyle}>
                <BidMessage side={m.side} type={m.type} logo={m.logo ? VMC_LOGO : undefined}>{m.text}</BidMessage>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
