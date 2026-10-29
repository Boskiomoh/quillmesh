import { defineArrayMember, defineField, defineType } from "sanity";

import { cta, heading, image, richText } from "./fields";

const order = defineField({ name: "order", type: "number", initialValue: 10 });
const byOrder = [
  {
    title: "Order",
    name: "order",
    by: [{ field: "order", direction: "asc" as const }],
  },
];

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    order,
  ],
  orderings: byOrder,
  preview: { select: { title: "question" } },
});

export const plan = defineType({
  name: "plan",
  title: "Pricing plan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "monthlyPrice",
      type: "number",
      description: "In USD. Leave empty for custom pricing.",
    }),
    defineField({
      name: "annualPrice",
      type: "number",
      description:
        "Per month, billed annually. Leave empty for custom pricing.",
    }),
    defineField({
      name: "period",
      type: "string",
      description: "For example: / month, / forever",
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    cta("cta", "Button"),
    defineField({
      name: "isPopular",
      title: "Popular",
      type: "boolean",
      initialValue: false,
    }),
    order,
  ],
  orderings: byOrder,
  preview: { select: { title: "name", subtitle: "description" } },
});

export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    order,
  ],
  orderings: byOrder,
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    image("cover", "Cover image"),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "readingMinutes", type: "number" }),
    defineField({
      name: "publishedAt",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    richText(),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "newest",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "author", media: "cover" } },
});

export const release = defineType({
  name: "release",
  title: "Changelog release",
  type: "document",
  fields: [
    defineField({
      name: "version",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      description: "For example: Current system",
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "released",
      type: "string",
      description: "Shown as written",
    }),
    defineField({
      name: "releasedAt",
      type: "date",
      description: "Used for ordering",
    }),
    defineField({ name: "summary", type: "text", rows: 2 }),
    defineField({
      name: "groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "kind",
              type: "string",
              options: {
                list: [
                  "New features",
                  "Improvements",
                  "Bug fixes",
                  "Core infrastructure",
                ],
              },
            }),
            defineField({
              name: "items",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 2 })],
            }),
          ],
          preview: { select: { title: "kind" } },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "newest",
      by: [{ field: "releasedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "version" } },
});

export const legal = defineType({
  name: "legal",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "updatedAt", type: "date" }),
    richText(),
  ],
});

export const prelander = defineType({
  name: "prelander",
  title: "Pre-lander",
  type: "document",
  description:
    "The article-style page at /go/automate that warms visitors up before the A/B landing page",
  fields: [
    defineField({ name: "badge", type: "string" }),
    heading(),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({
      name: "points",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({ name: "closing", type: "text", rows: 2 }),
    cta("cta", "Button"),
  ],
  preview: { prepare: () => ({ title: "Pre-lander" }) },
});

export const landing = defineType({
  name: "landing",
  title: "A/B landing variant",
  type: "document",
  description: "Two documents, variant a and b, share the /lp/automate address",
  fields: [
    defineField({
      name: "variant",
      type: "string",
      options: { list: ["a", "b"], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "internalName", type: "string" }),
    defineField({ name: "badge", type: "string" }),
    heading(),
    defineField({ name: "body", type: "text", rows: 3 }),
    cta("cta", "Button"),
    defineField({
      name: "proofPoints",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: { select: { title: "internalName", subtitle: "variant" } },
});
