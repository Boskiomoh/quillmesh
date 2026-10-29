import {
  BrainIcon,
  CheckCircleIcon,
  ChartBarIcon,
  LockKeyIcon,
  PaletteIcon,
  PlugsConnectedIcon,
  RecycleIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC, ReactNode } from "react";

import Badge, { type BadgeTone } from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";
import { cn } from "@/lib/cn";
import type { HomeQueryResult } from "@/sanity/types";

import { AnalyticsVisual, TerminalVisual } from "./feature-visuals";
import SectionIntro from "./section-intro";

type FeatureGridContent = NonNullable<
  NonNullable<HomeQueryResult["home"]>["featureGrid"]
>;

const looks: { tone: BadgeTone; icon: ReactNode; badgeClass?: string }[] = [
  { tone: "primary", icon: <ChartBarIcon aria-hidden weight="duotone" /> },
  {
    tone: "success",
    icon: <RecycleIcon aria-hidden weight="duotone" />,
    badgeClass: "bg-surface",
  },
  { tone: "tertiary", icon: <BrainIcon aria-hidden weight="duotone" /> },
  {
    tone: "warning",
    icon: <PaletteIcon aria-hidden weight="duotone" />,
    badgeClass: "bg-secondary-50",
  },
  {
    tone: "success",
    icon: <PlugsConnectedIcon aria-hidden weight="duotone" />,
  },
  { tone: "danger", icon: <LockKeyIcon aria-hidden weight="duotone" /> },
];

const surfaces = {
  plain: "border-line bg-surface",
  brand:
    "relative overflow-hidden border-brand bg-brand text-surface shadow-card",
  accent: "border-secondary-500 bg-secondary-500",
} as const;

interface CardProps {
  index: number;
  surface?: keyof typeof surfaces;
  eyebrow?: string | null;
  title?: string | null;
  className?: string;
  children?: ReactNode;
}

const Card: FC<CardProps> = ({
  index,
  surface = "plain",
  eyebrow,
  title,
  className,
  children,
}) => (
  <article
    className={cn(
      "flex flex-col gap-4 rounded-card border p-4 lg:gap-6 lg:p-8",
      surfaces[surface],
      className,
    )}
  >
    <div className="flex flex-col gap-4">
      {eyebrow && (
        <Badge
          tone={looks[index].tone}
          icon={looks[index].icon}
          className={cn(
            "uppercase lg:gap-2 lg:py-2 lg:text-body-sm",
            looks[index].badgeClass,
          )}
        >
          {eyebrow}
        </Badge>
      )}
      <h3 className="font-serif text-h5 font-medium lg:text-h3 lg:font-medium">
        {title}
      </h3>
      {children}
    </div>
  </article>
);

interface FeatureGridProps {
  content: FeatureGridContent;
}

const FeatureGrid: FC<FeatureGridProps> = ({ content }) => {
  // Derived
  const cards = content.cards ?? [];
  const [analytics, recovery, signals, builder, integrations, access] = cards;

  return (
    <section className="p-6 lg:p-16">
      <div className="flex flex-col gap-12 pt-4">
        <SectionIntro
          title={content.heading?.text}
          badge={content.badge ?? undefined}
          badgeIcon={<SparkleIcon aria-hidden weight="duotone" />}
          intro={content.intro ?? undefined}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {analytics && (
            <Card
              index={0}
              eyebrow={analytics.eyebrow}
              title={analytics.title}
              className="order-1 lg:order-none lg:col-span-2"
            >
              <p className="text-body-sm text-body lg:text-body-md">
                {analytics.body}
              </p>
              <AnalyticsVisual />
            </Card>
          )}
          {recovery && (
            <Card
              index={1}
              eyebrow={recovery.eyebrow}
              title={recovery.title}
              surface="brand"
              className="order-2 lg:order-none"
            >
              <svg
                aria-hidden
                viewBox="0 0 360 120"
                className="absolute -top-2 start-0 w-full text-surface/10"
              >
                <path
                  d="M0 0 C 90 0, 140 110, 190 110 S 300 0, 360 -10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="28"
                />
              </svg>
              <p className="relative text-body-sm lg:text-body-md">
                {recovery.body}
              </p>
              <svg
                aria-hidden
                viewBox="0 0 300 80"
                className="-mb-6 w-full lg:-mb-12"
              >
                <text
                  x="0"
                  y="70"
                  className="fill-surface/20 font-serif text-mega font-bold"
                >
                  {content.recoveryStat}
                </text>
              </svg>
            </Card>
          )}
          {signals && (
            <article className="order-4 flex flex-col-reverse gap-4 rounded-card border border-line bg-surface p-4 lg:order-none lg:col-span-3 lg:flex-row lg:items-center lg:gap-6 lg:p-8">
              <div className="flex flex-1 flex-col gap-4">
                <Badge
                  tone="tertiary"
                  icon={looks[2].icon}
                  className="uppercase lg:gap-2 lg:py-2 lg:text-body-sm"
                >
                  {signals.eyebrow}
                </Badge>
                <h3 className="font-serif text-h5 font-medium whitespace-pre-line lg:text-h3 lg:font-medium">
                  {signals.title}
                </h3>
                <p className="text-body-sm text-body lg:text-body-md">
                  <EmphasisText
                    text={signals.body ?? ""}
                    emphasis="Quillmesh"
                    className="font-bold text-ink"
                  />
                </p>
                <ul className="flex flex-wrap gap-6 pt-2">
                  {content.signalTags?.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center gap-2 text-body-sm text-ink"
                    >
                      <CheckCircleIcon
                        aria-hidden
                        className="size-5 text-brand"
                      />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <TerminalVisual />
            </article>
          )}
          {builder && (
            <Card
              index={3}
              surface="accent"
              eyebrow={builder.eyebrow}
              title={builder.title}
              className="order-5 lg:order-none"
            >
              <p className="text-body-sm text-ink lg:text-body-md">
                {builder.body}
              </p>
            </Card>
          )}
          {integrations && (
            <Card
              index={4}
              eyebrow={integrations.eyebrow}
              title={integrations.title}
              className="order-3 lg:order-none"
            >
              <p className="text-body-sm text-ink lg:text-body-md">
                {integrations.body}
              </p>
            </Card>
          )}
          {access && (
            <Card
              index={5}
              eyebrow={access.eyebrow}
              title={access.title}
              className="order-6 lg:order-none"
            >
              <p className="text-body-sm text-body lg:text-body-md">
                {access.body}
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
