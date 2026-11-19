/**
 * /handoff/decisionbar — Documentación de DecisionBar (barra Guardar · Publicar del resultado de Valorizar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import Button from "@/src/components/Button";
import { DecisionBar } from "@/src/components/DecisionBar";

const box = { width: "100%", maxWidth: 760 } as const;

const USAGE = `import { DecisionBar } from "@/src/components/DecisionBar";

<DecisionBar title="¿Publicamos tu vehículo?" description="Ya tenemos los datos del vehículo: en Publicar solo agregas las fotos."
  actions={<><Button variant="outline">Valorizar de nuevo</Button><Button variant="primary">Publicar</Button></>} />`;

export default function DecisionBarHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="DecisionBar"
      summary="Barra al pie del resultado de una valorización: la pregunta y su bajada a la izquierda, las acciones a la derecha. Queda pegada abajo mientras se lee el resultado. Con negotiable lleva el borde teal de la oferta Negociable."
      note={<>Viene de mi-garaje-lab (resultado de Valorizar y Publicar, y el análisis de Mis valorizaciones). En 767 px o menos solo muestra los botones, en una fila. En Valorizar, «Guardar» lleva además un estilo propio del bloque (contorno lila con ícono).</>}
      hero={{ node: <div style={box}><DecisionBar title="¿Publicamos tu vehículo?" description="Ya tenemos los datos del vehículo: en Publicar solo agregas las fotos."
        actions={<><Button variant="outline">Valorizar de nuevo</Button><Button variant="primary">Publicar</Button></>} /></div>,
        code: `<DecisionBar title="¿Publicamos tu vehículo?" description="Ya tenemos los datos del vehículo: en Publicar solo agregas las fotos."
  actions={<><Button variant="outline">Valorizar de nuevo</Button><Button variant="primary">Publicar</Button></>} />`, minHeight: 180 }}
      installName="decisionbar"
      usage={USAGE}
      examples={[
        { title: "Negociable (Publicar)", description: "Al seguir con una publicación: borde teal y lo que falta resaltado.",
          node: <div style={box}><DecisionBar negotiable title="¿Seguimos con tu publicación?"
            description={<>Ya tenemos los datos del vehículo. Falta: <em>fotos</em> · <em>descripción</em> · <em>pago de &gt;S&lt; 25</em></>}
            actions={<><Button variant="outline">Guardar</Button><Button variant="primary">Continuar publicación</Button></>} /></div>,
          code: `<DecisionBar negotiable title="¿Seguimos con tu publicación?"
  description={<>Ya tenemos los datos del vehículo. Falta: <em>fotos</em> · <em>descripción</em> · <em>pago de &gt;S&lt; 25</em></>}
  actions={<><Button variant="outline">Guardar</Button><Button variant="primary">Continuar publicación</Button></>} />` },
        { title: "Solo una acción", description: "Análisis de una valorización ya publicada.",
          node: <div style={box}><DecisionBar title="Tu vehículo ya está publicado" description="Se publicó como oferta Negociable con este valor de referencia."
            actions={<Button variant="negotiable">Ver publicación</Button>} /></div>,
          code: `<DecisionBar title="Tu vehículo ya está publicado" description="Se publicó como oferta Negociable con este valor de referencia."
  actions={<Button variant="negotiable">Ver publicación</Button>} />` },
      ]}
      api={[
        { name: "title", type: "ReactNode", description: "Pregunta; en móvil se oculta." },
        { name: "description", type: "ReactNode", description: "Bajada; un <em> se resalta en teal con negotiable." },
        { name: "actions", type: "ReactNode", description: "Botones, de menor a mayor importancia." },
        { name: "negotiable", type: "boolean", description: "Borde teal de la oferta Negociable." },
      ]}
      files={["src/components/DecisionBar.tsx"]}
    />
  );
}
