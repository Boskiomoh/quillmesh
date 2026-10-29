import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Landing from "@/components/landing";
import { isVariant, variants } from "@/lib/variant";
import { cachedSanity } from "@/sanity/live";
import { landingExtrasQuery, landingQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Workflow automation for ops teams",
  robots: { index: false },
};

export function generateStaticParams() {
  return variants.map((variant) => ({ variant }));
}

export default async function LandingPage({
  params,
}: PageProps<"/lp/automate/[variant]">) {
  const { variant } = await params;
  if (!isVariant(variant)) notFound();

  const [{ data: landing }, { data: extras }] = await Promise.all([
    cachedSanity({
      query: landingQuery,
      params: { version: variant },
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: landingExtrasQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <Landing landing={landing} extras={extras} variant={variant} />;
}
