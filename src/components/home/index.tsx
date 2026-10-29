import type { FC } from "react";

import FaqSection from "@/components/sections/faq-section";
import FeatureGrid from "@/components/sections/feature-grid";
import Newsletter from "@/components/sections/newsletter";
import StatsBand from "@/components/sections/stats-band";
import type { HomeQueryResult, SettingsQueryResult } from "@/sanity/types";

import Hero from "./hero";
import LogoWall from "./logo-wall";
import Testimonials from "./testimonials";

interface HomeProps {
  content: HomeQueryResult;
  settings: SettingsQueryResult;
}

const Home: FC<HomeProps> = ({ content: { home, faqs }, settings }) => (
  <>
    {home?.hero && <Hero hero={home.hero} />}
    {settings?.logos?.names && (
      <LogoWall eyebrow={settings.logos.eyebrow} names={settings.logos.names} />
    )}
    {home?.featureGrid && <FeatureGrid content={home.featureGrid} />}
    {settings?.stats && <StatsBand stats={settings.stats} hasActions />}
    {home?.testimonials && <Testimonials content={home.testimonials} />}
    <FaqSection
      heading={home?.faq?.heading}
      intro={home?.faq?.intro}
      faqs={faqs}
    />
    {settings?.newsletter && (
      <div className="p-6 lg:p-16">
        <Newsletter content={settings.newsletter} />
      </div>
    )}
  </>
);

export default Home;
