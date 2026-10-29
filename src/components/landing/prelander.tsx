import { ArrowRightIcon, NewspaperIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import PageView from "@/components/analytics/page-view";
import TrackedButton from "@/components/analytics/tracked-button";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";
import type { PrelanderQueryResult } from "@/sanity/types";

interface PrelanderProps {
  content: NonNullable<PrelanderQueryResult>;
}

const Prelander: FC<PrelanderProps> = ({ content }) => (
  <article className="mx-auto flex max-w-176 flex-col gap-6 p-6 lg:py-16">
    <PageView label="go_automate" />
    <Badge
      icon={<NewspaperIcon aria-hidden weight="duotone" />}
      className="uppercase"
    >
      {content.badge}
    </Badge>
    <h1 className="font-serif text-h1 font-medium lg:text-display-sm">
      <EmphasisText
        text={content.heading?.text ?? ""}
        emphasis={content.heading?.emphasis ?? undefined}
      />
    </h1>
    <p className="text-body-md text-body lg:text-body-lg">{content.intro}</p>
    <ol className="flex flex-col gap-6 py-2">
      {content.points?.map((point, index) => (
        <li key={point._key} className="flex gap-4">
          <span
            aria-hidden
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 font-serif text-h5 font-bold text-brand"
          >
            {index + 1}
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-h5 font-bold">{point.title}</h2>
            <p className="text-body-md text-body">{point.body}</p>
          </div>
        </li>
      ))}
    </ol>
    <p className="text-body-md font-bold">{content.closing}</p>
    {content.cta?.href && (
      <TrackedButton
        href={content.cta.href}
        event="cta_click"
        label="go_automate_continue"
        size="lg"
        className="self-start"
      >
        {content.cta.label}
        <ArrowRightIcon aria-hidden className="rtl:-scale-x-100" />
      </TrackedButton>
    )}
  </article>
);

export default Prelander;
