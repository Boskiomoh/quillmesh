import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Badge from "@/components/ui/badge";
import RichText from "@/components/ui/rich-text";
import { cachedSanity } from "@/sanity/live";
import { legalQuery, legalSlugsQuery } from "@/sanity/queries";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export async function generateStaticParams() {
  const { data } = await cachedSanity({
    query: legalSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data.map((page) => ({ slug: page.slug ?? "" }));
}

export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await cachedSanity({
    query: legalQuery,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return { title: data?.title ?? "Legal" };
}

export default async function LegalPage({
  params,
}: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const { data } = await cachedSanity({
    query: legalQuery,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  if (!data) notFound();

  return (
    <article className="mx-auto flex max-w-176 flex-col gap-4 p-6 lg:py-16">
      <Badge className="uppercase">Legal</Badge>
      <h1 className="font-serif text-h1 font-medium lg:text-display-sm">
        {data.title}
      </h1>
      {data.updatedAt && (
        <p className="text-body-sm text-muted">
          Last updated {dateFormat.format(new Date(data.updatedAt))}
        </p>
      )}
      <RichText value={data.body ?? []} />
    </article>
  );
}
