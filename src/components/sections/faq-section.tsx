import type { FC } from "react";

import Accordion, { AccordionItem } from "@/components/ui/accordion";

interface FaqSectionProps {
  heading?: string | null;
  intro?: string | null;
  faqs: { _id: string; question: string | null; answer: string | null }[];
}

const FaqSection: FC<FaqSectionProps> = ({ heading, intro, faqs }) => (
  <section
    aria-labelledby="faq-heading"
    className="flex justify-center p-6 lg:p-16"
  >
    <div className="flex w-full max-w-220 flex-col gap-12 py-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2
          id="faq-heading"
          className="max-w-xl font-serif text-h3 font-medium lg:text-h2 lg:font-medium"
        >
          {heading}
        </h2>
        <p className="text-body-sm text-body lg:text-body-md">{intro}</p>
      </div>
      <Accordion className="gap-5">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq._id}
            group="faq"
            question={faq.question ?? ""}
            isOpen={index === 1}
          >
            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
