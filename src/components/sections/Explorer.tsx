"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { useCases, type UseCaseId } from "@/content/workflow";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UseCaseBento } from "./UseCaseBento";
import { UseCaseTabs } from "./UseCaseTabs";
import { FlowPanel } from "./FlowPanel";

/** Holds the selected use case shared by the bento cards, the tabs and the step flow. */
export function Explorer() {
  const [activeId, setActiveId] = useState<UseCaseId>("feature");
  const reduce = useReducedMotion();
  const active = useCases.find((c) => c.id === activeId) ?? useCases[0];

  const openFlow = (id: UseCaseId) => {
    setActiveId(id);
    requestAnimationFrame(() =>
      document
        .getElementById("flow")
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
    );
  };

  return (
    <>
      <section id="usecases" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <SectionHeading eyebrow={ui.usecases.eyebrow} title={ui.usecases.title} />
        <UseCaseBento activeId={activeId} onOpen={openFlow} />
      </section>

      <section id="flow" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <SectionHeading eyebrow={ui.flow.eyebrow} title={active.name} />
        <UseCaseTabs activeId={activeId} onChange={setActiveId} />
        <FlowPanel key={active.id} useCase={active} />
      </section>
    </>
  );
}
