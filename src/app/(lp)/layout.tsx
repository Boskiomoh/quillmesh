import Link from "next/link";

import CookieBar from "@/components/layout/cookie-bar";
import Logo from "@/components/ui/logo";
import { SanityLive } from "@/sanity/live";

export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-4 lg:px-16">
        <Logo />
        <Link
          href="/case-study"
          className="text-body-xs text-muted underline hover:text-ink"
        >
          Case study: Quillmesh is fictional
        </Link>
      </header>
      <main id="main">{children}</main>
      <footer className="flex flex-col items-center gap-2 bg-surface px-4 py-6 text-center text-body-xs text-muted">
        <p>
          A case study by Daniel Omoyibo. Design: Synkra by Inagata Technosmith
          and Dicky Bhismawan H,{" "}
          <Link
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            CC BY 4.0
          </Link>
          .
        </p>
        <p className="flex gap-4">
          <Link href="/legal/privacy" className="underline hover:text-ink">
            Privacy
          </Link>
          <Link href="/legal/cookies" className="underline hover:text-ink">
            Cookies
          </Link>
        </p>
      </footer>
      <CookieBar />
      <SanityLive includeDrafts={false} />
    </>
  );
}
