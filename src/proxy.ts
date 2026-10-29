import { NextResponse, type NextRequest } from "next/server";

import { isVariant, variantCookie, type Variant } from "@/lib/variant";

export function proxy(request: NextRequest) {
  const forced = request.nextUrl.searchParams.get("variant");
  const saved = request.cookies.get(variantCookie)?.value;
  const variant: Variant = isVariant(forced)
    ? forced
    : isVariant(saved)
      ? saved
      : Math.random() < 0.5
        ? "a"
        : "b";

  const url = request.nextUrl.clone();
  url.pathname = `/lp/automate/${variant}`;
  url.searchParams.delete("variant");

  const response = NextResponse.rewrite(url);
  if (variant !== saved) {
    response.cookies.set(variantCookie, variant, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      httpOnly: true,
      path: "/",
    });
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: "/lp/automate",
};
