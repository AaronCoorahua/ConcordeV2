---
name: polish
description: Convierte una captura de pantalla en un ticket de polish para IT. Úsala cuando pasen una imagen de producción o de un componente y pregunten qué componente de Concorde es, qué hay que corregir, "cuál sería su polish", o pidan crear un ticket/corrección para el tablero /polish. Identifica el componente, saca del código real de Concorde lo que IT necesita y crea la página del ticket.
---

# Skill: polish

**De una captura a un ticket que IT puede aplicar sin preguntar.**

El equipo de diseño ve algo en producción que no quedó como en Concorde (o que se puede
mejorar). Esta skill identifica qué componente es, lee su código real y deja un ticket en el
tablero `/polish` con la comparación y el código exacto de la corrección.

## Activación

```
/polish            + captura pegada en el chat (+ opcional: qué se ve mal, código de producción)
"¿qué componente es este y cuál sería su polish?"   + captura
```

## Qué recibes

- **La captura** (obligatoria). Pegada en el chat llega con su ruta: `[Image: source: C:\…\1.png]`.
  Esa ruta es el archivo que vas a copiar. Si no hay ruta ni archivo, pídelo.
- **Qué está mal** (opcional). Si no lo dicen, lo deduces comparando con Concorde.
- **Código de producción** (opcional): HTML/CSS copiado de DevTools o del repo de IT.

## Pasos

### 1. Identifica el componente

Ve de lo grande a lo chico: primero la pantalla, después la pieza.

1. **Pantalla → bloque.** `app/blocks/_components/blocks-nav.ts` lista los bloques y sus
   versiones; la tabla «Bloques existentes» de `CLAUDE.md` dice qué pantalla de VMC es cada uno.
2. **Pieza → componente.** En `app/blocks/{id}/page.tsx` el array `REQUIRED` lista los
   componentes del bloque con un `role` que dice dónde va cada uno. `public/r/registry.json`
   es el índice completo.
3. **Confirma leyendo el código**, no por el nombre: abre `src/components/{Nombre}.tsx` y
   comprueba que los textos, la estructura y los estados coinciden con la captura.

Di cuál es y por qué. Si dudas entre dos, nombra los dos y qué los distinguiría; no elijas
al azar. Si la pieza no existe en Concorde, dilo: el ticket será una mejora propuesta (ver paso 3).

### 2. Saca la corrección del código real

Lee el componente y el bloque donde se usa y anota los valores que explican la diferencia:
tamaños, espaciados, radios, colores, gradientes, tipografía, estados (`:hover`, `:active`,
`:focus-visible`, `disabled`), transiciones.

Una captura no da píxeles exactos. Lo que solo estimas a ojo va marcado como «a confirmar»,
y si la diferencia depende de un valor que no se ve (un `gap`, un `transition`), pide el
HTML/CSS de producción antes de afirmarlo.

### 3. Crea el ticket

Un ticket es una entrada de `app/reporte/reportData.ts` (tipo `ReportEntry`). Va **al
principio** de `REPORT_ENTRIES`.

| Campo | Regla |
|---|---|
| `slug` | kebab-case, único. Nombra las imágenes y la URL. |
| `title` | `Área — problema`. Lo que va antes de ` — ` (raya con espacios) es la etiqueta de la tarjeta en el tablero: la pantalla o el componente (`Sidebar`, `Detalle`, `Like button`). |
| `date` | Fecha de hoy: `25 nov 2026`. |
| `status` | Siempre `"pendiente"` en un ticket nuevo. |
| `originalImage` | Copia la captura a `public/assets/reporte/<slug>-original.png`. Varias: `-original-1.png`, `-original-2.png` y un array. |
| `problem` | Qué está mal. Una idea por elemento del array, frases cortas. |
| `cause` | Opcional, una línea. Solo si se sabe. |
| `fix` | Cómo se corrige, con los valores concretos. |
| `codeOriginal` | **Solo** código de producción real que te hayan pasado. Si no hay, omite el campo: no lo inventes. |
| `codeConcorde` | Lo que IT tiene que tener, copiado del archivo real. Primera línea: comentario con el archivo de origen. Solo las líneas que cambian, con `// ←` en lo importante. |
| `codeLink` | Ruta del bloque: `/blocks/{id}`. |
| `handoffLink` | Ruta del componente: `/handoff/{id}`. |

**Lado Concorde de la comparación**, elige uno:

- `concordeImage`: captura de Concorde en `public/assets/reporte/<slug>-concorde.png`. Sácala
  del bloque o del handoff si tienes navegador; si no, pídela. No apuntes a un archivo que no existe.
- `concordeEmbed`: el bloque en vivo, si tiene ruta `embed` (`/blocks/sidebar/embed`,
  `/blocks/index/embed`, `/blocks/valoriza/embed`, `/blocks/vendo-mis-cosas/embed`).
- `concordeComponent: "none"` con `concordeImage: ""`: no hay lado Concorde; producción ocupa
  todo el ancho. Úsalo para bugs de comportamiento (un video) o cuando no hay con qué comparar.

**Dos tipos de ticket:**

- **Producción no coincide con Concorde.** La corrección es igualar a Concorde; el código es
  el del componente tal cual.
- **Mejora propuesta** (Concorde tampoco lo tiene). Dilo en la primera línea de `codeConcorde`
  («Mejora recomendada…») y parte del componente de Concorde más cercano.

Usa como modelo las entradas que ya existen: `sidebar-logo-y-conteo` (no coincide) y
`actividad-empty-state-pills-grises` (mejora propuesta).

### 4. Comprueba

- `npx tsc --noEmit` pasa.
- `/polish` muestra la tarjeta en «Por hacer» con la etiqueta de área correcta.
- `/polish/<slug>` carga las imágenes y el código.

### 5. Responde

1. Qué componente es (nombre + `/handoff/{id}`) y en qué bloque vive.
2. Las diferencias, cada una con su valor correcto. Marca las que estén «a confirmar».
3. La ruta del ticket: `/polish/<slug>`.
4. Un mensaje corto para pegarle a IT: qué pantalla, qué cambia y el enlace al ticket.

## Qué no hacer

- **No toques `src/`.** Concorde es la referencia; el ticket describe lo que cambia en
  producción. Si el error está en Concorde, avisa y pregunta antes de corregirlo.
- **No cambies el `status` de tickets existentes** para moverlos de columna. Los movimientos
  se hacen en el tablero y se guardan aparte (`app/api/polish/route.ts`); el `status` del
  archivo solo es la columna inicial.
- **No inventes código de producción** ni valores que no viste.
- **No hagas commit ni push** si no te lo piden. Avisa de que el ticket no aparece en la web
  hasta que se suba: el deploy sale solo al hacer push a `master`.
