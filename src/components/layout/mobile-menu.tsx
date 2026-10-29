"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef, type FC } from "react";

import Button from "@/components/ui/button";

import { navLinks } from "./nav-links";

const MobileMenu: FC = () => {
  // Ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Handlers
  const handleClose = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex size-10 items-center justify-center rounded-control text-ink hover:bg-subtle lg:hidden"
      >
        <ListIcon aria-hidden className="size-5" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-sm bg-surface p-4 shadow-pop backdrop:bg-ink/40"
      >
        <div className="flex items-center justify-between">
          <span className="font-serif text-h4 font-semibold">quillmesh</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={handleClose}
            className="inline-flex size-10 items-center justify-center rounded-control hover:bg-subtle"
          >
            <XIcon aria-hidden className="size-5" />
          </button>
        </div>
        <nav aria-label="Main" className="mt-6">
          <ul className="flex flex-col gap-1">
            {navLinks
              .flatMap<{ label: string; href: string }>((link) =>
                "children" in link ? link.children : [link],
              )
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleClose}
                    className="block rounded-control px-3 py-3 text-body-md text-ink hover:bg-subtle"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <Button
          href="/demo"
          size="lg"
          className="mt-6 w-full"
          onClick={handleClose}
        >
          Request a demo
        </Button>
      </dialog>
    </>
  );
};

export default MobileMenu;
