import { PostCard } from "@/components/post-card";
import { DottedDivider, Shell } from "@/components/primitives";
import {
  COLLECTION_INFO,
  getPosts,
  type PostCollection,
} from "@/content/posts";

export function CollectionIndex({ collection }: { collection: PostCollection }) {
  const info = COLLECTION_INFO[collection];
  const posts = getPosts(collection);

  return (
    <>
      <section className="pt-8 sm:pt-12">
        <Shell>
          <p className="text-body-sm text-ink-muted">{info.tag}</p>

          <h1 className="display-xl mt-4 max-w-[16ch] text-heading-3xl text-ink">
            {info.title}
          </h1>

          <p className="mt-6 max-w-[60ch] text-body-lg text-ink-muted">
            {info.blurb}
          </p>
        </Shell>
      </section>

      <section className="pt-12">
        <Shell>
          <div>
            {posts.map((p) => (
              <PostCard key={p.slug} post={p.meta} />
            ))}
            <DottedDivider />
          </div>
        </Shell>
      </section>
    </>
  );
}
