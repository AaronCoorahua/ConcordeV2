/**
 * /handoff/qrcard — Documentación de QrCard (tarjeta con QR del vehículo que recibe ofertas).
 */
import type { JSX } from "react";
import { QrCard } from "@/src/components/QrCard";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const URL = "https://www.vmcsubastas.com/oferta/51015";

const USAGE = `import { useRef } from "react";
import { QrCard, printA4 } from "@/src/components/QrCard";

const card = useRef<HTMLDivElement>(null);

<QrCard ref={card} value="https://www.vmcsubastas.com/oferta/51015" />
<button onClick={() => card.current && printA4(card.current)}>Imprimir</button>`;

export default function QrCardHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="QrCard"
      summary="Tarjeta con el QR de un vehículo que recibe ofertas, para pegar en el auto. printA4 la imprime sola, centrada en una hoja A4 a 15 cm de ancho."
      note={<>Viene de mi-garaje-lab (app/components/lib). Usa QrCode. Todo escala con size; el QR va en corrección alta porque el logo tapa el centro.</>}
      hero={{ node: <QrCard value={URL} />, code: `<QrCard value="${URL}" />`, minHeight: 360 }}
      installName="qrcard"
      usage={USAGE}
      examples={[
        { title: "Para imprimir sin color", description: "tone negro llena el fondo; tone blanco gasta poca tinta.", minHeight: 320,
          node: <div style={{ display: "flex", gap: 16 }}><QrCard value={URL} tone="negro" size={160} /><QrCard value={URL} tone="blanco" size={160} /></div>,
          code: `<QrCard value={url} tone="negro" size={160} />\n<QrCard value={url} tone="blanco" size={160} />` },
      ]}
      api={[
        { name: "value", type: "string", description: "Link que abre el QR: el de la publicación del vehículo." },
        { name: "hook / label", type: "string", default: `"¡Hey, tú!" / "Este vehículo recibe ofertas"`, description: "Textos de arriba y de abajo." },
        { name: "tone", type: `"color" | "negro" | "blanco"`, default: `"color"`, description: "Degradado de VMC o blanco y negro." },
        { name: "size", type: "number", default: "200", description: "Ancho en px; todo escala con él." },
        { name: "logoSrc", type: "string", description: "Logo del centro." },
        { name: "ref", type: "Ref<HTMLDivElement>", description: "Para pasarle la tarjeta a printA4." },
        { name: "printA4(card)", type: "(HTMLElement) => void", description: "Imprime la tarjeta sola en una hoja A4." },
      ]}
      files={["src/components/QrCard.tsx", "src/components/QrCode.tsx"]}
    />
  );
}
