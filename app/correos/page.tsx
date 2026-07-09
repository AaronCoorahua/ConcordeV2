import type { JSX } from "react";
import Header from "@/app/_components/Header";
import CorreosCatalog, { type CatalogEntry, type CatalogTipologia } from "@/app/correos/_components/CorreosCatalog";
import { EMAIL_ENTRIES } from "@/src/emails/registry";
import { EMAIL_TIPOLOGIAS, EMAIL_PROD_TOTAL } from "@/src/emails/tipologias";

/**
 * /correos — Catálogo de correos transaccionales (tema claro, mismo estilo
 * que /components, /blocks y /banners). Rail de tipologías + plantillas
 * completas y banners hero email-safe por tipología, con «Copiar HTML».
 */

export default function CorreosPage(): JSX.Element {
  const tipologias: CatalogTipologia[] = EMAIL_TIPOLOGIAS.map(function toTip(t) {
    return { id: t.id, label: t.label, prodCount: t.prodCount };
  });

  const entries: CatalogEntry[] = EMAIL_ENTRIES.map(function toEntry(e) {
    return {
      id: e.id,
      kind: e.kind,
      name: e.name,
      tipologiaId: e.tipologiaId,
      description: e.description,
      previewDoc: e.previewDoc,
      copyHtml: e.copyHtml,
      previewHeight: e.previewHeight,
    };
  });

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Correos</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            {entries.length} en catálogo · {EMAIL_PROD_TOTAL} en producción
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 720 }}>
          Plantillas de mailing y banners hero por tipología, en HTML email-safe (tablas + estilos
          inline, formato 600px). Cada banner replica el header de las plantillas en producción con
          el sistema de color de su tipología — cópialo y pégalo como header del correo.
        </p>

        <CorreosCatalog tipologias={tipologias} entries={entries} />
      </main>
    </div>
  );
}
