"use client";

/**
 * Index — Bloque de Concorde (Voyager DS). Evolución del bloque Homepage: el nuevo inicio de VMC.
 * Origen: vmc-index-lab (apps/index-lab/app/qa/home-index-rebase), vista por defecto «Opción A», sin los controles de QA.
 *
 * Orden (escritorio):
 *   1. Banner principal (IndexHero: HeroCarousel) a la izquierda y VMC ahora (feed en vivo) a la derecha, a dos filas de alto.
 *   2. Tipo de oferta (OfferTypeCards) bajo el banner.
 *   3. Tienda Autoplan (StoreLots: FeaturedCard + LotGallery) · franja de publicidad (AdStrip) · tienda Mapfre.
 *   4. Explora por categoría (CategoryRail) · banner de campaña (CampaignBanner) · Vende tu vehículo (SellSection)
 *      · Empresas que publican en VMC (CompaniesMarquee: LogoMarquee).
 * En celular (< 1024 px de pantalla) todo va en una columna: banner, VMC ahora, tiendas, Tipo de oferta y el resto.
 * Contenido de ejemplo; sin inventario real.
 */
import type { JSX } from "react";
import OfferTypeCards from "@/src/components/OfferTypeCards";
import VmcAhora from "@/src/components/VmcAhora/VmcAhora";
import { OFFER_TYPES, STORES } from "../shared/data";
import AdStrip from "./AdStrip";
import CampaignBanner from "./CampaignBanner";
import CategoryRail from "./CategoryRail";
import CompaniesMarquee from "./CompaniesMarquee";
import IndexHero from "./IndexHero";
import SectionHead from "./SectionHead";
import SellSection from "./SellSection";
import StoreLots from "./StoreLots";
export { INDEX_WIDTH, INDEX_HEIGHT, INDEX_SHELL_WIDTH } from "./dimensions";

const GAP = 16;
const HERO_H = 300;

// La fuente (Plus Jakarta Sans de 500 a 800) la pone la página que monta el bloque.
const INDEX_CSS = String.raw`
.hib-home { font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
.hib-ot-mobile { display: none; width: 100%; }
@media (max-width: 1023px) {
  .hib-home { overflow-x: clip; padding: 14px !important; gap: 18px !important; }
  /* Celular: banner y justo después VMC ahora; Tipo de oferta baja, después de las tiendas. */
  .hib-top-grid { grid-template-columns: minmax(0, 1fr) !important; grid-template-rows: ${HERO_H}px 390px !important; gap: 14px !important; }
  .hib-top-grid > [data-slot="principal-banner"] { grid-column: 1 !important; grid-row: 1 !important; }
  .hib-top-grid > [data-slot="secondary-banner"] { grid-column: 1 !important; grid-row: 2 !important; height: 390px !important; }
  .hib-top-grid > [data-slot="offer-type"] { display: none; }
  .hib-ot-mobile { display: block; }
  /* «Ver más»: VMC ahora crece con su contenido (sin el alto fijo de 390 ni scroll interno). */
  .hib-top-grid[data-feedmore] { grid-template-rows: ${HERO_H}px auto !important; }
  .hib-top-grid[data-feedmore] > [data-slot="secondary-banner"] { height: auto !important; }
  .hib-section-head { align-items: flex-start !important; flex-wrap: wrap; gap: 10px !important; }
  .hib-section-head__title { white-space: normal !important; }
}
@media (max-width: 480px) { .hib-home { padding: 12px !important; } }
`;

function OfferType(): JSX.Element {
  return (
    <section aria-label="Tipo de oferta" style={{ boxSizing: "border-box", width: "100%" }}>
      <SectionHead title="Tipo de oferta" subtitle="Elige cómo quieres comprar" />
      <OfferTypeCards items={OFFER_TYPES} />
    </section>
  );
}

export interface IndexProps {
  /** Celular «Opción A»: VMC ahora como tarjeta con «Ver más» que crece con su contenido (sin scroll interno). */
  feedMore?: boolean;
  className?: string;
}

export default function Index({ feedMore = false, className = "" }: IndexProps): JSX.Element {
  return (
    <div data-block="index" className={`hib-home${className ? ` ${className}` : ""}`}
      style={{ width: "100%", padding: 16, boxSizing: "border-box", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", gap: GAP }}>
      <style href="concorde-index" precedence="default">{INDEX_CSS}</style>
      <div className="hib-top-grid" data-feedmore={feedMore || undefined}
        style={{ position: "relative", width: "100%", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 32%)", gridTemplateRows: `${HERO_H}px auto`, gap: GAP }}>
        <div data-slot="principal-banner" style={{ gridColumn: 1, gridRow: 1, minWidth: 0, display: "flex", height: "100%" }}><IndexHero /></div>
        <div data-slot="secondary-banner" style={{ gridColumn: 2, gridRow: "1 / 3", minWidth: 0, minHeight: 0, display: "flex", height: "100%", position: "relative" }}>
          {/* El feed no empuja la fila: se dibuja absoluto y toma el alto que dejan banner + Tipo de oferta. */}
          {feedMore
            ? <div style={{ display: "flex", width: "100%" }}><VmcAhora view="timeline" more /></div>
            : <div style={{ position: "absolute", inset: 0, display: "flex" }}><VmcAhora view="timeline" /></div>}
        </div>
        <div data-slot="offer-type" style={{ gridColumn: 1, gridRow: 2, minWidth: 0 }}><OfferType /></div>
      </div>
      <StoreLots store={STORES[0]} />
      <AdStrip />
      <StoreLots store={STORES[1]} />
      <div className="hib-ot-mobile"><OfferType /></div>
      <CategoryRail />
      <CampaignBanner />
      <SellSection />
      <CompaniesMarquee />
    </div>
  );
}
