"use client";

import type { JSX } from "react";
import OfferCard from "@/src/components/OfferCard/OfferCard";
import { OfferCardHandoff } from "@/src/components/OfferCard/OfferCardHandoff";

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
            Preview — EN VIVO · PRÓXIMA (con imagen placeholder)
          </h2>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <OfferCard
                variant="live"
                name="Ford Bronco Sport"
                year="2024"
                price="US$ 28,500"
              />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>live</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <OfferCard
                variant="proxima"
                name="Land Rover Def."
                year="2023"
                price="US$ 9,999"
              />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>proxima</span>
            </div>
          </div>
        </section>

        {/* Demo interactivo */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Demo interactivo — hover + like toggle
          </h2>
          <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 24, flexWrap: "wrap" }}>
            <OfferCard
              variant="live"
              name="Ford Bronco Sport"
              year="2024"
              price="US$ 28,500"
              onClick={function() { void 0; }}
            />
            <OfferCard
              variant="proxima"
              name="Land Rover Def."
              year="2023"
              price="US$ 9,999"
              onClick={function() { void 0; }}
            />
          </div>
        </section>

        <OfferCardHandoff />
      </div>
    </div>
  );
}
