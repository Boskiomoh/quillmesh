import { defineArrayMember, defineField, defineType } from "sanity";

import { cta, heading, image } from "./fields";

const hero = defineField({
  name: "hero",
  type: "object",
  fields: [
    defineField({ name: "badge", type: "string" }),
    heading(),
    defineField({ name: "body", type: "text", rows: 3 }),
    cta("primary", "Primary button"),
    cta("secondary", "Secondary button"),
  ],
});

const strings = (name: string, title?: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });

export const featuresPage = defineType({
  name: "featuresPage",
  title: "Features page",
  type: "document",
  fields: [
    hero,
    defineField({
      name: "builtFor",
      title: "Built for real teams",
      type: "object",
      fields: [
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
        strings("points"),
        cta("link", "Link"),
      ],
    }),
    defineField({
      name: "logic",
      title: "Logic layers",
      type: "object",
      fields: [
        defineField({ name: "codeLabel", type: "string" }),
        defineField({ name: "codeQuote", type: "string" }),
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
        strings("examples"),
        cta("link", "Link"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Features page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "badge", type: "string" }),
        heading(),
        defineField({ name: "body", type: "text", rows: 3 }),
        image(),
        defineField({ name: "locationLabel", type: "string" }),
        defineField({ name: "location", type: "string" }),
      ],
    }),
    defineField({
      name: "values",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "intro", type: "string" }),
        defineField({
          name: "items",
          type: "array",
          validation: (rule) => rule.length(3),
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
      ],
    }),
    defineField({
      name: "team",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "intro", type: "string" }),
        cta("link", "Link"),
        defineField({
          name: "members",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", type: "string" }),
                defineField({ name: "role", type: "string" }),
                defineField({ name: "team", type: "string" }),
              ],
              preview: { select: { title: "name", subtitle: "role" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
