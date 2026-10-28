"use client";

import type { KeyboardEvent } from "react";
import { useCases, type UseCaseId } from "@/content/workflow";
import { L } from "@/components/ui/Lang";
import { UseCaseIcon } from "@/components/ui/icons";

export function UseCaseTabs({
  activeId,
  onChange,
}: {
  activeId: UseCaseId;
  onChange: (id: UseCaseId) => void;
}) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = useCases.findIndex((c) => c.id === activeId);
    const last = useCases.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    onChange(useCases[next].id);
    document.getElementById(`tab-${useCases[next].id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Use case"
      onKeyDown={onKeyDown}
      className="-mx-5 mb-8 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {useCases.map((uc) => {
        const selected = uc.id === activeId;
        return (
          <button
            key={uc.id}
            id={`tab-${uc.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="flow-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(uc.id)}
            className={`inline-flex shrink-0 items-center gap-2.5 rounded-full border py-2 pr-5 pl-2 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              selected
                ? "border-transparent bg-[#5030e8] text-white shadow-lg shadow-[#5030e8]/30"
                : "border-line bg-surface text-fg hover:border-brand"
            }`}
          >
            <span
              className={`grid size-9 place-items-center rounded-full ${
                selected ? "bg-white/20" : "bg-brand-soft text-brand-strong"
              }`}
            >
              <UseCaseIcon id={uc.id} className="size-[18px]" />
            </span>
            <L v={uc.name} />
          </button>
        );
      })}
    </div>
  );
}
