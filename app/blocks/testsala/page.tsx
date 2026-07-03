import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import type { BlockFile } from "@/app/blocks/_components/BlockViewer";
import TestSalaViewer from "./TestSalaViewer";

/**
 * /blocks/testsala — Visor del bloque de pruebas TestSala (copia del mobile de
 * Sala con todo su flujo). Independiente del bloque Sala original.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "Signal", path: "/handoff/signal", role: "Indicador de conectividad (mobile header)" },
  { name: "BidProposal", path: "/handoff/bidproposal", role: "Bid actual (glass, efecto bombilla) — mobile" },
  { name: "BidMessage", path: "/handoff/bidmessage", role: "Burbujas de mensajes del chat — mobile" },
  { name: "ProgressBar", path: "/handoff/progressbar", role: "Barra de tiempo de bid / countdown — mobile" },
  { name: "Button", path: "/handoff/button", role: "CTA primary (monto) — mobile 320×48" },
  { name: "StatPill", path: "/handoff/statpill", role: "Pills de estadística MIS BIDS / BIDS TOTALES" },
];

// Archivos propios del bloque (copia mobile con su flujo)
const BLOCK_FILES: BlockFile[] = [
  { path: "src/blocks/testsala/mobile/SalaMobile.tsx", code: readSrc("src/blocks/testsala/mobile/SalaMobile.tsx") },
  { path: "src/blocks/testsala/mobile/MobileHeader.tsx", code: readSrc("src/blocks/testsala/mobile/MobileHeader.tsx") },
  { path: "src/blocks/testsala/mobile/MobileChatPanel.tsx", code: readSrc("src/blocks/testsala/mobile/MobileChatPanel.tsx") },
  { path: "src/blocks/testsala/mobile/dimensions.ts", code: readSrc("src/blocks/testsala/mobile/dimensions.ts") },
  { path: "src/blocks/testsala/useSala.ts", code: readSrc("src/blocks/testsala/useSala.ts") },
  { path: "src/blocks/testsala/liveData.ts", code: readSrc("src/blocks/testsala/liveData.ts") },
];

// Componentes que usa el bloque (derivados de REQUIRED) → aparecen bajo src/components/
const COMPONENT_FILES: BlockFile[] = REQUIRED.map(function toFile(r) {
  const rel = `src/components/${r.name}.tsx`;
  return { path: rel, code: readSrc(rel) };
});

const FILES: BlockFile[] = [...BLOCK_FILES, ...COMPONENT_FILES];

export default function TestSalaBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <TestSalaViewer files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
