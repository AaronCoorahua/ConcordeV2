# FIGMA-AUDIT — Button

**Fecha:** 2026-06-09
**Figma:** VOYAGER Design System · component set `Button` · página **Lab** · nodo `1133:1714`
**Spec completa:** `.claude/concorde/_spec-Button-set.json` (24 variantes×estados)
**Props del set:** `Variant` (Primary/Negotiable/Secondary/Ghost/Outline) × `Size` (Small/Medium) × `State` (Default/Hover/Pressed/Disabled)
**Animación:** 100% de Concorde — el `prototype` de Figma vino **vacío**.

> ✅ Corregido: dentro de cada **Variant+Size**, todos los estados tienen **el mismo height/width**. El 14px/40px es **Small**, el 16px/48px es **Medium**. No hay inconsistencia de diseño (gracias Julio por el catch).

> ✅ **WIDTHS — RESUELTO (2026-06-10, vía SVG export manual):** los botones Medium en Figma son de **ANCHO FIJO** (Negotiable = 200×48 exacto en sus 3 estados, confirmado por el rect del SVG que exportó el designer). La teoría del "frame interno hug-content" era incorrecta para este set — el frame de la variante ES el botón. En CSS se implementa como `min-width: 200px` + padding reducido (rinde 200 exacto con estos labels y no se rompe con textos más largos). Pendiente confirmar los fijos de Primary (200), Secondary (186) y Ghost/Outline (215) con sus SVGs.

> ✅ **NEGOTIABLE — SYNC EXACTO (2026-06-10):** reconstruido desde los 3 SVGs exportados (default/hover/pressed). Hallazgos aplicados: **borde gradiente** `135deg #fff → #4DDCDC 25% → #6445DF 75% → #fff` (no blanco sólido), sombras exactas por estado (hover = teal 0 4px 10px + glow púrpura `#6445DF` 0 8px 24px; pressed = inset 0 2px 5px), texto pressed `#D1D5DC`, 200×48 fijo. Animaciones de Concorde intactas. Spec: `.claude/concorde/inbox/figma-ButtonNegotiable-svg-export.json`.

> ✅ **GHOST "Ver Ofertas relacionadas" — VERIFICADO (2026-06-10, SVG export):** los 3 estados de Concorde **ya coincidían exacto** con Figma (hover blanco→`#FFF0E2`/texto `#ED8936` ✓, pressed `#D46E20→#B73700`/texto `#E1E3E2` ✓, borde blanco 0.75 ✓). Único delta aplicado: **padding 28px → 12px** (frame Figma 215×48 con texto casi al borde).

> ✅ **SECONDARY-SM "Agenda tu visita" — VARIANTE NUEVA (2026-06-10, SVG export):** 160×40 fijo, ícono **calendario** (paths exactos del SVG, stroke currentColor) en círculo `rgba(255,255,255,0.2)`, **borde gradiente lila** `#CFBAFF → #fff 35% → #AE8EFF 65% → #CFBAFF`, gradientes default `#8460E5→#3B1782` / hover `#AE8EFF→#5A35C2` / pressed `#3B1782→#22005C` con texto+ícono `#E1E3E2`, sombras exactas por estado. Disabled inferido del patrón estándar (no exportado). Animación = patrón Concorde sm. Spec: `.claude/concorde/inbox/figma-ButtonGhost-SecondarySm-svg-export.json`.

> ✅ **sm-guest "Ingresa" — SYNC EXACTO desde SVG (2026-06-11, nodos 1159:4466/4598/4834):**
> - **Ícono**: path **EXACTO** de Figma (user relleno cabeza+cuerpo), 24px en círculo 32px — reemplaza la aproximación círculo+elipse.
> - **Borde**: gradiente `#fff → #FBC47D 25% → #AE8EFF 75% → #fff` (era blanco sólido 0.7).
> - **Círculo del ícono**: corregido a **blanco 0.2** (lo había puesto oscuro `rgba(0,0,0,0.12)` guiándome por el PNG 2x — el SVG confirma `white 0.2`).
> - **min-width 116px** (ancho fijo). Gradientes default/hover/pressed ya coincidían; ícono+texto pressed `#E1E3E2` vía currentColor.
> - Spec: `.claude/concorde/inbox/figma-ButtonIngresa-PrimarySm-svg-export.json`

---

## Matriz de color exacta (Figma) — Medium

### Primary `.pvbtn` (200×48 · 16px)
| Estado | Figma | Concorde hoy | Match |
|--------|-------|--------------|-------|
| Default | `#ed8936 → #ed8936(40%) → #8460e5` | orange-600 → vault-500 | ≈ afinar |
| Hover | `#fbc47d → #ae8eff` | orange-400 → vault-400 | ≈ afinar |
| Pressed | `#d46e20 → #5a35c2` | orange-700 → vault-600 | ≈ afinar |
| Disabled | `#e1e3e2` | `#e1e3e2` | ✅ exacto |

### Secondary `.psec` (186×48 · 16px)
| Estado | Figma | Concorde hoy | Match |
|--------|-------|--------------|-------|
| Default | `#8460e5 → #3b1782` | vault-500 → vault-700 | ≈ afinar |
| Hover | `#ae8eff → #5a35c2` | vault-400 → vault-600 | ≈ afinar |
| Pressed | `#3b1782 → #22005c` | vault-700 → vault-900 | ≈ afinar |
| Disabled | `#e1e3e2` | `#e1e3e2` | ✅ exacto |

### Ghost `.pghost` (215×48 · 16px)
| Estado | Figma | Concorde hoy | Match |
|--------|-------|--------------|-------|
| Default | transparente | transparent | ✅ |
| Hover | `#ffffff → #fff0e2` | `#fff → rgb(255,240,226)` | ✅ exacto |
| Pressed | `#d46e20 → #b73700` | `rgb(212,110,32) → rgb(183,55,0)` | ✅ exacto |
| Disabled | transparente | transparent | ✅ |

---

## 🆕 Faltan en Concorde (sí están en Figma)

### Negotiable (teal → morado) · Medium 200×48
| Estado | Figma |
|--------|-------|
| Default | `#00aeb1 → #8460e5` |
| Hover | `#00cccc → #ae8eff` |
| Pressed | `#009095 → #5a35c2` |

### Outline (borde, fondo transparente) · Medium 215×48
| Estado | Figma |
|--------|-------|
| Default | transparente |
| Hover | `#ffffff → #fff0e2` |
| Pressed | `#d46e20 → #b73700` |

### Tamaño Small (texto plano) — follow-up
Figma tiene Small (40px/14px) para Primary y Secondary. Hoy los slots "sm" de Concorde son los botones con avatar (`sm-guest`/`sm-logged-in`). Agregar el eje Size a las variantes de texto es un refactor aparte (anotado, no en este sync).

---

## Plan de sync (alcance: TODO — afinar colores + agregar variantes)
1. Fijar los hex exactos de Figma en Primary/Secondary (hover/pressed) → `tokens.css`.
2. Agregar variante **Negotiable** (teal) reusando el patrón de animación de primary.
3. Agregar variante **Outline** (borde naranja + fondo transparente) reusando el patrón de ghost.
4. Mantener intactas TODAS las animaciones (transform/transition/glow/focus/reduced-motion).
5. `/handoff/button` queda mostrando el código final copiable.

## Aplicado previamente
- ✅ Ícono del sm-guest ("Ingresa") cambiado de contorno a relleno (nodo 1312:4675).
