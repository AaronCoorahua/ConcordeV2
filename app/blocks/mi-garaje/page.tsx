import type { JSX } from "react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import Header from "@/app/_components/Header";
import { type BlockFile } from "@/app/blocks/_components/BlockViewer";
import RequiredComponents, { type RequiredItem } from "@/app/blocks/_components/RequiredComponents";
import MiGarajeViewer from "./MiGarajeViewer";
import MiGarajeComparison from "./MiGarajeComparison";

/**
 * /blocks/mi-garaje — Visor del bloque Mi Garaje (escritorio + celular), la evolución de Zona.
 */

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}
// Todos los archivos del bloque (desktop, lib, avt, mobile), en orden alfabético por carpeta.
function walk(rel: string): string[] {
  const dir = join(process.cwd(), rel);
  try {
    return readdirSync(dir).sort().flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(`${rel}/${n}`) : /\.(tsx?|css)$/.test(n) ? [`${rel}/${n}`] : []));
  } catch {
    return [];
  }
}

const REQUIRED: RequiredItem[] = [
  { name: "PublicationBadge", path: "/handoff/publicationbadge", role: "Estados de Mis publicaciones y chincheta de fijada (nuevo)" },
  { name: "RiskMeter", path: "/handoff/riskmeter", role: "Riesgo del perfil en la cabecera de cuenta (nuevo)" },
  { name: "Countdown", path: "/handoff/countdown", role: "Plazos de negociación y cierres (nuevo)" },
  { name: "TabSelector", path: "/handoff/tabselector", role: "Pestañas de cada sección; nuevo modo bandeja (notificationIndices)" },
  { name: "DetailCard", path: "/handoff/detailcard", role: "Ficha de la propuesta; nuevos banners de Max y mini (assistantBanner, miniBanner)" },
  { name: "Vidrio", path: "/handoff/vidrio", role: "Íconos de vidrio; suma aviso, bolsa, republicar y baja" },
  { name: "Button", path: "/handoff/button", role: "Acciones de las filas, la negociación y los modales" },
  { name: "ProfileButton", path: "/handoff/profilebutton", role: "Enlaces de sección (Ver todas, Ir a…)" },
  { name: "BidMessage", path: "/handoff/bidmessage", role: "Historial de rondas de la negociación" },
  { name: "Signal", path: "/handoff/signal", role: "Señal del resultado de valorización" },
  { name: "Input", path: "/handoff/input", role: "Formularios de valorizar, publicar y dar de baja" },
  { name: "AvatarZone", path: "/handoff/avatarzone", role: "Avatar de la cabecera de cuenta" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Estados En vivo / Próxima" },
];

const FILES: BlockFile[] = [
  ...walk("src/blocks/mi-garaje"),
  "src/blocks/detalle/desktop/Detalle.tsx",
  "src/components/TabSelector.tsx",
  "src/components/DetailCard.tsx",
  "src/components/Vidrio.tsx",
  "src/components/PublicationBadge.tsx",
  "src/components/RiskMeter.tsx",
  "src/components/Countdown.tsx",
].map(function toFile(p) {
  return { path: p, code: readSrc(p) };
});

export default function MiGarajeBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />
      <MiGarajeViewer files={FILES} />
      <MiGarajeComparison />
      <RequiredComponents items={REQUIRED} />
    </div>
  );
}
