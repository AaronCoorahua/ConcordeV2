"use client";

/**
 * AdBanner — espacio de publicidad de Mi Garaje (/blocks/mi-garaje/m/vmc) con una pieza HTML de /banners (p. ej.
 * «Conoce su valor y publícalo en VMC.»). «rail»: en el riel derecho, 300 px de ancho y el alto de su contenido; bajo 1100 px
 * cambia a la tira horizontal (776 × 232). «side»: llena el espacio del banner de la barra lateral (200 × 400). El enlace
 * vive dentro de la pieza. Solo depende de React.
 */
import type { JSX } from "react";

export const AD_BANNER_CSS = String.raw`
.f-ad { display:grid; gap:6px; }
.f-camp--arte iframe { display:block; width:100%; border:0; border-radius:8px; box-shadow:0 0 0 1px #E1E3E2; }
.f-camp__lg { height:320px; }
.f-camp__sm { display:none !important; max-width:776px; aspect-ratio:776/232; }
@media (max-width:1100px) { .f-camp__lg { display:none !important; } .f-camp__sm { display:block !important; } }
.pr-arte--side { position:absolute; inset:0; display:block; width:100%; height:100%; border:0; border-radius:inherit; }
`;

export interface AdBannerProps {
  /** «rail»: riel derecho (alto según el contenido, tira bajo 1100 px). «side»: llena el banner de la barra lateral. */
  slot: "rail" | "side";
  /** URL de la pieza vertical (en «rail», la de escritorio; en «side», la única). */
  src: string;
  /** URL de la tira horizontal (solo «rail»). */
  stripSrc?: string;
  /** Título accesible del iframe (p. ej. «Publicidad: Conoce su valor y publícalo en VMC.»). */
  title: string;
}

/** El iframe toma el alto de su contenido (mismo origen): el riel cambia de ancho y el texto de líneas; un alto fijo cortaba el botón. */
function fit(f: HTMLIFrameElement | null): void {
  if (!f) return;
  // Con ref y no onLoad: el iframe puede cargar antes de la hidratación y el onLoad de React no llega.
  const go = () => {
    const d = f.contentDocument, w = f.contentWindow;
    if (!d || !w || d.location.href === "about:blank") return;
    const run = () => { const c = d.querySelector(".cta"); if (c) f.style.height = `${Math.ceil(c.getBoundingClientRect().bottom) + 16}px`; };
    run(); void d.fonts.ready.then(run); w.addEventListener("resize", run);
  };
  if (f.contentDocument?.readyState === "complete") go();
  f.addEventListener("load", go);
}

export function AdBanner({ slot, src, stripSrc, title }: AdBannerProps): JSX.Element {
  const styles = <style href="concorde-ad-banner" precedence="default">{AD_BANNER_CSS}</style>;
  if (slot === "side") return <>{styles}<iframe className="pr-arte pr-arte--side" src={src} title={title} /></>;
  return <>{styles}
    <aside className="f-ad f-camp--arte" aria-label="Publicidad">
      <iframe key={src} className="f-camp__lg" src={src} title={title} ref={fit} />
      {stripSrc ? <iframe className="f-camp__sm" src={stripSrc} title={title} /> : null}
    </aside>
  </>;
}

export default AdBanner;
