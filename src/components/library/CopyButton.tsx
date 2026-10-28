"use client";

import { useEffect, useRef, useState } from "react";
import type { Bi } from "@/content/types";
import { libUi } from "@/content/libraryUi";
import { L } from "@/components/ui/Lang";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

type State = "idle" | "copied" | "failed";

/** Clipboard API first; a hidden textarea as a fallback. Resolves false if both fail. */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    // Inside a modal <dialog> everything outside it is inert, so attach the textarea to the dialog.
    const host =
      (document.activeElement as HTMLElement | null)?.closest("dialog") ?? document.body;
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    host.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    host.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  label = libUi.install.copy,
  className = "",
}: {
  text: string;
  label?: Bi;
  /** Colour/size classes; the default suits the dark command block. */
  className?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await writeClipboard(text);
    setState(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
          className || "bg-white/10 text-ink-fg hover:bg-white/20"
        }`}
      >
        {state === "copied" ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
        <span>
          <L
            v={
              state === "copied"
                ? libUi.install.copied
                : state === "failed"
                  ? libUi.install.failed
                  : label
            }
          />
        </span>
      </button>
      <span className="sr-only" role="status">
        {state === "copied" && <L v={libUi.install.copied} />}
        {state === "failed" && <L v={libUi.install.failed} />}
      </span>
    </>
  );
}
