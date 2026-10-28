"use client";

import Counter from "@/components/react-bits/Counter";
import { FreshOnShow } from "@/components/ui/FreshOnShow";

/**
 * The number rolls like an odometer when filters change. Counter inherits the surrounding font
 * (its own default is 100px), shows the final value on first paint (no intro roll), and is wrapped
 * in FreshOnShow: its cleanup leaves a stale frame id, so after a page hide/re-show it must be a
 * brand-new instance. The plain number is the server-rendered fallback.
 */
function Count({ n }: { n: number }) {
  return (
    <FreshOnShow fallback={n}>
      <Counter value={n} fontSize="inherit" intro={false} motionBlur={false} fade={0.15} />
    </FreshOnShow>
  );
}

/** "N รายการ" / "N items" with an animated number, one span per language. */
export function ResultCount({ n }: { n: number }) {
  return (
    <>
      <span className="lang-th" lang="th">
        <Count n={n} /> รายการ
      </span>
      <span className="lang-en" lang="en">
        <Count n={n} /> {n === 1 ? "item" : "items"}
      </span>
    </>
  );
}
