import { defineArrayMember, defineField, defineType } from "sanity";

import { cta, heading } from "./fields";

export const settings = defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "announcement", title: "Announcement bar", default: true },
    { name: "stats", title: "Stats" },
    { name: "cta", title: "CTA panel" },
    { name: "newsletter", title: "Newsletter" },
    { name: "pricing", title: "Pricing page" },
  ],
  fields: [
    defineField({
      name: "announcement",
      type: "object",
      group: "announcement",
      fields: [
        defineField({
          name: "text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        cta("link", "Link"),
      ],
    }),
    defineField({
      name: "logos",
      title: "Logo wall",
      type: "object",
      group: "announcement",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({
          name: "names",
          description: "Invented company names, set as wordmarks",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "stats",
      type: "object",
      group: "stats",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 2 }),
        defineField({
          name: "items",
          type: "array",
          validation: (rule) => rule.length(4),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "value", type: "string" }),
                defineField({ name: "label", type: "string" }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
        defineField({
          name: "note",
          type: "string",
          description: "Shown under the numbers",
        }),
      ],
    }),
    defineField({
      name: "ctaPanel",
      title: "CTA panel",
      type: "object",
      group: "cta",
      fields: [
        heading(),
        cta("primary", "Primary button"),
        cta("secondary", "Secondary button"),
        defineField({ name: "note", type: "string" }),
        defineField({ name: "quote", type: "text", rows: 3 }),
        defineField({ name: "quoteName", type: "string" }),
        defineField({ name: "quoteRole", type: "string" }),
      ],
    }),
    defineField({
      name: "newsletter",
      type: "object",
      group: "newsletter",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "pricingHero",
      title: "Pricing page hero",
      type: "object",
      group: "pricing",
      description: "Plans and FAQs are edited in their own lists",
      fields: [
        defineField({ name: "badge", type: "string" }),
        heading(),
        defineField({ name: "body", type: "text", rows: 3 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
