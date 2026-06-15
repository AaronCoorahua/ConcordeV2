"use client";

/**
 * Preview interactivo de OfferCard — hover + like toggle + badge.
 * Client component: pasa callbacks (onClick / onLikeChange) que no se pueden
 * serializar desde un Server Component.
 */

import type { JSX } from "react";
import OfferCard from "@/src/components/OfferCard/OfferCard";
import BadgeStatus from "@/src/components/BadgeStatus/BadgeStatus";

export default function OfferCardInteractivePreview(): JSX.Element {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
      <OfferCard
        variant="live"
        name="Audi Q3"
        year="2026"
        price="US$ 9,999"
        imageSrc="/demo/bronco.jpg"
        badge={<BadgeStatus variant="live" />}
        onClick={function handleClick() { void 0; }}
      />
      <OfferCard
        variant="live"
        name="Audi Q3"
        year="2026"
        price="US$ 9,999"
        imageSrc="/demo/bronco.jpg"
        badge={<BadgeStatus variant="proxima" />}
        onClick={function handleClick() { void 0; }}
      />
      <OfferCard
        variant="negotiable"
        name="Audi Q3"
        year="2026"
        imageSrc="/demo/bronco.jpg"
        onClick={function handleClick() { void 0; }}
      />
    </div>
  );
}
