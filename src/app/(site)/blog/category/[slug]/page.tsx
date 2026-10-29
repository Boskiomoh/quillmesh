import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Blog from "@/components/blog";
import PageFallback from "@/components/ui/page-fallback";
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

export default function BlogCategoryPage({
  params,
}: PageProps<"/blog/category/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <BlogCategoryContent params={params} />
    </Suspense>
  );
}

async function BlogCategoryContent({
  params,
}: Pick<PageProps<"/blog/category/[slug]">, "params">) {
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
