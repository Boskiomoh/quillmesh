import type { FC } from "react";

import Button from "@/components/ui/button";
import Logo from "@/components/ui/logo";

import MobileMenu from "./mobile-menu";
import NavItem from "./nav-item";
import { navLinks } from "./nav-links";
import ResourcesMenu from "./resources-menu";

const SiteHeader: FC = () => (
  <header className="flex items-center justify-between px-4 py-4 lg:px-16">
    <div className="flex items-center lg:gap-6">
      <MobileMenu />
      <Logo />
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              {"children" in link ? (
                <ResourcesMenu label={link.label} links={link.children} />
              ) : (
                <NavItem label={link.label} href={link.href} />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <Button
        href="/demo"
        look="ghost"
        variant="tertiary"
        size="sm"
        className="hidden lg:inline-flex"
      >
        Sign In
      </Button>
      <Button href="/demo" size="sm" className="px-3 xs:w-30 lg:hidden">
        Sign Up
      </Button>
      <Button href="/demo" className="hidden w-32 lg:inline-flex">
        Sign Up
      </Button>
    </div>
  </header>
);

export default SiteHeader;
