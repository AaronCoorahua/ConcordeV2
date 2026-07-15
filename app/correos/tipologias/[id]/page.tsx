import type { JSX } from "react";
import { notFound } from "next/navigation";
import Header from "@/app/_components/Header";
import { TIPO_GROUPS, getTipoGroup } from "@/src/emails/tipologiasRegistry";
import FondoTabs from "./FondoTabs";

/**
 * /correos/tipologias/[id] — detalle de una tipología: el banner a tamaño real
 * (600px) con un tab para ver el mismo layout sobre cada fondo V2, y «Copiar
 * HTML» del fondo activo.
 */

export function generateStaticParams(): Array<{ id: string }> {
  return TIPO_GROUPS.map(function toParam(g) { return { id: g.tipologia.id }; });
}

export default async function TipologiaBasicaPage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const { id } = await params;
  const group = getTipoGroup(id);
  if (!group) notFound();

  const t = group.tipologia;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <a
          href="/correos/tipologias"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Tipologías
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "monospace", minWidth: 26, height: 26, padding: "0 7px", borderRadius: 8, background: "#f1edff", color: "#4f2ed8", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{t.letra}</span>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>{t.label}</h1>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1edff", color: "#4f2ed8", letterSpacing: "0.04em" }}>
            600 px
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>
          {t.descripcion} Estilo Voyager v2 traducido a HTML email-safe: gradiente por tono, chevrons
          y anillos de fondo. Cambia el fondo con el tab — el layout no se mueve.
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
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, background: "#f1edff", color: "#4f2ed8" }}>
                    banner
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px 26px", lineHeight: 1.5, maxWidth: 640 }}>{p.description}</p>
                <FondoTabs fondos={p.fondos} previewHeight={p.previewHeight} title={p.name} />
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
