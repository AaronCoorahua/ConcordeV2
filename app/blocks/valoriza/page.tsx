import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import LandingViewer from "@/app/blocks/_components/LandingViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import { VALORIZA_WIDTH, VALORIZA_HEIGHT, VALORIZA_MOBILE_WIDTH, VALORIZA_MOBILE_HEIGHT } from "@/src/blocks/valoriza/desktop/dimensions";

/** /blocks/valoriza — Visor de la landing de Valoriza (escritorio + celular). */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "Button", path: "/handoff/button", role: "CTA principal: Quiero saber cuánto vale, Valorizar mi auto" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "Enlaces de los usos (Valoriza tu auto, Valorízalo antes)" },
  { name: "GlassButton", path: "/handoff/glassbutton", role: "Botones de vidrio sobre fotos (Ver cómo funciona, Valorizar y publicar)" },
  { name: "Vidrio", path: "/handoff/vidrio", role: "Íconos de beneficios y de la fórmula" },
];

const FILES = [
  "src/blocks/valoriza/desktop/Valoriza.tsx",
  "src/blocks/valoriza/desktop/dimensions.ts",
  "src/blocks/landing-shell/desktop/LandingShell.tsx",
  "src/blocks/landing-shell/desktop/LandingShell.module.css",
].map((p) => ({ path: p, code: readSrc(p) }));

export default function ValorizaBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)" }}>
      <Header active="blocks" />
      <LandingViewer id="valoriza" description="Landing de Valoriza: valorización AVT gratis, en un minuto y con fecha."
        src="/blocks/valoriza/embed" width={VALORIZA_WIDTH} height={VALORIZA_HEIGHT}
        mobileWidth={VALORIZA_MOBILE_WIDTH} mobileHeight={VALORIZA_MOBILE_HEIGHT} files={FILES} />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
