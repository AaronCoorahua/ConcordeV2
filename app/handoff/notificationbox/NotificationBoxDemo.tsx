"use client";

import { useState } from "react";
import type { JSX } from "react";
import { NotificationBox } from "@/src/components/NotificationBox";

/** El aviso entra, se sostiene y se recoge hacia la campana (2,4 s). «Ver de nuevo» lo repite. */
export default function NotificationBoxDemo(): JSX.Element {
  const [n, setN] = useState(0);
  return <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
    <div style={{ minHeight: 96 }}><NotificationBox key={n} photo="/mi-garaje/garage-photos/sentra/1.jpg" title="El vendedor respondió tu propuesta" body="Nissan Sentra 2020 · te pide US$ 4,800" time="Ahora" onOpen={() => undefined} /></div>
    <button type="button" onClick={() => setN((x) => x + 1)} style={{ font: "inherit", fontSize: 13, padding: "6px 12px", borderRadius: 8, border: "1px solid #E1E3E2", background: "#fff", cursor: "pointer" }}>Ver de nuevo</button>
  </div>;
}
