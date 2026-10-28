"use client";

import { useEffect, useState } from "react";
import Aurora from "@/components/react-bits/Aurora";

/**
 * The single WebGL effect on the page. The CSS gradients underneath are the fallback
 * (small screens, no WebGL2): Aurora renders nothing when WebGL2 is unavailable.
 */
export function HeroBackground() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const update = () => setWebgl(wide.matches);
    update();
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(139,92,246,0.5),transparent_60%),radial-gradient(ellipse_at_0%_100%,rgba(80,48,232,0.4),transparent_55%)]" />
      {webgl && (
        <div className="absolute inset-0 opacity-80">
          <Aurora
            colorStops={["#5030e8", "#8b5cf6", "#3b1fd0"]}
            amplitude={1.1}
            blend={0.6}
            speed={0.7}
            mouseInteraction={false}
          />
        </div>
      )}
    </div>
  );
}
