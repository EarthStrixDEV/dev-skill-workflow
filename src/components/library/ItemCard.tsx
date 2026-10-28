import { providerById, type LibraryItem } from "@/content/library";
import { L } from "@/components/ui/Lang";
import { ArrowIcon } from "@/components/ui/icons";
import { KindBadge } from "@/components/ui/ToolChip";

export function ItemCard({ item, onOpen }: { item: LibraryItem; onOpen: () => void }) {
  const provider = providerById[item.provider];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-card border border-line bg-surface p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-xl hover:shadow-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-mono text-sm leading-snug font-semibold [overflow-wrap:anywhere]">
          {item.name}
        </span>
        <KindBadge kind={item.kind} />
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-muted">
        <L v={item.summary} />
      </span>
      <span className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs">
        <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono">{provider.name}</span>
        <span className="grid size-7 place-items-center rounded-full bg-brand-soft text-brand-strong transition duration-300 group-hover:translate-x-0.5">
          <ArrowIcon className="size-4" />
        </span>
      </span>
    </button>
  );
}
