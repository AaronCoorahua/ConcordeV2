import type { JSX } from "react";
import Link from "next/link";
import Header from "@/app/_components/Header";
import VariantesCatalog from "./VariantesCatalog";

/**
 * /correos/variantes — catálogo de los correos que HOY existen en producción,
 * al estilo del home de Concorde-Email: sidebar con buscador y filtro por
 * categoría, correos agrupados por paso del flujo, diagrama de flujo al filtrar
 * y Copy HTML / Abrir en cada card. Nada es maqueta: el HTML sale del renderer
 * real (src/emails/prodEmails.ts + prodEmailTemplates.ts).
 */

export default function VariantesPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <Link
          href="/correos"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ui-body)", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Correos
        </Link>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ui-ink)", margin: 0 }}>Variantes</h1>
        </div>

        <VariantesCatalog />
      </main>
    </div>
  );
}
