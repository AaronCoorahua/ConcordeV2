"use client";

import { useEffect } from "react";

/**
 * Marca <html data-visor> cuando la pantalla se ve dentro del visor de Concorde (iframe). Con esa marca, los controles
 * del lab (Modal de propuesta, Ubicación del aviso, Revisión SubasChat) se ven más chicos y plegados para no tapar la
 * pantalla; en «Abrir a pantalla completa» quedan como en el lab.
 */
export default function VisorFlag(): null {
  useEffect(() => {
    if (window.self === window.top) return;
    const html = document.documentElement;
    html.setAttribute("data-visor", "");
    return () => html.removeAttribute("data-visor");
  }, []);
  return null;
}
