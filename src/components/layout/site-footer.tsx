import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  RssIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { FC } from "react";

import Logo from "@/components/ui/logo";

import { footerLinks } from "./nav-links";

const socials = [
  {
    label: "X (Quillmesh is fictional: about this case study)",
    href: "/case-study",
    icon: XLogoIcon,
  },
  {
    label: "LinkedIn (Quillmesh is fictional: about this case study)",
    href: "/case-study",
    icon: LinkedinLogoIcon,
  },
  {
    label: "Facebook (Quillmesh is fictional: about this case study)",
    href: "/case-study",
    icon: FacebookLogoIcon,
  },
  { label: "Blog", href: "/blog", icon: RssIcon },
] as const;

const SiteFooter: FC = () => (
  <footer className="bg-surface pb-4">
    <nav aria-label="Footer" className="border-t border-line p-6 lg:px-16">
      <ul className="grid grid-cols-2 gap-4 lg:flex lg:justify-between">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-control px-1 text-body-md uppercase text-muted hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="flex flex-col items-center gap-4 px-16 py-4 lg:flex-row lg:justify-between">
      <Logo />
      <div className="flex flex-col items-center gap-2">
        <ul className="flex gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full bg-neutral-200 text-ink hover:bg-neutral-300"
              >
                <Icon aria-hidden className="size-6" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-body-xs text-muted">© 2026 Quillmesh (fictional)</p>
      </div>
    </div>
    <p className="px-4 text-center text-body-xs text-muted lg:px-16">
      A case study by Daniel Omoyibo, not a real company. Design: Synkra by
      Inagata Technosmith and Dicky Bhismawan H,{" "}
      <Link
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-ink"
      >
        CC BY 4.0
      </Link>
      , adapted.
    </p>
  </footer>
);

export default SiteFooter;
