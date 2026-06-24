import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import SalaViewer from "./SalaViewer";

/**
 * /blocks/sala — Visor del bloque Sala (estilo shadcn).
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
  { name: "Signal", path: "/handoff/signal", role: "Indicador de conectividad en el ConsoleHeader" },
  { name: "SalaStatus", path: "/handoff/salastatus", role: "Cabecera del visor: vehículo + placa + countdown" },
  { name: "CardViewer", path: "/handoff/cardviewer", role: "Visor de imágenes + filmstrip (envuelve a SalaStatus)" },
  { name: "PriceIcon", path: "/handoff/priceicon", role: "Gema en la card PRECIO BASE" },
  { name: "SendBidIcon", path: "/handoff/sendbidicon", role: "Botón circular en las pills MIS BIDS / BIDS TOTALES" },
  { name: "BidProposal", path: "/handoff/bidproposal", role: "Bid actual (glass, efecto bombilla) encima del chat" },
  { name: "BidMessage", path: "/handoff/bidmessage", role: "Burbujas de mensajes del chat (propuesta / cierra / VMC)" },
  { name: "ProgressBar", path: "/handoff/progressbar", role: "Barra de tiempo de bid (fondo del chat)" },
  { name: "Button", path: "/handoff/button", role: "CTA primary 200×48 (monto) debajo del chat" },
  { name: "BidPosition", path: "/handoff/bidposition", role: "Tabla de posiciones de pujas (debajo del chat)" },
];

const FILES: BlockFile[] = [
  { path: "src/blocks/Sala/Sala.tsx", code: readSrc("src/blocks/Sala/Sala.tsx") },
  { path: "src/blocks/Sala/ConsoleHeader.tsx", code: readSrc("src/blocks/Sala/ConsoleHeader.tsx") },
  { path: "src/blocks/Sala/PriceBase.tsx", code: readSrc("src/blocks/Sala/PriceBase.tsx") },
  { path: "src/blocks/Sala/StatPill.tsx", code: readSrc("src/blocks/Sala/StatPill.tsx") },
  { path: "src/blocks/Sala/BidChat.tsx", code: readSrc("src/blocks/Sala/BidChat.tsx") },
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
