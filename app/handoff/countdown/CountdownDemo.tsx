"use client";

import { useState } from "react";
import type { JSX } from "react";
import { Countdown } from "@/src/components/Countdown";

/** Demo: la hora final se calcula al abrir la página (si se calculara en el build, la cuenta ya habría terminado). */
export default function CountdownDemo({ hours = 1, minutes = 15, label = "Cierra en" }: { hours?: number; minutes?: number; label?: string }): JSX.Element {
  const [to] = useState(() => Date.now() + (hours * 60 + minutes) * 60_000);
  return <Countdown to={to} label={label} />;
}
