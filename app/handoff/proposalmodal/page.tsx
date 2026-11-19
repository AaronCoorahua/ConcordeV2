/**
 * /handoff/proposalmodal — Documentación de ProposalModal (primera propuesta de una oferta Negociable).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ProposalModalDemo from "./ProposalModalDemo";

const USAGE = `import { ProposalModal } from "@/src/components/ProposalModal";

<ProposalModal open={abierto} vehicle="Nissan Sentra 2020" deposit={50} origin={desdeElBoton}
  onCancel={() => setAbierto(false)} onSend={() => setAbierto(false)}
  onGo={(monto) => irAMisNegociaciones(monto)} />`;

export default function ProposalModalHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ProposalModal"
      summary="Modal para enviar la primera propuesta de una oferta Negociable: monto con teclado numérico y la consignación, Confirma, «Enviando tu oferta», una celebración breve y «Propuesta enviada», que cuenta 5 s antes de llevar a Mi Garaje."
      note={<>Viene de mi-garaje-lab (/m/vmc-propuesta, botón «¡Vamos a negociar!» del DetailCard). Usa la casa de los modales de Mi Garaje (MODAL_HOUSE_CSS de RepublishModal) y sale desde el punto que se tocó. Con fail, Enviar llama a onFail en vez de enviar (VMC valida saldo y oferta en ese momento; el aviso es ProposalNotice).</>}
      hero={{ node: <ProposalModalDemo />, code: `<ProposalModal open={abierto} vehicle="Nissan Sentra 2020" deposit={50} origin={origen} onCancel={cerrar} onSend={cerrar} onGo={irAMiGaraje} />`, minHeight: 160 }}
      installName="proposalmodal"
      usage={USAGE}
      api={[
        { name: "open", type: "boolean", description: "Abre (showModal) o cierra el modal." },
        { name: "vehicle", type: "string", description: "Vehículo de la oferta, bajo el título." },
        { name: "deposit", type: "number", description: "Consignación de la oferta en SubasCoins." },
        { name: "origin", type: "{ x: number; y: number } | null", description: "Punto desde donde sale el modal (centro del botón que lo abrió)." },
        { name: "onCancel", type: "() => void", description: "Cerrar sin enviar." },
        { name: "onSend", type: "(amount: number) => void", description: "Cerrar ya enviada la propuesta (× o Escape)." },
        { name: "onGo", type: "(amount: number) => void", description: "«Ir a Mi Garaje»: al tocarlo o al terminar la cuenta de 5 s." },
        { name: "fail", type: "boolean", default: "false", description: "Al presionar Enviar, la validación falla y se llama a onFail." },
        { name: "onFail", type: "() => void", description: "Se llama cuando fail y la persona presiona Enviar." },
      ]}
      files={["src/components/ProposalModal.tsx", "src/components/RepublishModal.tsx"]}
    />
  );
}
