"use client";

import { useState } from "react";
import type { JSX } from "react";
import AgregarSubascoins, { AGREGARSUBASCOINS_WIDTH, AGREGARSUBASCOINS_HEIGHT } from "@/src/blocks/agregar-subascoins/desktop/AgregarSubascoins";
import AgregarSubascoinsMobile from "@/src/blocks/agregar-subascoins/mobile/AgregarSubascoinsMobile";
import { AGREGARSUBASCOINS_MOBILE_WIDTH } from "@/src/blocks/agregar-subascoins/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/agregar-subascoins — Visor del bloque «Agregar SubasCoins» con el
 * Sidebar pegado a la izquierda. Al colapsar el sidebar, el contenido (que ya
 * incluye su propio header) se escala manteniendo el borde derecho fijo.
 *
 * El canvas mide la altura REAL del contenido escalado (no el alto natural del
 * sidebar): así el sidebar corta justo donde termina la página, sin sobrar.
 */

const COMBINED_WIDTH = SIDEBAR_WIDTH + AGREGARSUBASCOINS_WIDTH;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOBILE_FRAME_H = 780;

export default function AgregarSubascoinsViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);
  const OVERSCAN = 2;
  const scale = (fillW + OVERSCAN) / AGREGARSUBASCOINS_WIDTH;
  const canvasH = AGREGARSUBASCOINS_HEIGHT * scale;

  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: AGREGARSUBASCOINS_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <AgregarSubascoins />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} contentHeight={canvasH} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="agregar-subascoins"
      description="Pantalla «Agregar SubasCoins»: header logueado + área de contenido (placeholder)."
      width={COMBINED_WIDTH}
      height={canvasH}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <AgregarSubascoinsMobile frameHeight={MOBILE_FRAME_H} />, width: AGREGARSUBASCOINS_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
