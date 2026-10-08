import Link from "next/link";
import { DottedDivider, Shell, Tag } from "@/components/primitives";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PostRecord } from "@/content/posts";

export function BlogIndex({ posts }: { posts: PostRecord[] }) {
  if (posts.length === 0) {
    return (
      <section className="pt-12">
        <Shell>
          <p className="text-body text-ink-muted">No blog posts yet.</p>
        </Shell>
      </section>
    );
  }

  const featured = posts[0];
  const remaining = posts.slice(1);

  return (
    <section className="pt-12">
      <Shell>
        {/* Featured post — full width hero */}
        <article className="mb-12">
          <Card className="gap-0 overflow-hidden rounded-card bg-surface ring-0">
            <Link
              href={featured.meta.href}
              className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:flex-row"
            >
              <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Tag tone="outline" className="text-caption">
                      {featured.meta.kind}
                    </Tag>
                    <Tag tone="outline" className="text-caption">
                      {featured.meta.sport}
                    </Tag>
                  </div>
                  <h2 className="display-sm mt-6 max-w-xl text-heading text-ink group-hover:text-feature">
                    {featured.meta.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-body text-ink-muted">
                    {featured.meta.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <p className="text-caption text-ink-muted">
                    {featured.meta.year}
                  </p>
                  {featured.meta.authors && (
                    <p className="text-caption text-ink-muted">
                      by {featured.meta.authors.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-48 w-full flex-shrink-0 bg-surface-muted lg:h-auto lg:w-80" />
            </Link>
          </Card>
        </article>

        <DottedDivider className="my-12" />

        {/* Posts grid — newspaper style */}
        {remaining.length > 0 && (
          <>
            <h3 className="display-sm mb-8 text-heading-3xl text-ink">
              More from the blog
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remaining.map((post) => (
                <article key={post.slug}>
                  <Card className="group h-full gap-0 overflow-hidden rounded-card bg-surface ring-0 transition-transform hover:-translate-y-1">
                    <Link
                      href={post.meta.href}
                      className="flex flex-col rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <div className="h-40 w-full flex-shrink-0 bg-surface-muted" />
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex flex-wrap gap-1.5">
                            <Tag tone="rain" className="text-xs">
                              {post.meta.kind}
                            </Tag>
                            <Tag tone="cloud" className="text-xs">
                              {post.meta.sport}
                            </Tag>
                          </div>
                          <h3 className="display-sm mt-3 line-clamp-3 text-subheading text-ink group-hover:text-feature">
                            {post.meta.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-body-sm text-ink-muted">
                            {post.meta.description}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 pt-3 text-caption text-ink-muted">
                          <span>{post.meta.year}</span>
                          {post.meta.authors && (
                            <span>
                              {post.meta.authors.length === 1
                                ? post.meta.authors[0]
                                : `${post.meta.authors[0]} +${post.meta.authors.length - 1}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Card>
                </article>
              ))}
            </div>
          </>
        )}
      </Shell>
    </section>
  );
}
