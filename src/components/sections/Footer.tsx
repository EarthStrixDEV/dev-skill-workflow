import { ui } from "@/content/ui";
import { L } from "@/components/ui/Lang";
import { Logo } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
      <div className="flex flex-col gap-6 rounded-panel bg-ink px-6 py-8 text-ink-fg sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-start gap-3">
          <Logo className="size-9 shrink-0" />
          <div>
            <p className="font-bold">{ui.brand}</p>
            <p className="mt-1 max-w-md text-sm text-ink-muted">
              <L v={ui.footer.note} />
            </p>
          </div>
        </div>
        <p className="text-sm text-ink-muted">
          <L v={ui.footer.credit} />{" "}
          <a
            href={ui.footer.creditHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink-fg underline decoration-glow underline-offset-4 transition hover:text-glow"
          >
            {ui.footer.creditName}
          </a>
        </p>
      </div>
    </footer>
  );
}
