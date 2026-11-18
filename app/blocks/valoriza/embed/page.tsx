import type { JSX } from "react";
import Valoriza from "@/src/blocks/valoriza/desktop/Valoriza";
import { LANDING_FONT_CLASS } from "@/app/blocks/_components/landingFonts";

export const metadata = { title: "Valoriza tu auto · VMC Subastas" };

/** /blocks/valoriza/embed — la landing de Valoriza a pantalla completa (la muestra el visor en un iframe). */
export default function ValorizaEmbedPage(): JSX.Element {
  return <div className={LANDING_FONT_CLASS}><Valoriza /></div>;
}
