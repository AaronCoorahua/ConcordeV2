"use client";

/**
 * LandingShell — marco de las landings de VMC (Valoriza, Vendo Mis Cosas): el mismo del Index.
 * Escritorio: lienzo de 1024 con Sidebar (abierto 226, cerrado 76) y Header; el sidebar empuja al contenido.
 * Bajo 1024 px: Header con hamburguesa y el Sidebar como drawer (SidebarMobile).
 * El contenido se monta dos veces (escritorio y celular) y el CSS muestra uno; `body(id)` recibe "d" o "m"
 * para que los ids del contenido no se repitan.
 */
import { useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";
import Header from "@/src/blocks/header/desktop/Header";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import SidebarMobile, { SidebarMenuButton } from "@/src/blocks/sidebar/mobile/SidebarMobile";
import shell from "./LandingShell.module.css";

export type LandingShellProps = {
  /** Contenido de la columna principal. */
  body: (id: "d" | "m") => ReactNode;
  /** Logo de la marca (por defecto, el de VMC del Index). */
  logoSrc?: string;
};

function BrandLogo({ className, src }: { className: string; src: string }): JSX.Element {
  return <img className={className} src={src} alt="VMC Subastas" />;
}

export default function LandingShell({ body, logoSrc = "/index/brand/logo-voyager.svg" }: LandingShellProps): JSX.Element {
  const [sidebarHeight, setSidebarHeight] = useState(900);
  const [collapsed, setCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const resize = () => setSidebarHeight(Math.max(720, window.innerHeight));
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={shell.root}>
      <div className={shell.desktopShell} data-collapsed={collapsed || undefined}>
        <Header width="100%" />
        <aside className={shell.sidebarRail} aria-label="Navegación de VMC">
          <Sidebar height={sidebarHeight} contentHeight={sidebarHeight} headerHeight={64} logo={<BrandLogo className={shell.brandLogo} src={logoSrc} />}
            collapsed={collapsed} onCollapsedChange={setCollapsed} />
        </aside>
        <main className={shell.mainColumn}>{body("d")}</main>
      </div>
      <div className={shell.mobileShell}>
        <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen}>
          <Header width="100%" logo={
            <div className={shell.mobileBrand}>
              <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
              <BrandLogo className={shell.mobileLogo} src={logoSrc} />
            </div>
          } />
          {body("m")}
        </SidebarMobile>
      </div>
    </div>
  );
}
