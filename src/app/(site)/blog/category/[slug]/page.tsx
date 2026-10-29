import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Blog from "@/components/blog";
import { cachedSanity } from "@/sanity/live";
import { blogQuery, settingsQuery } from "@/sanity/queries";

export const metadata: Metadata = { title: "Blog" };

export async function generateStaticParams() {
  const { data } = await cachedSanity({
    query: blogQuery,
    params: { category: null },
    perspective: "published",
    stega: false,
  });
  return data.categories.map((category) => ({ slug: category.slug ?? "" }));
}

export default async function BlogCategoryPage({
  params,
}: PageProps<"/blog/category/[slug]">) {
  const { slug } = await params;
  const [{ data: content }, { data: settings }] = await Promise.all([
    cachedSanity({
      query: blogQuery,
      params: { category: slug },
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);
  if (!content.categories.some((category) => category.slug === slug))
    notFound();

  return (
    <Blog content={content} settings={settings} page={1} category={slug} />
  );
}
