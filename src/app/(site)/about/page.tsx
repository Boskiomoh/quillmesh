import type { Metadata } from "next";

import About from "@/components/about";
import { cachedSanity } from "@/sanity/live";
import { aboutQuery, settingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "The fictional team and principles behind Quillmesh, a case-study SaaS site.",
};

export default async function AboutPage() {
  const [{ data: content }, { data: settings }] = await Promise.all([
    cachedSanity({ query: aboutQuery, perspective: "published", stega: false }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <About content={content} settings={settings} />;
}
