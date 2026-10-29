import {
  ArrowUpRightIcon,
  BrainIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import { TerminalVisual } from "@/components/sections/feature-visuals";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";
import type { FeaturesQueryResult } from "@/sanity/types";

type LogicContent = NonNullable<
  NonNullable<FeaturesQueryResult["page"]>["logic"]
>;

interface LogicLayersProps {
  content: LogicContent;
}

const LogicLayers: FC<LogicLayersProps> = ({ content }) => (
  <section className="flex flex-col gap-10 p-6 lg:flex-row lg:p-16">
    <div className="relative flex flex-1 items-center justify-center lg:min-h-109">
      <div className="w-full lg:w-127">
        <TerminalVisual />
      </div>
      <figure className="absolute -bottom-6 start-0 w-80 max-w-full rounded-card border border-white/20 bg-neutral-900/80 p-4 text-surface backdrop-blur-md lg:bottom-0">
        <figcaption className="text-body-xs font-bold italic">
          {content.codeLabel}
        </figcaption>
        <blockquote className="mt-3 text-body-sm">
          {content.codeQuote}
        </blockquote>
      </figure>
    </div>
    <div className="flex flex-1 flex-col gap-6 pt-6 lg:pt-0">
      <Badge
        tone="secondary"
        icon={<BrainIcon aria-hidden weight="duotone" />}
        className="uppercase"
      >
        {content.badge}
      </Badge>
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-h4 font-bold whitespace-pre-line lg:text-h3 lg:font-bold">
          {content.heading}
        </h2>
        <p className="text-body-md text-body">
          <EmphasisText
            text={content.body ?? ""}
            emphasis="Quillmesh"
            className="font-bold text-ink"
          />
        </p>
      </div>
      <ul className="flex flex-col gap-3 py-2">
        {content.examples?.map((example) => (
          <li key={example} className="flex gap-3 text-body-sm text-body">
            <CheckCircleIcon
              aria-hidden
              className="size-6 shrink-0 text-brand"
            />
            {example}
          </li>
        ))}
      </ul>
      {content.link?.href && (
        <TrackedButton
          href={content.link.href}
          event="cta_click"
          label="features_browse_templates"
          look="outline"
          variant="secondary"
          size="lg"
          className="self-start"
        >
          {content.link.label}
          <ArrowUpRightIcon aria-hidden />
        </TrackedButton>
      )}
    </div>
  </section>
);

export default LogicLayers;
