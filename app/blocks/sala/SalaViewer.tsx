"use client";

import { useState } from "react";
import type { JSX, CSSProperties } from "react";
import SalaDesktop from "@/src/blocks/sala/desktop/SalaDesktop";
import { SALA_WIDTH, SALA_HEIGHT } from "@/src/blocks/sala/desktop/dimensions";
import SalaMobile from "@/src/blocks/sala/mobile/SalaMobile";
import { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/sala/mobile/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

const PALETTES: { name: string; colors: string[] }[] = [
  { name: "Primary", colors: ["#F4AC59", "#8460E5", "#ffffff"] },
  { name: "Rainbow", colors: ["#F2CCFF", "#CC00FF", "#FF0066"] },
  { name: "Lila", colors: ["#CFBAFF", "#AE8EFF", "#ffffff"] },
];

type FlashMode = "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
const EFFECTS: { name: string; value: FlashMode }[] = [
  { name: "💡 Bombilla", value: "bulb" },
  { name: "🌀 Gira", value: "spin" },
  { name: "💥 Estalla", value: "explode" },
  { name: "✨ Anticipa", value: "pulse" },
  { name: "🎆 Festejo", value: "combo" },
  { name: "🌟 Resplandor", value: "shine" },
];

const CHIP_BASE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 30,
  padding: "0 12px",
  borderRadius: 15,
  fontFamily: "inherit",
  fontSize: 12.5,
  fontWeight: 600,
  cursor: "pointer",
} as const;

function chipStyle(active: boolean): CSSProperties {
  return {
    ...CHIP_BASE,
    border: active ? "1px solid #4f2ed8" : "1px solid #e2e8f0",
    background: active ? "#f1edff" : "#ffffff",
    color: active ? "#4f2ed8" : "#3f3f46",
  };
}

const GROUP_LABEL: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#a1a1aa",
  marginRight: 2,
};

export default function SalaViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [pal, setPal] = useState(0);
  const [mode, setMode] = useState<FlashMode>("bulb");
  const [live, setLive] = useState(false);

  const controls = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <button
        type="button"
        onClick={function toggle() { setLive(function flip(v) { return !v; }); }}
        style={{ ...CHIP_BASE, border: "none", color: "#ffffff", fontWeight: 700, background: live ? "#FF0066" : "linear-gradient(120deg, #5F3ED8 0%, #340091 100%)", boxShadow: "0 2px 8px rgba(20,0,69,0.25)" }}
      >
        {live ? "■ Detener" : "▶ Ver live"}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={GROUP_LABEL}>Luz</span>
        {PALETTES.map(function renderPal(p, i) {
          return (
            <button key={p.name} type="button" onClick={function pick() { setPal(i); }} title={p.name} style={chipStyle(pal === i)}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: `conic-gradient(${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]}, ${p.colors[0]})` }} />
              {p.name}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={GROUP_LABEL}>Efecto</span>
        {EFFECTS.map(function renderEffect(e) {
          return (
            <button key={e.value} type="button" onClick={function set() { setMode(e.value); }} style={chipStyle(mode === e.value)}>
              {e.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="sala"
      description="Sala de subasta en vivo — desktop y mobile."
      width={SALA_WIDTH}
      height={SALA_HEIGHT}
      canvas={<SalaDesktop live={live} flashColors={PALETTES[pal].colors} flashMode={mode} />}
      canvasForViewport={{
        mobile: {
          node: <SalaMobile live={live} flashColors={PALETTES[pal].colors} flashMode={mode} />,
          width: SALAMOBILE_WIDTH,
          height: SALAMOBILE_HEIGHT,
        },
      }}
      files={files}
      controls={controls}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
