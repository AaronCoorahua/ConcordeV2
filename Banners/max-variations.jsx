// MAX banner section variations
// Each variation is ~600 × 240px — email-banner-safe

const C = {
  teal: '#1F5163',
  tealDeep: '#163E4D',
  tealLight: '#2A6577',
  coral: '#F57854',
  coralHover: '#E66A47',
  cream: '#FAF7F2',
  mint: '#7EC8B5',
  white: '#FFFFFF',
};

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ---------- Reusable bits ----------

// Full character illustration of MAX (pointing/guiding)
function MaxCharacter({ height = 200 }) {
  // Native aspect: 152 × 178
  const width = height * (152 / 178);
  return (
    <img
      src="assets/max-avatar.png"
      alt="MAX"
      style={{
        height, width, display: 'block',
        flexShrink: 0, pointerEvents: 'none', userSelect: 'none',
      }}
    />
  );
}

// Circular crop showing just MAX's face/head (top portion of illustration)
function MaxAvatar({ size = 72, ring = true }) {
  // New image (152×178): head sits center-horizontal, top ~0-45% vertical.
  // Zoom so the head fills the circle.
  const bgZoom = 100 / 0.45;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      backgroundImage: `url('assets/max-avatar.png')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${bgZoom}% auto`,
      backgroundPosition: '50% 10%',
      backgroundColor: C.cream,
      border: ring ? `2.5px solid ${C.coral}` : `2.5px solid ${C.cream}`,
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
    }} />
  );
}

// VMC & MAX badge (recreated original from the brand, simplified)
function VmcMaxBadge({ size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: C.tealDeep,
      border: `3px solid ${C.cream}`,
      boxShadow: `0 0 0 2px ${C.tealDeep}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      color: C.cream, fontFamily: FONT, fontWeight: 800,
      flexShrink: 0, lineHeight: 1,
    }}>
      <div style={{ fontSize: size * 0.18, letterSpacing: 1 }}>vmc</div>
      <div style={{
        fontSize: size * 0.11, color: C.coral, fontStyle: 'italic',
        fontWeight: 600, margin: `${size * 0.03}px 0`,
      }}>&amp;</div>
      <div style={{ fontSize: size * 0.18, letterSpacing: 1 }}>MAX</div>
    </div>
  );
}

// ===================================
// V1 — Refined original
// Cleaner hierarchy, properly framed, stronger CTA
// ===================================
function V1Refined() {
  return (
    <div style={{
      width: 600, height: 240, background: C.teal,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: C.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 200px',
    }}>
      {/* subtle radial glow */}
      <div style={{
        position: 'absolute', right: -40, top: -60, width: 240, height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,120,84,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* LEFT — content */}
      <div style={{
        padding: '26px 0 26px 28px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
          color: C.mint, textTransform: 'uppercase', marginBottom: 8,
        }}>
          Concierge IA · VMC Subastas
        </div>
        <h2 style={{
          fontSize: 26, fontWeight: 800, margin: '0 0 8px 0',
          lineHeight: 1.05, letterSpacing: -0.5,
        }}>
          Dile a MAX<br/>lo que buscas.
        </h2>
        <p style={{
          fontSize: 13, lineHeight: 1.45, margin: '0 0 14px 0',
          color: 'rgba(255,255,255,0.78)', maxWidth: 320,
        }}>
          Encuentra maquinaria, camiones y lotes ideales con
          información clara e instantánea.
        </p>
        <button style={{
          alignSelf: 'flex-start',
          background: C.coral, color: C.white, border: 'none',
          padding: '10px 18px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          Consultar con MAX
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>

      {/* RIGHT — character panel anchored bottom-right, badge top */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        overflow: 'hidden', paddingRight: 4,
      }}>
        <MaxCharacter height={210} />
      </div>
    </div>
  );
}

// ===================================
// V2 — Chat bubble (MAX speaks)
// Conversational metaphor, more personality
// ===================================
function V2ChatBubble() {
  return (
    <div style={{
      width: 600, height: 240, background: C.teal,
      borderRadius: 14, padding: 22, boxSizing: 'border-box',
      fontFamily: FONT, color: C.white, position: 'relative', overflow: 'hidden',
      display: 'flex', gap: 18, alignItems: 'center',
    }}>
      {/* Left: MAX character peeking from bottom */}
      <div style={{
        width: 150, height: '100%', position: 'relative', flexShrink: 0,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', bottom: -22, left: -8 }}>
          <MaxCharacter height={220} />
        </div>
        <div style={{
          position: 'absolute', top: 4, left: 8,
          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
          color: C.mint, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.mint, boxShadow: `0 0 6px ${C.mint}` }} />
          MAX · en línea
        </div>
      </div>

      {/* Right: chat */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* MAX bubble */}
        <div style={{
          background: C.tealDeep, color: C.white,
          padding: '12px 16px', borderRadius: '4px 18px 18px 18px',
          fontSize: 14, lineHeight: 1.4, maxWidth: '95%',
          border: `1px solid rgba(255,255,255,0.08)`,
        }}>
          <strong style={{ fontWeight: 800, fontSize: 15 }}>Hola, soy MAX.</strong>
          <br/>
          ¿Qué maquinaria, camión o lote estás buscando hoy?
        </div>

        {/* User reply (ghost) */}
        <div style={{
          alignSelf: 'flex-end', background: 'rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.55)', padding: '8px 14px',
          borderRadius: '18px 4px 18px 18px', fontSize: 12,
          fontStyle: 'italic', maxWidth: '85%',
        }}>
          Excavadora hidráulica, &lt;15 toneladas…
        </div>

        {/* CTA */}
        <button style={{
          alignSelf: 'flex-start', marginTop: 4,
          background: C.coral, color: C.white, border: 'none',
          padding: '11px 20px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
        }}>
          Empezar conversación →
        </button>
      </div>
    </div>
  );
}

// ===================================
// V3 — Prompt examples (taggable queries)
// Shows what to ASK, removes the "what does it do" friction
// ===================================
function V3Prompts() {
  const prompts = [
    'Excavadoras Caterpillar',
    'Camiones Volvo &lt; 2020',
    'Cargadores frontales',
    'Tractocamiones diesel',
  ];
  return (
    <div style={{
      width: 600, height: 240, background: C.teal,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: C.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 180px',
    }}>
      {/* LEFT — content */}
      <div style={{
        padding: '22px 12px 22px 26px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
            color: C.coral, textTransform: 'uppercase', marginBottom: 6,
          }}>
            ◆ Concierge IA
          </div>
          <h2 style={{
            fontSize: 22, fontWeight: 800, margin: 0,
            lineHeight: 1.1, letterSpacing: -0.4,
          }}>
            Pregúntale a MAX,<br/>
            <span style={{ color: C.mint }}>te muestra el lote ideal.</span>
          </h2>
        </div>

        {/* Prompt chips */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 5,
          margin: '8px 0',
        }}>
          {prompts.map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.92)',
              padding: '5px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
            }} dangerouslySetInnerHTML={{ __html: `“${p}”` }} />
          ))}
        </div>

        {/* CTA row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button style={{
            background: C.coral, color: C.white, border: 'none',
            padding: '10px 18px', borderRadius: 999, fontWeight: 700,
            fontSize: 13, cursor: 'pointer', fontFamily: FONT,
            boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
          }}>
            Consultar con MAX →
          </button>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.55)',
            fontFamily: 'ui-monospace, monospace', lineHeight: 1.3,
          }}>
            Respuesta en<br/>segundos · 24/7
          </div>
        </div>
      </div>

      {/* RIGHT — character + badge, character flush right */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        overflow: 'hidden', paddingRight: 4,
      }}>
        <MaxCharacter height={205} />
      </div>
    </div>
  );
}

// ===================================
// V4 — Bold typographic
// Giant MAX, minimal copy, badge as anchor
// ===================================
function V4Typographic() {
  return (
    <div style={{
      width: 600, height: 240, background: C.teal,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: C.white, position: 'relative', overflow: 'hidden',
      display: 'flex',
    }}>
      {/* Left block — giant wordmark */}
      <div style={{
        flex: 1, padding: '24px 26px', display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            color: C.mint, textTransform: 'uppercase', marginBottom: 4,
          }}>
            Concierge IA — VMC Subastas
          </div>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 10,
            marginTop: 4,
          }}>
            <span style={{
              fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
            }}>Dile a</span>
            <span style={{
              fontSize: 82, fontWeight: 900, letterSpacing: -3,
              lineHeight: 0.9, color: C.coral,
              fontFamily: FONT,
            }}>MAX</span>
          </div>
          <div style={{
            fontSize: 18, fontWeight: 700, letterSpacing: -0.3,
            marginTop: 6,
          }}>
            lo que buscas.
          </div>
        </div>

        <button style={{
          alignSelf: 'flex-start',
          background: C.coral, color: C.white, border: 'none',
          padding: '10px 18px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
        }}>
          Probar ahora →
        </button>
      </div>

      {/* Right block — accent panel with badge + character */}
      <div style={{
        width: 200, background: C.tealDeep,
        borderLeft: `2px dashed rgba(255,255,255,0.12)`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        padding: '12px 8px 0 8px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 12, left: 0, right: 0, zIndex: 2, textAlign: 'center',
          fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: C.mint, textTransform: 'uppercase',
        }}>
          Concierge IA
        </div>
        <MaxCharacter height={180} />
      </div>
    </div>
  );
}

// ===================================
// V5 — Composer / search-input style
// Looks like a chat input — invites the click
// ===================================
function V5Composer() {
  return (
    <div style={{
      width: 600, height: 240, background: C.teal,
      borderRadius: 14, padding: '24px 28px', boxSizing: 'border-box',
      fontFamily: FONT, color: C.white, position: 'relative', overflow: 'hidden',
    }}>
      {/* Top: header + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <MaxAvatar size={52} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1.4,
            color: C.mint, textTransform: 'uppercase',
          }}>
            ● MAX · Concierge IA
          </div>
          <h2 style={{
            fontSize: 22, fontWeight: 800, margin: '2px 0 0 0',
            lineHeight: 1.1, letterSpacing: -0.4,
          }}>
            Encuentra tu próxima máquina. Solo pregunta.
          </h2>
        </div>
      </div>

      {/* Fake composer */}
      <div style={{
        background: C.cream, borderRadius: 14, padding: '4px 4px 4px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
      }}>
        <div style={{
          flex: 1, color: 'rgba(31,81,99,0.55)', fontSize: 14,
          fontStyle: 'italic',
        }}>
          Ej: “Necesito una excavadora de 20 ton para febrero…”
        </div>
        <button style={{
          background: C.coral, color: C.white, border: 'none',
          padding: '10px 18px', borderRadius: 10, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          Enviar
          <span style={{ fontSize: 14 }}>↗</span>
        </button>
      </div>

      {/* Microcopy row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 14, fontSize: 11,
        color: 'rgba(255,255,255,0.55)',
        fontFamily: 'ui-monospace, monospace',
      }}>
        <span>Subastas reales · información instantánea · 24/7</span>
      </div>
    </div>
  );
}

// ===================================
// V6 — Split with stat callout
// Trust-building: shows scale, more "professional services"
// ===================================
function V6Split() {
  return (
    <div style={{
      width: 600, height: 240, background: C.cream,
      borderRadius: 14, boxSizing: 'border-box', overflow: 'hidden',
      fontFamily: FONT, color: C.tealDeep, position: 'relative',
      display: 'grid', gridTemplateColumns: '200px 1fr',
    }}>
      {/* LEFT — teal block with MAX character + badge */}
      <div style={{
        background: C.teal,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'flex-end',
        position: 'relative', overflow: 'hidden',
        paddingLeft: 4,
      }}>
        <div style={{
          position: 'absolute', top: 14, left: 0, right: 0, zIndex: 2,
          fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
          color: C.mint, textTransform: 'uppercase', textAlign: 'center',
        }}>
          Concierge IA
        </div>
        <MaxCharacter height={190} />
      </div>

      {/* RIGHT — content */}
      <div style={{
        padding: '22px 24px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{
            fontSize: 22, fontWeight: 800, margin: 0,
            lineHeight: 1.1, letterSpacing: -0.5, color: C.tealDeep,
          }}>
            Dile a MAX lo que buscas.
          </h2>
          <p style={{
            fontSize: 12.5, lineHeight: 1.45, margin: '6px 0 0 0',
            color: 'rgba(22,62,77,0.7)',
          }}>
            Tu asistente para encontrar maquinaria, camiones
            y lotes industriales en VMC Subastas.
          </p>
        </div>

        {/* Stat strip */}
        <div style={{
          display: 'flex', gap: 14, alignItems: 'center',
          padding: '8px 0',
          borderTop: `1px solid rgba(22,62,77,0.12)`,
          borderBottom: `1px solid rgba(22,62,77,0.12)`,
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.coral, lineHeight: 1 }}>24/7</div>
            <div style={{ fontSize: 9.5, color: 'rgba(22,62,77,0.6)', marginTop: 2, letterSpacing: 0.3 }}>disponible</div>
          </div>
          <div style={{ width: 1, height: 22, background: 'rgba(22,62,77,0.15)' }} />
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.coral, lineHeight: 1 }}>~3s</div>
            <div style={{ fontSize: 9.5, color: 'rgba(22,62,77,0.6)', marginTop: 2, letterSpacing: 0.3 }}>respuesta</div>
          </div>
          <div style={{ width: 1, height: 22, background: 'rgba(22,62,77,0.15)' }} />
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.coral, lineHeight: 1 }}>100%</div>
            <div style={{ fontSize: 9.5, color: 'rgba(22,62,77,0.6)', marginTop: 2, letterSpacing: 0.3 }}>lotes reales</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            background: C.coral, color: C.white, border: 'none',
            padding: '10px 18px', borderRadius: 999, fontWeight: 700,
            fontSize: 13, cursor: 'pointer', fontFamily: FONT,
            boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
          }}>
            Consultar con MAX →
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================================
// Purple/Navy palette + MAX front-facing avatar
// ===================================
const P = {
  royal: '#391383',
  navy: '#00005E',
  royalLight: '#4D2199',
  navyLight: '#15157A',
  cream: '#FFF4EB',
  peach: '#FFD3B8',
  lavender: '#C9B6FF',
  coral: '#F57854',
  white: '#FFFFFF',
};

// Front-facing MAX (arms open / presenting). Native upscaled 260×240.
function MaxFront({ height = 180 }) {
  const width = height * (260 / 240);
  return (
    <img
      src="assets/max-front.png"
      alt="MAX"
      style={{
        height, width, display: 'block',
        flexShrink: 0, pointerEvents: 'none', userSelect: 'none',
      }}
    />
  );
}

// ===================================
// VP1 — Soft lavender, refined
// MAX small señalando hacia el botón
// ===================================
function VP1Royal() {
  const VP1_BG = '#A298B3';
  const VP1_INK = '#1A1140';     // deep navy ink for text
  const VP1_INK_SOFT = 'rgba(26,17,64,0.72)';
  const VP1_ACCENT = '#3B2580';  // accent for status / pop
  return (
    <div style={{
      width: 600, height: 240, background: VP1_BG,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: VP1_INK, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 200px', alignItems: 'center',
    }}>
      {/* Soft decorative glows tuned for light bg */}
      <div style={{
        position: 'absolute', right: -50, top: -80, width: 260, height: 260,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: -40, bottom: -60, width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,120,84,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* LEFT — text */}
      <div style={{
        padding: '0 0 0 28px', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
          color: VP1_ACCENT, marginBottom: 10,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#22A862', boxShadow: '0 0 8px rgba(34,168,98,0.6)',
          }} />
          MAX está listo
        </div>
        <h2 style={{
          fontSize: 28, fontWeight: 800, margin: '0 0 10px 0',
          lineHeight: 1.05, letterSpacing: -0.6, color: VP1_INK,
        }}>
          Dile a MAX<br/>lo que buscas.
        </h2>
        <p style={{
          fontSize: 13, lineHeight: 1.45, margin: 0,
          color: VP1_INK_SOFT, maxWidth: 330,
        }}>
          Describe el equipo, marca o capacidad que necesitas.
          MAX lo rastrea entre las subastas activas y te trae los
          matches reales en segundos.
        </p>
      </div>

      {/* RIGHT — MAX above CTA */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        paddingRight: 18,
      }}>
        <MaxFront height={104} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '11px 20px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(26,17,64,0.32)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap',
        }}>
          Hablar con MAX
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
    </div>
  );
}

// ===================================
// VP2 — Deep navy, bold typographic
// MAX pequeño señalando hacia el CTA
// ===================================
function VP2NavyBold() {
  return (
    <div style={{
      width: 600, height: 240, background: P.navy,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 200px', alignItems: 'center',
    }}>
      {/* Diagonal accent bands */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 60px, rgba(255,255,255,0.025) 60px 61px)`,
        pointerEvents: 'none',
      }} />

      {/* LEFT — wordmark */}
      <div style={{
        padding: '0 0 0 28px', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 2,
          color: P.lavender, textTransform: 'uppercase', marginBottom: 4,
        }}>
          ◆ Concierge IA — VMC Subastas
        </div>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6,
        }}>
          <span style={{
            fontSize: 14, fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
          }}>Dile a</span>
          <span style={{
            fontSize: 78, fontWeight: 900, letterSpacing: -3,
            lineHeight: 0.9, color: P.coral, fontFamily: FONT,
          }}>MAX</span>
        </div>
        <div style={{
          fontSize: 17, fontWeight: 700, letterSpacing: -0.3, marginTop: 4,
        }}>
          lo que buscas.
        </div>
      </div>

      {/* RIGHT — MAX above button */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        paddingRight: 18,
      }}>
        <MaxFront height={110} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '11px 20px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(0,0,0,0.3)',
          whiteSpace: 'nowrap',
        }}>
          Probar ahora →
        </button>
      </div>
    </div>
  );
}

// ===================================
// VP3 — Two-tone split with prompt chips
// MAX pequeño sobre el CTA
// ===================================
function VP3TwoTone() {
  const prompts = [
    'Excavadoras Caterpillar',
    'Camiones Volvo',
    'Cargadores frontales',
  ];
  return (
    <div style={{
      width: 600, height: 240, background: P.royal,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 200px',
    }}>
      {/* LEFT — content */}
      <div style={{
        padding: '22px 14px 22px 26px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
            color: P.coral, textTransform: 'uppercase', marginBottom: 6,
          }}>
            ◆ Concierge IA
          </div>
          <h2 style={{
            fontSize: 22, fontWeight: 800, margin: 0,
            lineHeight: 1.1, letterSpacing: -0.4,
          }}>
            Pregúntale a MAX,<br/>
            <span style={{ color: P.peach }}>te muestra el lote ideal.</span>
          </h2>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 5, margin: '6px 0',
        }}>
          {prompts.map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.95)',
              padding: '5px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
            }}>{`“${p}”`}</div>
          ))}
        </div>

        <div style={{
          fontSize: 10, color: 'rgba(255,255,255,0.55)',
          fontFamily: 'ui-monospace, monospace',
        }}>
          Respuesta en segundos · disponible 24/7
        </div>
      </div>

      {/* RIGHT — navy panel with MAX over CTA */}
      <div style={{
        background: P.navy, position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: 12,
      }}>
        <MaxFront height={106} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '10px 16px', borderRadius: 999, fontWeight: 700,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(0,0,0,0.3)',
          whiteSpace: 'nowrap',
        }}>
          Consultar con MAX →
        </button>
      </div>
    </div>
  );
}

// ===================================
// VP1b — Same lavender bg, alternate copy & CTA
// Parallel-structure hook + concrete examples
// ===================================
function VP1bAlt() {
  const VP1_BG = '#A298B3';
  const VP1_INK = '#1A1140';
  const VP1_INK_SOFT = 'rgba(26,17,64,0.7)';
  const VP1_ACCENT = '#3B2580';
  return (
    <div style={{
      width: 600, height: 240, background: VP1_BG,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: VP1_INK, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 200px', alignItems: 'center',
    }}>
      {/* Soft decorative glows */}
      <div style={{
        position: 'absolute', right: -50, top: -80, width: 260, height: 260,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: -40, bottom: -60, width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,120,84,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* LEFT — text */}
      <div style={{
        padding: '0 0 0 28px', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4,
          color: VP1_ACCENT, marginBottom: 10, textTransform: 'uppercase',
        }}>
          Asistente disponible · 24/7
        </div>
        <h2 style={{
          fontSize: 28, fontWeight: 800, margin: '0 0 10px 0',
          lineHeight: 1.05, letterSpacing: -0.6, color: VP1_INK,
        }}>
          Lo describes. <span style={{ color: P.coral }}>MAX lo encuentra.</span>
        </h2>
        <p style={{
          fontSize: 13, lineHeight: 1.5, margin: 0,
          color: VP1_INK_SOFT, maxWidth: 340,
        }}>
          Una excavadora de 20 ton. Un Volvo 2019. Un lote completo.
          Cuéntale qué necesitas y MAX rastrea las subastas activas por ti.
        </p>
      </div>

      {/* RIGHT — MAX above CTA */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        paddingRight: 18,
      }}>
        <MaxFront height={104} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '11px 20px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(26,17,64,0.32)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap',
        }}>
          Probar gratis
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
    </div>
  );
}

// ===================================
// VP1c — Royal purple · Chat preview inline
// Mini conversación visible llena el espacio horizontal
// ===================================
function VP1cChat() {
  const BG = '#391383', INK = '#FFFFFF', INK_SOFT = 'rgba(255,255,255,0.78)', ACCENT = '#FFD3B8';
  return (
    <div style={{
      width: 600, height: 240, background: BG,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: INK, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '170px 1fr', alignItems: 'center',
    }}>
      {/* Decorative speech-shape behind MAX */}
      <div style={{
        position: 'absolute', left: 30, top: 18, width: 130, height: 130,
        borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />

      {/* LEFT — MAX larger */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6,
        paddingLeft: 14,
      }}>
        <MaxFront height={150} />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 1, color: ACCENT,
          textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7EE2A8',
            boxShadow: '0 0 6px #7EE2A8' }} />
          MAX · en línea
        </div>
      </div>

      {/* RIGHT — title + chat sample + CTA */}
      <div style={{
        padding: '20px 24px 20px 8px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center',
      }}>
        <h2 style={{
          fontSize: 22, fontWeight: 800, margin: 0,
          lineHeight: 1.05, letterSpacing: -0.5, color: INK,
        }}>
          Encuentra equipo industrial,<br/>
          <span style={{ color: P.coral }}>solo pregúntale a MAX.</span>
        </h2>

        {/* Chat exchange */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{
            alignSelf: 'flex-start',
            background: 'rgba(255,255,255,0.12)', color: INK,
            padding: '6px 11px', borderRadius: '12px 12px 12px 3px',
            fontSize: 11.5, fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            Necesito una excavadora 20 ton
          </div>
          <div style={{
            alignSelf: 'flex-start',
            background: P.white, color: '#1A1140',
            padding: '6px 11px', borderRadius: '3px 12px 12px 12px',
            fontSize: 11.5, fontWeight: 600,
          }}>
            Encontré 3 lotes activos →
          </div>
        </div>

        <button style={{
          alignSelf: 'flex-start', marginTop: 2,
          background: P.coral, color: P.white, border: 'none',
          padding: '9px 16px', borderRadius: 999, fontWeight: 700,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.32)',
          whiteSpace: 'nowrap',
        }}>
          Probar MAX →
        </button>
      </div>
    </div>
  );
}

// ===================================
// VP1d — Royal purple · Categorías visibles
// Chips llenan el espacio inferior + microcopy
// ===================================
function VP1dChips() {
  const BG = '#391383', INK = '#FFFFFF', INK_SOFT = 'rgba(255,255,255,0.72)', ACCENT = '#FFD3B8';
  const cats = ['Excavadoras', 'Camiones', 'Cargadores', 'Tractocamiones', 'Forklifts', 'Lotes mixtos'];
  return (
    <div style={{
      width: 600, height: 240, background: BG,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: INK, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 180px',
    }}>
      {/* LEFT — text + chips */}
      <div style={{
        padding: '20px 14px 20px 26px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4,
            color: ACCENT, marginBottom: 8, textTransform: 'uppercase',
          }}>
            ◆ Concierge inteligente
          </div>
          <h2 style={{
            fontSize: 23, fontWeight: 800, margin: '0 0 6px 0',
            lineHeight: 1.05, letterSpacing: -0.5, color: INK,
          }}>
            ¿Qué necesitas hoy?<br/>
            <span style={{ color: P.coral }}>MAX rastrea las subastas.</span>
          </h2>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {cats.map((c, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: INK,
              padding: '5px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>{c}</div>
          ))}
        </div>

        <div style={{
          fontSize: 10.5, color: INK_SOFT,
          fontFamily: 'ui-monospace, monospace',
        }}>
          …o describe lo que sea. MAX te entiende.
        </div>
      </div>

      {/* RIGHT — MAX + CTA */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: 12,
      }}>
        <MaxFront height={100} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '10px 18px', borderRadius: 999, fontWeight: 700,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.32)',
          whiteSpace: 'nowrap',
        }}>
          Empezar conversación →
        </button>
      </div>
    </div>
  );
}

// ===================================
// VP1e — Royal purple · 3 pasos
// Flujo visual + métricas llenan el espacio
// ===================================
function VP1eFlow() {
  const BG = '#391383', INK = '#FFFFFF', INK_SOFT = 'rgba(255,255,255,0.72)', ACCENT = '#FFD3B8';
  const steps = [
    { n: '1', t: 'Descríbele', s: 'lo que buscas' },
    { n: '2', t: 'MAX rastrea', s: 'subastas activas' },
    { n: '3', t: 'Recibe', s: 'los matches reales' },
  ];
  return (
    <div style={{
      width: 600, height: 240, background: BG,
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: INK, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 180px',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', right: -30, top: -50, width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,120,84,0.22) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* LEFT */}
      <div style={{
        padding: '20px 14px 18px 26px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{
            fontSize: 24, fontWeight: 800, margin: '0 0 4px 0',
            lineHeight: 1.05, letterSpacing: -0.5, color: INK,
          }}>
            Encuentra equipo industrial en <span style={{ color: P.coral }}>3 pasos</span>.
          </h2>
          <p style={{
            fontSize: 12, lineHeight: 1.4, margin: 0,
            color: INK_SOFT, maxWidth: 360,
          }}>
            MAX es tu copiloto en VMC Subastas — entiende lo que buscas y hace el trabajo por ti.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.08)',
                borderRadius: 8, padding: '8px 10px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, color: P.coral,
                  lineHeight: 1, marginBottom: 4,
                }}>{s.n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: INK, lineHeight: 1.15 }}>{s.t}</div>
                <div style={{ fontSize: 10, color: INK_SOFT, lineHeight: 1.25 }}>{s.s}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  display: 'flex', alignItems: 'center', color: ACCENT,
                  fontWeight: 800, fontSize: 14, margin: '0 -2px',
                }}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* RIGHT — MAX + CTA */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        paddingRight: 14,
      }}>
        <MaxFront height={108} />
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '10px 18px', borderRadius: 999, fontWeight: 700,
          fontSize: 12.5, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.32)',
          whiteSpace: 'nowrap',
        }}>
          Hablar con MAX →
        </button>
      </div>
    </div>
  );
}

// ===================================
// Newsletter context preview
// Embeds a banner in a mock of the surrounding newsletter strip
// ===================================
function NewsletterContext({ children, label }) {
  return (
    <div style={{
      width: 360, background: '#F5EFE8', fontFamily: FONT,
      padding: '16px 14px 14px', boxSizing: 'border-box', color: '#1A1140',
    }}>
      {/* Faux equipment card */}
      <div style={{
        background: C.white, borderRadius: 10, overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: 12,
      }}>
        <div style={{
          height: 96, background:
            'repeating-linear-gradient(135deg, #E8E0D6 0 6px, #DDD3C5 6px 12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(0,0,0,0.35)', fontFamily: 'ui-monospace, monospace', fontSize: 10,
        }}>
          [equipment photo]
        </div>
        <div style={{ padding: '10px 12px 12px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: P.coral, marginBottom: 4 }}>
            Recicladora de Asfalto TICAB / R-8.2487
          </div>
          <div style={{ fontSize: 9.5, color: 'rgba(26,17,64,0.6)', marginBottom: 8 }}>
            Vendedor: AUNOR · Lunes 25 de Mayo 1:50 PM · USD 29,999
          </div>
          <button style={{
            background: P.coral, color: C.white, border: 'none',
            padding: '7px 16px', borderRadius: 999, fontWeight: 700,
            fontSize: 11, fontFamily: FONT, width: '100%',
          }}>Ver subasta</button>
        </div>
      </div>

      {/* Faux "Toma el control" CTA */}
      <div style={{
        background: '#FAF2E8', borderRadius: 10, padding: '14px 12px',
        textAlign: 'center', marginBottom: 12,
        border: '1px dashed rgba(57, 19, 131, 0.2)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: P.coral, marginBottom: 4 }}>
          ¡Toma el control de tu flota!
        </div>
        <div style={{ fontSize: 10, color: 'rgba(26,17,64,0.65)', lineHeight: 1.35, marginBottom: 8 }}>
          Encuentra el activo que necesitas y empieza a gestionar tu próxima adquisición.
        </div>
        <button style={{
          background: '#F5C28B', color: '#1A1140', border: 'none',
          padding: '6px 16px', borderRadius: 999, fontWeight: 700,
          fontSize: 11, fontFamily: FONT,
        }}>Ver más ofertas</button>
      </div>

      {/* Slot label */}
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(26,17,64,0.45)',
        textTransform: 'uppercase', marginBottom: 6, textAlign: 'center',
      }}>
        ↓ {label} ↓
      </div>

      {/* The banner — scaled to fit 332px */}
      <div style={{
        width: 332, height: 132.8, // 600x240 * 0.5533
        position: 'relative', overflow: 'hidden', borderRadius: 10,
      }}>
        <div style={{
          width: 600, height: 240,
          transform: 'scale(0.5533)',
          transformOrigin: 'top left',
        }}>
          {children}
        </div>
      </div>

      {/* Footer hint */}
      <div style={{
        marginTop: 12, fontSize: 9, color: 'rgba(26,17,64,0.4)',
        textAlign: 'center', fontFamily: 'ui-monospace, monospace',
      }}>
        www.vmcsubastas.com
      </div>
    </div>
  );
}

// =====================================================
// VN1 — Phone chat demo
// Muestra el producto en lugar de describirlo
// =====================================================
function VN1Phone() {
  return (
    <div style={{
      width: 600, height: 240, background: '#00005E',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 200px', alignItems: 'center',
    }}>
      {/* Grid texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
        backgroundSize: '14px 14px', pointerEvents: 'none',
      }} />

      {/* LEFT — copy */}
      <div style={{
        padding: '0 0 0 30px', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontSize: 10.5, fontWeight: 700, letterSpacing: 1.8,
          color: '#C9B6FF', textTransform: 'uppercase', marginBottom: 10,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7EE2A8', boxShadow: '0 0 8px #7EE2A8' }} />
          Así se habla con MAX
        </div>
        <h2 style={{
          fontSize: 28, fontWeight: 800, margin: '0 0 12px 0',
          lineHeight: 1.05, letterSpacing: -0.6,
        }}>
          Cuéntale.<br/>
          <span style={{ color: P.coral }}>Él lo encuentra.</span>
        </h2>
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '11px 20px', borderRadius: 999, fontWeight: 700,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          Abrir chat con MAX
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>

      {/* RIGHT — phone mockup */}
      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 150, height: 220,
          background: '#0A0A2A', borderRadius: 22,
          border: '3px solid #1F1F4A',
          boxShadow: '0 18px 30px rgba(0,0,0,0.4), inset 0 0 0 2px rgba(255,255,255,0.04)',
          padding: '20px 8px 8px',
          transform: 'rotate(4deg) translateY(8px)',
          display: 'flex', flexDirection: 'column', gap: 5,
          position: 'relative',
        }}>
          {/* Notch */}
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            width: 50, height: 4, borderRadius: 4, background: '#000',
          }} />
          {/* Chat header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '0 4px 6px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              backgroundImage: `url('assets/max-front.png')`,
              backgroundSize: '160%', backgroundPosition: '50% 12%',
              backgroundColor: '#FFF',
            }} />
            <div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: P.white }}>MAX</div>
              <div style={{ fontSize: 7, color: '#7EE2A8' }}>● en línea</div>
            </div>
          </div>
          {/* User */}
          <div style={{
            alignSelf: 'flex-end', background: P.coral, color: P.white,
            padding: '5px 8px', borderRadius: '10px 10px 2px 10px',
            fontSize: 8.5, maxWidth: '88%', lineHeight: 1.25,
          }}>
            Hola MAX, busco una excavadora de 20 ton, año 2020+
          </div>
          {/* MAX typing */}
          <div style={{
            alignSelf: 'flex-start', background: 'rgba(255,255,255,0.12)', color: P.white,
            padding: '5px 8px', borderRadius: '10px 10px 10px 2px',
            fontSize: 8.5, maxWidth: '88%', lineHeight: 1.25,
          }}>
            Encontré 3 lotes activos que encajan 👇
          </div>
          {/* Result card */}
          <div style={{
            alignSelf: 'flex-start', background: P.white, color: '#1A1140',
            padding: '5px 7px', borderRadius: 6, maxWidth: '92%',
            fontSize: 7.5, lineHeight: 1.2,
          }}>
            <strong style={{ fontSize: 8, color: P.coral }}>CAT 320 · 2021</strong><br/>
            USD 89,500 · Cierra hoy
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// VN2 — Pop-art / comic
// Energía visual, gran personalidad
// =====================================================
function VN2PopArt() {
  return (
    <div style={{
      width: 600, height: 240, background: '#FFE8B8',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: '#1A1140', position: 'relative', overflow: 'hidden',
      display: 'flex',
    }}>
      {/* Halftone dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: `radial-gradient(${P.coral} 1.5px, transparent 1.5px)`,
        backgroundSize: '12px 12px', pointerEvents: 'none',
      }} />
      {/* Diagonal coral burst */}
      <div style={{
        position: 'absolute', right: -100, top: -100, width: 400, height: 400,
        background: `conic-gradient(from 200deg, transparent 0deg, ${P.coral} 30deg, transparent 60deg, ${P.coral} 90deg, transparent 120deg, ${P.coral} 150deg, transparent 180deg, ${P.coral} 210deg, transparent 240deg, ${P.coral} 270deg, transparent 300deg, ${P.coral} 330deg, transparent 360deg)`,
        opacity: 0.18, borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* LEFT — MAX */}
      <div style={{
        width: 180, position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: 4,
      }}>
        <MaxFront height={210} />
      </div>

      {/* RIGHT — comic bubble + CTA */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 1,
        padding: '18px 24px 18px 0',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
      }}>
        {/* Speech bubble */}
        <div style={{
          background: P.white, color: '#1A1140',
          padding: '14px 18px', borderRadius: 16,
          border: '3px solid #1A1140',
          boxShadow: '5px 5px 0 #1A1140',
          position: 'relative',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: 1.5,
            color: P.coral, textTransform: 'uppercase', marginBottom: 2,
          }}>
            ¡Psst!
          </div>
          <div style={{
            fontSize: 22, fontWeight: 900, letterSpacing: -0.6,
            lineHeight: 1, fontStyle: 'italic',
          }}>
            ¿Buscas un activo industrial?
          </div>
          <div style={{
            fontSize: 13, fontWeight: 700, marginTop: 4,
            color: '#1A1140',
          }}>
            Yo te lo encuentro en segundos. <span style={{ color: P.coral }}>De verdad.</span>
          </div>
          {/* Bubble tail pointing to MAX */}
          <div style={{
            position: 'absolute', left: -16, top: 30,
            width: 0, height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '16px solid #1A1140',
          }} />
          <div style={{
            position: 'absolute', left: -11, top: 32,
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '12px solid #FFFFFF',
          }} />
        </div>
        <button style={{
          alignSelf: 'flex-start',
          background: '#1A1140', color: P.white, border: 'none',
          padding: '10px 18px', borderRadius: 999, fontWeight: 800,
          fontSize: 12.5, cursor: 'pointer', fontFamily: FONT,
          boxShadow: `4px 4px 0 ${P.coral}`,
          letterSpacing: 0.3,
        }}>
          PONERME A PRUEBA →
        </button>
      </div>
    </div>
  );
}

// =====================================================
// VN3 — Live activity feed
// Social proof a través de especificidad
// =====================================================
function VN3Activity() {
  const feed = [
    { t: 'hace 2 min', who: 'AUNOR', what: 'Excavadora CAT 320 · 2021', tag: 'Match' },
    { t: 'hace 8 min', who: 'TRANSLOG', what: 'Volvo FH16 · USD 65k', tag: 'Match' },
    { t: 'hace 14 min', who: 'CONSTRUEX', what: 'Lote 8 forklifts', tag: 'Match' },
  ];
  return (
    <div style={{
      width: 600, height: 240, background: '#00005E',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '230px 1fr',
    }}>
      {/* LEFT — hero */}
      <div style={{
        padding: '22px 18px 22px 26px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0A0A6E 0%, #00005E 100%)',
      }}>
        <div>
          <div style={{
            fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5,
            color: '#7EE2A8', textTransform: 'uppercase', marginBottom: 6,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#7EE2A8',
              boxShadow: '0 0 10px #7EE2A8',
              animation: 'maxpulse 1.5s ease-in-out infinite',
            }} />
            Activo ahora
          </div>
          <h2 style={{
            fontSize: 23, fontWeight: 800, margin: 0,
            lineHeight: 1.05, letterSpacing: -0.5,
          }}>
            MAX está<br/>
            <span style={{ color: P.coral }}>trabajando.</span>
          </h2>
          <p style={{
            fontSize: 11, lineHeight: 1.4, marginTop: 6,
            color: 'rgba(255,255,255,0.7)',
          }}>
            Mira los matches que está cerrando ahora mismo en VMC Subastas.
          </p>
        </div>
        <button style={{
          alignSelf: 'flex-start',
          background: P.coral, color: P.white, border: 'none',
          padding: '9px 16px', borderRadius: 999, fontWeight: 700,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.4)',
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          <MaxFront height={20} />
          Unirme al chat →
        </button>
      </div>

      {/* RIGHT — feed */}
      <div style={{
        padding: '16px 18px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', gap: 6,
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
          marginBottom: 2, fontFamily: 'ui-monospace, monospace',
        }}>
          Últimos matches
        </div>
        {feed.map((row, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '8px 10px',
          }}>
            <div style={{
              fontSize: 8.5, color: 'rgba(255,255,255,0.55)',
              fontFamily: 'ui-monospace, monospace', width: 60, flexShrink: 0,
            }}>{row.t}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.15 }}>{row.what}</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.55)' }}>para {row.who}</div>
            </div>
            <div style={{
              fontSize: 9, fontWeight: 700, color: '#7EE2A8',
              background: 'rgba(126,226,168,0.15)',
              padding: '2px 7px', borderRadius: 999,
              letterSpacing: 0.5,
            }}>✓ {row.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { VN1Phone, VN2PopArt, VN3Activity });

Object.assign(window, {
  V1Refined, V2ChatBubble, V3Prompts, V4Typographic, V5Composer, V6Split,
  VP1Royal, VP1bAlt, VP1cChat, VP1dChips, VP1eFlow, VP2NavyBold, VP3TwoTone,
  VN1Phone, VN2PopArt, VN3Activity,
  VN4Editorial, VN5Card, VN6Search,
  NewsletterContext,
});

// =====================================================
// VN4 — Editorial / newspaper
// Serif headline, drop cap, column rules, lead-story feel
// =====================================================
function VN4Editorial() {
  return (
    <div style={{
      width: 600, height: 240, background: '#F5EFE6',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: '#1A1140', position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1fr 180px',
    }}>
      {/* Faux newsprint texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none',
        backgroundImage: `radial-gradient(rgba(26,17,64,0.05) 0.5px, transparent 0.5px)`,
        backgroundSize: '4px 4px',
      }} />

      {/* LEFT — editorial copy */}
      <div style={{
        padding: '20px 18px 18px 26px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        borderRight: '1px solid rgba(26,17,64,0.18)',
      }}>
        {/* Masthead */}
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 3,
          color: P.coral, textTransform: 'uppercase',
          paddingBottom: 6, marginBottom: 8,
          borderBottom: '2px solid #1A1140',
          fontFamily: 'Space Mono, ui-monospace, monospace',
        }}>
          Vol. 01 — Subastas · MAYO 2026 · Núm. 14
        </div>

        <div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 27, fontWeight: 900, margin: 0,
            lineHeight: 0.98, letterSpacing: -0.6, color: '#1A1140',
          }}>
            El concierge que rastrea las subastas <em style={{ color: P.coral, fontStyle: 'italic' }}>por ti</em>.
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <p style={{
            flex: 1, fontSize: 11, lineHeight: 1.45, margin: 0,
            color: 'rgba(26,17,64,0.78)',
            fontFamily: '"Playfair Display", serif',
          }}>
            <span style={{
              float: 'left', fontSize: 28, lineHeight: 0.85, fontWeight: 900,
              marginRight: 4, color: P.coral, fontFamily: '"Playfair Display", serif',
            }}>M</span>
            AX entiende lo que buscas — marca, capacidad, año — y te trae los lotes activos que realmente encajan, en segundos.
          </p>
          <button style={{
            background: '#1A1140', color: P.white, border: 'none',
            padding: '9px 14px', borderRadius: 0, fontWeight: 700,
            fontSize: 11, cursor: 'pointer', fontFamily: FONT,
            letterSpacing: 1, textTransform: 'uppercase',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            Leer más →
          </button>
        </div>
      </div>

      {/* RIGHT — feature photo */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        padding: '14px 14px 0',
        background: '#EBE3D5',
      }}>
        <div style={{
          fontSize: 8, letterSpacing: 1.5, color: 'rgba(26,17,64,0.55)',
          textTransform: 'uppercase', alignSelf: 'flex-start',
          fontFamily: 'Space Mono, monospace', marginBottom: 4,
        }}>
          Fig. 1 — MAX
        </div>
        <MaxFront height={172} />
      </div>
    </div>
  );
}

// =====================================================
// VN5 — Trading / hero stat card
// MAX como personaje coleccionable con stats
// =====================================================
function VN5Card() {
  const stats = [
    { k: 'Velocidad', v: '~3s', s: 'respuesta' },
    { k: 'Inventario', v: '1,247', s: 'lotes activos' },
    { k: 'Categorías', v: '14', s: 'tipos de equipo' },
  ];
  return (
    <div style={{
      width: 600, height: 240, background: '#0E0E3E',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '200px 1fr',
      padding: 12,
    }}>
      {/* Card panel for MAX */}
      <div style={{
        background: 'linear-gradient(160deg, #F5C28B 0%, #F57854 50%, #C24A2A 100%)',
        borderRadius: 10, padding: 8, position: 'relative',
        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.4), 0 6px 20px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Top labels */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 8, fontWeight: 800, color: '#1A1140',
          letterSpacing: 1, textTransform: 'uppercase',
          fontFamily: 'Space Mono, monospace',
        }}>
          <span>★ MAX</span>
          <span>nº 001</span>
        </div>
        {/* Character window */}
        <div style={{
          flex: 1, background: '#FFE8B8', margin: '6px 0', borderRadius: 6,
          border: '2px solid rgba(26,17,64,0.4)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.5,
            backgroundImage: `radial-gradient(${P.coral} 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }} />
          <MaxFront height={140} />
        </div>
        {/* Card footer */}
        <div style={{
          fontSize: 8, fontWeight: 700, color: '#1A1140',
          textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase',
          fontFamily: 'Space Mono, monospace',
        }}>
          ◆ Legendario · Concierge IA ◆
        </div>
      </div>

      {/* RIGHT — info panel */}
      <div style={{
        padding: '4px 4px 4px 18px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 2,
            color: '#C9B6FF', textTransform: 'uppercase', marginBottom: 4,
            fontFamily: 'Space Mono, monospace',
          }}>
            Habilidad principal
          </div>
          <h2 style={{
            fontSize: 24, fontWeight: 900, margin: 0,
            lineHeight: 1, letterSpacing: -0.6,
          }}>
            Encuentra el lote<br/>
            <span style={{ color: P.coral }}>que tú no sabías</span> que existía.
          </h2>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 6, padding: '6px 8px',
            }}>
              <div style={{
                fontSize: 8, fontWeight: 700, color: '#C9B6FF',
                letterSpacing: 1, textTransform: 'uppercase',
                fontFamily: 'Space Mono, monospace',
              }}>{s.k}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: P.coral, lineHeight: 1, marginTop: 2 }}>
                {s.v}
              </div>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{s.s}</div>
            </div>
          ))}
        </div>

        <button style={{
          alignSelf: 'flex-start',
          background: P.coral, color: P.white, border: 'none',
          padding: '9px 16px', borderRadius: 6, fontWeight: 800,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.4)',
          letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          ▶ Probar habilidad
        </button>
      </div>
    </div>
  );
}

// =====================================================
// VN6 — Search hero
// Input dominante, MAX como avatar dentro del campo
// =====================================================
function VN6Search() {
  const suggestions = ['Excavadora 20 ton', 'Volvo FH 2020+', 'Lote 8 forklifts', 'Caterpillar 320'];
  return (
    <div style={{
      width: 600, height: 240, background: '#1A1140',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      padding: '24px 32px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
    }}>
      {/* Bg gradient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 80% 0%, rgba(245,120,84,0.18) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(201,182,255,0.15) 0%, transparent 50%)',
      }} />

      {/* Eyebrow */}
      <div style={{
        position: 'relative', zIndex: 1,
        fontSize: 10.5, fontWeight: 700, letterSpacing: 2,
        color: '#C9B6FF', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.coral }} />
        Pregúntale a MAX
      </div>

      {/* Giant search input */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: P.white, borderRadius: 14,
        padding: '8px 8px 8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
      }}>
        {/* MAX mini avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          backgroundImage: `url('assets/max-front.png')`,
          backgroundSize: '160%', backgroundPosition: '50% 14%',
          backgroundColor: '#FFE8B8', flexShrink: 0,
          border: `2px solid ${P.coral}`,
        }} />
        <div style={{
          flex: 1, fontSize: 16, color: 'rgba(26,17,64,0.45)',
          fontFamily: FONT, fontWeight: 500,
        }}>
          ¿Qué máquina, camión o lote buscas hoy?
        </div>
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '12px 20px', borderRadius: 10, fontWeight: 800,
          fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          letterSpacing: 0.3, display: 'inline-flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap',
        }}>
          Buscar
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>

      {/* Suggestions */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      }}>
        <span style={{
          fontSize: 10, color: 'rgba(255,255,255,0.5)',
          fontFamily: 'Space Mono, monospace', letterSpacing: 1, textTransform: 'uppercase',
        }}>
          Sugerencias:
        </span>
        {suggestions.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.88)',
            padding: '4px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 500, cursor: 'pointer',
          }}>{s}</div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { VN4Editorial, VN5Card, VN6Search });

// Pulse keyframes for VN3
if (typeof document !== 'undefined' && !document.getElementById('max-pulse-kf')) {
  const s = document.createElement('style');
  s.id = 'max-pulse-kf';
  s.textContent = '@keyframes maxpulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }';
  document.head.appendChild(s);
}
