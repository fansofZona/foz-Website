import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DottedDivider, Eyebrow, SecondaryAnchor, Shell, Tag } from "@/components/primitives";
import { PostCard } from "@/components/post-card";
import { Card } from "@/components/ui/card";
import { getMember, getMemberSlugs } from "@/content/members";
import { getAllPosts } from "@/content/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getMemberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) return {};

  return {
    title: `${member.name} — ${member.title}`,
    description: member.bio,
  };
}

export default async function MemberProfilePage({ params }: Props) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();

  const work = getAllPosts().filter((post) =>
    post.meta.authors.includes(member.name),
  );
  const firstName = member.name.split(" ")[0];

  return (
    <>
      <section className="pt-8 sm:pt-12">
        <Shell>
          <Link
            href="/about#members"
            className="text-body-sm text-ink-muted underline decoration-dotted underline-offset-4 hover:text-ink"
          >
            Back to members
          </Link>
          <div className="mt-8">
            <Tag>{member.title}</Tag>
          </div>
          <h1 className="display-xl mt-6 max-w-5xl text-heading-3xl text-ink">
            {member.name}
          </h1>
        </Shell>
      </section>

      <section className="pt-12">
        <Shell>
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted">
              <Image
                src={member.image}
                alt={member.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <Card className="flex-col rounded-card bg-surface p-10 ring-0 sm:p-16">
              <Eyebrow>About {firstName}</Eyebrow>
              <p className="mt-6 text-body-lg text-ink">{member.bio}</p>

              <DottedDivider className="mt-10" />
              <h2 className="display-sm mt-10 text-subheading text-ink">
                Find {firstName} online
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {member.socials.map((social) => (
                  <SecondaryAnchor
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.label}
                  </SecondaryAnchor>
                ))}
              </div>
            </Card>
          </div>
        </Shell>
      </section>

      <section className="pt-20">
        <Shell>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display-xl text-heading-2xl text-ink">Selected work</h2>
            <p className="font-meta ledger-figures">
              {work.length} {work.length === 1 ? "project" : "projects"}
            </p>
          </div>
          {work.length > 0 ? (
            <div className="mt-6">
              {work.map((post) => (
                <PostCard key={post.meta.href} post={post.meta} />
              ))}
              <DottedDivider />
            </div>
          ) : (
            <p className="mt-8 text-body text-ink-muted">
              More published work is on the way.
            </p>
          )}
        </Shell>
      </section>
    </>
  );
}
