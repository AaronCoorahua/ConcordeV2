"use client";

import { useState } from "react";
import type { JSX } from "react";
import { Combobox } from "@/src/components/Combobox";

/** Demo: escribir filtra; ↑ ↓, Enter y Esc como en Valorizar. */
export default function ComboboxDemo({ label, options, placeholder, pinned, disabled }: { label: string; options: string[]; placeholder: string; pinned?: string; disabled?: boolean }): JSX.Element {
  const [value, setValue] = useState("");
  return <div style={{ width: "100%", maxWidth: 360, minHeight: disabled ? undefined : 300 }}>
    <Combobox label={label} value={value} onChange={setValue} options={options} placeholder={placeholder} pinned={pinned} disabled={disabled} />
  </div>;
}
