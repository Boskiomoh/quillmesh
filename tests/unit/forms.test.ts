import { describe, expect, it } from "vitest";

import {
  demoSchema,
  fieldErrors,
  formValues,
  newsletterSchema,
} from "@/components/forms/schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@company.com",
  company: "Analytical Engines",
  teamSize: "11-50",
  message: "",
  website: "",
  source: "lp/automate/a",
};

describe("demoSchema", () => {
  it("accepts a complete request", () => {
    expect(demoSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ["name", "A"],
    ["email", "ada@"],
    ["company", ""],
    ["teamSize", "1000"],
    ["message", "x".repeat(1001)],
  ])("rejects an invalid %s", (field, value) => {
    const result = demoSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(Object.keys(fieldErrors(result.error))).toContain(field);
  });

  it("rejects a filled honeypot (bots)", () => {
    expect(
      demoSchema.safeParse({ ...valid, website: "https://spam.example" })
        .success,
    ).toBe(false);
  });

  it("rejects unknown fields", () => {
    expect(demoSchema.safeParse({ ...valid, isAdmin: "true" }).success).toBe(
      false,
    );
  });

  it("rejects a source that isn't a plain path", () => {
    expect(demoSchema.safeParse({ ...valid, source: "<script>" }).success).toBe(
      false,
    );
  });

  it("trims names and companies", () => {
    const result = demoSchema.parse({ ...valid, name: "  Ada  " });
    expect(result.name).toBe("Ada");
  });
});

describe("newsletterSchema", () => {
  it("accepts an email and an empty honeypot", () => {
    expect(
      newsletterSchema.safeParse({ email: "a@b.co", website: "" }).success,
    ).toBe(true);
  });

  it("rejects a bad email", () => {
    expect(
      newsletterSchema.safeParse({ email: "nope", website: "" }).success,
    ).toBe(false);
  });
});

describe("formValues", () => {
  it("drops React's $ACTION fields and keeps string values", () => {
    const data = new FormData();
    data.set("name", "Ada");
    data.set("$ACTION_REF_1", "");
    data.set("$ACTION_1:0", "{}");
    expect(formValues(data)).toEqual({ name: "Ada" });
  });
});
