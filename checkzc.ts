import { writeFileSync } from "fs";
import { getEmailReal } from "./src/emails/registry";
import { swapZoomCardForPng, hasZoomCard, ZOOM_CARD_PNG_W } from "./src/emails/headerSwap";

const c = getEmailReal("mapfre-invitacion-proceso");
if (!c) throw new Error("not found");
const html = c.html;
const png = swapZoomCardForPng(html, "/figma/correos/inscripciones.png");

// Lo que NO es la card debe seguir ahí tras el swap.
const keep = [
  "Como colaborador de MAPFRE",
  "Ya puedes ver las ofertas",
  "23:59 del día anterior",
  "deberás pagar el Valor de Restos",
  "mapfre-logo.png",
];

writeFileSync("zc-out.txt", [
  "hasZoomCard: " + hasZoomCard(html),
  "marked rows in html: " + (html.match(/data-zoom-card/g) || []).length,
  "PNG width const: " + ZOOM_CARD_PNG_W,
  "img uses const: " + png.includes(`width="${ZOOM_CARD_PNG_W}"`),
  "img inserted once: " + (png.match(/inscripciones\.png/g) || []).length,
  "",
  "-- fuera en modo PNG --",
  "card gone: " + !png.includes("ME INTERESA"),
  "sorteo gone: " + !png.includes("sorteo interno"),
  "no marked rows left: " + !png.includes("data-zoom-card"),
  "",
  "-- sobrevive --",
  ...keep.map((k) => `${png.includes(k)}  ${k}`),
  "",
  "tr html: " + (html.match(/<tr/g) || []).length + "/" + (html.match(/<\/tr>/g) || []).length,
  "tr png:  " + (png.match(/<tr/g) || []).length + "/" + (png.match(/<\/tr>/g) || []).length,
  "td png:  " + (png.match(/<td/g) || []).length + "/" + (png.match(/<\/td>/g) || []).length,
].join("\n"), "utf8");
