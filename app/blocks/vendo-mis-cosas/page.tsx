import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import LandingViewer from "@/app/blocks/_components/LandingViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import { VENDO_MIS_COSAS_WIDTH, VENDO_MIS_COSAS_HEIGHT, VENDO_MIS_COSAS_MOBILE_WIDTH, VENDO_MIS_COSAS_MOBILE_HEIGHT } from "@/src/blocks/vendo-mis-cosas/desktop/dimensions";

/** /blocks/vendo-mis-cosas — Visor de la landing de Vendo Mis Cosas (escritorio + celular). */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "Button", path: "/handoff/button", role: "CTA principal: Publicar un artículo" },
  { name: "GlassButton", path: "/handoff/glassbutton", role: "Botones de vidrio sobre fotos" },
  { name: "Vidrio", path: "/handoff/vidrio", role: "Íconos de los pasos y de las categorías de artículos" },
];

const FILES = [
  "src/blocks/vendo-mis-cosas/desktop/VendoMisCosas.tsx",
  "src/blocks/vendo-mis-cosas/desktop/dimensions.ts",
  "src/blocks/landing-shell/desktop/LandingShell.tsx",
  "src/blocks/landing-shell/desktop/LandingShell.module.css",
].map((p) => ({ path: p, code: readSrc(p) }));

export default function VendoMisCosasBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)" }}>
      <Header active="blocks" />
      <LandingViewer id="vendo-mis-cosas" description="Landing de Vendo Mis Cosas: publicar artículos (tecnología, hogar, herramientas) en VMC."
        src="/blocks/vendo-mis-cosas/embed" width={VENDO_MIS_COSAS_WIDTH} height={VENDO_MIS_COSAS_HEIGHT}
        mobileWidth={VENDO_MIS_COSAS_MOBILE_WIDTH} mobileHeight={VENDO_MIS_COSAS_MOBILE_HEIGHT} files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
