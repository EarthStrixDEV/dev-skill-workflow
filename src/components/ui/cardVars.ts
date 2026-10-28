import type { CSSProperties } from "react";

/** SpotlightCard paints its own surface; point it at the theme tokens so it follows Light/Dark. */
export const CARD_VARS = {
  "--spotlight-card-surface": "var(--surface)",
  "--spotlight-card-border": "var(--line)",
  "--spotlight-card-shadow":
    "0 1px 2px rgba(20,20,40,0.04), 0 18px 40px -26px rgba(60,40,160,0.28)",
} as CSSProperties;
