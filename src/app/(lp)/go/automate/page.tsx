import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Prelander from "@/components/landing/prelander";
import { cachedSanity } from "@/sanity/live";
import { prelanderQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Your ops team is quietly doing a second job",
  robots: { index: false },
};

export default async function PrelanderPage() {
  const { data } = await cachedSanity({
    query: prelanderQuery,
    perspective: "published",
    stega: false,
  });
  if (!data) notFound();

  return <Prelander content={data} />;
}
