/**
 * /handoff/lotgallery — Documentación de LotGallery (galería de lotes de cada tienda del Index).
 */
import type { JSX } from "react";
import { CardIcons, FeaturedCard } from "@/src/components/FeaturedCard";
import { LotGallery } from "@/src/components/LotGallery";
import { STORES } from "@/src/blocks/index/shared/data";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const store = STORES[0];
const f = store.featured;
const featured = (
  <FeaturedCard image={f.image} title={f.title} subtitle={f.subtitle} featured photos={f.photos} price={f.price}
    chips={[{ icon: CardIcons.gear, label: f.transmission }, { icon: CardIcons.fuel, label: f.fuel }]}
    stats={[{ icon: CardIcons.gauge, label: f.km }, { icon: CardIcons.seats, label: `${f.seats} asientos` }]} height="100%" fillMedia />
);

const USAGE = `import { LotGallery } from "@/src/components/LotGallery";
import { FeaturedCard } from "@/src/components/FeaturedCard";

<LotGallery
  featured={<FeaturedCard image="/fotos/yaris.jpg" title="Toyota Yaris" subtitle="2022 · Hatchback" featured price="US$ 2,799" height="100%" fillMedia />}
  items={[
    { image: "/fotos/i10.jpg", title: "Hyundai Grand i10 2021", tone: "live", price: "US$ 2,199",
      details: "38,200 km · Mecánica · Gasolina", location: "Lima" },
    { image: "/fotos/agya.jpg", title: "Toyota Agya 2023", tone: "negotiable",
      details: "32,000 km · Automática · Gasolina", location: "Lima" },
  ]}
/>`;

export default function LotGalleryHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="LotGallery"
      summary="Carta destacada a la izquierda y los lotes a la derecha, llenando columna por columna (3 filas por columna). Con pocos lotes el espacio queda reservado. Bajo 700 px todo va en una columna."
      note={<>Viene de vmc-index-lab. En el Index reemplaza a la fila de 4 OfferCard del AuctioneerSection. Cada fila (LotRow) lleva foto con favorito, pill de estado, nombre, precio o Haz tu oferta, datos y ciudad.</>}
      hero={{ node: <div style={{ width: 720 }}><LotGallery featured={featured} items={store.lots} height={356} /></div>, code: `<LotGallery featured={<FeaturedCard … />} items={lotes} />`, minHeight: 420 }}
      installName="lotgallery"
      usage={USAGE}
      examples={[
        { title: "Con 2 lotes", description: "La segunda columna queda reservada; nada se ensancha.", minHeight: 420,
          node: <div style={{ width: 720 }}><LotGallery featured={featured} items={store.lots.slice(0, 2)} /></div>, code: `<LotGallery featured={…} items={lotes.slice(0, 2)} />` },
        { title: "Ancho de celular", description: "La carta arriba y las filas debajo.", minHeight: 600,
          node: <div style={{ width: 360 }}><LotGallery featured={featured} items={store.lots.slice(0, 3)} /></div>, code: `<LotGallery featured={…} items={lotes} />` },
      ]}
      api={[
        { name: "featured", type: "ReactNode", description: `Carta de la izquierda; normalmente FeaturedCard con height="100%" y fillMedia.` },
        { name: "items", type: "LotRowItem[]", description: "Lotes en orden: llenan la primera columna de arriba abajo y luego la siguiente." },
        { name: "items[].tone", type: `"live" | "negotiable"`, description: "En vivo (precio) o Recibe ofertas." },
        { name: "items[].title / image", type: "string", description: "Nombre y foto." },
        { name: "items[].price / offerText", type: "string", description: "Precio en vivo o texto en Recibe ofertas." },
        { name: "items[].details / location", type: "string", description: "Datos y ciudad." },
        { name: "columns", type: "number", default: "2", description: "Columnas a la derecha; se reservan aunque estén vacías." },
        { name: "featuredWidth", type: "number", default: "292", description: "Ancho de la destacada en px." },
        { name: "height", type: "number", default: "386", description: "Alto mínimo de la galería en px (el Index usa 356)." },
        { name: "className", type: "string", default: `""` },
      ]}
      files={["src/components/LotGallery.tsx"]}
    />
  );
}
