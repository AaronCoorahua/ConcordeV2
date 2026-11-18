"use client";

/**
 * AdStrip — franja de publicidad de Subastop entre las dos tiendas (vmc-index-lab, AdStrip).
 * Ocupa el lugar del «BANNER · 766 × 100» del Homepage. Pieza «Venta para empresas · 03 Tecnología» en HTML propio
 * (public/index/banners/venta-empresa.html, con el sistema de subastop.com): franja 1532 × 200 en escritorio y 776 × 232
 * en celular. El iframe se dibuja a su tamaño de diseño y se escala al ancho disponible, como una imagen.
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

export default function AdStrip(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const f = w > 0 && w < 600 ? { id: "strip776", w: 776, h: 232 } : { id: "strip1532", w: 1532, h: 200 };
  return (
    <aside ref={ref} aria-label="Publicidad" style={{ position: "relative", display: "block", width: "100%", overflow: "hidden", borderRadius: 16,
      boxShadow: "rgba(0,0,0,0.07) 0px 0px 16px 4px", aspectRatio: `${f.w} / ${f.h}` }}>
      {w ? <iframe key={f.id} src={`/index/banners/venta-empresa.html?v=03-tecnologia&f=${f.id}`} title="Venta para empresas: ¿Renovaste tecnología? Vende la anterior."
        width={f.w} height={f.h} loading="lazy" style={{ position: "absolute", top: 0, left: 0, display: "block", border: 0, transformOrigin: "0 0", transform: `scale(${w / f.w})` }} /> : null}
    </aside>
  );
}
