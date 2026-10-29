import type { FC } from "react";

import NewsletterForm from "@/components/forms/newsletter-form";
import type { SettingsQueryResult } from "@/sanity/types";

import DarkPanel from "./dark-panel";

type NewsletterContent = NonNullable<
  NonNullable<SettingsQueryResult>["newsletter"]
>;

interface NewsletterProps {
  content: NewsletterContent;
  variant?: "panel" | "blue" | "light";
}

const Newsletter: FC<NewsletterProps> = ({ content, variant = "panel" }) => {
  if (variant !== "panel") {
    const isBlue = variant === "blue";
    return (
      <section
        aria-label="Newsletter"
        className={
          isBlue
            ? "flex flex-col justify-center gap-4 rounded-card bg-radial from-primary-700 to-primary-500 p-8 text-surface"
            : "flex flex-col gap-4 rounded-card border border-line bg-linear-to-b from-surface via-surface to-secondary-50 p-8"
        }
      >
        <p className="text-body-xs uppercase">{content.eyebrow}</p>
        <h2 className="font-serif text-h4 font-medium">{content.heading}</h2>
        <p className="text-body-xs">{content.body}</p>
        <NewsletterForm tone={isBlue ? "blue" : "light"} />
      </section>
    );
  }

  return (
    <section aria-label="Newsletter">
      <DarkPanel className="px-6 py-12 text-center lg:px-12">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
          <p className="text-body-xs uppercase tracking-widest text-neutral-300">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-h4 font-medium lg:text-h3 lg:font-medium">
            {content.heading}
          </h2>
          <p className="text-body-sm text-neutral-300">{content.body}</p>
          <NewsletterForm tone="dark" />
        </div>
      </DarkPanel>
    </section>
  );
};

export default Newsletter;
