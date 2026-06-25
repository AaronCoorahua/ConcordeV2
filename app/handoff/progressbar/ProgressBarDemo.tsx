"use client";

/**
 * Demo en vivo de ProgressBar — la barra se llena de forma CONTINUA de 0 a 100 en
 * 3 s (transición lineal de width, sin saltos), hace una breve pausa y reinicia.
 * En producción usarías `transitionMs` igual al tiempo restante de tu temporizador.
 */

import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import ProgressBar from "@/src/components/ProgressBar";

const FILL_MS = 3000; // dura el llenado
const PAUSE_MS = 600; // pausa en 100% antes de reiniciar

export default function ProgressBarDemo(): JSX.Element {
  const [value, setValue] = useState(0);
  const [instant, setInstant] = useState(true); // true al reiniciar (0 sin animación)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(function loop() {
    let cancelled = false;

    function cycle() {
      if (cancelled) return;
      // 1) reinicia a 0 al instante (sin animar la bajada)
      setInstant(true);
      setValue(0);
      // 2) en el siguiente frame, anima de 0 → 100 de forma lineal en FILL_MS
      const raf = requestAnimationFrame(function step() {
        requestAnimationFrame(function start() {
          if (cancelled) return;
          setInstant(false);
          setValue(100);
        });
      });
      // 3) programa el siguiente ciclo
      const t = setTimeout(cycle, FILL_MS + PAUSE_MS);
      timers.current.push(t);
      return raf;
    }

    cycle();
    return function cleanup() {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return (
    <div style={{ width: 360, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      <ProgressBar value={value} transitionMs={instant ? 0 : FILL_MS} />
      <span style={{ fontSize: 12, color: "#71717a", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", textAlign: "right" }}>
        Llenado continuo · 0 → 100% en {FILL_MS / 1000}s
      </span>
    </div>
  );
}
