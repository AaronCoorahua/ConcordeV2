"use client";

/**
 * Demo interactivo de BidProposal — la animación de "nuevo bid" se dispara sola
 * cada 2 s; puedes elegir el tipo de efecto (flashMode) y la paleta de color
 * (flashColors). En producción incrementas `flash` cuando llega un bid del socket.
 */

import { useEffect, useState } from "react";
import type { CSSProperties, JSX } from "react";
import BidProposal, { type BidProposalFlashMode } from "@/src/components/BidProposal";

const MODES: BidProposalFlashMode[] = ["bulb", "spin", "explode", "pulse", "combo", "shine"];

interface ColorPreset {
  id: string;
  label: string;
  colors: string[];
}

const COLOR_PRESETS: ColorPreset[] = [
  { id: "primary", label: "Primary", colors: ["#F4AC59", "#8460E5", "#ffffff"] },
  { id: "live", label: "Live", colors: ["#FF9639", "#EF852E", "#ffffff"] },
  { id: "vault", label: "Vault", colors: ["#AE8EFF", "#8460E5", "#CFBAFF"] },
  { id: "neon", label: "Neón", colors: ["#CC00FF", "#FF0066", "#ffffff"] },
  { id: "gold", label: "Oro", colors: ["#FBC47D", "#F0BB3B", "#ffffff"] },
];

const REPEAT_MS = 2000;

const rowStyle: CSSProperties = { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" };
const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  width: 46,
  textAlign: "right",
};

function chipStyle(active: boolean): CSSProperties {
  return {
    fontSize: 12,
    fontWeight: 600,
    padding: "5px 11px",
    borderRadius: 8,
    cursor: "pointer",
    textTransform: "capitalize",
    border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.2)"}`,
    background: active ? "#ffffff" : "rgba(255,255,255,0.06)",
    color: active ? "#18181b" : "rgba(255,255,255,0.78)",
    transition: "background 0.15s, color 0.15s",
  };
}

function swatchStyle(colors: string[], active: boolean): CSSProperties {
  return {
    width: 26,
    height: 26,
    borderRadius: "50%",
    cursor: "pointer",
    padding: 0,
    border: `2px solid ${active ? "#ffffff" : "rgba(255,255,255,0.2)"}`,
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 55%, ${colors[2]} 100%)`,
    boxShadow: active ? "0 0 0 2px rgba(255,255,255,0.25)" : "none",
  };
}

export default function BidProposalDemo(): JSX.Element {
  const [mode, setMode] = useState<BidProposalFlashMode>("combo");
  const [presetId, setPresetId] = useState("primary");
  const [flash, setFlash] = useState(1);

  useEffect(function loop() {
    const t = setInterval(function tick() {
      setFlash(function inc(f) { return f + 1; });
    }, REPEAT_MS);
    return function cleanup() { clearInterval(t); };
  }, []);

  const preset = COLOR_PRESETS.find(function match(p) { return p.id === presetId; }) ?? COLOR_PRESETS[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, width: "100%" }}>
      <BidProposal
        amount="US$ 6,559"
        label="ENVIADO POR ZAE389"
        flash={flash}
        flashMode={mode}
        flashColors={preset.colors}
      />

      <div style={rowStyle}>
        <span style={labelStyle}>Tipo</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {MODES.map(function renderMode(m) {
            return (
              <button key={m} type="button" onClick={function pick() { setMode(m); }} style={chipStyle(m === mode)}>
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Color</span>
        <div style={{ display: "flex", gap: 8 }}>
          {COLOR_PRESETS.map(function renderPreset(p) {
            return (
              <button
                key={p.id}
                type="button"
                title={p.label}
                aria-label={p.label}
                onClick={function pick() { setPresetId(p.id); }}
                style={swatchStyle(p.colors, p.id === presetId)}
              />
            );
          })}
        </div>
      </div>

      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Se repite cada 2 s</span>
    </div>
  );
}
