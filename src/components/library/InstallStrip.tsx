"use client";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { libraryItems, providers, type ProviderId } from "@/content/library";
import { itemsLabel, libUi } from "@/content/libraryUi";
import { L } from "@/components/ui/Lang";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CARD_VARS } from "@/components/ui/cardVars";
import { ExternalIcon, InfoIcon } from "@/components/ui/icons";
import { CommandBlock } from "./CommandBlock";

/** One card per source: its install commands (or "nothing to install") and a link to the original. */
export function InstallStrip({ onShowItems }: { onShowItems: (id: ProviderId) => void }) {
  return (
    <section id="install" className="pt-12">
      <SectionHeading eyebrow={libUi.install.eyebrow} title={libUi.install.title} />
      <p className="-mt-4 mb-8 max-w-2xl text-sm leading-relaxed text-muted">
        <L v={libUi.install.hint} />
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((p, i) => {
          const count = libraryItems.filter((it) => it.provider === p.id).length;
          return (
            <Reveal key={p.id} delay={(i % 3) * 0.08} className="h-full">
              <SpotlightCard
                theme="light"
                spotlightColor="var(--glow)"
                intensity={0.5}
                spotlightSize={260}
                className="flex h-full flex-col rounded-card! p-5!"
                style={CARD_VARS}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-base font-bold [overflow-wrap:anywhere]">
                    {p.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-strong">
                    <L v={itemsLabel(count)} />
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  <L v={p.tagline} />
                </p>

                <div className="mt-4">
                  {p.commands.length ? (
                    <CommandBlock commands={p.commands} />
                  ) : (
                    <p className="rounded-xl bg-surface-2 px-3 py-2.5 text-sm font-medium">
                      <L v={libUi.install.nothing} />
                    </p>
                  )}
                </div>

                {p.note && (
                  <p className="mt-3 flex gap-2 text-xs leading-relaxed text-muted">
                    <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-brand" />
                    <span>
                      <L v={p.note} />
                    </span>
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
                  <a
                    href={p.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                  >
                    <span className="[overflow-wrap:anywhere]">{p.source.label}</span>
                    <ExternalIcon className="size-3.5 shrink-0" />
                    <span className="sr-only">
                      (<L v={libUi.install.source} />)
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onShowItems(p.id)}
                    className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <L v={libUi.install.showItems} />
                  </button>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
