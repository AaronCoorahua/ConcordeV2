"use client";

/**
 * Landing «Valoriza» (nueva, 16/11/2026 · v2). Vive dentro del shell del Index (HomeIndexRebase): mismo Header,
 * Sidebar, SidebarMobile, lienzo de 1024 y CSS module; solo cambia el contenido de la columna principal.
 * Reutiliza del Index: el botón de vidrio (GLASS_CSS), Button de Concorde, íconos Vidrio
 * y tokens del hero (.hp). Copy y pantallas reales: campaña «Valoriza y Vende» (correos).
 * Regla Stage 1: la valorización es un valor REFERENCIAL con fecha, nunca un precio fijo de venta.
 * Sin backend: los CTA llevan al prototipo de valorización/publicación ya integrado (datos simulados).
 *
 * v3 (17/11, comentario de Julio): estructura de landing-subascars. Hero bajo + franja de vidrio, ¿Cómo funciona?,
 * beneficio, lo que debes saber, «Vende tu vehículo» del Index, preguntas frecuentes y Centro de Ayuda.
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { useRouter } from "next/navigation";

import { Button, Header, Sidebar, SidebarMenuButton, SidebarMobile } from "@/src/product/index/adapter";
import shell from "@/src/product/index/view/HomeIndexRebase.module.css";
import { GLASS_CSS } from "@/src/product/index/view/glass";
import { Vidrio, type Sec } from "@/src/product/index/view/Vidrio";

const VALUAR = "/producto/mi-garaje/m/vmc-valuar";
const IMG = "/correos/campana-valoriza";

// Conocimiento AVT: ver ./AVT.md (contrato relevado del código de avt-ai y del lab de VMC-Laptop).
// Estructura: la de landing-subascars (Julio y Fernando, 17/11). Comercial + informativa: hero y franja de vidrio,
// cómo funciona, qué esperar del servicio, lo que debes saber, banner de venta, FAQ y Centro de Ayuda.
const STEPS: { icon: Sec; label: string }[] = [
  { icon: "auto", label: "Ingresas tu auto" },
  { icon: "docs", label: "Afinas detalles" },
  { icon: "valorizaciones", label: "Ves su valor" },
  { icon: "publicar", label: "Guardas o publicas" },
];

const PERKS: { icon: Sec; title: string; text: string }[] = [
  { icon: "verificado", title: "Gratis", text: "Sin compromiso" },
  { icon: "fecha", title: "1 minuto", text: "Para tu valor base" },
  { icon: "docs", title: "12 detalles", text: "Opcionales" },
];

// Qué esperar del servicio: lo que trae el resultado de AVT (público en el contrato, ver AVT.md).
const EXPECT: { icon: Sec; title: string; text: string }[] = [
  { icon: "valorizaciones", title: "Valor de mercado de hoy", text: "Cuánto vale tu auto hoy, con la fecha de la valorización." },
  { icon: "crecimiento", title: "Proyección a 12 meses", text: "Cómo cambiará su valor en 1, 3, 6 y 12 meses." },
  { icon: "auto", title: "Vehículos similares", text: "Autos parecidos al tuyo en el mercado, para comparar." },
  { icon: "fecha", title: "Guardado en Mi Garaje", text: "Tu valorización queda guardada para revisarla o publicar." },
];

const USES = [
  { img: "vender.jpg", title: "¿Vas a vender?", text: "Sabrás cuánto pedir antes de publicar." },
  { img: "comprar.jpg", title: "¿Te interesa un auto?", text: "Revisa si su precio es justo antes de proponer." },
];

// «Lo que debes saber» (equivale a la tarjeta de Subascars). Fórmula de AVT en lenguaje llano, sin cifras internas.
const KNOW = [
  "Partimos del precio de lista de tu versión cuando era nueva.",
  "Restamos lo que pierde con los años, la temporada y el kilometraje.",
  "Tus respuestas sobre estado, historial y equipamiento afinan el valor.",
  "Recibes un valor referencial con fecha. No es una oferta de compra.",
];

const FAQ: [string, string][] = [
  ["¿Qué es AVT?", "Es el valorizador de vehículos de VMC. Calcula el valor de mercado de tu auto con datos reales del mercado peruano."],
  ["¿Cuánto cuesta valorizar?", "Es gratis."],
  ["¿Cuánto demora?", "Alrededor de un minuto para tu valor base. Los detalles adicionales son opcionales."],
  ["¿Tengo que responder todos los detalles?", "No. Puedes saltarlos. Cada detalle que respondes (mecánica, estado, historial, equipamiento) afina la precisión."],
  ["¿El valor es lo que me pagarán?", "No. Es una estimación referencial con fecha y no constituye una oferta de compra. El valor real puede variar según el estado del vehículo, su documentación y el mercado al momento de vender."],
  ["¿Me obliga a vender o publicar?", "No. Al final eliges si lo guardas o lo publicas. Sin compromiso."],
  ["¿Y si mi modelo no aparece?", "Elige «Mi modelo no aparece», escríbelo e indica su precio de lista cuando era nuevo."],
  ["¿Dónde queda mi valorización?", "En Mi Garaje, con su fecha. Desde ahí también puedes publicarla."],
];

// Contenido: un solo componente para escritorio y móvil (el shell lo monta en ambos lienzos).
function ValorizaBody({ id }: { id: "d" | "m" }): JSX.Element {
  const router = useRouter();
  const valuar = () => router.push(VALUAR);
  const hero = useRef<HTMLElement>(null);
  const close = useRef<HTMLElement>(null);
  const [pastHero, setPastHero] = useState(false);
  // CTA fijo del móvil: visible entre el hero y el banner final (un observer, sin scroll handler).
  useEffect(() => {
    const el = hero.current, end = close.current;
    if (!el || !end) return;
    const seen = new Map<Element, IntersectionObserverEntry>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => seen.set(e.target, e));
      const h = seen.get(el), c = seen.get(end);
      setPastHero(!!h && !h.isIntersecting && h.boundingClientRect.top < 0 && !(c?.isIntersecting));
    });
    io.observe(el); io.observe(end);
    return () => io.disconnect();
  }, []);
  // El shell monta el contenido dos veces (escritorio y móvil); se desplaza al bloque visible, sin ids duplicados.
  const toSteps = () => {
    const el = [...document.querySelectorAll<HTMLElement>("[data-vz='pasos']")].find((n) => n.offsetParent !== null);
    el?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="vz">
      {/* ── Hero ── */}
      <section className="vz-hero" ref={hero} aria-label="Valoriza tu auto">
        <div className="vz-hero__photo"><img src="/producto/index/banners/vmc/valoriza-auto.jpg" alt="" fetchPriority="high" /></div>
        <div className="vz-hero__copy">
          <h1>¿Cuánto vale tu auto <em>hoy</em>?</h1>
          <p>Gratis, en un minuto y sin compromiso. Sabrás cuánto pedir antes de publicar.</p>
          <div className="vz-hero__actions">
            <Button variant="primary" onClick={valuar}>Quiero saber cuánto vale</Button>
            <button type="button" className="hib-glass" onClick={toSteps}>Ver cómo funciona</button>
          </div>
        </div>
      </section>
      <div className="vz-proof">
        <p className="vz-proof__brand"><strong>Valorizador AVT</strong><span>Tu auto, su valor, tu decisión</span></p>
        <ul aria-label="Condiciones de la valorización">
          {PERKS.map((p) => (
            <li key={p.title}><Vidrio s={p.icon} size={32} /><div><strong>{p.title}</strong><span>{p.text}</span></div></li>
          ))}
        </ul>
      </div>

      {/* ── ¿Cómo funciona? (fila de pasos como en Subascars) ── */}
      <section className="vz-card vz-steps" data-vz="pasos" aria-label="Cómo funciona">
        <p className="vz-label">¿Cómo funciona?</p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.label}><Vidrio s={s.icon} size={36} /><span><small>Paso {i + 1}</small>{s.label}</span></li>
          ))}
        </ol>
      </section>

      {/* ── Beneficio (como «Un solo pago, hasta que lo vendas») ── */}
      <section className="vz-card vz-center" aria-label="Por qué valorizar">
        <p className="vz-pill">Gratis · Sin compromiso</p>
        <h2 className="vz-title">Sabe cuánto vale tu auto, <span>antes de publicar</span></h2>
        <p className="vz-lead">El precio de un aviso no es el valor de tu auto. AVT lo calcula con datos reales del mercado peruano para que pidas lo justo, <b>ni más, ni menos</b>.</p>
        <dl className="vz-stats">
          <div><dt>1 min</dt><dd>Para tu valor base</dd></div>
          <div><dt>12 meses</dt><dd>De proyección de valor</dd></div>
        </dl>

        {/* ── Qué esperar del servicio ── */}
        <p className="vz-pill">Qué vas a recibir</p>
        <h2 className="vz-title">Esto es lo que te entrega <span>tu valorización</span></h2>
        <ul className="vz-expect">
          {EXPECT.map((e) => <li key={e.title}><Vidrio s={e.icon} size={40} /><h3>{e.title}</h3><p>{e.text}</p></li>)}
        </ul>

        {/* ── Lo que debes saber (como «¿Sabes realmente cómo funciona…?») ── */}
        <p className="vz-pill">Valor con sustento</p>
        <h2 className="vz-title">El valor real de tu auto <span>está a un minuto</span></h2>
        <p className="vz-lead">Responde unos datos y mira su valor de mercado con fecha. Al final, <b>tú decides si lo guardas o lo publicas</b>.</p>
        <div className="vz-know">
          <article className="vz-know__card">
            <header><small>¿Sabes realmente cómo se calcula</small>el valor de tu auto?</header>
            <div>
              <p className="vz-label">Lo que debes saber</p>
              <ul>{KNOW.map((k) => <li key={k}>{k}</li>)}</ul>
            </div>
          </article>
          <div className="vz-know__phone" aria-hidden>
            <img src={`${IMG}/cel/resultado.png`} alt="" width={460} height={867} loading="lazy" />
          </div>
        </div>
        <Button variant="primary" onClick={valuar}>Valorizar mi auto</Button>
      </section>

      {/* ── Banner comercial (lugar del banner de WhatsApp de Subascars) + franja de vidrio con los dos usos,
             mismo patrón que hero + franja. Un solo CTA principal; las opciones son enlaces secundarios. ── */}
      <section className="vz-use" aria-label="Para qué te sirve valorizar">
        <div className="vz-sell">
          <img className="vz-sell__person" src="/producto/index/demo/sell/seller-phone-man.png" alt="" loading="lazy" />
          <p className="vz-sell__kicker">Miles de compradores ya entran a VMC</p>
          <h2>¿Listo para vender? <span>Empieza por su valor</span></h2>
          <p>Publicar empieza valorizando: así tu precio tiene sustento.</p>
          <Button variant="primary" onClick={valuar}>Valorizar y publicar</Button>
        </div>
        <ul className="vz-use__opts">
          {USES.map((u) => (
            <li key={u.title}>
              <a href={VALUAR}>
                <img src={`${IMG}/${u.img}`} alt="" loading="lazy" />
                <span><strong>{u.title}</strong>{u.text}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M7.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Preguntas frecuentes ── */}
      <section className="vz-card vz-faq" aria-label="Preguntas frecuentes">
        <h2 className="vz-title">Preguntas frecuentes</h2>
        {/* name compartido: acordeón exclusivo nativo; un grupo por copia escritorio/móvil. */}
        <div className="vz-faq__list">
          {FAQ.map(([q, a], i) => (
            <details key={q} name={`vz-faq-${id}`}>
              <summary><span>{i + 1}. {q}</span><i aria-hidden /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        {/* Datos estructurados FAQPage: ayudan a buscadores y respuestas de IA a citar el contenido. */}
        {id === "d" ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }) }} /> : null}
      </section>

      {/* ── Centro de Ayuda (banner final, como en Subascars) ── */}
      <section className="vz-help" ref={close} aria-label="Centro de Ayuda">
        <div><h2>Centro de Ayuda</h2><p>Respuestas rápidas a todas tus dudas</p></div>
        <a className="hib-glass" href="https://www.vmcsubastas.com/centro-de-ayuda">Ir al Centro de Ayuda</a>
      </section>

      {/* CTA fijo inferior (solo móvil). */}
      <div className="vz-dock" data-on={pastHero || undefined} aria-hidden={!pastHero}>
        <Button variant="primary" onClick={valuar} tabIndex={pastHero ? 0 : -1}>Quiero saber cuánto vale</Button>
      </div>
      <style>{GLASS_CSS + VZ_CSS}</style>
    </div>
  );
}

const VZ_CSS = `
.vz { --ink: #191C1C; --muted: #6B6878; --v900: #1C0B4F; --v800: #2E0F70; --v700: #3B1782; --v500: #8460E5; --lav: #F5F0FF; --line: #ECE6FB; --peach: #FFE2C2; --orange: #ED8936;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%; padding: 16px 16px 64px; box-sizing: border-box; display: grid; gap: 16px; background: #fff; font-family: var(--vmc-font-display); color: var(--ink); }
.vz *, .vz *::before, .vz *::after { box-sizing: border-box; }
.vz ::selection { background: #E8DDFF; color: #22005C; }
.vz h1, .vz h2, .vz h3 { text-wrap: balance; }
.vz em { font-style: normal; }

/* Hero: anatomía .hp del Index, bajo (como el banner de Subascars, un poco más alto por la franja). */
.vz-hero { position: relative; isolation: isolate; height: 320px; overflow: hidden; border-radius: 20px; color: #fff; background: var(--v800);
  box-shadow: 0 24px 48px -28px rgba(34,0,92,0.55); }
.vz-hero__photo { position: absolute; top: 0; right: 0; bottom: 0; width: 62%;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 34%); mask-image: linear-gradient(90deg, transparent 0%, #000 34%); }
.vz-hero__photo img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 40%; display: block; }
.vz-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(60% 80% at 0% 100%, rgba(237,137,54,0.28), transparent 60%); }
.vz-hero__copy { position: absolute; top: 0; bottom: 36px; left: 36px; width: 57%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 14px; }
.vz-hero h1 { margin: 0; max-width: 12ch; font-size: clamp(34px, 4.2vw, 44px); line-height: 1.04; font-weight: 800; letter-spacing: -0.035em; }
.vz-hero h1 em { color: var(--peach); }
.vz-hero p { margin: 0; max-width: 40ch; font-size: 14px; line-height: 21px; font-weight: 500; color: #E8DDFF; }
.vz-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.vz-hero__actions .hib-glass { height: 40px; }

/* Franja de vidrio montada sobre el borde del hero (como «Formato de publicación» en Subascars). */
.vz-proof { position: relative; z-index: 2; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 8px; margin: -52px 28px 0; padding: 12px 8px 12px 20px;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.82);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vz-proof__brand { margin: 0; padding-right: 20px; border-right: 1px solid #E4DCF8; }
.vz-proof__brand strong { display: block; font-size: 17px; line-height: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vz-proof__brand span { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: #C2410C; }
.vz-proof ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.vz-proof li { display: flex; align-items: center; gap: 12px; padding: 0 16px; min-width: 0; }
.vz-proof li + li { border-left: 1px solid #E4DCF8; }
.vz-proof strong { display: block; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vz-proof span { display: block; font-size: 12px; line-height: 16px; color: var(--muted); }

/* Tarjetas blancas del cuerpo (mismo lenguaje de Subascars: bloques blancos sobre el lienzo). */
.vz-card { border-radius: 20px; background: #fff; border: 1px solid var(--line); box-shadow: 0 12px 28px -24px rgba(59,23,130,0.35); padding: 24px; }
.vz-label { margin: 0; font-size: 12px; line-height: 16px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--v700); }

/* ¿Cómo funciona? */
.vz-steps { display: grid; gap: 14px; scroll-margin-top: 80px; }
.vz-steps ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; counter-reset: none; }
.vz-steps li { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 14px; background: var(--lav); border: 1px solid var(--line); }
.vz-steps li span { display: grid; font-size: 14px; line-height: 18px; font-weight: 800; color: var(--v700); }
.vz-steps li small { font-size: 11px; line-height: 14px; font-weight: 700; color: #C2410C; }

/* Bloques centrados: píldora, titular, bajada, cifras. */
.vz-center { display: grid; justify-items: center; text-align: center; gap: 14px; padding: 40px 32px; }
.vz-pill { margin: 0; padding: 4px 14px; border-radius: 999px; font-size: 12px; line-height: 18px; font-weight: 700; color: #C2410C; background: #FFF4E8; border: 1px solid #FBD7B2; }
.vz-center .vz-pill:not(:first-child) { margin-top: 40px; }
.vz-title { margin: 0; max-width: 22ch; font-size: 36px; line-height: 1.1; font-weight: 800; letter-spacing: -0.035em; color: var(--v700); }
.vz-title span { color: var(--v500); }
.vz-lead { margin: 0; max-width: 58ch; font-size: 15px; line-height: 23px; color: var(--muted); }
.vz-lead b { color: var(--v700); }
.vz-stats { display: flex; gap: 48px; margin: 8px 0 0; }
.vz-stats div { display: grid; gap: 2px; }
.vz-stats dt { font-size: 30px; line-height: 36px; font-weight: 800; letter-spacing: -0.03em; color: var(--v500); }
.vz-stats dd { margin: 0; font-size: 13px; font-weight: 700; color: var(--v700); }

/* Lo que debes saber: tarjeta con checklist + pantalla real (en lugar del video de Subascars). */
.vz-know { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 20px; width: 100%; max-width: 640px; margin: 8px 0; text-align: left; }
.vz-know__card { overflow: hidden; border-radius: 18px; border: 1px solid var(--line); background: #fff; box-shadow: 0 16px 32px -24px rgba(59,23,130,0.45); }
.vz-know__card header { padding: 18px 20px; color: #fff; font-size: 20px; line-height: 24px; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(120deg, #32136F 0%, #4E22A9 60%, #7B4BE3 100%); }
.vz-know__card header small { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: #DCCFFF; letter-spacing: 0; }
.vz-know__card > div { display: grid; gap: 12px; padding: 18px 20px 20px; }
.vz-know__card .vz-label { color: var(--muted); font-size: 11px; }
.vz-know__card ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.vz-know__card li { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 10px; font-size: 13px; line-height: 19px; font-weight: 600; color: var(--v700); }
.vz-know__card li::before { content: ""; width: 20px; height: 20px; border-radius: 50%;
  background: var(--orange) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4.5 8.2l2.3 2.3 4.7-5' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 16px no-repeat; }
.vz-know__phone { display: grid; place-items: center; border-radius: 18px; border: 1px solid #CDBDF5; background: linear-gradient(180deg, var(--lav), #fff); overflow: hidden; }
.vz-know__phone img { width: auto; height: 300px; margin: 16px 0 -60px; filter: drop-shadow(0 18px 24px rgba(34,0,92,0.3)); }

/* Qué esperar: cuatro tarjetas con ícono. */
.vz-expect { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; width: 100%; margin: 8px 0 0; padding: 0; list-style: none; text-align: left; }
.vz-expect li { display: grid; align-content: start; gap: 8px; padding: 18px 16px; border-radius: 16px; background: var(--lav); border: 1px solid var(--line); }
.vz-expect h3 { margin: 4px 0 0; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vz-expect p { margin: 0; font-size: 13px; line-height: 19px; color: var(--muted); }

/* Banner de venta + franja de vidrio con los dos usos (vender / comprar). */
.vz-use { display: grid; }
.vz-sell { position: relative; overflow: hidden; isolation: isolate; display: grid; align-content: center; justify-items: start; gap: 10px; min-height: 240px; padding: 32px 36px 72px; border-radius: 20px; color: #fff;
  background: radial-gradient(90% 120% at -10% 120%, rgba(239,133,46,0.85) 0%, rgba(239,133,46,0.3) 30%, transparent 58%), linear-gradient(120deg, #32136F 0%, #4E22A9 60%, #7B4BE3 100%); }
.vz-sell__kicker { margin: 0; font-size: 12px; line-height: 16px; font-weight: 700; color: var(--peach); }
.vz-sell h2 { margin: 0; max-width: 18ch; font-size: 30px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; }
.vz-sell h2 span { display: block; color: var(--peach); }
.vz-sell > p:not(.vz-sell__kicker) { margin: 0 0 6px; max-width: 40ch; font-size: 14px; line-height: 21px; color: rgba(255,255,255,0.86); }
.vz-sell__person { position: absolute; z-index: -1; right: 40px; bottom: 0; height: 100%; width: auto; pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, #000 70%, transparent 100%); mask-image: linear-gradient(180deg, #000 70%, transparent 100%); }
.vz-use__opts { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: -48px 28px 0; padding: 8px; list-style: none;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.86);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vz-use__opts li + li { border-left: 1px solid #E4DCF8; }
.vz-use__opts a { display: grid; grid-template-columns: 72px minmax(0, 1fr) 20px; align-items: center; gap: 14px; padding: 8px 12px 8px 8px; border-radius: 12px;
  color: var(--muted); font-size: 13px; line-height: 18px; text-decoration: none; transition: background-color 200ms var(--ease); }
.vz-use__opts a:hover { background: var(--lav); }
.vz-use__opts a:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vz-use__opts img { width: 72px; height: 56px; border-radius: 10px; object-fit: cover; display: block; }
.vz-use__opts strong { display: block; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vz-use__opts svg { color: var(--orange); transition: transform 200ms var(--ease); }
.vz-use__opts a:hover svg { transform: translateX(3px); }

/* Preguntas frecuentes: título centrado y tarjetas numeradas (como Subascars), <details> nativo. */
.vz-faq { display: grid; gap: 20px; padding: 32px 24px; }
.vz-faq .vz-title { justify-self: center; text-align: center; }
.vz-faq__list { display: grid; gap: 8px; }
.vz-faq details { border-radius: 14px; background: #fff; border: 1px solid var(--line); box-shadow: 0 6px 16px -14px rgba(59,23,130,0.4); transition: background-color 240ms var(--ease), border-color 240ms var(--ease); }
.vz-faq details:hover { border-color: #CDBDF5; }
.vz-faq details[open] { background: var(--lav); border-color: #CDBDF5; }
.vz-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; padding: 0 14px 0 20px;
  cursor: pointer; list-style: none; font-size: 15px; line-height: 21px; font-weight: 700; color: var(--v700); border-radius: 14px; }
.vz-faq summary::-webkit-details-marker { display: none; }
.vz-faq summary:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vz-faq summary i { position: relative; flex: none; width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid var(--line); transition: background-color 240ms var(--ease); }
.vz-faq summary i::before, .vz-faq summary i::after { content: ""; position: absolute; top: 50%; left: 50%; width: 10px; height: 2px; margin: -1px 0 0 -5px; border-radius: 2px; background: var(--v500); transition: transform 280ms var(--ease), background-color 240ms; }
.vz-faq summary i::after { transform: rotate(90deg); }
.vz-faq details[open] summary i { background: var(--v700); border-color: var(--v700); }
.vz-faq details[open] summary i::before, .vz-faq details[open] summary i::after { background: #fff; }
.vz-faq details[open] summary i::after { transform: rotate(0deg); }
.vz-faq details p { margin: 0; padding: 0 20px 18px; max-width: 70ch; font-size: 14px; line-height: 22px; color: var(--muted); }
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    .vz-faq { interpolate-size: allow-keywords; }
    .vz-faq details::details-content { block-size: 0; overflow: clip; opacity: 0;
      transition: block-size 320ms var(--ease), opacity 240ms ease, content-visibility 320ms allow-discrete; }
    .vz-faq details[open]::details-content { block-size: auto; opacity: 1; }
  }
}

/* Centro de Ayuda: banner final con el degradado de la marca. */
.vz-help { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 28px; border-radius: 20px; color: #fff;
  background: linear-gradient(90deg, #B4602A 0%, #5B2AB8 45%, #2E0F70 100%); }
.vz-help h2 { margin: 0; font-size: 20px; line-height: 26px; font-weight: 800; }
.vz-help p { margin: 2px 0 0; font-size: 13px; line-height: 18px; color: #E8DDFF; }
.vz-help .hib-glass { height: 40px; padding-inline: 20px; white-space: nowrap; }

.vz-dock { display: none; }

@media (max-width: 1023px) {
  .vz { padding: 14px 14px 104px; gap: 12px; }
  .vz-hero { height: auto; display: flex; flex-direction: column; border-radius: 18px; }
  .vz-hero__photo { position: relative; width: 100%; height: 200px; -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent 100%); mask-image: linear-gradient(180deg, #000 60%, transparent 100%); }
  .vz-hero__photo img { object-position: 62% 35%; }
  .vz-hero__copy { position: relative; left: 0; bottom: 0; width: 100%; padding: 0 20px 64px; margin-top: -28px; gap: 12px; }
  .vz-hero h1 { font-size: 34px; }
  .vz-hero__actions { width: 100%; }
  .vz-hero__actions > * { flex: 1 1 100%; }
  .vz-hero__actions .pvbtn { white-space: nowrap; padding-inline: 16px; }
  .vz-proof { grid-template-columns: minmax(0, 1fr); margin: -52px 12px 0; padding: 14px 4px 6px; }
  .vz-proof__brand { padding: 0 12px 10px; border-right: 0; border-bottom: 1px solid #E4DCF8; }
  .vz-proof ul { grid-template-columns: minmax(0, 1fr); }
  .vz-proof li { padding: 10px 12px; }
  .vz-proof li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vz-card { padding: 20px 16px; }
  .vz-steps ol { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .vz-steps li { flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px; }
  .vz-center { padding: 32px 16px; }
  .vz-title { font-size: 26px; }
  .vz-stats { gap: 32px; }
  .vz-stats dt { font-size: 26px; }
  .vz-know { grid-template-columns: minmax(0, 1fr); }
  .vz-know__phone img { height: 260px; }
  .vz-center .pvbtn { width: 100%; }
  .vz-expect { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .vz-expect li { padding: 14px 12px; }
  .vz-sell { padding: 24px 20px 260px; }
  .vz-sell h2 { font-size: 24px; }
  .vz-sell .pvbtn { width: 100%; }
  .vz-sell__person { right: 50%; transform: translateX(50%); bottom: 48px; height: 220px; }
  .vz-use__opts { grid-template-columns: minmax(0, 1fr); margin: -48px 12px 0; padding: 4px; }
  .vz-use__opts li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vz-sell__person { right: -10px; height: 230px; }
  .vz-faq { padding: 24px 12px; }
  .vz-faq summary { padding: 0 12px 0 16px; }
  .vz-faq details p { padding: 0 16px 16px; }
  .vz-help { flex-direction: column; align-items: flex-start; padding: 20px; }
  .vz-help .hib-glass { width: 100%; justify-content: center; }
  .vz-dock { display: block; position: fixed; left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom)); z-index: 40; padding: 8px; border-radius: 999px;
    background: rgba(255,255,255,0.86); border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 18px 36px -16px rgba(34,0,92,0.45);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    transform: translateY(calc(100% + 24px)); opacity: 0; transition: transform 420ms var(--ease), opacity 240ms ease; }
  .vz-dock[data-on] { transform: none; opacity: 1; }
  .vz-dock .pvbtn { width: 100%; white-space: nowrap; }
}
@media (prefers-reduced-motion: reduce) {
  .vz-dock { transition: none; }
}
`;

function BrandLogo({ className }: { className: string }) {
  return <img className={className} src="/producto/index/assets/brand/logo-voyager.svg" alt="VMC Subastas" />;
}

// Shell = HomeIndexRebase (mismas clases y piezas), sin los controles QA ni el feed del Index.
export default function ValorizaLanding(): JSX.Element {
  const [sidebarHeight, setSidebarHeight] = useState(900);
  const [collapsed, setCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const resize = () => setSidebarHeight(Math.max(720, window.innerHeight));
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <div className={shell.desktopShell} data-collapsed={collapsed || undefined}>
        <Header width="100%" />
        <aside className={shell.sidebarRail} aria-label="Navegación de VMC">
          <Sidebar height={sidebarHeight} contentHeight={sidebarHeight} headerHeight={64} logo={<BrandLogo className={shell.brandLogo} />}
            collapsed={collapsed} onCollapsedChange={setCollapsed} />
        </aside>
        <main className={shell.mainColumn}><ValorizaBody id="d" /></main>
      </div>
      <div className={shell.mobileShell}>
        <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen}>
          <Header width="100%" logo={
            <div className={shell.mobileBrand}>
              <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
              <BrandLogo className={shell.mobileLogo} />
            </div>
          } />
          <ValorizaBody id="m" />
        </SidebarMobile>
      </div>
    </>
  );
}
