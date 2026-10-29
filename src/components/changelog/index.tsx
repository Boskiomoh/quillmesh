import {
  BugIcon,
  CheckCircleIcon,
  ClockCounterClockwiseIcon,
  LightningIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import CtaPanel from "@/components/sections/cta-panel";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { ReleasesQueryResult, SettingsQueryResult } from "@/sanity/types";

const groupLooks: Record<
  string,
  { heading: string; icon: FC<{ className?: string }> }
> = {
  "New features": {
    heading: "text-brand",
    icon: (props) => <CheckCircleIcon {...props} />,
  },
  Improvements: {
    heading: "text-green-500",
    icon: (props) => <TrendUpIcon {...props} />,
  },
  "Bug fixes": {
    heading: "text-red-500",
    icon: (props) => <BugIcon {...props} />,
  },
  "Core infrastructure": {
    heading: "text-brand",
    icon: (props) => <LightningIcon {...props} />,
  },
};

interface ChangelogProps {
  releases: ReleasesQueryResult;
  settings: SettingsQueryResult;
}

const Changelog: FC<ChangelogProps> = ({ releases, settings }) => (
  <>
    <section className="p-6 lg:p-16">
      <div className="flex flex-col gap-6 pt-4 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex flex-col gap-2 lg:w-178">
          <Badge
            icon={<ClockCounterClockwiseIcon aria-hidden weight="duotone" />}
            className="uppercase"
          >
            Changelog
          </Badge>
          <h1 className="font-serif text-display-sm lg:text-display">
            What&apos;s new in Quillmesh
          </h1>
          <span aria-hidden className="h-1 w-32 bg-brand" />
        </div>
        <p className="text-body-md text-body lg:w-100">
          How Quillmesh has changed, release by release. Sample release notes
          for this case study.
        </p>
      </div>

      <ol className="relative flex flex-col gap-12 py-16 before:absolute before:inset-y-0 before:start-2 before:border-s-2 before:border-dashed before:border-primary-100 lg:before:start-1/2">
        {releases.map((release, index) => {
          const isCurrent = index === 0;
          const isFlipped = index % 2 === 1;
          return (
            <li
              key={release._id}
              className="relative grid gap-5 ps-8 lg:grid-cols-2 lg:gap-10 lg:ps-0"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute start-0 top-2 size-4 rounded-full lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2",
                  isCurrent
                    ? "bg-brand ring-4 ring-primary-100"
                    : "bg-neutral-200",
                )}
              />
              <header
                className={cn(
                  "flex flex-col gap-2",
                  isFlipped ? "lg:order-2" : "lg:items-end lg:text-end",
                )}
              >
                <Badge tone={isCurrent ? "tertiary" : "secondary"}>
                  {release.version}
                  {release.label && ` - ${release.label}`}
                </Badge>
                <h2 className="pt-2 font-serif text-h3 font-medium italic lg:text-h2 lg:font-medium">
                  {release.title}
                </h2>
                <p className="text-body-md text-muted">{release.released}</p>
              </header>
              <div
                className={cn(
                  "flex flex-col gap-8 rounded-card border border-line p-8",
                  isCurrent
                    ? "bg-radial from-white to-surface shadow-card"
                    : "bg-neutral-200 shadow-sm",
                  isFlipped && "lg:order-1",
                )}
              >
                {release.groups?.map((group) => {
                  const look =
                    groupLooks[group.kind ?? ""] ?? groupLooks["New features"];
                  const Icon = look.icon;
                  return (
                    <section key={group._key} className="flex flex-col gap-4">
                      <h3
                        className={cn("text-body-sm uppercase", look.heading)}
                      >
                        {group.kind}
                      </h3>
                      {group.kind === "Core infrastructure" &&
                        release.summary && (
                          <p className="text-body-md text-body">
                            {release.summary}
                          </p>
                        )}
                      <ul className="flex flex-col gap-3">
                        {group.items?.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-body-md text-body"
                          >
                            <Icon
                              className={cn(
                                "mt-0.5 size-6 shrink-0",
                                look.heading,
                              )}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
    {settings?.ctaPanel && (
      <CtaPanel content={settings.ctaPanel} source="changelog" />
    )}
  </>
);

export default Changelog;
