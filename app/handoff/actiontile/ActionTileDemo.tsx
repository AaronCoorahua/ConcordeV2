"use client";

import type { JSX } from "react";
import { ActionTile } from "@/src/components/ActionTile";

/** Los dos accesos del riel de Mi Garaje, en su columna de 300 px. */
export default function ActionTileDemo(): JSX.Element {
  return <div style={{ display: "grid", gap: 10, width: "100%", maxWidth: 300, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}>
    <ActionTile tone="publish" title="Publica tu Vehículo" hint="¡Un solo pago hasta que lo vendas!" onClick={() => undefined} />
    <ActionTile tone="value" title="Valoriza tu vehículo" hint="Obtén una tasación en minutos" onClick={() => undefined} />
  </div>;
}
