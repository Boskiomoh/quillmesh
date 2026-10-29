import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import type { FC } from "react";

type Block = PortableTextBlock | { _type: string; _key: string };

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const blockText = (block: Block) =>
  ("children" in block
    ? (block.children as { text?: string }[] | undefined)
        ?.map((child) => child.text)
        .join("")
    : "") ?? "";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-body-sm text-body lg:text-body-md">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={slugify(blockText(value as Block))}
        className="scroll-mt-24 pt-2 font-serif text-h4 font-medium"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-h5 font-bold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="px-4 py-4 text-body-md text-brand italic lg:text-body-lg">
        &ldquo;{children}&rdquo;
      </blockquote>
    ),
  },
  types: {
    pullQuote: ({ value }: { value: { quote?: string; cite?: string } }) => (
      <figure className="my-4 flex flex-col gap-3 rounded-card bg-neutral-200 p-8">
        <blockquote className="font-serif text-h5 font-medium italic lg:text-h4 lg:font-medium">
          &ldquo;{value.quote}&rdquo;
        </blockquote>
        {value.cite && (
          <figcaption className="text-body-sm text-brand">
            — {value.cite}
          </figcaption>
        )}
      </figure>
    ),
    steps: ({
      value,
    }: {
      value: { items?: { _key: string; title?: string; body?: string }[] };
    }) => (
      <ol className="flex flex-col gap-4 py-2">
        {value.items?.map((item, index) => (
          <li key={item._key} className="flex gap-4">
            <span
              aria-hidden
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-body-sm text-green-500"
            >
              {index + 1}
            </span>
            <p className="flex flex-col">
              <span className="font-serif text-h6 font-medium">
                {item.title}
              </span>
              <span className="text-body-sm text-body lg:text-body-md">
                {item.body}
              </span>
            </p>
          </li>
        ))}
      </ol>
    ),
  },
};

interface RichTextProps {
  value: Block[];
}

const RichText: FC<RichTextProps> = ({ value }) => (
  <div className="flex flex-col gap-2">
    <PortableText
      value={value as PortableTextBlock[]}
      components={components}
    />
  </div>
);

export default RichText;
