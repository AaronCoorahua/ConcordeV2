"use client";

import type { JSX } from "react";
import { AddButton } from "@/src/components/AddButton";

/** Demo: la fila de Mis valorizaciones (en el bloque lleva a Valorizar). */
export default function AddButtonDemo(): JSX.Element {
  return <div style={{ display: "grid", width: "100%", maxWidth: 760 }}><AddButton onClick={() => {}}>Valorizar otro vehículo</AddButton></div>;
}
