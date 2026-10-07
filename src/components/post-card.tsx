import Link from "next/link";
import type { PostMeta } from "@/content/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={post.href}
      className="ledger-row group rounded-small focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <span>
        <span className="ledger-title display-sm block text-subheading text-ink">
          {post.title}
        </span>
        <span className="mt-2 block max-w-[62ch] text-body-sm leading-[1.55] text-ink-muted">
          {post.description}
        </span>
      </span>
      <span className="font-meta ledger-figures whitespace-nowrap">
        {post.kind}, {post.sport}, {post.year}
      </span>
    </Link>
  );
}
