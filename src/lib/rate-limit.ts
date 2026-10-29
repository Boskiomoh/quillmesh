const windows = new Map<string, { start: number; count: number }>();

export const isRateLimited = (key: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry || now - entry.start > windowMs) {
    windows.set(key, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
};

export const clientIp = (headers: Headers) =>
  headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  headers.get("x-real-ip") ||
  "unknown";
