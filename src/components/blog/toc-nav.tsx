"use client";

import Link from "next/link";
import { useEffect, useState, type FC } from "react";

import { cn } from "@/lib/cn";

interface TocNavProps {
  items: { id: string; text: string }[];
}

const TocNav: FC<TocNavProps> = ({ items }) => {
  // State
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const { id } of items) {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-labelledby="toc-heading"
      className="flex flex-col gap-3 rounded-card border border-line bg-surface p-8"
    >
      <h2 id="toc-heading" className="text-body-xs uppercase text-muted">
        In this article
      </h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              aria-current={item.id === activeId ? "location" : undefined}
              className={cn(
                "flex items-center gap-2 text-body-xs transition-colors",
                item.id === activeId
                  ? "font-bold text-brand italic"
                  : "ps-3.5 text-body hover:text-ink",
              )}
            >
              {item.id === activeId && (
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              )}
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TocNav;
