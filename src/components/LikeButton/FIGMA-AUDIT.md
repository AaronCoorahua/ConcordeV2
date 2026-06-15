# FIGMA-AUDIT — LikeButton

**Fecha:** 2026-06-11
**Figma:** VOYAGER Design System · component set `LikeButton`
**Fuente:** SVG export manual por estado×tamaño (12 SVGs)
**Specs crudos:** `.claude/concorde/inbox/figma-LikeButton-default-svg-export.json` + `figma-LikeButton-states-svg-export.json`

> Figma manda en lo visual; la interacción (lift, heart-pop, pulse, reduced-motion) es 100% Concorde y queda intacta.

## Tamaños (corregidos vs preview viejo)
sm **24** · md **32** · lg **40** px (antes 32/44/60). Border 2 / 1.44 / 2. Heart stroke 1 / 1.2 / 1.4.

## Estado por estado (Figma vs Concorde)

| Estado | Propiedad | Figma | Acción |
|--------|-----------|-------|--------|
| **default** | borde | gradiente `#E8DDFF→#fff 40→#CFBAFF 75→#AE8EFF` (sm invierte 2 últimos stops) | ✅ aplicado |
| | corazón | blanco relleno + stroke `#5A35C2` | ✅ |
| | sombra | ninguna (plano) | ✅ |
| | glass | 0.18 (sm/lg) · 0.55 (md) | ✅ |
| **active** | bg | `135deg #8460E5→#3B1782` | ✅ |
| | **borde** | **GRADIENTE** `#FBC47D→#fff 40→#AE8EFF 75→#CFBAFF` | ✅ (era sólido `#fbc47d`) |
| | **glow** | radial `#AE8EFF` 0.35 difuminado | ✅ agregado (`::after`) |
| | corazón | blanco fill 0.92, sin stroke | ✅ |
| | sombra | `0 3px ~14px rgba(132,96,229,0.35)` + inset white 0.22 | ✅ |
| **hover** | bg | blanco | ✅ |
| | **glass** | 0.55 en TODOS los tamaños | ✅ (subido de 0.18 en sm/lg) |
| | sombra | `0 3px 6px` + `0 10px 18px` `rgba(32,0,104,…)` `#200068` | ✅ ya coincidía |
| | borde | `#E8DEFF→#fff→#CFBAFF→#E8DEFF` (más claro) | ⚠️ pendiente (delta muy sutil vs default) |
| **disabled** | bg | blanco sólido, sin borde | ✅ |
| | **corazón** | outline gris `#E1E3E2` | ✅ (era `oklch(...)`) |
| | sombra | `0 8px 16px rgba(0,0,0,0.10)` | ✅ |
| **skeleton** | bg | `#E1E3E2` sólido, sin corazón | ✅ ya correcto |

## Pendiente menor
- Borde hover (gradiente más claro `#E8DEFF…`): delta casi imperceptible vs el borde default; no aplicado para no añadir una regla por un cambio sub-pixel de tono. Se puede afinar si diseño lo pide.
