/**
 * VersionSwitch — selector discreto de versiones de un bloque («Versiones: [Actual] [Versión 1]»).
 */

import type { JSX } from "react";

export interface VersionLink {
  label: string;
  href: string;
  note?: string;
  current?: boolean;
}

export default function VersionSwitch({ versions }: { versions: VersionLink[] }): JSX.Element {
  const current = versions.find((v) => v.current);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ui-muted)" }}>Versiones</span>
      <nav aria-label="Versiones del bloque" style={{ display: "flex", gap: 2, background: "var(--ui-border-soft)", borderRadius: 8, padding: 2 }}>
        {versions.map((v) => (
          <a key={v.href} href={v.href} aria-current={v.current ? "page" : undefined}
            style={{ fontSize: 12.5, fontWeight: 600, textDecoration: "none", padding: "4px 12px", borderRadius: 6,
              background: v.current ? "#ffffff" : "transparent", color: v.current ? "#18181b" : "var(--ui-muted)",
              boxShadow: v.current ? "0 0 0 1px var(--ui-border)" : "none" }}>
            {v.label}
          </a>
        ))}
      </nav>
      {current?.note ? <span style={{ fontSize: 12.5, color: "var(--ui-muted)" }}>{current.label} · {current.note}</span> : null}
    </div>
  );
}
