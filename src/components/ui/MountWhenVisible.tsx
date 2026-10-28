"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts `children` only while the wrapper is near the viewport, and unmounts them when it
 * leaves. For effects that keep a frame loop running even off-screen (e.g. ScrollVelocity).
 * The wrapper keeps `height` so the page layout never jumps. The cleanup also unmounts
 * `children`, so a Cache Components hide/re-show gets a fresh instance (see FreshOnShow).
 */
export function MountWhenVisible({
  children,
  height,
  rootMargin = "200px",
  className,
}: {
  children: ReactNode;
  height: number | string;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      setVisible(false);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight: height }}>
      {visible ? children : null}
    </div>
  );
}
