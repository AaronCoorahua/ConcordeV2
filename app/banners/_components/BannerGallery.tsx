"use client";

/**
 * BannerGallery — viewer de plantillas de un formato de banner.
 * Muestra cada plantilla a escala real sobre un lienzo neutro, con su nombre,
 * descripción y medidas. Reutilizado por /banners/principal|secundario|sidebar.
 */

import type { JSX, ReactNode } from "react";

export interface BannerTemplate {
  id: string;
  name: string;
  description: string;
  node: ReactNode;
}

export interface BannerGalleryProps {
  /** Nombre del formato — p.ej. "Banner Principal" */
  title: string;
  /** Medidas — p.ej. "766 × 272" */
  format: string;
  /** Dónde vive este slot en los bloques */
  slot: string;
  description: string;
  templates: BannerTemplate[];
}

export default function BannerGallery({
  title,
  format,
  slot,
  description,
  templates,
}: BannerGalleryProps): JSX.Element {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
      {/* Breadcrumb */}
      <a
        href="/banners"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 16 }}
      >
        <span aria-hidden="true">←</span> Banners
      </a>

      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>{title}</h1>
        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1edff", color: "#4f2ed8", letterSpacing: "0.04em" }}>
          {format}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b" }}>
          {slot}
        </span>
      </div>
      <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>{description}</p>

      {/* Plantillas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {templates.map(function renderTemplate(t, i) {
          return (
            <section key={t.id}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "#94a3b8" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: "#0f172a", margin: 0 }}>{t.name}</h2>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px 26px", lineHeight: 1.5 }}>{t.description}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 32,
                  borderRadius: 12,
                  background: "#f8fafc",
                  border: "1px solid #f1f5f9",
                  overflowX: "auto",
                }}
              >
                {t.node}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
