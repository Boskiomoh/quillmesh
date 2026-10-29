import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface AccordionItemProps {
  group: string;
  question: string;
  isOpen?: boolean;
  children: ReactNode;
}

export const AccordionItem: FC<AccordionItemProps> = ({
  group,
  question,
  isOpen,
  children,
}) => (
  <details
    name={group}
    open={isOpen}
    className="group overflow-hidden rounded-card border border-line bg-surface open:shadow-card"
  >
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors",
        "text-body-md font-bold text-ink md:text-body-lg md:font-bold",
        "hover:bg-subtle group-open:bg-neutral-200 [&::-webkit-details-marker]:hidden",
      )}
    >
      {question}
      <CaretDownIcon
        aria-hidden
        className="size-6 shrink-0 transition-transform group-open:rotate-180"
      />
    </summary>
    <div className="p-5 text-body-sm text-body md:text-body-md">{children}</div>
  </details>
);

interface AccordionProps {
  className?: string;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ className, children }) => (
  <div className={cn("flex w-full flex-col gap-4", className)}>{children}</div>
);

export default Accordion;
