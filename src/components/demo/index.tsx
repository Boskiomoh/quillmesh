import {
  CheckCircleIcon,
  ChatsCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import DemoForm from "@/components/forms/demo-form";
import Badge from "@/components/ui/badge";
import EmphasisText from "@/components/ui/emphasis-text";

const points = [
  "A 30-minute walkthrough on your own stack",
  "Your first playbook drafted live with your team",
  "Straight answers on pricing, security and limits",
];

const Demo: FC = () => (
  <section className="flex flex-col gap-10 p-6 lg:flex-row lg:gap-16 lg:p-16">
    <div className="flex flex-col gap-4 lg:w-120 lg:pt-6">
      <Badge
        icon={<ChatsCircleIcon aria-hidden weight="duotone" />}
        className="uppercase"
      >
        Request a demo
      </Badge>
      <h1 className="font-serif text-display-sm">
        <EmphasisText
          text="See Quillmesh on your own stack."
          emphasis="your own"
        />
      </h1>
      <p className="text-body-md text-body lg:text-body-lg">
        Tell us a little about your team and we&apos;ll set up a walkthrough.
        Quillmesh is a fictional company, so this form is a working demo: it
        validates, rate-limits and stores your request in a private dataset.
      </p>
      <ul className="flex flex-col gap-3 pt-2">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-body-md text-body">
            <CheckCircleIcon
              aria-hidden
              className="size-6 shrink-0 text-brand"
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
    <div className="flex-1 rounded-card border border-line bg-surface p-6 shadow-card lg:p-10">
      <DemoForm source="demo" />
    </div>
  </section>
);

export default Demo;
