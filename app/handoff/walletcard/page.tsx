/**
 * /handoff/walletcard — Documentación de WalletCard (Mi billetera del riel de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { WalletCard } from "@/src/components/WalletCard";

const USAGE = `import { WalletCard } from "@/src/components/WalletCard";

<WalletCard balance="320" subasCoins="1,250" transactionsHref="/transacciones" />`;

export default function WalletCardHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="WalletCard"
      summary="Mi billetera: tarjeta violeta con el ícono de vidrio, el enlace «Transacciones», Saldo y SubasCoins en dos columnas y «Adquiere SubasCoins». Una luz blanca la cruza en diagonal cada 7 s."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, riel derecho). No es WalletBalanceCard (la tarjeta clara de Zona, 375 px): esta es oscura y del ancho del riel. Usa Vidrio y Button. El ejemplo va en el ancho del riel (300 px) y con la base de la página (Plus Jakarta Sans y alto de línea normal).</>}
      hero={{ node: <div style={{ width: "100%", maxWidth: 300, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}><WalletCard balance="320" subasCoins="1,250" transactionsHref="#" /></div>, minHeight: 260,
        code: `<WalletCard balance="320" subasCoins="1,250" transactionsHref="#" />` }}
      installName="walletcard"
      usage={USAGE}
      api={[
        { name: "balance", type: "string", description: "Saldo en dólares, sin centavos (p. ej. «320»)." },
        { name: "subasCoins", type: "string", description: "SubasCoins (p. ej. «1,250»)." },
        { name: "transactionsHref", type: "string", description: "Destino de «Transacciones»." },
      ]}
      files={["src/components/WalletCard.tsx"]}
    />
  );
}
