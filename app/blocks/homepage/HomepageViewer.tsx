"use client";

import { useState } from "react";
import type { JSX } from "react";
import Homepage from "@/src/blocks/homepage/desktop/Homepage";
import { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/homepage/desktop/dimensions";
import HomepageMobile from "@/src/blocks/homepage/mobile/HomepageMobile";
import { HOMEPAGE_MOBILE_WIDTH } from "@/src/blocks/homepage/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

const COMBINED_WIDTH = SIDEBAR_WIDTH + HOMEPAGE_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, HEADER_HEIGHT + HOMEPAGE_HEIGHT);
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
// Alto del "marco de teléfono" del preview mobile: simula la altura visible de un
// móvil (con scroll interno del contenido) y ancla el sidebar-drawer fixed dentro.
const MOBILE_FRAME_H = 780;

export default function HomepageViewer({ files }: { files: BlockFile[] }): JSX.Element {
  // Al colapsar el sidebar, el contenido de la derecha se escala (proporcional)
  // para llenar el espacio libre, manteniendo el ancho total del canvas.
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH); // ancho a cubrir
  const OVERSCAN = 2;                                 // px que el contenido mete BAJO el sidebar
  const scale = (fillW + OVERSCAN) / HOMEPAGE_WIDTH;
  const canvasH = Math.max(COMBINED_HEIGHT, HEADER_HEIGHT + HOMEPAGE_HEIGHT * scale);

  // Header: ancho REAL (fillW), sin transform → su fondo se alarga pero el contenido
  // (logo, botón) NO se estira, queda a tamaño natural (usa justify space-between).
  // Cuerpo: zoom proporcional desde la esquina sup-der, arrancando en top=64 fijo.
  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: fillW + OVERSCAN, transition: `width 0.28s ${EASE}` }}>
        <AppHeader width="100%" />
      </div>
      <div style={{ position: "absolute", right: 0, top: HEADER_HEIGHT, width: HOMEPAGE_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <Homepage />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} headerHeight={HEADER_HEIGHT} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="homepage"
      description="Página de inicio: banners, subastador y categorías."
      width={COMBINED_WIDTH}
      height={COMBINED_HEIGHT}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <HomepageMobile frameHeight={MOBILE_FRAME_H} />, width: HOMEPAGE_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
