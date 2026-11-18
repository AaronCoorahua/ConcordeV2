"use client";

/**
 * IndexMobile — Index en celular (vmc-index-lab, mobileShell · «Opción A»).
 * Drawer de Concorde (SidebarMobile) con hamburguesa + logo en el header, y el mismo bloque Index en una columna:
 * banner, VMC ahora como tarjeta con «Ver más», tiendas, Tipo de oferta, categorías, campaña, venta y empresas.
 * El paso a una columna lo hacen las media queries del bloque, así que se monta a pantalla completa
 * (en el visor de /blocks va dentro de un iframe de 393 × 852).
 */
import { useState } from "react";
import type { JSX } from "react";
import AppHeader from "../../header/desktop/Header";
import SidebarMobile, { SidebarMenuButton } from "../../sidebar/mobile/SidebarMobile";
import Index from "../desktop/Index";
export { INDEX_MOBILE_WIDTH, INDEX_MOBILE_HEIGHT } from "./dimensions";

const MOBILE_CSS = String.raw`
.idx-mobile { min-width: 0; overflow-x: clip; background: #fff; }
.idx-mobile .sbm-root, .idx-mobile [data-block="header"] { width: 100% !important; max-width: 100% !important; box-sizing: border-box; }
.idx-mobile .sbm-root > [data-block="header"] { position: sticky; top: 0; z-index: 8; }
/* Sin barras de scroll visibles (la página y los paneles siguen desplazándose). */
.idx-mobile, .idx-mobile * { scrollbar-width: none; }
.idx-mobile *::-webkit-scrollbar { display: none; width: 0; height: 0; }
`;

export default function IndexMobile({ className = "" }: { className?: string }): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`idx-mobile${className ? ` ${className}` : ""}`}>
      <style href="concorde-index-mobile" precedence="default">{MOBILE_CSS}</style>
      <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen}>
        <AppHeader width="100%" logo={
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
            <img src="/index/brand/logo-voyager.svg" alt="VMC Subastas" style={{ display: "block", width: 96, height: 30, objectFit: "contain" }} />
          </div>
        } />
        <Index feedMore />
      </SidebarMobile>
    </div>
  );
}
