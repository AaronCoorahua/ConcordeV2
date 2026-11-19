"use client";

import { useState } from "react";
import type { JSX } from "react";
import { StageTabs } from "@/src/components/StageTabs";

const LABELS = ["Consignadas", "Ganadas", "Proceso de compra", "Rechazadas"];

/** Demo con estado, con los datos de Mi Garaje: una novedad en Consignadas (la subasta en vivo del Hyundai Accent).
 *  Va en el ancho de la columna de Tu actividad (435 px), como en la pantalla. */
export default function StageTabsDemo({ width = 435 }: { width?: number }): JSX.Element {
  const [value, setValue] = useState(0);
  return <div style={{ width: "100%", maxWidth: width, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}>
    <StageTabs labels={LABELS} counts={[1, 0, 0, 0]} value={value} onChange={setValue} ariaLabel="Etapa de tus participaciones" />
  </div>;
}
