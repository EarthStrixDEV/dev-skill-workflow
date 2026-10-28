import ScrollVelocity from "@/components/react-bits/ScrollVelocity";
import { libraryItems } from "@/content/library";
import { MountWhenVisible } from "@/components/ui/MountWhenVisible";

const names = libraryItems.map((it) => it.name);
const half = Math.ceil(names.length / 2);
const joinRow = (list: string[]) => `${list.join("   •   ")}   •`;
/** Module-level so the same strings are reused on every render. */
const ROWS = [joinRow(names.slice(0, half)), joinRow(names.slice(half))];
const MONO = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

/**
 * Decorative band of skill names that speeds up while the page scrolls. Latin names only, hidden
 * from assistive tech (the same names are listed in the library), and only mounted while near the
 * viewport because ScrollVelocity runs a frame loop per row.
 */
export function SkillBand() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
      <MountWhenVisible height={64}>
        <ScrollVelocity
          texts={ROWS}
          velocity={40}
          numCopies={3}
          fontSize={20}
          fontWeight={600}
          color="var(--muted)"
          fadeEdges
          parallaxStyle={{ paddingBlock: 6 }}
          scrollerStyle={{ fontFamily: MONO }}
        />
      </MountWhenVisible>
    </div>
  );
}
