"use client";

import type { JSX } from "react";
import OfferType from "@/src/components/OfferType/OfferType";
import { OfferTypeHandoff } from "@/src/components/OfferType/OfferTypeHandoff";

export default function OfferTypeHandoffPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Top bar */}
      <header style={{ borderBottom: "1px solid #e2e8f0", background: "#fff", padding: "0 40px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← Concorde</a>
          <span style={{ color: "#e2e8f0" }}>/</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>OfferType</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#f1f5f9", color: "#64748b", letterSpacing: "0.04em" }}>VoyagerDS</span>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Preview — variantes */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Preview — variantes
          </h2>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferType variant="negotiable" />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>negotiable</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OfferType variant="live" />
              <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>live</span>
            </div>
          </div>
        </section>

        {/* Preview — estados */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Preview — estados (hover sobre el card, click para focus)
          </h2>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px repeat(3, 120px)", gap: 16, alignItems: "center" }}>
              {/* Header */}
              <div />
              {["DEFAULT","HOVER","FOCUS / CLICK"].map(function renderH(h) {
                return <div key={h} style={{ fontSize: 9, fontWeight: 700, fontFamily: "monospace", color: "#94a3b8", letterSpacing: "0.1em", textAlign: "center" }}>{h}</div>;
              })}
              {/* NEGOTIABLE row */}
              <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>Negotiable</div>
              <div style={{ display: "flex", justifyContent: "center" }}><OfferType variant="negotiable" /></div>
              <div style={{ display: "flex", justifyContent: "center" }}><OfferType variant="negotiable" className="poftype--hover" /></div>
              <div style={{ display: "flex", justifyContent: "center" }}><OfferType variant="negotiable" className="poftype--focus" /></div>
              {/* LIVE row */}
              <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>Live</div>
              <div style={{ display: "flex", justifyContent: "center" }}><OfferType variant="live" /></div>
              <div style={{ display: "flex", justifyContent: "center" }}><OfferType variant="live" className="poftype--hover" /></div>
              <div style={{ display: "flex", justifyContent: "center" }}><OfferType variant="live" className="poftype--focus" /></div>
            </div>
          </div>
        </section>

        {/* Demo interactivo */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Demo interactivo — hover + click
          </h2>
          <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: "36px 32px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <OfferType variant="negotiable" onClick={function() { void 0; }} />
            <OfferType variant="live" onClick={function() { void 0; }} />
          </div>
        </section>

        {/* Handoff panel */}
        <OfferTypeHandoff />

      </div>
    </div>
  );
}
