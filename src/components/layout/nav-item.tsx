"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import { cn } from "@/lib/cn";

interface NavItemProps {
  label: string;
  href: string;
}

const NavItem: FC<NavItemProps> = ({ label, href }) => {
  // Router
  const pathname = usePathname();

  // Derived
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex h-7 items-center rounded-control px-1 text-body-md uppercase transition-colors hover:text-ink",
        isActive ? "text-brand" : "text-muted",
      )}
    >
      {label}
      {isActive && (
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-t-control bg-neutral-800"
        />
      )}
    </Link>
  );
};

export default NavItem;
