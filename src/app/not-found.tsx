import Link from "next/link";

import Button from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center"
    >
      <Logo />
      <p className="font-serif text-mega font-bold text-primary-100">404</p>
      <h1 className="font-serif text-h2 font-medium">Page not found</h1>
      <p className="max-w-md text-body-md text-body">
        That page doesn&apos;t exist, or it moved. Quillmesh is a case study, so
        it may never have existed at all.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/">Back to the home page</Button>
        <Button href="/blog" look="outline" variant="secondary">
          Read the blog
        </Button>
      </div>
      <Link
        href="/case-study"
        className="text-body-sm text-muted underline hover:text-ink"
      >
        How this site was built
      </Link>
    </main>
  );
}
