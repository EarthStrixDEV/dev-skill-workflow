"use client";

import { useCases, type UseCase, type UseCaseId } from "@/content/workflow";
import { L } from "@/components/ui/Lang";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, UseCaseIcon } from "@/components/ui/icons";

const SKIN: Record<UseCase["accent"], { card: string; sub: string }> = {
  ink: { card: "bg-ink text-ink-fg", sub: "text-ink-muted" },
  violet: {
    card: "bg-linear-to-br from-[#5a3bf0] to-[#2a168a] text-white",
    sub: "text-white/75",
  },
  blue: { card: "bg-pastel-blue text-pastel-blue-fg", sub: "opacity-75" },
  lime: { card: "bg-pastel-lime text-pastel-lime-fg", sub: "opacity-75" },
  lavender: { card: "bg-brand-soft text-brand-strong", sub: "opacity-80" },
  slate: {
    card: "bg-linear-to-br from-[#2e2c52] to-[#15152b] text-white",
    sub: "text-white/70",
  },
};

function uniqueTools(useCase: UseCase) {
  const seen = new Set<string>();
  return useCase.steps
    .flatMap((s) => s.tools)
    .filter((t) => (seen.has(t.name) ? false : (seen.add(t.name), true)));
}

/** An even grid (3 columns on desktop) so any number of use cases lays out cleanly. */
export function UseCaseBento({
  activeId,
  onOpen,
}: {
  activeId: UseCaseId;
  onOpen: (id: UseCaseId) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {useCases.map((uc, i) => {
        const skin = SKIN[uc.accent];
        const tools = uniqueTools(uc).slice(0, 3);
        const active = uc.id === activeId;
        return (
          <Reveal key={uc.id} delay={(i % 3) * 0.08} className="h-full min-h-[270px]">
            <button
              type="button"
              onClick={() => onOpen(uc.id)}
              aria-pressed={active}
              className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-panel p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:p-7 ${skin.card} ${
                active ? "ring-2 ring-brand ring-offset-4 ring-offset-bg" : ""
              }`}
            >
              {uc.accent === "ink" && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_95%,rgba(139,92,246,0.5),transparent_55%)]"
                />
              )}
              <UseCaseIcon
                id={uc.id}
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-8 size-44 opacity-[0.09] transition duration-500 group-hover:scale-110 group-hover:rotate-6"
              />

              <span className="relative block">
                <span className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-current/10">
                    <UseCaseIcon id={uc.id} className="size-5" />
                  </span>
                  <span className="font-mono text-sm opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <span className="mt-6 block text-2xl font-bold tracking-tight">
                  <L v={uc.name} />
                </span>
                <span className={`mt-2 block text-sm leading-relaxed ${skin.sub}`}>
                  <L v={uc.tagline} />
                </span>
              </span>

              <span className="relative mt-6 flex items-end justify-between gap-4">
                <span className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-current/10 px-3 py-1 text-xs font-semibold">
                    <L
                      v={{
                        th: `${uc.steps.length} ${uc.ordered ? "ขั้นตอน" : "งานตรวจ"}`,
                        en: `${uc.steps.length} ${uc.ordered ? "steps" : "checks"}`,
                      }}
                    />
                  </span>
                  {tools.map((t) => (
                    <span
                      key={t.name}
                      className="hidden rounded-full bg-current/10 px-2.5 py-1 font-mono text-[11px] sm:inline"
                    >
                      {t.name}
                    </span>
                  ))}
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-current/10 transition duration-300 group-hover:translate-x-1 group-hover:bg-current/20">
                  <ArrowIcon className="size-5" />
                </span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
