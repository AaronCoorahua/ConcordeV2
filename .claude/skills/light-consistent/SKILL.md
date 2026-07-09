# Skill: light-consistent

**Aplica el principio de PBR (una única fuente de luz + rugosidad) a superficies CSS con profundidad** (cards, botones elevados, glass/blur), para que highlights, sombras y estados `:hover` se comporten de forma físicamente coherente en vez de tener cada componente inventando su propia dirección de luz.

> Base teórica: ver [RESEARCH.md § 2](../../../RESEARCH.md#2-renderizado-basado-en-la-física-pbr-y-sombreado-bidimensional) — microfacetas, `roughness`, conservación de energía, Fresnel (más reflectivo en ángulos rasantes).

---

## Cuándo usar esto (y cuándo NO)

**Usar `light-consistent` cuando:**
- Hay múltiples componentes elevados (cards, modals, botones con sombra) en la misma pantalla y sus sombras/highlights apuntan en direcciones distintas — se ve "roto" visualmente aunque cada uno esté bien por separado.
- Quieres un efecto de superficie "premium" (glass, borde con highlight superior, sombra direccional) consistente entre light/dark mode.

**NO uses esto cuando:**
- Es un solo componente aislado sin relación visual con otros (un ícono, un badge plano). No hay "consistencia" que mantener con nada.
- Ya existe `box-shadow: var(--shadow-md)` u otro token de sombra plano en el design system — no lo reemplaces sin necesidad; esto es para cuando se necesita *dirección* de luz, no solo blur/offset genéricos.

---

## Activación

```
/light-consistent                     # crea las custom properties globales de luz en src/styles/
/light-consistent ComponentName       # aplica el sistema a un componente elevado existente
```

---

## El mapeo conceptual (PBR → CSS)

| Concepto PBR | Equivalente CSS |
|---|---|
| Dirección de la luz ($\vec{l}$) | Ángulo fijo global (ej. `--light-angle: 135deg`, luz arriba-izquierda) usado por TODAS las superficies elevadas. |
| `roughness` (rugosidad de microfacetas) | `--surface-roughness`: controla si el highlight es nítido y concentrado (superficie "pulida", roughness bajo) o ancho y tenue (roughness alto) — se traduce a `blur` + `spread` del highlight. |
| Conservación de energía (más ancho el highlight → menos brillo) | Si subes el `blur` del highlight, baja su `opacity` proporcionalmente — nunca subas ambos a la vez o la superficie "emite luz" de forma no física. |
| Fresnel (más reflectivo en ángulos rasantes) | El borde de la superficie (donde el ángulo de visión es más rasante) tiene un highlight más fuerte que el centro — un `border` o `inset box-shadow` sutil en el lado opuesto a la sombra principal. |
| $F_0$ dieléctrico vs metal | Superficies "normales" (dieléctricas): highlight blanco/neutro tenue. Superficies con acento de marca (CTA principal): el highlight puede tintarse con el color de marca — igual que un metal tiñe su reflejo especular. |

---

## `src/styles/light.css` (custom properties globales)

```css
:root {
  /* Ángulo de luz único para toda la app — 135deg = arriba-izquierda, estándar en UI */
  --light-angle: 135deg;
  --light-x: -1;   /* componente horizontal de la dirección de luz, para box-shadow offsets */
  --light-y: -1;   /* componente vertical */

  /* Roughness por defecto: superficies "pulidas" (cards, botones) */
  --surface-roughness-low: 0.15;   /* highlight nítido y concentrado */
  --surface-roughness-high: 0.6;   /* highlight ancho y tenue (glass, superficies mate) */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* La luz no cambia de dirección en dark mode — solo su intensidad relativa */
  }
}
```

---

## Patrón de superficie elevada (roughness bajo — botón/card nítido)

```css
.surface-elevated {
  /* Sombra en dirección OPUESTA a la luz (la luz viene de 135deg → sombra hacia 315deg) */
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);   /* highlight superior: Fresnel en el borde superior */
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.surface-elevated:hover {
  /* Al "acercarse" la luz (hover), el highlight se concentra más — roughness efectivo baja */
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
}
```

## Patrón de superficie rugosa (roughness alto — glass/blur)

```css
.surface-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  /* Highlight ANCHO y TENUE (conservación de energía: más área → menos opacidad que el nítido) */
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);   /* opacity más baja que .surface-elevated */
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

---

## Regla crítica: conservación de energía

Nunca subas `blur` y `opacity` del highlight a la vez — eso viola la conservación de energía y se ve como si la superficie "brillara" de forma artificial:

```css
/* MAL — highlight ancho Y brillante = imposible físicamente */
box-shadow: inset 0 2px 20px rgba(255, 255, 255, 0.8);

/* BIEN — si el highlight se ensancha (blur alto), su opacidad baja proporcionalmente */
box-shadow: inset 0 2px 20px rgba(255, 255, 255, 0.15);
```

Tabla de referencia rápida (blur del highlight → opacity máxima razonable):

| Blur del highlight | Opacity máxima | Uso |
|---|---|---|
| 0–1px (nítido) | 0.4–0.6 | Botones, cards pequeñas — roughness bajo |
| 2–8px (medio) | 0.2–0.35 | Cards grandes, modals |
| 12px+ (ancho) | 0.08–0.18 | Glass, superficies mate — roughness alto |

---

## Aplicar a un componente existente (ej. Button, CardTitle)

1. Localiza el `box-shadow`/`border` actual del componente en su `<style>` inline.
2. Verifica que la sombra "caiga" en dirección opuesta a `--light-angle` (135deg → sombra hacia abajo-derecha).
3. Si el componente no tiene highlight superior (`inset 0 1px 0 rgba(255,255,255,…)`), agrégalo usando la tabla de blur/opacity de arriba según su `roughness` percibido.
4. En `:hover`, no cambies la DIRECCIÓN de la luz — solo intensifica ligeramente (sombra +2px blur, highlight +0.05 opacity). Cambiar de dirección en hover rompe la ilusión de una fuente de luz fija.

---

## Checklist antes de aplicar

- [ ] Todas las superficies elevadas de la misma pantalla usan el mismo `--light-angle` (no inventes ángulos por componente).
- [ ] La sombra principal cae en dirección opuesta a la luz.
- [ ] Existe un highlight superior/borde sutil en el lado de la luz (Fresnel) — no solo sombra.
- [ ] Blur y opacity del highlight están balanceados según la tabla (no ambos altos a la vez).
- [ ] `:hover` intensifica, no reorienta, la luz.
- [ ] Funciona en light y dark mode (revisar `prefers-color-scheme` si el componente lo soporta).
