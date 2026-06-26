"use client";

import { useState } from "react";
import type { JSX, CSSProperties } from "react";
import Detalle, { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/detalle/desktop/Detalle";
import DetalleMobile, { DETALLE_MOBILE_WIDTH, DETALLE_MOBILE_HEIGHT } from "@/src/blocks/detalle/mobile/DetalleMobile";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import type { DetalleVariant } from "@/src/blocks/detalle/pills";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

const COMBINED_WIDTH = SIDEBAR_WIDTH + DETALLE_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, HEADER_HEIGHT + DETALLE_HEIGHT);
const VARIANTS: { value: DetalleVariant; label: string }[] = [
  { value: "live", label: "En vivo" },
  { value: "negotiable", label: "Negociable" },
];

// Chips simples (mismo estilo que el visor de Sala)
const CHIP_BASE: CSSProperties = {
  height: 30, padding: "0 14px", borderRadius: 15, fontFamily: "inherit",
  fontSize: 12.5, fontWeight: 600, cursor: "pointer",
};
function chipStyle(active: boolean): CSSProperties {
  return {
    ...CHIP_BASE,
    border: active ? "1px solid #4f2ed8" : "1px solid #e2e8f0",
    background: active ? "#f1edff" : "#ffffff",
    color: active ? "#4f2ed8" : "#3f3f46",
  };
}
const GROUP_LABEL: CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
  textTransform: "uppercase", color: "#a1a1aa", marginRight: 2,
};

export default function DetalleViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [tab, setTab] = useState(0);
  const variant = VARIANTS[tab].value;

  // Tabs «En vivo / Negociable» — cambian la variante del DetailCard,
  // AuctionStatus, CardViewer y los ConditionPills (en desktop y mobile).
  const controls = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={GROUP_LABEL}>Tipo</span>
      {VARIANTS.map(function renderChip(v, i) {
        return (
          <button key={v.value} type="button" onClick={function pick() { setTab(i); }} style={chipStyle(tab === i)}>
            {v.label}
          </button>
        );
      })}
    </div>
  );

  const canvas = (
    <div style={{ display: "flex", alignItems: "flex-start", width: COMBINED_WIDTH, height: COMBINED_HEIGHT, background: "#ffffff" }}>
      <Sidebar height={COMBINED_HEIGHT} />
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <AppHeader />
        <Detalle variant={variant} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="detalle"
      description="Página de detalle de una oferta."
      width={COMBINED_WIDTH}
      height={COMBINED_HEIGHT}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <DetalleMobile variant={variant} />, width: DETALLE_MOBILE_WIDTH, height: DETALLE_MOBILE_HEIGHT } }}
      files={files}
      controls={controls}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
