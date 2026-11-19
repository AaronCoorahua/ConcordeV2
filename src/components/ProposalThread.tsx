/**
 * ProposalThread — historial de propuestas de una negociación (Mi Garaje, mi-garaje-lab · panel de negociación):
 * cada monto es un BidMessage de Concorde (lo tuyo en vault a la derecha, lo de la otra parte en blanco con su avatar
 * a la izquierda), con quién y a qué hora debajo, y una línea con el día cuando cambia. Lo que se pase como hijos
 * (respuestas, avisos) se agrega al final de la lista como <li>. Solo depende de React y BidMessage.
 */
import type { JSX, ReactNode } from "react";
import BidMessage from "@/src/components/BidMessage";

export const PROPOSAL_THREAD_CSS = String.raw`
.np__thread { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.np__thread li { justify-self: start; display: flex; align-items: flex-end; gap: 8px; justify-items: start; }
.np__thread li.is-me { justify-self: end; justify-items: end; }
.np__thread li > span { font-size: .75rem; font-weight: 600; color: #6B6878; }
.np__thread .pbidmsg b { font-size: .875rem; font-weight: 700; font-variant-numeric: tabular-nums; }
.np__thread li > div { display:grid; gap:4px; justify-items:start; }
.np__thread li.is-me > div { justify-items:end; }
.np__day { justify-self:stretch !important; display:flex !important; align-items:center; gap:12px; font-size:.75rem; font-weight:600; color:#6B6878; }
.np__day::before, .np__day::after { content:""; flex:1; height:1px; background:#E1E3E2; }
.np__avatar { flex:none; display:grid; place-items:center; width:28px; height:28px; border-radius:50%; font-size:.6875rem; font-weight:700; color:#fff; background:linear-gradient(135deg, #00DAE0, #008688); }
.np__at { font-size:.6875rem; color:#6B6878; } .np__at i { font-style:normal; color:#8460E5; }
`;

export interface ProposalThreadItem {
  /** true: propuesta tuya. */
  me: boolean;
  /** Monto ya formateado (p. ej. «US$ 13,500»). */
  amount: string;
  /** Día y hora separados por un espacio («Hoy 9:10», «Ayer 10:45»); el día arma los separadores. */
  when: string;
}

export interface ProposalThreadProps {
  /** Propuestas, de la más antigua a la más nueva. */
  items: ProposalThreadItem[];
  /** Nombre de la otra parte bajo sus montos («Vendedor», «Comprador 3»). */
  other: string;
  /** Iniciales en el avatar de la otra parte («V», «C3»). */
  initials: string;
  /** <li> extra al final del historial (respuestas, avisos). */
  children?: ReactNode;
}

export function ProposalThread({ items, other, initials, children }: ProposalThreadProps): JSX.Element {
  return <>
    <style href="concorde-proposal-thread" precedence="default">{PROPOSAL_THREAD_CSS}</style>
    <ol className="np__thread">{items.map((t, i) => {
      const [day, ...hh] = t.when.split(" "), prevDay = i ? items[i - 1].when.split(" ")[0] : "";
      return [day !== prevDay ? <li key={`d${i}`} className="np__day"><span>{day}</span></li> : null,
        <li key={i} className={t.me ? "is-me" : ""}>{t.me ? null : <span className="np__avatar" aria-hidden>{initials}</span>}
          <div><BidMessage side={t.me ? "sent" : "received"} type={t.me ? "vault" : "white"}><b>{t.amount}</b></BidMessage>
            <span className="np__at">{t.me ? "Tú" : other} · {hh.join(" ") || day}{t.me ? <i aria-label="Enviada"> ✓✓</i> : null}</span></div></li>];
    })}{children}</ol>
  </>;
}

export default ProposalThread;
