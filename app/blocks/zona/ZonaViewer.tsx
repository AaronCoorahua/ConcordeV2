"use client";

import { useState } from "react";
import type { JSX } from "react";
import Zona, { ZONA_WIDTH, ZONA_HEIGHT } from "@/src/blocks/zona/desktop/Zona";
import ZonaMobile from "@/src/blocks/zona/mobile/ZonaMobile";
import { ZONA_MOBILE_WIDTH } from "@/src/blocks/zona/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/zona — Visor del bloque Zona de usuario con el Sidebar pegado a la
 * izquierda. Al colapsar el sidebar, el contenido (que ya incluye su propio
 * header) se escala manteniendo el borde derecho fijo; solo cambia el height.
 */

const COMBINED_WIDTH = SIDEBAR_WIDTH + ZONA_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, ZONA_HEIGHT);
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOBILE_FRAME_H = 780;

export default function ZonaViewer({ files }: { files: BlockFile[] }): JSX.Element {
  // Al colapsar el sidebar, el contenido de la derecha se escala PROPORCIONAL
  // (uniforme, sin distorsión) para llenar el espacio libre. Anclado a la esquina
  // superior derecha; el alto crece con él.
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH); // ancho a cubrir
  const OVERSCAN = 2;                                 // px que el contenido mete BAJO el sidebar
  const scale = (fillW + OVERSCAN) / ZONA_WIDTH;
  const canvasH = Math.max(COMBINED_HEIGHT, HEADER_HEIGHT + (ZONA_HEIGHT - HEADER_HEIGHT) * scale);

  // Header con ancho real (fillW), sin transform → su fondo se alarga pero el
  // contenido no se estira. Cuerpo con zoom proporcional desde la esquina sup-der
  // arrancando en top=64 fijo → top del cuerpo alineado con el sidebar.
  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      {/* Header — ancho real (fillW), sin transform → fondo se alarga, contenido no se estira */}
      <div style={{ position: "absolute", right: 0, top: 0, width: fillW + OVERSCAN, transition: `width 0.28s ${EASE}` }}>
        <AppHeader width="100%" username="ZAEX5G" />
      </div>
      <div style={{ position: "absolute", right: 0, top: HEADER_HEIGHT, width: ZONA_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <Zona renderHeader={false} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} headerHeight={HEADER_HEIGHT} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="zona"
      description="Zona de usuario: header logueado + perfil, billetera, actividad y ofertas."
      width={COMBINED_WIDTH}
      height={COMBINED_HEIGHT}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <ZonaMobile frameHeight={MOBILE_FRAME_H} />, width: ZONA_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
