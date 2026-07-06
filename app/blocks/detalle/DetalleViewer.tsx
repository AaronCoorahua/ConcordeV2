"use client";

import { useState } from "react";
import type { JSX, CSSProperties } from "react";
import Detalle from "@/src/blocks/detalle/desktop/Detalle";
import { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/detalle/desktop/dimensions";
import DetalleMobile from "@/src/blocks/detalle/mobile/DetalleMobile";
import { DETALLE_MOBILE_WIDTH } from "@/src/blocks/detalle/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import type { DetalleVariant } from "@/src/blocks/detalle/pills";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

const COMBINED_WIDTH = SIDEBAR_WIDTH + DETALLE_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, HEADER_HEIGHT + DETALLE_HEIGHT);
const MOBILE_FRAME_H = 780;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
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

  // Al colapsar el sidebar, el contenido de la derecha se escala (proporcional)
  // para llenar el espacio libre, manteniendo el ancho total del canvas.
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH); // ancho a cubrir
  const OVERSCAN = 2;                                 // px que el contenido mete BAJO el sidebar
  const scale = (fillW + OVERSCAN) / DETALLE_WIDTH;
  const canvasH = Math.max(COMBINED_HEIGHT, (HEADER_HEIGHT + DETALLE_HEIGHT) * scale);

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

  // Contenido PEGADO A LA DERECHA (right:0) y escalado desde la esquina sup-der
  // (transform-origin: top right) → el borde derecho es el PIVOTE: nunca se mueve.
  // El borde izquierdo es el que se mueve (sigue al sidebar). El sidebar va
  // ENCIMA (se pinta después) y tapa los px que el contenido mete por debajo,
  // así el seam queda perfecto sin micro-desfases. Solo cambia el height.
  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: DETALLE_WIDTH, display: "flex", flexDirection: "column", transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <AppHeader width={DETALLE_WIDTH} />
        <Detalle variant={variant} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} />
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
      canvasForViewport={{ mobile: { node: <DetalleMobile variant={variant} frameHeight={MOBILE_FRAME_H} />, width: DETALLE_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      controls={controls}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
