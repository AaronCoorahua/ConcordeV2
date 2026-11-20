"use client";

/** OfferTypeCards: tarjetas de tipo de oferta. Al pasar el mouse crecen, se desenfocan y muestran un botón.
 *  Solo depende de React. Viene de vmc-index-lab (app/components/lib): «Tipo de oferta» del Index, bajo el banner principal. */
import type { CSSProperties, JSX, MouseEvent, ReactNode } from "react";

/** Estilos del componente (antes en offer-type-cards.css). Se inyectan una sola vez por página. */
export const OFFER_TYPE_CARDS_CSS = String.raw`
/* OfferTypeCards */
@keyframes vot-breathe { 0%, 100% { opacity: 0.55; transform: translate(0, 0) scale(1); } 50% { opacity: 0.85; transform: translate(-8%, 6%) scale(1.12); } }
@keyframes vot-sweep { 0%, 70% { transform: translateX(-160%) skewX(-20deg); } 100% { transform: translateX(360%) skewX(-20deg); } }

.vot { container-type: inline-size; font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
.vot *, .vot *::before, .vot *::after { box-sizing: border-box; }
.vot__grid { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 16px; padding: 4px 0; } /* una columna por tarjeta */

/* Tarjeta */
.vot__card { position: relative; isolation: isolate; display: block; min-height: 128px; overflow: hidden; border-radius: 16px; color: #fff; text-decoration: none;
  box-shadow: var(--vot-glow) 0 12px 26px -10px, inset 0 1px 0 rgba(255,255,255,0.45);
  transition: transform 0.35s cubic-bezier(0.3,0,0,1), box-shadow 0.35s; }
.vot__card:hover, .vot__card:focus-visible { z-index: 1; transform: scale(1.035); box-shadow: var(--vot-glow) 0 22px 40px -12px, inset 0 1px 0 rgba(255,255,255,0.55); }
.vot__card:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }

/* Luces: brillo arriba, foco que respira y destello cada 5 s */
.vot__card::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0) 60%); }
.vot__light { position: absolute; top: -60%; right: -20%; z-index: 0; width: 70%; height: 180%; border-radius: 50%; pointer-events: none;
  background: radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0.12) 55%, transparent); animation: vot-breathe 5s ease-in-out infinite; }
.vot__card::after { content: ""; position: absolute; top: 0; left: 0; z-index: 0; width: 30%; height: 100%; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent); animation: vot-sweep 5s ease-in-out infinite; }

/* Foto */
.vot__img { position: absolute; top: 0; right: 0; bottom: 0; z-index: 0; width: 66%; pointer-events: none; transition: filter 0.35s;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 38%); mask-image: linear-gradient(90deg, transparent 0%, #000 38%); }
.vot__img img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: var(--vot-pos, 68% 40%); }
.vot__shade { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

/* Contenido: se desenfoca al pasar el mouse */
.vot__body { position: relative; z-index: 1; display: grid; align-content: center; gap: 8px; height: 100%; min-height: inherit; padding: 20px 24px;
  transition: filter 0.35s, opacity 0.35s, transform 0.35s; }
.vot__card:hover .vot__body, .vot__card:focus-visible .vot__body { filter: blur(6px); opacity: 0.55; transform: scale(0.98); }
.vot__card:hover .vot__img, .vot__card:focus-visible .vot__img { filter: blur(6px); }
.vot__pill { justify-self: start; display: inline-flex; align-items: center; gap: 5px; height: 18px; padding: 0 8px 0 6px; border-radius: 999px;
  font-size: 9px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; color: var(--vot-ink); background: #fff; box-shadow: rgba(0,0,0,0.16) 0 3px 8px; }
.vot__pill svg { flex: none; width: 10px; height: 10px; }
.vot__text { max-width: 60%; font-size: 12px; line-height: 16.8px; opacity: 0.95; } /* el texto no pisa el auto */

/* Botón de vidrio: aparece al pasar el mouse */
.vot__cta { position: absolute; left: 50%; top: 50%; z-index: 2; display: inline-flex; align-items: center; justify-content: center; height: 36px; padding: 0 26px; border-radius: 100px;
  font-size: 14px; font-weight: 600; line-height: 1; color: #fff; white-space: nowrap; text-shadow: rgba(0,0,0,0.25) 0 1px 3px;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.03) 100%);
  -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); box-shadow: rgba(0,0,0,0.1) 0 8px 24px, inset 0 1px 6px rgba(255,255,255,0.45);
  opacity: 0; pointer-events: none; transform: translate(-50%, -40%) scale(0.92);
  transition: opacity 0.3s, transform 0.35s cubic-bezier(0.3,0,0,1), background-color 0.25s, box-shadow 0.25s; }
.vot__cta::before { content: ""; position: absolute; inset: 0; padding: 1.5px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(94deg, #FFFFFF 0%, var(--vmc-color-orange-gradient-light, #F4AC59) 22.1%, #8460E5 74.5%, #FFFFFF 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
.vot__card:hover .vot__cta, .vot__card:focus-visible .vot__cta { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.vot__card:active .vot__cta { transform: translate(-50%, calc(-50% + 1px)) scale(0.97); background-color: rgba(32,0,104,0.22);
  box-shadow: rgba(0,0,0,0.12) 0 2px 6px, inset 0 2px 8px rgba(32,0,104,0.4); }

/* Móvil (contenedor de menos de 560 px): dos tarjetas compactas lado a lado, como en el Index en celular */
@container (max-width: 560px) {
  .vot__grid { gap: 10px; }
  .vot__card { min-height: 104px; }
  .vot__body { gap: 8px; padding: 14px; }
  .vot__text { max-width: none; }
  .vot__img { width: 100%; opacity: 0.55; }
  .vot__text { font-size: 11px; line-height: 15px; }
}
/* Muy angosto (menos de 300 px): una debajo de otra */
@container (max-width: 300px) { .vot__grid { grid-auto-flow: row; grid-auto-columns: auto; grid-template-columns: minmax(0, 1fr); } }
`;

export type OfferTone = "live" | "negotiable";

/** Colores de cada modalidad. Para una modalidad nueva, pasa `colors` en el item con la misma forma. */
export const OFFER_COLORS: Record<OfferTone, { bg: string; shade: string; glow: string; ink: string }> = {
  negotiable: {
    bg: "linear-gradient(135deg, #12C6CF 0%, #2F8FD4 35%, #5A3FD8 70%, #3B1FA8 100%)",
    shade: "linear-gradient(90deg, rgba(0,150,160,0.96) 0%, rgba(40,120,205,0.82) 34%, rgba(95,60,215,0.25) 68%, rgba(95,60,215,0.05) 100%)",
    glow: "rgba(90,70,215,0.45)", ink: "#00777A",
  },
  live: {
    bg: "linear-gradient(135deg, #FFB25E 0%, #FF8F2E 30%, #EF6A1C 65%, #B83A00 100%)",
    shade: "linear-gradient(90deg, rgba(225,95,20,0.96) 0%, rgba(240,120,40,0.82) 34%, rgba(255,140,50,0.25) 68%, rgba(255,140,50,0.05) 100%)",
    glow: "rgba(255,130,40,0.45)", ink: "#C2410C",
  },
};

const LiveDot = () => <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.6" /><circle cx="12" cy="12" r="4" fill="currentColor" /></svg>;
const TagIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden><path d="M3 12V4h8l10 10-8 8z" fill="currentColor" /><circle cx="7.5" cy="8.5" r="1.6" fill="#fff" /></svg>;

export type OfferTypeItem = {
  tone: OfferTone;
  /** Texto de la pill (p. ej. "Recibe ofertas"). */
  title: string;
  text: string;
  /** Texto del botón de vidrio que aparece al pasar el mouse. */
  cta: string;
  /** Foto del auto a la derecha (opcional: sin foto queda el degradado solo). */
  image?: string;
  href?: string;
  onClick?: () => void;
  /** Ícono propio para la pill (por defecto: punto en vivo o etiqueta). */
  icon?: ReactNode;
  /** Colores propios (por defecto los de `tone`). */
  colors?: Partial<(typeof OFFER_COLORS)[OfferTone]>;
};

export function OfferTypeCards({ items, className = "" }: { items: OfferTypeItem[]; className?: string }): JSX.Element {
  return (
    <div className={`vot${className ? ` ${className}` : ""}`}>
      <style href="concorde-offer-type-cards" precedence="default">{OFFER_TYPE_CARDS_CSS}</style>
      <div className="vot__grid">
        {items.map((t) => {
          const c = { ...OFFER_COLORS[t.tone], ...t.colors };
          const click = (e: MouseEvent<HTMLAnchorElement>) => { if (t.onClick) { if (!t.href) e.preventDefault(); t.onClick(); } };
          return (
            <a key={t.title} href={t.href ?? "#"} onClick={click} className="vot__card" aria-label={`${t.title}: ${t.cta}`}
              style={{ background: c.bg, "--vot-glow": c.glow, "--vot-ink": c.ink } as CSSProperties}>
              {t.image ? <>
                <span className="vot__img" aria-hidden><img src={t.image} alt="" /></span>
                <span className="vot__shade" aria-hidden style={{ background: c.shade }} />
              </> : null}
              <span className="vot__light" aria-hidden />
              <span className="vot__body">
                <span className="vot__pill">{t.icon ?? (t.tone === "live" ? <LiveDot /> : <TagIcon />)}{t.title}</span>
                <span className="vot__text">{t.text}</span>
              </span>
              <span className="vot__cta" aria-hidden>{t.cta}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default OfferTypeCards;
