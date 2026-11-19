"use client";

import { useState } from "react";
import type { JSX } from "react";
import { Stepper } from "@/src/components/Stepper";

/** Demo: «Siguiente» avanza un paso y los pasos hechos permiten volver. */
export default function StepperDemo({ steps, start = 2 }: { steps: string[]; start?: number }): JSX.Element {
  const [current, setCurrent] = useState(start);
  return <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 760, fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" }}>
    <Stepper steps={steps} current={current} onGo={setCurrent} />
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      <button type="button" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>Anterior</button>
      <button type="button" onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}>Siguiente</button>
    </div>
  </div>;
}
