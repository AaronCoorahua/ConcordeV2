# Skill: comp-slots

**Reestructura un componente con demasiadas props de variante/contenido en un patrón de slots** — separar la lógica y el layout (equivalente a los "Bones" de Spine) del contenido visual intercambiable (equivalente a los "Attachments"), usando un contenedor de estado (equivalente al "Slot") que decide qué se renderiza.

> Base teórica: ver [RESEARCH.md § 3](../../../RESEARCH.md#3-estructuras-de-slots-y-contenedores-para-gestión-dinámica-de-animaciones) — mapeo Bone→layout, Slot→contenedor con estado/orden, Attachment→contenido intercambiable.

---

## Cuándo usar esto (y cuándo NO)

**Usar `comp-slots` cuando:**
- Un componente tiene props como `variant`, `icon`, `iconPosition`, `showBadge`, `badgeContent`, `trailing`, `leading`… que crecen sin parar y generan un árbol de `if/ternary` gigante en el render.
- Distintas "pieles" del mismo componente (ej. `OfferCard` con foto, con video, con placeholder) comparten exactamente el mismo layout/lógica pero cambian solo el contenido central.
- Necesitas que un padre controle QUÉ se muestra en una región sin que el componente hijo conozca todas las variantes posibles (desacoplamiento real, no un switch interno).

**NO uses esto cuando:**
- El componente tiene 1–2 variantes simples (`primary`/`secondary`) — un prop `variant` con un objeto de estilos es más simple y no necesita slots.
- El "contenido intercambiable" es solo texto o un ícono aislado — usa `children` normal, no un sistema de slots con nombre.

---

## Activación

```
/comp-slots ComponentName             # refactoriza un componente existente a slots
```

---

## El patrón (mapeo a React)

| Concepto (Spine/Unreal) | Equivalente en Concorde/React |
|---|---|
| **Bone** (transformación pura, sin visual) | El componente contenedor — define layout, spacing, estado (`hover`, `pressed`), pero no decide qué contenido se pinta. |
| **Slot** (contenedor de estado + orden + selección) | Una prop tipada como `ReactNode` o un objeto `{ [slotName]: ReactNode }` — el "enrutador" que decide qué Attachment activo se renderiza en esa región. |
| **Attachment** (recurso visual intercambiable) | El `ReactNode` concreto que el padre pasa — un ícono, una imagen, un badge, otro componente. |
| **drawOrder** (orden de dibujado independiente de jerarquía) | El `order`/`z-index` CSS o el orden de renderizado en JSX — no depende de la jerarquía de props. |
| **Skin** (conjunto de attachments empaquetado) | Un objeto de configuración con todos los slots resueltos para un caso de uso (ej. `OFFER_CARD_VIDEO_SKIN`). |

---

## Antes (props de variante creciendo sin control)

```tsx
interface OfferCardProps {
  title: string;
  price: number;
  showVideo?: boolean;
  videoUrl?: string;
  showBadge?: boolean;
  badgeText?: string;
  badgeColor?: string;
  iconLeft?: boolean;
  iconType?: "star" | "check" | "none";
  // ... crece cada vez que se agrega una variante nueva
}
```

## Después (slots explícitos)

```tsx
import type { ReactNode } from "react";

interface OfferCardSlots {
  /** Región central: foto, video o placeholder — el padre decide el Attachment activo */
  media?: ReactNode;
  /** Badge de estado (esquina superior) */
  badge?: ReactNode;
  /** Ícono junto al título */
  leadingIcon?: ReactNode;
}

interface OfferCardProps extends OfferCardSlots {
  title: string;
  price: number;
}

export function OfferCard({ title, price, media, badge, leadingIcon }: OfferCardProps) {
  return (
    <article className="offer-card">
      {badge && <div className="offer-card__badge-slot">{badge}</div>}
      <div className="offer-card__media-slot">{media ?? <MediaPlaceholder />}</div>
      <div className="offer-card__title-row">
        {leadingIcon && <span className="offer-card__icon-slot">{leadingIcon}</span>}
        <h3>{title}</h3>
      </div>
      <PriceBadge value={price} />
    </article>
  );
}
```

**Uso — el padre elige el "Attachment" sin que `OfferCard` conozca las variantes:**

```tsx
<OfferCard
  title="iPhone 15 Pro"
  price={899}
  media={<video src={item.videoUrl} autoPlay muted loop />}
  badge={<BadgeStatus tone="live">En vivo</BadgeStatus>}
/>

<OfferCard
  title="MacBook Air"
  price={1199}
  media={<img src={item.photoUrl} alt="" />}
/>
```

---

## Variante: mapa de slots nombrados (cuando hay muchos y se repiten combinaciones)

Para componentes con muchas regiones reutilizadas en distintas "skins" (equivalente a `Skin.SetAttachment` en Spine), define un tipo de mapa y una función de resolución en vez de N props sueltas:

```tsx
type SlotName = "media" | "badge" | "leadingIcon" | "trailing";
type SlotMap = Partial<Record<SlotName, ReactNode>>;

// "Skin" reutilizable: preset de slots para un caso de uso común
const LIVE_AUCTION_SKIN: SlotMap = {
  badge: <BadgeStatus tone="live">En vivo</BadgeStatus>,
  trailing: <AuctionStatus />,
};

function OfferCard({ title, price, slots = {} }: { title: string; price: number; slots?: SlotMap }) {
  return (
    <article className="offer-card">
      {slots.badge}
      {slots.media ?? <MediaPlaceholder />}
      <h3>{slots.leadingIcon}{title}</h3>
      <PriceBadge value={price} />
      {slots.trailing}
    </article>
  );
}

// Uso: aplicar un "skin" completo de una vez
<OfferCard title="iPhone 15 Pro" price={899} slots={LIVE_AUCTION_SKIN} />
```

Usa esta variante solo si tienes **3+ combinaciones de slots que se repiten** en distintos lugares del catálogo — si cada uso es único, las props sueltas (patrón anterior) son más simples y más fáciles de tipar.

---

## Reglas críticas

- **El componente contenedor (Bone) nunca importa ni conoce las variantes concretas** (`VideoPlayer`, `StarIcon`, etc.) — solo declara dónde van y renderiza lo que reciba. Si el componente importa algo para decidir "si es video, muestro VideoPlayer", NO es un slot, es un switch disfrazado.
- **Un slot vacío siempre tiene un fallback razonable o no renderiza nada** — nunca debe romper el layout. Usa `??` con un placeholder o un `&&` corto.
- **No confundas esto con `children`**: `children` es para UN solo hueco de contenido. Slots nombrados son para MÚLTIPLES huecos independientes con posiciones fijas en el layout.
- Sigue las reglas de `concorde-config.json`: `no_any: true` — tipa cada slot como `ReactNode`, nunca `any`.

---

## Checklist antes de aplicar

- [ ] ¿El componente tiene 3+ props de variante de contenido (no de estilo)? Si no, no lo refactorices.
- [ ] Cada slot está tipado explícitamente (`ReactNode`, nunca `any`).
- [ ] El componente contenedor no importa ninguna variante concreta de contenido.
- [ ] Slots vacíos tienen fallback o se omiten limpiamente (sin huecos rotos en el layout).
- [ ] Si hay combinaciones repetidas, se extrajeron a un preset (`SlotMap` reutilizable) en vez de copiar props en cada call site.
