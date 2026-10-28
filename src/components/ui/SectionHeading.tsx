import type { Bi } from "@/content/types";
import { L } from "./Lang";

export function SectionHeading({ eyebrow, title }: { eyebrow: Bi; title: Bi }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-sm font-semibold tracking-wide text-brand">
        <L v={eyebrow} />
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <L v={title} />
      </h2>
    </div>
  );
}
