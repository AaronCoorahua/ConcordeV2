"use client";

import { useState } from "react";
import type { JSX } from "react";
import Index from "@/src/blocks/index/desktop/Index";
import { INDEX_SHELL_WIDTH } from "@/src/blocks/index/desktop/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import AppHeader from "@/src/blocks/header/desktop/Header";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
// Alto del sidebar: el de una pantalla (en el lab va pegado arriba mientras la página se desplaza).
const SIDEBAR_VIEW_H = 900;

/**
 * Index de escritorio con el Sidebar y el Header de Concorde, como el lab (lienzo de 1024):
 * el sidebar empieza cerrado (76) y al abrirlo (226) empuja al contenido, que se reacomoda (no se escala).
 */
export default function IndexShell({ fontClass = "" }: { fontClass?: string }): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);
  const sb = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
  return (
    <div className={fontClass} style={{ display: "grid", gridTemplateColumns: `${sb}px minmax(0, 1fr)`, gridTemplateRows: `${HEADER_HEIGHT}px auto`,
      width: INDEX_SHELL_WIDTH, background: "#2E0F70", transition: `grid-template-columns 0.28s ${EASE}` }}>
      {/* Encima del header: la cabecera del Sidebar (logo + hamburguesa) mide 226 aunque se cierre a 76. */}
      <div style={{ gridColumn: 1, gridRow: "1 / -1", position: "relative", zIndex: 5, alignSelf: "start" }}>
        <Sidebar defaultActiveId="hoy" height={SIDEBAR_VIEW_H} contentHeight={SIDEBAR_VIEW_H} headerHeight={HEADER_HEIGHT}
          collapsed={collapsed} onCollapsedChange={setCollapsed} />
      </div>
      <div style={{ gridColumn: 2, gridRow: 1, minWidth: 0 }}><AppHeader width="100%" /></div>
      <div style={{ gridColumn: 2, gridRow: 2, minWidth: 0, background: "#ffffff" }}><Index /></div>
    </div>
  );
}
