# Skill: concorde-sync
**Paso 2 de Concorde — Auditar y actualizar un componente contra la VERDAD de Figma, manteniendo la interacción.**
**Fuente visual: Figma (REST API, token gratis) · Fuente de interacción: Voyager (intacta)**

---

## Para qué existe

`/concorde` (paso 1) genera el componente desde el **preview de Voyager** → interacción correcta, pero los valores visuales quedan congelados de lo construido en Claude Code. En Figma esos componentes evolucionaron (tipo de letra, weight, altura, íconos, spacing). Este skill es el **paso 2**: trae la verdad visual de Figma **sin tocar la interacción**.

```
/concorde-sync Button
/concorde-sync Button --variant sm-logged-in
/concorde-sync Button --report-only      # solo audita, no escribe cambios
```

## Flujo designer → developer

```
RUTA PLUGIN (preferida — sin cuota de API):
1. Designer selecciona el componente en Figma (todos sus estados, o el set completo)
2. Corre el plugin "Concorde Exporter" → 🚀 Enviar a Concorde
   → JSON exacto cae en .claude/concorde/inbox/
3. Le dice a Claude "llegó <Nombre> al inbox" (o usa el prompt de /sync)
4. Claude ejecuta este skill: crea/actualiza el componente
   (visual EXACTO de Figma + animación de Concorde) y documenta todo
5. Developer abre /handoff/{componente} → copia el código tal cual

RUTA LINKS (fallback con REST API):
1. Designer entra a /sync → pega nombre + LINKS de Figma
   (1 link = estático · varios = 1 por estado) y elige crear/actualizar
2. Copia el prompt → se lo pega a Claude → mismo resultado
```

---

## Principio central: dos capas

| Capa | Fuente de verdad | Qué incluye | En este skill |
|------|------------------|-------------|---------------|
| **Interacción** | Voyager preview | `transition`, `:hover/:active/:focus` transforms, timing, `@keyframes`, choreography | **NO se toca** |
| **Visual / estática** | **Figma** | tipografía (family/size/weight/line-height/letter-spacing), dimensiones (height/padding/gap), radius, color base, **ícono**, orden de hijos | se sincroniza |

**Regla absoluta:** el reconciler solo edita el **bloque base** de cada clase CSS (ej. `.pvbtn { … }`) y los íconos. NUNCA edita reglas `:hover`, `:active`, `:focus-visible`, `transition`, `@property` ni `@keyframes`. Los colores derivados de los estados se re-expresan **relativos** al token base para que cascadeen.

---

## PASO 0 — Inicialización

1. Leer `concorde-manifest.json`:
   - `figma_file_key` a nivel raíz (si vacío → STOP: "Falta el file key de Figma en el manifest").
   - Del componente: `figma_page` + `figma_section` (+ `figma_name` / `figma_node_id` opcional).
   - Si no hay ni `figma_node_id` ni (`figma_page` + `figma_section`) → STOP: "Indica page+section o un node-id para {Componente}".
2. Verificar `FIGMA_TOKEN` en el entorno. Si no está → STOP con instrucciones (Settings → Security → Personal access tokens; funciona en plan gratis).
3. Leer `concorde-config.json` (reglas de código del repo — el config GANA siempre).
4. Leer `.claude/concorde/token-map.json` y `src/styles/tokens.css` (estado actual de tokens).

---

## PASO 1 — Agent A: Figma Extractor

### Fuente A (PREFERIDA): plugin "Concorde Exporter" — sin API, sin cuota
El designer corre el plugin (`figma-plugin/`, ver su README) sobre el componente
seleccionado y el JSON completo aterriza en **`.claude/concorde/inbox/figma-<Nombre>-*.json`**.
Ese JSON es MÁS rico que la REST API: W×H del frame real, auto-layout, gradientes con
stops, tipografía por nodo, variantes y el **`svg` exacto de cada ícono** (usarlo tal cual,
NUNCA aproximar íconos a ojo) + `previewPng` para comparación visual.
→ Si hay un archivo del componente en el inbox, **usarlo y saltar la REST API**.
Colores del JSON del plugin vienen en r/g/b 0–1 → convertir a hex: `Math.round(v*255)`.

### Fuente C (manual, SIEMPRE funciona): export SVG por estado
Si el plugin no corre y la cuota REST está agotada, el designer exporta cada **estado**
del componente como SVG desde Figma (seleccionar frame → panel Export → SVG) y los pega
en el chat o los deja en `.claude/concorde/inbox/`. Convención de nombre:
`Variant=Negotiable, Size=Medium, State=Hover.svg` (el nombre de la variante ya lo trae).

El SVG trae la verdad visual COMPLETA y exacta:
- `<rect width height rx>` → tamaño REAL del botón y radius (¡los sets usan ancho FIJO!)
- `<linearGradient>` → stops y dirección exactos del fill Y del borde
- `<filter>` feDropShadow/innerShadow → box-shadows por estado (offset/blur/color/alpha)
- paths de íconos → SVG exacto para incrustar
- fill del texto → color por estado

Lo que NO trae (completar de otra fuente o preguntar): familia/tamaño/weight de fuente
(el texto viene vectorizado) y los paddings de auto-layout (inferibles del ancho fijo).
Ejemplo real: Button/negotiable se sincronizó 100% con este método (ver FIGMA-AUDIT.md).

### Fuente B (fallback): REST API con links
**Input: LINKS de Figma pegados por el designer** (vía la página `/sync` de Concorde).
El link ya trae file key + node-id — no hace falta page/section ni ids manuales:

```bash
# Uno o varios links separados por coma (1 link = estático; varios = 1 por estado)
node .claude/concorde/figma-extract.mjs \
  --node "https://figma.com/design/KEY/X?node-id=1807-14907,https://figma.com/design/KEY/X?node-id=1807-14943" \
  --images --svg --out .claude/concorde/_spec-<Componente>.json
```

Flags útiles: `--svg` exporta los íconos como SVG real (NUNCA aproximar íconos a ojo);
`--list` imprime el árbol con tamaños; `--find <nombre>` localiza nodos en todo el archivo;
`--cache` reusa respuestas guardadas sin gastar cuota.

### ⚠️ Medición de tamaños — frame interno
Las variantes de un set suelen ENVOLVER al botón real en un frame interno
(`COMPONENT "Variant=Primary..." > FRAME "Button"`). El extractor mide ese frame
interno (`measuredFrom` lo indica). El width del contenedor está inflado por el mock —
**no usarlo**. Además los botones son hug-content: lo que se traslada a CSS es
height + padding + gap, no un width fijo.

### ⚠️ Cuota de la API (plan gratis)
Cada llamada gasta cuota mensual; `/files/:key` completo es CARO. Preferir `--node`
con ids/links específicos. Todas las respuestas se cachean en `.claude/concorde/_api-cache/`;
ante cuota agotada (429 con retry-after de horas) el extractor cae al cache solo.

Alternativa legacy (sin links): `--file <KEY> --page "<página>" --section "<sección>" --name "<nombre>"`.

Salida = **FigmaSpec JSON** normalizado por nodo: `{ nodeId, props, dimensions, layout, radius, fill, typography, icons[], prototype[], childOrder[], imageUrl }`.

### Component sets (lo normal en un DS)
Un `COMPONENT_SET` (ej. "✦ Button") se **expande solo** en sus variantes. Cada variante trae `props` con TODAS sus dimensiones de Figma, ej. `{ Variant: "Primary", Size: "Medium", State: "Hover" }`. El extractor agrupa en `variantsMatrix` por **todas las props menos `State`** (así NO se mezclan Size: Small vs Medium que comparten Variant+State — bug clásico).

- Mapeo a CSS: `Variant` → clase · `Size` → escala (sm/md) · `State` → pseudo-selector (`:hover`/`:active`/`:disabled`).
- **Localizar el set:** `--find Button` escanea todo el archivo y lista nodos+página.

### Prototype = animación (secundaria)
`prototype[]` trae las reactions de Figma (ON_HOVER, SMART_ANIMATE, duration, easing). **Precedencia:** Voyager/Concorde manda en el movimiento; el prototype solo (a) llena huecos y (b) se reporta en el audit si su timing difiere. En la práctica suele venir **vacío** → la animación es 100% de Concorde.

Red flags → STOP (no inventar): página/sección no encontrada, 403 (token sin acceso al archivo), 0 nodos botón.

> **Upgrade futuro (Dev Mode MCP):** si hay MCP de Figma, reemplazar SOLO este agente por `get_design_context(node_id)`. El resto del pipeline no cambia.

---

## PASO 2 — Agent B: Auditor / Differ

1. Parsear el `.tsx` del componente y aislar, por cada clase de variante (ej. `.pvbtn`, `.psec`, `.pghost`, `.pvbtn-sm`, `.pvbtn-auth-d`), **solo la regla base** (ignorar `:hover/:active/:focus/::before/::after` y `@media`).
2. Comparar cada propiedad VISUAL contra el FigmaSpec del nodo equivalente:
   - tipografía: `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
   - dimensiones: `height`, `padding`, `gap`
   - `border-radius`, color/fill base
   - **íconos**: ¿el SVG inline del `.tsx` corresponde al ícono del nodo Figma? (nombre/geometría)
   - **orden de hijos**: childOrder de Figma vs orden en el JSX
3. Clasificar cada delta `visual | interacción` y severidad `alta | media | baja`.
4. Escribir `src/components/{Componente}/FIGMA-AUDIT.md`:

```markdown
# FIGMA-AUDIT — {Componente}
Fecha: {fecha} · Figma: {page} / {section} / nodo {nodeId}

| Propiedad | Concorde | Figma | Clase | Severidad | Acción |
|-----------|----------|-------|-------|-----------|--------|
| font-weight (sm-logged-in username) | 700 | 500 | visual | alta | aplicar Figma |
| icon (sm-logged-in) | UserIcon inline | "ic-user-circle" | visual | alta | swap |
| height (primary) | 48px | 48px | — | — | ok |
| hover transform | translateY(-2px) | — | interacción | — | mantener |
```

Si `--report-only` → terminar aquí y mostrar el reporte.

---

## PASO 3 — Agent C: Token reconciler (sistémico)

Para colores / escala tipográfica / spacing que provienen de **variables de Figma**:
1. Mapear cada variable de Figma → su `--vmc-*` en `src/styles/tokens.css`.
2. Actualizar el VALOR en `tokens.css` (un solo `:root` → se propaga a todos los componentes).
3. Registrar el cambio en `.claude/concorde/token-map.json` (`source: "figma"`, fecha).
4. Convertir color hex/sRGB de Figma a `oklch` cuando el componente usa transiciones `@property <color>` (para no romperlas); si no, dejar hex.

NO tocar valores que sean puramente de interacción.

---

## PASO 4 — Agent D: Component reconciler (estructural)

Para los deltas VISUALES que NO son tokens sistémicos (ícono, orden de hijos, padding específico):
1. Editar **solo el bloque base** de la clase en el `.tsx`.
2. **Swap de íconos**: si Figma usa otro ícono, reemplazar el componente SVG inline por el del nodo (export `GET /images` o el SVG del nodo). Mantener `width/height/aria-hidden`.
3. Reordenar hijos del JSX si `childOrder` difiere.
4. **Colores derivados de estados**: si cambió el color base, recalcular los `:hover/:active` como deltas relativos del nuevo token base — pero la regla de transform/timing queda intacta.
5. Respetar `concorde-config.json` (ej. `no_any`, `spacing_grid: 8`).

Verificar tras editar: las reglas `:hover/:active/:focus-visible/transition/@keyframes` quedaron **byte-idénticas**.

---

## PASO 5 — Agent E: Handoff updater

1. Actualizar las tablas de `{Componente}Handoff.tsx` (variantes, estados, tokens de color) con los valores ya sincronizados.
2. Agregar badge **"✓ Figma-synced {fecha}"** en el header del handoff.
3. (Opcional) En `src/app/handoff/{componente}/page.tsx` agregar modo **lado-a-lado**: componente vs `imageUrl` del FigmaSpec, mismo tamaño, para verificar a ojo.

---

## Guardrails

Edita SOLO:
- `src/components/{Componente}/` (`.tsx`, `Handoff.tsx`, `FIGMA-AUDIT.md`)
- `src/app/handoff/{componente}/page.tsx`
- `src/styles/tokens.css`
- `.claude/concorde/token-map.json` y archivos `_spec-*.json` temporales

NUNCA: `package.json`, `tsconfig.json`, configs del repo, ni otros componentes.

**Intervención humana obligatoria:** mostrar `FIGMA-AUDIT.md` y pedir confirmación ANTES de aplicar cambios (Pasos 3–5). Con `--report-only` nunca escribe.

---

## Red flags — STOP

- `FIGMA_TOKEN` ausente o 403 → no continuar, avisar.
- Página/sección/nodo no encontrado → no adivinar.
- Un delta tocaría una regla `:hover/:active/:focus/@keyframes` → es interacción, NO aplicar (Voyager manda).
- Color de Figma rompería una transición `@property` → convertir a oklch antes, no romper la animación.
