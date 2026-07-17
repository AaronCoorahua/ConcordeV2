import type { JSX } from "react";
import { notFound } from "next/navigation";
import { REPORT_ENTRIES, getReportEntry } from "../reportData";
import ReportDetailViewer from "./ReportDetailViewer";

/**
 * /reporte/[slug] — detalle de un issue de la bitácora: imágenes Original ↔ Concorde,
 * qué está mal, cómo se corrige y el código antes/después.
 */

export function generateStaticParams(): Array<{ slug: string }> {
  return REPORT_ENTRIES.map(function toParam(e) {
    return { slug: e.slug };
  });
}

export default async function ReporteDetailPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const entry = getReportEntry(slug);
  if (!entry) notFound();

  const index = REPORT_ENTRIES.findIndex(function bySlug(e) { return e.slug === slug; }) + 1;

  return <ReportDetailViewer entry={entry} index={index} />;
}
