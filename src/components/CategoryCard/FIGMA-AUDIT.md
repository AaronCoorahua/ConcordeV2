# FIGMA-AUDIT — CategoryCard

**Fecha:** 2026-06-11
**Figma:** VOYAGER Design System · `CategoryCard` (card 92×95, radius 8)
**Fuente:** SVG export manual (4 cards)
**Spec crudo:** `.claude/concorde/inbox/figma-CategoryCard-svg-export.json`

> Figma manda en lo visual; hover/active (lift + glow) es interacción Concorde, intacta.

## Chrome — sync EXACTO (oklch aproximado → hex de Figma)
| Propiedad | Ahora (Figma hex) |
|-----------|--------------------|
| tamaño | 92×95 (era 93×92) |
| bg | `160deg #FFFFFF → #F4F5F9` |
| glass | `white 0.55 → transparent 50%` |
| borde (1px) | `135deg #9C96F8 → white 0.65 38% → #7364DE 70% → #9C96F8` |
| sombra | `0 1px 3px rgba(32,0,104,0.05) + 0 2px 10px rgba(32,0,104,0.08)` |
| label | `#3B1782` |
| ícono | **RELLENO** gradiente `#653DE9 → #300089 55% → #0F003B` |

## Íconos — reemplazados por paths RELLENOS exactos
Antes eran line-icons aproximados (oklch stroke). Ahora son los paths literales de Figma.

⚠️ **Mapeo a confirmar** (lectura de paths vectorizados):
| Ícono Figma | Categoría asignada | Nodo |
|-------------|--------------------|------|
| carro (cabina + 2 ruedas) | vehicular | 1230:3327 |
| grúa / estructura | maquinaria | 1230:3616 |
| medidor / herramienta | equipos-diversos | 1807:15166 |
| monitor / pantalla | articulos-diversos | 1807:15183 |

Si alguno corresponde a otra categoría, es swap de 1 línea en `ICON_MAP`.

## Verificación
tsc 0 + `/handoff/categorycard` HTTP 200 con borde lila, label `#3B1782` e íconos con gradiente renderizando.
