/**
 * /handoff/herocarousel — Documentación de HeroCarousel (banner principal del Index).
 */
import type { JSX } from "react";
// Las diapositivas se arman en IndexHero (componente cliente): ver la nota en HeroCarousel.tsx.
import IndexHero from "@/src/blocks/index/desktop/IndexHero";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import HeroCarousel, { type HeroSlide } from "@/src/components/HeroCarousel";

const slides: HeroSlide[] = [
  {
    label: "Publica tu auto en VMC y recibe ofertas",
    pill: { tone: "seller", text: "Publica en VMC" },
    title: <>Publica tu auto<br />y <em>recibe ofertas</em></>,
    lead: "Recibe propuestas y elige la que más te convenga.",
    cta: "Publicar mi auto",
    href: "/publicar",
    bg: "linear-gradient(100deg, #2A1670 0%, #3D2299 34%, #6B48DD 76%, #8460E5 100%)",
    copy: "right",
    photo: { src: ["/fotos/publica.jpg"], side: "l", position: "30% 30%" },
  },
  // …
];

// Ocupa el alto de su contenedor. Arma slides en un componente cliente ("use client").
<div style={{ height: 300 }}>
  <HeroCarousel slides={slides} />
</div>`;

export default function HeroCarouselHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="HeroCarousel"
      summary="Banner principal con varias campañas: foto a lo ancho con velo violeta, título que entra letra por letra y un indicador de vidrio en el borde inferior para pasar entre diapositivas. Avanza solo y se pausa con el mouse."
      note={<>Viene de vmc-index-lab (PrincipalBanner, vista elegida: indicador montaña de vidrio y efecto letras). En el Index reemplaza al hueco PRINCIPAL BANNER del Homepage. Flechas del teclado para navegar.</>}
      hero={{ node: <div style={{ width: 640, height: 300, display: "flex" }}><IndexHero /></div>, code: `<HeroCarousel slides={slides} />`, minHeight: 340 }}
      installName="herocarousel"
      usage={USAGE}
      examples={[
        { title: "Ancho de celular", description: "La foto arriba con el velo en vertical y el texto compacto abajo.", minHeight: 340,
          node: <div style={{ width: 360, height: 300, display: "flex" }}><IndexHero /></div>, code: `<HeroCarousel slides={slides} />` },
        { title: "Una sola diapositiva", description: "Sin indicador y sin avance automático.", minHeight: 260,
          node: <div style={{ width: 640, height: 220, display: "flex" }}><IndexHero pick={[1]} /></div>, code: `<HeroCarousel slides={[slide]} />` },
      ]}
      api={[
        { name: "slides", type: "HeroSlide[]", description: "Una diapositiva por elemento." },
        { name: "slides[].label", type: "string", description: "Nombre para lectores de pantalla y para el punto del indicador." },
        { name: "slides[].pill", type: `{ tone: "seller" | "negotiable" | "whatsapp"; text }`, description: "Pill sobre el título." },
        { name: "slides[].title", type: "ReactNode", description: "Admite <em> (resalta en durazno) y <br>." },
        { name: "slides[].lead / cta / href", type: "ReactNode / string / string", description: "Bajada, texto del botón de vidrio y su destino." },
        { name: "slides[].bg", type: "string", description: "Degradado de fondo." },
        { name: "slides[].copy", type: `"left" | "right"`, description: "Lado del texto." },
        { name: "slides[].photo", type: `{ src: string[]; side: "l" | "r"; position; alto? }`, description: "Fotos (rotan al volver), lado de la persona, encuadre y si encaja por alto." },
        { name: "autoplayMs", type: "number", default: "7000", description: "Tiempo por diapositiva." },
        { name: "ariaLabel", type: "string", default: `"Destacados"` },
        { name: "className", type: "string", default: `""` },
      ]}
      files={["src/components/HeroCarousel.tsx", "src/components/GlassButton.tsx"]}
    />
  );
}
