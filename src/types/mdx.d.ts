/*
  Augments `@types/mdx` so every MDX post's `export const metadata` is typed.

  Each post in `src/content/<collection>/*.mdx` exports a `metadata` object
  matching PostMetadata. This ambient module declaration merges with the one
  from `@types/mdx` (which only types the default component export).
*/
declare module "*.mdx" {
  import type { PostMetadata } from "@/content/types";
  export const metadata: PostMetadata;
}