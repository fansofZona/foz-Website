"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { DottedDivider } from "@/components/primitives";
import type { PostMeta } from "@/content/posts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const filterItem =
  "h-auto rounded-pill border-[1.5px] px-5 py-2 text-body-sm font-normal " +
  "border-ink text-ink hover:bg-surface-muted " +
  "data-[state=on]:border-feature data-[state=on]:bg-feature data-[state=on]:text-chalk " +
  "hover:data-[state=on]:bg-feature";

export function ProjectGrid({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<string>("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.kind)))],
    [posts],
  );

  const shown =
    filter === "All" ? posts : posts.filter((p) => p.kind === filter);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup
          type="single"
          variant="outline"
          value={filter}
          onValueChange={(v) => v && setFilter(v)}
          aria-label="Filter projects by kind"
        >
          {filters.map((f) => (
            <ToggleGroupItem key={f} value={f} className={filterItem}>
              {f}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <span className="font-meta ledger-figures ml-auto">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="mt-8">
        {shown.map((p) => (
          <PostCard key={p.href} post={p} />
        ))}
        <DottedDivider />
      </div>
    </>
  );
}