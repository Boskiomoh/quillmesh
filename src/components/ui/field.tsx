import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps, FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

export const controlClasses = cn(
  "w-full rounded-control border border-subtle bg-surface px-3 py-2 text-body-sm text-ink",
  "placeholder:text-neutral-400 transition-[border-color,box-shadow]",
  "hover:border-neutral-300 focus:border-brand focus:shadow-glow focus:outline-none",
  "disabled:border-transparent disabled:bg-neutral-300 disabled:text-muted",
  "aria-invalid:border-red-500 aria-invalid:focus:shadow-none",
);

interface FieldProps {
  id: string;
  label: string;
  isRequired?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

const Field: FC<FieldProps> = ({
  id,
  label,
  isRequired,
  error,
  hint,
  className,
  children,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <label
      htmlFor={id}
      className="flex items-center gap-1 text-body-sm text-body"
    >
      {label}
      {isRequired && (
        <span aria-hidden className="text-red-500">
          *
        </span>
      )}
    </label>
    {children}
    {hint && !error && (
      <p id={`${id}-hint`} className="text-body-xs text-muted">
        {hint}
      </p>
    )}
    {error && (
      <p id={`${id}-error`} className="text-body-xs text-red-500">
        {error}
      </p>
    )}
  </div>
);

export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export const Input: FC<ComponentProps<"input">> = ({ className, ...props }) => (
  <input {...props} className={cn(controlClasses, className)} />
);

export const Textarea: FC<ComponentProps<"textarea">> = ({
  className,
  ...props
}) => (
  <textarea
    {...props}
    className={cn(controlClasses, "min-h-32 resize-y", className)}
  />
);

export const Select: FC<ComponentProps<"select">> = ({
  className,
  ...props
}) => (
  <div className={cn("relative", className)}>
    <select {...props} className={cn(controlClasses, "appearance-none pe-9")} />
    <CaretDownIcon
      aria-hidden
      className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink"
    />
  </div>
);

export default Field;
