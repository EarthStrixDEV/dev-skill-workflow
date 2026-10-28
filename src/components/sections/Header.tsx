import Magnet from "@/components/react-bits/Magnet";
import { ui } from "@/content/ui";
import { L } from "@/components/ui/Lang";
import { Logo } from "@/components/ui/icons";
import { LangToggle, ThemeToggle } from "@/components/ui/Toggles";

const links = [
  { href: "#usecases", label: ui.nav.usecases },
  { href: "#flow", label: ui.nav.flow },
  { href: "#overview", label: ui.nav.overview },
  { href: "#sizes", label: ui.nav.sizes },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight whitespace-nowrap"
        >
          <Logo className="size-8" />
          <span>{ui.brand}</span>
        </a>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-8 text-sm font-medium text-muted md:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-fg">
              <L v={l.label} />
            </a>
          ))}
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
    </header>
  );
}
