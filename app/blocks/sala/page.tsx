import type { JSX } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import CodeViewer from "@/app/handoff/_components/CodeViewer";
import Topbar from "@/app/blocks/_components/Topbar";
import SalaViewer from "./SalaViewer";

/**
 * /blocks/sala — Visor del bloque Sala a tamaño real (1023 × 1042)
 * + Spec & Handoff (tema claro, igual que /blocks/homepage).
 */

const BASE_URL = process.env.NEXT_PUBLIC_CONCORDE_URL ?? "https://concorde-v2-theta.vercel.app";

function readSrc(rel: string): string {
  try {
    return readFileSync(join(process.cwd(), rel), "utf8");
  } catch {
    return `// No se pudo leer ${rel} en build.`;
  }
}

interface RequiredComponent {
  name: string;
  path: string;
  role: string;
}

const REQUIRED: RequiredComponent[] = [
  { name: "AvatarZone", path: "/handoff/avatarzone", role: "Avatar del usuario en el ConsoleHeader (Mi C.U.U.)" },
  { name: "PriceBadge", path: "/handoff/pricebadge", role: "Badge de «Conectados» en el ConsoleHeader" },
  { name: "BadgeStatus", path: "/handoff/badgestatus", role: "Pill de estado (OFERTA) en el ConsoleHeader" },
  { name: "Signal", path: "/handoff/signal", role: "Indicador de conectividad en el ConsoleHeader" },
  { name: "SalaStatus", path: "/handoff/salastatus", role: "Cabecera del visor: vehículo + placa + countdown" },
  { name: "CardViewer", path: "/handoff/cardviewer", role: "Visor de imágenes + filmstrip (envuelve a SalaStatus)" },
  { name: "PriceIcon", path: "/handoff/priceicon", role: "Gema en la card PRECIO BASE" },
  { name: "SendBidIcon", path: "/handoff/sendbidicon", role: "Botón circular en las pills MIS BIDS / BIDS TOTALES" },
  { name: "BidProposal", path: "/handoff/bidproposal", role: "Bid actual (glass, efecto bombilla) encima del chat" },
  { name: "BidMessage", path: "/handoff/bidmessage", role: "Burbujas de mensajes del chat (propuesta / cierra / VMC)" },
  { name: "ProgressBar", path: "/handoff/progressbar", role: "Barra de tiempo de bid (fondo del chat)" },
  { name: "Button", path: "/handoff/button", role: "CTA primary 200×48 (monto) debajo del chat" },
  { name: "BidPosition", path: "/handoff/bidposition", role: "Tabla de posiciones de pujas (debajo del chat)" },
];

const FILES: { filename: string; code: string; note: string }[] = [
  { filename: "src/blocks/Sala/Sala.tsx", code: readSrc("src/blocks/Sala/Sala.tsx"), note: "Lienzo 1023×1042 (#2E0F70) que posiciona todas las secciones: ConsoleHeader, banners, visor + pills y la columna del chat." },
  { filename: "src/blocks/Sala/ConsoleHeader.tsx", code: readSrc("src/blocks/Sala/ConsoleHeader.tsx"), note: "Header 991×64 · AvatarZone + Mi C.U.U. + PriceBadge (conectados) + BadgeStatus (oferta) + Signal (conectividad)." },
  { filename: "src/blocks/Sala/PriceBase.tsx", code: readSrc("src/blocks/Sala/PriceBase.tsx"), note: "Card 272×106 «PRECIO BASE / US$ 5,000» con la gema (PriceIcon)." },
  { filename: "src/blocks/Sala/StatPill.tsx", code: readSrc("src/blocks/Sala/StatPill.tsx"), note: "Pills 156×47 MIS BIDS / BIDS TOTALES con SendBidIcon (variantes naranja/morado)." },
  { filename: "src/blocks/Sala/BidChat.tsx", code: readSrc("src/blocks/Sala/BidChat.tsx"), note: "Un solo panel 316×677 (morado + glass + borde gradiente): los BidMessage son el bg y van hasta arriba, BidProposal (bid actual 280×78) encima, ProgressBar 424×22 sin rounded recortada al panel y botón 200×48 (monto) abajo que dispara el efecto de luz." },
];

export default function SalaBlockPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Topbar active="blocks" right={<a href="/blocks" style={{ fontSize: 13, fontWeight: 600, color: "#4f2ed8", textDecoration: "none" }}>← Bloques</a>} />

      {/* Title (con selectores de luz/efecto) + canvas a tamaño real */}
      <SalaViewer />

      {/* Spec & Handoff */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 40px 80px" }}>
        {/* Añadir a tu proyecto */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Añadir a tu proyecto</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Un solo comando copia el bloque <strong>y sus 13 componentes</strong> a la carpeta <code style={{ color: "#4f2ed8" }}>concorde/</code> de tu proyecto (imports relativos, sin tocar tu config):
        </p>
        <CodeViewer
          code={`npx @subastop/concorde@latest add sala`}
          filename="terminal"
          note={`Suelto: npx @subastop/concorde@latest add bidchat bidposition · o por URL: npx @subastop/concorde@latest add ${BASE_URL}/r/sala.json · Cae en concorde/components/ y concorde/blocks/.`}
        />

        {/* Componentes requeridos */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Componentes requeridos</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Este bloque se compone con estos componentes de Concorde:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12, marginBottom: 36 }}>
          {REQUIRED.map(function renderDep(d) {
            return (
              <a
                key={d.name}
                href={d.path}
                style={{ display: "block", textDecoration: "none", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <code style={{ fontSize: 13, fontWeight: 700, color: "#4f2ed8", fontFamily: "var(--vmc-font-mono, monospace)" }}>{d.name}</code>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>handoff →</span>
                </div>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: "6px 0 0" }}>{d.role}</p>
              </a>
            );
          })}
        </div>

        {/* Código del bloque */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Código del bloque</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px" }}>
          Lienzo del bloque + cada sección. Copia tal cual junto con los componentes de arriba.
        </p>
        {FILES.map(function renderFile(f) {
          return <CodeViewer key={f.filename} code={f.code} filename={f.filename} note={f.note} />;
        })}
      </section>
    </div>
  );
}
