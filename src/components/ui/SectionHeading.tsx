import type { Bi } from "@/content/types";
import GradientText from "@/components/react-bits/GradientText";
import { L } from "./Lang";

/** Violet stops that keep roughly 3:1 or better against both the light and the dark page (large text). */
const HEADING_GRADIENT = ["#6d4aff", "#8b5cf6", "#7c3aed"];

export function SectionHeading({ eyebrow, title }: { eyebrow: Bi; title: Bi }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-sm font-semibold tracking-wide text-brand">
        <L v={eyebrow} />
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <GradientText colors={HEADING_GRADIENT} animationSpeed={10}>
          <L v={title} />
        </GradientText>
      </h2>
    </div>
  );
}
