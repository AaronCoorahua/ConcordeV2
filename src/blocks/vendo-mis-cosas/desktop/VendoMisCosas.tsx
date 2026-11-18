"use client";

/**
 * Bloque Vendo Mis Cosas: landing de venta de artículos (v1, 17/11/2026, de mi-garaje-lab · models/vendo-mis-cosas, 9a0fa2b).
 * Misma estructura que Valoriza: LandingShell (marco del Index), Button, GlassButton (GLASS_CSS) y Vidrio de Concorde.
 * Solo cambia el contenido de la columna principal y el prefijo CSS (.vm-).
 * Contenido: deck de campaña LFP + prototipo del formulario multicategoría + propuesta v4 (fuentes en VENDO-MIS-COSAS.md del lab).
 * Regla de color: naranjas SOLO de --vmc-color-orange-* (600 sobre claro, 400 sobre oscuro).
 * Sin backend ni cifras: costo de publicar, modalidad y plazos siguen sin confirmar y no se muestran.
 * Los vehículos siguen su propio recorrido (Valorizar → Publicar); esta landing es para artículos.
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/components/Button";
import { GLASS_CSS } from "@/src/components/GlassButton";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import LandingShell from "@/src/blocks/landing-shell/desktop/LandingShell";
export { VENDO_MIS_COSAS_WIDTH, VENDO_MIS_COSAS_HEIGHT, VENDO_MIS_COSAS_MOBILE_WIDTH, VENDO_MIS_COSAS_MOBILE_HEIGHT } from "./dimensions";

// PENDIENTE: el flujo «Publicar un artículo» aún no está en Concorde; mientras tanto el CTA lleva a Mi Garaje,
// donde la propuesta v4 ubica «Publicar». Cambiar esta constante cuando exista la ruta.
const PUBLICAR = "/blocks/mi-garaje/m/vmc";
const VALUAR = "/blocks/mi-garaje/m/vmc-valuar";
const IMG = "/vendo-mis-cosas";

// Copy con la lógica de Valoriza: cada paso es algo que hace la persona; el texto vende el beneficio y explica el problema
// una sola vez (bloque central). Nada de repetir «VMC revisa» ni «identidad real» en cada bloque.
const STEPS: { icon: Sec; label: string }[] = [
  { icon: "publicar", label: "Tomas unas fotos" },
  { icon: "articulos", label: "Eliges la categoría" },
  { icon: "publicaciones", label: "Pones tu precio" },
  { icon: "compras", label: "Publicas y vendes" },
];

const PERKS: { icon: Sec; title: string; text: string }[] = [
  { icon: "articulos", title: "De todo", text: "Tecnología, hogar, más" },
  { icon: "publicaciones", title: "Tu precio", text: "Lo pones tú" },
  { icon: "texto", title: "Formulario corto", text: "Fotos, título y precio" },
];

// Qué puedes vender: departamentos del prototipo v4 (taxonomía demostrativa, pendiente la oficial).
const EXPECT: { icon: Sec; title: string; text: string }[] = [
  { icon: "articulos", title: "Tecnología", text: "Laptops, celulares, consolas, audio, cámaras y TV." },
  { icon: "mobiliario", title: "Hogar y muebles", text: "Sofás, mesas, sillas, camas e iluminación." },
  { icon: "equipos", title: "Herramientas y oficina", text: "Herramientas, equipos industriales y de oficina." },
  { icon: "publicar", title: "Y mucho más", text: "Electrodomésticos, instrumentos musicales y lo que ya no usas." },
];

// Dos usos: artículos (este recorrido) y autos (su recorrido propio, Valorizar → Publicar).
const USES = [
  { img: `${IMG}/uso-vender.jpg`, href: PUBLICAR, title: "¿Tienes algo que vender?", text: "Publícalo y llega a quienes ya compran en VMC." },
  { img: `${IMG}/vende-auto.jpg`, href: VALUAR, title: "¿Vendes tu auto?", text: "Primero conoce su valor y luego publícalo." },
];

// «Lo que debes saber»: lo que pide el formulario (prototipo v4), en lenguaje llano.
const KNOW = [
  "Unas buenas fotos de tu artículo.",
  "Un título claro y cómo está: nuevo, usado, con detalles.",
  "Su categoría, y marca y modelo si los tiene.",
  "Tu precio en soles. Antes de publicar, revisas todo.",
];

const FAQ: [string, string][] = [
  ["¿Qué es Vendo Mis Cosas?", "Es lo nuevo de VMC. Además de autos, ahora puedes vender lo que ya no usas: tecnología, muebles, herramientas y más."],
  ["¿Qué puedo vender?", "Tecnología, electrodomésticos, muebles, herramientas, instrumentos musicales y más. Eliges la categoría al publicar."],
  ["¿Cómo publico un artículo?", "Sube tus fotos, escribe un título y una descripción, elige la categoría y pon tu precio. Revisas todo y publicas."],
  ["¿Quién pone el precio?", "Tú. Lo escribes en soles cuando publicas."],
  ["¿Cómo se coordina la entrega?", "Indicas dónde está tu artículo al publicar. La entrega y sus costos se confirman antes de que tu publicación salga."],
  ["¿Y si quiero vender mi auto?", "Tu auto tiene su propio recorrido: primero lo valorizas y luego lo publicas desde Mi Garaje."],
  ["¿Dónde veo mis publicaciones?", "En Mi Garaje, en Mis publicaciones."],
];

// Contenido: un solo componente para escritorio y móvil (el shell lo monta en ambos lienzos).
function VendoBody({ id }: { id: "d" | "m" }): JSX.Element {
  const router = useRouter();
  const publicar = () => router.push(PUBLICAR);
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
    const el = [...document.querySelectorAll<HTMLElement>("[data-vm='pasos']")].find((n) => n.offsetParent !== null);
    el?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="vm">
      {/* ── Hero ── */}
      <section className="vm-hero" ref={hero} aria-label="Vendo Mis Cosas">
        <div className="vm-hero__photo"><img src={`${IMG}/hero.jpg`} alt="" fetchPriority="high" /></div>
        <div className="vm-hero__copy">
          <h1>Eso que ya no usas, <em>alguien lo quiere</em></h1>
          <p>Esa tele, esa laptop, esa lavadora. Tómale fotos, ponle precio y véndela en VMC.</p>
          <div className="vm-hero__actions">
            <Button variant="primary" onClick={publicar}>Quiero vender algo</Button>
            <button type="button" className="hib-glass" onClick={toSteps}>Ver cómo funciona</button>
          </div>
        </div>
      </section>
      <div className="vm-proof">
        <p className="vm-proof__brand"><strong>Vendo Mis Cosas</strong><span>Tus cosas, tu precio, tu decisión</span></p>
        <ul aria-label="Cómo vendes en VMC">
          {PERKS.map((p) => (
            <li key={p.title}><Vidrio s={p.icon} size={32} /><div><strong>{p.title}</strong><span>{p.text}</span></div></li>
          ))}
        </ul>
      </div>

      {/* ── ¿Cómo funciona? (fila de pasos como en Subascars) ── */}
      <section className="vm-card vm-steps" data-vm="pasos" aria-label="Cómo funciona">
        <p className="vm-label">¿Cómo funciona?</p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.label}><Vidrio s={s.icon} size={36} /><span><small>Paso {i + 1}</small>{s.label}</span></li>
          ))}
        </ol>
      </section>

      {/* ── Beneficio (idea central del deck: VMC = Vendo Mis Cosas) ── */}
      <section className="vm-card vm-center" aria-label="Por qué vender en VMC">
        <p className="vm-pill">Lo nuevo de VMC</p>
        <h2 className="vm-title">Lo que ya no usas <span>también tiene comprador</span></h2>
        <p className="vm-lead">Vender por tu cuenta es responder chats, regatear y no saber quién va a tocar tu puerta. En VMC llegas a gente que ya compra aquí y <b>el precio lo pones tú</b>.</p>
        <dl className="vm-stats">
          <div><dt>Antes</dt><dd>Vendo Mi Carro</dd></div>
          <div><dt>Ahora</dt><dd>Vendo Mis Cosas</dd></div>
        </dl>

        {/* ── Qué puedes vender ── */}
        <p className="vm-pill">Qué puedes vender</p>
        <h2 className="vm-title">Vende de todo, <span>no solo autos</span></h2>
        <ul className="vm-expect">
          {EXPECT.map((e) => <li key={e.title}><Vidrio s={e.icon} size={40} /><h3>{e.title}</h3><p>{e.text}</p></li>)}
        </ul>

        {/* ── Lo que debes saber: lo que pide el formulario + pantalla del formulario (propuesta v4) ── */}
        <p className="vm-pill">Fácil de publicar</p>
        <h2 className="vm-title">Tu próxima venta <span>empieza con una foto</span></h2>
        <p className="vm-lead">Un solo formulario, sin vueltas. Al final <b>revisas todo antes de publicar</b>.</p>
        <div className="vm-know">
          <article className="vm-know__card">
            <header><small>¿Qué necesitas para</small>publicar tu artículo?</header>
            <div>
              <p className="vm-label">Lo que debes saber</p>
              <ul>{KNOW.map((k) => <li key={k}>{k}</li>)}</ul>
            </div>
          </article>
          <div className="vm-know__phone" aria-hidden>
            <img src={`${IMG}/formulario.png`} alt="" width={390} height={844} loading="lazy" />
          </div>
        </div>
        <Button variant="primary" onClick={publicar}>Publicar mi artículo</Button>
      </section>

      {/* ── Banner comercial (lugar del banner de WhatsApp de Subascars) + franja de vidrio con los dos usos,
             mismo patrón que hero + franja. Un solo CTA principal; las opciones son enlaces secundarios. ── */}
      <section className="vm-use" aria-label="Vende en VMC">
        <div className="vm-sell">
          <div className="vm-sell__photo"><img src={`${IMG}/banner.jpg`} alt="" loading="lazy" /></div>
          <p className="vm-sell__kicker">Miles de compradores ya entran a VMC</p>
          <h2>¿Listo para hacer espacio? <span>Véndelo en VMC</span></h2>
          <p>Lo que para ti estorba, para otro es justo lo que buscaba.</p>
          <Button variant="primary" onClick={publicar}>Publicar un artículo</Button>
        </div>
        <ul className="vm-use__opts">
          {USES.map((u) => (
            <li key={u.title}>
              <a href={u.href}>
                <img src={u.img} alt="" loading="lazy" />
                <span><strong>{u.title}</strong>{u.text}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M7.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Preguntas frecuentes ── */}
      <section className="vm-card vm-faq" aria-label="Preguntas frecuentes">
        <h2 className="vm-title">Preguntas frecuentes</h2>
        {/* name compartido: acordeón exclusivo nativo; un grupo por copia escritorio/móvil. */}
        <div className="vm-faq__list">
          {FAQ.map(([q, a], i) => (
            <details key={q} name={`vm-faq-${id}`}>
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
      <section className="vm-help" ref={close} aria-label="Centro de Ayuda">
        <div><h2>Centro de Ayuda</h2><p>Respuestas rápidas a todas tus dudas</p></div>
        <a className="hib-glass" href="https://www.vmcsubastas.com/centro-de-ayuda">Ir al Centro de Ayuda</a>
      </section>

      {/* CTA fijo inferior (solo móvil). */}
      <div className="vm-dock" data-on={pastHero || undefined} aria-hidden={!pastHero}>
        <Button variant="primary" onClick={publicar} tabIndex={pastHero ? 0 : -1}>Quiero vender algo</Button>
      </div>
      <style>{GLASS_CSS + VM_CSS}</style>
    </div>
  );
}

const VM_CSS = `
.vm { --ink: #191C1C; --muted: #6B6878; --v900: #1C0B4F; --v800: #2E0F70; --v700: #3B1782; --v500: #8460E5; --lav: #F5F0FF; --line: #ECE6FB; --peach: var(--vmc-color-orange-400, #FBC47D); --orange: var(--vmc-color-orange-600, #ED8936);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%; padding: 16px 16px 64px; box-sizing: border-box; display: grid; gap: 16px; background: #fff; font-family: var(--vmc-font-display); color: var(--ink); }
.vm *, .vm *::before, .vm *::after { box-sizing: border-box; }
.vm ::selection { background: #E8DDFF; color: #22005C; }
.vm h1, .vm h2, .vm h3 { text-wrap: balance; }
.vm em { font-style: normal; }

/* Hero: anatomía .hp del Index, bajo (como el banner de Subascars, un poco más alto por la franja). */
.vm-hero { position: relative; isolation: isolate; height: 320px; overflow: hidden; border-radius: 20px; color: #fff; background: var(--v800);
  box-shadow: 0 24px 48px -28px rgba(34,0,92,0.55); }
.vm-hero__photo { position: absolute; top: 0; right: 0; bottom: 0; width: 62%;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 34%); mask-image: linear-gradient(90deg, transparent 0%, #000 34%); }
.vm-hero__photo img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 40%; display: block; }
.vm-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(60% 80% at 0% 100%, rgba(237,137,54,0.28), transparent 60%); }
.vm-hero__copy { position: absolute; top: 0; bottom: 36px; left: 36px; width: 57%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 14px; }
.vm-hero h1 { margin: 0; max-width: 17ch; font-size: clamp(34px, 4.2vw, 44px); line-height: 1.04; font-weight: 800; letter-spacing: -0.035em; }
.vm-hero h1 em { color: var(--peach); }
.vm-hero p { margin: 0; max-width: 40ch; font-size: 14px; line-height: 21px; font-weight: 500; color: #E8DDFF; }
.vm-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.vm-hero__actions .hib-glass { height: 40px; }

/* Franja de vidrio montada sobre el borde del hero (como «Formato de publicación» en Subascars). */
.vm-proof { position: relative; z-index: 2; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 8px; margin: -52px 28px 0; padding: 12px 8px 12px 20px;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.82);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vm-proof__brand { margin: 0; padding-right: 20px; border-right: 1px solid #E4DCF8; }
.vm-proof__brand strong { display: block; font-size: 17px; line-height: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vm-proof__brand span { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--orange); }
.vm-proof ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.vm-proof li { display: flex; align-items: center; gap: 12px; padding: 0 16px; min-width: 0; }
.vm-proof li + li { border-left: 1px solid #E4DCF8; }
.vm-proof strong { display: block; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vm-proof span { display: block; font-size: 12px; line-height: 16px; color: var(--muted); }

/* Tarjetas blancas del cuerpo (mismo lenguaje de Subascars: bloques blancos sobre el lienzo). */
.vm-card { border-radius: 20px; background: #fff; border: 1px solid var(--line); box-shadow: 0 12px 28px -24px rgba(59,23,130,0.35); padding: 24px; }
.vm-label { margin: 0; font-size: 12px; line-height: 16px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--v700); }

/* ¿Cómo funciona? */
.vm-steps { display: grid; gap: 14px; scroll-margin-top: 80px; }
.vm-steps ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; counter-reset: none; }
.vm-steps li { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 14px; background: var(--lav); border: 1px solid var(--line); }
.vm-steps li span { display: grid; font-size: 14px; line-height: 18px; font-weight: 800; color: var(--v700); }
.vm-steps li small { font-size: 11px; line-height: 14px; font-weight: 700; color: var(--orange); }

/* Bloques centrados: píldora, titular, bajada, cifras. */
.vm-center { display: grid; justify-items: center; text-align: center; gap: 14px; padding: 40px 32px; }
.vm-pill { margin: 0; padding: 4px 14px; border-radius: 999px; font-size: 12px; line-height: 18px; font-weight: 700; color: var(--orange); background: #fff; border: 1px solid var(--orange); }
.vm-center .vm-pill:not(:first-child) { margin-top: 40px; }
.vm-title { margin: 0; max-width: 22ch; font-size: 36px; line-height: 1.1; font-weight: 800; letter-spacing: -0.035em; color: var(--v700); }
.vm-title span { color: var(--v500); }
.vm-lead { margin: 0; max-width: 58ch; font-size: 15px; line-height: 23px; color: var(--muted); }
.vm-lead b { color: var(--v700); }
.vm-stats { display: flex; gap: 48px; margin: 8px 0 0; }
.vm-stats div { display: grid; gap: 2px; }
.vm-stats dt { font-size: 30px; line-height: 36px; font-weight: 800; letter-spacing: -0.03em; color: var(--v500); }
.vm-stats dd { margin: 0; font-size: 13px; font-weight: 700; color: var(--v700); }

/* Lo que debes saber: tarjeta con checklist + pantalla real (en lugar del video de Subascars). */
.vm-know { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 20px; width: 100%; max-width: 640px; margin: 8px 0; text-align: left; }
.vm-know__card { overflow: hidden; border-radius: 18px; border: 1px solid var(--line); background: #fff; box-shadow: 0 16px 32px -24px rgba(59,23,130,0.45); }
.vm-know__card header { padding: 18px 20px; color: #fff; font-size: 20px; line-height: 24px; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(120deg, #32136F 0%, #4E22A9 60%, #7B4BE3 100%); }
.vm-know__card header small { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: #DCCFFF; letter-spacing: 0; }
.vm-know__card > div { display: grid; gap: 12px; padding: 18px 20px 20px; }
.vm-know__card .vm-label { color: var(--muted); font-size: 11px; }
.vm-know__card ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.vm-know__card li { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 10px; font-size: 13px; line-height: 19px; font-weight: 600; color: var(--v700); }
.vm-know__card li::before { content: ""; width: 20px; height: 20px; border-radius: 50%;
  background: var(--orange) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4.5 8.2l2.3 2.3 4.7-5' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 16px no-repeat; }
.vm-know__phone { display: grid; place-items: center; border-radius: 18px; border: 1px solid #CDBDF5; background: linear-gradient(180deg, var(--lav), #fff); overflow: hidden; }
/* La pantalla v4 viene sin marco de celular: se le pone uno con borde y radio. */
.vm-know__phone img { width: auto; height: 300px; margin: 20px 0; border: 5px solid var(--v900); border-radius: 26px; background: #fff; box-shadow: 0 18px 24px -8px rgba(34,0,92,0.3); }

/* Qué esperar: cuatro tarjetas con ícono. */
.vm-expect { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; width: 100%; margin: 8px 0 0; padding: 0; list-style: none; text-align: left; }
.vm-expect li { display: grid; align-content: start; gap: 8px; padding: 18px 16px; border-radius: 16px; background: var(--lav); border: 1px solid var(--line); }
.vm-expect h3 { margin: 4px 0 0; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vm-expect p { margin: 0; font-size: 13px; line-height: 19px; color: var(--muted); }

/* Banner de venta + franja de vidrio con los dos usos (vender / comprar). */
.vm-use { display: grid; }
.vm-sell { position: relative; overflow: hidden; isolation: isolate; display: grid; align-content: center; justify-items: start; gap: 10px; min-height: 240px; padding: 32px 36px 72px; border-radius: 20px; color: #fff;
  background: radial-gradient(90% 120% at -10% 120%, rgba(239,133,46,0.85) 0%, rgba(239,133,46,0.3) 30%, transparent 58%), linear-gradient(120deg, #32136F 0%, #4E22A9 60%, #7B4BE3 100%); }
.vm-sell__kicker { margin: 0; font-size: 12px; line-height: 16px; font-weight: 700; color: var(--peach); }
.vm-sell h2 { margin: 0; max-width: 18ch; font-size: 30px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; }
.vm-sell h2 span { display: block; color: var(--peach); }
.vm-sell > p:not(.vm-sell__kicker) { margin: 0 0 6px; max-width: 40ch; font-size: 14px; line-height: 21px; color: rgba(255,255,255,0.86); }
/* Foto de campaña a la derecha, fundida con el degradado (misma receta que .vm-hero__photo). */
.vm-sell__photo { position: absolute; z-index: -1; top: 0; right: 0; bottom: 0; width: 46%; pointer-events: none;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 40%); mask-image: linear-gradient(90deg, transparent 0%, #000 40%); }
.vm-sell__photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block; }
.vm-use__opts { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: -48px 28px 0; padding: 8px; list-style: none;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.86);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vm-use__opts li + li { border-left: 1px solid #E4DCF8; }
.vm-use__opts a { display: grid; grid-template-columns: 72px minmax(0, 1fr) 20px; align-items: center; gap: 14px; padding: 8px 12px 8px 8px; border-radius: 12px;
  color: var(--muted); font-size: 13px; line-height: 18px; text-decoration: none; transition: background-color 200ms var(--ease); }
.vm-use__opts a:hover { background: var(--lav); }
.vm-use__opts a:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vm-use__opts img { width: 72px; height: 56px; border-radius: 10px; object-fit: cover; display: block; }
.vm-use__opts strong { display: block; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vm-use__opts svg { color: var(--orange); transition: transform 200ms var(--ease); }
.vm-use__opts a:hover svg { transform: translateX(3px); }

/* Preguntas frecuentes: título centrado y tarjetas numeradas (como Subascars), <details> nativo. */
.vm-faq { display: grid; gap: 20px; padding: 32px 24px; }
.vm-faq .vm-title { justify-self: center; text-align: center; }
.vm-faq__list { display: grid; gap: 8px; }
.vm-faq details { border-radius: 14px; background: #fff; border: 1px solid var(--line); box-shadow: 0 6px 16px -14px rgba(59,23,130,0.4); transition: background-color 240ms var(--ease), border-color 240ms var(--ease); }
.vm-faq details:hover { border-color: #CDBDF5; }
.vm-faq details[open] { background: var(--lav); border-color: #CDBDF5; }
.vm-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; padding: 0 14px 0 20px;
  cursor: pointer; list-style: none; font-size: 15px; line-height: 21px; font-weight: 700; color: var(--v700); border-radius: 14px; }
.vm-faq summary::-webkit-details-marker { display: none; }
.vm-faq summary:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vm-faq summary i { position: relative; flex: none; width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid var(--line); transition: background-color 240ms var(--ease); }
.vm-faq summary i::before, .vm-faq summary i::after { content: ""; position: absolute; top: 50%; left: 50%; width: 10px; height: 2px; margin: -1px 0 0 -5px; border-radius: 2px; background: var(--v500); transition: transform 280ms var(--ease), background-color 240ms; }
.vm-faq summary i::after { transform: rotate(90deg); }
.vm-faq details[open] summary i { background: var(--v700); border-color: var(--v700); }
.vm-faq details[open] summary i::before, .vm-faq details[open] summary i::after { background: #fff; }
.vm-faq details[open] summary i::after { transform: rotate(0deg); }
.vm-faq details p { margin: 0; padding: 0 20px 18px; max-width: 70ch; font-size: 14px; line-height: 22px; color: var(--muted); }
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    .vm-faq { interpolate-size: allow-keywords; }
    .vm-faq details::details-content { block-size: 0; overflow: clip; opacity: 0;
      transition: block-size 320ms var(--ease), opacity 240ms ease, content-visibility 320ms allow-discrete; }
    .vm-faq details[open]::details-content { block-size: auto; opacity: 1; }
  }
}

/* Centro de Ayuda: banner final con el degradado de la marca. */
.vm-help { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 28px; border-radius: 20px; color: #fff;
  background: linear-gradient(90deg, #B4602A 0%, #5B2AB8 45%, #2E0F70 100%); }
.vm-help h2 { margin: 0; font-size: 20px; line-height: 26px; font-weight: 800; }
.vm-help p { margin: 2px 0 0; font-size: 13px; line-height: 18px; color: #E8DDFF; }
.vm-help .hib-glass { height: 40px; padding-inline: 20px; white-space: nowrap; }

.vm-dock { display: none; }

@media (max-width: 1023px) {
  .vm { padding: 14px 14px 104px; gap: 12px; }
  .vm-hero { height: auto; display: flex; flex-direction: column; border-radius: 18px; }
  .vm-hero__photo { position: relative; width: 100%; height: 200px; -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent 100%); mask-image: linear-gradient(180deg, #000 60%, transparent 100%); }
  .vm-hero__photo img { object-position: 62% 35%; }
  .vm-hero__copy { position: relative; left: 0; bottom: 0; width: 100%; padding: 0 20px 64px; margin-top: -28px; gap: 12px; }
  .vm-hero h1 { font-size: 34px; }
  .vm-hero__actions { width: 100%; }
  .vm-hero__actions > * { flex: 1 1 100%; }
  .vm-hero__actions .pvbtn { white-space: nowrap; padding-inline: 16px; }
  .vm-proof { grid-template-columns: minmax(0, 1fr); margin: -52px 12px 0; padding: 14px 4px 6px; }
  .vm-proof__brand { padding: 0 12px 10px; border-right: 0; border-bottom: 1px solid #E4DCF8; }
  .vm-proof ul { grid-template-columns: minmax(0, 1fr); }
  .vm-proof li { padding: 10px 12px; }
  .vm-proof li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vm-card { padding: 20px 16px; }
  .vm-steps ol { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .vm-steps li { flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px; }
  .vm-center { padding: 32px 16px; }
  .vm-title { font-size: 26px; }
  .vm-stats { gap: 32px; }
  .vm-stats dt { font-size: 26px; }
  .vm-know { grid-template-columns: minmax(0, 1fr); }
  .vm-know__phone img { height: 280px; }
  .vm-center .pvbtn { width: 100%; }
  .vm-expect { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .vm-expect li { padding: 14px 12px; }
  .vm-sell { padding: 24px 20px 260px; }
  .vm-sell h2 { font-size: 24px; }
  .vm-sell .pvbtn { width: 100%; }
  .vm-sell__photo { top: auto; left: 0; width: 100%; height: 260px; -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 35%); mask-image: linear-gradient(180deg, transparent 0%, #000 35%); }
  .vm-use__opts { grid-template-columns: minmax(0, 1fr); margin: -48px 12px 0; padding: 4px; }
  .vm-use__opts li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vm-faq { padding: 24px 12px; }
  .vm-faq summary { padding: 0 12px 0 16px; }
  .vm-faq details p { padding: 0 16px 16px; }
  .vm-help { flex-direction: column; align-items: flex-start; padding: 20px; }
  .vm-help .hib-glass { width: 100%; justify-content: center; }
  .vm-dock { display: block; position: fixed; left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom)); z-index: 40; padding: 8px; border-radius: 999px;
    background: rgba(255,255,255,0.86); border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 18px 36px -16px rgba(34,0,92,0.45);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    transform: translateY(calc(100% + 24px)); opacity: 0; transition: transform 420ms var(--ease), opacity 240ms ease; }
  .vm-dock[data-on] { transform: none; opacity: 1; }
  .vm-dock .pvbtn { width: 100%; white-space: nowrap; }
}
@media (prefers-reduced-motion: reduce) {
  .vm-dock { transition: none; }
}
`;

// Marco = LandingShell (el del Index: Header, Sidebar y drawer en celular).
export default function VendoMisCosas(): JSX.Element {
  return <LandingShell body={(id) => <VendoBody id={id} />} />;
}
