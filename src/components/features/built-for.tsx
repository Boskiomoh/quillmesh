import {
  BooksIcon,
  CheckCircleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";
import type { FeaturesQueryResult } from "@/sanity/types";

type BuiltForContent = NonNullable<
  NonNullable<FeaturesQueryResult["page"]>["builtFor"]
>;

const codeWall = [
  "on stripe.invoice.payment_failed",
  '  when customer.plan == "pro"',
  '  then hubspot.task(owner, "Call before day 3")',
  '  then slack.notify("#billing", invoice)',
  "on github.pull_request.merged",
  "  then linear.close(issue_refs)",
  "  then notion.append(changelog, title)",
  "on jira.user.offboarded",
  "  then okta.suspend(user) + revoke(apps)",
  "retry 3 x backoff(30s) on_fail page(owner)",
  'log.full_payload(redact: ["email"])',
  "replay run_9f31 from step 4",
];

interface BuiltForProps {
  content: BuiltForContent;
}

const BuiltFor: FC<BuiltForProps> = ({ content }) => (
  <section className="p-6 lg:p-16">
    <div className="flex flex-col-reverse overflow-hidden rounded-card bg-linear-to-b from-panel to-neutral-900 lg:flex-row">
      <div className="flex flex-col gap-6 p-5 text-surface lg:w-1/2 lg:px-8 lg:py-16">
        <Badge
          tone="secondary"
          icon={<UsersThreeIcon aria-hidden weight="duotone" />}
          className="uppercase"
        >
          {content.badge}
        </Badge>
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-h4 font-bold lg:text-h3 lg:font-bold">
            {content.heading}
          </h2>
          <p className="text-body-xs lg:text-body-md">
            <EmphasisText
              text={content.body ?? ""}
              emphasis="Quillmesh"
              className="font-bold text-surface"
            />
          </p>
        </div>
        <ul className="flex flex-col gap-3 py-2">
          {content.points?.map((point) => (
            <li key={point} className="flex gap-3 text-body-xs lg:text-body-sm">
              <CheckCircleIcon
                aria-hidden
                className="size-6 shrink-0 text-secondary-500"
              />
              {point}
            </li>
          ))}
        </ul>
        {content.link?.href && (
          <TrackedButton
            href={content.link.href}
            event="cta_click"
            label="features_template_library"
            look="outline"
            variant="mono"
            size="sm"
            className="w-full border-surface text-surface hover:bg-neutral-800 lg:w-auto lg:self-start lg:min-h-14 lg:px-5 lg:py-4 lg:text-button-lg"
          >
            {content.link.label}
            <BooksIcon aria-hidden />
          </TrackedButton>
        )}
      </div>
      <div
        aria-hidden
        className="relative h-72 overflow-hidden bg-panel lg:h-auto lg:w-1/2"
      >
        <pre className="absolute -inset-10 -rotate-12 font-mono text-body-sm leading-8">
          {codeWall.map((line, index) => (
            <span
              key={index}
              className={
                index % 3 === 0
                  ? "block text-secondary-400"
                  : "block text-tertiary-300/80"
              }
            >
              {line}
            </span>
          ))}
        </pre>
        <span className="absolute inset-0 bg-linear-to-l from-transparent to-panel/80" />
      </div>
    </div>
  </section>
);

export default BuiltFor;
