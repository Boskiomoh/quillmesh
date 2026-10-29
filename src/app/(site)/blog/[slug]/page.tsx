import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Article from "@/components/blog/article";
import PageFallback from "@/components/ui/page-fallback";
import { cachedSanity } from "@/sanity/live";
import { postQuery, postSlugsQuery, settingsQuery } from "@/sanity/queries";

export async function generateStaticParams() {
  const { data } = await cachedSanity({
    query: postSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data.map((post) => ({ slug: post.slug ?? "" }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await cachedSanity({
    query: postQuery,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return {
    title: data.post?.title ?? "Post",
    description: data.post?.excerpt ?? undefined,
  };
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({
  params,
}: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const [{ data }, { data: settings }] = await Promise.all([
    cachedSanity({
      query: postQuery,
      params: { slug },
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);
  if (!data.post) notFound();

  return <Article post={data.post} more={data.more} settings={settings} />;
}
