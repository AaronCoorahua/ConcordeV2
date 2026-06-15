# FIGMA-AUDIT — OfferCard

**Fecha:** 2026-06-11
**Figma:** VOYAGER Design System · `OfferCard` (170×232, radius 8)
**Fuente:** SVG export manual (3 cards: EN VIVO · PRÓXIMA · negociable)
**Spec crudo:** `.claude/concorde/inbox/figma-OfferCard-svg-export.json`

> Figma manda en lo visual; hover-lift + heart-pop + reduced-motion = interacción Concorde, intacta.

## Chrome — sync EXACTO (oklch aproximado → hex de Figma)
| Propiedad | Antes | Ahora (Figma) |
|-----------|-------|----------------|
| sombra | oklch morada `0 8px 16px` | `rgba(0,0,0,0.07) 0 0 16px 4px` |
| título | gris `oklch(0.15...)` | **`#4C1EBC`** |
| subtítulo/año | morado oklch | `#191C1C` |
| precio | morado oklch | `#4C1EBC` |
| barra live | oklch naranja | `90deg #FF9639 → #EF852E 50% → #BE3D00` (8px) |
| barra negotiable | oklch teal | `90deg #00EDEE → #00D2D3 50% → #009597` (8px) |

## Gema de precio (subasta) — reemplazado
Antes: círculo teal con `$` (oklch). Ahora: **diamante de subasta** con paths exactos de Figma:
- diamante: `#00A7A8 → #86A4E4 → #4C1EBC → #300089`
- medallón circular con `$` blanco + borde lila-teal
- glass highlight

## Estados
- `live`/`próxima` → footer naranja + fila precio (gema). `negotiable` → footer teal, **sin gema ni precio**, solo like.
- El badge (BadgeStatus) entra como prop → ya sincronizado por separado.

## Corazón (like) — sync EXACTO
- círculo **30px**, borde **1.44px gradiente lila** `#E8DDFF → white 40% → #CFBAFF 75% → #AE8EFF` + glass `white 0.55 → transparent`
- corazón 15px **relleno blanco + contorno `#5A35C2`** (default)
- active: bg `#8460E5 → #3B1782` + anillo `#FBC47D` (interacción Concorde)

✅ **Confirmado con SVGs detallados:** título=`#4C1EBC` (ej. "Audi Q3") / subtítulo=`#191C1C` (ej. "2026"). Ejemplos del handoff actualizados a Audi Q3 / 2026.

## Verificación
tsc 0 + `/handoff/offercard` HTTP 200 con título `#4C1EBC`, barras `#FF9639`/`#00EDEE`, gema `#00A7A8` y corazón lila renderizando.
