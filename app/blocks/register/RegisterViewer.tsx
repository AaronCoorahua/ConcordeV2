"use client";

import { useState } from "react";
import type { JSX } from "react";
import Register, { REGISTER_WIDTH, REGISTER_HEIGHT } from "@/src/blocks/register/desktop/Register";
import RegisterMobile from "@/src/blocks/register/mobile/RegisterMobile";
import { REGISTER_MOBILE_WIDTH } from "@/src/blocks/register/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/register — Visor del bloque Register con el Sidebar pegado a la
 * izquierda. El Register ya trae su propio header, así que no se añade
 * aparte (igual que Login/Zona).
 */

const COMBINED_WIDTH = SIDEBAR_WIDTH + REGISTER_WIDTH;
// El Register es corto (169, todavía crece): igual que Login, NO usamos
// Math.max(SIDEBAR_HEIGHT, ...) — el sidebar corta justo donde acaba el contenido.
const COMBINED_HEIGHT = REGISTER_HEIGHT;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOBILE_FRAME_H = 780;

export default function RegisterViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);
  const OVERSCAN = 2;
  const scale = (fillW + OVERSCAN) / REGISTER_WIDTH;
  const canvasH = REGISTER_HEIGHT * scale;

  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: REGISTER_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <Register />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} contentHeight={canvasH} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="register"
      description="Registro: heading de bienvenida (en construcción)."
      width={COMBINED_WIDTH}
      height={COMBINED_HEIGHT}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <RegisterMobile frameHeight={MOBILE_FRAME_H} />, width: REGISTER_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
