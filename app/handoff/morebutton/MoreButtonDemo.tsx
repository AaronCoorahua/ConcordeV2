"use client";

import { useState } from "react";
import type { JSX } from "react";
import { MoreButton } from "@/src/components/MoreButton";

/** El ⋯ de la fila Publicada de Mi Garaje (Toyota Etios 2020). */
export default function MoreButtonDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  return <MoreButton label="Más acciones: Toyota Etios 2020" expanded={open} controls="mp-acts-demo" onClick={() => setOpen((x) => !x)} />;
}
