"use client";

import type { JSX } from "react";
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
          <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace" }}>{"{children}"} editable</span>
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
];

// ── Styles ────────────────────────────────────────────────────────────────

const PAGE_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }

  .cp-page {
    min-height: 100vh;
    background: #ffffff;
    font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
    color: #0f172a;
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
    color: #0f172a;
    margin: 0;
  }
  .cp-section-count {
    font-size: 13px;
    color: #94a3b8;
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
    border: 1px solid #e2e8f0;
    background: #ffffff;
    overflow: hidden;
    text-decoration: none;
    transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .cp-card:hover {
    box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05);
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }
  .cp-card-preview {
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
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
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  .cp-card-arrow {
    font-size: 15px;
    color: #cbd5e1;
    transition: color 0.2s ease, transform 0.2s ease;
  }
  .cp-card:hover .cp-card-name { color: #4f2ed8; }
  .cp-card:hover .cp-card-arrow { color: #4f2ed8; transform: translateX(3px); }

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
