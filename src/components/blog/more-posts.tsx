"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef, type FC } from "react";

import PostCard, { type PostSummary } from "./post-card";

interface MorePostsProps {
  posts: PostSummary[];
}

const MorePosts: FC<MorePostsProps> = ({ posts }) => {
  // Ref
  const rowRef = useRef<HTMLUListElement>(null);

  // Handlers
  const handleScroll = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const isRtl = getComputedStyle(row).direction === "rtl";
    row.scrollBy({
      left:
        direction *
        (isRtl ? -1 : 1) *
        (row.firstElementChild?.clientWidth ?? 300),
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="more-heading"
      className="flex flex-col gap-8 p-6 lg:p-16"
    >
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2
            id="more-heading"
            className="font-serif text-h3 font-medium lg:text-h2 lg:font-medium"
          >
            More from Quillmesh
          </h2>
          <p className="text-body-md text-body">
            Sample articles on automation and SaaS ops.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll back"
            onClick={() => handleScroll(-1)}
            className="inline-flex size-10 items-center justify-center rounded-control text-muted hover:bg-subtle hover:text-ink"
          >
            <ArrowLeftIcon aria-hidden className="size-5 rtl:-scale-x-100" />
          </button>
          <button
            type="button"
            aria-label="Scroll forward"
            onClick={() => handleScroll(1)}
            className="inline-flex size-10 items-center justify-center rounded-control text-ink hover:bg-subtle"
          >
            <ArrowRightIcon aria-hidden className="size-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
      <ul
        ref={rowRef}
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0"
      >
        {posts.map((post) => (
          <li key={post._id} className="w-80 shrink-0 snap-start lg:w-92">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MorePosts;
