"use client";

import type { JSX } from "react";
import { ActionList } from "@/src/components/ActionList";

/** Lo que abre el ⋯ en Mi Garaje: «Dar de baja» en una Publicada (Toyota Etios) y «Ver detalle de la venta» en una Vendida (Kia Picanto). */
export default function ActionListDemo({ sold = false }: { sold?: boolean }): JSX.Element {
  return <div style={{ width: "100%", maxWidth: 411, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}>
    {sold ? <ActionList id="acts-su10" label="Acciones: Kia Picanto 2021" items={[{ label: "Ver detalle de la venta" }]} onPick={() => undefined} onClose={() => undefined} />
      : <ActionList id="acts-su6" label="Acciones: Toyota Etios 2020" items={[{ label: "Dar de baja", icon: "trash", danger: true }]} onPick={() => undefined} onClose={() => undefined} />}
  </div>;
}
