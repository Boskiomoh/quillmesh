"use server";

import debug from "debug";
import { cookies, headers } from "next/headers";

import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { isVariant, variantCookie } from "@/lib/variant";
import { leadsClient } from "@/sanity/write-client";

import {
  demoSchema,
  fieldErrors,
  formValues,
  newsletterSchema,
  type FormState,
  type SubmittedValues,
} from "./schema";

const log = debug("actions:forms");

const tooMany = (values: SubmittedValues): FormState => ({
  status: "error",
  message:
    "Too many requests from your network. Please wait a few minutes and try again.",
  values,
});

const failed = (values: SubmittedValues): FormState => ({
  status: "error",
  message:
    "We couldn't save your request just now. Please try again in a minute.",
  values,
});

export const requestDemo = async (
  _state: FormState,
  formData: FormData,
): Promise<FormState> => {
  const values = formValues(formData);
  const parsed = demoSchema.safeParse(values);

  if (!parsed.success) {
    return { status: "invalid", errors: fieldErrors(parsed.error), values };
  }

  const ip = clientIp(await headers());

  if (
    isRateLimited(`demo:${ip}`, 5, 10 * 60_000) ||
    isRateLimited("demo:all", 200, 60 * 60_000)
  ) {
    return tooMany(values);
  }

  const { name, email, company, teamSize, message, source } = parsed.data;
  const cookieStore = await cookies();
  const variant = cookieStore.get(variantCookie)?.value;

  try {
    await leadsClient.create({
      _type: "lead",
      name,
      email,
      company,
      teamSize,
      message,
      source: `${source}${isVariant(variant) ? ` (variant ${variant})` : ""}`,
      submittedAt: new Date().toISOString(),
    });

    return { status: "success" };
  } catch (error) {
    log("request-demo:", error);
    return failed(values);
  }
};

export const subscribe = async (
  _state: FormState,
  formData: FormData,
): Promise<FormState> => {
  const values = formValues(formData);
  const parsed = newsletterSchema.safeParse(values);

  if (!parsed.success) {
    return { status: "invalid", errors: fieldErrors(parsed.error), values };
  }

  const ip = clientIp(await headers());

  if (
    isRateLimited(`newsletter:${ip}`, 5, 10 * 60_000) ||
    isRateLimited("newsletter:all", 200, 60 * 60_000)
  ) {
    return tooMany(values);
  }

  const email = parsed.data.email.toLowerCase();

  try {
    await leadsClient.createIfNotExists({
      _id: `subscriber-${Buffer.from(email).toString("hex").slice(0, 120)}`,
      _type: "subscriber",
      email,
      subscribedAt: new Date().toISOString(),
    });

    return { status: "success" };
  } catch (error) {
    log("subscribe:", error);
    return failed(values);
  }
};
