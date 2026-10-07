import type { ReactNode } from "react";
import Link from "next/link";
import { Shell } from "@/components/primitives";
import { COLLECTION_INFO, type PostRecord } from "@/content/posts";

export function PostPage({
  post,
  children,
}: {
  post: PostRecord;
  children: ReactNode;
}) {
  const { meta } = post;
  const collection = COLLECTION_INFO[meta.collection];

  return (
    <>
      <section className="pt-8 sm:pt-12">
        <Shell>
          <Link
            href={`/${meta.collection}`}
            className="text-body-sm text-ink-muted underline decoration-dotted underline-offset-4 hover:text-ink"
          >
            Back to {collection.title.toLowerCase()}
          </Link>

          <h1 className="display-xl mt-6 max-w-[20ch] text-heading-3xl text-ink">
            {meta.title}
          </h1>

          <p className="mt-6 max-w-[60ch] text-body-lg text-ink-muted">
            {meta.description}
          </p>

          <p className="font-meta ledger-figures mt-8">
            {meta.kind}, {meta.sport}, {meta.year} — by{" "}
            {meta.authors.join(", ")}
          </p>
          {meta.stack?.length ? (
            <p className="font-meta ledger-figures mt-2">
              Built with {meta.stack.join(", ")}
            </p>
          ) : null}
        </Shell>
      </section>

      <section className="pt-12">
        <Shell>
          <article className="mx-auto max-w-[760px] pb-2">{children}</article>
        </Shell>
      </section>
    </>
  );
}
