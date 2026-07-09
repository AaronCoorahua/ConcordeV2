/**
 * LayoutBanner — 766×272 · variantes de banner SIN personaje (estáticas).
 * Mantienen el color de su categoría; lo que cambia entre variantes es la
 * COMPOSICIÓN: posición del texto, del contador, iconos y tratamientos
 * tipográficos (número gigante, número en contorno, columnas, cinta, etc.).
 *
 * Decoración reutilizada de decor.tsx (monedas, sparkles, chevrón, apretón).
 */

import type { CSSProperties, JSX } from "react";
import { Coin, Sparkle, Diamond, ChevronV, HandshakeIcon, CarIcon } from "./decor";
import { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

export { BANNER_WIDTH, BANNER_HEIGHT } from "./dimensions";

// ─── Paletas por categoría (mismo color, sin variar) ──────────────────────────

export type BannerTone = "naranja" | "teal";

interface Tone {
  bg: string;
  ink: string;        // texto principal sobre el fondo
  inkSoft: string;
  accent: string;     // número / detalle
  pillBg: string;
  pillColor: string;
  chevron: string;
  coinOutline: "filled" | "outline";
  sparkle: string;
  chipBg: string;
}

const TONES: Record<BannerTone, Tone> = {
  naranja: {
    bg: "#F5A83B",
    ink: "#FFFFFF",
    inkSoft: "rgba(46,15,112,0.72)",
    accent: "#3B1782",
    pillBg: "#2E0F70",
    pillColor: "#FFFFFF",
    chevron: "rgba(101,50,184,0.55)",
    coinOutline: "filled",
    sparkle: "#E8503A",
    chipBg: "#4C1EBC",
  },
  teal: {
    bg: "#00D2D3",
    ink: "#FFFFFF",
    inkSoft: "rgba(46,15,112,0.72)",
    accent: "#3B1782",
    pillBg: "#2E0F70",
    pillColor: "#FFFFFF",
    chevron: "rgba(46,15,112,0.42)",
    coinOutline: "filled",
    sparkle: "#E8503A",
    chipBg: "#4C1EBC",
  },
};

// ─── Layouts ──────────────────────────────────────────────────────────────────

export type BannerLayout = "centered" | "big-number" | "split-left" | "ticket" | "outline-number";

export interface LayoutBannerProps {
  tone: BannerTone;
  layout: BannerLayout;
  pillText: string;
  pillIcon?: boolean;
  count: number | string;
  title: string;
  subtitle?: string;
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

function Pill({ t, text, icon }: { t: Tone; text: string; icon?: boolean }): JSX.Element {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: t.pillBg,
        color: t.pillColor,
        borderRadius: 9999,
        padding: "8px 18px",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {icon && <HandshakeIcon size={17} color={t.pillColor} />}
      {text}
    </span>
  );
}

function Chip({ t, chip }: { t: Tone; chip: { label: string; icon?: "car" } }): JSX.Element {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: t.chipBg,
        color: "#FFFFFF",
        borderRadius: 12,
        padding: "11px 22px",
        fontSize: 15,
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow: "rgba(46,15,112,0.2) 0 2px 8px",
      }}
    >
      {chip.label}
      {chip.icon === "car" && <CarIcon size={24} color="#FFFFFF" />}
    </span>
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
  chip,
  className = "",
}: LayoutBannerProps): JSX.Element {
  const t = TONES[tone];

  // ── Layout: número gigante a la izquierda, texto a la derecha ──
  if (layout === "big-number") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <ChevronV width={220} color={t.chevron} style={{ right: -30, top: -46 }} />
        <Coin size={40} variant={t.coinOutline} style={{ right: 210, bottom: 28 }} />
        <Sparkle size={15} color={t.sparkle} style={{ right: 300, top: 40 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 44px", gap: 32 }}>
          <span style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", color: t.accent, textShadow: "rgba(255,255,255,0.35) 0 2px 0" }}>
            {count}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Pill t={t} text={pillText} icon={pillIcon} />
            <span style={{ fontSize: 30, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 340 }}>{title}</span>
            {subtitle && <span style={{ fontSize: 14, fontWeight: 600, color: t.ink, opacity: 0.9 }}>{subtitle}</span>}
          </div>
        </div>
        {chip && <div style={{ position: "absolute", right: 26, bottom: 24 }}><Chip t={t} chip={chip} /></div>}
      </div>
    );
  }

  // ── Layout: centrado, pill arriba, título grande, «N ofertas» debajo ──
  if (layout === "centered") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <ChevronV width={200} color={t.chevron} style={{ left: -60, top: -40 }} />
        <ChevronV width={200} color={t.chevron} style={{ right: -60, bottom: -40 }} />
        <Coin size={44} variant={t.coinOutline} style={{ left: 70, top: 40 }} />
        <Coin size={34} variant={t.coinOutline} style={{ right: 84, bottom: 40 }} />
        <Sparkle size={16} color={t.sparkle} style={{ left: 150, bottom: 54 }} />
        <Sparkle size={14} color={t.sparkle} style={{ right: 170, top: 44 }} />
        <Diamond size={9} color={t.accent} style={{ left: 120, top: 120 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: "0 60px" }}>
          <Pill t={t} text={pillText} icon={pillIcon} />
          <span style={{ fontSize: 34, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.12, textShadow: "rgba(46,15,112,0.18) 0 1px 0" }}>{title}</span>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8, fontSize: 17, fontWeight: 700, color: t.ink }}>
            <b style={{ fontSize: 24, color: t.accent }}>{count}</b> ofertas disponibles
          </span>
        </div>
        {chip && <div style={{ position: "absolute", right: 26, bottom: 22 }}><Chip t={t} chip={chip} /></div>}
      </div>
    );
  }

  // ── Layout: banda izquierda con la pill+título, columna derecha con el número en tarjeta ──
  if (layout === "split-left") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        <ChevronV width={180} color={t.chevron} style={{ left: 300, top: -34 }} />
        <Coin size={30} variant={t.coinOutline} style={{ left: 300, bottom: 30 }} />
        <Sparkle size={14} color={t.sparkle} style={{ left: 360, top: 60 }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 470, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "0 44px" }}>
          <Pill t={t} text={pillText} icon={pillIcon} />
          <span style={{ fontSize: 32, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.12 }}>{title}</span>
          {subtitle && <span style={{ fontSize: 14, fontWeight: 600, color: t.ink, opacity: 0.92, maxWidth: 360 }}>{subtitle}</span>}
        </div>
        <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", width: 190, background: "rgba(255,255,255,0.16)", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 16, padding: "18px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, letterSpacing: "0.04em", textTransform: "uppercase" }}>Ofertas</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1, color: t.ink, letterSpacing: "-0.02em" }}>{count}</div>
        </div>
        {chip && <div style={{ position: "absolute", right: 26, bottom: 20 }}><Chip t={t} chip={chip} /></div>}
      </div>
    );
  }

  // ── Layout: «ticket» — cinta diagonal con la pill, número en contorno grande ──
  if (layout === "ticket") {
    return (
      <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
        {/* Cinta diagonal */}
        <div style={{ position: "absolute", left: -60, top: 30, transform: "rotate(-8deg)", background: t.pillBg, color: t.pillColor, padding: "8px 80px", fontSize: 15, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: "rgba(46,15,112,0.25) 0 4px 12px" }}>
          {pillText}
        </div>
        <Coin size={40} variant={t.coinOutline} style={{ left: 120, bottom: 34 }} />
        <Sparkle size={16} color={t.sparkle} style={{ left: 60, bottom: 60 }} />
        <ChevronV width={200} color={t.chevron} style={{ right: -40, top: -30 }} />
        <div style={{ position: "absolute", right: 44, top: "50%", transform: "translateY(-50%)", textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.ink, marginBottom: 2 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, justifyContent: "flex-end" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: t.ink }}>Ofertas</span>
            <span style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.9, color: "transparent", letterSpacing: "-0.02em", WebkitTextStroke: `3px ${t.accent}` }}>{count}</span>
          </div>
        </div>
        {chip && <div style={{ position: "absolute", left: 26, bottom: 20 }}><Chip t={t} chip={chip} /></div>}
      </div>
    );
  }

  // ── Layout: número en contorno gigante de fondo + texto encima ──
  return (
    <div data-slot="layout-banner" className={className} style={shell(t.bg)}>
      <span style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-52%)", fontSize: 230, fontWeight: 800, lineHeight: 0.8, color: "transparent", WebkitTextStroke: `2px ${tone === "naranja" ? "rgba(255,255,255,0.45)" : "rgba(46,15,112,0.28)"}`, letterSpacing: "-0.04em", pointerEvents: "none" }}>
        {count}
      </span>
      <Coin size={36} variant={t.coinOutline} style={{ right: 220, top: 40 }} />
      <Sparkle size={15} color={t.sparkle} style={{ left: 40, bottom: 50 }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "0 48px", maxWidth: 470 }}>
        <Pill t={t} text={pillText} icon={pillIcon} />
        <span style={{ fontSize: 36, fontWeight: 800, color: t.ink, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</span>
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8, fontSize: 16, fontWeight: 700, color: t.ink }}>
          <b style={{ fontSize: 22, color: t.accent }}>{count}</b> ofertas activas
        </span>
      </div>
      {chip && <div style={{ position: "absolute", right: 26, bottom: 22 }}><Chip t={t} chip={chip} /></div>}
    </div>
  );
}
