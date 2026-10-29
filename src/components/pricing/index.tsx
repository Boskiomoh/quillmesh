import { Suspense, type FC } from "react";

import CtaPanel from "@/components/sections/cta-panel";
import FaqSection from "@/components/sections/faq-section";
import PageHero from "@/components/sections/page-hero";
import type { PricingQueryResult, SettingsQueryResult } from "@/sanity/types";

import PlanGrid, { PlanCards } from "./plan-grid";

interface PricingProps {
  content: PricingQueryResult;
  settings: SettingsQueryResult;
}

const Pricing: FC<PricingProps> = ({ content, settings }) => (
  <>
    <PageHero
      badge={settings?.pricingHero?.badge}
      heading={settings?.pricingHero?.heading}
      body={settings?.pricingHero?.body}
      source="pricing"
    >
      <Suspense fallback={<PlanCards plans={content.plans} isAnnual={false} />}>
        <PlanGrid plans={content.plans} />
      </Suspense>
    </PageHero>
    <FaqSection
      heading={content.faq?.heading}
      intro={content.faq?.intro}
      faqs={content.faqs}
    />
    {settings?.ctaPanel && (
      <CtaPanel content={settings.ctaPanel} source="pricing" />
    )}
  </>
);

export default Pricing;
