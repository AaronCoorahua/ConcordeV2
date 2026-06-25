import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import SalaViewer from "./SalaViewer";

/**
 * /blocks/sala — Visor del bloque Sala (desktop + mobile).
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "AvatarZone", path: "/handoff/avatarzone", role: "Avatar del usuario en el ConsoleHeader (Mi C.U.U.)" },
  { name: "PriceBadge", path: "/handoff/pricebadge", role: "Badge de «Conectados» en el ConsoleHeader" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Pill de estado (OFERTA) en el ConsoleHeader" },
  { name: "Signal", path: "/handoff/signal", role: "Indicador de conectividad (desktop header + mobile header)" },
  { name: "SalaStatus", path: "/handoff/salastatus", role: "Cabecera del visor: vehículo + placa + countdown" },
  { name: "CardViewer", path: "/handoff/cardviewer", role: "Visor de imágenes + filmstrip (envuelve a SalaStatus)" },
  { name: "PriceIcon", path: "/handoff/priceicon", role: "Gema en la card PRECIO BASE" },
  { name: "SendBidIcon", path: "/handoff/sendbidicon", role: "Botón circular en las pills MIS BIDS / BIDS TOTALES" },
  { name: "BidProposal", path: "/handoff/bidproposal", role: "Bid actual (glass, efecto bombilla) — desktop y mobile" },
  { name: "BidMessage", path: "/handoff/bidmessage", role: "Burbujas de mensajes del chat — desktop y mobile" },
  { name: "ProgressBar", path: "/handoff/progressbar", role: "Barra de tiempo de bid — desktop y mobile" },
  { name: "Button", path: "/handoff/button", role: "CTA primary (monto) — desktop 200×48, mobile 320×48" },
  { name: "BidPosition", path: "/handoff/bidposition", role: "Tabla de posiciones de pujas (solo desktop)" },
];

const FILES: BlockFile[] = [
  { path: "src/blocks/sala/desktop/SalaDesktop.tsx", code: readSrc("src/blocks/sala/desktop/SalaDesktop.tsx") },
  { path: "src/blocks/sala/desktop/ConsoleHeader.tsx", code: readSrc("src/blocks/sala/desktop/ConsoleHeader.tsx") },
  { path: "src/blocks/sala/desktop/PriceBase.tsx", code: readSrc("src/blocks/sala/desktop/PriceBase.tsx") },
  { path: "src/blocks/sala/desktop/BidChat.tsx", code: readSrc("src/blocks/sala/desktop/BidChat.tsx") },
  { path: "src/blocks/sala/desktop/ChatArea.tsx", code: readSrc("src/blocks/sala/desktop/ChatArea.tsx") },
  { path: "src/blocks/sala/mobile/SalaMobile.tsx", code: readSrc("src/blocks/sala/mobile/SalaMobile.tsx") },
  { path: "src/blocks/sala/mobile/MobileHeader.tsx", code: readSrc("src/blocks/sala/mobile/MobileHeader.tsx") },
  { path: "src/blocks/sala/mobile/MobileChatPanel.tsx", code: readSrc("src/blocks/sala/mobile/MobileChatPanel.tsx") },
  { path: "src/blocks/sala/StatPill.tsx", code: readSrc("src/blocks/sala/StatPill.tsx") },
  { path: "src/blocks/sala/useSala.ts", code: readSrc("src/blocks/sala/useSala.ts") },
  { path: "src/blocks/sala/liveData.ts", code: readSrc("src/blocks/sala/liveData.ts") },
];

export default function SalaBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <SalaViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
