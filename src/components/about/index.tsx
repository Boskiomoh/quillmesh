import {
  BriefcaseIcon,
  BuildingsIcon,
  EyeSlashIcon,
  GitForkIcon,
  ShieldCheckIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { FC } from "react";

import CtaPanel from "@/components/sections/cta-panel";
import SectionIntro from "@/components/sections/section-intro";
import Avatar from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import EmphasisText from "@/components/ui/emphasis-text";
import { cn } from "@/lib/cn";
import { urlFor } from "@/sanity/image";
import type { AboutQueryResult, SettingsQueryResult } from "@/sanity/types";

const valueLooks = [
  {
    icon: EyeSlashIcon,
    card: "border-line bg-surface",
    tile: "bg-neutral-200 text-ink",
    text: "text-body",
  },
  {
    icon: ShieldCheckIcon,
    card: "border-brand bg-brand text-surface",
    tile: "bg-primary-50 text-brand",
    text: "text-surface",
  },
  {
    icon: GitForkIcon,
    card: "border-line bg-surface",
    tile: "bg-green-50 text-green-500",
    text: "text-body",
  },
] as const;

interface AboutProps {
  content: AboutQueryResult;
  settings: SettingsQueryResult;
}

const About: FC<AboutProps> = ({ content, settings }) => {
  // Derived
  const hero = content?.hero;
  const stats = settings?.stats;

  return (
    <>
      <section className="flex flex-col gap-4 p-6 lg:p-16">
        <div className="flex flex-col gap-6 pb-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex flex-col gap-2 lg:w-178">
            <Badge
              icon={<BuildingsIcon aria-hidden weight="duotone" />}
              className="uppercase"
            >
              {hero?.badge}
            </Badge>
            <h1 className="font-serif text-display-sm lg:text-display">
              <EmphasisText
                text={hero?.heading?.text ?? ""}
                emphasis={hero?.heading?.emphasis ?? undefined}
              />
            </h1>
            <span aria-hidden className="h-1 w-32 bg-brand" />
          </div>
          <p className="text-body-md text-body lg:w-100">{hero?.body}</p>
        </div>
        <div className="relative flex h-80 items-end overflow-hidden rounded-card p-6 lg:h-140 lg:p-8">
          {hero?.image?.asset ? (
            <Image
              src={urlFor(hero.image).width(2304).height(1120).url()}
              alt={hero.image.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 bg-linear-to-br from-neutral-700 via-panel-end to-panel"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-ink/50 to-transparent"
          />
          <p className="relative flex flex-col gap-2 rounded-card border border-white/20 bg-ink/40 p-4 text-surface shadow-card backdrop-blur-md">
            <span className="text-body-sm font-bold">
              {hero?.locationLabel}
            </span>
            <span className="text-body-xl font-bold">{hero?.location}</span>
          </p>
        </div>
      </section>

      {stats && (
        <section className="bg-subtle p-6 lg:px-16 lg:py-10">
          <div className="flex flex-col gap-16 lg:px-6">
            <SectionIntro
              title={stats.heading}
              badge="Sample figures"
              badgeIcon={<WarningIcon aria-hidden weight="duotone" />}
              intro={stats.body ?? undefined}
            />
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {stats.items?.map((item) => (
                <div
                  key={item._key}
                  className="flex flex-col-reverse items-center rounded-card border border-line bg-surface p-4 text-center lg:border-0 lg:bg-transparent lg:p-6"
                >
                  <dt className="text-body-sm lg:text-body-md">{item.label}</dt>
                  <dd className="font-serif text-h3 font-bold text-brand lg:text-h1 lg:font-bold">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section aria-labelledby="values-heading" className="p-6 lg:p-16">
        <div className="flex flex-col gap-12 py-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2
              id="values-heading"
              className="font-serif text-h3 font-medium lg:text-h2 lg:font-medium"
            >
              {content?.values?.heading}
            </h2>
            <p className="text-body-md text-body">{content?.values?.intro}</p>
          </div>
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {content?.values?.items?.map((value, index) => {
              const look = valueLooks[index % valueLooks.length];
              const Icon = look.icon;
              return (
                <li
                  key={value._key}
                  className={cn(
                    "flex flex-col gap-6 rounded-card border p-8",
                    look.card,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-card shadow-sm",
                      look.tile,
                    )}
                  >
                    <Icon aria-hidden weight="duotone" className="size-6" />
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-body-xl font-bold">{value.title}</h3>
                    <p className={cn("text-body-sm", look.text)}>
                      {value.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-heading" className="p-6 lg:p-16">
        <div className="flex flex-col gap-12 pt-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex flex-col gap-2">
              <h2
                id="team-heading"
                className="font-serif text-h3 font-medium lg:text-h2 lg:font-medium"
              >
                {content?.team?.heading}
              </h2>
              <p className="text-body-md text-body">{content?.team?.intro}</p>
            </div>
            {content?.team?.link?.href && (
              <Button
                href={content.team.link.href}
                size="sm"
                className="self-start px-2 lg:self-auto"
              >
                {content.team.link.label}
                <BriefcaseIcon aria-hidden weight="duotone" />
              </Button>
            )}
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            {content?.team?.members?.map((member) => (
              <li
                key={member._key}
                className="flex flex-col gap-1 overflow-hidden rounded-card border border-line bg-surface"
              >
                <div className="relative flex h-70 items-center justify-center bg-subtle">
                  <Avatar
                    name={member.name ?? ""}
                    size="md"
                    className="size-20 text-h3 lg:size-28 lg:text-h1"
                  />
                  <Badge className="absolute bottom-3 start-3 uppercase">
                    {member.team}
                  </Badge>
                </div>
                <div className="flex flex-col p-3">
                  <h3 className="font-serif text-h6 font-bold lg:text-h5 lg:font-bold">
                    {member.name}
                  </h3>
                  <p className="text-body-sm text-body lg:text-body-md">
                    {member.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {settings?.ctaPanel && (
        <CtaPanel content={settings.ctaPanel} source="about" />
      )}
    </>
  );
};

export default About;
