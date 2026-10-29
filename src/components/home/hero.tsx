import {
  ArrowElbowDownLeftIcon,
  CheckIcon,
  ChartLineUpIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";
import { urlFor } from "@/sanity/image";
import type { HomeQueryResult } from "@/sanity/types";

type HeroContent = NonNullable<NonNullable<HomeQueryResult["home"]>["hero"]>;

interface HeroProps {
  hero: HeroContent;
}

const Hero: FC<HeroProps> = ({ hero }) => (
  <section className="relative overflow-hidden p-6 lg:p-16">
    <span
      aria-hidden
      className="absolute -end-48 top-10 size-64 rounded-full bg-brand opacity-20 blur-glow lg:hidden"
    />
    <span
      aria-hidden
      className="absolute -start-52 top-90 size-64 rounded-full bg-tertiary-500 opacity-15 blur-glow lg:hidden"
    />
    <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start">
      <div className="flex flex-col gap-3 lg:flex-1">
        {hero.badge && (
          <Badge
            icon={<SparkleIcon aria-hidden weight="duotone" />}
            className="uppercase"
          >
            {hero.badge}
          </Badge>
        )}
        <h1 className="pt-2 font-serif text-display-sm lg:pt-3 lg:text-display">
          <EmphasisText
            text={hero.heading?.text ?? ""}
            emphasis={hero.heading?.emphasis}
          />
        </h1>
        <p className="text-body-md text-body lg:py-3 lg:text-body-xl">
          {hero.body}
        </p>
        <div className="flex flex-col gap-1 pt-3">
          <div className="flex flex-col gap-4 lg:flex-row">
            {hero.primary && (
              <TrackedButton
                href={hero.primary.href!}
                event="cta_click"
                label="home_hero_primary"
                className="min-h-10 px-2 text-button-sm lg:min-h-14 lg:px-5 lg:py-4 lg:text-button-lg [&_svg]:size-5 lg:[&_svg]:size-6"
              >
                {hero.primary.label}
                <ArrowElbowDownLeftIcon aria-hidden weight="duotone" />
              </TrackedButton>
            )}
            {hero.secondary && (
              <TrackedButton
                href={hero.secondary.href!}
                event="cta_click"
                label="home_hero_secondary"
                look="outline"
                variant="secondary"
                className="min-h-10 px-2 text-button-sm lg:min-h-14 lg:px-5 lg:py-4 lg:text-button-lg"
              >
                <EmphasisText
                  text={hero.secondary.label!}
                  emphasis="Quillmesh"
                  className="font-bold text-ink"
                />
              </TrackedButton>
            )}
          </div>
          {hero.footnote && (
            <p className="text-body-xs text-brand italic lg:text-body-sm">
              <span className="text-red-500">*</span>
              {hero.footnote.replace(/^\*/, "")}
            </p>
          )}
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center lg:flex">
        <div className="relative flex h-125 w-120 flex-col justify-end rounded-card p-8 pb-4">
          {hero.image?.asset ? (
            <Image
              src={urlFor(hero.image).width(960).height(1000).url()}
              alt={hero.image.alt ?? ""}
              fill
              priority
              sizes="480px"
              className="rounded-card object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 rounded-card bg-linear-to-br from-primary-300 via-primary-700 to-panel"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0 rounded-card bg-linear-to-t from-ink/60 to-transparent to-50%"
          />
          <div className="absolute end-4 top-4 flex w-45 flex-col gap-3 rounded-card border border-white/40 bg-surface/80 p-4 shadow-card backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-green-50 text-green-500">
                <ChartLineUpIcon aria-hidden className="size-4" />
              </span>
              <span className="text-body-sm font-bold uppercase">
                {hero.statLabel}
              </span>
            </div>
            <p className="flex flex-col">
              <span className="font-serif text-h3 font-bold text-green-500">
                {hero.statValue}
              </span>
              <span className="text-body-xs">{hero.statCaption}</span>
            </p>
          </div>
          <div className="relative -mx-11.5 flex flex-col gap-3 rounded-card border border-white/10 bg-panel/85 p-4 text-surface backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-green-500">
                <CheckIcon aria-hidden weight="bold" className="size-4" />
              </span>
              <span className="flex-1 text-body-sm">{hero.progressLabel}</span>
              <span className="font-serif text-h5 font-bold">
                {hero.progressValue}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={hero.progressLabel}
              aria-valuenow={hero.progressValue}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-1 overflow-hidden rounded-full bg-subtle/20"
            >
              <div
                className="h-full rounded-full bg-canvas"
                style={{ width: `${hero.progressValue}%` }}
              />
            </div>
            <p className="text-center text-body-xs text-secondary-500 italic">
              {hero.proofLine}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
