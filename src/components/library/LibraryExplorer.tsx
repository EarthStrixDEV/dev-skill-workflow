"use client";

import { useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import type { Bi } from "@/content/types";
import {
  libraryItems,
  providerById,
  providers,
  usageOf,
  type ProviderId,
} from "@/content/library";
import { libUi } from "@/content/libraryUi";
import { useCases, type ToolKind, type UseCaseId } from "@/content/workflow";
import { L } from "@/components/ui/Lang";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchIcon } from "@/components/ui/icons";
import { InstallStrip } from "./InstallStrip";
import { ItemCard } from "./ItemCard";
import { ItemDialog } from "./ItemDialog";
import { ResultCount } from "./ResultCount";

type KindFilter = "all" | Exclude<ToolKind, "agent">;
type ProviderFilter = "all" | ProviderId;
type CaseFilter = "all" | UseCaseId;

/** Where each item is used never changes, so compute it once. */
const USAGE = new Map(libraryItems.map((it) => [it.name, usageOf(it.name)]));

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        active
          ? "border-transparent bg-[#5030e8] text-white shadow-md shadow-[#5030e8]/30"
          : "border-line bg-surface hover:border-brand"
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({ id, label, children }: { id: string; label: Bi; children: ReactNode }) {
  return (
    <div role="group" aria-labelledby={id} className="flex flex-wrap items-center gap-2">
      <span id={id} className="w-20 shrink-0 text-xs font-semibold text-muted">
        <L v={label} />
      </span>
      {children}
    </div>
  );
}

export function LibraryExplorer() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [provider, setProvider] = useState<ProviderFilter>("all");
  const [caseId, setCaseId] = useState<CaseFilter>("all");
  const [openName, setOpenName] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const matches = libraryItems.filter((it) => {
    if (kind !== "all" && it.kind !== kind) return false;
    if (provider !== "all" && it.provider !== provider) return false;
    if (caseId !== "all" && !USAGE.get(it.name)?.cases.some((c) => c.id === caseId)) return false;
    if (q) {
      const haystack =
        `${it.name} ${it.summary.th} ${it.summary.en} ${providerById[it.provider].name}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const filtered = q !== "" || kind !== "all" || provider !== "all" || caseId !== "all";
  const clear = () => {
    setQuery("");
    setKind("all");
    setProvider("all");
    setCaseId("all");
  };

  const showProvider = (id: ProviderId) => {
    setQuery("");
    setKind("all");
    setCaseId("all");
    setProvider(id);
    requestAnimationFrame(() =>
      document
        .getElementById("browse")
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
    );
  };

  const selected = libraryItems.find((it) => it.name === openName) ?? null;

  return (
    <>
      <InstallStrip onShowItems={showProvider} />

      <section id="browse" className="pt-20">
        <SectionHeading eyebrow={libUi.browse.eyebrow} title={libUi.browse.title} />

        <div className="space-y-4 rounded-panel border border-line bg-surface p-4 sm:p-5">
          <label className="relative block">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="ค้นหา skill / Search skills"
              className="h-12 w-full rounded-full border border-line bg-bg pr-4 pl-11 text-sm outline-none transition focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            />
            {query === "" && (
              <span className="pointer-events-none absolute top-1/2 left-11 -translate-y-1/2 text-sm text-muted">
                <L v={libUi.browse.searchPlaceholder} />
              </span>
            )}
          </label>

          <FilterGroup id="f-kind" label={libUi.browse.kind}>
            <FilterChip active={kind === "all"} onClick={() => setKind("all")}>
              <L v={libUi.browse.all} />
            </FilterChip>
            <FilterChip active={kind === "skill"} onClick={() => setKind("skill")}>
              Skill
            </FilterChip>
            <FilterChip active={kind === "command"} onClick={() => setKind("command")}>
              Command
            </FilterChip>
          </FilterGroup>

          <FilterGroup id="f-provider" label={libUi.browse.provider}>
            <FilterChip active={provider === "all"} onClick={() => setProvider("all")}>
              <L v={libUi.browse.all} />
            </FilterChip>
            {providers.map((p) => (
              <FilterChip
                key={p.id}
                active={provider === p.id}
                onClick={() => setProvider(p.id)}
              >
                <span className="font-mono">{p.name}</span>
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup id="f-case" label={libUi.browse.useCase}>
            <FilterChip active={caseId === "all"} onClick={() => setCaseId("all")}>
              <L v={libUi.browse.all} />
            </FilterChip>
            {useCases.map((uc) => (
              <FilterChip key={uc.id} active={caseId === uc.id} onClick={() => setCaseId(uc.id)}>
                <L v={uc.name} />
              </FilterChip>
            ))}
          </FilterGroup>
        </div>

        <div className="mt-6 mb-4 flex items-center justify-between gap-3">
          <p role="status" className="text-sm text-muted">
            <ResultCount n={matches.length} />
          </p>
          {filtered && (
            <button
              type="button"
              onClick={clear}
              className="text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <L v={libUi.browse.clear} />
            </button>
          )}
        </div>

        {matches.length ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((it, i) => (
              <li key={it.name}>
                <Reveal delay={(i % 3) * 0.05} y={14} className="h-full">
                  <ItemCard item={it} onOpen={() => setOpenName(it.name)} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-panel border border-dashed border-line px-6 py-14 text-center">
            <p className="text-sm text-muted">
              <L v={libUi.browse.empty} />
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-4 rounded-full bg-[#5030e8] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <L v={libUi.browse.clear} />
            </button>
          </div>
        )}
      </section>

      <ItemDialog item={selected} onClose={() => setOpenName(null)} />
    </>
  );
}
