/**
 * RecommendedList — Recomendados del riel de Mi Garaje (/blocks/mi-garaje/m/vmc: bajo la publicidad; en móvil, después de
 * Tu actividad). Tarjeta blanca con el encabezado de las secciones de Tu actividad (ícono de vidrio «auto», título y
 * cuántos hay; todo el encabezado es un enlace) y una fila por vehículo: foto, EN VIVO o NEGOCIABLE, nombre y año, precio
 * base (solo en vivo) y LikeButton para guardarlo.
 * Depende de React, Vidrio, BadgeStatus, PriceIcon, LikeButton y los estilos del encabezado de ActivitySection.
 */
import type { JSX } from "react";
import { Vidrio } from "@/src/components/Vidrio";
import BadgeStatus from "@/src/components/BadgeStatus";
import PriceIcon from "@/src/components/PriceIcon";
import LikeButton from "@/src/components/LikeButton";
import { ACTIVITY_SECTION_CSS } from "@/src/components/ActivitySection";

export const RECOMMENDED_LIST_CSS = String.raw`
.f-recs { display:grid; gap:4px; padding:16px 8px 8px; border-radius:16px; background:#fff; box-shadow:0 1px 3px rgba(34,0,92,.05), 0 10px 30px rgba(34,0,92,.06); }
.f-recs__head { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:0 8px 4px; }
.f-recs__list { list-style:none; margin:0; padding:0; display:grid; }
.f-recs__list li + li { border-top:1px solid #F0EEF4; }
.f-recs__row { display:grid; grid-template-columns:64px minmax(0,1fr) 24px; align-items:start; gap:10px; padding:10px 8px; border-radius:10px; color:inherit; }
.f-recs__row:hover { background:#F8F6FC; }
.f-recs__row:focus-visible { outline:2px solid #8460E5; outline-offset:-2px; }
.f-recs__row img { width:64px; height:52px; border-radius:8px; object-fit:cover; }
.f-recs__txt { min-width:0; display:grid; grid-template-rows:16px 18px 18px; gap:1px; line-height:1.2; }
.f-recs__txt--no-price { grid-template-rows:16px 18px; }
.f-recs__state { flex:none; display:flex; align-items:center; }
.f-recs__state .badgestatus { transform:scale(.74); transform-origin:left center; }
.f-recs__txt b { font-size:.75rem; font-weight:700; color:#3B1782; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.f-recs__price { display:flex; align-items:center; gap:4px; min-width:0; }
.f-recs__price .priceicon { flex:none; width:16px; height:16px; }
.f-recs__price .priceicon svg { width:16px; height:16px; }
.f-recs__txt strong { flex:none; font-size:.8125rem; font-weight:700; color:#5A35C2; }
.f-recs__txt small { font-size:.625rem; color:#6B6878; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-variant-numeric:tabular-nums; }
.f-recs__row > .plike { align-self:start; margin-top:1px; }
.f-recs__txt b { font-weight:700; }
.f-recs__neg { display:inline-flex; align-items:center; height:20px; padding:0 8px; border-radius:6px; font-size:.625rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#fff;
  background:linear-gradient(90deg, #30E8EC 0%, #00CACE 50%, #008688 100%); text-shadow:0 1px 2px rgba(0,0,0,.18); }
@media (prefers-reduced-motion:reduce) { .f-recs__row { transition:none; } }
.f-recs { border-radius:8px; }
.f-recs__head { justify-content:flex-start; gap:12px; margin:0; padding:0 8px 4px; }
.f-recs__head .fs__name { font-size:.875rem; font-weight:700; color:#3B1782; }
.f-recs__neg { height:auto; padding:3px 8px; border-radius:9999px; font-size:9px; letter-spacing:.07em; text-shadow:none;
  background-image:linear-gradient(135deg, #30E8EC 0%, #00CACE 45%, #008688 100%); box-shadow:rgba(0,134,136,.4) 0 2px 10px, rgba(255,255,255,.14) 0 1px 0 inset; }
.f-recs { padding-bottom:8px; }
.f-recs__h { margin:0; }
.f-recs__head { display:flex; align-items:center; color:inherit; text-decoration:none; border-radius:10px; padding:4px 8px 8px; }
.f-recs__head:hover { background:#F8F6FC; }
.f-recs__head:focus-visible { outline:2px solid #8460E5; outline-offset:-2px; }
@media (max-width:1023px) { .f-recs__txt b { font-size:.9375rem; } }
@media (max-width:1023px) { .f-recs__txt small { font-size:.875rem; } }
.f-recs__head { gap:12px; }
.f-recs__head .fs__name { font-size:1rem; font-weight:700; }
`;

/** Un vehículo recomendado. */
export interface RecommendedItem {
  /** Marca y modelo. */
  name: string;
  /** Año. */
  year: number;
  /** URL de la foto. */
  imageSrc: string;
  /** «live»: EN VIVO con su precio base; «negotiable»: NEGOCIABLE, sin precio. */
  badge: "live" | "negotiable";
  /** Precio base ya escrito (p. ej. «US$ 11,500»); se muestra solo en vivo. */
  price?: string;
}

export interface RecommendedListProps {
  /** Vehículos recomendados. */
  items: RecommendedItem[];
  /** Destino del encabezado («ver todos»). */
  href: string;
}

export function RecommendedList({ items, href }: RecommendedListProps): JSX.Element {
  return <>
    <style href="concorde-activity-section" precedence="default">{ACTIVITY_SECTION_CSS}</style>
    <style href="concorde-recommended-list" precedence="default">{RECOMMENDED_LIST_CSS}</style>
    <section className="f-recs" aria-label="Recomendados">
      <h2 className="f-recs__h"><a href={href} className="f-recs__head" aria-label={`Recomendados: ver las ${items.length}`}><span className="fs__icon fs__icon--glass" aria-hidden><Vidrio s="auto" size={36} /></span><span className="fs__name">Recomendados</span><span className="fs__badge">{items.length}</span></a></h2>
      <ul className="f-recs__list">{items.map((o) => <li key={o.name}><div className="f-recs__row">
        <img src={o.imageSrc} alt="" width={64} height={48} />
        <span className={`f-recs__txt${o.badge === "negotiable" ? " f-recs__txt--no-price" : ""}`}><span className="f-recs__state">{o.badge === "live" ? <BadgeStatus variant="live" /> : <span className="badgestatus f-recs__neg">NEGOCIABLE</span>}</span><b>{o.name} {o.year}</b>{o.badge === "live" && o.price ? <span className="f-recs__price"><PriceIcon size="sm" title="Precio base" /><strong>{o.price}</strong></span> : null}</span>
        <LikeButton size="sm" aria-label={`Guardar ${o.name}`} />
      </div></li>)}</ul>
    </section>
  </>;
}

export default RecommendedList;
