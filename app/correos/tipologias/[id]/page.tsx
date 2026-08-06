import type { JSX } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/_components/Header";
import { TIPO_GROUPS, getTipoGroup } from "@/src/emails/tipologiasRegistry";
import FondoTabs from "./FondoTabs";

/**
 * /correos/tipologias/[id] — detalle de la tipología: el banner a tamaño real
 * (600px) con un tab para verlo sobre cada tono, y «Copiar HTML» del tono activo.
 */

export function generateStaticParams(): Array<{ id: string }> {
  return TIPO_GROUPS.map(function toParam(g) { return { id: g.tipologia.id }; });
}

export default async function TipologiaBasicaPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const { id } = await params;
  const group = getTipoGroup(id);
  if (!group) notFound();

  const t = group.tipologia;
  const bannerH = group.plantillas[0].previewHeight - 20;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <Link
          href="/correos/tipologias"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Tipologías
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "monospace", minWidth: 26, height: 26, padding: "0 7px", borderRadius: 8, background: "#f1edff", color: "#4f2ed8", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{t.letra}</span>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>{t.label}</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1edff", color: "#4f2ed8", letterSpacing: "0.04em" }}>
            600 × {bannerH} px
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>
          {t.descripcion} Cada tono está clonado 1:1 de su diseño en Figma.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {group.plantillas.map(function renderPlantilla(p) {
            return (
              <section key={p.id}>
                <FondoTabs fondos={p.fondos} previewHeight={p.previewHeight} title={p.name} />
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
