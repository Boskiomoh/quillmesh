import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface DarkPanelProps {
  className?: string;
  children: ReactNode;
}

const DarkPanel: FC<DarkPanelProps> = ({ className, children }) => (
  <div
    className={cn(
      "relative isolate overflow-hidden rounded-card bg-radial from-panel to-panel-end text-surface",
      className,
    )}
  >
    <span
      aria-hidden
      className="absolute -end-16 -top-16 -z-10 size-64 rounded-full bg-brand opacity-20 blur-glow"
    />
    <span
      aria-hidden
      className="absolute -bottom-24 -start-16 -z-10 size-64 rounded-full bg-tertiary-500 opacity-15 blur-glow"
    />
    <svg
      aria-hidden
      viewBox="0 0 900 220"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 -z-10 size-full"
    >
      <g className="fill-none stroke-neutral-500/40">
        <ellipse
          cx="160"
          cy="210"
          rx="130"
          ry="90"
          transform="rotate(-30 160 210)"
        />
        <ellipse
          cx="200"
          cy="180"
          rx="70"
          ry="48"
          transform="rotate(-30 200 180)"
        />
        <ellipse
          cx="760"
          cy="60"
          rx="120"
          ry="80"
          transform="rotate(-35 760 60)"
        />
        <ellipse
          cx="800"
          cy="200"
          rx="140"
          ry="95"
          transform="rotate(-35 800 200)"
        />
      </g>
    </svg>
    {children}
  </div>
);

export default DarkPanel;
