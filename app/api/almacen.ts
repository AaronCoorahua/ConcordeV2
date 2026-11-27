/**
 * almacen.ts — dónde guardan sus JSON los tableros (/api/polish y /api/tablero).
 *
 *  - En Vercel: Vercel Blob, privado (el almacén `concorde-polish`). Los archivos del
 *    deploy son de solo lectura, por eso no pueden vivir en el repo.
 *  - En local (`npm run dev`): un archivo en `.datos-locales/` dentro del proyecto,
 *    ignorado por git. Así lo que se prueba en la laptop nunca toca producción,
 *    aunque `.env.local` tenga el token del Blob.
 *
 * `version` sirve para no pisar otro cambio: se escribe solo si nadie guardó desde que
 * se leyó; si alguien lo hizo, `escribir` lanza `Conflicto` y quien llama vuelve a leer.
 * En Vercel la versión es el etag del Blob. En local es el propio contenido leído, y
 * lecturas y escrituras van de una en una (dos cambios seguidos llegan a la vez).
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";

const ACCESO = "private" as const;
// turbopackIgnore: la carpeta solo existe en local; sin esto el build rastrea todo el proyecto.
const CARPETA_LOCAL = path.join(/* turbopackIgnore: true */ process.cwd(), ".datos-locales");
/** En local, cuando el archivo todavía no existe. */
const SIN_ARCHIVO = "(sin archivo)";
/** Cola del archivo local: cada lectura o escritura espera a que termine la anterior.
 *  En Windows no se puede reemplazar un archivo mientras otro lo está leyendo. */
let turno: Promise<unknown> = Promise.resolve();

function enTurno<T>(tarea: () => Promise<T>): Promise<T> {
  const resultado = turno.then(tarea);
  // Un fallo de esta tarea no debe trabar a las que vienen detrás.
  turno = resultado.catch(function seguir() {});
  return resultado;
}

export class Conflicto extends Error {
  constructor() {
    super("alguien guardó al mismo tiempo");
  }
}

function enVercel(): boolean {
  return Boolean(process.env.VERCEL);
}

/** En Vercel hace falta el Blob conectado; en local siempre se puede guardar. */
export function hayAlmacen(): boolean {
  if (!enVercel()) return true;
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function rutaLocal(nombre: string): string {
  return path.join(/* turbopackIgnore: true */ CARPETA_LOCAL, ...nombre.split("/"));
}

async function leerLocal(nombre: string): Promise<string | null> {
  try {
    return await readFile(rutaLocal(nombre), "utf8");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

/** El contenido guardado, o `null` si todavía no existe. */
export async function leer(nombre: string): Promise<{ texto: string | null; version?: string }> {
  if (!enVercel()) {
    const texto = await enTurno(() => leerLocal(nombre));
    return { texto, version: texto ?? SIN_ARCHIVO };
  }
  // Sin pasar por la caché del CDN: siempre lo último que se guardó.
  const resultado = await get(nombre, { access: ACCESO, useCache: false });
  if (!resultado || resultado.statusCode !== 200) return { texto: null };
  return { texto: await new Response(resultado.stream).text(), version: resultado.blob.etag };
}

export async function escribir(nombre: string, texto: string, version?: string): Promise<void> {
  if (!enVercel()) {
    return enTurno(async function escribirLocal() {
      const actual = (await leerLocal(nombre)) ?? SIN_ARCHIVO;
      if (version !== undefined && actual !== version) throw new Conflicto();
      const ruta = rutaLocal(nombre);
      await mkdir(path.dirname(ruta), { recursive: true });
      // Primero a un temporal y luego se renombra: un corte a medias no deja el JSON roto.
      await writeFile(`${ruta}.tmp`, texto, "utf8");
      await rename(`${ruta}.tmp`, ruta);
    });
  }
  try {
    await put(nombre, texto, {
      access: ACCESO,
      contentType: "application/json",
      addRandomSuffix: false,
      ...(version ? { allowOverwrite: true, ifMatch: version } : {}),
    });
  } catch (e) {
    // Sin versión el archivo no existía: si falla es porque alguien lo creó a la vez.
    if (e instanceof BlobPreconditionFailedError || !version) throw new Conflicto();
    throw e;
  }
}
