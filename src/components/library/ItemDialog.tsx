"use client";

import { useEffect, useRef } from "react";
import type { Bi } from "@/content/types";
import { providerById, usageOf, type LibraryItem } from "@/content/library";
import { libUi } from "@/content/libraryUi";
import { useCases } from "@/content/workflow";
import { L } from "@/components/ui/Lang";
import { CloseIcon, ExternalIcon, InfoIcon } from "@/components/ui/icons";
import { KindBadge } from "@/components/ui/ToolChip";
import { CommandBlock } from "./CommandBlock";

const stepsText = (nums: number[]): Bi => ({
  th: `ขั้น ${nums.join(", ")}`,
  en: `step${nums.length > 1 ? "s" : ""} ${nums.join(", ")}`,
});

function Detail({ item, onClose }: { item: LibraryItem; onClose: () => void }) {
  const provider = providerById[item.provider];
  const usage = usageOf(item.name);

  return (
    <div className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2
            id="item-dialog-title"
            className="font-mono text-lg leading-snug font-bold [overflow-wrap:anywhere]"
          >
            {item.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <KindBadge kind={item.kind} />
            <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px]">
              {provider.name}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <CloseIcon className="size-4" />
          <span className="sr-only">
            <L v={libUi.detail.close} />
          </span>
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed">
        <L v={item.summary} />
      </p>

      <h3 className="mt-6 mb-2 text-sm font-semibold">
        <L v={libUi.detail.usedIn} />
      </h3>
      <ul className="space-y-1.5">
        {usage.overview.map((n) => (
          <li key={`o${n}`} className="rounded-lg bg-surface-2 px-3 py-2 text-sm">
            {n === 0 ? (
              <L v={libUi.detail.setupLabel} />
            ) : (
              <>
                <L v={libUi.detail.overviewLabel} /> · <L v={stepsText([n])} />
              </>
            )}
          </li>
        ))}
        {usage.cases.map((c) => {
          const uc = useCases.find((u) => u.id === c.id);
          return (
            <li key={c.id} className="rounded-lg bg-surface-2 px-3 py-2 text-sm">
              {uc && <L v={uc.name} />} · <L v={stepsText(c.steps)} />
            </li>
          );
        })}
      </ul>

      <h3 className="mt-6 mb-2 text-sm font-semibold">
        <L v={libUi.detail.installTitle} />
      </h3>
      {provider.commands.length ? (
        <CommandBlock commands={provider.commands} />
      ) : (
        <p className="rounded-xl bg-surface-2 px-3 py-2.5 text-sm font-medium">
          <L v={libUi.install.nothing} />
        </p>
      )}
      {provider.note && (
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-muted">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-brand" />
          <span>
            <L v={provider.note} />
          </span>
        </p>
      )}

      <a
        href={provider.source.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <L v={libUi.detail.viewSource} />
        <span className="font-mono text-xs [overflow-wrap:anywhere]">{provider.source.label}</span>
        <ExternalIcon className="size-4 shrink-0" />
      </a>
    </div>
  );
}

/** A native modal <dialog>: focus trap, Esc to close and focus restore come from the browser. */
export function ItemDialog({
  item,
  onClose,
}: {
  item: LibraryItem | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // The dialog has no padding, so a click on its own element is a click on the backdrop.
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="item-dialog-title"
      className="m-auto max-h-[85vh] w-[min(92vw,40rem)] overflow-y-auto rounded-panel border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {item && <Detail item={item} onClose={onClose} />}
    </dialog>
  );
}
