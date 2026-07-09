import type { JSX } from "react";
import { notFound } from "next/navigation";
import Header from "@/app/_components/Header";
import CopyHtmlButton from "@/app/correos/_components/CopyHtmlButton";
import { EMAIL_GROUPS, getEmailGroup } from "@/src/emails/registry";

/**
 * /correos/[id] — galería de una tipología (mismo patrón que /banners/{formato}):
 * cada plantilla HTML estática se muestra a tamaño real (600px) con su nombre,
 * descripción y botón «Copiar HTML».
 */

export function generateStaticParams(): Array<{ id: string }> {
  return EMAIL_GROUPS.map(function toParam(g) { return { id: g.tipologia.id }; });
}

export default async function CorreoTipologiaPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const { id } = await params;
  const group = getEmailGroup(id);
  if (!group) notFound();

  const t = group.tipologia;

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
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>{t.label}</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1edff", color: "#4f2ed8", letterSpacing: "0.04em" }}>
            600 px
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b" }}>
            {t.prodCount} en producción
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>
          Plantillas HTML estáticas de la tipología {t.label} — email-safe (tablas anidadas +
          estilos inline). Copia el banner header para reutilizarlo o el correo completo.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {group.plantillas.map(function renderPlantilla(p, i) {
            return (
              <section key={p.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "#94a3b8" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: "#0f172a", margin: 0 }}>{p.name}</h2>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, background: p.kind === "banner" ? "#f1edff" : "#e6fbfb", color: p.kind === "banner" ? "#4f2ed8" : "#009699" }}>
                    {p.kind}
                  </span>
                  <div style={{ flex: 1 }} />
                  <CopyHtmlButton html={p.copyHtml} />
                </div>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px 26px", lineHeight: 1.5, maxWidth: 640 }}>{p.description}</p>
                <div style={{ display: "flex", justifyContent: "center", padding: 32, borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9", overflowX: "auto" }}>
                  <iframe
                    title={p.name}
                    srcDoc={p.previewDoc}
                    scrolling="no"
                    style={{ width: 600, height: p.previewHeight, border: "none", background: "#FAFAFA", borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.10)", flexShrink: 0 }}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
