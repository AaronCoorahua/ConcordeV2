"use client";

/** Selector del estilo de los precios (?b=…). Cambia solo los badges; la versión elegida (?v=…) se mantiene. */
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { BADGE_STYLES, type BadgeStyle } from "@/src/blocks/banners/desktop/LandingSubascarsBadges";

export default function BadgeTabs({ active }: { active: BadgeStyle }): JSX.Element {
  const router = useRouter();
  function pick(id: BadgeStyle): void {
    const u = new URL(location.href);
    u.searchParams.set("b", id);
    router.replace(u.pathname + u.search, { scroll: false });
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "-8px 0 24px" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ui-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Precios</span>
      <div role="tablist" aria-label="Estilo de los precios" style={{ display: "inline-flex", flexWrap: "wrap", gap: 4, padding: 4, borderRadius: 12, background: "var(--ui-subtle)", border: "1px solid var(--ui-border-soft)" }}>
        {BADGE_STYLES.map(function renderTab(b) {
          const on = b.id === active;
          return (
            <button key={b.id} type="button" role="tab" aria-selected={on} onClick={() => pick(b.id)}
              style={{ padding: "7px 12px", border: 0, borderRadius: 9, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                color: on ? "var(--ui-accent)" : "var(--ui-body)", background: on ? "#ffffff" : "transparent",
                boxShadow: on ? "0 1px 3px rgba(15,23,42,0.12), 0 0 0 1px var(--ui-border-soft)" : "none" }}>
              {b.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
