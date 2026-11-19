"use client";

import type { JSX } from "react";
import { RepublishBar } from "@/src/components/RepublishBar";

/** La franja de la fila desierta de Mi Garaje (Suzuki Swift 2020), en su ancho (351 px). */
export default function RepublishBarDemo(): JSX.Element {
  return <div style={{ width: "100%", maxWidth: 351, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}>
    <RepublishBar name="Suzuki Swift 2020" days={7} onRepublish={() => undefined} onDrop={() => undefined} />
  </div>;
}
