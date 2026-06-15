# FIGMA-AUDIT — OfferType

**Fecha:** 2026-06-11
**Figma:** VOYAGER Design System · component set `OfferType` (card 110×92)
**Fuente:** SVG export manual (6 SVGs: Live/Negotiable × default/hover/pressed)
**Spec crudo:** `.claude/concorde/inbox/figma-OfferType-svg-export.json`

> Figma manda en lo visual; la interacción (lift en hover `translateY(-4px) scale(1.015)`, press scale 0.97 + opacity 0.58, reduced-motion) es de Concorde y queda intacta.

## Estructura
Card 110×92 radius 8 → header 60px (color + label blanco) + footer 32px (bg claro + "VER TODAS").

## Cambios aplicados (oklch aproximado → hex EXACTO de Figma)

| Variante | Propiedad | Antes (oklch) | Ahora (Figma hex) |
|----------|-----------|---------------|--------------------|
| **Live** | header default | 180deg vertical aprox | **120deg `#FF9639 → #EF852E 50% → #BE3D00`** |
| | footer bg | color-mix | `#FFF8FA` |
| | CTA "VER TODAS" | oklch | `#BE3E00` |
| | ring | oklch naranja | `#EF852E` 0.4 |
| | pressed header | (solo dim) | `180deg #CE4900 → #AC3500` + opacity 0.58 |
| **Negotiable** | header default | 180deg vertical | **90deg horizontal `#00EDEE → #00D2D3 50% → #009597`** |
| | footer bg | color-mix | `#FFFAFC` |
| | CTA | oklch | `#009699` |
| | ring | oklch teal | `#00D2D3` 0.4 → hover 0.55 |
| | pressed header | (solo dim) | `180deg #00ADAF → #008C8E` + opacity 0.58 |

## Nota de diseño (asimetría real en Figma)
- **Negotiable hover** eleva la sombra (ring teal 0.55 + drops `#200068`).
- **Live hover** NO cambia la sombra en el SVG (mantiene ring naranja 0.4); el lift lo da solo el transform.
- Respetado tal cual. Si diseño quiere que Live también eleve en hover, es 1 línea.

## Verificación
- Header gradients, footer bg, CTA y ring por hex exacto ✅
- Pressed con header oscuro por variante ✅
- Glass overlay 0.07→0.26 hover, divider 3px ✅ (ya coincidían)
