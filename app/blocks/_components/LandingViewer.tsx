"use client";

import type { JSX } from "react";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/** Visor de una landing: la muestra en un iframe (escritorio 1024 y celular 393) para que sus media queries
 *  respondan al ancho real. `src` es la ruta de la landing a pantalla completa. */
export default function LandingViewer({ id, description, src, width, height, mobileWidth, mobileHeight, files }: {
  id: string; description: string; src: string; width: number; height: number; mobileWidth: number; mobileHeight: number; files: BlockFile[];
}): JSX.Element {
  const frame = (w: number, h: number, title: string) => (
    <iframe key={w} src={src} title={title} width={w} height={h} style={{ display: "block", border: 0, background: "#2E0F70" }} />
  );
  const controls = (
    <a href={src} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 600, color: "var(--ui-accent)" }}>Abrir a pantalla completa ↗</a>
  );
  return (
    <BlockViewer
      id={id}
      description={description}
      width={width}
      height={height}
      canvas={frame(width, height, `${id} en escritorio`)}
      canvasForViewport={{ mobile: { node: frame(mobileWidth, mobileHeight, `${id} en celular`), width: mobileWidth, height: mobileHeight } }}
      files={files}
      controls={controls}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
