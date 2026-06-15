# FIGMA-AUDIT — BadgeStatus

**Fecha:** 2026-06-11
**Figma:** VOYAGER Design System · component set `BadgeStatus` (pill 22px alto, radius full, backdrop-blur 6)
**Fuente:** SVG export manual (EnVivo On/On-1 · Próxima On/Off)
**Spec crudo:** `.claude/concorde/inbox/figma-BadgeStatus-svg-export.json`

> Figma manda en lo visual; la animación (pulso del punto / parpadeo del reloj, reduced-motion) es de Concorde — conservada y afinada a los frames On/Off de Figma.

## Cambios (oklch aproximado → hex EXACTO de Figma)

| Tipo | Propiedad | Ahora (Figma hex) |
|------|-----------|--------------------|
| **EN VIVO** | bg | `135deg #FF9639 → #EF852E 40% → #BE3D00` |
| | borde (1px) | `#FFBC83 → white 0.45 40% → #DA6C1E 75% → #FFBC83` |
| | shadow | `0 2px 10px rgba(239,133,46,0.45)` + inset white 0.14 |
| | punto | 6px blanco sólido, pulsa a 4px/0.28 (frames On↔On-1) |
| **PRÓXIMA** | bg | `135deg #8460E5 → #3B1782` |
| | borde (1px) | `#8776FF → white 0.4 38% → #532BC7 68% → #8776FF` |
| | shadow | `0 2px 10px rgba(32,0,104,0.5)` + inset white 0.1 |
| | reloj | blanco 0.9, parpadea sólido↔0.28 (On↔Off) |

## Notas
- Borde ajustado de 1.5px → **1px** (stroke de Figma).
- El pulso del punto EN VIVO ahora replica los 2 frames reales (antes era un ring expansivo): `scale(1)/opacity 1 ↔ scale(0.67)/opacity 0.28`.
- Verificado: tsc 0 + `/handoff/badgestatus` HTTP 200 con los hex renderizando.
