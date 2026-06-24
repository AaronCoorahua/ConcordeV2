"use client";

/**
 * Layout de /handoff/* — header compartido. Cada página trae su propia
 * sección de instalación (estilo shadcn), así que el layout solo aporta el nav.
 */

import type { JSX, ReactNode } from "react";
import Header from "@/app/_components/Header";

export default function HandoffLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header active="components" />
      {children}
    </>
  );
}
