"use client";

/**
 * BidPosition — Generado por Concorde
 * Fuente: Figma VOYAGER · "ConsolePositions" (2934:14554) +
 *         "Background+Border" (3188:11944 live · 3188:11955 vault)
 *
 * Tabla de posiciones de pujas: card morada (radio 16, borde gradiente, sombra)
 * con header de columnas (PUESTO · USUARIO · BIDS, decodificado del SVG) y N
 * filas tipo pastilla en grid de 3 columnas:
 *   · 1ª posición  → live (naranja #FF9639→#BE3D00, borde gradiente, trofeo dorado)
 *   · resto        → vault (morado #19004A→#3B1782→#2E0F70, borde #99A1AF)
 * Colores/gradientes/sombras copiados tal cual del SVG. Texto = data (`positions`),
 * porque en el SVG los textos son glifos vectorizados (placeholder), no editables.
 */

import type { JSX } from "react";

export interface BidPositionItem {
  /** Usuario / nombre (columna central) */
  name: string;
  /** Nº de bids (columna derecha) */
  value: string;
  /** Override del ordinal (default: índice + "°") */
  rank?: string;
}

export interface BidPositionProps {
  /** Encabezado columna izquierda (default "PUESTO") */
  rankLabel?: string;
  /** Encabezado columna central (default "C.U.U.") */
  nameLabel?: string;
  /** Encabezado columna derecha (default "BIDS") */
  bidsLabel?: string;
  /** Posiciones (la 1ª es live, el resto vault) */
  positions?: BidPositionItem[];
  className?: string;
}

const DEFAULT_POSITIONS: BidPositionItem[] = [
  { name: "JA8NEE", value: "2" },
  { name: "BEKVS1", value: "1" },
  { name: "KAHTH4", value: "1" },
  { name: "KAHTH4", value: "1" },
  { name: "KAHTH4", value: "1" },
];

const STYLE_ID = "concorde-bidposition-styles";

const BIDPOSITION_STYLES = `
.pbidpos {
  box-sizing: border-box;
  width: 313px;
  max-width: 100%;
  border-radius: 16px;
  border: 1px solid transparent;
  background-image:
    linear-gradient(150deg, #5F3ED8 0%, #340091 50%, #140046 100%),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: rgba(0,0,0,0.35) 0px 0px 20px 4px;
  padding: 0 16px 16px;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
/* 3 columnas fijas como el SVG: 78 · 143 · 58 (= 279) */
.pbidpos__head,
.pbidpos__row {
  display: grid;
  grid-template-columns: 78fr 143fr 58fr;
  align-items: center;
}
.pbidpos__head {
  padding: 14px 0 11px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E1E3E2;
}
.pbidpos__head span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffffff;
  white-space: nowrap;
}
.pbidpos__rows { display: flex; flex-direction: column; gap: 8px; }
.pbidpos__row {
  box-sizing: border-box;
  height: 28px;
  border-radius: 14px;
  color: #ffffff;
}
/* alineación por columna (idéntica en header y filas) */
.pbidpos__c1 { text-align: center; }
.pbidpos__c2 { text-align: left; padding-left: 12px; }
.pbidpos__c3 { text-align: center; }
.pbidpos__rank { font-size: 12px; font-weight: 700; }
.pbidpos__value { font-size: 12px; font-weight: 700; white-space: nowrap; }
.pbidpos__name {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding-left: 12px;
}
.pbidpos__nametext {
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pbidpos__trophy { flex-shrink: 0; filter: drop-shadow(0 0 2px rgba(240,187,59,0.65)); }

/* 1ª posición — live (naranja, borde gradiente) */
.pbidpos__row--live {
  border: 1px solid transparent;
  background-image:
    linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
/* resto — vault (morado, borde gris) */
.pbidpos__row--vault {
  border: 1px solid #99A1AF;
  background: linear-gradient(90deg, #19004A 0%, #3B1782 50%, #2E0F70 100%);
}
`;

let _stylesInjected = false;

function Trophy(): JSX.Element {
  return (
    <svg className="pbidpos__trophy" width="14" height="14" viewBox="177.5 80.3 12.5 12" fill="none" aria-hidden="true">
      <path
        d="M187.471 81.1675H180.476V82.3333H178.145V84.0821C178.145 85.3698 179.188 86.4137 180.476 86.4137C180.935 87.6649 182.065 88.5465 183.391 88.6871V90.4941H181.642V91.66H186.305V90.4941H184.557V88.6871C185.882 88.5465 187.012 87.6649 187.471 86.4137C188.759 86.4137 189.803 85.3698 189.803 84.0821V82.3333H187.471V81.1675ZM180.476 85.2479C179.832 85.2479 179.31 84.7259 179.31 84.0821V83.4991H180.476V85.2479ZM188.637 84.0821C188.637 84.7259 188.115 85.2479 187.471 85.2479V83.4991H188.637V84.0821Z"
        fill="#FBC47D"
      />
    </svg>
  );
}

export default function BidPosition({
  rankLabel = "PUESTO",
  nameLabel = "C.U.U.",
  bidsLabel = "BIDS",
  positions = DEFAULT_POSITIONS,
  className = "",
}: BidPositionProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = BIDPOSITION_STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BIDPOSITION_STYLES }} />
      <section className={`pbidpos ${className}`.trim()} aria-label="Posiciones">
        <div className="pbidpos__head">
          <span className="pbidpos__c1">{rankLabel}</span>
          <span className="pbidpos__c2">{nameLabel}</span>
          <span className="pbidpos__c3">{bidsLabel}</span>
        </div>
        <div className="pbidpos__rows">
          {positions.map(function renderPos(p, i) {
            const live = i === 0;
            return (
              <div key={i} className={`pbidpos__row ${live ? "pbidpos__row--live" : "pbidpos__row--vault"}`}>
                <span className="pbidpos__rank pbidpos__c1">{p.rank ?? `${i + 1}°`}</span>
                <span className="pbidpos__name">
                  <span className="pbidpos__nametext">{p.name}</span>
                  {live ? <Trophy /> : null}
                </span>
                <span className="pbidpos__value pbidpos__c3">{p.value}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
