import {
  CheckCircleIcon,
  QuotesIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import PageView from "@/components/analytics/page-view";
import TrackedButton from "@/components/analytics/tracked-button";
import DemoForm from "@/components/forms/demo-form";
import FaqSection from "@/components/sections/faq-section";
import Avatar from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";
import type {
  LandingExtrasQueryResult,
  LandingQueryResult,
} from "@/sanity/types";

interface LandingProps {
  landing: LandingQueryResult;
  extras: LandingExtrasQueryResult;
  variant: string;
}

const Landing: FC<LandingProps> = ({
  landing,
  extras: { home, faqs },
  variant,
}) => {
  // Derived
  const cards =
    home?.featureGrid?.cards?.slice(1, 5).filter((_, index) => index !== 1) ??
    [];
  const quote = home?.testimonials?.featured;

  return (
    <>
      <PageView label={`lp_automate_${variant}`} />
      <section className="relative overflow-hidden p-6 lg:px-16 lg:py-20">
        <span
          aria-hidden
          className="absolute -end-32 -top-20 size-80 rounded-full bg-brand opacity-15 blur-glow"
        />
        <div className="relative mx-auto flex max-w-220 flex-col items-center gap-4 text-center">
          {landing?.badge && (
            <Badge
              icon={<SparkleIcon aria-hidden weight="duotone" />}
              className="uppercase"
            >
              {landing.badge}
            </Badge>
          )}
          <h1 className="font-serif text-display-sm lg:text-display">
            <EmphasisText
              text={landing?.heading?.text ?? ""}
              emphasis={landing?.heading?.emphasis ?? undefined}
            />
          </h1>
          <p className="max-w-160 text-body-md text-body lg:text-body-xl">
            {landing?.body}
          </p>
          {landing?.cta?.href && (
            <TrackedButton
              href="#request"
              event="cta_click"
              label={`lp_automate_${variant}_hero`}
              size="lg"
              className="mt-2"
            >
              {landing.cta.label}
            </TrackedButton>
          )}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
            {landing?.proofPoints?.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-body-sm text-body"
              >
                <CheckCircleIcon
                  aria-hidden
                  className="size-5 text-green-500"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-label="What you get"
        className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-3 lg:gap-8 lg:px-16"
      >
        {cards.map((card) => (
          <article
            key={card._key}
            className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 lg:p-8"
          >
            <p className="text-body-xs text-brand uppercase">{card.eyebrow}</p>
            <h2 className="font-serif text-h5 font-medium lg:text-h4 lg:font-medium">
              {card.title}
            </h2>
            <p className="text-body-sm text-body">{card.body}</p>
          </article>
        ))}
      </section>

      {quote && (
        <figure className="mx-6 my-12 flex flex-col gap-6 rounded-card bg-primary-50 p-8 lg:mx-16 lg:flex-row lg:items-center lg:p-12">
          <QuotesIcon
            aria-hidden
            weight="fill"
            className="size-10 shrink-0 text-brand"
          />
          <blockquote className="flex-1 font-serif text-h5 font-medium lg:text-h4 lg:font-medium">
            {quote.quote}
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <Avatar name={quote.name ?? ""} />
            <span className="flex flex-col">
              <span className="text-body-sm font-bold">{quote.name}</span>
              <span className="text-body-xs text-muted">
                Sample testimonial
              </span>
            </span>
          </figcaption>
        </figure>
      )}

      <section
        id="request"
        aria-labelledby="request-heading"
        className="scroll-mt-6 px-6 lg:px-16"
      >
        <div className="mx-auto flex max-w-220 flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-card lg:p-10">
          <h2 id="request-heading" className="font-serif text-h3 font-medium">
            {landing?.cta?.label}
          </h2>
          <DemoForm
            source={`lp/automate/${variant}`}
            submitLabel={landing?.cta?.label ?? undefined}
          />
        </div>
      </section>

      <FaqSection
        heading="Before you ask"
        intro="Three questions most teams ask first."
        faqs={faqs}
      />
    </>
  );
};

export default Landing;
