"use client";

/**
 * ProposalModal — modal para enviar la primera propuesta de una oferta Negociable (Mi Garaje, mi-garaje-lab ·
 * /m/vmc-propuesta, botón «¡Vamos a negociar!» del DetailCard). Usa la casa de los modales de Mi Garaje
 * (MODAL_HOUSE_CSS de RepublishModal): tarjeta de 320, × con borde degradado, ícono esmerilado de negociaciones y
 * Button de Concorde. Pasos: monto (campo + teclado numérico + consignación) → confirma → «enviando» →
 * celebración → «Propuesta enviada», que cuenta 5 s y llama a onGo. Se abre desde el punto que se tocó (origin).
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import Button from "@/src/components/Button";
import InfoIcon from "@/src/components/InfoIcon";
import { MODAL_HOUSE_CSS } from "@/src/components/RepublishModal";
import { Vidrio } from "@/src/components/Vidrio";

/** Lo propio del modal de propuesta (campo, teclado, consignación, ronda, monto fijo y «enviada»); la tarjeta viene de MODAL_HOUSE_CSS. */
export const PROPOSAL_MODAL_CSS = String.raw`
.va__input { display:flex; align-items:center; justify-content:center; gap:16px; width:220px; height:56px; margin:8px 0; padding:0 16px; box-sizing:border-box; border:1.5px solid transparent; border-radius:12px;
  background:linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #00CCCC, #8460E5) border-box; box-shadow:0 4px 16px rgba(132,96,229,.18); font-family:var(--vmc-font-mono); font-size:1.25rem; font-weight:700; color:#3B1782; }
.va__input input { width:6ch; border:0; outline:0; background:none; font:inherit; color:inherit; }
.va__input input::placeholder { color:#CFBAFF; }
.va__input:focus-within { box-shadow:0 0 0 3px rgba(132,96,229,.25); }
.vh__input { width:100%; margin:16px 0; justify-content:center; gap:3px; }
.vh__input input { flex:none; width:auto; min-width:1ch; max-width:13ch; field-sizing:content; text-align:left; }
/* El campo usa la misma cifra que Confirma: Plus Jakarta 800 con dígitos tabulares. */
.vh .vh__input { font-family:var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); font-size:1.5rem; font-weight:800; letter-spacing:-.02em; font-variant-numeric:tabular-nums lining-nums; }
.vh .vh__input span { align-self:center; font-size:.75rem; line-height:1; font-weight:700; letter-spacing:.01em; color:#5F5B6B; transform:translateY(-.38rem); }
.vh .vh__input input::placeholder { color:#B4B1BD; }
.vh .vh__input:has(input:not(:placeholder-shown)) span { color:#3B1782; }
/* Ronda: etiqueta blanca con borde lila y progreso de 5 en cian Negociable. */
.vh__round { padding:2px 10px; border-radius:9999px; background:#F5F0FF; color:#5A35C2; font-size:.75rem; font-weight:600; }
.vh .vh__round { display:inline-flex; align-items:center; gap:8px; padding:4px 10px; background:#fff; box-shadow:inset 0 0 0 1px #E8DEFF; color:#3B1782; }
.vh__round i { display:inline-flex; gap:3px; } .vh__round b { width:6px; height:6px; border-radius:50%; background:#E1E3E2; } .vh__round b.is-on { background:#00A8AB; }
.vh .vh__round + h2 { margin-top:12px; }
/* Confirma y Enviada: el monto fijo, centrado, en el marco del campo. */
.vh__ticket { display:flex; align-items:center; width:100%; height:56px; margin:16px 0; padding:0 16px; box-sizing:border-box; border:1.5px solid transparent; border-radius:12px;
  background:linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #00CCCC, #8460E5) border-box; box-shadow:0 4px 16px rgba(132,96,229,.18); }
.vh__amount { display:flex; align-items:baseline; justify-content:flex-start; gap:16px; margin:0; font-family:var(--vmc-font-display, "Plus Jakarta Sans", sans-serif);
  font-size:1.5rem; font-weight:800; line-height:1; letter-spacing:-.02em; font-variant-numeric:tabular-nums lining-nums; color:#3B1782; }
.vh__amount span { font-size:1rem; font-weight:700; letter-spacing:.02em; color:#5F5B6B; }
.vh .vh__ticket { justify-content:center; }
.vh .vh__amount { gap:8px; }
.vh .vh__ticket .vh__amount span { color:#3B1782; }
.vh .vh__ticket + .vh__confirm { max-width:none; margin:0 0 16px; font-size:.6875rem; line-height:1.45; color:#6B6778; text-wrap:balance; }
/* Consignación: la firma Negociable cian → violeta; es contexto, no se edita. */
.vh__fee { position:relative; display:grid; gap:2px; margin:0 0 20px; font-size:.8125rem; color:#5F5B6B; }
.vh__fee b { font-size:1.25rem; font-weight:800; background:linear-gradient(100deg, #008688 0%, #00A8AB 38%, #8460E5 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
.vh__fee-label { display:inline-flex; align-items:center; justify-content:center; gap:3px; }
.vh__fee-info { position:static; display:inline-grid; place-items:center; }
.vh__fee-info > button { display:grid; place-items:center; width:20px; height:20px; padding:0; border:0; border-radius:50%; background:none; cursor:pointer; }
.vh__fee-info > button:hover { background:#F5F0FF; }
.vh__fee-info > button:focus-visible { outline:2px solid #8460E5; outline-offset:1px; }
.vh__fee-info [role="tooltip"] { position:absolute; z-index:8; left:50%; top:calc(100% + 8px); width:210px; padding:10px 12px; border:1.5px solid transparent; border-radius:12px; color:#3B1782;
  background:linear-gradient(145deg, rgba(255,255,255,.84), rgba(245,240,255,.64)) padding-box, linear-gradient(135deg, #30E8EC 0%, #8460E5 70%, #CFBAFF 100%) border-box;
  -webkit-backdrop-filter:blur(12px) saturate(145%); backdrop-filter:blur(12px) saturate(145%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.32), 0 10px 26px rgba(34,0,92,.28), 0 3px 10px rgba(0,168,171,.16);
  font-size:.6875rem; font-weight:600; line-height:1.4; text-align:left; opacity:0; visibility:hidden; transform:translate(-50%, -4px) scale(.98); transform-origin:50% 0;
  transition:opacity .16s ease, transform .18s cubic-bezier(.16,1,.3,1), visibility .16s; pointer-events:auto; }
.vh__fee-info [role="tooltip"]::after { content:""; position:absolute; left:50%; top:-6px; width:10px; height:10px; border-top:1.5px solid #30E8EC; border-left:1.5px solid #30E8EC; background:rgba(255,255,255,.8); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); transform:translateX(-50%) rotate(45deg); }
.vh__fee-info:hover [role="tooltip"], .vh__fee-info:focus-within [role="tooltip"] { opacity:1; visibility:visible; transform:translate(-50%, 0); }
/* Teclado numérico: digitación directa con hover/pressed de Concorde (elevación, halo y gradiente Negociable). */
.vh__pinpad { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); width:100%; margin:0 0 16px; box-sizing:border-box; overflow:hidden; border:1px solid #A5ECEE; border-radius:10px; background:#fff; box-shadow:0 3px 12px rgba(0,168,171,.08); }
.vh__pinpad button { position:relative; display:grid; place-items:center; min-width:0; min-height:36px; padding:0; border:0; border-right:1px solid #D6F5F5; border-bottom:1px solid #D6F5F5; background:#fff; color:#3B1782; text-align:center; font:700 1rem/1 var(--vmc-font-display, "Plus Jakarta Sans", sans-serif); cursor:pointer; transform:translateZ(0); transition:color .18s ease, transform .18s cubic-bezier(.25,.8,.25,1), box-shadow .2s ease, border-radius .18s ease; }
.vh__pinpad button:nth-child(3n) { border-right:0; }
.vh__pinpad button:nth-last-child(-n + 3) { border-bottom:0; }
.vh__pinpad button:hover { z-index:2; border-radius:8px; background:linear-gradient(135deg, rgba(0,218,224,.16), rgba(174,142,255,.24)); color:#22005C; transform:translateY(-1px) scale(1.035); box-shadow:inset 0 0 0 1px rgba(0,168,171,.5), 0 5px 14px rgba(90,53,194,.2), 0 2px 7px rgba(0,168,171,.18); }
.vh__pinpad button:active { z-index:3; border-radius:8px; background:linear-gradient(135deg, #008688 0%, #5A35C2 100%); color:#fff; transform:translateY(1px) scale(.96); box-shadow:inset 0 2px 5px rgba(16,0,48,.28), 0 1px 3px rgba(34,0,92,.16); }
.vh__pinpad button:focus-visible { z-index:4; outline:2px solid #8460E5; outline-offset:-2px; border-radius:8px; }
.vh__pinpad .vh__pinpad-back { color:#3B1782; font-size:1.15rem; }
.vh__pinpad .vh__pinpad-back:active { color:#fff; }
/* Volver: outline con el borde cian → violeta de la ×. */
.vh__back2 { width:100%; height:48px; margin-top:12px; padding:0 20px; border:1.5px solid transparent; border-radius:9999px; color:#3B1782; font:inherit; font-size:1rem; font-weight:600; cursor:pointer;
  background:linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#00A8AB 0%,#30E8EC 34%,#8460E5 100%) border-box; transition:background .2s, transform .15s; }
.vh__back2:hover { background:linear-gradient(#F5F0FF,#F5F0FF) padding-box, linear-gradient(135deg,#00A8AB 0%,#30E8EC 34%,#8460E5 100%) border-box; }
.vh__back2:active { transform:scale(.98); } .vh__back2:focus-visible { outline:2px solid #8460E5; outline-offset:2px; }
/* Celebración: el monto se revela con el degradado Negociable. */
.vh h2.vh__celebrate-amount { display:flex; align-items:baseline; gap:7px; margin:4px 0 8px; font-size:2rem; font-weight:800; line-height:1; letter-spacing:-.035em; background:linear-gradient(100deg, #008688 0%, #00A8AB 32%, #8460E5 100%); -webkit-background-clip:text; background-clip:text; color:transparent; animation:vh-celebrate-amount .62s .28s cubic-bezier(.16,1,.3,1) both; }
.vh__celebrate-amount span { font-size:.8rem; letter-spacing:.02em; }
.vh .vh__sent { animation:vh-sent-in .46s cubic-bezier(.16,1,.3,1) both; }
@keyframes vh-celebrate-amount { 0% { opacity:0; transform:translateY(18px) scale(.82); filter:blur(4px); } 65% { opacity:1; transform:translateY(-2px) scale(1.06); filter:blur(.2px); } 100% { transform:none; filter:blur(0); } }
@keyframes vh-sent-in { from { opacity:0; transform:translateY(10px) scale(.975); filter:blur(2px); } to { opacity:1; transform:none; filter:blur(0); } }
@media (prefers-reduced-motion:reduce) { .vh__pinpad button, .vh__fee-info [role="tooltip"] { transition:none; } .vh__celebrate-amount, .vh .vh__sent { animation:none; } }
`;

type Step = "monto" | "confirma" | "procesa" | "celebra" | "celebra-salida" | "enviada";
const PINPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

export interface ProposalModalProps {
  /** Abre (showModal) o cierra el modal. */
  open: boolean;
  /** Vehículo de la oferta, bajo el título (p. ej. «Nissan Sentra 2020»). */
  vehicle: string;
  /** Consignación de la oferta en SubasCoins (>S<). */
  deposit: number;
  /** Punto de la pantalla desde donde «sale» el modal (centro del botón que lo abrió). */
  origin?: { x: number; y: number } | null;
  /** Cerrar sin enviar (×, Escape o clic fuera antes de enviar). */
  onCancel: () => void;
  /** Cerrar el modal ya enviada la propuesta (× o Escape en «Propuesta enviada»). */
  onSend: (amount: number) => void;
  /** «Ir a Mi Garaje»: al tocarlo o al terminar la cuenta de 5 s. */
  onGo: (amount: number) => void;
  /** Al presionar Enviar en Confirma, la validación falla (saldo u oferta): llama a onFail en vez de enviar. */
  fail?: boolean;
  /** Se llama cuando `fail` y la persona presiona Enviar. */
  onFail?: () => void;
}

export function ProposalModal({ open, vehicle, deposit, origin, onCancel, onSend, onGo, fail = false, onFail }: ProposalModalProps): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [amountText, setAmountText] = useState("");
  const val = Number(amountText) || 0;
  const formattedAmount = amountText ? (() => {
    const [whole = "", decimals] = amountText.split(".");
    const grouped = (whole || "0").replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimals === undefined ? grouped : `${grouped}.${decimals}`;
  })() : "";
  const [step, setStep] = useState<Step>("monto");
  const sent = step === "enviada";
  // Enviada: cuenta atrás de 5 s y, al llegar a 0, onGo (el botón salta la espera).
  const [left, setLeft] = useState(5);
  useEffect(() => {
    if (!sent) return;
    const t = setInterval(() => setLeft((n) => n - 1), 1000);
    return () => clearInterval(t);
  }, [sent]);
  useEffect(() => { if (sent && left <= 0) onGo(val); }, [sent, left]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    let timer = 0;
    if (open && !d.open) {
      setAmountText("");
      setStep("monto");
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2 + 24;
      d.style.setProperty("--vh-from-x", `${x - window.innerWidth / 2}px`);
      d.style.setProperty("--vh-from-y", `${y - window.innerHeight / 2}px`);
      d.classList.add("is-origin-open");
      d.showModal();
      timer = window.setTimeout(() => d.classList.remove("is-origin-open"), 720);
    }
    if (!open && d.open) d.close();
    return () => window.clearTimeout(timer);
  }, [open, origin]);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = step === "procesa" ? "celebra" : step === "celebra" ? "celebra-salida" : step === "celebra-salida" ? "enviada" : null;
    if (!next) return;
    const duration = reduced ? 180 : step === "procesa" ? 650 : step === "celebra" ? 1450 : 420;
    const timer = window.setTimeout(() => { if (next === "enviada") setLeft(5); setStep(next); }, duration);
    return () => window.clearTimeout(timer);
  }, [step]);
  const setAmount = (next: string) => setAmountText(next.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1").slice(0, 10));
  const pressKey = (key: string) => {
    setAmountText((current) => key === "back" ? current.slice(0, -1) : key === "." ? (current.includes(".") ? current : `${current || "0"}.`) : `${current}${key}`.slice(0, 10));
    inputRef.current?.focus();
  };
  const close = <button type="button" className="va__x va__x--neg" aria-label="Cerrar" onClick={sent ? () => onSend(val) : onCancel} />;
  const icon = <span className="vd-host vh__icon"><Vidrio s="negociaciones" size={40} /></span>;
  return <>
    <style href="concorde-modal-house" precedence="default">{MODAL_HOUSE_CSS}</style>
    <style href="concorde-proposal-modal" precedence="default">{PROPOSAL_MODAL_CSS}</style>
    <dialog ref={ref} className="va vh" aria-labelledby="vh-title" onClose={sent ? () => onSend(val) : onCancel}>
      {sent ? <div className="va__card vh__sent" role="status">{close}{icon}
        <h2 id="vh-title">Propuesta enviada</h2>
        <div className="vh__ticket"><p className="vh__amount"><span>US$</span>{val.toLocaleString("en-US")}</p></div>
        <p className="vh__sub vh__confirm">Esperando respuesta, expira en 24 horas</p>
        <Button type="button" variant="negotiable" className="vh__btn" autoFocus onClick={() => onGo(val)}>Ir a Mi Garaje ({Math.max(left, 0)})</Button>
      </div> : step === "procesa" ? <div className="va__card vh__processing" role="status" aria-live="polite">{close}
        <div className="vh__loader" aria-hidden><i /><i /><i /></div>
        <h2 id="vh-title">Enviando tu oferta</h2>
        <p className="vh__sub">Estamos registrando tu propuesta…</p>
      </div> : step === "celebra" || step === "celebra-salida" ? <div className={`va__card vh__celebrate${step === "celebra-salida" ? " is-leaving" : ""}`} role="status" aria-live="assertive">{close}
        <div className="vh__celebrate-stage" aria-hidden><i /><i /><i /><i /><i /><i /><i /><i />
          <span className="vh__celebrate-check"><svg width="38" height="38" viewBox="0 0 40 40" fill="none"><path d="M11 20.5l6 6L29.5 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        </div>
        <p className="vh__celebrate-kicker">¡Oferta enviada!</p>
        <h2 id="vh-title" className="vh__celebrate-amount"><span>US$</span>{val.toLocaleString("en-US")}</h2>
        <p className="vh__sub">Estamos registrando tu propuesta…</p>
      </div> : step === "confirma" ? <div className="va__card">{close}{icon}
        <h2 id="vh-title">Confirma tu propuesta</h2>
        <div className="vh__ticket"><p className="vh__amount"><span>US$</span>{val.toLocaleString("en-US")}</p></div>
        <p className="vh__sub vh__confirm">Al enviar la propuesta aceptas las condiciones y términos de uso de nuestro servicio.</p>
        <Button type="button" variant="negotiable" className="vh__btn" autoFocus onClick={() => fail && onFail ? onFail() : setStep("procesa")}>Enviar</Button>
        <button type="button" className="vh__back2" onClick={() => setStep("monto")}>Volver</button>
      </div> : <form className="va__card" aria-describedby="vh-sub" onSubmit={(e) => { e.preventDefault(); if (val) setStep("confirma"); }}>{close}{icon}
        <span className="vh__round">Propuesta 1 de 5<i aria-hidden>{[0, 1, 2, 3, 4].map((i) => <b key={i} className={i < 1 ? "is-on" : ""} />)}</i></span>
        <h2 id="vh-title">¿Cuánto ofreces?</h2>
        <p id="vh-sub" className="vh__sub">{vehicle}</p>
        <label className="va__input vh__input"><span>US$</span><input ref={inputRef} autoFocus inputMode="decimal" placeholder="0" aria-label="Tu propuesta en US$" value={formattedAmount}
          onChange={(e) => setAmount(e.target.value)} /></label>
        <div className="vh__pinpad" role="group" aria-label="Teclado numérico para propuesta">{PINPAD.map((key) =>
          <button key={key} type="button" className={key === "back" ? "vh__pinpad-back" : ""} aria-label={key === "back" ? "Borrar último dígito" : key === "." ? "Separador decimal" : key} onClick={() => pressKey(key)}>{key === "back" ? "⌫" : key}</button>)}</div>
        <p className="vh__fee"><span className="vh__fee-label">Consignación<span className="vh__fee-info"><button type="button" aria-label="¿Qué es la consignación?" aria-describedby="vh-fee-tip"><InfoIcon size={16} /></button><span id="vh-fee-tip" role="tooltip">Es una garantía en SubasCoins que respalda tu propuesta. Si no hay acuerdo, se libera la consignación y vuelve a tu billetera.</span></span></span><b>&gt;S&lt; {deposit}</b></p>
        <Button type="submit" variant="negotiable" className="vh__btn" disabled={!val}>Enviar oferta</Button>
      </form>}
    </dialog>
  </>;
}

export default ProposalModal;
