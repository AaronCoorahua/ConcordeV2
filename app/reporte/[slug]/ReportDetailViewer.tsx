"use client";

import { useEffect, useState } from "react";
import type { JSX } from "react";
import Header from "@/app/_components/Header";
import DetailCard from "@/src/components/DetailCard";
import OfferShelf from "@/src/components/OfferShelf";
import CardViewer from "@/src/components/CardViewer";
import CardTitle from "@/src/components/CardTitle";
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

        {/* Comparativa lado a lado. Si el reporte no tiene lado Concorde
            (concordeComponent === "none"), Producción ocupa todo el ancho. */}
        {(() => {
          const soloProduccion = entry.concordeComponent === "none";
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: soloProduccion ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 20,
                marginBottom: 36,
              }}
            >
              {entry.originalVideo ? (
                <VideoPanel label="Producción" tone="#f97316" src={entry.originalVideo} title={`Producción — ${entry.title}`} />
              ) : (
                <ImagePanel label="Producción" tone="#f97316" src={entry.originalImage} alt={`Producción — ${entry.title}`} />
              )}
              {soloProduccion ? null : entry.concordeComponent === "like-demo" ? (
                <LikeDemoPanel label="Concorde" tone="#4f2ed8" />
              ) : entry.concordeComponent === "cardviewer-demo" ? (
                <CardViewerDemoPanel label="Concorde" tone="#4f2ed8" />
              ) : entry.concordeComponent === "selector-fecha-demo" ? (
                <SelectorFechaDemoPanel label="Concorde" tone="#4f2ed8" />
              ) : entry.concordeComponent === "actividad-empty-demo" ? (
                <ActividadEmptyDemoPanel label="Concorde" tone="#4f2ed8" />
              ) : entry.concordeEmbed ? (
                <EmbedPanel label="Concorde" tone="#4f2ed8" src={entry.concordeEmbed} title={`Concorde — ${entry.title}`} />
              ) : (
                <ImagePanel label="Concorde" tone="#4f2ed8" src={entry.concordeImage} alt={`Concorde — ${entry.title}`} />
              )}
            </div>
          );
        })()}

        {/* Problema */}
        <Section title="Qué está mal" accent="#dc2626" paragraphs={entry.problem} />

        {/* Posible causa (opcional) */}
        {entry.cause && <Section title="Posible causa" accent="#d97706" paragraphs={[entry.cause]} />}

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
              <CodeBlock
                label="Código Concorde"
                tone="#4f2ed8"
                code={entry.codeConcorde}
                link={entry.codeLink}
                handoffLink={entry.handoffLink}
              />
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

function PanelLabel({ label, tone, tag }: { label: string; tone: string; tag?: string }): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", letterSpacing: "0.02em" }}>{label}</span>
      {tag && (
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
          {tag}
        </span>
      )}
    </div>
  );
}

function VideoPanel({ label, tone, src, title }: { label: string; tone: string; src: string; title: string }): JSX.Element {
  return (
    <div>
      <PanelLabel label={label} tone={tone} tag="Video" />
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          background: "#0f172a",
          aspectRatio: "16 / 10",
          maxHeight: 520,
          margin: "0 auto",
        }}
      >
        <video
          src={src}
          title={title}
          controls
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#0f172a" }}
        />
      </div>
    </div>
  );
}

/** Renderiza los componentes REALES del like (cabecera de sala + card del listado). */
function LikeDemoPanel({ label, tone }: { label: string; tone: string }): JSX.Element {
  return (
    <div>
      <PanelLabel label={label} tone={tone} tag="Componentes reales" />
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          aspectRatio: "16 / 10",
          overflow: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 16,
        }}
      >
        {/* Escalados para caber en el panel; el like es clickeable */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ transform: "scale(0.9)", transformOrigin: "top center" }}>
            <DetailCard />
          </div>
          <div style={{ transform: "scale(0.5)", transformOrigin: "top center", marginTop: -8 }}>
            <OfferShelf title="RECOMENDADOS" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Preview EN LOOP de la mejora: el CardViewer REAL de Concorde con una capa de
 * skeleton superpuesta que replica su layout (visor 443×362 + filmstrip 4×113×84).
 * El skeleton se muestra ~2s y luego revela el visor; se repite en bucle.
 */
function CardViewerDemoPanel({ label, tone }: { label: string; tone: string }): JSX.Element {
  const demo = "/demo/bronco.jpg";
  const [loading, setLoading] = useState(true);

  // Loop: skeleton 2s → visor 1.8s → skeleton 2s → …
  useEffect(function loopSkeleton() {
    const t = setTimeout(function () { setLoading(function (v) { return !v; }); }, loading ? 2000 : 1800);
    return function () { clearTimeout(t); };
  }, [loading]);

  return (
    <div>
      <PanelLabel label={label} tone={tone} tag="Mejora sugerida" />
      <style>{`@keyframes rep-shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }`}</style>
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          aspectRatio: "16 / 10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          overflow: "hidden",
        }}
      >
        {/* CardViewer REAL, escalado para caber. Cuando "carga", ENCIMA se pinta
            un skeleton que usa las MISMAS clases del componente (pcardv,
            pcardv__viewer, pcardv__strip, pcardv__thumb) → hereda su layout, gap,
            padding, border-radius y overflow exactos, sin adivinar medidas. */}
        <div style={{ transform: "scale(0.62)", transformOrigin: "center", position: "relative", width: 443 }}>
          <CardViewer images={[demo, demo, demo, demo]} imageAlt="Oferta" />

          {loading && (
            <div className="pcardv" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {/* mismo visor (hereda tamaño + border-radius 0 0 16 16). El shimmer
                  copia ese radio para cubrir las esquinas redondeadas. */}
              <div className="pcardv__viewer" style={{ background: "#eceef3" }}>
                <Shimmer radius="0 0 16px 16px" />
              </div>
              {/* mismo filmstrip; SIN aro de selección (un skeleton no marca nada) */}
              <div className="pcardv__strip">
                {[0, 1, 2, 3].map(function renderThumb(i) {
                  return (
                    <div key={i} className="pcardv__thumb" style={{ background: "#eceef3" }}>
                      <Shimmer radius="4px" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Icono de subasta (martillo) — SVG real de icons8-auction, tintado Voyager. */
function ActividadEmptyIcon(): JSX.Element {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* mancha de fondo suave */}
      <ellipse cx="32" cy="34" rx="26" ry="16" fill="#F1EDFF" />
      {/* trazos del martillo de subasta (icons8), en morado de marca */}
      <g fill="#5F3ED8">
        <path d="M0 0 C7.92 0 15.84 0 24 0 C24 2.31 24 4.62 24 7 C23.01 7 22.02 7 21 7 C21 8.32 21 9.64 21 11 C22.65 11 24.3 11 26 11 C26 11.66 26 12.32 26 13 C26.90355225 12.99476318 27.80710449 12.98952637 28.73803711 12.98413086 C32.07951489 12.96712314 35.42094692 12.95456667 38.76245117 12.94506836 C40.21070073 12.94002899 41.65894517 12.93319747 43.10717773 12.92456055 C45.18474588 12.91247753 47.26224697 12.90676789 49.33984375 12.90234375 C50.59144287 12.89710693 51.84304199 12.89187012 53.13256836 12.88647461 C56 13 56 13 57 14 C57.125 17 57.125 17 57 20 C56 21 56 21 53.13256836 21.11352539 C51.88096924 21.10828857 50.62937012 21.10305176 49.33984375 21.09765625 C48.34314415 21.09553383 48.34314415 21.09553383 47.3263092 21.09336853 C45.19666101 21.08775518 43.06711661 21.07520054 40.9375 21.0625 C39.49674631 21.05748671 38.05599097 21.05292351 36.61523438 21.04882812 C33.07678898 21.03778145 29.53840461 21.02050792 26 21 C26 21.66 26 22.32 26 23 C24.35 23 22.7 23 21 23 C21 24.32 21 25.64 21 27 C21.99 27 22.98 27 24 27 C24 29.31 24 31.62 24 34 C16.08 34 8.16 34 0 34 C0 31.69 0 29.38 0 27 C0.99 27 1.98 27 3 27 C3 20.4 3 13.8 3 7 C2.01 7 1.02 7 0 7 C0 4.69 0 2.38 0 0 Z" transform="translate(7,5)" />
        <path d="M0 0 C7.92 0 15.84 0 24 0 C24 1.65 24 3.3 24 5 C25.32 5 26.64 5 28 5 C28 6.65 28 8.3 28 10 C29.32 10 30.64 10 32 10 C32 10.66 32 11.32 32 12 C19.13 12 6.26 12 -7 12 C-7 11.34 -7 10.68 -7 10 C-6.01 10 -5.02 10 -4 10 C-4 8.35 -4 6.7 -4 5 C-2.68 5 -1.36 5 0 5 C0 3.35 0 1.7 0 0 Z" transform="translate(7,47)" />
      </g>
      {/* acentos naranja de marca */}
      <g fill="#ED8936">
        <path d="M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.99 5 2.98 5 4 C3.35 3.67 1.7 3.34 0 3 C0 2.01 0 1.02 0 0 Z" transform="translate(33,44)" />
        <path d="M0 0 C0 0.99 0 1.98 0 3 C-1.65 3.33 -3.3 3.66 -5 4 C-5 3.01 -5 2.02 -5 1 C-3 0 -3 0 0 0 Z" transform="translate(5,44)" />
        <path d="M0 0 C0 0.99 0 1.98 0 3 C-1.65 3.33 -3.3 3.66 -5 4 C-5 3.01 -5 2.02 -5 1 C-3 0 -3 0 0 0 Z" transform="translate(38,38)" />
        <path d="M0 0 C2.475 0.495 2.475 0.495 5 1 C5 1.99 5 2.98 5 4 C3.35 3.67 1.7 3.34 0 3 C0 2.01 0 1.02 0 0 Z" transform="translate(0,38)" />
      </g>
    </svg>
  );
}

/**
 * Live preview de la mejora propuesta: la card «Tu actividad» SIN actividad, con
 * un empty-state centrado (icono + mensaje de producción + link «Ver ofertas»),
 * en vez de las 4 pills grises. Base: ActivityCard del bloque zona.
 */
function ActividadEmptyDemoPanel({ label, tone }: { label: string; tone: string }): JSX.Element {
  return (
    <div>
      <PanelLabel label={label} tone={tone} tag="Mejora propuesta · en vivo" />
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {/* Card «Tu actividad» — MISMAS medidas que ActivityCard (375×221) */}
        <section
          style={{
            boxSizing: "border-box",
            width: 375,
            height: 221,
            maxWidth: "100%",
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 0 8px 4px rgba(0,0,0,0.08)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CardTitle title="TU ACTIVIDAD" subtitle="" titleSize={14} />
          </div>
          <div style={{ height: 1, background: "#E1E3E2", marginTop: 8 }} />

          {/* Empty-state centrado */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, textAlign: "center", padding: "6px 16px", minHeight: 0 }}>
            <ActividadEmptyIcon />
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#3b1782", lineHeight: 1.3 }}>
              Aún no tienes participaciones en subastas.
            </p>
            <a
              href="#"
              onClick={function (e) { e.preventDefault(); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: "#ED8936", textDecoration: "none" }}
            >
              Ver ofertas <span aria-hidden="true">›</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Live preview de la mejora propuesta: la card de Visitas con un dropdown de fecha
 * PROPIO (clickeable) en vez del select nativo. No es un componente de Concorde:
 * es la recomendación, renderizada en vivo para poder probarla.
 */
function SelectorFechaDemoPanel({ label, tone }: { label: string; tone: string }): JSX.Element {
  const fechas = [
    { value: "2026-08-05", label: "miércoles, 05 de agosto" },
    { value: "2026-08-06", label: "jueves, 06 de agosto" },
    { value: "2026-08-07", label: "viernes, 07 de agosto" },
  ];
  // Arranca ABIERTO para que el preview muestre de una la lista personalizada.
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const selectedLabel = fechas.find(function (f) { return f.value === value; })?.label;

  return (
    <div>
      <PanelLabel label={label} tone={tone} tag="Mejora propuesta · en vivo" />
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          minHeight: 420,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {/* Card de Visitas (misma estética del bloque detalle) */}
        <div
          style={{
            width: 300,
            background: "#fff",
            borderRadius: 8,
            border: "1px solid rgba(32,0,104,0.07)",
            boxShadow: "0 2px 10px rgba(32,0,104,0.08)",
            padding: 16,
            fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2DBE64" }} />
            <span style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em", color: "#3b1782" }}>VISITAS</span>
          </div>
          <div style={{ height: 1, background: "#e1e3e2", margin: "0 -16px 14px" }} />
          <p style={{ margin: "0 0 16px", fontSize: 12, lineHeight: "16px", color: "#191c1c" }}>
            Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
          </p>

          {/* Dropdown PROPIO (la mejora) */}
          <div style={{ position: "relative", width: "100%" }}>
            <button
              type="button"
              onClick={function () { setOpen(function (o) { return !o; }); }}
              aria-haspopup="listbox"
              aria-expanded={open}
              style={{
                height: 40, width: "100%", padding: "0 14px", borderRadius: 9999,
                border: "1px solid #5f3ed8", background: "#fff", font: "inherit",
                fontSize: 12, color: value ? "#191c1c" : "#99a1af",
                display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
              }}
            >
              <span>{selectedLabel ?? "Seleccionar Fecha"}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#99a1af" }} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 13.2H12V18.2H17V13.2ZM16 2.2V4.2H8V2.2H6V4.2H5C3.9 4.2 3 5.1 3 6.2L3 20.2C3 21.3 3.9 22.2 5 22.2H19C20.1 22.2 21 21.3 21 20.2V6.2C21 5.1 20.1 4.2 19 4.2H18V2.2H16ZM19 20.2H5V9.2H19V20.2Z" fill="currentColor" /></svg>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .18s" }}><path d="M5.5 7.5L10 12.5L14.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>

            {open && (
              <ul
                role="listbox"
                style={{
                  position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, margin: 0, padding: 6,
                  listStyle: "none", zIndex: 10, background: "#fff", borderRadius: 16,
                  border: "1px solid #5f3ed8", boxShadow: "0 8px 24px rgba(32,0,104,0.12)",
                }}
              >
                {fechas.map(function renderOption(f) {
                  const selected = f.value === value;
                  return (
                    <li
                      key={f.value}
                      role="option"
                      aria-selected={selected}
                      onClick={function () { setValue(f.value); setOpen(false); }}
                      className="rep-opt"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                        fontSize: 14, color: "#191c1c",
                        background: selected ? "#f1edff" : "transparent",
                      }}
                    >
                      <span>{f.label}</span>
                      {selected && <span style={{ color: "#5f3ed8", fontWeight: 700 }} aria-hidden="true">✓</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Botón «Agenda tu visita» (se habilita al elegir fecha) */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <button
              type="button"
              disabled={!value}
              style={{
                height: 40, minWidth: 200, padding: "0 24px", borderRadius: 9999, border: "2px solid transparent",
                fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: value ? "pointer" : "not-allowed",
                color: value ? "#fff" : "#99a1af",
                background: value ? "linear-gradient(160deg,#8460E5 0%,#3B1782 100%)" : "#e1e3e2",
                boxShadow: value ? "rgba(132,96,229,0.3) 0 2px 8px" : "none",
              }}
            >
              Agenda tu visita
            </button>
          </div>
        </div>
      </div>
      <style>{`.rep-opt:hover { background: #f6f4ff !important; }`}</style>
    </div>
  );
}

/** Placeholder animado (shimmer) que cubre su contenedor, con el mismo radio. */
function Shimmer({ radius }: { radius?: string }): JSX.Element {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        background: "linear-gradient(90deg, #eceef3 25%, #f5f6f9 37%, #eceef3 63%)",
        backgroundSize: "400% 100%",
        animation: "rep-shimmer 1.2s ease-in-out infinite",
      }}
    />
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

function CodeBlock({ label, tone, code, link, handoffLink }: { label: string; tone: string; code: string; link?: string; handoffLink?: string }): JSX.Element {
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
        {(link || handoffLink) && (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
            {handoffLink && (
              <a
                href={handoffLink}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#c4b5fd",
                  textDecoration: "none",
                }}
              >
                ver handoff
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
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
