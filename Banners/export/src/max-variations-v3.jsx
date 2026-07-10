// Evolutions of VN3 (activity feed), VN5 (trading card), VN6 (search hero)

// =====================================================
// VN3b — Live counter + searches in progress
// Sensación de "ahora mismo, mientras lees esto"
// =====================================================
function VN3bLive() {
  const live = [
    { q: 'Excavadoras 15-25 ton', who: 'AUNOR', pct: 80 },
    { q: 'Volvo FH 2019+', who: 'TRANSLOG', pct: 45 },
    { q: 'Lote forklifts', who: 'CONSTRUEX', pct: 92 },
  ];
  return (
    <div style={{
      width: 600, height: 240, background: '#00005E',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '230px 1fr',
    }}>
      {/* LEFT — hero counter */}
      <div style={{
        padding: '20px 18px 20px 26px',
        background: 'linear-gradient(135deg, #0A0A6E 0%, #00005E 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative',
      }}>
        <div>
          <div style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: 2,
            color: '#7EE2A8', textTransform: 'uppercase', marginBottom: 4,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Space Mono, monospace',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#7EE2A8',
              boxShadow: '0 0 10px #7EE2A8',
              animation: 'maxpulse 1.5s ease-in-out infinite',
            }} />
            En vivo · hoy
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 56, lineHeight: 0.9, letterSpacing: 1,
            color: P.coral,
          }}>
            1,847
          </div>
          <div style={{
            fontSize: 11.5, color: 'rgba(255,255,255,0.78)',
            fontWeight: 500, marginTop: 2,
          }}>
            matches que MAX ya encontró<br/>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>para compradores como tú.</span>
          </div>
        </div>
        <button style={{
          alignSelf: 'flex-start',
          background: P.coral, color: P.white, border: 'none',
          padding: '9px 14px', borderRadius: 999, fontWeight: 700,
          fontSize: 12, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.4)',
        }}>
          Sumar el mío →
        </button>
      </div>

      {/* RIGHT — searches in progress */}
      <div style={{
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: 6,
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
          fontFamily: 'Space Mono, monospace', marginBottom: 2,
        }}>
          Búsquedas activas ahora
        </div>
        {live.map((row, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '8px 10px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{row.q}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace' }}>{row.who}</div>
            </div>
            <div style={{
              height: 3, background: 'rgba(255,255,255,0.08)',
              borderRadius: 2, marginTop: 5, overflow: 'hidden',
            }}>
              <div style={{
                width: `${row.pct}%`, height: '100%',
                background: row.pct > 80 ? '#7EE2A8' : P.coral,
                borderRadius: 2,
              }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 8.5, color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Space Mono, monospace', marginTop: 3,
            }}>
              <span>Rastreando…</span>
              <span>{row.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// VN5b — Trading card · Habilidades / ability list
// Pokemon-style abilities en lugar de stats puros
// =====================================================
function VN5bAbilities() {
  const abilities = [
    { icon: '◆', name: 'Búsqueda profunda', cost: '3s', desc: 'Escanea todos los lotes activos' },
    { icon: '◇', name: 'Filtro inteligente', cost: '0s', desc: 'Entiende marca, año, capacidad' },
    { icon: '✦', name: 'Match contextual', cost: '24/7', desc: 'Te avisa cuando aparece tu ideal' },
  ];
  return (
    <div style={{
      width: 600, height: 240, background: '#0E0E3E',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '180px 1fr',
      padding: 12, gap: 14,
    }}>
      {/* Card panel */}
      <div style={{
        background: 'linear-gradient(160deg, #C9B6FF 0%, #6B4FD1 50%, #2A1F70 100%)',
        borderRadius: 10, padding: 8, position: 'relative',
        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.4), 0 6px 20px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 8, fontWeight: 800, color: '#1A1140',
          letterSpacing: 1, textTransform: 'uppercase',
          fontFamily: 'Space Mono, monospace',
        }}>
          <span>★★★★ MAX</span>
          <span>HP 999</span>
        </div>
        <div style={{
          flex: 1, background: '#FFE8B8', margin: '6px 0', borderRadius: 6,
          border: '2px solid rgba(26,17,64,0.4)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.4,
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.6), transparent 60%)',
          }} />
          <MaxFront height={120} />
        </div>
        <div style={{
          fontSize: 7.5, fontWeight: 700, color: '#1A1140',
          textAlign: 'center', letterSpacing: 1.2, textTransform: 'uppercase',
          fontFamily: 'Space Mono, monospace',
        }}>
          Tipo: Concierge IA
        </div>
      </div>

      {/* RIGHT — abilities */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '2px 4px 2px 0',
      }}>
        <div>
          <div style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 2,
            color: '#C9B6FF', textTransform: 'uppercase', marginBottom: 4,
            fontFamily: 'Space Mono, monospace',
          }}>
            ▼ Habilidades aprendidas
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {abilities.map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, alignItems: 'center',
              padding: '6px 8px', borderRadius: 5,
              background: 'rgba(255,255,255,0.04)',
              borderLeft: `2px solid ${P.coral}`,
            }}>
              <div style={{
                fontSize: 14, color: P.coral, lineHeight: 1, width: 16, textAlign: 'center',
              }}>{a.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: P.white }}>{a.name}</span>
                  <span style={{
                    fontSize: 9, color: '#7EE2A8',
                    fontFamily: 'Space Mono, monospace', fontWeight: 700,
                    background: 'rgba(126,226,168,0.12)',
                    padding: '1px 6px', borderRadius: 999,
                  }}>{a.cost}</span>
                </div>
                <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.25 }}>
                  {a.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button style={{
          alignSelf: 'flex-start',
          background: P.coral, color: P.white, border: 'none',
          padding: '8px 14px', borderRadius: 6, fontWeight: 800,
          fontSize: 11.5, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 3px 0 rgba(0,0,0,0.4)',
          letterSpacing: 1, textTransform: 'uppercase',
        }}>
          ▶ Usar habilidad
        </button>
      </div>
    </div>
  );
}

// =====================================================
// VN6b — Search hero · con autocompletado y preview
// Mismo input, pero un dropdown sugiere resultados reales
// =====================================================
function VN6bSearchPreview() {
  const previews = [
    { tag: 'EXC', name: 'Caterpillar 320 · 2021', meta: 'USD 89,500 · cierra hoy' },
    { tag: 'CAM', name: 'Volvo FH16 · 2020', meta: 'USD 65,000 · 2 días' },
  ];
  return (
    <div style={{
      width: 600, height: 240, background: '#1A1140',
      borderRadius: 14, boxSizing: 'border-box',
      fontFamily: FONT, color: P.white, position: 'relative', overflow: 'hidden',
      padding: '20px 24px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 90% 0%, rgba(245,120,84,0.18) 0%, transparent 50%)',
      }} />

      {/* Eyebrow */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 2,
          color: '#C9B6FF', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7EE2A8',
            boxShadow: '0 0 6px #7EE2A8' }} />
          MAX está escuchando
        </div>
        <div style={{
          fontSize: 9.5, color: 'rgba(255,255,255,0.5)',
          fontFamily: 'Space Mono, monospace',
        }}>
          ⌘K para abrir
        </div>
      </div>

      {/* Search */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: P.white, borderRadius: 12,
        padding: '6px 6px 6px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          backgroundImage: `url('${window.__resources.maxFront}')`,
          backgroundSize: '160%', backgroundPosition: '50% 14%',
          backgroundColor: '#FFE8B8', flexShrink: 0,
          border: `2px solid ${P.coral}`,
        }} />
        <div style={{
          flex: 1, fontSize: 14, color: '#1A1140',
          fontWeight: 500,
        }}>
          excavadora 20 ton, 2020+<span style={{
            display: 'inline-block', width: 1, height: 16, background: P.coral,
            verticalAlign: 'middle', marginLeft: 2,
            animation: 'maxpulse 1s ease-in-out infinite',
          }} />
        </div>
        <button style={{
          background: P.coral, color: P.white, border: 'none',
          padding: '10px 18px', borderRadius: 8, fontWeight: 800,
          fontSize: 12.5, cursor: 'pointer', fontFamily: FONT,
          letterSpacing: 0.3, whiteSpace: 'nowrap',
        }}>
          Buscar →
        </button>
      </div>

      {/* Preview dropdown */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 10, padding: 8,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
          padding: '2px 6px',
          fontFamily: 'Space Mono, monospace',
        }}>
          ↳ Vista previa · 3 matches
        </div>
        {previews.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '6px 8px', borderRadius: 6,
            background: i === 0 ? 'rgba(245,120,84,0.12)' : 'transparent',
          }}>
            <div style={{
              fontSize: 8.5, fontWeight: 800, color: P.coral,
              background: 'rgba(245,120,84,0.18)',
              padding: '3px 7px', borderRadius: 4,
              fontFamily: 'Space Mono, monospace', letterSpacing: 1,
            }}>{p.tag}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: P.white }}>{p.name}</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.55)' }}>{p.meta}</div>
            </div>
            <div style={{
              fontSize: 9.5, color: 'rgba(255,255,255,0.45)',
              fontFamily: 'Space Mono, monospace',
            }}>↵</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { VN3bLive, VN5bAbilities, VN6bSearchPreview });
