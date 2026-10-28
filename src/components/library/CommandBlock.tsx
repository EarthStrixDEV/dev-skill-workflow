import { libUi } from "@/content/libraryUi";
import { L } from "@/components/ui/Lang";
import { CopyButton } from "./CopyButton";

/** The install commands for one source: one copy button per line, and one for the whole set. */
export function CommandBlock({ commands }: { commands: string[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-ink text-ink-fg">
      <ul className="divide-y divide-white/10">
        {commands.map((cmd) => (
          <li key={cmd} className="flex items-center justify-between gap-3 px-3 py-2.5">
            <code className="min-w-0 font-mono text-[12.5px] leading-relaxed [overflow-wrap:anywhere]">
              {cmd}
            </code>
            <CopyButton text={cmd} />
          </li>
        ))}
      </ul>
      {commands.length > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-2">
          <span className="text-[11px] text-ink-muted">
            <L v={libUi.install.copyAllHint} />
          </span>
          <CopyButton text={commands.join("\n")} label={libUi.install.copyAll} />
        </div>
      )}
    </div>
  );
}
