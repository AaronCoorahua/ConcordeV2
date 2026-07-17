"use client";

import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { REPORT_ENTRIES, type ReportEntry } from "./reportData";

/**
 * /reporte — Bitácora de correcciones Original ↔ Concorde.
 * Landing tipo log: por cada corrección se comparan las dos imágenes lado a lado,
 * se describe el problema y se explica cómo se corrige (con el código antes/después).
 */

const STATUS_STYLE: Record<ReportEntry["status"], { bg: string; fg: string; label: string }> = {
  corregido: { bg: "#dcfce7", fg: "#166534", label: "Corregido" },
  "en-progreso": { bg: "#fef9c3", fg: "#854d0e", label: "En progreso" },
  pendiente: { bg: "#fee2e2", fg: "#991b1b", label: "Pendiente" },
};

export default function ReportePage(): JSX.Element {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header active="reporte" />

      <main style={{ flex: 1, width: "100%", maxWidth: 1080, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4f2ed8",
              background: "#f1edff",
              padding: "4px 12px",
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            Bitácora
          </span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            Reporte de correcciones
          </h1>
          <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.6, margin: "16px 0 0", maxWidth: 620 }}>
            Comparativa entre la referencia <strong style={{ color: "#0f172a" }}>Original</strong> y su implementación en{" "}
            <strong style={{ color: "#0f172a" }}>Concorde</strong>. Cada entrada documenta qué estaba mal y cómo se corrige.
          </p>
        </div>

        {/* Estado vacío */}
        {REPORT_ENTRIES.length === 0 ? (
          <div
            style={{
              border: "2px dashed #e2e8f0",
              borderRadius: 16,
              padding: "64px 24px",
              textAlign: "center",
              background: "#ffffff",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "#0f172a" }}>Aún no hay correcciones registradas</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "8px 0 0" }}>
              Envía la imagen Original, la de Concorde, la explicación y el código para crear la primera entrada.
            </p>
          </div>
        ) : (
          <>
            <IssueCatalog entries={REPORT_ENTRIES} />
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {REPORT_ENTRIES.map((entry, i) => (
                <ReportCard key={entry.slug} entry={entry} index={i + 1} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function IssueCatalog({ entries }: { entries: ReportEntry[] }): JSX.Element {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 8,
        marginBottom: 40,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", letterSpacing: "0.02em" }}>Catálogo de issues</span>
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{entries.length} total</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {entries.map((entry, i) => {
          const status = STATUS_STYLE[entry.status];
          return (
            <a
              key={entry.slug}
              href={`#${entry.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                borderRadius: 10,
                textDecoration: "none",
                color: "inherit",
                transition: "background 0.12s",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: "#f1f5f9",
                  color: "#64748b",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#0f172a", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {entry.title}
              </span>
              <span style={{ fontSize: 12, color: "#94a3b8", flexShrink: 0 }}>{entry.date}</span>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: status.bg,
                  color: status.fg,
                }}
              >
                {status.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ReportCard({ entry, index }: { entry: ReportEntry; index: number }): JSX.Element {
  const status = STATUS_STYLE[entry.status];

  return (
    <article
      id={entry.slug}
      style={{
        scrollMarginTop: 80,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)",
      }}
    >
      {/* Encabezado de la card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "20px 28px",
          borderBottom: "1px solid #f1f5f9",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              flexShrink: 0,
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "#f1edff",
              color: "#4f2ed8",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>{entry.title}</h2>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>{entry.date}</span>
          </div>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: 20,
            background: status.bg,
            color: status.fg,
          }}
        >
          {status.label}
        </span>
      </div>

      <div style={{ padding: 28 }}>
        {/* Comparativa de imágenes lado a lado */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <ImagePanel label="Original" tone="#f97316" src={entry.originalImage} alt={`Original — ${entry.title}`} />
          <ImagePanel label="Concorde" tone="#4f2ed8" src={entry.concordeImage} alt={`Concorde — ${entry.title}`} />
        </div>

        {/* Problema */}
        <Section title="Qué está mal" accent="#dc2626" paragraphs={entry.problem} />

        {/* Corrección */}
        <Section title="Cómo se corrige" accent="#16a34a" paragraphs={entry.fix} />

        {/* Código antes/después */}
        {(entry.codeOriginal || entry.codeConcorde) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
              marginTop: 8,
              alignItems: "stretch",
            }}
          >
            {entry.codeOriginal && <CodeBlock label="Código original" tone="#f97316" code={entry.codeOriginal} />}
            {entry.codeConcorde && (
              <CodeBlock label="Código Concorde" tone="#4f2ed8" code={entry.codeConcorde} link={entry.codeLink} />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ImagePanel({ label, tone, src, alt }: { label: string; tone: string; src: string; alt: string }): JSX.Element {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", letterSpacing: "0.02em" }}>{label}</span>
      </div>
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          aspectRatio: "16 / 10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
      </div>
    </div>
  );
}

function Section({ title, accent, paragraphs }: { title: string; accent: string; paragraphs: string[] }): JSX.Element {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3
        style={{
          fontSize: 14,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: accent,
          margin: "0 0 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ width: 4, height: 16, borderRadius: 4, background: accent, display: "inline-block" }} />
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: "#334155", margin: 0 }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function CodeBlock({ label, tone, code, link }: { label: string; tone: string; code: string; link?: string }): JSX.Element {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "8px 14px",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.02em" }}>{label}</span>
        </div>
        {link && (
          <a
            href={link}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              color: "#93c5fd",
              textDecoration: "none",
            }}
          >
            ver código Concorde
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          background: "#0f172a",
          color: "#e2e8f0",
          fontSize: 12.5,
          lineHeight: 1.6,
          fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
          overflowX: "auto",
          flex: 1,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
