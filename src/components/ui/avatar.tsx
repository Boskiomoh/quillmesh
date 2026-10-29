import type { FC } from "react";

import { cn } from "@/lib/cn";

const tones = [
  "bg-primary-100 text-primary-700",
  "bg-tertiary-100 text-tertiary-800",
  "bg-secondary-50 text-secondary-700",
  "bg-green-50 text-green-700",
  "bg-neutral-200 text-neutral-700",
] as const;

const sizes = {
  sm: "size-10 text-body-sm",
  md: "size-15 text-h5",
} as const;

interface AvatarProps {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Avatar: FC<AvatarProps> = ({ name, size = "sm", className }) => {
  // Derived
  const tone =
    tones[
      [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
        tones.length
    ];

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold",
        tone,
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
};

export default Avatar;
