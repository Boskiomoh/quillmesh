import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { urlFor } from "@/sanity/image";
import type { BlogQueryResult } from "@/sanity/types";

type CoverImage = BlogQueryResult["posts"][number]["cover"];

const palettes = [
  "from-tertiary-900 via-tertiary-700 to-tertiary-300",
  "from-primary-900 via-primary-600 to-primary-200",
  "from-neutral-900 via-neutral-700 to-secondary-400",
  "from-panel via-primary-800 to-tertiary-400",
] as const;

interface CoverProps {
  image: CoverImage;
  category?: string | null;
  sizes: string;
  isPriority?: boolean;
  className?: string;
}

const Cover: FC<CoverProps> = ({
  image,
  category,
  sizes,
  isPriority,
  className,
}) => {
  // Derived
  const palette =
    palettes[
      [...(category ?? "")].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
        palettes.length
    ];

  return (
    <div className={cn("relative overflow-hidden rounded-card", className)}>
      {image?.asset ? (
        <Image
          src={urlFor(image).width(1424).url()}
          alt={image.alt ?? ""}
          fill
          sizes={sizes}
          priority={isPriority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className={cn("absolute inset-0 bg-linear-to-br", palette)}
        >
          <svg
            viewBox="0 0 200 120"
            preserveAspectRatio="xMidYMid slice"
            className="size-full"
          >
            <g className="fill-none stroke-white/25" strokeWidth="0.6">
              {Array.from({ length: 9 }, (_, index) => (
                <path
                  key={index}
                  d={`M${-20 + index * 28} 130 L${60 + index * 22} -10`}
                />
              ))}
            </g>
            <circle cx="150" cy="40" r="22" className="fill-white/10" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Cover;
