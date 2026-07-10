// Subaspass horizontal banners
// Compact landscape format — mobile 388×120 and desktop 798×~120
// Same brand vocabulary as the L/M/S set: orange gradient, plum, cream accent.

const SBH = {
  orange: '#E8732A',
  orangeLight: '#F49B57',
  orangeDeep: '#C85A1E',
  orangeDark: '#B14E18',
  plum: '#3D2299',
  plumDeep: '#2A1670',
  cream: '#FFE2C2',
  white: '#FFFFFF',
};
const SBHFONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

function SBPhoto({ id, style }) {
  return React.createElement('image-slot', {
    id, shape: 'rect', fit: 'cover',
    placeholder: 'Foto',
    style,
  });
}

// ---- shared bits ----------------------------------------------------------

function Pill({ big, children }) {
  return (
    <div style={{
      display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center',
      background: 'rgba(0,0,0,0.20)', borderRadius: 999,
      padding: big ? '4px 11px' : '3px 8px',
      fontSize: big ? 12 : 10, fontWeight: 700, letterSpacing: 0.2,
      color: SBH.white, whiteSpace: 'nowrap',
    }}>
      {children}
    </div>
  );
}

function CTAH({ big, outline }) {
  const base = {
    border: 'none', cursor: 'pointer', fontFamily: SBHFONT, fontWeight: 800,
    borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: big ? 8 : 6,
    padding: big ? '12px 22px' : '9px 15px',
    fontSize: big ? 15 : 12.5,
  };
  if (outline) {
    return (
      <button style={{
        ...base, background: 'transparent', color: SBH.white,
        border: `2px solid rgba(255,255,255,0.85)`,
      }}>
        Comprar ahora <span>→</span>
      </button>
    );
  }
  return (
    <button style={{
      ...base, background: SBH.white, color: SBH.orangeDeep,
      boxShadow: '0 5px 14px rgba(0,0,0,0.18)',
    }}>
      Comprar ahora <span>→</span>
    </button>
  );
}

function Headline({ big, oneline }) {
  const size = big ? 34 : 21;
  if (oneline) {
    return (
      <h2 style={{ margin: 0, fontSize: size, fontWeight: 800, lineHeight: 1, letterSpacing: big ? -1.2 : -0.7, color: SBH.white }}>
        Compra <span style={{ color: SBH.cream }}>Subaspass</span>
      </h2>
    );
  }
  return (
    <h2 style={{ margin: 0, fontSize: size, fontWeight: 800, lineHeight: 0.92, letterSpacing: big ? -1.2 : -0.7, color: SBH.white }}>
      Compra<br/><span style={{ color: SBH.cream }}>Subaspass</span>
    </h2>
  );
}

const SHELL = (w, h, bg) => ({
  width: w, height: h, position: 'relative', overflow: 'hidden',
  borderRadius: big_radius(h), fontFamily: SBHFONT, color: SBH.white,
  background: bg, boxShadow: '0 10px 26px rgba(40,20,80,0.20)',
  display: 'flex', alignItems: 'stretch', boxSizing: 'border-box',
});
function big_radius(h) { return h >= 130 ? 18 : 14; }

// ===========================================================================
// VARIANT A — "Background" classic: solid orange, photo left, pill + CTAH right
// ===========================================================================
function BannerA({ w = 388, h = 120, big = false, slot = 'a' }) {
  const photoW = big ? 200 : 92;
  return (
    <div style={SHELL(w, h, `linear-gradient(105deg, ${SBH.orange} 0%, ${SBH.orangeDeep} 100%)`)}>
      {/* photo left, fades into orange */}
      <div style={{ width: photoW, position: 'relative', flexShrink: 0 }}>
        <SBPhoto id={`hb-A-${slot}`} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent 55%, ${SBH.orange} 100%)`, pointerEvents: 'none' }} />
      </div>
      {/* copy */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: big ? 7 : 4, padding: big ? '0 8px 0 18px' : '0 6px 0 12px' }}>
        <Pill big={big}>¡Dile bye al riesgo alto!</Pill>
        <Headline big={big} oneline={big} />
        {big && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.35, color: 'rgba(255,255,255,0.92)', maxWidth: 320 }}>Y participa en las subastas sin consignar y sin restricciones.</p>}
      </div>
      {/* CTAH */}
      <div style={{ display: 'flex', alignItems: 'center', padding: big ? '0 22px' : '0 12px', flexShrink: 0 }}>
        <CTAH big={big} />
      </div>
    </div>
  );
}

// ===========================================================================
// VARIANT B — plum→orange gradient, text only, deco circles, white CTAH right
// ===========================================================================
function BannerB({ w = 388, h = 120, big = false }) {
  return (
    <div style={SHELL(w, h, `linear-gradient(100deg, ${SBH.plumDeep} 0%, ${SBH.plum} 32%, ${SBH.orangeDeep} 78%, ${SBH.orange} 100%)`)}>
      {/* deco */}
      <div style={{ position: 'absolute', left: big ? 26 : 16, top: big ? 16 : 12, width: big ? 30 : 20, height: big ? 30 : 20, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '46%', bottom: 10, width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: big ? '32%' : '34%', top: '50%', width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.16)', pointerEvents: 'none' }} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: big ? 8 : 4, padding: big ? '0 20px 0 26px' : '0 12px 0 16px', position: 'relative', zIndex: 2 }}>
        <Pill big={big}>¡Dile bye al riesgo alto!</Pill>
        <Headline big={big} oneline={big} />
        {big && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.35, color: 'rgba(255,255,255,0.9)' }}>Participa sin consignar y sin restricciones.</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: big ? '0 26px' : '0 14px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <CTAH big={big} />
      </div>
    </div>
  );
}

// ===========================================================================
// VARIANT C — copy + CTAH left, photo right with diagonal cut
// ===========================================================================
function BannerC({ w = 388, h = 120, big = false, slot = 'c' }) {
  const photoW = big ? 260 : 120;
  return (
    <div style={SHELL(w, h, `linear-gradient(95deg, ${SBH.plumDeep} 0%, ${SBH.plum} 40%, ${SBH.orangeDeep} 100%)`)}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: big ? 8 : 5, padding: big ? '0 18px 0 26px' : '0 10px 0 15px', position: 'relative', zIndex: 2 }}>
        <Pill big={big}>¡Dile bye al riesgo alto!</Pill>
        <Headline big={big} oneline={big} />
        {big && (
          <div style={{ marginTop: 4 }}><CTAH big={big} /></div>
        )}
        {!big && (
          <div style={{ marginTop: 2 }}><CTAH big={false} /></div>
        )}
      </div>
      {/* photo right, diagonal cut */}
      <div style={{ width: photoW, position: 'relative', flexShrink: 0, clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}>
        <SBPhoto id={`hb-C-${big ? 'd' : 'm'}-${slot}`} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(75deg, ${SBH.orangeDeep} 0%, transparent 45%)`, pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

// ===========================================================================
// VARIANT D — bold solid orange, big headline left, outlined CTAH right
// ===========================================================================
function BannerD({ w = 388, h = 120, big = false }) {
  return (
    <div style={SHELL(w, h, `linear-gradient(120deg, ${SBH.orangeLight} 0%, ${SBH.orange} 45%, ${SBH.orangeDark} 100%)`)}>
      <div style={{ position: 'absolute', right: big ? 270 : 130, top: '50%', transform: 'translateY(-50%)', width: big ? 90 : 54, height: big ? 90 : 54, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.16)', pointerEvents: 'none' }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: big ? 4 : 2, padding: big ? '0 8px 0 30px' : '0 6px 0 16px', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: big ? 13 : 10, fontWeight: 700, opacity: 0.92 }}>¡Dile bye al riesgo alto!</span>
        <Headline big={big} oneline={big} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: big ? '0 28px' : '0 13px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <CTAH big={big} outline />
      </div>
    </div>
  );
}

Object.assign(window, { BannerA, BannerB, BannerC, BannerD });
