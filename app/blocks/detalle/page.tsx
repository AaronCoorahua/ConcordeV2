import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import DetalleViewer from "./DetalleViewer";

/**
 * /blocks/detalle — Detalle actual: Propuesta (comprador) y Acuerdo con SubasChat, las pantallas de ficha de Mi Garaje.
 * La versión 1 (el bloque Detalle de antes) está en /blocks/detalle/v1.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "DetailCard", path: "/handoff/detailcard", role: "Ficha de la propuesta; banners de Max y mini (assistantBanner, miniBanner)" },
  { name: "CardViewer", path: "/handoff/cardviewer", role: "Fotos del vehículo con miniaturas" },
  { name: "AuctionStatus", path: "/handoff/auctionstatus", role: "Estado de la oferta sobre las fotos" },
  { name: "Accordion", path: "/handoff/accordion", role: "Información general, Condiciones y Visitas" },
  { name: "ConditionPill", path: "/handoff/conditionpill", role: "Condiciones de la oferta (con / sin)" },
  { name: "OfferCard", path: "/handoff/offercard", role: "Ofertas relacionadas" },
  { name: "LikeButton", path: "/handoff/likebutton", role: "Favorito de la ficha" },
  { name: "ProposalModal", path: "/handoff/proposalmodal", role: "Modal para enviar una propuesta" },
  { name: "ProposalNotice", path: "/handoff/proposalnotice", role: "Avisos de fondos insuficientes o negociación cerrada" },
  { name: "ChatHeader", path: "/handoff/chatheader", role: "Cabecera del SubasChat del acuerdo" },
  { name: "ChatDay", path: "/handoff/chatday", role: "Separador de día del SubasChat" },
  { name: "ChatBubble", path: "/handoff/chatbubble", role: "Mensajes del SubasChat" },
  { name: "ChatNotice", path: "/handoff/chatnotice", role: "Avisos del sistema en el SubasChat" },
  { name: "ChatComposer", path: "/handoff/chatcomposer", role: "Caja para escribir del SubasChat" },
  { name: "Button", path: "/handoff/button", role: "Ofertar, Agenda tu visita y acciones del chat" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "Volver a Mi Garaje y enlaces de sección" },
  { name: "Vidrio", path: "/handoff/vidrio", role: "Íconos de vidrio del modal y los avisos" },
  { name: "CardTitle", path: "/handoff/cardtitle", role: "Títulos de sección de la ficha" },
];

const FILES: BlockFile[] = [
  "src/blocks/mi-garaje/desktop/Propuesta.tsx",
  "src/blocks/mi-garaje/desktop/propuesta.css",
  "src/blocks/mi-garaje/desktop/Oferta.tsx",
  "src/blocks/mi-garaje/desktop/SubasChat.tsx",
  "src/blocks/mi-garaje/desktop/subaschat.css",
  "src/blocks/mi-garaje/desktop/chat.ts",
  "src/blocks/mi-garaje/desktop/kit.tsx",
  "src/blocks/detalle/desktop/Detalle.tsx",
  "src/blocks/detalle/pills.ts",
  "src/components/DetailCard.tsx",
  "src/components/CardViewer.tsx",
  "src/components/AuctionStatus.tsx",
  "src/components/Accordion.tsx",
  "src/components/ConditionPill.tsx",
  "src/components/OfferCard.tsx",
  "src/components/LikeButton.tsx",
  "src/components/ProposalModal.tsx",
  "src/components/ProposalNotice.tsx",
  "src/components/ChatHeader.tsx",
  "src/components/ChatDay.tsx",
  "src/components/ChatBubble.tsx",
  "src/components/ChatNotice.tsx",
  "src/components/ChatComposer.tsx",
  "src/components/Button.tsx",
  "src/components/ProfileButton.tsx",
  "src/components/Vidrio.tsx",
  "src/components/CardTitle.tsx",
].map(function toFile(p) {
  return { path: p, code: readSrc(p) };
});

export default function DetalleBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <DetalleViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
