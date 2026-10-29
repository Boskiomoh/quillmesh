import Link from "next/link";
import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/cn";

const variants = {
  filled: {
    primary:
      "bg-primary-500 text-neutral-50 hover:bg-primary-600 active:bg-primary-700",
    secondary:
      "bg-secondary-500 text-ink hover:bg-secondary-400 active:bg-secondary-700 active:text-neutral-50",
    tertiary:
      "bg-tertiary-600 text-neutral-50 hover:bg-tertiary-700 active:bg-tertiary-900",
    mono: "bg-neutral-200 text-ink hover:bg-neutral-300 active:bg-neutral-100",
    success:
      "bg-green-50 text-green-500 hover:bg-green-500 hover:text-neutral-50 active:bg-green-700 active:text-neutral-50",
    warning:
      "bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-neutral-50 active:bg-yellow-700 active:text-neutral-50",
    info: "bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-neutral-50 active:bg-blue-700 active:text-neutral-50",
    danger:
      "bg-red-50 text-red-500 hover:bg-red-500 hover:text-neutral-50 active:bg-red-700 active:text-neutral-50",
  },
  outline: {
    primary: "border border-primary-500 text-primary-500 hover:bg-primary-50",
    secondary: "border border-line bg-surface text-ink hover:bg-subtle",
    tertiary:
      "border border-tertiary-600 text-tertiary-600 hover:bg-tertiary-50",
    mono: "border border-line-strong text-ink hover:bg-subtle",
    success: "border border-green-50 text-green-500 hover:bg-green-50",
    warning: "border border-yellow-50 text-yellow-500 hover:bg-yellow-50",
    info: "border border-blue-50 text-blue-500 hover:bg-blue-50",
    danger: "border border-red-50 text-red-500 hover:bg-red-50",
  },
  ghost: {
    primary: "text-primary-500 hover:bg-primary-50",
    secondary: "text-ink hover:bg-subtle",
    tertiary: "text-tertiary-600 hover:bg-tertiary-50",
    mono: "text-ink hover:bg-subtle",
    success: "text-green-500 hover:bg-green-50",
    warning: "text-yellow-500 hover:bg-yellow-50",
    info: "text-blue-500 hover:bg-blue-50",
    danger: "text-red-500 hover:bg-red-50",
  },
} as const;

const sizes = {
  sm: "min-h-10 px-2 py-2 text-button-sm [&_svg]:size-5",
  md: "min-h-11 px-5 py-2 text-button-md [&_svg]:size-6",
  lg: "min-h-14 px-5 py-4 text-button-lg [&_svg]:size-6",
} as const;

export type ButtonStyle = keyof typeof variants;
export type ButtonVariant = keyof (typeof variants)["filled"];
export type ButtonSize = keyof typeof sizes;

export interface ButtonOwnProps {
  look?: ButtonStyle;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href">)
    | ({ href?: undefined } & ComponentProps<"button">)
  );

export const buttonClasses = ({
  look = "filled",
  variant = "primary",
  size = "md",
}: ButtonOwnProps) =>
  cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-control font-medium transition-colors",
    "disabled:pointer-events-none disabled:bg-subtle disabled:text-neutral-400 aria-disabled:pointer-events-none",
    variants[look][variant],
    sizes[size],
  );

const Button: FC<ButtonProps> = ({
  look,
  variant,
  size,
  className,
  ...props
}) => {
  const classes = cn(buttonClasses({ look, variant, size }), className);

  if (props.href !== undefined) return <Link {...props} className={classes} />;
  return <button type="button" {...props} className={classes} />;
};

export default Button;
