/**
 * /handoff/qrcode — Documentación de QrCode.
 */
import type { JSX } from "react";
import { QrCode } from "@/src/components/QrCode";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";

const URL = "https://www.vmcsubastas.com/oferta/51015";

const USAGE = `import { QrCode, qrSvg } from "@/src/components/QrCode";

<QrCode value="https://www.vmcsubastas.com/oferta/51015" size={160} />

// El SVG como texto, para descargarlo
const svg = qrSvg("https://www.vmcsubastas.com/oferta/51015", { level: "H" });`;

export default function QrCodeHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="QrCode"
      summary="Código QR en SVG a partir de un texto o un link. qrSvg da el mismo QR como texto SVG para descargarlo o pegarlo en otro lado."
      note={<>Viene de mi-garaje-lab (app/components/lib). Usa qrcode-generator (MIT, sin dependencias). Es la base de QrCard.</>}
      hero={{ node: <QrCode value={URL} size={160} />, code: `<QrCode value="${URL}" size={160} />`, minHeight: 220 }}
      installName="qrcode"
      usage={USAGE}
      examples={[
        { title: "Colores propios", description: "Para fondos de marca, con buena diferencia de contraste entre color y fondo.",
          node: <QrCode value={URL} size={140} color="#3B1782" background="#F5F0FF" />, code: `<QrCode value={url} size={140} color="#3B1782" background="#F5F0FF" />` },
      ]}
      api={[
        { name: "value", type: "string", description: "Texto o link que guarda el QR." },
        { name: "size", type: "number", default: "160", description: "Lado en px." },
        { name: "level", type: `"L" | "M" | "Q" | "H"`, default: `"M"`, description: "Corrección de errores: 7, 15, 25 o 30 % del código puede dañarse y aún se lee." },
        { name: "color / background", type: "string", default: `"#191C1C" / "#FFFFFF"` },
        { name: "label", type: "string", description: "Texto para lectores de pantalla." },
        { name: "qrSvg(text, opts)", type: "string", description: "El SVG como texto; margin en módulos (4 por defecto)." },
        { name: "qrMatrix(text, level)", type: "boolean[][]", description: "La matriz del QR (true = módulo oscuro)." },
      ]}
      files={["src/components/QrCode.tsx"]}
    />
  );
}
