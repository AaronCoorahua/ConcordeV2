"use client";

import { useState } from "react";
import type { JSX } from "react";
import { PendingToggle } from "@/src/components/PendingToggle";

/** Demo con estado: «Pendientes 1», como en el encabezado de Tu actividad. */
export default function PendingToggleDemo({ on = false }: { on?: boolean }): JSX.Element {
  const [checked, setChecked] = useState(on);
  return <div style={{ fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}><PendingToggle count={1} checked={checked} onToggle={() => setChecked((x) => !x)} /></div>;
}
