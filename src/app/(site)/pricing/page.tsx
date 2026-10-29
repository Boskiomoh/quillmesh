import type { Metadata } from "next";

import Pricing from "@/components/pricing";
import { cachedSanity } from "@/sanity/live";
import { pricingQuery, settingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Quillmesh plans: Starter, Pro and Enterprise. Sample pricing for a case-study SaaS site.",
};

export default async function PricingPage() {
  const [{ data: content }, { data: settings }] = await Promise.all([
    cachedSanity({
      query: pricingQuery,
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <Pricing content={content} settings={settings} />;
}
