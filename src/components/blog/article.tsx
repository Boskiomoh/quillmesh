import { HeadsetIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import DarkPanel from "@/components/sections/dark-panel";
import Newsletter from "@/components/sections/newsletter";
import Badge from "@/components/ui/badge";
import RichText, { blockText, slugify } from "@/components/ui/rich-text";
import type { PostQueryResult, SettingsQueryResult } from "@/sanity/types";

import Cover from "./cover";
import MorePosts from "./more-posts";
import { PostMeta } from "./post-card";
import TocNav from "./toc-nav";

type Post = NonNullable<PostQueryResult["post"]>;
interface ArticleProps {
  post: Post;
  more: NonNullable<PostQueryResult["more"]>;
  settings: SettingsQueryResult;
}

const Article: FC<ArticleProps> = ({ post, more, settings }) => {
  // Derived
  const toc = (post.body ?? [])
    .filter((block) => "style" in block && block.style === "h2")
    .map((block) => ({
      id: slugify(blockText(block)),
      text: blockText(block),
    }));

  return (
    <>
      <div className="flex flex-col gap-12 p-6 lg:flex-row lg:p-16">
        <article className="flex min-w-0 flex-col lg:w-176">
          <header className="flex flex-col gap-8 lg:flex-row lg:items-end">
            <div className="flex flex-col gap-3 lg:w-108">
              <p className="text-body-xs text-brand uppercase">
                {post.category}
              </p>
              <h1 className="font-serif text-h3 font-medium italic lg:text-h2 lg:font-medium">
                {post.title}
              </h1>
            </div>
            <div className="pb-3">
              <PostMeta post={post} />
            </div>
          </header>
          <div className="flex flex-col gap-2 pt-6">
            <Cover
              image={post.cover}
              category={post.category}
              sizes="(min-width: 1024px) 704px, 100vw"
              isPriority
              className="h-56 lg:h-99"
            />
            {post.lede && (
              <p className="py-4 text-body-md text-body lg:text-body-lg">
                {post.lede}
              </p>
            )}
            <RichText value={post.body ?? []} />
            {post.tags && (
              <ul aria-label="Tags" className="flex flex-wrap gap-2 py-4">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge tone="tertiary">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <DarkPanel className="mt-4 px-6 py-12 text-center lg:p-16">
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-serif text-h3 font-medium lg:text-h2 lg:font-medium">
                Try Quillmesh free for 14 days
              </h2>
              <p className="text-body-md italic lg:text-body-lg">
                No setup call. No credit card. First playbook in 18 minutes.
              </p>
              <div className="flex w-full flex-col justify-center gap-4 pt-3 lg:flex-row">
                <TrackedButton
                  href="/demo"
                  event="cta_click"
                  label="article_cta_primary"
                  size="lg"
                >
                  Create an Account
                </TrackedButton>
                <TrackedButton
                  href="/demo?topic=sales"
                  event="cta_click"
                  label="article_cta_secondary"
                  look="outline"
                  variant="mono"
                  size="lg"
                  className="border-surface text-surface hover:bg-neutral-800"
                >
                  Talk to our team instead
                  <HeadsetIcon aria-hidden />
                </TrackedButton>
              </div>
              <p className="text-body-xs italic">
                Sample offer: Quillmesh is a fictional product.
              </p>
            </div>
          </DarkPanel>
        </article>
        <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:w-100 lg:self-start">
          {toc.length > 0 && <TocNav items={toc} />}
          {settings?.newsletter && (
            <Newsletter content={settings.newsletter} variant="light" />
          )}
        </aside>
      </div>
      {more.length > 0 && <MorePosts posts={more} />}
    </>
  );
};

export default Article;
