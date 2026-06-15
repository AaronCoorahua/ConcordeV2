/**
 * POST /api/figma-import — recibe el JSON del plugin "Concorde Exporter" (figma-plugin/)
 * y lo guarda en .claude/concorde/inbox/ para que Claude lo use en /concorde-sync.
 * Solo existe en dev (el plugin postea a localhost).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as { name?: string; nodes?: unknown[] };
    if (!Array.isArray(body.nodes) || body.nodes.length === 0) {
      return Response.json(
        { ok: false, error: "payload sin nodos" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const name = String(body.name ?? "Componente").replace(/[^A-Za-z0-9_-]/g, "") || "Componente";
    const dir = join(process.cwd(), ".claude", "concorde", "inbox");
    mkdirSync(dir, { recursive: true });

    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const fileName = `figma-${name}-${stamp}.json`;
    writeFileSync(join(dir, fileName), JSON.stringify(body, null, 2), "utf8");

    return Response.json(
      { ok: true, file: `.claude/concorde/inbox/${fileName}`, nodes: body.nodes.length },
      { headers: CORS_HEADERS }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, error: message }, { status: 500, headers: CORS_HEADERS });
  }
}
