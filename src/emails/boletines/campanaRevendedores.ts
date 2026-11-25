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
 * Fotos de Flow del dueño (flow-revendedores/1-6.jpg) → poster2.py: cada hero funde (fundido
 * largo, sin franja) a su propio tono oscuro (bg), no a #22005c, y trae un recorte móvil (-m.jpg)
 * centrado en persona + carro. Los logos de marca se dejan tal cual (dueño 25/11).
 */
const DEFS: Def[] = [
  {
    // Copy de Julio (25/11), tal cual.
    id: 'revendedores-1-ya-compras-aqui',
    name: 'Revendedores 1 — ¿eres revendedor? Ahora también publicas en VMC',
    subject: '¿Eres revendedor? Ahora también puedes publicar tu carro en VMC',
    preheader: 'Publica tu carro, recibe propuestas y decide cómo negociar.',
    stage: 'Reconoce', leadsTo: ['revendedores-2-rotacion'],
    hero: hero({ img: `${HERO}/revendedores-1.jpg`, imgM: `${HERO}/revendedores-1-m.jpg`, bg: '#2c126a', alt: 'También vendes — Revendedor entrega la llave de su carro', titleLong: true, eyebrow: 'Nuevo en VMC', title: `¿Eres revendedor? ¿Sabías que ahora puedes ${acc('publicar tu carro')} en VMC?`, text: 'Publica tu carro, recibe propuestas y decide cómo negociar desde el mismo lugar donde compras para revender.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Si compras carros para revender, sabes que encontrar una buena unidad es apenas una parte del negocio. También llega el momento de vender el carro que ya tienes y abrir espacio para seguir moviendo tu inventario.'),
      gap(16),
      p(`VMC era el lugar donde buscabas carros para revender. ${b('Hoy también es el lugar donde puedes publicar el tuyo')} cuando llega el momento de vender.`),
      gap(16),
      p(`Publica en modalidad ${b('Negociable')}, define tu expectativa de venta y recibe propuestas. Tú decides cuál te interesa, si envías una contrapropuesta y cómo avanzar con la negociación.`),
      gap(28), cel(PUBLICA, PUBLICA_ALT, '', 'Compra para revender. Publica para rotar tu inventario.', [['billetera', 'Un solo pago, 0% comisión', 'Pagas una vez y tu publicación se mantiene activa hasta que vendas tu carro.'], ['negociaciones', 'Recibe propuestas', 'Publica tu carro y recibe propuestas para evaluar la que más te convenga.'], ['verificado', 'Tú decides cómo negociar', 'Acepta, rechaza o envía una contrapropuesta. Tú marcas cómo avanzar.']]),
      gap(32), closing('crecimiento', 'Comprar es solo el comienzo.', '<b>Ahora puedes realizar todo desde VMC.</b><br>Encuentra carros para tu inventario, publica el que quieres vender y negocia tus propuestas desde un mismo lugar.', 'Publicar en VMC', PUBLICAR_URL),
      gap(24), ps('Un solo pago. Publicación activa hasta vender. 0% comisión.'),
    ],
  },
  /*
   * 2–6: ronda 1600, al nivel del copy de Julio (correo 1): misma estructura (saludo + 3 párrafos,
   * bloque de 3 ítems, cierre con bajada y P. D.), vocabulario de vendedor y un ángulo por correo.
   */
  {
    id: 'revendedores-2-rotacion',
    name: 'Revendedores 2 — tu carro donde ya buscan los compradores',
    subject: 'Tu carro, frente a los compradores que ya entran a VMC',
    preheader: 'Publica en modalidad Negociable y recibe sus propuestas en Mi Garaje.',
    stage: 'Beneficio', leadsTo: ['revendedores-3-como-funciona'],
    hero: hero({ img: `${HERO}/revendedores-2.jpg`, imgM: `${HERO}/revendedores-2-m.jpg`, bg: '#133239', alt: 'A la vista — Revendedora sentada sobre su camioneta roja', eyebrow: 'Para revendedores', title: `Pon tu carro donde ${acc('ya buscan los compradores')}.`, text: 'Los compradores de VMC ya entran a buscar su próxima unidad. Publica la tuya y recibe sus propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Cuando vendes por tu cuenta, buena parte del trabajo es que tu carro llegue a alguien que de verdad quiere comprar: avisos, llamadas y mensajes que no avanzan.'),
      gap(16),
      p(`En VMC ese público ya está. ${b('Quienes entran a comprar carros pueden ver tu unidad y enviarte una propuesta')}, sin que tengas que salir a buscarlos.`),
      gap(16),
      p(`Publicas en modalidad ${b('Negociable')}, defines tu expectativa de venta y revisas cada propuesta desde Mi Garaje.`),
      gap(28), cel('propuestas.png', 'Propuestas recibidas en Mi Garaje', '', 'Tu unidad, a la vista de quien compra.', [['compras', 'Compradores que ya están en VMC', 'Tu carro aparece donde ellos buscan su próxima compra.'], ['negociaciones', 'Propuestas en Mi Garaje', 'Revisa cada una en un solo lugar, sin perseguir mensajes.'], ['fecha', 'Republica sin costo', 'Si no se vende, vuelve a publicarlo sin pagar de nuevo.']]),
      gap(32), closing('compras', 'Menos tiempo buscando compradores.', '<b>Más tiempo para tu próxima compra.</b><br>Publica tu carro y deja que las propuestas lleguen a Mi Garaje.', 'Publicar en VMC', PUBLICAR_URL),
      gap(24), ps('Mientras tu carro está publicado, sigues comprando en VMC como siempre.'),
    ],
  },
  {
    id: 'revendedores-3-como-funciona',
    name: 'Revendedores 3 — cómo funciona: valoriza, publica, recibe propuestas y negocia',
    subject: 'Así publicas tu carro en VMC, paso a paso',
    preheader: 'Valoriza, publica en Negociable, recibe propuestas y negocia.',
    stage: 'Cómo funciona', leadsTo: ['revendedores-4-costos'],
    hero: hero({ img: `${HERO}/revendedores-3.jpg`, imgM: `${HERO}/revendedores-3-m.jpg`, bg: '#422515', alt: 'Paso a paso — Revendedor fotografía su camioneta para publicarla', eyebrow: 'Cómo funciona', title: `Valoriza, publica y ${acc('negocia tus propuestas')}.`, text: 'Todo desde Mi Garaje: pones tu unidad en venta y negocias con compradores de VMC.', cta: 'Valorizar mi carro', url: VALORIZA_URL }),
    body: [
      HOLA, gap(8),
      p('Ya conoces Negociable desde el lado del comprador: envías una propuesta y esperas la respuesta. Ahora te toca el otro lado.'),
      gap(16),
      p(`Empiezas valorizando tu carro para tener una referencia antes de definir tu expectativa de venta. Luego lo publicas en modalidad Negociable y ${b('las propuestas llegan a tu Mi Garaje')}.`),
      gap(16),
      p('Con cada propuesta eliges: aceptarla, rechazarla o enviar una contrapropuesta.'),
      gap(28), cel(`${CEL}/formulario.png`, 'Formulario de valorización de Mi Garaje con marca, año, modelo y kilometraje', '', 'Tu venta en tres pasos.', [['valorizaciones', '1. Valoriza tu carro', 'Ten una referencia para definir tu expectativa de venta.'], ['publicar', '2. Publica en Negociable', 'Sube tu unidad y deja claro cuánto esperas.'], ['negociaciones', '3. Recibe y negocia', 'Acepta, rechaza o envía una contrapropuesta.']]),
      gap(24), note('La valorización es un <b>valor referencial con fecha</b>: te orienta para fijar tu precio. No es un precio fijo de venta.'),
      gap(32), closing('valorizaciones', 'Empieza por el primer paso.', '<b>Valoriza tu carro y define tu expectativa de venta.</b><br>Cuando estés listo, publícalo desde Mi Garaje.', 'Valorizar mi carro', VALORIZA_URL),
      gap(24), ps(`¿Ya tienes claro tu precio? Puedes ir directo a <a href="${PUBLICAR_URL}" target="_blank" style="font-weight:700;color:#8460e5;text-decoration:underline;">publicar tu carro</a>.`),
    ],
  },
  {
    id: 'revendedores-4-costos',
    name: 'Revendedores 4 — costos: un solo pago, 0 % de comisión al vender',
    subject: '¿Cuánto cuesta vender tu carro en VMC?',
    preheader: '25 SubasCoins una sola vez para publicar. 0% de comisión al vender.',
    stage: 'Costos', leadsTo: ['revendedores-5-tu-decides'],
    hero: hero({ img: `${HERO}/revendedores-4.jpg`, imgM: `${HERO}/revendedores-4-m.jpg`, bg: '#30284b', alt: '0 % — Revendedora sonríe al ver su celular dentro de su carro', eyebrow: 'Costos claros', title: `Un solo pago para publicar. ${acc('Nada al vender.')}`, text: 'Pagas 25 SubasCoins una vez y, cuando vendes, VMC no te cobra comisión.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('En la reventa, todo lo que se va en costos de venta sale de tu margen. Por eso aquí van los números claros, antes de que publiques.'),
      gap(16),
      p(`Publicar tu carro cuesta ${b('25 SubasCoins, una sola vez')}. Si no se vende, lo republicas sin costo.`),
      gap(16),
      p(`Cuando vendes, ${b('tú pagas 0% de comisión')}. La comisión la paga el comprador.`),
      gap(28), cel(PUBLICA, PUBLICA_ALT, '', 'Lo que pagas como vendedor.', [['billetera', '25 SubasCoins al publicar', 'Un solo pago por tu unidad.'], ['fecha', 'Republicar no tiene costo', 'Si no se vende, vuelve a publicarla sin pagar de nuevo.'], ['precio', '0% de comisión al vender', 'La comisión la paga el comprador, no tú.']]),
      gap(32), closing('billetera', 'Publica una vez. Vende sin comisión.', '<b>Costos claros desde tu primera publicación.</b><br>Publica tu carro, recibe propuestas y negocia sin pagar comisión al vender.', 'Publicar en VMC', PUBLICAR_URL),
      gap(24), ps('Estas condiciones están en los Términos y Condiciones de VMC (sección IV.11.2).'),
    ],
  },
  {
    id: 'revendedores-5-tu-decides',
    name: 'Revendedores 5 — confianza: compradores que consignan, tú decides',
    subject: 'Propuestas de compradores que consignan',
    preheader: 'Cada propuesta vence en 24 h y tú decides cómo responder.',
    stage: 'Confianza', leadsTo: ['revendedores-6-cuantos'],
    hero: hero({ img: `${HERO}/revendedores-5.jpg`, imgM: `${HERO}/revendedores-5-m.jpg`, bg: '#130542', alt: 'Tú decides — Revendedor de brazos cruzados junto a su carro', eyebrow: 'Reglas claras', title: `Solo te proponen ${acc('compradores que consignan')}.`, text: 'Para enviarte una propuesta, el comprador primero consigna en VMC. Tú decides cómo responder.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('Cuando vendes por tu cuenta, recibes mensajes de todo tipo: curiosos, ofertas que no se concretan y regateos que no terminan.'),
      gap(16),
      p(`En VMC, ${b('solo puede proponerte quien ha consignado')}. Y cada propuesta vence en 24 horas, así ninguna negociación queda abierta sin respuesta.`),
      gap(16),
      p('Con cada una decides si la aceptas, la rechazas o envías una contrapropuesta.'),
      gap(28), cel('responder.png', 'Pantalla de una propuesta con Aceptar y Contraproponer', '', 'Reglas claras para negociar.', [['verificado', 'Compradores que consignan', 'Solo propone quien ya consignó en VMC.'], ['fecha', 'Propuestas con plazo', 'Cada propuesta vence en 24 h.'], ['negociaciones', 'Contrapropuesta', 'Si el monto no te convence, responde con tu cifra.']]),
      gap(32), closing('verificado', 'Negocia con compradores que van en serio.', '<b>Tú marcas las condiciones.</b><br>Publica tu carro y revisa cada propuesta desde Mi Garaje.', 'Publicar en VMC', PUBLICAR_URL),
      gap(24), ps('Puedes aceptar cualquier propuesta, sin importar el monto ni el orden en que llegó.'),
    ],
  },
  {
    id: 'revendedores-6-cuantos',
    name: 'Revendedores 6 — cierre: ahora vendes tú, publica el primero hoy',
    subject: 'Ahora vendes tú: publica tu primer carro hoy',
    preheader: 'Elige la unidad que quieres rotar y empieza a recibir propuestas.',
    stage: 'Cierre',
    hero: hero({ img: `${HERO}/revendedores-6.jpg`, imgM: `${HERO}/revendedores-6-m.jpg`, bg: '#551e0a', alt: 'Hoy — Socios revendedores entre tres carros', eyebrow: 'Tu primera publicación', title: `Ahora vendes tú. ${acc('Publica tu primer carro.')}`, text: 'Elige la unidad que quieres rotar, publícala en Negociable y empieza a recibir propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p('En estos correos te contamos cómo vender en VMC: dónde están los compradores, cómo funciona, cuánto cuesta y cómo negocias.'),
      gap(16),
      p(`Lo que queda es dar el primer paso. ${b('Elige el carro que quieres mover y publícalo hoy')}.`),
      gap(16),
      p('Si todavía tienes dudas sobre el precio, valorízalo primero y define tu expectativa de venta con una referencia.'),
      gap(28), cel(INICIO, INICIO_ALT, '', 'Tu primera publicación, en resumen.', [['publicar', 'Un solo pago', '25 SubasCoins y tu publicación se mantiene activa hasta que vendas.'], ['precio', '0% de comisión al vender', 'La comisión la paga el comprador.'], ['negociaciones', 'Tú decides', 'Acepta, rechaza o envía una contrapropuesta.']]),
      gap(32), closing('publicar', '¿Qué unidad vas a rotar primero?', '<b>Publícala hoy en VMC.</b><br>Y sigue comprando para tu inventario como siempre.', CTA, PUBLICAR_URL),
      gap(24), ps(`¿Primero quieres una referencia de precio? <a href="${VALORIZA_URL}" target="_blank" style="font-weight:700;color:#8460e5;text-decoration:underline;">Valoriza tu carro aquí</a>.`),
    ],
  },
];

export const CAMPANA_REVENDEDORES: EmailTemplate[] = DEFS.map((d) => ({
  id: d.id, name: d.name, subject: d.subject, category: CATEGORIA, stage: d.stage, leadsTo: d.leadsTo,
  sections: [],
  html: build(d),
}));
