"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima `target` hacia sí mismo con decaimiento exponencial, independiente del
 * framerate: 1 - e^(-λΔt), nunca α·Δt (eso rompe con FPS bajos).
 * `halfLife` = segundos que tarda en recorrer la mitad de la distancia restante.
 */
export function useExpDecay(target: number, halfLife = 0.15): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
  const targetRef = useRef(target);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  targetRef.current = target;

  useEffect(() => {
    function tick(ts: number) {
      const lastTs = lastTsRef.current;
      lastTsRef.current = ts;
      const dt = lastTs === null ? 0 : Math.min((ts - lastTs) / 1000, 0.1); // clamp: tab en background

      const lambda = Math.LN2 / halfLife;
      const factor = 1 - Math.exp(-lambda * dt);
      const next = valueRef.current + (targetRef.current - valueRef.current) * factor;

      valueRef.current = Math.abs(targetRef.current - next) < 0.01 ? targetRef.current : next;
      setValue(valueRef.current);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [halfLife]);

  return value;
}
