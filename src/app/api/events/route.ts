import debug from "debug";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { isVariant, variantCookie } from "@/lib/variant";
import { leadsClient } from "@/sanity/write-client";

const log = debug("api:events");

const eventSchema = z.strictObject({
  event: z.enum(["page_view", "cta_click", "form_submit"]),
  label: z.string().regex(/^[a-z0-9_]{1,48}$/),
  path: z.string().regex(/^\/[a-z0-9/_-]{0,80}$/),
});

// Record an analytics event
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);

  if (
    isRateLimited(`events:${ip}`, 60, 60_000) ||
    isRateLimited("events:all", 2_000, 60_000)
  ) {
    return NextResponse.json({ message: "Too many events" }, { status: 429 });
  }

  const cookieStore = await cookies();
  const variant = cookieStore.get(variantCookie)?.value;

  try {
    const parsed = eventSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Bad Request: Invalid event" },
        { status: 400 },
      );
    }

    await leadsClient.create({
      _type: "event",
      ...parsed.data,
      variant: isVariant(variant) ? variant : null,
      at: new Date().toISOString(),
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Bad Request: Invalid JSON" },
        { status: 400 },
      );
    }

    log("create:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
