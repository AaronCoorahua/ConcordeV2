/**
 * RequiredComponents — grid limpio de componentes que compone un bloque.
 * Cada card enlaza a la doc del componente.
 */

import type { JSX } from "react";

export interface RequiredItem {
  name: string;
  path: string;
  role: string;
}

export default function RequiredComponents({ items }: { items: RequiredItem[] }): JSX.Element {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 96px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", margin: "0 0 4px" }}>Componentes</h2>
      <p style={{ fontSize: 14, color: "#71717a", margin: "0 0 20px" }}>Este bloque se compone con {items.length} componentes de Subastop.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
        {items.map(function renderItem(d) {
          return (
            <a
              key={d.name}
              href={d.path}
              className="req-card"
              style={{ display: "block", textDecoration: "none", background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 12, padding: "14px 16px", transition: "border-color 0.2s, box-shadow 0.2s" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <code style={{ fontSize: 13.5, fontWeight: 700, color: "#18181b", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{d.name}</code>
                <span style={{ fontSize: 15, color: "#cbd5e1" }} aria-hidden="true">→</span>
              </div>
              <p style={{ fontSize: 12.5, color: "#71717a", lineHeight: 1.5, margin: "6px 0 0" }}>{d.role}</p>
            </a>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.req-card:hover { border-color: #cbd5e1; box-shadow: 0 4px 16px -6px rgba(15,23,42,0.12); }` }} />
    </section>
  );
}
