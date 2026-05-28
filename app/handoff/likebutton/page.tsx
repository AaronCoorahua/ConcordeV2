"use client";

import type { JSX } from "react";
import { useState } from "react";
import LikeButton from "@/src/components/LikeButton/LikeButton";
import { LikeButtonHandoff } from "@/src/components/LikeButton/LikeButtonHandoff";

export default function LikeButtonHandoffPage(): JSX.Element {
  const [controlledLg, setControlledLg] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>

      {/* Top bar */}
      <header style={{
        borderBottom: "1px solid #e2e8f0",
        background: "#fff",
        padding: "0 40px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← Concorde</a>
          <span style={{ color: "#e2e8f0" }}>/</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>LikeButton</span>
        </div>
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "monospace",
          padding: "3px 10px",
          borderRadius: 20,
          background: "#f1f5f9",
          color: "#64748b",
          letterSpacing: "0.04em",
        }}>VoyagerDS v2.0</span>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Live preview — tamaños */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Preview — 3 tamaños
          </h2>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
            borderRadius: 12,
            padding: "36px 32px",
            display: "flex",
            gap: 24,
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <LikeButton size="sm" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>sm · 32px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <LikeButton size="md" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>md · 44px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <LikeButton size="lg" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>lg · 60px</span>
            </div>
          </div>
        </section>

        {/* Live preview — estados estáticos */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Preview — estados (md)
          </h2>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
            borderRadius: 12,
            padding: "36px 32px",
            display: "flex",
            gap: 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            {[
              { label: "default",  el: <LikeButton size="md" /> },
              { label: "active",   el: <LikeButton size="md" active={true} /> },
              { label: "disabled", el: <LikeButton size="md" disabled /> },
              { label: "skeleton", el: <LikeButton size="md" skeleton /> },
            ].map(function renderState(s) {
              return (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  {s.el}
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live preview — demo interactivo */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px", fontFamily: "monospace" }}>
            Demo interactivo — click para toggle + heart pop
          </h2>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
            borderRadius: 12,
            padding: "36px 32px",
            display: "flex",
            gap: 40,
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            {/* Uncontrolled x3 sizes */}
            {(["sm", "md", "lg"] as const).map(function renderDemo(s) {
              return (
                <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <LikeButton size={s} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{s} · uncontrolled</span>
                </div>
              );
            })}
            <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.1)" }} />
            {/* Controlled */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <LikeButton size="lg" active={controlledLg} onChange={setControlledLg} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                lg · controlled ({controlledLg ? "❤️ liked" : "♡ not liked"})
              </span>
            </div>
          </div>
        </section>

        {/* Handoff panel */}
        <LikeButtonHandoff />

      </div>
    </div>
  );
}
