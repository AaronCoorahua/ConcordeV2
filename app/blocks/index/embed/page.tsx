import type { JSX } from "react";
import IndexMobile from "@/src/blocks/index/mobile/IndexMobile";
import { indexFont } from "../font";

/**
 * /blocks/index/embed — solo el Index de celular a pantalla completa, sin el Header del catálogo.
 * Lo usa el visor de /blocks/index dentro de un iframe de 393 × 852, para que las media queries del bloque
 * respondan al ancho real del teléfono.
 */
export default function IndexEmbedPage(): JSX.Element {
  return (
    <div className={indexFont.variable} style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" }}>
      <IndexMobile />
    </div>
  );
}
