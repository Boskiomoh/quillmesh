import { afterEach, describe, expect, it, vi } from "vitest";

import { cn } from "@/lib/cn";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { isVariant } from "@/lib/variant";

describe("isRateLimited", () => {
  afterEach(() => vi.useRealTimers());

  it("allows the limit, blocks the next call, and resets after the window", () => {
    vi.useFakeTimers();
    const key = `test:${Math.random()}`;
    for (let index = 0; index < 3; index++)
      expect(isRateLimited(key, 3, 1000)).toBe(false);
    expect(isRateLimited(key, 3, 1000)).toBe(true);
    vi.advanceTimersByTime(1001);
    expect(isRateLimited(key, 3, 1000)).toBe(false);
  });

  it("keeps separate counts per key", () => {
    const a = `a:${Math.random()}`;
    const b = `b:${Math.random()}`;
    expect(isRateLimited(a, 1, 60_000)).toBe(false);
    expect(isRateLimited(a, 1, 60_000)).toBe(true);
    expect(isRateLimited(b, 1, 60_000)).toBe(false);
  });
});

describe("clientIp", () => {
  it("uses the first x-forwarded-for hop", () => {
    expect(
      clientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" })),
    ).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip, then unknown", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe(
      "198.51.100.2",
    );
    expect(clientIp(new Headers())).toBe("unknown");
  });
});

describe("isVariant", () => {
  it("accepts only a and b", () => {
    expect(isVariant("a")).toBe(true);
    expect(isVariant("b")).toBe(true);
    expect(isVariant("c")).toBe(false);
    expect(isVariant(undefined)).toBe(false);
  });
});

describe("cn", () => {
  it("lets later classes win, including the project's own tokens", () => {
    expect(cn("inline-flex", "hidden lg:inline-flex")).toBe(
      "hidden lg:inline-flex",
    );
    expect(cn("text-button-md text-ink", "text-surface")).toBe(
      "text-button-md text-surface",
    );
    expect(cn("text-body-sm", "text-body-lg")).toBe("text-body-lg");
    expect(cn("rounded-control", "rounded-card")).toBe("rounded-card");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
