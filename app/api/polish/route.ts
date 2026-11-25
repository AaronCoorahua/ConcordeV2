/**
 * /api/polish — en qué columna del tablero /polish está cada ticket.
 *
 * No hay base de datos: es UN archivo JSON (`polish/estados.json`) en Vercel Blob,
 * con la forma { "<slug>": "<columna>" }. Solo guarda los tickets que alguien movió;
 * el resto sigue en la columna que dice app/reporte/reportData.ts.
 *
 * Los archivos del deploy son de solo lectura en Vercel, por eso el JSON no puede
 * vivir en el repo ni en public/: cada push lo reemplazaría y no se puede escribir.
 *
 * Sin almacén conectado (no existe BLOB_READ_WRITE_TOKEN, p. ej. en local) responde
 * `compartido: false` y el tablero guarda los cambios en el navegador.
 *
 * Para activarlo: en Vercel, Storage → crear un Blob store PRIVADO y conectarlo al
 * proyecto. Vercel agrega la variable sola; hace falta un nuevo deploy.
 */

import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import { REPORT_ENTRIES } from "@/app/reporte/reportData";
import { isPolishStatus, type PolishStatus } from "@/app/polish/polishData";

export const dynamic = "force-dynamic";

const ARCHIVO = "polish/estados.json";
const ACCESO = "private" as const;
const INTENTOS = 4;

type Estados = Record<string, PolishStatus>;

function hayAlmacen(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function limpiar(crudo: unknown): Estados {
  const estados: Estados = {};
  if (typeof crudo !== "object" || crudo === null) return estados;
  for (const [slug, status] of Object.entries(crudo)) {
    if (isPolishStatus(status)) estados[slug] = status;
  }
  return estados;
}

/** Lee el JSON sin pasar por la caché del CDN: siempre lo último que se guardó. */
async function leer(): Promise<{ estados: Estados; etag?: string }> {
  const resultado = await get(ARCHIVO, { access: ACCESO, useCache: false });
  if (!resultado || resultado.statusCode !== 200) return { estados: {} };
  const texto = await new Response(resultado.stream).text();
  return { estados: limpiar(JSON.parse(texto)), etag: resultado.blob.etag };
}

function mensaje(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export async function GET(): Promise<Response> {
  if (!hayAlmacen()) return Response.json({ compartido: false, estados: {} });
  try {
    const { estados } = await leer();
    return Response.json({ compartido: true, estados });
  } catch (e) {
    return Response.json({ compartido: false, estados: {}, error: mensaje(e) }, { status: 500 });
  }
}

/** Mueve UN ticket: { slug, status }. Solo acepta tickets y columnas que existen. */
export async function POST(req: Request): Promise<Response> {
  const body = (await req.json().catch(function sinCuerpo() {
    return null;
  })) as { slug?: unknown; status?: unknown } | null;
  const slug = body?.slug;
  const status = body?.status;

  const existe = typeof slug === "string" && REPORT_ENTRIES.some(function bySlug(e) { return e.slug === slug; });
  if (typeof slug !== "string" || !existe || !isPolishStatus(status)) {
    return Response.json({ ok: false, error: "ticket o columna no válidos" }, { status: 400 });
  }
  if (!hayAlmacen()) {
    return Response.json({ ok: false, error: "no hay almacén conectado" }, { status: 503 });
  }

  try {
    // Leer → cambiar un ticket → escribir solo si nadie guardó en medio (ifMatch).
    // Si otra persona movió algo al mismo tiempo, se vuelve a leer y se reintenta,
    // así dos movimientos simultáneos no se pisan.
    for (let intento = 0; intento < INTENTOS; intento++) {
      const { estados, etag } = await leer();
      const siguiente: Estados = { ...estados, [slug]: status };
      try {
        await put(ARCHIVO, JSON.stringify(siguiente, null, 2), {
          access: ACCESO,
          contentType: "application/json",
          addRandomSuffix: false,
          ...(etag ? { allowOverwrite: true, ifMatch: etag } : {}),
        });
        return Response.json({ ok: true, estados: siguiente });
      } catch (e) {
        // Sin etag el archivo no existía: si falla es porque alguien lo creó a la vez.
        if (e instanceof BlobPreconditionFailedError || !etag) continue;
        throw e;
      }
    }
    return Response.json({ ok: false, error: "no se pudo guardar, intenta de nuevo" }, { status: 409 });
  } catch (e) {
    return Response.json({ ok: false, error: mensaje(e) }, { status: 500 });
  }
}
