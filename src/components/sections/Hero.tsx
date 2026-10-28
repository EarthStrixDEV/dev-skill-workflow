import BlurText from "@/components/react-bits/BlurText";
import CountUp from "@/components/react-bits/CountUp";
import Magnet from "@/components/react-bits/Magnet";
import ShinyText from "@/components/react-bits/ShinyText";
import { ui } from "@/content/ui";
import { stats } from "@/content/workflow";
import { L, LR } from "@/components/ui/Lang";
import { ArrowIcon } from "@/components/ui/icons";
import { HeroBackground } from "./HeroBackground";
import { HeroRing } from "./HeroRing";

const statItems = [
  { n: stats.steps, label: ui.hero.statSteps },
  { n: stats.useCases, label: ui.hero.statUseCases },
  { n: stats.skills, label: ui.hero.statSkills },
  { n: stats.agents, label: ui.hero.statAgents },
];

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
      <div className="relative isolate overflow-hidden rounded-panel bg-ink text-ink-fg">
        <HeroBackground />

        <div className="relative grid items-center gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium">
              <span
                className="size-1.5 rounded-full bg-glow shadow-[0_0_10px_var(--glow)]"
                aria-hidden="true"
              />
              <L v={ui.hero.badge} />
            </span>

            <div
              role="heading"
              aria-level={1}
              className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <LR v={ui.hero.title} block>
                {(t) => (
                  <BlurText
                    text={t}
                    trigger="load"
                    animateBy="words"
                    delay={110}
                    stepDuration={0.4}
                  />
                )}
              </LR>
            </div>

            <div className="mt-5 max-w-xl text-base sm:text-lg">
              <LR v={ui.hero.subtitle} block>
                {(t) => (
                  <p>
                    <ShinyText text={t} color="#b9b6dd" shineColor="#ffffff" speed={4} />
                  </p>
                )}
              </LR>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnet padding={40} magnetStrength={3} wrapperClassName="inline-block">
                <a
                  href="#flow"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[#5030e8] px-6 text-sm font-semibold text-white shadow-lg shadow-[#5030e8]/40 transition hover:brightness-110"
                >
                  <L v={ui.hero.ctaPrimary} />
                  <ArrowIcon className="size-4" />
                </a>
              </Magnet>
              <Magnet padding={40} magnetStrength={3} wrapperClassName="inline-block">
                <a
                  href="#overview"
                  className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-semibold transition hover:bg-white/10"
                >
                  <L v={ui.hero.ctaSecondary} />
                </a>
              </Magnet>
            </div>
          </div>

          <HeroRing />
        </div>

        <ul className="relative grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
          {statItems.map((s, i) => (
            <li
              key={s.label.en}
              className={`px-6 py-5 sm:px-10 ${i % 2 === 0 ? "border-r border-white/10" : ""} ${
                i < 2 ? "border-b border-white/10 sm:border-b-0" : ""
              } sm:border-r sm:last:border-r-0`}
            >
              <CountUp to={s.n} duration={1.6} className="text-3xl font-bold" />
              <div className="mt-1 text-sm text-ink-muted">
                <L v={s.label} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
