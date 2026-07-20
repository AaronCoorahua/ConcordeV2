"use client";

import type { JSX } from "react";
import Header from "@/app/_components/Header";
import type { ReportEntry } from "../reportData";

/**
 * ReportDetailViewer — detalle de un issue: imágenes Original ↔ Concorde,
 * qué está mal, cómo se corrige y el código antes/después.
 */

export default function ReportDetailViewer({ entry, index }: { entry: ReportEntry; index: number }): JSX.Element {
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

      <main style={{ flex: 1, width: "100%", maxWidth: 1080, margin: "0 auto", padding: "40px 24px 96px" }}>
        {/* Volver */}
        <a
          href="/reporte"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#64748b",
            textDecoration: "none",
            marginBottom: 24,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al catálogo
        </a>

        {/* Título */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <span
            style={{
              flexShrink: 0,
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#f1edff",
              color: "#4f2ed8",
              fontSize: 14,
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
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{entry.title}</h1>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>{entry.date}</span>
          </div>
        </div>

        {/* Comparativa de imágenes lado a lado */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <ImagePanel label="Producción" tone="#f97316" src={entry.originalImage} alt={`Producción — ${entry.title}`} />
          {entry.concordeEmbed ? (
            <EmbedPanel label="Concorde" tone="#4f2ed8" src={entry.concordeEmbed} title={`Concorde — ${entry.title}`} />
          ) : (
            <ImagePanel label="Concorde" tone="#4f2ed8" src={entry.concordeImage} alt={`Concorde — ${entry.title}`} />
          )}
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
            {entry.codeOriginal && <CodeBlock label="Código producción" tone="#f97316" code={entry.codeOriginal} />}
            {entry.codeConcorde && (
              <CodeBlock label="Código Concorde" tone="#4f2ed8" code={entry.codeConcorde} link={entry.codeLink} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function ImagePanel({ label, tone, src, alt }: { label: string; tone: string; src: string | string[]; alt: string }): JSX.Element {
  const sources = Array.isArray(src) ? src : [src];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", letterSpacing: "0.02em" }}>{label}</span>
        {sources.length > 1 && (
          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>· {sources.length} capturas</span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sources.map((s, i) => (
          <div
            key={i}
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
            <img
              src={s}
              alt={sources.length > 1 ? `${alt} (${i + 1})` : alt}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmbedPanel({ label, tone, src, title }: { label: string; tone: string; src: string; title: string }): JSX.Element {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", letterSpacing: "0.02em" }}>{label}</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#4f2ed8",
            background: "#f1edff",
            padding: "2px 8px",
            borderRadius: 20,
          }}
        >
          Interactivo
        </span>
        <a
          href={src.replace(/\/embed$/, "")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            fontWeight: 600,
            color: "#93a3b8",
            textDecoration: "none",
          }}
        >
          abrir bloque
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3.5 3H9V8.5M9 3L3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          aspectRatio: "16 / 10",
        }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </div>
    </div>
  );
}

function Section({ title, accent, paragraphs }: { title: string; accent: string; paragraphs: string[] }): JSX.Element {
  return (
    <section style={{ marginBottom: 28 }}>
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
