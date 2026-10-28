"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders `fallback` on the server and first paint, then mounts `children`.
 *
 * Its effect cleanup unmounts `children` again. With Cache Components, Next hides a page when
 * you navigate away and later re-shows it, re-running effects on the SAME DOM; a component
 * whose cleanup leaves stale state (e.g. a cancelled animation frame id) would then stay dead.
 * Unmounting here makes the re-show create a brand-new instance instead.
 */
export function FreshOnShow({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // Mount on the next frame (a callback, not the effect body) so the fallback paints first.
    const frame = requestAnimationFrame(() => setOn(true));
    return () => {
      cancelAnimationFrame(frame);
      setOn(false);
    };
  }, []);

  return <>{on ? children : fallback}</>;
}
