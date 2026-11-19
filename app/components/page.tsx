"use client";

import { useEffect, useRef } from "react";
import type { JSX, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import Header from "@/app/_components/Header";
import Button from "@/src/components/Button";
import LikeButton from "@/src/components/LikeButton";
import OfferType from "@/src/components/OfferType";
import BadgeStatus from "@/src/components/BadgeStatus";
import CategoryCard from "@/src/components/CategoryCard";
import OfferCard from "@/src/components/OfferCard";
import PriceIcon from "@/src/components/PriceIcon";
import StarIcon from "@/src/components/StarIcon";
import AvatarZone from "@/src/components/AvatarZone";
import ProfileButton from "@/src/components/ProfileButton";
import UserProfileCard from "@/src/components/UserProfileCard";
import WalletBalanceCard from "@/src/components/WalletBalanceCard";
import ActivityCard from "@/src/components/ActivityCard";
import OfferShelf from "@/src/components/OfferShelf";
import InfoIcon from "@/src/components/InfoIcon";
import CardTitle from "@/src/components/CardTitle";
import Input from "@/src/components/Input";
import TabSelector from "@/src/components/TabSelector";
import TermsSelector from "@/src/components/TermsSelector";
import ConditionPill from "@/src/components/ConditionPill";
import CheckIcon from "@/src/components/CheckIcon";
import Table from "@/src/components/Table";
import DocButton from "@/src/components/DocButton";
import Accordion from "@/src/components/Accordion";
import AmountOptionGroup from "@/src/components/AmountOptionGroup";
import PriceBadge from "@/src/components/PriceBadge";
import Signal from "@/src/components/Signal";
import BidProposal from "@/src/components/BidProposal";
import BidMessage from "@/src/components/BidMessage";
import ProgressBar from "@/src/components/ProgressBar";
import BidPosition from "@/src/components/BidPosition";
import SendBidIcon from "@/src/components/SendBidIcon";
import StatPill from "@/src/components/StatPill";
import TimerIcon from "@/src/components/TimerIcon";
import SalaStatus from "@/src/components/SalaStatus";
import AuctionStatus from "@/src/components/AuctionStatus";
import CardViewer from "@/src/components/CardViewer";
import DetailCard from "@/src/components/DetailCard";
import TodayIcon from "@/src/components/TodayIcon";
import ServiceCenterIcon from "@/src/components/ServiceCenterIcon";
import BusinessIcon from "@/src/components/BusinessIcon";
import CategoryIcon from "@/src/components/CategoryIcon";
import OfferIcon from "@/src/components/OfferIcon";
import VmcAhora from "@/src/components/VmcAhora/VmcAhora";
import { CardIcons, FeaturedCard } from "@/src/components/FeaturedCard";
import { LotGallery } from "@/src/components/LotGallery";
import { LightBar } from "@/src/components/LightBar";
import GlassButton from "@/src/components/GlassButton";
import { Vidrio } from "@/src/components/Vidrio";
import HeroCarousel from "@/src/components/HeroCarousel";
import LogoMarquee from "@/src/components/LogoMarquee";
import { COMPANIES, STORES } from "@/src/blocks/index/shared/data";
import { INDEX_SLIDES } from "@/src/blocks/index/desktop/IndexHero";
import { PublicationBadge } from "@/src/components/PublicationBadge";
import { QrCode } from "@/src/components/QrCode";
import { QrCard } from "@/src/components/QrCard";
import { RiskMeter } from "@/src/components/RiskMeter";
import CountdownDemo from "@/app/handoff/countdown/CountdownDemo";
import { StatusTag } from "@/src/components/StatusTag";
import { Pagination } from "@/src/components/Pagination";
import { Stepper } from "@/src/components/Stepper";
import StageTabsDemo from "@/app/handoff/stagetabs/StageTabsDemo";
import VehicleRowDemo from "@/app/handoff/vehiclerow/VehicleRowDemo";
import { AccountCard } from "@/src/components/AccountCard";
import { WalletCard } from "@/src/components/WalletCard";
import { RecommendedList, type RecommendedItem } from "@/src/components/RecommendedList";
import { AdBanner } from "@/src/components/AdBanner";
import { NotificationBox } from "@/src/components/NotificationBox";
import { SectionHead } from "@/src/components/SectionHead";
import { ValueHero } from "@/src/components/ValueHero";
import { DecisionBar } from "@/src/components/DecisionBar";
import { PublishFeeBanner } from "@/src/components/PublishFeeBanner";
import { RoundProgress } from "@/src/components/RoundProgress";
import { ProposalThread } from "@/src/components/ProposalThread";
import { ChatHeader } from "@/src/components/ChatHeader";
import { ChatDay } from "@/src/components/ChatDay";
import { ChatBubble } from "@/src/components/ChatBubble";
import { ChatNotice } from "@/src/components/ChatNotice";
import type { Sec } from "@/src/components/Vidrio";
import ActionTileDemo from "@/app/handoff/actiontile/ActionTileDemo";
import ActivitySectionDemo from "@/app/handoff/activitysection/ActivitySectionDemo";
import PendingToggleDemo from "@/app/handoff/pendingtoggle/PendingToggleDemo";
import FolderTabsDemo from "@/app/handoff/foldertabs/FolderTabsDemo";
import MoreButtonDemo from "@/app/handoff/morebutton/MoreButtonDemo";
import ActionListDemo from "@/app/handoff/actionlist/ActionListDemo";
import RepublishBarDemo from "@/app/handoff/republishbar/RepublishBarDemo";
import NotificationBellDemo from "@/app/handoff/notificationbell/NotificationBellDemo";
import NotificationInboxDemo from "@/app/handoff/notificationinbox/NotificationInboxDemo";
import SelectDemo from "@/app/handoff/select/SelectDemo";
import ComboboxDemo from "@/app/handoff/combobox/ComboboxDemo";
import ProjectionChartDemo from "@/app/handoff/projectionchart/ProjectionChartDemo";
import SeasonChartDemo from "@/app/handoff/seasonchart/SeasonChartDemo";
import ValuationCardDemo from "@/app/handoff/valuationcard/ValuationCardDemo";
import AddButtonDemo from "@/app/handoff/addbutton/AddButtonDemo";
import PublishSwipeDemo from "@/app/handoff/publishswipe/PublishSwipeDemo";
import ResponseTimerDemo from "@/app/handoff/responsetimer/ResponseTimerDemo";
import AmountComposerDemo from "@/app/handoff/amountcomposer/AmountComposerDemo";
import ChatComposerDemo from "@/app/handoff/chatcomposer/ChatComposerDemo";
import { indexFont } from "@/app/blocks/index/font";

// Componentes del Index (vmc-index-lab). La destacada de Autoplan sirve de ejemplo a FeaturedCard y LotGallery.
const IDX_F = STORES[0].featured;
const IDX_FEATURED = (
  <FeaturedCard image={IDX_F.image} title={IDX_F.title} subtitle={IDX_F.subtitle} featured photos={IDX_F.photos} price={IDX_F.price}
    chips={[{ icon: CardIcons.gear, label: IDX_F.transmission }, { icon: CardIcons.fuel, label: IDX_F.fuel }]}
    stats={[{ icon: CardIcons.gauge, label: IDX_F.km }, { icon: CardIcons.seats, label: `${IDX_F.seats} asientos` }]} height="100%" fillMedia tilt={0} />
);
// Vista reducida de un componente grande: se dibuja a su tamaño y se escala.
function Scaled({ w, h, scale, children }: { w: number; h: number; scale: number; children: JSX.Element }): JSX.Element {
  return (
    <div style={{ width: w * scale, height: h * scale, overflow: "hidden", position: "relative" }}>
      <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: "top left", display: "flex" }}>{children}</div>
    </div>
  );
}

// Piezas de Mi Garaje: la base que heredan en la pantalla (Plus Jakarta Sans con todos sus pesos, alto de línea normal),
// igual que en sus páginas de /handoff.
const GARAJE_BASE = { fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" } as const;
function Garaje({ width, className, children }: { width?: number; className?: string; children: ReactNode }): JSX.Element {
  return <div className={`${indexFont.variable}${className ? ` ${className}` : ""}`} style={{ ...GARAJE_BASE, width }}>{children}</div>;
}
// Piezas que llevan enlaces (<a>): no pueden ir dentro del enlace de la card, así que se montan en su propia raíz de React,
// solo en el navegador y sin interacción (el clic llega a la card).
function Detached({ children }: { children: JSX.Element }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = document.createElement("div");
    ref.current?.appendChild(host);
    const root = createRoot(host);
    root.render(children);
    return () => { setTimeout(() => { root.unmount(); host.remove(); }, 0); };
  }, [children]);
  return <div ref={ref} inert style={{ pointerEvents: "none" }} />;
}
// Los diálogos no se abren en el catálogo: su ícono y su título.
function DialogStandIn({ icon, title }: { icon: Sec; title: string }): JSX.Element {
  return <div style={{ display: "grid", justifyItems: "center", gap: 6, color: "#3B1782", fontWeight: 700, fontSize: 13 }}><Vidrio s={icon} size={40} />{title}</div>;
}
// Datos de los ejemplos de /handoff.
const garagePhoto = (slug: string) => `/mi-garaje/garage-photos/${slug}/1.jpg`;
const RECS: RecommendedItem[] = [
  { name: "Nissan Versa", year: 2020, price: "US$ 9,300", imageSrc: garagePhoto("versa"), badge: "negotiable" },
  { name: "Nissan Sentra", year: 2021, price: "US$ 11,500", imageSrc: garagePhoto("sentra"), badge: "live" },
  { name: "Suzuki Swift", year: 2019, price: "US$ 7,800", imageSrc: garagePhoto("swift"), badge: "live" },
];
const AD_RAIL = "/mi-garaje/banners/publica-vmc.html?v=10-valor-publica&f=side400&e=personaje";
const AD_STRIP = "/mi-garaje/banners/publica-vmc.html?v=10-valor-publica&f=strip776&e=personaje";
const MAZDA = [
  { me: true, amount: "US$ 12,000", when: "Hoy 9:10" },
  { me: false, amount: "US$ 13,700", when: "Hoy 9:40" },
  { me: true, amount: "US$ 12,600", when: "Hoy 10:05" },
];
const CHAT = { display: "flex", flexDirection: "column", boxSizing: "border-box", padding: 10, background: "#f7f6fb", borderRadius: 8 } as const;
const LOCK = <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden><rect x="4" y="9" width="12" height="8" rx="2" fill="currentColor" /><path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="2" /></svg>;

// ── Registry ──────────────────────────────────────────────────────────────

interface ComponentEntry {
  id: string;
  name: string;
  handoffPath: string;
  preview: JSX.Element;
}

const REGISTRY: ComponentEntry[] = [
  {
    id: "button",
    name: "Button",
    handoffPath: "/handoff/button",
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
    handoffPath: "/handoff/likebutton",
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
    handoffPath: "/handoff/offertype",
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
    handoffPath: "/handoff/badgestatus",
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
    handoffPath: "/handoff/categorycard",
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
    handoffPath: "/handoff/offercard",
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
    handoffPath: "/handoff/priceicon",
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
    id: "staricon",
    name: "StarIcon",
    handoffPath: "/handoff/staricon",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <StarIcon size="md" />
        <StarIcon size="sm" />
        <StarIcon size={44} />
      </div>
    ),
  },
  {
    id: "avatarzone",
    name: "AvatarZone",
    handoffPath: "/handoff/avatarzone",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <AvatarZone size="md" />
        <AvatarZone size="sm" />
        <AvatarZone size={48} />
      </div>
    ),
  },
  {
    id: "amountoptiongroup",
    name: "AmountOptionGroup",
    handoffPath: "/handoff/amountoptiongroup",
    preview: (
      <div style={{ transform: "scale(0.7)" }}>
        <AmountOptionGroup amounts={["80", "130"]} allowCustom defaultValue={0} />
      </div>
    ),
  },
  {
    id: "salastatus",
    name: "SalaStatus",
    handoffPath: "/handoff/salastatus",
    preview: (
      <div style={{ transform: "scale(0.7)" }}>
        <SalaStatus />
      </div>
    ),
  },
  {
    id: "statpill",
    name: "StatPill",
    handoffPath: "/handoff/statpill",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", background: "linear-gradient(116deg, #5F3ED8 0%, #340091 50%, #140046 100%)", borderRadius: 12, padding: "16px 20px" }}>
        <StatPill variant="bids" label="MIS BIDS" value="18" />
        <StatPill variant="total" label="BIDS TOTALES" value="157" />
      </div>
    ),
  },
  {
    id: "sendbidicon",
    name: "SendBidIcon",
    handoffPath: "/handoff/sendbidicon",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <SendBidIcon variant="vault" />
        <SendBidIcon variant="white" />
        <SendBidIcon variant="vault" size={44} />
      </div>
    ),
  },
  {
    id: "timericon",
    name: "TimerIcon",
    handoffPath: "/handoff/timericon",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center", color: "#3B1782" }}>
        <TimerIcon size={22} />
        <TimerIcon size={30} />
        <TimerIcon size={40} color="#EF852E" />
      </div>
    ),
  },
  {
    id: "bidposition",
    name: "BidPosition",
    handoffPath: "/handoff/bidposition",
    preview: (
      <div style={{ transform: "scale(0.72)" }}>
        <BidPosition />
      </div>
    ),
  },
  {
    id: "progressbar",
    name: "ProgressBar",
    handoffPath: "/handoff/progressbar",
    preview: (
      <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 10 }}>
        <ProgressBar value={75} />
        <ProgressBar value={40} />
        <ProgressBar value={15} />
      </div>
    ),
  },
  {
    id: "bidmessage",
    name: "BidMessage",
    handoffPath: "/handoff/bidmessage",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", transform: "scale(0.82)" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}><BidMessage side="received" type="vault" logo={<img src="/logo-preview.png" alt="VMC" style={{ height: 14, width: "auto", display: "block" }} />}>ABRIÓ LA SUBASTA</BidMessage></div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}><BidMessage side="received" type="white">PROPUSO US$ 18,000</BidMessage></div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}><BidMessage side="sent" type="live">PROPUSO US$ 25,000</BidMessage></div>
      </div>
    ),
  },
  {
    id: "bidproposal",
    name: "BidProposal",
    handoffPath: "/handoff/bidproposal",
    preview: (
      <div style={{ background: "linear-gradient(116deg, #5F3ED8 0%, #340091 50%, #140046 100%)", padding: 16, borderRadius: 12, transform: "scale(0.9)" }}>
        <BidProposal />
      </div>
    ),
  },
  {
    id: "pricebadge",
    name: "PriceBadge",
    handoffPath: "/handoff/pricebadge",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <PriceBadge size={20} />
        <PriceBadge size={28} />
        <PriceBadge size={40} />
      </div>
    ),
  },
  {
    id: "signal",
    name: "Signal",
    handoffPath: "/handoff/signal",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center", background: "#2F2173", borderRadius: 8, padding: "16px 20px" }}>
        <Signal level={4} width={28} />
        <Signal level={5} width={36} />
        <Signal level={2} width={36} />
      </div>
    ),
  },
  {
    id: "accordion",
    name: "Accordion",
    handoffPath: "/handoff/accordion",
    preview: (
      <div style={{ width: 320, transform: "scale(0.86)" }}>
        <Accordion title="INFORMACIÓN GENERAL" defaultOpen>
          <span style={{ fontSize: 12, color: "var(--ui-muted)", fontFamily: "monospace" }}>{"{children}"} editable</span>
        </Accordion>
      </div>
    ),
  },
  {
    id: "checkicon",
    name: "CheckIcon",
    handoffPath: "/handoff/checkicon",
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <CheckIcon size={20} />
        <CheckIcon size={28} />
        <CheckIcon size={40} />
      </div>
    ),
  },
  {
    id: "table",
    name: "Table",
    handoffPath: "/handoff/table",
    preview: (
      <div style={{ width: "100%", transform: "scale(0.78)" }}>
        <Table
          columns={[
            { header: "Fecha" },
            { header: "Monto", align: "right" },
            { header: "Docs", align: "center" },
          ]}
          rows={[
            ["23-04-2024", <span key="m" style={{ color: "#5F3ED8", fontWeight: 700 }}><span style={{ color: "#EF852E", marginRight: 6 }}>+</span>USD 200</span>, <span key="b" style={{ display: "inline-flex", gap: 8 }}><DocButton action="download" /><DocButton action="view" /></span>],
            ["18-04-2024", <span key="m" style={{ color: "#5F3ED8", fontWeight: 700 }}><span style={{ marginRight: 6 }}>−</span>USD 80</span>, <span key="b" style={{ display: "inline-flex", gap: 8 }}><DocButton action="download" /><DocButton action="view" /></span>],
          ]}
        />
      </div>
    ),
  },
  {
    id: "docbutton",
    name: "DocButton",
    handoffPath: "/handoff/docbutton",
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <DocButton action="download" />
        <DocButton action="view" />
      </div>
    ),
  },
  {
    id: "conditionpill",
    name: "ConditionPill",
    handoffPath: "/handoff/conditionpill",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ConditionPill>Conoce más</ConditionPill>
      </div>
    ),
  },
  {
    id: "tabselector",
    name: "TabSelector",
    handoffPath: "/handoff/tabselector",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TabSelector options={["Boleta", "Facturas"]} defaultValue={0} />
      </div>
    ),
  },
  {
    id: "termsselector",
    name: "TermsSelector",
    handoffPath: "/handoff/termsselector",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
        <TermsSelector defaultChecked>Acepto los términos y condiciones.</TermsSelector>
      </div>
    ),
  },
  {
    id: "input",
    name: "Input",
    handoffPath: "/handoff/input",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", transform: "scale(0.82)" }}>
        <Input variant="default" placeholder="Suscríbete a las novedades" />
        <Input variant="focus" defaultValue="correo@ejemplo.com" />
        <Input variant="error" defaultValue="correo-malo" errorMessage="Ingresa un correo válido" />
      </div>
    ),
  },
  {
    id: "profilebutton",
    name: "ProfileButton",
    handoffPath: "/handoff/profilebutton",
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <ProfileButton />
      </div>
    ),
  },
  {
    id: "cardtitle",
    name: "CardTitle",
    handoffPath: "/handoff/cardtitle",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 8, padding: "8px 4px" }}>
        <CardTitle />
      </div>
    ),
  },
  {
    id: "auctionstatus",
    name: "AuctionStatus",
    handoffPath: "/handoff/auctionstatus",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.62)" }}>
        <AuctionStatus />
      </div>
    ),
  },
  {
    id: "cardviewer",
    name: "CardViewer",
    handoffPath: "/handoff/cardviewer",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.42)", transformOrigin: "center" }}>
        <CardViewer images={["/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg", "/demo/bronco.jpg"]} />
      </div>
    ),
  },
  {
    id: "detailcard",
    name: "DetailCard",
    handoffPath: "/handoff/detailcard",
    preview: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.62)", transformOrigin: "center" }}>
        <DetailCard variant="live" />
      </div>
    ),
  },
  {
    id: "todayicon",
    name: "TodayIcon",
    handoffPath: "/handoff/todayicon",
    preview: (
      <div style={{ background: "#2E0F70", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <TodayIcon size={22} state="default" />
        <TodayIcon size={22} state="hover" />
        <TodayIcon size={22} state="active" />
      </div>
    ),
  },
  {
    id: "servicecentericon",
    name: "ServiceCenterIcon",
    handoffPath: "/handoff/servicecentericon",
    preview: (
      <div style={{ background: "#2E0F70", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <ServiceCenterIcon size={22} state="default" />
        <ServiceCenterIcon size={22} state="hover" />
        <ServiceCenterIcon size={22} state="active" />
      </div>
    ),
  },
  {
    id: "businessicon",
    name: "BusinessIcon",
    handoffPath: "/handoff/businessicon",
    preview: (
      <div style={{ background: "#2E0F70", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <BusinessIcon size={22} state="default" />
        <BusinessIcon size={22} state="hover" />
        <BusinessIcon size={22} state="active" />
      </div>
    ),
  },
  {
    id: "categoryicon",
    name: "CategoryIcon",
    handoffPath: "/handoff/categoryicon",
    preview: (
      <div style={{ background: "#2E0F70", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <CategoryIcon size={22} state="default" />
        <CategoryIcon size={22} state="hover" />
        <CategoryIcon size={22} state="active" />
      </div>
    ),
  },
  {
    id: "offericon",
    name: "OfferIcon",
    handoffPath: "/handoff/offericon",
    preview: (
      <div style={{ background: "#2E0F70", borderRadius: 8, padding: "16px 20px", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <OfferIcon size={22} state="default" />
        <OfferIcon size={22} state="hover" />
        <OfferIcon size={22} state="active" />
      </div>
    ),
  },
  {
    id: "userprofilecard",
    name: "UserProfileCard",
    handoffPath: "/handoff/userprofilecard",
    preview: (
      <div style={{ width: 300, height: 56, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scale(0.36)" }}>
          <UserProfileCard />
        </div>
      </div>
    ),
  },
  {
    id: "infoicon",
    name: "InfoIcon",
    handoffPath: "/handoff/infoicon",
    preview: (
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
        <InfoIcon size={20} />
        <InfoIcon size={28} />
        <InfoIcon size={36} />
      </div>
    ),
  },
  {
    id: "walletbalancecard",
    name: "WalletBalanceCard",
    handoffPath: "/handoff/walletbalancecard",
    preview: (
      <div style={{ width: 230, height: 134, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scale(0.54)" }}>
          <WalletBalanceCard />
        </div>
      </div>
    ),
  },
  {
    id: "activitycard",
    name: "ActivityCard",
    handoffPath: "/handoff/activitycard",
    preview: (
      <div style={{ width: 230, height: 134, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scale(0.54)" }}>
          <ActivityCard />
        </div>
      </div>
    ),
  },
  {
    id: "offershelf",
    name: "OfferShelf",
    handoffPath: "/handoff/offershelf",
    preview: (
      <div style={{ width: 260, height: 140, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scale(0.32)" }}>
          <OfferShelf />
        </div>
      </div>
    ),
  },
  // ── Mi Garaje (mi-garaje-lab) ──
  // Inicio: cuenta, accesos, billetera, recomendados y Tu actividad.
  {
    id: "accountcard",
    name: "AccountCard",
    handoffPath: "/handoff/accountcard",
    preview: <Scaled w={451} h={215} scale={0.6}><Garaje width={451}><Detached><AccountCard username="ZAEX5G" risk="Muy bajo" points={500} passExpiry="16/01/2026" passHref="#" /></Detached></Garaje></Scaled>,
  },
  {
    id: "riskmeter",
    name: "RiskMeter",
    handoffPath: "/handoff/riskmeter",
    preview: <div style={{ display: "grid", gap: 12 }}><RiskMeter level={0} tone="light" /><RiskMeter level={3} tone="light" /></div>,
  },
  {
    id: "actiontile",
    name: "ActionTile",
    handoffPath: "/handoff/actiontile",
    preview: <Scaled w={300} h={160} scale={0.8}><Garaje width={300}><ActionTileDemo /></Garaje></Scaled>,
  },
  {
    id: "walletcard",
    name: "WalletCard",
    handoffPath: "/handoff/walletcard",
    preview: <Scaled w={300} h={215} scale={0.72}><Garaje width={300}><Detached><WalletCard balance="320" subasCoins="1,250" transactionsHref="#" /></Detached></Garaje></Scaled>,
  },
  {
    id: "recommendedlist",
    name: "RecommendedList",
    handoffPath: "/handoff/recommendedlist",
    preview: <Scaled w={300} h={300} scale={0.5}><Garaje width={300}><Detached><RecommendedList items={RECS} href="#" /></Detached></Garaje></Scaled>,
  },
  {
    id: "adbanner",
    name: "AdBanner",
    handoffPath: "/handoff/adbanner",
    preview: <Scaled w={300} h={320} scale={0.45}><Garaje width={300}><AdBanner slot="rail" src={AD_RAIL} stripSrc={AD_STRIP} title="Publicidad: Conoce su valor y publícalo en VMC." /></Garaje></Scaled>,
  },
  {
    id: "activitysection",
    name: "ActivitySection",
    handoffPath: "/handoff/activitysection",
    preview: <Scaled w={451} h={330} scale={0.5}><Garaje width={451}><ActivitySectionDemo /></Garaje></Scaled>,
  },
  {
    id: "pendingtoggle",
    name: "PendingToggle",
    handoffPath: "/handoff/pendingtoggle",
    preview: <Garaje><PendingToggleDemo /></Garaje>,
  },
  {
    id: "foldertabs",
    name: "FolderTabs",
    handoffPath: "/handoff/foldertabs",
    preview: <Scaled w={435} h={60} scale={0.62}><Garaje width={435}><FolderTabsDemo /></Garaje></Scaled>,
  },
  {
    id: "stagetabs",
    name: "StageTabs",
    handoffPath: "/handoff/stagetabs",
    preview: <Scaled w={435} h={60} scale={0.62}><Garaje width={435}><StageTabsDemo /></Garaje></Scaled>,
  },
  {
    id: "vehiclerow",
    name: "VehicleRow",
    handoffPath: "/handoff/vehiclerow",
    preview: <Scaled w={435} h={200} scale={0.62}><Garaje width={435}><div style={{ background: "#fff", borderRadius: 8 }}><VehicleRowDemo set="negociaciones" /></div></Garaje></Scaled>,
  },
  {
    id: "countdown",
    name: "Countdown",
    handoffPath: "/handoff/countdown",
    preview: <CountdownDemo />,
  },
  {
    id: "statustag",
    name: "StatusTag",
    handoffPath: "/handoff/statustag",
    preview: <Garaje><div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}><StatusTag tone="wait">Lista para publicar</StatusTag><StatusTag tone="progress">Pendiente de aprobación</StatusTag><StatusTag tone="wait">Publicada</StatusTag></div></Garaje>,
  },
  {
    id: "pagination",
    name: "Pagination",
    handoffPath: "/handoff/pagination",
    preview: <Garaje><Pagination page={0} pages={3} onChange={() => {}} label="Mis publicaciones" variant="glass" size="s" /></Garaje>,
  },
  // Mis publicaciones.
  {
    id: "publicationbadge",
    name: "PublicationBadge",
    handoffPath: "/handoff/publicationbadge",
    preview: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 240 }}>
        <PublicationBadge status="revision" /><PublicationBadge status="publicada" /><PublicationBadge status="negociacion" />
        <PublicationBadge status="subaschat" /><PublicationBadge status="vendido" /><PublicationBadge status="desierta" />
      </div>
    ),
  },
  {
    id: "morebutton",
    name: "MoreButton",
    handoffPath: "/handoff/morebutton",
    preview: <Garaje><MoreButtonDemo /></Garaje>,
  },
  {
    id: "actionlist",
    name: "ActionList",
    handoffPath: "/handoff/actionlist",
    preview: <Scaled w={411} h={56} scale={0.66}><Garaje width={411}><Detached><ActionListDemo /></Detached></Garaje></Scaled>,
  },
  {
    id: "republishbar",
    name: "RepublishBar",
    handoffPath: "/handoff/republishbar",
    preview: <Scaled w={351} h={120} scale={0.78}><Garaje width={351}><RepublishBarDemo /></Garaje></Scaled>,
  },
  {
    id: "republishmodal",
    name: "RepublishModal",
    handoffPath: "/handoff/republishmodal",
    preview: <DialogStandIn icon="republicar" title="Confirma la republicación" />,
  },
  {
    id: "dropmodal",
    name: "DropModal",
    handoffPath: "/handoff/dropmodal",
    preview: <DialogStandIn icon="baja" title="Dar de baja" />,
  },
  {
    id: "qrcode",
    name: "QrCode",
    handoffPath: "/handoff/qrcode",
    preview: <QrCode value="https://www.vmcsubastas.com/oferta/51015" size={110} />,
  },
  {
    id: "qrcard",
    name: "QrCard",
    handoffPath: "/handoff/qrcard",
    preview: <QrCard value="https://www.vmcsubastas.com/oferta/51015" size={120} />,
  },
  // Notificaciones.
  {
    id: "notificationbell",
    name: "NotificationBell",
    handoffPath: "/handoff/notificationbell",
    preview: <NotificationBellDemo />,
  },
  {
    id: "notificationbox",
    name: "NotificationBox",
    handoffPath: "/handoff/notificationbox",
    // Quieto: en la pantalla entra y se recoge hacia la campana en 2,4 s.
    preview: <Scaled w={360} h={180} scale={0.75}><Garaje width={360} className="cp-still"><div style={{ padding: "8px 20px 40px" }}><NotificationBox photo="/mi-garaje/garage-photos/sentra/1.jpg" title="El vendedor respondió tu propuesta" body="Nissan Sentra 2020 · te pide US$ 4,800" time="Ahora" onOpen={() => undefined} /></div></Garaje></Scaled>,
  },
  {
    id: "notificationinbox",
    name: "NotificationInbox",
    handoffPath: "/handoff/notificationinbox",
    preview: <Scaled w={400} h={230} scale={0.66}><Garaje width={400}><div style={{ padding: "4px 10px 30px" }}><Detached><NotificationInboxDemo /></Detached></div></Garaje></Scaled>,
  },
  // Valorizar y Publicar.
  {
    id: "stepper",
    name: "Stepper",
    handoffPath: "/handoff/stepper",
    preview: <Scaled w={560} h={70} scale={0.5}><Garaje width={560}><Stepper steps={["Vehículo", "Detalles", "Valor", "Información", "Vista previa"]} current={2} onGo={() => {}} /></Garaje></Scaled>,
  },
  {
    id: "sectionhead",
    name: "SectionHead",
    handoffPath: "/handoff/sectionhead",
    preview: <Scaled w={520} h={120} scale={0.52}><Garaje width={520}><div style={{ display: "grid", gap: 24, width: 520 }}><SectionHead icon="caja" title="Mecánica" done tip="típico · toca para cambiar" /><SectionHead icon="auto" title="Estado del vehículo" /></div></Garaje></Scaled>,
  },
  {
    id: "select",
    name: "Select",
    handoffPath: "/handoff/select",
    preview: <Scaled w={360} h={90} scale={0.75}><Garaje width={360}><SelectDemo start="2019" /></Garaje></Scaled>,
  },
  {
    id: "combobox",
    name: "Combobox",
    handoffPath: "/handoff/combobox",
    preview: <Scaled w={360} h={90} scale={0.75}><Garaje width={360}><ComboboxDemo label="Marca" options={["Toyota", "Kia", "Hyundai", "Volkswagen"]} placeholder="Escribe o elige la marca" /></Garaje></Scaled>,
  },
  {
    id: "valuehero",
    name: "ValueHero",
    handoffPath: "/handoff/valuehero",
    preview: <Scaled w={760} h={300} scale={0.36}><Garaje width={760}><ValueHero title="Toyota Corolla 2019" meta="45,000 km · 7 años de uso" valueLabel="Valor de mercado hoy" value={15010} buyback={12010} auction={15760} /></Garaje></Scaled>,
  },
  {
    id: "projectionchart",
    name: "ProjectionChart",
    handoffPath: "/handoff/projectionchart",
    preview: <Scaled w={680} h={300} scale={0.4}><Garaje width={680}><ProjectionChartDemo /></Garaje></Scaled>,
  },
  {
    id: "seasonchart",
    name: "SeasonChart",
    handoffPath: "/handoff/seasonchart",
    preview: <Scaled w={680} h={300} scale={0.4}><Garaje width={680}><SeasonChartDemo /></Garaje></Scaled>,
  },
  {
    id: "decisionbar",
    name: "DecisionBar",
    handoffPath: "/handoff/decisionbar",
    preview: <Scaled w={760} h={120} scale={0.36}><Garaje width={760}><DecisionBar title="¿Publicamos tu vehículo?" description="Ya tenemos los datos del vehículo: en Publicar solo agregas las fotos." actions={<><Button variant="outline">Valorizar de nuevo</Button><Button variant="primary">Publicar</Button></>} /></Garaje></Scaled>,
  },
  {
    id: "valuationcard",
    name: "ValuationCard",
    handoffPath: "/handoff/valuationcard",
    preview: <Scaled w={760} h={330} scale={0.36}><Garaje width={760}><ValuationCardDemo only="ready" /></Garaje></Scaled>,
  },
  {
    id: "addbutton",
    name: "AddButton",
    handoffPath: "/handoff/addbutton",
    preview: <Scaled w={500} h={70} scale={0.55}><Garaje width={500}><AddButtonDemo /></Garaje></Scaled>,
  },
  {
    id: "publishswipe",
    name: "PublishSwipe",
    handoffPath: "/handoff/publishswipe",
    preview: <PublishSwipeDemo />,
  },
  {
    id: "publishfeebanner",
    name: "PublishFeeBanner",
    handoffPath: "/handoff/publishfeebanner",
    preview: <Scaled w={760} h={200} scale={0.36}><Garaje width={760}><PublishFeeBanner fee={25} /></Garaje></Scaled>,
  },
  // Negociación y SubasChat.
  {
    id: "sidepanel",
    name: "SidePanel",
    handoffPath: "/handoff/sidepanel",
    preview: (
      <div aria-hidden style={{ position: "relative", width: 220, height: 132, borderRadius: 10, overflow: "hidden", background: "rgba(25,28,28,.28)" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 132, display: "grid", alignContent: "start", gap: 6, padding: 12, background: "#fff", boxShadow: "-8px 0 24px rgba(34,0,92,.18)" }}>
          <b style={{ fontSize: 12, color: "#3B1782" }}>Nissan Sentra 2020</b>
          <span style={{ height: 6, borderRadius: 3, background: "#ECE8F7" }} /><span style={{ height: 6, width: "70%", borderRadius: 3, background: "#ECE8F7" }} />
        </div>
      </div>
    ),
  },
  {
    id: "proposalmodal",
    name: "ProposalModal",
    handoffPath: "/handoff/proposalmodal",
    preview: <DialogStandIn icon="negociaciones" title="¿Cuánto ofreces?" />,
  },
  {
    id: "proposalnotice",
    name: "ProposalNotice",
    handoffPath: "/handoff/proposalnotice",
    preview: <DialogStandIn icon="bolsa" title="Fondos insuficientes" />,
  },
  {
    id: "responsetimer",
    name: "ResponseTimer",
    handoffPath: "/handoff/responsetimer",
    preview: <Garaje><ResponseTimerDemo hours={23} minutes={47} urgent pre="Tienes" post=" para responder" /></Garaje>,
  },
  {
    id: "roundprogress",
    name: "RoundProgress",
    handoffPath: "/handoff/roundprogress",
    preview: <Scaled w={412} h={60} scale={0.66}><Garaje width={412}><RoundProgress round={2} total={5} /></Garaje></Scaled>,
  },
  {
    id: "proposalthread",
    name: "ProposalThread",
    handoffPath: "/handoff/proposalthread",
    preview: <Scaled w={412} h={255} scale={0.6}><Garaje width={412}><ProposalThread other="Vendedor" initials="V" items={MAZDA} /></Garaje></Scaled>,
  },
  {
    id: "amountcomposer",
    name: "AmountComposer",
    handoffPath: "/handoff/amountcomposer",
    preview: <Scaled w={412} h={130} scale={0.66}><Garaje width={412}><AmountComposerDemo /></Garaje></Scaled>,
  },
  {
    id: "chatheader",
    name: "ChatHeader",
    handoffPath: "/handoff/chatheader",
    preview: <Scaled w={311} h={80} scale={0.85}><Garaje width={311}><div style={{ borderRadius: 8, overflow: "hidden" }}><ChatHeader name="KLM8RT" role="Comprador" dealLabel="Venta" amount="US$ 17,500" /></div></Garaje></Scaled>,
  },
  {
    id: "chatday",
    name: "ChatDay",
    handoffPath: "/handoff/chatday",
    preview: <Garaje width={311}><div style={CHAT}><ChatDay label="Hoy" /></div></Garaje>,
  },
  {
    id: "chatbubble",
    name: "ChatBubble",
    handoffPath: "/handoff/chatbubble",
    preview: (
      <Scaled w={311} h={245} scale={0.7}>
        <Garaje width={311}>
          <div style={{ ...CHAT, gap: 6 }}>
            <ChatBubble sender="KLM8RT" time="10:31">Hola, gracias por aceptar 🙌 ¿Cuándo podría ver el auto?</ChatBubble>
            <ChatBubble mine sender="Tú" time="10:33" status="sent">¡Hola! Puede ser mañana a las 10 am en Miraflores.</ChatBubble>
            <ChatBubble sender="KLM8RT" time="10:34">Perfecto, ahí estaré. ¿Tiene el SOAT vigente?</ChatBubble>
          </div>
        </Garaje>
      </Scaled>
    ),
  },
  {
    id: "chatnotice",
    name: "ChatNotice",
    handoffPath: "/handoff/chatnotice",
    preview: <Scaled w={400} h={90} scale={0.66}><Garaje width={400}><div style={CHAT}><ChatNotice>{LOCK}<span><b>Se cobró tu fee de habilitación de tu consignación (&gt;S&lt;&nbsp;50).</b> Coordinen aquí la visita y el pago hasta el 19/02/2027.</span></ChatNotice></div></Garaje></Scaled>,
  },
  {
    id: "chatcomposer",
    name: "ChatComposer",
    handoffPath: "/handoff/chatcomposer",
    preview: <Scaled w={311} h={70} scale={0.85}><Garaje width={311}><ChatComposerDemo /></Garaje></Scaled>,
  },
  // ── Index (vmc-index-lab) ──
  {
    id: "herocarousel",
    name: "HeroCarousel",
    handoffPath: "/handoff/herocarousel",
    preview: <Scaled w={640} h={300} scale={0.38}><HeroCarousel slides={INDEX_SLIDES} /></Scaled>,
  },
  {
    id: "logomarquee",
    name: "LogoMarquee",
    handoffPath: "/handoff/logomarquee",
    // Sin href: las tarjetas no pueden ser enlaces dentro del enlace de esta card.
    preview: <Scaled w={560} h={110} scale={0.45}><div style={{ width: 560 }}><LogoMarquee items={COMPANIES.map((c) => ({ name: c.name, logo: c.logo, caption: c.lots }))} /></div></Scaled>,
  },
  {
    id: "vmcahora",
    name: "VmcAhora",
    handoffPath: "/handoff/vmcahora",
    preview: <Scaled w={320} h={300} scale={0.5}><VmcAhora view="timeline" /></Scaled>,
  },
  {
    id: "offertypecards",
    name: "OfferTypeCards",
    handoffPath: "/handoff/offertypecards",
    // Imagen del componente: sus tarjetas son enlaces y no pueden ir dentro del enlace de esta card.
    preview: <img src="/index/thumbs/offertypecards.jpg" alt="" width={250} style={{ display: "block", borderRadius: 8 }} />,
  },
  {
    id: "featuredcard",
    name: "FeaturedCard",
    handoffPath: "/handoff/featuredcard",
    preview: <Scaled w={292} h={386} scale={0.38}>{IDX_FEATURED}</Scaled>,
  },
  {
    id: "lotgallery",
    name: "LotGallery",
    handoffPath: "/handoff/lotgallery",
    preview: <Scaled w={720} h={360} scale={0.34}><div style={{ width: 720 }}><LotGallery featured={IDX_FEATURED} items={STORES[0].lots} height={356} /></div></Scaled>,
  },
  {
    id: "lightbar",
    name: "LightBar",
    handoffPath: "/handoff/lightbar",
    preview: (
      <div style={{ display: "grid", gap: 14, width: 200 }}>
        <LightBar />
        <LightBar tone="negotiable" />
      </div>
    ),
  },
  {
    id: "glassbutton",
    name: "GlassButton",
    handoffPath: "/handoff/glassbutton",
    preview: (
      <div style={{ padding: "22px 28px", borderRadius: 12, background: "linear-gradient(100deg, #2A1670 0%, #3D2299 45%, #8460E5 100%)" }}>
        <GlassButton tabIndex={-1}>Publicar mi auto</GlassButton>
      </div>
    ),
  },
  {
    id: "vidrio",
    name: "Vidrio",
    handoffPath: "/handoff/vidrio",
    preview: (
      <div style={{ display: "flex", gap: 10 }}>
        <Vidrio s="vehicular" size={40} />
        <Vidrio s="maquinaria" size={40} />
        <Vidrio s="negociaciones" size={40} />
        <Vidrio s="valorizaciones" size={40} />
      </div>
    ),
  },
];

// ── Styles ────────────────────────────────────────────────────────────────

const PAGE_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }

  .cp-page {
    min-height: 100vh;
    background: #ffffff;
    font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
    color: var(--ui-ink);
  }

  .cp-section {
    max-width: 1120px;
    margin: 0 auto;
    padding: 40px 40px 80px;
  }
  .cp-section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .cp-section-title {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--ui-ink);
    margin: 0;
  }
  .cp-section-count {
    font-size: 13px;
    color: var(--ui-muted);
    font-weight: 500;
  }

  .cp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .cp-card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid var(--ui-border);
    background: #ffffff;
    overflow: hidden;
    text-decoration: none;
    transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .cp-card:hover {
    box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05);
    border-color: var(--ui-border-hover);
    transform: translateY(-2px);
  }
  .cp-card-preview {
    background: var(--ui-subtle);
    border-bottom: 1px solid var(--ui-border-soft);
    padding: 32px 24px;
    min-height: 168px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cp-card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
  }
  .cp-card-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ui-ink);
    letter-spacing: -0.01em;
  }
  .cp-card-arrow {
    font-size: 15px;
    color: var(--ui-border-hover);
    transition: color 0.2s ease, transform 0.2s ease;
  }
  .cp-card:hover .cp-card-name { color: var(--ui-accent); }
  .cp-card:hover .cp-card-arrow { color: var(--ui-accent); transform: translateX(3px); }

  .cp-still .nt-box, .cp-still .nt-box li { animation: none; }

  @media (max-width: 768px) {
    .cp-section { padding: 28px 20px 60px; }
    .cp-grid { grid-template-columns: 1fr; }
  }
`;

// ── Page ──────────────────────────────────────────────────────────────────

export default function ComponentsPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div className="cp-page">
        <Header active="components" />

        <main className="cp-section">
          <div className="cp-section-head">
            <h1 className="cp-section-title">Componentes</h1>
            <span className="cp-section-count">{REGISTRY.length} componentes</span>
          </div>

          <div className="cp-grid">
            {REGISTRY.map(function renderCard(c) {
              return (
                <a key={c.id} href={c.handoffPath} className="cp-card">
                  <div className="cp-card-preview">{c.preview}</div>
                  <div className="cp-card-foot">
                    <span className="cp-card-name">{c.name}</span>
                    <span className="cp-card-arrow" aria-hidden="true">→</span>
                  </div>
                </a>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
