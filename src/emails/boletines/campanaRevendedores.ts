/**
 * Campaña «Revendedores» — 6 boletines para quien compra por subasta en VMC (En Vivo y
 * Negociable) para revender: ahora también puede VENDER en VMC (Mi Garaje → oferta
 * Negociable). Recorrido: reconocimiento → beneficio → cómo funciona → costos →
 * confianza → cierre. No repite «REVENDE» (Valoriza 5): cada correo abre un ángulo nuevo.
 *
 * Mismas piezas y mismo hero póster que la Campaña Valoriza (campanaValoriza.ts); los
 * íconos se reutilizan de su carpeta; las pantallas de celular son del Mi Garaje actual (CEL). Copy con el UX writing de los
 * banners «Revendedores» de Mi Garaje (VMC-Laptop · /banners-revendedores), ver DEFS.
 *
 * HECHOS VERIFICADOS (skill vmc-modelo-negocio, T&C sync 18-nov-2026):
 *  · Fee por publicación: 25 SubasCoins, una vez (T&C IV.11.2.a); se republica sin costo
 *    adicional hasta que se venda (IV.11.2.b).
 *  · Al vender, VMC no cobra al vendedor fee, comisión ni porcentaje (IV.11.2.g); la
 *    comisión la paga el ganador habilitado (II.40).
 *  · Para proponer, el comprador consigna (IV.6.2.a); cada propuesta vence en 24 h
 *    (IV.6.2.f); el vendedor acepta, rechaza o contrapropone (IV.6.2.c) y puede aceptar
 *    cualquier propuesta sin importar monto ni orden (IV.6.2.h); SUBASTOP valida el
 *    resultado (IV.6.3.a).
 *  · Publicar NO garantiza la venta ni un valor mínimo (IV.11.2.f): nada de «vende en X días».
 */

import type { EmailTemplate } from '../prodEmails';
import { acc, b, build, cel, cels, closing, gap, hero, HOLA, link, note, p, ps, type Def } from './campanaValoriza';

// ponytail: mismos placeholders que Valoriza hasta tener las URLs reales (PENDIENTES en revisionStatus.ts)
const VALORIZA_URL = 'https://www.vmcsubastas.com/';
const PUBLICAR_URL = 'https://www.vmcsubastas.com/login?redirect_after_to=/zona';

const CATEGORIA = 'Campaña Revendedores';
// En local los hero nuevos aún no están en el CDN: se sirven desde public/ del dev server.
const HERO = `${process.env.NODE_ENV === 'development' ? '' : 'https://concorde-v2-theta.vercel.app'}/correos/campana-revendedores/hero`;
const CTA = 'Publicar mi carro';
/*
 * Pantallas del Mi Garaje ACTUAL (vendo-mis-cosas.vercel.app/producto/mi-garaje, 390 px, 25/11,
 * sin paneles de demo). Propuestas recibidas y responder no existen ahí con un carro (solo el
 * demo de una laptop), así que siguen las de Valoriza ('propuestas.png', 'responder.png').
 */
const CEL = HERO.replace(/hero$/, 'cel');
const INICIO = `${CEL}/inicio.png`;
const INICIO_ALT = 'Mi Garaje en VMC con el bloque ¿Cuánto vale tu carro? y la tarjeta Vendo mi carro';
const PUBLICA = `${CEL}/publica.png`;
const PUBLICA_ALT = 'Publicar en Mi Garaje: recibe propuestas por solo 25 SubasCoins, pago único y 0 % de comisión';

/*
 * COPY «SIMPLE» (Julio 20/11), con el UX writing de los banners Revendedores: titular corto
 * (pregunta que identifica al lector o contraste compra → venta), una bajada con la acción,
 * chip «Revendedores» / «Nuevo en VMC», un solo CTA «Publicar mi carro». «Carro», tuteo,
 * sin cifras en el titular, sin jerga ni promesas de resultado.
 * Fotos de Flow del dueño (flow-revendedores/1-6.jpg) → poster.py: cada hero funde a su
 * propio tono oscuro (bg), no a #22005c. Los logos de marca se dejan tal cual (dueño 25/11).
 */
const DEFS: Def[] = [
  {
    id: 'revendedores-1-ya-compras-aqui',
    name: 'Revendedores 1 — compras para revender: ahora también vendes',
    subject: '¿Compras por subasta para revender?',
    preheader: 'Ahora también puedes vender tu carro en VMC.',
    stage: 'Reconoce', leadsTo: ['revendedores-2-rotacion'],
    hero: hero({ img: `${HERO}/revendedores-1.jpg`, bg: '#2c126a', alt: '¿Y vender? — Revendedor entrega la llave de su carro', eyebrow: 'Revendedores', title: `¿Compras por subasta para ${acc('revender')}?`, perks: ['Publica', 'Recibe propuestas', 'Tú decides'], text: 'Ahora también puedes vender tu carro en VMC.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Ya conoces VMC como comprador. ${b('Ahora también puedes vender')}, con tu misma cuenta.`),
      gap(28), cel(INICIO, INICIO_ALT, 'Todo en un lugar', 'Compras y vendes en VMC', [['compras', 'Compra', 'En Vivo o Negociable, como siempre.'], ['valorizaciones', '¿Cuánto vale tu carro?', 'Descúbrelo gratis en tu Mi Garaje.'], ['publicar', 'Vendo mi carro', 'Publícalo con tu misma cuenta.']]),
      gap(32), closing('crecimiento', 'Donde compras, ahora también vendes.', 'Publica tu carro y recibe propuestas.', CTA, PUBLICAR_URL),
      gap(24), ps('Usas la misma cuenta de VMC. No tienes que registrarte de nuevo.'),
    ],
  },
  {
    id: 'revendedores-2-rotacion',
    name: 'Revendedores 2 — tu carro frente a los compradores de VMC',
    subject: 'Donde compras, ahora también vendes',
    preheader: 'Publica tu carro en VMC y recibe propuestas.',
    stage: 'Beneficio', leadsTo: ['revendedores-3-como-funciona'],
    hero: hero({ img: `${HERO}/revendedores-2.jpg`, bg: '#133239', alt: 'Mismo lugar — Revendedora sentada sobre su camioneta roja', eyebrow: 'Nuevo en VMC', title: `Donde compras, ahora ${acc('también vendes')}.`, perks: ['Compradores en VMC', 'Propuestas en Mi Garaje', 'Republica sin costo'], text: 'Publica tu carro en VMC y recibe propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Los compradores ya entran a VMC a buscar carros. ${b('Pon el tuyo donde ellos buscan')}.`),
      gap(28), cel('propuestas.png', 'Propuestas recibidas en Mi Garaje', 'Más compradores', 'Tu carro, donde están los compradores', [['compras', 'Compradores activos', 'Ya entran a VMC a buscar carros.'], ['negociaciones', 'Propuestas a tu cuenta', 'Llegan a Mi Garaje, sin llamadas a deshoras.'], ['fecha', 'Sigue publicado', 'Si no se vende, se republica sin costo.']]),
      gap(32), closing('crecimiento', 'Vende y vuelve a comprar', 'Publica tu carro y recibe propuestas.', CTA, PUBLICAR_URL),
      gap(24), ps('Pagas la publicación una sola vez. Tu carro sigue publicado hasta que se venda.'),
    ],
  },
  {
    id: 'revendedores-3-como-funciona',
    name: 'Revendedores 3 — cómo funciona: valoriza, publica, negocia',
    subject: 'Valoriza, publica y recibe propuestas',
    preheader: 'Así vendes tu carro en VMC. Valorizar es gratis.',
    stage: 'Cómo funciona', leadsTo: ['revendedores-4-costos'],
    hero: hero({ img: `${HERO}/revendedores-3.jpg`, bg: '#422515', alt: 'Publícalo — Revendedor fotografía su camioneta para publicarla', eyebrow: 'Revendedores', title: `Valoriza, publica y ${acc('recibe propuestas')}.`, perks: ['Valoriza', 'Publica', 'Negocia'], text: 'Empieza gratis: valoriza tu carro para fijar tu precio.', cta: 'Valorizar mi carro', url: VALORIZA_URL }),
    body: [
      HOLA, gap(8),
      p(`Ya conoces Negociable como comprador. ${b('Ahora tú recibes las propuestas')}.`),
      gap(18),
      cels([[`${CEL}/formulario.png`, 'Formulario de valorización de Mi Garaje con marca, año, modelo y kilometraje', 'Valoriza', 'Gratis. Te orienta en tu precio.'], [PUBLICA, PUBLICA_ALT, 'Publica', 'Como oferta negociable.'], ['responder.png', 'Propuesta con Aceptar y Contraproponer', 'Negocia', 'Acepta, rechaza o contrapropón.']]),
      gap(24), note('La valorización es un <b>valor referencial con fecha</b>: te orienta para fijar tu precio. No es un precio fijo de venta.'),
      gap(32), closing('valorizaciones', 'Empieza por valorizar', 'Es gratis. Publicas cuando quieras.', 'Valorizar mi carro', VALORIZA_URL),
      gap(16), link('¿Ya tienes tu precio? Publica tu carro aquí', PUBLICAR_URL),
    ],
  },
  {
    id: 'revendedores-4-costos',
    name: 'Revendedores 4 — costos: 0 % de comisión al vender',
    subject: '¿Cuánto te cobra VMC si vendes tu carro?',
    preheader: 'Un solo pago de 25 SubasCoins al publicar. Nada al vender.',
    stage: 'Costos', leadsTo: ['revendedores-5-tu-decides'],
    hero: hero({ img: `${HERO}/revendedores-4.jpg`, bg: '#30284b', alt: '0 % — Revendedora sonríe al ver su celular dentro de su carro', eyebrow: 'Nuevo en VMC', title: `¿Cuánto te cobra VMC ${acc('si vendes')}?`, perks: ['25 SubasCoins al publicar', '0 % al vender', 'Republica sin costo'], text: 'Solo pagas 25 SubasCoins al publicar, y nada al vender.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Como vendedor no pagas comisión. ${b('La paga el comprador que gana')}.`),
      gap(28), cel(PUBLICA, PUBLICA_ALT, 'Sin letra chica', 'Lo que pagas y lo que no', [['billetera', '25 SubasCoins', 'Un solo pago al publicar.'], ['precio', '0 % al vender', 'Ni comisión ni porcentaje sobre tu precio.'], ['fecha', 'Republica gratis', 'Hasta que se venda, sin pagar de nuevo.']]),
      gap(32), closing('billetera', 'Un pago. Cero comisión.', 'Publica tu carro y recibe propuestas.', CTA, PUBLICAR_URL),
      gap(24), ps('Así lo dicen los Términos y Condiciones de VMC (sección IV.11.2).'),
    ],
  },
  {
    id: 'revendedores-5-tu-decides',
    name: 'Revendedores 5 — confianza: propuestas serias, tú decides',
    subject: 'Tú decides a quién venderle',
    preheader: 'Solo te proponen compradores que consignan.',
    stage: 'Confianza', leadsTo: ['revendedores-6-cuantos'],
    hero: hero({ img: `${HERO}/revendedores-5.jpg`, bg: '#130542', alt: 'Tú decides — Revendedor de brazos cruzados junto a su carro', eyebrow: 'Revendedores', title: `Recibes propuestas. ${acc('Tú decides.')}`, perks: ['Consignan para proponer', 'Vencen en 24 h', 'Tú eliges'], text: 'Solo te proponen compradores que consignan en VMC.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Vender por tu cuenta trae curiosos y regateos. ${b('En VMC, cada propuesta llega con respaldo')}.`),
      gap(28), cel('responder.png', 'Pantalla de una propuesta con Aceptar y Contraproponer', 'Reglas claras', 'Así se negocia en VMC', [['verificado', 'Consignan para proponer', 'Solo propone quien consigna.'], ['fecha', 'Vencen en 24 h', 'Ninguna propuesta se queda colgada.'], ['negociaciones', 'Tú eliges', 'Acepta la que te convenga, sin importar el orden.']]),
      gap(32), closing('verificado', 'Negocia con quien va en serio', 'Publica tu carro y recibe propuestas.', CTA, PUBLICAR_URL),
      gap(24), ps('VMC valida el resultado de cada negociación.'),
    ],
  },
  {
    id: 'revendedores-6-cuantos',
    name: 'Revendedores 6 — cierre: ahora vendes tú',
    subject: '¿Cuántos carros tienes esperando comprador?',
    preheader: 'Publica el primero hoy y recibe propuestas.',
    stage: 'Cierre',
    hero: hero({ img: `${HERO}/revendedores-6.jpg`, bg: '#551e0a', alt: '¿Cuántos? — Socios revendedores entre tres carros', eyebrow: 'Nuevo en VMC', title: `Mismo lugar, distinta jugada: ${acc('ahora vendes tú')}.`, perks: ['Valoriza gratis', '25 SubasCoins una vez', '0 % al vender'], text: 'Publica tu carro hoy y recibe propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Ya sabes comprar bien. ${b('Ahora vende en el mismo lugar')}.`),
      gap(28), cel(INICIO, INICIO_ALT, 'En resumen', 'Todo para vender tu carro', [['valorizaciones', 'Valoriza gratis', 'Tu valor de referencia, sin costo.'], ['publicar', 'Publica una vez', '25 SubasCoins. Se republica sin costo.'], ['negociaciones', 'Recibe propuestas', 'Acepta, rechaza o contrapropón.']]),
      gap(32), closing('publicar', '¿Cuántos carros tienes esperando?', 'Publica el primero y recibe propuestas.', CTA, PUBLICAR_URL),
      gap(16), link('¿Primero quieres saber cuánto vale? Valorízalo gratis', VALORIZA_URL),
    ],
  },
];

export const CAMPANA_REVENDEDORES: EmailTemplate[] = DEFS.map((d) => ({
  id: d.id, name: d.name, subject: d.subject, category: CATEGORIA, stage: d.stage, leadsTo: d.leadsTo,
  sections: [],
  html: build(d),
}));
