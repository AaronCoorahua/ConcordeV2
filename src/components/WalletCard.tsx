/**
 * WalletCard — Mi billetera del riel de Mi Garaje (/blocks/mi-garaje/m/vmc, bajo Publica/Valoriza). Tarjeta violeta con el
 * ícono de vidrio «billetera», «Mi billetera» y el enlace «Transacciones», los saldos en dos columnas (Saldo y SubasCoins con
 * el signo >S<) y «Adquiere SubasCoins»; una luz blanca la cruza en diagonal cada 7 s. No es WalletBalanceCard (la tarjeta
 * clara de Zona): es otra pieza, oscura y del ancho del riel.
 * Depende de React, Vidrio y Button.
 */
import type { JSX } from "react";
import { Vidrio } from "@/src/components/Vidrio";
import Button from "@/src/components/Button";

export const WALLET_CARD_CSS = String.raw`
.f-wallet { position:relative; isolation:isolate; overflow:hidden; display:grid; gap:16px; padding:20px; border-radius:20px; color:#fff;
  background:linear-gradient(116deg,#5A35C2 0%,#2E0F70 55%,#100030 100%); box-shadow:0 18px 44px rgba(34,0,92,.28); }
.f-wallet::before { content:""; position:absolute; z-index:-1; width:280px; height:280px; right:-110px; top:-130px; border-radius:50%;
  background:radial-gradient(closest-side, rgba(237,137,54,.32), rgba(132,96,229,.10) 60%, transparent); }
.f-wallet header { display:flex; justify-content:space-between; align-items:center; }
.f-wallet h2 { margin:0; font-size:1.0625rem; font-weight:700; }
.f-wallet header a { display:inline-flex; align-items:center; gap:2px; font-size:.8125rem; font-weight:700; color:#FDD8A4; text-decoration:none; }
.f-wallet header a .g-chev { color:#FDD8A4; }
.f-wallet header a:hover { color:#fff; }
.f-wallet header a:focus-visible { outline:2px solid #fff; outline-offset:2px; border-radius:4px; }
.f-wallet__bal { margin:0; display:grid; grid-template-columns:1.25fr 1fr; }
.f-wallet__bal div { display:grid; gap:2px; }
.f-wallet__bal div + div { padding-left:16px; border-left:1px solid rgba(255,255,255,.18); }
.f-wallet__bal dt { font-size:.75rem; color:#CFBAFF; }
.f-wallet__bal dd { margin:0; font-size:1.75rem; line-height:1.15; font-weight:800; letter-spacing:-0.02em; font-variant-numeric:tabular-nums; white-space:nowrap; }
.f-wallet__bal div + div dd { font-size:1.375rem; padding-top:4px; }
.f-wallet__bal dd small { font-size:.8125rem; font-weight:700; color:#E8DEFF; }
.f-wallet > button { justify-self:start; }
.f-wallet { grid-template-rows:auto auto auto 1fr; }
.f-wallet > button { align-self:stretch; width:100%; justify-content:center; height:44px; }
.f-wallet__bal dd { font-size:1.5rem; }
.f-wallet__bal div + div dd { font-size:1.25rem; }
.f-wallet { box-shadow:0 8px 24px rgba(34,0,92,.16); }
.f-wallet__bal dd, .f-wallet__bal div + div dd { font-size:1.5rem; font-weight:800; }
.f-wallet__bal dd small { font-size:.875rem; font-weight:600; }
.f-wallet h2 { font-size:1.125rem; font-weight:800; }
.f-wallet .psec { width:100%; font-size:.9375rem; white-space:nowrap; gap:8px; }
.f-wallet .psec svg { width:20px; height:20px; flex:none; }
.f-wallet .f-wallet__acquire-circle { flex:none; display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:rgba(255,255,255,.34); box-shadow:inset 0 0 0 1px rgba(255,255,255,.32),0 1px 3px rgba(34,0,92,.18); color:#fff; font-family:var(--vmc-font-mono,ui-monospace,monospace); font-size:10px; font-weight:800; letter-spacing:-.04em; line-height:1; text-shadow:0 1px 2px rgba(34,0,92,.42); }
.f-wallet header a { font-size:.875rem; font-weight:600; }
.f-wallet__bal dt { font-size:.75rem; font-weight:400; }
.f-wallet { gap:0; padding:20px 20px 18px; }
.f-wallet header { margin-bottom:16px; }
.f-wallet header a { font-size:.8125rem; font-weight:600; color:rgba(255,255,255,.72); }
.f-wallet header a .g-chev { color:currentColor; }
.f-wallet header a:hover { color:#fff; }
.f-wallet__bal { grid-template-columns:1fr 1fr; align-items:end; }
.f-wallet__bal dd, .f-wallet__bal div + div dd { font-size:1.5rem; padding-top:0; }
.f-wallet__bal div + div { padding-left:20px; }
.f-wallet__bal { padding-bottom:20px; border-bottom:1px solid rgba(255,255,255,.14); }
.f-wallet > button { margin-top:18px; }
.f-wallet { background:linear-gradient(160deg,#3B1782 0%,#22005C 100%); }
.f-wallet::before { display:none; }
@media (min-width:1024px) { .f-wallet { padding:16px; gap:12px; border-radius:16px; } }
@media (min-width:1024px) { .f-wallet h2 { font-size:.9375rem; font-weight:800; } }
@media (min-width:1024px) { .f-wallet a, .f-wallet h2 + * { font-size:.75rem; } }
@media (min-width:1024px) { .f-wallet__bal dd, .f-wallet__bal div + div dd { font-size:1.125rem; padding-top:0; } }
@media (min-width:1024px) { .f-wallet__bal dd small { font-size:.75rem; } }
@media (min-width:1024px) { .f-wallet__bal div + div { padding-left:12px; } }
@media (min-width:1024px) { .f-wallet .psec { font-size:.875rem; } }
@media (min-width:1024px) { .f-wallet { grid-template-rows:none; align-content:start; } }
@media (min-width:1024px) { .f-wallet__bal { padding-bottom:12px; } }
.f-wallet h2 { display:flex; align-items:center; gap:8px; }
.f-wallet .vd { --solid:#ED8936; --glass:#CFBAFF; }
@media (min-width:1024px) { .f-wallet { background:linear-gradient(116deg,#5A35C2 0%,#2E0F70 55%,#100030 100%); box-shadow:0 12px 32px rgba(34,0,92,.28); } }
@media (min-width:1024px) { .f-wallet::before { display:block; } }
@media (min-width:1024px) { .f-wallet h2 { font-size:1rem; font-weight:700; } }
@media (min-width:1024px) { .f-wallet header a { font-size:.75rem; font-weight:600; } }
@media (min-width:1024px) { .f-wallet__bal dt { font-size:.75rem; font-weight:400; } }
@media (min-width:1024px) { .f-wallet__bal dd, .f-wallet__bal div + div dd { font-size:1.125rem; font-weight:700; } }
@media (min-width:1024px) { .f-wallet__bal dd small { font-size:.75rem; font-weight:600; } }
@media (min-width:1024px) { .f-wallet .psec { font-size:.875rem; font-weight:600; } }
@media (min-width:1024px) { .f-wallet { gap:16px; } }
@media (min-width:1024px) { .f-wallet header { margin:0; } }
@media (min-width:1024px) { .f-wallet__bal { padding-bottom:16px; } }
@media (min-width:1024px) { .f-wallet .psec { margin:0; } }
@media (min-width:1024px) { .f-wallet { border-radius:8px; } }
@media (min-width:1024px) { .f-wallet h2 .vd { width:28px; height:28px; } }
@media (min-width:1024px) { .f-wallet { background:radial-gradient(92% 68% at 20% -24%,rgba(174,142,255,.26) 0%,rgba(132,96,229,.10) 42%,transparent 76%),radial-gradient(125% 105% at 54% 122%,rgba(244,172,89,.32) 0%,rgba(237,137,54,.13) 36%,transparent 72%),linear-gradient(145deg,#5A35C2 0%,#3B1782 52%,#22005C 100%); } }
@media (min-width:1024px) { .f-wallet::before { display:none; } }
@media (min-width:1024px) { .f-wallet header { min-height:28px; align-items:center; } }
@media (min-width:1024px) { .f-wallet header :is(h2,a) { align-self:center; margin-block:0; } }
/* Brillo de carta (la elegida para Mi Garaje): una luz blanca cruza la tarjeta en diagonal (3,5 s de pasada, cada 7 s). */
.f-wallet header a .g-chev { color:currentColor; }
.f-wallet header a { text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1px; }
.f-wallet h2 { font-size:1.125rem; font-weight:800; }
.f-wallet header a { color:#fff; font-size:.8125rem; font-weight:700; }
.f-wallet__beam { display:none; }
.f-wallet header a:hover { color:#fff; text-decoration:underline; text-underline-offset:3px; }
.f-wallet__sign { margin-right:5px; font-size:.62em; font-weight:700; letter-spacing:0; color:#E8DEFF; vertical-align:.1em; }
.f-wallet__shine { display:block; position:absolute; z-index:2; left:-50%; top:-50%; width:200%; height:200%; pointer-events:none;
  background:linear-gradient(135deg, transparent 40%, rgba(255,255,255,.06) 44%, rgba(255,255,255,.22) 47%, rgba(255,255,255,.55) 50%, rgba(255,255,255,.22) 53%, rgba(255,255,255,.06) 56%, transparent 60%);
  mix-blend-mode:screen; transform:translate(-50%, -50%); animation:f-wallet-card 7s cubic-bezier(.45,0,.25,1) .4s infinite; }
.f-wallet { box-shadow:0 0 0 1px rgba(207,186,255,.3), 0 12px 32px rgba(34,0,92,.28); }
@keyframes f-wallet-card { 0% { transform:translate(-50%, -50%); } 50%, 100% { transform:translate(50%, 50%); } }
`;

export interface WalletCardProps {
  /** Saldo en dólares, sin centavos (p. ej. «320»). */
  balance: string;
  /** SubasCoins (p. ej. «1,250»). */
  subasCoins: string;
  /** Destino de «Transacciones». */
  transactionsHref: string;
}

const Chevron = () => <svg className="g-chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function WalletCard({ balance, subasCoins, transactionsHref }: WalletCardProps): JSX.Element {
  return <>
    <style href="concorde-wallet-card" precedence="default">{WALLET_CARD_CSS}</style>
    <section className="f-wallet vd-host" aria-labelledby="f-wallet">
      <i className="f-wallet__shine" aria-hidden /><i className="f-wallet__beam" aria-hidden />
      <header><h2 id="f-wallet"><Vidrio s="billetera" size={32} />Mi billetera</h2><a href={transactionsHref}>Transacciones <Chevron /></a></header>
      <dl className="f-wallet__bal">
        <div><dt>Saldo</dt><dd>US$ {balance}<small>.00</small></dd></div>
        <div><dt>SubasCoins</dt><dd><small className="f-wallet__sign">&gt;S&lt;</small>{subasCoins}</dd></div>
      </dl>
      <Button variant="secondary"><span className="f-wallet__acquire-circle" aria-hidden>&gt;S&lt;</span>Adquiere SubasCoins</Button>
    </section>
  </>;
}

export default WalletCard;
