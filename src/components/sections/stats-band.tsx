import { HeadsetIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import type { SettingsQueryResult } from "@/sanity/types";

type StatsContent = NonNullable<NonNullable<SettingsQueryResult>["stats"]>;

interface StatsBandProps {
  stats: StatsContent;
  hasActions?: boolean;
}

const StatsBand: FC<StatsBandProps> = ({ stats, hasActions }) => (
  <section
    aria-labelledby="stats-heading"
    className="bg-primary-50 p-6 lg:px-16 lg:py-10"
  >
    <div className="flex flex-col items-center gap-6 py-6 lg:py-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2
          id="stats-heading"
          className="font-serif text-h3 font-medium lg:text-h2 lg:font-medium"
        >
          {stats.heading}
        </h2>
        <p className="max-w-148 text-body-sm text-body lg:text-body-md">
          {stats.body}
        </p>
      </div>
      <dl className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {stats.items?.map((item) => (
          <div
            key={item._key}
            className="flex flex-col-reverse items-center gap-1 rounded-card border border-line bg-surface px-4 py-6 text-center lg:py-8"
          >
            <dt className="text-body-sm lg:text-body-md">{item.label}</dt>
            <dd className="font-serif text-h3 font-bold text-brand lg:text-h1 lg:font-bold">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {hasActions && (
        <div className="flex w-full flex-col items-center gap-2 pt-3">
          <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row">
            <TrackedButton
              href="/demo"
              event="cta_click"
              label="stats_create_account"
              size="lg"
            >
              Create an Account
            </TrackedButton>
            <TrackedButton
              href="/demo?topic=sales"
              event="cta_click"
              label="stats_talk_to_team"
              look="outline"
              variant="secondary"
              size="lg"
            >
              Talk to our team instead
              <HeadsetIcon aria-hidden />
            </TrackedButton>
          </div>
          {stats.note && (
            <p className="text-center text-body-xs italic">
              <span className="text-red-500">*</span>
              {stats.note.replace(/^\*/, "")}
            </p>
          )}
        </div>
      )}
    </div>
  </section>
);

export default StatsBand;
