"use client";

import { ArrowRightIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useState, type FC } from "react";

interface AnnouncementBarProps {
  text: string;
  linkLabel: string;
  href: string;
}

const AnnouncementBar: FC<AnnouncementBarProps> = ({
  text,
  linkLabel,
  href,
}) => {
  // State
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <section
      aria-label="Announcement"
      className="flex justify-between gap-2 bg-ink px-4 py-3 text-surface md:items-center"
    >
      <div className="flex flex-1 flex-col items-start md:flex-row md:items-center md:justify-center">
        <p className="px-2 text-body-xs md:text-body-sm">{text}</p>
        <Link
          href={href}
          className="inline-flex min-h-10 items-center gap-2 rounded-control px-2 text-button-sm font-medium text-secondary-500 hover:bg-neutral-800 md:min-h-11 md:px-5 md:text-button-md [&_svg]:size-5 md:[&_svg]:size-6"
        >
          {linkLabel}
          <ArrowRightIcon aria-hidden className="rtl:-scale-x-100" />
        </Link>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setIsOpen(false)}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-control hover:bg-neutral-800"
      >
        <XIcon aria-hidden className="size-5" />
      </button>
    </section>
  );
};

export default AnnouncementBar;
