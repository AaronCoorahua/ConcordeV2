"use client";

/**
 * Preview — live demo de BidPosition.
 * Llegan pujas: los puestos se reordenan con un slide suave (transform) y el
 * 1er puesto cambia (se vuelve live naranja + trofeo). Mismo look que BidPosition.
 */

import { useState, useEffect } from "react";
import type { JSX } from "react";
import BidPosition from "@/src/components/BidPosition/BidPosition";

interface Player { id: number; name: string; bids: number; }

const INITIAL: Player[] = [
  { id: 1, name: "JA8NEE", bids: 5 },
  { id: 2, name: "BEKVS1", bids: 4 },
  { id: 3, name: "KAHTH4", bids: 3 },
  { id: 4, name: "ZORR0X", bids: 2 },
  { id: 5, name: "MILU77", bids: 1 },
];

const STEP = 36; // alto fila 28 + gap 8

const STYLES = `
.lbd {
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
.lbd__head {
  display: grid; grid-template-columns: 78fr 143fr 58fr; align-items: center;
  padding: 14px 0 11px; margin-bottom: 12px; border-bottom: 1px solid #E1E3E2;
}
.lbd__head span { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; white-space: nowrap; }
.lbd__rows { position: relative; height: ${4 * STEP + 28}px; }
.lbd__row {
  position: absolute; left: 0; right: 0; top: 0; height: 28px; box-sizing: border-box;
  display: grid; grid-template-columns: 78fr 143fr 58fr; align-items: center;
  border-radius: 14px; color: #fff;
  transition: transform 0.6s cubic-bezier(0.22,0.61,0.36,1), box-shadow 0.45s ease, border-color 0.45s ease;
  will-change: transform;
}
.lbd__row--vault { border: 1px solid #99A1AF; background: linear-gradient(90deg, #19004A 0%, #3B1782 50%, #2E0F70 100%); }
.lbd__row--live {
  border: 1px solid transparent;
  background-image:
    linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%),
    linear-gradient(120deg, #ffffff 0%, #F4AC59 22%, #8460E5 74.5%, #ffffff 100%);
  background-origin: border-box; background-clip: padding-box, border-box;
  box-shadow: rgba(239,133,46,0.45) 0px 4px 16px;
}
.lbd__c1, .lbd__c3 { text-align: center; }
.lbd__rank { font-size: 12px; font-weight: 700; }
.lbd__value { font-size: 12px; font-weight: 700; }
.lbd__name { display: flex; align-items: center; gap: 6px; min-width: 0; padding-left: 12px; }
.lbd__nametext { font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lbd__trophy { flex-shrink: 0; filter: drop-shadow(0 0 2px rgba(240,187,59,0.65)); }
@media (prefers-reduced-motion: reduce) { .lbd__row { transition: none; } }
`;

function Trophy(): JSX.Element {
  return (
    <svg className="lbd__trophy" width="14" height="14" viewBox="177.5 80.3 12.5 12" fill="none" aria-hidden="true">
      <path
        d="M187.471 81.1675H180.476V82.3333H178.145V84.0821C178.145 85.3698 179.188 86.4137 180.476 86.4137C180.935 87.6649 182.065 88.5465 183.391 88.6871V90.4941H181.642V91.66H186.305V90.4941H184.557V88.6871C185.882 88.5465 187.012 87.6649 187.471 86.4137C188.759 86.4137 189.803 85.3698 189.803 84.0821V82.3333H187.471V81.1675ZM180.476 85.2479C179.832 85.2479 179.31 84.7259 179.31 84.0821V83.4991H180.476V85.2479ZM188.637 84.0821C188.637 84.7259 188.115 85.2479 187.471 85.2479V83.4991H188.637V84.0821Z"
        fill="#FBC47D"
      />
    </svg>
  );
}

function ranksOf(players: Player[]): Record<number, number> {
  const sorted = [...players].sort(function cmp(a, b) { return b.bids - a.bids || a.id - b.id; });
  const map: Record<number, number> = {};
  sorted.forEach(function set(p, i) { map[p.id] = i; });
  return map;
}

export default function Preview(): JSX.Element {
  const [players, setPlayers] = useState<Player[]>(INITIAL);

  useEffect(function tick() {
    const id = window.setInterval(function bump() {
      setPlayers(function update(prev) {
        const i = Math.floor(Math.random() * prev.length);
        const next = prev.map(function inc(p, idx) {
          return idx === i ? { ...p, bids: p.bids + 1 + Math.floor(Math.random() * 2) } : p;
        });
        const max = Math.max.apply(null, next.map(function b(p) { return p.bids; }));
        if (max > 24) return INITIAL.map(function clone(p) { return { ...p }; });
        return next;
      });
    }, 1500);
    return function clear() { window.clearInterval(id); };
  }, []);

  const ranks = ranksOf(players);

  return (
    <div style={{ marginBottom: 24, borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div style={{ padding: "8px 14px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>preview · live demo</span>
        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>llegan pujas · los puestos se reordenan</span>
      </div>

      <div style={{ padding: "40px 24px", background: "#f8fafc", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start", justifyContent: "center" }}>
        {/* Live demo animado */}
        <section className="lbd" aria-label="Posiciones en vivo">
          <div className="lbd__head">
            <span className="lbd__c1">PUESTO</span>
            <span>C.U.U.</span>
            <span className="lbd__c3">BIDS</span>
          </div>
          <div className="lbd__rows">
            {players.map(function renderRow(p) {
              const rank = ranks[p.id];
              const live = rank === 0;
              return (
                <div
                  key={p.id}
                  className={`lbd__row ${live ? "lbd__row--live" : "lbd__row--vault"}`}
                  style={{ transform: `translateY(${rank * STEP}px)` }}
                >
                  <span className="lbd__rank lbd__c1">{rank + 1}°</span>
                  <span className="lbd__name">
                    <span className="lbd__nametext">{p.name}</span>
                    {live ? <Trophy /> : null}
                  </span>
                  <span className="lbd__value lbd__c3">{p.bids}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Estático (defaults) como referencia */}
        <BidPosition />
      </div>
    </div>
  );
}
