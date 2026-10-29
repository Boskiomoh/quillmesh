import { defineArrayMember, defineField, defineType } from "sanity";

import { cta, heading, image } from "./fields";

const featureCard = defineArrayMember({
  type: "object",
  name: "featureCard",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});

const testimonialFields = [
  defineField({
    name: "quote",
    type: "text",
    rows: 4,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "name",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({ name: "role", type: "string" }),
];

const testimonial = defineArrayMember({
  type: "object",
  name: "testimonial",
  fields: testimonialFields,
  preview: { select: { title: "name", subtitle: "role" } },
});

export const home = defineType({
  name: "home",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "features", title: "Feature grid" },
    { name: "testimonials", title: "Testimonials" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    defineField({
      name: "hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "badge", type: "string" }),
        heading(),
        defineField({ name: "body", type: "text", rows: 3 }),
        cta("primary", "Primary button"),
        cta("secondary", "Secondary button"),
        defineField({ name: "footnote", type: "string" }),
        image(),
        defineField({ name: "statLabel", type: "string" }),
        defineField({ name: "statValue", type: "string" }),
        defineField({ name: "statCaption", type: "string" }),
        defineField({ name: "progressLabel", type: "string" }),
        defineField({
          name: "progressValue",
          type: "number",
          validation: (rule) => rule.min(0).max(100),
        }),
        defineField({ name: "proofLine", type: "string" }),
      ],
    }),
    defineField({
      name: "featureGrid",
      type: "object",
      group: "features",
      description: "Also shown on the Features page",
      fields: [
        heading(),
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          type: "array",
          description:
            "Order: analytics, recovery, signals, visual builder, integrations, access control",
          validation: (rule) => rule.length(6),
          of: [featureCard],
        }),
        defineField({ name: "recoveryStat", type: "string" }),
        defineField({
          name: "signalTags",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 3 }),
        defineField({
          name: "sampleNote",
          type: "string",
          description: "Shown with the quotes, saying they are sample content",
        }),
        defineField({ name: "items", type: "array", of: [testimonial] }),
        defineField({
          name: "featured",
          type: "object",
          fields: testimonialFields,
        }),
      ],
    }),
    defineField({
      name: "faq",
      type: "object",
      group: "faq",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "intro", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
