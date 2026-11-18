/**
 * /handoff/featuredcard — Documentación de FeaturedCard (carta destacada de las tiendas del Index).
 */
import type { JSX } from "react";
import { CardIcons, FeaturedCard } from "@/src/components/FeaturedCard";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const YARIS = {
  image: "/index/demo/vehicles/autoplan-yaris.jpg", title: "Toyota Yaris", subtitle: "2022 · Hatchback", photos: 12, price: "US$ 2,799",
  chips: [{ icon: CardIcons.gear, label: "Automática" }, { icon: CardIcons.fuel, label: "Gasolina" }],
  stats: [{ icon: CardIcons.gauge, label: "45,000 km" }, { icon: CardIcons.seats, label: "5 asientos" }],
};

const USAGE = `import { CardIcons, FeaturedCard } from "@/src/components/FeaturedCard";

<FeaturedCard
  image="/fotos/yaris.jpg"
  title="Toyota Yaris"
  subtitle="2022 · Hatchback"
  featured
  photos={12}
  chips={[{ icon: CardIcons.gear, label: "Automática" }, { icon: CardIcons.fuel, label: "Gasolina" }]}
  stats={[{ icon: CardIcons.gauge, label: "45,000 km" }, { icon: CardIcons.seats, label: "5 asientos" }]}
  price="US$ 2,799"
  width={292}
  height={386}
  fillMedia
/>`;

export default function FeaturedCardHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="FeaturedCard"
      summary="Carta de lote destacado. Se inclina hacia el mouse con un brillo holográfico; trae pills, favorito, contador de fotos, datos, precio con SubasCoin y la barra de luz abajo."
      note={<>Viene de vmc-index-lab. En el Index reemplaza a OfferCard en la carta grande de cada tienda. Exporta también SubasCoin, el favorito (LikeButton) y los íconos CardIcons y PillIcons, que usa LotGallery.</>}
      hero={{ node: <FeaturedCard {...YARIS} featured width={292} height={386} fillMedia />, code: `<FeaturedCard {...yaris} featured width={292} height={386} fillMedia />`, minHeight: 440 }}
      installName="featuredcard"
      usage={USAGE}
      examples={[
        { title: "Recibe ofertas", description: "Turquesa y Haz tu oferta en lugar del precio.", minHeight: 420,
          node: <FeaturedCard tone="negotiable" image="/index/demo/vehicles/autoplan-agya.jpg" title="Toyota Agya" subtitle="2023 · Hatchback" photos={15}
            chips={[{ icon: CardIcons.gear, label: "Automática" }]} stats={[{ icon: CardIcons.gauge, label: "32,000 km" }]} width={292} height={360} fillMedia />,
          code: `<FeaturedCard tone="negotiable" image="/fotos/agya.jpg" title="Toyota Agya" subtitle="2023 · Hatchback" />` },
        { title: "Sin inclinación ni En vivo", description: "tilt={0} la deja quieta; live={false} quita la pill En vivo y deja el precio.", minHeight: 420,
          node: <FeaturedCard {...YARIS} live={false} tilt={0} width={292} height={360} fillMedia />,
          code: `<FeaturedCard {...yaris} live={false} tilt={0} />` },
      ]}
      api={[
        { name: "image", type: "string", description: "Foto del lote." },
        { name: "title / subtitle", type: "string", description: "Nombre y, debajo, año y tipo." },
        { name: "tone", type: `"live" | "negotiable"`, default: `"live"`, description: "En vivo (naranja, precio) o Recibe ofertas (turquesa, Haz tu oferta)." },
        { name: "featured", type: "boolean", default: "false", description: "Pill Destacado." },
        { name: "live", type: "boolean", default: `tone === "live"`, description: "Pill En vivo." },
        { name: "photos", type: "number", description: "Total del contador de fotos (1/12)." },
        { name: "chips / stats", type: "{ icon?, label }[]", default: "[]", description: "Etiquetas con borde y datos en dos columnas." },
        { name: "price / priceLabel", type: "string", default: `— / "Precio base"`, description: "Precio en vivo." },
        { name: "offerText", type: "string", default: `"Haz tu oferta"`, description: "Texto en Recibe ofertas." },
        { name: "tilt", type: "number", default: "12", description: "Inclinación máxima en grados; 0 la apaga." },
        { name: "width / height", type: "number | string", default: `"100%" / "auto"` },
        { name: "fillMedia", type: "boolean", default: "false", description: "La foto crece para llenar el alto." },
        { name: "liked / onLikeChange", type: "boolean / (v) => void", description: "Favorito controlado desde afuera (opcional)." },
        { name: "onClick", type: "() => void", description: "Clic en la carta." },
      ]}
      files={["src/components/FeaturedCard.tsx", "src/components/LightBar.tsx"]}
    />
  );
}
