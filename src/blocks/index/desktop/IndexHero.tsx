"use client";

/**
 * IndexHero — banner principal del Index: las 3 campañas de VMC en un HeroCarousel.
 * Reemplaza el hueco «PRINCIPAL BANNER» del Homepage. Copy provisional (lo ajusta Julio).
 * Es componente cliente a propósito: HeroCarousel recorre el JSX del título para animarlo letra por letra,
 * y ese JSX tiene que crearse en el cliente (si llega serializado desde un Server Component, no hidrata igual).
 */
import type { JSX } from "react";
import HeroCarousel, { type HeroSlide } from "@/src/components/HeroCarousel";

export const INDEX_SLIDES: HeroSlide[] = [
  { label: "Entérate primero de las subastas por WhatsApp", pill: { tone: "whatsapp", text: "Canal de WhatsApp" },
    title: <>Entérate <em>primero</em><br />de las subastas</>, lead: <>Únete al canal de VMC y recibe los lotes<br />nuevos antes que nadie.</>,
    cta: "Unirme al canal", bg: "linear-gradient(100deg, #2A1670 0%, #3D2299 34%, #0E7A5A 78%, #25D366 100%)",
    photo: { src: ["/index/banners/vmc/hero-whatsapp-c.jpg", "/index/banners/vmc/hero-whatsapp.jpg"], side: "r", position: "70% 30%", alto: true }, copy: "left" },
  { label: "Publica tu auto en VMC y recibe ofertas", pill: { tone: "seller", text: "Publica en VMC" },
    title: <>Publica tu auto<br />y <em>recibe ofertas</em></>, lead: <>Recibe propuestas y elige la que más te convenga.</>,
    cta: "Publicar mi auto", bg: "linear-gradient(100deg, #2A1670 0%, #3D2299 34%, #6B48DD 76%, #8460E5 100%)",
    photo: { src: ["/index/banners/vmc/hero-publica.jpg"], side: "l", position: "30% 30%" }, copy: "right" },
  { label: "Tú pones el precio y el 100% es tuyo", pill: { tone: "negotiable", text: "Recibe ofertas" },
    title: <>¡Tú pones el precio<br />y <em>el 100% es tuyo</em>!</>, lead: <>Publica tu auto en minutos y negocia directo con los compradores.</>,
    cta: "¡Publica ahora!", bg: "linear-gradient(100deg, #2A1670 0%, #3D2299 35%, #00838C 78%, #00D2D3 100%)",
    photo: { src: ["/index/banners/vmc/hero-negociable-a.jpg"], side: "r", position: "70% 20%", alto: true }, copy: "left" },
];

/** `pick`: índices de las diapositivas a mostrar (por defecto, las 3). */
export default function IndexHero({ pick }: { pick?: number[] }): JSX.Element {
  return <HeroCarousel slides={pick ? pick.map((i) => INDEX_SLIDES[i]) : INDEX_SLIDES} />;
}
