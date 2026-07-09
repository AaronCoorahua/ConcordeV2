"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * useAuroraSpring — mueve blobs de fondo con física mass-spring-damper hacia
 * objetivos que van cambiando, escribiendo las coordenadas DIRECTO a CSS custom
 * properties vía ref (`--mx`, `--my`, `--mx2`, `--my2`) para saltar el diffing de
 * React (patrón del PBR web rendering engine). El componente no re-renderiza:
 * el RAF sólo toca el style del nodo.
 *
 * Devuelve un ref para adjuntar al elemento contenedor del fondo. Cada blob
 * persigue un objetivo aleatorio-determinista que se reasigna al llegar a reposo,
 * dando un vagar orgánico con overshoot (ζ≈0.35).
 */
const STIFFNESS = 18; // más blando que los contadores → deriva lenta y amplia
const DAMPING = 6.4; // ζ = 6.4 / (2·√(1·18)) ≈ 0.75 → rebote suave, no nervioso
const MASS = 1;

interface Spring2D {
  px: number;
  py: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
}

function makeSpring(seed: number, amp: number): Spring2D {
  return { px: 0, py: 0, vx: 0, vy: 0, tx: seededTarget(seed, amp), ty: seededTarget(seed + 7, amp) };
}

/** Objetivo pseudo-aleatorio determinista en vmax (evita Math.random, no permitido). */
function seededTarget(n: number, amp: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  const frac = x - Math.floor(x);
  return (frac - 0.5) * amp; // rango ±amp/2 vmax
}

export interface AuroraSpringOptions {
  /** Nombres de las 4 CSS vars a escribir (grupo A x/y, grupo B x/y). */
  vars?: [string, string, string, string];
  /** Amplitud pico-a-pico de la deriva en vmax (default 12 → ±6vmax). */
  amplitude?: number;
}

export function useAuroraSpring<T extends HTMLElement>(opts: AuroraSpringOptions = {}): { ref: RefObject<T | null> } {
  const { vars = ["--mx", "--my", "--mx2", "--my2"], amplitude = 12 } = opts;
  const varsRef = useRef(vars);
  varsRef.current = vars;
  const ampRef = useRef(amplitude);
  ampRef.current = amplitude;
  const ref = useRef<T | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const seedRef = useRef(1);
  const aRef = useRef<Spring2D>(makeSpring(1, amplitude));
  const bRef = useRef<Spring2D>(makeSpring(31, amplitude));

  useEffect(() => {
    function integrate(s: Spring2D, dt: number): void {
      const fx = -STIFFNESS * (s.px - s.tx) - DAMPING * s.vx;
      const fy = -STIFFNESS * (s.py - s.ty) - DAMPING * s.vy;
      s.vx += (fx / MASS) * dt;
      s.vy += (fy / MASS) * dt;
      s.px += s.vx * dt;
      s.py += s.vy * dt;
      // Al asentarse cerca del objetivo, elige uno nuevo → deriva perpetua.
      if (Math.abs(s.px - s.tx) < 0.15 && Math.abs(s.vx) < 0.15 && Math.abs(s.py - s.ty) < 0.15 && Math.abs(s.vy) < 0.15) {
        seedRef.current += 1;
        s.tx = seededTarget(seedRef.current * 3.1, ampRef.current);
        s.ty = seededTarget(seedRef.current * 3.1 + 7, ampRef.current);
      }
    }

    function tick(ts: number) {
      const lastTs = lastTsRef.current;
      lastTsRef.current = ts;
      const rawDt = lastTs === null ? 0 : Math.min((ts - lastTs) / 1000, 0.064);
      const steps = Math.max(1, Math.ceil(rawDt / 0.008));
      const dt = rawDt / steps;

      const a = aRef.current;
      const b = bRef.current;
      for (let i = 0; i < steps; i++) {
        integrate(a, dt);
        integrate(b, dt);
      }

      const el = ref.current;
      if (el) {
        const [vx, vy, vx2, vy2] = varsRef.current;
        el.style.setProperty(vx, `${a.px.toFixed(3)}vmax`);
        el.style.setProperty(vy, `${a.py.toFixed(3)}vmax`);
        el.style.setProperty(vx2, `${b.px.toFixed(3)}vmax`);
        el.style.setProperty(vy2, `${b.py.toFixed(3)}vmax`);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, []);

  return { ref };
}
