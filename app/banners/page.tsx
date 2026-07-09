import type { JSX, ReactNode } from "react";
import Header from "@/app/_components/Header";
import BannerPrincipal from "@/src/blocks/banners/desktop/BannerPrincipal";
import BannerSecundario from "@/src/blocks/banners/desktop/BannerSecundario";
import BannerSidebar from "@/src/blocks/banners/desktop/BannerSidebar";
import {
  BANNER_PRINCIPAL_WIDTH,
  BANNER_PRINCIPAL_HEIGHT,
  BANNER_SECUNDARIO_WIDTH,
  BANNER_SECUNDARIO_HEIGHT,
  BANNER_SIDEBAR_WIDTH,
  BANNER_SIDEBAR_HEIGHT,
} from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners — Catálogo de plantillas de banners de navegación
 * (tema claro, mismo estilo que /components y /blocks).
 * Cada card es un formato de banner; dentro, sus plantillas.
 */

interface BannerFormatEntry {
  id: string;
  name: string;
  format: string;
  templateCount: number;
  width: number;
  height: number;
  node: ReactNode;
}

const GAP = 16;

// Previews compuestos — muestran varias plantillas del formato apiladas
const PRINCIPAL_PREVIEW_H = BANNER_PRINCIPAL_HEIGHT * 2 + GAP;
const PRINCIPAL_PREVIEW = (
  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: BANNER_PRINCIPAL_WIDTH }}>
    <BannerPrincipal variant="negociable" />
    <BannerPrincipal variant="categorias" />
  </div>
);

const SECUNDARIO_PREVIEW_H = BANNER_SECUNDARIO_HEIGHT * 5 + GAP * 4;
const SECUNDARIO_PREVIEW = (
  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: BANNER_SECUNDARIO_WIDTH }}>
    <BannerSecundario variant="negociable" />
    <BannerSecundario variant="en-vivo" />
    <BannerSecundario variant="categoria" />
    <BannerSecundario variant="empresas" />
    <BannerSecundario variant="subaspass" />
  </div>
);

const SIDEBAR_PREVIEW_W = BANNER_SIDEBAR_WIDTH * 3 + GAP * 2;
const SIDEBAR_PREVIEW = (
  <div style={{ display: "flex", gap: GAP, width: SIDEBAR_PREVIEW_W }}>
    <BannerSidebar variant="subaspass" />
    <BannerSidebar variant="vende-tu-auto" />
    <BannerSidebar variant="centro-ayuda" />
  </div>
);

const FORMATS: BannerFormatEntry[] = [
  {
    id: "principal",
    name: "Banner Principal",
    format: `${BANNER_PRINCIPAL_WIDTH} × ${BANNER_PRINCIPAL_HEIGHT}`,
    templateCount: 4,
    width: BANNER_PRINCIPAL_WIDTH,
    height: PRINCIPAL_PREVIEW_H,
    node: PRINCIPAL_PREVIEW,
  },
  {
    id: "secundario",
    name: "Banner Secundario",
    format: `${BANNER_SECUNDARIO_WIDTH} × ${BANNER_SECUNDARIO_HEIGHT}`,
    templateCount: 5,
    width: BANNER_SECUNDARIO_WIDTH,
    height: SECUNDARIO_PREVIEW_H,
    node: SECUNDARIO_PREVIEW,
  },
  {
    id: "sidebar",
    name: "Banner Sidebar",
    format: `${BANNER_SIDEBAR_WIDTH} × ${BANNER_SIDEBAR_HEIGHT}`,
    templateCount: 3,
    width: SIDEBAR_PREVIEW_W,
    height: BANNER_SIDEBAR_HEIGHT,
    node: SIDEBAR_PREVIEW,
  },
];

const THUMB_H = 260;

export default function BannersPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Banners</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{FORMATS.length} formatos</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 640 }}>
          Plantillas de banners de navegación — categorías, tipo de oferta, empresas y promos.
          Cada formato usa las medidas reales de su slot en los bloques.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {FORMATS.map(function renderFormat(f) {
            const scale = Math.min((THUMB_H - 32) / f.height, 260 / f.width);
            return (
              <a key={f.id} href={`/banners/${f.id}`} className="bnr-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: f.width * scale, height: f.height * scale, position: "relative", overflow: "hidden", borderRadius: 4 }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: f.width, height: f.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                      {f.node}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span className="bnr-name" style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{f.name}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                      {f.format} · {f.templateCount} plantillas
                    </span>
                  </div>
                  <span className="bnr-arrow" aria-hidden="true" style={{ fontSize: 15, color: "#cbd5e1" }}>→</span>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .bnr-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: #cbd5e1; transform: translateY(-2px); }
        .bnr-card:hover .bnr-name { color: #4f2ed8; }
        .bnr-card:hover .bnr-arrow { color: #4f2ed8; transform: translateX(3px); transition: color 0.2s ease, transform 0.2s ease; }
      `}} />
    </div>
  );
}
