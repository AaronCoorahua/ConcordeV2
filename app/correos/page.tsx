import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { EMAIL_GROUPS, EMAIL_PROD_TOTAL } from "@/src/emails/registry";
import { TIPO_GROUPS } from "@/src/emails/tipologiasRegistry";

/**
 * /correos — hub de correos. Dos secciones:
 *   · Tipologías — layouts base de banner (propuestas de diseño).
 *   · Variantes  — los correos REALES en producción, agrupados por categoría.
 * Cada card enlaza a su galería (/correos/tipologias · /correos/variantes).
 */

const THUMB_H = 300;
const EMAIL_W = 600;
const SCALE = 0.5;

interface HubCard {
  href: string;
  title: string;
  meta: string;
  desc: string;
  previewDoc: string;
}

const CARDS: HubCard[] = [
  {
    href: "/correos/tipologias",
    title: "Tipologías",
    meta: `${TIPO_GROUPS.length} layouts base`,
    desc: "Layouts base del banner header según la posición marca↔copy, en el estilo Voyager v2. Cada uno se puede ver sobre los 5 fondos de gradiente.",
    previewDoc: TIPO_GROUPS[0].plantillas[0].fondos[0].previewDoc,
  },
  {
    href: "/correos/variantes",
    title: "Variantes",
    meta: `${EMAIL_GROUPS.length} categorías · ${EMAIL_PROD_TOTAL} en prod`,
    desc: "Los correos que hoy se envían en producción, agrupados por categoría (En vivo, Negociable, SubasCoins, Registro…) y ordenados por el paso del flujo.",
    previewDoc: EMAIL_GROUPS[0].correos[0].html,
  },
  {
    href: "/correos/editor",
    title: "Editor",
    meta: "23 bloques · maqueta y copia HTML",
    desc: "Editor visual estilo Elementor sobre el renderer real: arma un correo con los bloques de producción, edita textos e imágenes, y expórtalo email-safe.",
    previewDoc: EMAIL_GROUPS[1]?.correos[0]?.html ?? EMAIL_GROUPS[0].correos[0].html,
  },
];

export default function CorreosPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Correos</h1>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 720 }}>
          Sistema de mailing de VMC Subastas. Empieza por las <strong style={{ color: "#0f172a", fontWeight: 700 }}>tipologías</strong>{" "}
          (layouts base del banner) y revisa las <strong style={{ color: "#0f172a", fontWeight: 700 }}>variantes</strong>{" "}
          que hoy están en producción.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {CARDS.map(function renderCard(c) {
            return (
              <a key={c.href} href={c.href} className="cor-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 14, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: EMAIL_W * SCALE, height: THUMB_H - 40, position: "relative", overflow: "hidden", borderRadius: 6, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0", background: "#FAFAFA" }}>
                    <iframe
                      title={c.title}
                      srcDoc={c.previewDoc}
                      scrolling="no"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: EMAIL_W,
                        height: (THUMB_H - 40) / SCALE,
                        border: "none",
                        transform: `scale(${SCALE})`,
                        transformOrigin: "top left",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "18px 20px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="cor-name" style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>{c.title}</span>
                    <span className="cor-arrow" aria-hidden="true" style={{ fontSize: 16, color: "#cbd5e1" }}>→</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, fontFamily: "monospace" }}>{c.meta}</span>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: "4px 0 0" }}>{c.desc}</p>
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
