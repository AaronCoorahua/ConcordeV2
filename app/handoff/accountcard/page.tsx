/**
 * /handoff/accountcard — Documentación de AccountCard (tarjeta «Tu cuenta» de Mi Garaje).
 */
import type { JSX } from "react";
import HandoffDoc from "@/app/handoff/_components/HandoffDoc";
import { AccountCard } from "@/src/components/AccountCard";

const USAGE = `import { AccountCard } from "@/src/components/AccountCard";

<AccountCard username="ZAEX5G" risk="Muy bajo" points={500} passExpiry="16/01/2026" passHref="/subaspass" />`;

export default function AccountCardHandoffPage(): JSX.Element {
  return (
    <HandoffDoc
      title="AccountCard"
      summary="Tarjeta «Tu cuenta»: el saludo con el avatar e «Ir al Perfil», el riesgo del perfil y los puntos VMC en columnas; debajo, SubasPass activo con su vencimiento y la banda morada «Participa con consignación 0 · Ver planes»."
      note={<>Viene de Mi Garaje (/blocks/mi-garaje/m/vmc, arriba de Tu actividad). Desde 1024 px va en tres columnas y SubasPass en su propia fila; en móvil las columnas se apilan. Usa AvatarZone, ProfileButton, StarIcon, InfoIcon y BadgeStatus. El ejemplo va en el ancho de la columna (451 px) y con la base de la página (Plus Jakarta Sans y alto de línea normal).</>}
      hero={{ node: <div style={{ width: "100%", maxWidth: 451, fontFamily: "var(--vmc-font-display), \"Plus Jakarta Sans\", sans-serif", lineHeight: "normal", color: "#191C1C" }}><AccountCard username="ZAEX5G" risk="Muy bajo" points={500} passExpiry="16/01/2026" passHref="#" /></div>, minHeight: 260,
        code: `<AccountCard username="ZAEX5G" risk="Muy bajo" points={500} passExpiry="16/01/2026" passHref="#" />` }}
      installName="accountcard"
      usage={USAGE}
      api={[
        { name: "username", type: "string", description: "Nombre de usuario del saludo." },
        { name: "risk", type: "string", description: "Riesgo del perfil, como lo dice VMC (p. ej. «Muy bajo»)." },
        { name: "points", type: "number", description: "Puntos VMC." },
        { name: "passExpiry", type: "string", description: "Vencimiento de SubasPass, ya escrito." },
        { name: "passHref", type: "string", description: "Destino de la banda de SubasPass." },
      ]}
      files={["src/components/AccountCard.tsx"]}
    />
  );
}
