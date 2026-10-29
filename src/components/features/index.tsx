import type { FC } from "react";

import CtaPanel from "@/components/sections/cta-panel";
import FeatureGrid from "@/components/sections/feature-grid";
import PageHero from "@/components/sections/page-hero";
import type { FeaturesQueryResult, SettingsQueryResult } from "@/sanity/types";

import BuiltFor from "./built-for";
import LogicLayers from "./logic-layers";

interface FeaturesProps {
  content: FeaturesQueryResult;
  settings: SettingsQueryResult;
}

const Features: FC<FeaturesProps> = ({
  content: { page, featureGrid },
  settings,
}) => (
  <>
    <PageHero
      badge={page?.hero?.badge}
      heading={page?.hero?.heading}
      body={page?.hero?.body}
      primary={page?.hero?.primary}
      secondary={page?.hero?.secondary}
      source="features"
    />
    {page?.builtFor && <BuiltFor content={page.builtFor} />}
    {featureGrid && <FeatureGrid content={featureGrid} />}
    {page?.logic && <LogicLayers content={page.logic} />}
    {settings?.ctaPanel && (
      <CtaPanel content={settings.ctaPanel} source="features" />
    )}
  </>
);

export default Features;
