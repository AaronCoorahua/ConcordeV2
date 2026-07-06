"use client";

import { useState } from "react";
import type { JSX } from "react";
import Login, { LOGIN_WIDTH, LOGIN_HEIGHT } from "@/src/blocks/login/desktop/Login";
import LoginMobile from "@/src/blocks/login/mobile/LoginMobile";
import { LOGIN_MOBILE_WIDTH } from "@/src/blocks/login/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/login — Visor del bloque Login con el Sidebar pegado a la izquierda.
 * El Login ya trae su propio header, así que no se añade aparte (igual que Zona).
 */

const COMBINED_WIDTH = SIDEBAR_WIDTH + LOGIN_WIDTH;
// El Login es más corto que el Sidebar (837 vs 1171): a diferencia de los demás
// Viewers, aquí NO usamos Math.max(SIDEBAR_HEIGHT, ...) — el sidebar debe cortar
// justo donde termina el contenido del Login, no sobrar relleno morado debajo.
const COMBINED_HEIGHT = LOGIN_HEIGHT;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOBILE_FRAME_H = 780;

export default function LoginViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);
  const OVERSCAN = 2;
  const scale = (fillW + OVERSCAN) / LOGIN_WIDTH;
  const canvasH = LOGIN_HEIGHT * scale;

  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: LOGIN_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <Login />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} contentHeight={canvasH} />
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="login"
      description="Login: card de acceso (correo + contraseña) y panel de registro."
      width={COMBINED_WIDTH}
      height={COMBINED_HEIGHT}
      canvas={canvas}
      canvasForViewport={{ mobile: { node: <LoginMobile frameHeight={MOBILE_FRAME_H} />, width: LOGIN_MOBILE_WIDTH, height: MOBILE_FRAME_H } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
