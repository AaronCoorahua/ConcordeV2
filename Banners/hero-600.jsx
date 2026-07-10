// 600px-wide hero banner — "Compra Subaspass"
// Orange brand, photo via <image-slot>, outlined CTA. Built to sit ~600×200.

const HB = {
  orange: '#E8732A',
  orangeLight: '#F49B57',
  orangeDeep: '#C85A1E',
  plum: '#3D2299',
  plumDeep: '#2A1670',
  white: '#FFFFFF',
};
const HBFONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

function HBPhoto({ id, style }) {
  return React.createElement('image-slot', {
    id, shape: 'rect', fit: 'cover',
    placeholder: 'Arrastra una foto',
    style,
  });
}

function HBCircles() {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 22, top: 18, width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 24, top: 300, width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 28, bottom: 120, width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', pointerEvents: 'none' }} />
    </React.Fragment>
  );
}

// =====================================================
// Skyscraper 200 × 600 — vertical banner
// photo top, copy + CTA stacked below
// =====================================================
function HeroBanner() {
  return (
    <div style={{
      width: 200, height: 600, position: 'relative', overflow: 'hidden',
      borderRadius: 16, fontFamily: HBFONT, color: HB.white,
      background: `linear-gradient(160deg, ${HB.plumDeep} 0%, ${HB.plum} 28%, ${HB.orangeDeep} 70%, ${HB.orange} 100%)`,
      boxShadow: '0 12px 30px rgba(40,20,80,0.25)',
      display: 'flex', flexDirection: 'column',
    }}>
      <HBCircles />

      {/* TOP — photo with diagonal bottom cut */}
      <div style={{
        height: 260, position: 'relative', flexShrink: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 86%, 0 100%)',
      }}>
        <HBPhoto id="sky-200x600" style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 55%, ${HB.orangeDeep} 100%)`,
          pointerEvents: 'none',
        }} />
      </div>

      {/* BOTTOM — copy */}
      <div style={{
        flex: 1, padding: '8px 22px 26px', position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.22)', borderRadius: 999,
          padding: '5px 12px', fontSize: 11, fontWeight: 700,
          letterSpacing: 0.3, marginBottom: 14,
        }}>
          ¡Dile bye al riesgo alto!
        </div>
        <h2 style={{
          fontSize: 40, fontWeight: 800, margin: 0,
          lineHeight: 0.94, letterSpacing: -1.4,
        }}>
          Compra<br/><span style={{ color: '#FFE2C2' }}>Subaspass</span>
        </h2>
        <p style={{
          fontSize: 14, lineHeight: 1.45, margin: '16px 0 0',
          color: 'rgba(255,255,255,0.92)',
        }}>
          Y participa en las subastas sin consignar y sin restricciones.
        </p>

        <button style={{
          marginTop: 'auto', width: '100%',
          background: HB.white, color: HB.orangeDeep, border: 'none',
          padding: '13px 18px', borderRadius: 999, fontWeight: 800,
          fontSize: 14, cursor: 'pointer', fontFamily: HBFONT,
          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Comprar ahora <span style={{ fontSize: 15 }}>→</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HeroBanner });

// =====================================================
// MEDIUM — 200 × 400
// photo top (diagonal cut) + pill + title + short sub + CTA
// =====================================================
function HeroBannerMedium() {
  return (
    <div style={{
      width: 200, height: 400, position: 'relative', overflow: 'hidden',
      borderRadius: 16, fontFamily: HBFONT, color: HB.white,
      background: `linear-gradient(160deg, ${HB.plumDeep} 0%, ${HB.plum} 30%, ${HB.orangeDeep} 72%, ${HB.orange} 100%)`,
      boxShadow: '0 12px 30px rgba(40,20,80,0.25)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', left: 20, top: 16, width: 28, height: 28, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 22, bottom: 90, width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', pointerEvents: 'none' }} />

      <div style={{
        height: 170, position: 'relative', flexShrink: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)',
      }}>
        <HBPhoto id="sky-200x400" style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 58%, ${HB.orangeDeep} 100%)`,
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        flex: 1, padding: '6px 20px 22px', position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.22)', borderRadius: 999,
          padding: '4px 10px', fontSize: 10, fontWeight: 700,
          letterSpacing: 0.3, marginBottom: 10,
        }}>
          ¡Dile bye al riesgo alto!
        </div>
        <h2 style={{
          fontSize: 30, fontWeight: 800, margin: 0,
          lineHeight: 0.95, letterSpacing: -1,
        }}>
          Compra<br/><span style={{ color: '#FFE2C2' }}>Subaspass</span>
        </h2>
        <p style={{
          fontSize: 12.5, lineHeight: 1.4, margin: '10px 0 0',
          color: 'rgba(255,255,255,0.92)',
        }}>
          Participa sin consignar y sin restricciones.
        </p>
        <button style={{
          marginTop: 'auto', width: '100%',
          background: HB.white, color: HB.orangeDeep, border: 'none',
          padding: '11px 16px', borderRadius: 999, fontWeight: 800,
          fontSize: 13, cursor: 'pointer', fontFamily: HBFONT,
          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Comprar ahora <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
    </div>
  );
}

// =====================================================
// SMALL — 200 × 250
// compact: photo strip + title + CTA
// =====================================================
function HeroBannerSmall() {
  return (
    <div style={{
      width: 200, height: 250, position: 'relative', overflow: 'hidden',
      borderRadius: 14, fontFamily: HBFONT, color: HB.white,
      background: `linear-gradient(160deg, ${HB.plumDeep} 0%, ${HB.plum} 32%, ${HB.orangeDeep} 75%, ${HB.orange} 100%)`,
      boxShadow: '0 10px 24px rgba(40,20,80,0.22)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', right: 18, top: 14, width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }} />

      <div style={{
        height: 96, position: 'relative', flexShrink: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 84%, 0 100%)',
      }}>
        <HBPhoto id="sky-200x250" style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 55%, ${HB.orangeDeep} 100%)`,
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        flex: 1, padding: '6px 18px 18px', position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          fontSize: 9.5, fontWeight: 700, opacity: 0.9, marginBottom: 4,
        }}>
          ¡Dile bye al riesgo alto!
        </div>
        <h2 style={{
          fontSize: 24, fontWeight: 800, margin: 0,
          lineHeight: 0.94, letterSpacing: -0.8,
        }}>
          Compra <span style={{ color: '#FFE2C2' }}>Subaspass</span>
        </h2>
        <button style={{
          marginTop: 'auto', width: '100%',
          background: HB.white, color: HB.orangeDeep, border: 'none',
          padding: '10px 16px', borderRadius: 999, fontWeight: 800,
          fontSize: 12.5, cursor: 'pointer', fontFamily: HBFONT,
          boxShadow: '0 5px 14px rgba(0,0,0,0.2)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}>
          Comprar ahora <span style={{ fontSize: 13 }}>→</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HeroBannerMedium, HeroBannerSmall });
