import type { ReactNode } from "react";

/** En el lab, LabPanel muestra paneles flotantes de QA (banners, simular al vendedor, foco…).
 *  En el bloque de Concorde no se dibuja: las pantallas quedan con sus valores por defecto. */
export function LabPanel(_props: { title: string; store: string; className: string; actions?: ReactNode; pill?: string; mobileClosed?: boolean; closed?: boolean; defaultOpen?: boolean; side?: "left" | "right"; children: ReactNode }): null {
  return null;
}
