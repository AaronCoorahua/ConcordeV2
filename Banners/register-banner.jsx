// Subaspass — "Registro" promo banner for the login page left slot.
// Glassmorphism on the brand plum→orange gradient.
// Desktop 366×557 (tall) and mobile 388×120 (compact).

const RG = {
  orange: '#F08A2B',
  orangeDeep: '#E8732A',
  plum: '#3D2299',
  plumMid: '#4A2BB0',
  plumDeep: '#2A1670',
  cream: '#FFE2C2',
  white: '#FFFFFF',
};
const RGFONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const RG_BG = `linear-gradient(150deg, ${RG.plumDeep} 0%, ${RG.plum} 42%, ${RG.plumMid} 66%, ${RG.orangeDeep} 118%)`;

// frosted glass surface
function glass(extra = {}) {
  return {
    background: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.20)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px rgba(20,8,60,0.18)',
    ...extra,
  };
}

function Orbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%',
        right: -70, top: -60, background: 'radial-gradient(circle, rgba(240,138,43,0.55), transparent 68%)', filter: 'blur(8px)' }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%',
        left: -80, bottom: -50, background: 'radial-gradient(circle, rgba(120,80,220,0.5), transparent 70%)', filter: 'blur(8px)' }} />
    </div>
  );
}

function Check() {
  return (
    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
      background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.3l2.2 2.2L9.5 3.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

/* ---------- DESKTOP 366×557 ---------- */
function RegisterBannerDesktop({ w = 366, h = 557 }) {
  const benefits = [
    'Ofertas y subastas exclusivas',
    'Alertas en tiempo real',
    'Acceso a Subaspass',
  ];
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden',
      borderRadius: 20, fontFamily: RGFONT, color: RG.white, background: RG_BG,
      boxShadow: '0 18px 40px rgba(40,20,80,0.28)', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column' }}>
      <Orbs />

      <div style={{ position: 'relative', zIndex: 2, padding: 32, display: 'flex',
        flexDirection: 'column', height: '100%' }}>

        {/* badge */}
        <div style={glass({ alignSelf: 'flex-start', borderRadius: 999,
          padding: '7px 14px', display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: 11.5, fontWeight: 700, letterSpacing: 0.3, whiteSpace: 'nowrap' })}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: RG.cream }} />
          REGISTRO GRATUITO
        </div>

        {/* headline */}
        <h2 style={{ margin: '22px 0 0', fontSize: 33, fontWeight: 800, lineHeight: 1.05,
          letterSpacing: -1.1 }}>
          Únete a la<br />caza de ofertas
        </h2>
        <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.45,
          color: 'rgba(255,255,255,0.74)', maxWidth: 270 }}>
          Crea tu cuenta en segundos y empieza a enviar tu bid en las mejores subastas del país.
        </p>

        {/* benefits */}
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 11 }}>
          {benefits.map((b) => (
            <div key={b} style={glass({ borderRadius: 13, padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12 })}>
              <Check />
              <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{b}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* stat strip */}
        <div style={glass({ borderRadius: 16, padding: '16px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5 }}>
              +12.000
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.66)', marginTop: 3 }}>
              cazadores activos
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.2)' }} />
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5 }}>
              4.9★
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.66)', marginTop: 3 }}>
              valoración
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- MOBILE 388×120 ---------- */
function RegisterBannerMobile({ w = 388, h = 120 }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden',
      borderRadius: 16, fontFamily: RGFONT, color: RG.white, background: RG_BG,
      boxShadow: '0 10px 26px rgba(40,20,80,0.22)', boxSizing: 'border-box',
      display: 'flex', alignItems: 'center' }}>
      <Orbs />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 16px', display: 'flex',
        alignItems: 'center', gap: 14, width: '100%' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={glass({ alignSelf: 'flex-start', borderRadius: 999,
            padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 9.5, fontWeight: 700, letterSpacing: 0.3, marginBottom: 7 })}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: RG.cream }} />
            REGISTRO GRATUITO
          </div>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.6 }}>
            Únete a la caza de ofertas
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 11, lineHeight: 1.25,
            color: 'rgba(255,255,255,0.72)' }}>
            Crea tu cuenta y empieza a enviar tu bid
          </p>
        </div>
        <div style={glass({ flexShrink: 0, borderRadius: 14, padding: '12px 14px',
          textAlign: 'center' })}>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5 }}>
            +12K
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 3, whiteSpace: 'nowrap' }}>
            cazadores
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RegisterBannerDesktop, RegisterBannerMobile });

/* ===================================================================
   VARIATION B — "Subasta en vivo" (urgencia / producto destacado)
   =================================================================== */

function PulseDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#7CF2A8' }} />
      <span style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1.5px solid rgba(124,242,168,0.6)' }} />
    </span>
  );
}

function TimeBox({ n, l }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={glass({ borderRadius: 11, width: 48, height: 46,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 23, fontWeight: 800, letterSpacing: -0.5,
        fontVariantNumeric: 'tabular-nums' })}>{n}</div>
      <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: 0.5,
        color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{l}</span>
    </div>
  );
}

/* ---------- DESKTOP 366×557 — Variation B ---------- */
function RegisterBannerDesktopB({ w = 366, h = 557 }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden',
      borderRadius: 20, fontFamily: RGFONT, color: RG.white, background: RG_BG,
      boxShadow: '0 18px 40px rgba(40,20,80,0.28)', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column' }}>
      <Orbs />

      <div style={{ position: 'relative', zIndex: 2, padding: 32, display: 'flex',
        flexDirection: 'column', height: '100%' }}>

        {/* live badge */}
        <div style={glass({ alignSelf: 'flex-start', borderRadius: 999,
          padding: '7px 14px', display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11.5, fontWeight: 700, letterSpacing: 0.4, whiteSpace: 'nowrap' })}>
          <PulseDot /> SUBASTA EN VIVO
        </div>

        {/* headline */}
        <h2 style={{ margin: '22px 0 0', fontSize: 31, fontWeight: 800, lineHeight: 1.05,
          letterSpacing: -1 }}>
          No te quedes<br />sin enviar tu bid
        </h2>
        <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.45,
          color: 'rgba(255,255,255,0.74)', maxWidth: 280 }}>
          Hay lotes cerrando ahora mismo. Regístrate y entra antes de que termine el reloj.
        </p>

        {/* featured lot card */}
        <div style={glass({ borderRadius: 16, padding: 16, marginTop: 24,
          display: 'flex', flexDirection: 'column', gap: 12 })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${RG.orange}, ${RG.orangeDeep})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l1.5-4.5h15L21 9M3 9h18M3 9v9a1.5 1.5 0 001.5 1.5h15A1.5 1.5 0 0021 18V9M9 13h6"
                  stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Lote destacado</div>
              <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>
                Reloj de colección
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.14)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Bid actual</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, marginTop: 2 }}>$1.450</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: RG.cream }}>23 bids</div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* countdown */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
            marginBottom: 9, letterSpacing: 0.3 }}>Cierra en</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <TimeBox n="02" l="hrs" />
            <span style={{ alignSelf: 'flex-start', fontSize: 22, fontWeight: 800, lineHeight: '46px', opacity: 0.5 }}>:</span>
            <TimeBox n="47" l="min" />
            <span style={{ alignSelf: 'flex-start', fontSize: 22, fontWeight: 800, lineHeight: '46px', opacity: 0.5 }}>:</span>
            <TimeBox n="09" l="seg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- MOBILE 388×120 — Variation B ---------- */
function RegisterBannerMobileB({ w = 388, h = 120 }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden',
      borderRadius: 16, fontFamily: RGFONT, color: RG.white, background: RG_BG,
      boxShadow: '0 10px 26px rgba(40,20,80,0.22)', boxSizing: 'border-box',
      display: 'flex', alignItems: 'center' }}>
      <Orbs />
      <div style={{ position: 'relative', zIndex: 2, padding: '0 16px', display: 'flex',
        alignItems: 'center', gap: 14, width: '100%' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={glass({ alignSelf: 'flex-start', borderRadius: 999,
            padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 9.5, fontWeight: 700, letterSpacing: 0.4, marginBottom: 7, whiteSpace: 'nowrap' })}>
            <PulseDot /> SUBASTA EN VIVO
          </div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.6 }}>
            No te quedes sin enviar tu bid
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 11, lineHeight: 1.25,
            color: 'rgba(255,255,255,0.72)' }}>
            Regístrate antes de que cierre
          </p>
        </div>
        <div style={glass({ flexShrink: 0, borderRadius: 14, padding: '10px 12px',
          textAlign: 'center' })}>
          <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 3,
            whiteSpace: 'nowrap' }}>Cierra en</div>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>
            02:47:09
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RegisterBannerDesktopB, RegisterBannerMobileB });
