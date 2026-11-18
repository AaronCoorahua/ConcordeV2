"use client";

/**
 * HeroCarousel — banner principal del Index (vmc-index-lab, PrincipalBanner).
 * Diapositivas con el degradado del sistema, foto a lo ancho con velo violeta y el texto a un lado.
 * Avanza solo (7 s por defecto); se pausa con el puntero o el foco dentro; flechas del teclado para navegar.
 * Indicador «montaña de vidrio»: pestaña de hombros curvos que sube desde el borde inferior, con un punto por diapositiva.
 * El título entra letra por letra. Una diapositiva puede traer varias fotos: al volver a ella muestra la siguiente.
 * Ocupa el alto de su contenedor (dale un alto al padre, p. ej. 300). Solo depende de React y GlassButton.
 * Arma `slides` en un componente cliente: el título se recorre para partirlo en letras, y el JSX que llega
 * serializado desde un Server Component no se puede recorrer igual en el servidor (falla la hidratación).
 */
import { Fragment, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, JSX, ReactNode } from "react";
import GlassButton from "@/src/components/GlassButton";

/** Pill de la diapositiva: «seller» morado (Publica en VMC), «negotiable» cian a violeta, «whatsapp» verde. */
export type HeroPillTone = "seller" | "negotiable" | "whatsapp";

export type HeroSlide = {
  /** Nombre de la diapositiva para lectores de pantalla (y el punto del indicador). */
  label: string;
  pill: { tone: HeroPillTone; text: string };
  /** Título; admite <em> (resalta en durazno) y <br>. */
  title: ReactNode;
  lead: ReactNode;
  cta: string;
  href?: string;
  /** Degradado de fondo. */
  bg: string;
  /** Lado del texto. La foto queda limpia del otro lado. */
  copy: "left" | "right";
  /** `src`: una o varias fotos (rotan al volver). `side`: dónde está la persona. `alto`: encaja por alto (sujeto muy abierto). */
  photo: { src: string[]; side: "l" | "r"; position: string; alto?: boolean };
};

export interface HeroCarouselProps {
  slides: HeroSlide[];
  /** Milisegundos por diapositiva. */
  autoplayMs?: number;
  ariaLabel?: string;
  className?: string;
}

export const HERO_CAROUSEL_CSS = String.raw`
.hp { position: relative; width: 100%; min-width: 0; height: 100%; box-sizing: border-box; container: hp / inline-size; border-radius: 16px; overflow: hidden;
  font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); color: #fff; background: #2e0f70;
  box-shadow: rgba(32, 0, 104, 0.10) 0 0 16px 4px; isolation: isolate; }
.hp *, .hp *::before, .hp *::after { box-sizing: border-box; }
.hp-slide { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity .5s ease, visibility 0s linear .5s; }
.hp-slide.on { opacity: 1; visibility: visible; transition: opacity .5s ease, visibility 0s; }
.hp-bg { position: absolute; inset: 0; }
/* Foto a lo ancho: un velo violeta a un lado sostiene el texto y el otro lado queda limpio. */
.hp-photo { position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; }
.hp-photo img { position: absolute; inset: 0; left: auto; right: 0; width: 118%; height: 100%; object-fit: cover; display: block; } /* el 18 % izquierdo de la toma es fondo vacío */
.hp-photo--l img { left: 0; right: auto; }
.hp-photo--alto img { width: auto; height: 100%; } /* encaja por alto, anclada a su lado: el sujeto se aleja del texto */
.hp-photo::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, rgba(34,16,92,0.92) 0%, rgba(42,22,112,0.8) 34%, rgba(42,22,112,0.3) 56%, rgba(42,22,112,0) 72%),
    linear-gradient(0deg, rgba(20,8,60,0.35) 0%, rgba(20,8,60,0) 30%); }
.hp-photo--l::after { transform: scaleX(-1); } /* el velo pasa al lado del texto */
.hp-copy { position: absolute; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
  padding-bottom: 28px; gap: 12px; width: 44%; min-width: 0; }
.hp-copy.left { left: 36px; }
.hp-copy.right { right: 36px; }
.hp-label { display: inline-flex; align-items: center; gap: 5px; height: 18px; padding: 0 8px 0 6px; border-radius: 999px; font-size: 9px; font-weight: 700; letter-spacing: 0.07em; line-height: 1; text-transform: uppercase; white-space: nowrap; }
.hp-label svg { flex: none; width: 10px; height: 10px; }
.hp-label--seller { background: linear-gradient(135deg, #8460E5 0%, #3B1782 100%); box-shadow: rgba(32,0,104,0.45) 0 2px 10px; }
.hp-label--whatsapp { background: linear-gradient(135deg, #25D366 0%, #0E7A5A 100%); box-shadow: rgba(14,122,90,0.45) 0 2px 10px; }
.hp-label--negotiable { background: linear-gradient(110deg, #00A9B0 0%, #3F7FD0 45%, #6A35D6 100%); box-shadow: rgba(80,70,210,0.45) 0 2px 10px; }
.hp-h { margin: 0; font-size: var(--vmc-font-size-hero, 38px); line-height: var(--vmc-line-height-hero, 42px); font-weight: var(--vmc-font-weight-bold, 800); letter-spacing: var(--vmc-letter-spacing-tight, -0.03em); }
.hp-h em { font-style: normal; color: #FFE2C2; }
.hp-p { margin: 0; font-size: var(--vmc-font-size-body, 15px); line-height: var(--vmc-line-height-body, 22px); font-weight: var(--vmc-font-weight-medium, 500); max-width: 28ch; } /* el texto no llega al sujeto */

/* Indicador «montaña de vidrio». */
.hp-mtn { position: absolute; left: 50%; bottom: 0; z-index: 5; width: 132px; height: 26px; transform: translateX(-50%); }
/* El recorte va en el contenedor: en Chromium el blur del vidrio no respeta un clip-path puesto en el mismo elemento. */
.hp-mtn__clip { position: absolute; inset: 0; overflow: hidden; clip-path: path("M0 26C22 26 26 2 48 2H84C106 2 110 26 132 26Z"); }
.hp-mtn__glass { position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.16) 100%); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.hp-mtn__edge { position: absolute; inset: 0; overflow: visible; pointer-events: none; }
.hp-mtn__edge path { fill: none; stroke: rgba(255,255,255,0.75); stroke-width: 1.2; }
.hp-mtn__dots { position: absolute; left: 50%; top: 11px; display: flex; align-items: center; gap: 6px; transform: translateX(-50%); }
.hp-mtn__dots button { width: 6px; height: 6px; padding: 0; border: 0; border-radius: 999px; background: rgba(255,255,255,0.6); cursor: pointer;
  box-shadow: rgba(32,0,104,0.25) 0 1px 2px; transition: width 0.3s ease, background 0.3s; }
.hp-mtn__dots button.on { width: 18px; background: #fff; }
.hp-mtn__dots button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

/* Entrada de la diapositiva: la foto hace un zoom lento; el título entra letra por letra y el resto sube en cascada. */
.hp-slide.on .hp-photo img { animation: hp-kb 7.5s ease-out both; }
@keyframes hp-kb { from { transform: scale(1.08); } to { transform: none; } }
.hp-slide.on .hp-copy > :not(.hp-h) { animation: hp-rise 0.7s cubic-bezier(0.2,0.8,0.2,1) both; }
.hp-slide.on .hp-copy > :nth-child(n+3) { animation-delay: 0.45s; }
.hp-slide.on .hp-copy > :nth-child(n+4) { animation-delay: 0.55s; }
@keyframes hp-rise { from { opacity: 0; transform: translateY(18px); } }
.hp-word { display: inline-block; white-space: nowrap; }
.hp-ch { display: inline-block; }
.hp-slide.on .hp-ch { animation: hp-ch 0.6s cubic-bezier(0.2,0.8,0.2,1) both; animation-delay: calc(var(--i) * 22ms); }
@keyframes hp-ch { from { opacity: 0; transform: translateY(0.55em) rotate(8deg); filter: blur(4px); } }
.hp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hp-slide.on .hp-photo img, .hp-slide.on .hp-copy > *, .hp-slide.on .hp-ch { animation: none !important; }
  .hp-mtn__dots button { transition: none; }
}
@container hp (max-width: 960px) { .hp-copy { width: 50%; } .hp-h { font-size: var(--vmc-font-size-title, 30px); line-height: var(--vmc-line-height-title, 34px); } }
@container hp (max-width: 700px) { .hp-copy { width: 58%; } .hp-slide:has(.hp-photo--l) .hp-copy { left: auto; right: 20px; } .hp-copy.left { left: 20px; } }
/* Celular: la foto arriba, con el velo en vertical, y el texto compacto abajo, sobre los puntos. */
@container hp (max-width: 480px) {
  .hp-photo img { width: 100%; object-position: 82% 18% !important; }
  .hp-photo--l img { object-position: 18% 18% !important; }
  .hp-photo--l::after { transform: none; }
  .hp-photo::after { background: linear-gradient(180deg, rgba(42,22,112,0) 18%, rgba(34,16,92,0.72) 50%, rgba(28,12,80,0.96) 100%); }
  .hp-copy, .hp-copy.left, .hp-copy.right, .hp-slide:has(.hp-photo--l) .hp-copy { left: 18px; right: 18px; width: auto; justify-content: flex-end; gap: 8px; padding-bottom: 46px; }
  .hp-h { font-size: 23px; line-height: 27px; }
  .hp-p { font-size: 13px; line-height: 18px; max-width: 34ch; }
  .hp .hib-glass { height: 34px; padding: 0 22px; font-size: 14px; }
}
`;

const TagIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden><path d="M3 12V4h8l10 10-8 8z" fill="currentColor" /><circle cx="7.5" cy="8.5" r="1.6" fill="#fff" /></svg>;
const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.8-4.5-4s-1.1-1.5-1.1-2.8 .7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.4Z" /></svg>
);
const PILL_ICON: Record<HeroPillTone, ReactNode> = { seller: null, negotiable: <TagIcon />, whatsapp: <WhatsAppGlyph /> };

/** Parte el título en palabras y letras (efecto «Letras»); conserva <em> y <br>. */
function Letters({ children }: { children: ReactNode }): JSX.Element {
  let n = 0;
  const walk = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((w, k) => (/^\s+$/.test(w) || !w ? w
        : <span key={k} className="hp-word">{[...w].map((c, j) => <span key={j} className="hp-ch" style={{ "--i": n++ } as CSSProperties}>{c}</span>)}</span>));
    }
    if (Array.isArray(node)) return node.map((c, k) => <Fragment key={k}>{walk(c)}</Fragment>);
    if (isValidElement<{ children?: ReactNode }>(node)) return cloneElement(node, undefined, walk(node.props.children));
    return node;
  };
  return <>{walk(children)}</>;
}
// Texto plano del título (para lectores de pantalla, porque visualmente va partido en letras).
const plain = (node: ReactNode): string =>
  typeof node === "string" ? node : Array.isArray(node) ? node.map(plain).join("")
    : isValidElement<{ children?: ReactNode }>(node) ? (node.type === "br" ? " " : plain(node.props.children)) : "";

export default function HeroCarousel({ slides, autoplayMs = 7000, ariaLabel = "Destacados", className = "" }: HeroCarouselProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), autoplayMs);
    return () => clearTimeout(t);
  }, [index, paused, n, autoplayMs]);
  // La diapositiva que se va pasa a su siguiente foto, ya oculta (tras el fundido de .5 s).
  const [ver, setVer] = useState<number[]>(() => slides.map(() => 0));
  const prev = useRef(0);
  useEffect(() => {
    const p = prev.current; prev.current = index;
    if (p === index) return;
    const t = setTimeout(() => setVer((v) => v.map((x, i) => (i === p ? x + 1 : x))), 600);
    return () => clearTimeout(t);
  }, [index]);
  const foto = (i: number) => slides[i].photo.src[(ver[i] ?? 0) % slides[i].photo.src.length];
  return (
    <section className={`hp${className ? ` ${className}` : ""}`} aria-roledescription="carrusel" aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}>
      <style href="concorde-hero-carousel" precedence="default">{HERO_CAROUSEL_CSS}</style>
      {slides.map((sl, i) => (
        <div key={sl.label} className={`hp-slide${i === index ? " on" : ""}`} role="group" aria-roledescription="diapositiva"
          aria-label={`${i + 1} de ${n}: ${sl.label}`} aria-hidden={i !== index} inert={i !== index}>
          <div className="hp-bg" style={{ background: sl.bg }} />
          <div className={`hp-photo hp-photo--${sl.photo.side}${sl.photo.alto ? " hp-photo--alto" : ""}`}>
            <img src={foto(i)} alt="" style={{ objectPosition: sl.photo.position }} />
          </div>
          <div className={`hp-copy ${sl.copy}`}>
            <span className={`hp-label hp-label--${sl.pill.tone}`}>{PILL_ICON[sl.pill.tone]}{sl.pill.text}</span>
            <h2 className="hp-h"><span className="hp-sr">{plain(sl.title)}</span><span aria-hidden><Letters>{sl.title}</Letters></span></h2>
            <p className="hp-p">{sl.lead}</p>
            {sl.href ? <GlassButton href={sl.href}>{sl.cta}</GlassButton> : <GlassButton>{sl.cta}</GlassButton>}
          </div>
        </div>
      ))}
      {n > 1 ? (
        <div className="hp-mtn">
          <span className="hp-mtn__clip" aria-hidden><span className="hp-mtn__glass" /></span>
          <svg className="hp-mtn__edge" viewBox="0 0 132 26" aria-hidden><path d="M0 26C22 26 26 2 48 2H84C106 2 110 26 132 26" /></svg>
          <div className="hp-mtn__dots" role="group" aria-label="Elegir diapositiva">
            {slides.map((sl, i) => (
              <button key={sl.label} type="button" className={i === index ? "on" : undefined} aria-label={`Ir a la diapositiva ${i + 1}: ${sl.label}`} aria-current={i === index} onClick={() => setIndex(i)} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
