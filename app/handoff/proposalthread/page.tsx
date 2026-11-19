/**
 * /handoff/proposalthread — Documentación de ProposalThread (historial de propuestas en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { ProposalThread } from "@/src/components/ProposalThread";

const USAGE = `import { ProposalThread } from "@/src/components/ProposalThread";

<ProposalThread other="Vendedor" initials="V" items={[
  { me: true, amount: "US$ 12,000", when: "Hoy 9:10" },
  { me: false, amount: "US$ 13,700", when: "Hoy 9:40" },
]} />`;

const BOX = { width: 412 } as const;
// Hilo de ejemplo del bloque: Mazda 3 2018 (Compras, contrapropuesta recibida).
const MAZDA = [
  { me: true, amount: "US$ 12,000", when: "Hoy 9:10" },
  { me: false, amount: "US$ 13,700", when: "Hoy 9:40" },
  { me: true, amount: "US$ 12,600", when: "Hoy 10:05" },
];

export default function ProposalThreadHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ProposalThread"
      summary="Historial de propuestas de una negociación: cada monto es un BidMessage (lo tuyo en vault a la derecha, lo de la otra parte en blanco con su avatar), con quién y a qué hora debajo, y una línea con el día cuando cambia."
      note={<>Viene de mi-garaje-lab (panel de negociación de Mis negociaciones). Los hijos se agregan al final de la lista como &lt;li&gt;: el bloque pone ahí la respuesta de rechazo, las animaciones de aceptar o rechazar y la espera del fee.</>}
      hero={{ node: <div style={BOX}><ProposalThread other="Vendedor" initials="V" items={MAZDA} /></div>,
        code: `<ProposalThread other="Vendedor" initials="V" items={[
  { me: true, amount: "US$ 12,000", when: "Hoy 9:10" },
  { me: false, amount: "US$ 13,700", when: "Hoy 9:40" },
  { me: true, amount: "US$ 12,600", when: "Hoy 10:05" },
]} />`, minHeight: 280 }}
      installName="proposalthread"
      usage={USAGE}
      examples={[
        { title: "Vendedor: propuesta de un comprador", description: "Volkswagen Nivus 2022 (En venta), Comprador 3.",
          node: <div style={BOX}><ProposalThread other="Comprador 3" initials="C3" items={[{ me: false, amount: "US$ 16,900", when: "Hoy 10:42" }]} /></div>,
          code: `<ProposalThread other="Comprador 3" initials="C3" items={[{ me: false, amount: "US$ 16,900", when: "Hoy 10:42" }]} />` },
        { title: "Comprador: propuesta enviada", description: "Nissan Sentra 2020, primera propuesta.",
          node: <div style={BOX}><ProposalThread other="Vendedor" initials="V" items={[{ me: true, amount: "US$ 14,500", when: "Hoy Ahora" }]} /></div>,
          code: `<ProposalThread other="Vendedor" initials="V" items={[{ me: true, amount: "US$ 14,500", when: "Hoy Ahora" }]} />` },
      ]}
      api={[
        { name: "items", type: "{ me: boolean; amount: string; when: string }[]", description: "Propuestas de la más antigua a la más nueva. when = «día hora»; el día arma los separadores." },
        { name: "other", type: "string", description: "Nombre de la otra parte bajo sus montos." },
        { name: "initials", type: "string", description: "Iniciales en el avatar de la otra parte." },
        { name: "children", type: "ReactNode", description: "<li> extra al final del historial." },
      ]}
      files={["src/components/ProposalThread.tsx"]}
    />
  );
}
