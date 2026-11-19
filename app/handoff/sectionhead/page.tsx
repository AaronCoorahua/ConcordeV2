/**
 * /handoff/sectionhead — Documentación de SectionHead (encabezado de bloque de Valorizar / Publicar de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { SectionHead } from "@/src/components/SectionHead";

const stack = { display: "grid", gap: 24, width: "100%", maxWidth: 680 } as const;

const USAGE = `import { SectionHead } from "@/src/components/SectionHead";

<SectionHead icon="caja" title="Mecánica" done tip="típico · toca para cambiar" />
<SectionHead icon="publicaciones" title="Datos de la publicación" status={3} />`;

export default function SectionHeadHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="SectionHead"
      summary="Encabezado de un bloque de formulario: ícono de Vidrio de 36 px y título 16/700, con un check naranja cuando el bloque está completo, una nota de AVT a la derecha, o el estado «Faltan N», «Listo» u «Opcional»."
      note={<>Viene de mi-garaje-lab: paso Detalles de Valorizar (Mecánica, Estado del vehículo, Historial, Equipamiento) y paso Información de Publicar (Datos de la publicación, Ubicación, Equipamiento, Documentos, Descripción). «Faltan N» lleva el borde teal de Negociable con un punto que late.</>}
      hero={{ node: <div style={stack}>
          <SectionHead icon="caja" title="Mecánica" done tip="típico · toca para cambiar" />
          <SectionHead icon="auto" title="Estado del vehículo" />
        </div>,
        code: `<SectionHead icon="caja" title="Mecánica" done tip="típico · toca para cambiar" />
<SectionHead icon="auto" title="Estado del vehículo" />`, minHeight: 200 }}
      installName="sectionhead"
      usage={USAGE}
      examples={[
        { title: "Con estado (Publicar)", description: "Cuántos datos faltan, Listo cuando se completan u Opcional.",
          node: <div style={stack}>
            <SectionHead icon="publicaciones" title="Datos de la publicación" status={3} />
            <SectionHead icon="ubicacion" title="Ubicación del vehículo" status={1} />
            <SectionHead icon="texto" title="Descripción" status="ok" />
            <SectionHead icon="equipo" title="Equipamiento" status="optional" />
          </div>,
          code: `<SectionHead icon="publicaciones" title="Datos de la publicación" status={3} />
<SectionHead icon="ubicacion" title="Ubicación del vehículo" status={1} />
<SectionHead icon="texto" title="Descripción" status="ok" />
<SectionHead icon="equipo" title="Equipamiento" status="optional" />` },
        { title: "Con bajada", description: "Mecánica en Publicar cuando el modelo se ingresó a mano y la valorización no la trae.",
          node: <div style={stack}><SectionHead icon="caja" title="Mecánica" hint="Completa lo que no indicaste en la valorización" status={3} /></div>,
          code: `<SectionHead icon="caja" title="Mecánica" hint="Completa lo que no indicaste en la valorización" status={3} />` },
      ]}
      api={[
        { name: "icon", type: "Sec", description: "Ícono de Vidrio del bloque." },
        { name: "title", type: "string", description: "Título del bloque." },
        { name: "titleId", type: "string", description: "id del título (para aria-labelledby)." },
        { name: "hint", type: "string", description: "Bajada bajo el título." },
        { name: "done", type: "boolean", description: "Bloque completo: check naranja junto al título." },
        { name: "tip", type: "string", description: "Nota de AVT a la derecha, con la ⓘ." },
        { name: "status", type: `number | "ok" | "optional"`, description: "Faltan N, Listo u Opcional." },
      ]}
      files={["src/components/SectionHead.tsx", "src/components/Vidrio.tsx"]}
    />
  );
}
