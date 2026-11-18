/**
 * MiGarajeComparison — qué cambia del bloque Zona al bloque Mi Garaje, y qué se agregó a los componentes de Concorde.
 */
import type { JSX } from "react";

type Row = { section: string; before: string; after: string };

const ROWS: Row[] = [
  { section: "Cabecera de cuenta", before: "UserProfileCard: saludo, riesgo, puntos VMC y accesos.",
    after: "Cabecera de cuenta con el nivel de riesgo en escala (RiskMeter) y un resumen de lo pendiente." },
  { section: "Tu actividad", before: "ActivityCard: cuatro contadores (Ganadas, Consignaciones, Procesos de compra, Rechazadas).",
    after: "Secciones vivas: Negociaciones, Participaciones, Compras, Publicaciones y Valorizaciones, cada una con pestañas en modo bandeja, filas con estado, cuenta regresiva y paginado de 5." },
  { section: "Negociación", before: "No existía.",
    after: "Panel de negociación: aceptar, rechazar o contraproponer hasta 5 rondas; al aceptar se abre el SubasChat del acuerdo." },
  { section: "Publicaciones", before: "No existía.",
    after: "Mis publicaciones con badge de estado (7 estados), fijar arriba, menú, Dar de baja con motivos y Republicar." },
  { section: "Publicar y valorizar", before: "No existía.",
    after: "Riel con Publicar y Valorizar; flujos completos de valorización AVT (resultado con gráficos) y de publicación (información, vista previa y pago)." },
  { section: "Billetera", before: "WalletBalanceCard: SubasCoins y saldo.",
    after: "Billetera de vidrio en el riel lateral." },
  { section: "Recomendados y banners", before: "Dos OfferShelf (Recomendados, Me interesa) y dos huecos grises de banner.",
    after: "Recomendados y banners reales de VMC (campañas en HTML), también en el hueco del Sidebar." },
  { section: "Fichas", before: "Bloque Detalle con datos de ejemplo.",
    after: "Detalle con la oferta real (prop offer), aviso Publicación basic y el SubasChat del acuerdo en lugar del DetailCard." },
  { section: "Marco", before: "Header logueado sobre 798 de ancho.",
    after: "Lienzo de 1024 de vmcsubastas.com con Header y Sidebar (229, cerrado 76); bajo 1024 px, drawer con hamburguesa." },
];

const EXTENDED = [
  ["TabSelector", "/handoff/tabselector", "notificationIndices: modo bandeja, las pestañas con novedades en bold y el resto en peso normal. Sin la prop, igual que antes."],
  ["DetailCard", "/handoff/detailcard", "assistantBanner (banner de Max) y miniBanner (imagen con enlace) en el lugar del banner teal; el botón crece si el texto es largo."],
  ["Detalle (bloque)", "/blocks/detalle", "offer (título, fotos, relacionadas, detailSlot para reemplazar el DetailCard, visits) y safetyPlacement (aviso Publicación basic). Sin props, igual que antes."],
  ["Vidrio", "/handoff/vidrio", "Cuatro íconos nuevos: aviso, bolsa, republicar y baja (en naranja)."],
];

const NEW = [
  ["PublicationBadge", "/handoff/publicationbadge", "Los 7 estados de una publicación y la chincheta de fijada."],
  ["RiskMeter", "/handoff/riskmeter", "Riesgo del perfil en escala de 5 niveles."],
  ["Countdown", "/handoff/countdown", "Cuenta regresiva en vivo para plazos y cierres."],
  ["QrCode", "/handoff/qrcode", "Código QR en SVG (usa qrcode-generator)."],
  ["QrCard", "/handoff/qrcard", "Tarjeta con QR del vehículo que recibe ofertas, imprimible en A4."],
];

const PENDING = [
  "Pasar a componentes de Concorde las piezas que todavía viven dentro del bloque: NegotiationPanel, SubasChat, QuickView, StageTabs, Paginado, Gallery, DropModal y RepublishModal. Están más acopladas al CSS global del bloque.",
  "El CSS del bloque es global (unas 5.000 líneas en archivos .css del lab, con clases cortas). Por eso se ve en iframes. Al pasar cada pieza a componente se mueve su CSS dentro del componente.",
  "Usa framer-motion (animaciones de pestañas y filas) y qrcode-generator, aceptadas como dependencias de Concorde.",
  "Las copias de componentes del lab traían la paleta ajustada a tokens (naranja, vault y teal un poco distintos). El bloque usa los componentes canónicos de Concorde con su paleta de siempre.",
  "Datos, saldos, propuestas y resultados AVT son de ejemplo. Los banners del Sidebar y del riel llevan a las pantallas de Valorizar y Publicar del mismo bloque.",
];

export default function MiGarajeComparison(): JSX.Element {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--ui-ink)", letterSpacing: "-0.01em", margin: "0 0 4px" }}>Qué cambia frente a Zona</h2>
      <p style={{ fontSize: 14, color: "var(--ui-body)", margin: "0 0 20px", maxWidth: 760 }}>
        Mi Garaje es la evolución de Zona. Viene de mi-garaje-lab (VMC-Laptop, rama mi-garaje/vendo-mis-cosas, 9a0fa2b), modo vmc, sin los paneles de QA. Zona sigue disponible tal cual.
      </p>
      <div style={{ overflowX: "auto", border: "1px solid var(--ui-border)", borderRadius: 12 }}>
        <table className="mgc-table">
          <thead><tr><th>Sección</th><th>Antes, en Zona</th><th>Ahora, en Mi Garaje</th></tr></thead>
          <tbody>{ROWS.map((r) => <tr key={r.section}><th scope="row">{r.section}</th><td>{r.before}</td><td>{r.after}</td></tr>)}</tbody>
        </table>
      </div>
      <h3 className="mgc-h3">Componentes nuevos</h3>
      <ul className="mgc-list">{NEW.map(([n, href, t]) => <li key={n}><a href={href} className="mgc-code">{n}</a><span>{t}</span></li>)}</ul>
      <h3 className="mgc-h3">Componentes de Concorde que se ampliaron</h3>
      <ul className="mgc-list">{EXTENDED.map(([n, href, t]) => <li key={n}><a href={href} className="mgc-code">{n}</a><span>{t}</span></li>)}</ul>
      <h3 className="mgc-h3">Pendiente</h3>
      <ul className="mgc-list mgc-list--plain">{PENDING.map((p) => <li key={p}><span>{p}</span></li>)}</ul>
      <style dangerouslySetInnerHTML={{ __html: `
        .mgc-table { width: 100%; min-width: 760px; border-collapse: collapse; font-size: 13px; line-height: 1.5; color: var(--ui-body); }
        .mgc-table th, .mgc-table td { padding: 12px 14px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--ui-border-soft); }
        .mgc-table thead th { font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-subtle); white-space: nowrap; }
        .mgc-table tbody th { font-weight: 700; color: var(--ui-ink); white-space: nowrap; }
        .mgc-table tbody tr:last-child > * { border-bottom: 0; }
        .mgc-h3 { font-size: 15px; font-weight: 700; color: var(--ui-ink); margin: 32px 0 10px; }
        .mgc-code { font: 600 12.5px ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--ui-accent); text-decoration: none; }
        .mgc-code:hover { text-decoration: underline; }
        .mgc-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
        .mgc-list li { display: grid; gap: 2px; padding: 10px 14px; border: 1px solid var(--ui-border); border-radius: 10px; background: #fff; }
        .mgc-list span { font-size: 12.5px; line-height: 1.5; color: var(--ui-body); }
        .mgc-list--plain li { border: 0; padding: 0 0 0 14px; position: relative; background: none; }
        .mgc-list--plain li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: var(--ui-border-hover); }
      ` }} />
    </section>
  );
}
