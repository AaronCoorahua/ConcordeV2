"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useSpring — motor mass-spring-damper subamortiguado (segundo orden), integrado
 * con Euler semi-implícito (estable a 60/120Hz). A diferencia de un decaimiento
 * exponencial de primer orden, éste hace *overshoot* y rebota — la sensación
 * "rubbery" (ζ<1) del PBR web rendering engine.
 *
 *   m·ẍ + c·ẋ + k·x = 0
 *   ζ = c / (2·√(m·k))   → ζ=0.35 = subamortiguado (rebota); ζ=1 = crítico (no rebota)
 *
 * `stiffness` (k) sube la velocidad; `damping` (c) sube la fricción (menos rebote).
 * Defaults: k=64, c=17.92, m=1 → ζ≈0.35 (como el snippet de referencia).
 *
 * En reposo detiene el RAF (0 CPU, 0 re-renders); un efecto separado lo reanuda
 * cuando `target` cambia.
 */
export interface SpringOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
  /** Debajo de este umbral de |pos-target| y |vel|, se hace snap y se detiene el RAF. */
  restThreshold?: number;
}

export function useSpring(target: number, opts: SpringOptions = {}): number {
  const { stiffness = 64, damping = 17.92, mass = 1, restThreshold = 0.01 } = opts;

  const [value, setValue] = useState(target);
  const posRef = useRef(target);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  // Params vía ref para que el loop en curso los lea sin re-crearse cada render.
  const paramsRef = useRef({ stiffness, damping, mass, restThreshold });
  paramsRef.current = { stiffness, damping, mass, restThreshold };

  useEffect(() => {
    function tick(ts: number) {
      const { stiffness: k, damping: c, mass: m, restThreshold: rest } = paramsRef.current;
      const lastTs = lastTsRef.current;
      lastTsRef.current = ts;
      // dt en segundos, clampeado (tab en background) y subdividido para estabilidad
      // del integrador ante saltos grandes de dt (evita explosión numérica).
      const rawDt = lastTs === null ? 0 : Math.min((ts - lastTs) / 1000, 0.064);
      const steps = Math.max(1, Math.ceil(rawDt / 0.008));
      const dt = rawDt / steps;

      let pos = posRef.current;
      let vel = velRef.current;
      const tgt = target;

      for (let i = 0; i < steps; i++) {
        // Euler semi-implícito: primero actualiza velocidad, luego posición.
        const force = -k * (pos - tgt) - c * vel;
        vel = vel + (force / m) * dt;
        pos = pos + vel * dt;
      }

      // Reposo: cerca del objetivo y casi sin velocidad → snap y DETENER el RAF.
      if (Math.abs(tgt - pos) < rest && Math.abs(vel) < rest) {
        posRef.current = tgt;
        velRef.current = 0;
        runningRef.current = false;
        rafRef.current = null;
        lastTsRef.current = null;
        setValue(tgt);
        return;
      }

      posRef.current = pos;
      velRef.current = vel;
      setValue(pos);
      rafRef.current = requestAnimationFrame(tick);
    }

    // Arranca (o re-arranca) el loop si el objetivo difiere de la posición actual.
    if (!runningRef.current && Math.abs(target - posRef.current) >= restThreshold) {
      runningRef.current = true;
      lastTsRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      runningRef.current = false;
      lastTsRef.current = null;
    };
  }, [target, restThreshold]);

  return value;
}
