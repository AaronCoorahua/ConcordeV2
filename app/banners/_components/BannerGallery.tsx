"use client";

/**
 * BannerGallery — viewer de plantillas de un formato de banner.
 * Muestra cada plantilla a escala real sobre un lienzo neutro, con su nombre,
 * descripción y medidas. Reutilizado por /banners/principal|secundario|sidebar.
 */

import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";

/**
 * Convierte el DOM renderizado del banner a SVG vectorial (texto, rects,
 * gradientes reales) y lo copia al portapapeles. Pegar en Figma con Cmd/Ctrl+V
 * crea capas editables. dom-to-svg se importa on-click para no cargarlo en SSR.
 */
function CopySvgButton({ target }: { target: React.RefObject<HTMLDivElement | null> }): JSX.Element {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function copy(): Promise<void> {
    const el = target.current?.firstElementChild;
    if (!(el instanceof HTMLElement)) return;
    setState("busy");
    try {
      const { elementToSVG, inlineResources } = await import("dom-to-svg");
      const svg = elementToSVG(el);
      await inlineResources(svg.documentElement); // ponytail: incrusta imágenes/fondos; sin esto Figma pierde los assets
      const svgString = new XMLSerializer().serializeToString(svg);
      await navigator.clipboard.writeText(svgString);
      setState("done");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  const label = { idle: "Copiar SVG", busy: "Generando…", done: "¡Copiado! Pega en Figma", error: "Error — reintenta" }[state];
  return (
    <button
      type="button"
      onClick={copy}
      disabled={state === "busy"}
      style={{
        marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 12, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
        padding: "5px 12px", borderRadius: 8, border: "1px solid var(--ui-border)",
        background: state === "done" ? "#ecfdf5" : "#ffffff",
        color: state === "done" ? "#059669" : state === "error" ? "#dc2626" : "var(--ui-accent)",
      }}
    >
      <span aria-hidden="true">{state === "done" ? "✓" : "⧉"}</span> {label}
    </button>
  );
}

export interface BannerTemplate {
  id: string;
  name: string;
  description: string;
  node: ReactNode;
}

function TemplateSection({ t, index }: { t: BannerTemplate; index: number }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "var(--ui-muted)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ui-ink)", margin: 0 }}>{t.name}</h2>
        <CopySvgButton target={ref} />
      </div>
      <p style={{ fontSize: 13, color: "var(--ui-body)", margin: "0 0 16px 26px", lineHeight: 1.5 }}>{t.description}</p>
      <div
        ref={ref}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 32,
          borderRadius: 12,
          background: "var(--ui-subtle)",
          border: "1px solid var(--ui-border-soft)",
          overflowX: "auto",
        }}
      >
        {t.node}
      </div>
    </section>
  );
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
  /** Con selector: una versión a la vez, elegida en una barra de pestañas (queda en la URL como ?v=id). */
  selectable?: boolean;
  /** Controles extra debajo del selector de versiones (p. ej. el estilo de los precios). */
  toolbar?: ReactNode;
}

/** Barra de versiones: pestañas con el nombre corto (lo que va antes del «·» en el nombre de la plantilla). */
function VersionTabs({ templates, active, onPick }: { templates: BannerTemplate[]; active: string; onPick: (id: string) => void }): JSX.Element {
  return (
    <div role="tablist" aria-label="Versiones" style={{ display: "inline-flex", flexWrap: "wrap", gap: 4, padding: 4, marginBottom: 24, borderRadius: 12, background: "var(--ui-subtle)", border: "1px solid var(--ui-border-soft)" }}>
      {templates.map(function renderTab(t, i) {
        const on = t.id === active;
        return (
          <button key={t.id} type="button" role="tab" aria-selected={on} onClick={() => onPick(t.id)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", border: 0, borderRadius: 9, cursor: "pointer", fontFamily: "inherit",
              fontSize: 13, fontWeight: 700, color: on ? "var(--ui-accent)" : "var(--ui-body)", background: on ? "#ffffff" : "transparent",
              boxShadow: on ? "0 1px 3px rgba(15,23,42,0.12), 0 0 0 1px var(--ui-border-soft)" : "none", transition: "background 0.15s, color 0.15s" }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.7 }}>V{i + 1}</span>{t.name.split(" · ")[0]}
          </button>
        );
      })}
    </div>
  );
}

export default function BannerGallery({
  title,
  format,
  slot,
  description,
  templates,
  selectable,
  toolbar,
}: BannerGalleryProps): JSX.Element {
  const [active, setActive] = useState(templates[0]?.id ?? "");
  // La versión elegida vive en la URL (?v=…): recargar o compartir el enlace abre la misma.
  useEffect(function readVersion() {
    if (!selectable) return;
    const v = new URLSearchParams(location.search).get("v");
    if (v && templates.some((t) => t.id === v)) setActive(v);
  }, [selectable, templates]);
  function pick(id: string): void {
    setActive(id);
    const u = new URL(location.href); u.searchParams.set("v", id); history.replaceState(null, "", u);
  }
  const shown = selectable ? templates.filter((t) => t.id === active) : templates;
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
      {/* Breadcrumb */}
      <a
        href="/banners"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ui-body)", textDecoration: "none", marginBottom: 16 }}
      >
        <span aria-hidden="true">←</span> Banners
      </a>

      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ui-ink)", margin: 0 }}>{title}</h1>
        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "var(--ui-accent-soft)", color: "var(--ui-accent)", letterSpacing: "0.04em" }}>
          {format}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "var(--ui-border-soft)", color: "var(--ui-body)" }}>
          {slot}
        </span>
      </div>
      <p style={{ fontSize: 14, color: "var(--ui-body)", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>{description}</p>

      {selectable ? <VersionTabs templates={templates} active={active} onPick={pick} /> : null}
      {toolbar}

      {/* Plantillas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {shown.map(function renderTemplate(t) {
          return <TemplateSection key={t.id} t={t} index={templates.indexOf(t)} />;
        })}
      </div>
    </main>
  );
}
