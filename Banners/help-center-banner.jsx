// Subaspass — "Centro de ayuda" banner (upgrade)
// Adds a real photo slot in place of the flat illustration, on the brand
// plum→orange gradient. Two sizes: desktop 766×120 and mobile 388×120.

const HC = {
  orange: '#E8732A',
  orangeDeep: '#C85A1E',
  plum: '#3D2299',
  plumMid: '#4A2BB0',
  plumDeep: '#2A1670',
  cream: '#FFE2C2',
  white: '#FFFFFF',
};
const HCFONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// brand gradient — plum dominant with a warm orange glow on the right
const HC_BG = `linear-gradient(100deg, ${HC.plumDeep} 0%, ${HC.plum} 48%, ${HC.plumMid} 72%, ${HC.orangeDeep} 122%)`;

function HCPhoto({ id, style }) {
  return React.createElement('image-slot', {
    id, shape: 'rect', fit: 'cover',
    placeholder: 'Foto',
    style,
  });
}

function HCButton({ big }) {
  return (
    <button style={{
      border: 'none', cursor: 'pointer', fontFamily: HCFONT,
      background: HC.white,
      borderRadius: big ? 13 : 11,
      display: 'inline-flex', alignItems: 'center', gap: big ? 12 : 8,
      padding: big ? '0 14px 0 18px' : '0 9px 0 12px',
      height: big ? 56 : 50, flexShrink: 0, textAlign: 'left',
      boxShadow: '0 7px 18px rgba(20,8,60,0.30)',
    }}>
      <span style={{
        color: HC.plum, fontWeight: 800,
        fontSize: big ? 13 : 11, lineHeight: 1.15,
        textTransform: 'uppercase', letterSpacing: 0.4, whiteSpace: 'nowrap',
      }}>
        {big ? 'Ir al Centro de Ayuda' : <>Ir al Centro<br />de Ayuda</>}
      </span>
      <span style={{
        flexShrink: 0, width: big ? 26 : 22, height: big ? 26 : 22,
        borderRadius: '50%', background: HC.orange, color: HC.white,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: big ? 14 : 12, fontWeight: 700, lineHeight: 1,
      }}>→</span>
    </button>
  );
}

function HelpBanner({ w = 388, h = 120, big = false, slot = 'm' }) {
  const photoW = big ? 156 : 96;
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      borderRadius: 16, fontFamily: HCFONT, color: HC.white, background: HC_BG,
      boxShadow: '0 10px 26px rgba(40,20,80,0.22)',
      display: 'flex', alignItems: 'stretch', boxSizing: 'border-box',
    }}>
      {/* soft deco ring */}
      <div style={{ position: 'absolute', right: big ? 198 : 118, top: '-30%',
        width: big ? 120 : 80, height: big ? 120 : 80, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.10)', pointerEvents: 'none' }} />

      {/* photo left, fades into plum */}
      <div style={{ width: photoW, position: 'relative', flexShrink: 0 }}>
        <HCPhoto id={`hc-${big ? 'd' : 'm'}-${slot}`} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(90deg, transparent 50%, ${HC.plumDeep} 100%)` }} />
      </div>

      {/* copy */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: big ? 4 : 2,
        padding: big ? '0 14px 0 22px' : '0 10px 0 14px', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: big ? 14 : 11, fontWeight: 600, color: 'rgba(255,255,255,0.72)', lineHeight: 1 }}>
          Visita nuestro
        </span>
        <h2 style={{ margin: 0, fontSize: big ? 27 : 19, fontWeight: 800,
          lineHeight: 1, letterSpacing: big ? -0.8 : -0.5, color: HC.white }}>
          Centro de ayuda
        </h2>
        <p style={{ margin: 0, fontSize: big ? 14 : 11, lineHeight: 1.2,
          color: 'rgba(255,255,255,0.66)', maxWidth: big ? 280 : 170,
          overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Respuestas rápidas a todas tus dudas
        </p>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center',
        padding: big ? '0 22px' : '0 12px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <HCButton big={big} />
      </div>
    </div>
  );
}

Object.assign(window, { HelpBanner });
