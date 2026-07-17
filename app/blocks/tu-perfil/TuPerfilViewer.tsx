"use client";

import { useState } from "react";
import type { JSX } from "react";
import TuPerfil, { TUPERFIL_WIDTH, TUPERFIL_HEIGHT } from "@/src/blocks/tu-perfil/desktop/TuPerfil";
import TuPerfilMobile from "@/src/blocks/tu-perfil/mobile/TuPerfilMobile";
import { TUPERFIL_MOBILE_WIDTH } from "@/src/blocks/tu-perfil/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
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
  const canvasH = HEADER_HEIGHT + (TUPERFIL_HEIGHT - HEADER_HEIGHT) * scale;

  // Header con ancho real (fillW), sin transform → su fondo se alarga pero el
  // contenido no se estira. Cuerpo con zoom proporcional desde la esquina sup-der
  // arrancando en top=64 fijo → top del cuerpo alineado con el sidebar.
  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      {/* Header — ancho real (fillW), sin transform → fondo se alarga, contenido no se estira */}
      <div style={{ position: "absolute", right: 0, top: 0, width: fillW + OVERSCAN, transition: `width 0.28s ${EASE}` }}>
        <AppHeader width="100%" username="ZAEX5G" />
      </div>
      <div style={{ position: "absolute", right: 0, top: HEADER_HEIGHT, width: TUPERFIL_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <TuPerfil renderHeader={false} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} contentHeight={canvasH} headerHeight={HEADER_HEIGHT} />
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
