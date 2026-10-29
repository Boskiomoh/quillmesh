import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

const tones = {
  primary: "bg-primary-50 text-primary-500",
  info: "bg-blue-50 text-blue-500",
  success: "bg-green-50 text-green-500",
  warning: "bg-yellow-50 text-yellow-500",
  danger: "bg-red-50 text-red-500",
  secondary: "bg-neutral-200 text-ink",
  tertiary: "bg-tertiary-700 text-tertiary-100",
} as const;

const sizes = {
  sm: "gap-1 px-3 py-1 text-body-xs [&_svg]:size-3.5",
  lg: "gap-2 px-3 py-2 text-body-sm [&_svg]:size-4",
} as const;

export type BadgeTone = keyof typeof tones;

interface BadgeProps {
  tone?: BadgeTone;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const Badge: FC<BadgeProps> = ({
  tone = "primary",
  size = "sm",
  icon,
  className,
  children,
}) => (
  <span
    className={cn(
      "inline-flex w-fit items-center rounded-full",
      tones[tone],
      sizes[size],
      className,
    )}
  >
    {icon}
    {children}
  </span>
);

export default Badge;
