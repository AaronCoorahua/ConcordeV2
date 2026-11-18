/**
 * Datos de ejemplo del Index (vmc-index-lab, HomeIndexBlock.tsx). Sin inventario real.
 * Módulo plano: lo usan el bloque de escritorio y el de celular.
 */
import type { LotRowItem } from "@/src/components/LotGallery";
import type { OfferTypeItem } from "@/src/components/OfferTypeCards";
import type { Sec as VidrioName } from "@/src/components/Vidrio";

/** Carta destacada de cada tienda (props de FeaturedCard, sin íconos: se agregan en el bloque). */
export type FeaturedLot = {
  image: string; title: string; subtitle: string; live: boolean; photos: number; price: string;
  transmission: string; fuel: string; km: string; seats: number;
};
export type Store = { name: string; logo: string; total: number; featured: FeaturedLot; lots: LotRowItem[] };

// Los lotes de la derecha llenan columna por columna (LotGallery): este orden repite las filas del Index
// (fila 1: Grand i10 · Agya, fila 2: Refine · Caterpillar, fila 3: vigas · Sportage).
export const STORES: Store[] = [
  {
    name: "Autoplan", logo: "/index/demo/empresas/autoplan.png", total: 9,
    featured: { image: "/index/demo/vehicles/autoplan-yaris.jpg", title: "Toyota Yaris", subtitle: "2022 · Hatchback", live: true, photos: 12,
      price: "US$ 2,799", transmission: "Automática", fuel: "Gasolina", km: "45,000 km", seats: 5 },
    lots: [
      { image: "/index/demo/vehicles/autoplan-grand-i10.jpg", title: "Hyundai Grand i10 2021", tone: "live", price: "US$ 2,199", details: "38,200 km · Mecánica · Gasolina", location: "Lima" },
      { image: "/index/demo/vehicles/autoplan-refine.jpg", title: "Jac Refine 2022", tone: "negotiable", details: "61,500 km · Mecánica · Diésel", location: "Arequipa" },
      { image: "/index/demo/inventory-steel-v1.jpg", title: "Lote de vigas 2024", tone: "negotiable", details: "12 t · Acero A36 · Vigas H", location: "Callao" },
      { image: "/index/demo/vehicles/autoplan-agya.jpg", title: "Toyota Agya 2023", tone: "negotiable", details: "32,000 km · Automática · Gasolina", location: "Lima" },
      { image: "/index/demo/inventory-excavator-v1.jpg", title: "Caterpillar 320 2019", tone: "live", price: "US$ 45,000", details: "6,200 h · Hidráulica · Diésel", location: "Lima" },
      { image: "/index/demo/vehicles/autoplan-suv.jpg", title: "Kia Sportage 2020", tone: "live", price: "US$ 8,450", details: "52,300 km · Automática · Gasolina", location: "Lima" },
    ],
  },
  {
    name: "Mapfre", logo: "/index/demo/empresas/mapfre.png", total: 9,
    featured: { image: "/index/demo/vehicles/mapfre-tucson.jpg", title: "Hyundai Tucson", subtitle: "2021 · SUV", live: false, photos: 16,
      price: "US$ 11,400", transmission: "Automática", fuel: "Gasolina", km: "34,500 km", seats: 5 },
    lots: [
      { image: "/index/demo/vehicles/mapfre-rio.jpg", title: "Kia Rio 2020", tone: "live", price: "US$ 6,300", details: "48,000 km · Mecánica · Gasolina", location: "Lima" },
      { image: "/index/demo/vehicles/autoplan-sedan.jpg", title: "Nissan Versa 2022", tone: "negotiable", details: "21,000 km · Automática · Gasolina", location: "Lima" },
      { image: "/index/demo/vehicles/autoplan-pickup.jpg", title: "Mitsubishi L200 2018", tone: "negotiable", details: "96,000 km · Mecánica · Diésel", location: "Trujillo" },
      { image: "/index/demo/vehicles/mapfre-pickup.jpg", title: "Toyota Hilux 2019", tone: "negotiable", details: "72,000 km · Mecánica · Diésel", location: "Arequipa" },
      { image: "/index/demo/vehicles/autoplan-grand-i10.jpg", title: "Chevrolet Onix 2021", tone: "live", price: "US$ 5,900", details: "39,500 km · Mecánica · Gasolina", location: "Lima" },
      { image: "/index/demo/vehicles/autoplan-suv.jpg", title: "Suzuki Vitara 2020", tone: "live", price: "US$ 8,700", details: "44,000 km · Automática · Gasolina", location: "Lima" },
    ],
  },
];

/** «Tipo de oferta» (vista «Corta» del lab: con foto, bajo el banner). */
export const OFFER_TYPES: OfferTypeItem[] = [
  { tone: "negotiable", title: "Recibe ofertas", text: "Envía tu propuesta y negocia directo con el vendedor", cta: "Ver lotes", image: "/index/banners/vmc/tipo-oferta-recibe-ofertas.jpg" },
  { tone: "live", title: "En vivo", text: "Participa en subastas en tiempo real", cta: "Ver subastas", image: "/index/banners/vmc/tipo-oferta-en-vivo.jpg" },
];

/** «Explora por categoría»: seis cards con foto, ícono de vidrio y conteo. */
export const CATEGORIES: { label: string; count: string; icon: VidrioName; image: string }[] = [
  { label: "Vehicular", count: "21 lotes", icon: "vehicular", image: "/index/demo/inventory-suv-v1.jpg" },
  { label: "Equipos diversos", count: "12 lotes", icon: "equipos", image: "/index/demo/inventory-forklift-v1.jpg" },
  { label: "Maquinaria", count: "2 lotes", icon: "maquinaria", image: "/index/demo/inventory-excavator-v1.jpg" },
  { label: "Materiales", count: "1 lote", icon: "materiales", image: "/index/demo/inventory-steel-v1.jpg" },
  { label: "Mobiliario", count: "3 lotes", icon: "mobiliario", image: "/index/demo/inventory-furniture-v1.jpg" },
  { label: "Artículos diversos", count: "1 lote", icon: "articulos", image: "/index/demo/inventory-mosaic-v1.jpg" },
];

/** «Empresas que publican en VMC». Logos oficiales; Mapfre y su conteo son de ejemplo. */
export const COMPANIES = [
  { name: "Autoplan", lots: "3 lotes", logo: "/index/demo/empresas/autoplan.png" },
  { name: "Pacífico", lots: "2 lotes", logo: "/index/demo/empresas/pacifico.png" },
  { name: "Mapfre", lots: "4 lotes", logo: "/index/demo/empresas/mapfre.png" },
  { name: "Trupal S.A.", lots: "2 lotes", logo: "/index/demo/empresas/trupal.svg" },
];
