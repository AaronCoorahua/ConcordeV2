/**
 * /handoff/valuehero — Documentación de ValueHero (cabecera del resultado de Valorizar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ValueHero } from "@/src/components/ValueHero";

const box = { width: "100%", maxWidth: 760 } as const;

const USAGE = `import { ValueHero } from "@/src/components/ValueHero";

<ValueHero title="Toyota Corolla 2019" meta="45,000 km · 7 años de uso" valueLabel="Valor de mercado hoy"
  value={15010} buyback={12010} auction={15760} />`;

export default function ValueHeroHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ValueHero"
      summary="Cabecera oscura del resultado de una valorización: vehículo y datos, el valor de mercado como cifra grande y, en una franja de vidrio, el valor de recompra y la estimación Subastop. Al aparecer, las cifras suben hasta su valor."
      note={<>Viene de mi-garaje-lab (resultado «Revela» de Valorizar y Publicar, y el análisis de Mis valorizaciones). Usa Vidrio. Con still (resultado ya guardado) las cifras quedan quietas; sin animación con «reducir movimiento». En 767 px o menos la franja pasa debajo, en dos columnas.</>}
      hero={{ node: <div style={box}><ValueHero title="Toyota Corolla 2019" meta="45,000 km · 7 años de uso" valueLabel="Valor de mercado hoy" value={15010} buyback={12010} auction={15760} /></div>,
        code: `<ValueHero title="Toyota Corolla 2019" meta="45,000 km · 7 años de uso" valueLabel="Valor de mercado hoy"
  value={15010} buyback={12010} auction={15760} />`, minHeight: 260 }}
      installName="valuehero"
      usage={USAGE}
      examples={[
        { title: "Valorización guardada", description: "En el análisis de Mis valorizaciones: valor a la fecha del cálculo y cifras quietas.",
          node: <div style={box}><ValueHero title="Kia Picanto 2017" meta="88,000 km · 9 años de uso" valueLabel="Valor de mercado al 01/10" value={8090} buyback={6470} auction={8490} still /></div>,
          code: `<ValueHero title="Kia Picanto 2017" meta="88,000 km · 9 años de uso" valueLabel="Valor de mercado al 01/10"
  value={8090} buyback={6470} auction={8490} still />` },
      ]}
      api={[
        { name: "title", type: "string", description: "Vehículo; es el título del resultado." },
        { name: "meta", type: "string", description: "Datos junto al vehículo." },
        { name: "valueLabel", type: "string", description: "Rótulo de la cifra." },
        { name: "value", type: "number", description: "Valor de mercado en US$." },
        { name: "buyback", type: "number", description: "Valor de recompra en US$." },
        { name: "auction", type: "number", description: "Estimación Subastop en US$." },
        { name: "still", type: "boolean", description: "Sin la subida de cifras ni la entrada (resultado guardado)." },
        { name: "headingId", type: "string", description: "id del título, para llevarle el foco." },
      ]}
      files={["src/components/ValueHero.tsx", "src/components/Vidrio.tsx"]}
    />
  );
}
