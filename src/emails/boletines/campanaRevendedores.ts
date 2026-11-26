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
import { acc, b, build, cel, closing, gap, hero, HOLA, note, p, ps, type Def } from './campanaValoriza';

// ponytail: mismos placeholders que Valoriza hasta tener las URLs reales (PENDIENTES en revisionStatus.ts)
const VALORIZA_URL = 'https://www.vmcsubastas.com/';
const PUBLICAR_URL = 'https://www.vmcsubastas.com/login?redirect_after_to=/zona';

// «Negociantes», no «Revendedores» (Fernando/Julio 26/11: «revendedor» suena a aprovecharse). Ids y rutas de
// imagen conservan «revendedores» para no romper links; ?categoria=Campaña Revendedores redirige aquí (variantes/page.tsx).
export const CATEGORIA = 'Campaña Negociantes';
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
 * Fotos de Flow del dueño (flow-revendedores/1-6.jpg) → poster2.py: cada hero funde (fundido
 * largo, sin franja) a su propio tono oscuro (bg), no a #22005c, y trae un recorte móvil (-m.jpg)
 * centrado en persona + carro. Los logos de marca se dejan tal cual (dueño 25/11).
 */
const DEFS: Def[] = [
  {
    // Copy de Fernando (26/11) para asunto, título y presentación; el resto, de Julio (25/11 y 16:37).
    id: 'negociantes-1-buenas-noticias',
    name: 'Negociantes 1 — ¿Compras y vendes carros? Tenemos buenas noticias para ti',
    subject: '¿Compras y vendes carros? Tenemos buenas noticias para ti',
    preheader: 'Ahora también puedes ofrecer tus carros en VMC. Te presentamos la nueva oferta Negociable.',
    stage: 'Reconoce', leadsTo: ['negociantes-2-compradores'],
    hero: hero({ img: `${HERO}/revendedores-1.jpg`, imgM: `${HERO}/revendedores-1-m.jpg`, bg: '#2c126a', alt: 'Compra. Publica. Negocia. — Negociante entrega la llave de su carro', titleLong: true, eyebrow: 'Nuevo en VMC', title: `¿Haces negocio comprando y vendiendo? ${acc('Tenemos buenas noticias para ti')}`, text: 'Ahora también puedes ofrecer tus carros en VMC. Usa tus SubasCoins y comienza a vender. ¡Publica tu carro, recibe propuestas y negocia desde la misma plataforma!', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Si compras carros para hacer negocio, sabes que encontrar una buena unidad es apenas una parte del trabajo. También llega el momento de vender el carro que ya tienes y abrir espacio para seguir moviendo tu inventario.'),
      gap(16),
      p(`VMC es el lugar perfecto donde buscas esos carros para vender, pero ${b('hoy también es el lugar donde puedes publicar el tuyo')} cuando llega el momento.`),
      gap(16),
      p(`Te presentamos la ${b('nueva oferta Negociable')}: publica tu carro, define tu expectativa de venta y recibe propuestas. Tú decides cuál te interesa, si envías una contrapropuesta y cómo avanzar con la negociación.`),
      gap(28), cel(PUBLICA, PUBLICA_ALT, '', 'Publica para rotar tu inventario.', [['billetera', 'Un solo pago, 0% comisión', 'Pagas una vez y tu publicación se mantiene activa hasta que vendas tu carro.'], ['negociaciones', 'Recibe propuestas', 'Evalúa la que más te convenga.'], ['verificado', 'Tú decides cómo negociar', 'Acepta, rechaza o envía una contrapropuesta. Tú decides cómo avanzar.']]),
      gap(32), closing('crecimiento', 'Comprar es solo el comienzo.', '<b>Ahora puedes realizar todo desde VMC.</b><br>Encuentra carros para tu inventario, publica el que quieres vender y negocia tus propuestas desde un mismo lugar.', 'Publicar mi carro', PUBLICAR_URL),
    ],
  },
  /*
   * 2–6: ronda 1600 + pasada del VMC Copywriter Agent (26/11, runs evals/runs/2026-11-26-negociantes-N.md,
   * estado CALIBRATION_REQUIRED): sin «Mi Garaje» en claims, sin etiquetar al lector, sin demanda sin fuente.
   */
  {
    id: 'negociantes-2-compradores',
    name: 'Negociantes 2 — Tu carro, a la vista de quienes compran en VMC',
    subject: 'Tu carro, a la vista de quienes compran en VMC',
    preheader: 'Publícalo en la nueva oferta Negociable y recibe propuestas sin salir a buscar compradores.',
    stage: 'Beneficio', leadsTo: ['negociantes-3-como-funciona'],
    hero: hero({ img: `${HERO}/revendedores-2.jpg`, imgM: `${HERO}/revendedores-2-m.jpg`, bg: '#133239', alt: 'A la vista — Mujer sentada sobre su camioneta roja', eyebrow: 'Nueva oferta Negociable', title: `Tu próximo comprador ${acc('también compra en VMC')}.`, text: 'Publica tu carro en la nueva oferta Negociable y recibe sus propuestas sin salir a buscarlo.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Cuando vendes por tu cuenta, buena parte del trabajo es encontrar a alguien que de verdad quiera comprar: avisos, llamadas y mensajes que no avanzan, mientras esa unidad sigue parada en tu inventario.'),
      gap(16),
      p(`En VMC, quienes compran carros pueden ver tu unidad y enviarte una propuesta. ${b('Tú no sales a buscarlos: la propuesta te llega a ti')}.`),
      gap(16),
      p(`Publicas en la nueva oferta ${b('Negociable')}, defines tu expectativa de venta y decides qué hacer con cada propuesta.`),
      gap(28), cel('propuestas.png', 'Pantalla de propuestas recibidas por un carro publicado', '', 'Tu carro, frente a quien compra.', [['compras', 'Compradores de VMC', 'Tu carro se publica donde ellos buscan su próxima compra.'], ['negociaciones', 'Propuestas que te llegan', 'Revisa cada una en un solo lugar, sin perseguir mensajes.'], ['fecha', 'Republica sin costo', 'Si no se vende, vuelve a publicarlo sin pagar de nuevo.']]),
      gap(32), closing('compras', 'Compra aquí. Vende aquí.', '<b>Publica tu carro en Negociable y revisa cada propuesta que recibas.</b><br>Tú decides con quién avanzar.', 'Publicar en Negociable', PUBLICAR_URL),
      gap(24), ps('Mientras tu carro está publicado, sigues comprando para tu inventario en VMC como siempre.'),
    ],
  },
  {
    id: 'negociantes-3-como-funciona',
    name: 'Negociantes 3 — Así publicas tu carro en VMC: valoriza, publica y negocia',
    subject: 'Así publicas tu carro en VMC: valoriza, publica y negocia',
    preheader: 'Primero conoce cuánto vale; después decide en cuánto publicarlo y cómo responder cada propuesta.',
    stage: 'Cómo funciona', leadsTo: ['negociantes-4-costos'],
    hero: hero({ img: `${HERO}/revendedores-3.jpg`, imgM: `${HERO}/revendedores-3-m.jpg`, bg: '#422515', alt: 'Paso a paso — Hombre fotografía su camioneta para publicarla', eyebrow: 'Cómo funciona', title: `Ya sabes proponer. ${acc('Ahora te toca decidir.')}`, text: 'Valoriza tu carro gratis, publícalo en la nueva oferta Negociable y responde cada propuesta a tu manera.', cta: 'Valorizar mi carro', url: VALORIZA_URL }),
    body: [
      HOLA, gap(8),
      p('Como comprador ya conoces Negociable: envías una propuesta y esperas que el vendedor responda. Ahora el que responde eres tú.'),
      gap(16),
      p(`Empiezas valorizando tu carro, gratis, para tener una referencia antes de definir tu expectativa de venta. Luego lo publicas en Negociable y ${b('cada propuesta que recibas queda en tus manos')}.`),
      gap(16),
      p('Con cada propuesta eliges: aceptarla, rechazarla o enviar una contrapropuesta.'),
      gap(28), cel(`${CEL}/formulario.png`, 'Formulario de valorización con marca, año, modelo y kilometraje', '', 'Tres pasos y la última palabra es tuya.', [['valorizaciones', '1. Valoriza tu carro gratis', 'Ten una referencia antes de definir cuánto esperas.'], ['publicar', '2. Publica en Negociable', 'Define tu expectativa de venta y sube tu unidad.'], ['negociaciones', '3. Responde cada propuesta', 'Acepta, rechaza o envía una contrapropuesta.']]),
      gap(24), note('La valorización es un <b>valor referencial con fecha</b>: te orienta para fijar tu precio. No es un precio fijo de venta.'),
      gap(32), closing('valorizaciones', 'Primero el valor, después la decisión.', '<b>Valoriza tu carro gratis y define tu expectativa de venta.</b><br>Cuando estés listo, publícalo en Negociable.', 'Valorizar mi carro', VALORIZA_URL),
      gap(24), ps(`¿Ya tienes claro tu precio? Puedes ir directo a <a href="${PUBLICAR_URL}" target="_blank" style="font-weight:700;color:#8460e5;text-decoration:underline;">publicar tu carro</a>.`),
    ],
  },
  {
    id: 'negociantes-4-costos',
    name: 'Negociantes 4 — ¿Cuánto cuesta vender tu carro en VMC?',
    subject: '¿Cuánto cuesta vender tu carro en VMC?',
    preheader: '25 SubasCoins una sola vez para publicar. 0% de comisión al vender.',
    stage: 'Costos', leadsTo: ['negociantes-5-tu-decides'],
    hero: hero({ img: `${HERO}/revendedores-4.jpg`, imgM: `${HERO}/revendedores-4-m.jpg`, bg: '#30284b', alt: '0 % — Mujer sonríe al ver su celular dentro de su carro', eyebrow: 'Costos claros', title: `Un solo pago para publicar. ${acc('Nada al vender.')}`, text: 'Pagas 25 SubasCoins una vez y, cuando vendes, VMC no te cobra comisión.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Cuando haces negocio comprando y vendiendo, todo lo que se va en costos de venta sale de tu margen. Por eso aquí van los números claros, antes de que publiques.'),
      gap(16),
      p(`Publicar tu carro cuesta ${b('25 SubasCoins, una sola vez')}. Si no se vende, lo republicas sin costo.`),
      gap(16),
      p(`Cuando vendes, ${b('tú pagas 0% de comisión')}. La comisión la paga el comprador.`),
      gap(28), cel(PUBLICA, PUBLICA_ALT, '', 'Cuentas claras antes de publicar.', [['billetera', '25 SubasCoins al publicar', 'Un solo pago por tu unidad.'], ['fecha', 'Republicar no tiene costo', 'Si no se vende, vuelve a publicarla sin pagar de nuevo.'], ['precio', '0% de comisión al vender', 'La comisión la paga el comprador, no tú.']]),
      gap(32), closing('billetera', 'Publica una vez. Vende sin comisión.', '<b>Costos claros desde tu primera publicación.</b><br>Publica tu carro, recibe propuestas y negocia sin pagar comisión al vender.', 'Publicar por 25 SubasCoins', PUBLICAR_URL),
      gap(24), ps('Estas condiciones están en los Términos y Condiciones de VMC (sección IV.11.2).'),
    ],
  },
  {
    id: 'negociantes-5-tu-decides',
    name: 'Negociantes 5 — Menos curiosos: aquí solo te propone quien consigna',
    subject: 'Menos curiosos: aquí solo te propone quien consigna',
    preheader: 'Cada propuesta vence en 24 h y tú decides cómo responder.',
    stage: 'Confianza', leadsTo: ['negociantes-6-publica-hoy'],
    hero: hero({ img: `${HERO}/revendedores-5.jpg`, imgM: `${HERO}/revendedores-5-m.jpg`, bg: '#130542', alt: 'Tú decides — Hombre de brazos cruzados junto a su carro', eyebrow: 'Reglas claras', title: `Solo te proponen ${acc('compradores que consignan')}.`, text: 'Para enviarte una propuesta, el comprador primero consigna en VMC. Tú decides cómo responder.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Cuando vendes por tu cuenta, recibes mensajes de todo tipo: curiosos, ofertas que no se concretan y regateos que no terminan.'),
      gap(16),
      p(`En VMC, ${b('solo puede proponerte quien ha consignado')}. Y cada propuesta vence en 24 horas, así sabes hasta cuándo tienes para responder.`),
      gap(16),
      p('Con cada una decides si la aceptas, la rechazas o envías una contrapropuesta.'),
      gap(28), cel('responder.png', 'Pantalla de una propuesta con Aceptar y Contraproponer', '', 'Negocias con quien ya puso respaldo.', [['verificado', 'Compradores que consignan', 'Solo propone quien ya consignó en VMC.'], ['fecha', 'Propuestas con plazo', 'Cada propuesta vence en 24 h.'], ['negociaciones', 'Contrapropuesta', 'Si el monto no te convence, responde con tu cifra.']]),
      gap(32), closing('verificado', 'Negocia con compradores que van en serio.', '<b>Tú marcas las condiciones.</b><br>Publica tu carro en Negociable y decide qué hacer con cada propuesta.', 'Publicar en Negociable', PUBLICAR_URL),
      gap(24), ps('Puedes aceptar cualquier propuesta, sin importar el monto ni el orden en que llegó.'),
    ],
  },
  {
    id: 'negociantes-6-publica-hoy',
    name: 'Negociantes 6 — Ahora vendes tú: publica tu primer carro hoy',
    subject: 'Ahora vendes tú: publica tu primer carro hoy',
    preheader: 'Elige la unidad que quieres rotar y empieza a recibir propuestas.',
    stage: 'Cierre',
    hero: hero({ img: `${HERO}/revendedores-6.jpg`, imgM: `${HERO}/revendedores-6-m.jpg`, bg: '#551e0a', alt: 'Hoy — Dos socios entre tres carros', eyebrow: 'Tu primera publicación', title: `Ahora vendes tú. ${acc('Publica tu primer carro.')}`, text: 'Elige la unidad que quieres rotar, publícala en Negociable y empieza a recibir propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Ya conoces la nueva oferta Negociable: publicas tu carro, defines cuánto esperas y decides qué hacer con cada propuesta.'),
      gap(16),
      p(`Lo que queda es elegir con qué unidad empezar. ${b('Empieza por la que más tiempo lleva esperando comprador')} y publícala hoy.`),
      gap(16),
      p('Si todavía tienes dudas sobre el precio, valorízalo gratis primero y define tu expectativa de venta con una referencia.'),
      gap(28), cel(INICIO, INICIO_ALT, '', 'Un pago, cero comisión y la última palabra.', [['publicar', 'Un solo pago', '25 SubasCoins y tu publicación se mantiene activa hasta que vendas.'], ['precio', '0% de comisión al vender', 'La comisión la paga el comprador.'], ['negociaciones', 'Tú decides', 'Acepta, rechaza o envía una contrapropuesta.']]),
      gap(32), closing('publicar', '¿Qué unidad vas a rotar primero?', '<b>Publícala hoy en VMC.</b><br>Y sigue comprando para tu inventario como siempre.', CTA, PUBLICAR_URL),
      gap(24), ps(`¿Primero quieres una referencia de precio? <a href="${VALORIZA_URL}" target="_blank" style="font-weight:700;color:#8460e5;text-decoration:underline;">Valoriza tu carro gratis aquí</a>.`),
    ],
  },
];

export const CAMPANA_REVENDEDORES: EmailTemplate[] = DEFS.map((d) => ({
  id: d.id, name: d.name, subject: d.subject, category: CATEGORIA, stage: d.stage, leadsTo: d.leadsTo,
  sections: [],
  html: build(d),
}));
