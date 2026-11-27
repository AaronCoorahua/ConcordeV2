/**
 * /api/polish — en qué columna del tablero /polish está cada ticket.
 *
 * No hay base de datos: es UN archivo JSON (`polish/estados.json`) con la forma
 * { "<slug>": "<columna>" }. Solo guarda los tickets que alguien movió; el resto sigue
 * en la columna que dice app/reporte/reportData.ts. En Vercel vive en Vercel Blob y
 * en local en `.datos-locales/` (ver app/api/almacen.ts).
 *
 * En Vercel sin Blob conectado responde `compartido: false` y el tablero guarda los
 * cambios en el navegador. Para conectarlo: Storage → Blob store PRIVADO → conectar
 * al proyecto (Vercel agrega la variable sola) y hacer un deploy nuevo.
 */

import { Conflicto, escribir, hayAlmacen, leer as leerArchivo } from "@/app/api/almacen";
import { REPORT_ENTRIES } from "@/app/reporte/reportData";
import { isPolishStatus, type PolishStatus } from "@/app/polish/polishData";

export const dynamic = "force-dynamic";

const ARCHIVO = "polish/estados.json";
const INTENTOS = 4;

type Estados = Record<string, PolishStatus>;

function limpiar(crudo: unknown): Estados {
  const estados: Estados = {};
  if (typeof crudo !== "object" || crudo === null) return estados;
  for (const [slug, status] of Object.entries(crudo)) {
    if (isPolishStatus(status)) estados[slug] = status;
  }
  return estados;
}

async function leer(): Promise<{ estados: Estados; version?: string }> {
  const { texto, version } = await leerArchivo(ARCHIVO);
  return { estados: texto ? limpiar(JSON.parse(texto)) : {}, version };
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
    // Leer → cambiar un ticket → escribir solo si nadie guardó en medio.
    // Si otra persona movió algo al mismo tiempo, se vuelve a leer y se reintenta,
    // así dos movimientos simultáneos no se pisan.
    for (let intento = 0; intento < INTENTOS; intento++) {
      const { estados, version } = await leer();
      const siguiente: Estados = { ...estados, [slug]: status };
      try {
        await escribir(ARCHIVO, JSON.stringify(siguiente, null, 2), version);
        return Response.json({ ok: true, estados: siguiente });
      } catch (e) {
        if (e instanceof Conflicto) continue;
        throw e;
      }
    }
    return Response.json({ ok: false, error: "no se pudo guardar, intenta de nuevo" }, { status: 409 });
  } catch (e) {
    return Response.json({ ok: false, error: mensaje(e) }, { status: 500 });
  }
}
