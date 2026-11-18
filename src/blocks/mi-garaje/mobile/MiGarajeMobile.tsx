/**
 * MiGarajeMobile — Mi Garaje en celular. Es el mismo bloque: el lab resuelve el celular con media queries
 * (bajo 1024 px el sidebar pasa a drawer con hamburguesa y el contenido va en una columna).
 * Se monta a pantalla completa; en el visor de /blocks va dentro de un iframe de 393 × 852.
 */
import type { JSX } from "react";
import MiGaraje, { type MiGarajeProps } from "../desktop/MiGaraje";
export { MI_GARAJE_MOBILE_WIDTH, MI_GARAJE_MOBILE_HEIGHT } from "./dimensions";

export default function MiGarajeMobile(props: MiGarajeProps): JSX.Element | null {
  return <MiGaraje {...props} />;
}
