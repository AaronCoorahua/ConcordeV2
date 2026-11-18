"use client";

/** LotGallery: carta destacada a la izquierda y los lotes a la derecha, llenando columna por columna (3 filas por columna).
 *  Con pocos lotes el espacio queda reservado y no se ensancha. Bajo 700 px todo va en una columna.
 *  Usa FeaturedCard (pills, moneda y favorito).
 *  Solo depende de React y FeaturedCard (sus pills y su favorito usan los estilos de FeaturedCard).
 *  Viene de vmc-index-lab (app/components/lib): galería de cada tienda del Index. */
import { useState } from "react";
import type { CSSProperties, JSX, ReactNode } from "react";
import { FEATURED_CARD_CSS, LikeButton, PillIcons, SubasCoin } from "@/src/components/FeaturedCard";

/** Estilos del componente (antes en lot-gallery.css). Se inyectan una sola vez por página. */
export const LOT_GALLERY_CSS = String.raw`
/* LotGallery (usa también featured-card.css y light-bar.css) */
.vlg { container-type: inline-size; font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
.vlg *, .vlg *::before, .vlg *::after { box-sizing: border-box; }
.vlg__grid { display: grid; grid-template-columns: var(--vlg-feat, 292px) minmax(0, 1fr); gap: 20px; align-items: stretch; }
.vlg__feat { display: flex; min-width: 0; min-height: var(--vlg-h, 386px); }
.vlg__feat > * { flex: 1; }
/* Las filas llenan por columnas: primero la columna junto a la destacada, de arriba abajo, y luego la siguiente.
   Las columnas y filas son fijas: con pocos lotes el espacio sobrante queda vacío y nada se ensancha. */
.vlg__list { display: grid; grid-auto-flow: column; grid-template-columns: repeat(var(--vlg-cols, 2), minmax(0, 1fr)); grid-template-rows: repeat(3, 1fr);
  grid-auto-columns: minmax(0, 1fr); column-gap: 20px; }
.vlg__list > .vlg-row:nth-child(3n + 1) { padding-top: 0; }
.vlg__list > .vlg-row:nth-child(3n), .vlg__list > .vlg-row:last-child { border-bottom: 0; padding-bottom: 0; }

/* Fila de lote */
.vlg-row { position: relative; display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 12px; align-items: start; padding: 10px 0; border-bottom: 1px solid #EFEDF5;
  color: #14112B; cursor: pointer; }
.vlg-row__thumb { display: block; width: 84px; height: 84px; overflow: hidden; border-radius: 12px; background: #F3EFFD; }
.vlg-row__thumb img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.vlg-row:hover .vlg-row__thumb img { transform: scale(1.05); }
.vlg-row__like { position: absolute; top: 14px; left: calc(84px - 30px); z-index: 2; display: grid; place-items: center; }
.vlg-row__main { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; min-width: 0; }
.vlg-row__pill { justify-self: start; display: inline-flex; }
.vlg-row__title { margin: 3px 0 0; overflow: hidden; font-size: 13px; line-height: 1.2; font-weight: 800; color: #14112B; text-overflow: ellipsis; white-space: nowrap; }
.vlg-row__price { display: inline-flex; align-items: center; gap: 6px; margin-top: 2px; font-size: 14px; line-height: 1.15; font-weight: 800; letter-spacing: -0.01em; color: #4C1EBC; }
.vlg-row__price svg { width: 16px; height: 17px; }
.vlg-row__offer { margin-top: 2px; font-size: 13px; line-height: 1.15; font-weight: 800; color: #00777A; }
.vlg-row__rest, .vlg-row__foot { overflow: hidden; font-size: 11px; font-weight: 600; color: #8A879C; text-overflow: ellipsis; white-space: nowrap; }

/* Menos de 700 px: carta arriba y filas debajo, en una columna */
@container (max-width: 700px) {
  .vlg__grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .vlg__feat { min-height: 416px; }
  .vlg__list { grid-auto-flow: row; grid-template-columns: minmax(0, 1fr); grid-template-rows: none; column-gap: 0; }
  .vlg__list > .vlg-row:nth-child(3n + 1) { padding-top: 10px; }
  .vlg__list > .vlg-row:first-child { padding-top: 0; }
  .vlg__list > .vlg-row:nth-child(3n) { border-bottom: 1px solid #EFEDF5; padding-bottom: 10px; }
  .vlg__list > .vlg-row:last-child { border-bottom: 0; padding-bottom: 0; }
}
/* Menos de 480 px: fotos de 76 px y los textos bajan de línea */
@container (max-width: 480px) {
  .vlg-row { grid-template-columns: 76px minmax(0, 1fr); gap: 10px; }
  .vlg-row__thumb { width: 76px; height: 76px; }
  .vlg-row__like { top: 6px; left: calc(76px - 32px); }
  .vlg-row__title, .vlg-row__rest { overflow: visible; text-overflow: clip; white-space: normal; }
}
`;

export type LotRowItem = {
  image: string;
  title: string;
  /** live = subasta (precio); negotiable = Recibe ofertas ("Haz tu oferta"). */
  tone: "live" | "negotiable";
  price?: string;
  offerText?: string;
  /** Línea de datos, p. ej. "38,200 km · Mecánica · Gasolina". */
  details?: string;
  location?: string;
  onClick?: () => void;
};

/** Fila de lote: foto de 84 px con favorito, pill de estado, nombre, precio y datos. */
export function LotRow({ item }: { item: LotRowItem }): JSX.Element {
  const [liked, setLiked] = useState(false);
  const live = item.tone === "live";
  const foot = item.location;
  return (
    <article className={`vlg-row vlg-row--${item.tone}`} aria-label={item.title} onClick={item.onClick}>
      <span className="vlg-row__thumb"><img src={item.image} alt="" /></span>
      <span className="vlg-row__like"><LikeButton name={item.title} on={liked} onToggle={() => setLiked((v) => !v)} size={26} /></span>
      <div className="vlg-row__main">
        <span className="vlg-row__pill">{live
          ? <span className="vfc-pill vfc-pill--live">{PillIcons.live}En vivo</span>
          : <span className="vfc-pill vfc-pill--negotiable">{PillIcons.tag}Recibe ofertas</span>}</span>
        <p className="vlg-row__title">{item.title}</p>
        {live ? <b className="vlg-row__price"><SubasCoin size={17} />{item.price ?? "Por definir"}</b> : <b className="vlg-row__offer">{item.offerText ?? "Haz tu oferta"}</b>}
        {item.details ? <span className="vlg-row__rest">{item.details}</span> : null}
        {foot ? <span className="vlg-row__foot">{foot}</span> : null}
      </div>
    </article>
  );
}

export type LotGalleryProps = {
  /** La carta grande de la izquierda (normalmente <FeaturedCard height="100%" fillMedia … />). */
  featured: ReactNode;
  items: LotRowItem[];
  /** Ancho de la carta destacada en px. */
  featuredWidth?: number;
  /** Alto mínimo de la galería en px (lo que mide la destacada). */
  height?: number;
  /** Columnas de filas a la derecha (se reservan aunque estén vacías). */
  columns?: number;
  className?: string;
};

export function LotGallery({ featured, items, featuredWidth = 292, height = 386, columns = 2, className = "" }: LotGalleryProps): JSX.Element {
  return (
    <div className={`vlg${className ? ` ${className}` : ""}`}
      style={{ "--vlg-feat": `${featuredWidth}px`, "--vlg-h": `${height}px`, "--vlg-cols": columns } as CSSProperties}>
      <style href="concorde-featured-card" precedence="default">{FEATURED_CARD_CSS}</style>
      <style href="concorde-lot-gallery" precedence="default">{LOT_GALLERY_CSS}</style>
      <div className="vlg__grid">
        <div className="vlg__feat">{featured}</div>
        <div className="vlg__list">{items.map((it) => <LotRow key={it.title} item={it} />)}</div>
      </div>
    </div>
  );
}

export default LotGallery;
