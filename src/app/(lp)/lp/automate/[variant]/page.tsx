import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Landing from "@/components/landing";
import PageFallback from "@/components/ui/page-fallback";
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

export default function LandingPage({
  params,
}: PageProps<"/lp/automate/[variant]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <LandingContent params={params} />
    </Suspense>
  );
}

async function LandingContent({
  params,
}: Pick<PageProps<"/lp/automate/[variant]">, "params">) {
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
