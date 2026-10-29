import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => (
  <Link
    href="/"
    aria-label="Quillmesh home"
    className={cn(
      "inline-flex h-12 items-center gap-1.5 rounded-panel p-3",
      className,
    )}
  >
    <svg aria-hidden viewBox="0 0 24 24" className="size-6 shrink-0">
      <path d="M12 2 4.5 13.5 12 22l7.5-8.5L12 2Z" className="fill-brand" />
      <path
        d="M12 7v10M8 14h8"
        className="stroke-surface"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
    <span className="font-serif text-h4 font-semibold tracking-tight text-ink">
      quillmesh
    </span>
  </Link>
);

export default Logo;
