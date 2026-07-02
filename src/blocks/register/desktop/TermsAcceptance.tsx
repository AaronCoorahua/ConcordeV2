"use client";

/**
 * TermsAcceptance — Bloque de Concorde (Voyager DS)
 *
 * Checklist de aceptación de términos del Register (766 fill, sin card
 * detrás): 3 TermsSelector (el primero empieza marcado, coincide con el
 * spec) + botón "Sigamos" centrado — deshabilitado hasta que las 3 casillas
 * estén marcadas.
 */

import { useState } from "react";
import type { JSX } from "react";
import Button from "../../../components/Button";
import TermsSelector from "../../../components/TermsSelector";

export interface TermsAcceptanceProps {
  className?: string;
}

const STYLE_ID = "concorde-terms-acceptance-styles";

const STYLES = `
.ta-cta-row { display: flex; justify-content: center; margin-top: 8px; }
`;

let _stylesInjected = false;

export default function TermsAcceptance({ className = "" }: TermsAcceptanceProps): JSX.Element {
  const [terms, setTerms] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (typeof document !== "undefined" && !_stylesInjected) {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    _stylesInjected = true;
  }

  const allChecked = terms && privacy && marketing;

  return (
    <div className={className} data-block="terms-acceptance" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <style id={`${STYLE_ID}-ssr`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: STYLES }} />

      <TermsSelector checked={terms} onChange={setTerms}>
        He leído y acepto las <strong>Condiciones y Términos</strong> de uso del servicio.
      </TermsSelector>

      <TermsSelector checked={privacy} onChange={setPrivacy}>
        Acepto <strong>Política de privacidad y protección de Datos Personales</strong>.
      </TermsSelector>

      <TermsSelector checked={marketing} onChange={setMarketing}>
        Acepto que VMC SUBASTAS pueda remitirme promociones y publicidad de acuerdo con la <strong>Política de Privacidad</strong>.
      </TermsSelector>

      <div className="ta-cta-row">
        <Button variant="primary" disabled={!allChecked}>Sigamos</Button>
      </div>
    </div>
  );
}
