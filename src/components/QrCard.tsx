/**
 * QrCard — tarjeta con QR para el vehículo que recibe ofertas, y su impresión en A4 (Mi Garaje, mi-garaje-lab).
 * Tonos: color (degradado de VMC), negro y blanco (para imprimir sin color). Todo escala con `size` (unidad --u).
 * Depende de React y de QrCode (qrcode-generator). El logo va en `logoSrc`.
 */
import type { CSSProperties, JSX, Ref } from "react";
import { qrMatrix } from "@/src/components/QrCode";

export const QR_CARD_CSS = String.raw`
/* --u es la unidad de medida: con 1px la tarjeta mide 200 px de ancho, y todo escala con ella para imprimir */
.qc { --u: 1px; --bg: linear-gradient(110deg, #007F86 0%, #2F62B8 50%, #4E22A9 100%); --on: #fff; --bubble: #fff; --ink: #3B1FA8; --plate: #2A1460;
  position: relative; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: calc(12 * var(--u)); width: calc(200 * var(--u)); padding: calc(16 * var(--u)); overflow: hidden; border-radius: calc(18 * var(--u));
  background: var(--bg); color: var(--on); font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.qc *, .qc *::before, .qc *::after { box-sizing: border-box; }
.qc-hook { margin: 0; font-size: calc(23 * var(--u)); font-weight: 800; line-height: 1.1; text-align: center; white-space: nowrap; }
/* Marco con esquinas de visor */
.qc-frame { position: relative; display: block; width: 100%; padding: calc(12 * var(--u)); }
.qc-frame > i { position: absolute; width: calc(22 * var(--u)); height: calc(22 * var(--u)); border: calc(3 * var(--u)) solid var(--on); }
.qc-frame > i:nth-child(1) { top: 0; left: 0; border-right: 0; border-bottom: 0; border-top-left-radius: calc(6 * var(--u)); }
.qc-frame > i:nth-child(2) { top: 0; right: 0; border-left: 0; border-bottom: 0; border-top-right-radius: calc(6 * var(--u)); }
.qc-frame > i:nth-child(3) { bottom: 0; left: 0; border-right: 0; border-top: 0; border-bottom-left-radius: calc(6 * var(--u)); }
.qc-frame > i:nth-child(4) { bottom: 0; right: 0; border-left: 0; border-top: 0; border-bottom-right-radius: calc(6 * var(--u)); }
/* QR y logo al centro */
.qc-code { position: relative; display: block; }
.qc-mark { display: block; width: 100%; height: auto; border-radius: calc(8 * var(--u)); }
.qc-plate { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; padding: calc(5 * var(--u)) calc(7 * var(--u)); border-radius: calc(6 * var(--u)); background: var(--plate); box-shadow: 0 0 0 calc(3 * var(--u)) #fff; transform: translate(-50%, -50%); }
.qc-logo { display: block; width: calc(44 * var(--u)); height: auto; }
/* Texto de abajo, con cola hacia el QR */
.qc-label { position: relative; display: block; width: 100%; padding: calc(10 * var(--u)) calc(8 * var(--u)); border-radius: calc(12 * var(--u)); background: var(--bubble); color: var(--ink); font-size: calc(14 * var(--u)); font-weight: 800; line-height: 1.15; text-align: center; text-wrap: balance; }
.qc-label::before { content: ""; position: absolute; top: calc(-6 * var(--u)); left: 50%; width: calc(14 * var(--u)); height: calc(14 * var(--u)); margin-left: calc(-7 * var(--u)); background: var(--bubble); transform: rotate(45deg); }
/* Blanco y negro, para impresoras sin color. Negro: fondo lleno. Blanco: gasta poca tinta */
.qc--negro { --bg: #000; --ink: #000; --plate: #000; }
.qc--blanco { --bg: #fff; --on: #000; --bubble: #000; --ink: #fff; --plate: #000; padding: calc(14 * var(--u)); border: calc(2 * var(--u)) solid #000; }
.qc--negro .qc-logo, .qc--blanco .qc-logo { filter: brightness(0) invert(1); }
`;

/** Azulejo blanco con los cuadros del QR transparentes: se ve el color de la tarjeta y el QR queda oscuro sobre claro.
 *  En una tarjeta blanca no habría contraste, así que `ink` pinta esos cuadros. Corrección alta (H) porque el logo tapa el centro. */
function Mark({ value, ink }: { value: string; ink?: string }): JSX.Element {
  const m = qrMatrix(value || " ", "H"), g = 2, t = m.length + g * 2;
  let d = "", dark = "";
  for (let r = 0; r < t; r++) for (let c = 0; c < t; c++) { const cell = `M${c} ${r}h1v1h-1z`; if (m[r - g]?.[c - g]) dark += cell; else d += cell; }
  return <svg className="qc-mark" viewBox={`0 0 ${t} ${t}`} shapeRendering="crispEdges" aria-hidden><path d={d} fill="#fff" />{ink ? <path d={dark} fill={ink} /> : null}</svg>;
}

/** color: degradado de VMC. negro y blanco: para imprimir sin color. */
export type QrTone = "color" | "negro" | "blanco";

export type QrCardProps = {
  /** Link que abre el QR: el de la publicación del vehículo. */
  value: string;
  /** Texto de arriba. */
  hook?: string;
  /** Texto de abajo. */
  label?: string;
  logoSrc?: string;
  tone?: QrTone;
  /** Ancho en px. Todo escala con él. */
  size?: number;
  /** Para pasarle la tarjeta a `printA4`. */
  ref?: Ref<HTMLDivElement>;
  className?: string;
};

export function QrCard({ value, hook = "¡Hey, tú!", label = "Este vehículo recibe ofertas", logoSrc = "/mi-garaje/garage-reference/logo-vmc.svg", tone = "color", size, ref, className = "" }: QrCardProps): JSX.Element {
  return <>
    <style href="concorde-qr-card" precedence="default">{QR_CARD_CSS}</style>
    <div ref={ref} className={`qc${tone === "color" ? "" : ` qc--${tone}`}${className ? ` ${className}` : ""}`} role="img" aria-label={`${hook} ${label}. Código QR de ${value}`}
      style={size ? ({ "--u": `${size / 200}px` } as CSSProperties) : undefined}>
      <p className="qc-hook">{hook}</p>
      <span className="qc-frame"><i /><i /><i /><i />
        <span className="qc-code"><Mark value={value} ink={tone === "blanco" ? "#000" : undefined} /><span className="qc-plate"><img className="qc-logo" src={logoSrc} alt="" /></span></span>
      </span>
      <span className="qc-label">{label}</span>
    </div>
  </>;
}

/** Hoja sin márgenes, para que el navegador no agregue fecha, título ni URL. Mientras se imprime, se oculta el resto de la página. */
const PRINT_CSS = `@page { size: A4; margin: 0; }
.qc-print { display: none; }
@media print {
  html, body { height: auto !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; background: #fff !important; }
  body > :not(.qc-print) { display: none !important; }
  .qc-print { display: grid !important; place-items: center; height: 296mm; }
}`;

/** Imprime la tarjeta sola, centrada en una hoja A4 y a 15 cm de ancho. */
export function printA4(card: HTMLElement): void {
  const clone = card.cloneNode(true) as HTMLElement;
  clone.style.setProperty("--u", "0.75mm");
  const sheet = document.createElement("div");
  sheet.className = "qc-print";
  sheet.append(clone);
  const style = document.createElement("style");
  style.textContent = PRINT_CSS;
  document.head.append(style);
  document.body.append(sheet);
  window.addEventListener("afterprint", () => { style.remove(); sheet.remove(); }, { once: true });
  const logo = clone.querySelector("img"); // espera el logo para que no salga vacío
  (logo ? logo.decode() : Promise.resolve()).catch(() => undefined).then(() => window.print());
}

export default QrCard;
