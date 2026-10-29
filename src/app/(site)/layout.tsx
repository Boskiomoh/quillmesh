import Link from "next/link";

import AnnouncementBar from "@/components/layout/announcement-bar";
import CookieBar from "@/components/layout/cookie-bar";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { cachedSanity, SanityLive } from "@/sanity/live";
import { settingsQuery } from "@/sanity/queries";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { data: settings } = await cachedSanity({
    query: settingsQuery,
    perspective: "published",
    stega: false,
  });
  const announcement = settings?.announcement;

  return (
    <>
      <Link
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </Link>
      {announcement?.text && announcement.link && (
        <AnnouncementBar
          text={announcement.text}
          linkLabel={announcement.link.label!}
          href={announcement.link.href!}
        />
      )}
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <CookieBar />
      <SanityLive includeDrafts={false} />
    </>
  );
}
