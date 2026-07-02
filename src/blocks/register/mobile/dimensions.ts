/**
 * Dimensiones del bloque Register (mobile) — módulo plano sin "use client".
 * Los Server Components y los Viewers pueden importar estas constantes
 * sin cruzar la barrera "use client" → undefined → NaN.
 *
 * Altura: Header + heading + PersonalDataCard + BillingCard + nota
 * "Importante" (primera parte de mobile — faltan banners y TermsAcceptance).
 * Es una ESTIMACIÓN con margen de sobra a propósito (no hay Puppeteer en el
 * repo para medir el DOM real) — si queda CORTA, el canvas la recorta; si
 * queda LARGA, sólo sobra fondo morado debajo. Ajustar tras verla en el navegador.
 */

export const REGISTER_MOBILE_WIDTH = 420;
export const REGISTER_MOBILE_HEIGHT = 1250;
