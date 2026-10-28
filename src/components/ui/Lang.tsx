import type { ReactNode } from "react";
import type { Bi } from "@/content/types";

/**
 * Renders both languages; globals.css hides the inactive one based on
 * <html data-lang>. No hooks, so it works in Server and Client Components.
 */
export function L({ v }: { v: Bi }) {
  return (
    <>
      <span className="lang-th" lang="th">
        {v.th}
      </span>
      <span className="lang-en" lang="en">
        {v.en}
      </span>
    </>
  );
}

/**
 * Same as <L>, for components that take a plain string prop
 * (e.g. React Bits text animations). Renders the child once per language.
 * `block` wraps in <div> instead of <span> when the child is block-level.
 */
export function LR({
  v,
  children,
  block = false,
}: {
  v: Bi;
  children: (text: string) => ReactNode;
  block?: boolean;
}) {
  const Tag = block ? "div" : "span";
  return (
    <>
      <Tag className="lang-th" lang="th">
        {children(v.th)}
      </Tag>
      <Tag className="lang-en" lang="en">
        {children(v.en)}
      </Tag>
    </>
  );
}
