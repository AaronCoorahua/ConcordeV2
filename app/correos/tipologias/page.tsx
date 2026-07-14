import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { TIPO_GROUPS } from "@/src/emails/tipologiasRegistry";

/**
 * /correos/tipologias — layouts base del banner header (A/B/C).
 * Cada card es una tipología (posición texto↔imagen); dentro está el banner
 * header copiable email-safe.
 */

const THUMB_H = 240;
const EMAIL_W = 600;
const SCALE = 0.5;

export default function TipologiasPage(): JSX.Element {
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
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Tipologías</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            {TIPO_GROUPS.length} layouts base
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 720 }}>
          Layouts base del banner header según la posición del logo respecto a la ilustración. Son el
          esqueleto sobre el que se arman los correos: cada tipología reordena los assets reales de marca
          (logo »vmc« Subastas + ícono «¡Con todo!») dentro del panel glass sobre el band morado.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {TIPO_GROUPS.map(function renderGroup(g) {
            const banner = g.plantillas[0];
            return (
              <a key={g.tipologia.id} href={`/correos/tipologias/${g.tipologia.id}`} className="cor-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: EMAIL_W * SCALE, height: THUMB_H - 32, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", background: "#FAFAFA" }}>
                    <iframe
                      title={g.tipologia.label}
                      srcDoc={banner.previewDoc}
                      scrolling="no"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: EMAIL_W,
                        height: (THUMB_H - 32) / SCALE,
                        border: "none",
                        transform: `scale(${SCALE})`,
                        transformOrigin: "top left",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "14px 18px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, fontFamily: "monospace", width: 20, height: 20, borderRadius: 6, background: "#f1edff", color: "#4f2ed8", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{g.tipologia.letra}</span>
                      <span className="cor-name" style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{g.tipologia.label}</span>
                    </div>
                    <span className="cor-arrow" aria-hidden="true" style={{ fontSize: 15, color: "#cbd5e1" }}>→</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>{g.tipologia.descripcion}</p>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .cor-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: #cbd5e1; transform: translateY(-2px); }
        .cor-card:hover .cor-name { color: #4f2ed8; }
        .cor-card:hover .cor-arrow { color: #4f2ed8; transform: translateX(3px); transition: color 0.2s ease, transform 0.2s ease; }
      `}} />
    </div>
  );
}
