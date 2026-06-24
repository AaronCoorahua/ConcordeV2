import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import Viewer from "./Viewer";

/**
 * /blocks/sala-mobile — Visor del bloque Sala · Mobile (estilo shadcn).
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "Signal", path: "/handoff/signal", role: "Indicador de conectividad (variante «white») en el header" },
  { name: "SendBidIcon", path: "/handoff/sendbidicon", role: "Flecha de las pills glass (vía StatPill «glass»)" },
  { name: "BidProposal", path: "/handoff/bidproposal", role: "Propuesta de bid actual (glass, efecto bombilla) arriba del chat" },
  { name: "ProgressBar", path: "/handoff/progressbar", role: "Barra de tiempo de bid (variante «rainbow», horizontal) al fondo del panel" },
  { name: "Button", path: "/handoff/button", role: "CTA primary «US$ 7,000» (320×48) abajo del todo" },
];

const FILES: BlockFile[] = [
  { path: "src/blocks/SalaMobile/SalaMobile.tsx", code: readSrc("src/blocks/SalaMobile/SalaMobile.tsx") },
  { path: "src/blocks/SalaMobile/MobileHeader.tsx", code: readSrc("src/blocks/SalaMobile/MobileHeader.tsx") },
  { path: "src/blocks/SalaMobile/MobileChatPanel.tsx", code: readSrc("src/blocks/SalaMobile/MobileChatPanel.tsx") },
  { path: "src/blocks/Sala/StatPill.tsx", code: readSrc("src/blocks/Sala/StatPill.tsx") },
];

export default function SalaMobileBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <Viewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
