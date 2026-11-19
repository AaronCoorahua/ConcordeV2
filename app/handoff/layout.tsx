"use client";

/**
 * Layout de /handoff/* — header compartido. Cada página trae su propia
 * sección de instalación (estilo shadcn), así que el layout solo aporta el nav.
 */

import type { JSX, ReactNode } from "react";
import Header from "@/app/_components/Header";

export default function HandoffLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    // Fondo propio: en modo oscuro globals.css pone el body en negro y las páginas usan tinta oscura.
    <div style={{ background: "#ffffff", color: "var(--ui-ink)", minHeight: "100vh" }}>
      <Header active="components" />
      {children}
    </div>
  );
}
