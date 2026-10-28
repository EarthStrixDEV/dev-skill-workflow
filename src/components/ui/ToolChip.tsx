import type { Tool, ToolKind } from "@/content/workflow";

/** Skill = violet, command = blue, agent = lime. Names are never translated. */
const TONE: Record<ToolKind, { chip: string; dot: string }> = {
  skill: { chip: "bg-brand-soft text-brand-strong", dot: "bg-brand" },
  command: { chip: "bg-pastel-blue text-pastel-blue-fg", dot: "bg-pastel-blue-fg" },
  agent: { chip: "bg-pastel-lime text-pastel-lime-fg", dot: "bg-pastel-lime-fg" },
};

export function ToolChip({ tool }: { tool: Tool }) {
  const tone = TONE[tool.kind];
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] leading-snug [overflow-wrap:anywhere] ${tone.chip}`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
      {tool.name}
      <span className="sr-only"> ({tool.kind})</span>
    </span>
  );
}

/** Small "Skill" / "Command" / "Agent" label in the same tone as the chip. */
export function KindBadge({ kind }: { kind: ToolKind }) {
  const tone = TONE[kind];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold capitalize ${tone.chip}`}
    >
      <span className={`size-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
      {kind}
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
