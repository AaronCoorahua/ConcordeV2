"use client";

import { useState } from "react";
import type { JSX } from "react";
import { ActivitySection } from "@/src/components/ActivitySection";
import { FolderTabs } from "@/src/components/FolderTabs";
import { VehicleRow } from "@/src/components/VehicleRow";

const photo = (slug: string) => `/mi-garaje/garage-photos/${slug}/1.jpg`;
/** Marco de Tu actividad en Mi Garaje: la tarjeta blanca de 451 px y la base que hereda ahí (Plus Jakarta Sans, alto de línea normal). */
const CARD = { width: "100%", maxWidth: 451, overflow: "hidden", borderRadius: 8, background: "#fff", boxShadow: "0 1px 3px rgba(34,0,92,.05), 0 10px 30px rgba(34,0,92,.06)", fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" } as const;
const EMPTY = { display: "flex", justifyContent: "center", padding: "4px 0 8px", textAlign: "center" } as const;
const EMPTY_P = { margin: 0, maxWidth: "56ch", fontSize: ".875rem", lineHeight: 1.5, color: "color-mix(in srgb,#191C1C 82%,#fff)" } as const;

/** Mis negociaciones y Mis compras, con los datos de Mi Garaje. Tocar el encabezado abre o pliega la sección. */
export default function ActivitySectionDemo({ set = "negociaciones" }: { set?: "negociaciones" | "compras" }): JSX.Element {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState(0);
  const [now] = useState(() => Date.now());
  if (set === "compras") return <div style={CARD}>
    <ActivitySection id="compras-demo" title="Mis compras" icon="compras" open={open} onToggle={() => setOpen((x) => !x)}>
      <div style={EMPTY}><p style={EMPTY_P}>Aún no tienes compras.</p></div>
    </ActivitySection>
  </div>;
  return <div style={CARD}>
    <ActivitySection id="negociaciones-demo" title="Mis negociaciones" icon="negociaciones" open={open} onToggle={() => setOpen((x) => !x)}>
      <FolderTabs options={["Compras", "En venta"]} notificationIndices={[]} value={tab} onChange={setTab} aria-label="Compras o vehículos en venta" />
      <div style={{ display: "grid" }}>
        <VehicleRow photo={photo("sentra")} name="Nissan Sentra" year={2020} respondBy={now + 24 * 3.6e6} meta={"Tú: US$\u00a014,500 (1/5)"} side={<small className="fr__ago">1 min</small>} onClick={() => undefined} opensDialog />
        <VehicleRow photo={photo("mazda3")} name="Mazda 3" year={2018} respondBy={now + 23.8 * 3.6e6} meta={"Contrapropuesta recibida · US$\u00a013,500 (2/5)"} side={<small>12 min</small>} onClick={() => undefined} opensDialog />
        <VehicleRow photo={photo("picanto")} name="Kia Picanto" year={2021} respondBy={now + 23.5 * 3.6e6} meta={"Tú: US$\u00a08,700 (5/5)"} side={<small className="fr__ago">31 min</small>} onClick={() => undefined} opensDialog />
      </div>
    </ActivitySection>
  </div>;
}
