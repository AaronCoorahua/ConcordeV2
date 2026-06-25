"use client";

/**
 * Demo en vivo de BidPosition — simula un feed de API/socket: cada cierto tiempo
 * un postor suma bids y la tabla se reordena, mostrando la animación de cambio de
 * posición (FLIP). En producción reemplazas el setInterval por tu suscripción real
 * y pasas el array resultante a `positions`.
 */

import { useEffect, useState } from "react";
import type { JSX } from "react";
import BidPosition, { type BidPositionItem } from "@/src/components/BidPosition";

const INITIAL: BidPositionItem[] = [
  { id: "u1", name: "rodrigo_88", value: "12" },
  { id: "u2", name: "ana.valdez", value: "9" },
  { id: "u3", name: "jp_motors", value: "7" },
  { id: "u4", name: "lucia.q", value: "5" },
  { id: "u5", name: "max_rt", value: "3" },
];

function bump(prev: BidPositionItem[]): BidPositionItem[] {
  // Un postor al azar suma 1–3 bids…
  const idx = Math.floor(Math.random() * prev.length);
  const updated = prev.map(function add(p, i) {
    if (i !== idx) return p;
    return { ...p, value: String(Number(p.value) + 1 + Math.floor(Math.random() * 3)) };
  });
  // …y la tabla se reordena por bids desc (la 1ª pasa a live + trofeo).
  return [...updated].sort(function byValue(a, b) {
    return Number(b.value) - Number(a.value);
  });
}

export default function BidPositionDemo(): JSX.Element {
  const [items, setItems] = useState<BidPositionItem[]>(INITIAL);

  useEffect(function subscribe() {
    const t = setInterval(function onMessage() {
      setItems(bump);
    }, 1500);
    return function unsubscribe() {
      clearInterval(t);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <BidPosition positions={items} />
      <button
        type="button"
        onClick={function manual() { setItems(bump); }}
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#52525b",
          background: "#fafafa",
          border: "1px solid #e4e4e7",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Simular puja
      </button>
    </div>
  );
}
