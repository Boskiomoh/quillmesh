import type { FC } from "react";

const bars = [38, 52, 44, 70, 58, 82, 64, 90, 76, 60, 86, 72, 94, 68, 80, 56];
const nodes = [
  [18, 40],
  [30, 32],
  [44, 46],
  [52, 30],
  [63, 52],
  [74, 38],
  [86, 48],
] as const;

export const AnalyticsVisual: FC = () => (
  <figure className="relative h-22 overflow-hidden rounded-card bg-tertiary-900 lg:h-48.5">
    <svg
      aria-hidden
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      <defs>
        <pattern
          id="analytics-dots"
          width="2"
          height="2"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.28" className="fill-tertiary-400/30" />
        </pattern>
      </defs>
      <rect width="100" height="60" fill="url(#analytics-dots)" />
      <polyline
        points={nodes.map(([x, y]) => `${x},${y}`).join(" ")}
        className="fill-none stroke-tertiary-300"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      {nodes.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="0.9" className="fill-tertiary-200" />
      ))}
    </svg>
    <div
      aria-hidden
      className="absolute inset-x-6 bottom-0 flex h-1/2 items-end gap-1.5"
    >
      {bars.map((height, index) => (
        <span
          key={index}
          className="flex-1 rounded-t-sm bg-linear-to-t from-tertiary-500/10 to-tertiary-300/70"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
    <figcaption className="absolute start-6 top-5 flex flex-col text-tertiary-50">
      <span className="text-body-xs uppercase tracking-widest text-tertiary-200">
        Runs this week
      </span>
      <span className="font-serif text-h3 font-bold">48,210</span>
    </figcaption>
  </figure>
);

const code = [
  ["playbook", ' "route-new-signups" {'],
  ["  on", " stripe.customer.created"],
  ["  when", ' plan in ["pro", "enterprise"]'],
  ["  then", " hubspot.assign(owner: territory(region))"],
  ["  then", ' slack.notify("#sales", customer)'],
  ["  retry", " 3 x backoff(30s)"],
  ["  on_fail", " page(owner) + log.full_payload"],
  ["}", ""],
];

export const TerminalVisual: FC = () => (
  <figure className="w-full overflow-hidden rounded-card bg-tertiary-900 p-4 lg:h-77 lg:w-120 lg:p-6">
    <div className="h-full overflow-hidden rounded-control border border-neutral-700 bg-panel">
      <div
        aria-hidden
        className="flex gap-1.5 border-b border-neutral-700 px-3 py-2"
      >
        <span className="size-2 rounded-full bg-red-500" />
        <span className="size-2 rounded-full bg-secondary-500" />
        <span className="size-2 rounded-full bg-green-500" />
      </div>
      <pre
        tabIndex={0}
        className="overflow-x-auto p-4 font-mono text-body-xs text-neutral-300"
      >
        <code>
          {code.map(([keyword, rest], index) => (
            <span key={index} className="block">
              <span className="text-tertiary-300">{keyword}</span>
              {rest}
            </span>
          ))}
        </code>
      </pre>
    </div>
    <figcaption className="sr-only">
      An example Quillmesh playbook written as code
    </figcaption>
  </figure>
);
