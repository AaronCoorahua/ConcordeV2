import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { EMAIL_GROUPS } from "@/src/emails/registry";
import { EMAIL_PROD_TOTAL } from "@/src/emails/tipologias";

/**
 * /correos — Catálogo de correos por tipología (mismo estilo que /banners).
 * Cada card es una tipología con el preview de su correo demo; dentro,
 * las plantillas HTML estáticas (banner header, correo demo y reales).
 */

const THUMB_H = 260;
const EMAIL_W = 600;
const SCALE = 0.5;

export default function CorreosPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Correos</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            {EMAIL_GROUPS.length} tipologías · {EMAIL_PROD_TOTAL} correos en producción
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 720 }}>
          Tipologías de mailing con sus plantillas HTML estáticas email-safe (tablas + estilos
          inline, formato 600px). Cada card es una tipología; dentro están el banner header
          copiable y los correos completos.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {EMAIL_GROUPS.map(function renderGroup(g) {
            const demo = g.plantillas.find(function isDemo(p) { return p.id === `${g.tipologia.id}-demo`; }) ?? g.plantillas[0];
            return (
              <a key={g.tipologia.id} href={`/correos/${g.tipologia.id}`} className="cor-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: EMAIL_W * SCALE, height: THUMB_H - 32, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", background: "#FAFAFA" }}>
                    <iframe
                      title={g.tipologia.label}
                      srcDoc={demo.previewDoc}
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span className="cor-name" style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{g.tipologia.label}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                      {g.plantillas.length} plantillas · {g.tipologia.prodCount} en prod
                    </span>
                  </div>
                  <span className="cor-arrow" aria-hidden="true" style={{ fontSize: 15, color: "#cbd5e1" }}>→</span>
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
