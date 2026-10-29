"use client";

import Link from "next/link";
import { useSyncExternalStore, type FC } from "react";

import Button from "@/components/ui/button";

const key = "quillmesh-consent";
const listeners = new Set<() => void>();

const readConsent = () => {
  try {
    return localStorage.getItem(key);
  } catch {
    return "unavailable";
  }
};

const saveConsent = (value: "all" | "essential") => {
  try {
    localStorage.setItem(key, value);
  } catch {}
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const CookieBar: FC = () => {
  // Stores
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    () => "pending-server",
  );

  if (consent !== null) return null;

  return (
    <section
      aria-label="Cookie consent"
      className="sticky bottom-0 z-20 flex flex-col items-center gap-4 bg-ink p-4 text-surface lg:flex-row lg:gap-1"
    >
      <p className="flex-1 text-body-xs lg:text-body-sm">
        We use cookies to see how people use this case study. Quillmesh is
        fictional and stores nothing about you beyond this choice.{" "}
        <Link href="/legal/cookies" className="underline">
          Cookie policy
        </Link>
      </p>
      <div className="flex w-full gap-3 lg:w-auto">
        <Button
          look="outline"
          variant="mono"
          size="sm"
          onClick={() => saveConsent("essential")}
          className="flex-1 border-surface px-3 text-surface hover:bg-neutral-800 lg:flex-none"
        >
          Essential only
        </Button>
        <Button
          size="sm"
          onClick={() => saveConsent("all")}
          className="flex-1 px-5 lg:w-30 lg:flex-none"
        >
          Accept All
        </Button>
      </div>
    </section>
  );
};

export default CookieBar;
