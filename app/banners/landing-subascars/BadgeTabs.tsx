"use client";

/**
 * Selectores de la página: pantalla (?d=…, escritorio o mobile) y estilo de los precios (?b=…).
 * Cada uno cambia solo su parámetro; la versión elegida (?v=…) se mantiene.
 */
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { BADGE_STYLES, type BadgeStyle } from "@/src/blocks/banners/desktop/LandingSubascarsBadges";

export type Screen = "desktop" | "mobile";
const SCREENS: { id: Screen; name: string }[] = [{ id: "desktop", name: "Escritorio" }, { id: "mobile", name: "Mobile" }];

function Tabs<T extends string>({ label, param, options, active }: { label: string; param: string; options: { id: T; name: string }[]; active: T }): JSX.Element {
  const router = useRouter();
  function pick(id: T): void {
    const u = new URL(location.href);
    u.searchParams.set(param, id);
    router.replace(u.pathname + u.search, { scroll: false });
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ui-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
      <div role="tablist" aria-label={label} style={{ display: "inline-flex", flexWrap: "wrap", gap: 4, padding: 4, borderRadius: 12, background: "var(--ui-subtle)", border: "1px solid var(--ui-border-soft)" }}>
        {options.map(function renderTab(o) {
          const on = o.id === active;
          return (
            <button key={o.id} type="button" role="tab" aria-selected={on} onClick={() => pick(o.id)}
              style={{ padding: "7px 12px", border: 0, borderRadius: 9, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                color: on ? "var(--ui-accent)" : "var(--ui-body)", background: on ? "#ffffff" : "transparent",
                boxShadow: on ? "0 1px 3px rgba(15,23,42,0.12), 0 0 0 1px var(--ui-border-soft)" : "none" }}>
              {o.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BadgeTabs({ active, screen }: { active: BadgeStyle; screen: Screen }): JSX.Element {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, margin: "-8px 0 24px" }}>
      <Tabs label="Pantalla" param="d" options={SCREENS} active={screen} />
      <Tabs label="Precios" param="b" options={BADGE_STYLES} active={active} />
    </div>
  );
}
