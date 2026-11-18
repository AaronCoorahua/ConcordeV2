"use client";

import type { JSX } from "react";
import { INDEX_SHELL_WIDTH, INDEX_HEIGHT } from "@/src/blocks/index/desktop/dimensions";
import { INDEX_MOBILE_WIDTH, INDEX_MOBILE_HEIGHT } from "@/src/blocks/index/mobile/dimensions";
import { HEADER_HEIGHT } from "@/src/blocks/header/desktop/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";
import IndexShell from "./IndexShell";

export default function IndexViewer({ files, fontClass }: { files: BlockFile[]; fontClass: string }): JSX.Element {
  // Celular: iframe del Index a pantalla completa, así sus media queries ven el ancho real del teléfono.
  const mobile = (
    <iframe src="/blocks/index/embed" title="Index en celular" width={INDEX_MOBILE_WIDTH} height={INDEX_MOBILE_HEIGHT}
      style={{ display: "block", border: 0, background: "#ffffff" }} />
  );
  return (
    <BlockViewer
      id="index"
      description="Nuevo inicio de VMC: banner, VMC ahora, tipo de oferta, tiendas, categorías y campañas."
      width={INDEX_SHELL_WIDTH}
      height={HEADER_HEIGHT + INDEX_HEIGHT}
      canvas={<IndexShell fontClass={fontClass} />}
      canvasForViewport={{ mobile: { node: mobile, width: INDEX_MOBILE_WIDTH, height: INDEX_MOBILE_HEIGHT } }}
      files={files}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
