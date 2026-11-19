"use client";

import { useState } from "react";
import type { JSX } from "react";
import { VehicleRow } from "@/src/components/VehicleRow";
import { StatusTag } from "@/src/components/StatusTag";

const photo = (slug: string) => `/mi-garaje/garage-photos/${slug}/1.jpg`;
const open = () => undefined;
/** Mismo marco que en Mi Garaje: la columna de Tu actividad (435 px de filas) y la base que heredan ahí (Plus Jakarta Sans, alto de línea normal). */
export const SCREEN = { display: "grid", width: "100%", maxWidth: 435, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" } as const;

/** Filas de Mi Garaje con sus datos de ejemplo: Mis negociaciones · Compras (bp1, sn1, sf1) y Mis participaciones (sp1, sp4, sp3).
 *  Van en un componente cliente porque tienen onClick, y el plazo para responder se calcula al abrir la página. */
export default function VehicleRowDemo({ set }: { set: "negociaciones" | "participaciones" }): JSX.Element {
  const [now] = useState(() => Date.now());
  if (set === "participaciones") return <div style={SCREEN}>
    <VehicleRow photo={photo("accent")} name="Hyundai Accent" year={2018} meta="Sala abierta" isNew side={<StatusTag tone="live">En vivo</StatusTag>} onClick={open} />
    <VehicleRow photo={photo("sail")} name="Chevrolet Sail" year={2019} meta="Inicia 17/10 · 11:00 am" onClick={open} />
    <VehicleRow photo={photo("etios")} name="Toyota Etios" year={2020} meta="Inicia 15/10 · 1:00 pm" onClick={open} />
  </div>;
  return <div style={SCREEN}>
    <VehicleRow photo={photo("sentra")} name="Nissan Sentra" year={2020} respondBy={now + 24 * 3.6e6} meta={"Tú: US$ 14,500 (1/5)"}
      side={<small className="fr__ago">1 min</small>} onClick={open} opensDialog />
    <VehicleRow photo={photo("mazda3")} name="Mazda 3" year={2018} respondBy={now + 23.8 * 3.6e6} meta={"Contrapropuesta recibida · US$ 13,500 (2/5)"}
      side={<small>12 min</small>} onClick={open} opensDialog />
    <VehicleRow photo={photo("picanto")} name="Kia Picanto" year={2021} respondBy={now + 23.5 * 3.6e6} meta={"Tú: US$ 8,700 (5/5)"}
      side={<small className="fr__ago">31 min</small>} onClick={open} opensDialog />
  </div>;
}
