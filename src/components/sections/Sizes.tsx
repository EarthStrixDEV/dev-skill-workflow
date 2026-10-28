import PixelCard from "@/components/react-bits/PixelCard";
import { overviewSteps, sizeTiers } from "@/content/workflow";
import { ui } from "@/content/ui";
import { L } from "@/components/ui/Lang";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SLOTS = overviewSteps.length + 1; // setup (0) + steps 1..7

export function Sizes() {
  return (
    <section id="sizes" className="mx-auto max-w-7xl px-5 pt-20 pb-20 sm:px-8">
      <SectionHeading eyebrow={ui.sizes.eyebrow} title={ui.sizes.title} />

      <div className="grid gap-4 md:grid-cols-3">
        {sizeTiers.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.1} className="h-full">
            {/*
              PixelCard defaults to a fixed 300x400 card on a hard-coded surface, so size and
              background are overridden inline. Pixel colours are hex (canvas-parsed); faded and
              translucent so the text on top stays readable. noFocus: these are not controls.
            */}
            <PixelCard
              noFocus
              intro={false}
              fade={0.9}
              opacity={0.5}
              colors="#8b5cf6,#a78bfa"
              glowColor="#8b5cf6"
              radius={28}
              className="border border-line"
              style={{ width: "100%", height: "100%", background: "var(--surface)" }}
            >
              <div className="w-full p-6 text-left">
                <p className="text-2xl font-bold tracking-tight">
                  <L v={tier.name} />
                </p>
                <p className="mt-1 text-sm text-muted">
                  <L v={tier.example} />
                </p>

                <ol className="mt-6 flex items-center gap-1.5" aria-label="Steps used">
                  {Array.from({ length: SLOTS }, (_, n) => {
                    const used = tier.steps.includes(n);
                    return (
                      <li
                        key={n}
                        className={`grid h-9 flex-1 place-items-center rounded-lg text-xs font-bold ${
                          used
                            ? "bg-[#5030e8] text-white shadow-md shadow-[#5030e8]/30"
                            : "bg-surface-2 text-muted/60"
                        }`}
                      >
                        {n}
                        <span className="sr-only">{used ? " (used)" : " (not used)"}</span>
                      </li>
                    );
                  })}
                </ol>

                <p className="mt-4 text-sm text-muted">
                  <span className="font-semibold text-fg">
                    <L v={ui.sizes.stepsUsed} />:
                  </span>{" "}
                  {tier.steps.join(" → ")}
                </p>
                <p className="mt-1 text-xs text-muted">
                  0 = <L v={ui.sizes.setup} />
                </p>
              </div>
            </PixelCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
