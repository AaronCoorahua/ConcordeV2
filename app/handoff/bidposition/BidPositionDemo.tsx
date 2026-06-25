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

// Nombres de ejemplo (hardcoded para el demo; en producción vienen del socket).
const INITIAL: BidPositionItem[] = [
  { id: "u1", name: "rodrigo_88", value: "12" },
  { id: "u2", name: "ana.valdez", value: "11" },
  { id: "u3", name: "jp_motors", value: "10" },
  { id: "u4", name: "lucia.q", value: "6" },
  { id: "u5", name: "max_rt", value: "4" },
];

function bump(prev: BidPositionItem[]): BidPositionItem[] {
  // Sesga la puja hacia el 2º y 3º para que peleen el 1er puesto → los cambios
  // arriba (1º ↔ 2º ↔ 3º) son frecuentes y bien visibles.
  const pool = [1, 2, 1, 2, 0, 3].filter(function inRange(i) { return i < prev.length; });
  const idx = pool[Math.floor(Math.random() * pool.length)];
  const top = Math.max(...prev.map(function val(p) { return Number(p.value); }));
  const cur = Number(prev[idx].value);
  // Si es un perseguidor, súbele lo justo para rebasar al líder; si ya es líder, +1/2.
  const inc = idx === 0 ? 1 + Math.floor(Math.random() * 2) : top - cur + 1 + Math.floor(Math.random() * 2);
  const updated = prev.map(function add(p, i) {
    return i === idx ? { ...p, value: String(cur + inc) } : p;
  });
  // Reordena por bids desc (la 1ª pasa a live + trofeo).
  return [...updated].sort(function byValue(a, b) {
    return Number(b.value) - Number(a.value);
  });
}

export default function BidPositionDemo(): JSX.Element {
  const [items, setItems] = useState<BidPositionItem[]>(INITIAL);

  useEffect(function subscribe() {
    const t = setInterval(function onMessage() {
      setItems(bump);
    }, 1000);
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
