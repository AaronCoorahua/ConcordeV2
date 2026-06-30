"use client";

import { useState } from "react";
import type { JSX } from "react";
import Zona, { ZONA_WIDTH, ZONA_HEIGHT } from "@/src/blocks/zona/desktop/Zona";
import ZonaMobile from "@/src/blocks/zona/mobile/ZonaMobile";
import { ZONA_MOBILE_WIDTH, ZONA_MOBILE_HEIGHT } from "@/src/blocks/zona/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT, SIDEBAR_COLLAPSED_WIDTH } from "@/src/blocks/sidebar/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/zona — Visor del bloque Zona de usuario con el Sidebar pegado a la
 * izquierda. Al colapsar el sidebar, el contenido (que ya incluye su propio
 * header) se escala manteniendo el borde derecho fijo; solo cambia el height.
 */

const COMBINED_WIDTH = SIDEBAR_WIDTH + ZONA_WIDTH;
const COMBINED_HEIGHT = Math.max(SIDEBAR_HEIGHT, ZONA_HEIGHT);
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export default function ZonaViewer({ files }: { files: BlockFile[] }): JSX.Element {
  // Al colapsar el sidebar, el contenido de la derecha se escala (proporcional)
  // para llenar el espacio libre, manteniendo el ancho total del canvas.
  const [collapsed, setCollapsed] = useState(false);
  const fillW = COMBINED_WIDTH - (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH); // ancho a cubrir
  const OVERSCAN = 2;                                 // px que el contenido mete BAJO el sidebar
  const scale = (fillW + OVERSCAN) / ZONA_WIDTH;
  const canvasH = Math.max(COMBINED_HEIGHT, ZONA_HEIGHT * scale);

  // Contenido PEGADO A LA DERECHA (right:0) y escalado desde la esquina sup-der
  // (transform-origin: top right) → el borde derecho es el PIVOTE: nunca se mueve.
  // El sidebar va ENCIMA (se pinta después) y tapa los px que el contenido mete
  // por debajo. La Zona ya trae su propio header, así que no se añade aquí.
  const canvas = (
    <div style={{ position: "relative", width: COMBINED_WIDTH, height: canvasH, background: VAULT_PREVIEW_BG, overflow: "hidden", transition: `height 0.28s ${EASE}` }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: ZONA_WIDTH, transformOrigin: "top right", transform: `scale(${scale})`, transition: `transform 0.28s ${EASE}` }}>
        <Zona />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} height={canvasH} />
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
      canvasForViewport={{ mobile: { node: <ZonaMobile />, width: ZONA_MOBILE_WIDTH, height: ZONA_MOBILE_HEIGHT } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
