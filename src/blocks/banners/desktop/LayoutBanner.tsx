/**
 * LayoutBanner — 766×192 · variantes MODERNAS de banner (nueva propuesta DS).
 * Reutiliza ESTILOS del design system (no componentes de acción):
 *   · pill EN VIVO/NEGOCIABLE = colores del Button (fill + anillo gradiente)
 *   · contador = estilos del StatPill (dark glass + borde VYStrokes)
 *   · número gigante con borde gradiente live/negotiable (SVG stroke)
 *   · SubasCoins = PriceIcon (chica) y BigGem del OfferCard (grande)
 *   · fondos = gradientes de OfferType, header DetailCard y fill del Button
 *   · layout "photo": placeholder de imagen + gradiente de opacidad encima
 * El chip de categoría SIEMPRE va en el flujo (no se superpone a nada).
 * Estático, sin efectos.
 */

import type { CSSProperties, JSX } from "react";
import PriceIcon from "@/src/components/PriceIcon";
import TimerIcon from "@/src/components/TimerIcon";
import { ChevronV, HandshakeIcon, CarIcon, BigGem } from "./decor";
import { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

export { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

// ─── Tonos (gradientes reales del DS) ─────────────────────────────────────────

export type BannerTone = "naranja" | "teal";

interface Tone {
  bg: string;
  ink: string;
  accent: string;
  chevron: string;
  /** Fill + anillo de la pill — colores del Button primary / negotiable */
  pillFill: string;
  pillRing: string;
  pillGlow: string;
  /** Gradiente para el borde del número gigante */
  numFrom: string;
  numTo: string;
  /** Fondo "primary" (fill del Button a todo el banner) */
  primaryBg: string;
  /** Color base del overlay del layout "photo" */
  photoBase: string;
}

const TONES: Record<BannerTone, Tone> = {
  naranja: {
    bg: "linear-gradient(120deg, #FF9639 0%, #EF852E 45%, #BE3D00 100%)",
    ink: "#FFFFFF",
    accent: "#2E0F70",
    chevron: "rgba(255,255,255,0.30)",
    pillFill: "linear-gradient(135deg, #ed8936 0%, #ed8936 30%, #8460e5 100%)",
    pillRing: "linear-gradient(135deg, #ffffff 0%, #fbc47d 25%, #ae8eff 75%, #ffffff 100%)",
    pillGlow: "rgba(237,137,54,0.35)",
    numFrom: "#ed8936",
    numTo: "#8460e5",
    primaryBg: "linear-gradient(135deg, #ed8936 0%, #ed8936 30%, #8460e5 100%)",
    photoBase: "190,61,0",
  },
  teal: {
    bg: "linear-gradient(100deg, #00EDEE 0%, #00D2D3 45%, #009597 100%)",
    ink: "#FFFFFF",
    accent: "#2E0F70",
    chevron: "rgba(255,255,255,0.32)",
    pillFill: "linear-gradient(135deg, #00aeb1 0%, #00aeb1 30%, #8460e5 100%)",
    pillRing: "linear-gradient(135deg, #ffffff 0%, #4ddcdc 25%, #6445df 75%, #ffffff 100%)",
    pillGlow: "rgba(0,174,177,0.35)",
    numFrom: "#00aeb1",
    numTo: "#8460e5",
    primaryBg: "linear-gradient(135deg, #00aeb1 0%, #00aeb1 30%, #8460e5 100%)",
    photoBase: "0,125,127",
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

/** Pill sólida (para fondos que ya llevan el gradiente del Button) */
function DarkPill({ text, icon }: { text: string; icon?: boolean }): JSX.Element {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: "#2E0F70",
        color: "#FFFFFF",
        borderRadius: 9999,
        padding: "8px 18px",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
        boxShadow: "rgba(255,255,255,0.28) 0 1px 0 0 inset, rgba(20,0,70,0.30) 0 2px 8px",
      }}
    >
      {icon && <HandshakeIcon size={17} color="#FFFFFF" />}
      {text}
    </span>
  );
}

/** Número gigante con BORDE gradiente (live/negotiable) — SVG text stroke */
function GradientNumber({ value, fontSize = 104, fill = "#2E0F70", from, to }: { value: number | string; fontSize?: number; fill?: string; from: string; to: string }): JSX.Element {
  const text = String(value);
  const gid = `gnum-${from.slice(1)}-${to.slice(1)}`;
  const width = Math.ceil(text.length * fontSize * 0.68) + 28;
  const height = Math.ceil(fontSize * 1.14);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing="-0.04em"
        fill={fill}
        stroke={`url(#${gid})`}
        strokeWidth="5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        {text}
      </text>
    </svg>
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
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1, color: "#ffffff", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: big ? 58 : 42, fontWeight: 800, lineHeight: 1, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

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
        padding: "8px 16px",
        fontSize: 13.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: "rgba(32,0,104,0.14) 0 2px 10px, rgba(32,0,104,0.08) 0 1px 3px",
      }}
    >
      {chip.label}
      {chip.icon === "car" && <CarIcon size={20} color="#3b1782" />}
    </span>
  );
}

// ─── Layouts ──────────────────────────────────────────────────────────────────

export type BannerLayout = "hero" | "panel" | "primary" | "photo" | "big-number" | "centered" | "centered-stack" | "outline-number";

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

/** Columna de contenido en flujo: pill → título → (timer|sub) → (chip) — nunca se superpone */
function ContentColumn({
  t,
  pillText,
  pillIcon,
  title,
  timer,
  subtitle,
  chip,
  darkPill = false,
  maxWidth = 400,
}: {
  t: Tone;
  pillText: string;
  pillIcon?: boolean;
  title: string;
  timer?: string;
  subtitle?: string;
  chip?: { label: string; icon?: "car" };
  darkPill?: boolean;
  maxWidth?: number;
}): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 9, maxWidth }}>
      {darkPill ? <DarkPill text={pillText} icon={pillIcon} /> : <GradientPill t={t} text={pillText} icon={pillIcon} />}
      <span style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
      {timer ? <TimerChip text={timer} /> : subtitle ? <span style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", opacity: 0.92 }}>{subtitle}</span> : null}
      {chip && <Chip chip={chip} />}
    </div>
  );
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

  // ── "hero" — contenido izquierda · «Ofertas» + número gigante derecha ──
  if (layout === "hero") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <Glass />
        <ChevronV width={160} color={t.chevron} style={{ left: 350, top: "50%", transform: "translateY(-50%)" }} />
        <Gem left={430} bottom={16} size="sm" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", gap: 24 }}>
          <ContentColumn t={t} pillText={pillText} pillIcon={pillIcon} title={title} timer={timer} subtitle={subtitle} chip={chip} maxWidth={390} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: t.ink, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>Ofertas</span>
            <span style={{ fontSize: 100, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", color: t.accent, textShadow: "rgba(255,255,255,0.30) 0 2px 0" }}>{count}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── "panel" — morado DetailCard · contador estilo StatPill derecha ──
  if (layout === "panel") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(PANEL_BG)}>
        <Glass />
        <ChevronV width={170} color="rgba(255,255,255,0.20)" style={{ left: 350, top: "50%", transform: "translateY(-50%)" }} />
        <Gem left={430} bottom={16} size="sm" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", gap: 24 }}>
          <ContentColumn t={t} pillText={pillText} pillIcon={pillIcon} title={title} timer={timer} subtitle={subtitle} chip={chip} maxWidth={390} />
          <GlassCounter label="Ofertas" value={String(count)} big />
        </div>
      </div>
    );
  }

  // ── "primary" — fondo = fill del Button a todo el banner + SubasCoins grandes ──
  if (layout === "primary") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.primaryBg)}>
        <Glass />
        {/* SubasCoins grandes del OfferCard */}
        <BigGem size={116} style={{ right: 236, top: -26 }} />
        <BigGem size={88} style={{ right: 330, bottom: -18 }} />
        <BigGem size={56} style={{ right: 190, bottom: 34 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", gap: 24 }}>
          <ContentColumn t={t} pillText={pillText} pillIcon={pillIcon} title={title} timer={timer} subtitle={subtitle} chip={chip} darkPill maxWidth={360} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1, flexShrink: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.06em", textShadow: "rgba(20,0,70,0.3) 0 1px 3px" }}>Ofertas</span>
            <span style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", color: "#FFFFFF", textShadow: "rgba(20,0,70,0.35) 0 3px 0" }}>{count}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── "photo" — placeholder de imagen detrás + gradiente de opacidad encima ──
  if (layout === "photo") {
    return (
      <div data-slot="layout-banner" className={className} style={shell("#E9EAEC")}>
        {/* Placeholder de imagen (visible por la derecha) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 96,
            gap: 12,
            color: "#9AA1AC",
            background: "repeating-linear-gradient(45deg, #E9EAEC 0px, #E9EAEC 22px, #E2E4E7 22px, #E2E4E7 44px)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#9AA1AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>IMAGEN</span>
        </div>
        {/* Gradiente de opacidad del tono, de izquierda a transparente */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(95deg, rgba(${t.photoBase},1) 0%, rgba(${t.photoBase},0.92) 34%, rgba(${t.photoBase},0.55) 52%, rgba(${t.photoBase},0) 74%)`,
          }}
        />
        <Glass />
        <Gem left={400} bottom={18} size="sm" />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", padding: "0 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 9, maxWidth: 400 }}>
            <GradientPill t={t} text={pillText} icon={pillIcon} />
            <span style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "rgba(20,0,70,0.30) 0 1px 4px" }}>{title}</span>
            <span style={{ display: "inline-flex", alignItems: "baseline", gap: 7, fontSize: 14, fontWeight: 700, color: "#FFFFFF", textShadow: "rgba(20,0,70,0.30) 0 1px 3px" }}>
              <b style={{ fontSize: 22 }}>{count}</b> ofertas disponibles
            </span>
            {chip && <Chip chip={chip} />}
          </div>
        </div>
      </div>
    );
  }

  // ── "big-number" — número con borde gradiente live a la izquierda ──
  if (layout === "big-number") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <Glass />
        <ChevronV width={170} color={t.chevron} style={{ right: -24, top: "50%", transform: "translateY(-50%)" }} />
        <Gem right={190} top={24} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 40px", gap: 22 }}>
          <GradientNumber value={count} fontSize={100} fill="#2E0F70" from={t.numFrom} to={t.numTo} />
          <ContentColumn t={t} pillText={pillText} pillIcon={pillIcon} title={title} timer={timer} subtitle={subtitle} chip={chip} maxWidth={330} />
        </div>
      </div>
    );
  }

  // ── "centered-stack" — solo títulos, todo apilado y centrado ──
  if (layout === "centered-stack") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <Glass />
        <ChevronV width={160} color={t.chevron} style={{ left: -50, top: "50%", transform: "translateY(-50%)" }} />
        <ChevronV width={160} color={t.chevron} style={{ right: -50, top: "50%", transform: "translateY(-50%)" }} />
        <Gem left={64} top={26} size="sm" />
        <Gem right={72} bottom={24} size="sm" />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: "0 90px" }}>
          <GradientPill t={t} text={pillText} icon={pillIcon} />
          <span style={{ fontSize: 28, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8, fontSize: 16, fontWeight: 700, color: t.ink }}>
            <b style={{ fontSize: 23, color: t.accent }}>{count}</b> ofertas disponibles
          </span>
          {chip && <Chip chip={chip} />}
        </div>
      </div>
    );
  }

  // ── "centered" — pill + título | separador | contador gigante ──
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
            {chip && <Chip chip={chip} />}
          </div>
          <span aria-hidden="true" style={{ width: 2, height: 96, background: "rgba(255,255,255,0.45)", borderRadius: 2, flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: t.ink, textTransform: "uppercase", letterSpacing: "0.06em", textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>Ofertas</span>
            <span style={{ fontSize: 88, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", color: t.accent, textShadow: "rgba(255,255,255,0.30) 0 2px 0" }}>{count}</span>
          </div>
        </div>
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
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", padding: "0 44px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 9, maxWidth: 440 }}>
          <GradientPill t={t} text={pillText} icon={pillIcon} />
          <span style={{ fontSize: 26, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "rgba(20,0,70,0.22) 0 1px 3px" }}>{title}</span>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 7, fontSize: 15, fontWeight: 700, color: t.ink }}>
            <b style={{ fontSize: 21, color: t.accent }}>{count}</b> ofertas activas
          </span>
          {chip && <Chip chip={chip} />}
        </div>
      </div>
    </div>
  );
}
