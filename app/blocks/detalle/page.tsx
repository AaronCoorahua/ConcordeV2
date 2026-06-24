import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Detalle, { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/Detalle/Detalle";
import Header from "@/app/_components/Header";
import BlockViewer, { type BlockFile } from "@/app/blocks/_components/BlockViewer";

/**
 * /blocks/detalle — Visor del bloque Detalle (estilo shadcn).
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const FILES: BlockFile[] = [
  { path: "src/blocks/Detalle/Detalle.tsx", code: readSrc("src/blocks/Detalle/Detalle.tsx") },
];

export default function DetalleBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#09090b", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <BlockViewer
        id="detalle"
        description="Página de detalle de una oferta."
        width={DETALLE_WIDTH}
        height={DETALLE_HEIGHT}
        canvas={<Detalle />}
        files={FILES}
      />
    </div>
  );
}
