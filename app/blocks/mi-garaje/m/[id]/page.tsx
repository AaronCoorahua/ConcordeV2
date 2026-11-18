import type { Viewport } from "next";
import MiGaraje from "@/src/blocks/mi-garaje/desktop/MiGaraje";

/** /blocks/mi-garaje/m/[id] — una pantalla de Mi Garaje (vmc, vmc-propuesta, oferta, vmc-valuar, vmc-publica, vmc-valorizaciones). */

// oferta: viewport-fit=cover para que el chat use la safe-area y el teclado virtual encoja el layout (como el lab).
export async function generateViewport({ params }: { params: Promise<{ id: string }> }): Promise<Viewport> {
  const { id } = await params;
  return id === "oferta" ? { viewportFit: "cover", interactiveWidget: "resizes-content" } : {};
}

export default async function MiGarajeScreenPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
  const { id } = await params;
  const q = await searchParams;
  return <MiGaraje screen={id} q={q} />;
}
