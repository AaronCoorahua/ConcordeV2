"use client";

/**
 * SidebarHeader — 226×60 · logo + botón colapsar
 * Fuente: Figma VOYAGER · "SideBarDefault" (header superior)
 * Icono hamburguesa: 3 líneas con gradiente CFBAFF→white→AE8EFF→CFBAFF
 */

import { useId } from "react";
import type { JSX, ReactNode } from "react";

const STYLE_ID = "concorde-sbheader-styles";
const STYLES = `
.psb-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  flex-shrink: 0;
  transition: background 0.15s;
}
.psb-toggle:hover { background: rgba(255,255,255,0.08); }
.psb-toggle:active { background: rgba(255,255,255,0.14); }
.psb-toggle:focus-visible { outline: 2px solid #8460E5; outline-offset: 2px; }
.sbh-logo {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
  opacity: 1;
  max-width: 200px;
  transition: opacity 0.18s ease, max-width 0.28s cubic-bezier(0.4,0,0.2,1);
}
.sbh-logo--collapsed {
  opacity: 0;
  max-width: 0;
}
@media (prefers-reduced-motion: reduce) {
  .psb-toggle, .sbh-logo { transition: none; }
}
`;

let _injected = false;

export interface SidebarHeaderProps {
  /** Slot para el logo de la aplicación */
  logo?: ReactNode;
  /** Estado colapsado del sidebar */
  collapsed?: boolean;
  /** Handler del botón hamburguesa */
  onToggle?: () => void;
}

export default function SidebarHeader({ logo, collapsed = false, onToggle }: SidebarHeaderProps): JSX.Element {
  const uid = useId().replace(/:/g, "-");

  if (typeof document !== "undefined" && !_injected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    _injected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        data-slot="sidebar-header"
        style={{
          width: "100%",
          height: 60,
          display: "flex",
          alignItems: "center",
          paddingLeft: collapsed ? 20 : 14,
          paddingRight: collapsed ? 20 : 14,
          gap: 8,
          flexShrink: 0,
          boxSizing: "border-box",
          transition: "padding 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Botón colapsar */}
        <button
          type="button"
          className="psb-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          aria-expanded={!collapsed}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M2.75 5.5H19.25"  stroke={`url(#${uid}g0)`} strokeWidth="1.83333" strokeLinecap="round"/>
            <path d="M2.75 11H19.25"   stroke={`url(#${uid}g1)`} strokeWidth="1.83333" strokeLinecap="round"/>
            <path d="M2.75 16.5H19.25" stroke={`url(#${uid}g2)`} strokeWidth="1.83333" strokeLinecap="round"/>
            <defs>
              <linearGradient id={`${uid}g0`} x1="5.708" y1="4.866"  x2="6.637" y2="9.202"  gradientUnits="userSpaceOnUse">
                <stop stopColor="#CFBAFF"/><stop offset="0.35" stopColor="white"/>
                <stop offset="0.65" stopColor="#AE8EFF"/><stop offset="1" stopColor="#CFBAFF"/>
              </linearGradient>
              <linearGradient id={`${uid}g1`} x1="5.708" y1="10.366" x2="6.637" y2="14.702" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CFBAFF"/><stop offset="0.35" stopColor="white"/>
                <stop offset="0.65" stopColor="#AE8EFF"/><stop offset="1" stopColor="#CFBAFF"/>
              </linearGradient>
              <linearGradient id={`${uid}g2`} x1="5.708" y1="15.866" x2="6.637" y2="20.202" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CFBAFF"/><stop offset="0.35" stopColor="white"/>
                <stop offset="0.65" stopColor="#AE8EFF"/><stop offset="1" stopColor="#CFBAFF"/>
              </linearGradient>
            </defs>
          </svg>
        </button>

        {/* Slot del logo */}
        <div className={`sbh-logo${collapsed ? " sbh-logo--collapsed" : ""}`}>
          {logo ?? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/logo-preview.png"
              alt="Subastop"
              style={{ height: 22, width: "auto", display: "block", flexShrink: 0 }}
            />
          )}
        </div>
      </div>
    </>
  );
}
