import type { Metadata } from "next";

import Changelog from "@/components/changelog";
import { cachedSanity } from "@/sanity/live";
import { releasesQuery, settingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Sample release notes for Quillmesh, a fictional product in a case study.",
};

export default async function ChangelogPage() {
  const [{ data: releases }, { data: settings }] = await Promise.all([
    cachedSanity({
      query: releasesQuery,
      perspective: "published",
      stega: false,
    }),
    cachedSanity({
      query: settingsQuery,
      perspective: "published",
      stega: false,
    }),
  ]);

  return <Changelog releases={releases} settings={settings} />;
}
