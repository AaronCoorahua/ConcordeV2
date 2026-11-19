"use client";

import { useState } from "react";
import type { JSX } from "react";
import { Select } from "@/src/components/Select";

const YEARS = Array.from({ length: 2026 - 2000 + 1 }, (_, i) => String(2026 - i)); // Valorizar: del año actual a 2000

/** Demo: el campo guarda la opción elegida, como en Valorizar y Publicar. */
export default function SelectDemo({ label = "Año de fabricación", options = YEARS, placeholder = "Año", start = "", disabled, error }: { label?: string; options?: string[]; placeholder?: string; start?: string; disabled?: boolean; error?: string }): JSX.Element {
  const [value, setValue] = useState(start);
  return <div style={{ width: "100%", maxWidth: 360 }}>
    <Select label={label} value={value} onChange={setValue} options={options} placeholder={placeholder} disabled={disabled} error={value ? undefined : error} />
  </div>;
}
