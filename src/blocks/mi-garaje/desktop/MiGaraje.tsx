/**
 * MiGaraje — Bloque de Concorde (Voyager DS). Evolución del bloque Zona: el área de cuenta de VMC.
 * Origen: ahuacchillo/VMC-Laptop, mi-garaje-lab (rama mi-garaje/vendo-mis-cosas, 9a0fa2b), modo «vmc»
 * (Pulso Fuente dentro de la maqueta de vmcsubastas.com, 1024 px). Sin los paneles de QA del lab (LabPanel no dibuja nada).
 *
 * Una entrada para todas las pantallas de Mi Garaje (como el router /m/[id] del lab):
 *   vmc                 Mi Garaje: cuenta y riesgo, Tu actividad (negociaciones, participaciones, compras, publicaciones,
 *                       valorizaciones), Publicar/Valorizar, billetera, banner y recomendados; vista rápida y negociación en panel.
 *   vmc-propuesta       Comprador: detalle Negociable Basic, «Negocia ahora» y modal de propuesta.
 *   oferta              Detalle tras aceptar, con el SubasChat del acuerdo en lugar del DetailCard.
 *   vmc-valuar          Valorizar en una página: formulario AVT y resultado debajo.
 *   vmc-publica         Publicar: valorizar, información, vista previa y pago.
 *   vmc-valorizaciones  Mis valorizaciones.
 * Responsive en un solo árbol (media queries). Datos, saldos y resultados AVT son de ejemplo, no servicios conectados.
 */
import type { JSX } from "react";
import Garaje, { type CampView, type Features, type Risk, type SideView, type Veh } from "./Garaje";
import Flujo from "./Flujo";
import Oferta from "./Oferta";
import Propuesta from "./Propuesta";
import Valorizaciones from "./Valorizaciones";
import { VALS } from "./valorizaciones-data";
import "./globals.css";
export { MI_GARAJE_WIDTH, MI_GARAJE_HEIGHT } from "./dimensions";

export type MiGarajeScreen = "vmc" | "vmc-propuesta" | "oferta" | "vmc-valuar" | "vmc-publica" | "vmc-valorizaciones";
export const MI_GARAJE_SCREENS: { id: MiGarajeScreen; label: string }[] = [
  { id: "vmc", label: "Mi Garaje" },
  { id: "vmc-propuesta", label: "Propuesta (comprador)" },
  { id: "oferta", label: "Acuerdo con SubasChat" },
  { id: "vmc-valuar", label: "Valorizar" },
  { id: "vmc-publica", label: "Publicar" },
  { id: "vmc-valorizaciones", label: "Mis valorizaciones" },
];

const ALL: Features = { summary: true, next: true, tracker: true, compact: true };
const RISKS: Risk[] = ["muybajo", "bajo", "regular", "alto"];

export interface MiGarajeProps {
  /** Pantalla. Además de las de MI_GARAJE_SCREENS acepta las rutas viejas del lab que enlazan las pantallas
   *  (fuente, valuar, publica, publicar, valorizar, ficha, valorizaciones). */
  screen?: string;
  /** Parámetros de la URL, como en el lab (p. ej. propuesta, compra, desde, resultado, riesgo, banner, empty…). */
  q?: Record<string, string>;
}

export default function MiGaraje({ screen = "vmc", q = {} }: MiGarajeProps): JSX.Element | null {
  const id = screen;
  if (id === "valuar") return <Flujo key={id} from="valorizar" single />;
  if (id === "vmc-valuar") return <Flujo key={id} from="valorizar" single vmc rv={q.resultado} />;
  if (id === "vmc-publica") return <Flujo key={id + (q.desde ?? "")} from="publicar" single vmc fromSaved={!!q.desde} saved={VALS.find((v) => v.id === q.desde)} rv={q.resultado} />;
  if (id === "ficha") return <Flujo key={id} from="valorizar" single ficha />;
  if (id === "publica") return <Flujo key={id + (q.desde ?? "")} from="publicar" single fromSaved={!!q.desde} />;
  if (id === "publicar" || id === "valorizar") return <Flujo key={id + (q.desde ?? "")} from={id} fromSaved={!!q.desde} />;
  if (id === "oferta") return <Oferta q={q} />;
  if (id === "vmc-propuesta") return <Propuesta modal={q.modal} disclaimer={q.disclaimer} />;
  if (id === "valorizaciones" || id === "vmc-valorizaciones") return <Valorizaciones vmc={id === "vmc-valorizaciones"} isEmpty={q.empty === "1"} />;
  if (id === "vmc" || id === "fuente") {
    // vmc sin ?propuesta abre con una de ejemplo (US$ 14,500); ?propuesta=0 la quita; llegando desde el flujo (?propuesta=…) sale el foco.
    return <Garaje variant="fernando" features={ALL} sober vmc withData={q.datos !== "0"}
      risk={(RISKS.includes(q.riesgo as Risk) ? q.riesgo : "muybajo") as Risk} pass={q.pass === "1"} camp={q.banner as CampView}
      lateral={q.lateral as SideView} vehiculo={q.vehiculo as Veh} variante={q.variante}
      propuesta={id === "vmc" ? Number(q.propuesta) || (q.compra || q.propuesta === "0" ? undefined : 14500) : undefined}
      demo={id === "vmc" && !q.propuesta && !q.compra} compra={id === "vmc" ? Number(q.compra) || undefined : undefined}
      withNews={q.news !== "0"} isEmpty={q.empty === "1"} isLoading={q.loading === "1"} />;
  }
  return null;
}
