# Concorde Exporter — plugin de Figma

Extrae el JSON completo de un componente (medidas exactas, gradientes, tipografía,
auto-layout y el **SVG real de los íconos**) y lo manda directo a Concorde.
**Gratis** — los plugins propios corren en cualquier plan y **no gastan cuota de la REST API**.

## Instalación (una sola vez, ~1 minuto)

1. Abre la **app de escritorio de Figma** (los plugins en desarrollo se importan desde ahí).
2. Menú **Plugins → Development → Import plugin from manifest…**
3. Selecciona `Concorde/figma-plugin/manifest.json` de este repo.
4. Listo — queda como "Concorde Exporter" en tu lista de plugins de desarrollo.

## Uso

1. Asegúrate de que el dev server de Concorde esté corriendo (`npm run dev`).
2. En Figma, **selecciona el componente** en el canvas.
   - Componente con estados: selecciona los frames de TODOS los estados (default, hover, pressed…) con Shift+clic.
   - Componente estático: selecciona solo ese frame.
   - Tip: si seleccionas el **component set** completo (el marco morado "✦"), se exportan todas las variantes de una.
3. **Plugins → Development → Concorde Exporter**
4. Ponle nombre al componente y dale **🚀 Enviar a Concorde**.
   - El JSON aterriza en `.claude/concorde/inbox/figma-<Nombre>-<fecha>.json`.
   - Si el server no corre, usa **📋 Copiar JSON** y pégaselo a Claude en el chat.
5. Dile a Claude: *"llegó el export de <Nombre> al inbox, créalo/actualízalo en Concorde"* — o genera el prompt desde `/sync`.

## Qué incluye el JSON

- Jerarquía completa de nodos con W×H reales (el botón interno, no el contenedor del mock)
- Auto-layout: padding, gap, alineación, sizing (hug/fill)
- Fills con gradientes exactos (stops + posiciones), strokes, radius, efectos (sombras/blur)
- Tipografía: familia, estilo, tamaño, weight, line-height, letter-spacing por nodo de texto
- Variantes (`variantProperties`) cuando exportas un component set
- `svg`: el SVG **exacto** de cada ícono (vectores ≤80px) — sin aproximaciones
- `previewPng`: render 2x en base64 para comparación visual lado a lado
