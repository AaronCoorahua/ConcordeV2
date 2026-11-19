/**
 * /handoff/republishmodal — Documentación de RepublishModal (confirmar republicar en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import RepublishModalDemo from "./RepublishModalDemo";

const USAGE = `import { RepublishModal } from "@/src/components/RepublishModal";

// Se abre al montarse; para cerrarlo, desmontarlo.
{republicando ? <RepublishModal name="Suzuki Swift 2020"
  onConfirm={() => { setRepublicando(false); republicar(); }}
  onClose={() => setRepublicando(false)} /> : null}`;

export default function RepublishModalHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="RepublishModal"
      summary="Confirma republicar una publicación y dice hasta cuándo queda a la vista. Al confirmar pasa por «procesando» y una celebración breve, y recién entonces llama a onConfirm."
      note={<>Viene de mi-garaje-lab (Mis publicaciones). Usa la casa de los modales de Mi Garaje (ConfirmModal de VOYAGER: tarjeta de 320, × con borde degradado, ícono esmerilado, Button de Concorde) y se abre desde el último toque. El archivo exporta también MODAL_HOUSE_CSS, openFromTouch y REPUBLISH_DAYS (7 días, valor de ejemplo hasta que negocio lo confirme).</>}
      hero={{ node: <RepublishModalDemo />, code: `<RepublishModal name="Suzuki Swift 2020" onConfirm={cerrar} onClose={cerrar} />`, minHeight: 160 }}
      installName="republishmodal"
      usage={USAGE}
      examples={[
        { title: "Varias publicaciones", description: "Republicar todas: el nombre dice cuántas.",
          node: <RepublishModalDemo name="3 publicaciones" />, code: `<RepublishModal name="3 publicaciones" onConfirm={cerrar} onClose={cerrar} />` },
        { title: "Otro plazo", description: "days cambia el plazo y la fecha que se muestra.",
          node: <RepublishModalDemo days={14} />, code: `<RepublishModal name="Suzuki Swift 2020" days={14} onConfirm={cerrar} onClose={cerrar} />` },
      ]}
      api={[
        { name: "name", type: "string", description: "Nombre del vehículo (o «N publicaciones»)." },
        { name: "days", type: "number", default: "REPUBLISH_DAYS (7)", description: "Días que queda publicada." },
        { name: "onConfirm", type: "() => void", description: "Se llama al terminar la celebración." },
        { name: "onClose", type: "() => void", description: "Se llama al cerrar sin republicar (×, Escape o clic fuera)." },
        { name: "photo", type: "string", description: "Foto del vehículo. No se muestra (el modal de la casa no lleva foto)." },
        { name: "note", type: "string", description: "Lo que dice hoy la fila. No se muestra." },
      ]}
      files={["src/components/RepublishModal.tsx"]}
    />
  );
}
