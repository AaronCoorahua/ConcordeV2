/**
 * ValuationCard — tarjeta de una valorización guardada (mi-garaje-lab · Mis valorizaciones).
 * Dos formas, según lo que responde:
 *  · Lista para publicar («¿publico ahora?»): valor de mercado con su variación, «Si esperas un año» (lo que perdería con la
 *    proyección AVT a 12 meses), «Señal de venta» (5 puntos) y, al pie, «Ver análisis» y la acción.
 *  · Negociable (publicada o en revisión, «¿cómo va mi venta?»): compacta, borde degradado teal y píldora NEGOCIABLE, con el
 *    valor de mercado, un dato de la publicación y la acción.
 * Es un <li>: va dentro de una lista. Depende de React, Vidrio y StatusTag.
 */
import type { JSX, ReactNode } from "react";
import { Vidrio } from "@/src/components/Vidrio";
import StatusTag, { type StatusTone } from "@/src/components/StatusTag";

export const VALUATION_CARD_CSS = String.raw`
.vz-card { min-width:0; display:grid; grid-template-columns:minmax(0,1fr); align-content:start; gap:20px; padding:24px; border-radius:16px; background:#fff; box-shadow:0 0 16px 4px rgba(0,0,0,.08); }
.vz-card--neg { gap:16px; padding:18px 22px; border:2px solid transparent;
  background:linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#fff 0%,#30E8EC 30%,#5A35C2 70%,#fff 100%) border-box;
  box-shadow:0 0 16px 4px rgba(0,0,0,.08); }
.vz-card .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
.vz-card__head { display:grid; grid-template-columns:64px minmax(0,1fr) auto; align-items:center; gap:14px; }
.vz-card__head h2 { margin:0; font-size:1.0625rem; line-height:1.3; font-weight:700; color:#191C1C; }
.vz-card__head small { display:block; margin-top:2px; font-size:.8125rem; font-weight:500; color:#6B6878; }
.vz-row__pic { display:block; width:64px; height:48px; border-radius:10px; object-fit:cover; }
.vz-row__ico { display:grid; place-items:center; background:#F5F0FF; color:#5A35C2; }
.vz-card--todo .vz-row__ico { background:none; }
.vz-card__tags { display:flex; flex-wrap:wrap; justify-content:flex-end; align-items:center; gap:6px; }
.vz-neg { display:inline-flex; align-items:center; padding:4px 10px; border-radius:9999px; font-size:.625rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:#fff;
  background-image:linear-gradient(135deg,#30E8EC 0%,#00CACE 45%,#008688 100%); box-shadow:rgba(0,134,136,.4) 0 2px 10px, rgba(255,255,255,.14) 0 1px 0 inset; }
/* Lista para publicar */
.vz-card__value { display:grid; gap:4px; }
.vz-card__value small { font-size:.8125rem; font-weight:500; color:#6B6878; }
.vz-card__value b { display:flex; align-items:center; gap:10px; font-size:2rem; line-height:1.1; font-weight:800; letter-spacing:-0.02em; color:#3B1782; font-variant-numeric:tabular-nums; }
.vz-card__value em { font-style:normal; font-size:.75rem; font-weight:700; padding:3px 8px; border-radius:9999px; letter-spacing:0; color:#B25614;
  border:1px solid transparent; background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#F4AC59,#8460E5) border-box; }
.vz-card__value em.is-up { color:#5A35C2; background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#AE8EFF,#8460E5) border-box; }
.vz-card__value span { font-size:.8125rem; font-weight:500; color:#6B6878; font-variant-numeric:tabular-nums; }
.vz-card__facts { margin:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(0,1fr)); gap:8px; }
.vz-card__facts div { display:grid; align-content:start; gap:4px; padding:12px 14px; border-radius:12px; min-width:0;
  border:1px solid transparent; background:linear-gradient(#fff,#fff) padding-box, linear-gradient(335deg,#8460E5 0%,#FFF8F1 100%) border-box; box-shadow:0 0 16px 4px rgba(0,0,0,.05); }
.vz-card__facts dt { font-size:.75rem; font-weight:500; color:#6B6878; }
.vz-card__facts dd { margin:0; display:grid; gap:2px; font-size:.9375rem; line-height:1.25; font-weight:700; color:#3B1782; font-variant-numeric:tabular-nums; }
.vz-card__facts .is-loss dd { color:#B25614; }
.vz-card__facts dd small { font-size:.75rem; font-weight:500; color:#6B6878; }
.vz-nw { white-space:nowrap; }
.vz-sig dd { grid-template-columns:1fr; align-items:center; column-gap:8px; row-gap:4px; white-space:normal; }
.vz-sig dd small { grid-column:1 / -1; white-space:normal; }
.vz-dots { display:inline-flex; gap:3px; }
.vz-sig .vz-dots { margin:2px 0; }
.vz-dots i { width:8px; height:8px; border-radius:50%; background:#ECEAF2; box-shadow:inset 0 1px 2px rgba(34,0,92,.12); }
.vz-dots i.is-on { background:linear-gradient(135deg,#F4AC59 0%,#ED8936 50%,#B25614 100%); box-shadow:0 1px 3px rgba(178,86,20,.35); }
.vz-card__foot { display:grid; grid-template-columns:auto minmax(0,1fr); align-items:center; gap:16px; padding-top:16px; border-top:1px solid #ECEAF2; }
.vz-card__foot > .pvbtn, .vz-card__foot > button:last-child { width:100%; }
/* Negociable (compacta) */
.vz-card__pub { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:16px; padding-top:14px; border-top:1px solid #ECEAF2; }
.vz-card__pub dl { margin:0; display:grid; grid-template-columns:184px minmax(0,1fr); gap:4px 24px; } /* columnas fijas: las compactas se alinean entre sí */
.vz-card__pub dt { font-size:.75rem; font-weight:500; color:#6B6878; }
.vz-card__pub dd { margin:2px 0 0; font-size:.9375rem; font-weight:700; color:#191C1C; font-variant-numeric:tabular-nums; }
.vz-card__go { display:flex; align-items:center; gap:16px; }
.vz-card__go > :last-child { white-space:nowrap; }
.vz-more { all:unset; cursor:pointer; font-size:.875rem; font-weight:700; color:#5A35C2; white-space:nowrap; text-decoration:underline; text-decoration-color:#D9CFF5; text-underline-offset:4px; }
.vz-more:hover { color:#3B1782; text-decoration-color:currentColor; }
.vz-more:focus-visible { outline:2px solid #8460E5; outline-offset:3px; border-radius:4px; }
@media (min-width:720px) {
  .vz-card--todo { grid-template-columns:minmax(0,1.1fr) minmax(0,1.2fr); column-gap:24px; }
  .vz-card--todo .vz-card__head, .vz-card__foot { grid-column:1 / -1; }
  .vz-card__value { align-self:center; }
  .vz-card__foot { grid-template-columns:1fr minmax(240px,auto); } .vz-card__foot .vz-more { justify-self:start; }
}
@media (max-width:640px) {
  .vz-card { padding:18px; gap:16px; } .vz-card--neg { padding:16px; }
  .vz-card__head { grid-template-columns:56px minmax(0,1fr); gap:12px; }
  .vz-card .vz-row__pic { width:56px; height:42px; }
  .vz-card__tags { grid-column:1 / -1; justify-content:flex-start; }
  .vz-card__value b { font-size:1.75rem; }
  .vz-card__facts { grid-template-columns:1fr; }
  .vz-card__foot { grid-template-columns:1fr; } .vz-card__foot .vz-more { order:1; justify-self:center; } /* la acción primero, a ancho completo */
  .vz-card__pub { grid-template-columns:1fr; } .vz-card__pub dl { grid-template-columns:1fr 1fr; gap:4px 16px; } .vz-card__go { flex-direction:column-reverse; align-items:stretch; gap:12px; } .vz-card__go .vz-more { align-self:center; }
}
`;

export interface ValuationCardProps {
  /** Vehículo (p. ej. «Kia Picanto 2017»). */
  title: string;
  /** Versión y kilometraje (p. ej. «EX 1.2 MT · 88,000 km»). */
  subtitle: string;
  /** Foto 64×48 (las que ya pasaron por Publicar). Sin foto, el ícono de vidrio del auto. */
  photo?: string;
  /** Estado de la valorización (p. ej. «Lista para publicar», tono «wait»). */
  status: { tone: StatusTone; label: string };
  /** Publicada o en revisión: tarjeta compacta con borde teal y píldora NEGOCIABLE. */
  negotiable?: boolean;
  /** Rótulo del valor (p. ej. «Valor de mercado al 01/10»). */
  valueLabel: string;
  /** Valor de mercado ya formateado (p. ej. «US$ 8,090»). */
  value: string;
  /** Lista para publicar: % que cambió el valor desde que se guardó (−2 → «−2 %» en naranja). */
  drift?: number;
  /** Lista para publicar: «Si esperas un año», con lo que perdería, lo que valdría y la pérdida por día. */
  waitLoss?: { amount: string; worth: string; perDay?: string };
  /** Lista para publicar: señal de venta AVT (nivel de 1 a 5, etiqueta y bajada). */
  signal?: { level: number; label: string; sublabel: string };
  /** Negociable: un dato de la publicación (p. ej. «Revisión de VMC» · «Pago recibido»). */
  detail?: { label: string; value: string };
  /** Abre el análisis completo («Ver análisis»). */
  onAnalysis: () => void;
  /** Acción principal (Button «Publicar» o «Ver publicación»). */
  action: ReactNode;
}

export function ValuationCard({ title, subtitle, photo, status, negotiable, valueLabel, value, drift, waitLoss, signal, detail, onAnalysis, action }: ValuationCardProps): JSX.Element {
  const styles = <style href="concorde-valuation-card" precedence="default">{VALUATION_CARD_CSS}</style>;
  const head = <header className="vz-card__head">
    {photo ? <img className="vz-row__pic" src={photo} alt="" width={64} height={48} /> : <span className="vz-row__pic vz-row__ico" aria-hidden><Vidrio s="auto" size={40} /></span>}
    <div><h2>{title}</h2><small>{subtitle}</small></div>
    <span className="vz-card__tags">{negotiable ? <span className="vz-neg">Negociable</span> : null}<StatusTag tone={status.tone}>{status.label}</StatusTag></span>
  </header>;
  const more = <button type="button" className="vz-more" onClick={onAnalysis}>Ver análisis</button>;
  if (negotiable) return <>{styles}<li className="vz-card vz-card--neg">
    {head}
    <div className="vz-card__pub">
      <dl><div><dt>{valueLabel}</dt><dd>{value}</dd></div>{detail ? <div><dt>{detail.label}</dt><dd>{detail.value}</dd></div> : null}</dl>
      <div className="vz-card__go">{more}{action}</div>
    </div>
  </li></>;
  return <>{styles}<li className="vz-card vz-card--todo">
    {head}
    <div className="vz-card__value">
      <small>{valueLabel}</small>
      <b>{value}{drift ? <em className={drift < 0 ? "is-down" : "is-up"} title="Desde que la guardaste">{drift > 0 ? "+" : "−"}{Math.abs(drift)} %<span className="sr-only"> desde que la guardaste</span></em> : null}</b>
    </div>
    <dl className="vz-card__facts">
      {waitLoss ? <div className="is-loss"><dt>Si esperas un año</dt><dd>{waitLoss.amount}<small>Valdría {waitLoss.worth}{waitLoss.perDay ? <> · <span className="vz-nw">{waitLoss.perDay}</span></> : null}</small></dd></div> : null}
      {signal ? <div className="vz-sig"><dt>Señal de venta</dt><dd><span className="vz-dots" role="img" aria-label={`${signal.level} de 5`}>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= signal.level ? "is-on" : ""} />)}</span>{signal.label}<small>{signal.sublabel}</small></dd></div> : null}
    </dl>
    <footer className="vz-card__foot">{more}{action}</footer>
  </li></>;
}

export default ValuationCard;
