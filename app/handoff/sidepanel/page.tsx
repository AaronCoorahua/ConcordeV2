/**
 * /handoff/sidepanel — Documentación de SidePanel (panel lateral / hoja inferior de la vista rápida de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import SidePanelDemo from "./SidePanelDemo";

const USAGE = `import { SidePanel } from "@/src/components/SidePanel";

<SidePanel open={Boolean(fila)} onClose={() => setFila(null)} labelledBy="titulo" closeSignal={cerrar}>
  {(close) => <>
    <header><h2 id="titulo">{fila.nombre}</h2><button onClick={close}>Cerrar</button></header>
    …
  </>}
</SidePanel>`;

export default function SidePanelHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="SidePanel"
      summary="Panel de la vista rápida: un dialog nativo (foco atrapado, Esc lo cierra) que entra desde la derecha a todo el alto (460 px) y, bajo 768 px, sube desde abajo como hoja (88 % del alto). Al cerrarse se desliza hacia donde vino; tocar el velo también lo cierra."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc: lo abre una fila de Tu actividad). Es solo el panel: el encabezado y la negociación los pone quien lo usa (en el ejemplo, un contenido mínimo). Mientras está abierto la página no se desplaza.</>}
      hero={{ node: <SidePanelDemo />, code: `<SidePanel open={abierto} onClose={cerrar} labelledBy="titulo">{(close) => contenido}</SidePanel>`, minHeight: 160 }}
      installName="sidepanel"
      usage={USAGE}
      api={[
        { name: "open", type: "boolean", description: "Abierto. Al pasar a false se cierra sin animación." },
        { name: "onClose", type: "() => void", description: "Cuando terminó de cerrarse (Esc, velo, close o closeSignal)." },
        { name: "labelledBy", type: "string", description: "id del título del panel." },
        { name: "closeSignal", type: "number", default: "0", description: "Al subir, se cierra con su animación (pedido desde fuera)." },
        { name: "children", type: "(close: () => void) => ReactNode", description: "Contenido; close lo cierra con su animación." },
      ]}
      files={["src/components/SidePanel.tsx"]}
    />
  );
}
