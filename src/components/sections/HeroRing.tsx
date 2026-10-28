import { overviewSteps, stats } from "@/content/workflow";
import { ui } from "@/content/ui";

const C = 180; // centre of the 360x360 viewBox
const R = 140; // ring radius

/** Decorative neon ring with one node per overview step and a comet orbiting it. */
export function HeroRing() {
  const count = overviewSteps.length;

  return (
    <svg
      viewBox="0 0 360 360"
      className="mx-auto w-full max-w-[340px]"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#5030e8" />
        </linearGradient>
        <radialGradient id="ring-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5030e8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#5030e8" stopOpacity="0" />
        </radialGradient>
        <filter id="ring-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <circle cx={C} cy={C} r={R + 34} fill="url(#ring-core)" />
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="7"
        opacity="0.75"
        filter="url(#ring-blur)"
      />
      <circle cx={C} cy={C} r={R} fill="none" stroke="url(#ring-grad)" strokeWidth="2.5" />
      <circle
        cx={C}
        cy={C}
        r={R - 36}
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />

      <g className="ring-orbit">
        <circle cx={C} cy={C - R} r="15" fill="#a78bfa" opacity="0.55" filter="url(#ring-blur)" />
        <circle cx={C} cy={C - R} r="5.5" fill="#fff" />
      </g>

      {overviewSteps.map((step, i) => {
        const angle = ((-90 + (360 / count) * i) * Math.PI) / 180;
        const x = (C + R * Math.cos(angle)).toFixed(2);
        const y = (C + R * Math.sin(angle)).toFixed(2);
        return (
          <g key={step.title.en}>
            <circle cx={x} cy={y} r="17" fill="#0b0b14" stroke="url(#ring-grad)" strokeWidth="2" />
            <text
              x={x}
              y={y}
              dy="0.35em"
              textAnchor="middle"
              fill="#fff"
              fontSize="14"
              fontWeight="700"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      <text
        x={C}
        y={C + 8}
        textAnchor="middle"
        fill="#fff"
        fontSize="68"
        fontWeight="800"
      >
        {stats.steps}
      </text>
      <text
        className="lang-th"
        x={C}
        y={C + 38}
        textAnchor="middle"
        fill="#a9a6c9"
        fontSize="14"
      >
        {ui.hero.statSteps.th}
      </text>
      <text
        className="lang-en"
        x={C}
        y={C + 38}
        textAnchor="middle"
        fill="#a9a6c9"
        fontSize="14"
      >
        {ui.hero.statSteps.en}
      </text>
    </svg>
  );
}
