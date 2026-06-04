"use client";

import type { JSX } from "react";
import OfferCard from "@/src/components/OfferCard/OfferCard";
import BadgeStatus from "@/src/components/BadgeStatus/BadgeStatus";

export default function OfferCardHandoffPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      <header style={{ borderBottom: "1px solid #e2e8f0", background: "#fff", padding: "0 40px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← Concorde</a>
          <span style={{ color: "#e2e8f0" }}>/</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>OfferCard</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b" }}>VoyagerDS</span>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* PUBLICADA — sin imagen */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            PUBLICADA — live · negotiable (sin imagen)
          </h2>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferCard variant="live" name="Ford Bronco Sport" year="2024" price="US$ 9,999" />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>live</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferCard variant="negotiable" name="Ford Bronco Sport" year="2024" />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>negotiable</span>
            </div>
          </div>
        </section>

        {/* Con imagen + badge */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Demo interactivo — hover + like toggle + badge
          </h2>
          <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <OfferCard
              variant="live"
              name="Ford Bronco Sport"
              year="2024"
              price="US$ 28,500"
              badge={<BadgeStatus variant="live" />}
              onClick={function() { void 0; }}
            />
            <OfferCard
              variant="negotiable"
              name="Land Rover Def."
              year="2023"
              badge={<BadgeStatus variant="proxima" />}
              onClick={function() { void 0; }}
            />
          </div>
        </section>

        {/* Uso */}
        <section>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Uso
          </h2>
          <div style={{ background: "#0f172a", borderRadius: 8, padding: "16px 20px" }}>
            <code style={{ fontSize: 12, lineHeight: 1.8, color: "#e2e8f0", fontFamily: "monospace", whiteSpace: "pre", display: "block" }}>{`import OfferCard from "@/components/OfferCard/OfferCard";
import BadgeStatus from "@/components/BadgeStatus/BadgeStatus";

// EN VIVO — pprice + precio + like
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 9,999"
  badge={<BadgeStatus variant="live" />}
  imageSrc="/img/bronco.jpg"
  onClick={() => router.push("/subasta/123")}
/>

// NEGOCIABLE — solo like, sin precio
<OfferCard
  variant="negotiable"
  name="Toyota Hilux"
  year="2022"
  badge={<BadgeStatus variant="proxima" />}
  onClick={() => router.push("/subasta/456")}
/>

// Like controlado
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 9,999"
  liked={liked}
  onLikeChange={setLiked}
/>`}</code>
          </div>
        </section>

      </div>
    </div>
  );
}
