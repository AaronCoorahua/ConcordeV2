/**
 * StoreLots — lotes de una tienda en el Index (vmc-index-lab, LotsSection, vista «Listado gallery» · «Holo curva»).
 * Evolución de AuctioneerSection del Homepage: misma caja (radio 16, sombra del homepage) y el mismo ProfileButton
 * en la cabecera, pero con el logo de la tienda y, en vez de 4 OfferCard, una LotGallery: FeaturedCard a la izquierda
 * y 6 lotes en fila a la derecha, en vivo y Recibe ofertas mezclados.
 */
import type { JSX } from "react";
import { CardIcons, FeaturedCard } from "@/src/components/FeaturedCard";
import { LotGallery } from "@/src/components/LotGallery";
import ProfileButton from "@/src/components/ProfileButton";
import type { Store } from "../shared/data";

const SHADOW = "rgba(0,0,0,0.07) 0px 0px 16px 4px";
const FONT = "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)";

// «Ver todo el lote»: en celular la etiqueta se parte en dos líneas y la cabecera conserva una fila.
const STORE_CSS = String.raw`
.hib-lots-cta .pprofilebtn__label > span + span::before { content: " "; }
@media (max-width: 1023px) {
  .hib-lots-head { padding: 0 16px !important; gap: 10px !important; }
  .hib-lots-cta { gap: 6px; }
  .hib-lots-cta .pprofilebtn__label { display: inline-flex; flex-direction: column; align-items: flex-end; line-height: 15px; white-space: nowrap; }
  .hib-lots-cta .pprofilebtn__label > span { display: block; white-space: nowrap; }
  .hib-lots-cta .pprofilebtn__label > span + span::before { content: none; }
}
`;

export default function StoreLots({ store }: { store: Store }): JSX.Element {
  const f = store.featured;
  return (
    <section aria-label={`Lotes de ${store.name}`} style={{ boxSizing: "border-box", width: "100%", background: "#ffffff", borderRadius: 16,
      boxShadow: SHADOW, padding: "0 0 16px", display: "flex", flexDirection: "column", gap: 16, fontFamily: FONT }}>
      <style href="concorde-index-store" precedence="default">{STORE_CSS}</style>
      <header className="hib-lots-head" style={{ boxSizing: "border-box", flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 68, padding: "0 24px", borderBottom: "1px solid #e8ddff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <span style={{ flex: "none", display: "grid", placeItems: "center", width: 56, height: 44, padding: "6px 8px", boxSizing: "border-box", borderRadius: 8, border: "1px solid #e8ddff", background: "#fff" }}>
            <img src={store.logo} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
          </span>
          <div style={{ display: "grid", gap: 2, minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 16, lineHeight: "20px", fontWeight: 700, letterSpacing: "-0.01em", color: "#3b1782", whiteSpace: "nowrap" }}>{store.name}</h3>
            <p style={{ margin: 0, fontSize: 12, lineHeight: "16.8px", color: "#6B6878" }}>{store.total} oportunidades</p>
          </div>
        </div>
        <div style={{ flex: "none" }}><ProfileButton className="hib-lots-cta"><span>Ver todo</span><span>el lote</span></ProfileButton></div>
      </header>
      <div style={{ padding: "0 16px" }}>
        <LotGallery
          featured={
            <FeaturedCard image={f.image} title={f.title} subtitle={f.subtitle} featured live={f.live} photos={f.photos} price={f.price}
              chips={[{ icon: CardIcons.gear, label: f.transmission }, { icon: CardIcons.fuel, label: f.fuel }]}
              stats={[{ icon: CardIcons.gauge, label: f.km }, { icon: CardIcons.seats, label: `${f.seats} asientos` }]}
              height="100%" fillMedia />
          }
          items={store.lots}
          height={356} // alto de la lista del Index: 3 filas de 84 + separaciones (el componente reserva 386 por defecto)
        />
      </div>
    </section>
  );
}
