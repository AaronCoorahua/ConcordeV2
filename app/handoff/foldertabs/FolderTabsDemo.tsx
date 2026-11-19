"use client";

import { useState } from "react";
import type { JSX } from "react";
import { FolderTabs } from "@/src/components/FolderTabs";

/** Demo con estado, como en Mis negociaciones: Compras elegida y En venta sin novedades. Ancho de la columna de Tu actividad. */
export default function FolderTabsDemo(): JSX.Element {
  const [value, setValue] = useState(0);
  return <div style={{ width: "100%", maxWidth: 435, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}>
    <FolderTabs options={["Compras", "En venta"]} notificationIndices={[]} value={value} onChange={setValue} aria-label="Compras o vehículos en venta" />
  </div>;
}
