import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

const tones = {
  success: {
    box: "bg-green-50",
    icon: <CheckCircleIcon weight="duotone" className="text-green-500" />,
  },
  warning: {
    box: "bg-yellow-50",
    icon: <WarningIcon weight="duotone" className="text-yellow-500" />,
  },
  info: {
    box: "bg-blue-50",
    icon: <InfoIcon weight="duotone" className="text-blue-500" />,
  },
  danger: {
    box: "bg-red-50",
    icon: <XCircleIcon weight="duotone" className="text-red-500" />,
  },
} as const;

interface AlertProps {
  tone: keyof typeof tones;
  title: string;
  className?: string;
  children?: ReactNode;
}

const Alert: FC<AlertProps> = ({ tone, title, className, children }) => (
  <div
    className={cn(
      "flex gap-4 rounded-control px-4 py-3",
      tones[tone].box,
      className,
    )}
  >
    <span aria-hidden className="mt-0.5 [&_svg]:size-5">
      {tones[tone].icon}
    </span>
    <div className="flex flex-col gap-1">
      <p className="font-serif text-h6 font-bold text-ink">{title}</p>
      {children && <div className="text-body-sm text-muted">{children}</div>}
    </div>
  </div>
);

export default Alert;
