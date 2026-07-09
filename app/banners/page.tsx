import type { JSX, ReactNode } from "react";
import Header from "@/app/_components/Header";
import AssetBanner, { ASSET_HEIGHT } from "@/src/blocks/banners/desktop/AssetBanner";
import LayoutBanner from "@/src/blocks/banners/desktop/LayoutBanner";
import EmpresaBanner, { EMPRESA_HEIGHT } from "@/src/blocks/banners/desktop/EmpresaBanner";
import EmpresaBannerAlt from "@/src/blocks/banners/desktop/EmpresaBannerAlt";
import { BANNER_WIDTH, BANNER_HEIGHT } from "@/src/blocks/banners/desktop/dimensions";

/**
 * /banners — Catálogo de banners 766×272. Cada card es una categoría; dentro,
 * el asset real de producción y variantes de layout sin personaje.
 */

interface BannerCategoryEntry {
  id: string;
  name: string;
  variantCount: number;
  width: number;
  height: number;
  node: ReactNode;
}

const GAP = 16;

const ENVIVO_PREVIEW = (
  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: BANNER_WIDTH }}>
    <LayoutBanner tone="naranja" layout="hero" pillText="EN VIVO" pillIcon count={23} title="Subastas de autos en vivo" timer="Hoy · 6:01 PM" />
    <LayoutBanner tone="naranja" layout="panel" pillText="EN VIVO" pillIcon count={38} title="Subastas de autos en vivo" timer="Hoy · 6:01 PM" />
  </div>
);

const NEGOCIABLE_PREVIEW = (
  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: BANNER_WIDTH }}>
    <LayoutBanner tone="teal" layout="hero" pillText="NEGOCIABLE" pillIcon count={11} title="Subasta negociable de autos, maquinaria y más" timer="Cierra hoy · 6:01 PM" />
    <LayoutBanner tone="teal" layout="panel" pillText="NEGOCIABLE" pillIcon count={13} title="Negocia tu precio" timer="Propuestas hasta 6:01 PM" />
  </div>
);

const CATEGORIA_PREVIEW = (
  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: BANNER_WIDTH }}>
    <LayoutBanner tone="naranja" layout="hero" pillText="EN VIVO" pillIcon count={13} title="Vehículos livianos en subasta" timer="Hoy · 6:01 PM" chip={{ label: "Vehicular / Liviano", icon: "car" }} />
    <LayoutBanner tone="naranja" layout="big-number" pillText="EN VIVO" pillIcon count={17} title="Vehicular · Seminuevo" subtitle="Puja en tiempo real" chip={{ label: "Vehicular / Seminuevo", icon: "car" }} />
  </div>
);

const EMPRESAS_PREVIEW = (
  <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: BANNER_WIDTH }}>
    <EmpresaBannerAlt nombre="Maquisistema" logoText="Maquisistema" rating="3.8" ratingLabel="Buen Vendedor" opiniones="44 opiniones" descripcion="Una de las principales administradoras de Fondos Colectivos del país." ventas="365" participantes="3,245" layout="panel" />
    <EmpresaBannerAlt nombre="Maquisistema" logoText="Maquisistema" rating="3.8" ratingLabel="Buen Vendedor" opiniones="44 opiniones" descripcion="Una de las principales administradoras de Fondos Colectivos del país." ventas="365" participantes="3,245" layout="logo-left" />
  </div>
);

// Los previews apilan dos banners del mismo alto (192) con GAP en medio.
const ASSET_PLUS_LAYOUT = ASSET_HEIGHT + GAP + BANNER_HEIGHT;
const EMPRESA_PREVIEW_H = EMPRESA_HEIGHT + GAP + BANNER_HEIGHT;

const CATEGORIES: BannerCategoryEntry[] = [
  { id: "en-vivo",    name: "En Vivo",    variantCount: 6, width: BANNER_WIDTH, height: ASSET_PLUS_LAYOUT,  node: ENVIVO_PREVIEW },
  { id: "negociable", name: "Negociable", variantCount: 6, width: BANNER_WIDTH, height: ASSET_PLUS_LAYOUT,  node: NEGOCIABLE_PREVIEW },
  { id: "categoria",  name: "Categoría",  variantCount: 4, width: BANNER_WIDTH, height: ASSET_PLUS_LAYOUT,  node: CATEGORIA_PREVIEW },
  { id: "empresas",   name: "Empresas",   variantCount: 4, width: BANNER_WIDTH, height: EMPRESA_PREVIEW_H,  node: EMPRESAS_PREVIEW },
];

const THUMB_H = 260;

export default function BannersPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="banners" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Banners</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{CATEGORIES.length} categorías · {BANNER_WIDTH} × {BANNER_HEIGHT}</span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 680 }}>
          Banners de navegación {BANNER_WIDTH}×{BANNER_HEIGHT}: En Vivo, Negociable, Categoría y Empresas. Variantes
          modernas con los estilos e iconos del design system (gradientes OfferType, gema SubasCoin,
          chips CategoryCard) + el asset de producción como referencia legacy. Estáticos, sin efectos.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {CATEGORIES.map(function renderCategory(c) {
            const scale = Math.min((THUMB_H - 32) / c.height, 260 / c.width);
            return (
              <a key={c.id} href={`/banners/${c.id}`} className="bnr-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: c.width * scale, height: c.height * scale, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: c.width, height: c.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                      {c.node}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span className="bnr-name" style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{BANNER_WIDTH} × {BANNER_HEIGHT} · {c.variantCount} variantes</span>
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
