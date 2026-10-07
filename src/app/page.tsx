import Link from "next/link";
import {
  DottedDivider,
  PrimaryAnchor,
  SecondaryLink,
  Shell,
  StatCard,
} from "@/components/primitives";
import { Card } from "@/components/ui/card";
import { site, stats, tracks } from "@/content/site";
import { getPosts } from "@/content/posts";

const tools = ["Python", "R", "SQL", "Git", "DuckDB", "Next.js"];

/* Interleave the three collections so the ticker mixes games and formats. */
const collectionAccent: Record<string, string> = {
  projects: "bg-feature",
  blogs: "bg-azurite",
  research: "bg-shade",
};

function getMixedWork() {
  const projects = getPosts("projects");
  const blogs = getPosts("blogs");
  const research = getPosts("research");
  const mixed = [];
  const rounds = Math.max(projects.length, blogs.length, research.length);
  for (let i = 0; i < rounds; i++) {
    if (projects[i]) mixed.push(projects[i]);
    if (blogs[i]) mixed.push(blogs[i]);
    if (research[i]) mixed.push(research[i]);
  }
  return mixed;
}

export default function Home() {
  const mixed = getMixedWork();

  return (
    <>
      {/* Season strip — the box-score header. Real context before any headline. */}
      <section className="pt-8 sm:pt-12">
        <Shell>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-[1.5px] border-dotted border-ink pb-4">
            <p className="font-meta ledger-figures">
              Fall 2026, week 6 — three sports in the lab
            </p>
            <p className="font-meta ledger-figures">
              Tucson, Ariz. — meetings Thursdays
            </p>
          </div>
        </Shell>
      </section>

      {/* Hero — headline left, field diagram right. One bold figure only. */}
      <section className="pt-10 sm:pt-14">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <h1 className="display-xl max-w-[12ch] text-display text-ink">
                Argue about sports with data you can check
              </h1>
              <p className="mt-6 max-w-[52ch] text-body-lg text-ink-muted">
                {site.name} is a student club at the University of Arizona.
                We collect the play-by-play, build the model, and publish the
                code — so the next person can prove us wrong.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryAnchor href="/projects">
                  Read the latest report
                </PrimaryAnchor>
                <SecondaryLink href="/about">
                  Come to a meeting
                </SecondaryLink>
              </div>
            </div>

            {/* Chalk pitch with expected-threat dots. Red marks one chance. */}
            <figure
              aria-label="Soccer pitch diagram with modeled shot locations"
              className="relative overflow-hidden rounded-medium bg-plasma p-6 sm:p-8"
            >
              <div className="field-frame relative aspect-[4/3] w-full">
                <div
                  aria-hidden
                  className="field-frame-thin absolute left-1/2 top-0 h-full w-px"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full field-frame-thin"
                />
                <div
                  aria-hidden
                  className="field-frame-thin absolute left-0 top-1/2 h-32 w-12 -translate-y-1/2"
                />
                <div
                  aria-hidden
                  className="field-frame-thin absolute right-0 top-1/2 h-32 w-12 -translate-y-1/2"
                />
                {/* modeled chances */}
                <span
                  aria-hidden
                  className="absolute left-[22%] top-[38%] h-2 w-2 rounded-full bg-rain/80"
                />
                <span
                  aria-hidden
                  className="absolute left-[38%] top-[60%] h-1.5 w-1.5 rounded-full bg-rain/70"
                />
                <span
                  aria-hidden
                  className="absolute left-[55%] top-[30%] h-1.5 w-1.5 rounded-full bg-rain/70"
                />
                <span
                  aria-hidden
                  className="absolute left-[68%] top-[52%] h-2 w-2 rounded-full bg-rain/80"
                />
                <span
                  aria-hidden
                  className="absolute left-[78%] top-[44%] h-3 w-3 rounded-full bg-feature ring-4 ring-chalk/30"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-meta text-caption text-chalk/70">
                  Every dot is a shot, sized by threat
                </span>
                <span className="font-meta text-caption text-chalk/70">
                  xT 0.24
                </span>
              </figcaption>
            </figure>
          </div>
        </Shell>
      </section>

      {/* Ledger figures — quiet rules, no red fills */}
      <section className="pt-16 sm:pt-20">
        <Shell>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Shell>
      </section>

      {/* Fresh off the whiteboard — moving ticker mixing every collection */}
      <section className="pt-16 sm:pt-20">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-xl text-heading-3xl text-ink">
                Fresh off the whiteboard
              </h2>
              <p className="mt-4 max-w-[52ch] text-body text-ink-muted">
                A rolling mix of projects, blog notes, and research. Hop on
                anywhere — hover to pause.
              </p>
            </div>
            <SecondaryLink href="/projects">All projects</SecondaryLink>
          </div>
        </Shell>

        <div
          className="ticker mt-10"
          role="region"
          aria-label="Latest projects, blogs, and research"
        >
          <div className="ticker-track px-5 sm:px-8">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex gap-4"
              >
                {mixed.map((p) => (
                  <Card
                    key={`${copy}-${p.slug}`}
                    className="group w-[300px] shrink-0 gap-0 rounded-medium border-[1.5px] border-hairline bg-surface p-0 ring-0 sm:w-[340px]"
                  >
                    <Link
                      href={p.meta.href}
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="flex flex-col rounded-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <div
                        aria-hidden
                        className={`h-1.5 w-full ${collectionAccent[p.collection] ?? "bg-feature"}`}
                      />
                      <div className="p-6">
                        <p className="font-meta ledger-figures">
                          {p.meta.kind}, {p.meta.sport}, {p.meta.year}
                        </p>
                        <p className="display-sm mt-3 text-subheading text-ink">
                          {p.meta.title}
                        </p>
                        <p className="mt-2 line-clamp-3 text-body-sm text-ink-muted">
                          {p.meta.description}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work — parallel desks, so no step numbers */}
      <section className="pt-16 sm:pt-20">
        <Shell>
          <h2 className="display-xl max-w-[16ch] text-heading-3xl text-ink">
            Three desks, one deadline
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {tracks.map((t) => (
              <div
                key={t.title}
                className="border-t-[1.5px] border-dotted border-ink pt-5"
              >
                <h3 className="display-sm text-subheading text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-body-sm leading-[1.55] text-ink-muted">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Toolchain — a sentence, not a logo strip */}
      <section className="pt-16 sm:pt-20">
        <Shell>
          <DottedDivider className="mb-8" />
          <p className="max-w-[68ch] text-body text-ink-muted">
            We build with {tools.slice(0, -1).join(", ")} and{" "}
            {tools[tools.length - 1]}. New members learn the stack on a
            real dataset in the first month.
          </p>
        </Shell>
      </section>

      {/* Closing — plain ledger close, action keeps one name */}
      <section className="pt-16 sm:pt-20">
        <Shell>
          <DottedDivider className="mb-12" />
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <h2 className="display-xl max-w-[18ch] text-heading-2xl text-ink">
              No prior experience required
            </h2>
            <div>
              <p className="max-w-[48ch] text-body text-ink-muted">
                We run a beginner track every fall that takes you from a
                blank notebook to a published chart.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <PrimaryAnchor href={`mailto:${site.email}`}>
                  Email the club
                </PrimaryAnchor>
                <SecondaryLink href="/about">
                  More about the club
                </SecondaryLink>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
