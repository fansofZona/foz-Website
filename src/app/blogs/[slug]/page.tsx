import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/post-page";
import { getPost, getSlugs } from "@/content/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("blogs").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blogs", slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost("blogs", slug);
  if (!post) notFound();

  const { Module } = post;
  return (
    <PostPage post={post}>
      <Module />
    </PostPage>
  );
}