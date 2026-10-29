import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import Blog, { postsPerPage } from "@/components/blog";
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
  const pages = Math.ceil(data.posts.length / postsPerPage);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default function BlogListPage({
  params,
}: PageProps<"/blog/page/[page]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <BlogListContent params={params} />
    </Suspense>
  );
}

async function BlogListContent({
  params,
}: Pick<PageProps<"/blog/page/[page]">, "params">) {
  const { page } = await params;
  const pageNumber = Number(page);
  if (pageNumber === 1) redirect("/blog");

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
  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    (pageNumber - 1) * postsPerPage >= content.posts.length
  )
    notFound();

  return <Blog content={content} settings={settings} page={pageNumber} />;
}
