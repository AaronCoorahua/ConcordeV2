# concorde — CLI

CLI del registry de **Concorde** (design system de Subastop). Copia componentes y
bloques a la carpeta `concorde/` de tu proyecto, con imports relativos y sin tocar
tu config.

> Esta es una rama dedicada (`cli`) del repo [ConcordeV2](https://github.com/AaronCoorahua/ConcordeV2).
> Contiene solo el CLI (un archivo, sin dependencias) para que `npx` sea liviano.

## Uso

```bash
# un componente
npx github:AaronCoorahua/ConcordeV2#cli add button

# un bloque (incluye sus componentes)
npx github:AaronCoorahua/ConcordeV2#cli add homepage

# varios a la vez
npx github:AaronCoorahua/ConcordeV2#cli add cardtitle offercard
```

## Opciones

| Flag | Efecto |
|------|--------|
| `-f`, `--force` | sobrescribe archivos existentes sin preguntar |
| `-s`, `--skip` | salta archivos existentes sin preguntar |
| `-h`, `--help` | ayuda |
| `-v`, `--version` | versión |

Si un archivo ya existe, en terminal interactiva pregunta si sobrescribir o saltar.

El registry vive en `https://concorde-v2-theta.vercel.app/r/`. Puedes apuntar a otro
con la variable `CONCORDE_REGISTRY`.
