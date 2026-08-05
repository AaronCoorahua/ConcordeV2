# Referencias de Figma — correos

Aquí van los SVG exportados de Figma que sirven de **verdad visual** para comparar
contra el correo maquetado, en la vista `/correos/{id}` (botón «Comparar Figma»).

## Cómo agregar uno

1. En Figma, selecciona el frame del correo → **Export** → `SVG`.
2. Guarda el archivo aquí con el **id exacto del correo** como nombre:

```
public/figma/correos/{id-del-correo}.svg
```

3. Listo — no hay que tocar código. La vista lo detecta sola y reemplaza el
   skeleton por la imagen.

## El id del correo

Es el mismo que va en la URL. Por ejemplo, para `/correos/listo-participar`:

```
public/figma/correos/listo-participar.svg
```

Los ids salen de `EMAILS` en `src/emails/prodEmails.ts` (campo `id`).

## Notas

- Si el archivo no existe, la columna derecha muestra un skeleton con el nombre
  del archivo que falta — sirve de recordatorio de cuáles quedan pendientes.
- El SVG se muestra a ancho completo de su columna, escalado proporcionalmente,
  así que no importa el tamaño de exportación.
- También se aceptan `.png` con el mismo nombre, por si un frame de Figma no
  exporta bien a SVG (los gradientes con `foreignObject`/`backdrop-filter` son el
  caso típico). Si existen ambos, gana el `.svg`.
