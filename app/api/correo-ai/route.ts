import { NextResponse } from "next/server";
import { SECTION_LABELS, createSection, type Section } from "@/src/emails/prodEmailTemplates";
import { sanitizeBlockHtml } from "@/src/emails/editorSections";
import { BANNER_OPTIONS, FOOTER_OPTIONS } from "@/src/emails/headerSwap";
import { V2_TONE_OPTIONS } from "@/src/emails/tipologiasV2";

/**
 * POST /api/correo-ai — arma o EDITA un correo con Gemini.
 *
 * La IA compone con las secciones reales del renderer (type + content) y —
 * cuando el pedido exige tocar ESTILO (colores, fondos, posiciones) — recibe el
 * HTML actual de cada sección y puede devolver esa sección como tipo "html"
 * con el HTML modificado. Así TODO es editable, no solo los textos.
 *
 * Config: GEMINI_API_KEY en .env.local (ver .env.local.example).
 * Opcional: GEMINI_MODEL (default gemini-3.1-flash-lite).
 */

const SECTION_TYPES = Object.keys(SECTION_LABELS) as Array<Section["type"]>;
const TONES = V2_TONE_OPTIONS.map(function id(t) { return t.tone; });

/** Documentación compacta del esquema para el prompt (derivada del renderer). */
function schemaDoc(): string {
  return SECTION_TYPES
    .map(function line(t) {
      const keys = Object.keys(createSection(t).content);
      return `- "${t}" (${SECTION_LABELS[t]})${keys.length ? `: claves { ${keys.join(", ")} }` : " (sin claves)"}`;
    })
    .join("\n");
}

/** Estado actual del lienzo que manda el editor (para ediciones sobre lo que hay). */
interface ActualState {
  subject?: unknown;
  banner?: { id?: unknown; tono?: unknown; titulo?: unknown; bajada?: unknown; pill?: unknown };
  footer?: unknown;
  /** Cada sección con su content Y su HTML renderizado actual. */
  sections?: Array<{ type?: unknown; content?: unknown; html?: unknown }>;
}

function buildPrompt(userPrompt: string, actual: ActualState | null): string {
  const contexto = actual
    ? `
CORREO ACTUAL EN EL LIENZO (JSON):
${JSON.stringify(actual)}

Cada sección del lienzo trae su "content" Y su "html" renderizado actual — con eso puedes editar CUALQUIER aspecto, incluido el estilo.

PRIMERO decide el "mode" según el pedido:
- "edicion": el pedido modifica el correo actual (cambiar/mover/quitar una sección, un texto, un color, un fondo, el banner, el botón…). Devuelve el correo COMPLETO resultante: COPIA EXACTAMENTE, sin reescribir ni parafrasear, todas las secciones que el pedido NO toca — misma forma (type+content, o type "html" si ya lo era), mismo orden — y aplica SOLO el cambio pedido. Si el cambio es de texto → edita "content"; si es de ESTILO → devuelve esa sección como type "html" partiendo de su "html" actual. Conserva subject, banner y footer actuales salvo que el pedido los cambie.
- "nuevo": el pedido describe un correo distinto o pide empezar de cero. Compón uno nuevo completo.
`
    : `
El lienzo está vacío: "mode" es "nuevo" y compones el correo completo.
`;

  return `Eres el maquetador de correos de VMC Subastas (plataforma de subastas de vehículos en Perú, marca cercana y enérgica: "¡Despierta al cazador de ofertas que hay en ti!").

Trabajas componiendo SECCIONES de un sistema de diseño existente. NO escribes HTML: devuelves SOLO un JSON válido con esta forma exacta:

{
  "mode": "edicion" | "nuevo",
  "nota": "",
  "subject": "asunto del correo",
  "banner": { "id": "...", "tono": "...", "titulo": "", "bajada": "", "pill": "" },
  "footer": "...",
  "sections": [
    { "type": "<tipo del sistema>", "content": { } }
    | { "type": "html", "html": "<tr>…</tr>" }
  ]
}

CADA sección de "sections" puede tener DOS formas:
1. { "type": "<tipo del sistema>", "content": {...} } — la forma preferida: el sistema la renderiza con su estilo oficial. Úsala para componer y para cambios de TEXTO/imagen/URL.
2. { "type": "html", "html": "<tr>…" } — HTML libre de la sección (una o más filas <tr> email-safe: tablas anidadas + estilos inline, ancho 600, sin <script>). Úsala SOLO cuando el pedido exige tocar el ESTILO de una sección (colores, fondos, bordes, posiciones, layout interno) que "content" no controla: toma el HTML actual de esa sección (viene en el lienzo), aplica el cambio pedido con precisión quirúrgica y devuélvelo completo. Mantén el resto del HTML de la sección EXACTAMENTE igual.

Usa "nota" para avisar brevemente cualquier parte del pedido que no aplicaste o decisiones que tomaste; si aplicaste todo tal cual, déjala vacía.
${contexto}

TIPOS DE SECCIÓN disponibles (usa SOLO estos, con SOLO sus claves; todos los valores son strings):
${schemaDoc()}

BANNERS para "banner.id": "original" o ${BANNER_OPTIONS.map(function q(o) { return `"${o.id}" (${o.label})`; }).join(", ")}.
FOOTERS para "footer": "original" o ${FOOTER_OPTIONS.map(function q(o) { return `"${o.id}" (${o.label})`; }).join(", ")}.
TONOS para "banner.tono": ${TONES.map(function q(t) { return `"${t}"`; }).join(", ")}.

REGLAS:
- Todo el texto en español (Perú), tono cordial y directo.
- Estructura típica: title → text(s) → bloques de datos (panel/details/table/note según el caso) → cta. Entre 4 y 8 secciones. Usa "spacer" (height "20" o "30") entre bloques densos.
- Resalta lo importante con los marcadores del sistema DENTRO de los textos: **texto** = acento naranja, __texto__ = fuerte oscuro, [[texto]] = número/dato morado. Úsalos con moderación.
- Datos variables (nombre, vehículo, montos, fechas) van como merge tags literales: {{Nombre usuario}}, {{Toyota Hilux 2018}}, {{US$ XX,XXX}}, {{Fecha y hora}}.
- Imágenes: deja las claves de imagen como "" (vacías) salvo que el usuario dé una URL.
- El CTA usa "variant": "" (naranja, para En Vivo/general) o "negotiable" (teal, para flujos negociables), y url "https://www.vmcsubastas.com/login?redirect_after_to=/zona" si el usuario no indica otra.
- Elige banner/tono/footer coherentes con el tema (En Vivo=live/naranja, Negociable=negotiable/teal, SubasCoins=coins, avisos serios=dark). El "titulo" del banner puede quedar "" (usa el subject) y "pill" corto en MAYÚSCULAS.

PEDIDO DEL USUARIO:
${userPrompt}`;
}

interface AiSection {
  type: string;
  content?: Record<string, unknown>;
  html?: unknown;
}
interface AiPayload {
  mode?: unknown;
  nota?: unknown;
  subject?: unknown;
  banner?: { id?: unknown; tono?: unknown; titulo?: unknown; bajada?: unknown; pill?: unknown };
  footer?: unknown;
  sections?: AiSection[];
}

/** Sanea la respuesta de la IA contra el esquema real del renderer. */
function sanitize(raw: AiPayload) {
  const bannerIds = new Set(BANNER_OPTIONS.map(function id(o) { return o.id; }));
  const footerIds = new Set(FOOTER_OPTIONS.map(function id(o) { return o.id; }));
  const str = function str(v: unknown, fallback = ""): string { return typeof v === "string" ? v : fallback; };

  const sections = (Array.isArray(raw.sections) ? raw.sections : [])
    .filter(function known(s): s is AiSection {
      if (!s) return false;
      if (s.type === "html") return typeof s.html === "string" && s.html.trim().length > 0;
      return SECTION_TYPES.includes(s.type as Section["type"]);
    })
    .slice(0, 24)
    .map(function build(s) {
      if (s.type === "html") {
        return { type: "html" as const, html: sanitizeBlockHtml(String(s.html)).slice(0, 30000) };
      }
      const type = s.type as Section["type"];
      const defaults = createSection(type).content;
      const content: Record<string, string> = { ...defaults };
      Object.keys(defaults).forEach(function merge(k) {
        const v = s.content?.[k];
        if (typeof v === "string") content[k] = v;
        else if (typeof v === "number") content[k] = String(v);
      });
      return { type, content };
    });

  const bId = str(raw.banner?.id, "original");
  const tono = str(raw.banner?.tono, "live");
  const fId = str(raw.footer, "original");
  return {
    mode: raw.mode === "edicion" ? "edicion" : "nuevo",
    nota: str(raw.nota).slice(0, 300),
    subject: str(raw.subject, "Correo VMC Subastas").slice(0, 200),
    banner: {
      id: bannerIds.has(bId) ? bId : "original",
      tono: (TONES as string[]).includes(tono) ? tono : "live",
      titulo: str(raw.banner?.titulo).slice(0, 160),
      bajada: str(raw.banner?.bajada).slice(0, 200),
      pill: str(raw.banner?.pill).slice(0, 40),
    },
    footer: footerIds.has(fId) ? fId : "original",
    sections,
  };
}

export async function POST(req: Request): Promise<Response> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Falta GEMINI_API_KEY: crea .env.local (copia .env.local.example), pega tu clave de Google AI Studio y reinicia el dev server." },
      { status: 501 },
    );
  }

  let prompt = "";
  let actual: ActualState | null = null;
  try {
    const body = (await req.json()) as { prompt?: unknown; actual?: ActualState };
    prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    // El lienzo actual solo cuenta si trae secciones — así "vacío" fuerza modo nuevo.
    if (body.actual && Array.isArray(body.actual.sections) && body.actual.sections.length > 0) {
      actual = body.actual;
    }
  } catch {
    /* body inválido → 400 abajo */
  }
  if (!prompt) return NextResponse.json({ error: "Describe el correo que necesitas." }, { status: 400 });

  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const controller = new AbortController();
  const timeout = setTimeout(function abort() { controller.abort(); }, 45000);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(prompt.slice(0, 4000), actual) }] }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(function fallback() { return ""; });
      let hint = `Gemini respondió ${res.status}.`;
      if (res.status === 429) hint = `Límite de uso de Gemini alcanzado (429) con el modelo "${model}" — espera un minuto y reintenta, o define otro GEMINI_MODEL en .env.local.`;
      else if (res.status === 404) hint = `El modelo "${model}" no existe para tu clave — ajusta GEMINI_MODEL en .env.local.`;
      else if (res.status === 400 && detail.includes("API_KEY")) hint = "La GEMINI_API_KEY parece inválida.";
      return NextResponse.json({ error: hint }, { status: 502 });
    }

    const data = (await res.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const parsed = JSON.parse(text) as AiPayload;
    const clean = sanitize(parsed);
    if (clean.sections.length === 0) {
      return NextResponse.json({ error: "La IA no devolvió secciones válidas — intenta describirlo de otra forma." }, { status: 502 });
    }
    return NextResponse.json(clean);
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "Gemini tardó demasiado — vuelve a intentar." : "No se pudo generar el correo — revisa la consola del server." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
