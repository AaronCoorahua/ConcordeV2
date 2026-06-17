"use client";

/**
 * Layout de /handoff/* — inyecta el bloque "Añadir a tu proyecto" (npx @subastop/concorde add <name>)
 * en TODAS las páginas de handoff automáticamente, derivando el nombre del registry desde la ruta.
 */

import { usePathname } from "next/navigation";
import type { JSX, ReactNode } from "react";
import AddCommand from "./_components/AddCommand";

export default function HandoffLayout({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean); // ["handoff", "<name>"]
  const name = segments.length >= 2 && segments[0] === "handoff" ? segments[1] : "";

  return (
    <>
      {name ? (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
          <AddCommand name={name} />
        </div>
      ) : null}
      {children}
    </>
  );
}
