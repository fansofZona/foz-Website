import type { ComponentType } from "react";

export type PostCollection = "projects" | "blogs" | "research";

/**
 * Metadata exported from each MDX post. Content files in
 * `src/content/<collection>/*.mdx` declare `export const metadata: PostMetadata`.
 */
export type PostMetadata = {
  title: string;
  description: string;
  /** Category label, e.g. "Research report", "Article", "Tool". */
  kind: string;
  /** The sport this touches, e.g. "Soccer". */
  sport: string;
  year: string;
  authors: string[];
  stack?: string[];
  featured?: boolean;
};

/** Indexed, route-ready record for list pages and card grids. */
export type PostMeta = PostMetadata & {
  slug: string;
  collection: PostCollection;
  href: string;
};

export type MdxModule = {
  default: ComponentType;
  metadata: PostMetadata;
};

export const COLLECTION_INFO: Record<
  PostCollection,
  { title: string; blurb: string; tag: string }
> = {
  projects: {
    title: "Projects",
    tag: "Published work",
    blurb:
      "Reports, articles, tools, and datasets published by our student sports analytics teams.",
  },
  blogs: {
    title: "Blog",
    tag: "Field notes",
    blurb:
      "Short, opinionated posts on methods, tools, and the weird things we notice in sports data.",
  },
  research: {
    title: "Research",
    tag: "Methods & results",
    blurb:
      "Full write-ups: a question, a dataset, a model, and the honest caveats that come with it.",
  },
};