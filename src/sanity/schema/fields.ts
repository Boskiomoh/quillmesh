import { defineArrayMember, defineField } from "sanity";

export const cta = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "label",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "href",
        type: "string",
        validation: (rule) => rule.required(),
      }),
    ],
  });

export const heading = (name = "heading", title = "Heading") =>
  defineField({
    name,
    title,
    type: "object",
    description:
      "The emphasis is set in blue italic inside the heading. Leave it empty for none.",
    fields: [
      defineField({
        name: "text",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "emphasis",
        type: "string",
        validation: (rule) =>
          rule.custom((emphasis, context) => {
            const text =
              (context.parent as { text?: string } | undefined)?.text ?? "";
            return (
              !emphasis ||
              text.includes(emphasis) ||
              "Must be a word or phrase from the heading"
            );
          }),
      }),
    ],
  });

export const image = (name = "image", title = "Image") =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        description:
          "Describe the image for screen readers. Leave empty only if it is decorative.",
      }),
      defineField({
        name: "credit",
        type: "string",
        description: "Photographer and licence",
      }),
    ],
  });

export const richText = (name = "body", title = "Body") =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading", value: "h2" },
          { title: "Subheading", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
      },
      defineArrayMember({
        name: "pullQuote",
        title: "Pull quote",
        type: "object",
        fields: [
          defineField({
            name: "quote",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({ name: "cite", type: "string" }),
        ],
        preview: { select: { title: "quote", subtitle: "cite" } },
      }),
      defineArrayMember({
        name: "steps",
        title: "Numbered steps",
        type: "object",
        fields: [
          defineField({
            name: "items",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields: [
                  defineField({ name: "title", type: "string" }),
                  defineField({ name: "body", type: "string" }),
                ],
              }),
            ],
          }),
        ],
        preview: { prepare: () => ({ title: "Numbered steps" }) },
      }),
    ],
  });
