import {
  ArrowRightIcon,
  PaletteIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC, ReactNode } from "react";

import Accordion, { AccordionItem } from "@/components/ui/accordion";
import Alert from "@/components/ui/alert";
import Avatar from "@/components/ui/avatar";
import Badge, { type BadgeTone } from "@/components/ui/badge";
import Button, {
  type ButtonSize,
  type ButtonStyle,
  type ButtonVariant,
} from "@/components/ui/button";
import EmphasisText from "@/components/ui/emphasis-text";
import Field, { Input, Select, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/cn";

import {
  colorScales,
  fixedTokens,
  radii,
  shadows,
  swatchClasses,
  typeStyles,
} from "./tokens";

const looks: ButtonStyle[] = ["filled", "outline", "ghost"];
const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "mono",
  "success",
  "warning",
  "info",
  "danger",
];
const sizes: ButtonSize[] = ["sm", "md", "lg"];
const badgeTones: BadgeTone[] = [
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "secondary",
  "tertiary",
];

const sections = [
  { id: "colours", label: "Colours" },
  { id: "type", label: "Typography" },
  { id: "shape", label: "Radius & shadow" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "forms", label: "Form fields" },
  { id: "feedback", label: "Alerts & avatars" },
  { id: "accordion", label: "Accordion" },
] as const;

const Section: FC<{
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}> = ({ id, title, intro, children }) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className="flex scroll-mt-6 flex-col gap-6 border-t border-line py-12"
  >
    <div className="flex flex-col gap-2">
      <h2 id={`${id}-heading`} className="font-serif text-h3 font-medium">
        {title}
      </h2>
      <p className="max-w-2xl text-body-md text-body">{intro}</p>
    </div>
    {children}
  </section>
);

const DesignSystem: FC = () => (
  <div className="flex flex-col p-6 lg:p-16">
    <header className="flex flex-col gap-4 pb-10">
      <Badge
        icon={<PaletteIcon aria-hidden weight="duotone" />}
        className="uppercase"
      >
        Design system
      </Badge>
      <h1 className="font-serif text-display-sm lg:text-display">
        <EmphasisText
          text="The Quillmesh component library."
          emphasis="component"
        />
      </h1>
      <p className="max-w-3xl text-body-md text-body lg:text-body-lg">
        Every token and component on this page comes from the Synkra Figma
        file&apos;s Design System page (variables, text styles and component
        variants), turned into a Tailwind v4 theme and React components.
        Everything below is the real component, rendered live.
      </p>
      <nav aria-label="On this page">
        <ul className="flex flex-wrap gap-2 pt-2">
          {sections.map((section) => (
            <li key={section.id}>
              <Button
                href={`#${section.id}`}
                look="outline"
                variant="secondary"
                size="sm"
                className="px-3"
              >
                {section.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>

    <Section
      id="colours"
      title="Colours"
      intro="Scales named as in the Figma file, with role tokens (ink, body, muted, line, surface, brand) on top for everyday use."
    >
      <div className="flex flex-col gap-6">
        {colorScales.map((scale) => (
          <div key={scale.name} className="flex flex-col gap-2">
            <h3 className="text-body-sm font-bold">{scale.name}</h3>
            <ul className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {scale.tokens.map((step) => {
                const token = `${scale.name.toLowerCase()}-${step}`;
                return (
                  <li key={token} className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "h-12 rounded-control border border-line",
                        swatchClasses[token],
                      )}
                    />
                    <span className="text-body-xs text-muted">{step}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <ul className="flex flex-col gap-2 rounded-card bg-yellow-50 p-4 text-body-sm text-yellow-700">
          {fixedTokens.map((fix) => (
            <li key={fix.token}>
              <b>{fix.token}:</b> {fix.note}
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section
      id="type"
      title="Typography"
      intro="Newsreader for headings, DM Sans for everything else. Each Figma text style is one Tailwind token carrying size, line height and tracking together."
    >
      <div
        tabIndex={0}
        role="region"
        aria-label="Type styles table, scroll sideways"
        className="overflow-x-auto"
      >
        <table className="w-full min-w-160 text-start">
          <thead>
            <tr className="border-b border-line text-body-xs text-muted uppercase">
              <th scope="col" className="py-2 pe-4 text-start font-normal">
                Token
              </th>
              <th scope="col" className="py-2 pe-4 text-start font-normal">
                Figma style
              </th>
              <th scope="col" className="py-2 text-start font-normal">
                Sample
              </th>
            </tr>
          </thead>
          <tbody>
            {typeStyles.map((style) => (
              <tr
                key={style.token}
                className="border-b border-line align-baseline"
              >
                <td className="py-3 pe-4 font-mono text-body-xs">
                  text-{style.token}
                </td>
                <td className="py-3 pe-4 text-body-xs text-muted">
                  {style.figma}
                  <br />
                  {style.spec}
                </td>
                <td className={cn("py-3", style.className)}>
                  Ops that run themselves
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      id="shape"
      title="Radius & shadow"
      intro="Radii and elevation from the file's components; glow is the focus ring on inputs."
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
        {radii.map((radius) => (
          <div key={radius.token} className="flex flex-col gap-2">
            <span
              className={cn(
                "h-20 border-2 border-brand bg-primary-50",
                radius.className,
              )}
            />
            <span className="text-body-xs">
              <b>{radius.token}</b> · {radius.value}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {shadows.map((shadow) => (
          <div key={shadow.token} className="flex flex-col gap-2">
            <span
              className={cn("h-20 rounded-card bg-surface", shadow.className)}
            />
            <span className="text-body-xs">
              <b>{shadow.token}</b> · {shadow.value}
            </span>
          </div>
        ))}
      </div>
    </Section>

    <Section
      id="buttons"
      title="Buttons"
      intro="The Figma set has 240 variants: style × variant × size × state. Here they are as three props; hover and press them to see the states."
    >
      <div className="flex flex-col gap-8">
        {looks.map((look) => (
          <div key={look} className="flex flex-col gap-3">
            <h3 className="text-body-sm font-bold capitalize">{look}</h3>
            <div className="flex flex-wrap gap-3">
              {buttonVariants.map((variant) => (
                <Button
                  key={variant}
                  look={look}
                  variant={variant}
                  className="capitalize"
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-3">
          <h3 className="text-body-sm font-bold">Sizes, icon and disabled</h3>
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                Size {size}
                <ArrowRightIcon aria-hidden className="rtl:-scale-x-100" />
              </Button>
            ))}
            <Button disabled>Disabled</Button>
            <Button look="ghost" variant="secondary" disabled>
              Disabled ghost
            </Button>
          </div>
        </div>
      </div>
    </Section>

    <Section
      id="badges"
      title="Badges"
      intro="Pill badges in two sizes, one tone per status colour."
    >
      <div className="flex flex-col gap-3">
        {(["sm", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-wrap gap-2">
            {badgeTones.map((tone) => (
              <Badge
                key={tone}
                tone={tone}
                size={size}
                icon={<StarIcon aria-hidden weight="duotone" />}
                className="capitalize"
              >
                {tone}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    </Section>

    <Section
      id="forms"
      title="Form fields"
      intro="Input, select and textarea from the Input Form set. The file has no error state; it uses the danger tokens."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          id="ds-default"
          label="Default"
          hint="Placeholder text uses neutral-400"
        >
          <Input id="ds-default" placeholder="Your text" />
        </Field>
        <Field id="ds-filled" label="Filled" isRequired>
          <Input id="ds-filled" defaultValue="ada@company.com" />
        </Field>
        <Field
          id="ds-error"
          label="Error"
          error="Enter a work email like name@company.com"
        >
          <Input
            id="ds-error"
            defaultValue="ada@"
            aria-invalid
            aria-describedby="ds-error-error"
          />
        </Field>
        <Field id="ds-disabled" label="Disabled">
          <Input id="ds-disabled" defaultValue="Read only" disabled />
        </Field>
        <Field id="ds-select" label="Select">
          <Select id="ds-select" defaultValue="11-50">
            <option value="1-10">1-10 people</option>
            <option value="11-50">11-50 people</option>
          </Select>
        </Field>
        <Field id="ds-textarea" label="Textarea">
          <Textarea
            id="ds-textarea"
            placeholder="What would you automate first?"
            rows={3}
          />
        </Field>
      </div>
    </Section>

    <Section
      id="feedback"
      title="Alerts & avatars"
      intro="Alerts in four tones; avatars use initials instead of stock photos of real people."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Alert tone="success" title="Request received">
          Your demo request was saved.
        </Alert>
        <Alert tone="info" title="Heads up">
          Quillmesh is a fictional product.
        </Alert>
        <Alert tone="warning" title="Rate limited">
          Too many requests from your network.
        </Alert>
        <Alert tone="danger" title="That didn't go through">
          Please try again in a minute.
        </Alert>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {[
          "Lisa Tran",
          "Jamal Carter",
          "Sofia Chen",
          "Alex Kim",
          "Emma Johnson",
        ].map((name) => (
          <Avatar key={name} name={name} />
        ))}
        <Avatar name="Pamela Schmidt" size="md" />
      </div>
    </Section>

    <Section
      id="accordion"
      title="Accordion"
      intro="Native details elements sharing a name: one open at a time, keyboard accessible, no JavaScript."
    >
      <Accordion className="max-w-220">
        <AccordionItem
          group="ds-faq"
          question="Does it work without JavaScript?"
          isOpen
        >
          Yes. It uses the browser&apos;s own details element, so it works
          before the page hydrates.
        </AccordionItem>
        <AccordionItem
          group="ds-faq"
          question="Is only one item open at a time?"
        >
          Yes. Items share a name attribute, which makes the browser close the
          others.
        </AccordionItem>
      </Accordion>
    </Section>
  </div>
);

export default DesignSystem;
