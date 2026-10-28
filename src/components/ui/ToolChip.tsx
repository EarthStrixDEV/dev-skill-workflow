import type { Tool } from "@/content/workflow";

/** A skill (violet) or agent (lime) name. Names are never translated. */
export function ToolChip({ tool }: { tool: Tool }) {
  const isAgent = tool.kind === "agent";
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] leading-snug [overflow-wrap:anywhere] ${
        isAgent
          ? "bg-pastel-lime text-pastel-lime-fg"
          : "bg-brand-soft text-brand-strong"
      }`}
    >
      <span
        className={`size-1.5 shrink-0 rounded-full ${
          isAgent ? "bg-pastel-lime-fg" : "bg-brand"
        }`}
        aria-hidden="true"
      />
      {tool.name}
      <span className="sr-only"> ({tool.kind})</span>
    </span>
  );
}

/** At most `max` chips, then a "+N" counter. */
export function ToolChips({ tools, max }: { tools: Tool[]; max?: number }) {
  const shown = max ? tools.slice(0, max) : tools;
  const hidden = tools.length - shown.length;
  return (
    <span className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <ToolChip key={t.name} tool={t} />
      ))}
      {hidden > 0 && (
        <span className="inline-flex items-center rounded-full border border-current/20 px-2 py-1 font-mono text-[11px] leading-none opacity-70">
          +{hidden}
        </span>
      )}
    </span>
  );
}
