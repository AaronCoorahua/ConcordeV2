"use client";

/** FeaturedCard: carta destacada que se inclina hacia el mouse, con brillo holográfico y LightBar abajo.
 *  Solo depende de React y LightBar. Viene de vmc-index-lab (app/components/lib), carta destacada de las tiendas del Index. */
import { useId, useState } from "react";
import type { CSSProperties, JSX, PointerEvent, ReactNode } from "react";
import { LightBar } from "@/src/components/LightBar";

/** Estilos del componente (antes en featured-card.css). Se inyectan una sola vez por página. */
export const FEATURED_CARD_CSS = String.raw`
/* FeaturedCard (usa también light-bar.css) */
@keyframes vfc-holo-idle { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
@keyframes vfc-like-pop { 0% { transform: scale(1); } 35% { transform: scale(1.4); } 65% { transform: scale(0.85); } 85% { transform: scale(1.1); } 100% { transform: scale(1); } }

/* Caja: se inclina hacia el mouse (--rx, --ry) */
.vfc { position: relative; box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; border-radius: 8px; border: 1px solid #E9E3FF; background: #fff;
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); color: #191C1C; cursor: pointer;
  box-shadow: rgba(0,0,0,0.07) 0 0 16px 4px;
  transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.2s ease, box-shadow 0.2s; }
.vfc *, .vfc *::before, .vfc *::after { box-sizing: border-box; }
.vfc:hover { transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-3px); box-shadow: oklch(0.22 0.18 285 / 0.12) 0 12px 20px; }

/* Brillo holográfico y reflejo que siguen al mouse (--mx, --my) */
.vfc-holo { position: absolute; inset: 0; z-index: 3; pointer-events: none; background-size: 260% 260%;
  background-image: linear-gradient(115deg, transparent 28%, rgba(132,96,229,0.07) 38%, rgba(0,218,224,0.06) 46%, rgba(255,150,57,0.06) 54%, rgba(132,96,229,0.05) 62%, transparent 72%);
  animation: vfc-holo-idle 5s ease-in-out infinite alternate; }
.vfc:hover .vfc-holo { animation: none; background-position: var(--mx, 50%) var(--my, 50%); }
.vfc-glare { position: absolute; inset: 0; z-index: 3; pointer-events: none; opacity: 0; transition: opacity 0.2s;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,0.28), transparent 42%); }
.vfc:hover .vfc-glare { opacity: 1; }

/* Foto */
.vfc-media { position: relative; flex: none; height: 132px; overflow: hidden; background: #ECEAF3; border-bottom-right-radius: 100% 44px; }
.vfc-media > img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.vfc-count { position: absolute; left: 8px; bottom: 8px; z-index: 2; display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 0 7px;
  border-radius: 6px; font-size: 10px; font-weight: 700; color: #fff; background: rgba(16,0,48,0.6); }
.vfc-dots { position: absolute; left: 50%; bottom: 10px; z-index: 2; display: flex; gap: 4px; transform: translateX(-50%); }
.vfc-dots i { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.55); }
.vfc-dots i:first-child { background: #fff; }

/* Pills */
.vfc-pills { position: absolute; top: 8px; left: 8px; z-index: 2; display: flex; gap: 4px; }
.vfc-pill { display: inline-flex; align-items: center; gap: 5px; height: 18px; padding: 0 8px 0 6px; border-radius: 999px; font-size: 9px; font-weight: 700; letter-spacing: 0.07em;
  color: #fff; text-transform: uppercase; white-space: nowrap; box-shadow: rgba(0,0,0,0.18) 0 2px 6px; }
.vfc-pill svg { flex: none; width: 10px; height: 10px; }
.vfc-pill--live { background: linear-gradient(135deg, var(--vmc-color-orange-gradient-start, #FF9639) 0%, var(--vmc-color-orange-gradient-mid, #EF852E) 40%, var(--vmc-color-orange-gradient-end, #BE3D00) 100%); }
.vfc-pill--negotiable { background: linear-gradient(110deg, #00A9B0 0%, #3F7FD0 45%, #6A35D6 100%); }
.vfc-pill--featured { background: linear-gradient(135deg, #8460E5 0%, #3B1782 100%); }

/* Favorito */
.vfc-likepos { position: absolute; top: 8px; right: 8px; z-index: 2; display: grid; place-items: center; }
.vfc-like { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 30px; height: 30px; padding: 2px; overflow: hidden;
  border: 1.44px solid transparent; border-radius: 9999px; outline: none; cursor: pointer;
  background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #E8DDFF 0%, #ffffff 40%, #CFBAFF 75%, #AE8EFF 100%);
  background-origin: padding-box, border-box; background-clip: padding-box, border-box;
  box-shadow: rgba(132,96,229,0.14) 0 2px 8px; transition: transform 0.15s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.2s; }
.vfc-like::before { content: ""; position: absolute; inset: 0; z-index: 1; border-radius: 9999px; pointer-events: none; background: linear-gradient(rgba(255,255,255,0.55) 0%, transparent 50%); }
.vfc-like svg { position: relative; z-index: 2; }
.vfc-like:hover { transform: scale(1.1) translateY(-1px); box-shadow: rgba(32,0,104,0.2) 0 6px 14px; }
.vfc-like:active { transform: scale(0.92); }
.vfc-like:focus-visible { outline: 2px solid oklch(0.62 0.20 285); outline-offset: 2px; }
.vfc-like--on { background-image: linear-gradient(135deg, #8460E5 0%, #3B1782 100%), linear-gradient(135deg, #FBC47D 0%, #FBC47D 100%);
  box-shadow: rgba(132,96,229,0.35) 0 2px 8px, inset 0 1px 0 rgba(255,255,255,0.22); }
.vfc-like--pop svg { animation: vfc-like-pop 0.38s cubic-bezier(0.34,1.56,0.64,1) 1; }

/* Datos */
.vfc-body { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; gap: 8px; padding: 12px 8px 14px 10px; }
.vfc-name { margin: 0; overflow: hidden; font-size: 16px; font-weight: 800; line-height: 1.15; color: #1B1442; text-overflow: ellipsis; white-space: nowrap; }
.vfc-sub { margin: 2px 0 0; font-size: 11px; color: #6B6880; }
.vfc-chips { display: flex; flex-wrap: nowrap; gap: 4px; }
.vfc-chip { display: inline-flex; align-items: center; gap: 3px; padding: 4px 5px; border: 1px solid #E3E1EC; border-radius: 6px; font-size: 10px; color: #3F3F4A; white-space: nowrap; }
.vfc-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px; line-height: 1.2; color: #3F3F4A; white-space: nowrap; }
.vfc-stats span { display: flex; align-items: center; gap: 4px; }
.vfc-time { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #3F3F4A; }
.vfc-spacer { flex: 1; }
.vfc-pricerow { display: flex; align-items: center; gap: 8px; }
.vfc-label { margin: 0 0 1px; display: flex; align-items: center; gap: 4px; font-size: 11px; color: #6B6880; }
.vfc-price { margin: 0; font-size: 18px; font-weight: 800; line-height: 1.1; color: #4C1EBC; white-space: nowrap; }
.vfc-offer { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 800; color: #00777A; }
`;

/** Íconos de la carta (trazo 2, color heredado). Puedes usarlos en `chips` y `stats`. */
export const CardIcons = {
  gear: <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  fuel: <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden><path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M4 20h11M14 9h2l2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3M7 8h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  gauge: <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden><path d="M4 17a8 8 0 1 1 16 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M12 15l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  seats: <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 20a6 6 0 0 0-2.5-4.9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  pin: <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden><path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="2" fill="currentColor" /></svg>,
  clock: <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 8v4l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
};
export const PillIcons = {
  camera: <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
  star: <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" fill="currentColor" /></svg>,
  live: <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.6" /><circle cx="12" cy="12" r="4" fill="currentColor" /></svg>,
  tag: <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden><path d="M3 12V4h8l10 10-8 8z" fill="currentColor" /><circle cx="7.5" cy="8.5" r="1.6" fill="#fff" /></svg>,
  hands: <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M2 12l4-4 4 2 3-2 4 1 5 3-4 5-3-1-3 2-3-2-3 1z" fill="#00A8AB" opacity="0.9" /><path d="M9 12l2 2M12 11l2 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" /></svg>,
};

/** SubasCoin: la gema que acompaña al precio. */
export function SubasCoin({ size = 28 }: { size?: number }): JSX.Element {
  const uid = `vfc-coin${useId().replace(/:/g, "")}`;
  return (
    <svg width={size} height={Math.round(size * 30 / 28)} viewBox="30 199 28 30" fill="none" aria-hidden="true" style={{ flex: "none" }}>
      <defs>
        <linearGradient id={`${uid}-d`} gradientUnits="userSpaceOnUse" x1="32" y1="215.5" x2="55.12" y2="228.11">
          <stop stopColor="#00A7A8" /><stop offset="0.4" stopColor="#86A4E4" /><stop offset="0.75" stopColor="#4C1EBC" /><stop offset="1" stopColor="#300089" />
        </linearGradient>
        <linearGradient id={`${uid}-ds`} gradientUnits="userSpaceOnUse" x1="32" y1="215.5" x2="55.12" y2="228.11">
          <stop stopColor="#73DFDF" /><stop offset="0.28" stopColor="#ffffff" stopOpacity="0.9" /><stop offset="0.875" stopColor="#452AA2" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${uid}-c`} gradientUnits="userSpaceOnUse" x1="36.01" y1="199.59" x2="51.99" y2="222.41">
          <stop stopColor="#00ABAD" /><stop offset="0.4" stopColor="#86A4E4" /><stop offset="0.75" stopColor="#4C1EBC" /><stop offset="1" stopColor="#31008A" />
        </linearGradient>
        <linearGradient id={`${uid}-cg`} gradientUnits="userSpaceOnUse" x1="44" y1="203" x2="44" y2="219">
          <stop stopColor="#ffffff" stopOpacity="0.45" /><stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-cb`} gradientUnits="userSpaceOnUse" x1="36.01" y1="199.59" x2="51.99" y2="222.41">
          <stop stopColor="#44D6D6" /><stop offset="0.207" stopColor="#E4EEFF" stopOpacity="0.5" /><stop offset="0.495" stopColor="#567CD3" /><stop offset="1" stopColor="#3D0D9E" />
        </linearGradient>
      </defs>
      <path d="M44 215.5L56 221L44 226.5L32 221L44 215.5Z" fill={`url(#${uid}-d)`} />
      <path d="M44 215.5L56 221L44 226.5L32 221L44 215.5" stroke={`url(#${uid}-ds)`} strokeWidth="2" strokeLinejoin="round" />
      <rect x="34" y="201" width="20" height="20" rx="10" fill={`url(#${uid}-c)`} />
      <rect x="36" y="203" width="16" height="16" rx="8" fill={`url(#${uid}-cg)`} />
      <rect x="35" y="202" width="18" height="18" rx="9" stroke={`url(#${uid}-cb)`} strokeWidth="2" />
      <path d="M44 206.417V215.583" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46.0833 208.083H42.9583C42.1535 208.083 41.5 208.737 41.5 209.542C41.5 210.347 42.1535 211 42.9583 211H45.0417C45.8465 211 46.5 211.653 46.5 212.458C46.5 213.263 45.8465 213.917 45.0417 213.917H41.5" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Favorito: corazón con borde degradado lila; activo, relleno morado con un pequeño rebote. */
export function LikeButton({ name, on, onToggle, size = 30 }: { name: string; on: boolean; onToggle: () => void; size?: number }): JSX.Element {
  const [pop, setPop] = useState(false);
  return (
    <button type="button" className={`vfc-like${on ? " vfc-like--on" : ""}${pop ? " vfc-like--pop" : ""}`} style={{ width: size, height: size }} aria-label={`Agregar a favoritos: ${name}`} aria-pressed={on}
      onClick={(e) => { e.stopPropagation(); onToggle(); setPop(true); }} onAnimationEnd={() => setPop(false)}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" stroke={on ? "#ffffff" : "#5a35c2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export type CardItem = { icon?: ReactNode; label: string };

export type FeaturedCardProps = {
  image: string;
  title: string;
  /** Debajo del nombre, p. ej. "2022 · Hatchback". */
  subtitle?: string;
  /** live = subasta (naranja, precio); negotiable = Recibe ofertas (turquesa, "Haz tu oferta"). */
  tone?: "live" | "negotiable";
  /** Pill "Destacado". */
  featured?: boolean;
  /** Pill "En vivo" (solo con tone="live"). */
  live?: boolean;
  /** Total de fotos del contador "1/12". */
  photos?: number;
  /** Etiquetas con borde (transmisión, combustible…). */
  chips?: CardItem[];
  /** Datos en dos columnas (km, asientos o ciudad…). */
  stats?: CardItem[];
  priceLabel?: string;
  price?: string;
  /** Texto en negociable. */
  offerText?: string;
  /** Grados máximos de inclinación (12 = como el Index; 0 = sin inclinar). */
  tilt?: number;
  /** La foto crece para llenar el alto (cuando le das `height`). */
  fillMedia?: boolean;
  width?: number | string;
  height?: number | string;
  liked?: boolean;
  onLikeChange?: (liked: boolean) => void;
  onClick?: () => void;
};

export function FeaturedCard({
  image, title, subtitle, tone = "live", featured = false, live = tone === "live", photos, chips = [], stats = [],
  priceLabel = "Precio base", price, offerText = "Haz tu oferta", tilt = 12, fillMedia = false,
  width = "100%", height = "auto", liked, onLikeChange, onClick,
}: FeaturedCardProps): JSX.Element {
  const [likedLocal, setLikedLocal] = useState(false);
  const isLiked = liked ?? likedLocal;
  const toggleLike = () => { const v = !isLiked; setLikedLocal(v); onLikeChange?.(v); };

  // El foil y el reflejo siguen al puntero (--mx, --my) y la carta se inclina hacia él (--rx, --ry).
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${Math.round(x * 100)}%`); el.style.setProperty("--my", `${Math.round(y * 100)}%`);
    el.style.setProperty("--rx", `${((0.5 - y) * tilt * 0.83).toFixed(2)}deg`); el.style.setProperty("--ry", `${((x - 0.5) * tilt).toFixed(2)}deg`);
  };
  const onLeave = (e: PointerEvent<HTMLElement>) => { for (const k of ["--mx", "--my", "--rx", "--ry"]) e.currentTarget.style.removeProperty(k); };

  return (
    <>
    <style href="concorde-featured-card" precedence="default">{FEATURED_CARD_CSS}</style>
    <article className={`vfc vfc--${tone}`} style={{ width, height } as CSSProperties} aria-label={`${title}${subtitle ? ` · ${subtitle}` : ""}`}
      onPointerMove={onMove} onPointerLeave={onLeave} onClick={onClick}>
      <div className="vfc-media" style={fillMedia ? { flex: 1, minHeight: 120 } : undefined}>
        <img src={image} alt="" />
        <span className="vfc-pills">
          {featured ? <span className="vfc-pill vfc-pill--featured">{PillIcons.star}Destacado</span> : null}
          {tone === "live" ? (live ? <span className="vfc-pill vfc-pill--live">{PillIcons.live}En vivo</span> : null)
            : <span className="vfc-pill vfc-pill--negotiable">{PillIcons.tag}Recibe ofertas</span>}
        </span>
        <span className="vfc-likepos"><LikeButton name={title} on={isLiked} onToggle={toggleLike} /></span>
        {photos ? <span className="vfc-count">{PillIcons.camera}1/{photos}</span> : null}
        <span className="vfc-dots" aria-hidden><i /><i /><i /><i /></span>
      </div>
      <div className="vfc-body" style={fillMedia ? { flex: "none" } : undefined}>
        <div><p className="vfc-name">{title}</p>{subtitle ? <p className="vfc-sub">{subtitle}</p> : null}</div>
        {chips.length ? <div className="vfc-chips">{chips.map((c) => <span key={c.label} className="vfc-chip">{c.icon}{c.label}</span>)}</div> : null}
        {stats.length ? <div className="vfc-stats">{stats.map((s) => <span key={s.label}>{s.icon}{s.label}</span>)}</div> : null}
        <span className="vfc-spacer" />
        {tone === "live"
          ? <div className="vfc-pricerow"><SubasCoin size={28} /><div><p className="vfc-label">{priceLabel}</p><p className="vfc-price">{price ?? "Por definir"}</p></div></div>
          : <span className="vfc-offer">{PillIcons.hands}{offerText}</span>}
      </div>
      <LightBar tone={tone} />
      <span className="vfc-holo" aria-hidden />
      <span className="vfc-glare" aria-hidden />
    </article>
    </>
  );
}

export default FeaturedCard;
