"use client";

import type { JSX } from "react";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Button/Button";
import LikeButton from "@/src/components/LikeButton/LikeButton";
import OfferType from "@/src/components/OfferType/OfferType";
import BadgeStatus from "@/src/components/BadgeStatus/BadgeStatus";
import CategoryCard from "@/src/components/CategoryCard/CategoryCard";
import OfferCard from "@/src/components/OfferCard/OfferCard";
import PriceIcon from "@/src/components/PriceIcon/PriceIcon";
import ProfileButton from "@/src/components/ProfileButton/ProfileButton";
import CardTitle from "@/src/components/CardTitle/CardTitle";
import AuctionStatus from "@/src/components/AuctionStatus/AuctionStatus";
import ImageViewer from "@/src/components/ImageViewer/ImageViewer";
import Filmstrip from "@/src/components/Filmstrip/Filmstrip";
import DetailCard from "@/src/components/DetailCard/DetailCard";

// ── Registry ──────────────────────────────────────────────────────────────

type Status = "done" | "wip" | "planned";

interface ComponentEntry {
  id: string;
  name: string;
  description: string;
  status: Status;
  handoffPath: string;
  variants: number;
  tags: string[];
  preview: JSX.Element;
}

const REGISTRY: ComponentEntry[] = [
  {
    id: "button",
    name: "Button",
    description: "CTAs con gradiente animado. 6 variantes (primary, negotiable, secondary, secondary-sm, ghost, outline) sincronizadas con Figma + 2 de navbar.",
    status: "done",
    handoffPath: "/handoff/button",
    variants: 8,
    tags: ["CTA", "Nav", "Interactive"],
    preview: (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <Button variant="primary">Participa</Button>
        <Button variant="negotiable">Negocia</Button>
        <Button variant="outline">Regístrate</Button>
      </div>
    ),
  },
  {
    id: "likebutton",
    name: "LikeButton",
    description: "Botón circular de like con toggle animado. 3 tamaños, 5 estados, heart-pop animation y skeleton loading.",
    status: "done",
    handoffPath: "/handoff/likebutton",
    variants: 3,
    tags: ["Toggle", "Icon", "Animated"],
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <LikeButton size="sm" />
        <LikeButton size="md" />
        <LikeButton size="lg" />
        <LikeButton size="md" active={true} />
      </div>
    ),
  },
  {
    id: "offertype",
    name: "OfferType",
    description: "Cards de categoría de oferta. Variantes NEGOCIABLE (teal) y EN VIVO (orange) con hover lift y pressed state.",
    status: "done",
    handoffPath: "/handoff/offertype",
    variants: 2,
    tags: ["Card", "Filter", "Interactive"],
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <OfferType variant="negotiable" />
        <OfferType variant="live" />
      </div>
    ),
  },
  {
    id: "badgestatus",
    name: "BadgeStatus",
    description: "Pill de estado de subasta. EN VIVO con dot pulsante y PRÓXIMA con clock parpadeante. Standalone, sin card.",
    status: "done",
    handoffPath: "/handoff/badgestatus",
    variants: 2,
    tags: ["Badge", "Status", "Animated"],
    preview: (
      <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
        <BadgeStatus variant="live" />
        <BadgeStatus variant="proxima" />
      </div>
    ),
  },
  {
    id: "categorycard",
    name: "CategoryCard",
    description: "Card de categoría de subasta con ícono gradiente vault y label. Hover lift + pressed. 4 categorías built-in.",
    status: "done",
    handoffPath: "/handoff/categorycard",
    variants: 4,
    tags: ["Card", "Filter", "Icon"],
    preview: (
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
        <CategoryCard category="vehicular" />
        <CategoryCard category="maquinaria" />
        <CategoryCard category="equipos-diversos" />
        <CategoryCard category="articulos-diversos" />
      </div>
    ),
  },
  {
    id: "offercard",
    name: "OfferCard",
    description: "Card de subasta publicada. 4 variantes (live/negotiable/proxima/expired), pprice, like toggle, skeleton y badge slot.",
    status: "done",
    handoffPath: "/handoff/offercard",
    variants: 4,
    tags: ["Card", "Auction", "Animated"],
    preview: (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", justifyContent: "center" }}>
        <OfferCard variant="live"       name="Ford Bronco Sport" year="2024" price="US$ 9,999" badge={<BadgeStatus variant="live" />} />
        <OfferCard variant="negotiable" name="Land Rover Def."   year="2023" />
      </div>
    ),
  },
  {
    id: "priceicon",
    name: "PriceIcon",
    description: "Gema de subasta (diamante + medallón con $). 2 tamaños (sm/md) y 3 estados (default gradiente, expirada gris, skeleton). Ícono estático.",
    status: "done",
    handoffPath: "/handoff/priceicon",
    variants: 6,
    tags: ["Icon", "Auction", "Price"],
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <PriceIcon size="md" state="default" />
        <PriceIcon size="sm" state="default" />
        <PriceIcon size="md" state="expirada" />
        <PriceIcon size="md" state="skeleton" />
      </div>
    ),
  },
  {
    id: "profilebutton",
    name: "ProfileButton",
    description: "Botón 'Ir al Perfil': label morado + círculo con chevron. Default outline naranja → hover círculo relleno + lift → pressed gris.",
    status: "done",
    handoffPath: "/handoff/profilebutton",
    variants: 3,
    tags: ["Nav", "Button", "Interactive"],
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <ProfileButton />
      </div>
    ),
  },
  {
    id: "cardtitle",
    name: "CardTitle",
    description: "Título de sección con subtítulo y brackets naranjas de esquina (┌ ┘). Estático, ideal para encabezar listados (ej. dealer + nº de ofertas).",
    status: "done",
    handoffPath: "/handoff/cardtitle",
    variants: 1,
    tags: ["Title", "Header", "Label"],
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 8, padding: "8px 4px" }}>
        <CardTitle />
      </div>
    ),
  },
  {
    id: "auctionstatus",
    name: "AuctionStatus",
    description: "Barra de cabecera de subasta: botón volver (‹) + título + subtítulo sobre gradiente. Variantes live (naranja) y negotiable (teal).",
    status: "done",
    handoffPath: "/handoff/auctionstatus",
    variants: 2,
    tags: ["Header", "Auction", "Bar"],
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.62)" }}>
        <AuctionStatus />
      </div>
    ),
  },
  {
    id: "imageviewer",
    name: "ImageViewer",
    description: "Visor de imagen 443×362 con controles glass: ampliar, flechas ‹ ›, y contador (1/11). Backdrop-blur sobre negro 50%.",
    status: "done",
    handoffPath: "/handoff/imageviewer",
    variants: 1,
    tags: ["Media", "Gallery", "Auction"],
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.5)", transformOrigin: "center" }}>
        <ImageViewer imageSrc="/demo/bronco.jpg" current={1} total={11} />
      </div>
    ),
  },
  {
    id: "filmstrip",
    name: "Filmstrip",
    description: "Tira de miniaturas con la seleccionada en borde gradiente de 3px. Variantes live (naranja/lila) y negotiable (teal/lila).",
    status: "done",
    handoffPath: "/handoff/filmstrip",
    variants: 2,
    tags: ["Media", "Gallery", "Thumbnails"],
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.7)", transformOrigin: "center" }}>
        <Filmstrip images={["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"]} selectedIndex={0} />
      </div>
    ),
  },
  {
    id: "detailcard",
    name: "DetailCard",
    description: "Tarjeta de detalle de oferta: header oscuro (fecha/hora + LikeButton + 3 stats) y cuerpo con botón Participa + Precio Base con gema. Compone LikeButton + PriceIcon.",
    status: "done",
    handoffPath: "/handoff/detailcard",
    variants: 2,
    tags: ["Card", "Auction", "Detail"],
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.62)", transformOrigin: "center" }}>
        <DetailCard variant="live" />
      </div>
    ),
  },
];

// ── Status config ─────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { label: string; dot: string; bg: string; color: string; border: string }> = {
  done:    { label: "Listo",       dot: "#16a34a", bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  wip:     { label: "En progreso", dot: "#d97706", bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  planned: { label: "Próximo",     dot: "#94a3b8", bg: "#f8fafc", color: "#64748b", border: "#e2e8f0" },
};

// ── Styles ────────────────────────────────────────────────────────────────

const PAGE_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }

  .cp-page {
    min-height: 100vh;
    background: #ffffff;
    font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
    color: #0f172a;
  }

  /* ── Top bar ── */
  .cp-topbar {
    border-bottom: 1px solid #f1f5f9;
    padding: 0 40px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
  }
  .cp-topbar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .cp-topbar-logo-mark {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: linear-gradient(135deg, oklch(0.72 0.16 55), oklch(0.55 0.22 285));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cp-topbar-name {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  .cp-topbar-sep {
    width: 1px;
    height: 16px;
    background: #e2e8f0;
    margin: 0 10px;
  }
  .cp-topbar-ds {
    font-size: 12px;
    color: #94a3b8;
    font-weight: 500;
  }
  .cp-topbar-badge {
    font-size: 10px;
    font-weight: 700;
    font-family: var(--font-mono-nums, monospace);
    padding: 3px 10px;
    border-radius: 20px;
    background: #f1f5f9;
    color: #64748b;
    letter-spacing: 0.04em;
  }

  /* ── Hero ── */
  .cp-hero-wrap {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .cp-hero {
    max-width: 1120px;
    margin: 0 auto;
    padding: 80px 40px 72px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 48px;
    align-items: end;
  }
  .cp-eyebrow {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: oklch(0.72 0.18 285);
    margin: 0 0 16px;
    font-family: var(--font-mono-nums, monospace);
  }
  .cp-hero-title {
    font-size: clamp(36px, 5.5vw, 56px);
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 6px;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .cp-hero-title-accent {
    background: linear-gradient(90deg, oklch(0.72 0.16 55) 0%, oklch(0.55 0.22 285) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cp-hero-subtitle {
    font-size: 17px;
    color: rgba(255,255,255,0.55);
    margin: 16px 0 0;
    line-height: 1.65;
    max-width: 500px;
    font-weight: 400;
  }
  .cp-hero-subtitle strong {
    color: rgba(255,255,255,0.9);
    font-weight: 600;
  }

  /* Stats */
  .cp-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-end;
    flex-shrink: 0;
  }
  .cp-stat {
    text-align: right;
  }
  .cp-stat-num {
    font-family: var(--font-mono-nums, monospace);
    font-size: 40px;
    font-weight: 700;
    color: #f8fafc;
    display: block;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .cp-stat-num-accent {
    background: linear-gradient(135deg, oklch(0.72 0.16 55), oklch(0.55 0.22 285));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cp-stat-label {
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
    display: block;
  }
  .cp-stats-divider {
    width: 1px;
    height: 32px;
    background: #e2e8f0;
    align-self: center;
    display: none;
  }

  /* ── Grid ── */
  .cp-section {
    max-width: 1120px;
    margin: 0 auto;
    padding: 48px 40px 80px;
  }
  .cp-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .cp-section-title {
    font-size: 13px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0;
    font-family: var(--font-mono-nums, monospace);
  }
  .cp-section-count {
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-mono-nums, monospace);
    color: #cbd5e1;
  }
  .cp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }

  /* ── Card ── */
  .cp-card {
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .cp-card:hover {
    box-shadow: 0 8px 30px -6px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.06);
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }
  .cp-card-preview {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    padding: 36px 24px;
    min-height: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .cp-card-preview::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, oklch(0.55 0.22 285 / 0.12), transparent 65%);
    pointer-events: none;
  }
  .cp-card-preview-components {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .cp-card-preview-cta {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px 0 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: 4px;
  }
  .cp-card-preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0.25;
  }
  .cp-card-preview-placeholder-box {
    width: 48px;
    height: 36px;
    border-radius: 8px;
    border: 1.5px dashed rgba(255,255,255,0.4);
  }
  .cp-card-preview-placeholder-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.6);
    font-family: var(--font-mono-nums, monospace);
    font-weight: 600;
  }
  .cp-card-body {
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    background: #ffffff;
  }
  .cp-card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .cp-card-name {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .cp-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    font-family: var(--font-mono-nums, monospace);
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 20px;
    border: 1px solid;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cp-status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .cp-card-desc {
    font-size: 13px;
    color: #64748b;
    margin: 0;
    line-height: 1.6;
  }
  .cp-card-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 2px;
  }
  .cp-tag {
    font-size: 10px;
    font-weight: 600;
    font-family: var(--font-mono-nums, monospace);
    padding: 2px 8px;
    border-radius: 4px;
    background: #f8fafc;
    color: #94a3b8;
    border: 1px solid #e2e8f0;
    letter-spacing: 0.04em;
  }
  .cp-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    margin-top: 4px;
    border-top: 1px solid #f1f5f9;
  }
  .cp-variants {
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-mono-nums, monospace);
    color: #cbd5e1;
    letter-spacing: 0.02em;
  }
  .cp-card-dark-footer {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  /* CTA — usa Button del DS, sin override */

  /* ── Footer ── */
  .cp-footer {
    border-top: 1px solid #f1f5f9;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .cp-footer-text {
    font-size: 11px;
    color: #cbd5e1;
    font-family: var(--font-mono-nums, monospace);
    margin: 0;
  }
  .cp-footer-link {
    font-size: 11px;
    color: #cbd5e1;
    font-family: var(--font-mono-nums, monospace);
    text-decoration: none;
    transition: color 0.15s;
  }
  .cp-footer-link:hover { color: #64748b; }

  @media (max-width: 768px) {
    .cp-topbar { padding: 0 20px; }
    .cp-hero { grid-template-columns: 1fr; padding: 48px 20px 40px; gap: 32px; }
    .cp-stats { flex-direction: row; align-items: flex-start; }
    .cp-stat { text-align: left; }
    .cp-section { padding: 32px 20px 60px; }
    .cp-grid { grid-template-columns: 1fr; }
    .cp-footer { padding: 20px; flex-direction: column; align-items: flex-start; gap: 4px; }
  }
`;

// ── Page ──────────────────────────────────────────────────────────────────

export default function ConcordePage(): JSX.Element {
  const router = useRouter();
  const done = REGISTRY.filter((c) => c.status === "done").length;
  const total = REGISTRY.length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="cp-page">

        {/* Top bar */}
        <header className="cp-topbar">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="cp-topbar-logo">
              <div className="cp-topbar-logo-mark">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1L12.196 4V10L7 13L1.804 10V4L7 1Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="cp-topbar-name">Concorde</span>
            </div>
            <div className="cp-topbar-sep" />
            <span className="cp-topbar-ds">Voyager DS</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a
              href="/sync"
              style={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "var(--font-mono-nums, monospace)",
                color: "#64748b",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Figma Sync →
            </a>
            <span className="cp-topbar-badge">BETA</span>
          </div>
        </header>

        {/* Hero */}
        <div className="cp-hero-wrap">
        <section className="cp-hero">
          <div>
            <p className="cp-eyebrow">Tu copilot de desarrollo</p>
            <h1 className="cp-hero-title">
              Bienvenido a{" "}
              <span className="cp-hero-title-accent">Concorde</span>
            </h1>
            <p className="cp-hero-subtitle">
              Cada componente de <strong>Voyager DS</strong> viene con preview live,
              spec de tokens, estados interactivos y código listo para copiar a tu proyecto.{" "}
              Sin fricciones entre diseño y código.
            </p>
            <a
              href="https://voyager-ds.vercel.app/preview/components/pase1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 20,
                fontSize: 11,
                fontFamily: "var(--font-mono-nums, monospace)",
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
              onMouseEnter={function(e){ (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
              onMouseLeave={function(e){ (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 6h4M7 4.5L8.5 6 7 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              voyager-ds.vercel.app · fuente de componentes
            </a>
          </div>
          <div className="cp-stats">
            <div className="cp-stat">
              <span className="cp-stat-num cp-stat-num-accent">{done}</span>
              <span className="cp-stat-label">Componentes listos</span>
            </div>
            <div className="cp-stat">
              <span className="cp-stat-num" style={{ color: "#cbd5e1" }}>{total}</span>
              <span className="cp-stat-label">En el sistema</span>
            </div>
          </div>
        </section>
        </div>

        {/* Grid */}
        <main className="cp-section" id="componentes">
          <div className="cp-section-header">
            <h2 className="cp-section-title">Componentes</h2>
            <span className="cp-section-count">{done}/{total}</span>
          </div>

          <div className="cp-grid">
            {REGISTRY.map(function renderCard(c) {
              const st = STATUS_CONFIG[c.status];
              const isDone = c.status === "done";

              return (
                <article key={c.id} className="cp-card">
                  {/* Preview zone — solo componentes */}
                  <div className="cp-card-preview">
                    {isDone ? (
                      <div className="cp-card-preview-components">
                        {c.preview}
                      </div>
                    ) : (
                      <div className="cp-card-preview-placeholder">
                        <div className="cp-card-preview-placeholder-box" />
                        <span className="cp-card-preview-placeholder-label">PRÓXIMAMENTE</span>
                      </div>
                    )}
                  </div>

                  {/* Body — metadata + CTA */}
                  <div className="cp-card-body">
                    <div className="cp-card-row">
                      <h3 className="cp-card-name">{c.name}</h3>
                      <span
                        className="cp-status"
                        style={{ background: st.bg, color: st.color, borderColor: st.border }}
                      >
                        <span className="cp-status-dot" style={{ background: st.dot }} />
                        {st.label}
                      </span>
                    </div>

                    <p className="cp-card-desc">{c.description}</p>

                    <div className="cp-card-tags">
                      {c.tags.map(function renderTag(tag) {
                        return <span key={tag} className="cp-tag">{tag}</span>;
                      })}
                    </div>

                    <div className="cp-card-footer">
                      <span className="cp-variants">{c.variants} variantes</span>
                    </div>
                  </div>

                  {/* Dark footer — ghost CTA sobre oscuro */}
                  {isDone && (
                    <div className="cp-card-dark-footer">
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono-nums, monospace)", fontWeight: 600 }}>
                        Spec & Handoff
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() => router.push(c.handoffPath)}
                      >
                        Ver handoff →
                      </Button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="cp-footer">
          <p className="cp-footer-text">
            Concorde · Voyager Design System · {new Date().getFullYear()}
          </p>
          <a
            href="https://voyager-ds.vercel.app/preview/components/pase1"
            target="_blank"
            rel="noopener noreferrer"
            className="cp-footer-link"
          >
            Preview fuente →
          </a>
        </footer>

      </div>
    </>
  );
}
