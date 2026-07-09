import type { JSX } from "react";
import { notFound } from "next/navigation";
import Header from "@/app/_components/Header";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import { EMAIL_ENTRIES, getEmailEntry } from "@/src/emails/registry";
import { EMAIL_TIPOLOGIAS } from "@/src/emails/tipologias";

/**
 * /correos/[id] — vista completa de una plantilla o banner de correo:
 * iframe a tamaño real (600px) + «Copiar HTML».
 */

export function generateStaticParams(): Array<{ id: string }> {
  return EMAIL_ENTRIES.map(function toParam(e) { return { id: e.id }; });
}

export default async function CorreoDetailPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const { id } = await params;
  const entry = getEmailEntry(id);
  if (!entry) notFound();

  const tipologia = EMAIL_TIPOLOGIAS.find(function byId(t) { return t.id === entry.tipologiaId; });

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <a
          href="/correos"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Correos
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>{entry.name}</h1>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 20, background: entry.kind === "banner" ? "#f1edff" : "#e6fbfb", color: entry.kind === "banner" ? "#4f2ed8" : "#009699" }}>
            {entry.kind}
          </span>
          {tipologia && (
            <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b" }}>
              {tipologia.label}
            </span>
          )}
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", maxWidth: 640 }}>{entry.description}</p>

        <div style={{ marginBottom: 24 }}>
          <CopyHtmlButton html={entry.copyHtml} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: 32, borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9", overflowX: "auto" }}>
          <iframe
            title={entry.name}
            srcDoc={entry.previewDoc}
            scrolling="no"
            style={{ width: 600, height: entry.previewHeight, border: "none", background: "#FAFAFA", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", flexShrink: 0 }}
          />
        </div>
      </main>
    </div>
  );
}
