import type { JSX } from "react";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";

/**
 * /blocks/sidebar/embed — SOLO el canvas del Sidebar (sin Header ni BlockViewer),
 * pensado para embeberse en un <iframe> (p. ej. la bitácora /reporte).
 * Colapsa/expande con su hamburguesa; sirve para demostrar la transición sin delay.
 */

export default function SidebarEmbedPage(): JSX.Element {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#f4f4f7",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      <Sidebar />
    </div>
  );
}
