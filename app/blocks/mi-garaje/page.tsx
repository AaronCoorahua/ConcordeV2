import type { JSX } from "react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import MiGarajeViewer from "./MiGarajeViewer";
import MiGarajeComparison from "./MiGarajeComparison";

/**
 * /blocks/mi-garaje — Visor del bloque Mi Garaje (escritorio + celular), la evolución de Zona.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}
// Todos los archivos del bloque (desktop, lib, avt, mobile), en orden alfabético por carpeta.
function walk(rel: string): string[] {
  const dir = join(process.cwd(), rel);
  try {
    return readdirSync(dir).sort().flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(`${rel}/${n}`) : /\.(tsx?|css)$/.test(n) ? [`${rel}/${n}`] : []));
  } catch {
    return [];
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "PublicationBadge", path: "/handoff/publicationbadge", role: "Estados de Mis publicaciones y chincheta de fijada (nuevo)" },
  { name: "RiskMeter", path: "/handoff/riskmeter", role: "Riesgo del perfil en la cabecera de cuenta (nuevo)" },
  { name: "Countdown", path: "/handoff/countdown", role: "Plazos de negociación y cierres (nuevo)" },
  { name: "AccountCard", path: "/handoff/accountcard", role: "Tarjeta Tu cuenta: usuario, riesgo, puntos y SubasPass (nuevo)" },
  { name: "ActionTile", path: "/handoff/actiontile", role: "Accesos Publica y Valoriza del riel (nuevo)" },
  { name: "WalletCard", path: "/handoff/walletcard", role: "Mi billetera en el riel (nuevo)" },
  { name: "RecommendedList", path: "/handoff/recommendedlist", role: "Recomendados del riel (nuevo)" },
  { name: "AdBanner", path: "/handoff/adbanner", role: "Publicidad del riel y de la barra lateral (nuevo)" },
  { name: "ActivitySection", path: "/handoff/activitysection", role: "Secciones plegables de Tu actividad (nuevo)" },
  { name: "PendingToggle", path: "/handoff/pendingtoggle", role: "Filtro Pendientes en la cabecera de Tu actividad (nuevo)" },
  { name: "FolderTabs", path: "/handoff/foldertabs", role: "Compras / En venta de Mis negociaciones (nuevo)" },
  { name: "StageTabs", path: "/handoff/stagetabs", role: "Etapas de Mis participaciones (nuevo)" },
  { name: "VehicleRow", path: "/handoff/vehiclerow", role: "Filas de vehículo de Tu actividad (nuevo)" },
  { name: "StatusTag", path: "/handoff/statustag", role: "EN VIVO en las filas y estados de Mis valorizaciones (nuevo)" },
  { name: "Pagination", path: "/handoff/pagination", role: "Paginado de las secciones de Tu actividad (nuevo)" },
  { name: "MoreButton", path: "/handoff/morebutton", role: "Botón ⋯ de las filas de Mis publicaciones (nuevo)" },
  { name: "ActionList", path: "/handoff/actionlist", role: "Acciones que abre el ⋯ en Mis publicaciones (nuevo)" },
  { name: "RepublishBar", path: "/handoff/republishbar", role: "Republicar o dar de baja en una publicación desierta (nuevo)" },
  { name: "RepublishModal", path: "/handoff/republishmodal", role: "Republicar una publicación (nuevo)" },
  { name: "DropModal", path: "/handoff/dropmodal", role: "Dar de baja una publicación (nuevo)" },
  { name: "NotificationBell", path: "/handoff/notificationbell", role: "Campana de notificaciones del header (nuevo)" },
  { name: "NotificationBox", path: "/handoff/notificationbox", role: "Aviso de nueva notificación arriba a la derecha (nuevo)" },
  { name: "NotificationInbox", path: "/handoff/notificationinbox", role: "Bandeja de notificaciones bajo la campana (nuevo)" },
  { name: "Stepper", path: "/handoff/stepper", role: "Pasos de Valorizar y Publicar (nuevo)" },
  { name: "SectionHead", path: "/handoff/sectionhead", role: "Encabezado de cada sección del formulario de Valorizar (nuevo)" },
  { name: "Select", path: "/handoff/select", role: "Campos de lista de Valorizar y Publicar (nuevo)" },
  { name: "Combobox", path: "/handoff/combobox", role: "Marca y modelo con búsqueda en Valorizar (nuevo)" },
  { name: "ValueHero", path: "/handoff/valuehero", role: "Valor de mercado en el resultado de Valorizar (nuevo)" },
  { name: "ProjectionChart", path: "/handoff/projectionchart", role: "Proyección del valor en el resultado de Valorizar (nuevo)" },
  { name: "SeasonChart", path: "/handoff/seasonchart", role: "Mejor mes para vender en el resultado de Valorizar (nuevo)" },
  { name: "DecisionBar", path: "/handoff/decisionbar", role: "Barra ¿Publicamos tu vehículo? al final del resultado (nuevo)" },
  { name: "ValuationCard", path: "/handoff/valuationcard", role: "Tarjetas de Mis valorizaciones (nuevo)" },
  { name: "AddButton", path: "/handoff/addbutton", role: "Valorizar otro vehículo en Mis valorizaciones (nuevo)" },
  { name: "PublishSwipe", path: "/handoff/publishswipe", role: "Botón Publicar de una valorización lista (nuevo)" },
  { name: "PublishFeeBanner", path: "/handoff/publishfeebanner", role: "Banner del pago único en Publicar (nuevo)" },
  { name: "SidePanel", path: "/handoff/sidepanel", role: "Panel lateral que abre una fila de Tu actividad (nuevo)" },
  { name: "ProposalModal", path: "/handoff/proposalmodal", role: "Modal para enviar una propuesta (nuevo)" },
  { name: "ProposalNotice", path: "/handoff/proposalnotice", role: "Avisos de fondos insuficientes o negociación cerrada (nuevo)" },
  { name: "ResponseTimer", path: "/handoff/responsetimer", role: "Plazo para responder en la negociación (nuevo)" },
  { name: "RoundProgress", path: "/handoff/roundprogress", role: "Ronda de la negociación (nuevo)" },
  { name: "ProposalThread", path: "/handoff/proposalthread", role: "Historial de propuestas de la negociación (nuevo)" },
  { name: "AmountComposer", path: "/handoff/amountcomposer", role: "Campo para escribir una contrapropuesta (nuevo)" },
  { name: "ChatHeader", path: "/handoff/chatheader", role: "Cabecera del SubasChat (nuevo)" },
  { name: "ChatDay", path: "/handoff/chatday", role: "Separador de día del SubasChat (nuevo)" },
  { name: "ChatBubble", path: "/handoff/chatbubble", role: "Mensajes del SubasChat (nuevo)" },
  { name: "ChatNotice", path: "/handoff/chatnotice", role: "Avisos del sistema en el SubasChat (nuevo)" },
  { name: "ChatComposer", path: "/handoff/chatcomposer", role: "Caja para escribir del SubasChat (nuevo)" },
  { name: "TabSelector", path: "/handoff/tabselector", role: "Pestañas de cada sección; nuevo modo bandeja (notificationIndices)" },
  { name: "DetailCard", path: "/handoff/detailcard", role: "Ficha de la propuesta; nuevos banners de Max y mini (assistantBanner, miniBanner)" },
  { name: "Vidrio", path: "/handoff/vidrio", role: "Íconos de vidrio; suma aviso, bolsa, republicar y baja" },
  { name: "Button", path: "/handoff/button", role: "Acciones de las filas, la negociación y los modales" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "Enlaces de sección (Ver todas, Ir a…)" },
  { name: "BidMessage", path: "/handoff/bidmessage", role: "Historial de rondas de la negociación" },
  { name: "Signal", path: "/handoff/signal", role: "Señal del resultado de valorización" },
  { name: "Input", path: "/handoff/input", role: "Formularios de valorizar, publicar y dar de baja" },
  { name: "AvatarZone", path: "/handoff/avatarzone", role: "Avatar de la cabecera de cuenta" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Estados En vivo / Próxima" },
];

const FILES: BlockFile[] = [
  ...walk("src/blocks/mi-garaje"),
  "src/blocks/detalle/desktop/Detalle.tsx",
  "src/components/TabSelector.tsx",
  "src/components/DetailCard.tsx",
  "src/components/Vidrio.tsx",
  "src/components/PublicationBadge.tsx",
  "src/components/RiskMeter.tsx",
  "src/components/Countdown.tsx",
  "src/components/VehicleRow.tsx",
  "src/components/StatusTag.tsx",
  "src/components/StageTabs.tsx",
  "src/components/Pagination.tsx",
  "src/components/Stepper.tsx",
  "src/components/RepublishModal.tsx",
  "src/components/DropModal.tsx",
  "src/components/Select.tsx",
  "src/components/Combobox.tsx",
  "src/components/PublishFeeBanner.tsx",
  "src/components/DecisionBar.tsx",
  "src/components/ValuationCard.tsx",
  "src/components/AddButton.tsx",
  "src/components/ValueHero.tsx",
  "src/components/ProjectionChart.tsx",
  "src/components/SeasonChart.tsx",
  "src/components/SectionHead.tsx",
  "src/components/ChatHeader.tsx",
  "src/components/ChatDay.tsx",
  "src/components/ChatBubble.tsx",
  "src/components/ChatComposer.tsx",
  "src/components/ChatNotice.tsx",
  "src/components/ResponseTimer.tsx",
  "src/components/RoundProgress.tsx",
  "src/components/ProposalThread.tsx",
  "src/components/AmountComposer.tsx",
  "src/components/ProposalModal.tsx",
  "src/components/ProposalNotice.tsx",
  "src/components/FolderTabs.tsx",
  "src/components/PendingToggle.tsx",
  "src/components/ActivitySection.tsx",
  "src/components/AccountCard.tsx",
  "src/components/ActionTile.tsx",
  "src/components/WalletCard.tsx",
  "src/components/RecommendedList.tsx",
  "src/components/PublishSwipe.tsx",
  "src/components/NotificationBell.tsx",
  "src/components/NotificationInbox.tsx",
  "src/components/NotificationBox.tsx",
  "src/components/RepublishBar.tsx",
  "src/components/MoreButton.tsx",
  "src/components/ActionList.tsx",
  "src/components/SidePanel.tsx",
  "src/components/AdBanner.tsx",
].map(function toFile(p) {
  return { path: p, code: readSrc(p) };
});

export default function MiGarajeBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <MiGarajeViewer files={FILES} />
      <MiGarajeComparison />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
