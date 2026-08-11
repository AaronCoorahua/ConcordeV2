# Referencias de Figma — correos

Aquí van los exports de Figma que sirven de **verdad visual** para comparar contra
el correo maquetado, en la vista `/correos/{id}` (botón «Comparar Figma»).

## Cómo agregar uno

1. En Figma, selecciona el frame del correo → **Export**.
2. Guarda el archivo aquí con el **id exacto del correo** como nombre:

```
public/figma/correos/{id-del-correo}.{html|svg|png}
```

3. Listo — no hay que tocar código. La vista lo detecta sola y reemplaza el
   skeleton por la referencia.

## Formatos y prioridad

Se aceptan tres formatos. Si un correo tiene **varios archivos con el mismo
nombre**, gana el primero de esta lista:

| # | Formato | Cuándo usarlo |
|---|---------|---------------|
| 1 | `.html` | El más fiel: el texto sigue siendo texto (se puede seleccionar y comparar palabra por palabra) y no se pixela al escalar. |
| 2 | `.svg`  | Vectorial, misma ventaja de escala. El default para la mayoría de frames. |
| 3 | `.png`  | Último recurso, para frames cuyos gradientes o `backdrop-filter` no sobreviven al export vectorial. |

Así que si dejas `listo-participar.html` y `listo-participar.svg`, se muestra el
`.html`; para volver al `.svg` basta renombrar o borrar el `.html`.

## El id del correo

Es el mismo que va en la URL. Por ejemplo, para `/correos/listo-participar`:

```
public/figma/correos/listo-participar.svg
```

Los ids salen de `EMAILS` en `src/emails/prodEmails.ts` (campo `id`).

## Notas

- Si no existe ningún archivo, la columna derecha muestra un skeleton con el
  nombre que falta — sirve de recordatorio de cuáles quedan pendientes.
- Las imágenes (`svg`/`png`) se ajustan por **alto** al del correo maquetado y se
  centran, así que no importa el tamaño de exportación.
- El `.html` se pinta en un `<iframe>` con `sandbox` vacío: **no ejecuta scripts**.
  Es una referencia de diseño, no una app; si tu export depende de JS para verse
  bien, expórtalo como `svg` o `png`.
