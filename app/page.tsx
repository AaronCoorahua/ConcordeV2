"use client";

import type { JSX } from "react";
import Header from "@/app/_components/Header";
import InstallCommand, { CLI_SPEC } from "@/app/handoff/_components/InstallCommand";

/**
 * Home — landing del sistema de diseño de Subastop.
 * Estilo limpio (shadcn): hero centrado + dos entradas claras (Componentes / Bloques).
 */

export default function Home(): JSX.Element {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#0f172a",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header active="home" />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "96px 24px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: 0,
            maxWidth: 760,
          }}
        >
          Building Blocks
          <br />
          for{" "}
          <span
            style={{
              background: "linear-gradient(90deg, oklch(0.72 0.16 55) 0%, oklch(0.55 0.22 285) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Subastop
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#64748b",
            lineHeight: 1.6,
            margin: "24px 0 0",
            maxWidth: 520,
          }}
        >
          Componentes y bloques listos para copiar. Diseño y código sincronizados, sin fricción.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/components"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 10,
              background: "#0f172a",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ver componentes
          </a>
          <a
            href="/blocks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 10,
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ver bloques
          </a>
        </div>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontWeight: 500 }}>
            Conecta tu IA al design system:
          </p>
          <InstallCommand command={`npx ${CLI_SPEC} skill`} />
        </div>
      </main>
    </div>
  );
}
