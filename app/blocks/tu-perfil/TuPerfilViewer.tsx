"use client";

import { useState } from "react";
import type { JSX } from "react";
import TuPerfil, { TUPERFIL_WIDTH, TUPERFIL_HEIGHT } from "@/src/blocks/tu-perfil/desktop/TuPerfil";
import TuPerfilMobile from "@/src/blocks/tu-perfil/mobile/TuPerfilMobile";
import { TUPERFIL_MOBILE_WIDTH } from "@/src/blocks/tu-perfil/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/tu-perfil — Visor del bloque «Tu Perfil» con el Sidebar pegado a la
 * izquierda. Al colapsar el sidebar, el contenido (que ya incluye su propio
 * header) se escala manteniendo el borde derecho fijo.
 *
 * El canvas mide la altura REAL del contenido escalado (no el alto natural del
 * sidebar): así el sidebar corta justo donde termina la página, sin sobrar.
 */

const COMBINED_WIDTH = SIDEBAR_WIDTH + TUPERFIL_WIDTH;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOBILE_FRAME_H = 780;

export default function TuPerfilViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);
  const OVERSCAN = 2;
  const scale = (fillW + OVERSCAN) / TUPERFIL_WIDTH;
  const canvasH = TUPERFIL_HEIGHT * scale;

  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: TUPERFIL_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <TuPerfil />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} contentHeight={canvasH} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="tu-perfil"
      description="Pantalla «Tu Perfil»: header logueado + área de contenido (placeholder)."
      width={COMBINED_WIDTH}
      height={canvasH}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <TuPerfilMobile frameHeight={MOBILE_FRAME_H} />, width: TUPERFIL_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
