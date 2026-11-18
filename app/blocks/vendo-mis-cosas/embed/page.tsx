import type { JSX } from "react";
import VendoMisCosas from "@/src/blocks/vendo-mis-cosas/desktop/VendoMisCosas";
import { LANDING_FONT_CLASS } from "@/app/blocks/_components/landingFonts";

export const metadata = { title: "Vendo Mis Cosas · VMC Subastas" };

/** /blocks/vendo-mis-cosas/embed — la landing de Vendo Mis Cosas a pantalla completa (la muestra el visor en un iframe). */
export default function VendoMisCosasEmbedPage(): JSX.Element {
  return <div className={LANDING_FONT_CLASS}><VendoMisCosas /></div>;
}
