import DecryptedText from "@/components/react-bits/DecryptedText";
import GlareHover from "@/components/react-bits/GlareHover";
import { providerById, type LibraryItem } from "@/content/library";
import { L } from "@/components/ui/Lang";
import { ArrowIcon } from "@/components/ui/icons";
import { KindBadge } from "@/components/ui/ToolChip";

/** Characters used while a name "decrypts" on hover: Latin only (DecryptedText splits by code point). */
const SCRAMBLE = "abcdefghijklmnopqrstuvwxyz:-";

/**
 * GlareHover is the card shell: it paints the surface, border and radius itself (inline styles
 * beat classes), clips its content, and takes no extra props, so the real <button> sits inside it.
 * The focus ring is drawn inset because the shell's overflow-hidden would clip an outer one.
 */
export function ItemCard({ item, onOpen }: { item: LibraryItem; onOpen: () => void }) {
  const provider = providerById[item.provider];
  return (
    <GlareHover
      width="100%"
      height="100%"
      borderRadius="1.25rem"
      background="var(--surface)"
      borderColor="var(--line)"
      mode="follow"
      glareColor="#8b5cf6"
      glareOpacity={0.3}
      blendMode="normal"
      className="transition duration-300 hover:-translate-y-0.5 hover:border-brand! hover:shadow-xl hover:shadow-brand/10"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group flex h-full w-full flex-col rounded-[inherit] p-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
      >
        <span className="flex items-center justify-between gap-2">
          <KindBadge kind={item.kind} />
        </span>
        {/* The name sits on its own line: DecryptedText keeps words unbroken, so it needs the full width. */}
        <DecryptedText
          text={item.name}
          animateOn="hover"
          sequential
          speed={40}
          characters={SCRAMBLE}
          parentClassName="mt-2.5 font-mono text-sm leading-snug font-semibold"
        />
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
    </GlareHover>
  );
}
