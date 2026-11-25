---
name: polish
description: Crea un ticket de polish para IT en el tablero /polish de Concorde. Úsala cuando digan qué hay que arreglar o mejorar en una pantalla de VMC (con link, captura o video) o pregunten "cuál sería su polish". Ubica el componente en Concorde, marca el código que cambia, saca las capturas y deja el ticket listo.
---

# /polish: de "esto se ve mal" a un ticket que IT aplica sin preguntar

Un ticket es una entrada de `REPORT_ENTRIES` en `app/reporte/reportData.ts`; el tipo `ReportEntry` documenta cada campo. Se ve en `/polish?ticket=<slug>`.

## 1. Pide lo que falte, en un solo mensaje

- **Qué se quiere arreglar.** Obligatorio.
- **Producción:** link de la página, o captura o video pegado. Si la página pide login, pide la captura.
- **Concorde:** link del bloque o componente. Opcional: si no lo dan, lo buscas tú.
- **Código de producción** (HTML/CSS de DevTools). Opcional. Sin él no hay `codeOriginal`; nunca lo inventes.

No preguntes lo que puedes averiguar.

## 2. Ubica la pieza en Concorde

Busca en `src/` los textos que se ven en la captura. Cruza con `REQUIRED` en `app/blocks/<id>/page.tsx`, que dice qué componente va en qué parte del bloque. Confirma leyendo el `.tsx`. Si dudas entre dos, dilo. Si no existe en Concorde, es una mejora propuesta.

## 3. Marca el código

Del componente real, copia solo lo que IT tiene que cambiar o tener:
- Primera línea: `// <archivo de origen>`, más `// Mejora recomendada` si Concorde tampoco lo tiene.
- Cada valor clave con `// ←`: tamaño, espacio, radio, color, gradiente, estados (`:hover`, `:active`, `:focus-visible`, `disabled`), transición.
- Lo que solo estimas desde la captura va marcado "a confirmar".

## 4. Saca las imágenes

Con `npm run dev` corriendo:

```bash
node scripts/polish-captura.mjs <url de producción> public/assets/reporte/<slug>-original.png --selector "<css>"
node scripts/polish-captura.mjs http://localhost:3000/blocks/<id> public/assets/reporte/<slug>-concorde.png --selector "<css>"
node scripts/polish-captura.mjs <video.mp4> public/assets/reporte/<slug>-poster.jpg --segundo 3
```

- `--selector` recorta al componente. Usa el mismo encuadre en los dos lados para que la comparación se lea sola.
- Si un aviso tapa la página: `--clic "text=Aceptar"` o `--ocultar "<css>"`. Para móvil: `--movil`.
- Captura pegada en el chat: copia el archivo desde la ruta `[Image: source: …]`.
- Video: `originalVideo`, `originalImage: ""` y en `originalPoster` un cuadro donde se vea el problema. Es la miniatura de la tarjeta.
- Mira cada imagen antes de usarla. Si salió un login, vacía o cortada, repite o pide la captura.

## 5. Escribe el ticket

Al principio de `REPORT_ENTRIES`, con la forma de `sidebar-logo-y-conteo`:
- `title`: `Área — problema`. Lo que va antes de la raya es la etiqueta de la tarjeta.
- `status: "pendiente"` y `date` de hoy, en formato `25 nov 2026`.
- `problem` y `fix`: frases cortas, una idea por línea, con los valores.
- `codeLink: "/blocks/<id>"` y `handoffLink: "/handoff/<componente>"`.

## 6. Comprueba y entrega

Corre `npx tsc --noEmit` y abre `/polish?ticket=<slug>`: tienen que verse las dos imágenes y el código.

Responde con:
1. Componente y bloque.
2. Los cambios, cada uno con su valor.
3. El link del ticket.
4. Un mensaje de dos o tres líneas para IT.

No toques `src/`: Concorde es la referencia. No hagas push si no lo piden; el ticket no sale en la web hasta el push a `master`.
