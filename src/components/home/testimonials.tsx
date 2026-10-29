import { HeartIcon, QuotesIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import SectionIntro from "@/components/sections/section-intro";
import Avatar from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import type { HomeQueryResult } from "@/sanity/types";

type TestimonialsContent = NonNullable<
  NonNullable<HomeQueryResult["home"]>["testimonials"]
>;
type Testimonial = NonNullable<TestimonialsContent["items"]>[number];

const Quote: FC<{ item: Testimonial; isItalic: boolean }> = ({
  item,
  isItalic,
}) => (
  <figure className="flex w-70 shrink-0 snap-start flex-col justify-between gap-6 rounded-card border border-line bg-surface p-8 lg:w-auto">
    <blockquote className={cn("text-body-md", isItalic && "italic")}>
      {item.quote}
    </blockquote>
    <figcaption className="flex items-center gap-4">
      <Avatar name={item.name ?? ""} />
      <span className="flex flex-col">
        <span className="text-body-sm font-bold">{item.name}</span>
        <span className="text-body-xs uppercase text-muted">{item.role}</span>
      </span>
    </figcaption>
  </figure>
);

const Row: FC<{ items: Testimonial[]; offset: number }> = ({
  items,
  offset,
}) => (
  <div
    tabIndex={0}
    role="region"
    aria-label={
      offset === 0 ? "Testimonials, scroll sideways" : "More testimonials"
    }
    className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0"
  >
    {items.map((item, index) => (
      <Quote
        key={item._key}
        item={item}
        isItalic={[1, 2, 3, 4].includes(index + offset)}
      />
    ))}
  </div>
);

interface TestimonialsProps {
  content: TestimonialsContent;
}

const Testimonials: FC<TestimonialsProps> = ({ content }) => {
  // Derived
  const items = content.items ?? [];
  const featured = content.featured;

  return (
    <section className="flex flex-col gap-6 p-6 lg:gap-12 lg:p-16">
      <SectionIntro
        title={content.heading}
        badge={content.badge ?? undefined}
        badgeIcon={<HeartIcon aria-hidden weight="duotone" />}
        intro={content.intro ?? undefined}
      />
      <Row items={items.slice(0, 3)} offset={0} />
      {featured && (
        <figure className="hidden gap-12 py-6 lg:flex">
          <blockquote className="flex-1 text-justify font-serif text-h2 font-medium">
            {featured.quote}
          </blockquote>
          <figcaption className="flex w-60 flex-col gap-2">
            <Avatar
              name={featured.name ?? ""}
              size="md"
              className="ring-2 ring-brand ring-offset-2 ring-offset-canvas"
            />
            <span className="mt-2 font-serif text-h6 font-bold">
              {featured.name}
            </span>
            <span className="text-body-sm uppercase text-muted">
              {featured.role}
            </span>
            <span
              aria-hidden
              className="mt-2 inline-flex h-10 w-14 items-center justify-center rounded-full bg-brand text-surface"
            >
              <QuotesIcon weight="fill" className="size-6" />
            </span>
          </figcaption>
        </figure>
      )}
      <div className="hidden lg:block">
        <Row items={items.slice(3)} offset={3} />
      </div>
      {content.sampleNote && (
        <p className="text-center text-body-xs text-muted">
          {content.sampleNote}
        </p>
      )}
    </section>
  );
};

export default Testimonials;
