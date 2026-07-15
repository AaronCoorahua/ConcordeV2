import type { JSX } from "react";
import Header from "@/app/_components/Header";
import { EMAIL_GROUPS, EMAIL_PROD_TOTAL } from "@/src/emails/registry";
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
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="correos" />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 40px 80px" }}>
        <a
          href="/correos"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", marginBottom: 16 }}
        >
          <span aria-hidden="true">←</span> Correos
        </a>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Variantes</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            {EMAIL_GROUPS.length} categorías · {EMAIL_PROD_TOTAL} correos en producción
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 720 }}>
          Los correos que hoy se envían en producción, agrupados por categoría y paso del flujo.
          Busca o filtra por categoría; copia el HTML tal cual (los merge tags{" "}
          <code style={{ fontFamily: "monospace", fontSize: 13, background: "#f1f5f9", padding: "1px 5px", borderRadius: 4 }}>{"{{variable}}"}</code>{" "}
          van literales) o abre el correo para verlo completo con su flujo.
        </p>

        <VariantesCatalog />
      </main>
    </div>
  );
}
