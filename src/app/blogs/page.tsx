import type { Metadata } from "next";
import { DottedDivider, Shell } from "@/components/primitives";
import { BlogIndex } from "@/components/blog-index";
import { getPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short, opinionated posts on methods, tools, and the weird things we notice in sports data.",
};

export default function BlogsPage() {
  const posts = getPosts("blogs");

  return (
    <>
      <section className="pt-8 sm:pt-12">
        <Shell>
          <p className="text-body-sm text-ink-muted">Field Notes</p>
          <h1 className="display-xl mt-4 max-w-[14ch] text-heading-3xl text-ink">
            Short takes on data and method
          </h1>
          <p className="mt-6 max-w-[60ch] text-body-lg text-ink-muted">
            Opinionated posts on the tools we use, the patterns we notice, and the questions that refuse to stay closed.
          </p>
          <DottedDivider className="my-8" />
        </Shell>
      </section>

      <BlogIndex posts={posts} />
    </>
  );
}