import type { SVGProps } from "react";
import type { UseCaseId } from "@/content/workflow";

type IconProps = SVGProps<SVGSVGElement>;

const stroke: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function Logo(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <rect width="32" height="32" rx="9" className="fill-brand" />
      <g stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none">
        <circle cx="10" cy="9" r="2.4" fill="#fff" />
        <circle cx="22" cy="16" r="2.4" fill="#fff" />
        <circle cx="10" cy="23" r="2.4" fill="#fff" />
        <path d="M12.4 9h4.2a5.4 5.4 0 0 1 3 5.4M12.4 23h4.2a5.4 5.4 0 0 0 3-5.4" />
      </g>
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function UseCaseIcon({ id, ...props }: IconProps & { id: UseCaseId }) {
  switch (id) {
    case "feature":
      return (
        <svg {...stroke} {...props}>
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
        </svg>
      );
    case "bug":
      return (
        <svg {...stroke} {...props}>
          <path d="M8 8a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V8z" />
          <path d="M12 8v10M4 10l4 1M20 10l-4 1M4 17l4-1M20 17l-4-1M9 4l1.5 2M15 4l-1.5 2" />
        </svg>
      );
    case "perf":
      return (
        <svg {...stroke} {...props}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "review":
      return (
        <svg {...stroke} {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3M8 11l2 2 4-4" />
        </svg>
      );
  }
}
