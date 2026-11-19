/**
 * /handoff/recommendedlist — Documentación de RecommendedList (Recomendados del riel de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { RecommendedList, type RecommendedItem } from "@/src/components/RecommendedList";

const photo = (slug: string) => `/mi-garaje/garage-photos/${slug}/1.jpg`;
// Los de Mi Garaje.
const RECS: RecommendedItem[] = [
  { name: "Nissan Versa", year: 2020, price: "US$ 9,300", imageSrc: photo("versa"), badge: "negotiable" },
  { name: "Nissan Sentra", year: 2021, price: "US$ 11,500", imageSrc: photo("sentra"), badge: "live" },
  { name: "Suzuki Swift", year: 2019, price: "US$ 7,800", imageSrc: photo("swift"), badge: "live" },
];

const USAGE = `import { RecommendedList } from "@/src/components/RecommendedList";

<RecommendedList href="/recomendados" items={[
  { name: "Nissan Versa", year: 2020, imageSrc: foto, badge: "negotiable" },
  { name: "Nissan Sentra", year: 2021, price: "US$ 11,500", imageSrc: foto, badge: "live" },
]} />`;

export default function RecommendedListHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="RecommendedList"
      summary="Recomendados: tarjeta blanca con el encabezado de las secciones de Tu actividad (ícono de vidrio, título y cuántos hay) y una fila por vehículo con EN VIVO o NEGOCIABLE, nombre y año, precio base y LikeButton."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, riel derecho bajo la publicidad; en móvil, después de Tu actividad). Todo el encabezado es un enlace; el precio base sale solo en vivo. Usa los estilos del encabezado de ActivitySection, Vidrio, BadgeStatus, PriceIcon y LikeButton. El ejemplo va en el ancho del riel (300 px) y con la base de la página (Plus Jakarta Sans y alto de línea normal).</>}
      hero={{ node: <div style={{ width: "100%", maxWidth: 300, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}><RecommendedList items={RECS} href="#" /></div>, minHeight: 360,
        code: `<RecommendedList items={recomendados} href="#" />` }}
      installName="recommendedlist"
      usage={USAGE}
      api={[
        { name: "items", type: "RecommendedItem[]", description: "{ name, year, imageSrc, badge: live | negotiable, price? }. El precio se muestra solo en vivo." },
        { name: "href", type: "string", description: "Destino del encabezado." },
      ]}
      files={["src/components/RecommendedList.tsx", "src/components/ActivitySection.tsx"]}
    />
  );
}
