import { HeadsetIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import EmphasisText from "@/components/ui/emphasis-text";
import type { SettingsQueryResult } from "@/sanity/types";

import DarkPanel from "./dark-panel";

type CtaContent = NonNullable<NonNullable<SettingsQueryResult>["ctaPanel"]>;

interface CtaPanelProps {
  content: CtaContent;
  source: string;
}

const CtaPanel: FC<CtaPanelProps> = ({ content, source }) => (
  <section
    aria-labelledby="cta-heading"
    className="flex justify-center p-6 lg:p-16"
  >
    <DarkPanel className="w-full max-w-250 px-6 py-12 lg:p-16">
      <div className="flex flex-col items-center gap-16">
        <div className="flex max-w-150 flex-col items-center gap-5 text-center">
          <h2
            id="cta-heading"
            className="font-serif text-h3 font-medium lg:text-h2 lg:font-medium"
          >
            <EmphasisText
              text={content.heading?.text ?? ""}
              emphasis={content.heading?.emphasis}
              className="font-bold text-surface"
            />
          </h2>
          <div className="flex w-full flex-col items-center gap-2 pt-3">
            <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row">
              {content.primary && (
                <TrackedButton
                  href={content.primary.href!}
                  event="cta_click"
                  label={`${source}_cta_primary`}
                  size="lg"
                >
                  {content.primary.label}
                </TrackedButton>
              )}
              {content.secondary && (
                <TrackedButton
                  href={content.secondary.href!}
                  event="cta_click"
                  label={`${source}_cta_secondary`}
                  look="outline"
                  variant="mono"
                  size="lg"
                  className="border-surface text-surface hover:bg-neutral-800"
                >
                  {content.secondary.label}
                  <HeadsetIcon aria-hidden />
                </TrackedButton>
              )}
            </div>
            {content.note && (
              <p className="text-body-sm text-primary-200 italic">
                {content.note}
              </p>
            )}
          </div>
        </div>
        {content.quote && (
          <figure className="flex w-full flex-col items-center gap-4 lg:flex-row">
            <blockquote className="flex-1 text-body-sm">
              {content.quote}
            </blockquote>
            <figcaption className="flex w-60 flex-col items-center">
              <span className="text-body-sm font-bold uppercase">
                {content.quoteName}
              </span>
              <span className="text-body-xs uppercase">
                {content.quoteRole}
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </DarkPanel>
  </section>
);

export default CtaPanel;
