/**
 * liveData — Modelo de la animación "Ver live" del bloque Sala · Mobile.
 *
 * Secuencia de pujas (montos coherentes que suben, quién puja), tiempos de cada
 * mensaje y lista estática (idle). Compartido por SalaMobile (motor) y
 * MobileChatPanel (render).
 */

export type Phase = "idle" | "welcome" | "extended" | "streaming";

export interface LiveMsg {
  kind: "proposal" | "closes" | "vmc";
  side: "sent" | "received";
  type: "white" | "live" | "vault";
  amount?: number; // proposal / closes
  bidder?: string; // proposal
  text?: string; // vmc
  slow?: boolean; // vmc → 2s
  mine?: boolean; // proposal sent (mi puja)
}

export const ME = "KAHTH4"; // mis pujas (los "live" / sent)
const OTHERS = ["ZAE389", "RAZER21", "MEND99", "LUC88", "VKR55", "TORO_7"];
export const BASE = 5000;
export const STEP = 79;

export function fmtMoney(n: number): string {
  return "US$ " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface RawSpec {
  kind: "proposal" | "closes" | "vmc";
  side: "sent" | "received";
  text?: string;
  slow?: boolean;
}

function build(raw: RawSpec[], startBid: number): LiveMsg[] {
  let bid = startBid;
  let oi = 0;
  return raw.map(function resolve(r): LiveMsg {
    if (r.kind === "proposal") {
      bid += STEP;
      const mine = r.side === "sent";
      const bidder = mine ? ME : OTHERS[oi++ % OTHERS.length];
      return { kind: "proposal", side: r.side, type: mine ? "live" : "white", amount: bid, bidder, mine };
    }
    if (r.kind === "closes") {
      return { kind: "closes", side: "received", type: "vault", amount: bid };
    }
    return { kind: "vmc", side: "received", type: "vault", text: r.text, slow: r.slow };
  });
}

// Secuencia live: pujas intercaladas con "Cierra en"; al final "Cierra en" sobre
// la última puja y el remate "A la una / dos / tres".
const RAW: RawSpec[] = [
  { kind: "proposal", side: "received" },
  { kind: "closes", side: "received" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "proposal", side: "received" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "proposal", side: "received" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "proposal", side: "received" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "proposal", side: "received" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "proposal", side: "received" },
  { kind: "closes", side: "received" }, // cierra sobre la última puja antes del remate
  { kind: "vmc", side: "received", text: "A la una", slow: true },
  { kind: "vmc", side: "received", text: "A las dos", slow: true },
  { kind: "vmc", side: "received", text: "A las tres", slow: true },
];

export const STREAM: LiveMsg[] = build(RAW, BASE);

// Lista estática (idle) — coherente
const STATIC_RAW: RawSpec[] = [
  { kind: "proposal", side: "received" },
  { kind: "closes", side: "received" },
  { kind: "vmc", side: "received", text: "A la una" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "vmc", side: "received", text: "A la una" },
  { kind: "proposal", side: "received" },
  { kind: "proposal", side: "sent" },
  { kind: "closes", side: "received" },
  { kind: "vmc", side: "received", text: "A la una" },
  { kind: "proposal", side: "received" },
  { kind: "closes", side: "received" },
  { kind: "vmc", side: "received", text: "A la una" },
];
export const STATIC: LiveMsg[] = build(STATIC_RAW, BASE);

// ── Tiempos ──
export const REG_DELAY = 650; // ritmo moderado
export const VMC_DELAY = 2000; // "a la una/dos/tres" → 2s c/u
export function delayOf(m: LiveMsg): number {
  return m.slow ? VMC_DELAY : REG_DELAY;
}

let cum = 0;
export const REVEAL_AT: number[] = STREAM.map(function reveal(m) {
  cum += delayOf(m);
  return cum;
});
export const TOTAL_STREAM = cum;
const firstVmc = STREAM.findIndex((m) => m.slow);
export const VMC_START = REVEAL_AT[firstVmc]; // cuando aparece "a la una"
export const VMC_FILL = TOTAL_STREAM - VMC_START; // dura el remate (3·2s)

export const WELCOME_MS = 3000;
export const EXTENDED_MS = 3000;
export const RESTART_PAUSE = 1400;
export const START_COUNT = 3; // cada fase (recibiendo / extendido) dura 3s
export const PARTICIPANTS_TARGET = 18;
