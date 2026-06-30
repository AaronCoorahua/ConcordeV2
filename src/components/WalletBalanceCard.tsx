"use client";

/**
 * WalletBalanceCard — Generado por Concorde
 * Fuente: Figma VOYAGER · "WalletBalanceCard" (nodo 2020:13635)
 *
 * Tarjeta «Billetera» 375×221 (blanca, radius 16, drop shadow suave):
 *   · Header: CardTitle «BILLETERA» (brackets) + ProfileButton «Transacciones ›»
 *   · Divisor #E1E3E2
 *   · Filas SubasCoins / Saldo (label morado + valor morado bold)
 *   · CTA «Adquiere SubasCoins» (Button sm-guest, círculo + texto, centrado)
 */

import type { JSX, MouseEventHandler } from "react";
import CardTitle from "@/src/components/CardTitle";
import ProfileButton from "@/src/components/ProfileButton";
import Button from "@/src/components/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WalletBalanceCardProps {
  /** Título de la tarjeta (default "BILLETERA"). */
  title?: string;
  /** Valor de SubasCoins (default ">S< 0"). */
  subasCoins?: string;
  /** Valor de Saldo (default "US$ 0"). */
  saldo?: string;
  /** Acción / enlace del acceso «Transacciones». */
  onTransactions?: MouseEventHandler<HTMLElement>;
  transactionsHref?: string;
  /** Click del CTA «Adquiere SubasCoins». */
  onAcquire?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

// ─── Self-contained CSS ───────────────────────────────────────────────────────

const STYLE_ID = "concorde-walletbalancecard-styles";

const STYLES = `
.wbc {
  box-sizing: border-box;
  width: 375px;
  height: 221px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 0 8px 4px rgba(0,0,0,0.08);
  padding: 16px;
  display: flex;
  flex-direction: column;
  font-family: var(--vmc-font-display, "Plus Jakarta Sans", -apple-system, sans-serif);
}
.wbc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.wbc__divider {
  height: 1px;
  background: #E1E3E2;
  margin-top: 8px;
}
.wbc__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 18px;
}
.wbc__rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 4px;
}
.wbc__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wbc__row-label { font-size: 15px; font-weight: 500; color: #3B1782; }
.wbc__row-value { font-size: 15px; font-weight: 700; color: #3B1782; }
.wbc__cta {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-bottom: 4px;
}
/* El CTA usa el Button sm-guest a ancho fijo del diseño (250) con el texto
   (14px) centrado y el círculo anclado a la izquierda. */
.wbc__cta .pvbtn-sm {
  width: 250px;
  justify-content: center;
  position: relative;
}
.wbc__cta .pvbtn-sm .pvbtn-icon {
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
}
`;

let _stylesInjected = false;

// ─── Component ────────────────────────────────────────────────────────────────

export default function WalletBalanceCard({
  title = "BILLETERA",
  subasCoins = ">S< 0",
  saldo = "US$ 0",
  onTransactions,
  transactionsHref,
  onAcquire,
  className = "",
}: WalletBalanceCardProps): JSX.Element {
  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  return (
    <>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section className={["wbc", className].filter(Boolean).join(" ")} data-component="wallet-balance-card">
        {/* Header: título + acceso a transacciones */}
        <div className="wbc__header">
          <CardTitle title={title} subtitle="" titleSize={14} />
          <ProfileButton href={transactionsHref} onClick={onTransactions} aria-label="Transacciones">
            Transacciones
          </ProfileButton>
        </div>

        <div className="wbc__divider" />

        {/* Cuerpo: SubasCoins / Saldo + CTA */}
        <div className="wbc__body">
          <div className="wbc__rows">
            <div className="wbc__row">
              <span className="wbc__row-label">SubasCoins:</span>
              <span className="wbc__row-value">{subasCoins}</span>
            </div>
            <div className="wbc__row">
              <span className="wbc__row-label">Saldo:</span>
              <span className="wbc__row-value">{saldo}</span>
            </div>
          </div>

          <div className="wbc__cta">
            <Button variant="sm-guest" icon={<span aria-hidden="true" />} onClick={onAcquire}>
              Adquiere SubasCoins
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
