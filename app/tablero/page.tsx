import type { JSX } from "react";
import type { Metadata } from "next";
import Header from "@/app/_components/Header";
import { REPORT_ENTRIES } from "@/app/reporte/reportData";
import { previewDe, splitTitle, type PolishTicket } from "@/app/polish/polishData";
import Tablero from "./Tablero";

/**
 * /tablero — lo que Growth le pide a dev y en qué pase sale.
 *
 * No es un tablero de columnas por estado: lo que ordena la página son los PASES
 * (lo que sale junto a producción, con fecha). Al costado queda lo que aún no tiene
 * pase: quick wins (peso 1), la cola y los forward (deseables sin fecha).
 *
 * Los tickets de /polish aparecen aquí como tarjetas; el detalle de cada corrección
 * sigue en /polish/{slug}.
 */

export const metadata: Metadata = { title: "Tablero · Concorde" };

export default function TableroPage(): JSX.Element {
  const tickets: PolishTicket[] = REPORT_ENTRIES.map(function toTicket(e) {
    return {
      slug: e.slug,
      ...splitTitle(e.title),
      date: e.date,
      base: e.status,
      codeLink: e.codeLink,
      handoffLink: e.handoffLink,
      preview: previewDe(e),
    };
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ui-subtle)",
        color: "var(--ui-ink)",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header active="tablero" />
      <Tablero tickets={tickets} />
    </div>
  );
}
