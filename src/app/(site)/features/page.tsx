import type { Metadata } from "next";

import Features from "@/components/features";
import { cachedSanity } from "@/sanity/live";
import { featuresQuery, settingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Features",
  description:
    "How Quillmesh playbooks run, recover and report. A fictional product for a case study.",
};

export default async function FeaturesPage() {
  const [{ data: content }, { data: settings }] = await Promise.all([
    cachedSanity({
      query: featuresQuery,
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <Features content={content} settings={settings} />;
}
