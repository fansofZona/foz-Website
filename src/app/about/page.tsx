import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { faq, site, tracks } from "@/content/site";
import { members } from "@/content/members";
import {
  SecondaryAnchor,
  Shell,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, what we publish, and how to join our student sports analytics club.",
};

const glance: [string, string][] = [
  ["Meets", "Weekly, during the academic term"],
  ["Open to", "All majors, all years"],
  ["Prereqs", "None — beginner track each fall"],
  ["Tools", "Python, R, SQL, Git"],
  ["Output", "Reports, articles, open datasets"],
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-8 sm:pt-12">
        <Shell>

          <h1 className="display-xl mt-8 max-w-5xl text-heading-3xl text-ink">
            A room full of people who argue about sports with data
          </h1>
        </Shell>
      </section>

      {/* Story */}
      <section className="pt-20">
        <Shell>
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <Card className="gap-0 rounded-card bg-surface p-10 ring-0 sm:p-16">
              <div className="space-y-6 text-body text-ink-muted">
                <p>
                  {site.name} started when a handful of students got tired of
                  takes that nobody could check. We wanted the version where you
                  show your work: the query, the model, the residuals, the part
                  where the result was weaker than you hoped.
                </p>
                <p>
                  Today we run as project teams. Every semester, members pitch
                  questions, form groups of three to five, and spend the term
                  collecting data, building a model, and writing it up for a
                  general audience. Some teams publish a full research report.
                  Some publish a 900-word article with one very good chart. Both
                  count.
                </p>
                <p>
                  We work with public play-by-play data, tracking feeds, film we
                  chart ourselves, and — increasingly — data shared directly by
                  campus teams who want a second opinion on something. Everything
                  we publish ships with its code, so the next person can pick it
                  up and prove us wrong.
                </p>
              </div>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="gap-0 rounded-medium bg-surface p-10 ring-0">
                <p className="text-body-sm text-ink-muted">At a glance</p>
                <dl className="mt-6 space-y-4">
                  {glance.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-col gap-1 border-b border-dotted border-hairline pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-body-sm text-ink-muted">{k}</dt>
                      <dd className="text-body-sm text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>
          </div>
        </Shell>
      </section>

      {/* What we do */}
      <section className="pt-20">
        <Shell>
          <h2 className="display-xl text-heading-3xl text-ink">What we do</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {tracks.map((t) => (
              <div
                key={t.title}
                className="border-t-[1.5px] border-dotted border-ink pt-5"
              >
                <h3 className="display-sm text-subheading text-ink">
                  {t.title}
                </h3>
                <p className="mt-4 text-body-sm leading-[1.55] text-ink-muted">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      <section id="members" className="scroll-mt-24 pt-20">
        <Shell>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="display-xl text-heading-3xl text-ink">
              Meet the members
            </h2>
            <p className="max-w-xl text-body-lg text-ink-muted">
              Researchers, engineers, and writers turning questions into work
              you can check.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Card
                key={member.slug}
                className="group gap-0 rounded-card bg-surface p-4 ring-0 transition-transform hover:-translate-y-1"
              >
                <Link
                  href={`/about/members/${member.slug}`}
                  className="flex flex-col rounded-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-medium bg-surface-muted">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-3 pt-6">
                    <h3 className="display-sm text-subheading text-ink underline decoration-dotted underline-offset-4 group-hover:decoration-solid group-hover:decoration-feature">
                      {member.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <p className="text-body-sm text-ink-muted">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </Shell>
      </section>

      {/* FAQ */}
      <section className="pt-20">
        <Shell>
          <h2 className="display-xl text-heading-3xl text-ink">
            Common questions
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {faq.map((f) => (
              <div
                key={f.q}
                className="border-t-[1.5px] border-dotted border-ink pt-5"
              >
                <h3 className="display-sm text-subheading text-ink">{f.q}</h3>
                <p className="mt-3 max-w-[52ch] text-body-sm leading-[1.55] text-ink-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Contact */}
      <section className="pt-20">
        <Shell>
          <div className="relative overflow-hidden rounded-card bg-feature p-10 sm:p-16">
            <div
              className="halftone-dots-light pointer-events-none absolute inset-0 opacity-30"
              aria-hidden
            />
            <div className="relative">
              <h2 className="display-xl max-w-2xl text-heading-2xl text-chalk">
                Come to a meeting
              </h2>
              <p className="mt-6 max-w-lg text-body text-chalk/85">
                Email us and we&apos;ll send you the time, the room, and what the
                current teams are working on.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="h-auto rounded-pill border-chalk bg-chalk px-6 py-3 text-body font-normal text-ink hover:bg-chalk/85 hover:text-ink focus-visible:border-chalk focus-visible:ring-chalk/70"
                >
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </Button>
                {site.socials.map((s) => (
                  <SecondaryAnchor
                    dark
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </SecondaryAnchor>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
