"use client";

import type Link from "next/link";
import type { ComponentProps, FC, MouseEvent } from "react";

import Button, { type ButtonOwnProps } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedButtonProps = ButtonOwnProps &
  Omit<ComponentProps<typeof Link>, "href"> & {
    href: string;
    event: AnalyticsEvent;
    label: string;
  };

const TrackedButton: FC<TrackedButtonProps> = ({
  event,
  label,
  onClick,
  ...props
}) => (
  <Button
    {...props}
    data-event-label={label}
    onClick={(clickEvent: MouseEvent<HTMLAnchorElement>) => {
      track(event, label);
      onClick?.(clickEvent);
    }}
  />
);

export default TrackedButton;
