# Skill: anim-decay

**Genera/aplica animaciones JS frame-rate-independent usando decaimiento exponencial temporal**, para casos donde un valor persigue un objetivo que se mueve en tiempo real (drag, scroll-follow, contadores, cursores, sway) y una CSS `transition` no sirve porque el target cambia cada frame.

> Base teórica: ver [RESEARCH.md § 1](../../../RESEARCH.md#1-interpolación-lineal-y-decaimiento-exponencial-temporal).

---

## Cuándo usar esto (y cuándo NO)

**Usar `anim-decay` cuando:**
- El valor destino se mueve continuamente (seguir el mouse, seguir el scroll, seguir otro valor animado).
- Necesitas la misma velocidad percibida en pantallas de 60Hz y 144Hz+ (ProMotion, gaming monitors).
- Es un contador, gauge o barra que debe "amortiguar" hacia un número que cambia en tiempo real (precio en vivo, pujas).

**NO uses esto — usa CSS `transition`/`animation` normal cuando:**
- El destino es fijo y conocido de antemano (abrir un modal, hover de un botón, expandir un accordion). CSS transitions ya son frame-rate-independent para ese caso: el navegador interpola en tiempo real, no en frames lógicos.
- No hay lógica de "perseguir un blanco móvil".

---

## Activación

```
/anim-decay useExpDecay              # crea el hook genérico en src/hooks/useExpDecay.ts
/anim-decay ComponentName             # aplica el hook a un componente existente que usa RAF/transition manual
```

---

## Qué hace

1. Crea (si no existe) `src/hooks/useExpDecay.ts` — hook genérico reutilizable.
2. Si se pasa un componente, reemplaza su lógica de animación manual (RAF + lerp fijo, o `setInterval`) por el hook.
3. No toca CSS transitions existentes que ya tengan target fijo — esas se dejan como están.

---

## La fórmula (no negociable)

Nunca multipliques `alpha * deltaTime` directamente — eso rompe con FPS bajos (`alpha` puede superar 1.0 y causar overshooting). Siempre usa la forma exponencial:

```
factor = 1 - Math.exp(-lambda * deltaTime)
// o, con una constante de "fricción restante por segundo" (más intuitiva de tunear):
factor = 1 - Math.pow(remainingFraction, deltaTime)
```

---

## `src/hooks/useExpDecay.ts` (hook genérico)

```ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima `target` hacia sí mismo con decaimiento exponencial, independiente del framerate.
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

      valueRef.current = Math.abs(targetRef.current - next) < 0.001 ? targetRef.current : next;
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
```

### Notas de implementación

- **`halfLife` en vez de `lambda` cruda**: es más fácil de tunear ("tarda 150ms en recorrer la mitad de la distancia") que una constante de decaimiento abstracta. `lambda = ln(2) / halfLife`.
- **Clamp de `dt` a 100ms**: si la pestaña estuvo en background (`requestAnimationFrame` pausado), el primer `dt` tras volver puede ser enorme — sin el clamp, el valor saltaría instantáneamente al target en vez de animar. Esto reemplaza el "overshooting" del método lineal ingenuo por un comportamiento controlado.
- **Snap final**: cuando la diferencia es < 0.001, fija el valor exacto al target — evita que el RAF corra para siempre por un residuo asintótico invisible.
- El hook vive en `src/hooks/`, no dentro de `src/components/{X}/` — es infraestructura compartida, no parte de un componente generado por `/concorde`.

---

## Variante: perseguir un objetivo 2D (posición, cursor, drag)

```ts
"use client";

import { useEffect, useRef, useState } from "react";

interface Vec2 { x: number; y: number }

export function useExpDecay2D(target: Vec2, halfLife = 0.15): Vec2 {
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
      const dt = lastTs === null ? 0 : Math.min((ts - lastTs) / 1000, 0.1);

      const lambda = Math.LN2 / halfLife;
      const factor = 1 - Math.exp(-lambda * dt);
      const cur = valueRef.current;
      const tgt = targetRef.current;
      const next: Vec2 = {
        x: cur.x + (tgt.x - cur.x) * factor,
        y: cur.y + (tgt.y - cur.y) * factor,
      };

      valueRef.current = next;
      setValue(next);
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
```

---

## Ejemplo de uso: contador de precio en vivo (BidMessage / PriceBadge)

```tsx
"use client";

import { useExpDecay } from "@/src/hooks/useExpDecay";

function LivePrice({ currentBid }: { currentBid: number }) {
  const displayed = useExpDecay(currentBid, 0.25); // 250ms half-life: se siente "con inercia", no instantáneo

  return <span>{Math.round(displayed).toLocaleString()}</span>;
}
```

---

## Checklist antes de aplicar

- [ ] ¿El target realmente cambia en tiempo real (no es un valor fijo conocido de antemano)? Si es fijo → usa CSS transition, no este hook.
- [ ] `halfLife` está en segundos y es razonable (0.1–0.4s para UI; más alto para cámaras/inercia física).
- [ ] `dt` está clampeado (evita saltos al volver de una pestaña en background).
- [ ] No se multiplica `alpha * dt` directamente en ningún punto — siempre `1 - exp(-lambda * dt)`.
- [ ] El hook vive en `src/hooks/`, con `"use client"` en la primera línea.
