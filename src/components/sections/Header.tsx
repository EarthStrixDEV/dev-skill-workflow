import Link from "next/link";
import Magnet from "@/components/react-bits/Magnet";
import { ui } from "@/content/ui";
import { libUi } from "@/content/libraryUi";
import { L } from "@/components/ui/Lang";
import { Logo } from "@/components/ui/icons";
import { LangToggle, ThemeToggle } from "@/components/ui/Toggles";

/** Section anchors use "/#..." so they also work from the library page. */
const links = [
  { href: "/#usecases", label: ui.nav.usecases },
  { href: "/#flow", label: ui.nav.flow },
  { href: "/#overview", label: ui.nav.overview },
  { href: "/#sizes", label: ui.nav.sizes },
];

export function Header({ current }: { current?: "library" }) {
  const inLibrary = current === "library";

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight whitespace-nowrap"
        >
          <Logo className="size-8" />
          <span>{ui.brand}</span>
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-8 text-sm font-medium text-muted md:flex"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-fg">
              <L v={l.label} />
            </Link>
          ))}
          <Link
            href="/library"
            aria-current={inLibrary ? "page" : undefined}
            className={`rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
              inLibrary
                ? "bg-[#5030e8] text-white"
                : "bg-brand-soft text-brand-strong hover:bg-brand hover:text-white"
            }`}
          >
            <L v={libUi.navLabel} />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Magnet padding={36} magnetStrength={3} wrapperClassName="inline-block">
            <LangToggle />
          </Magnet>
          <Magnet padding={36} magnetStrength={3} wrapperClassName="inline-block">
            <ThemeToggle />
          </Magnet>
        </div>
      </div>

      {/* Small screens: the same links as a scrollable row, so the library is reachable. */}
      <nav aria-label="Sections (compact)" className="border-t border-line/60 md:hidden">
        <div className="flex gap-2 overflow-x-auto px-5 py-2 text-sm font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/library"
            aria-current={inLibrary ? "page" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-1.5 font-semibold whitespace-nowrap ${
              inLibrary ? "bg-[#5030e8] text-white" : "bg-brand-soft text-brand-strong"
            }`}
          >
            <L v={libUi.navLabel} />
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 whitespace-nowrap"
            >
              <L v={l.label} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
