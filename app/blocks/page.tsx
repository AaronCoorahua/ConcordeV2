import type { JSX, ReactNode } from "react";
import Homepage, { HOMEPAGE_WIDTH, HOMEPAGE_HEIGHT } from "@/src/blocks/homepage/desktop/Homepage";
import Detalle, { DETALLE_WIDTH, DETALLE_HEIGHT } from "@/src/blocks/detalle/desktop/Detalle";
import Zona, { ZONA_WIDTH, ZONA_HEIGHT } from "@/src/blocks/zona/desktop/Zona";
import Login from "@/src/blocks/login/desktop/Login";
import { LOGIN_WIDTH, LOGIN_HEIGHT } from "@/src/blocks/login/desktop/dimensions";
import Register from "@/src/blocks/register/desktop/Register";
import { REGISTER_WIDTH, REGISTER_HEIGHT } from "@/src/blocks/register/desktop/dimensions";
import SalaDesktop, { SALA_WIDTH, SALA_HEIGHT } from "@/src/blocks/sala/desktop/SalaDesktop";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT } from "@/src/blocks/sidebar/desktop/dimensions";
import Header from "@/app/_components/Header";

/**
 * /blocks — Catálogo de Bloques (tema claro, mismo estilo que /components).
 */

interface BlockEntry {
  id: string;
  name: string;
  width: number;
  height: number;
  /** Altura usada sólo para calcular la escala del thumbnail (recorta la vista desde arriba) */
  thumbHeight?: number;
  node: ReactNode;
}

// Homepage se compone con el Sidebar pegado a la izquierda (homepage arranca bajo el header del sidebar)
const HP_SIDEBAR_HEADER_H = 60;
const HP_COMBINED_W = SIDEBAR_WIDTH + HOMEPAGE_WIDTH;
const HP_COMBINED_H = Math.max(SIDEBAR_HEIGHT, HP_SIDEBAR_HEADER_H + HOMEPAGE_HEIGHT);

// Layout flex: al colapsar el Sidebar su width se anima y el Homepage lo sigue (queda pegado).
const HOMEPAGE_COMBINED = (
  <div style={{ display: "flex", alignItems: "flex-start", width: HP_COMBINED_W, height: HP_COMBINED_H, background: "#ffffff" }}>
    <Sidebar />
    <div style={{ marginTop: HP_SIDEBAR_HEADER_H, flexShrink: 0 }}>
      <Homepage />
    </div>
  </div>
);

// Zona se compone con el Sidebar pegado a la izquierda (la Zona ya trae su header)
const ZONA_COMBINED_W = SIDEBAR_WIDTH + ZONA_WIDTH;
const ZONA_COMBINED_H = Math.max(SIDEBAR_HEIGHT, ZONA_HEIGHT);
const ZONA_COMBINED = (
  <div style={{ display: "flex", alignItems: "flex-start", width: ZONA_COMBINED_W, height: ZONA_COMBINED_H, background: "#ffffff" }}>
    <Sidebar height={ZONA_COMBINED_H} />
    <Zona />
  </div>
);

// Login se compone con el Sidebar pegado a la izquierda (el Login ya trae su header).
// A diferencia de los demás bloques, el Login es más corto que el Sidebar (837 vs
// 1171): NO usamos Math.max — el sidebar debe cortar justo donde acaba el Login.
const LOGIN_COMBINED_W = SIDEBAR_WIDTH + LOGIN_WIDTH;
const LOGIN_COMBINED_H = LOGIN_HEIGHT;
const LOGIN_COMBINED = (
  <div style={{ display: "flex", alignItems: "flex-start", width: LOGIN_COMBINED_W, height: LOGIN_COMBINED_H, background: "#ffffff" }}>
    <Sidebar height={LOGIN_COMBINED_H} contentHeight={LOGIN_COMBINED_H} />
    <Login />
  </div>
);

// Register se compone con el Sidebar pegado a la izquierda (el Register ya trae su
// header). Igual que Login: NO usamos Math.max — el sidebar corta donde acaba el contenido.
const REGISTER_COMBINED_W = SIDEBAR_WIDTH + REGISTER_WIDTH;
const REGISTER_COMBINED_H = REGISTER_HEIGHT;
const REGISTER_COMBINED = (
  <div style={{ display: "flex", alignItems: "flex-start", width: REGISTER_COMBINED_W, height: REGISTER_COMBINED_H, background: "#ffffff" }}>
    <Sidebar height={REGISTER_COMBINED_H} contentHeight={REGISTER_COMBINED_H} />
    <Register />
  </div>
);

const BLOCKS: BlockEntry[] = [
  { id: "homepage", name: "Homepage", width: HP_COMBINED_W, height: HP_COMBINED_H, node: HOMEPAGE_COMBINED },
  { id: "detalle",  name: "Detalle",  width: DETALLE_WIDTH,  height: DETALLE_HEIGHT,  node: <Detalle /> },
  { id: "zona",     name: "Zona",     width: ZONA_COMBINED_W, height: ZONA_COMBINED_H, node: ZONA_COMBINED },
  { id: "login",    name: "Login",    width: LOGIN_COMBINED_W, height: LOGIN_COMBINED_H, node: LOGIN_COMBINED },
  { id: "register", name: "Register", width: REGISTER_COMBINED_W, height: REGISTER_COMBINED_H, node: REGISTER_COMBINED },
  { id: "sala",     name: "Sala",     width: SALA_WIDTH,     height: SALA_HEIGHT,     node: <SalaDesktop /> },
  { id: "sidebar",  name: "Sidebar",  width: SIDEBAR_WIDTH,  height: SIDEBAR_HEIGHT,
    /* El sidebar mide 226×1042 → scale normal ≈ 0.22 → 49px ancho (invisible).
       Con thumbHeight 214 el scale sube a ~1.06 → thumbnail 240×227px mostrando header + nav items */
    thumbHeight: 214,
    node: <Sidebar /> },
];

const THUMB_H = 260;

export default function BlocksPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Bloques</h1>
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{BLOCKS.length} bloques</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {BLOCKS.map(function renderBlock(b) {
            const th = b.thumbHeight ?? b.height;
            const scale = Math.min((THUMB_H - 32) / th, 240 / b.width);
            return (
              <a key={b.id} href={`/blocks/${b.id}`} className="blk-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: b.width * scale, height: th * scale, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid #e2e8f0" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: b.width, height: b.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                      {b.node}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
                  <span className="blk-name" style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{b.name}</span>
                  <span className="blk-arrow" aria-hidden="true" style={{ fontSize: 15, color: "#cbd5e1" }}>→</span>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .blk-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: #cbd5e1; transform: translateY(-2px); }
        .blk-card:hover .blk-name { color: #4f2ed8; }
        .blk-card:hover .blk-arrow { color: #4f2ed8; transform: translateX(3px); transition: color 0.2s ease, transform 0.2s ease; }
      `}} />
    </div>
  );
}
