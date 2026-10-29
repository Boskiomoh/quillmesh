import { cacheLife } from "next/cache";
import type { FC } from "react";

import { leadsClient } from "@/sanity/write-client";

const resultsQuery = `{
  "a": {
    "views": count(*[_type == "event" && event == "page_view" && label == "lp_automate_a"]),
    "clicks": count(*[_type == "event" && event == "cta_click" && label match "lp_automate_a*"]),
    "requests": count(*[_type == "lead" && source match "lp/automate/a*"])
  },
  "b": {
    "views": count(*[_type == "event" && event == "page_view" && label == "lp_automate_b"]),
    "clicks": count(*[_type == "event" && event == "cta_click" && label match "lp_automate_b*"]),
    "requests": count(*[_type == "lead" && source match "lp/automate/b*"])
  }
}`;

type Counts = Record<
  "a" | "b",
  { views: number; clicks: number; requests: number }
>;

const loadResults = async () => {
  "use cache";
  cacheLife("minutes");
  return leadsClient.fetch<Counts>(resultsQuery);
};

const rate = (part: number, whole: number) =>
  whole ? `${((part / whole) * 100).toFixed(1)}%` : "–";

const AbResults: FC = async () => {
  const results = await loadResults();

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="A/B results table"
      className="overflow-x-auto"
    >
      <table className="w-full min-w-120 text-start text-body-sm">
        <caption className="pb-3 text-start text-body-xs text-muted">
          Live from the private dataset, refreshed every few minutes. Visitors
          who choose &ldquo;Essential only&rdquo; aren&apos;t counted in views
          or clicks.
        </caption>
        <thead>
          <tr className="border-b border-line text-body-xs text-muted uppercase">
            <th scope="col" className="py-2 pe-4 text-start font-normal">
              Variant
            </th>
            <th scope="col" className="py-2 pe-4 text-end font-normal">
              Views
            </th>
            <th scope="col" className="py-2 pe-4 text-end font-normal">
              CTA clicks
            </th>
            <th scope="col" className="py-2 pe-4 text-end font-normal">
              Click rate
            </th>
            <th scope="col" className="py-2 text-end font-normal">
              Demo requests
            </th>
          </tr>
        </thead>
        <tbody>
          {(["a", "b"] as const).map((variant) => (
            <tr key={variant} className="border-b border-line">
              <th scope="row" className="py-3 pe-4 text-start font-bold">
                {variant === "a" ? "A: outcome headline" : "B: proof headline"}
              </th>
              <td className="py-3 pe-4 text-end">{results[variant].views}</td>
              <td className="py-3 pe-4 text-end">{results[variant].clicks}</td>
              <td className="py-3 pe-4 text-end">
                {rate(results[variant].clicks, results[variant].views)}
              </td>
              <td className="py-3 text-end">{results[variant].requests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbResults;
