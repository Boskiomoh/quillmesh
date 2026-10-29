import Link from "next/link";
import type { FC } from "react";

import Avatar from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import type { BlogQueryResult } from "@/sanity/types";

import Cover from "./cover";

export type PostSummary = Omit<BlogQueryResult["posts"][number], "isFeatured">;

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const PostMeta: FC<{
  post: Pick<PostSummary, "author" | "readingMinutes" | "publishedAt">;
  isLight?: boolean;
}> = ({ post, isLight }) => (
  <div className="flex items-center gap-4 pt-4">
    <Avatar name={post.author ?? ""} />
    <p className="flex flex-col text-body-xs">
      <span
        className={cn(
          "text-body-sm font-bold",
          isLight ? "text-surface" : "text-ink",
        )}
      >
        {post.author}
      </span>
      <span className={isLight ? "text-neutral-300" : "text-muted"}>
        {post.readingMinutes} min read •{" "}
        {post.publishedAt && dateFormat.format(new Date(post.publishedAt))}
      </span>
    </p>
  </div>
);

interface PostCardProps {
  post: PostSummary;
  layout?: "card" | "wide" | "featured";
  headingLevel?: "h2" | "h3";
}

const PostCard: FC<PostCardProps> = ({
  post,
  layout = "card",
  headingLevel = "h3",
}) => {
  // Derived
  const Heading = headingLevel;
  const isFeatured = layout === "featured";

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-1",
        layout === "card" && "rounded-card border border-line bg-surface p-8",
        layout === "wide" &&
          "rounded-card border border-line bg-surface p-8 lg:flex-row lg:gap-8",
        isFeatured && "lg:flex-row lg:items-center lg:gap-10",
      )}
    >
      <Cover
        image={post.cover}
        category={post.category}
        sizes={
          isFeatured
            ? "(min-width: 1024px) 712px, 100vw"
            : "(min-width: 1024px) 360px, 100vw"
        }
        isPriority={isFeatured}
        className={cn(
          "h-40 shrink-0",
          layout === "wide" && "lg:h-auto lg:w-72",
          isFeatured && "h-60 lg:h-125 lg:w-1/2 xl:w-178",
        )}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="pt-3 text-body-xs text-brand uppercase">
          {post.category}
        </p>
        <Heading
          className={cn(
            "pb-3 font-serif break-words",
            isFeatured
              ? "pt-3 text-h3 font-medium italic lg:text-h1 lg:font-medium"
              : "text-h5 font-bold",
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 hover:text-brand"
          >
            {post.title}
          </Link>
        </Heading>
        <p
          className={cn(
            "text-body",
            isFeatured
              ? "pt-6 text-body-md lg:text-body-lg"
              : "line-clamp-5 text-justify text-body-sm",
            layout === "wide" && "line-clamp-6",
          )}
        >
          {post.excerpt}
        </p>
        <PostMeta post={post} />
      </div>
    </article>
  );
};

export default PostCard;
