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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Preview variantes */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            PUBLICADA — variantes (sin imagen)
          </h2>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            {([
              { variant: "live",       label: "live" },
              { variant: "negotiable", label: "negotiable" },
              { variant: "proxima",    label: "proxima" },
              { variant: "expired",    label: "expired" },
            ] as const).map(function renderCol(c) {
              return (
                <div key={c.variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <OfferCard
                    variant={c.variant}
                    name="Ford Bronco Sport"
                    year="2024"
                    price="US$ 9,999"
                    onClick={function() { void 0; }}
                  />
                  <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>{c.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Con badges + imagen */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Con BadgeStatus overlay
          </h2>
          <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferCard
                variant="live"
                name="Ford Bronco Sport"
                year="2024"
                price="US$ 28,500"
                badge={<BadgeStatus variant="live" />}
                onClick={function() { void 0; }}
              />
              <span style={{ fontSize: 10, color: "#64748b", fontFamily: "monospace" }}>live + badge EN VIVO</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferCard
                variant="proxima"
                name="Land Rover Def."
                year="2023"
                price="US$ 9,999"
                badge={<BadgeStatus variant="proxima" />}
                onClick={function() { void 0; }}
              />
              <span style={{ fontSize: 10, color: "#64748b", fontFamily: "monospace" }}>proxima + badge PRÓXIMA</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferCard
                variant="negotiable"
                name="Toyota Hilux"
                year="2022"
                price="US$ 9,999"
                onClick={function() { void 0; }}
              />
              <span style={{ fontSize: 10, color: "#64748b", fontFamily: "monospace" }}>negotiable (solo like)</span>
            </div>
          </div>
        </section>

        {/* Estados */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Estados — disabled · skeleton
          </h2>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <OfferCard variant="live" name="Ford Bronco Sport" year="2024" price="US$ 9,999" disabled />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>disabled</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <OfferCard variant="live" name=" " year=" " price="" skeleton />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>skeleton</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <OfferCard variant="negotiable" name=" " year=" " skeleton />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>skeleton negotiable</span>
            </div>
          </div>
        </section>

        {/* Code */}
        <section>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Uso
          </h2>
          <div style={{ background: "#0f172a", borderRadius: 8, padding: "16px 20px" }}>
            <code style={{ fontSize: 12, lineHeight: 1.8, color: "#e2e8f0", fontFamily: "monospace", whiteSpace: "pre", display: "block" }}>{`import OfferCard from "@/components/OfferCard/OfferCard";
import BadgeStatus from "@/components/BadgeStatus/BadgeStatus";

// Publicada — EN VIVO (con precio)
<OfferCard
  variant="live"
  name="Ford Bronco Sport"
  year="2024"
  price="US$ 9,999"
  badge={<BadgeStatus variant="live" />}
  imageSrc="/img/bronco.jpg"
  onClick={() => router.push("/subasta/123")}
/>

// Publicada — NEGOCIABLE (solo like, sin precio)
<OfferCard
  variant="negotiable"
  name="Toyota Hilux"
  year="2022"
  onClick={() => router.push("/subasta/456")}
/>

// Skeleton loading
<OfferCard variant="live" name="" year="" skeleton />

// Like controlado
const [liked, setLiked] = useState(false);
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
