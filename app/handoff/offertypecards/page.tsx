/**
 * /handoff/offertypecards — Documentación de OfferTypeCards (Tipo de oferta del Index).
 */
import type { JSX } from "react";
import OfferTypeCards, { type OfferTypeItem } from "@/src/components/OfferTypeCards";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const ITEMS: OfferTypeItem[] = [
  { tone: "negotiable", title: "Recibe ofertas", text: "Envía tu propuesta y negocia directo con el vendedor", cta: "Ver lotes", image: "/index/banners/vmc/tipo-oferta-recibe-ofertas.jpg" },
  { tone: "live", title: "En vivo", text: "Participa en subastas en tiempo real", cta: "Ver subastas", image: "/index/banners/vmc/tipo-oferta-en-vivo.jpg" },
];

const USAGE = `import OfferTypeCards from "@/src/components/OfferTypeCards";

<OfferTypeCards
  items={[
    { tone: "negotiable", title: "Recibe ofertas", text: "Envía tu propuesta y negocia directo con el vendedor",
      cta: "Ver lotes", image: "/fotos/recibe-ofertas.jpg", href: "/negociables" },
    { tone: "live", title: "En vivo", text: "Participa en subastas en tiempo real",
      cta: "Ver subastas", image: "/fotos/en-vivo.jpg", href: "/subastas" },
  ]}
/>`;

export default function OfferTypeCardsHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="OfferTypeCards"
      summary="Tarjetas para elegir el tipo de oferta. Al pasar el mouse crecen, se desenfocan y muestran un botón de vidrio."
      note={<>Viene de vmc-index-lab. En el Index reemplaza a OfferType. Se adapta a su ancho: bajo 560 px las tarjetas se compactan y bajo 300 px se apilan.</>}
      hero={{ node: <div style={{ width: 600 }}><OfferTypeCards items={ITEMS} /></div>, code: `<OfferTypeCards items={items} />`, minHeight: 200 }}
      installName="offertypecards"
      usage={USAGE}
      examples={[
        { title: "Sin foto", description: "Sin image queda solo el degradado de la modalidad.",
          node: <div style={{ width: 600 }}><OfferTypeCards items={ITEMS.map((t) => ({ ...t, image: undefined }))} /></div>,
          code: `<OfferTypeCards items={[{ tone: "live", title: "En vivo", text: "…", cta: "Ver subastas" }]} />` },
        { title: "Ancho de celular", description: "Las dos tarjetas lado a lado y más bajas.",
          node: <div style={{ width: 360 }}><OfferTypeCards items={ITEMS} /></div>, code: `<OfferTypeCards items={items} />` },
      ]}
      api={[
        { name: "items", type: "OfferTypeItem[]", description: "Una tarjeta por elemento." },
        { name: "items[].tone", type: `"live" | "negotiable"`, description: "Colores de la tarjeta (naranja o cian a violeta)." },
        { name: "items[].title", type: "string", description: "Texto de la pill." },
        { name: "items[].text", type: "string", description: "Descripción." },
        { name: "items[].cta", type: "string", description: "Texto del botón que aparece al pasar el mouse." },
        { name: "items[].image", type: "string", description: "Foto a la derecha (opcional)." },
        { name: "items[].href / onClick", type: "string / () => void", description: "Destino o acción." },
        { name: "items[].icon", type: "ReactNode", description: "Ícono propio de la pill." },
        { name: "items[].colors", type: "{ bg, shade, glow, ink }", description: "Colores propios para otra modalidad." },
        { name: "className", type: "string", default: `""` },
      ]}
      files={["src/components/OfferTypeCards.tsx"]}
    />
  );
}
