import type { Metadata } from "next";

import Blog from "@/components/blog";
import { cachedSanity } from "@/sanity/live";
import { blogQuery, settingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Sample articles on SaaS ops, written for the Quillmesh case study.",
};

export default async function BlogPage() {
  const [{ data: content }, { data: settings }] = await Promise.all([
    cachedSanity({
      query: blogQuery,
      params: { category: null },
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <Blog content={content} settings={settings} page={1} />;
}
