"use client";

/**
 * Demo interactivo de BidMessage — simula el feed del chat: van llegando mensajes
 * y cada uno entra animado. Los sliders controlan la animación de entrada:
 *   · Velocidad → duración del deslizamiento (ms)
 *   · Distancia → cuánto recorre al aparecer (px)
 * Cada mensaje captura los valores al nacer, así mover los sliders solo afecta a
 * los siguientes (los ya visibles no re-animan).
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, JSX } from "react";
import BidMessage, { type BidMessageSide, type BidMessageType } from "@/src/components/BidMessage";

interface Msg {
  id: number;
  side: BidMessageSide;
  type: BidMessageType;
  text: string;
  dur: number;
  dist: number;
}

const USERS = ["KAHTH4", "ZAE389", "JA8NEE", "BEKVS1", "RDX12"];
const ARRIVAL_MS = 1400;
const MAX_VISIBLE = 6;

const KEYFRAMES = `
@keyframes bmsgdemo-in {
  from { opacity: 0; transform: translateX(var(--bmsg-d, 48px)); }
  to   { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .bmsgdemo-row { animation: none !important; }
}
`;

const sliderRow: CSSProperties = { display: "flex", alignItems: "center", gap: 12 };
const sliderLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  width: 78,
};
const sliderValue: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "rgba(255,255,255,0.8)",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  width: 54,
  textAlign: "right",
};

export default function BidMessageDemo(): JSX.Element {
  const [speed, setSpeed] = useState(450); // ms de duración del slide-in
  const [distance, setDistance] = useState(48); // px de recorrido
  const [msgs, setMsgs] = useState<Msg[]>([]);

  const idRef = useRef(0);
  const speedRef = useRef(speed);
  const distRef = useRef(distance);

  // Mantiene los refs sincronizados sin reiniciar el stream.
  useEffect(function sync() {
    speedRef.current = speed;
    distRef.current = distance;
  }, [speed, distance]);

  useEffect(function stream() {
    const t = setInterval(function arrive() {
      setMsgs(function next(prev) {
        const i = idRef.current;
        idRef.current = i + 1;
        const sent = i % 2 === 0;
        const side: BidMessageSide = sent ? "sent" : "received";
        const type: BidMessageType = sent ? "live" : i % 4 === 1 ? "white" : "vault";
        const user = USERS[i % USERS.length];
        const amount = (25 + i) * 1000;
        const m: Msg = {
          id: i,
          side,
          type,
          text: `${user} · PROPUSO US$ ${amount.toLocaleString("en-US")}`,
          dur: speedRef.current,
          dist: distRef.current,
        };
        return [...prev, m].slice(-MAX_VISIBLE);
      });
    }, ARRIVAL_MS);
    return function cleanup() { clearInterval(t); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%", maxWidth: 420 }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* Feed */}
      <div
        style={{
          height: 250,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 8,
          overflow: "hidden",
          padding: "8px 4px",
        }}
      >
        {msgs.map(function renderMsg(m) {
          return (
            <div
              key={m.id}
              className="bmsgdemo-row"
              style={{
                display: "flex",
                justifyContent: m.side === "sent" ? "flex-end" : "flex-start",
                // sent entra desde la derecha (+), received desde la izquierda (−)
                ["--bmsg-d" as string]: `${m.side === "sent" ? m.dist : -m.dist}px`,
                animation: `bmsgdemo-in ${m.dur}ms cubic-bezier(0.22,1,0.36,1) both`,
              }}
            >
              <BidMessage side={m.side} type={m.type}>{m.text}</BidMessage>
            </div>
          );
        })}
      </div>

      {/* Controles */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={sliderRow}>
          <span style={sliderLabel}>Velocidad</span>
          <input
            type="range"
            min={120}
            max={1200}
            step={30}
            value={speed}
            onChange={function onSpeed(e) { setSpeed(Number(e.target.value)); }}
            style={{ flex: 1, accentColor: "#8460E5" }}
          />
          <span style={sliderValue}>{speed} ms</span>
        </div>
        <div style={sliderRow}>
          <span style={sliderLabel}>Distancia</span>
          <input
            type="range"
            min={0}
            max={140}
            step={4}
            value={distance}
            onChange={function onDist(e) { setDistance(Number(e.target.value)); }}
            style={{ flex: 1, accentColor: "#8460E5" }}
          />
          <span style={sliderValue}>{distance} px</span>
        </div>
      </div>
    </div>
  );
}
