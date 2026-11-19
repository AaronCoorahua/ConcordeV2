"use client";

import { useState } from "react";
import type { JSX } from "react";
import { PublishSwipe } from "@/src/components/PublishSwipe";

/** Demo: al tocarlo dice CARGANDO y a los 2 s vuelve a empezar (en Mi Garaje abre Publicar con esa valorización). */
export default function PublishSwipeDemo(): JSX.Element {
  const [n, setN] = useState(0);
  return <div style={{ fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}><PublishSwipe key={n} onPublish={() => setN((x) => x + 1)} /></div>;
}
