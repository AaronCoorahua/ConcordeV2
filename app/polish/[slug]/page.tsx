import type { JSX } from "react";
import { notFound } from "next/navigation";
import { REPORT_ENTRIES, getReportEntry } from "@/app/reporte/reportData";
import ReportDetailViewer from "@/app/reporte/[slug]/ReportDetailViewer";

/**
 * /polish/[slug] — detalle de un ticket del tablero. Es la misma vista que
 * /reporte/[slug] (imágenes, qué está mal, cómo se corrige y código), pero vuelve
 * al tablero.
 */

export function generateStaticParams(): Array<{ slug: string }> {
  return REPORT_ENTRIES.map(function toParam(e) {
    return { slug: e.slug };
  });
}

export default async function PolishDetailPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const entry = getReportEntry(slug);
  if (!entry) notFound();

  const index = REPORT_ENTRIES.findIndex(function bySlug(e) { return e.slug === slug; }) + 1;

  return <ReportDetailViewer entry={entry} index={index} active="polish" backHref="/polish" backLabel="Volver al tablero" />;
}
