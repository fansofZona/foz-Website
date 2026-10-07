import type { Metadata } from "next";
import { CollectionIndex } from "@/components/collection-index";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Full write-ups of our methods and results — the question, the dataset, the model, and the honest caveats.",
};

export default function ResearchPage() {
  return <CollectionIndex collection="research" />;
}