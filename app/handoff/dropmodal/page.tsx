/**
 * /handoff/dropmodal — Documentación de DropModal (dar de baja una publicación en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import DropModalDemo from "./DropModalDemo";

const USAGE = `import { DropModal } from "@/src/components/DropModal";

// Se abre al montarse; para cerrarlo, desmontarlo.
{bajando ? <DropModal name="Suzuki Swift 2020"
  onRepublish={() => { setBajando(false); setRepublicando(true); }}
  onConfirm={(motivo) => { setBajando(false); darDeBaja(motivo); }}
  onClose={() => setBajando(false)} /> : null}`;

export default function DropModalHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="DropModal"
      summary="Dar de baja una publicación. El motivo se elige con un toque (cuatro tarjetas con ícono esmerilado) y la respuesta cambia según el motivo; el botón se activa al elegirlo y pasa por «procesando» antes de llamar a onConfirm."
      note={<>Viene de mi-garaje-lab (Mis publicaciones). Misma casa de modales que RepublishModal (importa MODAL_HOUSE_CSS y openFromTouch de ahí). Con «Sin ofertas» y onRepublish, ofrece republicar gratis antes de dar de baja; con «Otro motivo» aparece el Input de Concorde.</>}
      hero={{ node: <DropModalDemo />, code: `<DropModal name="Suzuki Swift 2020" onRepublish={republicar} onConfirm={darDeBaja} onClose={cerrar} />`, minHeight: 160 }}
      installName="dropmodal"
      usage={USAGE}
      examples={[
        { title: "Sin republicar", description: "Sin onRepublish, «Sin ofertas» no ofrece republicar.",
          node: <DropModalDemo republish={false} />, code: `<DropModal name="Suzuki Swift 2020" onConfirm={darDeBaja} onClose={cerrar} />` },
      ]}
      api={[
        { name: "name", type: "string", description: "Nombre del vehículo, debajo del título." },
        { name: "onConfirm", type: "(reason: string) => void", description: "Se llama con el motivo elegido al terminar el «procesando» (con «Otro motivo», el texto escrito si lo hay)." },
        { name: "onClose", type: "() => void", description: "Se llama al cerrar sin dar de baja (×, Escape o clic fuera)." },
        { name: "onRepublish", type: "() => void", description: "Si la publicación se puede republicar: con «Sin ofertas» aparece «Republícala gratis»." },
        { name: "photo", type: "string", description: "Foto del vehículo. No se muestra (el modal de la casa no lleva foto)." },
        { name: "note", type: "string", description: "Lo que dice hoy la fila. No se muestra." },
      ]}
      files={["src/components/DropModal.tsx"]}
    />
  );
}
