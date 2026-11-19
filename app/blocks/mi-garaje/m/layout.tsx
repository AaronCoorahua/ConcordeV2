import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import VisorFlag from "./VisorFlag";

// Fuentes de Mi Garaje (como el layout del lab): el CSS del bloque las toma de --font-jakarta y --font-roboto-mono.
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const mono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"], weight: ["500", "700"] });

/*
 * Base del lab (VMC Laptop · mi-garaje-lab/app/globals.css). El lab no carga el reset de Tailwind (preflight) que
 * Concorde aplica a todo el sitio: sin esto, Mi Garaje sale con Geist, alto de línea 1.5 y sin los márgenes del
 * navegador, y todo queda más alto que en el lab. Va en @layer base, después del preflight: `all: revert-layer` deshace el preflight y devuelve
 * cada propiedad al valor del navegador (sin perder los atributos de SVG e img), y el CSS del bloque y de los componentes (sin capa) sigue ganando.
 */
const LAB_BASE = String.raw`
@layer base {
  .mg-lab, .mg-lab *, .mg-lab *::before, .mg-lab *::after { all: revert-layer; box-sizing: border-box; }
  .mg-lab {
    --vmc-font-display: var(--font-jakarta), "Plus Jakarta Sans", -apple-system, sans-serif;
    --vmc-font-mono: var(--font-roboto-mono), "Roboto Mono", ui-monospace, monospace;
    display: block; color: #191c1c; font-family: var(--vmc-font-display);
  }
  .mg-lab :focus-visible { outline: 2px solid #8460e5; outline-offset: 2px; }
  .mg-lab ::selection { background: #8460e5; color: #fff; }
  html:has(.mg-lab), body:has(.mg-lab) { margin: 0; background: #f7f7fb; color: #191c1c; line-height: normal; font-family: var(--font-jakarta), "Plus Jakarta Sans", -apple-system, sans-serif; }
}
`;

/*
 * Dentro del visor de Concorde (iframe, <html data-visor> lo pone VisorFlag): los controles del lab van más chicos y
 * plegados, abajo a la derecha, para no tapar la pantalla. Se abren al pasar el mouse o con el teclado (Modal de
 * propuesta, Ubicación del aviso) o con su botón (Revisión SubasChat). En pantalla completa quedan como en el lab.
 */
const VISOR = String.raw`
html[data-visor], html[data-visor] body { background: #2E0F70; } /* el visor escala la pantalla: sin esto el fondo claro asoma como líneas en las uniones */
html[data-visor] .pp-sw { zoom: .78; padding: 8px 12px; gap: 6px; }
html[data-visor] .pp-sw:hover, html[data-visor] .pp-sw:focus-within { z-index: 95; }
html[data-visor] .pp-sw:not(:hover):not(:focus-within) .f-sw__g { display: none; }
html[data-visor] .pp-sw .f-sw__bar { margin: 0; cursor: default; }
html[data-visor] .pp-sw .f-sw__bar b::after { content: " ▴"; font-weight: 600; color: #8460E5; }
html[data-visor] .pp-sw--safety { bottom: 72px; }
html[data-visor] { --rev-w: 0px; }
html[data-visor] .of-main { padding-right: 16px; }
html[data-visor] .rev { zoom: .82; top: auto; left: auto; bottom: 16px; right: 16px; width: 260px; max-height: 80vh; border: 1px solid #e3e1ec; border-radius: 14px; box-shadow: 0 12px 32px rgba(34, 0, 92, 0.22); }
html[data-visor] .rev:not(.is-open) { width: auto; padding: 0; overflow: hidden; }
html[data-visor] .rev:not(.is-open) > :not(.rev__toggle) { display: none; }
html[data-visor] .rev__toggle { display: block; width: 100%; padding: 10px 14px; border: 0; font: inherit; font-weight: 700; color: #3B1782; background: #fff; cursor: pointer; text-align: left; }
`;

/** /blocks/mi-garaje/m/* — pantallas de Mi Garaje a pantalla completa (las muestra el visor en un iframe). */
export default function MiGarajeScreensLayout({ children }: { children: ReactNode }) {
  return <div className={`mg-lab ${jakarta.variable} ${mono.variable}`}>
    <style dangerouslySetInnerHTML={{ __html: LAB_BASE }} />
    <style dangerouslySetInnerHTML={{ __html: VISOR }} />
    <VisorFlag />
    {children}
  </div>;
}
