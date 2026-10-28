import CountUp from "@/components/react-bits/CountUp";
import { overviewSteps, setupStep } from "@/content/workflow";
import { ui } from "@/content/ui";
import { L } from "@/components/ui/Lang";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolChips } from "@/components/ui/ToolChip";

/**
 * The black numbered strip from the reference ("best sellers").
 * 00 is the once-per-repo setup; 01-07 are the general steps. Four columns, two rows.
 */
const cards = [setupStep, ...overviewSteps];

export function Overview() {
  return (
    <section id="overview" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
      <SectionHeading eyebrow={ui.overview.eyebrow} title={ui.overview.title} />

      <Reveal>
        <div className="rounded-panel bg-ink p-4 text-ink-fg sm:p-6">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((step, n) => {
              const isSetup = n === 0;
              return (
                <li
                  key={step.title.en}
                  className={`group min-w-0 rounded-card border p-5 transition duration-300 hover:-translate-y-1 hover:border-glow/60 ${
                    isSetup
                      ? "border-dashed border-white/25 bg-transparent"
                      : "border-white/10 bg-ink-2"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-baseline text-4xl font-bold text-glow">
                      <span aria-hidden="true">0</span>
                      <CountUp to={n} duration={0.9} delay={n * 0.08} />
                    </div>
                    {isSetup && (
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold">
                        <L v={ui.overview.setupBadge} />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 leading-snug font-semibold">
                    <L v={step.title} />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    <L v={step.outcome} />
                  </p>
                  <div className="mt-4 min-w-0">
                    <ToolChips tools={step.tools} max={isSetup ? undefined : 3} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
