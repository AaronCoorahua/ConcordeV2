"use client";

/**
 * Landing «Valoriza» (nueva, 16/11/2026 · v2). Vive dentro del shell del Index (HomeIndexRebase): mismo Header,
 * Sidebar, SidebarMobile, lienzo de 1024 y CSS module; solo cambia el contenido de la columna principal.
 * Reutiliza del Index: el botón de vidrio (GLASS_CSS), Button/ProfileButton de Concorde, íconos Vidrio
 * y tokens del hero (.hp). Copy y pantallas reales: campaña «Valoriza y Vende» (correos).
 * Regla Stage 1: la valorización es un valor REFERENCIAL con fecha, nunca un precio fijo de venta.
 * Sin backend: los CTA llevan al prototipo de valorización/publicación ya integrado (datos simulados).
 *
 * v2 (tendencias 2026): recorrido «scrollytelling» con CSS scroll-driven (celular fijo que cambia de pantalla),
 * bento grid persuasivo (A vs B) y CTA fijo inferior en móvil. Todo el movimiento es transform/opacity, visible
 * por defecto y desactivado con prefers-reduced-motion o sin soporte (entonces cada paso trae su propia pantalla).
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { useRouter } from "next/navigation";

import { Button, Header, ProfileButton, Sidebar, SidebarMenuButton, SidebarMobile } from "@/src/product/index/adapter";
import shell from "@/src/product/index/view/HomeIndexRebase.module.css";
import { GLASS_CSS } from "@/src/product/index/view/glass";
import { Vidrio, type Sec } from "@/src/product/index/view/Vidrio";

const VALUAR = "/producto/mi-garaje/m/vmc-valuar";
const IMG = "/correos/campana-valoriza";

// Conocimiento AVT: ver ./AVT.md (contrato relevado del código de avt-ai y del lab de VMC-Laptop).
const STEPS: { img: string; alt: string; title: string; text: string; tag: string }[] = [
  { img: "formulario.png", alt: "Formulario de valorización con marca, año, kilómetros, modelo y versión", title: "Cuéntanos de tu auto", tag: "Toma alrededor de 1 minuto",
    text: "Marca, año, kilómetros, modelo y versión. ¿Quieres más precisión? Responde hasta 12 detalles más." },
  { img: "resultado.png", alt: "Resultado de la valorización con su proyección y los botones Guardar y Publicar", title: "Mira cuánto vale hoy", tag: "Valor de mercado con fecha",
    text: "Tu valor de mercado con fecha y cómo cambiará en los próximos 12 meses." },
  { img: "mi-garaje.png", alt: "Mi Garaje con los accesos Publica tu vehículo y Valoriza tu vehículo", title: "Guárdalo en Mi Garaje", tag: "Queda guardado con su fecha",
    text: "Queda guardado con su fecha para que lo revises cuando quieras." },
  { img: "propuestas.png", alt: "Propuestas activas de compradores en Mi Garaje", title: "Publica cuando quieras", tag: "Tú eliges qué propuesta aceptar",
    text: "Usa tu valorización para publicar. Los compradores te hacen propuestas y tú decides." },
];

const PERKS: { icon: Sec; title: string; text: string }[] = [
  { icon: "verificado", title: "Gratis", text: "Sin compromiso" },
  { icon: "fecha", title: "1 minuto", text: "Para tu valor base" },
  { icon: "docs", title: "12 detalles", text: "Opcionales" },
];

// Fórmula de AVT en lenguaje llano (base VRN/MSRP → depreciación, estacionalidad y km → detalles → valor). Sin cifras internas.
const FORMULA: { icon: Sec; op?: string; title: string; text: string }[] = [
  { icon: "precio", title: "Precio de lista", text: "Partimos de lo que costaba tu versión cuando era nueva." },
  { icon: "km", op: "−", title: "Tiempo y kilómetros", text: "Restamos lo que pierde con los años, la temporada y el recorrido." },
  { icon: "verificado", op: "±", title: "Tus respuestas", text: "Ajustamos según su estado, historial y equipamiento." },
  { icon: "valorizaciones", op: "=", title: "Valor de mercado de hoy", text: "Con fecha. Es una referencia, no una oferta de compra." },
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

const COMPARE: { factor: string; a: string; b: string }[] = [
  { factor: "Kilometraje", a: "45,000 km", b: "140,000 km" },
  { factor: "Choques", a: "Ninguno", b: "Uno, por reparar" },
  { factor: "Mantenimiento", a: "Al día", b: "Sin historial" },
];

// Contenido: un solo componente para escritorio y móvil (el shell lo monta en ambos lienzos).
function ValorizaBody({ id }: { id: "d" | "m" }): JSX.Element {
  const router = useRouter();
  const valuar = () => router.push(VALUAR);
  const hero = useRef<HTMLElement>(null);
  const close = useRef<HTMLElement>(null);
  const [pastHero, setPastHero] = useState(false);
  // CTA fijo del móvil: aparece cuando el CTA del hero sale de pantalla (un observer, sin scroll handler).
  useEffect(() => {
    const el = hero.current, end = close.current;
    if (!el || !end) return;
    // Visible entre el hero y el cierre (que ya trae su propio CTA).
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
  const toStory = () => {
    const el = [...document.querySelectorAll<HTMLElement>("[data-vz='pasos']")].find((n) => n.offsetParent !== null);
    el?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="vz">
      {/* ── Hero ── */}
      <section className="vz-hero" ref={hero} aria-label="Valoriza tu auto">
        <div className="vz-hero__photo"><img src="/producto/index/banners/vmc/valoriza-auto.jpg" alt="" fetchPriority="high" /></div>
        <div className="vz-hero__card">
          <p>Tu valorización incluye</p>
          <ul>
            <li><Vidrio s="valorizaciones" size={26} /><span>Valor de mercado<small>Con fecha de hoy</small></span></li>
            <li><Vidrio s="crecimiento" size={26} /><span>Proyección<small>A 12 meses</small></span></li>
            <li><Vidrio s="auto" size={26} /><span>Vehículos similares<small>En el mercado</small></span></li>
          </ul>
        </div>
        <div className="vz-hero__copy">
          <h1>¿Cuánto vale tu auto <em>hoy</em>?</h1>
          <p>Gratis, en un minuto y sin compromiso. Sabrás cuánto pedir antes de publicar.</p>
          <div className="vz-hero__actions">
            <Button variant="primary" onClick={valuar}>Quiero saber cuánto vale</Button>
            <button type="button" className="hib-glass" onClick={toStory}>Ver cómo funciona</button>
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

      {/* ── Recorrido: escena fijada. Un solo timeline (la pista) mueve celular, etiqueta, texto y progreso: siempre en sincronía. ── */}
      <section className="vz-story" data-vz="pasos" aria-label="Cómo funciona">
        <header className="vz-story__head">
          <h2>¿Cómo funciona? <em>En cuatro pasos</em></h2>
          <p>Así se ve en tu celular.</p>
        </header>
        <div className="vz-story__track">
          <div className="vz-story__stage">
            <div className="vz-story__phone" aria-hidden>
              {STEPS.map((s) => <img key={s.img} src={`${IMG}/cel/${s.img}`} alt="" width={460} height={867} />)}
              {STEPS.map((s) => <span key={s.tag} className="vz-story__tag">{s.tag}</span>)}
            </div>
            <div className="vz-story__panel">
              <div className="vz-story__rail" aria-hidden>{STEPS.map((s) => <span key={s.img}><i /></span>)}</div>
              <ol className="vz-story__steps">
                {STEPS.map((s, i) => (
                  <li key={s.img}>
                    <img className="vz-story__inline" src={`${IMG}/cel/${s.img}`} alt={s.alt} width={460} height={867} loading="lazy" />
                    <span className="vz-story__n">Paso {i + 1} de {STEPS.length}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cómo calcula AVT: fórmula visual (equivale a «¿Sabes cómo funciona…?» de landing-subascars) ── */}
      <section className="vz-know" aria-label="Cómo calcula AVT">
        <header className="vz-h2">
          <h2>Así calcula AVT <em>el valor de tu auto</em></h2>
          <p>Con datos reales del mercado peruano. Sin cajas negras.</p>
        </header>
        <ol className="vz-formula">
          {FORMULA.map((f) => (
            <li key={f.title} className={f.op === "=" ? "is-result" : undefined}>
              {f.op ? <span className="vz-formula__op" aria-hidden>{f.op}</span> : null}
              <Vidrio s={f.icon} size={40} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>
        <div className="vz-know__cta">
          <Button variant="primary" onClick={valuar}>Valorizar mi auto</Button>
          <span>Los detalles son opcionales: tú decides cuánta precisión quieres.</span>
        </div>
      </section>

      {/* ── Bento: por qué valorizar ── */}
      <section className="vz-why" aria-label="Por qué valorizar">
        <header className="vz-h2">
          <h2>¿Por qué valorizar? <em>Porque no todos valen igual</em></h2>
          <p>El precio de un aviso no es el valor de tu auto.</p>
        </header>
        <div className="vz-bento">
          <article className="vz-tile vz-tile--ab">
            <div className="vz-ab__intro">
              <h3>Mismo modelo y año. <span>Distinto valor.</span></h3>
              <p>El recorrido, los choques y el mantenimiento cambian el precio. AVT los toma en cuenta.</p>
              <img src={`${IMG}/yaris.jpg`} alt="Auto hatchback blanco: el mismo modelo y año para los dos casos" loading="lazy" />
            </div>
            <table className="vz-ab">
              <caption className="vz-sr">Comparación de dos autos del mismo modelo y año</caption>
              <thead><tr><th scope="col"><span className="vz-sr">Factor</span></th><th scope="col"><b className="is-high">Auto A</b></th><th scope="col"><b>Auto B</b></th></tr></thead>
              <tbody>
                {COMPARE.map((r) => <tr key={r.factor}><th scope="row">{r.factor}</th><td>{r.a}</td><td>{r.b}</td></tr>)}
              </tbody>
              <tfoot>
                <tr><th scope="row">Valor</th>
                  <td><span className="vz-ab__bar is-high" aria-hidden><i /></span><strong className="is-high">Vale más</strong></td>
                  <td><span className="vz-ab__bar" aria-hidden><i /></span><strong>Vale menos</strong></td></tr>
              </tfoot>
            </table>
          </article>

          <article className="vz-tile vz-tile--photo">
            <img src={`${IMG}/vender.jpg`} alt="" loading="lazy" />
            <div><h3>¿Vas a vender?</h3><p>Sabrás cuánto pedir antes de publicar.</p>
              <ProfileButton href={VALUAR}>Valoriza tu auto</ProfileButton></div>
          </article>
          <article className="vz-tile vz-tile--photo">
            <img src={`${IMG}/comprar.jpg`} alt="" loading="lazy" />
            <div><h3>¿Te interesa un auto?</h3><p>Revisa si su precio es justo antes de proponer.</p>
              <ProfileButton href={VALUAR}>Valorízalo antes</ProfileButton></div>
          </article>

          <article className="vz-tile vz-tile--sell">
            <img className="vz-sell__person" src="/producto/index/demo/sell/seller-phone-man.png" alt="" loading="lazy" />
            <h3>¿Listo para vender? Empieza por su valor</h3>
            <p>Miles de compradores ya entran a VMC. Publicar empieza valorizando: así tu precio tiene sustento.</p>
            <a className="hib-glass" href={VALUAR}>Valorizar y publicar</a>
          </article>
        </div>
      </section>

      {/* ── Dudas frecuentes (objeciones antes del CTA final; solo hechos confirmados) ── */}
      <section className="vz-faq" aria-label="Preguntas frecuentes">
        <div className="vz-faq__aside">
          <header className="vz-h2">
            <h2>Preguntas frecuentes</h2>
            <p>Lo que suelen preguntar antes de valorizar.</p>
          </header>
          <div className="vz-faq__help">
            <Vidrio s="docs" size={36} />
            <p><b>¿No encuentras tu duda?</b>En el Centro de Ayuda está todo sobre valorizar, publicar y vender en VMC.</p>
            <ProfileButton href="https://www.vmcsubastas.com/centro-de-ayuda">Ir al Centro de Ayuda</ProfileButton>
          </div>
        </div>
        {/* name compartido: acordeón exclusivo nativo (abrir una cierra la otra); un grupo por copia escritorio/móvil. */}
        <div className="vz-faq__list">
          {FAQ.map(([q, a], i) => (
            <details key={q} name={`vz-faq-${id}`} open={i === 0}>
              <summary><span className="vz-faq__n">{String(i + 1).padStart(2, "0")}</span><span className="vz-faq__q">{q}</span><i aria-hidden /></summary>
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

      {/* ── Cierre ── */}
      <section className="vz-close" ref={close} aria-label="Valoriza ahora">
        <div className="vz-close__copy">
          <h2>Tu auto ya tiene un valor. <em>Descúbrelo en un minuto.</em></h2>
          <ul className="vz-close__perks">
            <li>Gratis</li><li>Sin compromiso</li><li>Se guarda en Mi Garaje</li>
          </ul>
          <Button variant="primary" onClick={valuar}>Valorizar mi auto gratis</Button>
          <p className="vz-close__note">Valor referencial con fecha: te dice cuánto vale hoy. No es un precio fijo de venta.</p>
        </div>
        <div className="vz-close__phone" aria-hidden>
          <img src={`${IMG}/cel/resultado.png`} alt="" width={460} height={867} loading="lazy" />
        </div>
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
  width: 100%; padding: 16px 16px 64px; box-sizing: border-box; display: grid; gap: 0; background: #fff; font-family: var(--vmc-font-display); color: var(--ink); }
.vz *, .vz *::before, .vz *::after { box-sizing: border-box; }
.vz ::selection { background: #E8DDFF; color: #22005C; }
.vz h1, .vz h2, .vz h3 { text-wrap: balance; }
.vz em { font-style: normal; }

/* Hero: anatomía .hp del Index, más alto y con titular de campaña. */
.vz-hero { position: relative; isolation: isolate; height: 452px; overflow: hidden; border-radius: 20px; color: #fff; background: var(--v800);
  box-shadow: 0 24px 48px -28px rgba(34,0,92,0.55); }
.vz-hero__photo { position: absolute; top: 0; right: 0; bottom: 0; width: 66%;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 34%); mask-image: linear-gradient(90deg, transparent 0%, #000 34%); }
.vz-hero__photo img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 40%; display: block; }
.vz-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(60% 80% at 0% 100%, rgba(237,137,54,0.28), transparent 60%); }
.vz-hero__copy { position: absolute; top: 0; bottom: 40px; left: 40px; width: 50%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 18px; }
.vz-hero h1 { margin: 0; font-size: clamp(40px, 5.4vw, 56px); line-height: 1.02; font-weight: 800; letter-spacing: -0.04em; }
.vz-hero h1 em { color: var(--peach); }
.vz-hero p { margin: 0; max-width: 38ch; font-size: 15px; line-height: 23px; font-weight: 500; color: #E8DDFF; }
.vz-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 4px; }
.vz-hero__actions .hib-glass { height: 40px; }

/* Tarjeta de lo que trae el resultado, sobre la foto (vidrio oscuro, anclada al celular de la persona). */
.vz-hero__card { position: absolute; z-index: 1; right: 20%; top: 28px; width: 220px; padding: 14px 14px 10px; border-radius: 18px;
  background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06)); border: 1px solid rgba(255,255,255,0.28);
  -webkit-backdrop-filter: blur(14px) saturate(140%); backdrop-filter: blur(14px) saturate(140%);
  box-shadow: 0 24px 40px -18px rgba(5,0,30,0.7), inset 0 1px 0 rgba(255,255,255,0.25); }
.vz-hero__card > p { margin: 0 0 6px; font-size: 12px; line-height: 16px; font-weight: 700; color: var(--peach); max-width: none; }
.vz-hero__card ul { display: grid; margin: 0; padding: 0; list-style: none; }
.vz-hero__card li { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
.vz-hero__card li + li { border-top: 1px solid rgba(255,255,255,0.14); }
.vz-hero__card span { display: grid; font-size: 13px; line-height: 17px; font-weight: 700; color: #fff; }
.vz-hero__card small { font-size: 11px; line-height: 14px; font-weight: 500; color: #CFBAFF; }

/* Banner de formato montado sobre el borde del hero (como «Formato de publicación» en landing-subascars). */
.vz-proof { position: relative; z-index: 2; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 8px; margin: -44px 28px 0; padding: 14px 8px 14px 20px;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.82);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vz-proof__brand { margin: 0; padding-right: 20px; border-right: 1px solid #E4DCF8; }
.vz-proof__brand strong { display: block; font-size: 18px; line-height: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vz-proof__brand span { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: #C2410C; }
.vz-proof ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.vz-proof li { display: flex; align-items: center; gap: 12px; padding: 0 16px; min-width: 0; }
.vz-proof li + li { border-left: 1px solid #E4DCF8; }
.vz-proof strong { display: block; font-size: 16px; line-height: 20px; font-weight: 800; letter-spacing: -0.01em; color: var(--v700); }
.vz-proof span { display: block; font-size: 12px; line-height: 16px; color: var(--muted); }

/* Recorrido. Por defecto (sin soporte, móvil o movimiento reducido): lista de pasos con su pantalla.
   Con soporte, escritorio: la pista mide 4 pantallas y la escena queda fijada; el timeline de la pista
   (contain 0–100 %) se reparte en cuartos para pantalla, etiqueta, texto y barra de progreso. */
.vz-story { margin-top: 48px; padding: 48px 40px 56px; border-radius: 24px; color: #fff; scroll-margin-top: 80px;
  background: radial-gradient(70% 50% at 100% 0%, rgba(132,96,229,0.35), transparent 70%), linear-gradient(180deg, var(--v800) 0%, var(--v900) 100%); }
.vz-story__head h2 { margin: 0; max-width: 18ch; font-size: 36px; line-height: 1.08; font-weight: 800; letter-spacing: -0.035em; }
.vz-story__head h2 em { color: var(--peach); }
.vz-story__head p { margin: 10px 0 0; font-size: 14px; line-height: 20px; color: #CFBAFF; }
.vz-story__track { margin-top: 32px; }
.vz-story__phone, .vz-story__rail { display: none; }
.vz-story__steps { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 24px; margin: 0; padding: 0; list-style: none; }
.vz-story__steps li { display: grid; justify-items: start; align-content: start; }
.vz-story__inline { width: 100%; max-width: 220px; height: auto; margin-bottom: 18px; filter: drop-shadow(0 24px 28px rgba(5,0,30,0.55)); }
.vz-story__n { font-size: 12px; font-weight: 700; color: #FBC47D; font-variant-numeric: tabular-nums; }
.vz-story h3 { margin: 6px 0 0; font-size: 22px; line-height: 26px; font-weight: 800; letter-spacing: -0.02em; }
.vz-story li p { margin: 8px 0 0; max-width: 34ch; font-size: 14px; line-height: 21px; color: #DCCFFF; }

@keyframes vz-in-out { 0% { opacity: 0; transform: translateY(20px); } 12%, 88% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-20px); } }
@keyframes vz-show { from { clip-path: inset(100% 0 0 0 round 36px); } to { clip-path: inset(0 0 0 0 round 36px); } }
@keyframes vz-out { 0%, 88% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-20px); } }
@keyframes vz-in { 0% { opacity: 0; transform: translateY(20px); } 12%, 100% { opacity: 1; transform: none; } }
@keyframes vz-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@supports (animation-timeline: view()) {
  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
    .vz-story { padding-bottom: 0; }
    .vz-story__track { height: 340vh; margin-top: 0; view-timeline: --vz-story block; }
    .vz-story__stage { position: sticky; top: 64px; height: calc(100dvh - 64px); display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; align-items: center; }
    .vz-story__phone { display: grid; place-items: center; position: relative; height: 100%; }
    .vz-story__phone::before { content: ""; position: absolute; width: 78%; aspect-ratio: 1; border-radius: 50%;
      background: radial-gradient(closest-side, rgba(237,137,54,0.32), rgba(132,96,229,0.18) 55%, transparent); }
    .vz-story__phone::after { content: ""; position: absolute; width: 96%; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(255,255,255,0.08); }
    .vz-story__phone img { grid-area: 1 / 1; position: relative; z-index: 1; height: min(600px, calc(100dvh - 150px)); width: auto; max-width: 100%;
      filter: drop-shadow(0 34px 40px rgba(5,0,30,0.65)); }
    .vz-story__tag { grid-area: 1 / 1; position: relative; z-index: 2; align-self: end; justify-self: start; margin: 0 0 18% -4%;
      display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 999px; white-space: nowrap;
      font-size: 13px; font-weight: 700; color: var(--v700); background: rgba(255,255,255,0.92); border: 1px solid #fff;
      box-shadow: 0 16px 30px -12px rgba(5,0,30,0.6); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
    .vz-story__tag::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--orange); box-shadow: 0 0 0 4px rgba(237,137,54,0.2); }
    .vz-story__tag:nth-of-type(even) { justify-self: end; align-self: start; margin: 22% -4% 0 0; }

    .vz-story__panel { display: grid; align-content: center; gap: 28px; }
    .vz-story__rail { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; max-width: 360px; }
    .vz-story__rail span { height: 4px; border-radius: 999px; background: rgba(255,255,255,0.16); overflow: hidden; }
    .vz-story__rail i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--orange), #FBC47D); transform-origin: left;
      animation: vz-fill linear both; animation-timeline: --vz-story; }
    .vz-story__steps { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; }
    .vz-story__steps li { grid-area: 1 / 1; }
    .vz-story__inline { display: none; }
    .vz-story__n { font-size: 13px; }
    .vz-story h3 { font-size: 40px; line-height: 1.05; letter-spacing: -0.035em; }
    .vz-story li p { max-width: 30ch; margin-top: 14px; font-size: 17px; line-height: 26px; }

    /* Pantallas: se apilan y cada una entra sobre la anterior (pantalla opaca: sin mezcla). La primera siempre visible. */
    .vz-story__phone img:nth-child(n+2) { animation: vz-show linear both; animation-timeline: --vz-story; }
    .vz-story__phone img:nth-child(2) { animation-range: contain 21% contain 29%; }
    .vz-story__phone img:nth-child(3) { animation-range: contain 46% contain 54%; }
    .vz-story__phone img:nth-child(4) { animation-range: contain 71% contain 79%; }
    /* Texto y etiqueta: cada uno en su cuarto, sale antes de que entre el siguiente (nunca se enciman). */
    .vz-story__tag, .vz-story__steps li { animation: vz-in-out linear both; animation-timeline: --vz-story; }
    .vz-story__tag:nth-of-type(1), .vz-story__steps li:nth-child(1) { animation-name: vz-out; animation-range: contain 0% contain 25%; }
    .vz-story__tag:nth-of-type(2), .vz-story__steps li:nth-child(2) { animation-range: contain 25% contain 50%; }
    .vz-story__tag:nth-of-type(3), .vz-story__steps li:nth-child(3) { animation-range: contain 50% contain 75%; }
    .vz-story__tag:nth-of-type(4), .vz-story__steps li:nth-child(4) { animation-name: vz-in; animation-range: contain 75% contain 100%; }
    .vz-story__rail span:nth-child(1) i { animation-range: contain 0% contain 25%; }
    .vz-story__rail span:nth-child(2) i { animation-range: contain 25% contain 50%; }
    .vz-story__rail span:nth-child(3) i { animation-range: contain 50% contain 75%; }
    .vz-story__rail span:nth-child(4) i { animation-range: contain 75% contain 100%; }
  }
}

/* Encabezado de sección grande (misma voz que el recorrido). */
.vz-h2 { margin-bottom: 24px; }
.vz-h2 h2 { margin: 0; max-width: 24ch; font-size: 34px; line-height: 1.08; font-weight: 800; letter-spacing: -0.035em; color: var(--v700); }
.vz-h2 h2 em { display: block; color: #C2410C; }
.vz-h2 p { margin: 10px 0 0; font-size: 15px; line-height: 22px; color: var(--muted); }
.vz-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* Fórmula de AVT: cuatro bloques encadenados por operadores; el resultado en morado. */
.vz-know { margin-top: 64px; }
.vz-formula { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; margin: 0; padding: 0; list-style: none; counter-reset: none; }
.vz-formula li { position: relative; display: grid; align-content: start; gap: 10px; padding: 20px 18px 22px; border-radius: 18px; background: var(--lav); border: 1px solid var(--line); }
.vz-formula h3 { margin: 4px 0 0; font-size: 17px; line-height: 21px; font-weight: 800; letter-spacing: -0.01em; color: var(--v700); }
.vz-formula p { margin: 0; font-size: 13px; line-height: 19px; color: var(--muted); }
.vz-formula__op { position: absolute; top: 50%; left: -28px; z-index: 1; display: grid; place-items: center; width: 28px; height: 28px; margin-top: -14px;
  border-radius: 50%; background: #fff; border: 1px solid var(--line); box-shadow: 0 6px 14px -8px rgba(59,23,130,0.4);
  font-size: 16px; font-weight: 800; line-height: 1; color: var(--v500); }
.vz-formula li.is-result { color: #fff; border: 0; box-shadow: 0 18px 32px -18px rgba(34,0,92,0.7);
  background: radial-gradient(120% 90% at 0% 100%, rgba(237,137,54,0.55), transparent 60%), linear-gradient(150deg, #3B1782, #22005C); }
.vz-formula li.is-result h3 { color: #fff; }
.vz-formula li.is-result p { color: #DCCFFF; }
.vz-formula li.is-result .vz-formula__op { color: #fff; background: var(--orange); border-color: var(--orange); }
.vz-know__cta { display: flex; align-items: center; gap: 16px; margin-top: 24px; }
.vz-know__cta span { font-size: 13px; line-height: 19px; color: var(--muted); }

/* Bento persuasivo. */
.vz-why { margin-top: 56px; }
.vz-bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-auto-rows: minmax(0, auto); gap: 16px; }
.vz-tile { position: relative; overflow: hidden; border-radius: 20px; border: 1px solid var(--line); background: #fff; box-shadow: 0 12px 28px -22px rgba(59,23,130,0.35); }
.vz-tile h3 { margin: 0; font-size: 18px; line-height: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vz-tile p { margin: 6px 0 0; font-size: 13px; line-height: 19px; color: var(--muted); }

.vz-tile--ab { grid-column: span 4; grid-row: span 2; display: grid; grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr); gap: 20px; align-items: center;
  padding: 24px; background: linear-gradient(160deg, var(--lav) 0%, #fff 60%); }
.vz-ab__intro { display: grid; align-content: center; }
.vz-ab__intro h3 { font-size: 26px; line-height: 30px; letter-spacing: -0.03em; }
.vz-ab__intro h3 span { display: block; color: #C2410C; }
.vz-ab__intro p { margin-top: 10px; font-size: 14px; line-height: 21px; }
.vz-ab__intro img { width: 100%; height: auto; margin-top: 16px; border-radius: 14px; aspect-ratio: 3 / 2; object-fit: cover; }
.vz-ab { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; line-height: 18px; background: #fff; border-radius: 16px;
  border: 1px solid var(--line); box-shadow: 0 10px 24px -16px rgba(59,23,130,0.35); overflow: hidden; }
.vz-ab th, .vz-ab td { padding: 12px 12px; text-align: left; vertical-align: middle; }
.vz-ab tbody tr + tr th, .vz-ab tbody tr + tr td, .vz-ab tfoot th, .vz-ab tfoot td { border-top: 1px solid #EEE9FA; }
.vz-ab thead th { padding-top: 14px; padding-bottom: 10px; }
.vz-ab thead b { display: inline-flex; height: 24px; align-items: center; padding: 0 10px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.04em; color: #fff; background: var(--orange); }
.vz-ab thead b.is-high { background: var(--v700); }
.vz-ab tbody th, .vz-ab tfoot th { font-size: 12px; font-weight: 600; color: var(--muted); }
.vz-ab td { font-weight: 700; color: var(--ink); white-space: nowrap; }
.vz-ab tfoot { background: #FBF9FF; }
.vz-ab__bar { display: block; height: 6px; border-radius: 999px; background: #EEF0F3; overflow: hidden; }
.vz-ab__bar i { display: block; width: 46%; height: 100%; border-radius: inherit; background: var(--orange); }
.vz-ab__bar.is-high i { width: 86%; background: linear-gradient(90deg, var(--orange), var(--v500)); }
.vz-ab strong { display: block; margin-top: 6px; font-size: 15px; font-weight: 800; color: #C2410C; }
.vz-ab strong.is-high { color: var(--v700); }

.vz-tile--photo { grid-column: span 2; display: grid; grid-template-rows: 120px auto; }
.vz-tile--photo > img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 600ms var(--ease); }
.vz-tile--photo:hover > img { transform: scale(1.04); }
.vz-tile--photo > div { padding: 14px 16px 16px; }
.vz-tile--photo .pprofilebtn { margin-top: 8px; padding: 0; }

.vz-tile--sell { grid-column: span 6; display: grid; align-content: center; justify-items: start; min-height: 196px; padding: 28px 32px; color: #fff; border: 0; isolation: isolate;
  background: radial-gradient(90% 120% at -10% 120%, rgba(239,133,46,0.85) 0%, rgba(239,133,46,0.3) 30%, transparent 58%), linear-gradient(120deg, #32136F 0%, #4E22A9 60%, #7B4BE3 100%); }
.vz-tile--sell h3 { max-width: 20ch; color: #fff; font-size: 26px; line-height: 30px; letter-spacing: -0.03em; }
.vz-tile--sell p { max-width: 40ch; color: rgba(255,255,255,0.86); }
.vz-tile--sell .hib-glass { height: 40px; margin-top: 18px; padding-inline: 28px; }
.vz-sell__person { position: absolute; z-index: -1; right: 24px; bottom: 0; height: 112%; width: auto; pointer-events: none; }

/* Preguntas frecuentes: <details> nativo, una sola columna de lectura. */
/* Una columna: encabezado, lista a todo el ancho y franja de ayuda al final. */
.vz-faq { display: grid; gap: 0; margin-top: 64px; }
.vz-faq__aside { display: contents; }
.vz-faq__help { order: 2; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 16px; margin-top: 16px; padding: 16px 20px; border-radius: 18px; background: var(--lav); border: 1px solid var(--line); }
.vz-faq__help p { margin: 0; font-size: 13px; line-height: 19px; color: var(--muted); }
.vz-faq__help b { display: block; margin-bottom: 2px; font-size: 15px; line-height: 20px; color: var(--v700); }
.vz-faq__help .pprofilebtn { padding: 0; }
.vz-faq__list { display: grid; gap: 8px; }
.vz-faq details { border-radius: 16px; background: #fff; border: 1px solid var(--line); transition: background-color 240ms var(--ease), border-color 240ms var(--ease), box-shadow 240ms var(--ease); }
.vz-faq details:hover { border-color: #CDBDF5; }
.vz-faq details[open] { background: var(--lav); border-color: #CDBDF5; box-shadow: 0 14px 28px -22px rgba(59,23,130,0.45); }
.vz-faq summary { display: grid; grid-template-columns: 28px minmax(0, 1fr) 28px; align-items: center; gap: 12px; min-height: 64px; padding: 0 16px 0 20px;
  cursor: pointer; list-style: none; font-size: 16px; line-height: 22px; font-weight: 700; color: var(--v700); border-radius: 16px; }
.vz-faq summary::-webkit-details-marker { display: none; }
.vz-faq summary:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vz-faq__n { font-size: 12px; font-weight: 700; color: var(--v500); font-variant-numeric: tabular-nums; }
/* Ícono + que se vuelve −: la barra vertical gira y se esconde. */
.vz-faq summary i { position: relative; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 1px solid var(--line); transition: background-color 240ms var(--ease), border-color 240ms var(--ease); }
.vz-faq summary i::before, .vz-faq summary i::after { content: ""; position: absolute; top: 50%; left: 50%; width: 12px; height: 2px; margin: -1px 0 0 -6px; border-radius: 2px; background: var(--v500); transition: transform 280ms var(--ease), background-color 240ms; }
.vz-faq summary i::after { transform: rotate(90deg); }
.vz-faq details[open] summary i { background: var(--v700); border-color: var(--v700); }
.vz-faq details[open] summary i::before, .vz-faq details[open] summary i::after { background: #fff; }
.vz-faq details[open] summary i::after { transform: rotate(0deg); }
.vz-faq details p { margin: 0; padding: 0 60px 20px 60px; max-width: 64ch; font-size: 14px; line-height: 22px; color: var(--muted); }
/* Apertura suave hasta height:auto (Chromium); en otros navegadores abre al instante. */
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    .vz-faq { interpolate-size: allow-keywords; }
    .vz-faq details::details-content { block-size: 0; overflow: clip; opacity: 0;
      transition: block-size 320ms var(--ease), opacity 240ms ease, content-visibility 320ms allow-discrete; }
    .vz-faq details[open]::details-content { block-size: auto; opacity: 1; }
  }
}

/* Cierre. */
/* Cierre: tarjeta oscura (eco del hero) con el resultado real asomando por abajo. */
.vz-close { position: relative; overflow: hidden; isolation: isolate; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: center; gap: 24px;
  margin-top: 64px; padding: 0 0 0 48px; min-height: 380px; border-radius: 24px; color: #fff;
  background: radial-gradient(60% 80% at 85% 100%, rgba(237,137,54,0.45), transparent 65%), radial-gradient(70% 60% at 0% 0%, rgba(132,96,229,0.4), transparent 70%),
    linear-gradient(160deg, var(--v800) 0%, var(--v900) 100%); }
.vz-close__copy { display: grid; justify-items: start; gap: 20px; padding: 48px 0; }
.vz-close h2 { margin: 0; max-width: 16ch; font-size: 44px; line-height: 1.04; font-weight: 800; letter-spacing: -0.04em; color: #fff; }
.vz-close h2 em { display: block; color: var(--peach); }
.vz-close__perks { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 0; padding: 0; list-style: none; }
.vz-close__perks li { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #DCCFFF; }
.vz-close__perks li::before { content: ""; width: 16px; height: 16px; border-radius: 50%; flex: none;
  background: var(--orange) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4.5 8.2l2.3 2.3 4.7-5' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 16px no-repeat; }
.vz-close__note { margin: 0; max-width: 46ch; font-size: 12px; line-height: 18px; color: #B9A6EE; }
.vz-close__phone { align-self: end; height: 100%; display: flex; align-items: flex-end; justify-content: center; }
.vz-close__phone img { width: auto; height: 540px; margin-bottom: -230px; transform: rotate(-6deg); filter: drop-shadow(0 30px 40px rgba(5,0,30,0.6)); }
.vz-close__note svg { flex: none; }

.vz-dock { display: none; }

@media (max-width: 1023px) {
  .vz { padding: 14px 14px 104px; }
  .vz-hero { height: auto; display: flex; flex-direction: column; border-radius: 18px; }
  .vz-hero__photo { position: relative; width: 100%; height: 236px; -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent 100%); mask-image: linear-gradient(180deg, #000 60%, transparent 100%); }
  .vz-hero__photo img { object-position: 62% 35%; }
  .vz-hero__copy { position: relative; left: 0; bottom: 0; width: 100%; padding: 0 20px 64px; margin-top: -32px; gap: 14px; }
  .vz-hero h1 { font-size: 38px; }
  .vz-hero__actions { width: 100%; }
  .vz-hero__actions > * { flex: 1 1 100%; }
  .vz-hero__actions .pvbtn { white-space: nowrap; padding-inline: 16px; }
  .vz-hero__card { display: none; }
  .vz-proof { grid-template-columns: minmax(0, 1fr); margin: -40px 12px 0; padding: 14px 4px 6px; }
  .vz-proof__brand { padding: 0 12px 10px; border-right: 0; border-bottom: 1px solid #E4DCF8; }
  .vz-proof ul { grid-template-columns: minmax(0, 1fr); }
  .vz-h2 h2 { font-size: 27px; }
  .vz-faq { margin-top: 44px; }
  .vz-faq__help { grid-template-columns: minmax(0, 1fr); justify-items: start; gap: 10px; }
  .vz-faq summary { grid-template-columns: minmax(0, 1fr) 28px; padding: 0 12px 0 16px; font-size: 15px; }
  .vz-faq__n { display: none; }
  .vz-faq details p { padding: 0 16px 18px; }
  .vz-know { margin-top: 44px; }
  .vz-formula { grid-template-columns: minmax(0, 1fr); gap: 22px; }
  .vz-formula__op { top: -25px; left: 50%; margin: 0 0 0 -14px; }
  .vz-know__cta { flex-direction: column; align-items: stretch; text-align: center; }
  .vz-proof li { padding: 10px 12px; }
  .vz-proof li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vz-story { margin-top: 36px; padding: 32px 20px 36px; border-radius: 20px; }
  .vz-story__head h2 { font-size: 28px; }
  .vz-story__steps { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .vz-story__steps li { justify-items: center; text-align: center; }
  .vz-story__inline { max-width: 220px; }
  .vz-why { margin-top: 40px; }
  .vz-bento { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .vz-tile--ab, .vz-tile--photo, .vz-tile--sell { grid-column: auto; grid-row: auto; }
  .vz-tile--ab { grid-template-columns: minmax(0, 1fr); padding: 20px 16px; }
  .vz-ab__intro h3 { font-size: 24px; line-height: 28px; }
  .vz-tile--photo { grid-template-rows: 140px auto; }
  .vz-tile--sell { padding: 24px 20px 220px; }
  .vz-sell__person { right: -10px; height: 230px; }
  .vz-close { grid-template-columns: minmax(0, 1fr); margin-top: 40px; padding: 0 20px; min-height: 0; }
  .vz-close__copy { padding: 36px 0 0; }
  .vz-close h2 { font-size: 32px; }
  .vz-close__phone { height: 220px; overflow: hidden; }
  .vz-close__phone img { height: 380px; margin: 0 0 -160px; align-self: flex-start; }
  .vz-close .pvbtn { width: 100%; }
  .vz-dock { display: block; position: fixed; left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom)); z-index: 40; padding: 8px; border-radius: 999px;
    background: rgba(255,255,255,0.86); border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 18px 36px -16px rgba(34,0,92,0.45);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    transform: translateY(calc(100% + 24px)); opacity: 0; transition: transform 420ms var(--ease), opacity 240ms ease; }
  .vz-dock[data-on] { transform: none; opacity: 1; }
  .vz-dock .pvbtn { width: 100%; white-space: nowrap; }
}
@media (prefers-reduced-motion: reduce) {
  .vz-tile--photo > img, .vz-dock { transition: none; }
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
