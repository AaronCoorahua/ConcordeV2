/**
 * Dimensiones del bloque Register (desktop) — módulo plano sin "use client".
 * Los Server Components y los Viewers pueden importar estas constantes
 * sin cruzar la barrera "use client" → undefined → NaN.
 *
 * Altura: Header + heading + PersonalDataCard + BillingCard + nota
 * "Importante" + banner T&C + TermsAcceptance + banner Centro de Ayuda. Es
 * una ESTIMACIÓN con margen de sobra a propósito (no hay Puppeteer/Playwright
 * en el repo para medir el DOM real) — si REGISTER_HEIGHT queda CORTO, el
 * canvas (que usa overflow: hidden en RegisterViewer) recorta el contenido;
 * si queda LARGO, sólo sobra fondo morado debajo. Prefiere quedarse largo.
 * Ajustar tras verla en el navegador.
 */

export const REGISTER_WIDTH = 798;
export const REGISTER_HEIGHT = 1450;
