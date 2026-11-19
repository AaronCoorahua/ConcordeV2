"use client";

import { useState } from "react";
import type { JSX } from "react";
import { Pagination, type PaginationProps } from "@/src/components/Pagination";

/** Demo: guarda la página elegida para que la numeración responda al tocarla. */
export default function PaginationDemo({ pages = 3, variant, size }: Pick<PaginationProps, "variant" | "size"> & { pages?: number }): JSX.Element {
  const [page, setPage] = useState(0);
  return <div style={{ display: "grid", gap: 8, justifyItems: "center", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" }}>
    <span style={{ fontSize: 13, color: "#5F5B6B" }}>Página {page + 1} de {pages}</span>
    <Pagination page={page} pages={pages} onChange={setPage} label="Mis publicaciones" variant={variant} size={size} />
  </div>;
}
