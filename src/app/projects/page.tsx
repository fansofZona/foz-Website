import type { Metadata } from "next";
import { getPosts } from "@/content/posts";
import { DottedDivider, Shell } from "@/components/primitives";
import { ProjectGrid } from "./project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research reports, articles, tools, and datasets published by our student sports analytics teams.",
};

export default function ProjectsPage() {
  const posts = getPosts("projects");

  return (
    <>
      <section className="pt-8 sm:pt-12">
        <Shell>
          <p className="text-body-sm text-ink-muted">Published work</p>

          <h1 className="display-xl mt-4 max-w-[18ch] text-heading-3xl text-ink">
            Projects, reports, and the tools underneath them
          </h1>

          <p className="mt-6 max-w-[60ch] text-body-lg text-ink-muted">
            Each of these came out of a semester-long team. Reports carry a
            full methodology section; articles are the shorter argument;
            tools and datasets are the plumbing we open up for anyone to
            reuse.
          </p>
        </Shell>
      </section>

      <section className="pt-12">
        <Shell>
          <ProjectGrid posts={posts.map((p) => p.meta)} />
        </Shell>
      </section>

      <section className="pt-16 sm:pt-20">
        <Shell>
          <DottedDivider className="mb-8" />
          <h2 className="display-xl max-w-[20ch] text-heading-lg text-ink">
            Have a question you want answered?
          </h2>
          <p className="mt-4 max-w-[60ch] text-body text-ink-muted">
            We take project pitches from members, campus teams, and student
            media at the start of each semester. The best ones are specific,
            and the data already exists somewhere.
          </p>
        </Shell>
      </section>
    </>
  );
}
