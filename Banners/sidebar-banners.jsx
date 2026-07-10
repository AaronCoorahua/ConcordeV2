// Sidebar banners — "Compra Subaspass" promo, exact reference content.
// Orange bg, photo of person, outlined "Comprar ahora" CTA. Net width 202px.
// No mascot. Uses <image-slot> for the user photo.

const SB = {
  orange: '#E8732A',
  orangeLight: '#F08C45',
  orangeDeep: '#D2641F',
  white: '#FFFFFF',
  ink: '#3A1C05',
};

const SBFONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// Outlined pill CTA (matches reference)
function CTA({ label = 'Comprar ahora', full = false, size = 'sm' }) {
  return (
    <button style={{
      background: 'rgba(255,255,255,0.12)', color: SB.white,
      border: '1.5px solid rgba(255,255,255,0.85)',
      padding: size === 'sm' ? '7px 14px' : '9px 16px',
      borderRadius: 999, fontWeight: 700,
      fontSize: size === 'sm' ? 11.5 : 12.5, cursor: 'pointer', fontFamily: SBFONT,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      width: full ? '100%' : 'auto', whiteSpace: 'nowrap',
      backdropFilter: 'blur(2px)',
    }}>
      {label}<span style={{ fontSize: 12 }}>→</span>
    </button>
  );
}

// scattered numbered markers like the reference overlay (subtle)
function Markers() {
  const dots = [
    { x: '14%', y: '12%' }, { x: '88%', y: '20%' }, { x: '50%', y: '8%' },
    { x: '78%', y: '78%' }, { x: '20%', y: '85%' }, { x: '94%', y: '60%' },
  ];
  return (
    <React.Fragment>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: d.x, top: d.y,
          width: 12, height: 12, borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)', color: SB.orangeDeep,
          fontSize: 7, fontWeight: 800, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)', pointerEvents: 'none',
          opacity: 0.5,
        }}>{i + 1}</div>
      ))}
    </React.Fragment>
  );
}

function Photo({ id, style }) {
  return React.createElement('image-slot', {
    id,
    shape: 'rect',
    fit: 'cover',
    placeholder: 'Foto',
    src: 'assets/subaspass-person.png',
    style,
  });
}

function SBShell({ width, height, children, style = {} }) {
  return (
    <div style={{
      width, height,
      background: `linear-gradient(120deg, ${SB.orangeLight} 0%, ${SB.orange} 55%, ${SB.orangeDeep} 100%)`,
      borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
      boxSizing: 'border-box', fontFamily: SBFONT,
      color: SB.white, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}

// =====================================================
// COMPACTO — 202 × 100
// photo left strip + headline + CTA
// =====================================================
function SBCompacto() {
  return (
    <SBShell width={202} height={100} style={{ display: 'flex' }}>
      <Photo id="sub-compacto" style={{ width: 64, height: '100%', flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <div style={{ fontSize: 8, fontWeight: 600, opacity: 0.9, marginBottom: 2 }}>¡Dile bye al riesgo alto!</div>
          <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1, letterSpacing: -0.4 }}>Compra<br/>Subaspass</div>
        </div>
        <CTA label="Comprar" />
      </div>
    </SBShell>
  );
}

// =====================================================
// CUADRADO — 202 × 202
// photo top + headline + sub + CTA
// =====================================================
function SBCuadrado() {
  return (
    <SBShell width={202} height={202} style={{ display: 'flex', flexDirection: 'column' }}>
      <Photo id="sub-cuadrado" style={{ width: '100%', height: 88, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.9, marginBottom: 3 }}>¡Dile bye al riesgo alto!</div>
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5 }}>Compra<br/>Subaspass</div>
          <div style={{ fontSize: 10.5, lineHeight: 1.3, opacity: 0.88, marginTop: 6 }}>
            Y participa sin consignar, sin restricciones.
          </div>
        </div>
        <CTA label="Comprar ahora" full />
      </div>
    </SBShell>
  );
}

// =====================================================
// PORTRAIT — 202 × 280  (recomendado)
// photo top + eyebrow + big headline + sub + CTA
// =====================================================
function SBPortrait() {
  return (
    <SBShell width={202} height={280} style={{ display: 'flex', flexDirection: 'column' }}>
      <Photo id="sub-portrait" style={{ width: '100%', height: 120, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <Markers />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.9, marginBottom: 4 }}>¡Dile bye al riesgo alto!</div>
          <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 0.98, letterSpacing: -0.6 }}>Compra<br/>Subaspass</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.35, opacity: 0.9, marginTop: 8 }}>
            Y participa sin consignar, sin restricciones.
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <CTA label="Comprar ahora" full size="md" />
        </div>
      </div>
    </SBShell>
  );
}

// =====================================================
// TALL — 202 × 400
// photo header w/ overlaid eyebrow+title, body card with sub,
// bullets in their own block, CTA pinned bottom
// =====================================================
function SBTall() {
  const bullets = ['Sin consignar', 'Sin restricciones', 'Participa al instante'];
  return (
    <SBShell width={202} height={400} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Photo header with gradient scrim + overlaid title */}
      <div style={{ position: 'relative', height: 150, flexShrink: 0 }}>
        <Photo id="sub-tall" style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(210,100,31,0) 35%, ${SB.orangeDeep} 100%)`,
        }} />
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12 }}>
          <div style={{
            display: 'inline-block', fontSize: 9.5, fontWeight: 700,
            background: 'rgba(0,0,0,0.22)', padding: '3px 9px', borderRadius: 999,
            marginBottom: 6,
          }}>¡Dile bye al riesgo alto!</div>
          <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 0.94, letterSpacing: -0.7 }}>
            Compra<br/>Subaspass
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1, padding: '14px 16px 16px',
        display: 'flex', flexDirection: 'column', gap: 12,
        position: 'relative',
      }}>
        <Markers />
        <p style={{
          fontSize: 12, lineHeight: 1.4, opacity: 0.92, margin: 0,
          position: 'relative', zIndex: 1,
        }}>
          Y participa sin consignar, sin restricciones.
        </p>

        {/* bullets in a subtle container */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', gap: 9,
          padding: '12px 12px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 10,
        }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 11.5, fontWeight: 600 }}>
              <span style={{
                width: 17, height: 17, borderRadius: '50%', flexShrink: 0,
                background: SB.white, color: SB.orangeDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 900,
              }}>✓</span>
              {b}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
          <CTA label="Comprar ahora" full size="md" />
        </div>
      </div>
    </SBShell>
  );
}

// =====================================================
// Sidebar context mock — 226px
// =====================================================
function SidebarMock({ children, bannerLabel }) {
  const navItems = [
    { ic: '🗓️', label: 'Hoy' },
    { ic: '🏷️', label: 'Tipo de oferta' },
    { ic: '⭐', label: 'Categorías' },
    { ic: '🏢', label: 'Empresas' },
  ];
  return (
    <div style={{
      width: 226, background: '#2C1A66', fontFamily: SBFONT,
      padding: 12, boxSizing: 'border-box', color: '#fff',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 14px' }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: SB.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>▶</div>
        <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 0.5 }}>VMCSUBASTAS</div>
      </div>
      {navItems.map((n, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8,
          background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
          fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.9)',
        }}>
          <span style={{ fontSize: 13, opacity: 0.85 }}>{n.ic}</span>{n.label}
        </div>
      ))}
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', padding: '14px 10px 6px' }}>Soporte</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
        <span style={{ fontSize: 13, opacity: 0.85 }}>❓</span>Centro de ayuda
      </div>
      <div style={{ marginTop: 18, marginBottom: 8 }}>
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 6, paddingLeft: 2 }}>
          ↓ Slot banner · {bannerLabel} ↓
        </div>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { SBCompacto, SBCuadrado, SBPortrait, SBTall, SidebarMock });
