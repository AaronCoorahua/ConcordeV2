/**
 * /handoff/vehiclerow — Documentación de VehicleRow (las filas de Tu actividad en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import VehicleRowDemo from "./VehicleRowDemo";

const USAGE = `
// Mis negociaciones: con el plazo para responder y, a la derecha, cuándo fue el último movimiento
<VehicleRow photo={foto} name="Nissan Sentra" year={2020} respondBy={vence} meta="Tú: US$ 14,500 (1/5)"
  side={<small className="fr__ago">1 min</small>} onClick={abrir} opensDialog />`;


export default function VehicleRowHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="VehicleRow"
      summary="La fila de vehículo de Tu actividad: foto, nombre y año, el detalle en una línea y un lado derecho para el estado (EN VIVO, el tiempo, un badge o un botón). Leída va en peso liviano; nueva o sin abrir, en negrita."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, antes FRow): son las filas de Mis negociaciones, Mis participaciones, Mis valorizaciones y Mis publicaciones. Usa Countdown y framer-motion. Desde 1024 px la foto es de 48 × 36 y no hay flecha; bajo 1024 px la fila muestra la flecha naranja. Los ejemplos van en el ancho de la columna de Tu actividad (435 px) y con la base que hereda ahí (Plus Jakarta Sans y alto de línea normal). Un <code>small.fr__ago</code> en el lado derecho baja a la línea del detalle.</>}
      hero={{ node: <VehicleRowDemo set="negociaciones" />, minHeight: 240,
        code: `<VehicleRow photo={foto} name="Nissan Sentra" year={2020} respondBy={vence} meta="Tú: US$ 14,500 (1/5)"
  side={<small className="fr__ago">1 min</small>} onClick={abrir} opensDialog />
<VehicleRow photo={foto} name="Mazda 3" year={2018} respondBy={vence} meta="Contrapropuesta recibida · US$ 13,500 (2/5)"
  side={<small>12 min</small>} onClick={abrir} opensDialog />
<VehicleRow photo={foto} name="Kia Picanto" year={2021} respondBy={vence} meta="Tú: US$ 8,700 (5/5)"
  side={<small className="fr__ago">31 min</small>} onClick={abrir} opensDialog />` }}
      installName="vehiclerow"
      usage={USAGE}
      examples={[
        { title: "Mis participaciones", description: "La subasta en vivo lleva EN VIVO a la derecha y va en negrita mientras no la abras (isNew). Las próximas dicen cuándo inician.", minHeight: 220,
          node: <VehicleRowDemo set="participaciones" />,
          code: `<VehicleRow photo={foto} name="Hyundai Accent" year={2018} meta="Sala abierta" isNew
  side={<StatusTag tone="live">En vivo</StatusTag>} onClick={abrir} />
<VehicleRow photo={foto} name="Chevrolet Sail" year={2019} meta="Inicia 17/10 · 11:00 am" onClick={abrir} />` },
      ]}
      api={[
        { name: "photo", type: "string", description: "URL de la foto (48 × 36 desde 1024 px; 64 × 48 entre 830 y 1023; 56 × 44 bajo 830)." },
        { name: "name", type: "string", description: "Marca y modelo." },
        { name: "year", type: "number | string", description: "Año del vehículo." },
        { name: "namePrefix", type: "ReactNode", description: "Algo antes del nombre (en Mis publicaciones, el pin de la fijada)." },
        { name: "respondBy", type: "number", description: "Plazo para responder (ms): cuenta regresiva junto al nombre." },
        { name: "meta", type: "ReactNode", description: "Detalle de la fila, en una línea." },
        { name: "metaClassName", type: "string", description: "Clases extra del detalle." },
        { name: "marquee", type: "boolean", default: "false", description: "El detalle se desplaza de lado en vez de cortarse (la animación la pone quien usa la fila)." },
        { name: "side", type: "ReactNode", description: "Lado derecho: EN VIVO, tiempo, punto, badge o botón. Un small.fr__ago baja a la línea del detalle." },
        { name: "isNew", type: "boolean", default: "false", description: "Recién llegada: en negrita." },
        { name: "unread", type: "boolean", default: "false", description: "Sin abrir: en negrita." },
        { name: "onClick", type: "() => void", description: "Con onClick la fila es un botón con flecha; sin él, solo lectura." },
        { name: "opensDialog", type: "boolean", default: "false", description: "La fila abre un diálogo (aria-haspopup)." },
        { name: "layoutId", type: "string", description: "framer-motion: la fila se anima al cambiar de lugar o de sección." },
        { name: "transition", type: "Transition", description: "Transición de framer-motion para ese viaje." },
        { name: "className", type: "string", description: "Clases extra de la fila (estados de quien la usa)." },
        { name: "style", type: "CSSProperties", description: "Estilos en línea (filas de solo lectura)." },
        { name: "onAnimationEnd", type: "(e) => void", description: "Fin de una animación CSS de la fila (filas de solo lectura)." },
        { name: "data", type: "Record<string, string | undefined>", description: "Atributos data-* sin el prefijo." },
        { name: "children", type: "ReactNode", description: "Capas encima de la fila (avisos o guías)." },
      ]}
      files={["src/components/VehicleRow.tsx", "src/components/Countdown.tsx"]}
    />
  );
}
