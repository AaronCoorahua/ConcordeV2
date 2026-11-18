"use client";

import { useState } from "react";
import type { JSX } from "react";
import { MI_GARAJE_SCREENS, type MiGarajeScreen } from "@/src/blocks/mi-garaje/desktop/MiGaraje";
import { MI_GARAJE_WIDTH, MI_GARAJE_HEIGHT } from "@/src/blocks/mi-garaje/desktop/dimensions";
import { MI_GARAJE_MOBILE_WIDTH, MI_GARAJE_MOBILE_HEIGHT } from "@/src/blocks/mi-garaje/mobile/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/** Mi Garaje se ve en iframes (/blocks/mi-garaje/m/<pantalla>): su CSS es global (html, body, media queries por pantalla),
 *  así no toca el catálogo y el celular responde a su ancho real. */
export default function MiGarajeViewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [screen, setScreen] = useState<MiGarajeScreen>("vmc");
  const src = `/blocks/mi-garaje/m/${screen}`;
  const frame = (w: number, h: number, title: string) => (
    <iframe key={`${src}-${w}`} src={src} title={title} width={w} height={h} style={{ display: "block", border: 0, background: "#2E0F70" }} />
  );
  const controls = (
    <div role="group" aria-label="Pantalla de Mi Garaje" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {MI_GARAJE_SCREENS.map((s) => (
        <button key={s.id} type="button" aria-pressed={screen === s.id} onClick={() => setScreen(s.id)}
          style={{ fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 999, cursor: "pointer",
            border: `1px solid ${screen === s.id ? "var(--ui-accent)" : "var(--ui-border)"}`,
            background: screen === s.id ? "var(--ui-accent-soft)" : "#fff", color: screen === s.id ? "var(--ui-accent)" : "var(--ui-body)" }}>
          {s.label}
        </button>
      ))}
      <a href={src} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", alignSelf: "center", fontSize: 12.5, fontWeight: 600, color: "var(--ui-accent)" }}>Abrir a pantalla completa ↗</a>
    </div>
  );
  return (
    <BlockViewer
      id="mi-garaje"
      description="Mi Garaje: cuenta, actividad, negociación, valorización y publicación."
      width={MI_GARAJE_WIDTH}
      height={MI_GARAJE_HEIGHT}
      canvas={frame(MI_GARAJE_WIDTH, MI_GARAJE_HEIGHT, "Mi Garaje en escritorio")}
      canvasForViewport={{ mobile: { node: frame(MI_GARAJE_MOBILE_WIDTH, MI_GARAJE_MOBILE_HEIGHT, "Mi Garaje en celular"), width: MI_GARAJE_MOBILE_WIDTH, height: MI_GARAJE_MOBILE_HEIGHT } }}
      files={files}
      controls={controls}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
