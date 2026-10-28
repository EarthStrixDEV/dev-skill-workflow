"use client";

/*
 * Both toggles work on <html> directly (the inline script in layout.tsx applies the
 * saved value before paint), so they hold no React state and cannot cause a
 * hydration mismatch. The active state is drawn by CSS.
 */

const BTN =
  "inline-flex h-10 items-center rounded-full border border-line bg-surface text-sm font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function savePreference(key: "theme" | "lang", value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage can be unavailable (private mode); the change still applies for this visit */
  }
}

export function LangToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.lang === "en" ? "th" : "en";
    root.dataset.lang = next;
    root.lang = next;
    savePreference("lang", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${BTN} gap-1 px-3`}
      aria-label="สลับภาษา / Switch language"
    >
      <span className="rounded-full px-2 py-0.5 text-xs font-semibold text-muted [html[data-lang=th]_&]:bg-brand [html[data-lang=th]_&]:text-white">
        TH
      </span>
      <span className="rounded-full px-2 py-0.5 text-xs font-semibold text-muted [html[data-lang=en]_&]:bg-brand [html[data-lang=en]_&]:text-white">
        EN
      </span>
    </button>
  );
}

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.classList.toggle("dark");
    savePreference("theme", dark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${BTN} w-10 justify-center`}
      aria-label="สลับโหมดสว่าง/มืด / Toggle light and dark mode"
    >
      {/* sun: shown in dark mode (click to go light) */}
      <svg
        className="hidden size-5 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* moon: shown in light mode (click to go dark) */}
      <svg
        className="size-5 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
