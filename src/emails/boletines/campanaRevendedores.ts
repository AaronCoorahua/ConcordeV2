/**
 * Campaña «Revendedores» — 6 boletines para quien compra por subasta en VMC (En Vivo y
 * Negociable) para revender: ahora también puede VENDER en VMC (Mi Garaje → oferta
 * Negociable). Recorrido: reconocimiento → beneficio → cómo funciona → costos →
 * confianza → cierre. No repite «REVENDE» (Valoriza 5): cada correo abre un ángulo nuevo.
 *
 * Mismas piezas y mismo hero póster que la Campaña Valoriza (campanaValoriza.ts); las
 * pantallas de celular e íconos se reutilizan de su carpeta. Copy alineado a los
 * banners «Revendedores» de Mi Garaje (VMC-Laptop · /banners-revendedores): «carro»,
 * «Donde compras, ahora también vendes», CTA «Publicar mi carro».
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
const CTA = 'Quiero publicar mi carro';

const DEFS: Def[] = [
  {
    id: 'revendedores-1-ya-compras-aqui',
    name: 'Revendedores 1 — ya compras aquí, ahora vende',
    subject: 'Ya compras en VMC. ¿Y si también vendes aquí?',
    preheader: 'Donde compras tus carros, ahora también puedes venderlos.',
    stage: 'Reconoce', leadsTo: ['revendedores-2-rotacion'],
    hero: hero({ img: `${HERO}/revendedores-1.jpg`, alt: '¿Y vender? — Revendedor con la llave de su carro junto a dos autos', eyebrow: 'Si compras para revender', title: `Donde compras, ahora ${acc('también vendes')}.`, perks: ['Publica', 'Recibe propuestas', 'Tú decides'], text: 'Ya conoces VMC del lado del comprador: sabes encontrar la oportunidad. Ahora el mismo lugar te sirve para venderla. Publica tu carro y recibe propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Hasta hoy, en VMC cerrabas solo la mitad del negocio: la compra. ${b('Ahora puedes cerrar el ciclo completo')} sin salir de la plataforma.`),
      gap(28), cel('mi-garaje.png', 'Mi Garaje en VMC con Publica tu vehículo', 'Todo en un lugar', 'Compras y ventas, desde Mi Garaje', [['compras', 'Compra', 'En Vivo o Negociable, como siempre.'], ['publicar', 'Publica', 'Desde Mi Garaje, con tu misma cuenta.'], ['negociaciones', 'Negocia', 'Las propuestas llegan a tu cuenta.']]),
      gap(32), closing('crecimiento', 'Tu próxima venta puede empezar hoy', 'Publica en el mismo lugar donde ya compras.', CTA, PUBLICAR_URL),
      gap(24), ps('Usas la misma cuenta de VMC: no tienes que registrarte de nuevo.'),
    ],
  },
  {
    id: 'revendedores-2-rotacion',
    name: 'Revendedores 2 — rota más rápido tu capital',
    subject: 'Cada día que tu carro espera, tu plata también espera',
    preheader: 'Ponlo frente a los compradores que ya entran a VMC.',
    stage: 'Beneficio', leadsTo: ['revendedores-3-como-funciona'],
    hero: hero({ img: `${HERO}/revendedores-2.jpg`, alt: 'Rotación — Revendedora apoyada en su SUV', eyebrow: 'Más rotación para tu negocio', title: `Que tu capital ${acc('no se quede parqueado')}`, perks: ['Miles de compradores', 'Propuestas en Mi Garaje', 'Republica sin costo'], text: 'Tu ganancia está en mover el carro, no en guardarlo. Publícalo donde miles de compradores ya buscan su próxima oportunidad y empieza a recibir propuestas.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Un carro parado no te da margen: te ocupa espacio y te amarra plata. ${b('Mientras más compradores lo vean, más opciones tienes')} de venderlo.`),
      gap(28), cel('propuestas.png', 'Propuestas recibidas en Mi Garaje', 'Más alcance', 'Tu carro, donde están los compradores', [['compras', 'Compradores activos', 'Miles de personas ya entran a VMC a buscar carros.'], ['negociaciones', 'Propuestas a tu cuenta', 'Llegan a Mi Garaje, sin llamadas a deshoras.'], ['fecha', 'Sigue publicado', 'Si no se vende, se republica sin costo adicional.']]),
      gap(32), closing('crecimiento', 'Vende, recupera y vuelve a comprar', 'Mientras antes rota tu carro, antes llega tu siguiente oportunidad.', CTA, PUBLICAR_URL),
      gap(24), ps('Pagas la publicación una sola vez: tu carro sigue publicado hasta que se venda.'),
    ],
  },
  {
    id: 'revendedores-3-como-funciona',
    name: 'Revendedores 3 — cómo funciona: valoriza, publica, negocia',
    subject: 'Valoriza, publica y recibe propuestas: así de simple',
    preheader: 'Tres pasos desde Mi Garaje. El primero es gratis.',
    stage: 'Cómo funciona', leadsTo: ['revendedores-4-costos'],
    hero: hero({ img: `${HERO}/revendedores-3.jpg`, alt: '3 pasos — Revendedor fotografiando su camioneta para publicarla', eyebrow: 'Cómo vender en VMC', title: `De tu patio a las propuestas ${acc('en 3 pasos')}`, perks: ['Valoriza', 'Publica', 'Negocia'], text: 'Valoriza tu carro gratis para fijar tu precio, publícalo como oferta negociable y responde las propuestas desde Mi Garaje.', cta: 'Quiero valorizar mi carro', url: VALORIZA_URL }),
    body: [
      HOLA, gap(8),
      p(`Ya conoces Negociable como comprador. ${b('Ahora te toca el otro lado de la mesa')}: tú recibes las propuestas.`),
      gap(18),
      cels([['formulario.png', 'Formulario de valorización', 'Valoriza', 'Gratis, en 1 minuto.'], ['mi-garaje.png', 'Mi Garaje con Publica tu vehículo', 'Publica', 'Como oferta negociable.'], ['responder.png', 'Propuesta con Aceptar y Contraproponer', 'Negocia', 'Acepta, rechaza o contrapropón.']]),
      gap(24), note('La valorización es un <b>valor referencial con fecha</b>: te orienta para fijar tu precio. No es un precio fijo de venta.'),
      gap(32), closing('valorizaciones', 'Empieza por el paso 1', 'Valoriza tu carro gratis y publica cuando estés listo.', 'Quiero valorizar mi carro', VALORIZA_URL),
      gap(16), link('¿Ya tienes tu precio? Publica tu carro aquí', PUBLICAR_URL),
    ],
  },
  {
    id: 'revendedores-4-costos',
    name: 'Revendedores 4 — costos: 0% de comisión al vender',
    subject: '¿Cuánto te cobra VMC si vendes tu carro? 0% de comisión',
    preheader: 'Un solo pago de 25 SubasCoins al publicar. Nada más al vender.',
    stage: 'Costos', leadsTo: ['revendedores-5-tu-decides'],
    hero: hero({ img: `${HERO}/revendedores-4.jpg`, alt: '0% — Revendedor revisando su celular junto a su sedán', eyebrow: 'Costos claros', title: `Vendes y VMC ${acc('no se lleva comisión')}`, perks: ['25 SubasCoins al publicar', '0% al vender', 'Republica sin costo'], text: 'Publicar cuesta un solo pago de 25 SubasCoins. Si vendes, VMC no te cobra comisión ni porcentaje sobre el precio. Y si no se vende, se republica sin costo adicional.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Como comprador ya conoces la comisión de VMC. ${b('Como vendedor, no la pagas')}: la comisión la paga el comprador que gana.`),
      gap(28), cel('mi-garaje.png', 'Mi Garaje en VMC con Publica tu vehículo', 'Sin letra chica', 'Lo que pagas y lo que no', [['billetera', '25 SubasCoins', 'Un solo pago al publicar tu carro.'], ['precio', '0% al vender', 'Ni comisión ni porcentaje sobre tu precio.'], ['fecha', 'Republica gratis', 'Hasta que se venda, sin pagar de nuevo.']]),
      gap(32), closing('billetera', 'Un pago. Cero comisión.', 'Publica tu carro y quédate con el precio que negocies.', CTA, PUBLICAR_URL),
      gap(24), ps('Así lo dicen los Términos y Condiciones de VMC (sección IV.11.2), por si quieres revisarlo.'),
    ],
  },
  {
    id: 'revendedores-5-tu-decides',
    name: 'Revendedores 5 — confianza: propuestas serias, tú decides',
    subject: 'Tú decides a quién y a cuánto venderle',
    preheader: 'Solo proponen compradores que consignan. La última palabra es tuya.',
    stage: 'Confianza', leadsTo: ['revendedores-6-cuantos'],
    hero: hero({ img: `${HERO}/revendedores-5.jpg`, alt: 'Tú decides — Revendedora respondiendo una propuesta desde su celular', eyebrow: 'Vende con control', title: `Propuestas serias. ${acc('La última palabra es tuya.')}`, perks: ['Compradores que consignan', 'Propuestas de 24 h', 'Tú eliges'], text: 'Para proponerte, el comprador primero consigna en VMC. Tú aceptas, rechazas o contrapropones, y eliges la propuesta que más te conviene, no necesariamente la primera.', cta: CTA, url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Vender por tu cuenta suele traer curiosos, regateos eternos y llamadas a deshoras. ${b('En VMC, cada propuesta llega con respaldo')}.`),
      gap(28), cel('responder.png', 'Pantalla de una propuesta con Aceptar y Contraproponer', 'Reglas claras', 'Así se negocia en VMC', [['verificado', 'Consignan para proponer', 'Solo propone quien deja su consignación.'], ['fecha', 'Cada propuesta vence en 24 h', 'Las negociaciones no se quedan colgadas.'], ['negociaciones', 'Tú eliges', 'Acepta la que te convenga, sin importar el orden.']]),
      gap(32), closing('verificado', 'Negocia con quien va en serio', 'Publica tu carro y recibe propuestas con respaldo.', CTA, PUBLICAR_URL),
      gap(24), ps('Además, VMC valida el resultado de cada negociación para asegurar que todo sea correcto.'),
    ],
  },
  {
    id: 'revendedores-6-cuantos',
    name: 'Revendedores 6 — cierre: publica el primero hoy',
    subject: '¿Cuántos carros tienes esperando comprador?',
    preheader: 'Publica el primero hoy y empieza a recibir propuestas.',
    stage: 'Cierre',
    hero: hero({ img: `${HERO}/revendedores-6.jpg`, alt: '¿Cuántos? — Socios revendedores frente a tres carros', eyebrow: 'Es tu turno de vender', title: `Publica el primero ${acc('hoy')}`, perks: ['Valoriza gratis', '25 SubasCoins una vez', '0% al vender'], text: 'Cada carro que espera en tu patio es plata que no trabaja. Publícalo hoy en VMC y recibe propuestas directo en Mi Garaje.', cta: 'Publicar mi carro ahora', url: PUBLICAR_URL }),
    body: [
      HOLA, gap(8),
      p(`Ya sabes comprar bien. ${b('Ahora vende igual de bien')}, en el mismo lugar.`),
      gap(28), cel('mi-garaje.png', 'Mi Garaje en VMC con Publica tu vehículo', 'En resumen', 'Todo lo que necesitas para vender', [['valorizaciones', 'Valoriza gratis', 'Tu valor de referencia en 1 minuto.'], ['publicar', 'Publica una vez', '25 SubasCoins; se republica sin costo.'], ['negociaciones', 'Recibe propuestas', 'Acepta, rechaza o contrapropón.']]),
      gap(32), closing('publicar', 'Tu próximo margen está en tu patio', 'Publica tu carro hoy y deja que las propuestas lleguen.', 'Publicar mi carro ahora', PUBLICAR_URL),
      gap(16), link('¿Primero quieres saber cuánto vale? Valorízalo gratis', VALORIZA_URL),
    ],
  },
];

export const CAMPANA_REVENDEDORES: EmailTemplate[] = DEFS.map((d) => ({
  id: d.id, name: d.name, subject: d.subject, category: CATEGORIA, stage: d.stage, leadsTo: d.leadsTo,
  sections: [],
  html: build(d),
}));
