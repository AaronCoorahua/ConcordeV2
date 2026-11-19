"use client";

import { useState } from "react";
import type { JSX } from "react";
import { AmountComposer } from "@/src/components/AmountComposer";

/** Demo con la contrapropuesta del Mazda 3 2018: el vendedor pide US$ 13,500, así que el comprador debe ofrecer menos. */
export default function AmountComposerDemo(): JSX.Element {
  const [val, setVal] = useState(0);
  const ok = val > 0 && val < 13500;
  return <div style={{ display: "grid", gap: 8, width: 412 }}>
    <AmountComposer value={val} onChange={setVal} canSend={ok} onSubmit={() => setVal(0)} placeholder="Escribe tu propuesta" label="Tu propuesta en US$"
      suggestions={[{ label: "Punto medio", amount: 13100 }]} />
  </div>;
}
