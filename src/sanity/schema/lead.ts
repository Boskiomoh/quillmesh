import { defineField, defineType } from "sanity";

export const lead = defineType({
  name: "lead",
  title: "Demo request",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "teamSize", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({
      name: "source",
      type: "string",
      description: "Page and A/B variant",
    }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

export const subscriber = defineType({
  name: "subscriber",
  title: "Newsletter subscriber",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "email", type: "string" }),
    defineField({ name: "subscribedAt", type: "datetime" }),
  ],
  preview: { select: { title: "email", subtitle: "subscribedAt" } },
});

export const event = defineType({
  name: "event",
  title: "Analytics event",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "event", type: "string" }),
    defineField({ name: "label", type: "string" }),
    defineField({ name: "path", type: "string" }),
    defineField({ name: "variant", type: "string" }),
    defineField({ name: "at", type: "datetime" }),
  ],
  preview: { select: { title: "label", subtitle: "event" } },
});
