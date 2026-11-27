/**
 * tableroEstilos.ts — CSS del tablero /tablero (prefijo `tb-`), en un módulo plano.
 * Lo inyecta Tablero.tsx una sola vez; Ficha.tsx usa las mismas clases.
 */

export const ESTILOS = `
  .tb-top { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 24px; margin-bottom: 24px; }
  .tb-h1 { font-size: clamp(28px, 4vw, 36px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin: 0; }
  .tb-sub { font-size: 15px; color: var(--ui-body); line-height: 1.6; margin: 8px 0 0; max-width: 720px; }
  .tb-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }

  /* Controles compartidos */
  .tb-seg { display: inline-flex; flex-wrap: wrap; gap: 2px; padding: 3px; border-radius: 10px; background: var(--ui-border-soft); }
  .tb-seg button { display: inline-flex; align-items: center; gap: 6px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-body); background: transparent; border: 0; border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: background 0.12s, color 0.12s; }
  .tb-seg button:hover:not(:disabled) { color: var(--ui-ink); }
  .tb-seg button[aria-pressed="true"] { background: #fff; color: var(--ui-ink); box-shadow: 0 1px 2px rgba(15,23,42,0.14); }
  .tb-seg button:disabled { cursor: default; opacity: 0.6; }
  .tb-seg i { width: 8px; height: 8px; border-radius: 50%; background: var(--tb-tone); }
  .tb-btn { display: inline-flex; align-items: center; gap: 6px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-body); background: #fff; border: 1px solid var(--ui-border); border-radius: 8px; padding: 6px 12px; cursor: pointer; white-space: nowrap; transition: border-color 0.12s, color 0.12s, background 0.12s; }
  .tb-btn:hover:not(:disabled) { border-color: var(--ui-border-hover); color: var(--ui-ink); }
  .tb-btn:disabled { cursor: default; opacity: 0.6; }
  .tb-btn--primary { color: #fff; background: var(--ui-accent); border-color: var(--ui-accent); }
  .tb-btn--primary:hover:not(:disabled) { color: #fff; background: #4022b8; border-color: #4022b8; }
  .tb-btn--danger:hover:not(:disabled) { color: #b91c1c; border-color: #fecaca; background: #fef2f2; }
  .tb-icon { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0; color: var(--ui-muted); background: transparent; border: 0; border-radius: 8px; cursor: pointer; transition: background 0.12s, color 0.12s; }
  .tb-icon:hover { color: var(--ui-ink); background: var(--ui-border-soft); }
  .tb-input { font: inherit; font-size: 14px; color: var(--ui-ink); background: #fff; border: 1px solid var(--ui-border); border-radius: 8px; padding: 8px 12px; min-width: 0; }
  .tb-input::placeholder { color: var(--ui-muted); }
  .tb-input:hover { border-color: var(--ui-border-hover); }
  .tb-seg button:focus-visible, .tb-btn:focus-visible, .tb-icon:focus-visible, .tb-input:focus-visible, .tb-card__title:focus-visible, .tb-peso:focus-visible, .tb-tomar:focus-visible, .tb-row:focus-visible, .tb-pase__name:focus-visible, .tb-fold > summary:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
  .tb-avatar { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; flex-shrink: 0; border-radius: 50%; font-size: 10px; font-weight: 800; letter-spacing: 0.02em; color: var(--ui-accent-vmc); background: var(--ui-accent-soft); box-shadow: 0 0 0 2px #fff; }
  .tb-yo .tb-avatar { box-shadow: none; margin: -2px 0 -2px -4px; }

  .tb-note { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; font-size: 13px; line-height: 1.5; border-radius: 10px; padding: 10px 14px; margin: 0 0 16px; }
  .tb-note--info { color: #92400e; background: #fffbeb; border: 1px solid #fde68a; }
  .tb-note--error { color: #991b1b; background: #fef2f2; border: 1px solid #fecaca; }

  /* Cómo funciona: tres pasos numerados, se oculta con "Entendido" */
  .tb-ayuda { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; background: #fff; border: 1px solid var(--ui-border); border-radius: 16px; padding: 16px 20px; margin: 0 0 32px; }
  .tb-pasos { flex: 1 1 560px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px 24px; margin: 0; padding: 0; list-style: none; counter-reset: paso; }
  @media (max-width: 760px) { .tb-pasos { grid-template-columns: minmax(0, 1fr); } }
  .tb-pasos li { position: relative; padding-left: 36px; font-size: 13px; line-height: 1.5; color: var(--ui-body); counter-increment: paso; }
  .tb-pasos li::before { content: counter(paso); position: absolute; left: 0; top: 0; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; font-size: 12px; font-weight: 800; color: var(--ui-accent); background: var(--ui-accent-soft); }
  .tb-pasos strong { display: block; font-size: 14px; font-weight: 800; color: var(--ui-ink); }

  /* Las dos partes de la página: Pedidos y Pases */
  .tb-parte { display: flex; flex-direction: column; gap: 16px; margin-bottom: 48px; min-width: 0; }
  .tb-sec { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 8px 24px; }
  .tb-h2 { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin: 0; }
  .tb-sec__sub { font-size: 14px; color: var(--ui-body); line-height: 1.5; margin: 4px 0 0; max-width: 720px; }

  /* Pedidos: tres columnas por tipo */
  .tb-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
  @media (max-width: 900px) { .tb-cols { grid-template-columns: minmax(0, 1fr); } }
  .tb-col { display: flex; flex-direction: column; gap: 8px; background: var(--ui-border-soft); border-radius: 16px; padding: 16px 12px 12px; min-width: 0; transition: background 0.15s, box-shadow 0.15s; }
  .tb-col[data-over="true"] { background: var(--ui-accent-soft); box-shadow: inset 0 0 0 2px var(--ui-accent); }
  .tb-col__head { display: flex; align-items: baseline; gap: 8px; padding: 0 4px; }
  .tb-col__name { font-size: 16px; font-weight: 800; letter-spacing: -0.01em; margin: 0; }
  .tb-col__count { font-size: 13px; font-weight: 700; color: var(--ui-body); }
  .tb-col__hint { font-size: 13px; color: var(--ui-body); line-height: 1.45; margin: 0 4px 4px; }
  .tb-col__pie { font-size: 12px; color: var(--ui-body); line-height: 1.5; margin: 0; padding: 10px 12px; border: 1.5px dashed var(--ui-border-hover); border-radius: 10px; }
  .tb-col__pie code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; font-weight: 700; color: var(--ui-ink); background: #fff; padding: 1px 5px; border-radius: 4px; }
  .tb-col__pie a { color: var(--ui-accent); font-weight: 700; text-decoration: none; }
  .tb-col__pie a:hover { text-decoration: underline; }
  .tb-more { align-self: flex-start; font: inherit; font-size: 13px; font-weight: 700; color: var(--ui-accent); background: transparent; border: 0; border-radius: 6px; padding: 4px 8px; cursor: pointer; }
  .tb-more:hover { background: #fff; }
  .tb-more:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
  /* Pase: la bolsita */
  .tb-pase { background: #fff; border: 1px solid var(--ui-border); border-radius: 16px; padding: 20px; transition: border-color 0.15s, box-shadow 0.15s; }
  .tb-pase[data-over="true"] { border-color: var(--ui-accent); box-shadow: 0 0 0 3px var(--ui-accent-soft); }
  .tb-pase__head { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px 16px; }
  .tb-pase__id { flex: 1 1 240px; min-width: 0; }
  .tb-pase__name { display: block; width: 100%; font: inherit; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: var(--ui-ink); background: transparent; border: 0; border-radius: 6px; padding: 2px 6px; margin: -2px -6px; text-overflow: ellipsis; }
  .tb-pase__name:hover { background: var(--ui-border-soft); }
  .tb-pase__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; margin-top: 4px; font-size: 13px; color: var(--ui-body); }
  .tb-fecha { position: relative; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--ui-ink); border-radius: 6px; padding: 2px 6px; margin-left: -6px; }
  .tb-fecha:hover { background: var(--ui-border-soft); }
  .tb-fecha:focus-within { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
  .tb-fecha[data-vacia="true"] { color: var(--ui-accent); }
  .tb-fecha input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; border: 0; padding: 0; }
  .tb-rel[data-tarde="true"] { color: #b91c1c; font-weight: 600; }
  .tb-chip-listo { font-size: 11px; font-weight: 700; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 20px; }
  .tb-pase__side { display: flex; align-items: center; gap: 8px; margin-left: auto; }

  /* Barra del pase: un tramo por estado, ancho = peso en ese estado. Debajo, los mismos
     colores con su número: es la leyenda y la cuenta a la vez. */
  .tb-bar { display: flex; gap: 2px; height: 12px; margin: 16px 0 8px; border-radius: 6px; overflow: hidden; background: var(--ui-border-soft); }
  .tb-bar i { min-width: 6px; background: var(--tb-tone); transition: flex-grow 0.25s; }
  .tb-reparto { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 16px; margin: 0 0 16px; padding: 0; list-style: none; font-size: 13px; color: var(--ui-body); }
  .tb-reparto li { display: inline-flex; align-items: center; gap: 6px; }
  .tb-reparto strong { color: var(--ui-ink); font-weight: 800; }
  .tb-reparto i { width: 10px; height: 10px; border-radius: 3px; background: var(--tb-tone); }
  .tb-reparto li[data-cero="true"] { color: var(--ui-muted); }
  .tb-tray { display: grid; grid-template-columns: repeat(auto-fill, minmax(216px, 1fr)); gap: 8px; padding: 8px; border-radius: 12px; background: var(--ui-subtle); min-height: 64px; }

  .tb-empty { grid-column: 1 / -1; border: 1.5px dashed var(--ui-border-hover); border-radius: 10px; padding: 16px 12px; text-align: center; font-size: 12.5px; color: var(--ui-muted); }
  [data-over="true"] .tb-empty { border-color: var(--ui-accent); color: var(--ui-accent); }
  .tb-add { font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-body); background: transparent; border: 1.5px dashed var(--ui-border-hover); border-radius: 16px; padding: 14px; cursor: pointer; transition: border-color 0.12s, color 0.12s, background 0.12s; }
  .tb-add:hover:not(:disabled) { color: var(--ui-accent); border-color: var(--ui-accent); background: #fff; }
  .tb-add:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
  .tb-add--col { font-size: 13px; font-weight: 700; color: var(--ui-accent); border-radius: 10px; padding: 10px; text-align: center; }
  .tb-add--col:hover:not(:disabled) { background: #fff; }

  /* Tarjeta */
  /* El borde de arriba es el color del estado, el mismo de la barra del pase. */
  .tb-card { position: relative; display: flex; flex-direction: column; gap: 8px; background: #fff; border: 1px solid var(--ui-border); border-top: 3px solid var(--tb-tone, var(--ui-border)); border-radius: 10px; padding: 8px 12px 10px; box-shadow: 0 1px 2px rgba(15,23,42,0.04); cursor: pointer; user-select: none; transition: border-color 0.12s, opacity 0.15s; }
  .tb-card[data-draggable="true"] { cursor: grab; }
  .tb-card:hover { border-color: var(--ui-border-hover); border-top-color: var(--tb-tone, var(--ui-border-hover)); }
  .tb-card[data-dragging="true"] { z-index: 30; cursor: grabbing; border-color: var(--ui-accent); border-top-color: var(--tb-tone, var(--ui-accent)); }
  /* Mientras se arrastra otra tarjeta: una raya morada marca dónde caería. */
  [data-flow="grid"] > .tb-card[data-hueco="antes"]::before, [data-flow="grid"] > .tb-card[data-hueco="despues"]::before { content: ""; position: absolute; top: -3px; bottom: -1px; width: 3px; border-radius: 2px; background: var(--ui-accent); }
  [data-flow="grid"] > .tb-card[data-hueco="antes"]::before { left: -6px; }
  [data-flow="grid"] > .tb-card[data-hueco="despues"]::before { right: -6px; }
  [data-flow="list"] > .tb-card[data-hueco="antes"]::before, [data-flow="list"] > .tb-card[data-hueco="despues"]::before { content: ""; position: absolute; left: -1px; right: -1px; height: 3px; border-radius: 2px; background: var(--ui-accent); }
  [data-flow="list"] > .tb-card[data-hueco="antes"]::before { top: -8px; }
  [data-flow="list"] > .tb-card[data-hueco="despues"]::before { bottom: -6px; }
  .tb-card__top { display: flex; align-items: center; gap: 6px; min-height: 22px; }
  .tb-area { font-size: 11px; font-weight: 700; color: var(--ui-accent); background: var(--ui-accent-soft); padding: 2px 8px; border-radius: 20px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tb-tipo { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tb-tipo[data-tipo="polish"] { color: var(--ui-accent); background: var(--ui-accent-soft); }
  .tb-tipo[data-tipo="quick"] { color: #0f766e; background: #e3f6f3; }
  .tb-tipo[data-tipo="forward"] { color: #475569; background: var(--ui-border-soft); }
  .tb-card__title { display: block; font: inherit; font-size: 13.5px; font-weight: 600; line-height: 1.4; text-align: left; color: var(--ui-ink); background: transparent; border: 0; border-radius: 4px; padding: 0; cursor: inherit; }
  .tb-card:hover .tb-card__title { color: var(--ui-accent); }
  .tb-card[data-status="corregido"] .tb-card__title { color: var(--ui-body); font-weight: 500; }
  .tb-card__foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 24px; }
  .tb-estado { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--ui-body); min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tb-estado i { flex-shrink: 0; width: 8px; height: 8px; border-radius: 50%; background: var(--tb-tone); }
  .tb-tomar { flex-shrink: 0; font: inherit; font-size: 12px; font-weight: 700; color: var(--ui-accent); background: transparent; border: 1px solid var(--ui-border); border-radius: 6px; padding: 2px 8px; white-space: nowrap; cursor: pointer; transition: background 0.12s, border-color 0.12s; }
  .tb-tomar:hover { background: var(--ui-accent-soft); border-color: var(--ui-accent); }

  /* Peso: tres barritas, como la señal del celular */
  .tb-pesobox { margin-left: auto; display: inline-flex; align-items: center; gap: 2px; flex-shrink: 0; }
  .tb-peso { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; font: inherit; font-size: 12px; font-weight: 700; color: var(--ui-ink); background: transparent; border: 1px solid transparent; border-radius: 6px; padding: 2px 6px; margin-right: -6px; cursor: pointer; transition: background 0.12s, border-color 0.12s; }
  .tb-peso:hover { background: var(--ui-border-soft); }
  .tb-peso[data-vacio="true"] { font-weight: 600; color: var(--ui-muted); border: 1px dashed var(--ui-border-hover); margin-right: 0; }
  .tb-peso[data-vacio="true"]:hover { color: var(--ui-accent); border-color: var(--ui-accent); background: transparent; }
  .tb-bars { display: inline-flex; align-items: flex-end; gap: 2px; height: 11px; }
  .tb-bars i { width: 3px; border-radius: 1px; background: var(--ui-border); }
  .tb-bars i:nth-child(1) { height: 5px; }
  .tb-bars i:nth-child(2) { height: 8px; }
  .tb-bars i:nth-child(3) { height: 11px; }
  .tb-bars i[data-on="true"] { background: var(--ui-ink); }
  .tb-pesar { display: inline-flex; gap: 2px; padding: 2px; border-radius: 8px; background: var(--ui-border-soft); }
  .tb-pesar button { font: inherit; font-size: 12px; font-weight: 800; min-width: 24px; height: 22px; color: var(--ui-body); background: transparent; border: 0; border-radius: 6px; cursor: pointer; }
  .tb-pesar button:hover, .tb-pesar button:focus-visible { background: #fff; color: var(--ui-ink); outline: none; box-shadow: 0 1px 2px rgba(15,23,42,0.14); }
  .tb-pesar button[aria-pressed="true"] { background: var(--ui-ink); color: #fff; }

  /* Agregar una tarjeta dentro de su columna */
  .tb-nueva { display: flex; flex-direction: column; gap: 8px; background: #fff; border: 1px solid var(--ui-accent); border-radius: 10px; padding: 8px; }
  .tb-nueva__row { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
  .tb-list { display: flex; flex-direction: column; gap: 8px; }

  /* Plegables: pases que ya salieron y tarjetas hechas sin pase */
  .tb-fold { border-radius: 14px; background: transparent; }
  .tb-fold > summary { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--ui-body); cursor: pointer; padding: 6px 8px; border-radius: 8px; list-style: none; }
  .tb-fold > summary::-webkit-details-marker { display: none; }
  .tb-fold > summary::before { content: ""; width: 6px; height: 6px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: rotate(-45deg); transition: transform 0.12s; }
  .tb-fold[open] > summary::before { transform: rotate(45deg); }
  .tb-fold > summary:hover { color: var(--ui-ink); }
  .tb-rows { display: flex; flex-direction: column; margin-top: 8px; background: #fff; border: 1px solid var(--ui-border); border-radius: 12px; overflow: hidden; }
  .tb-row { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; font: inherit; font-size: 13px; text-align: left; color: var(--ui-ink); background: transparent; border: 0; border-top: 1px solid var(--ui-border-soft); padding: 10px 12px; }
  .tb-row:first-child { border-top: 0; }
  button.tb-row { cursor: pointer; }
  button.tb-row:hover { background: var(--ui-subtle); }
  .tb-row__main { flex: 1 1 160px; min-width: 0; font-weight: 600; }
  .tb-row__meta { font-size: 12px; color: var(--ui-body); }

  .tb-skel { height: 168px; border-radius: 16px; background: linear-gradient(90deg, var(--ui-border-soft), #fff, var(--ui-border-soft)); background-size: 200% 100%; animation: tb-shimmer 1.2s linear infinite; }
  @keyframes tb-shimmer { to { background-position: -200% 0; } }

  /* Ficha de una tarjeta y diálogo del nombre */
  .tb-dialog { width: min(520px, calc(100vw - 32px)); max-height: calc(100dvh - 48px); margin: auto; padding: 0; border: 0; border-radius: 16px; overflow: hidden auto; background: #fff; color: var(--ui-ink); box-shadow: 0 24px 64px rgba(15,23,42,0.28); font-family: var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif); }
  .tb-dialog::backdrop { background: rgba(15,23,42,0.5); backdrop-filter: blur(2px); }
  .tb-dialog[open] { animation: tb-dialog-in 0.18s ease-out; }
  @keyframes tb-dialog-in { from { opacity: 0; transform: translateY(12px) scale(0.985); } }
  .tb-dialog__in { display: flex; flex-direction: column; gap: 20px; padding: 24px; }
  .tb-dialog__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .tb-dialog__title { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.3; margin: 8px 0 0; }
  .tb-dialog__titleinput { width: 100%; font-size: 18px; font-weight: 700; margin-top: 8px; }
  .tb-prev { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: var(--ui-subtle); font-size: 13px; }
  .tb-prev img { flex-shrink: 0; width: auto; height: auto; max-width: 144px; max-height: 80px; border-radius: 4px; outline: 1px solid var(--ui-border); background: #fff; }
  .tb-prev a { color: var(--ui-accent); font-weight: 700; text-decoration: none; }
  .tb-prev a:hover { text-decoration: underline; }
  .tb-field { display: flex; flex-direction: column; gap: 8px; }
  .tb-field > .tb-seg { align-self: flex-start; }
  .tb-field__label { font-size: 12px; font-weight: 700; color: var(--ui-body); }
  .tb-field__hint { font-size: 12px; color: var(--ui-muted); margin: 0; }
  .tb-field__row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .tb-field__row .tb-input { flex: 1 1 160px; }
  .tb-dialog__foot { display: flex; justify-content: space-between; gap: 8px; padding-top: 16px; border-top: 1px solid var(--ui-border-soft); }

  @media (prefers-reduced-motion: reduce) {
    .tb-card, .tb-pase, .tb-col, .tb-seg button, .tb-btn, .tb-icon, .tb-tomar, .tb-peso, .tb-add, .tb-bar i, .tb-fold > summary::before { transition: none; }
    .tb-dialog[open], .tb-skel { animation: none; }
  }
`;
