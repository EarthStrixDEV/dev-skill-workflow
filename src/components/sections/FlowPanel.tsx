"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { Step, UseCase } from "@/content/workflow";
import { ui } from "@/content/ui";
import { L } from "@/components/ui/Lang";
import { ToolChips } from "@/components/ui/ToolChip";
import { CheckIcon, InfoIcon, UseCaseIcon } from "@/components/ui/icons";

/** Seconds between one timeline node lighting up and the next. */
const SEG = 0.55;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** SpotlightCard paints its own surface; point it at the theme tokens so it follows Light/Dark. */
const CARD_VARS = {
  "--spotlight-card-surface": "var(--surface)",
  "--spotlight-card-border": "var(--line)",
  "--spotlight-card-shadow":
    "0 1px 2px rgba(20,20,40,0.04), 0 18px 40px -26px rgba(60,40,160,0.28)",
} as CSSProperties;

function StepCard({ step }: { step: Step }) {
  return (
    <SpotlightCard
      theme="light"
      spotlightColor="var(--glow)"
      intensity={0.55}
      spotlightSize={280}
      className="h-full rounded-card! p-5!"
      style={CARD_VARS}
    >
      <h3 className="text-lg leading-snug font-semibold">
        <L v={step.title} />
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        <L v={step.desc} />
      </p>
      <div className="mt-4">
        <ToolChips tools={step.tools} />
      </div>
      <p className="mt-4 flex items-start gap-2 rounded-xl bg-brand-soft px-3 py-2.5 text-sm text-brand-strong">
        <CheckIcon className="mt-0.5 size-4 shrink-0" />
        <span>
          <span className="font-semibold">
            <L v={ui.flow.outcome} />:{" "}
          </span>
          <L v={step.outcome} />
        </span>
      </p>
    </SpotlightCard>
  );
}

/** Ordered flow: nodes light up one after another, joined by a growing gradient line. */
function Timeline({ steps }: { steps: Step[] }) {
  const instant = useReducedMotion() === true;

  const when = (i: number) => (instant ? 0 : i * SEG);
  const tween = (delay: number, duration: number) => ({
    delay,
    duration: instant ? 0 : duration,
    ease: EASE,
  });

  const nodeV: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: (i: number) => ({ opacity: 1, scale: 1, transition: tween(when(i), 0.35) }),
  };
  const numV: Variants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({ opacity: 1, transition: tween(when(i) + (instant ? 0 : 0.1), 0.25) }),
  };
  const segV: Variants = {
    hidden: { scaleY: 0 },
    show: (i: number) => ({
      scaleY: 1,
      transition: {
        delay: instant ? 0 : i * SEG + 0.25,
        duration: instant ? 0 : SEG - 0.25,
        ease: "linear",
      },
    }),
  };
  const cardV: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: tween(when(i), 0.5) }),
  };

  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {steps.map((step, i) => (
        <li key={step.title.en} className="relative flex gap-4 pb-5 last:pb-0">
          <div className="flex flex-col items-center">
            <div className="relative grid size-10 shrink-0 place-items-center rounded-full border-2 border-line bg-surface text-sm font-bold">
              <span className="absolute size-2 rounded-full bg-line" aria-hidden="true" />
              <motion.span
                custom={i}
                variants={nodeV}
                className="absolute -inset-0.5 rounded-full bg-[#5030e8] shadow-[0_0_22px_var(--glow)]"
                aria-hidden="true"
              />
              <motion.span custom={i} variants={numV} className="relative text-white">
                {i + 1}
              </motion.span>
            </div>
            {i < steps.length - 1 && (
              <div className="relative mt-1 w-0.5 flex-1 overflow-hidden rounded-full bg-line">
                <motion.span
                  custom={i}
                  variants={segV}
                  className="absolute inset-0 origin-top bg-linear-to-b from-[#5030e8] to-glow"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <motion.div custom={i} variants={cardV} className="min-w-0 flex-1">
            <StepCard step={step} />
          </motion.div>
        </li>
      ))}
    </motion.ol>
  );
}

/** Unordered jobs (the review use case): independent cards, no numbering or line. */
function CardGrid({ steps }: { steps: Step[] }) {
  const instant = useReducedMotion() === true;
  const itemV: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: instant ? 0 : i * 0.1, duration: instant ? 0 : 0.5, ease: EASE },
    }),
  };

  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-4 md:grid-cols-2"
    >
      {steps.map((step, i) => (
        <motion.li key={step.title.en} custom={i} variants={itemV} className="h-full">
          <StepCard step={step} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

function UseCaseSummary({ useCase }: { useCase: UseCase }) {
  const n = useCase.steps.length;
  return (
    <aside className="rounded-panel border border-line bg-surface p-6 lg:sticky lg:top-24 lg:order-2 lg:self-start">
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
          <UseCaseIcon id={useCase.id} className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-brand">Use case</p>
          <h3 className="leading-snug font-bold">
            <L v={useCase.name} />
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        <L v={useCase.tagline} />
      </p>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-brand">{n}</span>
        <span className="text-sm text-muted">
          <L
            v={
              useCase.ordered
                ? { th: "ขั้นตอน", en: "steps" }
                : { th: "งานตรวจ", en: "checks" }
            }
          />
        </span>
      </div>

      {!useCase.ordered && (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          <L v={ui.flow.unorderedHint} />
        </p>
      )}

      {useCase.note && (
        <p className="mt-5 flex gap-2.5 rounded-xl bg-surface-2 p-3.5 text-sm leading-relaxed">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>
            <L v={useCase.note} />
          </span>
        </p>
      )}

      <div className="mt-5 border-t border-line pt-4">
        <p className="mb-2 text-xs font-semibold text-muted">
          <L v={ui.flow.legend} />
        </p>
        <div className="flex flex-wrap gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-brand-strong">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            <L v={ui.flow.skill} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pastel-lime px-2.5 py-1 text-pastel-lime-fg">
            <span className="size-1.5 rounded-full bg-pastel-lime-fg" aria-hidden="true" />
            <L v={ui.flow.agent} />
          </span>
        </div>
      </div>
    </aside>
  );
}

export function FlowPanel({ useCase }: { useCase: UseCase }) {
  return (
    <div
      id="flow-panel"
      role="tabpanel"
      aria-labelledby={`tab-${useCase.id}`}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"
    >
      <UseCaseSummary useCase={useCase} />
      <div className="lg:order-1">
        {useCase.ordered ? (
          <Timeline steps={useCase.steps} />
        ) : (
          <CardGrid steps={useCase.steps} />
        )}
      </div>
    </div>
  );
}
