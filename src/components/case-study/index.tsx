import { ArrowUpRightIcon, FlaskIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Suspense, type FC, type ReactNode } from "react";

import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import EmphasisText from "@/components/ui/emphasis-text";

import report from "../../../public/fidelity/report.json";
import AbResults from "./ab-results";

const pages = [
  {
    key: "home",
    label: "Home",
    route: "/",
    note: "Copy rewritten for Quillmesh; photos are credited Unsplash images.",
  },
  {
    key: "features",
    label: "Features",
    route: "/features",
    note: "Stock code photos redrawn in code.",
  },
  {
    key: "about",
    label: "About",
    route: "/about",
    note: "Eight portrait photos replaced with initials: no real faces for fictional staff.",
  },
  {
    key: "pricing",
    label: "Pricing",
    route: "/pricing",
    note: "Closest to the frame: tokens, cards and FAQ only.",
  },
  {
    key: "blog",
    label: "Blog",
    route: "/blog",
    note: "Different photos and article lengths from Sanity.",
  },
  {
    key: "blog-detail",
    label: "Blog article",
    route: "/blog/the-future-of-digital-infrastructure-is-intentional",
    note: "Different article body; the frame's body text has stray line breaks.",
  },
  {
    key: "changelog",
    label: "Changelog",
    route: "/changelog",
    note: "Two frame cards overflow the page grid; kept inside it.",
  },
] as const;

const scoreOf = (name: string) =>
  report.pages.find((page) => page.name === name)?.match.tolerant;
const measuredOn = new Date(report.generatedAt).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const axeTotal = report.pages.reduce(
  (sum, page) => sum + ((page as { axe?: unknown[] }).axe?.length ?? 0),
  0,
);
const sweepOverflows = report.sweep.filter(
  (shot) => shot.overflowPx > 0,
).length;

const Section: FC<{ id: string; title: string; children: ReactNode }> = ({
  id,
  title,
  children,
}) => (
  <section
    aria-labelledby={id}
    className="flex flex-col gap-4 border-t border-line py-10"
  >
    <h2 id={id} className="font-serif text-h3 font-medium">
      {title}
    </h2>
    {children}
  </section>
);

const proofs = [
  {
    title: "SaaS launch site on a headless CMS",
    body: "Every page's copy, the pricing plans, FAQs, blog posts, changelog, legal pages and both A/B variants live in Sanity. Editors publish in the embedded Studio and the page updates without a redeploy (next-sanity Live Content API on Next.js 16 Cache Components).",
    links: [
      { label: "Studio (sign-in required)", href: "/studio" },
      { label: "Demo-request form", href: "/demo" },
    ],
  },
  {
    title: "Design system from Figma",
    body: "The Synkra file's variables, text styles and 240-variant button set became a Tailwind v4 theme and typed React components. Three colours were adjusted to pass WCAG AA; every change is listed on the component page.",
    links: [{ label: "Component library", href: "/components" }],
  },
  {
    title: "Conversion landing pages with an A/B split",
    body: "proxy.ts gives each new visitor variant A or B for 30 days and rewrites /lp/automate to a prerendered page, so the URL never changes. A pre-lander feeds it. CTA clicks, form sends and landing views are recorded only after cookie consent.",
    links: [
      { label: "Pre-lander", href: "/go/automate" },
      { label: "Landing page (your variant)", href: "/lp/automate" },
      { label: "Force variant B", href: "/lp/automate?variant=b" },
    ],
  },
];

const CaseStudy: FC = () => (
  <div className="mx-auto flex max-w-220 flex-col p-6 lg:py-16">
    <header className="flex flex-col gap-4 pb-6">
      <Badge
        icon={<FlaskIcon aria-hidden weight="duotone" />}
        className="uppercase"
      >
        Case study
      </Badge>
      <h1 className="font-serif text-display-sm">
        <EmphasisText text="How this site was built." emphasis="built." />
      </h1>
      <p className="text-body-md text-body lg:text-body-lg">
        Quillmesh is a fictional company. This marketing site is a portfolio
        case study by Daniel Omoyibo: a Figma kit turned into a CMS-driven
        Next.js site with a component library and an A/B-tested landing page,
        with every claim below measured rather than estimated.
      </p>
    </header>

    <Section id="proof" title="What it demonstrates">
      <ol className="flex flex-col gap-4">
        {proofs.map((proof, index) => (
          <li
            key={proof.title}
            className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6"
          >
            <h3 className="font-serif text-h5 font-bold">
              {index + 1}. {proof.title}
            </h3>
            <p className="text-body-sm text-body">{proof.body}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-2">
              {proof.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-brand underline hover:text-brand-strong"
                >
                  {link.label}
                </Link>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </Section>

    <Section id="fidelity" title="Design fidelity">
      <p className="text-body-sm text-body">
        Each page was screenshotted at the frame&apos;s exact width (1280
        desktop, 402 phone) and compared pixel by pixel with the Synkra frame.
        The number is the share of pixels that match within 1px, measured on{" "}
        {measuredOn}. Pages that differ on purpose score lower; the note says
        why.
      </p>
      <div
        tabIndex={0}
        role="region"
        aria-label="Fidelity table"
        className="overflow-x-auto"
      >
        <table className="w-full min-w-160 text-start text-body-sm">
          <thead>
            <tr className="border-b border-line text-body-xs text-muted uppercase">
              <th scope="col" className="py-2 pe-4 text-start font-normal">
                Page
              </th>
              <th scope="col" className="py-2 pe-4 text-end font-normal">
                Desktop
              </th>
              <th scope="col" className="py-2 pe-4 text-end font-normal">
                Phone
              </th>
              <th scope="col" className="py-2 text-start font-normal">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.key} className="border-b border-line align-top">
                <th scope="row" className="py-3 pe-4 text-start font-bold">
                  <Link href={page.route} className="hover:text-brand">
                    {page.label}
                  </Link>
                </th>
                <td className="py-3 pe-4 text-end">
                  {scoreOf(`${page.key}-desktop`)}%
                </td>
                <td className="py-3 pe-4 text-end">
                  {scoreOf(`${page.key}-phone`)}%
                </td>
                <td className="py-3 text-body-xs text-body">{page.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        href="/fidelity/report.html"
        look="outline"
        variant="secondary"
        size="sm"
        className="self-start px-4"
      >
        Full report with diffs and side-by-sides
        <ArrowUpRightIcon aria-hidden />
      </Button>
    </Section>

    <Section id="quality" title="Quality checks">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            value: `${axeTotal}`,
            label: `axe violations across the ${report.pages.length} measured pages`,
          },
          {
            value: `${report.sweep.length}`,
            label: `screenshots from 320px to 1920px; ${sweepOverflows} with sideways scroll`,
          },
          {
            value: "23",
            label:
              "unit tests (Vitest): validation, rate limits, variants, class merging",
          },
          {
            value: "56",
            label: "end-to-end tests (Playwright) on desktop and phone widths",
          },
        ].map((item) => (
          <li
            key={item.label}
            className="flex flex-col gap-1 rounded-card border border-line bg-surface p-5"
          >
            <span className="font-serif text-h2 font-bold text-brand">
              {item.value}
            </span>
            <span className="text-body-sm text-body">{item.label}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section id="ab" title="A/B test, live">
      <Suspense
        fallback={<p className="text-body-sm text-muted">Loading results…</p>}
      >
        <AbResults />
      </Suspense>
    </Section>

    <Section id="credits" title="Stack and credits">
      <ul className="flex list-disc flex-col gap-2 ps-5 text-body-sm text-body">
        <li>
          Next.js 16 (App Router, Cache Components, proxy.ts), React 19,
          TypeScript, Tailwind CSS v4.
        </li>
        <li>
          Sanity: public content dataset, private dataset for demo requests and
          events, typed GROQ via TypeGen.
        </li>
        <li>
          Design: Synkra by Inagata Technosmith and Dicky Bhismawan H, Figma
          Community,{" "}
          <Link
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            CC BY 4.0
          </Link>
          , adapted.
        </li>
        <li>
          Photos: Unsplash (credited in the repository&apos;s ATTRIBUTION.md).
          Icons: Phosphor (MIT).
        </li>
      </ul>
    </Section>
  </div>
);

export default CaseStudy;
