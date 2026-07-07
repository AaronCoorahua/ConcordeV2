"use client";

import { useState } from "react";
import type { JSX, CSSProperties } from "react";
import SalaMobile, { type CtaVariant } from "@/src/blocks/testsala2/mobile/SalaMobile";
import { SALAMOBILE_WIDTH, SALAMOBILE_HEIGHT } from "@/src/blocks/testsala2/mobile/dimensions";
import BlockViewer, { type BlockFile, VAULT_PREVIEW_BG } from "@/app/blocks/_components/BlockViewer";

/**
 * TestSala2Viewer — Visor del bloque TestSala2 (réplica del mobile de Sala,
 * con todo su flujo "Ver live"). Solo mobile; incluye 3 variantes del CTA
 * (Full Botón / hero / default) para explorar darle más protagonismo al botón.
 * "Full Botón" es la que se muestra primero por defecto.
 */

const CTA_VARIANTS: { value: CtaVariant; name: string; hint: string }[] = [
  { value: "fullbutton", name: "Full Botón", hint: "Arranca gigante (88px) sin ProgressBar. En modo estático (no 'Ver live'), cada click agrega tu puja + respuesta de otro postor al chat. Recién a la 3ra puja se dispara, una única vez, el remate: \"Cierra en\" + \"A la una/dos/tres\" con la barra llenándose — tras eso el botón se queda chico y la barra llena para siempre." },
  { value: "hero", name: "Hero XL", hint: "76px de alto con más espacio propio reservado — no tapa el stream ni el ProgressBar." },
  { value: "default", name: "Default", hint: "Full-width, 60px de alto — la versión actual." },
];

const PALETTES: { name: string; colors: string[] }[] = [
  { name: "Primary", colors: ["#F4AC59", "#8460E5", "#ffffff"] },
  { name: "Rainbow", colors: ["#F2CCFF", "#CC00FF", "#FF0066"] },
  { name: "Lila", colors: ["#CFBAFF", "#AE8EFF", "#ffffff"] },
];

type FlashMode = "bulb" | "spin" | "explode" | "pulse" | "combo" | "shine";
const EFFECTS: { name: string; value: FlashMode }[] = [
  { name: "💡 Bombilla", value: "bulb" },
  { name: "🌀 Gira", value: "spin" },
  { name: "💥 Estalla", value: "explode" },
  { name: "✨ Anticipa", value: "pulse" },
  { name: "🎆 Festejo", value: "combo" },
  { name: "🌟 Resplandor", value: "shine" },
];

const CHIP_BASE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 30,
  padding: "0 12px",
  borderRadius: 15,
  fontFamily: "inherit",
  fontSize: 12.5,
  fontWeight: 600,
  cursor: "pointer",
} as const;

function chipStyle(active: boolean): CSSProperties {
  return {
    ...CHIP_BASE,
    border: active ? "1px solid #4f2ed8" : "1px solid #e2e8f0",
    background: active ? "#f1edff" : "#ffffff",
    color: active ? "#4f2ed8" : "#3f3f46",
  };
}

function tabStyle(active: boolean): CSSProperties {
  return {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    padding: "8px 14px",
    borderRadius: 10,
    border: active ? "1.5px solid #8460E5" : "1px solid #e2e8f0",
    background: active ? "linear-gradient(120deg, #f1edff, #fdf2ff)" : "#ffffff",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    minWidth: 168,
  };
}

const TAB_TITLE = (active: boolean): CSSProperties => ({
  fontSize: 13,
  fontWeight: 700,
  color: active ? "#4f2ed8" : "#18181b",
});

const TAB_HINT: CSSProperties = {
  fontSize: 11,
  color: "#71717a",
  lineHeight: 1.35,
};

const GROUP_LABEL: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#a1a1aa",
  marginRight: 2,
};

// Marco de teléfono genérico (Android-style) para previsualizar el mobile.
const PHONE_BEZEL = 12; // grosor del marco
const PHONE_RADIUS = 44; // radio exterior

function PhoneFrame({ width, height, children }: { width: number; height: number; children: JSX.Element }): JSX.Element {
  const btn = { position: "absolute" as const, borderRadius: 3, background: "linear-gradient(180deg, #3a3a3f, #202024)" };
  return (
    <div
      style={{
        position: "relative",
        boxSizing: "content-box",
        width,
        height,
        padding: PHONE_BEZEL,
        borderRadius: PHONE_RADIUS,
        background: "linear-gradient(155deg, #2a2a2e 0%, #0c0c0e 55%, #1a1a1d 100%)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.22) inset, 0 0 0 2px #000, 0 30px 60px -12px rgba(0,0,0,0.55)",
      }}
    >
      {/* Botón de volumen (izquierda, doble) y power (derecha) */}
      <span style={{ ...btn, left: -3, top: 150, width: 3, height: 52 }} />
      <span style={{ ...btn, left: -3, top: 214, width: 3, height: 52 }} />
      <span style={{ ...btn, right: -3, top: 190, width: 3, height: 80 }} />

      {/* Pantalla */}
      <div style={{ position: "relative", width, height, borderRadius: PHONE_RADIUS - PHONE_BEZEL, overflow: "hidden", background: "#000" }}>
        {children}
      </div>
    </div>
  );
}

export default function TestSala2Viewer({ files }: { files: BlockFile[] }): JSX.Element {
  const [pal, setPal] = useState(0);
  const [mode, setMode] = useState<FlashMode>("bulb");
  const [live, setLive] = useState(false);
  const [noReserve, setNoReserve] = useState(false);
  const [ctaVariant, setCtaVariant] = useState<CtaVariant>("fullbutton");
  // El marco del teléfono va siempre activo (default), sin chip toggle.
  const frame = true;

  const framed = (
    <PhoneFrame width={SALAMOBILE_WIDTH} height={SALAMOBILE_HEIGHT}>
      <SalaMobile live={live} noReserve={noReserve} flashColors={PALETTES[pal].colors} flashMode={mode} ctaVariant={ctaVariant} />
    </PhoneFrame>
  );
  const bare = <SalaMobile live={live} noReserve={noReserve} flashColors={PALETTES[pal].colors} flashMode={mode} ctaVariant={ctaVariant} />;
  const node = frame ? framed : bare;
  const w = frame ? SALAMOBILE_WIDTH + PHONE_BEZEL * 2 : SALAMOBILE_WIDTH;
  const h = frame ? SALAMOBILE_HEIGHT + PHONE_BEZEL * 2 : SALAMOBILE_HEIGHT;

  const controls = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={GROUP_LABEL}>Botón CTA</span>
        {CTA_VARIANTS.map(function renderTab(v) {
          const active = ctaVariant === v.value;
          return (
            <button
              key={v.value}
              type="button"
              onClick={function pick() { setCtaVariant(v.value); }}
              style={tabStyle(active)}
            >
              <span style={TAB_TITLE(active)}>{v.name}</span>
              <span style={TAB_HINT}>{v.hint}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <button
        type="button"
        onClick={function toggle() { setLive(function flip(v) { return !v; }); }}
        style={{ ...CHIP_BASE, border: "none", color: "#ffffff", fontWeight: 700, background: live ? "#FF0066" : "linear-gradient(120deg, #5F3ED8 0%, #340091 100%)", boxShadow: "0 2px 8px rgba(20,0,69,0.25)" }}
      >
        {live ? "■ Detener" : "▶ Ver live"}
      </button>
      <button
        type="button"
        onClick={function toggleReserve() { setNoReserve(function flip(v) { return !v; }); }}
        title="Con precio reserva: tras el remate y 'procesando' muestra el sub-flujo 'Mejor postor / ¿Deseas mejorarlo?' → ingresar monto → confirmar → 48 horas."
        style={chipStyle(noReserve)}
      >
        {noReserve ? "☑" : "☐"} Con precio reserva
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={GROUP_LABEL}>Luz</span>
        {PALETTES.map(function renderPal(p, i) {
          return (
            <button key={p.name} type="button" onClick={function pick() { setPal(i); }} title={p.name} style={chipStyle(pal === i)}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: `conic-gradient(${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]}, ${p.colors[0]})` }} />
              {p.name}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={GROUP_LABEL}>Efecto</span>
        {EFFECTS.map(function renderEffect(e) {
          return (
            <button key={e.value} type="button" onClick={function set() { setMode(e.value); }} style={chipStyle(mode === e.value)}>
              {e.name}
            </button>
          );
        })}
      </div>
      </div>
    </div>
  );

  return (
    <BlockViewer
      id="testsala2"
      description="Réplica del mobile de Sala con todo su flujo 'Ver live' — 3 variantes del CTA (default / hero / overlay)."
      width={w}
      height={h}
      canvas={node}
      canvasForViewport={{ mobile: { node, width: w, height: h } }}
      files={files}
      controls={controls}
      previewBg={VAULT_PREVIEW_BG}
    />
  );
}
