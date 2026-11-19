/**
 * /handoff/proposalnotice — Documentación de ProposalNotice (avisos del flujo de propuesta en Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import ProposalNoticeDemo from "./ProposalNoticeDemo";

const USAGE = `import { ProposalNotice } from "@/src/components/ProposalNotice";

<ProposalNotice kind="fondos" open={aviso} deposit={{ sc: 50, usd: 180 }} onClose={() => setAviso(false)} />`;

export default function ProposalNoticeHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="ProposalNotice"
      summary="Avisos del flujo de propuesta: «Fondos insuficientes» con la consignación que pide la oferta, «Esta negociación ya no está disponible» e «Imposible procesar la propuesta»."
      note={<>Viene de mi-garaje-lab (/m/vmc-propuesta). Son los avisos de VMC (FondosInsuficientes, Notification) con la casa de los modales de Mi Garaje y el mismo bloque de consignación que ProposalModal. «Ya no disponible» sale al abrir la propuesta; los otros dos, al presionar Enviar.</>}
      hero={{ node: <ProposalNoticeDemo kind="fondos" label="Fondos insuficientes" />, code: `<ProposalNotice kind="fondos" open={aviso} deposit={{ sc: 50, usd: 180 }} onClose={cerrar} />`, minHeight: 160 }}
      installName="proposalnotice"
      usage={USAGE}
      examples={[
        { title: "Ya no disponible", node: <ProposalNoticeDemo kind="cerrada" label="Ya no disponible" />, code: `<ProposalNotice kind="cerrada" open={aviso} onClose={cerrar} />` },
        { title: "Imposible procesar", node: <ProposalNoticeDemo kind="error" label="Imposible procesar" />, code: `<ProposalNotice kind="error" open={aviso} onClose={cerrar} />` },
      ]}
      api={[
        { name: "kind", type: '"fondos" | "cerrada" | "error"', description: "Qué aviso se muestra." },
        { name: "open", type: "boolean", description: "Abre (showModal) o cierra el aviso." },
        { name: "onClose", type: "() => void", description: "Cerrar (×, botón, Escape)." },
        { name: "deposit", type: "{ sc: number; usd: number }", description: "Consignación de la oferta (solo «fondos»)." },
      ]}
      files={["src/components/ProposalNotice.tsx", "src/components/ProposalModal.tsx", "src/components/RepublishModal.tsx"]}
    />
  );
}
