import type { JSX, ReactNode } from "react";
import AgregarSubascoins, { AGREGARSUBASCOINS_WIDTH, AGREGARSUBASCOINS_HEIGHT } from "@/src/blocks/agregar-subascoins/desktop/AgregarSubascoins";
import TuPerfil, { TUPERFIL_WIDTH, TUPERFIL_HEIGHT } from "@/src/blocks/tu-perfil/desktop/TuPerfil";
import Login from "@/src/blocks/login/desktop/Login";
import { LOGIN_WIDTH, LOGIN_HEIGHT } from "@/src/blocks/login/desktop/dimensions";
import Register from "@/src/blocks/register/desktop/Register";
import { REGISTER_WIDTH, REGISTER_HEIGHT } from "@/src/blocks/register/desktop/dimensions";
import SalaDesktop, { SALA_WIDTH, SALA_HEIGHT } from "@/src/blocks/sala/desktop/SalaDesktop";
import TestSalaMobile from "@/src/blocks/testsala/mobile/SalaMobile";
import { SALAMOBILE_WIDTH as TESTSALA_W, SALAMOBILE_HEIGHT as TESTSALA_H } from "@/src/blocks/testsala/mobile/dimensions";
import Sidebar from "@/src/blocks/sidebar/desktop/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_HEIGHT } from "@/src/blocks/sidebar/desktop/dimensions";
import Header from "@/app/_components/Header";
import { INDEX_SHELL_WIDTH } from "@/src/blocks/index/desktop/dimensions";
import { BLOCKS_NAV } from "@/app/blocks/_components/blocks-nav";

/**
 * /blocks — Catálogo de Bloques (tema claro, mismo estilo que /components).
 * Solo los bloques actuales; las versiones anteriores (Homepage, Detalle v1, Zona) van como enlace en la tarjeta del actual.
 */

interface BlockEntry {
  id: string;
  name: string;
  width: number;
  height: number;
  /** Altura usada sólo para calcular la escala del thumbnail (recorta la vista desde arriba) */
  thumbHeight?: number;
  node: ReactNode;
  /** Ruta de la tarjeta; por defecto /blocks/<id>. */
  href?: string;
}

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

// Agregar Subascoins se compone con el Sidebar pegado a la izquierda (ya trae su
// header). El sidebar corta donde acaba el contenido (NO usamos Math.max con SIDEBAR_HEIGHT).
const AGSC_COMBINED_W = SIDEBAR_WIDTH + AGREGARSUBASCOINS_WIDTH;
const AGSC_COMBINED_H = AGREGARSUBASCOINS_HEIGHT;
const AGSC_COMBINED = (
  <div style={{ display: "flex", alignItems: "flex-start", width: AGSC_COMBINED_W, height: AGSC_COMBINED_H, background: "#ffffff" }}>
    <Sidebar height={AGSC_COMBINED_H} contentHeight={AGSC_COMBINED_H} />
    <AgregarSubascoins />
  </div>
);

// Tu Perfil se compone con el Sidebar pegado a la izquierda (ya trae su header).
// El sidebar corta donde acaba el contenido (NO usamos Math.max con SIDEBAR_HEIGHT).
const TUPERFIL_COMBINED_W = SIDEBAR_WIDTH + TUPERFIL_WIDTH;
const TUPERFIL_COMBINED_H = TUPERFIL_HEIGHT;
const TUPERFIL_COMBINED = (
  <div style={{ display: "flex", alignItems: "flex-start", width: TUPERFIL_COMBINED_W, height: TUPERFIL_COMBINED_H, background: "#ffffff" }}>
    <Sidebar height={TUPERFIL_COMBINED_H} contentHeight={TUPERFIL_COMBINED_H} />
    <TuPerfil />
  </div>
);

const BLOCKS: BlockEntry[] = [
  // Homepage = el bloque Index. Imagen del primer tramo (sacada del render del bloque). El bloque vivo tiene enlaces y no puede ir
  // dentro del <a> de la tarjeta; además así el catálogo no arranca el feed ni carga todas sus fotos.
  { id: "homepage", name: "Homepage", href: "/blocks/index", width: INDEX_SHELL_WIDTH, height: 1000,
    node: <img src="/index/thumb.jpg" alt="" width={INDEX_SHELL_WIDTH} height={1000} style={{ display: "block" }} /> },
  // Detalle: imagen de la pantalla Propuesta (comprador), como Mi Garaje.
  { id: "detalle",  name: "Detalle",  width: 1024, height: 900,
    node: <img src="/detalle/thumb.jpg" alt="" width={1024} height={900} style={{ display: "block" }} /> },
  // Mi Garaje: imagen de la pantalla principal (su CSS es global; el bloque vivo se ve en iframes en /blocks/mi-garaje).
  { id: "mi-garaje", name: "Mi Garaje", width: 1024, height: 900,
    node: <img src="/mi-garaje/thumb.jpg" alt="" width={1024} height={900} style={{ display: "block" }} /> },
  // Landings: imagen del primer tramo (como Index y Mi Garaje).
  { id: "valoriza", name: "Valoriza", width: 1024, height: 900,
    node: <img src="/valoriza/thumb.jpg" alt="" width={1024} height={900} style={{ display: "block" }} /> },
  { id: "vendo-mis-cosas", name: "Vendo Mis Cosas", width: 1024, height: 900,
    node: <img src="/vendo-mis-cosas/thumb.jpg" alt="" width={1024} height={900} style={{ display: "block" }} /> },
  { id: "agregar-subascoins", name: "Agregar Subascoins", width: AGSC_COMBINED_W, height: AGSC_COMBINED_H, node: AGSC_COMBINED },
  { id: "tu-perfil", name: "Tu Perfil", width: TUPERFIL_COMBINED_W, height: TUPERFIL_COMBINED_H, node: TUPERFIL_COMBINED },
  { id: "login",    name: "Login",    width: LOGIN_COMBINED_W, height: LOGIN_COMBINED_H, node: LOGIN_COMBINED },
  { id: "register", name: "Register", width: REGISTER_COMBINED_W, height: REGISTER_COMBINED_H, node: REGISTER_COMBINED },
  { id: "sala",     name: "Sala",     width: SALA_WIDTH,     height: SALA_HEIGHT,     node: <SalaDesktop /> },
  { id: "testsala", name: "Test Sala", width: TESTSALA_W,    height: TESTSALA_H,      node: <TestSalaMobile /> },
  { id: "sidebar",  name: "Sidebar",  width: SIDEBAR_WIDTH,  height: SIDEBAR_HEIGHT,
    /* El sidebar mide 226×1042 → scale normal ≈ 0.22 → 49px ancho (invisible).
       Con thumbHeight 214 el scale sube a ~1.06 → thumbnail 240×227px mostrando header + nav items */
    thumbHeight: 214,
    node: <Sidebar /> },
];

const THUMB_H = 260;

export default function BlocksPage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "var(--ui-ink)", fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)" }}>
      <Header active="blocks" />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ui-ink)", margin: 0 }}>Bloques</h1>
          <span style={{ fontSize: 13, color: "var(--ui-muted)", fontWeight: 500 }}>{BLOCKS.length} bloques</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {BLOCKS.map(function renderBlock(b) {
            const th = b.thumbHeight ?? b.height;
            const scale = Math.min((THUMB_H - 32) / th, 240 / b.width);
            const older = BLOCKS_NAV.find((n) => n.id === b.id)?.versions?.slice(1) ?? [];
            return (
              <div key={b.id} className="blk-card" style={{ display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", background: "#ffffff", border: "1px solid var(--ui-border)", transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease" }}>
              <a href={b.href ?? `/blocks/${b.id}`} style={{ display: "flex", flexDirection: "column", flex: 1, textDecoration: "none" }}>
                <div style={{ height: THUMB_H, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ui-subtle)", borderBottom: "1px solid var(--ui-border-soft)" }}>
                  <div style={{ width: b.width * scale, height: th * scale, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 6px 18px rgba(15,23,42,0.12)", outline: "1px solid var(--ui-border)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: b.width, height: b.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                      {b.node}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
                  <span className="blk-name" style={{ fontSize: 14, fontWeight: 700, color: "var(--ui-ink)", letterSpacing: "-0.01em" }}>{b.name}</span>
                  <span className="blk-arrow" aria-hidden="true" style={{ fontSize: 15, color: "var(--ui-border-hover)" }}>→</span>
                </div>
              </a>
              {older.length ? (
                <div style={{ padding: "0 18px 14px", marginTop: -6, fontSize: 12, color: "var(--ui-muted)" }}>
                  Versiones anteriores:{" "}
                  {older.map((v, i) => (
                    <span key={v.href}>{i ? " · " : ""}<a href={v.href} className="blk-old">{v.label}{v.note ? ` (${v.note})` : ""}</a></span>
                  ))}
                </div>
              ) : null}
              </div>
            );
          })}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .blk-card:hover { box-shadow: 0 8px 30px -8px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.05); border-color: var(--ui-border-hover); transform: translateY(-2px); }
        .blk-card:hover .blk-name { color: var(--ui-accent); }
        .blk-old { color: var(--ui-body); text-decoration: underline; text-decoration-color: var(--ui-border-hover); text-underline-offset: 2px; }
        .blk-old:hover { color: var(--ui-accent); }
        .blk-card:hover .blk-arrow { color: var(--ui-accent); transform: translateX(3px); transition: color 0.2s ease, transform 0.2s ease; }
      `}} />
    </div>
  );
}
