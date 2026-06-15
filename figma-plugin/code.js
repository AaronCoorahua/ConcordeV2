// Concorde Exporter — plugin de Figma (sandbox principal)
// Serializa el/los nodo(s) seleccionados con TODO lo que Concorde necesita:
// tamaños reales, auto-layout (padding/gap), fills (gradientes con stops),
// strokes, radius, efectos, tipografía exacta y el SVG REAL de los íconos.
// No usa la REST API → no gasta cuota del plan.

figma.showUI(__html__, { width: 420, height: 560 });

const ICONISH = /icon|ic[-_ ]|chevron|arrow|user|heart|clock|pills|avatar/i;

function safe(fn, fallback) {
  try {
    const v = fn();
    return v === figma.mixed ? "mixed" : v;
  } catch (e) {
    return fallback;
  }
}

function clonePaints(paints) {
  if (!paints || paints === figma.mixed) return paints === figma.mixed ? "mixed" : null;
  return paints.map(function (p) {
    const out = { type: p.type, visible: p.visible !== false, opacity: p.opacity };
    if (p.type === "SOLID") out.color = { r: p.color.r, g: p.color.g, b: p.color.b };
    if (p.type.indexOf("GRADIENT") === 0) {
      out.gradientStops = (p.gradientStops || []).map(function (s) {
        return { position: s.position, color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a } };
      });
      out.gradientTransform = p.gradientTransform;
    }
    if (p.type === "IMAGE") out.scaleMode = p.scaleMode;
    return out;
  });
}

function cloneEffects(effects) {
  if (!effects || effects === figma.mixed) return null;
  return effects.map(function (e) {
    return {
      type: e.type,
      visible: e.visible !== false,
      radius: e.radius,
      color: e.color ? { r: e.color.r, g: e.color.g, b: e.color.b, a: e.color.a } : undefined,
      offset: e.offset,
      spread: e.spread,
    };
  });
}

function isIconish(node) {
  if (ICONISH.test(node.name)) return true;
  if (node.type === "VECTOR" || node.type === "BOOLEAN_OPERATION" || node.type === "STAR" || node.type === "POLYGON") return true;
  return false;
}

async function serialize(node, depth) {
  const o = {
    id: node.id,
    name: node.name,
    type: node.type,
    width: Math.round(node.width * 100) / 100,
    height: Math.round(node.height * 100) / 100,
    x: Math.round(node.x * 100) / 100,
    y: Math.round(node.y * 100) / 100,
    opacity: safe(function () { return node.opacity; }),
    visible: node.visible !== false,
  };

  // Geometría / borde
  o.cornerRadius = safe(function () { return node.cornerRadius; });
  o.rectangleCornerRadii = safe(function () {
    return [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius];
  });
  o.strokeWeight = safe(function () { return node.strokeWeight; });
  o.strokeAlign = safe(function () { return node.strokeAlign; });
  o.strokes = clonePaints(safe(function () { return node.strokes; }));
  o.fills = clonePaints(safe(function () { return node.fills; }));
  o.effects = cloneEffects(safe(function () { return node.effects; }));

  // Auto-layout (lo que Concorde traduce a CSS)
  if ("layoutMode" in node) {
    o.layout = {
      mode: node.layoutMode,
      paddingLeft: node.paddingLeft,
      paddingRight: node.paddingRight,
      paddingTop: node.paddingTop,
      paddingBottom: node.paddingBottom,
      gap: node.itemSpacing,
      primaryAlign: node.primaryAxisAlignItems,
      counterAlign: node.counterAxisAlignItems,
      sizingH: safe(function () { return node.layoutSizingHorizontal; }),
      sizingV: safe(function () { return node.layoutSizingVertical; }),
    };
  }

  // Tipografía exacta
  if (node.type === "TEXT") {
    o.text = {
      characters: node.characters,
      fontSize: safe(function () { return node.fontSize; }),
      fontName: safe(function () { return node.fontName; }), // { family, style }
      fontWeight: safe(function () { return node.fontWeight; }),
      lineHeight: safe(function () { return node.lineHeight; }),
      letterSpacing: safe(function () { return node.letterSpacing; }),
      textCase: safe(function () { return node.textCase; }),
      textDecoration: safe(function () { return node.textDecoration; }),
    };
  }

  // Variantes de component sets
  if (node.type === "COMPONENT") o.variantProperties = safe(function () { return node.variantProperties; });
  if (node.type === "INSTANCE") {
    o.mainComponentName = safe(function () { return node.mainComponent && node.mainComponent.name; });
    o.componentProperties = safe(function () { return node.componentProperties; });
  }

  // SVG REAL de íconos (exacto, no aproximado)
  if (isIconish(node) && node.width <= 80 && node.height <= 80) {
    try {
      o.svg = await node.exportAsync({ format: "SVG_STRING" });
    } catch (e) {
      o.svgError = String(e);
    }
  }

  // Hijos (recursivo, con tope sano)
  if ("children" in node && depth < 12) {
    o.children = [];
    for (const child of node.children) {
      o.children.push(await serialize(child, depth + 1));
    }
  }

  return o;
}

function u8ToBase64(bytes) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : NaN;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : NaN;
    out += chars[b0 >> 2];
    out += chars[((b0 & 3) << 4) | (isNaN(b1) ? 0 : b1 >> 4)];
    out += isNaN(b1) ? "=" : chars[((b1 & 15) << 2) | (isNaN(b2) ? 0 : b2 >> 6)];
    out += isNaN(b2) ? "=" : chars[b2 & 63];
  }
  return out;
}

async function run() {
  const sel = figma.currentPage.selection;
  if (!sel.length) {
    figma.ui.postMessage({ type: "error", message: "Selecciona el componente (o varios estados) y vuelve a correr el plugin." });
    return;
  }

  figma.ui.postMessage({ type: "progress", message: "Serializando " + sel.length + " nodo(s)…" });

  const nodes = [];
  for (const node of sel) {
    const data = await serialize(node, 0);
    // PNG 2x de referencia visual (para comparación lado-a-lado en Concorde)
    try {
      const png = await node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
      data.previewPng = "data:image/png;base64," + u8ToBase64(png);
    } catch (e) {
      /* preview es opcional */
    }
    nodes.push(data);
  }

  const payload = {
    version: "1",
    source: "concorde-exporter-plugin",
    file: figma.root.name,
    page: figma.currentPage.name,
    exportedAt: new Date().toISOString(),
    nodes: nodes,
  };

  figma.ui.postMessage({ type: "result", payload: payload });
}

figma.ui.onmessage = function (msg) {
  if (msg.type === "rerun") run();
  if (msg.type === "notify") figma.notify(msg.message);
  if (msg.type === "close") figma.closePlugin();
};

run();
