/**
 * IndexComparison — qué cambia del bloque Homepage al bloque Index, sección por sección, y qué componentes
 * son nuevos, cuáles se reutilizan y cuáles dejan de usarse en el inicio.
 */
import type { JSX, ReactNode } from "react";

type Row = { section: string; before: string; after: string; pieces: ReactNode };

const C = ({ children, href }: { children: string; href?: string }) =>
  href ? <a href={href} className="cmp-code">{children}</a> : <code className="cmp-code">{children}</code>;

const ROWS: Row[] = [
  { section: "Banner principal", before: "Hueco gris de 766 × 272 (PRINCIPAL BANNER).",
    after: "Carrusel de 3 campañas de VMC (WhatsApp, Publica, Recibe ofertas) con foto, título que entra letra por letra e indicador de vidrio. Avanza cada 7 s y se pausa con el mouse.",
    pieces: <><C href="/handoff/herocarousel">HeroCarousel</C> nuevo (con <C href="/handoff/glassbutton">GlassButton</C>) · las campañas van en <C>IndexHero</C> (bloque)</> },
  { section: "Feed en vivo", before: "No existía. En su lugar, un hueco gris de 766 × 100 (SECONDARY BANNER) bajo el banner principal.",
    after: "VMC ahora a la derecha del banner, a dos filas de alto: ofertas publicadas, propuestas, registros, publicidad y blog, con una entrada nueva cada 45 s. En celular va debajo del banner, con Ver más.",
    pieces: <><C href="/handoff/vmcahora">VmcAhora</C> nuevo</> },
  { section: "Tipo de oferta", before: "Columna dentro de CategoriesSection: CardTitle y dos OfferType (NEGOCIABLE y EN VIVO con VER TODAS).",
    after: "Dos tarjetas con foto y degradado bajo el banner (Recibe ofertas y En vivo). Al pasar el mouse crecen, se desenfocan y muestran el botón. En celular bajan después de las tiendas.",
    pieces: <><C href="/handoff/offertypecards">OfferTypeCards</C> nuevo, en lugar de <C href="/handoff/offertype">OfferType</C></> },
  { section: "Lotes de una empresa", before: "AuctioneerSection: Santander Consumer con 4 OfferCard iguales, todas en vivo, y el botón Ir al Perfil.",
    after: "Una sección por tienda (Autoplan y Mapfre) con logo, oportunidades y Ver todo el lote. A la izquierda, una carta destacada que se inclina hacia el mouse; a la derecha, 6 lotes en filas que mezclan En vivo y Recibe ofertas.",
    pieces: <><C>StoreLots</C> (bloque) · <C href="/handoff/lotgallery">LotGallery</C>, <C href="/handoff/featuredcard">FeaturedCard</C> y <C href="/handoff/lightbar">LightBar</C> nuevos · <C href="/handoff/profilebutton">ProfileButton</C> se reutiliza</> },
  { section: "Banner entre secciones", before: "Hueco punteado de 766 × 100 (BANNER) al final.",
    after: "Franja de Subastop, Venta para empresas (Tecnología), entre las dos tiendas. Es una pieza HTML propia que se escala al ancho.",
    pieces: <><C>AdStrip</C> (bloque)</> },
  { section: "Categorías", before: "4 CategoryCard con ícono: vehicular, maquinaria, equipos diversos y artículos diversos.",
    after: "6 cards con foto, ícono de vidrio y número de lotes. Se suman Materiales y Mobiliario. En celular, 2 columnas.",
    pieces: <><C href="/handoff/categoryrail">CategoryRail</C> nuevo (con <C href="/handoff/vidrio">Vidrio</C>), en lugar de <C href="/handoff/categorycard">CategoryCard</C></> },
  { section: "Banner de campaña", before: "No existía.",
    after: "Valoriza tu auto: foto de fondo, degradado del sistema y el mensaje en un panel de vidrio.",
    pieces: <><C>CampaignBanner</C> (bloque) · <C href="/handoff/glassbutton">GlassButton</C></> },
  { section: "Vende tu vehículo", before: "No existía.",
    after: "Dos opciones (un vehículo o varios) y el beneficio de SubasCars: 25 SubasCoins, 0% de comisión.",
    pieces: <><C>SellSection</C> (bloque) · <C href="/handoff/profilebutton">ProfileButton</C> · <C href="/handoff/glassbutton">GlassButton</C></> },
  { section: "Empresas", before: "Solo en el submenú Empresas del Sidebar.",
    after: "Logos de las empresas que publican en VMC, en movimiento continuo, con su número de lotes.",
    pieces: <><C href="/handoff/logomarquee">LogoMarquee</C> nuevo · cabecera en <C>CompaniesMarquee</C> (bloque)</> },
  { section: "Títulos de sección", before: "CardTitle: mayúsculas con corchetes naranjas.",
    after: "Título en tipo oración, bajada gris y un filete debajo; la acción va con ProfileButton.",
    pieces: <><C>SectionHead</C> (bloque), en lugar de <C href="/handoff/cardtitle">CardTitle</C></> },
  { section: "Marco de la página", before: "Header y Sidebar abierto (226). Lienzo fijo de 798 × 1104; al cerrar el sidebar, el contenido se escala.",
    after: "Header y Sidebar que empieza cerrado (76). El contenido mide 948 y se reacomoda a 798 al abrir el sidebar, sin escalarse. El alto depende del contenido.",
    pieces: <>Sidebar y Header de Concorde, sin cambios</> },
  { section: "Celular", before: "HomepageMobile: header, banner gris y tarjetas de 388 con Tipo de oferta, Categorías y Subastador.",
    after: "Una columna: banner, VMC ahora, tiendas, Tipo de oferta, categorías, campaña, venta y empresas, con el drawer de Concorde.",
    pieces: <><C>IndexMobile</C> (bloque) · SidebarMobile y Header de Concorde</> },
];

type Comp = { name: string; href?: string; note: string };
const NEW: Comp[] = [
  { name: "HeroCarousel", href: "/handoff/herocarousel", note: "Banner principal: campañas con foto, título letra por letra e indicador de vidrio para pasar entre diapositivas." },
  { name: "LogoMarquee", href: "/handoff/logomarquee", note: "Franja de logos en movimiento continuo, con una línea debajo de cada uno." },
  { name: "VmcAhora", href: "/handoff/vmcahora", note: "Feed en vivo. Trae su plan del día (feedPlan.ts): reglas y fórmulas de cuántas entradas salen según las ofertas publicadas." },
  { name: "OfferTypeCards", href: "/handoff/offertypecards", note: "Tarjetas de tipo de oferta con foto y botón al pasar el mouse." },
  { name: "FeaturedCard", href: "/handoff/featuredcard", note: "Carta destacada de un lote: se inclina, tiene brillo holográfico, favorito, contador de fotos y precio con SubasCoin." },
  { name: "LotGallery", href: "/handoff/lotgallery", note: "Destacada a la izquierda y lotes en filas a la derecha (LotRow). Bajo 700 px, una columna." },
  { name: "LightBar", href: "/handoff/lightbar", note: "Barra con una luz que la recorre: naranja en vivo, turquesa en Recibe ofertas. La usa FeaturedCard." },
  { name: "GlassButton", href: "/handoff/glassbutton", note: "Botón de vidrio con borde degradado, para fotos y fondos oscuros." },
  { name: "Vidrio", href: "/handoff/vidrio", note: "Íconos de vidrio esmerilado (28 íconos), los de Mi Garaje. En el Index, los de categorías." },
];
const REUSED: Comp[] = [
  { name: "ProfileButton", href: "/handoff/profilebutton", note: "Acciones de sección: Ver todo el lote, Ver todas las categorías, Publica tu auto." },
  { name: "Sidebar, SidebarMobile y Header", href: "/blocks/sidebar", note: "Bloques de Concorde sin cambios." },
];
const UNUSED: Comp[] = [
  { name: "OfferCard", href: "/handoff/offercard", note: "Reemplazada por FeaturedCard y las filas de LotGallery." },
  { name: "OfferType", href: "/handoff/offertype", note: "Reemplazado por OfferTypeCards." },
  { name: "CategoryCard", href: "/handoff/categorycard", note: "Reemplazada por las cards con foto de CategoryRail." },
  { name: "CardTitle", href: "/handoff/cardtitle", note: "Reemplazado por SectionHead." },
  { name: "BadgeStatus", href: "/handoff/badgestatus", note: "Las pills En vivo, Recibe ofertas y Destacado ahora vienen dentro de FeaturedCard." },
  { name: "LikeButton", href: "/handoff/likebutton", note: "FeaturedCard trae su propio favorito (corazón con borde degradado)." },
];
const PENDING = [
  "Publicidad en el hueco del banner del Sidebar: en el lab se monta un iframe (publica-vmc.html y max-vmc.html). Aquí queda el marcador de Concorde.",
  "Variantes de QA del lab que no se eligieron: otros indicadores y efectos del banner, otros estilos de card, vistas de categorías y los controles de diseño de VMC ahora.",
  "Otras formas de VMC ahora en celular (pestaña Feed con barra inferior, pestañas arriba, franja En vivo). Se usa la Opción A.",
  "Las fotos se redujeron a 1200 px de ancho (de 38 MB a 4,3 MB) en public/index/.",
];

function CompList({ title, items }: { title: string; items: Comp[] }): JSX.Element {
  return (
    <div>
      <h3 className="cmp-h3">{title}</h3>
      <ul className="cmp-list">
        {items.map((c) => (
          <li key={c.name}>{c.href ? <a href={c.href} className="cmp-code">{c.name}</a> : <code className="cmp-code">{c.name}</code>}<span>{c.note}</span></li>
        ))}
      </ul>
    </div>
  );
}

export default function IndexComparison(): JSX.Element {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--ui-ink)", letterSpacing: "-0.01em", margin: "0 0 4px" }}>Qué cambia frente a Homepage</h2>
      <p style={{ fontSize: 14, color: "var(--ui-body)", margin: "0 0 20px", maxWidth: 760 }}>
        Index es la evolución del bloque Homepage. Viene de vmc-index-lab, con la vista por defecto (Opción A) y sin los controles de QA. Homepage queda como la versión 1, tal cual.
      </p>
      <div style={{ overflowX: "auto", border: "1px solid var(--ui-border)", borderRadius: 12 }}>
        <table className="cmp-table">
          <thead><tr><th>Sección</th><th>Antes, en Homepage</th><th>Ahora, en Index</th><th>Piezas</th></tr></thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.section}><th scope="row">{r.section}</th><td>{r.before}</td><td>{r.after}</td><td>{r.pieces}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginTop: 32 }}>
        <CompList title="Componentes nuevos" items={NEW} />
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <CompList title="Se reutilizan" items={REUSED} />
          <CompList title="Siguen en Concorde, pero el Index ya no los usa" items={UNUSED} />
        </div>
      </div>
      <h3 className="cmp-h3" style={{ marginTop: 32 }}>Pendiente o fuera de este bloque</h3>
      <ul className="cmp-list cmp-list--plain">{PENDING.map((p) => <li key={p}><span>{p}</span></li>)}</ul>
      <style dangerouslySetInnerHTML={{ __html: `
        .cmp-table { width: 100%; min-width: 900px; border-collapse: collapse; font-size: 13px; line-height: 1.5; color: var(--ui-body); }
        .cmp-table th, .cmp-table td { padding: 12px 14px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--ui-border-soft); }
        .cmp-table thead th { font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-subtle); white-space: nowrap; }
        .cmp-table tbody th { font-weight: 700; color: var(--ui-ink); white-space: nowrap; }
        .cmp-table tbody tr:last-child > * { border-bottom: 0; }
        .cmp-table td:nth-child(4) { min-width: 220px; }
        .cmp-code { font: 600 12.5px ui-monospace, SFMono-Regular, Menlo, monospace; color: #18181b; text-decoration: none; }
        a.cmp-code { color: var(--ui-accent); }
        a.cmp-code:hover { text-decoration: underline; }
        .cmp-h3 { font-size: 15px; font-weight: 700; color: var(--ui-ink); margin: 0 0 10px; }
        .cmp-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
        .cmp-list li { display: grid; gap: 2px; padding: 10px 14px; border: 1px solid var(--ui-border); border-radius: 10px; background: #fff; }
        .cmp-list span { font-size: 12.5px; line-height: 1.5; color: var(--ui-body); }
        .cmp-list--plain li { border: 0; padding: 0 0 0 14px; position: relative; background: none; }
        .cmp-list--plain li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: var(--ui-border-hover); }
      ` }} />
    </section>
  );
}
