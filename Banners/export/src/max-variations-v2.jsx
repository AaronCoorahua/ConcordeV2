// VN7-VN9 — three more genuinely different concepts
// Loaded after max-variations.jsx; relies on its globals (FONT, P, MaxFront)

// =====================================================
// VN7 — Postcard / handwritten
// MAX te escribe una postal — íntimo, personal
// =====================================================
function VN7Postcard() {
  return (
    <div style={{
      width: 600, height: 240, background: '#F1E5D0',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: '#3D2A1A', position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 220px',
    }}>
      {/* Paper texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(61,42,26,0.08) 0.6px, transparent 0.6px)',
        backgroundSize: '5px 5px',
      }} />

      {/* LEFT — message */}
      <div style={{
        padding: '22px 18px 18px 26px',
        borderRight: '2px dashed rgba(61,42,26,0.25)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 16, color: P.coral, marginBottom: 2,
          transform: 'rotate(-2deg)', display: 'inline-block',
        }}>
          Para: tú,
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 26, fontWeight: 700, lineHeight: 1.15,
          color: '#3D2A1A', margin: '4px 0 8px',
        }}>
          Dime qué necesitas y<br/>
          <span style={{ color: P.coral }}>te lo encuentro hoy</span> ☻
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 17, lineHeight: 1.3, color: 'rgba(61,42,26,0.72)',
          marginBottom: 10,
        }}>
          Una excavadora, un camión, un lote… cualquier cosa.<br/>
          Estoy revisando las subastas mientras lees esto.
        </div>
        <button style={{
          background: '#3D2A1A', color: '#F1E5D0', border: 'none',
          padding: '9px 16px', borderRadius: 999, fontWeight: 700,
          fontSize: 12.5, cursor: 'pointer', fontFamily: FONT,
          letterSpacing: 0.3,
        }}>
          Escribirle a MAX →
        </button>
      </div>

      {/* RIGHT — stamp + MAX signature */}
      <div style={{
        padding: '14px 16px 14px 16px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Stamp */}
        <div style={{
          alignSelf: 'flex-end',
          width: 84, height: 90, padding: 4,
          background: '#F1E5D0',
          backgroundImage: `radial-gradient(circle at 0 0, transparent 3px, #3D2A1A 3.5px, #3D2A1A 4.5px, transparent 5px)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '-4px -4px',
        }}>
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #F5C28B, #F57854)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #3D2A1A',
            position: 'relative',
            transform: 'rotate(8deg)',
          }}>
            <MaxFront height={66} />
          </div>
        </div>

        {/* Postmark + signature */}
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 8.5,
          color: 'rgba(61,42,26,0.6)', letterSpacing: 1,
          textTransform: 'uppercase', lineHeight: 1.4,
          alignSelf: 'flex-end', textAlign: 'right',
        }}>
          ◯ VMC Subastas ◯<br/>
          Disponible 24/7<br/>
          Tu copiloto · MAX
        </div>

        {/* Signature */}
        <div style={{
          fontFamily: '"Caveat", cursive', fontSize: 30,
          color: P.coral, transform: 'rotate(-4deg)',
          alignSelf: 'flex-end', lineHeight: 1,
        }}>
          — MAX
        </div>
      </div>
    </div>
  );
}

// =====================================================
// VN8 — Vinyl record / radio
// Metáfora de audio: "sintoniza con MAX"
// =====================================================
function VN8Vinyl() {
  return (
    <div style={{
      width: 600, height: 240, background: '#1F2A1F',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: '#F5EAD3', position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '220px 1fr',
    }}>
      {/* Warm glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 30% 50%, rgba(245,120,84,0.18) 0%, transparent 50%)',
      }} />

      {/* LEFT — vinyl record */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, #2a2a2a 0%, #0a0a0a 100%)',
          position: 'relative',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)',
          // grooves
          backgroundImage: `
            radial-gradient(circle, transparent 30%, rgba(255,255,255,0.04) 31%, transparent 32%),
            radial-gradient(circle, transparent 35%, rgba(255,255,255,0.04) 36%, transparent 37%),
            radial-gradient(circle, transparent 40%, rgba(255,255,255,0.04) 41%, transparent 42%),
            radial-gradient(circle, transparent 45%, rgba(255,255,255,0.04) 46%, transparent 47%),
            radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)
          `,
          transform: 'translateX(-30px)',
        }}>
          {/* Label */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 96, height: 96, borderRadius: '50%',
            background: P.coral,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #1F2A1F',
            overflow: 'hidden',
          }}>
            <MaxFront height={88} />
            {/* Center hole */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 8, height: 8, borderRadius: '50%',
              background: '#1F2A1F',
              boxShadow: '0 0 0 2px rgba(0,0,0,0.4)',
            }} />
          </div>
        </div>
      </div>

      {/* RIGHT — track list */}
      <div style={{
        padding: '20px 24px 20px 4px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 2.5,
          color: P.coral, textTransform: 'uppercase',
          fontFamily: 'Space Mono, monospace',
        }}>
          ◉ Now playing
        </div>
        <h2 style={{
          fontFamily: '"Bebas Neue", "Inter", sans-serif',
          fontSize: 38, fontWeight: 400, margin: 0,
          lineHeight: 0.95, letterSpacing: 1, color: '#F5EAD3',
        }}>
          SINTONIZA CON <span style={{ color: P.coral }}>MAX</span>
        </h2>

        {/* Track list */}
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 10.5, lineHeight: 1.7, color: 'rgba(245,234,211,0.75)',
        }}>
          <div><span style={{ color: P.coral, marginRight: 6 }}>A1</span> Encuentra equipo industrial</div>
          <div><span style={{ color: P.coral, marginRight: 6 }}>A2</span> Cierra mejores tratos en subastas</div>
          <div style={{ color: 'rgba(245,234,211,0.4)' }}><span style={{ marginRight: 6 }}>B1</span> Próximamente…</div>
        </div>

        <button style={{
          alignSelf: 'flex-start', marginTop: 2,
          background: P.coral, color: '#1F2A1F', border: 'none',
          padding: '9px 16px', borderRadius: 999, fontWeight: 800,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          letterSpacing: 1, textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          ▶ Reproducir
        </button>
      </div>
    </div>
  );
}

// =====================================================
// VN9 — Boarding pass / ticket
// Pase de abordar al próximo activo
// =====================================================
function VN9BoardingPass() {
  return (
    <div style={{
      width: 600, height: 240, background: '#FCF8F0',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: 'Space Mono, monospace', color: '#1A1140', position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 180px',
      border: '1.5px dashed rgba(26,17,64,0.2)',
    }}>
      {/* LEFT — flight info */}
      <div style={{
        padding: '16px 20px 16px 22px',
        borderRight: '2px dashed rgba(26,17,64,0.3)',
        position: 'relative',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Top notch */}
        <div style={{
          position: 'absolute', right: -10, top: -10,
          width: 20, height: 20, borderRadius: '50%',
          background: '#F5EFE6',
        }} />
        <div style={{
          position: 'absolute', right: -10, bottom: -10,
          width: 20, height: 20, borderRadius: '50%',
          background: '#F5EFE6',
        }} />

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingBottom: 8, borderBottom: '1px solid rgba(26,17,64,0.18)',
        }}>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 22, letterSpacing: 2, color: P.coral, lineHeight: 1,
          }}>
            VMC · BOARDING PASS
          </div>
          <div style={{
            fontSize: 8.5, letterSpacing: 1.5,
            color: 'rgba(26,17,64,0.55)',
          }}>
            № A-2487
          </div>
        </div>

        {/* From → To */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
          <div>
            <div style={{ fontSize: 8.5, letterSpacing: 1.5, color: 'rgba(26,17,64,0.5)', textTransform: 'uppercase' }}>De</div>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, lineHeight: 1, color: '#1A1140' }}>
              TÚ
            </div>
            <div style={{ fontSize: 8.5, color: 'rgba(26,17,64,0.6)' }}>Comprador</div>
          </div>

          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: '50%',
              borderTop: '1.5px dashed rgba(26,17,64,0.35)',
            }} />
            <div style={{
              background: '#FCF8F0', color: P.coral, fontSize: 14,
              padding: '0 6px', position: 'relative', zIndex: 1,
            }}>✈</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8.5, letterSpacing: 1.5, color: 'rgba(26,17,64,0.5)', textTransform: 'uppercase' }}>A</div>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 24, letterSpacing: 1, lineHeight: 1, color: '#1A1140' }}>
              TU MÁQUINA
            </div>
            <div style={{ fontSize: 8.5, color: 'rgba(26,17,64,0.6)' }}>Equipo industrial</div>
          </div>
        </div>

        {/* Detail grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          paddingTop: 8, borderTop: '1px solid rgba(26,17,64,0.18)',
        }}>
          <div>
            <div style={{ fontSize: 7.5, letterSpacing: 1, color: 'rgba(26,17,64,0.5)', textTransform: 'uppercase' }}>Piloto</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1140' }}>MAX</div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, letterSpacing: 1, color: 'rgba(26,17,64,0.5)', textTransform: 'uppercase' }}>Gate</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1140' }}>24/7</div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, letterSpacing: 1, color: 'rgba(26,17,64,0.5)', textTransform: 'uppercase' }}>Asiento</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1140' }}>Cualquiera</div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, letterSpacing: 1, color: 'rgba(26,17,64,0.5)', textTransform: 'uppercase' }}>Duración</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: P.coral }}>~3s</div>
          </div>
        </div>
      </div>

      {/* RIGHT — stub */}
      <div style={{
        padding: '16px 14px', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: 8.5, letterSpacing: 1.5, color: 'rgba(26,17,64,0.5)',
          textTransform: 'uppercase', textAlign: 'center',
        }}>
          Pase de embarque
        </div>
        <MaxFront height={92} />
        {/* Faux QR */}
        <div style={{
          width: 50, height: 50,
          background: '#1A1140',
          backgroundImage: `
            linear-gradient(90deg, #FCF8F0 12%, transparent 12% 24%, #FCF8F0 24% 36%, transparent 36% 60%, #FCF8F0 60% 72%, transparent 72% 96%, #FCF8F0 96%),
            linear-gradient(0deg, #FCF8F0 12%, transparent 12% 24%, #FCF8F0 24% 48%, transparent 48% 60%, #FCF8F0 60% 84%, transparent 84%)
          `,
          backgroundSize: '100% 100%',
        }} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '9px 14px', borderRadius: 4, fontWeight: 800,
          fontSize: 11, cursor: 'pointer', fontFamily: '"Bebas Neue", sans-serif',
          letterSpacing: 2, width: '100%',
        }}>
          EMBARCAR →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { VN7Postcard, VN8Vinyl, VN9BoardingPass });
