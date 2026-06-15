"use client";

import { useState } from "react";
import type { JSX } from "react";
import Filmstrip from "@/src/components/Filmstrip/Filmstrip";

const LABEL: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" };
const IMAGES = Array.from({ length: 11 }, () => "/demo/bronco.jpg");

export default function Preview(): JSX.Element {
  const [selLive, setSelLive] = useState(0);
  const [selNeg, setSelNeg] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 24 }}>
      <section>
        <h2 style={LABEL}>live — arrastra para ver las 11 · click para seleccionar</h2>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px", display: "flex", justifyContent: "center" }}>
          <Filmstrip variant="live" images={IMAGES} selectedIndex={selLive} onSelect={setSelLive} />
        </div>
      </section>

      <section>
        <h2 style={LABEL}>negotiable — borde teal/lila</h2>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px", display: "flex", justifyContent: "center" }}>
          <Filmstrip variant="negotiable" images={IMAGES} selectedIndex={selNeg} onSelect={setSelNeg} />
        </div>
      </section>
    </div>
  );
}
