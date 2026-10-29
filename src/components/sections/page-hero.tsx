import { ArrowUpRightIcon, NotebookIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC, ReactNode } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";

interface PageHeroProps {
  badge?: string | null;
  heading:
    { text?: string | null; emphasis?: string | null } | null | undefined;
  body?: string | null;
  primary?: { label?: string | null; href?: string | null } | null;
  secondary?: { label?: string | null; href?: string | null } | null;
  source: string;
  children?: ReactNode;
}

const PageHero: FC<PageHeroProps> = ({
  badge,
  heading,
  body,
  primary,
  secondary,
  source,
  children,
}) => (
  <section className="p-6 lg:p-16">
    <div className="mx-auto flex max-w-220 flex-col items-start gap-3 text-start lg:items-center lg:text-center">
      {badge && (
        <Badge
          icon={<NotebookIcon aria-hidden weight="duotone" />}
          className="uppercase"
        >
          {badge}
        </Badge>
      )}
      <h1 className="pt-3 font-serif text-display-sm lg:text-display">
        <EmphasisText
          text={heading?.text ?? ""}
          emphasis={heading?.emphasis ?? undefined}
        />
      </h1>
      {body && (
        <p className="py-3 text-body-sm text-body lg:text-body-xl">
          <EmphasisText
            text={body}
            emphasis="Quillmesh"
            className="font-bold text-ink"
          />
        </p>
      )}
      {(primary || secondary) && (
        <div className="flex w-full flex-col justify-center gap-4 pt-3 lg:flex-row">
          {primary?.href && (
            <TrackedButton
              href={primary.href}
              event="cta_click"
              label={`${source}_hero_primary`}
              size="sm"
              className="lg:min-h-14 lg:px-5 lg:py-4 lg:text-button-lg lg:[&_svg]:size-6"
            >
              {primary.label}
              <ArrowUpRightIcon aria-hidden />
            </TrackedButton>
          )}
          {secondary?.href && (
            <TrackedButton
              href={secondary.href}
              event="cta_click"
              label={`${source}_hero_secondary`}
              look="outline"
              variant="secondary"
              size="sm"
              className="lg:min-h-14 lg:px-5 lg:py-4 lg:text-button-lg"
            >
              {secondary.label}
            </TrackedButton>
          )}
        </div>
      )}
    </div>
    {children}
  </section>
);

export default PageHero;
