import type { JSX } from "react";
import type { Metadata } from "next";
import Header from "@/app/_components/Header";
import { REPORT_ENTRIES } from "@/app/reporte/reportData";
import PolishBoard from "./PolishBoard";
import { splitTitle, type PolishTicket } from "./polishData";

/**
 * /polish — tablero Kanban de las correcciones de front para IT.
 * Cada tarjeta es una entrada de app/reporte/reportData.ts y abre su detalle en
 * /polish/{slug}. Los tickets se crean con la skill /polish (.claude/skills/polish).
 */

export const metadata: Metadata = { title: "Polish · Concorde" };

export default function PolishPage(): JSX.Element {
  // Al cliente solo viaja lo que pinta la tarjeta, no el código de cada ticket.
  const tickets: PolishTicket[] = REPORT_ENTRIES.map(function toTicket(e) {
    return {
      slug: e.slug,
      ...splitTitle(e.title),
      date: e.date,
      base: e.status,
      codeLink: e.codeLink,
      handoffLink: e.handoffLink,
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
      <Header active="polish" />
      <PolishBoard tickets={tickets} />
    </div>
  );
}
