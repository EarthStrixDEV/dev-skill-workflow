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
          <Reveal key={tier.id} delay={i * 0.1}>
            <div className="h-full rounded-panel border border-line bg-surface p-6">
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
                      <span className="sr-only">
                        {used ? " (used)" : " (not used)"}
                      </span>
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
              <p className="mt-1 text-xs text-muted">0 = <L v={ui.sizes.setup} /></p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
