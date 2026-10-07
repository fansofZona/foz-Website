import type { Metadata } from "next";
import { CollectionIndex } from "@/components/collection-index";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short, opinionated posts on methods, tools, and the weird things we notice in sports data.",
};

export default function BlogsPage() {
  return <CollectionIndex collection="blogs" />;
}