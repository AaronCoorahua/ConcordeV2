/**
 * MobileHeader — Sección del bloque Sala · Mobile (Voyager DS)
 * Fuente: Figma VOYAGER · "Group 4" (header sala mobile · 420×95)
 *
 * NO es componente registrado: es una sección del bloque. Dos bloques cuadrados
 * (sin esquinas redondeadas), pegados:
 *   · Izquierda 310×95 → tarjeta de la sala (gradiente naranja→morado, borde
 *     gradiente). Título + Signal (white) + vendedor + fila de pills.
 *   · Derecha   110×95 → imagen del carro (slot por prop) con borde gradiente y
 *     placa glass.
 * Pills glass 50×22 (reusa StatPill glass). Pill naranja 60×22. Los puntos
 * amarillos del Figma son guías → se ignoran. Copia tal cual del SVG.
 */

"use client";

import type { JSX } from "react";
import Signal from "../../../components/Signal";
import StatPill from "../../../components/StatPill";

export const MOBILEHEADER_WIDTH = 420;
export const MOBILEHEADER_HEIGHT = 95;
const INFO_WIDTH = 310;
const CAR_WIDTH = 110;

// Tarjeta sala (paint0 fill + paint1 borde) — diagonal naranja→morado
const INFO_FILL = "linear-gradient(125deg, #ED8936 0%, #ED8936 40%, #8460E5 100%)";
const INFO_BORDER = "linear-gradient(125deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%)";
// Pill naranja 60×22 (paint8 fill + paint9 borde)
const LIVE_FILL = "linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%)";
const LIVE_BORDER = "linear-gradient(140deg, #FFBC83 0%, rgba(255,255,255,0.45) 40%, #DA6C1E 75%, #FFBC83 100%)";

// Placa glass 54×22 (paint13 fill + paint15 borde lila) · glass real vía máscara
const PLATE_STYLE_ID = "concorde-mh-plate-styles";
const PLATE_STYLES = `
.mh-plate {
  position: relative;
  box-sizing: border-box;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 100%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff;
}
.mh-plate::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(140deg, #CFBAFF 0%, #ffffff 35%, #AE8EFF 65%, #CFBAFF 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
`;
let _plateInjected = false;

export interface MobileHeaderProps {
  /** Título del lote (default "Toyota Etios") */
  title?: string;
  /** Año (default "2021") */
  year?: string;
  /** Etiqueta vendedor (default "Vendedor") */
  sellerLabel?: string;
  /** Nombre del vendedor (default "Autoland") */
  seller?: string;
  /** Imagen del carro — slot por prop (default "/demo/bronco.jpg") */
  carSrc?: string;
  /** Placa (default "ABC123") */
  plate?: string;
  /** Bids del usuario (default "11") */
  myBids?: string;
  /** Bids totales (default "111") */
  totalBids?: string;
  /** Participantes (default "18") */
  people?: string;
  /** Código de la subasta para la pill naranja (default "47292") */
  liveCode?: string;
  className?: string;
}

// Flecha del componente SendBidIcon (ARROW_PATH) renderizada como glyph blanco
function ArrowGlyph(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="15.5 12.5 17 17" fill="none" aria-hidden="true">
      <path
        d="M25.6154 18.0487V14.8164L31.3775 20.5784L25.6154 26.3404V22.9675C21.5399 22.9675 18.5886 24.2324 16.6211 27.1837C17.3237 22.9675 19.8534 18.892 25.6154 18.0487Z"
        fill="#ffffff"
      />
    </svg>
  );
}

// Ícono de grupo de personas — paths exactos del SVG (clip4)
function PeopleGlyph(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="163.66 84.8196 12 12" fill="none" aria-hidden="true">
      <path d="M173.982 91.2559H172.982C173.082 91.5559 173.182 91.8559 173.182 92.1559V95.9559C173.182 96.1559 173.182 96.2559 173.082 96.3559H174.782C175.382 96.3559 175.882 95.8559 175.882 95.2559V93.1559C175.882 92.1559 175.082 91.2559 173.982 91.2559Z" fill="#ffffff" />
      <path d="M166.36 92.1559C166.36 91.8559 166.46 91.5559 166.56 91.2559H165.56C164.46 91.2559 163.66 92.1559 163.66 93.1559V95.2559C163.66 95.8559 164.16 96.3559 164.76 96.3559H166.46C166.36 96.2559 166.36 96.1559 166.36 95.9559V92.1559Z" fill="#ffffff" />
      <path d="M170.991 90.2742H168.791C167.691 90.2742 166.891 91.0742 166.891 92.0742V95.8742C166.891 96.0742 166.991 96.2742 167.191 96.2742H172.591C172.791 96.2742 172.891 96.0742 172.891 95.8742V92.0742C172.891 91.0742 172.091 90.2742 170.991 90.2742Z" fill="#ffffff" />
      <path d="M169.837 84.8196C168.637 84.8196 167.537 85.8196 167.537 87.1196C167.537 87.9196 168.037 88.6196 168.737 89.0196C169.037 89.2196 169.437 89.3196 169.837 89.3196C170.237 89.3196 170.637 89.2196 170.937 89.0196C171.637 88.6196 172.137 87.9196 172.137 87.1196C172.137 85.8196 171.037 84.8196 169.837 84.8196Z" fill="#ffffff" />
      <path d="M166.098 87.1106C165.198 87.1106 164.398 87.9106 164.398 88.8106C164.398 89.7106 165.198 90.5106 166.098 90.5106C166.398 90.5106 166.598 90.4106 166.798 90.3106C167.198 90.2106 167.398 89.9106 167.598 89.6106C167.798 89.3106 167.798 89.1106 167.798 88.8106C167.798 87.9106 167.098 87.1106 166.098 87.1106Z" fill="#ffffff" />
      <path d="M173.483 87.1106C172.483 87.1106 171.783 87.9106 171.783 88.8106C171.783 89.1106 171.783 89.3106 171.983 89.6106C172.183 89.9106 172.383 90.2106 172.783 90.3106C172.983 90.4106 173.183 90.5106 173.483 90.5106C174.383 90.5106 175.183 89.7106 175.183 88.8106C175.183 87.9106 174.383 87.1106 173.483 87.1106Z" fill="#ffffff" />
    </svg>
  );
}

export default function MobileHeader({
  title = "Toyota Etios",
  year = "2021",
  sellerLabel = "Vendedor",
  seller = "Autoland",
  carSrc = "/demo/bronco.jpg",
  plate = "ABC123",
  myBids = "11",
  totalBids = "111",
  people = "18",
  liveCode = "47292",
  className = "",
}: MobileHeaderProps): JSX.Element {
  if (typeof document !== "undefined" && !_plateInjected) {
    if (!document.getElementById(PLATE_STYLE_ID)) {
      const el = document.createElement("style");
      el.id = PLATE_STYLE_ID;
      el.textContent = PLATE_STYLES;
      document.head.appendChild(el);
    }
    _plateInjected = true;
  }

  return (
    <>
      <style id={`${PLATE_STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: PLATE_STYLES }} />
      <div
        className={className}
        data-block-section="mobile-header"
        style={{
          position: "relative",
          width: MOBILEHEADER_WIDTH,
          height: MOBILEHEADER_HEIGHT,
          fontFamily: 'var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif)',
        }}
      >
        {/* Capa fondo: tarjeta sala 310×95 (cuadrada) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            boxSizing: "border-box",
            width: INFO_WIDTH,
            height: MOBILEHEADER_HEIGHT,
            backgroundImage: `${INFO_FILL}, ${INFO_BORDER}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1.5px solid transparent",
            borderRadius: "0 0 0 16px", // rounded en el bottom-left
          }}
        />
        {/* Capa fondo: carro 110×95 (cuadrado, borde gradiente) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            boxSizing: "border-box",
            width: CAR_WIDTH,
            height: MOBILEHEADER_HEIGHT,
            backgroundImage: INFO_BORDER,
            padding: "1.32px",
            borderRadius: "0 0 16px 0", // rounded en el bottom-right
            overflow: "hidden",
          }}
        >
          <img
            src={carSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "0 0 15px 0" }}
          />
        </div>

        {/* Contenido al frente — UNA columna full-width: la fila de pills incluye
            la placa, así pills y placa comparten fila y se alinean exacto */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: MOBILEHEADER_WIDTH,
            height: MOBILEHEADER_HEIGHT,
            boxSizing: "border-box",
            padding: "10px 0 0",
          }}
        >
          {/* Título (Signal va aparte, absoluto, para no inflar la fila) */}
          <div style={{ width: INFO_WIDTH, boxSizing: "border-box", padding: "0 14px" }}>
            <span style={{ fontSize: 17, fontWeight: 800, lineHeight: 1, color: "#ffffff", whiteSpace: "nowrap" }}>
              {title} <span style={{ fontWeight: 500 }}>{year}</span>
            </span>
          </div>

          {/* Vendedor — pegado al título */}
          <span style={{ width: INFO_WIDTH, boxSizing: "border-box", padding: "0 14px", marginTop: 2, fontSize: 14, fontWeight: 600, lineHeight: 1, color: "#ffffff" }}>
            {sellerLabel} <span style={{ color: "rgba(255,255,255,0.6)" }}>{seller}</span>
          </span>

          {/* Signal (white) — absoluto a la derecha; su base alineada con la base de "Vendedor" */}
          <div style={{ position: "absolute", top: 14, left: INFO_WIDTH - 14 - 39 }}>
            <Signal variant="white" width={39} height={29} level={4} title="Conectividad" />
          </div>

          {/* Fila pills full-width: izquierda (3 glass + naranja) · derecha placa */}
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", width: MOBILEHEADER_WIDTH }}>
            {/* Sub-fila izquierda dentro de la tarjeta 310 */}
            <div style={{ display: "flex", alignItems: "center", gap: 9, width: INFO_WIDTH, boxSizing: "border-box", padding: "0 14px" }}>
              <StatPill variant="glass" label="" value={myBids} icon={<ArrowGlyph />} />
              <StatPill variant="glass" label="" value={totalBids} icon={<ArrowGlyph />} />
              <StatPill variant="glass" label="" value={people} icon={<PeopleGlyph />} />
              <span
                style={{
                  boxSizing: "border-box",
                  width: 60,
                  height: 22,
                  marginLeft: "auto",
                  borderRadius: 11,
                  backgroundImage: `${LIVE_FILL}, ${LIVE_BORDER}`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "1px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#ffffff",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {liveCode}
              </span>
            </div>
            {/* Placa centrada sobre el carro (110) — misma fila = mismo nivel */}
            <div style={{ width: CAR_WIDTH, display: "flex", justifyContent: "center" }}>
              <span className="mh-plate">{plate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
