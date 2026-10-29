"use client";

import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useRef, useState, type FC } from "react";

import { cn } from "@/lib/cn";

interface ResourcesMenuProps {
  label: string;
  links: readonly { label: string; href: string }[];
}

const ResourcesMenu: FC<ResourcesMenuProps> = ({ label, links }) => {
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Ref
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="resources-menu"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-7 items-center gap-2 rounded-control px-1 text-body-md uppercase text-muted transition-colors hover:text-ink"
      >
        {label}
        <CaretDownIcon
          aria-hidden
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      <ul
        id="resources-menu"
        hidden={!isOpen}
        className="absolute start-0 top-full z-30 mt-3 min-w-56 rounded-card border border-line bg-surface p-2 shadow-pop"
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-control px-3 py-2 text-body-sm text-ink hover:bg-subtle"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesMenu;
