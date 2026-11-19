"use client";

import type { JSX } from "react";
import { MI_GARAJE_SCREENS } from "@/src/blocks/mi-garaje/desktop/MiGaraje";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import MiGarajeViewer, { DETALLE_SCREEN_IDS } from "@/app/blocks/mi-garaje/MiGarajeViewer";

const SCREENS = MI_GARAJE_SCREENS.filter((s) => DETALLE_SCREEN_IDS.includes(s.id));

/** Detalle actual: las pantallas Propuesta (comprador) y Acuerdo con SubasChat, en el mismo visor de iframes que Mi Garaje. */
export default function DetalleViewer({ files }: { files: BlockFile[] }): JSX.Element {
  return <MiGarajeViewer files={files} screens={SCREENS} name="Detalle" description="Detalle de una oferta: propuesta del comprador y acuerdo con SubasChat." />;
}
