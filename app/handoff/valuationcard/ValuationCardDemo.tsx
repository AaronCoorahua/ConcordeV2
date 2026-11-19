"use client";

import type { JSX } from "react";
import Button from "@/src/components/Button";
import { ValuationCard } from "@/src/components/ValuationCard";

const list = { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 16, width: "100%", maxWidth: 760 } as const;
const noop = () => {};

/** Las tres valorizaciones de ejemplo de Mis valorizaciones (Kia lista para publicar; Hilux y Nivus ya publicadas). */
export default function ValuationCardDemo({ only }: { only?: "ready" | "negotiable" }): JSX.Element {
  return <ul style={list}>
    {only !== "negotiable" ? <ValuationCard title="Kia Picanto 2017" subtitle="EX 1.2 MT · 88,000 km" status={{ tone: "wait", label: "Lista para publicar" }}
      valueLabel="Valor de mercado al 01/10" value="US$ 8,090" drift={-2}
      waitLoss={{ amount: "−US$ 330", worth: "US$ 7,760", perDay: "~US$ 1/día" }}
      signal={{ level: 1, label: "No es momento", sublabel: "Demanda baja. Mejor esperar." }}
      onAnalysis={noop} action={<Button variant="primary">Publicar</Button>} /> : null}
    {only !== "ready" ? <>
      <ValuationCard title="Toyota Hilux 2020" subtitle="4×4 SRV · 62,000 km" photo="/mi-garaje/garage-photos/hilux/1.jpg" negotiable
        status={{ tone: "progress", label: "Pendiente de aprobación" }} valueLabel="Valor de mercado al 08/10" value="US$ 27,130"
        detail={{ label: "Revisión de VMC", value: "Pago recibido" }} onAnalysis={noop} action={<Button variant="negotiable">Ver publicación</Button>} />
      <ValuationCard title="Volkswagen Nivus 2022" subtitle="Highline 200 TSI · 38,500 km" photo="/mi-garaje/garage-photos/nivus/1.jpg" negotiable
        status={{ tone: "wait", label: "Publicada" }} valueLabel="Valor de mercado al 30/09" value="US$ 17,960"
        detail={{ label: "Tu publicación", value: "1 oferta recibida" }} onAnalysis={noop} action={<Button variant="negotiable">Ver publicación</Button>} />
    </> : null}
  </ul>;
}
