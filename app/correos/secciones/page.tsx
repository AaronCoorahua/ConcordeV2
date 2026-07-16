import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { SECTION_TYPES, SECTION_DESCRIPTIONS, sectionPreviewDoc } from "@/src/emails/sectionPreviews";
import { SECTION_LABELS } from "@/src/emails/prodEmailTemplates";

/**
 * /correos/secciones — catálogo visual de los 23 bloques del renderer de
 * producción: cada card muestra el bloque RENDERIZADO (no un nombre en una
 * lista), con su descripción. Son los mismos bloques que usa el editor.
 */

const THUMB_H = 170;
const EMAIL_W = 600;
const SCALE = 0.55;

export default function SeccionesPage(): JSX.Element {
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

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Secciones</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            {SECTION_TYPES.length} bloques de producción
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 720 }}>
          Los bloques con los que se arman los correos, renderizados con el renderer real. Son los
          mismos que usa el <a href="/correos/editor" style={{ color: "#4f2ed8", fontWeight: 700, textDecoration: "none" }}>Editor</a> —
          ahí los arrastras al lienzo y editas sus textos e imágenes.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {SECTION_TYPES.map(function renderCard(type) {
            return (
              <a key={type} href={`/correos/editor?bloque=${type}`} className="cor-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9", overflow: "hidden" }}>
                  <div style={{ width: EMAIL_W * SCALE, height: THUMB_H - 20, position: "relative", overflow: "hidden", borderRadius: 4 }}>
                    <iframe
                      title={SECTION_LABELS[type]}
                      srcDoc={sectionPreviewDoc(type)}
                      scrolling="no"
                      loading="lazy"
                      tabIndex={-1}
                      style={{ position: "absolute", top: 0, left: 0, width: EMAIL_W, height: (THUMB_H - 20) / SCALE, border: "none", transform: `scale(${SCALE})`, transformOrigin: "top left", pointerEvents: "none", background: "#FAFAFA" }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "12px 16px 14px" }}>
                  <span className="cor-name" style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{SECTION_LABELS[type]}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{SECTION_DESCRIPTIONS[type]}</span>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .cor-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: #cbd5e1; transform: translateY(-2px); }
        .cor-card:hover .cor-name { color: #4f2ed8; }
      `}} />
    </div>
  );
}
