/**
 * /handoff/statustag — Documentación de StatusTag (etiqueta de estado de Mi Garaje).
 */
import type { JSX } from "react";
import { StatusTag } from "@/src/components/StatusTag";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const USAGE = `import { StatusTag } from "@/src/components/StatusTag";

<StatusTag tone="progress">Pendiente de aprobación</StatusTag>`;

const row = { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" } as const;

export default function StatusTagHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="StatusTag"
      summary="Etiqueta de estado de Mi Garaje: una píldora de texto en gris (en espera) o violeta (en revisión). El tono live muestra el BadgeStatus EN VIVO de Concorde."
      note={<>Viene de Mi Garaje (antes Status). EN VIVO sale en las filas de Mis participaciones (/blocks/mi-garaje/m/vmc); Lista para publicar, Pendiente de aprobación y Publicada, en las tarjetas de Mis valorizaciones (/blocks/mi-garaje/m/vmc-valorizaciones).</>}
      hero={{
        node: <div style={row}>
          <StatusTag tone="wait">Lista para publicar</StatusTag>
          <StatusTag tone="progress">Pendiente de aprobación</StatusTag>
          <StatusTag tone="wait">Publicada</StatusTag>
        </div>,
        code: `<StatusTag tone="wait">Lista para publicar</StatusTag>
<StatusTag tone="progress">Pendiente de aprobación</StatusTag>
<StatusTag tone="wait">Publicada</StatusTag>`,
        minHeight: 160,
      }}
      installName="statustag"
      usage={USAGE}
      examples={[
        { title: "Subasta en vivo", description: "El tono live muestra el BadgeStatus EN VIVO, como en las filas de Mis participaciones.",
          node: <div style={row}><StatusTag tone="live">En vivo</StatusTag></div>,
          code: `<StatusTag tone="live">En vivo</StatusTag>` },
      ]}
      api={[
        { name: "tone", type: `"live" | "wait" | "progress"`, description: "live muestra el BadgeStatus EN VIVO; wait es gris y progress violeta." },
        { name: "children", type: "ReactNode", description: "Texto del estado." },
      ]}
      files={["src/components/StatusTag.tsx"]}
    />
  );
}
