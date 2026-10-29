import {
  CaretLeftIcon,
  CaretRightIcon,
  NewspaperIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { FC } from "react";

import CtaPanel from "@/components/sections/cta-panel";
import Newsletter from "@/components/sections/newsletter";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { BlogQueryResult, SettingsQueryResult } from "@/sanity/types";

import PostCard from "./post-card";

export const postsPerPage = 5;

interface BlogProps {
  content: BlogQueryResult;
  settings: SettingsQueryResult;
  page: number;
  category?: string;
}

const Blog: FC<BlogProps> = ({ content, settings, page, category }) => {
  // Derived
  const total = content.posts.length;
  const totalPages = Math.max(1, Math.ceil(total / postsPerPage));
  const posts = content.posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  );
  const [featured, ...rest] = posts;
  const pageHref = (target: number) =>
    target === 1 ? "/blog" : `/blog/page/${target}`;
  const chip =
    "inline-flex min-h-10 items-center rounded-control px-2 text-button-sm font-medium transition-colors";

  return (
    <>
      <section className="p-6 lg:p-16">
        <div className="flex flex-col pt-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-10">
            <div className="flex flex-col gap-2 lg:w-178">
              <Badge
                icon={<NewspaperIcon aria-hidden weight="duotone" />}
                className="uppercase"
              >
                From the Quillmesh blog
              </Badge>
              <h1 className="font-serif text-display-sm lg:text-display lg:tracking-tighter">
                The Quillmesh Blog
              </h1>
              <span aria-hidden className="h-1 w-32 bg-brand" />
            </div>
            <p className="text-body-md text-body lg:w-100 lg:pb-10">
              Ops strategy, product thinking, and honest stories about how SaaS
              teams actually run. Sample articles for this case study.
            </p>
          </div>
          <nav
            aria-label="Blog categories"
            className="-mx-6 overflow-x-auto px-6 pt-10 pb-6 lg:mx-0 lg:px-0"
          >
            <ul className="flex gap-3">
              <li>
                <Link
                  href="/blog"
                  aria-current={!category ? "page" : undefined}
                  className={cn(
                    chip,
                    !category
                      ? "bg-brand text-surface"
                      : "border border-line text-ink hover:bg-subtle",
                  )}
                >
                  All
                </Link>
              </li>
              {content.categories.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/blog/category/${item.slug}`}
                    aria-current={category === item.slug ? "page" : undefined}
                    className={cn(
                      chip,
                      "whitespace-nowrap",
                      category === item.slug
                        ? "bg-brand text-surface"
                        : "border border-line text-ink hover:bg-subtle",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {featured ? (
            <PostCard post={featured} layout="featured" headingLevel="h2" />
          ) : (
            <p className="rounded-card border border-line bg-surface p-8 text-body-md text-body">
              No posts in this category yet.{" "}
              <Link href="/blog" className="text-brand underline">
                See all posts
              </Link>
            </p>
          )}
        </div>
      </section>

      {rest.length > 0 && (
        <section
          aria-label="More posts"
          className="flex flex-col gap-8 px-6 pb-6 lg:px-16 lg:pb-16"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {rest.slice(0, 3).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
            {rest[3] && (
              <div className="lg:col-span-2">
                <PostCard post={rest[3]} layout="wide" />
              </div>
            )}
            {settings?.newsletter && (
              <Newsletter content={settings.newsletter} variant="blue" />
            )}
          </div>
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex flex-col items-center justify-between gap-4 py-4 text-body-sm lg:flex-row"
            >
              <p>
                Shows <b>{(page - 1) * postsPerPage + 1}</b> to{" "}
                <b>{Math.min(page * postsPerPage, total)}</b> from{" "}
                <b>{total}</b> posts
              </p>
              <div className="flex items-center gap-2">
                <span>Page</span>
                {page > 1 ? (
                  <Link
                    href={pageHref(page - 1)}
                    aria-label="Previous page"
                    className="inline-flex size-8 items-center justify-center rounded-control bg-brand text-surface"
                  >
                    <CaretLeftIcon
                      aria-hidden
                      className="size-4 rtl:-scale-x-100"
                    />
                  </Link>
                ) : (
                  <span
                    aria-hidden
                    className="inline-flex size-8 items-center justify-center rounded-control bg-subtle text-neutral-400"
                  >
                    <CaretLeftIcon className="size-4 rtl:-scale-x-100" />
                  </span>
                )}
                <span
                  aria-current="page"
                  className="inline-flex size-8 items-center justify-center rounded-control border border-neutral-300 font-bold"
                >
                  {page}
                </span>
                <span>of</span>
                <b>{totalPages}</b>
                <span>pages</span>
                {page < totalPages ? (
                  <Link
                    href={pageHref(page + 1)}
                    aria-label="Next page"
                    className="inline-flex size-8 items-center justify-center rounded-control bg-brand text-surface"
                  >
                    <CaretRightIcon
                      aria-hidden
                      className="size-4 rtl:-scale-x-100"
                    />
                  </Link>
                ) : (
                  <span
                    aria-hidden
                    className="inline-flex size-8 items-center justify-center rounded-control bg-subtle text-neutral-400"
                  >
                    <CaretRightIcon className="size-4 rtl:-scale-x-100" />
                  </span>
                )}
              </div>
            </nav>
          )}
        </section>
      )}

      {settings?.ctaPanel && (
        <CtaPanel content={settings.ctaPanel} source="blog" />
      )}
    </>
  );
};

export default Blog;
