import RotatingText from "@/components/react-bits/RotatingText";
import { useCases } from "@/content/workflow";
import { FreshOnShow } from "@/components/ui/FreshOnShow";

/*
 * Module-level constants: RotatingText reshuffles its order if `texts` is a new array each render.
 * One instance per language (the inactive one is hidden by CSS), split by words so Thai names,
 * which have no per-character spaces, are never cut mid-syllable.
 */
const NAMES_TH = useCases.map((u) => u.name.th);
const NAMES_EN = useCases.map((u) => u.name.en);

function Line({
  lang,
  prefix,
  texts,
}: {
  lang: "th" | "en";
  prefix: string;
  texts: string[];
}) {
  return (
    <div className={`lang-${lang}`} lang={lang}>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-lg font-semibold sm:text-xl">
        <span className="text-ink-muted">{prefix}</span>
        {/*
          RotatingText calls Math.random() while rendering, which Next 16 (Cache Components)
          rejects during prerender. FreshOnShow renders only the fallback on the server and mounts
          the real component on the client, so the first name shows instantly and nothing shifts.
        */}
        <FreshOnShow fallback={<span className="text-glow">{texts[0]}</span>}>
          <RotatingText
            texts={texts}
            splitBy="words"
            rotationInterval={3200}
            effect="drop"
            mainClassName="text-glow"
            style={{ display: "inline-flex" }}
          />
        </FreshOnShow>
      </p>
    </div>
  );
}

/** A short line under the hero title that cycles through the use cases. */
export function HeroRotator() {
  return (
    <>
      <Line lang="th" prefix="สำหรับงาน" texts={NAMES_TH} />
      <Line lang="en" prefix="For" texts={NAMES_EN} />
    </>
  );
}
