"use client";

/**
 * Sidebar — Generado por Concorde
 * Fuente: Figma VOYAGER · "Nav - Menú principal" (2456:11190) + "Button - Colapsar menú" (2456:11183)
 *
 * Nav lateral oscuro 226px (colapsable a 64px). Header con botón hamburguesa +
 * slot de logo. Lista de secciones, cada una con etiqueta opcional (p.ej.
 * "SOPORTE") e ítems (icono + label + chevron). Ítem activo resaltado.
 * Data-driven y personalizable; controlado o no controlado.
 */

import { useId, useState } from "react";
import type { JSX, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SidebarItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarSection {
  /** Encabezado de la sección (p.ej. "SOPORTE") */
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  /** Secciones del menú (si se omite, usa el set del diseño) */
  sections?: SidebarSection[];
  /** Contenido del logo en el header (texto, <img>, etc.) */
  logo?: ReactNode;
  /** Colapsado (controlado) */
  collapsed?: boolean;
  /** Colapsado inicial (no controlado) */
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  className?: string;
}

// ─── Iconos (paths exactos del SVG · stroke blanco) ─────────────────────────────

function CalendarIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="20 29.5 22 22" fill="none" aria-hidden="true">
      <path d="M27.3333 31.3333V33.1666M34.6667 31.3333V33.1666M22.75 36.8333H39.25M24.5833 33.1666H37.4167C38.4285 33.1666 39.25 33.9881 39.25 34.9999V47.8333C39.25 48.8451 38.4285 49.6666 37.4167 49.6666H24.5833C23.5715 49.6666 22.75 48.8451 22.75 47.8333V34.9999C22.75 33.9881 23.5715 33.1666 24.5833 33.1666L27.3333 31.3333" stroke="white" strokeWidth="1.60417" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DollarIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="20 93.5 22 22" fill="none" aria-hidden="true">
      <path d="M31 94.4167V114.583M35.5833 98.0834H28.7083C26.9376 98.0834 25.5 99.521 25.5 101.292C25.5 103.062 26.9376 104.5 28.7083 104.5H33.2917C35.0624 104.5 36.5 105.938 36.5 107.708C36.5 109.479 35.0624 110.917 33.2917 110.917H25.5" stroke="white" strokeWidth="1.60417" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="20 157 22 22" fill="none" aria-hidden="true">
      <path d="M31 159.333L33.8325 165.072L40.1666 165.997L35.5833 170.462L36.665 176.768L31 173.789L25.335 176.768L26.4166 170.462L21.8333 165.997L28.1675 165.072L31 159.333Z" stroke="white" strokeWidth="1.60417" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="20 221.5 22 22" fill="none" aria-hidden="true">
      <path d="M22.75 229.75L31 223.333L39.25 229.75V239.833C39.25 240.845 38.4285 241.667 37.4167 241.667H24.5833C23.5715 241.667 22.75 240.845 22.75 239.833V229.75M28.25 241.667V232.5H33.75V241.667" stroke="white" strokeWidth="1.60417" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HelpIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="20 330.5 22 22" fill="none" aria-hidden="true">
      <path d="M31 350.667C36.0592 350.667 40.1666 346.559 40.1666 341.5C40.1666 336.441 36.0592 332.333 31 332.333C25.9408 332.333 21.8333 336.441 21.8333 341.5C21.8333 346.559 25.9408 350.667 31 350.667M28.3325 338.75C28.7775 337.485 30.0699 336.725 31.3916 336.952C32.7132 337.179 33.6786 338.326 33.6766 339.667C33.6766 341.5 30.9266 342.417 30.9266 342.417M31 346.083H31.0091" stroke="white" strokeWidth="1.60417" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon(): JSX.Element {
  return (
    <svg width="9" height="13" viewBox="199 34 8 13" fill="none" aria-hidden="true">
      <path d="M200.625 44.25L204.375 40.5L200.625 36.75" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BurgerIcon(): JSX.Element {
  return (
    <svg width="20" height="16" viewBox="22 23 20 17" fill="none" aria-hidden="true">
      <path d="M23.75 27H40.25" stroke="white" strokeWidth="1.83333" strokeLinecap="round" />
      <path d="M23.75 32.5H40.25" stroke="white" strokeWidth="1.83333" strokeLinecap="round" />
      <path d="M23.75 38H40.25" stroke="white" strokeWidth="1.83333" strokeLinecap="round" />
    </svg>
  );
}

// ─── Set por defecto (del diseño) ───────────────────────────────────────────────

const DEFAULT_SECTIONS: SidebarSection[] = [
  {
    items: [
      { label: "Hoy", icon: <CalendarIcon />, active: true },
      { label: "Tienda", icon: <DollarIcon /> },
      { label: "Categorías", icon: <StarIcon /> },
      { label: "Empresas", icon: <HomeIcon /> },
    ],
  },
  {
    label: "Soporte",
    items: [{ label: "Centro de ayuda", icon: <HelpIcon /> }],
  },
];

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-sidebar-styles";

const SIDEBAR_STYLES = `
.psidebar {
  box-sizing: border-box;
  width: 226px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: linear-gradient(180deg, #2F2173 0%, #271A60 100%);
  color: rgba(255,255,255,0.85);
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
  overflow: hidden;
  transition: width 0.2s ease;
}
.psidebar--collapsed { width: 64px; }
.psidebar__head { display: flex; align-items: center; gap: 12px; height: 56px; padding: 0 6px; }
.psidebar__burger {
  appearance: none; border: none; background: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
  transition: background 0.15s;
}
.psidebar__burger:hover { background: rgba(255,255,255,0.08); }
.psidebar__burger:focus-visible { outline: 2px solid rgba(174,142,255,0.8); outline-offset: 2px; }
.psidebar__logo { display: flex; align-items: center; min-width: 0; white-space: nowrap; font-weight: 700; }
.psidebar--collapsed .psidebar__logo { display: none; }
.psidebar__nav { display: flex; flex-direction: column; gap: 4px; padding-top: 8px; }
.psidebar__section { display: flex; flex-direction: column; gap: 2px; }
.psidebar__sectionlabel {
  margin: 14px 12px 4px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}
.psidebar--collapsed .psidebar__sectionlabel { display: none; }
.psidebar__item {
  box-sizing: border-box;
  display: flex; align-items: center; gap: 12px;
  width: 100%; height: 48px; padding: 0 12px;
  border: 1px solid transparent; border-radius: 0;
  background: none; color: inherit; text-decoration: none; text-align: left;
  font-family: inherit; font-size: 15px; font-weight: 500; line-height: 20px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.psidebar__item:hover { background: rgba(255,255,255,0.06); }
.psidebar__item:focus-visible { outline: 2px solid rgba(174,142,255,0.8); outline-offset: 2px; }
.psidebar__item--active {
  background: rgba(255,255,255,0.07);
  border-color: rgba(174,142,255,0.55);
  color: #ffffff;
}
.psidebar__icon { display: flex; flex-shrink: 0; opacity: 0.65; }
.psidebar__item--active .psidebar__icon { opacity: 1; }
.psidebar__label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.psidebar__chev { display: flex; flex-shrink: 0; opacity: 0.4; }
.psidebar--collapsed .psidebar__label,
.psidebar--collapsed .psidebar__chev { display: none; }
.psidebar--collapsed .psidebar__item { justify-content: center; padding: 0; gap: 0; }
@media (prefers-reduced-motion: reduce) {
  .psidebar, .psidebar__item, .psidebar__burger { transition: none; }
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Sidebar({
  sections = DEFAULT_SECTIONS,
  logo,
  collapsed,
  defaultCollapsed = false,
  onToggle,
  className = "",
}: SidebarProps): JSX.Element {
  const uid = useId().replace(/:/g, "-");
  const controlled = collapsed !== undefined;
  const [internal, setInternal] = useState(defaultCollapsed);
  const isCollapsed = controlled ? collapsed : internal;

  function toggle(): void {
    const next = !isCollapsed;
    if (!controlled) setInternal(next);
    onToggle?.(next);
  }

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = SIDEBAR_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SIDEBAR_STYLES }} />
      <aside className={["psidebar", isCollapsed ? "psidebar--collapsed" : "", className].filter(Boolean).join(" ")}>
        <div className="psidebar__head">
          <button type="button" className="psidebar__burger" onClick={toggle} aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"} aria-expanded={!isCollapsed}>
            <BurgerIcon />
          </button>
          {logo ? <div className="psidebar__logo">{logo}</div> : null}
        </div>

        <nav className="psidebar__nav" aria-label="Menú principal">
          {sections.map((section, si) => (
            <div className="psidebar__section" key={`${uid}-s${si}`}>
              {section.label ? <p className="psidebar__sectionlabel">{section.label}</p> : null}
              {section.items.map((item, ii) => {
                const content = (
                  <>
                    {item.icon ? <span className="psidebar__icon">{item.icon}</span> : null}
                    <span className="psidebar__label">{item.label}</span>
                    <span className="psidebar__chev"><ChevronIcon /></span>
                  </>
                );
                const cls = ["psidebar__item", item.active ? "psidebar__item--active" : ""].filter(Boolean).join(" ");
                const title = isCollapsed ? item.label : undefined;
                if (item.href) {
                  return (
                    <a key={`${uid}-s${si}i${ii}`} href={item.href} className={cls} title={title} aria-current={item.active ? "page" : undefined} onClick={item.onClick}>
                      {content}
                    </a>
                  );
                }
                return (
                  <button type="button" key={`${uid}-s${si}i${ii}`} className={cls} title={title} aria-current={item.active ? "page" : undefined} onClick={item.onClick}>
                    {content}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
