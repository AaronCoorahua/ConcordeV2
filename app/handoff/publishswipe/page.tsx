/**
 * /handoff/publishswipe — Documentación de PublishSwipe (botón PUBLICAR de Mis valorizaciones en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import PublishSwipeDemo from "./PublishSwipeDemo";

const USAGE = `import { PublishSwipe } from "@/src/components/PublishSwipe";

<PublishSwipe onPublish={abrirPublicar} />`;

export default function PublishSwipeHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="PublishSwipe"
      summary="Botón «PUBLICAR» de cada valorización guardada: píldora naranja con un pulgar de vidrio que se asoma solo. Al tocarlo el pulgar corre al final, dice CARGANDO y a los 2 s llama a onPublish."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, lado derecho de las filas de Mis valorizaciones). Responde a clic, toque y teclado. Mide 84 × 24 (80 de ancho bajo 768 px).</>}
      hero={{ node: <PublishSwipeDemo />, code: `<PublishSwipe onPublish={abrirPublicar} />`, minHeight: 140 }}
      installName="publishswipe"
      usage={USAGE}
      api={[{ name: "onPublish", type: "() => void", description: "Se llama 2 s después de tocarlo." }]}
      files={["src/components/PublishSwipe.tsx"]}
    />
  );
}
