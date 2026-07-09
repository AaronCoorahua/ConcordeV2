/**
 * LayoutBanner — 766×192 · variantes MODERNAS de banner (nueva propuesta DS).
 * Sin botones ni componentes literales: se REUTILIZAN los estilos del DS —
 *   · pill EN VIVO/NEGOCIABLE = colores del Button (fill #ed8936→#8460e5 /
 *     #00aeb1→#8460e5 + anillo gradiente + inset highlight)
 *   · contador = ESTILOS del StatPill (dark glass + borde VYStrokes + inset)
 *     en un contenedor propio, sin el componente
 *   · chip horario = TimerIcon en glass pill · gema = PriceIcon
 *   · fondos = gradientes de OfferType (live/negotiable) y header DetailCard
 * El protagonista es el número gigante. Estático, sin efectos.
 */

import type { CSSProperties, JSX, ReactNode } from "react";
import PriceIcon from "@/src/components/PriceIcon";
import TimerIcon from "@/src/components/TimerIcon";
import { ChevronV, HandshakeIcon, CarIcon } from "./decor";
import { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

export { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

// ─── Tonos (gradientes reales del DS) ─────────────────────────────────────────

export type BannerTone = "naranja" | "teal";

interface Tone {
  bg: string;
  ink: string;
  /** Color del número protagonista sobre el fondo del tono */
  accent: string;
  chevron: string;
  /** Fill de la pill — colores del Button primary / negotiable */
  pillFill: string;
  /** Anillo gradiente de la pill — borde del Button primary / negotiable */
  pillRing: string;
  pillGlow: string;
}

const TONES: Record<BannerTone, Tone> = {
  // OfferType live · Button primary
  naranja: {
    bg: "linear-gradient(120deg, #FF9639 0%, #EF852E 45%, #BE3D00 100%)",
    ink: "#FFFFFF",
    accent: "#2E0F70",
    chevron: "rgba(255,255,255,0.30)",
    pillFill: "linear-gradient(135deg, #ed8936 0%, #ed8936 30%, #8460e5 100%)",
    pillRing: "linear-gradient(135deg, #ffffff 0%, #fbc47d 25%, #ae8eff 75%, #ffffff 100%)",
    pillGlow: "rgba(237,137,54,0.35)",
  },
  // OfferType negotiable · Button negotiable
  teal: {
    bg: "linear-gradient(100deg, #00EDEE 0%, #00D2D3 45%, #009597 100%)",
    ink: "#FFFFFF",
    accent: "#2E0F70",
    chevron: "rgba(255,255,255,0.32)",
    pillFill: "linear-gradient(135deg, #00aeb1 0%, #00aeb1 30%, #8460e5 100%)",
    pillRing: "linear-gradient(135deg, #ffffff 0%, #4ddcdc 25%, #6445df 75%, #ffffff 100%)",
    pillGlow: "rgba(0,174,177,0.35)",
  },
};

/** Fondo morado del header DetailCard (layout "panel") */
const PANEL_BG = "linear-gradient(157deg, #5F3ED8 0%, #340091 50%, #140046 100%)";

// ─── Piezas (estilos del DS, no componentes) ──────────────────────────────────

function Glass(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)", pointerEvents: "none" }}
    />
  );
}

function Gem({ left, right, top, bottom, size = "md" }: { left?: number | string; right?: number | string; top?: number | string; bottom?: number | string; size?: "sm" | "md" }): JSX.Element {
  return (
    <span aria-hidden="true" style={{ position: "absolute", left, right, top, bottom, pointerEvents: "none", filter: "drop-shadow(0 2px 4px rgba(20,0,70,0.25))" }}>
      <PriceIcon size={size} />
    </span>
  );
}

/** Pill EN VIVO / NEGOCIABLE — gradiente + anillo del Button (solo estilos) */
function GradientPill({ t, text, icon }: { t: Tone; text: string; icon?: boolean }): JSX.Element {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        borderRadius: 9999,
        border: "2px solid transparent",
        overflow: "hidden",
        padding: "7px 18px",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "0.03em",
        color: "#FFFFFF",
        textShadow: "rgba(0,0,0,0.25) 0 1px 3px",
        backgroundImage: `${t.pillFill}, ${t.pillRing}`,
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: `rgba(255,255,255,0.28) 0 1px 0 1px inset, ${t.pillGlow} 0 2px 6px`,
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 9999, background: "linear-gradient(rgba(255,255,255,0.17) 0%, transparent 55%)", pointerEvents: "none" }} />
      {icon && <HandshakeIcon size={17} color="#FFFFFF" />}
      {text}
    </span>
  );
}

/** Contador con los ESTILOS del StatPill: dark glass + borde VYStrokes + inset */
function GlassCounter({ label, value, big = false }: { label: string; value: string; big?: boolean }): JSX.Element {
  return (
    <div
      style={{
        boxSizing: "border-box",
        borderRadius: 16,
        border: "1.5px solid transparent",
        backgroundImage:
          "linear-gradient(127deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.03) 100%), linear-gradient(160deg, rgba(28,13,82,0.93) 0%, rgba(14,3,56,0.95) 100%), linear-gradient(125deg, rgba(255,255,255,0.9) 0%, rgba(244,172,89,0.7) 22%, rgba(132,96,229,0.7) 74.5%, rgba(255,255,255,0.9) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        boxShadow: "rgba(10,0,46,0.6) 0px 12px 36px -4px, inset 0 1px 0 rgba(255,255,255,0.22)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: big ? "16px 34px" : "12px 26px",
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1, color: "#ffffff", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: big ? 58 : 42, fontWeight: 800, lineHeight: 1, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

/** Chip glass con TimerIcon (horario de cierre) */
function TimerChip({ text }: { text: string }): JSX.Element {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 30,
        padding: "0 14px",
        borderRadius: 9999,
        background: "linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 100%)",
        border: "1px solid rgba(255,255,255,0.5)",
        color: "#FFFFFF",
        fontSize: 12.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: "rgba(255,255,255,0.2) 0 1px 0 0 inset",
      }}
    >
      <TimerIcon size={16} color="#FFFFFF" />
      {text}
    </span>
  );
}

function Chip({ chip }: { chip: { label: string; icon?: "car" } }): JSX.Element {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid transparent",
        backgroundImage:
          "linear-gradient(160deg, #ffffff 0%, #f4f5f9 100%), linear-gradient(135deg, #9c96f8 0%, rgba(255,255,255,0.65) 38%, #7364de 70%, #9c96f8 100%)",
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        color: "#3b1782",
        borderRadius: 10,
        padding: "9px 18px",
        fontSize: 14,
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: "rgba(32,0,104,0.14) 0 2px 10px, rgba(32,0,104,0.08) 0 1px 3px",
      }}
    >
      {chip.label}
      {chip.icon === "car" && <CarIcon size={22} color="#3b1782" />}
    </span>
  );
}

// ─── Layouts ──────────────────────────────────────────────────────────────────

export type BannerLayout = "hero" | "panel" | "big-number" | "centered" | "outline-number";

export interface LayoutBannerProps {
  tone: BannerTone;
  layout: BannerLayout;
  pillText: string;
  pillIcon?: boolean;
  count: number | string;
  title: string;
  subtitle?: string;
  /** Chip glass con TimerIcon — p.ej. "Hoy · 6:01 PM" */
  timer?: string;
  chip?: { label: string; icon?: "car" };
  className?: string;
}

const shell = (bg: string): CSSProperties => ({
  position: "relative",
  width: BANNER_WIDTH,
  height: BANNER_HEIGHT,
  background: bg,
  overflow: "hidden",
  fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
  flexShrink: 0,
});

function ChipSlot({ children, side = "right" }: { children: ReactNode; side?: "left" | "right" }): JSX.Element {
  return <div style={{ position: "absolute", bottom: 14, ...(side === "right" ? { right: 20 } : { left: 20 }) }}>{children}</div>;
}

export default function LayoutBanner({
  tone,
  layout,
  pillText,
  pillIcon = false,
  count,
  title,
  subtitle,
  timer,
  chip,
  className = "",
}: LayoutBannerProps): JSX.Element {
  const t = TONES[tone];

  // ── "hero" — pill gradiente + título + timer izquierda · número gigante derecha ──
  if (layout === "hero") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <Glass />
        <ChevronV width={170} color={t.chevron} style={{ left: 330, top: "50%", transform: "translateY(-50%)" }} />
        <Gem left={410} bottom={18} size="sm" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, maxWidth: 400 }}>
            <GradientPill t={t} text={pillText} icon={pillIcon} />
            <span style={{ fontSize: 27, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
            {timer ? <TimerChip text={timer} /> : subtitle ? <span style={{ fontSize: 13, fontWeight: 600, color: t.ink, opacity: 0.92 }}>{subtitle}</span> : null}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: t.ink, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>Ofertas</span>
            <span style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", color: t.accent, textShadow: "rgba(255,255,255,0.30) 0 2px 0" }}>{count}</span>
          </div>
        </div>
        {chip && <ChipSlot side="left"><Chip chip={chip} /></ChipSlot>}
      </div>
    );
  }

  // ── "panel" — morado DetailCard · contador con estilos de StatPill a la derecha ──
  if (layout === "panel") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(PANEL_BG)}>
        <Glass />
        <ChevronV width={180} color="rgba(255,255,255,0.20)" style={{ left: 330, top: "50%", transform: "translateY(-50%)" }} />
        <Gem left={410} bottom={16} size="sm" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, maxWidth: 400 }}>
            <GradientPill t={t} text={pillText} icon={pillIcon} />
            <span style={{ fontSize: 27, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</span>
            {timer && <TimerChip text={timer} />}
          </div>
          <GlassCounter label="Ofertas" value={String(count)} big />
        </div>
        {chip && <ChipSlot side="left"><Chip chip={chip} /></ChipSlot>}
      </div>
    );
  }

  // ── "big-number" — número gigante a la izquierda, texto a la derecha ──
  if (layout === "big-number") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <Glass />
        <ChevronV width={170} color={t.chevron} style={{ right: -24, top: "50%", transform: "translateY(-50%)" }} />
        <Gem right={64} bottom={20} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 44px", gap: 28 }}>
          <span style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", color: t.accent, textShadow: "rgba(255,255,255,0.30) 0 2px 0", flexShrink: 0 }}>
            {count}
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 9 }}>
            <GradientPill t={t} text={pillText} icon={pillIcon} />
            <span style={{ fontSize: 25, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 330, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
            {subtitle && <span style={{ fontSize: 13, fontWeight: 600, color: t.ink, opacity: 0.92 }}>{subtitle}</span>}
          </div>
        </div>
        {chip && <ChipSlot><Chip chip={chip} /></ChipSlot>}
      </div>
    );
  }

  // ── "centered" — pill gradiente + título + número gigante, todo centrado ──
  if (layout === "centered") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <Glass />
        <ChevronV width={160} color={t.chevron} style={{ left: -50, top: "50%", transform: "translateY(-50%)" }} />
        <ChevronV width={160} color={t.chevron} style={{ right: -50, top: "50%", transform: "translateY(-50%)" }} />
        <Gem left={92} bottom={26} size="sm" />
        <Gem right={92} top={26} size="sm" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 22, padding: "0 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, textAlign: "right" }}>
            <GradientPill t={t} text={pillText} icon={pillIcon} />
            <span style={{ fontSize: 26, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 350, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
          </div>
          <span aria-hidden="true" style={{ width: 2, height: 96, background: "rgba(255,255,255,0.45)", borderRadius: 2, flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: t.ink, textTransform: "uppercase", letterSpacing: "0.06em", textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>Ofertas</span>
            <span style={{ fontSize: 88, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", color: t.accent, textShadow: "rgba(255,255,255,0.30) 0 2px 0" }}>{count}</span>
          </div>
        </div>
        {chip && <ChipSlot><Chip chip={chip} /></ChipSlot>}
      </div>
    );
  }

  // ── "outline-number" — número gigante en contorno de fondo ──
  return (
    <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
      <Glass />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 28,
          top: "50%",
          transform: "translateY(-52%)",
          fontSize: 164,
          fontWeight: 800,
          lineHeight: 0.8,
          color: "transparent",
          WebkitTextStroke: "2px rgba(255,255,255,0.5)",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
        }}
      >
        {count}
      </span>
      <Gem right={200} top={24} size="sm" />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 9, padding: "0 44px", maxWidth: 470 }}>
        <GradientPill t={t} text={pillText} icon={pillIcon} />
        <span style={{ fontSize: 27, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 7, fontSize: 15, fontWeight: 700, color: t.ink }}>
          <b style={{ fontSize: 21, color: t.accent }}>{count}</b> ofertas activas
        </span>
      </div>
      {chip && <ChipSlot><Chip chip={chip} /></ChipSlot>}
    </div>
  );
}
