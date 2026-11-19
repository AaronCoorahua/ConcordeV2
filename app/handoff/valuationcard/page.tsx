/**
 * /handoff/valuationcard — Documentación de ValuationCard (tarjeta de Mis valorizaciones de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ValuationCardDemo from "./ValuationCardDemo";

const USAGE = `import { ValuationCard } from "@/src/components/ValuationCard";

<ul>
  <ValuationCard title="Kia Picanto 2017" subtitle="EX 1.2 MT · 88,000 km" status={{ tone: "wait", label: "Lista para publicar" }}
    valueLabel="Valor de mercado al 01/10" value="US$ 8,090" drift={-2}
    waitLoss={{ amount: "−US$ 330", worth: "US$ 7,760", perDay: "~US$ 1/día" }}
    signal={{ level: 1, label: "No es momento", sublabel: "Demanda baja. Mejor esperar." }}
    onAnalysis={verAnalisis} action={<Button variant="primary">Publicar</Button>} />
</ul>`;

export default function ValuationCardHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ValuationCard"
      summary="Tarjeta de una valorización guardada. Lista para publicar: valor de mercado con su variación, «Si esperas un año», «Señal de venta» (5 puntos), «Ver análisis» y Publicar. Negociable (publicada o en revisión): compacta, con borde teal, píldora NEGOCIABLE, un dato de la publicación y Ver publicación."
      note={<>Viene de mi-garaje-lab (Mis valorizaciones). Es un &lt;li&gt;: va dentro de una lista. Usa Vidrio (ícono del auto cuando no hay foto) y StatusTag. En 640 px o menos la acción va primero y a todo el ancho.</>}
      hero={{ node: <ValuationCardDemo />, code: `<ValuationCard … />  // Kia (lista para publicar), Hilux y Nivus (Negociable)`, minHeight: 560 }}
      installName="valuationcard"
      usage={USAGE}
      examples={[
        { title: "Negociable", description: "Publicada o en revisión: foto, NEGOCIABLE, valor de mercado y cómo va la publicación.",
          node: <ValuationCardDemo only="negotiable" />,
          code: `<ValuationCard title="Toyota Hilux 2020" subtitle="4×4 SRV · 62,000 km" photo="/mi-garaje/garage-photos/hilux/1.jpg" negotiable
  status={{ tone: "progress", label: "Pendiente de aprobación" }} valueLabel="Valor de mercado al 08/10" value="US$ 27,130"
  detail={{ label: "Revisión de VMC", value: "Pago recibido" }} onAnalysis={verAnalisis}
  action={<Button variant="negotiable">Ver publicación</Button>} />` },
      ]}
      api={[
        { name: "title", type: "string", description: "Vehículo." },
        { name: "subtitle", type: "string", description: "Versión y kilometraje." },
        { name: "photo", type: "string", description: "Foto 64×48; sin ella, el ícono de vidrio del auto." },
        { name: "status", type: "{ tone: StatusTone; label: string }", description: "Estado (StatusTag)." },
        { name: "negotiable", type: "boolean", description: "Publicada o en revisión: tarjeta compacta con borde teal y NEGOCIABLE." },
        { name: "valueLabel", type: "string", description: "Rótulo del valor (p. ej. «Valor de mercado al 01/10»)." },
        { name: "value", type: "string", description: "Valor de mercado ya formateado." },
        { name: "drift", type: "number", description: "Lista para publicar: % que cambió desde que se guardó." },
        { name: "waitLoss", type: "{ amount: string; worth: string; perDay?: string }", description: "Lista para publicar: «Si esperas un año»." },
        { name: "signal", type: "{ level: number; label: string; sublabel: string }", description: "Lista para publicar: señal de venta AVT (1 a 5)." },
        { name: "detail", type: "{ label: string; value: string }", description: "Negociable: un dato de la publicación." },
        { name: "onAnalysis", type: "() => void", description: "Abre el análisis («Ver análisis»)." },
        { name: "action", type: "ReactNode", description: "Acción principal (Publicar o Ver publicación)." },
      ]}
      files={["src/components/ValuationCard.tsx", "src/components/StatusTag.tsx", "src/components/Vidrio.tsx"]}
    />
  );
}
